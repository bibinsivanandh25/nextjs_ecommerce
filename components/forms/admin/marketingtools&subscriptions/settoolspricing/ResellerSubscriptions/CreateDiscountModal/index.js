/* eslint-disable no-nested-ternary */
import { Box, Grid } from "@mui/material";
import React, { useState } from "react";
import validateMessage from "constants/validateMessages";
import DatePickerComponent from "@/atoms/DatePickerComponent";
import InputBox from "@/atoms/InputBoxComponent";
import ModalComponent from "@/atoms/ModalComponent";
import SimpleDropdownComponent from "@/atoms/SimpleDropdownComponent";
import MultiSelectComponent from "@/atoms/MultiSelectComponent";
import { format } from "date-fns";
import toastify from "services/utils/toastUtils";
import {
  createToolCampaignReseller,
  getToolCampaignDropDownReseller,
} from "services/admin/marketingtools/settoolpricing/resellerSubscription";

let errObj = {
  days: false,
  tools: false,
  price: false,
  title: false,
  startDate: false,
  endDate: false,
  startDateGreater: false,
  endDateSmaller: false,
};

const daysList = [
  {
    id: 1,
    label: "7 Days",
    value: "7 days",
  },
  {
    id: 2,
    label: "30 Days",
    value: "30 days",
  },
  {
    id: 3,
    label: "90 Days",
    value: "90 days",
  },
  {
    id: 4,
    label: "180 Days",
    value: "180 days",
  },
  {
    id: 5,
    label: "270 Days",
    value: "270 days",
  },
  {
    id: 6,
    label: "360 Days",
    value: "360 days",
  },
];

const CreateDiscountModal = ({
  openCreateDiscountModal,
  setOpenCreateDiscountModal,
}) => {
  const [days, setDays] = useState({ label: "" });
  const [tools, setTools] = useState([]);
  const [price, setPrice] = useState("");
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [error, setError] = useState(errObj);
  const [toolsList, setToolsList] = useState([]);

  const handleCloseIconClick = () => {
    errObj = {
      days: false,
      tools: false,
      price: false,
      title: false,
      startDate: false,
      endDate: false,
      startDateGreater: false,
      endDateSmaller: false,
    };
    setError(errObj);
    setDays({ label: "" });
    setTools({ label: "" });
    setPrice("");
    setTitle("");
    setStartDate(null);
    setEndDate(null);
    setOpenCreateDiscountModal(false);
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
    if (title === "") {
      errObj.title = true;
    }
    if (title.length > 30) {
      errObj.title = true;
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
        errObj.endDateSmaller = true;
        setError({ ...errObj });
        setEndDate(date);
      } else {
        errObj.endDateSmaller = false;
        setError({ ...errObj });
        setEndDate(date);
      }
    } else {
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
    setTitle("");
    setStartDate(null);
    setEndDate(null);
  };
  const getTools = async (val) => {
    const formData = new FormData();
    formData.append("days", val.value);
    formData.append("storeType", "RESELLER");
    const { data } = await getToolCampaignDropDownReseller(formData);
    if (data) {
      const result = [];
      data.forEach((ele) => {
        result.push({
          id: ele.adminMarketingToolId,
          title: ele.adminMarketingToolName.replaceAll("_", " "),
          value: ele.adminMarketingToolName,
        });
      });
      setToolsList([...result]);
    }
  };

  const handleSaveBtnClick = async () => {
    const theError = handleError();
    setError(theError);
    const flag = Object.values(theError).some((e) => e);
    if (!flag) {
      const payload = {
        title,
        days: days.value,
        price: Number(price),
        startDateTime: `${format(startDate, "MM-dd-yyyy")} 00:00:00`,
        endDateTime: `${format(endDate, "MM-dd-yyyy")} 00:00:00`,
        storeType: "RESELLER",
        adminMarketingToolIds: tools.map((ele) => ele.id),
      };

      const { data, err } = await createToolCampaignReseller(payload);
      if (data) {
        toastify(data.message, "success");
        setOpenCreateDiscountModal(false);
      }
      if (err) {
        toastify(err?.response?.data?.message, "error");
      }
    }
  };

  return (
    <Box>
      <ModalComponent
        open={openCreateDiscountModal}
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
              list={daysList}
              onDropdownSelect={(value) => {
                if (value) {
                  getTools(value);
                }
                setDays(value);
                setTools([]);
              }}
              value={days}
              helperText={error.days ? validateMessage.field_required : ""}
            />
          </Grid>
          <Grid item xs={6}>
            <MultiSelectComponent
              label="Tools"
              inputlabelshrink
              size="small"
              list={toolsList}
              onSelectionChange={(e, value) => {
                setTools(value);
              }}
              value={tools}
              helperText={error.tools ? validateMessage.field_required : ""}
            />
          </Grid>
          <Grid item xs={6}>
            <InputBox
              type="number"
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
            <InputBox
              label="Title"
              value={title}
              onInputChange={(e) => {
                setTitle(e.target.value);
              }}
              inputlabelshrink
              error={error.title}
              helperText={
                error.title
                  ? title.length === 0
                    ? validateMessage.field_required
                    : "Maximum 30 characters are allowed"
                  : ""
              }
            />
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

export default CreateDiscountModal;
