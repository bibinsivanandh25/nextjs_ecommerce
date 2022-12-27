import { Box, Paper, Skeleton, Typography } from "@mui/material";
import React from "react";

const ProductList = ({ title = "" }) => {
  return (
    <Paper elevation={3} className="" sx={{ height: "180px" }}>
      <Typography className="h-4 fw-bold ps-2">{title}</Typography>
      <Box className="ms-2 d-flex justify-content-between overflow-auto">
        <Skeleton variant="rectangular" width={150} height={150} />
        <Skeleton variant="rectangular" width={150} height={150} />
        <Skeleton variant="rectangular" width={150} height={150} />
        <Skeleton variant="rectangular" width={150} height={150} />
        <Skeleton variant="rectangular" width={150} height={150} />
        <Skeleton variant="rectangular" width={150} height={150} />
        <Skeleton variant="rectangular" width={150} height={150} />
        <Skeleton variant="rectangular" width={150} height={150} />
      </Box>
    </Paper>
  );
};

export default ProductList;
