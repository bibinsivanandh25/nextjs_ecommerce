import { Box, Grid, Paper } from "@mui/material";
import { forwardRef, useImperativeHandle, useState } from "react";

const AttributesForm = forwardRef(({}, ref) => {
  const [attributesFormData, setAttributesFormData] = useState({});
  useImperativeHandle(ref, () => {
    return {
      handleSendFormData: () => {
        return ["attribute", { ...attributesFormData }];
      },
    };
  });
  return (
    <Grid container className="">
      AttributesForm
    </Grid>
  );
});

AttributesForm.displayName = "AttributesForm";
export default AttributesForm;
