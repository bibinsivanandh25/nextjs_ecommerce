/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import {
  Box,
  Button,
  FormHelperText,
  Grid,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomIcon from "services/iconUtils";
import { getBase64 } from "services/utils/functionUtils";
import { QrCode2 } from "@mui/icons-material";
import validateMessage from "constants/validateMessages";
import {
  getSupplierStoreConfiguration,
  supplierStoreImageConfig,
  getThemes,
  updateSupplierStoreConfiguration,
  applySupplierLeave,
} from "services/supplier/myaccount/storesettings";
import { useSelector } from "react-redux";
import toastify from "services/utils/toastUtils";
import InputBox from "@/atoms/InputBoxComponent";
import ImageCard from "@/atoms/ImageCard";
import SimpleDropdownComponent from "@/atoms/SimpleDropdownComponent";
import TextEditor from "@/atoms/TextEditor";
import ButtonComponent from "@/atoms/ButtonComponent";
import MultiSelectComponent from "@/atoms/MultiSelectComponent";
import { FaCheck } from "react-icons/fa";
import Link from "next/link";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import ModalComponent from "@/atoms/ModalComponent";
import DatePickerComponent from "@/atoms/DatePickerComponent";
import TextArea from "@/atoms/SimpleTextArea";
import { format } from "date-fns";

const timeToProcessList = [
  {
    id: "1",
    label: "1-2 hrs",
    value: "1-2 hrs",
  },
  {
    id: "2",
    label: "2-3 hrs",
    value: "2-3 hrs",
  },
  {
    id: "3",
    label: "3-4 hrs",
    value: "3-4 hrs",
  },
  {
    id: "4",
    label: "5-10 hrs",
    value: "5-10 hrs",
  },
  {
    id: "5",
    label: "10+ hrs",
    value: "10+ hrs",
  },
];

const deliveryRangeList = [
  {
    id: "1",
    label: "0-1 km",
    value: "0-1 km",
  },
  {
    id: "2",
    label: "1-2 km",
    value: "1-2 km",
  },
  {
    id: "3",
    label: "2-3 km",
    value: "2-3 km",
  },
  {
    id: "4",
    label: "3-4 km",
    value: "3-4 km",
  },
  {
    id: "5",
    label: "4-5 km",
    value: "4-5 km",
  },
  {
    id: "6",
    label: "5-6 km",
    value: "5-6 km",
  },
  {
    id: "7",
    label: "6-7 km",
    value: "6-7 km",
  },
  {
    id: "8",
    label: "7-8 km",
    value: "7-8 km",
  },
  {
    id: "9",
    label: "8-9 km",
    value: "8-9 km",
  },
  {
    id: "10",
    label: "9-10 km",
    value: "9-10 km",
  },
];

const daysList = [
  {
    id: "1",
    title: "Monday",
    value: "Monday",
  },
  {
    id: "2",
    title: "Tuesday",
    value: "Tuesday",
  },
  {
    id: "3",
    title: "Wednesday",
    value: "Wednesday",
  },
  {
    id: "4",
    title: "Thursday",
    value: "Thursday",
  },
  {
    id: "5",
    title: "Friday",
    value: "Friday",
  },
  {
    id: "6",
    title: "Saturday",
    value: "Saturday",
  },
  {
    id: "7",
    title: "Sunday",
    value: "Sunday",
  },
];

const StoreSettings = () => {
  const [formValues, setFormValues] = useState({
    storeName: "",
    storeCode: "",
    minOrderAmount: "",
    maxTimeToProcessOrder: "",
    maxOrderDeliveryRange: "",
    shopOPenDays: [],
    shopOpenTimings: "",
    shopCloseTimings: "",
    description: "",
  });
  const [leaveData, setLeaveData] = useState({
    startDate: "",
    endDate: "",
    reason: "",
  });
  const [leaveErrorObj, setLeaveErrorObj] = useState({
    startDate: "",
    endDate: "",
    reason: "",
  });
  const [themeColor, setThemeColors] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [storeLogo, setStoreLogo] = useState({
    file: null,
    url: "",
  });
  const [discriptionImage, setDiscriptionImage] = useState({
    file: null,
    url: "",
  });
  const [profilePercentage, setProfilePercentage] = useState(0);
  const [showApplyLeaveModal, setShowApplyLeaveModal] = useState(false);
  const [errorObj, setErrorObj] = useState({
    storeName: "",
    storeLogo: "",
    minOrderAmount: "",
    maxTimeToProcessOrder: "",
    maxOrderDeliveryRange: "",
    shopOPenDays: "",
    shopOpenTimings: "",
    shopCloseTimings: "",
    description: "",
  });
  const user = useSelector((state) => {
    return state.user;
  });

  // const get12hourformat = (time) => {
  //   // Prepend any date. Use your birthday.
  //   const timeString12hr = new Date(
  //     // eslint-disable-next-line prefer-template
  //     "1970-01-01T" + time + "Z"
  //   ).toLocaleTimeString("en-US", {
  //     timeZone: "UTC",
  //     hour12: true,
  //     hour: "numeric",
  //     minute: "numeric",
  //   });
  //   return timeString12hr;
  // };

  const getStoreInfo = async () => {
    const { data } = await getSupplierStoreConfiguration(user?.storeCode);
    if (data) {
      const storeData = {
        supplierLogo: data.supplierStoreLogo ?? "",
        image: data.shopDescriptionImageUrl ?? "",
        storeName: data.supplierStoreName ?? "",
        minOrderAmount: data.minimumOrderAmount?.toString() ?? "",
        maxtimetoprocess: data.maxOrderProcessingTime ?? "",
        maxOrderDelivery: data.maxOrderDeliveryRange ?? "",
        shopOPenDays: data.shopOpeningDays ?? [],
        shopTimings: data.shopTimings ?? "",
        description: data.shopDescription ?? "",
      };
      let count = 0;
      Object.values(storeData).forEach((ele) => {
        if (ele.length) {
          count += 1;
        }
      });
      const percentage = (count / Object.keys(storeData).length) * 100;
      setProfilePercentage(Math.round(percentage));
      setSelectedTheme(data?.storeTheme?.storeThemeId ?? 0);
      setFormValues((pre) => ({
        ...pre,
        storeName: data.supplierStoreName,
        storeCode: data.supplierStoreCode,
        minOrderAmount: data.minimumOrderAmount,
        maxTimeToProcessOrder:
          timeToProcessList.filter(
            (ele) => ele.value === data.maxOrderProcessingTime
          )[0] ?? {},
        maxOrderDeliveryRange:
          deliveryRangeList.filter(
            (ele) => ele.value === data.maxOrderDeliveryRange
          )[0] ?? {},
        shopOPenDays:
          data.shopOpeningDays?.map((value) => {
            return daysList.filter((ele) => ele.value === value)[0];
          }) ?? [],
        shopOpenTimings: data.storeOpenTimings,
        shopCloseTimings: data.storeCloseTimings,
        description: data.shopDescription,
        supplierStoreInfoId: data.supplierStoreInfoId,
        storeVerified: data.storeVerified,
      }));
      setStoreLogo((pre) => ({
        ...pre,
        url: data.supplierStoreLogo,
      }));
      setDiscriptionImage((pre) => ({
        ...pre,
        url: data.shopDescriptionImageUrl,
      }));
    }
  };

  const getStoreTheme = async () => {
    const { data } = await getThemes();
    getStoreInfo();
    if (data) {
      setThemeColors(data);
      setSelectedTheme(data[0].storeThemeId);
    }
  };

  useEffect(() => {
    getStoreTheme();
  }, []);

  const validateForm = () => {
    let flag = false;
    const errObj = {
      storeName: "",
      storeLogo: "",
      minOrderAmount: "",
      maxTimeToProcessOrder: "",
      maxOrderDeliveryRange: "",
      shopOPenDays: "",
      shopOpenTimings: "",
      shopCloseTimings: "",
      description: "",
    };

    if (formValues.storeName === "") {
      flag = true;
      errObj.storeName = validateMessage.field_required;
    }
    // if (formValues.storeCode === "") {
    //   flag = true;
    //   errObj.storeCode = validateMessage.field_required;
    // }
    if (
      formValues.minOrderAmount == null ||
      formValues.minOrderAmount === "" ||
      !formValues.minOrderAmount
    ) {
      flag = true;
      errObj.minOrderAmount = validateMessage.field_required;
    }
    if (!formValues.maxTimeToProcessOrder) {
      flag = true;
      errObj.maxTimeToProcessOrder = validateMessage.field_required;
    }

    if (!formValues.maxOrderDeliveryRange) {
      flag = true;
      errObj.maxOrderDeliveryRange = validateMessage.field_required;
    }
    if (!formValues.shopOPenDays.length) {
      flag = true;
      errObj.shopOPenDays = validateMessage.field_required;
    }
    if (formValues.shopOpenTimings === "") {
      flag = true;
      errObj.shopOpenTimings = validateMessage.field_required;
    }
    if (formValues.shopCloseTimings === "") {
      flag = true;
      errObj.shopCloseTimings = validateMessage.field_required;
    }
    if (formValues.description === "") {
      flag = true;
      errObj.description = validateMessage.field_required;
    }
    if (storeLogo.file === null && storeLogo.url === "") {
      flag = true;
      errObj.storeLogo = validateMessage.field_required;
    }
    setErrorObj({ ...errObj });
    if (formValues.description === "") {
      flag = true;
      errObj.description = validateMessage.field_required;
    }
    return flag;
  };

  useEffect(() => {
    if (errorObj.description.length) {
      toastify(validateMessage, "error");
    }
  }, [errorObj]);
  const updateSupplierStore = async (image) => {
    const payload = {
      supplierStoreInfoId: formValues.supplierStoreInfoId,
      supplierStoreCode: formValues.storeCode,
      supplierStoreName: formValues.storeName,
      minimumOrderAmount: formValues.minOrderAmount,
      maxOrderProcessingTime: formValues.maxTimeToProcessOrder?.value,
      maxOrderDeliveryRange: formValues.maxOrderDeliveryRange?.value,
      shopOpeningDays: formValues.shopOPenDays.map((ele) => ele.value),
      storeOpenTimings: formValues.shopOpenTimings,
      storeCloseTimings: formValues.shopCloseTimings,
      shopDescription: formValues.description,
      shopDescriptionImageUrl: image[1] ?? discriptionImage.url,
      supplierStoreLogo: image[0] ?? storeLogo.url,
      storeThemeId: selectedTheme,
    };

    const { data, err } = await updateSupplierStoreConfiguration(payload);
    if (data) {
      toastify(data.message, "success");
      getStoreInfo();
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };

  const handleSubmit = async () => {
    const flag = validateForm();
    if (!flag) {
      if (storeLogo.file || discriptionImage.file) {
        const formData = new FormData();
        formData.append("supplierLogo", storeLogo.file);
        formData.append("storeImage", discriptionImage.file);
        formData.append("supplierId", user?.supplierId);
        const { data } = await supplierStoreImageConfig(formData);
        if (data) {
          setStoreLogo((pre) => ({
            ...pre,
            url: data[0] ?? pre.url,
          }));
          setDiscriptionImage((pre) => ({
            ...pre,
            url: data[1] ?? pre.url,
          }));
          updateSupplierStore(data);
        }
        // else if (err) {
        // }
      } else {
        updateSupplierStore([storeLogo.url, discriptionImage.url]);
      }
    }
  };

  const getStoreUrl = () => {
    if (!themeColor.length) return "";
    const themeObj = selectedTheme
      ? themeColor[selectedTheme - 1]
      : themeColor[0];
    const param = btoa(
      `storeCode=${formValues.storeCode}&primaryColor=${themeObj.primaryColor}&secondaryColor=${themeObj.secondaryColor}`
    );
    return `/auth/customer?store=${param}`;
  };

  const downloadQR = async () => {
    // const { data, err } = await getQrPdf();
    try {
      fetch(
        `${process.env.DOMAIN}users/supplierstore/qrcode?supplierId=${user?.supplierId}&storeCode=${formValues.storeCode}`
      )
        .then(async (resp) => {
          console.log(resp, "response");
          const blob = await resp.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.style.display = "none";
          a.href = url;
          // the filename you want
          a.download = `${formValues.storeName
            .toString()
            .replaceAll(" ", "_")}.pdf`;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          toastify("your file has downloaded!", "success");
        })
        .catch((err) => toastify(err?.message, "error"));
    } catch (err) {
      toastify(
        "Unable to process your request, please try again later!!",
        "error"
      );
    }
  };

  const handleApplyLeave = async () => {
    let flag = false;
    const errObj = {
      startDate: "",
      endDate: "",
      reason: "",
    };
    if (leaveData.reason === "") {
      flag = true;
      errObj.reason = validateMessage.field_required;
    }
    if (leaveData.reason.length > 255) {
      flag = true;
      errObj.reason = validateMessage.alpha_numeric_max_255;
    }
    if (leaveData.startDate === "") {
      flag = true;
      errObj.startDate = validateMessage.field_required;
    }
    if (leaveData.endDate === "") {
      flag = true;
      errObj.endDate = validateMessage.field_required;
    }
    if (new Date(leaveData.startDate) > new Date(leaveData.endDate)) {
      flag = true;
      errObj.endDate = "Invalid End Date";
    }
    setLeaveErrorObj({ ...errObj });
    if (!flag) {
      const payload = {
        supplierStoreInfoId: formValues.supplierStoreInfoId,
        leaveStartDate: format(leaveData.startDate, "MM-dd-yyyy"),
        leaveEndDate: format(leaveData.endDate, "MM-dd-yyyy"),
        leaveReason: leaveData.reason,
      };
      const { data, err } = await applySupplierLeave(payload);
      if (data) {
        toastify(data?.message, "success");
        setShowApplyLeaveModal(false);
        setLeaveData({
          startDate: "",
          endDate: "",
          reason: "",
        });
      }
      if (err) {
        toastify(err?.response?.data?.message, "error");
      }
    }
  };

  return (
    <>
      <Paper className="mnh-70vh overflow-auto hide-scrollbar">
        <Box>
          <Typography className="h-4 color-orange fw-bold ps-4 pt-1">
            Store Settings
          </Typography>
        </Box>
        {/* <Box className="py-2 px-4">
        <div
          className="rounded-circle p-4 d-inline-block"
          style={{
            borderRadius: "50%",
            border: "5px solid #e56700",
          }}
        >
          50%
        </div>
      </Box> */}
        <Box>
          <Grid container spacing={2}>
            <Grid item sm={4} md={2} className="d-center">
              <Box>
                <Box>
                  <Typography className="h-5 color-gray">
                    Supplier Logo<span className="h-4 color-red">*</span>
                  </Typography>
                  <ImageCard
                    className=""
                    height={100}
                    width={100}
                    handleCloseClick={() =>
                      setStoreLogo(() => ({
                        url: "",
                        file: null,
                      }))
                    }
                    showClose={storeLogo.url}
                    imgSrc={storeLogo.url ? storeLogo.url : ""}
                    handleImageUpload={async (e) => {
                      const file = await getBase64(e.target.files[0]);

                      setStoreLogo(() => ({
                        url: file,
                        file: e.target.files[0],
                      }));
                    }}
                  />
                  {errorObj.storeLogo ? (
                    <FormHelperText error className="ms-3">
                      {validateMessage.field_required}
                    </FormHelperText>
                  ) : null}
                </Box>
                <Box>
                  <Typography className="h-5 color-gray">Add Image</Typography>
                  {/* <Box
                  className="d-center p-5 bg-light-gray rounded"
                  sx={{ border: "1px dashed gray" }}
                >
                  <AddCircle />
                </Box> */}
                  <ImageCard
                    height={100}
                    width={100}
                    handleCloseClick={() =>
                      setDiscriptionImage(() => ({
                        url: "",
                        file: null,
                      }))
                    }
                    showClose={discriptionImage.url}
                    imgSrc={discriptionImage.url ? discriptionImage.url : ""}
                    handleImageUpload={async (e) => {
                      const file = await getBase64(e.target.files[0]);

                      setDiscriptionImage(() => ({
                        url: file,
                        file: e.target.files[0],
                      }));
                    }}
                  />
                </Box>
                <Box>
                  <Box className="my-2">
                    {/* <Button
                    variant="contained"
                    size="small"
                    sx={{
                      backgroundColor: "#e56700",
                      fontSize: "0.7rem !important",
                      paddingX: "1.40rem !important",
                      "&:hover": {
                        backgroundColor: "#e56700",
                      },
                    }}
                    className="h-5"
                  ></Button> */}

                    <Link href={getStoreUrl()}>
                      <a
                        className="text-decoration-none"
                        target="_blank"
                        style={{ textDecoration: "none !important" }}
                      >
                        <ButtonComponent label="View Shop" muiProps="px-3" />
                      </a>
                    </Link>
                  </Box>
                  <Box>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        backgroundColor: "#e56700",
                        fontSize: "0.7rem !important",
                        "&:hover": {
                          backgroundColor: "#e56700",
                        },
                      }}
                      className="h-5"
                    >
                      Invite Supplier
                    </Button>
                    <Typography className="h-6 color-gary">
                      Invite and earn 50 more Orders
                    </Typography>
                  </Box>
                  <Box className="mt-2">
                    <Box className="d-center w-75">
                      <CustomIcon
                        type="filecopy"
                        size="small"
                        className="fs-26"
                        onIconClick={() => {
                          //   copyText();
                        }}
                      />
                    </Box>
                    <Typography className="h-6 d-center w-75 fw-bold text-center text-break">
                      Copy Store code and Name
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item sm={8} className="ps-2 mt-2">
              <Grid container spacing={2} className="mb-3">
                <Grid item xs={6}>
                  <InputBox
                    onInputChange={(e) => {
                      setFormValues((pre) => ({
                        ...pre,
                        storeName: e.target.value,
                      }));
                    }}
                    helperText={errorObj.storeName}
                    error={errorObj.storeName}
                    label="Store Name"
                    inputlabelshrink
                    value={formValues.storeName}
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputBox
                    // onInputChange={(e) => {
                    //   setFormValues((pre) => ({
                    //     ...pre,
                    //     storeCode: e.target.value,
                    //   }));
                    // }}
                    // helperText={errorObj.storeCode}
                    // error={errorObj.storeCode}
                    label="Store Code"
                    inputlabelshrink
                    value={formValues.storeCode}
                    disabled
                  />
                </Grid>

                <Grid item xs={6}>
                  <InputBox
                    onInputChange={(e) => {
                      let char = e.target.value;
                      if (char?.length) {
                        if (e.target.value?.includes("-")) {
                          char = char.toString.replace("-", "");
                        }
                      }
                      setFormValues((pre) => ({
                        ...pre,
                        minOrderAmount: parseInt(char, 10),
                      }));
                    }}
                    helperText={errorObj.minOrderAmount}
                    error={errorObj.minOrderAmount}
                    label="Minimum Order Amount For The Free Delivery"
                    inputlabelshrink
                    type="number"
                    value={formValues.minOrderAmount}
                  />
                </Grid>
                <Grid item xs={6}>
                  <SimpleDropdownComponent
                    list={[...timeToProcessList]}
                    helperText={errorObj.maxTimeToProcessOrder}
                    error={errorObj.maxTimeToProcessOrder}
                    size="small"
                    label="Max Time To Process Order"
                    inputlabelshrink
                    className=""
                    onDropdownSelect={(val) => {
                      setFormValues((pre) => ({
                        ...pre,
                        maxTimeToProcessOrder: val,
                      }));
                    }}
                    value={formValues.maxTimeToProcessOrder}
                  />
                </Grid>
                <Grid item xs={6}>
                  <SimpleDropdownComponent
                    list={[...deliveryRangeList]}
                    helperText={errorObj.maxOrderDeliveryRange}
                    error={errorObj.maxOrderDeliveryRange}
                    size="small"
                    label="Max Order delivery Range"
                    inputlabelshrink
                    className=""
                    onDropdownSelect={(val) => {
                      setFormValues((pre) => ({
                        ...pre,
                        maxOrderDeliveryRange: val,
                      }));
                    }}
                    value={formValues.maxOrderDeliveryRange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <MultiSelectComponent
                    list={[...daysList]}
                    helperText={errorObj.shopOPenDays}
                    error={errorObj.shopOPenDays}
                    size="small"
                    label="Shop Open Days"
                    inputlabelshrink
                    onSelectionChange={(_, val) => {
                      setFormValues((pre) => ({
                        ...pre,
                        shopOPenDays: val,
                      }));
                    }}
                    value={formValues.shopOPenDays}
                  />
                </Grid>
                <Grid item xs={6}>
                  <div
                    className="input-border"
                    style={{
                      position: "relative",
                      borderRadius: "5px",
                      outline: "none",
                      width: "100%",
                      padding: 5,
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        top: -11,
                        left: 10,
                        backgroundColor: "#fff",
                        color: errorObj.shopOpenTimings
                          ? "#d32f2f"
                          : "rgba(0, 0, 0, 0.6)",
                        fontSize: "11px",
                        cursor: "pointer",
                      }}
                      className="px-1"
                    >
                      Shop Open Timings
                    </span>
                    <input
                      onChange={(e) => {
                        setFormValues((pre) => ({
                          ...pre,
                          shopOpenTimings: `${e.target.value}:00`,
                        }));
                      }}
                      value={formValues.shopOpenTimings}
                      type="time"
                      style={{
                        width: "100%",
                        height: "100%",
                        outline: "none",
                        border: "none",
                      }}
                    />
                  </div>
                  {errorObj.shopOpenTimings ? (
                    <FormHelperText error className="ms-3">
                      {validateMessage.field_required}
                    </FormHelperText>
                  ) : null}
                </Grid>
                <Grid item xs={6}>
                  <div
                    className="input-border"
                    style={{
                      position: "relative",
                      borderRadius: "5px",
                      outline: "none",
                      width: "100%",
                      padding: 5,
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        top: -11,
                        left: 10,
                        backgroundColor: "#fff",
                        color: errorObj.shopCloseTimings
                          ? "#d32f2f"
                          : "rgba(0, 0, 0, 0.6)",
                        fontSize: "11px",
                        cursor: "pointer",
                      }}
                      className="px-1"
                    >
                      Shop Close Timings
                    </span>
                    <input
                      onChange={(e) => {
                        setFormValues((pre) => ({
                          ...pre,
                          shopCloseTimings: `${e.target.value}:00`,
                        }));
                      }}
                      value={formValues.shopCloseTimings}
                      type="time"
                      style={{
                        width: "100%",
                        height: "100%",
                        outline: "none",
                        border: "none",
                      }}
                    />
                  </div>
                  {errorObj.shopCloseTimings ? (
                    <FormHelperText error className="ms-3">
                      {validateMessage.field_required}
                    </FormHelperText>
                  ) : null}
                </Grid>
                <Grid item sm={12} className="w-100">
                  {/* {formValues.description && ( */}
                  <TextEditor
                    className="w-100"
                    content={formValues.description}
                    getContent={(val) => {
                      setFormValues((pre) => ({
                        ...pre,
                        description: val,
                      }));
                    }}
                  />
                  {/* )} */}
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={6} md={2}>
              <Box className="d-flex justify-content-center">
                {profilePercentage !== 100 ? (
                  <Tooltip
                    title="Complete your profile to activate your store."
                    placement="top"
                  >
                    <CircularProgress
                      value={profilePercentage}
                      color="#e56700"
                      size={125}
                    >
                      <CircularProgressLabel style={{ fontSize: 25 }}>
                        {profilePercentage}%
                      </CircularProgressLabel>
                    </CircularProgress>
                  </Tooltip>
                ) : null}
              </Box>
              <Box>
                <Typography className="h-5 fw-bold mb-1 ms-2">
                  Choose Theme
                </Typography>
              </Box>
              <Grid container spacing={2} justifyContent="space-around">
                {themeColor.map((item) => (
                  <Grid
                    item
                    sm={5}
                    justifyContent="space-around"
                    key={item.storeThemeId}
                  >
                    <div
                      style={{
                        backgroundColor: `${item.primaryColor}`,
                        height: "4rem",
                        width: "4rem",
                      }}
                      className={`rounded d-flex justify-content-center align-items-center ${
                        selectedTheme === item.storeThemeId
                          ? "border border-primary border-2"
                          : ""
                      }`}
                      onClick={() => {
                        setSelectedTheme(item.storeThemeId);
                      }}
                    >
                      {selectedTheme === item.storeThemeId && (
                        <FaCheck color="white" size={28} />
                      )}
                    </div>
                  </Grid>
                ))}
              </Grid>
              <Box
                className="d-flex flex-column  mx-2"
                onClick={() => {
                  downloadQR();
                }}
              >
                <Box className="bg-orange rounded my-2 w-90p d-flex align-items-center p-1">
                  <QrCode2 className="h-1 " />
                  <Typography className="h-5 text-white">
                    Download QR Code
                  </Typography>
                </Box>
                <Typography className="h-6">
                  Download & take printout of QR Code of your store. Stick in
                  your shop. Ask your customer to download MrMrsCart app and
                  scan the QR code using the scanner to add this store as their
                  favourite store list and start recieving orders
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid container className="py-2">
            <Grid item sm={1.5} display="flex" alignItems="center">
              <Box className="ps-3">
                <ButtonComponent
                  label="Apply Leave"
                  onBtnClick={() => {
                    setShowApplyLeaveModal(true);
                  }}
                />
              </Box>
            </Grid>
            <Grid
              item
              sm={10.5}
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
            >
              <ButtonComponent
                label="Cancel"
                variant="outlined"
                muiProps="me-3 w-10p"
              />
              <ButtonComponent
                disabled={!formValues.storeVerified}
                bgColor={!formValues.storeVerified ? "bg-muted" : "bg-orange"}
                label="Submit"
                muiProps="me-2 w-10p"
                onBtnClick={handleSubmit}
              />
            </Grid>
          </Grid>
        </Box>
      </Paper>
      {showApplyLeaveModal ? (
        <ModalComponent
          ModalTitle="Apply Leave"
          open={showApplyLeaveModal}
          onCloseIconClick={() => {
            setShowApplyLeaveModal(false);
            setLeaveData({
              endDate: "",
              startDate: "",
              reason: "",
            });
            setLeaveErrorObj({
              endDate: "",
              startDate: "",
              reason: "",
            });
          }}
          saveBtnText="Apply Leave"
          footerClassName="justify-content-start flex-row-reverse"
          clearBtnClassName="me-2"
          onSaveBtnClick={handleApplyLeave}
        >
          <Grid container spacing={2} marginTop={1} paddingX={1}>
            <Grid item sm={12}>
              <DatePickerComponent
                error={Boolean(leaveErrorObj.startDate.length)}
                helperText={leaveErrorObj.startDate}
                label="Start Date"
                size="small"
                value={leaveData.startDate}
                onDateChange={(value) => {
                  setLeaveData((pre) => ({
                    ...pre,
                    startDate: value,
                  }));
                }}
                disablePast
                inputlabelshrink
                // helperText={errorObj.dob}
                // error={!!errorObj.dob}
              />
            </Grid>
            <Grid item sm={12}>
              <DatePickerComponent
                error={Boolean(leaveErrorObj.endDate.length)}
                helperText={leaveErrorObj.endDate}
                label="End Date"
                size="small"
                value={leaveData.endDate}
                onDateChange={(value) => {
                  setLeaveData((pre) => ({
                    ...pre,
                    endDate: value,
                  }));
                }}
                disablePast
                inputlabelshrink
                // helperText={errorObj.dob}
                // error={!!errorObj.dob}
              />
            </Grid>
            <Grid item sm={12}>
              <TextArea
                error={Boolean(leaveErrorObj.reason.length)}
                helperText={leaveErrorObj.reason}
                placeholder="Reason for opting leave"
                rows={3}
                value={leaveData.reason}
                onInputChange={(e) => {
                  setLeaveData({
                    ...leaveData,
                    reason: e.target.value,
                  });
                }}
              />
            </Grid>
          </Grid>
        </ModalComponent>
      ) : null}
    </>
  );
};

export default StoreSettings;
