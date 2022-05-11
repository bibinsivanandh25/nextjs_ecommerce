import { Box, Grid, Paper } from "@mui/material";
import { forwardRef, useImperativeHandle, useState } from "react";

const VariationForm = forwardRef(({}, ref) => {
  const [variationFormData, setVariationFormData] = useState({});
  useImperativeHandle(ref, () => {
    return {
      handleSendFormData: () => {
        return ["variation", { ...variationFormData }];
      },
    };
  });
  return (
    <Grid container className="">
      VariationForm
    </Grid>
  );
});
export default VariationForm;
