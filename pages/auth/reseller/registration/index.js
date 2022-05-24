import { Grid, Typography } from "@mui/material";
import ModalComponent from "components/atoms/ModalComponent";
import RegistrationForm from "components/forms/reseller/registration";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./Registration.module.css";

const Registration = () => {
  const [formValues, setFormValues] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [displayType, setDisplayType] = useState("referral");
  const router = useRouter();

  const handleSubmit = () => {
    if (displayType === "referral") {
      setDisplayType("registration");
    } else if (displayType === "registration") {
      setShowModal(true);
    } else if (displayType === "otp") {
      router.push("/auth/supplier/newpassword");
    }
  };

  useEffect(() => {
    if (showModal) {
      setTimeout(() => {
        setShowModal(false);
        setDisplayType("otp");
      }, 2000);
    }
  }, [showModal]);

  return (
    <Grid container spacing={2} className="">
      <Grid item sm={12} className="mt-2">
        <div
          className={`${styles.imgContainer} mx-2 d-flex justify-content-center align-items-center`}
        >
          <Typography variant="h3" className="color-orange">
            {displayType === "referral" && "Referral Code"}
            {displayType === "registration" && "Reseller Registration"}
            {displayType === "otp" && "Enter OTP"}
          </Typography>
        </div>
      </Grid>
      <Grid item sm={12} className="d-flex justify-content-center">
        <RegistrationForm
          formValues={formValues}
          setFormValues={setFormValues}
          handleSubmit={handleSubmit}
          displayType={displayType}
          setDisplayType={setDisplayType}
        />
      </Grid>
      <ModalComponent
        ModalTitle=""
        showFooter={false}
        showHeader={false}
        showClearBtn={false}
        showCloseIcon={false}
        showSaveBtn={false}
        open={showModal}
        ModalWidth={350}
      >
        <div className="text-center">
          <Typography className="my-2 fw-600 px-5 py-3">
            An OTP has been sent to your specified Mobile number.
          </Typography>
        </div>
      </ModalComponent>
    </Grid>
  );
};
export default Registration;
