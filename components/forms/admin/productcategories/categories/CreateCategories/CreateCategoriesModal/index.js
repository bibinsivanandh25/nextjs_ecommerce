/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import validateMessage from "constants/validateMessages";
import InputBox from "@/atoms/InputBoxComponent";
import ModalComponent from "@/atoms/ModalComponent";
import SimpleDropdownComponent from "@/atoms/SimpleDropdownComponent";
import ImageCard from "@/atoms/ImageCard";
import toastify from "services/utils/toastUtils";
import {
  addMainCategory,
  getCategoryMediaUrl,
  UpdateMainCategory,
} from "services/admin/products/productCategories/category";
import { getBase64 } from "services/utils/functionUtils";

const steps = [
  "Lower Bound Price Range",
  "Equal Price Range",
  "Upper Bound Price Range",
];

const CreateCategoriesModal = ({
  openCreateNewCategories,
  setOpenCreateCategoriesModal,
  getTableData = () => {},
  modalType = "Add",
  categoryFormData = {},
}) => {
  const [categoryDetails, setCategoryDetails] = useState({
    category: "",
    comissionType: {},
    gst: "",
    categoryImg: null,
  });
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState([
    {
      minPriceRange: "1",
      maxPriceRange: "",
      comissionPercentage: "",
      mmcProfitPercentage: "",
      // supplierProfitPercentage: "",
      resellerProfitPercentage: "",
    },
    {
      minPriceRange: "",
      maxPriceRange: "",
      comissionPercentage: "",
      mmcProfitPercentage: "",
      // supplierProfitPercentage: "",
      resellerProfitPercentage: "",
    },
    {
      minPriceRange: "",
      maxPriceRange: "",
      comissionPercentage: "",
      mmcProfitPercentage: "",
      // supplierProfitPercentage: "",
      resellerProfitPercentage: "",
    },
  ]);
  const [selectedTab, setSelectedTab] = useState("SUPPLIER");
  const [showStepper, setShowStepper] = useState(false);

  const [errorObj, setErrobj] = useState({
    category: "",
    commissionType: "",
    gst: "",
    maxPriceRange: "",
    comissionPercentage: "",
    mmcProfitPercentage: "",
    // supplierProfitPercentage: "",
    resellerProfitPercentage: "",
  });

  useEffect(() => {
    const getLabel = (label) => {
      if (label === "ZERO_COMMISSION") {
        return "Zero Commission";
      }
      if (label === "FIXED_COMMISSION") {
        return "Fixed Commission";
      }
      return "";
    };
    setCategoryDetails({
      category: categoryFormData.mainCategoryName,
      gst: categoryFormData.categoryGst,
      categoryImg: categoryFormData.categoryImageUrl,
      comissionType: {
        label: getLabel(categoryFormData?.commissionType),
        value: categoryFormData?.commissionType,
      },
    });
    if (!categoryFormData.subCategoryPriceRangeAdded) {
      if (categoryFormData.priceRangeList !== null) {
        setShowStepper(true);
        const temp = [];
        categoryFormData.priceRangeList?.forEach((ele) => {
          temp.push({
            minPriceRange: ele.priceStart,
            maxPriceRange: ele.priceEnd,
            comissionPercentage: ele.commissionPercentage,
            mmcProfitPercentage: ele.adminProfitPercentage ?? "",
            resellerProfitPercentage: ele.resellerProfitPercentage ?? "",
          });
        });
        setFormData([...temp]);
      }
    }
  }, [categoryFormData]);

  const handlFormDataChange = (e) => {
    const temp = [...formData];
    temp[activeStep][e.target.name] = e.target.value;
    setFormData(temp);
  };

  const onInputChange = (e) => {
    setCategoryDetails({
      ...categoryDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleClearAll = () => {
    setCategoryDetails({
      category: "",
      comissionType: {},
      categoryImg: null,
      gst: "",
    });
    setFormData([
      {
        minPriceRange: "1",
        maxPriceRange: "",
        comissionPercentage: "",
        mmcProfitPercentage: "",
        // supplierProfitPercentage: "",
        resellerProfitPercentage: "",
      },
      {
        minPriceRange: "",
        maxPriceRange: "",
        comissionPercentage: "",
        mmcProfitPercentage: "",
        // supplierProfitPercentage: "",
        resellerProfitPercentage: "",
      },
      {
        minPriceRange: "",
        maxPriceRange: "",
        comissionPercentage: "",
        mmcProfitPercentage: "",
        // supplierProfitPercentage: "",
        resellerProfitPercentage: "",
      },
    ]);
    setErrobj({
      category: "",
      commissionType: "",
      gst: "",
      maxPriceRange: "",
      comissionPercentage: "",
      mmcProfitPercentage: "",
      // supplierProfitPercentage: "",
      resellerProfitPercentage: "",
    });
    setActiveStep(0);
    setShowStepper(false);
  };

  const handleSaveBtnClick = async (priceRangeFlag = true) => {
    const getPriceRangeList = () => {
      const getRangeType = (ind) => {
        if (ind === 0) {
          return "MIN";
        }
        if (ind === 1) {
          return "EQUAL";
        }
        if (ind === 2) {
          return "MAX";
        }
        return "";
      };
      const temp = [];
      formData.forEach((ele, ind) => {
        temp.push({
          priceStart: parseInt(ele.minPriceRange, 10),
          priceEnd:
            ele.maxPriceRange !== "" ? parseInt(ele.maxPriceRange, 10) : null,
          priceRangeType: getRangeType(ind),
          adminProfitPercentage:
            ele.mmcProfitPercentage !== ""
              ? parseInt(ele.mmcProfitPercentage, 10)
              : null,
          resellerProfitPercentage:
            ele.resellerProfitPercentage !== ""
              ? parseInt(ele.resellerProfitPercentage, 10)
              : null,
          commissionPercentage: parseInt(ele.comissionPercentage, 10),
        });
      });
      return temp;
    };

    let payload = {
      mainCategoryName: categoryDetails.category,
      commissionType: categoryDetails.comissionType?.value,
      categoryGst: parseInt(categoryDetails.gst, 10),
      priceRangeList: priceRangeFlag ? getPriceRangeList() : [],
    };

    const getImageUrl = async () => {
      const file = new FormData();
      file.append("media", categoryDetails.categoryImg);
      const { data, err } = await getCategoryMediaUrl(file);
      if (data) {
        payload = {
          ...payload,
          categoryImageUrl: data?.data,
        };
        setCategoryDetails((prev) => {
          return {
            ...prev,
            categoryImg: data.data,
          };
        });
        return payload;
      }
      if (err) {
        toastify(err?.response?.data?.message, "error");
      }
      return null;
    };

    if (modalType === "Add") {
      const addPayload = await getImageUrl();
      if (addPayload) {
        const { data, err } = await addMainCategory(addPayload);
        if (data) {
          getTableData(0);
          setOpenCreateCategoriesModal(false);
          toastify(data?.message, "success");
        }
        if (err) {
          toastify(err?.response?.data?.message, "error");
        }
      }
    } else {
      let editPayload = {};
      if (typeof categoryDetails.categoryImg === "object") {
        const { categoryImageUrl } = await getImageUrl();
        editPayload = {
          ...payload,
          categoryImageUrl,
          mainCategoryId: categoryFormData.mainCategoryId,
        };
      } else {
        editPayload = {
          ...payload,
          categoryImageUrl: categoryDetails.categoryImg,
          mainCategoryId: categoryFormData.mainCategoryId,
        };
      }

      const { data, err } = await UpdateMainCategory(editPayload);
      if (data) {
        getTableData(0);
        setOpenCreateCategoriesModal(false);
        toastify(data?.message, "success");
      }
      if (err) {
        toastify(err?.response?.data?.message, "error");
      }
    }
  };

  const validate = (validatePriceRange = true) => {
    const tempErr = {
      category: "",
      commissionType: "",
      gst: "",
      maxPriceRange: "",
      comissionPercentage: "",
      mmcProfitPercentage: "",
      // supplierProfitPercentage: "",
      resellerProfitPercentage: "",
    };
    let flag = false;
    if (categoryDetails.category === "") {
      tempErr.category = validateMessage.field_required;
      flag = true;
    }
    if (!categoryDetails.comissionType?.value) {
      tempErr.commissionType = validateMessage.field_required;
      flag = true;
    }
    if (categoryDetails.gst?.toString().length == 0) {
      tempErr.gst = validateMessage.field_required;
      flag = true;
    }
    if (categoryDetails.gst >= 100) {
      tempErr.gst = "GST Cannot be Greater than 99%";
      flag = true;
    }
    if (!categoryDetails.categoryImg) {
      toastify("Please Upload Category Image", "error");
      flag = true;
    }
    if (validatePriceRange) {
      if (!categoryFormData?.subCategoryPriceRangeAdded) {
        const tempData = { ...formData[activeStep] };
        if (activeStep !== 2) {
          if (tempData.maxPriceRange === "") {
            tempErr.maxPriceRange = validateMessage.field_required;
            flag = true;
          }
        }
        if (tempData.comissionPercentage === "") {
          tempErr.comissionPercentage = validateMessage.field_required;
          flag = true;
        }
        if (selectedTab === "RESELLER") {
          if (tempData.mmcProfitPercentage === "") {
            tempErr.mmcProfitPercentage = validateMessage.field_required;
            flag = true;
          }
          if (tempData.resellerProfitPercentage === "") {
            tempErr.resellerProfitPercentage = validateMessage.field_required;
            flag = true;
          }
        }
      }
    }
    setErrobj(tempErr);
    return flag;
  };

  const handleNextClick = (flag) => {
    if (validate(flag ?? showStepper)) return;
    if (showStepper) {
      if (activeStep < 2) {
        const temp = [...formData];
        temp[activeStep + 1].minPriceRange =
          parseInt(temp[activeStep].maxPriceRange, 10) + 1;
        setFormData(temp);
        setActiveStep(activeStep + 1);
      } else {
        handleSaveBtnClick();
      }
    } else handleSaveBtnClick(false);
  };

  useEffect(() => {
    if (modalType === "Add") {
      handleClearAll();
      if (selectedTab === "SUPPLIER") {
        setCategoryDetails({
          category: "",
          comissionType: {
            label: "Fixed Commission",
            value: "FIXED_COMMISSION",
          },
          categoryImg: null,
          gst: "",
        });
      } else {
        setCategoryDetails({
          category: "",
          comissionType: {},
          categoryImg: null,
          gst: "",
        });
      }
    }
  }, [selectedTab]);

  return (
    <Box>
      <ModalComponent
        open={openCreateNewCategories}
        ModalTitle={
          modalType === "Add"
            ? "Create Categories"
            : modalType === "Edit"
            ? "Edit Categories"
            : "View Categories"
        }
        titleClassName="fw-bold fs-14 color-orange"
        footerClassName="d-flex justify-content-start flex-row-reverse border-top mt-3"
        ClearBtnText="Reset"
        saveBtnText={activeStep === 2 || !showStepper ? "Submit" : "Next"}
        saveBtnClassName="ms-1"
        ModalWidth={650}
        minHeightClassName="overflow-auto pb-2"
        onCloseIconClick={() => {
          setOpenCreateCategoriesModal(false);
        }}
        onSaveBtnClick={() => handleNextClick()}
        onClearBtnClick={() => {
          handleClearAll();
        }}
        showClearBtn={modalType === "Add" && modalType !== "view"}
        showSaveBtn={modalType !== "View"}
      >
        <Box
          className={
            modalType === "View"
              ? "d-none"
              : "d-flex align-items-center ms-2 mt-2"
          }
        >
          <Typography
            className={`rounded-pill p-2 px-4  h-5  cursor-pointer ${
              selectedTab === "SUPPLIER"
                ? "bg-orange color-white fw-bold"
                : "bg-gray"
            }`}
            onClick={() => {
              setSelectedTab("SUPPLIER");
            }}
          >
            Supplier
          </Typography>
          <Typography
            className={`rounded-pill p-2 px-4 ms-2 h-5  cursor-pointer ${
              selectedTab === "RESELLER"
                ? "bg-orange color-white fw-bold"
                : "bg-gray"
            }`}
            onClick={() => {
              setSelectedTab("RESELLER");
            }}
          >
            Reseller
          </Typography>
        </Box>
        <div className="w-100 p-2">
          <Grid container columnSpacing={2} rowSpacing={2} className="mt-2">
            <Grid item xs={12}>
              <InputBox
                disabled={modalType === "View"}
                name="category"
                value={categoryDetails.category}
                inputlabelshrink
                label="Category Name"
                onInputChange={onInputChange}
                error={errorObj.category !== ""}
                helperText={errorObj.category}
              />
            </Grid>
            <Grid item md={6} container spacing={2}>
              <Grid item xs={12}>
                <InputBox
                  name="gst"
                  disabled={modalType === "View"}
                  value={categoryDetails.gst}
                  inputlabelshrink
                  label="GST in %"
                  onInputChange={onInputChange}
                  error={errorObj.gst !== ""}
                  helperText={errorObj.gst}
                />
              </Grid>

              <Grid item xs={12}>
                <SimpleDropdownComponent
                  list={[
                    { label: "Zero Commission", value: "ZERO_COMMISSION" },
                    {
                      label: "Fixed Commission",
                      value: "FIXED_COMMISSION",
                    },
                  ]}
                  inputlabelshrink
                  size="small"
                  label="Comission Type"
                  onDropdownSelect={(val) => {
                    setCategoryDetails({
                      ...categoryDetails,
                      comissionType: val,
                    });
                  }}
                  disabled={selectedTab === "SUPPLIER" || modalType === "View"}
                  value={
                    selectedTab === "SUPPLIER"
                      ? {
                          label: "Fixed Commission",
                          value: "FIXED_COMMISSION",
                        }
                      : categoryDetails.comissionType
                  }
                  error={errorObj.commissionType !== ""}
                  helperText={errorObj.commissionType}
                />
              </Grid>
            </Grid>
            <Grid item md={6}>
              <Box className="d-flex justify-content-center">
                <ImageCard
                  handleCloseClick={() => {
                    setCategoryDetails({
                      ...categoryDetails,
                      categoryImg: null,
                    });
                  }}
                  showClose={
                    categoryDetails.categoryImg !== null && modalType !== "View"
                  }
                  handleImageUpload={async (e) => {
                    if (e.target.files.length) {
                      if (e.target.files[0].size <= 1000000) {
                        const file = new FormData();
                        file.append("media", e.target.files[0]);
                        const base64 = await getBase64(e.target.files[0]);
                        setCategoryDetails((prev) => {
                          return {
                            ...prev,
                            categoryImg: e.target.files[0],
                            base64URL: base64,
                          };
                        });
                      } else {
                        toastify("Image size should be less than 1MB", "error");
                      }
                    }
                  }}
                  imgSrc={
                    categoryDetails.base64URL ??
                    categoryDetails.categoryImg ??
                    ""
                  }
                />
              </Box>
            </Grid>

            <>
              {!showStepper &&
                (!categoryFormData.subCategoryPriceRangeAdded ||
                modalType === "Add" ? (
                  <>
                    <Typography
                      className={modalType === "View" ? "d-none" : "fs-12 ms-3"}
                    >
                      Do you want to enter Price Range
                    </Typography>
                    <Typography
                      onClick={() => {
                        setShowStepper(true);
                      }}
                      className={
                        modalType === "View"
                          ? "d-none"
                          : "fs-12 ms-2 cursor-pointer color-light-blue"
                      }
                    >
                      Click Here
                    </Typography>
                  </>
                ) : null)}
            </>
            {showStepper ? (
              <>
                <Grid item md={12}>
                  <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label, index) => (
                      <Step
                        sx={{
                          "& .MuiStepLabel-root .Mui-completed": {
                            color: "#e56700", // circle color (COMPLETED)
                            cursor: "pointer",
                          },
                          "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel":
                            {
                              color: "grey.500", // Just text label (COMPLETED)
                            },
                          "& .MuiStepLabel-root .Mui-active": {
                            color: "#e56700", // circle color (ACTIVE)
                          },
                          "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel":
                            {
                              color: "#e56700", // Just text label (ACTIVE)
                            },
                          "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text":
                            {
                              fill: "white", // circle's number (ACTIVE)
                            },
                        }}
                        key={label}
                        onClick={() => {
                          if (index < activeStep || modalType === "View") {
                            setActiveStep(index);
                          }
                        }}
                      >
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </Grid>
                <Grid item md={12}>
                  <Paper elevation={5} className="my-2 p-3">
                    <Grid container spacing={2}>
                      <Grid
                        item
                        md={
                          selectedTab === "SUPPLIER" && activeStep != 2 ? 4 : 6
                        }
                      >
                        <InputBox
                          inputlabelshrink
                          name="minPriceRange"
                          label="Min. Price Range"
                          value={
                            activeStep === 0
                              ? 1
                              : formData[activeStep]?.minPriceRange
                          }
                          onInputChange={handlFormDataChange}
                          readOnly
                        />
                      </Grid>
                      <Grid
                        item
                        md={selectedTab === "SUPPLIER" ? 4 : 6}
                        className={activeStep === 2 ? "d-none" : ""}
                      >
                        <InputBox
                          inputlabelshrink
                          name="maxPriceRange"
                          label="Max. Price Range"
                          value={formData[activeStep]?.maxPriceRange}
                          onInputChange={handlFormDataChange}
                          error={errorObj.maxPriceRange !== ""}
                          helperText={errorObj.maxPriceRange}
                        />
                      </Grid>
                      <Grid item md={activeStep !== 2 ? 4 : 6}>
                        <InputBox
                          inputlabelshrink
                          name="comissionPercentage"
                          label="Comission Percentage"
                          value={formData[activeStep]?.comissionPercentage}
                          onInputChange={handlFormDataChange}
                          error={errorObj.comissionPercentage !== ""}
                          helperText={errorObj.comissionPercentage}
                        />
                      </Grid>
                      {selectedTab === "RESELLER" && (
                        <>
                          <Grid item md={4}>
                            <InputBox
                              inputlabelshrink
                              name="mmcProfitPercentage"
                              label="MMC Profit % Percentage"
                              value={formData[activeStep]?.mmcProfitPercentage}
                              onInputChange={handlFormDataChange}
                              error={errorObj.mmcProfitPercentage !== ""}
                              helperText={errorObj.mmcProfitPercentage}
                            />
                          </Grid>
                          <Grid item md={4}>
                            <InputBox
                              inputlabelshrink
                              name="resellerProfitPercentage"
                              label="Reseller Profit % Percentage"
                              value={
                                formData[activeStep]?.resellerProfitPercentage
                              }
                              onInputChange={handlFormDataChange}
                              error={errorObj.resellerProfitPercentage !== ""}
                              helperText={errorObj.resellerProfitPercentage}
                            />
                          </Grid>
                        </>
                      )}
                    </Grid>
                  </Paper>
                </Grid>
                <Box className="d-flex align-items-center mt-2 ">
                  <Typography
                    className={modalType === "View" ? "d-none" : "fs-12 ms-3 "}
                  >
                    Would you still like to continue without providing a pricing
                    range?
                  </Typography>

                  <Typography
                    onClick={() => {
                      setShowStepper(false);
                      setFormData([
                        {
                          minPriceRange: "1",
                          maxPriceRange: "",
                          comissionPercentage: "",
                          mmcProfitPercentage: "",
                          // supplierProfitPercentage: "",
                          resellerProfitPercentage: "",
                        },
                        {
                          minPriceRange: "",
                          maxPriceRange: "",
                          comissionPercentage: "",
                          mmcProfitPercentage: "",
                          // supplierProfitPercentage: "",
                          resellerProfitPercentage: "",
                        },
                        {
                          minPriceRange: "",
                          maxPriceRange: "",
                          comissionPercentage: "",
                          mmcProfitPercentage: "",
                          // supplierProfitPercentage: "",
                          resellerProfitPercentage: "",
                        },
                      ]);
                      handleNextClick(false);
                    }}
                    className={
                      modalType === "View"
                        ? "d-none"
                        : "fs-12 ms-2 cursor-pointer color-light-blue"
                    }
                  >
                    Click Here
                  </Typography>
                </Box>
              </>
            ) : null}
          </Grid>
        </div>
      </ModalComponent>
    </Box>
  );
};

export default CreateCategoriesModal;
