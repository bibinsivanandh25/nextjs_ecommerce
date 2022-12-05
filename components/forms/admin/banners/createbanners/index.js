import {
  adminBannnerMedia,
  adminSaveBanner,
  adminUpdateBanner,
} from "services/admin/banners";
import { Box, Grid, Typography } from "@mui/material";
import { useState, useRef } from "react";
import toastify from "services/utils/toastUtils";
import validateMessage from "constants/validateMessages";
import { getBase64 } from "services/utils/functionUtils";
import { format } from "date-fns";
import ImageCard from "@/atoms/ImageCard";
import InputBox from "@/atoms/InputBoxComponent";
import ModalComponent from "@/atoms/ModalComponent";
import SimpleDropdownComponent from "@/atoms/SimpleDropdownComponent";
import styles from "./banner.module.css";

const displayName = [{ id: "Home", label: "Home" }];
const buttonLabel = [
  { id: "Shop Now", label: "Shop Now" },
  { id: "Click Now", label: "Click Now" },
];
const panelList = [
  {
    id: "SUPPLIER",
    label: "SUPPLIER",
  },
  {
    id: "CUSTOMER",
    label: "CUSTOMER",
  },
  {
    id: "RESELLER",
    label: "RESELLER",
  },
];
const CreateBanner = ({
  showModal = false,
  setShowModal = () => {},
  setFormData = () => {},
  formData = {},
  saveBtnName = "",
  getAllTableData = () => {},
  userInfo = {},
  setpageNumber = () => {},
  tableDate = {},
}) => {
  const mobile = useRef(null);
  const web = useRef(null);
  const [ratio, setRatio] = useState({
    mobileHeight: "",
    mobileWidth: "",
    webHeight: "",
    webWidth: "",
  });
  const [error, setError] = useState({
    url: "",
    displayPage: "",
    buttonlable: "",
    startdate: "",
    enddate: "",
    starttime: "",
    endtime: "",
    mobileimage: "",
    webimage: "",
    dateError: "",
    panelname: "",
  });
  const addDateTime = (starttime, startdate) => {
    const finalStartTime = starttime.split(":");
    const fromData = new Date(startdate).setHours(finalStartTime[0]);
    const FromDate = new Date(fromData).setMinutes(finalStartTime[1]);
    return new Date(FromDate);
  };
  const validation = () => {
    const errorObj = {
      url: "",
      displayPage: "",
      buttonlable: "",
      startdate: "",
      enddate: "",
      starttime: "",
      endtime: "",
      mobileimage: "",
      webimage: "",
      dateError: "",
      panelname: "",
    };
    const {
      url,
      displayPage,
      buttonlable,
      startdate,
      enddate,
      starttime,
      endtime,
      mobileimage,
      webimage,
      panelname,
    } = formData;
    let flag = true;
    if (url.length == 0) {
      flag = false;
      errorObj.url = validateMessage.field_required;
    }
    if (displayPage === null) {
      flag = false;
      errorObj.displayPage = validateMessage.field_required;
    }
    if (buttonlable === null) {
      flag = false;
      errorObj.buttonlable = validateMessage.field_required;
    }
    if (panelname === null) {
      flag = false;
      errorObj.panelname = validateMessage.field_required;
    }
    if (startdate.length == 0) {
      flag = false;
      errorObj.startdate = validateMessage.field_required;
    }
    if (enddate.length == 0) {
      flag = false;
      errorObj.enddate = validateMessage.field_required;
    }
    if (starttime.length == 0) {
      flag = false;
      errorObj.starttime = validateMessage.field_required;
    }
    if (endtime.length == 0) {
      flag = false;
      errorObj.endtime = validateMessage.field_required;
    }
    if (Object?.keys(mobileimage)?.length == 0 || mobileimage.length == 0) {
      flag = false;
      errorObj.mobileimage = validateMessage.field_required;
    } else if (
      Number(ratio.mobileHeight) > 100 ||
      Number(ratio.mobileWidth) > 320
    ) {
      flag = false;
      errorObj.mobileimage = "Required Image Ratio for Mobile 320*100";
    }
    if (Object?.keys(webimage)?.length == 0 || webimage.length == 0) {
      flag = false;
      errorObj.webimage = validateMessage.field_required;
    } else if (
      Number(ratio.webHeight) >= 250 &&
      Number(ratio.webWidth) >= 970
    ) {
      flag = false;
      errorObj.webimage = "Required Image Ratio for Web 970*250";
    }
    let finalFromDate = "";
    let finalToDate = "";
    if (startdate && enddate && endtime && starttime) {
      // FromDate
      const finalStartTime = starttime.split(":");
      const fromData = new Date(startdate).setHours(finalStartTime[0]);
      const FromDate = new Date(fromData).setMinutes(finalStartTime[1]);
      // endDate
      const finalEndTime = endtime.split(":");
      const toDate = new Date(enddate).setHours(finalEndTime[0]);
      const ToDate = new Date(toDate).setMinutes(finalEndTime[1]);
      finalFromDate = new Date(FromDate);
      finalToDate = new Date(ToDate);
      if (Date.parse(finalToDate) < Date.parse(finalFromDate)) {
        flag = false;
        errorObj.dateError = "From Date should be Lessthan To Date";
      }
    }
    setError(errorObj);
    return flag;
  };
  const handleCloseClick = () => {
    setShowModal(false);
    setFormData({
      url: "",
      displayPage: null,
      buttonlable: null,
      startdate: "",
      enddate: "",
      starttime: "",
      endtime: "",
      mobileimage: "",
      webimage: "",
      panelname: null,
    });
    setError({
      url: "",
      displayPage: "",
      buttonlable: "",
      startdate: "",
      enddate: "",
      starttime: "",
      endtime: "",
      mobileimage: "",
      webimage: "",
      panelname: "",
    });
  };
  const handleSaveClick = async () => {
    const result = validation();

    if (result) {
      const webformdata = new FormData();
      webformdata.append("data", {});
      webformdata.append("media", formData.webimage?.multipart);
      webformdata.append("userId", userInfo.userId);
      const webImages = await adminBannnerMedia(webformdata);
      const mobileFormdata = new FormData();
      mobileFormdata.append("data", {});
      mobileFormdata.append("media", formData.mobileimage?.multipart);
      mobileFormdata.append("userId", userInfo.userId);
      const mobileImages = await adminBannnerMedia(mobileFormdata);
      const startDateTime = new Date(
        addDateTime(formData.starttime, formData.startdate)
      );
      const fromDate = format(startDateTime, "MM-dd-yyyy HH:mm:ss");
      const endDateTime = new Date(
        addDateTime(formData.endtime, formData.enddate)
      );
      const toDate = format(endDateTime, "MM-dd-yyyy HH:mm:ss");

      const payload = {
        bannerImageUrlForWeb: webImages?.data,
        bannerImageUrlForMobile: mobileImages?.data,
        panelName: formData.panelname.label,
        navigationUrl: formData.url,
        buttonName: formData.buttonlable.label,
        displayPage: formData.displayPage.label,
        startDateTime: fromDate.toString(),
        endDateTime: toDate.toString(),
      };
      const { data, err } = await adminSaveBanner(payload);
      if (data) {
        setpageNumber(0);
        getAllTableData(tableDate.fromDate, tableDate.toDate, 0);
        handleCloseClick();
      } else if (err) {
        toastify(err.response.data.message, "error");
      }
    }
  };
  const handleEditClick = async () => {
    const result = validation();
    if (result) {
      let webImages = "";
      let mobileImages = "";
      if (formData.webimage?.multipart) {
        const webformdata = new FormData();
        webformdata.append("data", {});
        webformdata.append("media", formData.webimage?.multipart);
        webformdata.append("userId", userInfo.userId);
        webImages = await adminBannnerMedia(webformdata);
      }
      if (formData.mobileimage?.multipart) {
        const mobileFormdata = new FormData();
        mobileFormdata.append("data", {});
        mobileFormdata.append("media", formData.mobileimage?.multipart);
        mobileFormdata.append("userId", userInfo.userId);
        mobileImages = await adminBannnerMedia(mobileFormdata);
      }

      const startDateTime = new Date(
        addDateTime(formData.starttime, formData.startdate)
      );
      const fromDate = format(startDateTime, "MM-dd-yyyy HH:mm:ss");
      const endDateTime = new Date(
        addDateTime(formData.endtime, formData.enddate)
      );
      const toDate = format(endDateTime, "MM-dd-yyyy HH:mm:ss");
      const payload = {
        bannerId: formData.bannerId,
        bannerImageUrlForWeb: webImages.data
          ? webImages.data
          : formData.webimage,
        bannerImageUrlForMobile: mobileImages.data
          ? mobileImages.data
          : formData.mobileimage,
        navigationUrl: formData.url,
        buttonName: formData.buttonlable.label,
        displayPage: formData.displayPage.label,
        startDateTime: fromDate.toString(),
        endDateTime: toDate.toString(),
        panelName: formData.panelname.label,
      };
      const { data, err } = await adminUpdateBanner(payload);
      if (data) {
        setpageNumber(0);
        getAllTableData(tableDate.fromDate, tableDate.toDate, 0);
        handleCloseClick();
      } else if (err) {
        toastify(err.response.data.message, "error");
      }
    }
  };
  return (
    <ModalComponent
      open={showModal}
      ModalWidth="65%"
      onCloseIconClick={() => {
        handleCloseClick();
      }}
      footerClassName="justify-content-end"
      ModalTitle="Create Banner"
      onSaveBtnClick={saveBtnName == "save" ? handleSaveClick : handleEditClick}
      onClearBtnClick={() => {
        handleCloseClick();
      }}
      ClearBtnText="Cancel"
      saveBtnText={saveBtnName == "save" ? "Save" : "Edit"}
      titleClassName="fw-bold color-orange h-5"
    >
      <Grid container spacing={2} className="my-2">
        <Grid
          item
          sm={5}
          display="flex"
          justifyContent="space-evenly"
          alignItems="center"
          alignContent="center"
        >
          <Grid item sm={6}>
            <Box className="h-100">
              <Typography className="h-5 color-secondary">
                Image For Mobile
              </Typography>
              <ImageCard
                imageRef={mobile}
                onLoad={() => {
                  setRatio((pre) => ({
                    ...pre,
                    mobileWidth: mobile.current.naturalWidth,
                    mobileHeight: mobile.current.naturalHeight,
                  }));
                }}
                imgSrc={
                  formData.mobileimage?.binary
                    ? formData.mobileimage?.binary
                    : formData.mobileimage
                }
                handleCloseClick={() => {
                  setFormData((prev) => ({
                    ...prev,
                    mobileimage: "",
                  }));
                }}
                showClose={!!formData.mobileimage}
                handleImageUpload={async (e) => {
                  if (e.target.files.length) {
                    if (e.target.files[0].size <= 1000000) {
                      const file = await getBase64(e.target.files[0]);
                      setFormData((prev) => ({
                        ...prev,
                        mobileimage: {
                          binary: file,
                          multipart: e.target.files[0],
                        },
                      }));
                    } else {
                      toastify("Image size should be less than 1MB", "error");
                    }
                  }
                }}
              />
              {error.mobileimage ? (
                <Typography className="h-5 color-error">
                  {error.mobileimage}
                </Typography>
              ) : null}
            </Box>
          </Grid>
          <Grid item sm={6}>
            <Box className="h-100">
              <Typography className="h-5 color-secondary">
                Image For Web
              </Typography>
              <ImageCard
                imageRef={web}
                onLoad={() => {
                  setRatio((pre) => ({
                    ...pre,
                    webWidth: web.current.naturalWidth,
                    webHeight: web.current.naturalHeight,
                  }));
                }}
                imgSrc={
                  formData.webimage?.binary
                    ? formData.webimage?.binary
                    : formData.webimage
                }
                handleCloseClick={() => {
                  setFormData((prev) => ({
                    ...prev,
                    webimage: "",
                  }));
                }}
                showClose={!!formData.webimage}
                handleImageUpload={async (e) => {
                  if (e.target.files.length) {
                    if (e.target.files[0].size <= 1000000) {
                      const file = await getBase64(e.target.files[0]);
                      setFormData((prev) => ({
                        ...prev,
                        webimage: {
                          binary: file,
                          multipart: e.target.files[0],
                        },
                      }));
                    } else {
                      toastify("Image size should be less than 1MB", "error");
                    }
                  }
                }}
              />
              {error.webimage ? (
                <Typography className="h-5 color-error">
                  {error.webimage}
                </Typography>
              ) : null}
            </Box>
          </Grid>
        </Grid>
        <Grid item sm={7} container spacing={2} alignSelf="center">
          <Grid item sm={12}>
            <InputBox
              value={formData.url}
              label="Navigation URL"
              required
              inputlabelshrink
              placeholder="Enter Navigation URL"
              onInputChange={(e) => {
                setFormData((pre) => ({ ...pre, url: e.target.value }));
              }}
              error={error.url !== ""}
              helperText={error.url}
            />
          </Grid>
          <Grid item sm={12}>
            <SimpleDropdownComponent
              value={formData.displayPage}
              size="small"
              label="Display Page"
              list={displayName}
              required
              onDropdownSelect={(value) => {
                setFormData((pre) => ({ ...pre, displayPage: value }));
              }}
              inputlabelshrink
              error={error.displayPage !== ""}
              helperText={error.displayPage}
            />
          </Grid>
          <Grid item sm={12}>
            <SimpleDropdownComponent
              inputlabelshrink
              value={formData.buttonlable}
              size="small"
              label="Button Lable"
              list={buttonLabel}
              required
              onDropdownSelect={(value) => {
                setFormData((pre) => ({ ...pre, buttonlable: value }));
              }}
              error={error.buttonlable !== ""}
              helperText={error.buttonlable}
            />
          </Grid>
          <Grid item sm={12}>
            <SimpleDropdownComponent
              inputlabelshrink
              value={formData.panelname}
              size="small"
              label="Panel Name"
              list={panelList}
              required
              onDropdownSelect={(value) => {
                setFormData((pre) => ({ ...pre, panelname: value }));
              }}
              error={error.panelname !== ""}
              helperText={error.panelname}
            />
          </Grid>
          <Grid container className="mx-3 my-2" alignSelf="center">
            <Grid container item md={6} alignItems="center">
              <Grid item sm={4}>
                <span className="fs-12">From date:</span>
              </Grid>
              <Grid item sm={8}>
                <input
                  type="date"
                  value={formData.startdate}
                  className={styles.dateinput}
                  style={{
                    border: "none",
                    outline: "none",
                    display: "flex",
                    flexDirection: "row-reverse",
                  }}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      startdate: e.target.value,
                    }));
                  }}
                  // max={dateValue.to}
                />
              </Grid>
            </Grid>{" "}
            <Grid container item md={6}>
              <Grid item sm={4}>
                <span className="fs-12">To date:</span>
              </Grid>
              <Grid item sm={8}>
                <input
                  type="date"
                  value={formData.enddate}
                  className={styles.dateinput}
                  style={{
                    border: "none",
                    outline: "none",
                    display: "flex",
                    flexDirection: "row-reverse",
                  }}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      enddate: e.target.value,
                    }));
                  }}
                  // max={dateValue.to}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid container className="mb-2" sx={{ marginTop: "-6px" }}>
            <Grid item sm={6}>
              {error.startdate ? (
                <Typography className="h-5 ms-5 text-center color-error">
                  {error.startdate}
                </Typography>
              ) : null}
            </Grid>
            <Grid item sm={6}>
              {error.enddate ? (
                <Typography className="h-5 ms-4 text-center color-error">
                  {error.enddate}
                </Typography>
              ) : null}
            </Grid>
          </Grid>
          <Grid container className="mx-3">
            <Grid container item md={6} alignItems="center">
              <Grid item sm={3.7}>
                <span className="fs-12">Start Time:</span>
              </Grid>
              <Grid item sm={8}>
                <input
                  type="time"
                  value={formData.starttime}
                  placeholder="hh:mm"
                  className={styles.timepicker}
                  style={{
                    border: "none",
                    outline: "none",
                    display: "flex",
                    flexDirection: "row-reverse",
                  }}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      starttime: e.target.value,
                    }));
                  }}
                />
              </Grid>
            </Grid>
            <Grid container item md={6}>
              <Grid item sm={3.7}>
                <span className="fs-12">End time:</span>
              </Grid>
              <Grid item sm={8}>
                <input
                  type="time"
                  value={formData.endtime}
                  className={styles.timepicker}
                  style={{
                    border: "none",
                    outline: "none",
                    display: "flex",
                    flexDirection: "row-reverse",
                  }}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      endtime: e.target.value,
                    }));
                  }}
                  // max={dateValue.to}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid container className="mb-2" sx={{ marginTop: "1px" }}>
            <Grid item sm={6}>
              {error.starttime ? (
                <Typography className="h-5 ms-5 text-center color-error">
                  {error.starttime}
                </Typography>
              ) : null}
            </Grid>
            <Grid item sm={6}>
              {error.endtime ? (
                <Typography className="h-5 ms-4 text-center color-error">
                  {error.endtime}
                </Typography>
              ) : null}
            </Grid>
          </Grid>
          <Grid container sx={{ marginLeft: "-14px" }}>
            {error.dateError ? (
              <Typography className="h-5 ms-5 text-center color-error">
                {error.dateError}
              </Typography>
            ) : null}
          </Grid>
        </Grid>
      </Grid>
    </ModalComponent>
  );
};
export default CreateBanner;
