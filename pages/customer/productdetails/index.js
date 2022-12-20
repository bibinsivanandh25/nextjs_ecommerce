/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable consistent-return */
/* eslint-disable no-inner-declarations */
import {
  // Add,
  AirportShuttle,
  CopyAllSharp,
  RemoveRedEye,
  // Shield,
  // SwapHoriz,
} from "@mui/icons-material";
import {
  Box,
  Grid,
  MenuItem,
  Paper,
  Rating,
  Tooltip,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
// import toastify from "services/utils/toastUtils";
import ReactImageMagnify from "react-image-magnify";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import CustomIcon from "services/iconUtils";
import InputBox from "@/atoms/InputBoxComponent";
import RadiobuttonComponent from "@/atoms/RadiobuttonComponent";
import ButtonComponent from "@/atoms/ButtonComponent";
import CheckBoxComponent from "@/atoms/CheckboxComponent";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FrequentBuyProduct from "@/forms/customer/productdetails/frequentproduct";
import ProductList from "@/forms/customer/productdetails/productlist";
import {
  getAllCouponsData,
  getAllMinumCart,
  getAllProductDetails,
} from "services/customer/productdetails";
import MenuwithArrow from "@/atoms/MenuwithArrow";
import LinearProgressBar from "@/atoms/LinearProgressBar";

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
//     id: 2,
//     toolName: "Scratch Card",
//     campaign: "",
//     validity: "",
//   },
//   {
//     id: 2,
//     toolName: "Scratch Card",
//     campaign: "",
//     validity: "",
//   },
//   {
//     id: 2,
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
  const [imageSize, setImageSize] = useState({ width: 250, height: 200 });
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
  const [selectedImageId, setSelectedImageId] = useState("1");
  const [couponMasterData, setCouponsMasterData] = useState([]);
  const [minCartValue, setMinCartValue] = useState("");

  const storeDetails = useSelector((state) => ({
    supplierId: state.customer.supplierId,
    storeCode: state.customer.storeCode,
  }));

  useEffect(() => {
    if (size.width > 800) {
      setImageSize({
        width: parseInt(size.width, 10) / 4.3,
        height: parseInt(size.width, 10) / 4.3,
      });
    }
  }, [size]);
  const getProductDetails = async (id) => {
    const status = "APPROVED";
    const { data, err } = await getAllProductDetails(id ?? productId, status);
    if (data) {
      setMasterData(data);
      data?.productVariations.forEach((item) => {
        if (
          item.productVariationId === router.query.id ||
          item.productVariationId === productId
        ) {
          setSelectedMasterData(item);
          setSelectedImage(item.variationMedia[0]);
        }
      });
    }
    if (err) {
      setMasterData([]);
      setSelectedMasterData({});
      setSelectedImage("");
    }
  };

  const handleVariationClick = (id) => {
    masterData.productVariations.forEach((item) => {
      if (item.productVariationId === id) {
        setSelectedMasterData(item);
        setSelectedImage(item.variationMedia[0]);
        const element = document.getElementById("MainBox");
        element.scrollIntoView();
        setSelectedImageId("1");
      }
    });
  };
  // coupons api

  const getCouponsData = async () => {
    const { data, err } = await getAllCouponsData(storeDetails.supplierId);
    if (data?.length) {
      setCouponsMasterData(data);
    }
    if (err) {
      setCouponsMasterData([]);
    }
  };
  // minimum cart value

  const getMinimumCart = async () => {
    const { data, err } = await getAllMinumCart(storeDetails.storeCode);
    if (data) {
      setMinCartValue(data?.minimumOrderAmount);
    }
    if (err) {
      setMinCartValue("");
    }
  };
  useEffect(() => {
    if (router?.query.id) {
      getProductDetails(router?.query?.id);
    }
    getCouponsData();
    getMinimumCart();
    // Scroll the Screen to top....
    const element = document.getElementById("MainBox");
    element.scrollIntoView();
  }, [router?.query]);

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
      <Grid container spacing={2}>
        <Grid
          item
          md={3.5}
          sm={4}
          sx={{ position: "sticky", top: 0, height: "100%", zIndex: 10 }}
        >
          <Grid container spacing={1}>
            <Grid
              item
              md={2}
              display="flex"
              direction="column"
              mt={0.5}
              // justifyContent={
              //   selectedMasterData?.variationMedia?.length > 4 ||
              //   selectedMasterData?.variationMedia?.length < 2
              //     ? "space-between"
              //     : "space-evenly"
              // }
              pb={1}
              sm={2}
              rowGap={1.5}
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
            <Grid item md={10} sm={9} className="">
              {selectedImage !== "" && (
                <Box position="relative">
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
                    className="bg-white "
                    shouldUsePositiveSpaceLens
                    imageClassName="border rounded p-1 "
                    // lensStyle={{
                    //   background: "hsla(0, 0%, 100%, .3)",
                    //   border: "1px solid #fff",
                    // }}
                    enlargedImageClassName=""
                    style={{ position: "relative" }}
                  />
                  <FavoriteBorderIcon
                    style={{
                      position: "absolute",
                      top: "2%",
                      zIndex: 10,
                      right: "2%",
                    }}
                    className="color-gray cursor-pointer"
                  />
                </Box>
              )}
            </Grid>
          </Grid>
          {couponMasterData.length ? (
            <Grid container marginTop={1}>
              <Grid item md={2} />
              <Grid item md={10}>
                <Typography className="h-4 fw-bold">
                  Coupon Available For This Product
                </Typography>
                <Box className="mxh-300 overflow-auto hide-scrollbar">
                  {couponMasterData.map((item) => (
                    <Box className="border rounded p-2 my-2">
                      <Typography className="h-5">
                        {item.couponAmount} Rs Discount Applicable For This
                        Product Your Coupon Code - &nbsp;
                        <span className="color-blue">
                          {item.storeCouponCode}
                        </span>{" "}
                        <Tooltip placement="right-start" title="Copy Coupon">
                          <CopyAllSharp
                            className="fs-16"
                            sx={{ cursor: "pointer" }}
                          />
                        </Tooltip>
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Grid>
            </Grid>
          ) : null}
          <Grid container marginTop={1.5}>
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
              <Box className="mxh-300 overflow-auto hide-scrollbar">
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
                        <Typography className="h-5">
                          {" "}
                          {item.toolName}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item xs={5}>
                        <Typography className="h-5">
                          {" "}
                          Campaign Title{" "}
                        </Typography>
                      </Grid>
                      <Grid item xs={1}>
                        <Typography>:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography className="h-5">
                          {" "}
                          {item.campaign}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item xs={5}>
                        <Typography className="h-5">
                          {" "}
                          Validity Period{" "}
                        </Typography>
                      </Grid>
                      <Grid item xs={1}>
                        <Typography>:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography className="h-5">
                          {" "}
                          {item.validity}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                ))}
              </Box>
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
        <Grid item md={8.5} sm={8}>
          <Box className="d-flex justify-content-between me-3">
            <Typography className="h-5 color-light-green">
              We Get You To The Product Exact Price - No Indirect Charges
            </Typography>
          </Box>
          <Grid container>
            <Grid item md={12}>
              <Typography className="h-3 fw-bold">
                {selectedMasterData.productTitle}
              </Typography>
            </Grid>
          </Grid>
          <Box className="d-flex mt-1">
            <Box>
              <MenuwithArrow
                subHeader=""
                Header={<Rating value={4} readOnly sx={{ color: "#e56700" }} />}
                onOpen={() => {}}
                arrowPosition="center"
              >
                <MenuItem>
                  <Box className="mnw-300">
                    <LinearProgressBar
                      height={15}
                      leftTitle="1 Star"
                      rightTitle="20%"
                      value={20}
                    />
                  </Box>
                </MenuItem>
              </MenuwithArrow>
            </Box>
            <span className="fs-12 mt-1 fw-bold"> 192 Rating | &nbsp;</span>
            <span className="fs-12 mt-1 fw-bold"> 22 Answered Questions</span>
            <span className="fs-12 mt-1 ms-3 color-blue text-decoration-underline cursor-pointer">
              Want To Sell With Us?
            </span>
          </Box>
          <Grid container columnSpacing={2}>
            <Grid item md={6} sm={5}>
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
                  <Typography className="h-5" marginLeft={3.5}>
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
                        className="d-flex bg-gray px-2 rounded justify-content-center align-items-center cursor-pointer w-40p"
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
            <Grid item md={6} sm={5}>
              <Box minHeight={selectedMasterData.rtoAccepted ? "" : "80%"}>
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
                      <Typography className="h-5" marginLeft={3.5}>
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
                              className="d-flex bg-gray px-2 rounded justify-content-center align-items-center cursor-pointer w-40p"
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
              </Box>
              <Box className="my-4 d-flex justify-content-center">
                <Box
                  className=" d-flex justify-content-center align-items-center px-2 py-2 rounded"
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
              <Grid container spacing={2}>
                <Grid item md={6} display="flex" justifyContent="end">
                  <ButtonComponent
                    label="Add To Cart"
                    variant="outlined"
                    muiProps="py-1"
                  />
                </Grid>
                <Grid item md={6} display="flex">
                  <ButtonComponent label="Buy Now" muiProps="py-1" />
                </Grid>
              </Grid>
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
              <Grid item md={12} xs={12}>
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
        <FrequentBuyProduct
          router={router}
          productId={selectedMasterData.productVariationId}
        />
      </Box>
      <Box className="mt-2" paddingX={3}>
        <ProductList title="Similar Products" />
      </Box>
      <Box className="mt-2" paddingX={3}>
        <ProductList title="Recently Viewed" />
      </Box>
      <Box className="mt-2" paddingX={3}>
        <ProductList title=" Products Related To This Item" />
      </Box>
      <Grid container className="ps-4 pb-2">
        <Grid item sm={12}>
          <Typography className="h-4 fw-bold my-2">
            Product Information
          </Typography>
          <Typography className="h-5 my-2">
            Color : <span className="fw-bold">Black</span>
          </Typography>
        </Grid>
        <Grid item md={6} sm={6}>
          <Typography className="fw-bold h-4">Technical Details</Typography>
          <Grid container className="border">
            <Grid item sm={6} className="bg-gray text-break py-1 px-2 fw-bold">
              Brand
            </Grid>
            <Grid item sm={6} className="text-break py-1 px-2">
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
