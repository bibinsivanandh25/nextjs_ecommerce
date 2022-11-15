import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { motion } from "framer-motion";
import { BiLeftArrow } from "react-icons/bi";
import { VscChromeMinimize } from "react-icons/vsc";

const SideDrawer = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <motion.div
        style={{
          height: "300px",
          position: "fixed",
          top: "60px",
          right: 0,
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
        jhdb sdcb sdcjksdc sdjkcsdc sjkdcbs dcjksdbc
      </motion.div>
      <motion.div
        className="shadow bg-white"
        style={{
          borderTopLeftRadius: "50%",
          borderBottomLeftRadius: "50%",
          position: "fixed",
          top: "60px",
          right: 0,
          zIndex: 10,
          padding: "10px",
        }}
        animate={{
          opacity: open ? 0 : 1,
        }}
        transition={{ type: "spring" }}
      >
        <Box
          className="rounded-circle bg-orange d-flex justify-content-center align-items-center"
          style={{ width: "40px", height: "40px" }}
          onClick={() => {
            setOpen(true);
          }}
        >
          <BiLeftArrow className="h3 mt-2 cursor-pointer" fill="white" />
        </Box>
      </motion.div>
    </>
  );
};

export default SideDrawer;
