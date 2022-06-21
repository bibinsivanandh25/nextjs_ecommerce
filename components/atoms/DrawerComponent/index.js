import { Box, Drawer, Typography } from "@mui/material";
import React from "react";

const DrawerComponent = ({
  children,
  anchor = "right",
  classes = {},
  onClose = () => {},
  open = true,
  sx = {},
  variant = "temporary",
  ModalProps = {},
  elevation = 16,
  hideBackdrop = false,
  modalTitle = "",
  width = "500px",
}) => {
  return (
    <Drawer
      anchor={anchor}
      classes={classes}
      onClose={onClose}
      open={open}
      sx={sx}
      variant={variant}
      ModalProps={ModalProps}
      elevation={elevation}
      hideBackdrop={hideBackdrop}
    >
      <Box className="m-1" sx={{ width }}>
        <Box sx={{ borderBottom: "1px solid #707070" }}>
          <Typography className="fs-26 fw-600 color-black">
            {modalTitle}
          </Typography>
        </Box>
        {children}
      </Box>
    </Drawer>
  );
};

export default DrawerComponent;
