import { forwardRef, useEffect, useState, useImperativeHandle } from "react";
import { Box, Grid } from "@mui/material";

const ScratchCard = forwardRef(({}, ref) => {
  useImperativeHandle(ref, () => {
    return {
      handleSendFormData: () => {
        return ["spinWheel"];
      },
    };
  });
  return (
    <Box className="w-100 d-flex  mx-3">
      <Box>scratch card</Box>
    </Box>
  );
});

export default ScratchCard;
