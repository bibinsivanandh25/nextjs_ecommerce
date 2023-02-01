import { Box, Grid, Skeleton } from "@mui/material";
import React from "react";

const ProductSkeleton = () => {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item sm={4}>
          <Grid item sm={12} display="flex">
            <Skeleton variant="rectangular" width="100%" height={400} />
          </Grid>
          <Grid item sm={12} className="mt-1">
            <Skeleton variant="text" width="70%" />
            <Grid item sm={12}>
              <Skeleton variant="text" width="100%" className="mt-1" />
              <Skeleton variant="text" width="100%" className="mt-1" />
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={8}>
          <Grid item sm={12}>
            <Skeleton variant="text" width="auto" />
            <Skeleton variant="text" width="70%" className="mt-1" />
            <Skeleton variant="text" width="50%" className="mt-1" />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductSkeleton;
