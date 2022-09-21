/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable consistent-return */
/* eslint-disable no-inner-declarations */
import {
  Add,
  AirportShuttle,
  CopyAllSharp,
  RemoveRedEye,
  // Shield,
  // SwapHoriz,
} from "@mui/icons-material";
import { Box, Grid, Paper, Rating, Skeleton, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
// import toastify from "services/utils/toastUtils";
import ReactImageMagnify from "react-image-magnify";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import CustomIcon from "services/iconUtils";
import serviceUtil from "services/utils";
import InputBox from "@/atoms/InputBoxComponent";
import RadiobuttonComponent from "@/atoms/RadiobuttonComponent";
import ButtonComponent from "@/atoms/ButtonComponent";
import CheckBoxComponent from "@/atoms/CheckboxComponent";

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // only execute all the code below in client side
    if (typeof window !== "undefined") {
      // Handler to call on window resize
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }

      // Add event listener
      window.addEventListener("resize", handleResize);

      // Call handler right away so state gets updated with initial window size
      handleResize();

      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}
// const ownersCoupons = [
//   {
//     id: 1,
//     toolName: "Spin Wheel",
//     campaign: "",
//     validity: "",
//   },
//   {
//     id: 1,
//     toolName: "Scratch Card",
//     campaign: "",
//     validity: "",
//   },
// ];
// const otherSellers = [
//   {
//     title: "New (0) From",
//     ActualPrice: {
//       start: "00",
//       end: "00",
//     },
//     delivery: {
//       start: "00",
//       end: "00",
//     },
//   },
// ];
const handPick = true;
// const sameProduct = [
//   {
//     id: 1,
//     image:
//       "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
//     amount: "1250",
//     color: "Blue",
//   },
//   {
//     id: 2,
//     image:
//       "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
//     amount: "1050",
//     color: "Black",
//   },
//   {
//     id: 3,
//     image:
//       "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
//     amount: "1350",
//     color: "Red",
//   },
//   {
//     id: 4,
//     image:
//       "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
//     amount: "1450",
//     color: "Green",
//   },
// ];

// const sizeData = ["S", "M", "L", "XL", "XXL"];
const ProductDetails = ({ productId }) => {
  // Windos Size
  const size = useWindowSize();

  const router = useRouter();
  const [imageSize, setImageSize] = useState({ width: 300, height: 300 });
  const [selectedImage, setSelectedImage] = useState("");
  // Product Details
  const [masterData, setMasterData] = useState([]);
  const [selectedMasterData, setSelectedMasterData] = useState({});
  const [defaultFormData, setDefaultFormData] = useState({
    handpick: true,
    ownerDelivery: false,
    normal: true,
    fast: false,
    normalDelivery: true,
    freeDelivery: false,
    shipmemtamount: "45",
    optionDeliver: false,
    optionFastDeliver: false,
    fdrDeliverAmount: "45",
    cashondelivery: false,
    returnamount: "0",
    normalreturn: false,
    fastreturn: false,
  });
  const [count, setCount] = useState(1);
  const [showLongDescription, setShowLongDescription] = useState(false);
  const storeDetails = useSelector((state) => ({
    supplierId: state.customer.supplierId,
    storeCode: state.customer.storeCode,
  }));

  useEffect(() => {
    if (size.width > 800) {
      setImageSize({
        width: parseInt(size.width, 10) / 4.5,
        height: parseInt(size.width, 10) / 4,
      });
    }
  }, [size]);
  const getProductDetails = async () => {
    const status = "APPROVED";
    await serviceUtil
      .get(
        `products/master-product/product-variations?id=${
          router.query.id ?? productId
        }&status=${status}`
      )
      .then((res) => {
        setMasterData(res.data.data);
        res.data?.data?.productVariations.forEach((item) => {
          if (
            item.productVariationId === router.query.id ||
            item.productVariationId === productId
          ) {
            setSelectedMasterData(item);
            setSelectedImage(item.variationMedia[0]);
          }
        });
      })
      .catch(() => {
        // console.log(err.response);
      });
  };
  const [selectedImageId, setSelectedImageId] = useState("1");
  // frequentproduct
  const [frequentProduct, setfrequentProduct] = useState([]);
  const [formFrequentData, setFormFrequentData] = useState({
    actualCost: "",
    fd: "",
    handpick: "",
    storeowner: "",
  });
  const getfrequentProduct = async (id) => {
    const ids = (router.query.id ? router.query.id : id) ?? productId;
    await serviceUtil
      .get(`products/grouped-product/${ids}`)
      .then((res) => {
        let actualCost = 0;
        let fd = 0;
        let handPicks = 0;
        res.data.data.forEach((item) => {
          if (item.mrp) {
            actualCost += item.mrp;
          }
          if (item.salePriceWithLogistics) {
            fd += item.salePriceWithLogistics;
          }
          if (item.salePrice) {
            handPicks += item.salePrice;
          }
        });
        setFormFrequentData({
          actualCost,
          fd,
          handpick: handPicks,
          storeowner: handPicks,
        });
        setfrequentProduct(res.data.data);
      })
      .catch(() => {
        // console.log(err);
        setfrequentProduct([]);
      });
  };
  const handleVariationClick = (id) => {
    masterData.productVariations.forEach((item) => {
      if (item.productVariationId === id) {
        setSelectedMasterData(item);
        setSelectedImage(item.variationMedia[0]);
        getfrequentProduct(item.productVariationId);
        const element = document.getElementById("MainBox");
        element.scrollIntoView();
        setSelectedImageId("1");
      }
    });
  };
  // coupons api
  const [couponMasterData, setCouponsMasterData] = useState([]);
  const getCouponsData = async () => {
    await serviceUtil
      .get(`users/customer/store-coupon?supplierId=${storeDetails.supplierId}`)
      .then((res) => {
        setCouponsMasterData(res.data.data);
      })
      .catch((err) => {
        const error = { err };
        if (error) setCouponsMasterData([]);
      });
  };
  // minimum cart value
  const [minCartValue, setMinCartValue] = useState("");
  const getMinimumCart = async () => {
    await serviceUtil
      .get(
        `users/supplier/supplier-store-configuration?storeCode=${storeDetails.storeCode}`
      )
      .then((res) => {
        setMinCartValue(res.data?.data?.minimumOrderAmount);
      })
      .catch(() => {
        // console.log(err);
      });
  };
  useEffect(() => {
    getProductDetails();
    getCouponsData();
    getfrequentProduct();
    getMinimumCart();

    // Scroll the Screen to top....
    const element = document.getElementById("MainBox");
    element.scrollIntoView();
  }, [router.query]);
  const handleImageClick = (value, ind) => {
    setSelectedImage(value);
    setSelectedImageId(ind);
  };
  const handleMinusClick = () => {
    setCount((prev) => (prev > 1 ? prev - 1 : 1));
  };
  const handlePlusClick = () => {
    setCount((prev) => (masterData.limitsPerOrder > prev ? prev + 1 : prev));
  };
  const renderDiscriptionImage = (data) => {
    return data?.map((item) => {
      if (/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(item)) {
        return (
          <Box className="me-2">
            <Image
              src={item}
              height={100}
              width={100}
              layout="intrinsic"
              alt="alt"
              className="border rounded"
            />
          </Box>
        );
      }
    });
  };
  const renderDiscriptionFiles = (data) => {
    return data?.map((item) => {
      if (!/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(item)) {
        return (
          <Typography className="h-5 color-blue cursor-pointer">
            {item}
          </Typography>
        );
      }
    });
  };
  return masterData ? (
    <Paper id="MainBox">
      <Grid container spacing={2}>
        <Grid
          item
          md={3.5}
          sm={6}
          // sx={{ position: "sticky", top: 0, height: "100%" }}
        >
          <Grid container spacing={1}>
            <Grid
              item
              md={2}
              sm={4}
              display="flex"
              direction="column"
              mt={0.5}
              justifyContent={
                selectedMasterData?.variationMedia?.length > 4 ||
                selectedMasterData?.variationMedia?.length < 2
                  ? "space-between"
                  : "space-evenly"
              }
              pb={1}
            >
              {selectedMasterData.variationMedia &&
                selectedMasterData?.variationMedia?.map((item, index) => (
                  <Image
                    height={50}
                    width={50}
                    src={item}
                    layout="responsive"
                    onClick={() => {
                      handleImageClick(item, index + 1);
                    }}
                    className={`border rounded cursor-pointer ${
                      selectedImageId == index + 1 && `border-orange `
                    }`}
                  />
                ))}
            </Grid>
            <Grid item md={10} sm={7} className="">
              {selectedImage !== "" && (
                // <Image
                //   height="100%"
                //   width="100%"
                //   src={selectedImage}
                //   layout="responsive"
                //   className="border rounded p-1"
                // />
                <ReactImageMagnify
                  {...{
                    smallImage: {
                      alt: "No Images",
                      height: imageSize.height,
                      width: imageSize.width,
                      src: selectedImage,
                    },
                    largeImage: {
                      src: selectedImage,
                      width: 1200,
                      height: 1800,
                    },
                    enlargedImageContainerDimensions: {
                      width: "250%",
                      height: "130%",
                    },
                  }}
                  className="bg-white zIndex-100"
                  shouldUsePositiveSpaceLens
                  imageClassName="border rounded p-1 zIndex-100"
                  // lensStyle={{
                  //   background: "hsla(0, 0%, 100%, .3)",
                  //   border: "1px solid #fff",
                  // }}
                  enlargedImageClassName="zIndex-100"
                />
              )}
            </Grid>
          </Grid>
          {couponMasterData.length ? (
            <Grid container>
              <Grid item md={2} />
              <Grid item md={10}>
                <Typography className="h-4 fw-bold">
                  Coupon Available For This Product
                </Typography>
                {couponMasterData.map((item) => (
                  <Box className="border rounded p-2 my-2">
                    <Typography className="h-5">
                      {item.couponAmount} Rs Discount Applicable For This
                      Product Your Coupon Code - &nbsp;
                      <span className="color-blue">
                        {item.storeCouponCode}
                      </span>{" "}
                      <CopyAllSharp
                        className="fs-16"
                        sx={{ cursor: "pointer" }}
                      />
                    </Typography>
                  </Box>
                ))}
              </Grid>
            </Grid>
          ) : null}
          <Grid container>
            <Grid item md={2} />
            <Grid item md={10}>
              <InputBox
                size="small"
                placeholder="Have a Question?.. Type here"
              />
              <Typography className="h-6 color-blue">
                Find Answers In Product Info, Q&As, Reviews
              </Typography>
            </Grid>
          </Grid>
          {/* <Grid container>
            <Grid item md={2} />
            <Grid item md={10}>
              <Typography className="h-4 fw-bold">
                Store Owners Coupon Available
              </Typography>
              {ownersCoupons.map((item) => (
                <Box className="border bg-light-orange1 rounded p-2 my-2 border-orange">
                  <Grid container>
                    <Grid item xs={5}>
                      <Typography className="h-5"> Tool Name </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography>:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography className="h-5"> {item.toolName}</Typography>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={5}>
                      <Typography className="h-5"> Campaign Title </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography>:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography className="h-5"> {item.campaign}</Typography>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={5}>
                      <Typography className="h-5"> Validity Period </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography>:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography className="h-5"> {item.validity}</Typography>
                    </Grid>
                  </Grid>
                </Box>
              ))}
            </Grid>
          </Grid> */}
          {/* <Grid container>
            <Grid item md={2} />
            <Grid item md={10}>
              <Typography className="h-4 fw-bold">
                From Other Sellers
              </Typography>
              {otherSellers.map((item) => (
                <Box className="border rounded p-2">
                  <Typography className="h-5 ">{item.title}</Typography>
                  <Grid container mt={0.4}>
                    <Grid item xs={5}>
                      <Typography className="h-5"> Actual Price</Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography>-</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography className="h-5">
                        {item.ActualPrice.start} - {item.ActualPrice.end}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={5}>
                      <Typography className="h-5"> Delivery Price</Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography>-</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography className="h-5">
                        {item.delivery.start} - {item.delivery.end}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Typography className="h-5 ">
                    Delivery <span className="h-6">On Order Over Rs.500</span>
                  </Typography>
                </Box>
              ))}
              <Box className="mt-2">
                <Typography className="h-5 color-blue">
                  View Shipping and Cancellation Policy
                </Typography>
              </Box>
            </Grid>
          </Grid> */}
        </Grid>
        <Grid item md={8.5}>
          <Box className="d-flex justify-content-between me-3">
            <Typography className="h-5 color-light-green">
              We Get You To The Product Exact Price - No Indirect Charges
            </Typography>
            <Box className="d-flex justify-content-end">
              <Box className="d-flex me-3">
                <RemoveRedEye className="fs-18 color-gray" />
                <Typography className="mx-1 h-5 color-gray">2138</Typography>
              </Box>
              <Box className="d-flex">
                <AirportShuttle className="fs-18 color-gray" />
                <Typography className="mx-1 h-5 color-gray">1238</Typography>
              </Box>
            </Box>
          </Box>
          <Grid container>
            <Grid item md={12}>
              <Typography className="h-3 fw-bold">
                {selectedMasterData.productTitle}
              </Typography>
            </Grid>
          </Grid>
          <Box className="d-flex mt-1">
            <Rating value={4} readOnly sx={{ color: "#e56700" }} />
            <span className="fs-12 mt-1"> 192 Rating | &nbsp;</span>
            <span className="fs-12 mt-1"> 22 Answered Questions</span>
            <span className="fs-12 mt-1 ms-3 color-blue text-decoration-underline cursor-pointer">
              {" "}
              Want To Sell With Us?
            </span>
          </Box>
          <Grid container spacing={2}>
            <Grid item md={6}>
              <Box>
                <Typography className="h-4 fw-bold color-orange">
                  Choose Delivery Options
                </Typography>
                <Box>
                  <RadiobuttonComponent
                    size="small"
                    label={selectedMasterData.salePrice}
                    isChecked={defaultFormData.normalDelivery}
                    onRadioChange={() => {
                      setDefaultFormData((prev) => ({
                        ...prev,
                        normalDelivery: true,
                        freeDelivery: false,
                        optionDeliver: false,
                        optionFastDeliver: false,
                        normal: true,
                        shipmemtamount: "45",
                        cashondelivery: false,
                        normalreturn: false,
                        fastreturn: false,
                      }));
                    }}
                  />
                  <Typography className="ms-4 h-5">
                    MRP :{" "}
                    <span className="text-decoration-line-through">
                      {selectedMasterData.mrp}
                    </span>
                  </Typography>
                  <Box className="d-flex">
                    <Box>
                      <Typography className="h-5">You Save : &nbsp;</Typography>
                    </Box>
                    <Box>
                      <Typography className="h-5">
                        {selectedMasterData.mrp - selectedMasterData.salePrice}{" "}
                        (
                        {(
                          ((selectedMasterData.mrp -
                            selectedMasterData.salePrice) /
                            selectedMasterData.mrp) *
                          100
                        ).toFixed(2)}
                        % )
                      </Typography>
                      <Typography className="h-5">
                        Inclusive Of All Taxes
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    {handPick && (
                      <Box>
                        <Box>
                          <RadiobuttonComponent
                            size="small"
                            label="Handpick From Store"
                            isChecked={defaultFormData.handpick}
                            onRadioChange={() => {
                              setDefaultFormData((prev) => ({
                                ...prev,
                                handpick: true,
                                ownerDelivery: false,
                              }));
                            }}
                          />
                        </Box>
                        <Box>
                          <RadiobuttonComponent
                            size="small"
                            label={`Store Owner Delivery-Mininum Cart Value ${minCartValue}`}
                            isChecked={defaultFormData.ownerDelivery}
                            onRadioChange={() => {
                              setDefaultFormData((prev) => ({
                                ...prev,
                                handpick: false,
                                ownerDelivery: true,
                              }));
                            }}
                          />
                        </Box>
                      </Box>
                    )}
                  </Box>
                  <Grid container className="mt-2">
                    <Typography className="h-5">
                      Enter The Pincode To Check If The Product Is Deliverable
                      To Your Location Or Not
                    </Typography>
                    <Grid item xs={10}>
                      <div
                        className="d-flex bg-white rounded justify-content-between"
                        style={{
                          border: "1px solid #c0ad9d",
                        }}
                      >
                        <input
                          className="p-2 w-100 bg-white"
                          placeholder="Enter Pincode"
                          style={{
                            background: "#fae1cc",
                            outline: "none",
                            border: "none",
                            borderRadius: "5px",
                          }}
                        />
                        <Box
                          sx={{
                            m: "0.08rem",
                          }}
                          className="d-flex bg-gray px-3 rounded align-items-center cursor-pointer h-5"
                        >
                          <Typography className="h-5">Check</Typography>
                        </Box>
                      </div>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
              <Box className="mt-2">
                <Typography className="h-4 color-blue">
                  Choose Forward Shipment
                </Typography>
                <Box>
                  <RadiobuttonComponent
                    size="small"
                    label="₹45 - Delivery By Wed, Sep 22"
                    isChecked={defaultFormData.normal}
                    onRadioChange={() => {
                      setDefaultFormData((prev) => ({
                        ...prev,
                        normal: true,
                        fast: false,
                        normalDelivery: true,
                        shipmemtamount: "45",
                        freeDelivery: false,
                        optionDeliver: false,
                        optionFastDeliver: false,
                      }));
                    }}
                  />
                </Box>
                <Box>
                  <RadiobuttonComponent
                    size="small"
                    label="₹185 - Fastest Delivery By Sunday, Sep 22"
                    isChecked={defaultFormData.fast}
                    onRadioChange={() => {
                      setDefaultFormData((prev) => ({
                        ...prev,
                        normal: false,
                        fast: true,
                        shipmemtamount: "185",
                        normalDelivery: true,
                        freeDelivery: false,
                        optionDeliver: false,
                        optionFastDeliver: false,
                      }));
                    }}
                  />
                </Box>
              </Box>
              <Box>
                <Typography className="h-4 color-blue">
                  Choose Return Shipment
                </Typography>
                <Box>
                  <RadiobuttonComponent
                    size="small"
                    label="₹45 - Product Return Charge"
                    isChecked={defaultFormData.normalreturn}
                    onRadioChange={() => {
                      setDefaultFormData((prev) => ({
                        ...prev,
                        normalreturn: true,
                        fastreturn: false,
                        returnamount: "45",
                      }));
                    }}
                  />
                </Box>
                <Box>
                  <RadiobuttonComponent
                    size="small"
                    label="₹185 - Product Fast Return"
                    isChecked={defaultFormData.fastreturn}
                    onRadioChange={() => {
                      setDefaultFormData((prev) => ({
                        ...prev,
                        normalreturn: false,
                        fastreturn: true,
                        returnamount: "185",
                      }));
                    }}
                  />
                </Box>
                <Grid container>
                  <Grid item xs={10}>
                    <div
                      className="d-flex bg-white rounded justify-content-between"
                      style={{
                        border: "1px solid #c0ad9d",
                      }}
                    >
                      <input
                        className="p-2 w-100 bg-white"
                        placeholder="Enter Coupon Code"
                        style={{
                          background: "#fae1cc",
                          outline: "none",
                          border: "none",
                          borderRadius: "5px",
                        }}
                      />
                      <Box
                        sx={{
                          m: "0.08rem",
                        }}
                        className="d-flex bg-gray px-2 rounded align-items-center cursor-pointer w-40p"
                      >
                        <Typography className="d-flex justify-content-center h-5">
                          Apply Coupon
                        </Typography>
                      </Box>
                    </div>
                  </Grid>
                </Grid>
                {defaultFormData.normalDelivery && (
                  <>
                    <Typography className="mt-2">
                      <span className="fw-bold">
                        {" "}
                        ₹{" "}
                        {selectedMasterData.salePrice +
                          parseInt(defaultFormData.shipmemtamount, 10) +
                          parseInt(defaultFormData.returnamount, 10)}{" "}
                      </span>{" "}
                      - Final Price Including Transaction Charge
                    </Typography>
                    <Typography className="h-6 color-red">
                      Pay Through UPI TO Avoid Transaction Charges
                    </Typography>
                  </>
                )}
              </Box>
              {/* <Grid container mt={1}>
                <Grid item md={12}>
                  <Typography className="h-4 color-blue">
                    Add a Protection Plan
                  </Typography>
                </Grid>
                <Grid item md={7} display="flex" alignItems="center" mt={1}>
                  <CheckBoxComponent
                    label=""
                    size="medium"
                    showIcon
                    varient="filled"
                  />
                  <Typography className="h-5" sx={{ marginLeft: "-15px" }}>
                    0 Year Extended Warranty For RS.00.00
                  </Typography>
                </Grid>
                <Grid item md={7} display="flex" alignItems="center">
                  <CheckBoxComponent
                    label=""
                    size="medium"
                    showIcon
                    varient="filled"
                  />
                  <Typography className="h-5" sx={{ marginLeft: "-15px" }}>
                    0 Year Extended Warranty For RS.00.00
                  </Typography>
                </Grid>
              </Grid> */}
              {/* <Grid container mt={1} columnGap={5}>
                <Grid item md={2}>
                  <Box className="border rounded d-center">
                    <AirportShuttle
                      sx={{ fontSize: "60px", cursor: "pointer" }}
                      className="py-2"
                    />
                  </Box>
                  <Typography className="text-center h-5 color-blue cursor-pointer">
                    Pay On Delivery
                  </Typography>
                </Grid>
                <Grid item md={2}>
                  <Box className="border rounded d-center">
                    <SwapHoriz
                      sx={{ fontSize: "60px", cursor: "pointer" }}
                      className="py-3"
                    />
                  </Box>
                  <Typography className="text-center h-5 color-blue cursor-pointer">
                    7 Days Replacement
                  </Typography>
                </Grid>
                <Grid item md={2}>
                  <Box className="border rounded d-center">
                    <Shield
                      sx={{ fontSize: "60px", cursor: "pointer" }}
                      className="py-3"
                    />
                  </Box>
                  <Typography className="text-center h-5 color-blue cursor-pointer">
                    1 Year Warranty
                  </Typography>
                </Grid>
              </Grid> */}
            </Grid>
            <Grid item md={6}>
              {selectedMasterData.rtoAccepted && (
                <>
                  <Box>
                    <RadiobuttonComponent
                      size="small"
                      label={`${selectedMasterData.salePrice} (With Free Delivery & Return)`}
                      isChecked={defaultFormData.freeDelivery}
                      onRadioChange={() => {
                        setDefaultFormData((prev) => ({
                          ...prev,
                          normalDelivery: false,
                          freeDelivery: true,
                          normal: false,
                          fast: false,
                          shipmemtamount: "0",
                          optionDeliver: true,
                          optionFastDeliver: false,
                          fdrDeliverAmount: "0",
                          cashondelivery: false,
                        }));
                      }}
                    />
                    <Typography className="ms-4 h-5">
                      MRP :{" "}
                      <span className="text-decoration-line-through">
                        {selectedMasterData.mrp}
                      </span>
                    </Typography>
                    <Box className="d-flex">
                      <Box>
                        <Typography className="h-5">
                          You Save : &nbsp;
                        </Typography>
                      </Box>
                      <Box>
                        <Typography className="h-5">
                          {selectedMasterData.mrp -
                            selectedMasterData.salePrice}{" "}
                          (
                          {(
                            ((selectedMasterData.mrp -
                              selectedMasterData.salePrice) /
                              selectedMasterData.mrp) *
                            100
                          ).toFixed(2)}
                          % )
                        </Typography>
                        <Typography className="h-5">
                          Inclusive Of All Taxes
                        </Typography>
                      </Box>
                    </Box>
                    <Grid container className="mt-2">
                      <Grid item xs={10}>
                        <div
                          className="d-flex bg-white rounded justify-content-between"
                          style={{
                            border: "1px solid #c0ad9d",
                          }}
                        >
                          <input
                            className="p-2 w-100 bg-white"
                            placeholder="Enter Coupon Code"
                            style={{
                              background: "#fae1cc",
                              outline: "none",
                              border: "none",
                              borderRadius: "5px",
                            }}
                          />
                          <Box
                            sx={{
                              m: "0.08rem",
                            }}
                            className="d-flex bg-gray px-2 rounded align-items-center cursor-pointer w-40p"
                          >
                            <Typography className="d-flex justify-content-center h-5">
                              Apply Coupon
                            </Typography>
                          </Box>
                        </div>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box className="mt-2">
                    <Typography className="h-4 color-blue">
                      Choose Delivery Options
                    </Typography>
                    <Box>
                      <RadiobuttonComponent
                        size="small"
                        label="Free Delivery By Wed, Sep 22"
                        isChecked={defaultFormData.optionDeliver}
                        onRadioChange={() => {
                          setDefaultFormData((prev) => ({
                            ...prev,
                            normalDelivery: false,
                            freeDelivery: true,
                            normal: false,
                            fast: false,
                            shipmemtamount: "0",
                            optionDeliver: true,
                            optionFastDeliver: false,
                            fdrDeliverAmount: "0",
                          }));
                        }}
                      />
                    </Box>
                    <Box>
                      <RadiobuttonComponent
                        size="small"
                        label="₹185 - Fastest Delivery By Sunday, Sep 17"
                        isChecked={defaultFormData.optionFastDeliver}
                        onRadioChange={() => {
                          setDefaultFormData((prev) => ({
                            ...prev,
                            normalDelivery: false,
                            freeDelivery: true,
                            normal: false,
                            fast: false,
                            shipmemtamount: "0",
                            optionDeliver: false,
                            optionFastDeliver: true,
                            fdrDeliverAmount: "185",
                          }));
                        }}
                      />
                    </Box>
                    <Box>
                      <CheckBoxComponent
                        label="COD Delivery By Wed, sep27"
                        size="medium"
                        showIcon
                        varient="filled"
                        isDisabled={!selectedMasterData.codAvailable}
                        checkBoxClick={() => {
                          setDefaultFormData((pre) => ({
                            ...pre,
                            cashondelivery: !defaultFormData.cashondelivery,
                          }));
                        }}
                        isChecked={defaultFormData.cashondelivery}
                      />
                    </Box>
                  </Box>
                  <Box className="mt-2">
                    <Typography className="h-5 ms-2 color-blue">
                      Enter Pincode & Check If Its Deliverable/Not
                    </Typography>
                    <Grid container className="mt-2">
                      <Grid item xs={10}>
                        <div
                          className="d-flex bg-white rounded justify-content-between"
                          style={{
                            border: "1px solid #c0ad9d",
                          }}
                        >
                          <input
                            className="p-2 w-100 bg-white"
                            placeholder="Enter Pincode"
                            style={{
                              background: "#fae1cc",
                              outline: "none",
                              border: "none",
                              borderRadius: "5px",
                            }}
                          />
                          <Box
                            sx={{
                              m: "0.08rem",
                            }}
                            className="d-flex bg-gray px-3 rounded align-items-center cursor-pointer h-5"
                          >
                            <Typography className="h-5">Check</Typography>
                          </Box>
                        </div>
                      </Grid>
                    </Grid>
                    {defaultFormData.freeDelivery && (
                      <>
                        <Typography className="mt-3">
                          <span className="fw-bold">
                            {" "}
                            ₹{" "}
                            {selectedMasterData.salePrice +
                              parseInt(defaultFormData.fdrDeliverAmount, 10)}
                          </span>{" "}
                          - Final Price Including Transaction Charge
                        </Typography>
                        <Typography className="h-6 color-red">
                          Pay Through UPI TO Avoid Deduction Of Transaction
                          Charges In Case Of RTO Happens
                        </Typography>
                      </>
                    )}
                  </Box>
                </>
              )}
              <Box className="my-4  w-75 d-flex justify-content-end">
                <Box
                  className=" d-flex w-33p justify-content-center align-items-center px-2 py-2 rounded"
                  style={{ border: "1px solid #292929" }}
                >
                  <div className="me-3" onClick={() => handleMinusClick()}>
                    <CustomIcon
                      type="removeIcon"
                      className="border rounded-circle color-black fs-20"
                      showColorOnHover={false}
                    />
                  </div>
                  <span className="fw-bold">{count}</span>
                  <div className="ms-3" onClick={() => handlePlusClick()}>
                    <CustomIcon
                      type="add"
                      className="border rounded-circle color-black fs-20"
                      showColorOnHover={false}
                    />
                  </div>
                </Box>
              </Box>

              <Box className="mb-3 d-flex justify-content-center">
                <ButtonComponent
                  label="Add To Cart"
                  variant="outlined"
                  muiProps="w-25 me-3 py-2"
                />
                <ButtonComponent label="Buy Now" muiProps="w-25 me-3 py-2" />
              </Box>
              <Box>
                <Typography className="color-light-green h-5 fw-bold">
                  In Stock
                </Typography>
                <Typography className="h-5 mt-1">
                  Sold By{" "}
                  <span className="h-5 color-blue">
                    Balu Enterprises pvt ltd
                  </span>
                </Typography>
                <Typography className="h-5 mt-1">
                  <span className="color-blue">New (0) From </span>
                  <span className="color-orange">Rs 00.00</span>
                </Typography>
              </Box>
              {/* <Box className="mt-3">
                <Grid container gap={1}>
                  {sameProduct.map(() => (
                    <Grid
                      item
                      md={3.8}
                      className="border-orange border rounded p-1"
                    >
                      <Box className="d-flex" height={50} width={50}>
                        <Image
                          height={50}
                          width={50}
                          src={item.image}
                          layout="intrinsic"
                        />
                        <Typography className="h-6 color-orange d-center ms-1">
                          Rs {item.amount}.00
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box> */}
              {/* <Box className="d-flex mt-2 align-items-center">
                <Typography>Size : &nbsp;</Typography>
                {sizeData.map((item) => (
                  <Typography className="border rounded px-2 py-1 mx-2 h-5">
                    {item}
                  </Typography>
                ))}
                <Typography className="h-5 color-blue cursor-pointer">
                  Size Chart
                </Typography>
              </Box> */}
            </Grid>
          </Grid>
          {masterData?.productVariations ? (
            <Grid container gap={1} mt={2}>
              <Grid item md={12}>
                <Typography className="fw-bold">Variations (Color)</Typography>
              </Grid>
              {masterData?.productVariations.map((item) => (
                <Grid
                  item
                  md={1.8}
                  onClick={() => {
                    handleVariationClick(item.productVariationId);
                  }}
                >
                  <Box display="flex" justifyContent="center">
                    <Image
                      height={150}
                      width={150}
                      src={item?.variationMedia[0]}
                      layout="intrinsic"
                      className={`border rounded cursor-pointer ${
                        selectedMasterData.productVariationId ===
                          item.productVariationId && `border-orange`
                      }`}
                      alt="alt"
                    />
                  </Box>
                  <Typography
                    className={`text-center h-5 cursor-pointer ${
                      selectedMasterData.productVariationId ===
                        item.productVariationId && `color-orange`
                    }`}
                  >
                    {item.productTitle}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          ) : null}
          <Grid container className="my-2">
            <Grid item md={11.4}>
              <Paper elevation={3}>
                <Box className="p-2">
                  <Typography className="h-4 fw-bold">Description</Typography>
                  <Typography className="h-5 text-break" lineHeight="1.3rem">
                    {masterData?.shortDescription}{" "}
                    <span
                      className={`h-5 color-blue cursor-pointer ${
                        showLongDescription && `d-none`
                      }`}
                      onClick={() => {
                        setShowLongDescription(true);
                      }}
                    >
                      See more...
                    </span>
                  </Typography>
                  {showLongDescription && (
                    <>
                      <Box className="h-5">
                        <Box className="d-flex">
                          {renderDiscriptionImage(
                            masterData?.shortDescriptionFileUrls
                          )}
                        </Box>
                        <Box>
                          {renderDiscriptionFiles(
                            masterData?.shortDescriptionFileUrls
                          )}
                        </Box>
                      </Box>
                      <Box>
                        {masterData?.longDescription && (
                          <Typography className="h-5">
                            {masterData?.longDescription}
                          </Typography>
                        )}
                        <Box className="h-5">
                          <Box className="d-flex">
                            {renderDiscriptionImage(
                              masterData?.longDescriptionFileUrls
                            )}
                          </Box>
                          <Box>
                            {renderDiscriptionFiles(
                              masterData?.longDescriptionFileUrls
                            )}
                          </Box>
                        </Box>
                        <span
                          className={`h-5 color-blue cursor-pointer ${
                            !showLongDescription && `d-none`
                          }`}
                          onClick={() => {
                            setShowLongDescription(false);
                          }}
                        >
                          Show Less...
                        </span>
                      </Box>
                    </>
                  )}
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Box>
        {frequentProduct.length ? (
          <Grid item md={12} className="my-2 mx-4">
            <Paper elevation={3}>
              <Box className="p-2">
                <Typography className="h-4 fw-bold">
                  Frequently Bought Together
                </Typography>
                <Grid container>
                  <Grid item md={6}>
                    <Grid container>
                      {frequentProduct.map((item, index) => (
                        <>
                          <Grid item md={3}>
                            <Image
                              height={150}
                              width={150}
                              src={item.variationMedia[0]}
                              layout="intrinsic"
                              alt="alt"
                              className="border rounded"
                            />
                          </Grid>
                          {frequentProduct.length - 1 > index && (
                            <Grid item md={1} className="d-center">
                              <Add sx={{ fontSize: "40px" }} />
                            </Grid>
                          )}
                        </>
                      ))}
                    </Grid>
                  </Grid>
                  <Grid item md={6}>
                    <Grid container display="flex" alignItems="center">
                      <Grid item md={6} display="flex" alignItems="center">
                        <RadiobuttonComponent
                          size="small"
                          // label="Actual Price (Excl.Delivery & Return Charge)"
                        />
                        <Typography className="h-5">
                          Actual Price (Excl.Delivery & Return Charge)
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography>:&nbsp;</Typography>
                      </Grid>
                      <Grid item md={3}>
                        <Typography className="fw-bold">
                          ₹ {formFrequentData.actualCost}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container display="flex" alignItems="center">
                      <Grid item md={6} display="flex" alignItems="center">
                        <RadiobuttonComponent size="small" />
                        <Typography className="h-5">
                          Price For Free Delivery & Return
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography>:&nbsp;</Typography>
                      </Grid>
                      <Grid item md={3}>
                        <Typography className="fw-bold">
                          ₹ {formFrequentData.fd}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container display="flex" alignItems="center">
                      <Grid item md={6} display="flex" alignItems="center">
                        <RadiobuttonComponent size="small" />
                        <Typography className="h-5">Hand Pick</Typography>
                      </Grid>
                      <Grid item>
                        <Typography>:&nbsp;</Typography>
                      </Grid>
                      <Grid item md={3}>
                        <Typography className="fw-bold">
                          ₹ {formFrequentData.handpick}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container display="flex" alignItems="center">
                      <Grid item md={6} display="flex" alignItems="center">
                        <RadiobuttonComponent size="small" />
                        <Typography className="h-5">
                          Store Owner Delivery
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography>:&nbsp;</Typography>
                      </Grid>
                      <Grid item md={3}>
                        <Typography className="fw-bold">
                          ₹ {formFrequentData.storeowner}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Typography className="h-5 color-orange cursor-pointer">
                      Add All These To Cart
                    </Typography>
                  </Grid>
                  <Grid container>
                    <Grid item md={8}>
                      {frequentProduct.map((item) => (
                        <Grid item md={12} display="flex" alignItems="center">
                          <CheckBoxComponent
                            // label={`${item.productTitle} - AC ${item.mrp} / FD ${item.salePriceWithLogistics}`}
                            showIcon
                            varient="filled"
                            label=""
                          />
                          <Typography>
                            {item.productTitle}{" "}
                            <span className="color-blue">- AC</span>{" "}
                            <span className="color-light-green">
                              {" "}
                              Rs.{item.mrp}
                            </span>{" "}
                            / <span className="color-blue">FD</span>{" "}
                            <span className="color-light-green">
                              Rs.{item.salePriceWithLogistics}
                            </span>
                          </Typography>
                        </Grid>
                      ))}
                    </Grid>
                    <Grid
                      item
                      md={4}
                      display="flex"
                      alignItems="end"
                      justifyContent="end"
                    >
                      <Box>
                        <Typography className="h-5">
                          AC - Actual Cost
                        </Typography>
                        <Typography className="h-5">
                          FD - Free Delivery & Return
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
        ) : null}
      </Box>
      <Box className="mt-2" paddingX={3}>
        <Paper elevation={3} className="" sx={{ height: "180px" }}>
          <Typography className="h-4 fw-bold ps-2">Similar Products</Typography>
          <Box className="ms-2 d-flex justify-content-between">
            <Skeleton variant="rectangular" width={150} height={150} />
            <Skeleton variant="rectangular" width={150} height={150} />
            <Skeleton variant="rectangular" width={150} height={150} />
            <Skeleton variant="rectangular" width={150} height={150} />
            <Skeleton variant="rectangular" width={150} height={150} />
            <Skeleton variant="rectangular" width={150} height={150} />
            <Skeleton variant="rectangular" width={150} height={150} />
            <Skeleton variant="rectangular" width={150} height={150} />
          </Box>
        </Paper>
      </Box>{" "}
      <Box className="mt-2" paddingX={3}>
        <Paper elevation={3} className="" sx={{ height: "180px" }}>
          <Typography className="h-4 fw-bold ps-2">Recently Viewed</Typography>
          <Box className="ms-2 d-flex justify-content-between">
            <Skeleton variant="rectangular" width={150} height={150} />
            <Skeleton variant="rectangular" width={150} height={150} />
            <Skeleton variant="rectangular" width={150} height={150} />
            <Skeleton variant="rectangular" width={150} height={150} />
            <Skeleton variant="rectangular" width={150} height={150} />
            <Skeleton variant="rectangular" width={150} height={150} />
            <Skeleton variant="rectangular" width={150} height={150} />
            <Skeleton variant="rectangular" width={150} height={150} />
          </Box>
        </Paper>
      </Box>{" "}
      <Box className="mt-2" paddingX={3}>
        <Paper elevation={3} className="" sx={{ height: "180px" }}>
          <Typography className="h-4 fw-bold ps-2">
            Products Related To This Item
          </Typography>
          <Box className="ms-2 d-flex justify-content-between">
            <Skeleton variant="rectangular" width={150} height={150} />
            <Skeleton variant="rectangular" width={150} height={150} />
            <Skeleton variant="rectangular" width={150} height={150} />
            <Skeleton variant="rectangular" width={150} height={150} />
            <Skeleton variant="rectangular" width={150} height={150} />
            <Skeleton variant="rectangular" width={150} height={150} />
            <Skeleton variant="rectangular" width={150} height={150} />
            <Skeleton variant="rectangular" width={150} height={150} />
          </Box>
        </Paper>
      </Box>
      <Grid container className="ps-4">
        <Grid item sm={12}>
          <Typography className="h-4 fw-bold my-2">
            Product Information
          </Typography>
          <Typography className="h-5 my-2">
            Color : <span className="fw-bold">Black</span>
          </Typography>
        </Grid>
        <Grid item md={6}>
          <Typography className="fw-bold h-4">Technical Details</Typography>
          <Grid container>
            <Grid item md={6} className="bg-gray">
              Brand
            </Grid>
            <Grid item md={6}>
              {masterData.brand}
            </Grid>
          </Grid>
        </Grid>
        {masterData?.otherInformationObject &&
          Object.keys(masterData?.otherInformationObject)?.length > 0 && (
            <Grid item md={6}>
              <Typography>Technical Details</Typography>
              {Object.entries(masterData?.otherInformationObject).map(
                (item) => (
                  <Grid container>
                    <Grid item md={6} className="bg-gray">
                      {item[0]}
                    </Grid>
                    <Grid item md={6}>
                      {item[1]}
                    </Grid>
                  </Grid>
                )
              )}
            </Grid>
          )}
      </Grid>
    </Paper>
  ) : null;
};

export default ProductDetails;
