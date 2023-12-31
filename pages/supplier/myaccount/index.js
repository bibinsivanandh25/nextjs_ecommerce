/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Grid } from "@mui/material";
import BankDetails from "components/forms/supplier/myaccount/bankdetails";
import ChangePassword from "components/forms/supplier/myaccount/changepassword";
import MyProfile from "components/forms/supplier/myaccount/myprofile";
import PickUpAddress from "components/forms/supplier/myaccount/pickupaddress";
import React, { useState } from "react";
import StoreSettings from "@/forms/supplier/myaccount/storesettings";

const MyAccount = () => {
  const tabList = [
    "My profile",
    "Bank Details",
    "Change Password",
    "Pickup Address",
    "Store Settings",
  ];

  const [selectedMenu, setSelectedMenu] = useState(0);
  // eslint-disable-next-line consistent-return
  const getSelectedMenuItem = () => {
    if (selectedMenu === 0) {
      return <MyProfile />;
    }
    if (selectedMenu === 1) return <BankDetails />;
    if (selectedMenu === 2) return <ChangePassword />;
    if (selectedMenu === 3) return <PickUpAddress pageType="supplier" />;
    if (selectedMenu === 4) return <StoreSettings />;
  };
  return (
    <div className="mxh-80vh mnh-80vh">
      <Grid container className="list-unstyled fs-14 py-3">
        {tabList.map((ele, ind) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <Grid item xs={2} key={ind}>
              {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
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
    </div>
  );
};
export default MyAccount;
