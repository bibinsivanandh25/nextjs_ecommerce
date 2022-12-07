/* eslint-disable no-plusplus */
import { useState, useEffect } from "react";
// import { useStoreList } from "services/hooks";
import { motion } from "framer-motion";
import Image from "next/image";
import { Box, Paper, Typography } from "@mui/material";
import CustomIcon from "services/iconUtils";
import { useSelector } from "react-redux";
import toastify from "services/utils/toastUtils";
import {
  deleteStore,
  favouriteStore,
  getAllCustomerStores,
} from "services/admin/storeList";

const ViewAllStore = ({ switchTabs = () => {}, searchText = "" }) => {
  const { userId } = useSelector((state) => state.customer);
  const [storelist, setStoreList] = useState([]);
  const [pageNum, setPageNum] = useState(0);
  // const { loading, list } = useStoreList(cb, pageNum);
  // const observer = useRef();
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

  const getAllStores = async () => {
    const { data, err } = await getAllCustomerStores(
      userId,
      pageNum,
      searchText
    );
    if (data) {
      setStoreList([
        ...data.map((item) => ({
          id: item.customerStoreId,
          label: item.supplierStoreName ?? "--",
          storeCode: item.storeCode,
          defaultStore: item.defaultStore,
          favourite: item.favourite,
          storeLogo: item.storeLogo || "",
        })),
        // ...data.map((item) => ({
        //   id: item.customerStoreId,
        //   label: item.supplierStoreName ?? "--",
        //   storeCode: item.storeCode,
        //   defaultStore: item.defaultStore,
        //   favourite: item.favourite,
        //   storeLogo: item.storeLogo || "",
        // })),
        // ...data.map((item) => ({
        //   id: item.customerStoreId,
        //   label: item.supplierStoreName ?? "--",
        //   storeCode: item.storeCode,
        //   defaultStore: item.defaultStore,
        //   favourite: item.favourite,
        //   storeLogo: item.storeLogo || "",
        // })),
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

  useEffect(() => {
    getAllStores();
  }, [searchText]);

  return (
    <Box
      className="overflow-y-scroll overflow-x-hide"
      sx={{
        maxHeight: "calc(100vh - 150px)",
      }}
    >
      {storelist.length ? (
        storelist.map((item) => (
          <motion.div
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.5 },
            }}
            whileTap={{ scale: 0.9 }}
            // ref={list.length - 1 === index ? lastStore : null}
          >
            <Paper
              className="w-80p mx-auto d-flex justify-content-between m-2"
              elevation={4}
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
                <CustomIcon
                  type="add"
                  className=""
                  onIconClick={(e) => {
                    e.preventDefault();
                    switchTabs("Add Store", {
                      storeCode: item.storeCode,
                      storeListName: {
                        title: "",
                        id: "",
                      },
                    });
                  }}
                />
              </Box>
            </Paper>
          </motion.div>
        ))
      ) : (
        <Typography className="fs-14 color-gray text-center p-2">{`No Store's found`}</Typography>
      )}
      {/* {loading && <div>Loading</div>} */}
    </Box>
  );
};
export default ViewAllStore;
