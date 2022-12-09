import * as React from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";
import { ArrowDropDown } from "@mui/icons-material";
import { useEffect } from "react";

export default function MenuwithArrow({
  children,
  subHeader = "Favourite",
  Header = "List",
  onOpen = () => {},
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    if (!(e.target.id === "store")) {
      setAnchorEl(null);
    }
  };
  useEffect(() => {
    if (open) {
      onOpen();
    }
  }, [open]);
  return (
    <div className="cursor-pointer">
      <Box onClick={handleClick} className="cursor-pointer">
        <Typography className="h-5 cursor-pointer">{subHeader}</Typography>
        <div className="d-flex cursor-pointer align-items-center">
          <Typography className="fw-bold fs-14 cursor-pointer">
            {Header}
          </Typography>
          <ArrowDropDown className="fw-bold h-3 cursor-pointer" />
        </div>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,

            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 100,
              width: 15,
              height: 20,
              bgcolor: "background.paper",
              transform: "translateY(-40%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "center", vertical: "top" }}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      >
        {children}
      </Menu>
    </div>
  );
}
