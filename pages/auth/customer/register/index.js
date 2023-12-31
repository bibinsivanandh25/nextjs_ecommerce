/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Box, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import validateMessage from "constants/validateMessages";
import validationRegex from "services/utils/regexUtils";
import { assetsJson } from "public/assets";
import { useRouter } from "next/router";
// import { registerCustomer } from "services/customer/auth";
import { format } from "date-fns";
import toastify from "services/utils/toastUtils";
import ButtonComponent from "@/atoms/ButtonComponent";
import VerifyOTP from "@/forms/auth/VerifyOTP";
import DatePickerComponent from "@/atoms/DatePickerComponent";
import serviceUtil from "services/utils";
import RadiobuttonComponent from "@/atoms/RadiobuttonComponent";
import CustomDrawer from "@/atoms/CustomDrawer";
import ExploreStores from "@/forms/customer/exploreStores";
import styles from "./customerregister.module.css";
import InputBoxComponent from "../../../../components/atoms/InputBoxComponent";

const CustomerRegistration = () => {
  const formObj = {
    pName: "",
    email: "",
    dateOfBirth: "",
    mobileNo: "",
    password: "",
    renterPassword: "",
    storeCode: "",
    gender: "",
  };

  const [formValues, setFormValues] = useState({
    storeCode: "",
    pName: "",
    email: "",
    dateOfBirth: "",
    mobileNo: "",
    password: "",
    renterPassword: "",
    gender: "",
  });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmNewPassword] = useState(false);
  const [registrationPayLoad, setRegistrationPayLoad] = useState({});
  const [showVerifyOTP, setShowVerifyOTP] = useState(false);
  const [openExplore, setOpenExplore] = useState(false);

  const [errorObj, setErrorObj] = useState({
    ...formObj,
  });

  const router = useRouter();

  const validateForm = () => {
    const maxDate = new Date();
    maxDate.setHours(0, 0, 0, 0);
    maxDate.setDate(maxDate.getDate());
    let flag = false;
    const errObj = { ...formObj };
    if (formValues.storeCode === "") {
      flag = true;
      errObj.storeCode = validateMessage.field_required;
    }
    if (formValues.pName === "") {
      flag = true;
      errObj.pName = validateMessage.field_required;
    } else if (formValues.pName.length > 50) {
      flag = true;
      errObj.pName = validateMessage.alpha_numeric_max_50;
    }
    if (formValues.email === "") {
      flag = true;
      errObj.email = validateMessage.field_required;
    } else if (!validationRegex.email.test(formValues.email)) {
      flag = true;
      errObj.email = validateMessage.email;
    }
    if (formValues.gender === "") {
      flag = true;
      errObj.gender = validateMessage.field_required;
    }
    if (formValues.dateOfBirth === "") {
      flag = true;
      errObj.dateOfBirth = validateMessage.field_required;
    }
    if (!(formValues.dateOfBirth < maxDate)) {
      flag = true;
      errObj.dateOfBirth = validateMessage.brforeDate;
    }
    if (formValues.mobileNo === "") {
      flag = true;
      errObj.mobileNo = validateMessage.field_required;
    } else if (!validationRegex.mobile.test(formValues.mobileNo)) {
      flag = true;
      errObj.mobileNo = validateMessage.mobile;
    }
    if (formValues.password === "") {
      flag = true;
      errObj.password = validateMessage.field_required;
    } else if (!validationRegex.password.test(formValues.password)) {
      flag = true;
      errObj.password = validateMessage.password;
    }
    if (formValues.renterPassword === "") {
      flag = true;
      errObj.renterPassword = validateMessage.field_required;
    } else if (!validationRegex.password.test(formValues.renterPassword)) {
      flag = true;
      errObj.renterPassword = validateMessage.password;
    }
    if (formValues.password !== formValues.renterPassword) {
      errObj.renterPassword = "Password did not match.";
      flag = true;
    }
    setErrorObj({ ...errObj });
    return flag;
  };

  useEffect(() => {
    return () => {
      setFormValues({ ...formObj });
      setErrorObj({ ...formObj });
    };
  }, []);

  const handleSubmit = async () => {
    if (!validateForm()) {
      const payload1 = {
        mobileNumber: formValues.mobileNo,
        userType: "CUSTOMER",
        email: formValues.email,
      };
      const payload = {
        customerName: formValues.pName,
        mobileNumber: formValues.mobileNo,
        emailId: formValues.email,
        dob: format(formValues.dateOfBirth, "yyyy-MM-dd"),
        storeCode: formValues.storeCode,
        password: formValues.password,
        gender: formValues.gender,
        wished: false,
      };
      await serviceUtil
        .post(`users/user-registration/send-otp`, payload1)
        .then((data) => {
          toastify(data.data.message, "success");
          setShowVerifyOTP(true);
          setRegistrationPayLoad({ ...payload });
        })
        .catch((err) => {
          toastify(err.response.data.message, "error");
        });
    }
  };

  const onDateChange = (date) => {
    setFormValues({ ...formValues, dateOfBirth: date });
  };

  return (
    <>
      {!showVerifyOTP ? (
        <Box
          sx={{
            backgroundImage: `url(${assetsJson.login_background})`,
          }}
          className={`w-100 mnh-100vh d-flex justify-content-center align-items-center ${styles.container}`}
        >
          <Paper className="w-75 rounded-1" elevation={24}>
            <Box className="w-100 p-2 rounded-1">
              <Box className="d-flex justify-content-end align-items-center">
                <Typography className=" fs-14">Existing Customer</Typography>
                <Box className="ps-2">
                  <ButtonComponent
                    label="Sign in"
                    variant="outlined"
                    muiProps="bg-transparent  fs-12"
                    onBtnClick={() => {
                      router.push("/auth/customer/signin");
                    }}
                  />
                </Box>
              </Box>
              <Box
                style={{ height: "75px" }}
                className="d-flex justify-content-center align-items-center"
              >
                <Image
                  width={300}
                  height={120}
                  className="img-fluid"
                  src={assetsJson.logo}
                  alt="logo"
                />
              </Box>
              <Typography variant="h6" className="mt-3 text-center fs-16">
                A Multi Ecommerce Store
              </Typography>
              <Grid container spacing={3} className="mt-1 px-3">
                <Grid item sm={6}>
                  <InputBoxComponent
                    label="Enter Store Code"
                    id="Enter Store Code"
                    placeholder="Enter Store Code"
                    inputlabelshrink
                    value={formValues.storeCode}
                    onInputChange={(e) => {
                      setFormValues((prev) => ({
                        ...prev,
                        storeCode: e.target.value,
                      }));
                    }}
                    helperText={errorObj.storeCode}
                    error={errorObj.storeCode !== ""}
                  />
                </Grid>
                <Grid item sm={6}>
                  <InputBoxComponent
                    label="Name"
                    id="Name"
                    placeholder="Name"
                    inputlabelshrink
                    onInputChange={(e) => {
                      setFormValues((prev) => ({
                        ...prev,
                        pName: e.target.value,
                      }));
                    }}
                    value={formValues.pName}
                    helperText={errorObj.pName}
                    error={errorObj.pName !== ""}
                  />
                </Grid>
                <Grid item sm={6}>
                  <InputBoxComponent
                    showAutoFill="new-password"
                    label="E-Mail"
                    id="E-Mail"
                    placeholder="E-Mail"
                    inputlabelshrink
                    onInputChange={(e) => {
                      setFormValues((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }));
                    }}
                    value={formValues.email}
                    // type="email"
                    helperText={errorObj.email}
                    error={errorObj.email !== ""}
                  />
                </Grid>
                <Grid item sm={6}>
                  <DatePickerComponent
                    label="Date of Birth"
                    id="Date of Birth"
                    placeholder="Date of Birth"
                    inputlabelshrink
                    onDateChange={(date) => {
                      onDateChange(date);
                    }}
                    size="small"
                    value={formValues.dateOfBirth}
                    helperText={errorObj.dateOfBirth}
                    error={errorObj.dateOfBirth !== ""}
                  />
                </Grid>
                <Grid
                  container
                  item
                  sm={6}
                  spacing={2}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Grid item sm={4}>
                    <RadiobuttonComponent
                      isChecked={formValues.gender === "Male"}
                      label="Male"
                      onRadioChange={() => {
                        setFormValues({
                          ...formValues,
                          gender: "Male",
                        });
                      }}
                    />
                  </Grid>
                  <Grid item sm={4}>
                    <RadiobuttonComponent
                      label="Female"
                      isChecked={formValues.gender === "Female"}
                      onRadioChange={() => {
                        setFormValues({
                          ...formValues,
                          gender: "Female",
                        });
                      }}
                    />
                  </Grid>
                  <Grid item sm={4}>
                    <RadiobuttonComponent
                      isChecked={formValues.gender === "Others"}
                      label="Others"
                      onRadioChange={() => {
                        setFormValues({
                          ...formValues,
                          gender: "Others",
                        });
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid item sm={6}>
                  <InputBoxComponent
                    label="Mobile No."
                    id="Mobile No."
                    placeholder="Mobile No."
                    inputlabelshrink
                    onInputChange={(e) => {
                      setFormValues((prev) => ({
                        ...prev,
                        mobileNo: e.target.value,
                      }));
                    }}
                    value={formValues.mobileNo}
                    type="number"
                    helperText={errorObj.mobileNo}
                    error={errorObj.mobileNo !== ""}
                  />
                </Grid>
                <Grid item sm={6}>
                  <InputBoxComponent
                    label="Password"
                    id="Password"
                    showAutoFill="new-password"
                    placeholder="Password"
                    inputlabelshrink
                    onInputChange={(e) => {
                      setFormValues((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }));
                    }}
                    value={formValues.password}
                    type={showNewPassword ? "text" : "password"}
                    helperText={errorObj.password}
                    error={errorObj.password !== ""}
                    iconName={showNewPassword ? "visible" : "visibleOff"}
                    onIconClick={() => setShowNewPassword(!showNewPassword)}
                  />
                </Grid>
                <Grid item sm={6}>
                  <InputBoxComponent
                    label="Re-Enter Password"
                    showAutoFill="new-password"
                    id="Re-Enter Password"
                    placeholder="Re-Enter Password"
                    inputlabelshrink
                    onInputChange={(e) => {
                      setFormValues((prev) => ({
                        ...prev,
                        renterPassword: e.target.value,
                      }));
                    }}
                    value={formValues.renterPassword}
                    type={showConfirmPassword ? "text" : "password"}
                    helperText={errorObj.renterPassword}
                    error={errorObj.renterPassword !== ""}
                    iconName={showConfirmPassword ? "visible" : "visibleOff"}
                    onIconClick={() =>
                      setShowConfirmNewPassword(!showConfirmPassword)
                    }
                  />
                </Grid>
              </Grid>
              <Box className="mt-3 d-flex justify-content-center">
                <ButtonComponent
                  label="Sign Up"
                  muiProps="px-5 py-2 fs-12"
                  onBtnClick={handleSubmit}
                  showIcon
                  iconName="lineArrowIcon"
                  iconOrintation="end"
                  iconColorClass="color-white fs-16"
                />
              </Box>
              <Box className="mb-3">
                <Typography className="fs-12 text-center  mt-2">
                  Dont have a store code?{" "}
                  <span
                    className="color-orange cursor-pointer"
                    onClick={() => setOpenExplore(true)}
                  >
                    click here
                  </span>
                </Typography>
              </Box>
            </Box>
          </Paper>
          <CustomDrawer
            open={openExplore}
            position="right"
            handleClose={() => {
              setOpenExplore(false);
            }}
            title="Explore Stores"
            titleClassName="color-orange"
          >
            <ExploreStores
              handleStoreSelection={(storeData) => {
                setFormValues((prev) => ({
                  ...prev,
                  storeCode: storeData.storeCode,
                }));
                setOpenExplore(false);
              }}
              showConformation={false}
            />
          </CustomDrawer>
        </Box>
      ) : (
        <VerifyOTP
          payLoad={registrationPayLoad}
          setShowVerifyOTP={setShowVerifyOTP}
        />
      )}
    </>
  );
};

export default CustomerRegistration;
