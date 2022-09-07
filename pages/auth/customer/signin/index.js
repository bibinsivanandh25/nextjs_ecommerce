/* eslint-disable no-empty-pattern */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Box, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import Image from "next/image";
import validateMessage from "constants/validateMessages";
import validationRegex from "services/utils/regexUtils";
import { signIn } from "next-auth/react";
import { assetsJson } from "public/assets";
import { useRouter } from "next/router";
import { login } from "services/customer/auth";
import atob from "atob";
import toastify from "services/utils/toastUtils";
import ButtonComponent from "@/atoms/ButtonComponent";
import styles from "./signin.module.css";
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

  const router = useRouter();

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

  const handleSubmit = async () => {
    const flag = validateForm();
    if (!flag) {
      login({
        userName: formValues.mobileNoOrEmail,
        password: formValues.password,
        userType: "CUSTOMER",
      }).then(async (res) => {
        const { data } = res;
        const decoded = JSON.parse(atob(data.token.split(".")[1].toString()));
        const userData = decoded.sub.split(",");
        const respo = signIn("credentials", {
          id: userData[0],
          email: userData[1],
          role: decoded.roles[0],
          token: data.token,
          redirect: false,
          callbackUrl: "/customer/home",
        });
        if (respo?.error) {
          toastify("Invalid credentials", "error");
          return null;
        }
        // await storedatatoRedux(userData[0]);
        router.push(`/customer/home`);
        return null;
      });
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${assetsJson.login_background})`,
      }}
      className={`w-100 mnh-100vh d-flex justify-content-center align-items-center ${styles.container}`}
    >
      <Paper className="w-400px rounded-1" elevation={24}>
        <Box className="w-100 p-4 rounded-1">
          <Box className="d-flex justify-content-end align-items-center">
            <Typography className=" fs-14">New Customer</Typography>
            <Box className="ps-2">
              <ButtonComponent
                label="Sign Up"
                variant="outlined"
                muiProps="bg-transparent  fs-12"
                onBtnClick={() => {
                  router.push("/auth/customer/register");
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
            A Multi Ecommrece Store
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
              label="Sign In"
              muiProps="px-4 py-2"
              onBtnClick={handleSubmit}
            />
          </Box>
          <Typography className="fs-12 text-center mt-2">
            Dont have an account?
            <span
              className="color-orange cursor-pointer"
              onClick={() => {
                router.push("/auth/customer/register");
              }}
            >
              {" "}
              Register
            </span>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default SignIn;
