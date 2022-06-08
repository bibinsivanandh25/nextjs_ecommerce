import { Grid } from "@mui/material";
import BankDetails from "components/forms/supplier/myaccount/bankdetails";
import ChangePassword from "components/forms/supplier/myaccount/changepassword";
import MyProfile from "components/forms/supplier/myaccount/myprofile";
import PickUpAddress from "components/forms/supplier/myaccount/pickupaddress";
import React, { useEffect, useState } from "react";

const MyAccount = () => {
  const tabList = [
    "My profile",
    "Bank Details",
    "Change Password",
    "Pickup Address",
  ];

  const [selectedMenu, setSelectedMenu] = useState(0);
  const getSelectedMenuItem = () => {
    if (selectedMenu === 0) {
      return <MyProfile />;
    }
    if (selectedMenu === 1) return <BankDetails />;
    if (selectedMenu === 2) return <ChangePassword />;
    if (selectedMenu === 3) return <PickUpAddress />;
  };
  return (
    <>
      <Grid container className="list-unstyled  fs-14 mb-2">
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
    </>
  );
};
export default MyAccount;
