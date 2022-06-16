import { Box, Typography } from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";

const ReusableProduct = ({ children }) => {
  return (
    <Box
      className={`d-flex ${
        children ? "align-items-center" : "align-items-start"
      }`}
    >
      <Box className="align-self-start">{children ? children[0] : null}</Box>
      <Box style={{ width: "140px", height: "140px" }}>
        <img
          className="d-block w-100 h-100 img-fluid rounded-1"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXMWvWQyO6_SDsIxDQ33qBmWSgyUAiNPYfGY804qa6&s"
          alt="product"
        />
      </Box>
      <Box className="ms-2">
        <Typography className="color-orange mb-1 fs-14" variantMapping={<p />}>
          Supplier Name: Buisness Name
        </Typography>
        <Typography className="mb-1 fs-18" variantMapping={<p />}>
          Product Name
        </Typography>
        {children ? children[1] : null}
        {children ? children[2] : null}
      </Box>
    </Box>
  );
};

export default ReusableProduct;
