/* eslint-disable no-nested-ternary */

import { Box, Paper, Typography } from "@mui/material";
import Image from "next/image";
import { useState, useEffect } from "react";
import CustomIcon from "services/iconUtils";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteStore,
  favouriteStore,
  switchStore,
  getFavoriteList,
} from "services/admin/storeList";
import toastify from "services/utils/toastUtils";
import ModalComponent from "@/atoms/ModalComponent";
import { getStoreByStoreCode } from "services/customer/ShopNow";
import { storeUserInfo } from "features/customerSlice";
import { storeUserInfo as storeInfoUserSlice } from "features/userSlice";
import { useRouter } from "next/router";

const FavoriteList = ({ close = () => {} }) => {
  const [favStores, setFavStores] = useState([]);
  const [storeDetails, setstoreDetails] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const customer = useSelector((state) => state.customer);
  const { userId } = customer;
  const dispatch = useDispatch();
  const router = useRouter();

  const getAllStores = async () => {
    const { data, err } = await getFavoriteList(userId);
    if (data) {
      setFavStores([
        ...data.map((item) => ({
          id: item.customerStoreId,
          label: item.supplierStoreName ?? "--",
          storeCode: item.storeCode,
          defaultStore: item.defaultStore,
          favourite: item.favourite,
          storeLogo: item.storeLogo || "",
        })),
      ]);
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };

  const makefavouriteStore = async (id) => {
    const { data, err, message } = await favouriteStore(id);
    if (data === null) {
      getAllStores();
      toastify(message, "success");
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };
  const deleteStores = async (id) => {
    const { data, err, message } = await deleteStore(id, userId);
    if (data === null) {
      getAllStores();
      toastify(message, "success");
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };

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
            storeThemes: storeData.storeThemes,
            shopDescription: storeData.shopDescription ?? "",
            shopDescriptionImageUrl: storeData.shopDescriptionImageUrl,
            addStoreFlag: false,
            supplierId: storeData.supplierId,
          })
        );
        dispatch(
          storeInfoUserSlice({
            supplierId: storeData.supplierId,
          })
        );
        router.push("/customer/home");
      } else if (storeErr) {
        toastify(storeErr?.response?.data?.message, "error");
      }
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };

  useEffect(() => {
    getAllStores();
  }, []);

  return (
    <Box className="w-100 px-2">
      {favStores.length ? (
        favStores.map((item) => (
          <motion.div
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.5 },
            }}
            // whileTap={{ scale: 0.9 }}
            // ref={list.length - 1 === index ? lastStore : null}
          >
            <Paper
              className={`w-80p rounded mx-auto d-flex justify-content-between m-2 ${
                item.defaultStore ? "border border-primary border-2" : ""
              }`}
              elevation={4}
              onClick={() => {
                if (item.defaultStore) return;
                setstoreDetails(item);
                setShowConfirmModal(true);
              }}
            >
              <Box className="d-flex">
                <Box elevation={4} className="d-flex">
                  <Image
                    className="rounded"
                    src={item.storeLogo}
                    width={70}
                    height={50}
                  />
                </Box>
                <Box className="d-flex flex-column ms-1 p-2">
                  <Typography className="">{item.label}</Typography>
                  <Typography className="fs-12">{item.storeCode}</Typography>
                </Box>
              </Box>
              <Box className="d-flex flex-column">
                <CustomIcon
                  title="Remove from favourite"
                  type="heart"
                  className="fs-20 m-1 cursor-pointer color-orange"
                  onIconClick={(e) => {
                    e.stopPropagation();
                    makefavouriteStore(item.id);
                  }}
                />

                <CustomIcon
                  type="delete"
                  title="Delete"
                  onIconClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    deleteStores(item.id);
                  }}
                  className=""
                />
              </Box>
            </Paper>
          </motion.div>
        ))
      ) : (
        <Typography className="fs-14 color-gray text-center p-2">{`No Store's found`}</Typography>
      )}
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
  );
};
export default FavoriteList;
