import { Box, Grid, Paper } from "@mui/material";
import { forwardRef, useImperativeHandle, useState } from "react";

const LinkedForm = forwardRef(({}, ref) => {
  const [linkedFormData, setLinkedFormData] = useState({});
  useImperativeHandle(ref, () => {
    return {
      handleSendFormData: () => {
        return ["linked", { ...linkedFormData }];
      },
    };
  });
  return (
    <Grid container className="">
      LinkedForm
    </Grid>
  );
});
export default LinkedForm;
