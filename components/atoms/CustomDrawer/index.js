import { Box, SwipeableDrawer, Typography } from "@mui/material";
import CustomIcon from "services/iconUtils";

const CustomDrawer = ({
  position = "right",
  open = false,
  handleClose = () => {},
  widthClass = "",
  children = null,
  title = "",
  titleClassName = "",
}) => {
  return (
    <SwipeableDrawer anchor={position} open={open} onClose={handleClose}>
      <div
        className={`d-flex p-2 ${
          title === "" ? " justify-content-end" : " justify-content-between"
        }`}
      >
        {title !== "" && (
          <Typography className={`fs-20 fw-bold ${titleClassName}`}>
            {title}
          </Typography>
        )}
        <CustomIcon type="close" className="h-3" onIconClick={handleClose} />
      </div>
      <Box className={`customDrawerWidth ${widthClass}`}>{children}</Box>
    </SwipeableDrawer>
  );
};
export default CustomDrawer;
