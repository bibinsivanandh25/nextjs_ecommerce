import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import ModalComponent from "@/atoms/ModalComponent";

const ViewDetailsModal = ({
  openViewDetailsModal,
  setOpenViewDetailsModal,
}) => {
  return (
    <ModalComponent
      open={openViewDetailsModal}
      ModalTitle="View Product"
      titleClassName="fw-bold fs-14 color-orange"
      ClearBtnText="Reject"
      saveBtnText="Approve"
      saveBtnClassName="ms-1"
      onCloseIconClick={() => {
        setOpenViewDetailsModal(false);
      }}
      showFooter={false}
      ModalWidth={550}
    >
      <Box className="ms-5 py-3">
        <Grid container alignItems="end">
          <Grid item xs={4}>
            <Typography className="fs-14 mt-2 text-end">
              Customer ID/ Reseller ID with Name :{" "}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography className="fs-14 fw-bold">#827342 Karan Ram</Typography>
          </Grid>
        </Grid>
        <Grid container alignItems="end" className="mt-1">
          <Grid item xs={4}>
            <Typography className="fs-14 mt-2 text-end">
              Prepaid Order :{" "}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography className="fs-14 fw-bold">3</Typography>
          </Grid>
        </Grid>
        <Grid container alignItems="end" className="mt-1">
          <Grid item xs={4}>
            <Typography className="fs-14 mt-2 text-end">
              COD Order :{" "}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography className="fs-14 fw-bold">3</Typography>
          </Grid>
        </Grid>
        <Grid container alignItems="end" className="mt-1">
          <Grid item xs={4}>
            <Typography className="fs-14 mt-2 text-end">
              Total Order :{" "}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography className="fs-14 fw-bold">2</Typography>
          </Grid>
        </Grid>
        <Grid container alignItems="end" className="mt-1">
          <Grid item xs={4}>
            <Typography className="fs-14 mt-2 text-end">
              Item Sub Total :{" "}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography className="fs-14 fw-bold">2500/-</Typography>
          </Grid>
        </Grid>
        <Grid container alignItems="end" className="mt-1">
          <Grid item xs={4}>
            <Typography className="fs-14 mt-2 text-end">
              Total Discount Applied :{" "}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography className="fs-14 fw-bold">200</Typography>
          </Grid>
        </Grid>
        <Grid container alignItems="end" className="mt-1">
          <Grid item xs={4}>
            <Typography className="fs-14 mt-2 text-end">
              Grand Total :{" "}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography className="fs-14 fw-bold">2300</Typography>
          </Grid>
        </Grid>
        <Grid container alignItems="end" className="mt-1">
          <Grid item xs={4}>
            <Typography className="fs-14 mt-2">
              Total Shipping Charges:{" "}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography className="fs-14 fw-bold">590</Typography>
          </Grid>
        </Grid>
        <Grid container alignItems="start" className="mt-1">
          <Grid item xs={4}>
            <Typography className="fs-14 mt-2">
              Ordered Date & Time :{" "}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography className="fs-14 fw-bold">
              Supplier -10% discount 24/10/2021 - 31/10/2021
            </Typography>
          </Grid>
        </Grid>
        <Grid container alignItems="end" className="mt-1">
          <Grid item xs={4}>
            <Typography className="fs-14 mt-2">Payment ID : </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography className="fs-14 fw-bold">#162531</Typography>
          </Grid>
        </Grid>
        <Grid container alignItems="end" className="mt-1">
          <Grid item xs={4}>
            <Typography className="fs-14 mt-2">Transaction ID :</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography className="fs-14 fw-bold">Successfull</Typography>
          </Grid>
        </Grid>
      </Box>
    </ModalComponent>
  );
};

export default ViewDetailsModal;
