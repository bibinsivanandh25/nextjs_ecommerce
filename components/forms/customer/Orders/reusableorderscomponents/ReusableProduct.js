import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

const ReusableProduct = ({ children, product }) => {
  console.log("Children ", children);
  return (
    <Box
      className={`d-flex ${
        children ? "align-items-center" : "align-items-start"
      }`}
    >
      <Box className="align-self-start">
        {children ? children[0] || children : null}
      </Box>
      <Box className="w-135px h-135px">
        <Image
          className="d-block w-100 h-100 img-fluid rounded-1"
          width="120"
          height="120"
          src={product.image}
          alt="product"
        />
      </Box>
      <Box className="ms-2">
        <Typography className="color-orange mb-1 fs-14" variantMapping={<p />}>
          Supplier Name: Buisness Name
        </Typography>
        <Typography className="mb-1 fs-16 fw-bold" variantMapping={<p />}>
          {product.title}
        </Typography>
        {children ? children[1] : null}
        {children ? children[2] : null}
      </Box>
    </Box>
  );
};

export default ReusableProduct;
