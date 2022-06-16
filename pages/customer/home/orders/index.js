import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import InputBoxComponent from "../../../../components/atoms/InputBoxComponent";
import SearchComponent from "../../../../components/atoms/SearchComponent";
import MyOrders from "@/forms/customer/Orders/myorders/MyOrders";
import NotYetShipped from "@/forms/customer/Orders/notyetshipped/NotYetShipped";
import CancelledOrder from "@/forms/customer/Orders/cancelledorders/CancelledOrder";
const Orders = () => {
  const [selectedLink, setSelectedLink] = useState("orders");
  return (
    <Box>
      <Box className="d-flex align-items-center pb-3">
        <Typography className="fw-bold fs-14 w-50" variantMapping={<p />}>
          Your Orders
        </Typography>
        <Box className="w-50">
          <SearchComponent fullWidth placeholder="Search Orders" />
        </Box>
      </Box>
      <Box className="d-flex w-40p justify-content-between pb-4">
        <Typography
          href="##"
          className={
            selectedLink === "orders"
              ? "color-orange text-decoration-underline fs-14 fw-bold"
              : "fs-14 fw-bold"
          }
          onClick={() => {
            if (selectedLink !== "orders") setSelectedLink("orders");
          }}
        >
          Orders
        </Typography>
        <Typography
          href="##"
          className={
            selectedLink === "notYetShipped"
              ? "color-orange text-decoration-underline fs-14 fw-bold"
              : "fs-14 fw-bold"
          }
          onClick={() => {
            if (selectedLink !== "notYetShipped")
              setSelectedLink("notYetShipped");
          }}
        >
          Not Yet Shipped
        </Typography>
        <Typography
          href="##"
          className={
            selectedLink === "cancelled"
              ? "color-orange text-decoration-underline fs-14 fw-bold"
              : "fs-14 fw-bold"
          }
          onClick={() => {
            if (selectedLink !== "cancelled") setSelectedLink("cancelled");
          }}
        >
          Cancelled Orders
        </Typography>
      </Box>
      <Box>{selectedLink === "orders" && <MyOrders />}</Box>
      <Box>{selectedLink === "notYetShipped" && <NotYetShipped />}</Box>
      <Box>{selectedLink === "cancelled" && <CancelledOrder />}</Box>
    </Box>
  );
};

export default Orders;
