/* eslint-disable no-return-assign */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-lone-blocks */
import { Grid, Paper, Tooltip, Typography } from "@mui/material";
import ButtonComponent from "components/atoms/ButtonComponent";
import Image from "next/image";
import ShareIcon from "@mui/icons-material/Share";
import { Star } from "@mui/icons-material";
// import {  FileCopy } from "@mui/icons-material";
// import ModalComponent from "components/atoms/ModalComponent";
// import { useState } from "react";
// import styled from "@emotion/styled";
// import CheckBoxComponent from "components/atoms/CheckboxComponent";
// import RadiobuttonComponent from "components/atoms/RadiobuttonComponent";
// import StarIcon from "@mui/icons-material/Star";
import { useDispatch, useSelector } from "react-redux";
import { productDetails } from "features/customerSlice";
import { storeUserInfo } from "features/userSlice";
import { useRouter } from "next/router";
import { shareProductPost } from "services/supplier/mysharedproducts";
import toastify from "services/utils/toastUtils";

const ProductDetailsCard = ({
  products = [],
  // showMarginButton = false,
  // getSelectedItem = () => {},
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { supplierId, storeCode } = useSelector((state) => state.user);
  // const [showMarginModal, setShowMarginModal] = useState(false);
  // const [selectedProduct, setSelectedProduct] = useState({});
  // const [margin, setMargin] = useState(20);
  // const [showWishlistModal, setShowWishlistModal] = useState(false);
  // const [showLink, setShowLink] = useState(false);
  // const [wishListCollection, setwishListCollection] = useState([
  //   {
  //     title: "Electronics",
  //     isSelected: false,
  //   },
  //   {
  //     title: "Clothings",
  //     isSelected: false,
  //   },
  //   {
  //     title: "Shoes",
  //     isSelected: false,
  //   },
  //   {
  //     title: "Home Appliances",
  //     isSelected: false,
  //   },
  // ]);

  // const [isChecked, setIsChecked] = useState(false);

  // const CustomSlider = styled(Slider)({
  //   color: "#e46c0b",
  //   // height: 8,
  //   // "& .MuiSlider-track": {
  //   //   border: "none",
  //   // },
  //   "& .MuiSlider-thumb": {
  //     height: 12,
  //     width: 12,
  //     backgroundColor: "#fff",
  //     border: "2px solid currentColor",
  //     "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
  //       boxShadow: "inherit",
  //     },
  //     "&:before": {
  //       display: "none",
  //     },
  //   },
  //   "& .MuiSlider-valueLabel": {
  //     fontSize: 12,
  //     padding: 0,
  //     width: 32,
  //     height: 17,
  //     color: "#e46c0b", // borderRadius: "50% 50% 50% 0",
  //     backgroundColor: "#fff",
  //     transformOrigin: "bottom left",
  //   },
  // });
  const shareProductFunction = async (variationId) => {
    const payload = {
      sharedProductVariationId: variationId,
      sharedById: supplierId,
    };
    const { data, err } = await shareProductPost(payload);
    if (data) {
      toastify(data.message, "success");
    } else if (err) {
      toastify(err.response.data.message, "error");
    }
  };
  const getProductsCard = () => {
    {
      return products.map((ele, index) => {
        return (
          <Grid item lg={4} md={6} sm={12} key={index} spacing={1}>
            <Paper className="p-2" sx={{}}>
              <Grid container spacing={2}>
                <Grid item xs={3} alignSelf="center">
                  <Image
                    src={ele.productImage}
                    // height={"100%"}
                    height={200}
                    width={200}
                    layout="responsive"
                    // objectFit="contain"
                    // style={{
                    //   height: "100%",
                    //   width: "100%",
                    //   position: "relative",
                    // }}
                    alt=""
                  />
                </Grid>
                <Grid item xs={7} spacing={2}>
                  <Tooltip title={ele.productName} placement="top">
                    <Typography className="fw-bold mt-2 h-5 text-truncate cursor-pointer">
                      {ele.productName}
                    </Typography>
                  </Tooltip>
                  <Typography>
                    <span className="bg-orange border-0 px-2 text-white fs-10 py-1 rounded-5">
                      {ele.productRating} <Star sx={{ zoom: 0.6, pb: 0.5 }} />
                    </span>
                    <span className="text-secondary fs-12 mx-2">
                      {`(${ele.productAverageRating} Ratings)`}
                    </span>
                  </Typography>
                  <Typography
                    className="color-orange py-1 bg-light-orange1 rounded d-inline px-2"
                    fontSize={12}
                  >
                    Free shipping
                  </Typography>
                  <Typography className="fw-bold fs-5">
                    ₹{ele.productPrice}
                  </Typography>
                </Grid>
                <Grid
                  className="d-flex flex-column justify-content-between align-items-end my-1"
                  item
                  xs={2}
                >
                  {/* <Grid className="border rounded-circle p-1 h-5 cursor-pointer">
                    <Favorite
                      className="text-secondary h-4"
                      onClick={() => setShowWishlistModal(true)}
                    />
                  </Grid> */}
                  <Grid
                    className="border rounded-circle cursor-pointer h-5 p-1"
                    onClick={() => {
                      shareProductFunction(ele.sharedProductVariationId || "");
                    }}
                  >
                    <ShareIcon className="text-secondary h-4" />
                  </Grid>
                  <Grid className="d-flex">
                    {/* {!showMarginButton ? (
                      <ButtonComponent
                        muiProps="h-6 me-2 p-0"
                        label="Set margin"
                        size="small"
                        variant="outlined"
                        onBtnClick={() => {
                          getSelectedItem(ele);
                          setSelectedProduct(ele);
                          setShowMarginModal(true);
                        }}
                      />
                    ) : null} */}
                    <ButtonComponent
                      size="small"
                      muiProps="h-6 "
                      label="view"
                      // onBtnClick={() => getSelectedItem(ele)}
                      onBtnClick={() => {
                        dispatch(
                          productDetails({
                            productId: ele?.sharedProductVariationId,
                            variationDetails: ele.variationProperty || [],
                          })
                        );
                        dispatch(
                          storeUserInfo({
                            supplierId,
                            storeCode,
                          })
                        );
                        router.push(
                          "/supplier/products&inventory/myproducts/viewModal"
                        );
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        );
      });
    }
  };

  return (
    <Grid
      container
      spacing={2}
      className="w-100 mnh-80vh mxh-80vh overflow-auto hide-scrollbar"
    >
      {getProductsCard()}
      {/* {showMarginModal ? (
        <ModalComponent
          ModalWidth={350}
          open={showMarginModal}
          showPositionedClose
          showCloseIcon={false}
          onCloseIconClick={() => {
            setShowLink(false);
            setShowMarginModal(false);
          }}
          showFooter={false}
          headerClassName="border-0"
          ModalTitle=""
        >
          <Grid>
            <Grid container>
              <Grid item md={5} sm={4}>
                <Image
                  src={selectedProduct?.image}
                  height={100}
                  width={100}
                  alt=""
                />
              </Grid>
              <Grid item md={6} sm={6}>
                <Tooltip title={selectedProduct.title} placement="top">
                  <Typography className="text-truncate fw-bold fs-14">
                    {selectedProduct?.title}
                  </Typography>
                </Tooltip>
                <div>
                  <div className="d-flex w-25 align-items-end fs-12 bg-orange px-2 rounded-1 text-white me-2 justify-content-between h-20p">
                    <div className="align-self-center">
                      {selectedProduct?.rating?.rate}
                    </div>
                    <div>
                      <StarIcon className="fs-12" />
                    </div>
                  </div>
                  <span className="fs-12 text-secondary">
                    ({selectedProduct?.rating?.count} Ratings)
                  </span>
                </div>
                <div className="fs-2 fw-bold mt-2">
                  ₹{selectedProduct.price}
                </div>
              </Grid>
            </Grid>
            <Grid className="fs-12">{selectedProduct.description}</Grid>
            {!showLink ? (
              <div>
                <Typography className="fw-bold fs-14 my-2 mb-4">
                  Select Margin:
                </Typography>
                <div className="w-100 mt-2">
                  <CustomSlider
                    size="small"
                    value={margin}
                    aria-label="Small"
                    valueLabelDisplay="on"
                    onChange={(e) => {
                      setMargin(e.target.value);
                    }}
                    valueLabelFormat={`${margin}%`}
                  />
                </div>
              </div>
            ) : (
              <div>
                <Typography className="fw-bold fs-14 my-1">Link:</Typography>
                <div className="w-100 mb-2 d-flex justify-content-between  align-items-center border p-1">
                  <Typography className="text-secondary h-5">
                    www.mmcart.com
                  </Typography>
                  <FileCopy className="h-5" />
                </div>
              </div>
            )}
            <div
              className={
                !showLink
                  ? "d-flex justify-content-between mb-2"
                  : "d-flex justify-content-end mb-2"
              }
            >
              {!showLink ? (
                <CheckBoxComponent
                  checkBoxClick={() => {
                    setIsChecked(!isChecked);
                  }}
                  isChecked={isChecked}
                  label="Want to add today's deal"
                />
              ) : null}
              <ButtonComponent
                label={showLink ? "Close" : "Save"}
                size="small"
                muiProps="fs-12 px-3"
                onBtnClick={() => {
                  setShowLink(!showLink);
                  if (showLink) {
                    setShowMarginModal(false);
                  }
                }}
              />
            </div>
          </Grid>
        </ModalComponent>
      ) : null}
      <ModalComponent
        ModalWidth={300}
        ModalTitle=""
        headerClassName="border-0"
        open={showWishlistModal}
        onCloseIconClick={() => {
          setShowLink(false);
          setShowWishlistModal(false);
        }}
        showClearBtn={false}
        saveBtnText="submit"
        footerClassName="d-flex justify-content-center"
      >
        {wishListCollection.map((ele, index) => {
          return (
            <div key={index} className="mb-2">
              <RadiobuttonComponent
                radioClassName="p-1"
                label={ele.title}
                isChecked={ele.isSelected}
                id={ele.title}
                onRadioChange={(e) => {
                  const arr = [...wishListCollection];
                  // eslint-disable-next-line consistent-return
                  arr.forEach((item) => {
                    if (e.target.id === item.title) {
                      // eslint-disable-next-line no-return-assign
                      // eslint-disable-next-line no-param-reassign
                      return (item.isSelected = true);
                    }
                    // eslint-disable-next-line no-param-reassign
                    item.isSelected = false;
                  });
                  setwishListCollection([...arr]);
                }}
              />
            </div>
          );
        })}
        <div className="my-2 d-flex align-items-center justify-content-center">
          <ButtonComponent
            showIcon
            iconName="add"
            label="Add New Collection"
            variant="outlined"
            muiProps="fs-10"
          />
        </div>
      </ModalComponent> */}
    </Grid>
  );
};
export default ProductDetailsCard;
