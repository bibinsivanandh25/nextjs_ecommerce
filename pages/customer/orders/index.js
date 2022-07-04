/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";
import { Box, Rating, Typography } from "@mui/material";
// import InputBoxComponent from "../../../../components/atoms/InputBoxComponent";
import CustomIcon from "services/iconUtils";
import SearchComponent from "../../../components/atoms/SearchComponent";
import NotYetShipped from "@/forms/customer/Orders/notyetshipped/NotYetShipped";
import CancelledOrder from "@/forms/customer/Orders/cancelledorders/CancelledOrder";
import ButtonComponent from "@/atoms/ButtonComponent";
import InputBox from "@/atoms/InputBoxComponent";
import MyOrders from "@/forms/customer/Orders/myorders/MyOrders";

const Orders = () => {
  const [selectedLink, setSelectedLink] = useState("orders");
  const [sellerFeedbackmModal, setSellerFeedbackModal] = useState(false);
  const [productFeedbackType, setProductFeedbackType] = useState("");
  const [feedbackRating, setFeedbackRating] = useState(0);
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
      {sellerFeedbackmModal ? (
        productFeedbackType === "product" ? (
          <Box>
            <div
              className="d-flex fw-600"
              onClick={() => {
                setSellerFeedbackModal(false);
                setProductFeedbackType("");
              }}
            >
              <CustomIcon type="keyboardBackspaceIcon" />
              <p className="cursor-pointer">Back</p>
            </div>
            <Box className="mt-3 ms-3 w-75 bg-white ps-3 rounded pe-2 ">
              <h4>Rate Seller</h4>
              <Rating
                name="half-rating"
                value={feedbackRating}
                onClick={(e) => {
                  setFeedbackRating(e.target.value);
                }}
                size="large"
                sx={{ color: "#E56700" }}
              />
              <Box>
                <Box>
                  <p>Add Headlines :</p>
                  <InputBox fullWidth size="medium" />
                </Box>
                <Box className="mt-2">
                  <p>Add a written Review :</p>
                  <textarea
                    className="w-100 mnh-100 border rounded outline"
                    placeholder="Reply here"
                    style={{ outline: "1px solid gray" }}
                  />
                </Box>
                <Box className="border mxh-150 mxw-100px mxh-100">
                  <Box className="d-flex justify-content-center ">
                    <CustomIcon
                      type="add"
                      className="h-1"
                      color="text-black"
                      showColorOnHover={false}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box>
            <div
              className="d-flex fw-600"
              onClick={() => {
                setSellerFeedbackModal(false);
                setProductFeedbackType("");
              }}
            >
              <CustomIcon type="keyboardBackspaceIcon" />
              <p className="cursor-pointer">Back</p>
            </div>
            <Box className="mt-3 ms-3 w-75 bg-white ps-3 rounded pe-2 ">
              <h4>Rate Seller</h4>
              <Rating
                name="half-rating"
                value={feedbackRating}
                onClick={(e) => {
                  setFeedbackRating(e.target.value);
                }}
                size="large"
                sx={{ color: "#E56700" }}
              />
              <Box className="">
                <p>Comments :</p>
                <textarea
                  className="w-100 mnh-150 border rounded outline"
                  placeholder="Reply here"
                  style={{ outline: "1px solid gray" }}
                />
              </Box>
              <Box className="d-flex justify-content-end">
                <ButtonComponent label="Submit Feedback" muiProps="px-3 py-2" />
              </Box>
            </Box>
          </Box>
        )
      ) : (
        <>
          <Box>
            {selectedLink === "orders" && (
              <MyOrders
                setSellerFeedbackModal={setSellerFeedbackModal}
                setProductFeedbackType={setProductFeedbackType}
              />
            )}
          </Box>
          <Box>{selectedLink === "notYetShipped" && <NotYetShipped />}</Box>
          <Box>{selectedLink === "cancelled" && <CancelledOrder />}</Box>
        </>
      )}
    </Box>
  );
};

export default Orders;
