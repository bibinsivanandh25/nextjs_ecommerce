/* eslint-disable no-nested-ternary */
import { Box, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import validateMessage from "constants/validateMessages";
import DatePickerComponent from "@/atoms/DatePickerComponent";
import InputBox from "@/atoms/InputBoxComponent";
import ModalComponent from "@/atoms/ModalComponent";
import SimpleDropdownComponent from "@/atoms/SimpleDropdownComponent";
import { format } from "date-fns";
import toastify from "services/utils/toastUtils";
import { addIndividualPricing } from "services/admin/marketingtools/settoolpricing/resellerSubscription";
import { updateMarketingToolPrice } from "services/admin/marketingtools/settoolpricing";

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
  getIndividualPricing = () => {},
  modalType = "Add",
  selectedValues = {
    days: "",
    tools: "",
    price: "",
    startDate: "",
    endDate: "",
  },
  marketingToolId = "",
}) => {
  const [days, setDays] = useState({ label: "" });
  const [tools, setTools] = useState({ label: "" });
  const [price, setPrice] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [error, setError] = useState(errObj);

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

  useEffect(() => {
    if (modalType === "Edit") {
      setDays({
        label: selectedValues.days,
        value: selectedValues.days,
      });
      setTools({
        label: selectedValues.tools,
        value: selectedValues.tools,
      });
      setPrice(selectedValues.price);
      setStartDate(new Date(selectedValues.startDate.split(" ")[0]));
      setEndDate(new Date(selectedValues.endDate.split(" ")[0]));
    }
  }, [modalType]);

  const toolsList = [
    {
      id: 1,
      label: "DISCOUNT COUPON",
      value: "DISCOUNT_COUPON",
    },
    {
      id: 2,
      label: "TODAYS DEAL",
      value: "TODAYS_DEAL",
    },
    {
      id: 3,
      label: "SPIN WHEEL",
      value: "SPIN_WHEEL",
    },
    {
      id: 4,
      label: "SCRATCH CARD",
      value: "SCRATCH_CARD",
    },
    {
      id: 5,
      label: "QUIZ",
      value: "QUIZ",
    },
    {
      id: 6,
      label: "PRICE TARGETED",
      value: "PRICE_TARGETED",
    },
  ];

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
    if (new Date(startDate) > new Date(endDate)) {
      errObj.startDateGreater = true;
      toastify("fromDate Cannot be Greater Than ToDate", "error");
    }
    return errObj;
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

  const handleSaveBtnClick = async () => {
    const theError = handleError();
    const flag = Object.values({ ...theError, ...error }).some((ele) => ele);
    if (!flag) {
      if (modalType === "Add") {
        const payload = {
          adminMarketingToolName: tools.value,
          price: Number(price),
          days: days.value,
          startDateTime: `${format(startDate, "MM-dd-yyyy")} 00:00:00`,
          endDateTime: `${format(endDate, "MM-dd-yyyy")} 00:00:00`,
          storeType: "RESELLER",
        };
        const { data, err } = await addIndividualPricing(payload);
        if (data) {
          toastify(data.message, "success");
          setOpenAddDaysCounterModal(false);
          getIndividualPricing();
        }
        if (err) {
          toastify(err?.response?.data?.message, "error");
        }
      } else {
        const payload = {
          toolId: marketingToolId,
          price: Number(price),
          startDateTime: `${format(startDate, "MM-dd-yyyy")} 00:00:00`,
          endDateTime: `${format(endDate, "MM-dd-yyyy")} 00:00:00`,
        };

        const { data, err } = await updateMarketingToolPrice(payload);
        if (data) {
          getIndividualPricing();
          setOpenAddDaysCounterModal(false);
          toastify(data?.message, "success");
        }
        if (err) {
          toastify(err?.response?.data?.message, "error");
        }
      }
    }
  };

  return (
    <Box>
      <ModalComponent
        open={openAddDaysCounterModal}
        ModalTitle={
          modalType === "Add" ? "Add Days Counter" : "Edit Days Counter"
        }
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
              disabled={modalType === "Edit"}
              label="Days"
              inputlabelshrink
              size="small"
              list={daysList}
              onDropdownSelect={(value) => {
                // console.log(value);
                setDays(value);
              }}
              value={days}
              helperText={error.days ? validateMessage.field_required : ""}
            />
          </Grid>
          <Grid item xs={6}>
            <SimpleDropdownComponent
              disabled={modalType === "Edit"}
              label="Tools"
              inputlabelshrink
              size="small"
              list={[...toolsList]}
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
              type="number"
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
              disablePast
              label="Start Date"
              inputlabelshrink
              size="small"
              value={startDate}
              onDateChange={(date) => {
                setStartDate(date);
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
              disablePast
              label="End Date"
              inputlabelshrink
              size="small"
              value={endDate}
              onDateChange={(date) => {
                setEndDate(date);
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
