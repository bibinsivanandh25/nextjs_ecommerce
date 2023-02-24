/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
import { Box, Paper, Typography } from "@mui/material";
import Image from "next/image";
import { motion } from "framer-motion";
import CustomIcon from "services/iconUtils";
import { useRef, useState, useEffect } from "react";
import {
  deleteStore,
  deleteStoreList,
  favouriteStore,
  getAllStoresOfStoreListByStoreId,
  getStoreList,
  removeFromStoreList,
  switchStore,
} from "services/admin/storeList";
import { useDispatch, useSelector } from "react-redux";
import toastify from "services/utils/toastUtils";
import { getStoreByStoreCode } from "services/customer/ShopNow";
import { storeUserInfo } from "features/customerSlice";
import { storeUserInfo as storeInfoUserSlice } from "features/userSlice";
import ModalComponent from "@/atoms/ModalComponent";

const StoresTab = ({ switchTabs = () => {}, close = () => {}, searchText }) => {
  const [storelist, setStoreList] = useState([]);
  const [stores, setStores] = useState([]);
  const [selectedStoreList, setSelectedStoreList] = useState(null);
  const { userId } = useSelector((state) => state.customer);
  const dispatch = useDispatch();
  const customer = useSelector((state) => state.customer);
  const [storeDetails, setstoreDetails] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const observer = useRef();

  const deleteStoreCategory = async (storeListId) => {
    const { res, message, err } = await deleteStoreList(storeListId);
    if (res) {
      toastify(message, "success");
      getStoresList();
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };

  const getStoresList = async () => {
    const { data } = await getStoreList(userId, "");
    if (data) {
      if (data.data) {
        setStoreList(
          data.data.map((item) => ({
            label: item.customerStoreListName ?? "--",
            id: item.customerStoreListId,
            defaultStore: item.defaultStore,
          }))
        );
      } else {
        setStoreList([]);
      }
    }
  };
  const getAllStoreOfStoreList = async (id) => {
    const { data, err } = await getAllStoresOfStoreListByStoreId(id);
    if (data) {
      setStores(
        data.map((item) => ({
          id: item.customerStoreId,
          label: item.supplierStoreName ?? "--",
          storeCode: item.storeCode,
          defaultStore: item.defaultStore,
          favourite: item.favourite,
          storeLogo: item.storeLogo || "",
          storeListId: item.storeListId,
        }))
      );
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };

  const makefavouriteStore = async (id) => {
    const { data, err, message } = await favouriteStore(id);
    if (data === null) {
      getAllStoreOfStoreList(selectedStoreList.id);
      toastify(message, "success");
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };
  const deleteStores = async (storeId, id) => {
    const { data, err, message } = await removeFromStoreList(
      storeId,
      userId,
      id
    );
    if (data) {
      getAllStoreOfStoreList(selectedStoreList.id);
      toastify(message, "success");
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };

  useEffect(() => {
    getStoresList();
  }, []);

  const handleSwitchStore = async () => {
    const { data, err } = await switchStore(storeDetails.storeCode, userId);
    if (data) {
      const { data: storeData, err: storeErr } = await getStoreByStoreCode(
        storeDetails.storeCode
      );
      if (storeData) {
        close();
        dispatch(
          storeUserInfo({
            ...customer,
            supplierStoreLogo: storeData.supplierStoreLogo,
            supplierStoreName: storeData.supplierStoreName,
            storeCode: storeData.supplierStoreCode,
            storeThemes: storeData.storeTheme,
            shopDescription: storeData.shopDescription ?? "",
            shopDescriptionImageUrl: storeData.shopDescriptionImageUrl,
            addStoreFlag: false,
            supplierId: storeData.supplierId,
            supplieremailId: storeData.emailId,
            suppliermobileNumber: storeData.mobileNumber,
          })
        );
        dispatch(
          storeInfoUserSlice({
            supplierId: storeData.supplierId,
          })
        );
        setShowConfirmModal(false);
      } else if (storeErr) {
        toastify(storeErr?.response?.data?.message, "error");
      }
    } else if (err) {
      setShowConfirmModal(false);
      toastify(err?.response?.data?.message, "error");
    }
  };

  return selectedStoreList === null ? (
    <>
      <Box
        sx={{ maxHeight: "calc(100vh - 200px)" }}
        className="w-100 p-2 overflow-y-scroll overflow-x-hide d-flex flex-column align-items-center mb-3"
      >
        {storelist.length ? (
          storelist.map((item) => {
            return (
              <motion.div
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.5 },
                }}
              >
                <Paper
                  key={item.id}
                  onClick={() => {
                    getAllStoreOfStoreList(item.id);
                    setSelectedStoreList(item);
                  }}
                  className="p-2 my-2 w-300px cursor-pointer d-flex justify-content-between"
                >
                  <Typography>{item.label}</Typography>
                  <CustomIcon
                    showColorOnHover={false}
                    type="delete"
                    className="color-light-blue fs-20"
                    onIconClick={(e) => {
                      e.stopPropagation();
                      deleteStoreCategory(item.id);
                    }}
                  />
                </Paper>
              </motion.div>
            );
          })
        ) : (
          <Typography className="fs-14 color-gray align-self-center">
            Store categories not found
          </Typography>
        )}
      </Box>
    </>
  ) : (
    <Box className="p-2 w-100">
      <Typography
        className="d-inline theme_color fs-12 cursor-pointer"
        onClick={() => {
          setSelectedStoreList(null);
          setStores([]);
        }}
      >
        {"< "} Back
      </Typography>
      <Box className="w-100 d-flex justify-content-between align-items-center">
        <Typography className=" theme_color fs-16 fw-bold">
          {selectedStoreList.label}
        </Typography>
        <Typography
          className="ms-2 cursor-pointer color-light-blue fs-12"
          onClick={() => {
            switchTabs("Add Store", {
              storeCode: "",
              storeListName: {
                title: selectedStoreList.label,
                id: selectedStoreList.id,
              },
            });
          }}
        >
          <CustomIcon
            showColorOnHover={false}
            type="add"
            color="color-light-blue "
            className="color-light-blue fs-14"
          />
          Add
        </Typography>
      </Box>
      <Box
        className="overflow-y-scroll mt-2 overflow-x-hide"
        sx={{
          maxHeight: "calc(100vh - 200px)",
        }}
      >
        {stores.map((item, index) => {
          // console.log(item, "item");
          return (
            <motion.div
              // ref={list.length - 1 === index ? lastStore : null}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.5 },
              }}
              // whileTap={{ scale: 0.9 }}
            >
              <Paper
                className={`w-80p rounded mx-auto d-flex justify-content-between m-2 ${
                  item.defaultStore ? "border border-primary border-2" : ""
                }`}
                sx={{ height: "80px" }}
                elevation={4}
                onClick={() => {
                  // handleSwitchStore(item);
                  if (item.defaultStore) return;
                  setstoreDetails(item);
                  // setShowConfirmModal(true);
                }}
              >
                <Box elevation={4}>
                  <Image
                    className="rounded"
                    src={item.storeLogo}
                    width={70}
                    height={80}
                  />
                </Box>
                <Box className="d-flex flex-column ms-1 p-2">
                  <Typography className="">{item.label}</Typography>
                  <Typography className="fs-12">{item.storeCode}</Typography>
                </Box>
                <Box className="d-flex flex-column">
                  {item.favourite ? (
                    <CustomIcon
                      type="heart"
                      className="fs-20 m-1 cursor-pointer theme_color"
                      onIconClick={(e) => {
                        e.preventDefault();
                        makefavouriteStore(item.id);
                      }}
                    />
                  ) : (
                    <CustomIcon
                      type="favoriteBorderIcon"
                      className="fs-20 m-1 cursor-pointer"
                      onIconClick={(e) => {
                        e.preventDefault();
                        makefavouriteStore(item.id);
                      }}
                    />
                  )}
                  <CustomIcon
                    type="delete"
                    onIconClick={(e) => {
                      e.preventDefault();
                      deleteStores(item.storeListId, item.id);
                    }}
                    className=""
                  />
                </Box>
              </Paper>
            </motion.div>
          );
        })}
        {/* {loading && <div>Loading</div>} */}
        <ModalComponent
          open={showConfirmModal}
          showHeader={false}
          saveBtnText="Confirm"
          ClearBtnText="Cancel"
          onSaveBtnClick={handleSwitchStore}
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
      </Box>
    </Box>
  );
};

export default StoresTab;
