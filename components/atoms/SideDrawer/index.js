import { Box, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { motion } from "framer-motion";
import { VscChromeMinimize } from "react-icons/vsc";
import { BiCopyAlt } from "react-icons/bi";
import { BsShop } from "react-icons/bs";
import InputBox from "../InputBoxComponent";

const SideDrawer = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.div
        style={{
          height: "200px",
          position: "fixed",
          top: "60px",
          right: "5px",
          zIndex: 12,
          borderTopLeftRadius: "10px",
          borderBottomLeftRadius: "10px",
        }}
        className={`shadow rounded-left bg-white `}
        animate={{
          width: open ? 300 : 0,
        }}
        transition={{ ease: "easeOut", duration: 0.3 }}
      >
        <Box className="px-2 bg-gray w-100 d-flex align-items-center justify-content-between rounded-top">
          <Typography className="fs-14 fw-bold">Shop Details</Typography>
          <VscChromeMinimize
            className=" fs-18 cursor-pointer"
            fill="black"
            onClick={() => {
              setOpen(false);
            }}
          />
        </Box>
        <Grid container className="w-100 p-3">
          <Grid item md={5} className="fw-bold">
            Shop Name :
          </Grid>
          <Grid item md={7} className="fw-bold">
            MY SHOP
          </Grid>
          <Grid item md={5} className="fw-bold">
            Shop Code :
          </Grid>
          <Grid item md={7} className="fw-bold">
            #1234 <BiCopyAlt fill="blue" className="fs-18" />
          </Grid>
          <Grid item md={12} className="fw-bold">
            Shop Link :
          </Grid>
          <Grid item md={12} className="text-primary">
            <InputBox value="http://localhost:3010/admin/products/zerocommission" />
          </Grid>
          <Grid
            item
            md={12}
            className="text-end pt-2 fs-12 color-blue cursor-pointer"
          >
            Copy Link
          </Grid>
        </Grid>
      </motion.div>
      <motion.div
        animate={{
          scale: [1, 2, 2, 1, 1],
          rotate: [0, 0, 180, 360, 0],
          borderRadius: ["2%", "10%", "50%", "50%", "2%"],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          times: [0, 0.2, 0.5, 0.8, 1],
          repeat: Infinity,
          repeatDelay: 1,
        }}
        style={{
          width: "40px",
          height: "40px",
          background: "#e56700",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          top: "60px",
          right: "30px",
          zIndex: 10,
          padding: "10px",
          margin: "10px 5px 5px 10px",
        }}
        onClick={() => {
          setOpen(true);
        }}
      >
        <BsShop className="h3 mt-2 cursor-pointer" fill="white" />
      </motion.div>
    </>
  );
};

export default SideDrawer;
