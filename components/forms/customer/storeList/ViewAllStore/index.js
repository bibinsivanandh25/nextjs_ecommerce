/* eslint-disable no-plusplus */
import { useState, useCallback, useRef } from "react";
import { useStoreList } from "services/hooks";
import { motion } from "framer-motion";
import Image from "next/image";
import { Box, Paper, Typography } from "@mui/material";
import { AiOutlineHeart } from "react-icons/ai";
import CustomIcon from "services/iconUtils";

const cb = () => {
  return new Promise((resolve) => {
    const temp = [];
    for (let i = 0; i < 30; i++) {
      temp.push(Math.floor(Math.random() * 10));
    }
    setTimeout(() => {
      resolve(temp);
    }, 2000);
  });
};

const ViewAllStore = () => {
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

  return (
    <Box
      className="overflow-y-scroll overflow-x-hide"
      sx={{
        maxHeight: "calc(100vh - 150px)",
      }}
    >
      {list.map((item, index) => (
        <motion.div
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.5 },
          }}
          whileTap={{ scale: 0.9 }}
          ref={list.length - 1 === index ? lastStore : null}
        >
          <Paper
            className="w-80p mx-auto p-2 d-flex justify-content-between m-2"
            elevation={4}
          >
            <Box className="d-flex">
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
            </Box>
            <Box className="d-flex flex-column">
              <AiOutlineHeart className="fs-20 cursor-pointer" />
              <CustomIcon type="delete" className="" />
              <CustomIcon type="add" className="" />
            </Box>
          </Paper>
        </motion.div>
      ))}
      {loading && <div>Loading</div>}
    </Box>
  );
};
export default ViewAllStore;
