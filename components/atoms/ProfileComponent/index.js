import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { signOut } from "next-auth/react";
import React from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { storeUserInfo } from "features/userSlice";
import { clearProduct } from "features/productsSlice";
import { store } from "store";

const ProfileComponent = () => {
  const [anchorEl, setAnchorEl] = React.useState(false);
  const router = useRouter();
  const open = anchorEl;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <div>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Profile">
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              className="cursor-pointer"
              sx={{ width: 32, height: 32 }}
              src={user.profileImageUrl ? user.profileImageUrl : null}
            >
              {user.profileImageUrl ? "" : user.firstName.toUpperCase()[0]}
            </Avatar>
          </IconButton>
        </Tooltip>
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
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {["SUPPLIER", "STAFF"].includes(user.role) && (
          <MenuItem onClick={() => router.push("/supplier/myaccount")}>
            My account
          </MenuItem>
        )}
        <MenuItem
          onClick={() => {
            window.localStorage.setItem("moduleType", null);
            signOut({
              callbackUrl: ["SUPPLIER", "STAFF"].includes(user.role)
                ? "/auth/login"
                : "/auth/admin/login",
            });
            const { allowedPath } = store.getState().user;

            dispatch(
              storeUserInfo({
                emailId: "",
                firstName: "",
                lastName: "",
                profileImageUrl: "",
                supplierId: "",
                storeCode: "",
                isAddressSaved: false,
                unlockedTools: [],
                storeName: "",
                allowedPath,
              })
            );
            dispatch(clearProduct());
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

export default ProfileComponent;
