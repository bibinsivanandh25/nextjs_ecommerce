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
import { useState, useEffect } from "react";
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
import { store } from "store";
import { clearUser, storeUserInfo } from "features/userSlice";
import axios from "axios";
import { useDispatch } from "react-redux";
import styles from "./Login.module.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({
    user: "",
    password: "",
  });
  const [errorObj, setErrorObj] = useState({ user: "", password: "" });
  const route = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearUser());
  }, []);

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
      errObj.password =
        "should contain atleast 8 characters and at most 16 characters";
      flag = true;
    } else if (!validationRegex.upperCase.test(formValues.password)) {
      errObj.password = "should contain atleast one uppercase alphabet ";
      flag = true;
    } else if (!validationRegex.lowerCase.test(formValues.password)) {
      errObj.password = "should contain atleast one lowercase alphabet ";
      flag = true;
    } else if (!validationRegex.specialChar.test(formValues.password)) {
      errObj.password = "should includes '@#$'";
      flag = true;
    }
    setErrorObj({ ...errObj });
    return flag;
  };

  const handleSubmit = async () => {
    const flag = validateCredentials();
    if (!flag) {
      const payload = {
        userName: formValues.user,
        password: formValues.password,
        userType: "ADMIN",
      };
      await axios
        .post(`${process.env.DOMAIN}auth/authenticate`, payload)
        .catch((err) => {
          const errRes = err.response.data?.message;
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
              callbackUrl: `/admin/dashboard`,
              redirect: false,
            });
            if (res?.error) {
              toastify("Invalid credentials", "error");
              return null;
            }
            // await storedatatoRedux(
            //   userData[0],
            //   decoded.roles[0],
            //   data.data.staffDetails
            // );
            store.dispatch(
              storeUserInfo({
                emailId: data.data.adminRegistrationPojo.emailId,
                firstName: data.data.adminRegistrationPojo.firstName,
                lastName: data.data.adminRegistrationPojo.lastName,
                profileImageUrl: null,
                userId: data.data.adminRegistrationPojo.adminRegistrationId,
                storeCode: null,
                isAddressSaved: null,
                role: data.data.adminRegistrationPojo.designation,
                storeName: null,
                adminCapabilities:
                  data.data.adminRegistrationPojo.adminCapabilities
                    .adminCapabilityList,
              })
            );
            if (
              data.data.adminRegistrationPojo.adminCapabilities
                .adminCapabilityList === null
            ) {
              toastify(
                "Please contact your administrator since your account has been suspended.",
                "error"
              );
            }
            route.push(`/admin/dashboard`);
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
      <Paper elevation={24}>
        <div className="p-5 " style={{ width: "450px" }}>
          <div className="d-flex justify-content-center">
            <Image src={assetsJson.logo} alt="logo" width={300} height={120} />
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
              <Grid item md={12} className="w-100 d-flex flex-row-reverse">
                <Link
                  href={{
                    pathname: `/auth/forgotpassword`,
                    query: {
                      role: "ADMIN",
                    },
                  }}
                  as="/auth/forgotpassword"
                  passHref
                >
                  <span className="color-orange fs-12 cursor-pointer fw-bold">
                    Forgot password?
                  </span>
                </Link>
              </Grid>
              <Grid item sm={12}>
                <div className="d-flex flex-column align-items-center justify-content-center w-100">
                  <ButtonComponent
                    label="Sign In"
                    onBtnClick={handleSubmit}
                    muiProps="w-100px"
                  />
                </div>
              </Grid>
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
    if (role === "ADMIN") {
      return {
        redirect: { destination: "/admin/dashboard" },
      };
    }
    return {
      redirect: { destination: "/reseller/dashboard" },
    };
  }

  return {
    props: {
      providers: (await getProviders(context)) || null,
      csrfToken: (await getCsrfToken(context)) || null,
    },
  };
}
