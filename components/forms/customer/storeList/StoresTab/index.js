/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
import { Box, Paper, Typography } from "@mui/material";
import Image from "next/image";
import { motion } from "framer-motion";
import CustomIcon from "services/iconUtils";
import { useCallback, useRef, useState } from "react";
import { useStoreList } from "services/hooks";

const cb = () => {
  return new Promise((resolve) => {
    const temp = [];
    for (let i = 0; i < 40; i++) {
      temp.push(Math.floor(Math.random() * 10));
    }
    setTimeout(() => {
      resolve(temp);
    }, 2000);
  });
};

const StoresTab = () => {
  const [storelist, setStoreList] = useState([
    { label: "Clothing", id: "1" },
    { label: "Electrical", id: "2" },
    { label: "C", id: "3" },
    { label: "D", id: "4" },
    { label: "A", id: "5" },
    { label: "B", id: "6" },
    { label: "C", id: "7" },
    { label: "D", id: "8" },
    { label: "A", id: "9" },
    { label: "B", id: "10" },
  ]);
  const [recentStores, setRecentStores] = useState([
    {
      label: "A",
      logo: "https://dev-mrmrscart-assets.s3.ap-south-1.amazonaws.com/supplier/SP0822000068/product/image/09012022093009214",
      description: "description",
    },
    {
      label: "B",
      logo: "https://dev-mrmrscart-assets.s3.ap-south-1.amazonaws.com/supplier/SP0822000068/product/image/09012022093009214",
      description: "description",
    },
    {
      label: "C",
      logo: "https://dev-mrmrscart-assets.s3.ap-south-1.amazonaws.com/supplier/SP0822000068/product/image/09012022093009214",
      description: "description",
    },
    {
      label: "D",
      logo: "https://dev-mrmrscart-assets.s3.ap-south-1.amazonaws.com/supplier/SP0822000068/product/image/09012022093009214",
      description: "description",
    },
  ]);
  const [selectedStoreList, setSelectedStoreList] = useState(null);

  const [pageNum, setPageNum] = useState(1);
  const { loading, list } = useStoreList(cb, pageNum);
  const observer = useRef();
  const lastStore = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPageNum((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  return selectedStoreList === null ? (
    <>
      <Box className="w-100 p-2 mxh-300 overflow-y-scroll overflow-x-hide d-flex flex-column align-items-center mb-3">
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
      <Box className="w-100 p-2 border-top">
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
                    Description or category
                  </Typography>
                </Box>
              </Paper>
            </motion.div>
          );
        })}
      </Box>
    </>
  ) : (
    <Box className="p-2 w-100">
      <Typography
        className="d-inline color-orange fs-12 cursor-pointer"
        onClick={() => {
          setSelectedStoreList(null);
        }}
      >
        {"< "} Back
      </Typography>
      <Box className="w-100 d-flex justify-content-between align-items-center">
        <Typography className=" color-orange fs-16 fw-bold">
          {selectedStoreList.label}
        </Typography>
        <Typography className="ms-2 cursor-pointer color-light-blue fs-12">
          <CustomIcon
            showColorOnHover={false}
            type="add"
            color="color-light-blue "
            className="color-light-blue fs-14"
            onIconClick={() => {}}
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
        {list.map((item, index) => {
          return (
            <motion.div
              ref={list.length - 1 === index ? lastStore : null}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.5 },
              }}
              whileTap={{ scale: 0.9 }}
            >
              <Paper className="w-80p mx-auto p-2 d-flex m-2" elevation={4}>
                <Box elevation={4}>
                  <Image
                    className="rounded-circle"
                    src="https://dev-mrmrscart-assets.s3.ap-south-1.amazonaws.com/supplier/SP0822000068/product/image/09012022093009214"
                    width={50}
                    height={50}
                  />
                </Box>
                <Box className="d-flex flex-column ms-1">
                  <Typography className="">Store {item}</Typography>
                  <Typography className="">Description or category</Typography>
                </Box>
              </Paper>
            </motion.div>
          );
        })}
        {loading && <div>Loading</div>}
      </Box>
    </Box>
  );
};

export default StoresTab;
