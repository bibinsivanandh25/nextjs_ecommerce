/* eslint-disable no-shadow */
import React, { useState } from "react";
import { Box, Grid, Paper, Step, StepLabel, Stepper } from "@mui/material";
import validateMessage from "constants/validateMessages";
import InputBox from "@/atoms/InputBoxComponent";
import ModalComponent from "@/atoms/ModalComponent";
import SimpleDropdownComponent from "@/atoms/SimpleDropdownComponent";
import ImageCard from "@/atoms/ImageCard";
import { getBase64 } from "services/utils/functionUtils";
import toastify from "services/utils/toastUtils";

const steps = [
  "Lower Bound Price Range",
  "Equal Price Range",
  "Upper Bound Price Range",
];

const CreateCategoriesModal = ({
  openCreateNewCategories,
  setOpenCreateCategoriesModal,
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
      supplierProfitPercentage: "",
    },
    {
      minPriceRange: "",
      maxPriceRange: "",
      comissionPercentage: "",
      mmcProfitPercentage: "",
      supplierProfitPercentage: "",
    },
    {
      minPriceRange: "",
      maxPriceRange: "",
      comissionPercentage: "",
      mmcProfitPercentage: "",
      supplierProfitPercentage: "",
    },
  ]);
  const [errorObj, setErrobj] = useState({
    category: "",
    commissionType: "",
    gst: "",
    maxPriceRange: "",
    comissionPercentage: "",
    mmcProfitPercentage: "",
    supplierProfitPercentage: "",
  });

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

  const handleCloseIconClick = () => {
    setCategoryDetails({
      category: "",
      comissionType: {},
    });
    setFormData([
      {
        minPriceRange: "1",
        maxPriceRange: "",
        comissionPercentage: "",
        mmcProfitPercentage: "",
        supplierProfitPercentage: "",
      },
      {
        minPriceRange: "",
        maxPriceRange: "",
        comissionPercentage: "",
        mmcProfitPercentage: "",
        supplierProfitPercentage: "",
      },
      {
        minPriceRange: "",
        maxPriceRange: "",
        comissionPercentage: "",
        mmcProfitPercentage: "",
        supplierProfitPercentage: "",
      },
    ]);
    setErrobj({
      category: "",
      commissionType: "",
      gst: "",
      maxPriceRange: "",
      comissionPercentage: "",
      mmcProfitPercentage: "",
      supplierProfitPercentage: "",
    });
    setOpenCreateCategoriesModal(false);
    setActiveStep(0);
  };

  const handleClearAll = () => {
    setCategoryDetails({
      category: "",
      comissionType: {},
      gst: "",
    });
  };

  const handleSaveBtnClick = () => {
    // console.log("submit");
  };

  const validate = () => {
    const tempErr = {
      category: "",
      commissionType: "",
      gst: "",
      maxPriceRange: "",
      comissionPercentage: "",
      mmcProfitPercentage: "",
      supplierProfitPercentage: "",
    };
    let flag = false;
    if (categoryDetails.category === "") {
      tempErr.category = validateMessage.field_required;
      flag = true;
    }
    if (
      !categoryDetails.comissionType ||
      !Object.keys(categoryDetails.comissionType).length
    ) {
      tempErr.comissionType = validateMessage.field_required;
      flag = true;
    }
    if (categoryDetails.gst === "") {
      tempErr.gst = validateMessage.field_required;
      flag = true;
    }
    if (!categoryDetails.categoryImg) {
      toastify("Please Upload Category Image", "error");
      flag = true;
    }
    const tempData = { ...formData[activeStep] };
    if (tempData.maxPriceRange === "") {
      tempErr.maxPriceRange = validateMessage.field_required;
      flag = true;
    }
    if (tempData.comissionPercentage === "") {
      tempErr.comissionPercentage = validateMessage.field_required;
      flag = true;
    }
    if (tempData.mmcProfitPercentage === "") {
      tempErr.mmcProfitPercentage = validateMessage.field_required;
      flag = true;
    }
    if (tempData.supplierProfitPercentage === "") {
      tempErr.supplierProfitPercentage = validateMessage.field_required;
      flag = true;
    }
    setErrobj(tempErr);
    return flag;
  };

  const handleNextClick = () => {
    if (validate()) return;
    if (activeStep < 2) {
      setActiveStep(activeStep + 1);
    } else {
      handleSaveBtnClick();
    }
  };

  return (
    <Box>
      <ModalComponent
        open={openCreateNewCategories}
        ModalTitle="Create Categories"
        titleClassName="fw-bold fs-14 color-orange"
        footerClassName="d-flex justify-content-start flex-row-reverse border-top mt-3"
        ClearBtnText="Reset"
        saveBtnText={activeStep === 2 ? "Submit" : "Next"}
        saveBtnClassName="ms-1"
        ModalWidth={650}
        minHeightClassName="overflow-auto"
        onCloseIconClick={() => {
          handleCloseIconClick();
        }}
        onSaveBtnClick={handleNextClick}
        onClearBtnClick={() => {
          handleClearAll();
        }}
      >
        <Grid container columnSpacing={2} rowSpacing={2} className="mt-2">
          <Grid item xs={12}>
            <InputBox
              name="category"
              value={categoryDetails.category}
              inputlabelshrink
              label="Category Name"
              onInputChange={onInputChange}
              error={errorObj.category !== ""}
              helperText={errorObj.category}
            />
          </Grid>
          <Grid item md={6} container>
            <Grid item xs={12}>
              <InputBox
                name="gst"
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
                list={[{ label: "Type One" }, { label: "Type Two" }]}
                inputlabelshrink
                size="small"
                label="Comission Type"
                onDropdownSelect={(val) => {
                  setCategoryDetails({
                    ...categoryDetails,
                    comissionType: { label: val.label },
                  });
                }}
                error={errorObj.comissionType !== ""}
                helperText={errorObj.comissionType}
              />
            </Grid>
          </Grid>
          <Grid item md={6}>
            <Box className="d-flex justify-content-center">
              <ImageCard
                showClose={false}
                handleImageUpload={async (e) => {
                  if (e.target.files.length) {
                    if (e.target.files[0].size <= 1000000) {
                      const file = await getBase64(e.target.files[0]);
                      setCategoryDetails((prev) => {
                        return {
                          ...prev,
                          categoryImg: file,
                        };
                      });
                    } else {
                      toastify("Image size should be less than 1MB", "error");
                    }
                  }
                }}
                imgSrc={categoryDetails.categoryImg || ""}
              />
            </Box>
          </Grid>

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
                    "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {
                      fill: "white", // circle's number (ACTIVE)
                    },
                  }}
                  key={label}
                  onClick={() => {
                    if (index < activeStep) {
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
                <Grid item md={6}>
                  <InputBox
                    inputlabelshrink
                    name="minPriceRange"
                    label="Min. Price Range"
                    value={formData[activeStep].minPriceRange}
                    onInputChange={handlFormDataChange}
                    readOnly
                  />
                </Grid>
                <Grid item md={6}>
                  <InputBox
                    inputlabelshrink
                    name="maxPriceRange"
                    label="Max. Price Range"
                    value={formData[activeStep].maxPriceRange}
                    onInputChange={handlFormDataChange}
                    error={errorObj.maxPriceRange !== ""}
                    helperText={errorObj.maxPriceRange}
                  />
                </Grid>
                <Grid item md={4}>
                  <InputBox
                    inputlabelshrink
                    name="comissionPercentage"
                    label="Comission Percentage"
                    value={formData[activeStep].comissionPercentage}
                    onInputChange={handlFormDataChange}
                    error={errorObj.comissionPercentage !== ""}
                    helperText={errorObj.comissionPercentage}
                  />
                </Grid>
                <Grid item md={4}>
                  <InputBox
                    inputlabelshrink
                    name="mmcProfitPercentage"
                    label="MMC Profit % Percentage"
                    value={formData[activeStep].mmcProfitPercentage}
                    onInputChange={handlFormDataChange}
                    error={errorObj.mmcProfitPercentage !== ""}
                    helperText={errorObj.mmcProfitPercentage}
                  />
                </Grid>
                <Grid item md={4}>
                  <InputBox
                    inputlabelshrink
                    name="supplierProfitPercentage"
                    label="Supplier Profit % Percentage"
                    value={formData[activeStep].supplierProfitPercentage}
                    onInputChange={handlFormDataChange}
                    error={errorObj.supplierProfitPercentage !== ""}
                    helperText={errorObj.supplierProfitPercentage}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </ModalComponent>
    </Box>
  );
};

export default CreateCategoriesModal;
