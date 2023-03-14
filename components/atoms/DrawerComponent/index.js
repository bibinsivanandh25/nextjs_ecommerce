import { Box, Drawer, Typography } from "@mui/material";
import CustomIcon from "services/iconUtils";

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
  enter = 500,
  closeIconClick = () => {},
  showCloseIcon = false,
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
        appear: 500,
        exit: 500,
        enter,
      }}
    >
      <Box className="m-1" sx={{ width }}>
        <Box
          sx={{
            borderBottom: headerBorder ? "1px solid #707070" : "",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography className="fs-20 fw-600 color-black">
            {modalTitle}
          </Typography>
          {showCloseIcon && (
            <CustomIcon
              title="Close"
              type="close"
              onIconClick={closeIconClick}
            />
          )}
        </Box>
        {children}
      </Box>
    </Drawer>
  );
};

export default DrawerComponent;
