import { Grid, Typography } from "@mui/material";
import ModalComponent from "components/atoms/ModalComponent";
import RegistrationForm from "components/forms/supplier/registration";
import validateMessage from "constants/validateMessages";
import { useEffect, useState } from "react";
import { requiredValidator } from "services/validationUtils";
import styles from "./Registration.module.css";
import validationRegex from "services/utils/regexUtils";

const Registration = () => {
  const formObj = {
    businessName: "",
    mail: "",
    mobile: "",
    city: null,
    mainCat: null,
    gstin: "",
    stockCount: "",
    site: "",
    siteLink: "",
    firstName: "",
    lastName: "",
  };
  const [formValues, setFormValues] = useState(formObj);
  const [errorObj, setErrorObj] = useState({ ...formObj });
  const [showModal, setShowModal] = useState(false);

  const validateForm = () => {
    const errObj = { ...formObj };
    if (formValues.firstName === "") {
      errObj.firstName = validateMessage.field_required;
    } else if (formValues.firstName.length > 50) {
      errObj.firstName = validateMessage.alpha_numeric_max_50;
    }
    if (formValues.lastName === "") {
      errObj.lastName = validateMessage.field_required;
    } else if (formValues.lastName.length > 50) {
      errObj.lastName = validateMessage.alpha_numeric_max_50;
    }
    if (formValues.businessName === "") {
      errObj.businessName = validateMessage.field_required;
    } else if (formValues.businessName.length > 60) {
      errObj.businessName = validateMessage.alpha_numeric_max_60;
    }
    if (formValues.mail === "") {
      errObj.mail = validateMessage.field_required;
    } else if (!validationRegex.email.test(formValues.mail)) {
      errObj.mail = validateMessage.email;
    }
    if (formValues.mobile === "") {
      errObj.mobile = validateMessage.field_required;
    } else if (!validationRegex.mobile.test(formValues.mobile)) {
      errObj.mobile = validateMessage.mobile;
    }
    if (formValues.gstin === "") {
      errObj.gstin = validateMessage.field_required;
    } else if (formValues.gstin.length !== 15) {
      errObj.gstin = "Gstin number should be of length 15";
    }
    if (formValues.stockCount === "") {
      errObj.stockCount = "Please select one option";
    }
    if (formValues.site === "") {
      errObj.site = "Please select atleact one option";
    }
    debugger;
    if (formValues.siteLink.length > 255) {
      errObj.siteLink = validateMessage.alpha_numeric_max_255;
    }
    if (formValues.city === null) {
      errObj.city = validateMessage.field_required;
    }
    if (formValues.mainCat === null) {
      errObj.mainCat = validateMessage.field_required;
    }
    setErrorObj({ ...errObj });
  };

  const handleSubmit = async () => {
    validateForm();
    // const payload = {
    //   firstName: formValues.firstName,
    //   lastName: formValues.lastName,
    //   businessName: formValues.businessName,
    //   email: formValues.mail,
    //   mobileNumber: formValues.mobile,
    //   city: formValues.city,
    //   gstin: formValues.gstin,
    //   role: "SUPPLIER",
    //   averageStockCount: formValues.stockCount,
    //   website: formValues.site,
    //   websiteLink: formValues.siteLink,
    //   categoryData: [
    //     {
    //       categoryId: formValues.mainCat.value,
    //       categoryName: formValues.mainCat.id,
    //     },
    //   ],
    // };
    // const { data, errRes } = await axios
    //   .post(`${process.env.baseUrl}user-management/supplier-register`, payload)
    //   .then((res) => {
    //     const data = res && res.data;
    //     return { data };
    //   })
    //   .catch((err) => {
    //     const errRes = err?.response?.data;
    //     return { errRes };
    //   });
    // // const { data, errRes } = await supplierRegister(payload);
    // if (data) {
    //   setShowModal(true);
    //   console.log(data);
    // } else if (errRes) {
    //   console.log(errRes);
    // }
  };

  useEffect(() => {
    return () => {
      setFormValues(formObj);
    };
  }, []);
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
          errorObj={errorObj}
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
