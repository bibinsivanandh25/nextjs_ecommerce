/* eslint-disable no-nested-ternary */
import { Box, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import validateMessage from "constants/validateMessages";
import DatePickerComponent from "@/atoms/DatePickerComponent";
import InputBox from "@/atoms/InputBoxComponent";
import ModalComponent from "@/atoms/ModalComponent";
import SimpleDropdownComponent from "@/atoms/SimpleDropdownComponent";
import {
  createToolCampaignSupplier,
  getToolCampaignDropDownSupplier,
  updateToolCampaign,
} from "services/admin/marketingtools/settoolpricing/supplierSubscription";
import MultiSelectComponent from "@/atoms/MultiSelectComponent";
import { format } from "date-fns";
import toastify from "services/utils/toastUtils";

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
    value: "7 Days",
  },
  {
    id: 2,
    label: "30 Days",
    value: "30 Days",
  },
  {
    id: 3,
    label: "90 Days",
    value: "90 Days",
  },
  {
    id: 4,
    label: "180 Days",
    value: "180 Days",
  },
  {
    id: 5,
    label: "270 Days",
    value: "270 Days",
  },
  {
    id: 6,
    label: "360 Days",
    value: "360 Days",
  },
];

const CreateDiscountModal = ({
  status = "",
  campaignID = "",
  toolsCampaignEditData = {},
  modalType = "Add",
  openCreateDiscountModal,
  setOpenCreateDiscountModal,
  getToolCampaignTableData = () => {},
}) => {
  const [days, setDays] = useState({ label: "" });
  const [tools, setTools] = useState([]);
  const [price, setPrice] = useState("");
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [error, setError] = useState(errObj);
  const [toolsList, setToolsList] = useState([]);

  useEffect(() => {
    if (modalType === "Edit") {
      setDays({
        value: toolsCampaignEditData.days,
        label: toolsCampaignEditData.days,
      });
      setTitle(toolsCampaignEditData.title);
      setPrice(toolsCampaignEditData.price);
      setStartDate(new Date(toolsCampaignEditData.startDate.split(" ")[0]));
      setEndDate(new Date(toolsCampaignEditData.endDate.split(" ")[0]));
      const temp = [];
      toolsCampaignEditData?.toolNames.forEach((ele) => {
        temp.push({
          title: ele,
          value: ele,
        });
      });
      setTools(temp);
    }
  }, [toolsCampaignEditData, modalType]);

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
    setTitle("");
    setStartDate(null);
    setEndDate(null);
  };
  const getTools = async (val) => {
    const formData = new FormData();
    formData.append("days", val.value);
    formData.append("storeType", "SUPPLIER");
    const { data } = await getToolCampaignDropDownSupplier(formData);
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
      if (modalType === "Add") {
        const payload = {
          title,
          days: days.value,
          price: Number(price),
          startDateTime: `${format(startDate, "MM-dd-yyyy")} 00:00:00`,
          endDateTime: `${format(endDate, "MM-dd-yyyy")} 00:00:00`,
          storeType: "SUPPLIER",
          adminMarketingToolIds: tools.map((ele) => ele.id),
        };

        const { data, err } = await createToolCampaignSupplier(payload);
        if (data) {
          toastify(data.message, "success");
          setOpenCreateDiscountModal(false);
          getToolCampaignTableData(0);
        }
        if (err) {
          toastify(err?.response?.data?.message, "error");
        }
      } else {
        const payload = {
          adminMarketingToolsCampaignId: campaignID,
          title,
          price,
          startDateTime: `${format(startDate, "MM-dd-yyyy")} 00:00:00`,
          endDateTime: `${format(endDate, "MM-dd-yyyy")} 00:00:00`,
          storeType: "SUPPLIER",
        };
        const { data, err } = await updateToolCampaign(payload);
        if (data) {
          toastify(data.message, "success");
          setOpenCreateDiscountModal(false);
          getToolCampaignTableData(0);
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
        open={openCreateDiscountModal}
        ModalTitle={
          modalType === "Edit" ? "Edit Tools Campaign" : "Add Tools Campaign"
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
              disabled={modalType === "Edit"}
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
              disabled={status === "ACTIVE" && modalType === "Edit"}
              label="Price"
              type="number"
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
              disabled={status === "ACTIVE" && modalType === "Edit"}
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
              disabled={status === "ACTIVE" && modalType === "Edit"}
              disablePast
              label="Start Date"
              inputlabelshrink
              size="small"
              value={startDate}
              onDateChange={(date) => {
                // handleStartDate(date);
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
                // handleEndDate(date);
                setEndDate(date);
              }}
            />
          </Grid>
        </Grid>
      </ModalComponent>
    </Box>
  );
};

export default CreateDiscountModal;
