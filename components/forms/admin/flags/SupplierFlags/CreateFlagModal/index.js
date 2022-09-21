import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import validateMessage from "constants/validateMessages";
import ModalComponent from "@/atoms/ModalComponent";
import InputBox from "@/atoms/InputBoxComponent";
import SimpleDropdownComponent from "@/atoms/SimpleDropdownComponent";
import CustomDatePickerComponent from "@/atoms/CustomDatePickerComponent";
import styles from "./createflag.module.css";

let errObj = {
  flagTitle: false,
  imageType: false,
  productCategory: false,
  productType: false,
  products: false,
  visibilityPlace: false,
  themeSection: false,
  colorSection: false,
  startDate: false,
  endDate: false,
  startTime: false,
  endTime: false,
  invalidStartDate: false,
  invalidEndDate: false,
  invalidStartTime: false,
  invalidEndTime: false,
  cannotSetEndTime: false,
  cannotSetStartTime: false,
};

const CreateFlagModal = ({ openCreateFlagModal, setOpenCreateFlagModal }) => {
  const [flagTitle, setFlagTitle] = useState("");
  const [imageType, setImageType] = useState({ label: "" });
  const [productCategory, setProductCategory] = useState({ label: "" });
  const [productType, setProductType] = useState({ label: "" });
  const [products, setProducts] = useState({ label: "" });
  const [visibilityPlace, setVisibilityPlace] = useState({ label: "" });
  const [themeSection, setThemeSection] = useState({ label: "" });
  const [colorSection, setColorSection] = useState({ label: "" });
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [error, setError] = useState(errObj);

  const handleCloseIconClick = () => {
    errObj = {
      flagTitle: false,
      imageType: false,
      productCategory: false,
      productType: false,
      products: false,
      visibilityPlace: false,
      themeSection: false,
      colorSection: false,
      startDate: false,
      endDate: false,
      startTime: false,
      endTime: false,
      invalidStartDate: false,
      invalidEndDate: false,
      invalidStartTime: false,
      invalidEndTime: false,
      cannotSetEndTime: false,
      cannotSetStartTime: false,
    };
    setFlagTitle("");
    setImageType({ label: "" });
    setProductCategory({ label: "" });
    setProductType({ label: "" });
    setProducts({ label: "" });
    setVisibilityPlace({ label: "" });
    setThemeSection({ label: "" });
    setColorSection({ label: "" });
    setStartDate("");
    setEndDate("");
    setStartTime("");
    setEndTime("");
    setError(errObj);
    setOpenCreateFlagModal(false);
  };

  const handleClearAll = () => {
    errObj = {
      flagTitle: false,
      imageType: false,
      productCategory: false,
      productType: false,
      products: false,
      visibilityPlace: false,
      themeSection: false,
      colorSection: false,
      startDate: false,
      endDate: false,
      startTime: false,
      endTime: false,
      invalidStartDate: false,
      invalidEndDate: false,
      invalidStartTime: false,
      invalidEndTime: false,
      cannotSetEndTime: false,
      cannotSetStartTime: false,
    };
    setFlagTitle("");
    setImageType({ label: "" });
    setProductCategory({ label: "" });
    setProductType({ label: "" });
    setProducts({ label: "" });
    setVisibilityPlace({ label: "" });
    setThemeSection({ label: "" });
    setColorSection({ label: "" });
    setStartDate("");
    setEndDate("");
    setStartTime("");
    setEndTime("");
    setError(errObj);
  };

  const handleStartDate = (value) => {
    if (value) {
      if (endDate) {
        if (
          value.getDate() === endDate.getDate() &&
          value.getMonth() === endDate.getMonth() &&
          value.getYear() == endDate.getYear()
        ) {
          setStartDate(value);
          errObj.invalidStartDate = false;
          errObj.invalidEndDate = false;
          errObj.startDate = false;
        } else if (value.getTime() < endDate.getTime()) {
          setStartDate(value);
          errObj.invalidStartDate = false;
          errObj.invalidEndDate = false;
          errObj.startDate = false;
        } else {
          setStartDate(value);
          errObj.invalidEndDate = true;
          errObj.invalidStartDate = true;
          errObj.invalidEndTime = false;
          errObj.invalidStartTime = false;
          errObj.endTime = true;
          errObj.startTime = true;
          setStartTime("");
          setEndTime("");
        }
      } else {
        errObj.invalidStartDate = false;
        errObj.startDate = false;
        setStartDate(value);
      }
    } else {
      errObj.startDate = true;
    }

    setError({ ...error, ...errObj });
  };

  const handleEndDate = (value) => {
    if (value) {
      if (startDate) {
        if (
          value.getDate() === startDate.getDate() &&
          value.getMonth() === startDate.getMonth() &&
          value.getYear() === startDate.getYear()
        ) {
          errObj.invalidEndDate = false;
          errObj.invalidStartDate = false;
          errObj.endDate = false;
          setEndDate(value);
        } else if (value.getTime() > startDate.getTime()) {
          errObj.invalidEndDate = false;
          errObj.invalidStartDate = false;
          errObj.endDate = false;
          setEndDate(value);
        } else {
          setEndDate(value);
          errObj.invalidEndDate = true;
          errObj.invalidStartDate = true;
          errObj.invalidEndTime = false;
          errObj.invalidStartTime = false;
          errObj.endTime = true;
          errObj.startTime = true;
          errObj.startDate = false;
          errObj.endDate = false;
          setStartTime("");
          setEndTime("");
        }
      } else {
        errObj.invalidEndDate = false;
        errObj.endDate = false;
        setEndDate(value);
      }
    } else {
      errObj.endDate = true;
    }

    setError({ ...error, ...errObj });
  };

  const handleError = () => {
    errObj = {
      flagTitle: false,
      imageType: false,
      productCategory: false,
      productType: false,
      products: false,
      visibilityPlace: false,
      themeSection: false,
      colorSection: false,
      startDate: false,
      endDate: false,
      startTime: false,
      endTime: false,
      invalidStartDate: false,
      invalidEndDate: false,
      invalidStartTime: false,
      invalidEndTime: false,
      cannotSetEndTime: false,
      cannotSetStartTime: false,
    };
    if (flagTitle === "") {
      errObj.flagTitle = true;
    }
    if (imageType.label === "") {
      errObj.imageType = true;
    }
    if (productCategory.label === "") {
      errObj.productCategory = true;
    }
    if (productType.label === "") {
      errObj.productType = true;
    }
    if (products.label === "") {
      errObj.products = true;
    }
    if (visibilityPlace.label === "") {
      errObj.visibilityPlace = true;
    }
    if (themeSection.label === "") {
      errObj.themeSection = true;
    }
    if (colorSection.label === "") {
      errObj.colorSection = true;
    }
    if (startDate === "") {
      errObj.startDate = true;
    }
    if (endDate === "") {
      errObj.endDate = true;
    }
    if (startTime === "") {
      errObj.startTime = true;
    }
    if (endTime === "") {
      errObj.endTime = true;
    }
    if (error.invalidEndDate) {
      errObj.invalidEndDate = true;
    }
    if (error.invalidStartDate) {
      errObj.invalidStartDate = true;
    }
    if (error.invalidEndTime) {
      errObj.invalidEndTime = true;
    }
    if (error.invalidStartTime) {
      errObj.invalidStartTime = true;
    }
    return errObj;
  };

  const handleEndTime = (value) => {
    if (
      error.startDate ||
      error.endDate ||
      error.invalidEndDate ||
      error.invalidStartDate ||
      !startDate ||
      !endDate
    ) {
      errObj.cannotSetEndTime = true;
    } else {
      errObj.cannotSetEndTime = false;
      if (
        endDate.getDate() === startDate.getDate() &&
        endDate.getMonth() === startDate.getMonth() &&
        endDate.getYear() === startDate.getYear()
      ) {
        if (startTime) {
          const startTimeSplitted = startTime.split(":");
          const endTimeSplitted = value.split(":");
          const startHour = parseInt(startTimeSplitted[0], 10);
          const startMinute = parseInt(startTimeSplitted[1], 10);
          const endHour = parseInt(endTimeSplitted[0], 10);
          const endMinute = parseInt(endTimeSplitted[1], 10);
          if (startHour < endHour) {
            errObj.invalidEndTime = false;
            errObj.invalidStartTime = false;
            errObj.endTime = false;
            setEndTime(value);
          } else if (startHour === endHour && startMinute < endMinute) {
            errObj.invalidEndTime = false;
            errObj.invalidStartTime = false;
            errObj.endTime = false;
            setEndTime(value);
          } else if (startHour === endHour && startMinute >= endMinute) {
            // console.log("Hi");
            errObj.invalidEndTime = true;
            errObj.invalidStartTime = true;
            setEndTime(value);
          } else if (startHour > endHour) {
            // console.log("Hey");
            errObj.invalidEndTime = true;
            errObj.invalidStartTime = true;
            setEndTime(value);
          }
        } else {
          errObj.invalidEndTime = false;
          errObj.endTime = false;
          setEndTime(value);
        }
      } else if (startDate.getTime() < endDate.getTime()) {
        errObj.invalidEndTime = false;
        errObj.endTime = false;
        setEndTime(value);
      }
    }

    setError({ ...error, ...errObj });
  };

  const handleStartTime = (value) => {
    if (
      error.startDate ||
      error.endDate ||
      error.invalidEndDate ||
      error.invalidStartDate ||
      !startDate ||
      !endDate
    ) {
      errObj.cannotSetStartTime = true;
    } else {
      errObj.cannotSetStartTime = false;
      if (
        endDate.getDate() === startDate.getDate() &&
        endDate.getMonth() === startDate.getMonth() &&
        endDate.getYear() === startDate.getYear()
      ) {
        if (endTime) {
          const startTimeSplitted = value.split(":");
          const endTimeSplitted = endTime.split(":");
          const startHour = parseInt(startTimeSplitted[0], 10);
          const startMinute = parseInt(startTimeSplitted[1], 10);
          const endHour = parseInt(endTimeSplitted[0], 10);
          const endMinute = parseInt(endTimeSplitted[1], 10);
          if (startHour < endHour) {
            errObj.invalidStartTime = false;
            errObj.invalidEndTime = false;
            errObj.startTime = false;
            setStartTime(value);
          } else if (startHour === endHour && startMinute < endMinute) {
            errObj.invalidStartTime = false;
            errObj.invalidEndTime = false;
            errObj.startTime = false;
            setStartTime(value);
          } else if (startHour === endHour && startMinute >= endMinute) {
            // console.log("Hi");
            errObj.invalidStartTime = true;
            errObj.invalidEndTime = true;
            setStartTime(value);
          } else if (startHour > endHour) {
            // console.log("Hey");
            errObj.invalidStartTime = true;
            errObj.invalidEndTime = true;
            setStartTime(value);
          }
        } else {
          errObj.invalidStartTime = false;
          errObj.startTime = false;
          setStartTime(value);
        }
      } else if (startDate.getTime() < endDate.getTime()) {
        errObj.invalidStartTime = false;
        errObj.startTime = false;
        setStartTime(value);
      }
    }
    setError({ ...error, ...errObj });
  };

  useEffect(() => {
    if (startTime && endTime) {
      handleStartTime(startTime);
      handleEndTime(endTime);
    }
  }, [startDate, endDate]);

  const handleSubmit = () => {
    const theErrorObj = handleError();
    setError(theErrorObj);
  };

  return (
    <Box>
      <ModalComponent
        open={openCreateFlagModal}
        ModalTitle="Create Flag"
        titleClassName="fw-bold fs-14 color-orange"
        footerClassName="d-flex justify-content-start flex-row-reverse border-top mt-3"
        ClearBtnText="Reset"
        saveBtnText="Save"
        saveBtnClassName="ms-1"
        ModalWidth={650}
        onCloseIconClick={() => {
          handleCloseIconClick();
        }}
        onSaveBtnClick={() => {
          handleSubmit();
        }}
        onClearBtnClick={() => {
          handleClearAll();
        }}
      >
        <Grid container spacing={2} className="my-2">
          <Grid item xs={6}>
            <InputBox
              label="Flag Title"
              value={flagTitle}
              onInputChange={(e) => {
                setFlagTitle(e.target.value);
              }}
              inputlabelshrink
              error={error.flagTitle}
              helperText={error.flagTitle ? validateMessage.field_required : ""}
            />
          </Grid>
          <Grid item xs={6}>
            <SimpleDropdownComponent
              size="small"
              label="Image Type"
              inputlabelshrink
              list={[{ label: "Type One" }, { label: "Type Two" }]}
              onDropdownSelect={(value) => {
                setImageType(value);
              }}
              value={imageType}
              helperText={error.imageType ? validateMessage.field_required : ""}
            />
          </Grid>
          <Grid item xs={6}>
            <SimpleDropdownComponent
              size="small"
              label="Product Category"
              inputlabelshrink
              list={[{ label: "Category One" }, { label: "Category Two" }]}
              onDropdownSelect={(value) => {
                setProductCategory(value);
              }}
              value={productCategory}
              helperText={
                error.productCategory ? validateMessage.field_required : ""
              }
            />
          </Grid>
          <Grid item xs={6}>
            <SimpleDropdownComponent
              size="small"
              label="Product Type"
              inputlabelshrink
              list={[{ label: "Type One" }, { label: "Type Two" }]}
              onDropdownSelect={(value) => {
                setProductType(value);
              }}
              value={productType}
              helperText={
                error.productType ? validateMessage.field_required : ""
              }
            />
          </Grid>
          <Grid item xs={6}>
            <SimpleDropdownComponent
              size="small"
              label="Products"
              inputlabelshrink
              list={[{ label: "Product One" }, { label: "Product Two" }]}
              onDropdownSelect={(value) => {
                setProducts(value);
              }}
              value={products}
              helperText={error.products ? validateMessage.field_required : ""}
            />
          </Grid>
          <Grid item xs={6}>
            <SimpleDropdownComponent
              size="small"
              label="Visibility Place"
              inputlabelshrink
              list={[{ label: "One" }, { label: "Two" }]}
              onDropdownSelect={(value) => {
                setVisibilityPlace(value);
              }}
              value={visibilityPlace}
              helperText={
                error.visibilityPlace ? validateMessage.field_required : ""
              }
            />
          </Grid>
          <Grid item xs={6}>
            <SimpleDropdownComponent
              size="small"
              label="Theme Selection"
              inputlabelshrink
              list={[{ label: "Theme One" }, { label: "Theme Two" }]}
              onDropdownSelect={(value) => {
                setThemeSection(value);
              }}
              value={themeSection}
              helperText={
                error.themeSection ? validateMessage.field_required : ""
              }
            />
          </Grid>
          <Grid item xs={6}>
            <SimpleDropdownComponent
              size="small"
              label="Color Selection"
              inputlabelshrink
              list={[{ label: "Product One" }, { label: "Product Two" }]}
              onDropdownSelect={(value) => {
                setColorSection(value);
              }}
              value={colorSection}
              helperText={
                error.colorSection ? validateMessage.field_required : ""
              }
            />
          </Grid>
          <Grid item xs={6}>
            <Box className="d-flex align-items-center">
              <Typography className="h-5">From Date</Typography>
              <CustomDatePickerComponent
                value={startDate}
                onDateChange={(value) => {
                  handleStartDate(value);
                }}
                size="small"
              />
            </Box>

            {error.startDate && !error.invalidStartDate && (
              <Typography className="text-danger h-5">
                {validateMessage.field_required}
              </Typography>
            )}
            {error.invalidStartDate && (
              <Typography className="text-danger h-5">
                Invalid start date
              </Typography>
            )}
          </Grid>
          <Grid item xs={6}>
            <Box className="d-flex align-items-center">
              <Typography className="h-5">To Date</Typography>
              <CustomDatePickerComponent
                value={endDate}
                onDateChange={(value) => {
                  handleEndDate(value);
                }}
                size="small"
              />
            </Box>
            {error.endDate && (
              <Typography className="text-danger h-5">
                {validateMessage.field_required}
              </Typography>
            )}
            {error.invalidEndDate && (
              <Typography className="text-danger h-5">
                Invalid end date
              </Typography>
            )}
          </Grid>
          <Grid item xs={6}>
            <Box className="d-flex align-items-center">
              <Typography className="h-5">Start Time:</Typography>
              <input
                type="time"
                // value={dateValue.from}
                placeholder="hh:mm"
                className={styles.timepicker}
                style={{
                  border: "none",
                  outline: "none",
                  display: "flex",
                  flexDirection: "row-reverse",
                }}
                onChange={(e) => {
                  handleStartTime(e.target.value);
                }}
                value={startTime}
              />
            </Box>
            {error.startTime &&
              !error.invalidStartTime &&
              !error.cannotSetStartTime && (
                <Typography className="text-danger h-5">
                  {validateMessage.field_required}
                </Typography>
              )}
            {error.invalidStartTime && (
              <Typography className="text-danger h-5">
                Invalid start time
              </Typography>
            )}
            {error.cannotSetStartTime && (
              <Typography className="text-danger h-5">
                Please specify dates first
              </Typography>
            )}
          </Grid>
          <Grid item xs={6}>
            <Box className="d-flex align-items-center">
              <Typography className="h-5">End Time:</Typography>
              <input
                type="time"
                // value={dateValue.from}
                placeholder="hh:mm"
                className={styles.timepicker}
                style={{
                  border: "none",
                  outline: "none",
                  display: "flex",
                  flexDirection: "row-reverse",
                }}
                onChange={(e) => {
                  handleEndTime(e.target.value);
                }}
                value={endTime}
              />
            </Box>
            {error.endTime &&
              !error.invalidEndTime &&
              !error.cannotSetEndTime && (
                <Typography className="text-danger h-5">
                  {validateMessage.field_required}
                </Typography>
              )}
            {error.cannotSetEndTime && (
              <Typography className="text-danger h-5">
                Please specify dates first
              </Typography>
            )}
            {error.invalidEndTime && (
              <Typography className="text-danger h-5">
                Invalid end time
              </Typography>
            )}
          </Grid>
        </Grid>
      </ModalComponent>
    </Box>
  );
};

export default CreateFlagModal;
