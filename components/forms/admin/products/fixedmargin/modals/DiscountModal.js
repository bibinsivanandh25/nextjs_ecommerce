import React from "react";
import { Grid, Typography } from "@mui/material";
import ModalComponent from "@/atoms/ModalComponent";

const DiscountModal = ({ openDiscountModal, setOpenDiscountModal }) => {
  const titles = [
    "Coupon Code",
    "Discount Type",
    "Amount in %",
    "Usage Limit",
    "Expire Date",
    "Status",
  ];

  const theData = [
    {
      couponCode: "#45435",
      discountType: "Scratch Card",
      amountInPercent: "20%",
      usageLimit: "-",
      expiryDate: "31-05-2021, 12:12",
      status: "Expired",
    },
    {
      couponCode: "#45435",
      discountType: "Scratch Card",
      amountInPercent: "20%",
      usageLimit: "-",
      expiryDate: "31-05-2021, 12:12",
      status: "Published",
    },
    {
      couponCode: "#45435",
      discountType: "Scratch Card",
      amountInPercent: "20%",
      usageLimit: "-",
      expiryDate: "31-05-2021, 12:12",
      status: "Not Published",
    },
  ];

  const returnColorForStatus = (value) => {
    if (value === "Published") {
      return "text-success";
    }
    if (value === "Expired") {
      return "text-danger";
    }
    return "text-primary";
  };

  return (
    <>
      <ModalComponent
        open={openDiscountModal}
        ModalTitle="Discount"
        onCloseIconClick={() => {
          setOpenDiscountModal(false);
        }}
        showFooter={false}
        ModalWidth={950}
      >
        <Grid
          container
          justifyContent="space-around"
          className="border-bottom border-3 pb-2 mt-4 mb-2"
        >
          {titles.map((val) => {
            return (
              <Grid item xs={2}>
                <Typography className="ms-5 text-center fw-bold fs-14">
                  {val}
                </Typography>
              </Grid>
            );
          })}
        </Grid>
        {theData.map((val) => {
          return (
            <Grid
              container
              justifyContent="space-around"
              className=" pb-2 mb-2"
            >
              <Grid item xs={2}>
                <Typography className="ms-5 text-center fs-14">
                  {val.couponCode}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography className="ms-5 text-center fs-14">
                  {val.discountType}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography className="ms-5 text-center fs-14">
                  {val.amountInPercent}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography className="ms-5 text-center fs-14">
                  {val.amountInPercent}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography className="ms-5 text-center fs-14">
                  {val.usageLimit}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography
                  className={`${returnColorForStatus(
                    val.status
                  )} ms-5 text-center fs-14`}
                >
                  {val.status}
                </Typography>
              </Grid>
            </Grid>
          );
        })}
      </ModalComponent>
    </>
  );
};

export default DiscountModal;
