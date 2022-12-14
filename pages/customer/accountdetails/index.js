/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Box, Grid, Typography } from "@mui/material";
import MyProfile from "components/customer/accountdetails/myprofile";
import BankDetails from "components/forms/supplier/myaccount/bankdetails";
import ChangePassword from "components/forms/supplier/myaccount/changepassword";
import PickUpAddress from "components/forms/supplier/myaccount/pickupaddress";
import React, { useState } from "react";

const MyAccount = () => {
  const tabList = ["My profile", "Bank Details", "Change Password", "Address"];

  const [selectedMenu, setSelectedMenu] = useState(0);
  const getSelectedMenuItem = () => {
    if (selectedMenu === 0) {
      return <MyProfile />;
    }
    if (selectedMenu === 1) return <BankDetails />;
    if (selectedMenu === 2) return <ChangePassword usertype="CUSTOMER" />;
    if (selectedMenu === 3) return <PickUpAddress pageType="customer" />;
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
