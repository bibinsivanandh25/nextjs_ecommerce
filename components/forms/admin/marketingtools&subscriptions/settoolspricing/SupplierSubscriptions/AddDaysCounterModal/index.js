/* eslint-disable no-nested-ternary */
import { Box, Grid } from "@mui/material";
import React, { useState } from "react";
import validateMessage from "constants/validateMessages";
import DatePickerComponent from "@/atoms/DatePickerComponent";
import InputBox from "@/atoms/InputBoxComponent";
import ModalComponent from "@/atoms/ModalComponent";
import SimpleDropdownComponent from "@/atoms/SimpleDropdownComponent";

let errObj = {
  days: false,
  tools: false,
  price: false,
  startDate: false,
  endDate: false,
  startDateGreater: false,
  endDateSmaller: false,
};

const AddDaysCounterModal = ({
  openAddDaysCounterModal,
  setOpenAddDaysCounterModal,
}) => {
  const [days, setDays] = useState({ label: "" });
  const [tools, setTools] = useState({ label: "" });
  const [price, setPrice] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [error, setError] = useState(errObj);

  const handleCloseIconClick = () => {
    errObj = {
      days: false,
      tools: false,
      price: false,
      startDate: false,
      endDate: false,
      startDateGreater: false,
      endDateSmaller: false,
    };
    setError(errObj);
    setDays({ label: "" });
    setTools({ label: "" });
    setPrice("");
    setStartDate(null);
    setEndDate(null);
    setOpenAddDaysCounterModal(false);
  };

  const handleError = () => {
    errObj = {
      days: false,
      tools: false,
      price: false,
      startDate: false,
      endDate: false,
      startDateGreater: false,
      endDateSmaller: false,
    };
    if (days.label === "") {
      errObj.days = true;
    }
    if (tools.label === "") {
      errObj.tools = true;
    }
    if (price === "") {
      errObj.price = true;
    }
    if (startDate === null) {
      errObj.startDate = true;
    }
    if (endDate === null) {
      errObj.endDate = true;
    }
    return errObj;
  };

  const handleStartDate = (date) => {
    if (endDate) {
      if (
        date.getDate() === endDate.getDate() &&
        date.getMonth() === endDate.getMonth() &&
        date.getYear() === endDate.getYear()
      ) {
        errObj.startDateGreater = false;
        setError({ ...errObj });
        setStartDate(date);
      } else if (endDate.getTime() < date.getTime()) {
        errObj.startDateGreater = true;
        setError({ ...errObj });
      } else {
        errObj.startDateGreater = false;
        setError({ ...errObj });
        setStartDate(date);
      }
    } else {
      setStartDate(date);
    }
  };

  const handleEndDate = (date) => {
    if (startDate) {
      if (
        date.getDate() === startDate.getDate() &&
        date.getMonth() === startDate.getMonth() &&
        date.getYear() === startDate.getYear()
      ) {
        errObj.endDateSmaller = false;
        setError({ ...errObj });
        setEndDate(date);
      } else if (startDate.getTime() > date.getTime()) {
        console.log("Hi");
        errObj.endDateSmaller = true;
        setError({ ...errObj });
        setEndDate(date);
      } else {
        console.log(2);
        console.log("Hi");
        errObj.endDateSmaller = false;
        setError({ ...errObj });
        setEndDate(date);
      }
    } else {
      console.log(3);
      setEndDate(date);
    }
  };

  const handleClearAll = () => {
    errObj = {
      days: false,
      tools: false,
      price: false,
      startDate: false,
      endDate: false,
      startDateGreater: false,
      endDateSmaller: false,
    };
    setError(errObj);
    setDays({ label: "" });
    setTools({ label: "" });
    setPrice("");
    setStartDate(null);
    setEndDate(null);
  };

  const handleSaveBtnClick = () => {
    const theError = handleError();
    setError(theError);
  };

  return (
    <Box>
      <ModalComponent
        open={openAddDaysCounterModal}
        ModalTitle="Add Days Counter"
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
          handleSaveBtnClick();
        }}
        onClearBtnClick={() => {
          handleClearAll();
        }}
      >
        <Grid container spacing={2} className="mt-1">
          <Grid item xs={6}>
            <SimpleDropdownComponent
              label="Days"
              inputlabelshrink
              size="small"
              list={[{ label: "Day 1" }, { label: "Day 2" }]}
              onDropdownSelect={(value) => {
                console.log(value);
                setDays(value);
              }}
              value={days}
              helperText={error.days ? validateMessage.field_required : ""}
            />
          </Grid>
          <Grid item xs={6}>
            <SimpleDropdownComponent
              label="Tools"
              inputlabelshrink
              size="small"
              list={[{ label: "tool1" }, { label: "tool2" }]}
              onDropdownSelect={(value) => {
                setTools(value);
              }}
              value={tools}
              helperText={error.tools ? validateMessage.field_required : ""}
            />
          </Grid>
          <Grid item xs={6}>
            <InputBox
              label="Price"
              value={price}
              onInputChange={(e) => {
                setPrice(e.target.value);
              }}
              inputlabelshrink
              error={error.price}
              helperText={error.price ? validateMessage.field_required : ""}
            />
          </Grid>
          <Grid item xs={6}>
            {}
          </Grid>
          <Grid item xs={6}>
            <DatePickerComponent
              label="Start Date"
              inputlabelshrink
              size="small"
              value={startDate}
              onDateChange={(date) => {
                handleStartDate(date);
              }}
              error={error.startDate || error.startDateGreater}
              helperText={
                error.startDate
                  ? validateMessage.field_required
                  : error.startDateGreater
                  ? "Invalid start date"
                  : ""
              }
            />
          </Grid>
          <Grid item xs={6}>
            <DatePickerComponent
              label="End Date"
              inputlabelshrink
              size="small"
              value={endDate}
              onDateChange={(date) => {
                handleEndDate(date);
              }}
              error={error.endDate || error.endDateSmaller}
              helperText={
                error.endDate
                  ? validateMessage.field_required
                  : error.endDateSmaller
                  ? "Invalid end date"
                  : ""
              }
            />
          </Grid>
        </Grid>
      </ModalComponent>
    </Box>
  );
};

export default AddDaysCounterModal;
