import { Grid, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

function ViewOrderDetails({ eachOrderData }) {
  const viewFormat = (key, value) => {
    return (
      <Grid md={12} sx={12} container className="py-1">
        <Grid md={3} sx={3}>
          <Typography className="fs-12 fw-500">{key}</Typography>
        </Grid>
        <Grid md={1} sx={1}>
          <Typography className="fs-12">:</Typography>
        </Grid>
        <Grid md={8} sx={8}>
          <Typography className="fs-12">{value}</Typography>
        </Grid>
      </Grid>
    );
  };
  const viewFormat2column = (key1, val1, key2, val2) => {
    return (
      <Grid container className="py-1">
        <Grid item lg={2} md={3}>
          <Typography className="fs-14 fw-500">{key1}</Typography>
        </Grid>
        <Grid item lg={0.5} md={2}>
          <Typography>:</Typography>
        </Grid>
        <Grid item lg={3} md={7}>
          <Typography className="fs-14 ">{val1}</Typography>
        </Grid>
        <Grid item lg={1} md={0} />
        <Grid item lg={2} md={3}>
          <Typography className="fs-14 fw-500">{key2}</Typography>
        </Grid>
        <Grid item lg={0.5} md={2}>
          <Typography>:</Typography>
        </Grid>
        <Grid item lg={3} md={7}>
          <Typography className="fs-14 ">{val2}</Typography>
        </Grid>
      </Grid>
    );
  };
  return (
    <Grid className="p-2">
      {viewFormat2column(
        "Order Id",
        eachOrderData.orderId,
        "Delivered Date",
        eachOrderData?.deliveredDate?.replace("T", " ")
      )}
      {viewFormat2column(
        "Mode Of Order",
        eachOrderData.modeOfOrder,
        "Commission Mode",
        eachOrderData.commissionMode
      )}
      {viewFormat2column(
        "Discount Amount",
        eachOrderData.discountAmount,
        "Margin Amount",
        eachOrderData.marginAmount
      )}
      {viewFormat2column(
        "Ordered By",
        eachOrderData.orderedByType,
        `${eachOrderData?.orderedByType?.toLowerCase()} Id`,
        eachOrderData.orderedById
      )}
      {viewFormat2column(
        "Store Owner Id",
        eachOrderData.orderedStoreOwnerId,
        "Total Order Amount",
        eachOrderData.totalOrderAmount
      )}
      {/* {viewFormat("Order Id", eachOrderData.orderId)} */}
      {/* {viewFormat(
      "Delivered Date",
      eachOrderData?.deliveredDate?.replace("T", " ")
    )} */}
      <Grid className="mxh-60vh p-2 overflow-y-scroll">
        {eachOrderData.orderedProducts.map((ele) => {
          return (
            <Grid container className="p-2" md={12} xs={12}>
              <Grid md={4} xs={4}>
                <Image src={ele.productImage} height={300} width={300} />
              </Grid>
              <Grid container md={8} xs={8}>
                <Typography className="fs-16 fw-500">
                  {ele.productTitle}
                </Typography>

                {viewFormat("Ordered Quantity", ele.orderQuantity)}
                {viewFormat("Product Amount", ele.orderedProductAmount)}
                {viewFormat(
                  "Delivery Charges",
                  ele.orderedProductDeliveryCharges
                )}
                {viewFormat("Order Status", ele.orderedProductStatus)}
                {viewFormat(
                  "Weight Inclusive Package",
                  ele.weightInclusivePackage
                )}
                {viewFormat("Sku Id", ele.skuId)}
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
}

export default ViewOrderDetails;
