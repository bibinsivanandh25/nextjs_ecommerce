import { Box, Typography } from "@mui/material";
import React from "react";

const ReusableBar = ({ children }) => {
  return (
    <Box className="d-flex align-items-center justify-content-between bg-light-orange1 p-2 mb-3">
      <Box className="w-50 d-flex justify-content-start">
        <Box className="ms-1">
          <Typography className="fs-14" variantMapping={<p />}>
            Orders Placed
          </Typography>
          <Typography className="fs-14" variantMapping={<p />}>
            02 Sep 2021
          </Typography>
        </Box>
        <Box className="ms-5">
          <Typography className="fs-14" variantMapping={<p />}>
            Total
          </Typography>
          <Typography className="fs-14" variantMapping={<p />}>
            Rs. 578.00
          </Typography>
        </Box>
        <Box className="ms-5">
          <Typography className="fs-14" variantMapping={<p />}>
            Ship ID
          </Typography>
          <Typography className="fs-14" variantMapping={<p />}>
            Sharath{/*Component Required Here*/}
          </Typography>
        </Box>
      </Box>
      <Box className="w-25 d-flex justify-content-end">{children || null}</Box>
      <Box className="w-25 d-flex flex-column align-items-end me-2">
        <Typography className="fs-14" variantMapping={<p />}>
          Order ID #278345283t4
        </Typography>
        <Typography variantMapping={<p />} className="color fs-14">
          <a className="color-orange" href="##">
            View Order Details
          </a>
          <Typography className="ms-2" variant="p">
            Invoice {/*Invoice Component will be here*/}
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
};

export default ReusableBar;
