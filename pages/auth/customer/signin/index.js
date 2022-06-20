import { Box, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import Image from "next/image";
import validateMessage from "constants/validateMessages";
import validationRegex from "services/utils/regexUtils";
import ButtonComponent from "@/atoms/ButtonComponent";
import styles from "./signin.module.css";
import favicon from "../../../../public/assets/favicon.png";
import InputBoxComponent from "../../../../components/atoms/InputBoxComponent";

const SignIn = () => {
  const formObj = {
    mobileNoOrEmail: "",
    password: "",
  };

  const [formValues, setFormValues] = useState({
    mobileNoOrEmail: "",
    password: "",
  });

  const [errorObj, setErrorObj] = useState({
    ...formObj,
  });

  const validateForm = () => {
    let flag = false;
    const errObj = { ...formObj };
    if (formValues.mobileNoOrEmail === "") {
      flag = true;
      errObj.mobileNoOrEmail = validateMessage.field_required;
    } else if (!validationRegex.email.test(formValues.mobileNoOrEmail)) {
      if (!validationRegex.mobile.test(formValues.mobileNoOrEmail)) {
        flag = true;
        errObj.mobileNoOrEmail = validateMessage.userId;
      }
    }
    if (formValues.password === "") {
      flag = true;
      errObj.password = validateMessage.field_required;
    }
    setErrorObj({ ...errObj });
    return flag;
  };

  const handleSubmit = () => {
    validateForm();
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
        <Box className="w-100 p-4 rounded-1">
          <Box className="d-flex justify-content-end align-items-center">
            <Typography className="color-white fs-14 cursor-pointer">
              New Customer
            </Typography>
            <Box className="ps-2">
              <ButtonComponent
                label="Sign up"
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
            label="Mobile No./E-mail"
            placeholder="Mobile No./E-mail"
            inputlabelshrink
            className="mt-3"
            onInputChange={(e) => {
              setFormValues((prev) => ({
                ...prev,
                mobileNoOrEmail: e.target.value,
              }));
            }}
            value={formValues.mobileNoOrEmail}
            helperText={errorObj.mobileNoOrEmail}
            error={errorObj.mobileNoOrEmail !== ""}
          />
          <InputBoxComponent
            label="Password"
            placeholder="Password"
            inputlabelshrink
            className="mt-3"
            type="password"
            onInputChange={(e) => {
              setFormValues((prev) => ({
                ...prev,
                password: e.target.value,
              }));
            }}
            value={formValues.password}
            helperText={errorObj.password}
            error={errorObj.password !== ""}
          />
          <Box className="mt-3 d-flex justify-content-center">
            <ButtonComponent
              label="Sign Up"
              muiProps="px-4 py-2"
              onBtnClick={handleSubmit}
            />
          </Box>
          <Typography className="fs-12 text-center color-white mt-2">
            Dont have an account?{" "}
            <span className="color-orange cursor-pointer">Register</span>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default SignIn;
