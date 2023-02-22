/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from "react";
import { Box, Grid, Paper, Rating, Typography } from "@mui/material";
// import InputBoxComponent from "../../../../components/atoms/InputBoxComponent";
import CustomIcon from "services/iconUtils";
// import NotYetShipped from "@/forms/customer/Orders/notyetshipped/NotYetShipped";
// import CancelledOrder from "@/forms/customer/Orders/cancelledorders/CancelledOrder";
import ButtonComponent from "@/atoms/ButtonComponent";
import InputBox from "@/atoms/InputBoxComponent";
import MyOrders from "@/forms/customer/Orders/myorders/MyOrders";
import OrderReturn from "@/forms/customer/OrderReturn";
// import ReturnedOrders from "@/forms/customer/Orders/returnedorders/ReturnedOrders";
import SimpleDropdownComponent from "@/atoms/SimpleDropdownComponent";
// import { styles } from "@material-ui/pickers/views/Calendar/Calendar";
import SearchComponent from "@/atoms/SearchComponent";
import { useSelector } from "react-redux";
import { getBase64 } from "services/utils/functionUtils";
import TextArea from "@/atoms/SimpleTextArea";
import { UpdateProfilePicture } from "services/customer/accountdetails/myprofile";
import toastify from "services/utils/toastUtils";
import {
  customerProdFeedback,
  getOrderDetails,
  getProductDetails,
} from "services/customer/orders";
import ImageCard from "@/atoms/ImageCard";
import { format } from "date-fns";
import DateFilterModal from "@/forms/customer/Orders/DateFilterModal";

const prevYear = new Date().getFullYear() - 1;
const prev2Year = new Date().getFullYear() - 2;
const list = [
  { label: "Last 30 days", id: 1, value: "MONTH" },
  { label: "Last 6 Month", id: 1, value: "6MONTH" },
  // { label: "Last 1 Year", id: 1, value: "YEAR" },
  { label: prevYear, id: 2, value: "1YEAR" },
  { label: prev2Year, id: 3, value: "2YEAR" },
  { label: "Custom Duration", id: 3, value: "CUSTOM" },
];
const statusList = [
  { label: "Pending", id: 1, value: "PENDING" },
  { label: "Completed", id: 2, value: "COMPLETED" },
  { label: "Rejected", id: 2, value: "REJECTED" },
];
const Orders = () => {
  const user = useSelector((state) => state.customer);
  const [selectedLink, setSelectedLink] = useState("");
  const [sellerFeedbackmModal, setSellerFeedbackModal] = useState(false);
  const [productFeedbackType, setProductFeedbackType] = useState("");
  const [feedbackRating, setFeedbackRating] = useState(0);
  const [showReturnOrder, setShowReturnOrder] = useState(false);
  const [returnProducts, setReturnProducts] = useState([]);
  const [showProdDetails, setshowProdDetails] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [EachProductDetails, setEachProductDetails] = useState([]);
  const [getOrderApiCall, setgetOrderApiCall] = useState(false);
  const [openDateModal, setopenDateModal] = useState(false);
  const [orderFilter, setorderFilter] = useState({
    status: {
      label: "Pending",
      id: 1,
      value: "PENDING",
    },
    keyword: "",
  });
  const [durationDrowdown, setdurationDrowdown] = useState({
    id: 1,
    label: "Last 30 days",
    value: "MONTH",
  });

  const [productReviewState, setproductReviewState] = useState({
    retings: 0,
    headline: "",
    reviewText: "",
    reviewImage: [],
  });
  const [formDate, setformDate] = useState({
    startDate: format(new Date(), "MM-dd-yyyy 00:00:00"),
    endDate: format(
      new Date(new Date().setDate(new Date().getDate() - 30)),
      "MM-dd-yyyy 00:00:00"
    ),
  });
  const [dateModal, setdateModal] = useState({
    startDate: "",
    endDate: "",
  });
  useEffect(() => {
    if (durationDrowdown.value === "MONTH") {
      setformDate({
        endDate: format(new Date(), "MM-dd-yyyy 00:00:00"),
        startDate: format(
          new Date(new Date().setDate(new Date().getDate() - 30)),
          "MM-dd-yyyy 00:00:00"
        ),
      });
    } else if (durationDrowdown.value === "6MONTH") {
      setformDate({
        endDate: format(new Date(), "MM-dd-yyyy 00:00:00"),
        startDate: format(
          new Date(new Date().setDate(new Date().getDate() - 180)),
          "MM-dd-yyyy 00:00:00"
        ),
      });
    } else if (durationDrowdown.value === "YEAR") {
      setformDate({
        endDate: format(new Date(), "MM-dd-yyyy 00:00:00"),
        startDate: format(
          new Date(new Date().setDate(new Date().getDate() - 365)),
          "MM-dd-yyyy 00:00:00"
        ),
      });
    } else if (durationDrowdown.value == "1YEAR") {
      setformDate({
        startDate: format(
          new Date(new Date().getFullYear() - 1, 0, 1),
          "MM-dd-yyyy 00:00:00"
        ),
        endDate: format(
          new Date(new Date().getFullYear() - 1, 11, 31),
          "MM-dd-yyyy 00:00:00"
        ),
      });
    } else if (durationDrowdown.value == "2YEAR") {
      setformDate({
        startDate: format(
          new Date(new Date().getFullYear() - 2, 0, 1),
          "MM-dd-yyyy 00:00:00"
        ),
        endDate: format(
          new Date(new Date().getFullYear() - 2, 11, 31),
          "MM-dd-yyyy 00:00:00"
        ),
      });
    } else {
      setformDate({ ...formDate });
    }
  }, [durationDrowdown]);

  const getProducts = async () => {
    const payload = {
      customerId: user.userId,
      orderStatus: selectedLink,
      // orderStatus: "",
      // filterType: durationDrowdown.value || "",
      startDate: formDate.startDate,
      endDate: formDate.endDate,
      selectStatusType: orderFilter.status.value || "",
      keyword: orderFilter.keyword.toLocaleLowerCase(),
    };
    const { data, errRes } = await getOrderDetails(payload);
    if (data) {
      const temp = [];
      data.data.forEach((item) => {
        temp.push({
          // category: item.category,
          // description: item.description,
          orderId: item.orderId,
          businessName: item.businessName,
          productImage: item.productImage,
          productId: item.productId,
          variationDetails: item.variationPropertyPojos,
          orderStatus: item.orderStatus,
          orderDate: item.orderDate,
          productOwnerId: item.productOwnerId,
          returnUptoDate: item?.returnUptoDate,
          // rating: item.rating,
          productTitle: item.productTitle,
          shippingAddressId: item.shippingAddressId,
          // price: item.price,
          isSelected: false,
          dropDownValue: null,
          variationId: item.productId,
          error: false,
        });
      });
      setProducts([...temp]);
    } else if (errRes) {
      toastify(errRes?.response?.data?.message, "error");
    }
  };
  const indiviDualProductDetails = async () => {
    const addressId = selectedProduct[0]?.shippingAddressId;
    const orderId = selectedProduct[0]?.orderId;
    const { data, errRes } = await getProductDetails(addressId, orderId);
    if (data) {
      setEachProductDetails(data.data);
      toastify(data.data.message, "success");
    } else if (errRes) {
      toastify(errRes?.response?.data?.message, "error");
    }
  };
  useEffect(() => {
    if (showProdDetails == true) {
      indiviDualProductDetails();
    }
  }, [showProdDetails]);

  useEffect(() => {
    getProducts();
  }, [orderFilter, getOrderApiCall, formDate]);
  const submitProductReview = async () => {
    const payload = {
      customerRatings: productReviewState.retings,
      headline: productReviewState.headline,
      reviewerType: "CUSTOMER",
      reviewerId: user.userId,
      // reviewerId: "CST1222000058",
      writtenReview: productReviewState.reviewText,
      variationId: selectedProduct[0]?.variationId,
      reviewMediaUrl: productReviewState.reviewImage,
      isDeleted: false,
    };
    const { data, errRes } = await customerProdFeedback(payload);
    if (data) {
      toastify(data, "success");
      setproductReviewState({
        retings: 0,
        headline: "",
        reviewText: "",
        reviewImage: [],
      });
    } else if (errRes) {
      toastify(errRes.response.data.message, "error");
    }
  };

  return (
    <Box className=" px-2">
      {!showReturnOrder ? (
        <Box>
          <Box className="d-flex align-items-center pb-3">
            <Typography className="fw-bold fs-14 w-50">Your Orders</Typography>
          </Box>
          <Box className="d-flex w-40p justify-content-between pb-4">
            <Typography
              href="##"
              className={
                selectedLink === ""
                  ? "color-orange text-decoration-underline fs-14 fw-bold"
                  : "fs-14 fw-bold cursor-pointer"
              }
              onClick={() => {
                if (selectedLink !== "") setSelectedLink("");
                setdurationDrowdown({
                  id: 1,
                  label: "Last 30 days",
                  value: "MONTH",
                });
                setorderFilter({
                  status: {
                    label: "Pending",
                    id: 1,
                    value: "PENDING",
                  },
                  keyword: "",
                });
                setSelectedProduct([]);
              }}
            >
              Orders
            </Typography>
            <Typography
              href="##"
              className={
                selectedLink === "INITIATED"
                  ? "color-orange text-decoration-underline fs-14 fw-bold"
                  : "fs-14 fw-bold cursor-pointer"
              }
              onClick={() => {
                if (selectedLink !== "INITIATED") setSelectedLink("INITIATED");
                setdurationDrowdown("");
                setorderFilter({ status: "", keyword: "" });
                setSelectedProduct([]);
              }}
            >
              Not Yet Shipped
            </Typography>
            <Typography
              href="##"
              className={
                selectedLink === "CANCELLED"
                  ? "color-orange text-decoration-underline fs-14 fw-bold"
                  : "fs-14 fw-bold cursor-pointer"
              }
              onClick={() => {
                if (selectedLink !== "CANCELLED") setSelectedLink("CANCELLED");
                setdurationDrowdown("");
                setorderFilter({ status: "", keyword: "" });
                setSelectedProduct([]);
              }}
            >
              Cancelled Orders
            </Typography>
            <Typography
              href="##"
              className={
                selectedLink === "RETURNED"
                  ? "color-orange text-decoration-underline fs-14 fw-bold"
                  : "fs-14 fw-bold cursor-pointer"
              }
              onClick={() => {
                if (selectedLink !== "RETURNED") setSelectedLink("RETURNED");
                setdurationDrowdown("");
                setorderFilter({ status: "", keyword: "" });
                setSelectedProduct([]);
              }}
            >
              Returned Orders
            </Typography>
          </Box>
          {sellerFeedbackmModal ? (
            productFeedbackType === "product" ? (
              <Box>
                <div className="d-flex fw-600">
                  <CustomIcon
                    type="keyboardBackspaceIcon"
                    onIconClick={() => {
                      setSellerFeedbackModal(false);
                      setProductFeedbackType("");
                    }}
                  />
                  <p
                    className="cursor-pointer"
                    onClick={() => {
                      setSellerFeedbackModal(false);
                      setProductFeedbackType("");
                      setproductReviewState({
                        retings: 0,
                        headline: "",
                        reviewText: "",
                        reviewImage: [],
                      });
                    }}
                  >
                    Back
                  </p>
                </div>
                <Box className="mt-3 ms-3 w-75 bg-white ps-3 rounded pe-2 ">
                  <h4>Rate Product</h4>
                  <Rating
                    name="half-rating"
                    value={productReviewState.retings}
                    onClick={(e) => {
                      setproductReviewState((pre) => ({
                        ...pre,
                        retings: e.target.value,
                      }));
                    }}
                    size="large"
                    sx={{ color: "#E56700" }}
                  />
                  <Box>
                    <Box>
                      <p>Add Headlines :</p>
                      <InputBox
                        fullWidth
                        size="medium"
                        value={productReviewState.headline}
                        onInputChange={(e) => {
                          setproductReviewState((pre) => ({
                            ...pre,
                            headline: e.target.value,
                          }));
                        }}
                      />
                    </Box>
                    <Box className="mt-2">
                      <p>Add a written Review :</p>
                      <TextArea
                        className="w-100 mnh-100 border rounded outline"
                        placeholder="Reply here"
                        style={{ outline: "1px solid gray" }}
                        value={productReviewState.reviewText}
                        onInputChange={(e) => {
                          setproductReviewState((pre) => ({
                            ...pre,
                            reviewText: e.target.value,
                          }));
                        }}
                      />
                    </Box>
                    <Box
                      className="mnw-100px rounded"
                      // style={{ border: "1px dotted gray" }}
                    >
                      <Box
                        className="d-flex justify-content-center"
                        style={{ height: "100px", alignItems: "center" }}
                      >
                        {/* <Box> */}
                        {/* <input
                            type="file"
                            className="d-none"
                            ref={inputRef}
                            multiple
                            accept="image/*"
                            // onChange={(e) => {
                            // }}
                            onChange={async (e) => {
                              if (e.target.files) {
                                const file = await getBase64(e.target.files);
                                setproductReviewState({
                                  ...productReviewState,
                                  reviewImage: file,
                                });
                              }
                            }}
                          /> */}
                        {/* <CustomIcon
                            type="add"
                            className="h-1"
                            color="text-black"
                            showColorOnHover={false}
                            onIconClick={() => {
                              inputRef.current.click();
                            }}
                          /> */}
                        {/* </Box> */}
                        {productReviewState.reviewImage.length > 0
                          ? productReviewState.reviewImage.map(
                              (item, index) => (
                                <ImageCard
                                  // eslint-disable-next-line react/no-array-index-key
                                  key={index}
                                  imgSrc={item}
                                  handleCloseClick={() => {
                                    setproductReviewState((prev) => {
                                      const temp = JSON.parse(
                                        JSON.stringify(prev.reviewImage)
                                      );
                                      temp.splice(index, 1);
                                      return { ...prev, reviewImage: temp };
                                    });
                                  }}
                                  className="mx-3"
                                  // showClose={!viewFlag}
                                />
                              )
                            )
                          : null}
                        {productReviewState.reviewImage.length < 5 ? (
                          <ImageCard
                            showClose={false}
                            handleImageUpload={async (e) => {
                              if (e.target.files.length) {
                                const file = await getBase64(e.target.files[0]);
                                const { datas, err } =
                                  await UpdateProfilePicture(
                                    file,
                                    user?.userId
                                  );
                                if (datas) {
                                  setproductReviewState((prev) => {
                                    return {
                                      ...prev,
                                      reviewImage: [
                                        ...prev.reviewImage,
                                        datas.data,
                                      ],
                                    };
                                  });
                                } else if (err) {
                                  toastify(err.response.data.message, "error");
                                }
                              }
                            }}
                            className="mx-3"
                            imgSrc=""
                          />
                        ) : null}
                      </Box>
                    </Box>

                    <Box className="d-flex justify-content-end py-3">
                      <ButtonComponent
                        onBtnClick={submitProductReview}
                        label="Submit Feedback"
                        muiProps="px-3 py-2"
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            ) : (
              <Box>
                <div className="d-flex fw-600">
                  <CustomIcon
                    type="keyboardBackspaceIcon"
                    onIconClick={() => {
                      setSellerFeedbackModal(false);
                      setProductFeedbackType("");
                    }}
                  />
                  <p
                    className="cursor-pointer"
                    onClick={() => {
                      setSellerFeedbackModal(false);
                      setProductFeedbackType("");
                    }}
                  >
                    Back
                  </p>
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
                    <ButtonComponent
                      label="Submit Feedback"
                      muiProps="px-3 py-2"
                    />
                  </Box>
                </Box>
              </Box>
            )
          ) : showProdDetails ? (
            <Box>
              <Typography
                onClick={() => {
                  setshowProdDetails(false);
                }}
                className="color-orange pb-3"
              >
                {"<"} Back
              </Typography>
              <Paper className="p-3">
                <Typography className="fs-20 fw-600">Order Details</Typography>
                <Grid className="d-flex justify-content-start py-2">
                  <Grid>
                    <Typography className="fs-14">
                      Ordered on{" "}
                      {EachProductDetails?.orderedDate?.replace("T", " ")}
                    </Typography>
                  </Grid>
                  <Grid className="px-5">
                    <Typography className="fs-14">
                      Order Id {EachProductDetails?.orderId}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container className="px-1">
                  <Grid item xs={12} md={4} className="px-1 ">
                    <Grid>
                      <Typography className="fs-14 fw-600 py-3">
                        Shipping Address
                      </Typography>
                      <Typography className="fw-600">
                        {EachProductDetails?.shippingAddress?.name}
                      </Typography>
                      <Typography className="fw-600">
                        {EachProductDetails?.shippingAddress?.mobileNumber}
                      </Typography>
                      <Typography>
                        {EachProductDetails?.shippingAddress?.address}
                      </Typography>
                      <Typography>
                        {EachProductDetails?.shippingAddress?.cityDistrictTown}
                      </Typography>
                      <Typography>
                        {EachProductDetails?.shippingAddress?.landmark}
                      </Typography>
                      <Typography>
                        {EachProductDetails?.shippingAddress?.state}
                      </Typography>
                      <Typography>
                        {EachProductDetails?.shippingAddress?.location},&nbsp;
                        &nbsp; {EachProductDetails?.shippingAddress?.pinCode}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography className="fs-14 fw-600 py-3">
                      Payment Method
                    </Typography>
                    <Typography>{EachProductDetails.paymentMethod}</Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography className="fs-14 fw-600 py-3">
                      Order Summary
                    </Typography>
                    <Grid container>
                      <Grid item xs={6} md={6}>
                        <Typography>Item(s) subtotal:</Typography>
                        <Typography>Shipping:</Typography>
                        <Typography>Total:</Typography>
                        <Typography>Promotion Applied:</Typography>
                        <Typography className="fw-600 py-2">
                          Grand Total:
                        </Typography>
                      </Grid>
                      <Grid item xs={6} md={6}>
                        <Typography>
                          Rs: {EachProductDetails.itemsSubTotal}
                        </Typography>
                        <Typography>
                          Rs: {EachProductDetails.shipping}
                        </Typography>
                        <Typography> (Dummy price)</Typography>
                        <Typography>
                          Rs: {EachProductDetails.promotionApplied}
                        </Typography>
                        <Typography className="fw-600 py-2">
                          Rs: {EachProductDetails.grandTotal}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Box>
          ) : (
            <>
              <Box>
                {selectedLink === "" && (
                  <>
                    <Grid
                      container
                      className="d-flex justify-content-between p-2"
                    >
                      <Grid item sm={5}>
                        <Grid container spacing={1}>
                          <Grid item sm={5}>
                            <SimpleDropdownComponent
                              list={list}
                              size="small"
                              label="Select Duration"
                              inputlabelshrink
                              onDropdownSelect={(val) => {
                                setdurationDrowdown({
                                  label: val?.label,
                                  id: val?.id,
                                  value: val?.value,
                                });
                                if (val?.value === "CUSTOM") {
                                  setopenDateModal(true);
                                }
                              }}
                              value={durationDrowdown}
                            />
                          </Grid>
                          <DateFilterModal
                            setformDate={setformDate}
                            setorderFilter={setorderFilter}
                            setopenDateModal={setopenDateModal}
                            setdurationDrowdown={setdurationDrowdown}
                            setdateModal={setdateModal}
                            dateModal={dateModal}
                            openDateModal={openDateModal}
                          />
                          {/* {openDateModal && (
                            <ModalComponent
                              open={openDateModal}
                              ModalTitle="Select Duration"
                              onCloseIconClick={() => {
                                setdurationDrowdown({
                                  id: 1,
                                  label: "Last 30 days",
                                  value: "MONTH",
                                });
                                setopenDateModal(false);
                                setorderFilter({
                                  status: {
                                    label: "Pending",
                                    id: 1,
                                    value: "PENDING",
                                  },
                                  keyword: "",
                                });
                              }}
                              onSaveBtnClick={() => {
                                setformDate({ ...dateModal });
                                setopenDateModal(false);
                              }}
                              onClearBtnClick={() => {
                                setdateModal({
                                  startDate: "",
                                  endDate: "",
                                });
                              }}
                            >
                              <Grid container spacing={2} className="my-2">
                                <Grid item xs={6}>
                                  <DatePickerComponent
                                    size="small"
                                    label="Start Date"
                                    inputlabelshrink
                                    value={
                                      dateModal.startDate
                                        ? parse(
                                            dateModal.startDate,
                                            "MM-dd-yyyy HH:mm:ss",
                                            new Date()
                                          )
                                        : null
                                    }
                                    onDateChange={(date) => {
                                      setdateModal((pre) => ({
                                        ...pre,
                                        startDate: format(
                                          date,
                                          "MM-dd-yyyy HH:mm:ss"
                                        ),
                                      }));
                                    }}
                                  />
                                </Grid>
                                <Grid item xs={6}>
                                  <DatePickerComponent
                                    value={
                                      dateModal.endDate
                                        ? parse(
                                            dateModal.endDate,
                                            "MM-dd-yyyy HH:mm:ss",
                                            new Date()
                                          )
                                        : null
                                    }
                                    onDateChange={(date) => {
                                      setdateModal((pre) => ({
                                        ...pre,
                                        endDate: format(
                                          date,
                                          "MM-dd-yyyy HH:mm:ss"
                                        ),
                                      }));
                                    }}
                                    size="small"
                                    label="End Date"
                                    inputlabelshrink
                                  />
                                </Grid>
                              </Grid>
                            </ModalComponent>
                          )} */}
                          <Grid item sm={5}>
                            <SimpleDropdownComponent
                              list={statusList}
                              size="small"
                              label="Select Status"
                              inputlabelshrink
                              onDropdownSelect={(val) => {
                                setorderFilter({
                                  ...orderFilter,
                                  status: {
                                    label: val?.label,
                                    id: val?.id,
                                    value: val?.value,
                                  },
                                });
                              }}
                              value={orderFilter.status}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item sm={3}>
                        <SearchComponent
                          fullWidth
                          placeholder="Search Your Orders"
                          handleBtnSearch={(e) => {
                            setorderFilter({
                              ...orderFilter,
                              keyword: e,
                            });
                          }}
                        />
                      </Grid>
                    </Grid>
                    <MyOrders
                      showCancelBtn={orderFilter?.status?.value === "PENDING"}
                      showReturnBtn={orderFilter?.status?.value === "COMPLETED"}
                      // showReturnBtn={selectedProduct.forEach((val) => {
                      //   parse(val?.returnUptoDate, "MM-dd-yyyy", new Date()) >
                      //     new Date();
                      // })}
                      orderFilter={orderFilter}
                      ShowReturnOrder={showReturnOrder}
                      setshowProdDetails={setshowProdDetails}
                      setSellerFeedbackModal={setSellerFeedbackModal}
                      setProductFeedbackType={setProductFeedbackType}
                      setShowReturnOrder={setShowReturnOrder}
                      setReturnProducts={setReturnProducts}
                      products={products}
                      setProducts={setProducts}
                      selectedLink={selectedLink}
                      selectedProduct={selectedProduct}
                      setSelectedProduct={setSelectedProduct}
                      setgetOrderApiCall={setgetOrderApiCall}
                      getOrderApiCall={getOrderApiCall}
                    />
                  </>
                )}
              </Box>
              <Box>
                {selectedLink === "INITIATED" && (
                  <>
                    <Grid
                      container
                      className="d-flex justify-content-between p-2"
                    >
                      <Grid item sm={5}>
                        <Grid container spacing={1}>
                          {/* <Grid item sm={5}></Grid>
                          <Grid item sm={5}></Grid> */}
                        </Grid>
                      </Grid>
                      <Grid item sm={3}>
                        <SearchComponent
                          fullWidth
                          placeholder="Search Your Orders"
                          handleBtnSearch={(e) => {
                            setorderFilter({
                              ...orderFilter,
                              keyword: e,
                            });
                          }}
                        />
                      </Grid>
                    </Grid>
                    <MyOrders
                      setshowProdDetails={setshowProdDetails}
                      setSellerFeedbackModal={setSellerFeedbackModal}
                      setProductFeedbackType={setProductFeedbackType}
                      setShowReturnOrder={setShowReturnOrder}
                      setReturnProducts={setReturnProducts}
                      products={products}
                      setProducts={setProducts}
                      selectedLink={selectedLink}
                      showReturnBtn={false}
                      selectedProduct={selectedProduct}
                      setSelectedProduct={setSelectedProduct}
                      setgetOrderApiCall={setgetOrderApiCall}
                      getOrderApiCall={getOrderApiCall}
                    />
                  </>
                )}
              </Box>
              <Box>
                {selectedLink === "CANCELLED" && (
                  <>
                    <Grid
                      container
                      className="d-flex justify-content-between p-2"
                    >
                      <Grid item sm={5}>
                        <Grid container spacing={1}>
                          <Grid item sm={5}>
                            <SimpleDropdownComponent
                              list={list}
                              size="small"
                              label="Select Duration"
                              inputlabelshrink
                              onDropdownSelect={(val) => {
                                setdurationDrowdown({
                                  label: val?.label,
                                  id: val?.id,
                                  value: val?.value,
                                });
                                if (val?.value === "CUSTOM") {
                                  setopenDateModal(true);
                                }
                              }}
                              value={durationDrowdown}
                            />
                          </Grid>
                          <DateFilterModal
                            setformDate={setformDate}
                            setorderFilter={setorderFilter}
                            setopenDateModal={setopenDateModal}
                            setdurationDrowdown={setdurationDrowdown}
                            setdateModal={setdateModal}
                            dateModal={dateModal}
                            openDateModal={openDateModal}
                          />
                        </Grid>
                      </Grid>
                      <Grid item sm={3}>
                        <SearchComponent
                          fullWidth
                          placeholder="Search Your Orders"
                          handleBtnSearch={(e) => {
                            setorderFilter({
                              ...orderFilter,
                              keyword: e,
                            });
                          }}
                        />
                      </Grid>
                    </Grid>
                    <MyOrders
                      setshowProdDetails={setshowProdDetails}
                      setSellerFeedbackModal={setSellerFeedbackModal}
                      setProductFeedbackType={setProductFeedbackType}
                      setShowReturnOrder={setShowReturnOrder}
                      setReturnProducts={setReturnProducts}
                      products={products}
                      setProducts={setProducts}
                      selectedLink={selectedLink}
                      showTopBar={false}
                      selectedProduct={selectedProduct}
                      setSelectedProduct={setSelectedProduct}
                      setgetOrderApiCall={setgetOrderApiCall}
                      getOrderApiCall={getOrderApiCall}
                    />
                  </>
                )}
              </Box>
              <Box>
                {selectedLink === "RETURNED" && (
                  <>
                    <Grid
                      container
                      className="d-flex justify-content-between p-2"
                    >
                      <Grid item sm={5}>
                        <Grid container spacing={1}>
                          <Grid item sm={5}>
                            <SimpleDropdownComponent
                              list={list}
                              size="small"
                              label="Select Duration"
                              inputlabelshrink
                              onDropdownSelect={(val) => {
                                setdurationDrowdown({
                                  label: val?.label,
                                  id: val?.id,
                                  value: val?.value,
                                });
                                if (val?.value === "CUSTOM") {
                                  setopenDateModal(true);
                                }
                              }}
                              value={durationDrowdown}
                            />
                          </Grid>
                          <DateFilterModal
                            setformDate={setformDate}
                            setorderFilter={setorderFilter}
                            setopenDateModal={setopenDateModal}
                            setdurationDrowdown={setdurationDrowdown}
                            setdateModal={setdateModal}
                            dateModal={dateModal}
                            openDateModal={openDateModal}
                          />
                        </Grid>
                      </Grid>
                      <Grid item sm={3}>
                        <SearchComponent
                          fullWidth
                          placeholder="Search Your Orders"
                          handleBtnSearch={(e) => {
                            setorderFilter({
                              ...orderFilter,
                              keyword: e,
                            });
                          }}
                        />
                      </Grid>
                    </Grid>
                    <MyOrders
                      setshowProdDetails={setshowProdDetails}
                      setSellerFeedbackModal={setSellerFeedbackModal}
                      setProductFeedbackType={setProductFeedbackType}
                      setShowReturnOrder={setShowReturnOrder}
                      setReturnProducts={setReturnProducts}
                      products={products}
                      setProducts={setProducts}
                      selectedLink={selectedLink}
                      showTopBar={false}
                      selectedProduct={selectedProduct}
                      setSelectedProduct={setSelectedProduct}
                      setgetOrderApiCall={setgetOrderApiCall}
                      getOrderApiCall={getOrderApiCall}
                    />
                  </>
                )}
              </Box>
            </>
          )}
        </Box>
      ) : (
        <OrderReturn
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          returnProducts={returnProducts}
          showReturnOrder={showReturnOrder}
          setShowReturnOrder={setShowReturnOrder}
          setgetOrderApiCall={setgetOrderApiCall}
          getOrderApiCall={getOrderApiCall}
        />
      )}
    </Box>
  );
};

export default Orders;
