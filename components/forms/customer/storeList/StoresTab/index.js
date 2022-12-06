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
  favouriteStore,
  getAllStoresOfStoreListByStoreId,
  getStoreList,
} from "services/admin/storeList";
import { useSelector } from "react-redux";
import toastify from "services/utils/toastUtils";

const StoresTab = ({ switchTabs = () => {} }) => {
  const [storelist, setStoreList] = useState([]);
  const [stores, setStores] = useState([]);
  const [selectedStoreList, setSelectedStoreList] = useState(null);
  const { userId } = useSelector((state) => state.customer);

  const [pageNum, setPageNum] = useState(1);
  const observer = useRef();
  // const lastStore = useCallback(
  //   (node) => {
  //     if (loading) return;
  //     if (observer.current) observer.current.disconnect();
  //     observer.current = new IntersectionObserver((entries) => {
  //       if (entries[0].isIntersecting) {
  //         setPageNum((prev) => prev + 1);
  //       }
  //     });
  //     if (node) observer.current.observe(node);
  //   },
  //   [loading]
  // );

  const getStoresList = async () => {
    const { data } = await getStoreList(userId, "");
    if (data) {
      setStoreList(
        data.map((item) => ({
          label: item.customerStoreListName ?? "--",
          id: item.customerStoreListId,
          defaultStore: item.defaultStore,
        }))
      );
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
  const deleteStores = async (id) => {
    const { data, err, message } = await deleteStore(id, userId);
    if (data === null) {
      getAllStoreOfStoreList(selectedStoreList.id);
      toastify(message, "success");
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };

  useEffect(() => {
    getStoresList();
  }, []);

  return selectedStoreList === null ? (
    <>
      <Box
        sx={{ maxHeight: "calc(100vh - 200px)" }}
        className="w-100 p-2 overflow-y-scroll overflow-x-hide d-flex flex-column align-items-center mb-3"
      >
        {storelist.map((item) => {
          return (
            <motion.div
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.5 },
              }}
              whileTap={{ scale: 0.9 }}
            >
              <Paper
                key={item.id}
                onClick={() => {
                  getAllStoreOfStoreList(item.id);
                  setSelectedStoreList(item);
                }}
                className="p-2 my-2 w-300px cursor-pointer"
              >
                {item.label}
              </Paper>
            </motion.div>
          );
        })}
      </Box>
      {/* <Box className="w-100 p-2 border-top">
        <Typography className="fs-18 fw-500">
          Recently Visited Stores
        </Typography>
        {recentStores.map((item) => {
          return (
            <motion.div
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.5 },
              }}
              whileTap={{ scale: 0.9 }}
            >
              <Paper
                className="w-80p mx-auto px-2 py-1 d-flex m-2 cursor-pointer"
                elevation={4}
              >
                <Box elevation={4}>
                  <Image
                    className="rounded-circle  cursor-pointer"
                    src={item.logo}
                    width={35}
                    height={35}
                  />
                </Box>
                <Box className="d-flex flex-column ms-1  cursor-pointer">
                  <Typography className="fs-14  cursor-pointer">
                    {item.label}
                  </Typography>
                  <Typography className="fs-14  cursor-pointer">
                    {item.description}
                  </Typography>
                </Box>
              </Paper>
            </motion.div>
          );
        })}
      </Box> */}
    </>
  ) : (
    <Box className="p-2 w-100">
      <Typography
        className="d-inline color-orange fs-12 cursor-pointer"
        onClick={() => {
          setSelectedStoreList(null);
          setStores([]);
        }}
      >
        {"< "} Back
      </Typography>
      <Box className="w-100 d-flex justify-content-between align-items-center">
        <Typography className=" color-orange fs-16 fw-bold">
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
          return (
            <motion.div
              // ref={list.length - 1 === index ? lastStore : null}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.5 },
              }}
              whileTap={{ scale: 0.9 }}
            >
              <Paper
                className="w-80p mx-auto p-2 d-flex m-2 justify-content-between"
                elevation={4}
              >
                <Box elevation={4}>
                  <Image
                    className="rounded-circle"
                    src="https://dev-mrmrscart-assets.s3.ap-south-1.amazonaws.com/supplier/SP0822000068/product/image/09012022093009214"
                    width={50}
                    height={50}
                  />
                </Box>
                <Box className="d-flex flex-column ms-1">
                  <Typography className="">{item.label}</Typography>
                  <Typography className="fs-12">
                    Store code: {item.storeCode}
                  </Typography>
                </Box>
                <Box className="d-flex flex-column">
                  {item.favourite ? (
                    <CustomIcon
                      type="heart"
                      className="fs-20 m-1 cursor-pointer color-orange"
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
                      deleteStores(item.id);
                    }}
                    className=""
                  />
                </Box>
              </Paper>
            </motion.div>
          );
        })}
        {/* {loading && <div>Loading</div>} */}
      </Box>
    </Box>
  );
};

export default StoresTab;
