/* eslint-disable no-use-before-define */
import { Box, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import Image from "next/image";
import { AddCircleOutlineOutlined } from "@mui/icons-material";
import validateMessage from "constants/validateMessages";
import InputBox from "@/atoms/InputBoxComponent";
import ModalComponent from "@/atoms/ModalComponent";

let errObj = {
  vendorIdOrName: false,
  images: false,
  productTitle: false,
  sku: false,
  categorySubcategory: false,
  weightOrVolume: false,
  totalStock: false,
  salePriceAndMrp: false,
  discounts: false,
};

const AddEditProductModal = ({
  openEditModal = false,
  setOpenEditModal = () => {},
  productDetails = {},
  setImageArray = () => {},
  setProductDetails = () => {},
  imageArray = [],
  // setRowDataObjects = () => {},
  modalId = 0,
  rowsDataObjects = [],
}) => {
  const [error, setError] = useState(errObj);

  const handleError = () => {
    errObj = {
      vendorIdOrName: false,
      images: false,
      productTitle: false,
      sku: false,
      categorySubcategory: false,
      weightOrVolume: false,
      totalStock: false,
      salePriceAndMrp: false,
      discounts: false,
    };
    const {
      vendorIdOrName,
      productTitle,
      sku,
      categorySubcategory,
      weightOrVolume,
      totalStock,
      salePriceAndMrp,
      discounts,
    } = productDetails;
    if (vendorIdOrName === "") {
      errObj.vendorIdOrName = true;
    }
    if (imageArray.length === 0) {
      errObj.images = true;
    }
    if (productTitle === "") {
      errObj.productTitle = true;
    }
    if (sku === "") {
      errObj.sku = true;
    }
    if (categorySubcategory === "") {
      errObj.categorySubcategory = true;
    }
    if (weightOrVolume === "") {
      errObj.weightOrVolume = true;
    }
    if (totalStock === "") {
      errObj.totalStock = true;
    }
    if (salePriceAndMrp === "") {
      errObj.salePriceAndMrp = true;
    }
    if (discounts === "") {
      errObj.discounts = true;
    }

    return errObj;
  };

  const onImgeChange = (event) => {
    if (imageArray.length < 5) {
      if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const theImagesArray = [...imageArray];
          theImagesArray.push(e.target.result);
          setImageArray([...theImagesArray]);
          setProductDetails({ ...productDetails, images: theImagesArray });
        };
        reader.readAsDataURL(event.target.files[0]);
      }
    }
  };

  const returnImagesInArray = () => {
    return imageArray?.map((val, index) => {
      return (
        <Grid item xs={3}>
          <Image src={imageArray[index]} width={100} height={100} />
        </Grid>
      );
    });
  };

  const handleSaveBtnClickOfEditModal = () => {
    const theErrObj = handleError();
    // console.log("Error Object ", theErrObj);
    setError(theErrObj);
    let isError = false;

    Object.entries(theErrObj).forEach((val) => {
      if (val[1]) {
        isError = true;
      }
    });

    if (!isError) {
      if (modalId === null) {
        const tempObject = {
          id: rowsDataObjects.length,
          col1: productDetails.vendorIdOrName,
          col2: {
            imgSrc: imageArray,
            imgCount: imageArray.length,
          },
          col3: productDetails.productTitle,
          col4: productDetails.sku,
          col5: productDetails.categorySubcategory,
          col6: productDetails.weightOrVolume,
          col7: productDetails.totalStock,
          col8: {
            salePrice: getSalePrice(),
            mrpPrice: getMrpPrice(),
          },
          col9: "PUMA",
          col10: "nothing",
        };

        const tempArray = [...rowsDataObjects];
        tempArray.push(tempObject);
        // setRowDataObjects([...tempArray]);
        setOpenEditModal(false);
      } else if (modalId !== null) {
        const tempObject = {
          id: rowsDataObjects.length,
          col1: productDetails.vendorIdOrName,
          col2: {
            imgSrc: imageArray,
            imgCount: imageArray.length,
          },
          col3: productDetails.productTitle,
          col4: productDetails.sku,
          col5: productDetails.categorySubcategory,
          col6: productDetails.weightOrVolume,
          col7: productDetails.totalStock,
          col8: {
            salePrice: getSalePrice(),
            mrpPrice: getMrpPrice(),
          },
          col9: "PUMA",
          col10: "nothing",
        };

        const tempArray = [...rowsDataObjects];
        tempArray.splice(modalId, 1, tempObject);
        // setRowDataObjects([...tempArray]);
        setOpenEditModal(false);
      }
    }
  };

  const getMrpPrice = () => {
    let mrpPrice = 0;
    if (productDetails.salePriceAndMrp) {
      const tempArray = productDetails.salePriceAndMrp.split("/");
      // console.log(tempArray);
      // eslint-disable-next-line prefer-destructuring
      mrpPrice = tempArray[1];
      // console.log(mrpPrice);
    }
    return parseInt(mrpPrice, 10);
  };

  const getSalePrice = () => {
    let salePrice = 0;
    if (productDetails.salePriceAndMrp) {
      const tempArray = productDetails.salePriceAndMrp.split("/");
      // console.log(tempArray);
      // eslint-disable-next-line prefer-destructuring
      salePrice = tempArray[0];
      // console.log(salePrice);
    }
    return parseInt(salePrice, 10);
  };

  const handleInputChanges = (e) => {
    setProductDetails({
      ...productDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleCloseIconClick = () => {
    setError({
      vendorIdOrName: false,
      images: false,
      productTitle: false,
      sku: false,
      categorySubcategory: false,
      weightOrVolume: false,
      totalStock: false,
      salePriceAndMrp: false,
      discounts: false,
    });
    setOpenEditModal(false);
  };

  const handleClearAll = () => {
    setProductDetails({
      vendorIdOrName: "",
      images: "",
      productTitle: "",
      sku: "",
      categorySubcategory: "",
      weightOrVolume: "",
      totalStock: "",
      salePriceAndMrp: "",
      discounts: "",
    });
    setImageArray([]);
    setError({
      vendorIdOrName: false,
      images: false,
      productTitle: false,
      sku: false,
      categorySubcategory: false,
      weightOrVolume: false,
      totalStock: false,
      salePriceAndMrp: false,
      discounts: false,
    });
  };

  return (
    <Box className="">
      <ModalComponent
        open={openEditModal}
        ModalTitle="Edit Product"
        titleClassName="fw-bold fs-14 color-orange"
        footerClassName="d-flex justify-content-start flex-row-reverse border-top mt-3"
        ClearBtnText="Reset"
        saveBtnText={modalId === null ? "Save" : "Update"}
        saveBtnClassName="ms-1"
        ModalWidth={650}
        minHeightClassName="mnh-70vh mxh-70vh overflow-auto"
        onCloseIconClick={() => {
          handleCloseIconClick();
        }}
        onSaveBtnClick={() => {
          handleSaveBtnClickOfEditModal();
        }}
        onClearBtnClick={() => {
          handleClearAll();
        }}
      >
        <Grid container className="my-1" spacing={4}>
          <Grid item xs={6}>
            <InputBox
              value={productDetails.vendorIdOrName}
              label="VendorID/Name"
              inputlabelshrink
              name="vendorIdOrName"
              onInputChange={(e) => {
                handleInputChanges(e);
              }}
              error={error.vendorIdOrName}
              helperText={
                error.vendorIdOrName ? validateMessage.field_required : ""
              }
            />
          </Grid>
          <Grid item xs={6}>
            <InputBox
              value={productDetails.productTitle}
              label="Product Title"
              inputlabelshrink
              name="productTitle"
              onInputChange={(e) => {
                handleInputChanges(e);
              }}
              error={error.productTitle}
              helperText={
                error.productTitle ? validateMessage.field_required : ""
              }
            />
          </Grid>
          <Grid item xs={6}>
            <InputBox
              value={productDetails.sku}
              label="SKU"
              inputlabelshrink
              name="sku"
              onInputChange={(e) => {
                handleInputChanges(e);
              }}
              error={error.sku}
              helperText={error.sku ? validateMessage.field_required : ""}
            />
          </Grid>
          <Grid item xs={6}>
            <InputBox
              value={productDetails.categorySubcategory}
              label="Category/Subcategory"
              inputlabelshrink
              name="categorySubcategory"
              onInputChange={(e) => {
                handleInputChanges(e);
              }}
              error={error.categorySubcategory}
              helperText={
                error.categorySubcategory ? validateMessage.field_required : ""
              }
            />
          </Grid>
          <Grid item xs={6}>
            <InputBox
              value={productDetails.weightOrVolume}
              label="Weight/Volume"
              inputlabelshrink
              name="weightOrVolume"
              onInputChange={(e) => {
                handleInputChanges(e);
              }}
              error={error.weightOrVolume}
              helperText={
                error.weightOrVolume ? validateMessage.field_required : ""
              }
            />
          </Grid>
          <Grid item xs={6}>
            <InputBox
              value={productDetails.totalStock}
              label="Total Stock"
              inputlabelshrink
              name="totalStock"
              onInputChange={(e) => {
                handleInputChanges(e);
              }}
              error={error.totalStock}
              helperText={
                error.totalStock ? validateMessage.field_required : ""
              }
            />
          </Grid>
          <Grid item xs={6}>
            <InputBox
              value={productDetails.salePriceAndMrp}
              label="Sale Price/MRP"
              inputlabelshrink
              name="salePriceAndMrp"
              onInputChange={(e) => {
                handleInputChanges(e);
              }}
              error={error.salePriceAndMrp}
              helperText={
                error.salePriceAndMrp ? validateMessage.field_required : ""
              }
            />
          </Grid>
          <Grid item xs={6}>
            <InputBox
              value={productDetails.discounts}
              label="Discounts"
              inputlabelshrink
              name="discounts"
              onInputChange={(e) => {
                handleInputChanges(e);
              }}
              error={error.discounts}
              helperText={error.discounts ? validateMessage.field_required : ""}
            />
          </Grid>
        </Grid>
        <Box>
          <Box className="d-flex align-items-center mt-3 mxh-200 overflow-auto">
            <Typography className="fs-14 text-center color-gray w-25">
              Add Images
            </Typography>
            <Grid container>
              {returnImagesInArray()}
              <Grid item xs={3}>
                <label htmlFor="image-upload" className="d-block">
                  <Box>
                    <Box
                      width={100}
                      height={100}
                      className="rounded d-flex justify-content-center align-items-center border cursor-pointer"
                    >
                      <AddCircleOutlineOutlined className="color-gray" />

                      <input
                        type="file"
                        id="image-upload"
                        accept="image/png, image/jpeg"
                        className="d-none"
                        onChange={onImgeChange}
                      />
                    </Box>
                    {error.images ? (
                      <Typography className="fs-12 mt-1 text-danger">
                        Image Required
                      </Typography>
                    ) : (
                      ""
                    )}
                  </Box>
                </label>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </ModalComponent>
    </Box>
  );
};

export default AddEditProductModal;
