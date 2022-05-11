import { Box, Grid, Paper } from "@mui/material";
import { forwardRef, useImperativeHandle, useState } from "react";

const GroupedproductsForm = forwardRef(({}, ref) => {
  const [groupedproductsFormData, setGroupedproductsFormData] = useState({});
  useImperativeHandle(ref, () => {
    return {
      handleSendFormData: () => {
        return ["grouped", { ...groupedproductsFormData }];
      },
    };
  });
  return (
    <Grid container className="">
      GroupedproductsForm
    </Grid>
  );
});
export default GroupedproductsForm;
