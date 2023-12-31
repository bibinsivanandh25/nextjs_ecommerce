import { Box, Grid, Tooltip } from "@mui/material";
// import { Box } from "@mui/system";
import Image from "next/image";
import { assetsJson } from "public/assets";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
// import { useEffect, useState } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useRouter } from "next/router";
import ProfileComponent from "../../atoms/ProfileComponent";
import styles from "./HeaderComponent.module.css";

const HeaderComponent = () => {
  const router = useRouter();
  return (
    <Box
      className={`${styles.container} shadow-sm bg-white`}
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: "1100",
        width: "100vw",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <Image src={assetsJson.logo} alt="" width="120px" height="40px" />
        </Grid>
        <Grid item xs={3} className={styles.subcontainer}>
          {router.pathname.startsWith("/supplier") && (
            <>
              <Tooltip title="Coupons">
                <ConfirmationNumberOutlinedIcon
                  className="cursor-pointer"
                  onClick={() => {
                    router.push("/supplier/coupons/mrmrscartcoupons");
                  }}
                />
              </Tooltip>
              <Tooltip title="Help and Support">
                <EmailOutlinedIcon
                  className="cursor-pointer"
                  onClick={() => {
                    router.push("/supplier/helpandsupport");
                  }}
                />
              </Tooltip>

              <Tooltip title="News and Notifications">
                <NotificationsIcon
                  className="cursor-pointer"
                  onClick={() => {
                    router.push("/supplier/newsandnotifications");
                  }}
                />
              </Tooltip>
              <ProfileComponent className="cursor-pointer" />
            </>
          )}
          {router.pathname.startsWith("/admin") && (
            <>
              <ConfirmationNumberOutlinedIcon
                className="cursor-pointer"
                // onClick={() => {
                //   router.push("/reseller/");
                // }}
              />
              <EmailOutlinedIcon
                className="cursor-pointer"
                onClick={() => {
                  router.push("/reseller/helpandsupport");
                }}
              />

              <NotificationsIcon
                className="cursor-pointer"
                onClick={() => {
                  router.push("/reseller/newsandnotifications/news");
                }}
              />
              <ProfileComponent className="cursor-pointer" />
            </>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default HeaderComponent;
