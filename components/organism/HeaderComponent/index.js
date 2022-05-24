import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import logo from "../../../public/assets/favicon.png";
import styles from "./HeaderComponent.module.css";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ProfileComponent from "../../atoms/ProfileComponent";

const HeaderComponent = () => {
  return (
    <Box
      className={`${styles.container} shadow-sm bg-white`}
      sx={{ position: "sticky" }}
    >
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <Image src={logo} alt="" width="100px" height="40px" />
        </Grid>
        <Grid item xs={3} className={styles.subcontainer}>
          <ConfirmationNumberOutlinedIcon />
          <EmailOutlinedIcon />
          <NotificationsIcon />
          <ProfileComponent />
        </Grid>
      </Grid>
    </Box>
  );
};

export default HeaderComponent;
