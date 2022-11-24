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
import { getBase64 } from "services/utils/functionUtils";
import toastify from "services/utils/toastUtils";
import { getCategoryList } from "services/admin/products/productCategories/subcategory";

const steps = [
  "Lower Bound Price Range",
  "Equal Price Range",
  "Upper Bound Price Range",
];

const CreateSubCategoryModal = ({
  setOpenCreateNewSubCategories = () => {},
}) => {
  const [subCategoryDetails, setSubCategoryDetails] = useState({
    category: "",
    comissionType: {},
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
      resellerProfitPercentage: "",
    },
    {
      minPriceRange: "",
      maxPriceRange: "",
      comissionPercentage: "",
      mmcProfitPercentage: "",
      supplierProfitPercentage: "",
      resellerProfitPercentage: "",
    },
    {
      minPriceRange: "",
      maxPriceRange: "",
      comissionPercentage: "",
      mmcProfitPercentage: "",
      supplierProfitPercentage: "",
      resellerProfitPercentage: "",
    },
  ]);
  const [selectedTab, setSelectedTab] = useState("SUPPLIER");
  const [showStepper, setShowStepper] = useState(false);

  const [errorObj, setErrobj] = useState({
    category: "",
    commissionType: "",
    maxPriceRange: "",
    comissionPercentage: "",
    mmcProfitPercentage: "",
    supplierProfitPercentage: "",
    resellerProfitPercentage: "",
  });

  const handlFormDataChange = (e) => {
    const temp = [...formData];
    temp[activeStep][e.target.name] = e.target.value;
    setFormData(temp);
  };

  const onInputChange = (e) => {
    setSubCategoryDetails({
      ...subCategoryDetails,
      [e.target.name]: e.target.value,
    });
  };
  const handleDropdownChange = (val, name) => {
    setSubCategoryDetails({
      ...subCategoryDetails,
      [name]: val,
    });
  };

  const handleCloseIconClick = () => {
    setOpenCreateNewSubCategories(false);
  };

  const handleClearAll = () => {
    setSubCategoryDetails({
      category: "",
      comissionType: {},
    });
  };

  const handleSaveBtnClick = () => {
    // console.log("submit");
  };

  const validate = () => {
    const tempErr = {
      category: "",
      commissionType: "",
      maxPriceRange: "",
      comissionPercentage: "",
      mmcProfitPercentage: "",
      supplierProfitPercentage: "",
      resellerProfitPercentage: "",
    };
    let flag = false;
    if (subCategoryDetails.category === "") {
      tempErr.category = validateMessage.field_required;
      flag = true;
    }
    if (
      !subCategoryDetails.comissionType ||
      !Object.keys(subCategoryDetails.comissionType).length
    ) {
      tempErr.comissionType = validateMessage.field_required;
      flag = true;
    }

    if (!subCategoryDetails.categoryImg) {
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
    if (tempData.resellerProfitPercentage === "") {
      tempErr.resellerProfitPercentage = validateMessage.field_required;
      flag = true;
    }
    setErrobj(tempErr);
    return flag;
  };

  const handleNextClick = () => {
    if (validate()) return;
    if (activeStep < 2) {
      const temp = [...formData];
      temp[activeStep + 1].minPriceRange =
        parseInt(temp[activeStep].maxPriceRange, 10) + 1;
      setFormData(temp);
      setActiveStep(activeStep + 1);
    } else {
      handleSaveBtnClick();
    }
  };

  const getCategoriesList = async () => {
    const { data } = await getCategoryList();
    if (data) {
      console.log(data);
    }
  };

  useEffect(() => {
    getCategoriesList();
  }, []);

  return (
    <Box>
      <ModalComponent
        open
        ModalTitle="Create Sub-Categories"
        titleClassName="fw-bold fs-14 color-orange"
        footerClassName="d-flex justify-content-start flex-row-reverse border-top mt-3"
        ClearBtnText="Reset"
        saveBtnText={activeStep === 2 ? "Submit" : "Next"}
        saveBtnClassName="ms-1"
        ModalWidth={650}
        minHeightClassName="overflow-auto pb-2"
        onCloseIconClick={() => {
          handleCloseIconClick();
        }}
        onSaveBtnClick={handleNextClick}
        onClearBtnClick={() => {
          handleClearAll();
        }}
      >
        <Box className="d-flex align-items-center ms-2 mt-2">
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
            <Grid item xs={6}>
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
                label="Category"
                onDropdownSelect={(val) => {
                  handleDropdownChange(val, "category");
                }}
                value={subCategoryDetails.category}
              />
            </Grid>
            <Grid item xs={6}>
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
                label="Set"
                onDropdownSelect={(val) => {
                  handleDropdownChange(val, "set");
                }}
                value={subCategoryDetails.set}
              />
            </Grid>
            <Grid item xs={12}>
              <InputBox
                name="subcategory"
                value={subCategoryDetails.subcategory}
                inputlabelshrink
                label="Subcategory"
                onInputChange={onInputChange}
              />
            </Grid>
            <Grid item md={6} container>
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
                    handleDropdownChange(val, "comissionType");
                  }}
                  value={subCategoryDetails.comissionType}
                  error={errorObj.comissionType !== ""}
                  helperText={errorObj.comissionType}
                />
              </Grid>
            </Grid>
            <Grid item md={6}>
              <Box className="d-flex justify-content-center">
                <ImageCard
                  showClose={subCategoryDetails.categoryImg}
                  handleCloseClick={() => {
                    setSubCategoryDetails((prev) => {
                      return {
                        ...prev,
                        categoryImg: null,
                      };
                    });
                  }}
                  handleImageUpload={async (e) => {
                    if (e.target.files.length) {
                      if (e.target.files[0].size <= 1000000) {
                        const file = await getBase64(e.target.files[0]);
                        setSubCategoryDetails((prev) => {
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
                  imgSrc={subCategoryDetails.categoryImg || ""}
                />
              </Box>
            </Grid>

            {!showStepper ? (
              <>
                <Typography className="fs-12 ms-3">
                  Do you want to enter Price Range?
                </Typography>
                <Typography
                  onClick={() => {
                    setShowStepper(true);
                  }}
                  className="fs-12 ms-2 cursor-pointer color-light-blue"
                >
                  Click Here
                </Typography>
              </>
            ) : (
              <>
                <Grid item md={12}>
                  <Typography
                    className="d-inline fs-12 color-orange cursor-pointer"
                    onClick={() => {
                      setShowStepper(false);
                    }}
                  >
                    {`< Back`}
                  </Typography>
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
                      <Grid item md={selectedTab === "SUPPLIER" ? 4 : 6}>
                        <InputBox
                          inputlabelshrink
                          name="minPriceRange"
                          label="Min. Price Range"
                          value={formData[activeStep].minPriceRange}
                          onInputChange={handlFormDataChange}
                          readOnly
                        />
                      </Grid>
                      <Grid item md={selectedTab === "SUPPLIER" ? 4 : 6}>
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
                      {selectedTab === "RESELLER" && (
                        <>
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
                              name="resellerProfitPercentage"
                              label="Reseller Profit % Percentage"
                              value={
                                formData[activeStep].resellerProfitPercentage
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
              </>
            )}
          </Grid>
        </div>
      </ModalComponent>
    </Box>
  );
};

export default CreateSubCategoryModal;
