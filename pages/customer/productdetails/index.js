/* eslint-disable no-unused-expressions */
/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable consistent-return */
/* eslint-disable no-inner-declarations */
import { Box, Grid, Paper, Rating, Tooltip, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import ReactImageMagnify from "react-image-magnify";
import { useSelector } from "react-redux";
import {
  getAllCouponsData,
  getAllMinumCart,
  getAllProductDetails,
  getAllRating,
} from "services/customer/productdetails";
import {
  AirportShuttle,
  CopyAllSharp,
  RemoveRedEye,
} from "@mui/icons-material";
import MenuwithArrow from "@/atoms/MenuwithArrow";
import LinearProgressBar from "@/atoms/LinearProgressBar";
import RadiobuttonComponent from "@/atoms/RadiobuttonComponent";
import CheckBoxComponent from "@/atoms/CheckboxComponent";
import { TbTruckDelivery } from "react-icons/tb";
import { BsShieldCheck } from "react-icons/bs";
import CustomIcon from "services/iconUtils";
import ButtonComponent from "@/atoms/ButtonComponent";
import FrequentBuyProduct from "@/forms/customer/productdetails/frequentproduct";
// import ProductList from "@/forms/customer/productdetails/productlist";
import { removeProductFromWishList } from "services/customer/wishlist";
import toastify from "services/utils/toastUtils";
import AddToWishListModal from "@/forms/customer/wishlist/AddToWishListModal";
import InputBox from "@/atoms/InputBoxComponent";
import RecentlyViewed from "@/forms/customer/Home/RecentlyViewed";
import FAQPage from "@/forms/customer/productdetails/faqpage";

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);
  return windowSize;
}
const ProductDetails = ({ isSideBarOpen, productId }) => {
  const [masterData, setMasterData] = useState({});
  const [selectedMasterData, setSelectedMasterData] = useState({});
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedImageId, setSelectedImageId] = useState("1");
  const [imageSize, setImageSize] = useState({ width: 250, height: 200 });
  const router = useRouter();
  const userData = useSelector((state) => state.customer);
  const [count, setCount] = useState(1);
  const [couponMasterData, setCouponsMasterData] = useState([]);
  const [showLongDescription, setShowLongDescription] = useState(false);
  const [supplierDetails, setSupplierDetails] = useState({});
  const [searchAnswers, setSearchAnswers] = useState("");
  const [showQAPage, setShowQAPage] = useState(false);
  const [ratingData, setRatingData] = useState({});
  const [ratingMasterData, setRatingMasterData] = useState({});

  const size = useWindowSize();
  // selecting payment method
  const [deliveryOption, setDeliveryOption] = useState({
    type: "NOFREEDELIVERYANDRETURN",
    value: "",
  });
  const [nofdrOptions, setNofdrOptions] = useState({
    deliveryCharge: "",
    fastestDeliveryAmount: "",
    value: "",
  });
  const [chooseReturn, setChooseReturn] = useState(false);
  const [nofdrReturnOption, setNofdrReturnOption] = useState({
    returnAmount: "",
    fastReturnAmount: "",
    value: "",
  });
  const [codAvailable, setCodAvailable] = useState(false);
  const [fdrOptions, setfdrOptions] = useState("");
  useEffect(() => {
    let search;
    if (searchAnswers?.length) {
      search = setTimeout(() => {
        setShowQAPage(true);
      }, 1000);
    }
    return () => clearTimeout(search);
  }, [searchAnswers]);
  useEffect(() => {
    if (size.width > 800 && isSideBarOpen) {
      setImageSize({
        width: parseInt(size.width - 253, 10) / 4.3,
        height: parseInt(size.width, 10) / 5.5,
      });
    } else {
      setImageSize({
        width: parseInt(size.width, 10) / 4.2,
        height: parseInt(size.width, 10) / 4.5,
      });
    }
  }, [size, isSideBarOpen]);
  // product api call
  const getProductDetails = async (id) => {
    const { data, err } = await getAllProductDetails(
      id ?? productId,
      userData.profileId
    );
    if (data) {
      setMasterData(data);
      setSelectedMasterData(data.customerViewProductPojo);
      setSelectedImage(data.customerViewProductPojo.variationMedia[0]);
      setNofdrOptions({
        deliveryCharge:
          data.customerViewProductPojo?.productDeliveryCharges?.deliveryAmount,
        fastestDeliveryAmount: "",
        value:
          data.customerViewProductPojo?.productDeliveryCharges?.deliveryAmount,
      });

      // data?.customerViewProductPojo.forEach((item) => {
      //   if (
      //     item.productVariationId === router.query.id ||
      //     item.productVariationId === productId
      //   ) {

      //   }
      // });
    }
    if (err) {
      setMasterData([]);
      setSelectedMasterData({});
      setSelectedImage("");
    }
  };
  const getMinimumCart = async () => {
    const { data, err } = await getAllMinumCart(userData.storeCode);
    if (data) {
      setSupplierDetails(data);
    }
    if (err) {
      setSupplierDetails({});
    }
  };
  const getCouponsData = async () => {
    const { data, err } = await getAllCouponsData(userData.supplierId);
    if (data?.length) {
      setCouponsMasterData(data);
    }
    if (err) {
      setCouponsMasterData([]);
    }
  };

  const getRating = async (id) => {
    const { data, err } = await getAllRating(id);
    if (data) {
      setRatingMasterData(data);
      setRatingData({
        "5 Star": data.starRating5,
        "4 Star": data.starRating4,
        "3 Star": data.starRating3,
        "2 Star": data.starRating2,
        "1 Star": data.starRating1,
      });
    } else if (err) {
      setRatingData({});
    }
  };
  const scrollPage = () => {
    const element = document.getElementById("MainBox");
    element.scrollIntoView();
  };
  // const handleVariationClick = (id) => {
  //   getRating(id);
  //   masterData.customerViewProductPojo.forEach((item) => {
  //     if (item.productVariationId === id) {
  //       setSelectedMasterData(item);
  //       setSelectedImage(item.variationMedia[0]);
  //       scrollPage();
  //       setSelectedImageId("1");
  //     }
  //   });
  // };
  useEffect(() => {
    if (router?.query.id) {
      getProductDetails(router?.query?.id);
      getRating(router?.query?.id);
    }
    // Scroll the Screen to top....
    scrollPage();
    getMinimumCart();
    getCouponsData();
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
      return null;
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
      return null;
    });
  };
  const [showWishListModal, setShowWishListModal] = useState(false);
  const handleCardIconClick = async () => {
    if (!selectedMasterData.inWishlist) {
      setShowWishListModal(true);
    } else {
      const { data } = await removeProductFromWishList(
        selectedMasterData.wishlistId,
        selectedMasterData.productVariationId
      );
      if (data) {
        toastify(data?.message, "success");
        getProductDetails(selectedMasterData.productVariationId);
      }
    }
  };

  // selecting payment method
  useEffect(() => {
    if (deliveryOption.type === "NOFREEDELIVERYANDRETURN") {
      setNofdrOptions({
        deliveryCharge:
          selectedMasterData?.productDeliveryCharges?.deliveryAmount,
        fastestDeliveryAmount: "",
        value: selectedMasterData?.productDeliveryCharges?.deliveryAmount,
      });
      setfdrOptions("");
    }
    if (deliveryOption.type === "FREEDELIVERYANDRETURN") {
      setChooseReturn(false);
      setNofdrReturnOption({
        returnAmount: "",
        fastReturnAmount: "",
        value: "",
      });
      setNofdrOptions({
        deliveryCharge: "",
        fastestDeliveryAmount: "",
        value: "",
      });
    }
  }, [deliveryOption]);
  // Add to cart payload
  const addToCartPayload = () => {
    const payload = {
      profileId: userData.profileId,
      customerId: userData.userId,
      cartProduct: [],
      flag: false,
    };
    if (deliveryOption.type === "NOFREEDELIVERYANDRETURN") {
      payload.cartProduct.push({
        productId: selectedMasterData.productVariationId,
        quantity: count,
        orderType: "NOFREEDELIVERYANDRETURN",
        skuId: selectedMasterData.skuId,
        fastestDeliveryAmount: nofdrOptions.fastestDeliveryAmount || null,
        deliveryCharge: nofdrOptions.deliveryCharge || null,
        fastestReturnAmount: nofdrReturnOption.fastReturnAmount || null,
        returnCharge: nofdrReturnOption.returnAmount || null,
      });
    }
    if (deliveryOption.type === "FREEDELIVERYANDRETURN") {
      payload.cartProduct.push({
        productId: selectedMasterData.productVariationId,
        quantity: count,
        orderType: "FREEDELIVERYANDRETURN",
        skuId: selectedMasterData.skuId,
        fastestDeliveryAmount: fdrOptions !== 0 ? fdrOptions : null,
        deliveryCharge: null,
        fastestReturnAmount: null,
        returnCharge: null,
      });
    }
    return payload;
  };
  const handleAddtoCart = () => {
    const payload = addToCartPayload();
    console.log(payload);
  };
  return (
    <Box id="MainBox" p={0.5}>
      {!showQAPage ? (
        <>
          {Object.keys(masterData).length ? (
            <Box>
              <Grid container columnSpacing={2}>
                <Grid
                  item
                  lg={3.5}
                  sm={3.5}
                  xs={5}
                  sx={{
                    position: "sticky",
                    top: 0,
                    height: "100%",
                    zIndex: 10,
                  }}
                >
                  <Grid container spacing={1}>
                    <Grid
                      item
                      md={2}
                      p={1}
                      rowGap={1}
                      display="flex"
                      direction="column"
                      mt={0.5}
                      className="h-100"
                    >
                      {selectedMasterData.variationMedia &&
                        selectedMasterData?.variationMedia?.map(
                          (item, index) => (
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
                          )
                        )}
                    </Grid>
                    <Grid item md={10}>
                      {selectedImage !== "" && (
                        <Box position="relative" className="h-100">
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
                            className="bg-white"
                            shouldUsePositiveSpaceLens
                            imageClassName="border rounded p-1"
                            lensStyle={{
                              background: "hsla(0, 0%, 100%, .3)",
                              border: "1px solid #fff",
                            }}
                            enlargedImageClassName=""
                            style={{ position: "relative" }}
                          />
                          <Paper
                            style={{
                              position: "absolute",
                              top: "3%",
                              right: isSideBarOpen ? "5.5%" : "1%",
                            }}
                            className="border rounded-circle"
                            padding={1}
                          >
                            <CustomIcon
                              onIconClick={() => {
                                handleCardIconClick();
                              }}
                              type={
                                selectedMasterData.inWishlist
                                  ? "heart"
                                  : "favoriteBorderIcon"
                              }
                              className={
                                selectedMasterData.inWishlist
                                  ? "color-orange"
                                  : ""
                              }
                              showColorOnHover={false}
                            />
                          </Paper>
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
                                {item.couponAmount} Rs Discount Applicable For
                                This Product Your Coupon Code - &nbsp;
                                <span className="color-blue">
                                  {item.storeCouponCode}
                                </span>{" "}
                                <Tooltip
                                  placement="right-start"
                                  title="Copy Coupon"
                                >
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
                  <Grid container marginTop={0.5}>
                    <Grid item md={2} />
                    <Grid item md={10}>
                      <Typography
                        className="h-p89 color-blue cursor-pointer"
                        onClick={() => {
                          setShowQAPage(true);
                        }}
                      >
                        Find Answers In Product Info, Q&As, Reviews
                      </Typography>
                      <InputBox
                        size="small"
                        value={searchAnswers}
                        placeholder="Have a Question?.. Type here"
                        onInputChange={(e) => {
                          setSearchAnswers(e.target.value);
                        }}
                        onKeyDown={(e) => {
                          if (e.keyCode === 13) {
                            setShowQAPage(true);
                            scrollPage();
                          }
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item lg={8.5} sm={8.5} xs={7}>
                  <Grid container>
                    <Grid item md={10}>
                      <Typography className="h-5 fw-500 color-orange">
                        We Get You To The Product Exact Price - No Indirect
                        Charges
                      </Typography>
                    </Grid>
                    <Grid item md={1} display="flex">
                      <RemoveRedEye className="fs-18 color-gray" />
                      <Typography className="mx-1 h-5 color-gray">
                        2138
                      </Typography>
                    </Grid>
                    <Grid item md={1} display="flex">
                      <AirportShuttle className="fs-18 color-gray" />
                      <Typography className="mx-1 h-5 color-gray">
                        1238
                      </Typography>
                    </Grid>
                  </Grid>
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
                        Header={
                          <Rating
                            value={selectedMasterData.customerRatings}
                            readOnly
                            sx={{ color: "#e56700" }}
                          />
                        }
                        onOpen={() => {}}
                        arrowPosition="center"
                        color="color-black"
                      >
                        <Box className="mnw-300">
                          <Typography className="ms-3 fw-500 h-p89 color-orange mb-1">
                            {ratingMasterData.globalNoOfRatings} Global Ratings
                          </Typography>
                          {Object.keys(ratingData).length
                            ? Object.entries(ratingData).map((item) => (
                                <LinearProgressBar
                                  height={15}
                                  leftTitle={`${item[0]}`}
                                  rightTitle={`${item[1]}%`}
                                  value={item[1]}
                                />
                              ))
                            : null}
                        </Box>
                      </MenuwithArrow>
                    </Box>
                    <span className="fs-12 mt-1 fw-bold">
                      {" "}
                      {selectedMasterData.noOfRatings} Rating |&nbsp;
                    </span>
                    <span className="fs-12 mt-1 fw-bold">
                      {selectedMasterData.noOfQACount} Answered Questions
                    </span>
                    <span className="fs-12 mt-1 ms-3 color-blue text-decoration-underline cursor-pointer">
                      Want To Sell With Us?
                    </span>
                  </Box>
                  <Box>
                    <Typography className="color-orange h-4 fw-bold">
                      Choose Delivery options
                    </Typography>
                  </Box>
                  <Grid container>
                    <Grid item md={6}>
                      <Grid container>
                        <Grid item md={12}>
                          {selectedMasterData.handPick ? (
                            <RadiobuttonComponent
                              size="small"
                              label={
                                <Typography className="">
                                  <span className="fw-500">
                                    {`${selectedMasterData.salePriceWithHandPick}`}
                                  </span>
                                  <span className="h-p89"> (HandPick)</span>
                                </Typography>
                              }
                            />
                          ) : null}
                        </Grid>
                        <Grid item md={12}>
                          {selectedMasterData.storeOwnerDelivery ? (
                            <RadiobuttonComponent
                              size="small"
                              label={
                                <Typography className="">
                                  <span className="fw-500">
                                    {`${selectedMasterData.salePricestoreOwnerDelivery}`}
                                  </span>
                                  <span className="h-p89">
                                    {" "}
                                    (Store Owner Delivery -Minimum Cart Value ₹
                                    {supplierDetails?.minimumOrderAmount})
                                  </span>
                                </Typography>
                              }
                            />
                          ) : null}
                        </Grid>
                        <Grid item md={12}>
                          <RadiobuttonComponent
                            value={deliveryOption.type}
                            isChecked={
                              deliveryOption.type === "NOFREEDELIVERYANDRETURN"
                            }
                            size="small"
                            label={
                              <Typography className="fw-500">
                                {selectedMasterData.salePrice}
                              </Typography>
                            }
                            onRadioChange={() => {
                              setDeliveryOption({
                                type: "NOFREEDELIVERYANDRETURN",
                                value: selectedMasterData.salePrice,
                              });
                            }}
                          />
                          <Typography className="h-5" marginLeft={3.5}>
                            MRP :{" "}
                            <span className="text-decoration-line-through fw-bold">
                              {selectedMasterData.mrp}
                            </span>
                          </Typography>
                        </Grid>
                      </Grid>
                      {selectedMasterData?.youSave ? (
                        <Box className="d-flex">
                          <Box>
                            <Typography className="h-5">
                              You Save : &nbsp;
                            </Typography>
                          </Box>
                          <Box>
                            <Typography className="h-5 fw-500">
                              {`${selectedMasterData?.youSave.split(" ")[0]} 
                            (${selectedMasterData?.youSave.split(" ")[1]})`}
                            </Typography>
                            <Typography className="h-5">
                              Inclusive Of All Taxes
                            </Typography>
                          </Box>
                        </Box>
                      ) : null}
                      <Grid container>
                        <Grid item md={12}>
                          <Typography className="h-4 color-blue">
                            Choose Forward Shipment
                          </Typography>
                          <Box>
                            <RadiobuttonComponent
                              disabled={
                                deliveryOption.type !==
                                "NOFREEDELIVERYANDRETURN"
                              }
                              isChecked={
                                selectedMasterData?.productDeliveryCharges
                                  ?.deliveryAmount ===
                                nofdrOptions.deliveryCharge
                              }
                              value={
                                selectedMasterData?.productDeliveryCharges
                                  ?.deliveryAmount
                              }
                              onRadioChange={() => {
                                setNofdrOptions({
                                  deliveryCharge:
                                    selectedMasterData.productDeliveryCharges
                                      .deliveryAmount,
                                  fastestDeliveryAmount: "",
                                  value:
                                    selectedMasterData.productDeliveryCharges
                                      .deliveryAmount,
                                });
                              }}
                              size="small"
                              label={
                                <Typography>
                                  <span className="fw-500">
                                    ₹
                                    {
                                      selectedMasterData?.productDeliveryCharges
                                        ?.deliveryAmount
                                    }
                                  </span>{" "}
                                  <span className="h-p89">
                                    -{" "}
                                    {
                                      selectedMasterData?.productDeliveryCharges
                                        ?.deliveryBy
                                    }
                                  </span>
                                </Typography>
                              }
                            />
                          </Box>
                          <Box>
                            <RadiobuttonComponent
                              disabled={
                                deliveryOption.type !==
                                "NOFREEDELIVERYANDRETURN"
                              }
                              isChecked={
                                selectedMasterData?.productDeliveryCharges
                                  ?.fastestDeliveryAmount ===
                                nofdrOptions.fastestDeliveryAmount
                              }
                              value={
                                selectedMasterData?.productDeliveryCharges
                                  ?.deliveryAmount
                              }
                              onRadioChange={() => {
                                setNofdrOptions({
                                  deliveryCharge: "",
                                  fastestDeliveryAmount:
                                    selectedMasterData?.productDeliveryCharges
                                      ?.fastestDeliveryAmount,
                                  value:
                                    selectedMasterData?.productDeliveryCharges
                                      ?.fastestDeliveryAmount,
                                });
                              }}
                              size="small"
                              label={
                                <Typography>
                                  <span className="fw-500">
                                    ₹
                                    {
                                      selectedMasterData?.productDeliveryCharges
                                        ?.fastestDeliveryAmount
                                    }{" "}
                                  </span>{" "}
                                  <span className="h-p89">
                                    -{" "}
                                    {
                                      selectedMasterData?.productDeliveryCharges
                                        ?.fastestDeliveryBy
                                    }
                                  </span>
                                </Typography>
                              }
                            />
                          </Box>
                        </Grid>
                        <Grid item md={12}>
                          <CheckBoxComponent
                            isDisabled={
                              deliveryOption.type !== "NOFREEDELIVERYANDRETURN"
                            }
                            label={
                              <Typography className="h-4 color-blue">
                                Choose Return Shipment
                              </Typography>
                            }
                            isChecked={chooseReturn}
                            checkBoxClick={() => {
                              setNofdrReturnOption({
                                returnAmount: !chooseReturn
                                  ? selectedMasterData?.productReturnCharges
                                      ?.returnAmount
                                  : "",
                                fastReturnAmount: "",
                                value: !chooseReturn
                                  ? selectedMasterData?.productReturnCharges
                                      ?.returnAmount
                                  : 0,
                              });
                              setChooseReturn(!chooseReturn);
                            }}
                          />
                          <Box>
                            <RadiobuttonComponent
                              value={
                                selectedMasterData?.productReturnCharges
                                  ?.returnAmount
                              }
                              isChecked={
                                selectedMasterData?.productReturnCharges
                                  ?.returnAmount ===
                                nofdrReturnOption.returnAmount
                              }
                              onRadioChange={() => {
                                setNofdrReturnOption({
                                  returnAmount:
                                    selectedMasterData?.productReturnCharges
                                      ?.returnAmount,
                                  fastReturnAmount: "",
                                  value:
                                    selectedMasterData?.productReturnCharges
                                      ?.returnAmount,
                                });
                              }}
                              disabled={!chooseReturn}
                              size="small"
                              label={
                                <Typography
                                  className={chooseReturn ? "" : "color-gray"}
                                >
                                  <span className="fw-500">
                                    ₹
                                    {
                                      selectedMasterData?.productReturnCharges
                                        ?.returnAmount
                                    }{" "}
                                  </span>{" "}
                                  <span className="h-p89">
                                    -{" "}
                                    {
                                      selectedMasterData?.productReturnCharges
                                        ?.deliveryBy
                                    }
                                  </span>
                                </Typography>
                              }
                            />
                          </Box>
                          <Box>
                            <RadiobuttonComponent
                              value={
                                selectedMasterData?.productReturnCharges
                                  ?.fastestReturnAmount
                              }
                              isChecked={
                                selectedMasterData?.productReturnCharges
                                  ?.fastestReturnAmount ===
                                nofdrReturnOption.fastReturnAmount
                              }
                              onRadioChange={() => {
                                setNofdrReturnOption({
                                  returnAmount: "",
                                  fastReturnAmount:
                                    selectedMasterData?.productReturnCharges
                                      ?.fastestReturnAmount,
                                  value:
                                    selectedMasterData?.productReturnCharges
                                      ?.fastestReturnAmount,
                                });
                              }}
                              disabled={!chooseReturn}
                              size="small"
                              label={
                                <Typography
                                  className={chooseReturn ? "" : "color-gray"}
                                >
                                  <span className="fw-500">
                                    ₹
                                    {
                                      selectedMasterData?.productReturnCharges
                                        ?.fastestReturnAmount
                                    }{" "}
                                  </span>{" "}
                                  <span className="h-p89">
                                    -{" "}
                                    {
                                      selectedMasterData?.productReturnCharges
                                        ?.fastestDeliveryBy
                                    }
                                  </span>
                                </Typography>
                              }
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={10}>
                          <div
                            className="d-flex bg-white justify-content-between"
                            style={{
                              border: "1px solid black",
                              borderRadius: "3px",
                            }}
                          >
                            <input
                              className="p-1 w-100 bg-white"
                              placeholder="Enter Coupon Code"
                              style={{
                                background: "#fae1cc",
                                outline: "none",
                                border: "none",
                                borderRadius: "3px",
                              }}
                            />
                            <Box
                              margin={0.4}
                              borderRadius={1}
                              className="d-flex bg-orange px-3 align-items-center cursor-pointer h-5"
                            >
                              <Typography className="h-5 cursor-pointer color-white fw-bold">
                                Apply
                              </Typography>
                            </Box>
                          </div>
                        </Grid>
                        {deliveryOption.type === "NOFREEDELIVERYANDRETURN" ? (
                          <Grid item md={12}>
                            <>
                              <Typography className="mt-2">
                                <span className="fw-bold">
                                  ₹{" "}
                                  {Number(selectedMasterData.salePrice) +
                                    Number(nofdrOptions.value) +
                                    Number(nofdrReturnOption.value)}
                                </span>{" "}
                                <span className="h-p89">
                                  - Final Price Including Transaction Charge
                                </span>
                              </Typography>
                              <Typography className="h-6 color-red">
                                Pay Through UPI to Avoid Transaction Charges
                              </Typography>
                            </>
                          </Grid>
                        ) : null}
                        <Grid container md={12} columnGap={2} mt={1}>
                          {selectedMasterData.codAvailable ? (
                            <Grid item md={2}>
                              <Box className="d-center">
                                <TbTruckDelivery size="40px" color="#E56700" />
                              </Box>
                              <Typography className="text-center h-5 color-blue cursor-pointer">
                                Pay On Delivery
                              </Typography>
                            </Grid>
                          ) : null}
                          {selectedMasterData.warrantyAvailable ? (
                            <Grid item md={2} mt={0.6}>
                              <Box className="d-center">
                                <BsShieldCheck size="35px" color="#E56700" />
                              </Box>
                              <Typography className="text-center h-5 color-blue cursor-pointer">
                                {selectedMasterData.warrantyPeriod} Year
                                Warranty
                              </Typography>
                            </Grid>
                          ) : null}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item md={6}>
                      <Grid container>
                        {selectedMasterData.fdr ? (
                          <Grid item md={12}>
                            <RadiobuttonComponent
                              value={deliveryOption.type}
                              isChecked={
                                deliveryOption.type === "FREEDELIVERYANDRETURN"
                              }
                              onRadioChange={() => {
                                setfdrOptions(0);
                                setDeliveryOption({
                                  type: "FREEDELIVERYANDRETURN",
                                  value: selectedMasterData.salePriceWithFDR,
                                });
                              }}
                              size="small"
                              label={
                                <Typography>
                                  <span className="fw-500">
                                    ₹ {selectedMasterData.salePriceWithFDR}{" "}
                                  </span>{" "}
                                  <span className="h-p89">
                                    (With Free Delivery & Return)
                                  </span>
                                </Typography>
                              }
                            />
                            <Typography className="h-5" marginLeft={3.5}>
                              MRP :{" "}
                              <span className="text-decoration-line-through fw-500">
                                ₹ {selectedMasterData.mrp}
                              </span>
                            </Typography>
                            {selectedMasterData?.youSaveFDR ? (
                              <Box className="d-flex">
                                <Box>
                                  <Typography className="h-5">
                                    You Save : &nbsp;
                                  </Typography>
                                </Box>
                                <Box>
                                  <Typography className="h-5 fw-500">
                                    {`₹ ${
                                      selectedMasterData?.youSaveFDR.split(
                                        " "
                                      )[0]
                                    } 
                            (${selectedMasterData?.youSaveFDR.split(" ")[1]})`}
                                  </Typography>
                                  <Typography className="h-5">
                                    Inclusive Of All Taxes
                                  </Typography>
                                </Box>
                              </Box>
                            ) : null}
                            <Grid item md={12} mt={0.5}>
                              <Typography className="h-4 color-blue">
                                Choose Delivery Options
                              </Typography>
                              <Box>
                                <RadiobuttonComponent
                                  disabled={
                                    deliveryOption.type !==
                                    "FREEDELIVERYANDRETURN"
                                  }
                                  isChecked={fdrOptions === 0}
                                  value={fdrOptions}
                                  onRadioChange={() => {
                                    setfdrOptions(0);
                                  }}
                                  size="small"
                                  label={
                                    <Typography className="h-p89">
                                      Free{" "}
                                      {
                                        selectedMasterData?.productFreeDelivery
                                          ?.deliveryBy
                                      }
                                    </Typography>
                                  }
                                />
                              </Box>
                              <Box>
                                <RadiobuttonComponent
                                  disabled={
                                    deliveryOption.type !==
                                    "FREEDELIVERYANDRETURN"
                                  }
                                  isChecked={
                                    fdrOptions ===
                                    selectedMasterData?.productFreeDelivery
                                      ?.fastestReturnAmount
                                  }
                                  value={fdrOptions}
                                  onRadioChange={() => {
                                    setfdrOptions(
                                      selectedMasterData?.productFreeDelivery
                                        ?.fastestReturnAmount
                                    );
                                  }}
                                  size="small"
                                  label={
                                    <Typography>
                                      <span className="fw-500">
                                        ₹
                                        {
                                          selectedMasterData
                                            ?.productFreeDelivery
                                            ?.fastestReturnAmount
                                        }{" "}
                                      </span>{" "}
                                      <span className="h-p89">
                                        -{" "}
                                        {
                                          selectedMasterData
                                            ?.productFreeDelivery
                                            ?.fastestDeliveryBy
                                        }
                                      </span>
                                    </Typography>
                                  }
                                />
                              </Box>
                              {selectedMasterData.codAvailable ? (
                                <Box>
                                  <CheckBoxComponent
                                    isChecked={codAvailable}
                                    checkBoxClick={() =>
                                      setCodAvailable(!codAvailable)
                                    }
                                    label={
                                      <Typography>
                                        <span className="fw-500">COD </span>
                                        <span className="h-p89">
                                          -{" "}
                                          {
                                            selectedMasterData
                                              ?.productFreeDelivery?.codBy
                                          }
                                        </span>
                                      </Typography>
                                    }
                                    size="medium"
                                    showIcon
                                    varient="filled"
                                  />
                                </Box>
                              ) : null}
                            </Grid>
                            {deliveryOption.type === "FREEDELIVERYANDRETURN" ? (
                              <Grid item md={12}>
                                <>
                                  <Typography className="mt-2">
                                    <span className="fw-500">
                                      ₹{" "}
                                      {Number(
                                        selectedMasterData.salePriceWithFDR
                                      ) + Number(fdrOptions)}
                                    </span>{" "}
                                    -{" "}
                                    <span className="h-p89">
                                      Final Price Including Transaction Charge
                                    </span>
                                  </Typography>
                                  <Typography className="h-6 color-red">
                                    Pay Through UPI to Avoid Transaction Charges
                                  </Typography>
                                </>
                              </Grid>
                            ) : null}
                          </Grid>
                        ) : null}
                        <Grid item md={12} mt={1}>
                          <Typography
                            className={`${
                              selectedMasterData.instock
                                ? "color-light-green"
                                : "color-red"
                            } h-5 fw-bold`}
                          >
                            {selectedMasterData.instock
                              ? "In Stock"
                              : "Out Of Stock"}
                          </Typography>
                          <Typography className="h-5 mt-1">
                            Sold By{" "}
                            <span className="h-5 color-blue">
                              {supplierDetails.supplierStoreName}
                            </span>
                          </Typography>
                          <Typography className="color-blue h-p89">
                            Enter Pincode & Check If Its Deliverable/Not
                          </Typography>
                          <Box>
                            <Grid container marginY={1}>
                              <Grid item xs={10}>
                                <div
                                  className="d-flex bg-white justify-content-between"
                                  style={{
                                    border: "1px solid black",
                                    borderRadius: "3px",
                                  }}
                                >
                                  <input
                                    className="p-1 w-100 bg-white"
                                    placeholder="Enter Pincode"
                                    style={{
                                      background: "#fae1cc",
                                      outline: "none",
                                      border: "none",
                                      borderRadius: "3px",
                                    }}
                                  />
                                  <Box
                                    margin={0.4}
                                    borderRadius={1}
                                    className="d-flex bg-orange px-3 align-items-center cursor-pointer h-5"
                                  >
                                    <Typography className="h-5 cursor-pointer color-white fw-bold">
                                      Check
                                    </Typography>
                                  </Box>
                                </div>
                              </Grid>
                            </Grid>
                          </Box>
                          <Box
                            mt={1}
                            paddingY={0.7}
                            borderRadius={1}
                            className="w-33p"
                            display="flex"
                            justifyContent="space-evenly"
                            alignItems="center"
                            style={{ border: "1px solid #292929" }}
                          >
                            <div>
                              <CustomIcon
                                type="removeIcon"
                                className="border rounded-circle color-black fs-20"
                                showColorOnHover={false}
                                onIconClick={() => handleMinusClick()}
                              />
                            </div>
                            <span className="fw-bold">{count}</span>
                            <div>
                              <CustomIcon
                                type="add"
                                className="border rounded-circle color-black fs-20"
                                showColorOnHover={false}
                                onIconClick={() => handlePlusClick()}
                              />
                            </div>
                          </Box>
                          <Grid container marginTop={1} columnGap={1}>
                            <Grid item md={4} display="flex">
                              <ButtonComponent
                                label="Add To Cart"
                                variant="outlined"
                                muiProps="py-1 w-100"
                                onBtnClick={() => {
                                  handleAddtoCart();
                                }}
                              />
                            </Grid>
                            <Grid item md={4} display="flex">
                              <ButtonComponent
                                label="Buy Now"
                                muiProps="py-1 w-100"
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* <Grid item xs={12}>
                    {masterData?.customerViewProductPojo ? (
                      <Grid container gap={1} mt={2}>
                        <Grid item md={12} xs={12}>
                          <Typography className="fw-bold">
                            Variations (Color)
                          </Typography>
                        </Grid>
                        {masterData?.customerViewProductPojo.map((item) => (
                          <Grid
                            item
                            md={1.8}
                            onClick={() => {
                              selectedMasterData.productVariationId !==
                                item.productVariationId &&
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
                  </Grid> */}
                  <Grid item md={12}>
                    <Paper elevation={3}>
                      <Box className="p-2">
                        <Typography className="h-4 fw-bold">
                          Description
                        </Typography>

                        <Typography
                          className="h-5 text-break"
                          lineHeight="1.3rem"
                        >
                          <div
                            dangerouslySetInnerHTML={{
                              __html: masterData?.shortDescription,
                            }}
                          />
                          <span
                            className={`h-5 color-blue cursor-pointer ${
                              showLongDescription && `d-none`
                            }`}
                            onClick={() => setShowLongDescription(true)}
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
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: masterData?.longDescription,
                                    }}
                                  />
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
              <Grid container mt={2} px={1}>
                <Grid item md={12}>
                  <Box>
                    <FrequentBuyProduct
                      selectedMasterData={selectedMasterData}
                    />
                  </Box>
                </Grid>
                <Grid item md={12}>
                  <Box className="mt-2">
                    <RecentlyViewed />
                  </Box>
                  {/* <Box className="mt-2">
                <ProductList title=" Products Related To This Item" />
              </Box> */}
                </Grid>
              </Grid>
            </Box>
          ) : null}
          {showWishListModal ? (
            <AddToWishListModal
              showModal={showWishListModal}
              setShowModal={setShowWishListModal}
              productId={selectedMasterData.productVariationId}
              getProductDetails={getProductDetails}
            />
          ) : null}
        </>
      ) : (
        <FAQPage
          setShowQAPage={setShowQAPage}
          searchAnswers={searchAnswers}
          setSearchAnswers={setSearchAnswers}
          productId={selectedMasterData.productVariationId}
        />
      )}
    </Box>
  );
};

export default ProductDetails;
