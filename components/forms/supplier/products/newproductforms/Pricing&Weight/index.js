import { Box, Grid, Paper } from "@mui/material";
import { forwardRef, useImperativeHandle, useState } from "react";

const PricingForm = forwardRef(({}, ref) => {
  const [pricingFormData, setPricingFormData] = useState({});
  useImperativeHandle(ref, () => {
    return {
      handleSendFormData: () => {
        return ["pricing", { ...pricingFormData }];
      },
    };
  });
  return (
    <Grid container className="">
      PricingForm
    </Grid>
  );
});
export default PricingForm;
