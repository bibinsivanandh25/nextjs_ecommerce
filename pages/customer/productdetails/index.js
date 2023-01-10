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
import ProductList from "@/forms/customer/productdetails/productlist";

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

  const size = useWindowSize();

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
      data?.customerViewProductPojo.forEach((item) => {
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
  const [ratingData, setRatingData] = useState({});
  const [ratingMasterData, setRatingMasterData] = useState({});
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
  const handleVariationClick = (id) => {
    getRating(id);
    masterData.customerViewProductPojo.forEach((item) => {
      if (item.productVariationId === id) {
        setSelectedMasterData(item);
        setSelectedImage(item.variationMedia[0]);
        const element = document.getElementById("MainBox");
        element.scrollIntoView();
        setSelectedImageId("1");
      }
    });
  };
  useEffect(() => {
    if (router?.query.id) {
      getProductDetails(router?.query?.id);
      getRating(router?.query?.id);
    }
    // Scroll the Screen to top....
    // const element = document.getElementById("MainBox");
    // element.scrollIntoView();
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
  return (
    <Box id="MainBox">
      {Object.keys(masterData).length ? (
        <Box>
          <Grid container columnSpacing={2}>
            <Grid
              item
              md={3.5}
              sm={3.5}
              sx={{ position: "sticky", top: 0, height: "100%", zIndex: 10 }}
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
                          right: isSideBarOpen ? "5%" : "0%",
                          padding: "2px",
                        }}
                        className="border rounded-circle"
                      >
                        <CustomIcon
                          type={
                            selectedMasterData.inWishlist
                              ? "heart"
                              : "favoriteBorderIcon"
                          }
                          className={
                            selectedMasterData.inWishlist ? "color-red" : ""
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
                            {item.couponAmount} Rs Discount Applicable For This
                            Product Your Coupon Code - &nbsp;
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
            </Grid>
            <Grid item md={8.5} sm={8.5}>
              <Grid container>
                <Grid item md={10}>
                  <Typography className="h-5 fw-500 color-orange">
                    We Get You To The Product Exact Price - No Indirect Charges
                  </Typography>
                </Grid>
                <Grid item md={1} display="flex">
                  <RemoveRedEye className="fs-18 color-gray" />
                  <Typography className="mx-1 h-5 color-gray">2138</Typography>
                </Grid>
                <Grid item md={1} display="flex">
                  <AirportShuttle className="fs-18 color-gray" />
                  <Typography className="mx-1 h-5 color-gray">1238</Typography>
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
                      {!selectedMasterData.handPick ? (
                        <RadiobuttonComponent
                          size="small"
                          label={
                            <Typography className="">
                              <span className="fw-500">
                                {`₹ ${selectedMasterData.salePriceWithHandPick}`}
                              </span>
                              <span className="h-p89"> (HandPick)</span>
                            </Typography>
                          }
                        />
                      ) : null}
                    </Grid>
                    <Grid item md={12}>
                      {!selectedMasterData.storeOwnerDelivery ? (
                        <RadiobuttonComponent
                          size="small"
                          label={
                            <Typography className="">
                              <span className="fw-500">
                                {`₹ ${selectedMasterData.salePricestoreOwnerDelivery}`}
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
                        size="small"
                        label={
                          <Typography className="fw-500">
                            ₹ {selectedMasterData.salePrice}
                          </Typography>
                        }
                        onRadioChange={() => {}}
                      />
                      <Typography className="h-5" marginLeft={3.5}>
                        MRP :{" "}
                        <span className="text-decoration-line-through fw-bold">
                          ₹ {selectedMasterData.mrp}
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
                          {`₹ ${Number(
                            selectedMasterData?.youSave.split(" ")[0]
                          )} 
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
                        Choose Delivery Options
                      </Typography>
                      <Box>
                        <RadiobuttonComponent
                          size="small"
                          label={
                            <Typography>
                              <span className="fw-500">₹83 </span>{" "}
                              <span className="h-p89">
                                - Delivery By Wed, Sep 22
                              </span>
                            </Typography>
                          }
                        />
                      </Box>
                      <Box>
                        <RadiobuttonComponent
                          size="small"
                          label={
                            <Typography>
                              <span className="fw-500">₹183 </span>{" "}
                              <span className="h-p89">
                                - Fastest Delivery By Sunday, Sep 17
                              </span>
                            </Typography>
                          }
                        />
                      </Box>
                    </Grid>
                    <Grid item md={12}>
                      <Typography className="h-4 color-blue">
                        Choose Return Shipment
                      </Typography>
                      <Box>
                        <RadiobuttonComponent
                          size="small"
                          label={
                            <Typography>
                              <span className="fw-500">₹45 </span>{" "}
                              <span className="h-p89">
                                - Product Return Charge
                              </span>
                            </Typography>
                          }
                        />
                      </Box>
                      <Box>
                        <RadiobuttonComponent
                          size="small"
                          label={
                            <Typography>
                              <span className="fw-500">₹163 </span>{" "}
                              <span className="h-p89">
                                - Product Fast Return
                              </span>
                            </Typography>
                          }
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={10}>
                      <div
                        className="d-flex bg-white rounded justify-content-between"
                        style={{
                          border: "1px solid black",
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
                    <Grid item md={12}>
                      <>
                        <Typography className="mt-2">
                          <span className="fw-bold">
                            ₹ 1300
                            {/* ₹{" "}
                              {selectedMasterData.salePrice +
                                parseInt(defaultFormData.shipmemtamount, 10) +
                                parseInt(defaultFormData.returnamount, 10)}{" "} */}
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
                    {selectedMasterData.warrantyAvailable ? (
                      <Grid item md={12} mt={0.5}>
                        <Typography className="h-4 color-blue">
                          Add a Protection Plan
                        </Typography>
                        <Box>
                          <CheckBoxComponent
                            label={
                              <Typography>
                                <span>
                                  {selectedMasterData.warrantyPeriod}{" "}
                                </span>
                                <span className="h-p89">
                                  Year Extended Warranty For RS.100.00
                                </span>
                              </Typography>
                            }
                            size="medium"
                            showIcon
                            varient="filled"
                          />
                        </Box>
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
                            {selectedMasterData.warrantyPeriod} Year Warranty
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
                          onRadioChange={() => {}}
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
                                {`₹ ${Number(
                                  selectedMasterData?.youSaveFDR.split(" ")[0]
                                )} 
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
                              size="small"
                              label="Free Delivery By Wed, Sep 22"
                            />
                          </Box>
                          <Box>
                            <RadiobuttonComponent
                              size="small"
                              label={
                                <Typography>
                                  <span className="fw-500">₹185 </span>{" "}
                                  <span className="h-p89">
                                    - Fastest Delivery By Sunday, Sep 17
                                  </span>
                                </Typography>
                              }
                            />
                          </Box>
                          {selectedMasterData.codAvailable ? (
                            <Box>
                              <CheckBoxComponent
                                label="COD Delivery By Wed, sep27"
                                size="medium"
                                showIcon
                                varient="filled"
                              />
                            </Box>
                          ) : null}
                        </Grid>
                        <Grid item md={12}>
                          <>
                            <Typography className="mt-2">
                              <span className="fw-500">
                                ₹ 1300
                                {/* ₹{" "}
                              {selectedMasterData.salePrice +
                                parseInt(defaultFormData.shipmemtamount, 10) +
                                parseInt(defaultFormData.returnamount, 10)}{" "} */}
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
                      </Grid>
                    ) : null}
                    <Grid item md={12} mt={1}>
                      <Typography className="color-blue">
                        Enter Pincode & Check If Its Deliverable/Not
                      </Typography>
                      <Box>
                        <Grid container marginY={1}>
                          <Grid item xs={10}>
                            <div
                              className="d-flex bg-white rounded justify-content-between"
                              style={{
                                border: "1px solid black",
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
              <Grid item xs={12}>
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
              </Grid>
              <Grid item md={12}>
                <Paper elevation={3}>
                  <Box className="p-2">
                    <Typography className="h-4 fw-bold">Description</Typography>

                    <Typography className="h-5 text-break" lineHeight="1.3rem">
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
          <Grid container mt={2}>
            <Grid item md={12}>
              <Box>
                <FrequentBuyProduct selectedMasterData={selectedMasterData} />
              </Box>
            </Grid>
            <Grid item md={12}>
              <Box className="mt-2">
                <ProductList title="Similar Products" />
              </Box>
              <Box className="mt-2">
                <ProductList title="Recently Viewed" />
              </Box>
              <Box className="mt-2">
                <ProductList title=" Products Related To This Item" />
              </Box>
            </Grid>
          </Grid>
        </Box>
      ) : null}
    </Box>
  );
};

export default ProductDetails;
