/* eslint-disable no-nested-ternary */
import { Box, Typography, Grid } from "@mui/material";

const ViewPage = ({ pageName = "", data = null }) => {
  if (data) {
    return (
      <Box className="w-100 p-3">
        <Typography className="h-5 fw-bold mb-2">
          {pageName === "scratchcard"
            ? "Scratch Card"
            : pageName === "createquiz"
            ? "Quiz"
            : "Spin Wheel"}{" "}
          Name: {data.campaignTitle}
        </Typography>
        <Typography className="h-5 fw-bold mb-2">
          Total Amount: {data.totalDiscountValue}
        </Typography>
        <Grid container spacing={2} className="mb-2">
          <Grid item md={4}>
            <Typography className="h-5 fw-bold">
              Start Date: {data.startDateTime}
            </Typography>
          </Grid>
          <Grid item md={4}>
            <Typography className="h-5 fw-bold">
              End Date:{data.endDateTime}
            </Typography>
          </Grid>
          <Grid item md={4}>
            <Typography className="h-5 fw-bold">
              Created Date: {data.createdDate}
            </Typography>
          </Grid>
          <Grid item md={4}>
            <Typography className="h-5 fw-bold">
              Customer Type: {data.customerType.split("_").join(" ")}
            </Typography>
          </Grid>
          <Grid item md={4}>
            <Typography className="h-5 fw-bold">
              Status: {data.toolStatus}
            </Typography>
          </Grid>
          <Grid item md={4}>
            <Typography className="h-5 fw-bold">
              Validity: {data.endDateTime}
            </Typography>
          </Grid>
          <Grid item md={4}>
            <Typography className="h-5 fw-bold">
              Split Type: {data.splitType}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    );
  } else {
    return null;
  }
};

export default ViewPage;
