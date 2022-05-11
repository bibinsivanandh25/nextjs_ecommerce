import { Box, Grid, Paper } from "@mui/material";
import { forwardRef, useImperativeHandle, useState } from "react";

const ProductPoliciesForm = forwardRef(({}, ref) => {
  const [productPolicyFormData, setProductPolicyFormData] = useState({});
  useImperativeHandle(ref, () => {
    return {
      handleSendFormData: () => {
        return ["policy", { ...productPolicyFormData }];
      },
    };
  });
  return (
    <Grid container className="">
      ProductPoliciesForm
    </Grid>
  );
});
export default ProductPoliciesForm;
