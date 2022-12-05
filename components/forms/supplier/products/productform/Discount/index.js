/* eslint-disable no-unused-vars */
import { Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getDiscountByProductVariationId } from "services/admin/products";

const Discount = ({ productVariationId = null, supplierId = null }) => {
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
  const getData = async () => {
    const { data, err } = await getDiscountByProductVariationId(
      0,
      supplierId,
      productVariationId
    );
    if (data) {
      setdiscountData(
        data.map((item) => {
          return {
            code: item.couponCode,
            createdBy: item.createdBy,
            discountType: item.discountType,
            amount: item.couponAmount,
            createdDate: item.createdDate,
            expiredDate: item.couponExpiryDate,
            couponId: item.couponId,
            status: item.couponStatus,
            description: item.description,
          };
        })
      );
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Grid container spacing={2}>
        {discountData.map((item) => {
          return (
            <Grid item md={12} lg={6} container key={item.couponId}>
              <Paper className="w-100 p-2" elevation={4}>
                <Grid container spacing={1} className="fs-14">
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
                  <Grid item md={4}>
                    Coupon Description
                  </Grid>
                  <Grid item md={1}>
                    :
                  </Grid>
                  <Grid item md={6}>
                    {item.description}
                  </Grid>
                  <Grid item md={4}>
                    Coupon Status
                  </Grid>
                  <Grid item md={1}>
                    :
                  </Grid>
                  <Grid item md={6}>
                    {item.status}
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
      {/* <Typography className="pe-2 cursor-pointer text-primary text-end">
        View More
      </Typography> */}
    </>
  );
};

export default Discount;
