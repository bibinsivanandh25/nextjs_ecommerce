/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import CustomIcon from "services/iconUtils";
import Image from "next/image";
import { Box, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ButtonComponent from "@/atoms/ButtonComponent";
import InputBox from "@/atoms/InputBoxComponent";
import RadiobuttonComponent from "@/atoms/RadiobuttonComponent";
import StarRatingComponentReceivingRating from "@/atoms/StarRatingComponentReceiving";
import ModalComponent from "@/atoms/ModalComponent";
import { useSelector } from "react-redux";
import { productDetailsView } from "services/customer/wishlist";
import toastify from "services/utils/toastUtils";
import { useMutation, useQueryClient } from "react-query";
import serviceUtil from "services/utils";
import AddToCartModal from "../addtocartmodal";
import AddToWishListModal from "../../wishlist/AddToWishListModal";

const ViewModalComponent = ({
  setViewModalOpen = () => {},
  productId = "",
  getProducts = () => {},
  setIconColor = () => {},
}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [viewModalImage, setViewModalImage] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [masterData, setMasterData] = useState({});
  const [viewModalInput, setViewModalInput] = useState("");
  const [count, setCount] = useState(1);
  const [radioBtnText, setRadioBtnText] = useState("NOFREEDELIVERYANDRETURN");
  const [showAddtoCartModal, setShowAddtoCartModal] = useState(false);
  const [showWishListModal, setShowWishListModal] = useState(false);
  const userData = useSelector((state) => state.customer);

  const getProductData = async () => {
    const { data, err } = await productDetailsView(
      userData.profileId,
      productId
    );
    if (data) {
      setMasterData(data);
      setSelectedImage(data.variationMedia[0]);
      setViewModalImage(data.variationMedia);
      setShowModal(true);
    }
    if (err) {
      setViewModalOpen(false);
      setMasterData([]);
      setSelectedImage("");
      setViewModalImage([]);
    }
  };
  useEffect(() => {
    getProductData();
  }, [productId]);
  const handleImageClick = (value, index) => {
    setSelectedImage(value);
    setSelectedImageIndex(index);
  };
  const handleMinusClick = () => {
    setCount((prev) => (prev > 1 ? prev - 1 : 1));
  };
  const handlePlusClick = () => {
    setCount((prev) => (masterData.limitsPerOrder > prev ? prev + 1 : prev));
  };
  const handleBuyNowClick = () => {};
  const handleAddtoCartClik = async () => {
    setShowAddtoCartModal(true);
  };
  const queryClient = useQueryClient();

  const removeWishListMutation = useMutation(
    () => {
      return serviceUtil.put(
        `/users/customer/wishlist?wishlistId=${masterData.wishlistId}&variationId=${masterData.productVariationId}`
      );
    },
    {
      onSuccess: ({ data }) => {
        toastify(data?.message, "success");
        setIconColor((prev) => ({ ...prev, favoriteBorderIcon: false }));
        getProductData(userData.productId, userData.variationDetails);
        queryClient.invalidateQueries(["POPULARDEPARTMENTS"]);
        queryClient.refetchQueries("POPULARDEPARTMENTS", { force: true });
        queryClient.invalidateQueries(["RECENTLYVIEWED"]);
        queryClient.refetchQueries("RECENTLYVIEWED", { force: true });
      },
    }
  );
  const handleIconClick = async () => {
    if (!masterData.inWishlist) {
      setShowWishListModal(true);
    } else {
      removeWishListMutation.mutate();
    }
  };

  return (
    <ModalComponent
      showCloseIcon
      open={showModal}
      onCloseIconClick={() => {
        setViewModalOpen(false);
        setShowModal(false);
      }}
      // showHeader={false}
      ModalWidth={800}
      ModalTitle=""
      headerClassName=""
      iconStyle={{
        right: "0",
        top: "-25px",
        position: "absolute",
        color: "#fff !important",
      }}
      closeIconClasName="cursor-pointer color-white"
      headerBorder=""
      footerClassName="justify-content-end"
      // saveBtnText="Buy Now"
      // onSaveBtnClick={() => handleBuyNowClick()}
      // ClearBtnText="Add to Cart"
      // onClearBtnClick={() => handleAddtoCartClik()}
      showFooter={false}
    >
      <Box className="p-2">
        <Box className="row d-flex">
          <Box className="col-5">
            <Box position="relative">
              {selectedImage && (
                <Image
                  src={selectedImage}
                  width={300}
                  height={300}
                  alt=""
                  className="border rounded bg-white"
                  layout="intrinsic"
                  style={{ aspectRatio: " 1 / 1 " }}
                />
              )}
              <div style={{ position: "absolute", top: 5, right: 5 }}>
                <Paper className="border rounded-circle p-1">
                  <CustomIcon
                    type={
                      masterData.inWishlist ? "heart" : "favoriteBorderIcon"
                    }
                    className="h-3"
                    showColorOnHover={false}
                    onIconClick={() => {
                      handleIconClick();
                    }}
                    color={
                      masterData.inWishlist ? "color-orange" : "color-gray"
                    }
                  />
                </Paper>
              </div>
            </Box>
            <div
              className={`d-flex ${
                viewModalImage.length > 2
                  ? `justify-content-evenly`
                  : `justify-content-start`
              } `}
            >
              {viewModalImage.map((item, index) => (
                <div
                  className="me-1"
                  onClick={() => handleImageClick(item, index)}
                  key={index}
                >
                  <Image
                    src={item}
                    width={70}
                    height={70}
                    alt=""
                    className={`${
                      selectedImageIndex === index && `border-orange`
                    } border rounded`}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              ))}
            </div>
          </Box>
          <Box className="col-7">
            <p className="fw-600">{masterData.productTitle}</p>
            <Box className="mt-1 mb-1 d-flex" alignItems="center">
              <StarRatingComponentReceivingRating
                rating={masterData.customerRatings}
                fontSize="samll"
              />
              <p className="fs-12 fw-400 ms-2">
                {masterData?.noOfRatings} Rating | {masterData?.noOfQACount}{" "}
                Answered Questions
              </p>
            </Box>
            <Typography className="h-5">
              MRP :{" "}
              <span className="text-decoration-line-through fw-bold">
                ₹ {Number(masterData.mrp).toLocaleString("en-IN")}
              </span>
            </Typography>
            <Box>
              <RadiobuttonComponent
                isChecked={radioBtnText === "NOFREEDELIVERYANDRETURN"}
                label={`₹ ${Number(masterData.salePrice).toLocaleString(
                  "en-IN"
                )} (Actual Product cost)`}
                size="small"
                onRadioChange={() => {
                  setRadioBtnText("NOFREEDELIVERYANDRETURN");
                }}
              />
              {masterData.storeFDR ? (
                <RadiobuttonComponent
                  isChecked={radioBtnText === "FREEDELIVERYANDRETURN"}
                  label={`₹ ${Number(
                    masterData.salePriceWithFDR
                  ).toLocaleString("en-IN")} (with free delivery & Return)`}
                  size="small"
                  onRadioChange={() => {
                    setRadioBtnText("FREEDELIVERYANDRETURN");
                  }}
                />
              ) : null}
            </Box>
            <Typography
              className={`${
                masterData.stockStatus == "IN STOCK"
                  ? "color-light-green"
                  : "color-red"
              } h-5 fw-bold`}
            >
              {masterData.stockStatus == "IN STOCK"
                ? "In Stock"
                : "Out Of Stock"}
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
            <Box className="w-100 my-1">
              <Typography className="color-orange h-p89">
                Enter Pincode & Check If Its Deliverable/Not
              </Typography>
              <InputBox
                value={viewModalInput}
                placeholder="Enter Pincode"
                className="fs-10"
                onInputChange={(e) => {
                  setViewModalInput(e.target.value);
                }}
                size="small"
              />
            </Box>
            <Box className="d-flex mt-1">
              <Box className="w-50 me-1">
                <ButtonComponent
                  size="medium"
                  label="Buy Now"
                  fullWidth
                  onBtnClick={() => handleBuyNowClick()}
                />
              </Box>
              <Box className="w-50 ms-1">
                <ButtonComponent
                  fullWidth
                  borderColor="border-black"
                  bgColor="bg-white"
                  textColor="color-black"
                  label="Add to Cart"
                  variant="outlined"
                  size="medium"
                  onBtnClick={() => handleAddtoCartClik()}
                />
              </Box>
            </Box>
          </Box>
        </Box>
        {showAddtoCartModal ? (
          <AddToCartModal
            type={radioBtnText}
            showAddtoCartModal={showAddtoCartModal}
            setShowAddtoCartModal={setShowAddtoCartModal}
            productId={productId}
            count={count}
            getProducts={getProducts}
            setViewModalOpen={setViewModalOpen}
          />
        ) : null}
        {showWishListModal ? (
          <AddToWishListModal
            showModal={showWishListModal}
            setShowModal={setShowWishListModal}
            productId={productId}
            getProducts={() => {
              getProductData();
            }}
            productImage={selectedImage}
            productTitle={masterData.productTitle}
          />
        ) : null}
      </Box>
    </ModalComponent>
  );
};

export default ViewModalComponent;
