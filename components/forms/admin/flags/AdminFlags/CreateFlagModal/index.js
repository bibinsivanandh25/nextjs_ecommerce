import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ModalComponent from "@/atoms/ModalComponent";
import SimpleDropdownComponent from "@/atoms/SimpleDropdownComponent";
import CustomDatePickerComponent from "@/atoms/CustomDatePickerComponent";
import styles from "./createflag.module.css";
import MultiSelectComponent from "../../../../../atoms/MultiSelectComponent";
import {
  getFlagTitle,
  getTheme,
  editThemeLayout,
} from "services/admin/admin/adminconfiguration/flags";
import Image from "next/image";
import toastify from "services/utils/toastUtils";
import validateMessage from "constants/validateMessages";
const tempObj = {
  flagTitle: {},
  visibilityPlace: [],
  themeSelection: [],
  colorSelection: {},
  startDate: "",
  endDate: "",
  startTime: "",
  endTime: "",
};

const CreateFlagModal = ({ open = false, setOpen = () => {} }) => {
  const [formData, setFormDate] = useState({ ...tempObj });
  const [errorObj, setErrorObj] = useState({});
  const [flagTitleState, setflagTitleState] = useState({});
  const [themeState, setthemeState] = useState({});
  const [colorTheme, setcolorTheme] = useState({});

  const getFlagTitleFunction = async () => {
    const { data } = await getFlagTitle();
    if (data) {
      const result = [];
      data?.data.forEach((ele) => {
        result.push({
          id: ele.flatTitleId,
          label: ele.flagTitle,
        });
        setflagTitleState([...result]);
      });
    }
  };
  const getFlagTheme = async () => {
    const { data } = await getTheme();
    if (data) {
      const result = [];
      data?.data.forEach((ele) => {
        result.push({
          id: ele.flagLayoutId,
          title: <Image src={ele.flagLayoutImageUrl} width={400} height={80} />,
          url: ele.flagLayoutImageUrl,
        });
      });
      setthemeState([...result]);
    }
  };
  useEffect(() => {
    getFlagTitleFunction();
    getFlagTheme();
  }, []);
  const flahLayoutTheme = async () => {
    const payload = {
      flagTitle: formData.flagTitle.label,
      flagLayoutIdList: [...formData.themeSelection.map(item=>{return item.id})],
      visibilityPlaceList: [...formData.visibilityPlace.map(item=>{return item.title})],
    };
    const { data, err } = await editThemeLayout(payload);

    if (data) {
      const result = [];
      data.forEach((ele) => {
        result.push({
          id: ele.flagThemeId,
          flagLayoutId: ele.flagLayoutId,
          visibilityPlace: ele.visibilityPlace,
          flagTitle: ele.flagTitle,
          label:<Image src={ele.flagThemeImageUrl} width={400} height={80} /> ,
        });
      });
      setcolorTheme([...result]);
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };

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
      visibilityPlace: [],
      themeSelection: [],
      colorSelection: {},
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
    });
    setErrorObj({
      flagTitle: "",
      visibilityPlace: "",
      themeSelection: "",
      colorSelection: "",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
    });
    setcolorTheme([])
  };

  const handleChange = (value, name) => {
    setFormDate((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (
      formData.flagTitle?.label &&
      formData.themeSelection.length &&
      formData.visibilityPlace.length
    ) {
      flahLayoutTheme();
    }
  }, [formData]);

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
        setFormDate({
          flagTitle: {},
          visibilityPlace: [],
          themeSelection: [],
          colorSelection: {},
          startDate: "",
          endDate: "",
          startTime: "",
          endTime: "",
        });
        setErrorObj({
          flagTitle: "",
          visibilityPlace: "",
          themeSelection: "",
          colorSelection: "",
          startDate: "",
          endDate: "",
          startTime: "",
          endTime: "",
        });
        setcolorTheme([])
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
            list={flagTitleState}
            onDropdownSelect={(value) => {
              handleChange(value ?? {}, "flagTitle");
            }}
            value={formData.flagTitle}
            helperText={errorObj.flagTitle}
          />
        </Grid>

        <Grid item md={6}>
          <MultiSelectComponent
            size="small"
            inputlabelshrink
            list={[
              { id: 1, title: "BOTTOM_RIGHT" },
              { id: 2, title: "TOP_RIGHT" },
              { id: 3, title: "BOTTOM_LEFT" },
              { id: 4, title: "TOP_LEFT" },
            ]}
            onSelectionChange={(e, val) => {
              handleChange([...val] ?? [], "visibilityPlace");
            }}
            label="Visibility Place"
            id="visibilityPlace"
            value={formData.visibilityPlace}
            helperText={errorObj.visibilityPlace}
            error={errorObj?.visibilityPlace}
          />
        </Grid>
        <Grid item md={6}>
          <MultiSelectComponent
            size="small"
            inputlabelshrink
            list={themeState}
            onSelectionChange={(e, val) => {
              handleChange([...val] ?? [], "themeSelection");
            }}
            label="Theme Selection"
            id="themeSelection"
            value={formData.themeSelection}
            helperText={errorObj.themeSelection}
            error={errorObj?.themeSelection}
          />
        </Grid>
        <Grid item md={6}>
          <SimpleDropdownComponent
            size="small"
            label="Color Selection"
            inputlabelshrink
            list={colorTheme}
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
  );
};

export default CreateFlagModal;
