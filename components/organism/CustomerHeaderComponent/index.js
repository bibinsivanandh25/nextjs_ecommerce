/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Avatar, Box, MenuItem, Typography } from "@mui/material";
import { FaGooglePlay, FaApple, FaStore } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import Image from "next/image";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CustomIcon from "services/iconUtils";
import { useState, useEffect } from "react";
import { ArrowForward } from "@mui/icons-material";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import { assetsJson } from "public/assets";
import SimpleDropdownComponent from "@/atoms/SimpleDropdownComponent";
import MenuwithArrow from "@/atoms/MenuwithArrow";
import CheckBoxComponent from "@/atoms/CheckboxComponent";
import ButtonComponent from "@/atoms/ButtonComponent";
import SwitchProfile from "@/forms/customer/switchprofile";
import ModalComponent from "@/atoms/ModalComponent";
import InputBox from "@/atoms/InputBoxComponent";
import ChooseAddress from "@/forms/customer/address/ChooseAddress";
import CustomDrawer from "@/atoms/CustomDrawer";
import StoreList from "@/forms/customer/storeList";
import { useDispatch, useSelector } from "react-redux";
import { clearCustomerSlice, storeUserInfo } from "features/customerSlice";
import { getAllMainCategories } from "services/customer/sidebar";
import {
  addStore,
  deleteStore,
  getRecentStoreList,
  getStoreListOfCustomer,
  switchStore,
} from "services/admin/storeList";
// import { FaArrowRight } from "react-icons/fa";
import {
  clearUser,
  storeUserInfo as storeInfoUserSlice,
} from "features/userSlice";
import toastify from "services/utils/toastUtils";
import { getStoreByStoreCode } from "services/customer/ShopNow";
import FavoriteList from "@/forms/customer/favoriteList";
import { makeStyles } from "@mui/styles";
import ExploreStores from "@/forms/customer/exploreStores";

const Header = () => {
  const session = useSession();
  const route = useRouter();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [showSwitchProfile, setShowSwitchProfile] = useState(false);
  const [showSelectAddress, setShowSelectAddress] = useState(false);
  const [showFavoriteList, setShowFavoriteList] = useState(false);
  const customer = useSelector((state) => state.customer);
  const [open, setOpen] = useState(false);
  const [stores, setStores] = useState([]);
  const [showStoreModal, setShowStoreModal] = useState(false);
  const [newStore, setNewStore] = useState("");
  const dispatch = useDispatch();
  const [openExplore, setOpenExplore] = useState(false);
  const {
    supplierStoreName,
    supplierStoreLogo,
    profileImg,
    userId,
    customerName,
    profileName,
    addressDetails,
    bgcolor,
  } = useSelector((state) => state.customer);

  const [storeDetails, setstoreDetails] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [storeCode, setStoreCode] = useState("");
  const [categoriesList, setCategoriesList] = useState([]);
  const [category, setCategory] = useState({});

  const recentStore = async () => {
    const { data } = await getRecentStoreList(userId);
    if (data) {
      setStores(
        data.map((item) => ({
          id: item.customerStoreId,
          label: item.supplierStoreName,
          checked: item.defaultStore,
          favourite: item.favourite,
          storeCode: item.storeCode,
        }))
      );
    }
  };

  const getName = () => {
    let label = "";
    const name = profileName ?? customerName ?? "";
    if (name !== "") {
      name.split(" ").forEach((item) => {
        label += item[0];
      });
    }
    // console.log(label, );
    return label.toUpperCase();
  };

  const getMainCategoriesList = async () => {
    const { data } = await getAllMainCategories();
    if (data) {
      const temp = data?.map((ele) => {
        return {
          id: ele.mainCategoryId,
          label: ele.mainCategoryName,
          value: ele.mainCategoryName,
        };
      });
      temp.push({
        id: "All",
        label: "All Categories",
        value: "All Categories",
      });
      setCategoriesList([...temp]);
    }
  };

  useEffect(() => {
    getMainCategoriesList();
  }, []);

  useEffect(() => {
    if (
      session?.status === "authenticated" &&
      session?.data?.user?.role === "CUSTOMER"
    ) {
      setIsSignedIn(true);
    } else {
      setIsSignedIn(false);
    }
  }, [session]);

  const handleRouting = (path) => {
    if (isSignedIn) {
      route.push(path);
    } else {
      route.replace("/auth/customer/signin");
    }
  };

  const handleSwitchStore = async (storecode) => {
    const { data, err } = await switchStore(storecode, userId);
    if (data) {
      const { data: storeData, err: storeErr } = await getStoreByStoreCode(
        storecode
      );
      if (storeData) {
        dispatch(
          storeUserInfo({
            ...customer,
            supplierStoreLogo: storeData.supplierStoreLogo,
            supplierStoreName: storeData.supplierStoreName,
            storeCode: storeData.supplierStoreCode,
            storeThemes: storeData.storeThemes,
            shopDescription: storeData.shopDescription ?? "",
            shopDescriptionImageUrl: storeData.shopDescriptionImageUrl,
            addStoreFlag: false,
            supplierId: storeData.supplierId,
          })
        );
        setStoreCode("");
        setstoreDetails(null);
        dispatch(
          storeInfoUserSlice({
            supplierId: storeData.supplierId,
          })
        );
      } else if (storeErr) {
        toastify(storeErr?.response?.data?.message, "error");
      }
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };
  const switchStoreWOLogin = async (storecode) => {
    const { data: storeData, err: storeErr } = await getStoreByStoreCode(
      storecode
    );
    if (storeData) {
      dispatch(
        storeUserInfo({
          ...customer,
          supplierStoreLogo: storeData.supplierStoreLogo,
          supplierStoreName: storeData.supplierStoreName,
          storeCode: storeData.supplierStoreCode,
          storeThemes: storeData.storeThemes,
          shopDescription: storeData.shopDescription ?? "",
          shopDescriptionImageUrl: storeData.shopDescriptionImageUrl,
          addStoreFlag: false,
          supplierId: storeData.supplierId,
        })
      );
      setStoreCode("");
      setstoreDetails(null);
      dispatch(
        storeInfoUserSlice({
          supplierId: storeData.supplierId,
        })
      );
    } else if (storeErr) {
      toastify(storeErr?.response?.data?.message, "error");
    }
  };

  const deleteStores = async (id) => {
    const { data, err, message } = await deleteStore(id, userId);
    if (data === null) {
      // getAllStores();
      toastify(message, "success");
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };

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
                checkBoxClick={() => {
                  setShowConfirmModal(true);
                  setstoreDetails(ele);
                }}
              />
              <CustomIcon
                type="delete"
                onIconClick={() => {
                  deleteStores(ele.id);
                }}
              />
            </MenuItem>
          );
        })}
        {!stores.length && (
          <Typography className="fs-14 color-gray text-center p-2">
            No Stores found
          </Typography>
        )}
        <Box className="d-flex justify-content-end pe-4 ">
          <Typography
            className="color-orange fs-14 cursor-pointer"
            onClick={() => {
              setOpen(true);
            }}
          >
            See More
          </Typography>
        </Box>
      </>
    );
  };

  const addStoreToCustomer = async (code) => {
    const storeList = await getStoreListOfCustomer(userId);
    if (storeList.data && storeList.data.includes(code)) {
      await handleSwitchStore(code);
    } else {
      const { data, err } = await addStore({
        customerId: userId,
        storeListId: null,
        storeListName: null,
        storeType: "SUPPLIER",
        storeCode: code,
      });
      if (data) {
        await handleSwitchStore(code);
      } else if (err) {
        toastify(err?.response?.data?.message, "error");
      }
    }
  };

  const useStyles = makeStyles((theme) => ({
    newStoreTheme: {
      [theme.breakpoints.down("1400")]: {
        width: "100px",
      },
      [theme.breakpoints.up("1400")]: {
        width: "150px",
      },
    },
    storeName: {
      [theme.breakpoints.up("1080")]: {
        maxWidth: "150px !important",
        overflowWrap: "anywhere",
      },
    },
    productSearch: {
      [theme.breakpoints.up("1300")]: {
        width: userId === "" ? "700px !important" : "500px !important",
      },
      [theme.breakpoints.down("1300")]: {
        width: "30%",
      },
    },
  }));
  const styles = useStyles();

  return (
    <div
      className="position-fixed top-0 left-0 h-5 mnw-100vh"
      style={{
        zIndex: 1000,
      }}
    >
      <div className="d-flex justify-content-between align-items-center bg-white text-white px-2 py-1">
        <div className="d-flex align-items-center">
          <p
            className=" cursor-pointer d-flex align-items-center color-black"
            onClick={() => setShowSelectAddress(true)}
          >
            <LocationOnIcon className="color-black" />
            {(!isSignedIn && !addressDetails?.name) ||
            !addressDetails?.cityDistrictTown ? (
              "Select Your Address"
            ) : (
              <div className="ms-2">
                <Typography className="fs-10 color-black">
                  {addressDetails?.name}
                </Typography>
                <Typography className="fs-12 color-black">
                  {addressDetails?.cityDistrictTown},{addressDetails?.pinCode}
                </Typography>
              </div>
            )}
          </p>
        </div>
        <Image
          src={assetsJson.logo}
          alt=""
          width="100px"
          height="30px"
          style={{
            zIndex: 1000,
          }}
        />
        <div className="d-flex align-items-center">
          <div
            className="px-4"
            onClick={() => handleRouting("/customer/helpcenter")}
          >
            <Typography className="h-5 fw-bold ps-1 color-black">
              Help Center
            </Typography>
            {/* <Typography className="h-5 cursor-pointer">Center</Typography> */}
          </div>
          <Typography
            onClick={() => {
              setOpenExplore(!openExplore);
            }}
            className="color-black mx-2 me-3 h-5 fw-bold cursor-pointer"
          >
            {/* <FaArrowRight
              onClick={() => {
                setOpenExplore(true);
              }}
              className="fs-16 ms-1 cursor-pointer"
            /> */}
            Explore Stores
          </Typography>
          <div className="d-flex justify-content-center align-items-center">
            <FaApple className="fs-4" color="black" />
            <FaGooglePlay className="fs-5 ms-1 color-black" />
          </div>
          <div className="ps-1">
            <Typography className="h-5 color-black">Download App</Typography>
            <Typography className="fs-12 color-black">
              Play & win Prices/Discounts
            </Typography>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center px-2 py-2 bg-orange">
        <div
          className="cursor-pointer d-flex justify-content-between align-items-center "
          onClick={() => {
            route.push("/customer/home");
          }}
        >
          <Box className="pe-2">
            <Image
              src={supplierStoreLogo ?? ""}
              layout="fixed"
              height={30}
              width={80}
            />
          </Box>
          <Typography
            className={`${styles.storeName} h-5 fw-bold cursor-pointer mxw-100px color-white`}
          >
            {supplierStoreName &&
              (supplierStoreName.length <= 40
                ? supplierStoreName
                : `${supplierStoreName.substr(0, 38)}...`)}
          </Typography>
        </div>
        <div
          className={`${styles.productSearch} d-flex align-items-center rounded w-30p`}
        >
          <div
            className="rounded"
            style={{
              width: "14rem",
            }}
          >
            <SimpleDropdownComponent
              size="small"
              fullWidth
              className="bg-white rounded"
              list={categoriesList}
              value={category}
              freeSolo
              placeholder="Category"
              onDropdownSelect={(value) => {
                if (value) {
                  setCategory(value);
                } else setCategory({});
              }}
            />
          </div>
          <div
            className="d-flex bg-white ms-1 rounded w-100 justify-content-between "
            style={{
              border: "0.5px solid #c0ad9d",
            }}
          >
            <input
              className="w-100 p-2 rounded bg-white inputPlaceHolder"
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
            className={`${styles.newStoreTheme} p-2 bg-white rounded inputPlaceHolder`}
            placeholder="New Store"
            style={{
              background: "#fae1cc",
              outline: "none",
              border: "none",
            }}
            onChange={(e) => {
              setStoreCode(e.target.value.toUpperCase());
            }}
            value={storeCode}
          />
          <Box
            sx={{
              m: "0.08rem",
            }}
            className={` d-flex justify-content-center p-1 rounded align-items-center cursor-pointer ${
              storeCode !== "" ? "" : "invisible"
            }`}
            onClick={() => {
              setShowConfirmModal(true);
            }}
          >
            <ArrowForward className="color-orange fs-4" />
          </Box>
        </div>
        <div className="cursor-pointer">
          {userId === "" ? (
            <></>
          ) : (
            <MenuwithArrow
              subHeader=""
              Header="Recent Stores"
              onOpen={() => {
                if (userId === "") {
                  route.push("/auth/customer/signin");
                  return;
                }
                recentStore();
              }}
            >
              <MenuItem>
                <div className="d-flex align-items-center">
                  <input
                    id="store"
                    style={{
                      outline: "none",
                    }}
                    placeholder="Search store"
                  />
                </div>
              </MenuItem>
              {getStores()}
            </MenuwithArrow>
          )}
        </div>
        {userId === "" ? (
          <></>
        ) : (
          <>
            <Image
              src="https://dev-mrmrscart-assets.s3.ap-south-1.amazonaws.com/asset/no_products_found.svg"
              width={40}
              height={40}
              layout="fixed"
              className="fs-2 cursor-pointer position-relative "
              onClick={() => {
                if (userId === "") {
                  route.push("/auth/customer/signin");
                  return;
                }
                setShowFavoriteList(true);
                setOpen(true);
              }}
            />
            <div
              className="cursor-pointer"
              onClick={() => {
                if (userId === "") {
                  route.push("/auth/customer/signin");
                }
              }}
            >
              <Typography className="h-5 cursor-pointer color-white">
                Returns
              </Typography>
              <Typography className="fs-14 fw-bold cursor-pointer color-white">
                & Orders
              </Typography>
            </div>
            <FiShoppingCart
              className="fs-2 cursor-pointer color-white"
              onClick={() => {
                if (userId === "") {
                  route.push("/auth/customer/signin");
                  return;
                }
                handleRouting("/customer/cart");
              }}
            />
          </>
        )}
        <div className="cursor-pointer position-ralative pe-3">
          <MenuwithArrow
            arrowPosition="end"
            subHeader=""
            Header={
              userId === "" ? (
                "Hello Customer, sign In"
              ) : (
                <>
                  {profileImg ? (
                    <Image
                      width={35}
                      height={35}
                      src={profileImg}
                      className="rounded-circle "
                    />
                  ) : (
                    <Avatar
                      sx={{
                        bgcolor,
                      }}
                      className="shadow"
                    >
                      {getName()}
                    </Avatar>
                  )}
                </>
              )
            }
          >
            {!isSignedIn ? (
              <div className="px-2">
                <div className="d-flex justify-content-center w-100 my-2">
                  <ButtonComponent
                    label="Sign In"
                    muiProps="px-5"
                    onBtnClick={() => {
                      route.replace({
                        pathname: "/auth/customer/signin",
                        query: {
                          storeCode: customer.storeCode,
                        },
                      });
                    }}
                  />
                </div>
                <div className="d-flex justify-content-between align-items-center ">
                  <Typography className="h-5 cursor-pointer me-2">
                    New Customer?
                  </Typography>
                  <Typography
                    className="color-orange h-5 cursor-pointer"
                    onClick={() => {
                      route.push("/auth/customer/register");
                    }}
                  >
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
                      dispatch(clearUser());
                      dispatch(clearCustomerSlice());
                      signOut({ callbackUrl: "/auth/customer" });
                    }}
                  >
                    Sign Out
                  </Typography>
                </Box>
                <MenuItem
                  onClick={() => {
                    handleRouting("/customer/accountdetails");
                  }}
                >
                  <Typography className="h-5 cursor-pointer">
                    Account Details
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleRouting("/customer/orders");
                  }}
                >
                  <Typography className="h-5 cursor-pointer">
                    Your Orders
                  </Typography>
                </MenuItem>
                <MenuItem onClick={() => handleRouting("/customer/wishlist")}>
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
                  onClick={() => handleRouting("/customer/helpandsupport")}
                >
                  <Typography className="h-5 cursor-pointer">
                    Help & Support
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => handleRouting("/customer/mynotification")}
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
          titleClassName="fw-600 fs-16 color-orange"
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
      {showSelectAddress && (
        <ChooseAddress
          showModal={showSelectAddress}
          setShowModal={setShowSelectAddress}
        />
      )}
      <CustomDrawer
        open={open}
        position="right"
        handleClose={() => {
          setOpen(false);
          setShowFavoriteList(false);
        }}
        title={showFavoriteList ? "Favorite Stores" : "Store List"}
        titleClassName="color-orange fs-16"
      >
        {showFavoriteList ? (
          <FavoriteList
            close={() => {
              setOpen(false);
              setShowFavoriteList(false);
            }}
          />
        ) : (
          <StoreList
            close={() => {
              setOpen(false);
            }}
          />
        )}
      </CustomDrawer>
      <ModalComponent
        open={showConfirmModal}
        showHeader={false}
        saveBtnText="Confirm"
        ClearBtnText="Cancel"
        onSaveBtnClick={() => {
          if (storeDetails) {
            handleSwitchStore(storeDetails.storeCode);
            setShowConfirmModal(false);
          } else if (userId === "") {
            switchStoreWOLogin(storeCode);
            setShowConfirmModal(false);
          } else {
            setShowConfirmModal(false);
            addStoreToCustomer(storeCode);
          }
        }}
        onClearBtnClick={() => {
          setstoreDetails(null);
          setShowConfirmModal(false);
        }}
        ModalWidth={400}
      >
        <Typography className="fs-16 w-100 text-center fw-bold my-4">
          Are you sure you want to switch store?
        </Typography>
      </ModalComponent>
      <CustomDrawer
        open={openExplore}
        position="right"
        handleClose={() => {
          setOpenExplore(false);
        }}
        title="Explore Stores"
        titleClassName="color-orange"
      >
        <ExploreStores
          handleStoreSelection={(storeData) => {
            if (userId === "") {
              switchStoreWOLogin(storeData.storeCode);
            } else {
              addStoreToCustomer(storeData.storeCode);
            }
            switchStoreWOLogin(storeData.storeCode);
            setOpenExplore(false);
          }}
        />
      </CustomDrawer>
    </div>
  );
};
export default Header;
