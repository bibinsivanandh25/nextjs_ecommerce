import { Grid, Typography } from "@mui/material";
import ModalComponent from "components/atoms/ModalComponent";
import RegistrationForm from "components/forms/supplier/registration";
import Layout from "components/organism/Layout";
import { useState } from "react";
import styles from "./Registration.module.css";
const Registration = () => {
  const [formValues, setFormValues] = useState({
    businessName: "",
    mail: "",
    mobile: "",
    city: "",
    mainCat: "",
    gstin: "",
    stockCount: "",
    site: "",
    siteLink: "",
  });
  const [showModal, setShowModal] = useState(false);
  const handleSubmit = () => {
    console.log(formValues);
    setShowModal(true);
  };
  return (
    <Grid container spacing={2} className="">
      <Grid item sm={12} className="mt-2">
        <div
          className={`${styles.imgContainer} mx-2 d-flex justify-content-center align-items-center`}
        >
          <Typography variant="h3" className="color-orange">
            Supplier Registration
          </Typography>
        </div>
      </Grid>
      <Grid item sm={12} className="d-flex justify-content-center ">
        <RegistrationForm
          formValues={formValues}
          setFormValues={setFormValues}
          handleSubmit={handleSubmit}
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
          <div className={styles.modalImgContainer} />
          <Typography className="my-2 fw-600">
            We have sent a mail. Once the varification is complete we will send
            login credential
          </Typography>
        </div>
      </ModalComponent>
    </Grid>
  );
};
export default Registration;
