import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";

const MyAccount = () => {
  let tabList = [
    "My profile",
    "Bank Details",
    "Change Password",
    "Pickup Address",
  ];

  const [selectedMenu, setSelectedMenu] = useState(0);
  const getSelectedMenuItem = () => {
    if (selectedMenu === 0) {
      return "My profile";
    } else if (selectedMenu === 1) return "Bank Details";
    else if (selectedMenu === 2) return "Change Password";
    else if (selectedMenu === 3) return "Pickup Address";
  };
  return (
    <>
      <Grid container className="list-unstyled  fs-14 ">
        {tabList.map((ele, ind) => {
          return (
            <Grid
              item
              xs={2}
              className={`cursor-pointer fw-bold   ${
                selectedMenu === ind ? "active-tab" : ""
              }`}
              onClick={() => setSelectedMenu(ind)}
            >
              {ele}
            </Grid>
          );
        })}
      </Grid>
      {getSelectedMenuItem()}
    </>
  );
};
export default MyAccount;
