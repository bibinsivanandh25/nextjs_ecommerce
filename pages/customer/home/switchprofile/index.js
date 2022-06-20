import React from "react";
import { Box, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DoneIcon from "@mui/icons-material/Done";
import ModalComponent from "@/atoms/ModalComponent";
import styles from "./switchprofile.module.css";

const SwitchProfile = () => {
  return (
    <ModalComponent showHeader={false} showFooter={false} open>
      <Box className="pt-3 pb-3">
        <Box className="d-flex justify-content-between align-items-center pb-2">
          <Typography variant="h6" className="fw-bold ps-3">
            Switch Profile
          </Typography>
          <Typography className="color-blue pe-3 fs-18">Signout</Typography>
        </Box>
        <Box sx={{ borderBottom: "0.5px solid black" }}>{null}</Box>
      </Box>
      <Box>
        <Box className="d-flex align-items-center">
          <Box className="me-2">
            <DoneIcon className="color-dark-green" fontSize="large" />
          </Box>
          <Avatar
            src="https://www.facebeautyscience.com/wp-content/uploads/2020/04/face-beauty-skin-face2-proc.jpg"
            className={`${styles.avtarSize} cursor-pointer`}
          />
          <Box className="ms-2">
            <Typography className="fw-bold">Karthikeyan</Typography>
            <Typography className="fs-14">karthikeyan@gmail.com</Typography>
          </Box>
        </Box>
      </Box>
      <Box className="d-flex align-items-center pt-2 pb-3">
        <Box className={`${styles.hide} me-2`}>
          <DoneIcon fontSize="large" />
        </Box>
        <Avatar className={styles.avtarSize}>
          <AddRoundedIcon className={`${styles.iconCss} cursor-pointer`} />
        </Avatar>
        <Typography className="fw-bold ms-2">Add Account</Typography>
      </Box>
    </ModalComponent>
  );
};

export default SwitchProfile;
