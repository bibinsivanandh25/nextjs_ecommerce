/* eslint-disable no-empty-pattern */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Box, Grid, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import Image from "next/image";
import validateMessage from "constants/validateMessages";
import validationRegex from "services/utils/regexUtils";
import {
  getCsrfToken,
  getProviders,
  getSession,
  signIn,
} from "next-auth/react";
import { assetsJson } from "public/assets";
import { useRouter } from "next/router";
import { login } from "services/customer/auth";
import atob from "atob";
import toastify from "services/utils/toastUtils";
import ButtonComponent from "@/atoms/ButtonComponent";
import Link from "next/link";
import { getStoreByStoreCode } from "services/customer/ShopNow";
import { useDispatch } from "react-redux";
import { storeUserInfo } from "features/customerSlice";
import { storeUserInfo as userCustomerInfo } from "features/userSlice";
import InputBoxComponent from "../../../../components/atoms/InputBoxComponent";
import styles from "./signin.module.css";

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

  const dispatch = useDispatch();

  const storedatatoRedux = async (storeCode, customerID, email) => {
    const { data, err } = await getStoreByStoreCode(storeCode);
    if (data) {
      const userInfo = {
        userId: customerID,
        supplierId: data?.supplierId,
        supplierStoreLogo: data?.supplierStoreLogo,
        supplierStoreName: data?.supplierStoreName,
        storeCode: data?.supplierStoreCode,
        storeThemes: data?.storeThemes,
        shopDescription: data?.shopDescription,
        shopDescriptionImageUrl: data?.shopDescriptionImageUrl,
        role: "CUSTOMER",
        emailId: email,
      };
      dispatch(storeUserInfo(userInfo));
      dispatch(
        userCustomerInfo({
          userId: customerID,
          supplierId: data?.supplierId,
          role: "CUSTOMER",
          emailId: email,
        })
      );
    }
    if (err) {
      toastify(err.response?.data?.message, "error");
    }
  };

  const handleSubmit = async () => {
    const flag = validateForm();
    if (!flag) {
      login({
        userName: formValues.mobileNoOrEmail,
        password: formValues.password,
        userType: "CUSTOMER",
      })
        .then(async (res) => {
          if (res) {
            const { data } = res;
            if (data) {
              const decoded = JSON.parse(
                atob(data.token.split(".")[1].toString())
              );
              const userData = decoded.sub.split(",");
              const respo = await signIn("credentials", {
                id: userData[0],
                email: userData[1],
                role: "CUSTOMER",
                token: data.token,
                redirect: false,
                callbackUrl: "/customer/home",
              });
              if (respo?.error) {
                toastify("Invalid credentials", "error");
                return null;
              }
              router.push(`/customer/home`);
              await storedatatoRedux(
                data?.defaultStoreCode,
                userData[0],
                userData[1]
              );
            }
          }
          return null;
        })
        .catch((err) => ({ err }));
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
          <Grid item md={12} className="w-100 my-1">
            <div className="d-flex justify-content-between">
              <Link href="/auth/customer/signin/otplogin" passHref>
                <span className="color-orange fs-12 cursor-pointer fw-bold">
                  Login with OTP
                </span>
              </Link>
              <Link
                href={{
                  pathname: `/auth/forgotpassword`,
                  query: {
                    role: "CUSTOMER",
                  },
                }}
                as="/auth/forgotpassword"
                passHref
              >
                <span className="color-orange fs-12 cursor-pointer fw-bold">
                  Forgot password?
                </span>
              </Link>
            </div>
          </Grid>
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

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });
  if (session) {
    const { role } = session.user;
    if (role === "CUSTOMER") {
      return {
        redirect: { destination: "/customer/home" },
      };
    }
  }

  return {
    props: {
      providers: await getProviders(context),
      csrfToken: (await getCsrfToken(context)) || null,
    },
  };
}
