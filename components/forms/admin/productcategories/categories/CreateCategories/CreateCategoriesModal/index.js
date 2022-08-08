import React, { useState } from "react";
import { Box, Grid } from "@mui/material";
import DropdownComponent from "@/atoms/DropdownComponent";
import InputBox from "@/atoms/InputBoxComponent";
import ModalComponent from "@/atoms/ModalComponent";

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

  const onInputChange = (e) => {
    setCategoryDetails({
      ...categoryDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleCloseIconClick = () => {
    setCategoryDetails({
      priceRange: "",
      comissionPercentage: "",
      mmcProfitPercentage: "",
      resellerProfitPercentage: "",
    });
    setOpenCreateCategoriesModal(false);
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
          //   handleSaveBtnClickOfEditModal();
        }}
        onClearBtnClick={() => {
          //   handleClearAll();
        }}
      >
        <Grid container columnSpacing={2} className="mt-4">
          <Grid item xs={6}>
            <DropdownComponent size="small" label="Category" />
          </Grid>
          <Grid item xs={6}>
            <InputBox
              name="priceRange"
              value={categoryDetails.priceRange}
              inputlabelshrink
              label="Price Range"
              onInputChange={onInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <DropdownComponent size="small" label="Comission Type" />
          </Grid>
          <Grid item xs={6}>
            <InputBox
              inputlabelshrink
              name="comissionPercentage"
              label="Comission Percentage"
              value={categoryDetails.comissionPercentage}
              onInputChange={onInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <InputBox
              inputlabelshrink
              name="mmcProfitPercentage"
              label="MMC Profit % Percentage"
              value={categoryDetails.mmcProfitPercentage}
              onInputChange={onInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <InputBox
              inputlabelshrink
              name="resellerProfitPercentage"
              label="Reseller Profit % Percentage"
              value={categoryDetails.resellerProfitPercentage}
              onInputChange={onInputChange}
            />
          </Grid>
        </Grid>
      </ModalComponent>
    </Box>
  );
};

export default CreateCategoriesModal;
