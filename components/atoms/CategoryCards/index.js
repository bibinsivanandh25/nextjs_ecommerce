import { Box, Tooltip, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

const CategoryCards = ({
  height = 200,
  width = 200,
  src = "",
  categoryTitle = "",
  clickCardCategory = () => {},
}) => {
  return (
    <Box
      className="cursor-pointer"
      onClick={clickCardCategory}
      maxWidth={width + 10}
    >
      <Image
        height={height}
        width={width}
        src={src}
        layout="fixed"
        className="cursor-pointer"
      />
      <Tooltip title={categoryTitle}>
        <Typography className="fs-14 fw-bold mt-1 text-center text-truncate cursor-pointer">
          {categoryTitle}
        </Typography>
      </Tooltip>
    </Box>
  );
};

export default CategoryCards;
