import { Box, Drawer, Typography } from "@mui/material";

const DrawerComponent = ({
  children,
  anchor = "right",
  classes = {},
  onClose = () => {},
  sx = {},
  variant = "temporary",
  ModalProps = {},
  elevation = 16,
  hideBackdrop = false,
  modalTitle = "",
  width = "500px",
  headerBorder = true,
  openDrawer,
}) => {
  return (
    <Drawer
      open={openDrawer}
      anchor={anchor}
      classes={classes}
      onClose={onClose}
      sx={sx}
      variant={variant}
      ModalProps={ModalProps}
      elevation={elevation}
      hideBackdrop={hideBackdrop}
      transitionDuration={{
        appear: 1000,
        exit: 500,
        enter: 1000,
      }}
    >
      <Box className="m-1" sx={{ width }}>
        <Box sx={{ borderBottom: headerBorder ? "1px solid #707070" : "" }}>
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
