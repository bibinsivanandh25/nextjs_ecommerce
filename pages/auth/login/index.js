// import { providers, signIn, getSession, csrfToken } from "next-auth/client";
import styles from "./Login.module.css";
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
  Typography,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import logo from "../../../public/assets/favicon.png";

const SelectComponent = () => {
  const [anchorEl, setAnchorEl] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const open = anchorEl;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenuItemClick = (index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };
  const options = ["Supplier", "Reseller", "Customer"];
  return (
    <div style={{ position: "fixed", top: "0", left: "0" }}>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <IconButton
          onClick={handleClick}
          size="small"
          aria-controls={open ? "user-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <div style={{ background: "white" }}>
            <ArrowDropDownIcon />
          </div>
          <span className="color-white">Choose your profile</span>
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
              disabled={index === 0}
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

const Login = (prop) => {
  const [formValues, setFormValues] = useState({
    user: null,
    password: null,
  });
  const handleSubmit = () => {
    signIn("credentials", {
      username: formValues.user,
      password: formValues.password,
    });
  };
  return (
    <div
      className={`d-flex justify-content-center align-items-center ${styles.container}`}
    >
      <SelectComponent />
      <Card sx={{ background: "rgba(1,1,1,0.3)" }}>
        <div className="w-400px p-5 ">
          <Image src={logo} style={{ width: "100%", height: "50px" }} />
          <Typography varient="h1" className="text-center color-white">
            A Multi Ecommerce Store
          </Typography>
          <Typography varient="h4" className="text-center mt-3 color-white">
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
                    style: { fontSize: "14px", color: "#fff" },
                  }}
                />
              </Grid>
              <Grid item sm={12}>
                <InputBox
                  value={formValues.password}
                  label="password"
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
                />
              </Grid>
              <Grid item md={12}>
                <div className="d-flex justify-content-between">
                  <span className="color-orange fs-12 cursor-pointer">
                    Login with OTP
                  </span>
                  <span className="color-orange fs-12 cursor-pointer">
                    Forgot password
                  </span>
                </div>
              </Grid>
              <Grid item sm={12}>
                <div className="d-flex justify-content-center w-100">
                  <ButtonComponent label="Submit" onBtnClick={handleSubmit} />
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </Card>
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
