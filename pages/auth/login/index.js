/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
/* eslint-disable consistent-return */
// import { providers, signIn, getSession, csrfToken } from "next-auth/client";
import ButtonComponent from "components/atoms/ButtonComponent";
import InputBox from "components/atoms/InputBoxComponent";
import atob from "atob";
import {
  getCsrfToken,
  getProviders,
  getSession,
  signIn,
} from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import { assetsJson } from "public/assets";
import {
  // Box,
  Grid,
  // IconButton,
  // Menu,
  // MenuItem,
  Paper,
  Typography,
} from "@mui/material";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Link from "next/link";
import toastify from "services/utils/toastUtils";
import validateMessage from "constants/validateMessages";
import { useRouter } from "next/router";
import validationRegex from "services/utils/regexUtils";
import { getSupplierDetailsById } from "services/supplier";
import { store } from "store";
import { storeUserInfo } from "features/userSlice";
import axios from "axios";
import styles from "./Login.module.css";

const Login = () => {
  // const [selectedIndex, setSelectedIndex] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({
    user: "",
    password: "",
  });
  const [errorObj, setErrorObj] = useState({ user: "", password: "" });
  const route = useRouter();

  const validateCredentials = () => {
    let flag = false;
    const errObj = { user: "", password: "" };
    if (formValues.user === "") {
      errObj.user = validateMessage.field_required;
      flag = true;
    } else if (validationRegex.email.test(formValues.user)) {
      if (formValues.user.length > 255) {
        errObj.user = "Email Id should not be greater than 255 characters";
        flag = true;
      }
    } else if (
      !validationRegex.mobile.test(formValues.user) &&
      !validationRegex.email.test(formValues.user)
    ) {
      errObj.user = "Invalid Mobile No/Email";
      flag = true;
    }
    if (formValues.password === "") {
      errObj.password = validateMessage.field_required;
      flag = true;
    } else if (
      !(formValues.password.length >= 8 && formValues.password.length <= 16)
    ) {
      errObj.password = validateMessage.password;
      flag = true;
    } else if (!validationRegex.upperCase.test(formValues.password)) {
      errObj.password = validateMessage.password;
      flag = true;
    } else if (!validationRegex.lowerCase.test(formValues.password)) {
      errObj.password = validateMessage.password;
      flag = true;
    } else if (!validationRegex.specialChar.test(formValues.password)) {
      errObj.password = validateMessage.password;
      flag = true;
    }
    setErrorObj({ ...errObj });
    return flag;
  };

  const storedatatoRedux = async (id, role, staffDetails) => {
    const { data, err } = await getSupplierDetailsById(
      role === "SUPPLIER" ? id : staffDetails.supplierId
    );

    if (!err) {
      const supplierDetails =
        role === "SUPPLIER"
          ? {
              emailId: data?.emailId,
              firstName: data?.firstName,
              lastName: data?.lastName,
              profileImageUrl: data?.profileImageUrl,
              supplierId: data?.supplierId,
              storeCode: data?.supplierStoreInfo?.supplierStoreCode || "",
              isAddressSaved: data?.userAddressDetails.length,
              role,
              storeName: data?.supplierStoreInfo?.supplierStoreName || "",
            }
          : {
              emailId: data?.emailId,
              firstName: data?.firstName,
              lastName: data?.lastName,
              profileImageUrl: data?.profileImageUrl,
              supplierId: data?.supplierId,
              storeCode: data?.supplierStoreInfo.supplierStoreCode,
              isAddressSaved: data?.userAddressDetails.length,
              role,
              staffDetails: {
                email: staffDetails?.emailId,
                firstName: staffDetails?.firstName,
                lastName: staffDetails?.lastName,
                mobileNumber: staffDetails?.mobileNumber,
                staffId: staffDetails?.staffId,
                staffCapabilityList: staffDetails?.staffCapabilityList,
              },
              storeName: data?.supplierStoreInfo?.supplierStoreName,
            };
      store.dispatch(storeUserInfo(supplierDetails));
    }
  };

  const handleSubmit = async () => {
    const flag = validateCredentials();
    if (!flag) {
      const payload = {
        userName: formValues.user,
        password: formValues.password,
        userType: "SUPPLIER",
      };
      await axios
        .post(`${process.env.DOMAIN}auth/authenticate`, payload)
        .catch((err) => {
          const errRes = err?.response?.data?.message;
          toastify(errRes, "error");
        })
        .then(async (data) => {
          if (data) {
            const { token } = data?.data;
            const decoded = JSON.parse(atob(token.split(".")[1].toString()));
            const userData = decoded.sub.split(",");
            const res = await signIn("credentials", {
              id: userData[0],
              email: userData[1],
              role: decoded.roles[0],
              token,
              callbackUrl: `/supplier/dashboard`,
              redirect: false,
            });
            if (res?.error) {
              toastify("Invalid credentials", "error");
              return null;
            }
            await storedatatoRedux(
              userData[0],
              decoded.roles[0],
              data.data.staffDetails
            );
            route.push(`/supplier/dashboard`);
          }
        })
        .catch((err) => {
          throw err;
        });
    }
  };

  return (
    <div
      className={`d-flex justify-content-center align-items-center ${styles.container}`}
      style={{
        backgroundImage: `url(${assetsJson.login_background})`,
      }}
    >
      {/* <SelectComponent
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      /> */}
      <Paper elevation={24}>
        <div className="p-5 " style={{ width: "450px" }}>
          <div
            className="d-flex justify-content-center"
            style={{ minHeight: "120px" }}
          >
            <Image
              src={assetsJson.logo}
              layout="fixed"
              alt="logo"
              width={300}
              height={120}
            />
          </div>
          <Typography className="text-center fw-bold">
            A Multi Ecommerce Store
          </Typography>
          <div className="mt-3">
            <Grid container spacing={2}>
              <Grid item sm={12}>
                <InputBox
                  value={formValues.user}
                  label="E-mail Id / Mobile No."
                  id="E-mail Id / Mobile No."
                  onInputChange={(e) => {
                    setFormValues((prev) => ({
                      ...prev,
                      user: e.target.value,
                    }));
                  }}
                  onEnter={handleSubmit}
                  className="w-100"
                  placeholder="Enter your E-mail Id / Mobile No."
                  InputProps={{
                    style: {
                      fontSize: "14px",
                      borderColor: "#fff",
                    },
                  }}
                  inputlabelshrink
                  helperText={errorObj.user}
                  error={errorObj.user !== ""}
                  textInputProps={{ className: styles.inputAutoFillColor }}
                />
              </Grid>
              <Grid item sm={12}>
                <InputBox
                  value={formValues.password}
                  label="Password"
                  onEnter={handleSubmit}
                  onInputChange={(e) => {
                    setFormValues((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }));
                  }}
                  className="w-100"
                  placeholder="Enter password"
                  InputProps={{
                    style: { fontSize: "14px" },
                  }}
                  inputlabelshrink
                  type={showPassword ? "text" : "password"}
                  helperText={errorObj.password}
                  error={errorObj.password !== ""}
                  iconName={showPassword ? "visible" : "visibleOff"}
                  onIconClick={() => {
                    setShowPassword(!showPassword);
                  }}
                  textInputProps={{ className: styles.inputAutoFillColor }}
                />
              </Grid>
              <Grid item md={12} className="w-100">
                <div className="d-flex justify-content-between">
                  <Link href="/auth/login/otplogin" passHref>
                    <span className="color-orange fs-12 cursor-pointer fw-bold">
                      Login with OTP
                    </span>
                  </Link>
                  <Link
                    href={{
                      pathname: `/auth/forgotpassword`,
                      query: {
                        role: "SUPPLIER",
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
              <Grid item sm={12}>
                <div className="d-flex flex-column align-items-center justify-content-center w-100">
                  <ButtonComponent
                    label="Login"
                    onBtnClick={handleSubmit}
                    muiProps="w-100px"
                  />
                  <div>
                    <span className="fs-11 fw-bold mx-2">
                      Don&apos;t have an account ?
                    </span>
                    <Link href="/auth/supplier/registration" passHref>
                      <span className="color-orange fw-bold fs-11 cursor-pointer">
                        Register
                      </span>
                    </Link>
                  </div>
                </div>
              </Grid>
              <div
                className="d-flex justify-content-center w-100"
                style={{ marginLeft: "20px" }}
              >
                <ButtonComponent
                  label="Know your Profit here"
                  textColor="primary"
                  muiProps={styles.profitLink}
                  variant="undefined"
                  onBtnClick={() => {
                    route.push("/auth/profitability");
                  }}
                />
              </div>
            </Grid>
          </div>
        </div>
      </Paper>
    </div>
  );
};
export default Login;
export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });
  if (session) {
    const { role } = session.user;
    if (role === "SUPPLIER") {
      return {
        redirect: { destination: "/supplier/dashboard" },
      };
    }
    return {
      redirect: { destination: "/reseller/dashboard" },
    };
  }

  return {
    props: {
      providers: await getProviders(context),
      csrfToken: (await getCsrfToken(context)) || null,
    },
  };
}
