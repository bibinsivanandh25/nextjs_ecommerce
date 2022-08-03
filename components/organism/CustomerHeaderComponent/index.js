/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Box, MenuItem, Typography } from "@mui/material";
import { FaGooglePlay, FaApple, FaStore } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CustomIcon from "services/iconUtils";
import { useState } from "react";
import { Add, ArrowForward } from "@mui/icons-material";
import { useRouter } from "next/router";
import SimpleDropdownComponent from "@/atoms/SimpleDropdownComponent";
import MenuwithArrow from "@/atoms/MenuwithArrow";
import CheckBoxComponent from "@/atoms/CheckboxComponent";
import ButtonComponent from "@/atoms/ButtonComponent";
import SwitchProfile from "@/forms/customer/switchprofile";
import ModalComponent from "@/atoms/ModalComponent";
import InputBox from "@/atoms/InputBoxComponent";
import ChooseAddress from "@/forms/customer/address/ChooseAddress";

const Header = () => {
  const route = useRouter();
  const [isSignedIn] = useState(true);
  const [showSwitchProfile, setShowSwitchProfile] = useState(false);
  const [showSelectAddress, setShowSelectAddress] = useState(false);
  const [stores, setStores] = useState([
    {
      id: 1,
      label: "Store Name1",
      checked: false,
    },
    {
      id: 2,
      label: "Store Name2",
      checked: false,
    },
    {
      id: 3,
      label: "Store Name3",
      checked: false,
    },
    {
      id: 4,
      label: "Store Name4",
      checked: false,
    },
    {
      id: 5,
      label: "Store Name5",
      checked: false,
    },
  ]);
  const [showStoreModal, setShowStoreModal] = useState(false);
  const [newStore, setNewStore] = useState("");

  const getStores = () => {
    return (
      <>
        {stores.map((ele) => {
          return (
            <MenuItem
              className="d-flex justify-content-between py-0 px-3"
              key={ele.id}
            >
              <CheckBoxComponent
                checkedcolor="#54ce3c"
                iconType="circled"
                showIcon
                id={ele.id}
                label={
                  <Typography className="h-5 cursor-pointer">
                    {ele.label}
                  </Typography>
                }
                isChecked={ele.checked}
                checkBoxClick={(id) => {
                  const arr = [...stores];
                  setStores((pre) => {
                    if (pre.id == id) {
                      return (pre.checked = true);
                    }
                    return (pre.checked = false);
                  });
                  arr.map((item) => {
                    if (item.id == id) {
                      return (item.checked = true);
                    }
                    return (item.checked = false);
                  });
                  setStores([...arr]);
                }}
              />
              <CustomIcon type="delete" />
            </MenuItem>
          );
        })}
        <Box className="d-flex justify-content-end pe-4 ">
          <Typography
            className="color-orange fs-14 cursor-pointer"
            onClick={() => {
              setShowStoreModal(true);
            }}
          >
            Add new store <Add className="fs-16" />
          </Typography>
        </Box>
      </>
    );
  };
  return (
    <div
      className="position-fixed top-0 left-0 h-5 mnw-100vh"
      style={{
        zIndex: 1000,
      }}
    >
      <div className="d-flex justify-content-between align-items-center bg-orange text-white px-3">
        <div className="d-flex align-items-center">
          <p className="h-5">Hello Customer</p>
          <p
            className="ps-2 cursor-pointer d-flex align-items-center"
            onClick={() => setShowSelectAddress(true)}
          >
            <LocationOnIcon />
            Select Your Address
          </p>
        </div>
        <div>MrMrsCart Logo</div>
        <div className="d-flex align-items-center">
          <div
            className="px-4"
            onClick={() => route.push("/customer/helpcenter")}
          >
            <Typography className="h-5 fw-bold ps-1">Help Center</Typography>
            {/* <Typography className="h-5 cursor-pointer">Center</Typography> */}
          </div>
          <div>
            <FaApple className="fs-4" color="black" />
            <FaGooglePlay className="fs-5" />
          </div>
          <div className="ps-1">
            <Typography className="h-5">Download App</Typography>
            <Typography className="fs-12">
              Play & win Prices/Discounts
            </Typography>
          </div>
        </div>
      </div>
      <div
        className="d-flex justify-content-between align-items-center px-3 py-1"
        style={{
          background: "#fae1cc",
        }}
      >
        <div
          className="cursor-pointer"
          onClick={() => {
            route.push("/customer/home");
          }}
        >
          <Typography className="fs-5 cursor-pointer">
            LOGO Store Name
          </Typography>
        </div>
        <div className="d-flex align-items-center rounded w-30p">
          <div
            className="rounded"
            style={{
              width: "14rem",
            }}
          >
            <SimpleDropdownComponent
              size="small"
              removeRadius
              fullWidth
              className="bg-white rounded"
            />
          </div>
          <div
            className="d-flex bg-white rounded-end w-100 justify-content-between "
            style={{
              border: "0.5px solid #c0ad9d",
              borderLeft: "none",
            }}
          >
            <input
              className="p-2 bg-white inputPlaceHolder"
              placeholder="Search"
              style={{
                background: "#fae1cc",
                outline: "none",
                border: "none",
              }}
            />
            <Box
              sx={{
                m: "0.08rem",
              }}
              onClick={() => {
                route.push("/customer/searchedproduct");
              }}
              className="bg-orange d-flex  p-1 rounded align-items-center cursor-pointer"
            >
              <SearchOutlinedIcon className="text-white fs-4" />
            </Box>
          </div>
        </div>
        <div
          className="d-flex bg-white rounded"
          style={{
            border: "0.5px solid #c0ad9d",
          }}
        >
          <input
            className="p-2 bg-white rounded inputPlaceHolder"
            placeholder="Enter store code"
            style={{
              background: "#fae1cc",
              outline: "none",
              border: "none",
            }}
          />
          <Box
            sx={{
              m: "0.08rem",
            }}
            className=" d-flex justify-content-center p-1 rounded align-items-center cursor-pointer"
          >
            <ArrowForward className="color-orange fs-4" />
          </Box>
        </div>
        <FaStore className="fs-2 cursor-pointer" />
        <div className="cursor-pointer">
          <MenuwithArrow subHeader="Store" Header="List">
            <MenuItem>
              <input
                id="store"
                style={{
                  outline: "none",
                }}
              />
            </MenuItem>
            {getStores()}
          </MenuwithArrow>
        </div>
        <div className="cursor-pointer">
          <Typography className="h-5 cursor-pointer">Returns</Typography>
          <Typography className="fs-14 fw-bold cursor-pointer">
            & Orders
          </Typography>
        </div>
        <FiShoppingCart
          className="fs-2 cursor-pointer"
          onClick={() => route.push("/customer/cart")}
        />
        <div className="cursor-pointer position-ralative">
          <MenuwithArrow subHeader="Hello, sign In" Header="Account & Lists">
            {!isSignedIn ? (
              <div className="px-2">
                <div className="d-flex justify-content-center w-100 my-2">
                  <ButtonComponent
                    label="Sign In"
                    muiProps="px-5"
                    onBtnClick={() => {
                      route.replace("/auth/customer/signin");
                    }}
                  />
                </div>
                <div className="d-flex justify-content-between align-items-center ">
                  <Typography className="h-5 cursor-pointer me-2">
                    New Customer?
                  </Typography>
                  <Typography className="color-orange h-5 cursor-pointer">
                    SignUp here
                  </Typography>
                </div>
              </div>
            ) : (
              <Box className="px-3">
                <Box className="d-flex justify-content-between px-3">
                  <Typography className="fw-bold fs-14">
                    Your Account
                  </Typography>
                  <Typography
                    className="color-orange fs-14"
                    onClick={() => {
                      route.push("/auth/login");
                    }}
                  >
                    Sign Out
                  </Typography>
                </Box>
                <MenuItem
                  onClick={() => {
                    route.push("/customer/accountdetails");
                  }}
                >
                  <Typography className="h-5 cursor-pointer">
                    Account Details
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    route.push("/customer/orders");
                  }}
                >
                  <Typography className="h-5 cursor-pointer">
                    Your Orders
                  </Typography>
                </MenuItem>
                <MenuItem onClick={() => route.push("/customer/wishlist")}>
                  <Typography className="h-5 cursor-pointer">
                    Your Wishlist
                  </Typography>
                </MenuItem>
                <MenuItem onClick={() => setShowSwitchProfile(true)}>
                  <Typography className="h-5 cursor-pointer">
                    Switch Profiles
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => route.push("/customer/helpandsupport")}
                >
                  <Typography className="h-5 cursor-pointer">
                    Help & Support
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => route.push("/customer/mynotification")}
                >
                  <Typography className="h-5 cursor-pointer">
                    Notification center
                  </Typography>
                </MenuItem>
                <Box className="px-3">
                  <Typography className="h-5 cursor-pointer">
                    Sell with us at low commission
                  </Typography>
                  <Typography className="color-orange h-5 cursor-pointer">
                    Register here
                  </Typography>
                </Box>
                <Box className="px-3">
                  <Typography className="h-5 cursor-pointer">
                    Want to Earn without Investment
                  </Typography>
                  <Typography className="color-orange cursor-pointer h-5">
                    Register here
                  </Typography>
                </Box>
              </Box>
            )}
          </MenuwithArrow>
        </div>
      </div>
      <SwitchProfile
        showSwitchProfile={showSwitchProfile}
        setShowSwitchProfile={setShowSwitchProfile}
      />
      {showStoreModal && (
        <ModalComponent
          onCloseIconClick={() => {
            setShowStoreModal(false);
          }}
          open={showStoreModal}
          ModalTitle="Add New Store"
          titleClassName="fw-600 fs-16"
          footerClassName="justify-content-end"
          onSaveBtnClick={() => {
            setShowStoreModal(false);
          }}
          onClearBtnClick={() => {
            setNewStore("");
          }}
        >
          <Box className="py-3">
            <Typography className="mb-1">New Store Name</Typography>
            <InputBox
              value={newStore}
              onInputChange={(e) => {
                setNewStore(e.target.value);
              }}
            />
          </Box>
        </ModalComponent>
      )}
      <ChooseAddress
        showModal={showSelectAddress}
        setShowModal={setShowSelectAddress}
      />
    </div>
  );
};
export default Header;
