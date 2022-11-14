/* eslint-disable no-unused-vars */
import { Grid, Paper, Typography } from "@mui/material";
import { useState } from "react";

const Discount = () => {
  const [discountData, setdiscountData] = useState([
    {
      code: "1111",
      createdBy: "aaaa",
      discountType: "",
      amount: "",
      createdDate: "",
      expiredDate: "",
    },
    {
      code: "1111",
      createdBy: "aaaa",
      discountType: "",
      amount: "",
      createdDate: "",
      expiredDate: "",
    },
    {
      code: "1111",
      createdBy: "aaaa",
      discountType: "",
      amount: "",
      createdDate: "",
      expiredDate: "",
    },
  ]);

  return (
    <>
      <Grid container spacing={2}>
        {discountData.map((item) => {
          return (
            <Grid item md={12} lg={6} container>
              <Paper className="w-100 p-2" elevation={4}>
                <Grid container spacing={1}>
                  <Grid item md={4}>
                    Coupon Code
                  </Grid>
                  <Grid item md={1}>
                    :
                  </Grid>
                  <Grid item md={6}>
                    {item.code}
                  </Grid>
                  <Grid item md={4}>
                    Created By
                  </Grid>
                  <Grid item md={1}>
                    :
                  </Grid>
                  <Grid item md={6}>
                    {item.createdBy}
                  </Grid>
                  <Grid item md={4}>
                    Discount Type
                  </Grid>
                  <Grid item md={1}>
                    :
                  </Grid>
                  <Grid item md={6}>
                    {item.discountType}
                  </Grid>
                  <Grid item md={4}>
                    Amount:
                  </Grid>
                  <Grid item md={1}>
                    :
                  </Grid>
                  <Grid item md={6}>
                    {item.amount}
                  </Grid>
                  <Grid item md={4}>
                    Created Date
                  </Grid>
                  <Grid item md={1}>
                    :
                  </Grid>
                  <Grid item md={6}>
                    {item.createdDate}
                  </Grid>
                  <Grid item md={4}>
                    Expired Date
                  </Grid>
                  <Grid item md={1}>
                    :
                  </Grid>
                  <Grid item md={6}>
                    {item.expiredDate}
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
      <Typography className="pe-2 cursor-pointer text-primary text-end">
        View More
      </Typography>
    </>
  );
};

export default Discount;
