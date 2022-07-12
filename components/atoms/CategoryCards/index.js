import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

const CategoryCards = ({
  height = 200,
  width = 200,
  src = "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
  categoryTitle = "",
  clickCardCategory = () => {},
}) => {
  return (
    <Box className="position-relative d-inline" onClick={clickCardCategory}>
      <Image height={height} width={width} src={src} layout="fixed" />
      <Typography
        className="fs-14 fw-bold mt-1 text-center position-absolute top-10"
        sx={{ bottom: "10px", left: "50%", transform: "translateX(-50%)" }}
      >
        {categoryTitle}
      </Typography>
    </Box>
  );
};

export default CategoryCards;
