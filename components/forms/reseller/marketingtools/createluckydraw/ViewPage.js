import { Box, Typography, Grid } from "@mui/material";

const ViewPage = ({ data = {}, pageName = "" }) => {
  return (
    <Box className="w-100 p-3">
      <Typography className="h-5 fw-bold mb-2">
        {pageName === "scratchcard"
          ? "Scratch Card"
          : pageName === "createquiz"
          ? "Quiz"
          : "Spin Wheel"}{" "}
        Name:
      </Typography>
      <Typography className="h-5 fw-bold mb-2">Total Amount:</Typography>
      <Grid container spacing={2} className="mb-2">
        <Grid item md={4}>
          <Typography className="h-5 fw-bold">Start Date:</Typography>
        </Grid>
        <Grid item md={4}>
          <Typography className="h-5 fw-bold">End Date:</Typography>
        </Grid>
        <Grid item md={4}>
          <Typography className="h-5 fw-bold">Created Date:</Typography>
        </Grid>
        <Grid item md={4}>
          <Typography className="h-5 fw-bold">Customer Type:</Typography>
        </Grid>
        <Grid item md={4}>
          <Typography className="h-5 fw-bold">Status:</Typography>
        </Grid>
        <Grid item md={4}>
          <Typography className="h-5 fw-bold">Validity:</Typography>
        </Grid>
        <Grid item md={4}>
          <Typography className="h-5 fw-bold">Split Type:</Typography>
        </Grid>
        <Grid item md={4}>
          <Typography className="h-5 fw-bold">Split Amount:</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ViewPage;
