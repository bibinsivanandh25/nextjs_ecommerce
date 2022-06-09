// import { providers, signIn, getSession, csrfToken } from "next-auth/client";
import ButtonComponent from "components/atoms/ButtonComponent";
import InputBox from "components/atoms/InputBoxComponent";
import {
  getCsrfToken,
  getProviders,
  getSession,
  signIn,
} from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import { Box } from "@mui/system";
import {
  Avatar,
  Card,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useRouter } from "next/router";
import Link from "next/link";
import { loginCall } from "services";
import axios from "axios";
import validateMessage from "constants/validateMessages";
import validationRegex from "services/utils/regexUtils";
import logo from "../../../public/assets/favicon.png";
import styles from "./Login.module.css";

const options = ["Supplier", "Reseller", "Customer"];

const SelectComponent = ({
  selectedIndex = 1,
  setSelectedIndex = () => {},
}) => {
  const [anchorEl, setAnchorEl] = useState(false);
  const open = anchorEl;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(false);
  };
  const handleMenuItemClick = (index) => {
    setSelectedIndex(index);
    setAnchorEl(false);
  };
  return (
    <div style={{ position: "fixed", top: "0", left: "0" }}>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <IconButton
          onClick={handleClick}
          size="small"
          aria-controls={open ? "user-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          sx={{ pl: 0, pt: 0 }}
        >
          <div style={{ background: "white" }}>
            <ArrowDropDownIcon />
          </div>
          <span className="color-white mx-2 fs-16">Choose your profile</span>
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="user-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              left: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "left", vertical: "top" }}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      >
        {options.map((item, index) => {
          return (
            <MenuItem
              key={item}
              // disabled={index === 0}
              selected={index === selectedIndex}
              onClick={() => handleMenuItemClick(index)}
            >
              {item}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};

const Login = () => {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [formValues, setFormValues] = useState({
    user: "",
    password: "",
  });
  const [errorObj, setErrorObj] = useState({ user: "", password: "" });

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
    } else if (!validationRegex.mobile.test(formValues.user)) {
      errObj.user = validateMessage.mobile;
      flag = true;
    } else if (!validationRegex.email.test(formValues.user)) {
      errObj.user = validateMessage.email;
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

  const getBasePath = (role) => {
    switch (role) {
      case "Supplier":
        return "supplier";
      case "Reseller":
        return "reseller";
      default:
        return "customer";
    }
  };

  const handleSubmit = async () => {
    const flag = validateCredentials();
    // await axios.post("authenticate", {
    //   userName: formValues.user,
    //   password: formValues.password,
    // });

    // loginCall({
    //   userName: formValues.user,
    //   password: formValues.password,
    // });
    // if (data && !data?.data?.error) {
    //   return { id: 20, name: "suhil", email: "suhil@gmail.com" };
    // } else if (errRes) {
    //   toastify("wrong credentials", "error");
    // }

    if (!flag) {
      signIn("credentials", {
        username: formValues.user,
        password: formValues.password,
        role: options[selectedIndex],
        roleId: selectedIndex,
        callbackUrl: `/${getBasePath(options[selectedIndex])}/dashboard`,
      });
    }
  };

  return (
    <div
      className={`d-flex justify-content-center align-items-center ${styles.container}`}
    >
      <SelectComponent
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />
      <Paper elevation={6} sx={{ background: "rgba(1,1,1,0.4)" }}>
        <div className="w-400px p-5 ">
          <Image src={logo} style={{ width: "100%", height: "50px" }} alt="" />
          <Typography varient="h1" className="text-center color-white">
            A Multi Ecommerce Store
          </Typography>
          <Typography
            varient="h4"
            className="text-center mt-3 color-white fs-14"
          >
            Choose your profile
          </Typography>
          {/* <div className="d-flex flex-column justify-content-center">
            <InputBox
              value={formValues.username}
              label="user name"
              onInputChange={(e) => {
                setFormValues((prev) => ({
                  ...prev,
                  username: e.target.value,
                }));
              }}
            />
            <InputBox
              value={formValues.password}
              label="password"
              onInputChange={(e) => {
                setFormValues((prev) => ({
                  ...prev,
                  password: e.target.value,
                }));
              }}
            />
            <ButtonComponent
              label="Submit"
              onBtnClick={handleSubmit}
              muiProps="w-30"
            />
          </div> */}
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
                  className="w-100"
                  placeholder="Enter your E-mail Id / Mobile No."
                  InputProps={{
                    style: {
                      fontSize: "14px",
                      color: "#fff",
                      borderColor: "#fff",
                    },
                  }}
                  inputlabelshrink
                  helperText={errorObj.user}
                  error={errorObj.user !== ""}
                />
              </Grid>
              <Grid item sm={12}>
                <InputBox
                  value={formValues.password}
                  label="Password"
                  onInputChange={(e) => {
                    setFormValues((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }));
                  }}
                  className="w-100"
                  placeholder="Enter password"
                  InputProps={{
                    style: { fontSize: "14px", color: "#fff" },
                  }}
                  inputlabelshrink
                  type="password"
                  helperText={errorObj.password}
                  error={errorObj.password !== ""}
                />
              </Grid>
              <Grid item md={12}>
                <div className="d-flex justify-content-between">
                  <Link href="/auth/login/otplogin" passHref>
                    <span className="color-orange fs-12 cursor-pointer">
                      Login with OTP
                    </span>
                  </Link>
                  <Link href="/auth/forgotpassword" passHref>
                    <span className="color-orange fs-12 cursor-pointer">
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
                    <span className="fs-11 color-white mx-2">
                      Don&apos;t have an account?
                    </span>
                    <Link href="/auth/supplier/registration" passHref>
                      <span className="color-orange fs-11 cursor-pointer">
                        Register
                      </span>
                    </Link>
                  </div>
                </div>
              </Grid>
              <Grid item sm={12} container justifyContent="center">
                <ButtonComponent
                  label="Know your Profit here"
                  muiProps={styles.profitLink}
                  variant="undefined"
                />
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
    return {
      redirect: { destination: "/" },
    };
  }

  return {
    props: {
      providers: await getProviders(context),
      csrfToken: await getCsrfToken(context),
    },
  };
}
