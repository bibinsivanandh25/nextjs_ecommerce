/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import PickUpAddress from "@/forms/customer/address/pickupaddress";
import BankDetails from "@/forms/customer/accountDetails/bankdetails";
import { Box, Grid, Typography } from "@mui/material";
import MyProfile from "components/customer/accountdetails/myprofile";
import ChangePassword from "components/forms/supplier/myaccount/changepassword";
// import Profile from "components/forms/supplier/myaccount/Profile";
import React, { useState } from "react";
import Profile from "@/forms/supplier/myaccount/profiles";

const MyAccount = () => {
  const tabList = [
    "My Account",
    "Bank Details",
    "Change Password",
    "Address",
    "Profile",
  ];

  const [selectedMenu, setSelectedMenu] = useState(0);
  const getSelectedMenuItem = () => {
    if (selectedMenu === 0) {
      return <MyProfile />;
    }
    if (selectedMenu === 1) return <BankDetails />;
    if (selectedMenu === 2) return <ChangePassword usertype="CUSTOMER" />;
    if (selectedMenu === 3) return <PickUpAddress pageType="customer" />;
    if (selectedMenu === 4) return <Profile pageType="customer" />;
    return null;
  };
  return (
    <Box className="mx-3">
      <Typography className="fw-bold">Account Details</Typography>
      <Grid container className="list-unstyled fs-14 py-3 ms-3">
        {tabList.map((ele, ind) => {
          return (
            <Grid item xs={2} key={ind}>
              <span
                onClick={() => setSelectedMenu(ind)}
                className={`cursor-pointer fw-bold   ${
                  selectedMenu === ind ? "active-tab" : ""
                }`}
              >
                {ele}
              </span>
            </Grid>
          );
        })}
      </Grid>
      {getSelectedMenuItem()}
    </Box>
  );
};
export default MyAccount;
