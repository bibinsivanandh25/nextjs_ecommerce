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
import axios from "axios";
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
import serviceUtil from "services/utils";
import styles from "./Login.module.css";
import { storeSupplierInfo } from "./utils";

// const options = ["Supplier", "Reseller", "Customer"];

// const SelectComponent = ({
//   selectedIndex = 1,
//   setSelectedIndex = () => {},
// }) => {
//   const [anchorEl, setAnchorEl] = useState(false);
//   const open = anchorEl;
//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(false);
//   };
//   const handleMenuItemClick = (index) => {
//     setSelectedIndex(index);
//     setAnchorEl(false);
//   };
//   return (
//     <div style={{ position: "fixed", top: "0", left: "0" }}>
//       <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
//         <IconButton
//           onClick={handleClick}
//           size="small"
//           aria-controls={open ? "user-menu" : undefined}
//           aria-haspopup="true"
//           aria-expanded={open ? "true" : undefined}
//           sx={{ pl: 0, pt: 0 }}
//         >
//           <div style={{ background: "white" }}>
//             <ArrowDropDownIcon />
//           </div>
//           <span className="color-white mx-2 fs-16">Choose your profile</span>
//         </IconButton>
//       </Box>
//       <Menu
//         anchorEl={anchorEl}
//         id="user-menu"
//         open={open}
//         onClose={handleClose}
//         onClick={handleClose}
//         PaperProps={{
//           elevation: 0,
//           sx: {
//             overflow: "visible",
//             filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
//             mt: 1.5,
//             "& .MuiAvatar-root": {
//               width: 32,
//               height: 32,
//               ml: -0.5,
//               mr: 1,
//             },
//             "&:before": {
//               content: '""',
//               display: "block",
//               position: "absolute",
//               top: 0,
//               left: 14,
//               width: 10,
//               height: 10,
//               bgcolor: "background.paper",
//               transform: "translateY(-50%) rotate(45deg)",
//               zIndex: 0,
//             },
//           },
//         }}
//         transformOrigin={{ horizontal: "left", vertical: "top" }}
//         anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
//       >
//         {options.map((item, index) => {
//           return (
//             <MenuItem
//               key={item}
//               // disabled={index === 0}
//               selected={index === selectedIndex}
//               onClick={() => handleMenuItemClick(index)}
//             >
//               {item}
//             </MenuItem>
//           );
//         })}
//       </Menu>
//     </div>
//   );
// };

const Login = () => {
  // const [selectedIndex, setSelectedIndex] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({
    user: "",
    password: "",
  });
  const [errorObj, setErrorObj] = useState({ user: "", password: "" });
  const route = useRouter();

  // useEffect(() => {
  //   setFormValues({
  //     user: "",
  //     password: "",
  //   });
  // }, [selectedIndex]);

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

  // const getBasePath = (role) => {
  //   switch (role) {
  //     case "Supplier":
  //       return "supplier";
  //     case "Reseller":
  //       return "reseller";
  //     default:
  //       return "customer";
  //   }
  // };

  const handleSubmit = async () => {
    const flag = validateCredentials();
    // await axios.post("authenticate", {
    //   userName: formValues.user,
    //   password: formValues.password,
    // });

    // loginCall({
    //   userName: formValues.user,
    //   password: formValues.password,
    //   userType: options[selectedIndex],
    // });
    // if (data && !data?.data?.error) {
    //   return { id: 20, name: "suhil", email: "suhil@gmail.com" };
    // } else if (errRes) {
    //   toastify("wrong credentials", "error");
    // }

    if (!flag) {
      const payload = {
        userName: formValues.user,
        password: formValues.password,
        userType: "SUPPLIER",
      };
      await serviceUtil
        .post(`auth/authenticate`, payload)
        .catch((err) => {
          // const errRes = err.response.data?.message;
          // toastify(errRes, "error");
          console.log(err);
        })
        .then(async (data) => {
          if (data) {
            const { token } = data.data;
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
            storeSupplierInfo(userData[0]);
            route.push(`/supplier/dashboard`);
          }
        })
        .catch((err) => {
          console.log(err, "err");
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
        <div className="p-5 " style={{ width: "450px", height: "450px" }}>
          <div className="d-flex justify-content-center">
            <Image src={assetsJson.logo} alt="" width={300} height={120} />
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
                  <Link href="/auth/forgotpassword" passHref>
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
      csrfToken: await getCsrfToken(context),
    },
  };
}
