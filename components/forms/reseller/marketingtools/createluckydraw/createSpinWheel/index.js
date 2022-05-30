import { forwardRef, useEffect, useState, useImperativeHandle } from "react";
import { Box, Grid } from "@mui/material";

const SpinWheel = forwardRef(({}, ref) => {
  useImperativeHandle(ref, () => {
    return {
      handleSendFormData: () => {
        return ["spinWheel"];
      },
    };
  });
  return (
    <Box className="w-100 d-flex  mx-3">
      <Box>spinWheel</Box>
    </Box>
  );
});

export default SpinWheel;
