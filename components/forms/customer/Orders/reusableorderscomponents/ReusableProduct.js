import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

const ReusableProduct = ({ children, values }) => {
  return (
    <Box
      className={`d-flex ${
        children ? "align-items-center" : "align-items-start"
      }`}
    >
      <Box className="align-self-start">{children ? children[0] : null}</Box>
      <Box className="w-135px h-135px">
        <Image src={values.image} height={150} width={150} />
      </Box>
      <Box className="ms-2">
        <Typography className="color-orange mb-1 fs-14" variantMapping={<p />}>
          Supplier Name: Buisness Name
        </Typography>
        <Typography className="mb-1 fs-16 fw-bold" variantMapping={<p />}>
          {values.title}
        </Typography>
        {children ? children[1] : null}
        {children ? children[2] : null}
      </Box>
    </Box>
  );
};

export default ReusableProduct;
