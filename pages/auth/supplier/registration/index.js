import { Box, Grid, Typography } from "@mui/material";
import ModalComponent from "components/atoms/ModalComponent";
import RegistrationForm from "components/forms/supplier/registration";
import validateMessage from "constants/validateMessages";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import validationRegex from "services/utils/regexUtils";
import toastify from "services/utils/toastUtils";
import serviceUtil from "services/utils";
import { assetsJson } from "public/assets";
import styles from "./Registration.module.css";
import VerifyOTP from "@/forms/auth/VerifyOTP";

const Registration = () => {
  const formObj = {
    businessName: "",
    mail: "",
    mobile: "",
    city: null,
    mainCat: [],
    gstin: "",
    stockCount: "",
    site: [],
    siteLink: "",
    firstName: "",
    lastName: "",
    referralCode: "",
  };
  const [formValues, setFormValues] = useState(formObj);
  const [errorObj, setErrorObj] = useState({ ...formObj });
  const [showModal, setShowModal] = useState(false);
  const [showVerifyOTP, setShowVerifyOTP] = useState(false);
  const [registrationPayLoad, setRegistrationPayLoad] = useState({});

  const route = useRouter();
  const validateForm = () => {
    let flag = false;
    const errObj = { ...formObj };
    if (formValues.firstName === "") {
      errObj.firstName = validateMessage.field_required;
      flag = true;
    } else if (formValues.firstName.length > 50) {
      flag = true;
      errObj.firstName = validateMessage.alpha_numeric_max_50;
    }
    if (formValues.lastName === "") {
      flag = true;
      errObj.lastName = validateMessage.field_required;
    } else if (formValues.lastName.length > 50) {
      flag = true;
      errObj.lastName = validateMessage.alpha_numeric_max_50;
    }
    if (formValues.businessName === "") {
      flag = true;
      errObj.businessName = validateMessage.field_required;
    } else if (formValues.businessName.length > 60) {
      flag = true;
      errObj.businessName = validateMessage.alpha_numeric_max_60;
    }
    if (formValues.mail === "") {
      flag = true;
      errObj.mail = validateMessage.field_required;
    } else if (!validationRegex.email.test(formValues.mail)) {
      flag = true;
      errObj.mail = validateMessage.email;
    }
    if (formValues.mobile === "") {
      flag = true;
      errObj.mobile = validateMessage.field_required;
    } else if (!validationRegex.mobile.test(formValues.mobile)) {
      flag = true;
      errObj.mobile = validateMessage.mobile;
    }
    if (formValues.gstin === "") {
      flag = true;
      errObj.gstin = validateMessage.field_required;
    } else if (formValues.gstin.length !== 15) {
      flag = true;
      errObj.gstin = "Gstin number should be of length 15";
    }
    if (formValues.stockCount === "") {
      flag = true;
      errObj.stockCount = "Please select one option";
    }
    if (formValues.site.length === 0) {
      flag = true;
      errObj.site = "Please select one option";
    }
    if (formValues.siteLink.length > 255) {
      flag = true;
      errObj.siteLink = validateMessage.alpha_numeric_max_255;
    }
    if (formValues.city === null) {
      flag = true;
      errObj.city = validateMessage.field_required;
    }
    if (formValues.mainCat.length === 0) {
      flag = true;
      errObj.mainCat = validateMessage.field_required;
    }
    setErrorObj({ ...errObj });
    return flag;
  };
  const handleSubmit = async () => {
    const flag = validateForm();
    if (!flag) {
      const payload = {
        businessName: formValues.businessName,
        emailId: formValues.mail,
        mobileNumber: formValues.mobile,
        gstin: formValues.gstin,
        avgStockCount: formValues.stockCount,
        mainCategories: formValues.mainCat.map((ele) => {
          return ele.id;
        }),
        websiteName: formValues.site?.join("") ?? "",
        profileImageUrl: null,
        websiteLink: formValues.siteLink,
        city: formValues.city.value,
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        supplierReferralCode: "",
        wished: false,
      };
      await serviceUtil
        .post(
          `users/registration/send-otp?mobileNumber=${
            formValues.mobile
          }&userType=${route.pathname.split("/")[2].toUpperCase()}`
        )
        .then((data) => {
          // if (data) {
          toastify(data.message, "success");
          setShowVerifyOTP(true);
          setRegistrationPayLoad({ ...payload });
          // setShowModal(true);
          // }
        })
        .catch((err) => {
          toastify(err.response.data.message, "error");
        });
    }
  };

  useEffect(() => {
    return () => {
      setFormValues(formObj);
    };
  }, []);

  return (
    <>
      {!showVerifyOTP ? (
        <Grid container spacing={2} className="">
          <Grid item sm={12} className="mt-2">
            <div
              style={{
                backgroundImage: `url(${assetsJson.login_background})`,
              }}
              className={`${styles.imgContainer} mx-2 d-flex flex-column justify-content-center align-items-center`}
            >
              <div className={styles.titleContainer}>
                <Typography variant="h3" className="color-orange text-center">
                  Supplier Registration
                </Typography>
                <Box className="w-50 mx-auto mt-2">
                  {" "}
                  <Typography className=" text-center h-5">
                    Change Your Ordinary Store To a Virtual Store. Let Customer
                    Have a Visibility of All Products You Have For Selling.
                    Register With Us And You Are Free From Commission For Your
                    First 50 Orders. Happy Selling Grow Your Income.
                  </Typography>
                </Box>
              </div>
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
        </Grid>
      ) : (
        <VerifyOTP
          payLoad={registrationPayLoad}
          setShowVerifyOTP={setShowVerifyOTP}
          setShowModal={setShowModal}
        />
      )}
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
            A mail has been delivered. A link to create a password will be sent
            to you once the verification is finished.
          </Typography>
        </div>
      </ModalComponent>
    </>
  );
};
export default Registration;
