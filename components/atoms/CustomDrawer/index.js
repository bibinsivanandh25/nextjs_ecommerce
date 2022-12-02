import { Box, SwipeableDrawer } from "@mui/material";
import CustomIcon from "services/iconUtils";

const CustomDrawer = ({
  position = "right",
  open = false,
  handleClose = () => {},
  widthClass = "",
  children = null,
}) => {
  return (
    <SwipeableDrawer anchor={position} open={open} onClose={handleClose}>
      <div className="d-flex justify-content-end">
        <CustomIcon type="close" className="h-3" onIconClick={handleClose} />
      </div>
      <Box className={`customDrawerWidth ${widthClass}`}>{children}</Box>
    </SwipeableDrawer>
  );
};
export default CustomDrawer;
