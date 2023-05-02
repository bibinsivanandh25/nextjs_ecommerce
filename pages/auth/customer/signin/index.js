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
import { getCustomerById, login } from "services/customer/auth";
import atob from "atob";
import toastify from "services/utils/toastUtils";
import ButtonComponent from "@/atoms/ButtonComponent";
import Link from "next/link";
import { getStoreByStoreCode } from "services/customer/ShopNow";
import { useDispatch } from "react-redux";
import { storeUserInfo } from "features/customerSlice";
import { storeUserInfo as userCustomerInfo } from "features/userSlice";
import { addStore, switchStore } from "services/admin/storeList";
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
  const bg_color = ["#fe4a49", "#966b9d", "#1A936F", "#907AD6", "#114B5F"];
  const [showPassword, setShowPassword] = useState(false);

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

  const storedatatoRedux = async (storeCode, customerID, email, details) => {
    const { data, err } = await getStoreByStoreCode(storeCode);
    if (data) {
      const userInfo = {
        userId: customerID,
        supplierId: data?.supplierId,
        supplierStoreLogo: data?.supplierStoreLogo,
        supplierStoreName: data?.supplierStoreName,
        storeCode: data?.supplierStoreCode,
        storeThemes: data?.storeTheme,
        shopDescription: data?.shopDescription,
        shopDescriptionImageUrl: data?.shopDescriptionImageUrl,
        role: "CUSTOMER",
        emailId: email,
        profileImg: details.profileImage,
        gender: details.gender,
        mobileNumber: details.mobileNumber,
        addressDetails: details.addressDetails,
        customerName: details.customerName,
        profileId: details.profileId,
        profileName: details.profileName,
        bgcolor: bg_color[Math.floor(Math.random() * (4 - 0) + 0)],
        supplieremailId: data.emailId,
        suppliermobileNumber: data.mobileNumber,
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
      return { data };
    }
    if (err) {
      toastify(err.response?.data?.message, "error");
      return { data: null };
    }
    return 0;
  };

  const getDetails = async (id) => {
    const { data } = await getCustomerById(id);
    if (data) {
      return data;
    }
    return null;
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
              const details = await getDetails(userData[0]);
              if (details) {
                if (router?.query?.storeCode) {
                  const { data: isStoreValid } = await storedatatoRedux(
                    router?.query?.storeCode,
                    userData[0],
                    userData[1],
                    details
                  );
                  const { data: addStoreData } = await addStore({
                    customerId: details.customerId,
                    storeListId: null,
                    storeListName: null,
                    storeType: "SUPPLIER",
                    storeCode: router?.query?.storeCode,
                  });
                  if (addStoreData) {
                    switchStore(router.query.storeCode, details.customerId);
                  }
                  if (router.query?.storeCode?.length && isStoreValid) {
                    router.push(`/customer/home`);
                  }
                } else {
                  const { data: isStoreValid } = await storedatatoRedux(
                    data?.defaultStoreCode,
                    userData[0],
                    userData[1],
                    details
                  );
                  if (isStoreValid) {
                    router.push(`/customer/home`);
                  }
                }
                // if (
                //   data?.defaultStoreCode?.length ||
                //   router?.query?.storeCode?.length
                // ) {
                //   router.push(`/customer/home`);
                // }
              }
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
            A Multi Ecommerce Store
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
            iconName={showPassword ? "visible" : "visibleOff"}
            type={showPassword ? "text" : "password"}
            label="Password"
            placeholder="Password"
            inputlabelshrink
            className="mt-3"
            onIconClick={() => {
              setShowPassword(!showPassword);
            }}
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
