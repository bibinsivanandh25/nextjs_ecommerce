import React from "react";
import { Grid } from "@mui/material";
import DatePickerComponent from "@/atoms/DatePickerComponent";
import ModalComponent from "@/atoms/ModalComponent";
import InputBox from "@/atoms/InputBoxComponent";
import SimpleDropdownComponent from "@/atoms/SimpleDropdownComponent";

const AddFlag = ({
  openModal,
  setOpenModal = () => {},
  defaultFormData,
  setDefaultFormData = () => {},
}) => {
  return (
    <ModalComponent
      onCloseIconClick={() => {
        setOpenModal(false);
      }}
      open={openModal}
      ModalTitle="Add Flag"
      ModalWidth={600}
      footerClassName="justify-content-end border-top"
      titleClassName="h-4"
      ClearBtnText="Cancel"
      onClearBtnClick={() => {
        setOpenModal(false);
        setDefaultFormData({
          todaysDeals: {},
          saleprice: "",
          discount: "",
          startDate: "",
          endDate: "",
        });
      }}
    >
      <Grid container spacing={2} className="my-2">
        <Grid item xs={12}>
          <SimpleDropdownComponent
            size="small"
            placeholder="Todays Deal"
            value={defaultFormData?.todaysDeals}
          />
        </Grid>
        <Grid item xs={6}>
          <InputBox
            size="small"
            placeholder="Sale Price"
            disabled
            value={defaultFormData.saleprice}
            onInputChange={(e) => {
              setDefaultFormData((prev) => ({
                ...prev,
                saleprice: e.target.value,
              }));
            }}
          />
        </Grid>
        <Grid item sm={6}>
          <InputBox
            size="small"
            placeholder="Enter discount %"
            value={defaultFormData.discount}
            onInputChange={(e) => {
              setDefaultFormData((prev) => ({
                ...prev,
                discount: e.target.value,
              }));
            }}
            type="number"
          />
        </Grid>
        <Grid item sm={6}>
          <DatePickerComponent
            size="small"
            label="Start Date"
            inputlabelshrink
            value={defaultFormData.startDate}
            onDateChange={(value) => {
              setDefaultFormData((prev) => ({
                ...prev,
                startDate: value,
              }));
            }}
          />
        </Grid>
        <Grid item sm={6}>
          <DatePickerComponent
            size="small"
            label="End Date"
            inputlabelshrink
            value={defaultFormData.endDate}
            onDateChange={(value) => {
              setDefaultFormData((prev) => ({
                ...prev,
                endDate: value,
              }));
            }}
          />
        </Grid>
      </Grid>
    </ModalComponent>
  );
};

export default AddFlag;
