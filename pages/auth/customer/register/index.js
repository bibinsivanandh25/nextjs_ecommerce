import { Box, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import Image from "next/image";
import validateMessage from "constants/validateMessages";
import validationRegex from "services/utils/regexUtils";
import styles from "./customerregister.module.css";
import ButtonComponent from "@/atoms/ButtonComponent";
import favicon from "../../../../public/assets/favicon.png";
import InputBoxComponent from "../../../../components/atoms/InputBoxComponent";
import DatePickerComponent from "@/atoms/DatePickerComponent";

const CustomerRegistration = () => {
  const formObj = {
    pName: "",
    email: "",
    dateOfBirth: "",
    mobileNo: "",
    password: "",
    renterPassword: "",
  };

  const [formValues, setFormValues] = useState({
    storeCode: "",
    pName: "",
    email: "",
    dateOfBirth: "",
    mobileNo: "",
    password: "",
    renterPassword: "",
  });

  const [errorObj, setErrorObj] = useState({
    ...formObj,
  });

  console.log("error obj ", errorObj);

  const validateForm = () => {
    let flag = false;
    const errObj = { ...formObj };
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
    if (formValues.dateOfBirth === "") {
      flag = true;
      errObj.dateOfBirth = validateMessage.field_required;
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
    setErrorObj({ ...errObj });
    return flag;
  };

  const handleSubmit = () => {
    validateForm();
    // if (!flag) {
    // }
  };

  const onDateChange = (date) => {
    setFormValues({ ...formValues, dateOfBirth: date });
  };

  return (
    <Box
      className={`w-100 mnh-100vh d-flex justify-content-center align-items-center ${styles.container}`}
    >
      <Paper
        className="w-400px rounded-1"
        sx={{ background: "rgba(1,1,1,0.4)" }}
        elevation={6}
      >
        <Box className="w-100 p-2 rounded-1">
          <Box className="d-flex justify-content-end align-items-center">
            <Typography className="color-white fs-14 cursor-pointer">
              Existing Customer
            </Typography>
            <Box className="ps-2">
              <ButtonComponent
                label="Sign in"
                variant="outlined"
                muiProps="bg-transparent color-white fs-12"
                borderColor="border-white"
              />
            </Box>
          </Box>
          <Box
            style={{ height: "75px" }}
            className="d-flex justify-content-center align-items-center"
          >
            <Image
              height="1200"
              className="img-fluid"
              src={favicon}
              alt="logo"
            />
          </Box>
          <Typography variant="h6" className="color-white text-center fs-16">
            A Multi Ecommerece Store
          </Typography>
          <InputBoxComponent
            label="Enter Store Code"
            placeholder="Enter Store Code"
            inputlabelshrink
            className="mt-2"
            value={formValues.storeCode}
            onInputChange={(e) => {
              setFormValues((prev) => ({
                ...prev,
                storeCode: e.target.value,
              }));
            }}
          />
          <InputBoxComponent
            label="Name"
            placeholder="Name"
            inputlabelshrink
            className="mt-3"
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
          <InputBoxComponent
            label="E-mail"
            placeholder="E-mail"
            inputlabelshrink
            className="mt-3"
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
          <DatePickerComponent
            label="Date of birth"
            placeholder="Date of birth"
            inputlabelshrink
            className="mt-3 p-0"
            onDateChange={(date) => {
              onDateChange(date);
            }}
            value={formValues.dateOfBirth}
            helperText={errorObj.dateOfBirth}
            error={errorObj.dateOfBirth !== ""}
          />
          <InputBoxComponent
            label="Mobile no."
            placeholder="Mobile no."
            inputlabelshrink
            className="mt-3"
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
          <InputBoxComponent
            label="Password"
            placeholder="Password"
            inputlabelshrink
            className="mt-3"
            onInputChange={(e) => {
              setFormValues((prev) => ({
                ...prev,
                password: e.target.value,
              }));
            }}
            value={formValues.password}
            type="password"
            helperText={errorObj.password}
            error={errorObj.password !== ""}
          />
          <InputBoxComponent
            label="Reenter password"
            placeholder="Reenter password"
            inputlabelshrink
            className="mt-3"
            onInputChange={(e) => {
              setFormValues((prev) => ({
                ...prev,
                renterPassword: e.target.value,
              }));
            }}
            value={formValues.renterPassword}
            type="password"
            helperText={errorObj.renterPassword}
            error={errorObj.renterPassword !== ""}
          />
          <Box className="mt-3 d-flex justify-content-center">
            <ButtonComponent
              label="Sign Up"
              muiProps="px-4 py-2"
              onBtnClick={handleSubmit}
            />
          </Box>
          <Box>
            <Typography className="fs-12 text-center color-white mt-2">
              Dont have a store code?{" "}
              <span className="color-orange">click here</span>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default CustomerRegistration;
