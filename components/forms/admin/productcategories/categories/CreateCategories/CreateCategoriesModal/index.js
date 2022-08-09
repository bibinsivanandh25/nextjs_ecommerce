/* eslint-disable no-shadow */
import React, { useState } from "react";
import { Box, Grid } from "@mui/material";
import validateMessage from "constants/validateMessages";
import InputBox from "@/atoms/InputBoxComponent";
import ModalComponent from "@/atoms/ModalComponent";
import SimpleDropdownComponent from "@/atoms/SimpleDropdownComponent";

const errObj = {
  priceRange: false,
  comissionPercentage: false,
  mmcProfitPercentage: false,
  resellerProfitPercentage: false,
  category: false,
  comissionType: false,
};

const CreateCategoriesModal = ({
  openCreateNewCategories,
  setOpenCreateCategoriesModal,
}) => {
  const [categoryDetails, setCategoryDetails] = useState({
    priceRange: "",
    comissionPercentage: "",
    mmcProfitPercentage: "",
    resellerProfitPercentage: "",
  });

  const [error, setError] = useState(errObj);

  const onInputChange = (e) => {
    setCategoryDetails({
      ...categoryDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleCloseIconClick = () => {
    setError({
      priceRange: false,
      comissionPercentage: false,
      mmcProfitPercentage: false,
      resellerProfitPercentage: false,
      category: false,
      comissionType: false,
    });
    setCategoryDetails({
      priceRange: "",
      comissionPercentage: "",
      mmcProfitPercentage: "",
      resellerProfitPercentage: "",
    });
    setOpenCreateCategoriesModal(false);
  };

  const handleClearAll = () => {
    setError({
      priceRange: false,
      comissionPercentage: false,
      mmcProfitPercentage: false,
      resellerProfitPercentage: false,
      category: false,
      comissionType: false,
    });
    setCategoryDetails({
      priceRange: "",
      comissionPercentage: "",
      mmcProfitPercentage: "",
      resellerProfitPercentage: "",
    });
  };

  const handleError = () => {
    let theError = false;
    const errObj = {
      priceRange: false,
      comissionPercentage: false,
      mmcProfitPercentage: false,
      resellerProfitPercentage: false,
      category: false,
      comissionType: false,
    };
    const {
      priceRange,
      comissionPercentage,
      mmcProfitPercentage,
      resellerProfitPercentage,
    } = categoryDetails;

    if (priceRange === "") {
      errObj.priceRange = true;
      theError = true;
    }
    if (comissionPercentage === "") {
      errObj.comissionPercentage = true;
      theError = true;
    }
    if (mmcProfitPercentage === "") {
      errObj.mmcProfitPercentage = true;
      theError = true;
    }
    if (resellerProfitPercentage === "") {
      errObj.resellerProfitPercentage = true;
      theError = true;
    }

    return [theError, errObj];
  };

  const handleSaveBtnClick = () => {
    const [theError, errObj] = handleError();
    setError(errObj);
    console.log(theError);
  };

  return (
    <Box>
      <ModalComponent
        open={openCreateNewCategories}
        ModalTitle="Create Categories"
        titleClassName="fw-bold fs-14 color-orange"
        footerClassName="d-flex justify-content-start flex-row-reverse border-top mt-3"
        ClearBtnText="Reset"
        saveBtnClassName="ms-1"
        ModalWidth={650}
        minHeightClassName="overflow-auto"
        onCloseIconClick={() => {
          handleCloseIconClick();
        }}
        onSaveBtnClick={() => {
          handleSaveBtnClick();
        }}
        onClearBtnClick={() => {
          handleClearAll();
        }}
      >
        <Grid container columnSpacing={2} rowSpacing={2} className="mt-4">
          <Grid item xs={6}>
            <SimpleDropdownComponent
              inputlabelshrink
              list={[{ label: "1" }, { label: "2" }]}
              size="small"
              label="Category"
            />
          </Grid>
          <Grid item xs={6}>
            <InputBox
              name="priceRange"
              value={categoryDetails.priceRange}
              inputlabelshrink
              label="Price Range"
              onInputChange={onInputChange}
              error={error.priceRange}
              helperText={
                error.priceRange ? validateMessage.field_required : ""
              }
            />
          </Grid>
          <Grid item xs={6}>
            <SimpleDropdownComponent
              inputlabelshrink
              size="small"
              label="Comission Type"
            />
          </Grid>
          <Grid item xs={6}>
            <InputBox
              inputlabelshrink
              name="comissionPercentage"
              label="Comission Percentage"
              value={categoryDetails.comissionPercentage}
              onInputChange={onInputChange}
              error={error.comissionPercentage}
              helperText={
                error.comissionPercentage ? validateMessage.field_required : ""
              }
            />
          </Grid>
          <Grid item xs={6}>
            <InputBox
              inputlabelshrink
              name="mmcProfitPercentage"
              label="MMC Profit % Percentage"
              value={categoryDetails.mmcProfitPercentage}
              onInputChange={onInputChange}
              error={error.mmcProfitPercentage}
              helperText={
                error.mmcProfitPercentage ? validateMessage.field_required : ""
              }
            />
          </Grid>
          <Grid item xs={6}>
            <InputBox
              inputlabelshrink
              name="resellerProfitPercentage"
              label="Reseller Profit % Percentage"
              value={categoryDetails.resellerProfitPercentage}
              onInputChange={onInputChange}
              error={error.resellerProfitPercentage}
              helperText={
                error.resellerProfitPercentage
                  ? validateMessage.field_required
                  : ""
              }
            />
          </Grid>
        </Grid>
      </ModalComponent>
    </Box>
  );
};

export default CreateCategoriesModal;
