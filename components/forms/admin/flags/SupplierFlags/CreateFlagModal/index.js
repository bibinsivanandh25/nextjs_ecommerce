import CustomDatePickerComponent from "@/atoms/CustomDatePickerComponent";
import ModalComponent from "@/atoms/ModalComponent";
import SimpleDropdownComponent from "@/atoms/SimpleDropdownComponent";
import { Box, Grid, Typography } from "@mui/material";
import validateMessage from "constants/validateMessages";
import React from "react";
import { useState } from "react";
import styles from "./createflag.module.css";
const tempObj = {
  flagTitle: {},
  visibilityPlace: {},
  themeSelection: {},
  colorSelection: {},
  startDate: "",
  endDate: "",
  startTime: "",
  endTime: "",
};
const CreateFlagModal = ({ openCreateFlagModal, setOpenCreateFlagModal }) => {
  const [formData, setFormDate] = useState({ ...tempObj });
  const [errorObj, setErrorObj] = useState({});

  const validate = () => {
    let flag = false;
    const errObj = {
      flagTitle: "",
      visibilityPlace: "",
      themeSelection: "",
      colorSelection: "",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
    };
    if (!Object.keys(formData.flagTitle).length) {
      errObj.flagTitle = validateMessage.field_required;
      flag = true;
    }
    if (!Object.keys(formData.visibilityPlace).length) {
      errObj.visibilityPlace = validateMessage.field_required;
      flag = true;
    }
    if (!Object.keys(formData.themeSelection).length) {
      errObj.themeSelection = validateMessage.field_required;
      flag = true;
    }
    if (!Object.keys(formData.colorSelection).length) {
      errObj.colorSelection = validateMessage.field_required;
      flag = true;
    }
    if (formData.startDate === "") {
      errObj.startDate = validateMessage.field_required;
      flag = true;
    }
    if (formData.startDate > formData.endDate) {
      errObj.startDate = validateMessage.startDateValid;
      flag = true;
    }
    if (formData.endDate === "") {
      errObj.endDate = validateMessage.field_required;
      flag = true;
    }
    if (formData.startTime === "") {
      errObj.startTime = validateMessage.field_required;
      flag = true;
    }
    if (formData.endTime === "") {
      errObj.endTime = validateMessage.field_required;
      flag = true;
    }
    setErrorObj(errObj);
    return flag;
  };
  const handleSubmit = () => {
    if (!validate()) {
    }
  };
  const handleClearAll = () => {
    setFormDate({
      flagTitle: {},
      visibilityPlace: {},
      themeSelection: {},
      colorSelection: {},
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
    })
    setErrorObj({
      flagTitle: "",
      visibilityPlace: "",
      themeSelection: "",
      colorSelection: "",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
    })
  };

  const handleChange = (value, name) => {
    setFormDate((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  return (
    <Box>
      <ModalComponent
        titleClassName="fw-bold fs-14 color-orange"
        footerClassName="d-flex justify-content-start flex-row-reverse border-top mt-3"
        saveBtnClassName="ms-1"
        open={openCreateFlagModal}
        onCloseIconClick={() => {
          setOpenCreateFlagModal(false);
          setFormDate({
            flagTitle: {},
            visibilityPlace: {},
            themeSelection: {},
            colorSelection: {},
            startDate: "",
            endDate: "",
            startTime: "",
            endTime: "",
          })
          setErrorObj({
            flagTitle: "",
            visibilityPlace: "",
            themeSelection: "",
            colorSelection: "",
            startDate: "",
            endDate: "",
            startTime: "",
            endTime: "",
          })
        }}
        ModalTitle="Create Flag"
        saveBtnText="Save"
        ClearBtnText="Reset"
        ModalWidth={650}
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
              handleChange(value ?? {}, "flagTitle");
            }}
            value={formData.flagTitle}
            helperText={errorObj.flagTitle}
          />
        </Grid>
       
       
        <Grid item md={6}>
          <SimpleDropdownComponent
            size="small"
            label="Visibility Place"
            inputlabelshrink
            list={[{ label: "Type One" }, { label: "Type Two" }]}
            onDropdownSelect={(value) => {
              handleChange(value ?? {}, "visibilityPlace");
            }}
            id="visibilityPlace"
            value={formData.visibilityPlace}
            helperText={errorObj.visibilityPlace}
          />
        </Grid>
        <Grid item md={6}>
          <SimpleDropdownComponent
            size="small"
            label="Theme Selection"
            inputlabelshrink
            list={[{ label: "Type One" }, { label: "Type Two" }]}
            onDropdownSelect={(value) => {
              handleChange(value ?? {}, "themeSelection");
            }}
            id="themeSelection"
            value={formData.themeSelection}
            helperText={errorObj.themeSelection}
          />
        </Grid>
        <Grid item md={6}>
          <SimpleDropdownComponent
            size="small"
            label="Color Selection"
            inputlabelshrink
            list={[{ label: "Type One" }, { label: "Type Two" }]}
            onDropdownSelect={(value) => {
              handleChange(value ?? {}, "colorSelection");
            }}
            id="colorSelection"
            value={formData.colorSelection}
            helperText={errorObj.colorSelection}
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
          {errorObj.startDate ? (
              <Grid>
              <Typography className="color-error fs-12 fw-400">
                {errorObj.startDate}
              </Typography>
              </Grid>
            ) : null}
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
          {errorObj.endDate ? (
              <Grid>
              <Typography className="color-error fs-12 fw-400">
                {errorObj.endDate}
              </Typography>
              </Grid>
            ) : null}
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
          {errorObj.startTime ? (
              <Grid>
              <Typography className="color-error fs-12 fw-400">
                {errorObj.startTime}
              </Typography>
              </Grid>
            ) : null}
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
                handleChange(e.target.value, "endTime");
              }}

              // value={endTime}
            />
          </Box>
          {errorObj.endTime ? (
              <Grid>
              <Typography className="color-error fs-12 fw-400">
                {errorObj.endTime}
              </Typography>
              </Grid>
            ) : null}
        </Grid>
      </Grid>
      </ModalComponent>
    </Box>
  );
};
export default CreateFlagModal;
