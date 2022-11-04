import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import validateMessage from "constants/validateMessages";
import ModalComponent from "@/atoms/ModalComponent";
import InputBox from "@/atoms/InputBoxComponent";
import SimpleDropdownComponent from "@/atoms/SimpleDropdownComponent";
import CustomDatePickerComponent from "@/atoms/CustomDatePickerComponent";
import styles from "./createflag.module.css";
import MultiSelectComponent from "../../../../../atoms/MultiSelectComponent";

const tempObj = {
  flagTitle: {},
  productCategory: {},
  products: [],
  visibilityPlace: {},
  themeSelection: {},
  colorSelection: {},
  startDate: "",
  endDate: "",
  startTime: "",
  endTime: "",
};

const CreateFlagModal = ({ open = false, setOpen = () => {} }) => {
  const [formData, setFormDate] = useState({ ...tempObj });
  const handleSubmit = () => {};
  const handleClearAll = () => {};

  const handleChange = (value, name) => {
    setFormDate((pre) => ({
      ...pre,
      [name]: value,
    }));
  };
  return (
    <ModalComponent
      open={open}
      ModalTitle="Create Flag"
      titleClassName="fw-bold fs-14 color-orange"
      footerClassName="d-flex justify-content-start flex-row-reverse border-top mt-3"
      ClearBtnText="Reset"
      saveBtnText="Save"
      saveBtnClassName="ms-1"
      ModalWidth={650}
      onCloseIconClick={() => {
        setOpen(false);
      }}
      onSaveBtnClick={() => {
        handleSubmit();
      }}
      onClearBtnClick={() => {
        handleClearAll();
      }}
    >
      <Grid container spacing={2} className="mt-2">
        <Grid item md={6}>
          <SimpleDropdownComponent
            size="small"
            label="Flag Title"
            inputlabelshrink
            list={[{ label: "Type One" }, { label: "Type Two" }]}
            onDropdownSelect={(value) => {
              handleChange(value, "flagTitle");
            }}
            value={formData.flagTitle}
          />
        </Grid>
        <Grid item md={6}>
          <SimpleDropdownComponent
            size="small"
            label="Product Category"
            id="productCategory"
            inputlabelshrink
            list={[{ label: "Type One" }, { label: "Type Two" }]}
            onDropdownSelect={(value) => {
              handleChange(value, "productCategory");
            }}
            value={formData.productCategory}
          />
        </Grid>
        <Grid item md={6}>
          <MultiSelectComponent
            label="Products"
            value={formData.products}
            list={[]}
            onSelectionChange={(value) => {
              handleChange(value, "products");
            }}
          />
        </Grid>
        <Grid item md={6}>
          <SimpleDropdownComponent
            size="small"
            label="Visibility Place"
            inputlabelshrink
            list={[{ label: "Type One" }, { label: "Type Two" }]}
            onDropdownSelect={(value) => {
              handleChange(value, "visibilityPlace");
            }}
            id="visibilityPlace"
            value={formData.visibilityPlace}
          />
        </Grid>
        <Grid item md={6}>
          <SimpleDropdownComponent
            size="small"
            label="Theme Selection"
            inputlabelshrink
            list={[{ label: "Type One" }, { label: "Type Two" }]}
            onDropdownSelect={(value) => {
              handleChange(value, "themeSelection");
            }}
            id="themeSelection"
            value={formData.themeSelection}
          />
        </Grid>
        <Grid item md={6}>
          <SimpleDropdownComponent
            size="small"
            label="Color Selection"
            inputlabelshrink
            list={[{ label: "Type One" }, { label: "Type Two" }]}
            onDropdownSelect={(value) => {
              handleChange(value, "colorSelection");
            }}
            id="colorSelection"
            value={formData.colorSelection}
          />
        </Grid>

        <Grid item md={6}>
          <Box className="d-flex align-items-center">
            <Typography className="h-5">From Date:</Typography>
            <CustomDatePickerComponent
              value={formData.startDate}
              onDateChange={(value) => {
                handleChange(value, "startDate");
              }}
              size="small"
            />
          </Box>
        </Grid>
        <Grid item md={6}>
          <Box className="d-flex align-items-center">
            <Typography className="h-5">To Date: </Typography>
            <CustomDatePickerComponent
              value={formData.endDate}
              onDateChange={(value) => {
                handleChange(value, "endDate");
              }}
              size="small"
            />
          </Box>
        </Grid>
        <Grid item md={6}>
          <Box className="d-flex align-items-center">
            <Typography className="h-5">Start Time:</Typography>
            <input
              type="time"
              value={formData.startTime}
              placeholder="hh:mm"
              className={styles.timepicker}
              style={{
                border: "none",
                outline: "none",
                display: "flex",
                flexDirection: "row-reverse",
              }}
              onChange={(e) => {
                handleChange(e.target.value, "startTime");
              }}
              // value={endTime}
            />
          </Box>
        </Grid>
        <Grid item md={6}>
          <Box className="d-flex align-items-center">
            <Typography className="h-5">End Time:</Typography>
            <input
              type="time"
              value={formData.endTime}
              placeholder="hh:mm"
              className={styles.timepicker}
              style={{
                border: "none",
                outline: "none",
                display: "flex",
                flexDirection: "row-reverse",
              }}
              onChange={(e) => {
                handleChange(e.target.value, "endtime");
              }}
              // value={endTime}
            />
          </Box>
        </Grid>
      </Grid>
    </ModalComponent>
  );
};

export default CreateFlagModal;
