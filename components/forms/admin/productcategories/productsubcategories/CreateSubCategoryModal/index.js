import React, { useState } from "react";
import { Box, Grid } from "@mui/material";
import validateMessage from "constants/validateMessages";
import InputBox from "@/atoms/InputBoxComponent";
import ModalComponent from "@/atoms/ModalComponent";
import SimpleDropdownComponent from "@/atoms/SimpleDropdownComponent";

let errObj = {
  category: false,
  set: false,
  subCategory: false,
  priceRange: false,
  comissionType: false,
  comissionPercentage: false,
  mmcProfitPercentage: false,
  resellerProfitPercentage: false,
};

const CreateSubCategoryModal = ({
  openCreateNewSubCategories,
  setOpenCreateNewSubCategories,
  formData,
  setFormData,
}) => {
  const [error, setError] = useState(errObj);
  const handleCloseIconClick = () => {
    setFormData({
      category: {},
      set: "",
      subCategory: "",
      priceRange: {},
      comissionType: {},
      comissionPercentage: "",
      mmcProfitPercentage: "",
      resellerProfitPercentage: "",
    });
    setError({
      category: false,
      set: false,
      subCategory: false,
      priceRange: false,
      comissionType: false,
      comissionPercentage: false,
      mmcProfitPercentage: false,
      resellerProfitPercentage: false,
    });
    setOpenCreateNewSubCategories(false);
  };

  const onInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleError = () => {
    let returnError = false;
    errObj = {
      category: false,
      set: false,
      subCategory: false,
      priceRange: false,
      comissionType: false,
      comissionPercentage: false,
      mmcProfitPercentage: false,
      resellerProfitPercentage: false,
    };

    const {
      category,
      set,
      subCategory,
      priceRange,
      comissionType,
      comissionPercentage,
      mmcProfitPercentage,
      resellerProfitPercentage,
    } = formData;

    const cartegoryLength = Object.keys(category).length;
    const priceRangeLength = Object.keys(priceRange).length;
    const comissionLength = Object.keys(comissionType).length;

    if (cartegoryLength === 0) {
      errObj.category = true;
      returnError = true;
    }
    if (set === "") {
      errObj.set = true;
      returnError = true;
    }
    if (subCategory === "") {
      errObj.subCategory = true;
      returnError = true;
    }
    if (priceRangeLength === 0) {
      errObj.priceRange = true;
      returnError = true;
    }
    if (comissionLength === 0) {
      errObj.comissionType = true;
      returnError = true;
    }
    if (comissionPercentage === "") {
      errObj.comissionPercentage = true;
      returnError = true;
    }
    if (mmcProfitPercentage === "") {
      errObj.mmcProfitPercentage = true;
      returnError = true;
    }
    if (resellerProfitPercentage === "") {
      errObj.resellerProfitPercentage = true;
      returnError = true;
    }

    return [returnError, errObj];
  };

  const handleSaveBtnClick = () => {
    const [errObjo] = handleError();
    setError(errObjo);
    // console.log(returnError);
  };

  const handleClearAll = () => {
    setFormData({
      category: {},
      set: "",
      subCategory: "",
      priceRange: {},
      comissionType: {},
      comissionPercentage: "",
      mmcProfitPercentage: "",
      resellerProfitPercentage: "",
    });
    setError({
      category: false,
      set: false,
      subCategory: false,
      priceRange: false,
      comissionType: false,
      comissionPercentage: false,
      mmcProfitPercentage: false,
      resellerProfitPercentage: false,
    });
  };

  return (
    <Box>
      <ModalComponent
        open={openCreateNewSubCategories}
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
        <Grid container columnSpacing={2} rowSpacing={2} className="mt-2">
          <Grid item xs={6}>
            <SimpleDropdownComponent
              inputlabelshrink
              list={[{ label: "1" }, { label: "2" }]}
              size="small"
              label="Category"
              value={formData.category}
              onDropdownSelect={(value) => {
                setFormData({ ...formData, category: { label: value?.label } });
              }}
              helperText={error.category ? validateMessage.field_required : ""}
            />
          </Grid>
          <Grid item xs={6}>
            <InputBox
              name="set"
              value={formData.set}
              inputlabelshrink
              label="Set"
              onInputChange={onInputChange}
              error={error.set}
              helperText={error.set ? validateMessage.field_required : ""}
            />
          </Grid>
          <Grid item xs={6}>
            <InputBox
              name="subCategory"
              inputlabelshrink
              size="small"
              label="Sub Category"
              value={formData.subCategory}
              onInputChange={onInputChange}
              error={error.subCategory}
              helperText={
                error.subCategory ? validateMessage.field_required : ""
              }
            />
          </Grid>
          <Grid item xs={6}>
            <SimpleDropdownComponent
              list={[{ label: "range 1" }, { label: "range 2" }]}
              inputlabelshrink
              label="Price Range"
              size="small"
              value={formData.priceRange}
              onDropdownSelect={(value) => {
                setFormData({
                  ...formData,
                  priceRange: { label: value?.label },
                });
              }}
              helperText={
                error.priceRange ? validateMessage.field_required : ""
              }
            />
          </Grid>
          <Grid item xs={6}>
            <SimpleDropdownComponent
              list={[{ label: "type 1" }, { label: "type 2" }]}
              inputlabelshrink
              label="Comission Type"
              size="small"
              value={formData.comissionType}
              onDropdownSelect={(value) => {
                setFormData({
                  ...formData,
                  comissionType: { label: value?.label },
                });
              }}
              helperText={
                error.comissionType ? validateMessage.field_required : ""
              }
            />
          </Grid>
          <Grid item xs={6}>
            <InputBox
              inputlabelshrink
              name="comissionPercentage"
              label="Comission Percentage"
              value={formData.comissionPercentage}
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
              value={formData.mmcProfitPercentage}
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
              value={formData.resellerProfitPercentage}
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

export default CreateSubCategoryModal;
