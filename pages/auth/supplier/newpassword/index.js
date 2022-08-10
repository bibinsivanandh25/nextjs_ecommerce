import { Grid, Typography } from "@mui/material";
import NewPasswordForm from "components/forms/supplier/newpassword";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import serviceUtil from "services/utils";
import toastify from "services/utils/toastUtils";
import styles from "./Newpassword.module.css";

const Newpassword = () => {
  const [formValues, setFormValues] = useState({
    userId: "",
    password: "",
    rePassword: "",
  });
  const router = useRouter();

  useEffect(() => {
    setFormValues((pre) => ({
      ...pre,
      userId: router.query.user,
    }));
  }, [router.query.user]);

  // const [showModal, setShowModal] = useState(false);
  const handleSubmit = () => {
    serviceUtil
      .post("users/registration/reset-password", {
        userName: formValues.userId,
        newPassword: formValues.password,
        reEnterPassword: formValues.rePassword,
        userType: "SUPPLIER",
      })
      .then((data) => {
        toastify(data.data.message, "success");
        if (data) {
          router.push("/auth/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // setShowModal(true);
  };
  return (
    <Grid container spacing={2} className="">
      <Grid item sm={12} className="mt-2">
        <div
          className={`${styles.imgContainer} mx-2 d-flex justify-content-center align-items-center`}
        >
          <Typography variant="h3" className="color-orange">
            New Password
          </Typography>
        </div>
      </Grid>
      <Grid item sm={12} className="d-flex justify-content-center ">
        <div className="">
          <NewPasswordForm
            formValues={formValues}
            setFormValues={setFormValues}
            handleSubmit={handleSubmit}
          />
        </div>
      </Grid>
    </Grid>
  );
};
export default Newpassword;
