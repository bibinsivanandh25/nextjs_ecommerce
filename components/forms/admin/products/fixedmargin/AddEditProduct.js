/* eslint-disable no-use-before-define */
import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import Image from "next/image";
import { AddCircleOutlineOutlined } from "@mui/icons-material";
import InputBox from "@/atoms/InputBoxComponent";
import ModalComponent from "@/atoms/ModalComponent";

const AddEditProductModal = ({
  openEditModal = false,
  setOpenEditModal = () => {},
  productDetails = {},
  setImageArray = () => {},
  setProductDetails = () => {},
  imageArray = [],
  setRowDataObjects = () => {},
  modalId = 0,
  rowsDataObjects = [],
}) => {
  const onImgeChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log("The result", e.target.result);
        const theImagesArray = [...imageArray];
        theImagesArray.push(e.target.result);
        setImageArray([...theImagesArray]);
        setProductDetails({ ...productDetails, images: theImagesArray });
      };
      reader.readAsDataURL(event.target.files[0]);
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
      setRowDataObjects([...tempArray]);
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
      setRowDataObjects([...tempArray]);
      setOpenEditModal(false);
    }
  };

  const getMrpPrice = () => {
    let mrpPrice = 0;
    if (productDetails.salePriceAndMrp) {
      const tempArray = productDetails.salePriceAndMrp.split("/");
      console.log(tempArray);
      // eslint-disable-next-line prefer-destructuring
      mrpPrice = tempArray[1];
      console.log(mrpPrice);
    }
    return parseInt(mrpPrice, 10);
  };

  const getSalePrice = () => {
    let salePrice = 0;
    if (productDetails.salePriceAndMrp) {
      const tempArray = productDetails.salePriceAndMrp.split("/");
      console.log(tempArray);
      // eslint-disable-next-line prefer-destructuring
      salePrice = tempArray[0];
      console.log(salePrice);
    }
    return parseInt(salePrice, 10);
  };

  const handleInputChanges = (e) => {
    setProductDetails({
      ...productDetails,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <ModalComponent
        open={openEditModal}
        ModalTitle="Edit Product"
        titleClassName="fw-bold fs-14 color-orange"
        footerClassName="d-flex justify-content-start flex-row-reverse border-top mt-3"
        ClearBtnText="Reset"
        saveBtnText="Update"
        saveBtnClassName="ms-1"
        ModalWidth={650}
        onCloseIconClick={() => {
          setOpenEditModal(false);
        }}
        onSaveBtnClick={() => {
          handleSaveBtnClickOfEditModal();
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
                </label>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </ModalComponent>
    </div>
  );
};

export default AddEditProductModal;
