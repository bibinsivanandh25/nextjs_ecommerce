/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useRef, useEffect } from "react";
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
import serviceUtil from "services/utils";
import SimpleDropdownComponent from "@/atoms/SimpleDropdownComponent";
// import { styles } from "@material-ui/pickers/views/Calendar/Calendar";
import SearchComponent from "@/atoms/SearchComponent";
import { useDispatch, useSelector } from "react-redux";
import { getBase64 } from "services/utils/functionUtils";
import Image from "next/image";
import TextArea from "@/atoms/SimpleTextArea";
import { UpdateProfilePicture } from "services/customer/accountdetails/myprofile";
import toastify from "services/utils/toastUtils";
import { customerProdFeedback } from "services/customer/orders";

const list = [
  { label: "Last 30 days", id: 1 },
  { label: "Last 1 Year", id: 2 },
  { label: "Last 2 Years", id: 3 },
];
const statusList = [
  { label: "Pending", id: 1 },
  { label: "Completed", id: 2 },
];
const Orders = () => {
  const user = useSelector((state) => state.customer);
  const [selectedLink, setSelectedLink] = useState("orders");
  const [sellerFeedbackmModal, setSellerFeedbackModal] = useState(false);
  const [productFeedbackType, setProductFeedbackType] = useState("");
  console.log(productFeedbackType, "productFeedbackType");
  const [feedbackRating, setFeedbackRating] = useState(0);
  const inputRef = useRef(null);
  const [showReturnOrder, setShowReturnOrder] = useState(false);
  const [returnProducts, setReturnProducts] = useState([]);
  const [showProdDetails, setshowProdDetails] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  console.log(selectedProduct, "selectedProduct");

  const [orderFilter, setorderFilter] = useState({
    duration: "",
    status: "",
    keyword: "",
  });
  const [productReviewState, setproductReviewState] = useState({
    retings: 0,
    headline: "",
    reviewText: "",
    reviewImage: [],
  });
  const getProducts = async () => {
    await serviceUtil
      .get("https://fakestoreapi.com/products")
      .then((data) => {
        const temp = [];
        data.data.forEach((item) => {
          temp.push({
            category: item.category,
            description: item.description,
            id: item.id,
            image: item.image,
            rating: item.rating,
            title: item.title,
            price: item.price,
            isSelected: false,
            variationId: "6363c36f17a3bf069acb0bcd",
          });
        });
        setProducts([...temp]);
      })
      .catch(() => {
        // console.log(err);
      });
  };
  // console.log(selectedProduct, "sad");

  useEffect(() => {
    getProducts();
  }, [orderFilter]);
  const submitProductReview = async () => {
    let temp = [];

    const file = productReviewState.reviewImage;
    console.log(file, "file");
    if (file.length) {
      const { datas, err } = await UpdateProfilePicture(file, user.userId);

      if (err) {
        toastify(err.response.data.message, "error");
      }
      temp = [datas?.data];
    }

    const payload = {
      customerRatings: productReviewState.retings,
      headline: productReviewState.headline,
      reviewerType: "CUSTOMER",
      reviewerId: user.userId,
      // reviewerId: "CST1222000058",
      writtenReview: productReviewState.reviewText,
      variationId: selectedProduct[0]?.variationId,
      reviewMediaUrl: temp ? temp : [],
      isDeleted: false,
    };
    const { data, errRes } = await customerProdFeedback(payload);
    if (data) {
      console.log(data, "datadata");
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
                selectedLink === "orders"
                  ? "color-orange text-decoration-underline fs-14 fw-bold"
                  : "fs-14 fw-bold cursor-pointer"
              }
              onClick={() => {
                if (selectedLink !== "orders") setSelectedLink("orders");
                setorderFilter({ duration: "", status: "", keyword: "" });
                setSelectedProduct([]);
              }}
            >
              Orders
            </Typography>
            <Typography
              href="##"
              className={
                selectedLink === "notYetShipped"
                  ? "color-orange text-decoration-underline fs-14 fw-bold"
                  : "fs-14 fw-bold cursor-pointer"
              }
              onClick={() => {
                if (selectedLink !== "notYetShipped")
                  setSelectedLink("notYetShipped");
                setorderFilter({ duration: "", status: "", keyword: "" });
                setSelectedProduct([]);
              }}
            >
              Not Yet Shipped
            </Typography>
            <Typography
              href="##"
              className={
                selectedLink === "cancelled"
                  ? "color-orange text-decoration-underline fs-14 fw-bold"
                  : "fs-14 fw-bold cursor-pointer"
              }
              onClick={() => {
                if (selectedLink !== "cancelled") setSelectedLink("cancelled");
                setorderFilter({ duration: "", status: "", keyword: "" });
                setSelectedProduct([]);
              }}
            >
              Cancelled Orders
            </Typography>
            <Typography
              href="##"
              className={
                selectedLink === "return"
                  ? "color-orange text-decoration-underline fs-14 fw-bold"
                  : "fs-14 fw-bold cursor-pointer"
              }
              onClick={() => {
                if (selectedLink !== "return") setSelectedLink("return");
                setorderFilter({ duration: "", status: "", keyword: "" });
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
                        reviewImage: "",
                      });
                    }}
                  >
                    Back
                  </p>
                </div>
                <Box className="mt-3 ms-3 w-75 bg-white ps-3 rounded pe-2 ">
                  <h4>Rate Seller</h4>
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
                      style={{ border: "1px dotted gray" }}
                    >
                      <Box
                        className="d-flex justify-content-center"
                        style={{ height: "100px", alignItems: "center" }}
                      >
                        <Box>
                          <input
                            type="file"
                            className="d-none"
                            ref={inputRef}
                            accept="image/*"
                            // onChange={(e) => {
                            // }}
                            onChange={async (e) => {
                              if (e.target.files[0]) {
                                const file = await getBase64(e.target.files[0]);
                                setproductReviewState({
                                  ...productReviewState,
                                  reviewImage: file,
                                });
                              }
                            }}
                          />
                          <CustomIcon
                            type="add"
                            className="h-1"
                            color="text-black"
                            showColorOnHover={false}
                            onIconClick={() => {
                              inputRef.current.click();
                            }}
                          />
                        </Box>
                      </Box>
                    </Box>
                    <Image
                      src={productReviewState.reviewImage}
                      height={100}
                      width={100}
                    />
                    <Box className="d-flex justify-content-end">
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
                      Ordered on 2 july 2021
                    </Typography>
                  </Grid>
                  <Grid className="px-5">
                    <Typography className="fs-14">Order Id #123456</Typography>
                  </Grid>
                </Grid>
                <Grid container className="px-1">
                  <Grid item xs={12} md={4} className="px-1 ">
                    <Grid>
                      <Typography className="fs-14 fw-600 py-3">
                        Shipping Address
                      </Typography>
                      <Typography>Tanmoy sen</Typography>
                      <Typography>Indicube, south end circle</Typography>
                      <Typography>Bangalore, 560085</Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography className="fs-14 fw-600 py-3">
                      Payment Method
                    </Typography>
                    <Typography>COD</Typography>
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
                        <Typography>Rs: 4899.00</Typography>
                        <Typography>Rs: 0.00</Typography>
                        <Typography>Rs: 4899.00</Typography>
                        <Typography>Rs: 300.00</Typography>
                        <Typography className="fw-600 py-2">
                          Rs: 4599.00
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
                {selectedLink === "orders" && (
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
                                setorderFilter({
                                  ...orderFilter,
                                  duration: {
                                    label: val.label,
                                    id: val.id,
                                  },
                                });
                              }}
                              value={orderFilter.duration}
                            />
                          </Grid>
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
                                    label: val.label,
                                    id: val.id,
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
                          placeholder="Search Orders"
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
                      selectedProduct={selectedProduct}
                      setSelectedProduct={setSelectedProduct}
                    />
                  </>
                )}
              </Box>
              <Box>
                {selectedLink === "notYetShipped" && (
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
                                setorderFilter({
                                  ...orderFilter,
                                  duration: {
                                    label: val.label,
                                    id: val.id,
                                  },
                                });
                              }}
                              value={orderFilter.duration}
                            />
                          </Grid>
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
                                    label: val.label,
                                    id: val.id,
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
                          placeholder="Search Orders"
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
                    />
                  </>
                )}
              </Box>
              <Box>
                {selectedLink === "cancelled" && (
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
                                setorderFilter({
                                  ...orderFilter,
                                  duration: {
                                    label: val.label,
                                    id: val.id,
                                  },
                                });
                              }}
                              value={orderFilter.duration}
                            />
                          </Grid>
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
                                    label: val.label,
                                    id: val.id,
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
                          placeholder="Search Orders"
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
                    />
                  </>
                )}
              </Box>
              <Box>
                {selectedLink === "return" && (
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
                                setorderFilter({
                                  ...orderFilter,
                                  duration: {
                                    label: val.label,
                                    id: val.id,
                                  },
                                });
                              }}
                              value={orderFilter.duration}
                            />
                          </Grid>
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
                                    label: val.label,
                                    id: val.id,
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
                          placeholder="Search Orders"
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
                    />
                  </>
                )}
              </Box>
            </>
          )}
        </Box>
      ) : (
        <OrderReturn
          returnProducts={returnProducts}
          setShowReturnOrder={setShowReturnOrder}
        />
      )}
    </Box>
  );
};

export default Orders;
