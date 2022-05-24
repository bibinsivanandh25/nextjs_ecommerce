import { Grid, Typography } from "@mui/material";
import NewPasswordForm from "components/forms/supplier/newpassword";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "./Newpassword.module.css";

const Newpassword = () => {
  const [formValues, setFormValues] = useState({
    userId: "",
    password: "",
    rePassword: "",
  });
  const router = useRouter();
  // const [showModal, setShowModal] = useState(false);
  const handleSubmit = () => {
    console.log(formValues);
    // setShowModal(true);
    router.push("/auth/login");
  };
  return (
    <Grid container spacing={2} className="">
      <Grid item sm={12} className="mt-2">
        <div
          className={`${styles.imgContainer} mx-2 d-flex justify-content-center align-items-center`}
        >
          <Typography variant="h3" className="color-orange">
            Create Password
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
