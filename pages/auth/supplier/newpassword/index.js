import { Grid, Typography } from "@mui/material";
import axios from "axios";
import NewPasswordForm from "components/forms/supplier/newpassword";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toastify from "services/utils/toastUtils";
import atob from "atob";
import styles from "./Newpassword.module.css";

const Newpassword = () => {
  const [formValues, setFormValues] = useState({
    userId: "",
    password: "",
    rePassword: "",
  });
  const router = useRouter();

  useEffect(() => {
    if (router.query.user) {
      try {
        const temp = atob(router.query.user).split(",")[1];
        setFormValues((pre) => ({
          ...pre,
          userId: temp,
        }));
      } catch (e) {
        toastify("Invalid URL", "error");
      }
    }
  }, [router.query.user]);

  const handleSubmit = () => {
    axios
      .post(
        "http://10.10.31.116:8765/api/v1/users/registration/reset-password",
        {
          userName: formValues.userId,
          newPassword: formValues.password,
          reEnterPassword: formValues.rePassword,
          userType: "SUPPLIER",
        }
      )
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

  console.log(router.query);
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
