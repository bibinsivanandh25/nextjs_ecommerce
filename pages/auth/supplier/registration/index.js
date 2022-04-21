import { Grid, Typography } from "@mui/material";
import ModalComponent from "components/atoms/ModalComponent";
import RegistrationForm from "components/forms/supplier/registration";
import Layout from "components/organism/Layout";
import { useState } from "react";
import styles from "./Registration.module.css";
import { supplierRegister } from "services/supplier/Registration";

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
    siteLink: null,
  });
  const [showModal, setShowModal] = useState(false);
  const handleSubmit = async () => {
    const payload = {
      businessName: formValues.businessName,
      email: formValues.mail,
      mobileNumber: formValues.mobile,
      city: formValues.city,
      gstin: formValues.gstin,
      role: "SUPPLIER",
      averageStockCount: formValues.stockCount,
      website: formValues.site,
      websiteLink: formValues.siteLink,
      categoryData: [
        {
          categoryId: formValues.mainCat.value,
          categoryName: formValues.mainCat.id,
        },
      ],
    };
    const { data, errRes } = await supplierRegister(payload);
    if (data) {
      setShowModal(true);
      console.log(data);
    } else if (errRes) {
      console.log(errRes);
    }
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
