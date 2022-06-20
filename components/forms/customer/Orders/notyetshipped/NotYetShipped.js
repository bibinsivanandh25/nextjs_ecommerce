import React from "react";
import { Box, Typography } from "@mui/material";
import ReusableBar from "../reusableorderscomponents/ReusableBar";
import ReusableProduct from "../reusableorderscomponents/ReusableProduct";

const NotYetShipped = () => {
  return (
    <Box>
      <Box>
        <Typography className="pb-2 fs-14" variantMapping={<p />}>
          <span className="fw-bold fs-16">2 Orders </span> in past 2 months
        </Typography>
      </Box>
      <ReusableBar />
      <Typography
        className="fw-bold lead ms-3 pb-3 fs-18"
        variantMapping={<p />}
      >
        Cancelled
      </Typography>
      <Box className="ms-3">
        <ReusableProduct />
      </Box>
    </Box>
  );
};

export default NotYetShipped;
