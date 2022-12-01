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
import { getBase64 } from "services/utils/functionUtils";
import toastify from "services/utils/toastUtils";
import {
  createSubCategory,
  getCategoryList,
  getPriceRangeList,
  getSetsList,
  updateSubCategory,
  uploadSubCategoryImage,
} from "services/admin/products/productCategories/subcategory";

const steps = [
  "Lower Bound Price Range",
  "Equal Price Range",
  "Upper Bound Price Range",
];

const CreateSubCategoryModal = ({
  setOpenCreateNewSubCategories = () => {},
  setSubcategoryData = () => {},
  getTableData = () => {},
  setShowView = () => {},
  subCategoryData = null,
  showView = false,
}) => {
  const [subCategoryDetails, setSubCategoryDetails] = useState({
    category: {},
    comissionType: "Fixed Commission",
    subcategoryImg: null,
    set: {},
    subcategory: "",
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
  const [addPriceRange, setAddPriceRange] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [setsList, setSetsList] = useState([]);
  const [subCategoryImg, setSubCategoryImg] = useState(null);

  const [errorObj, setErrobj] = useState({
    category: "",
    commissionType: "",
    maxPriceRange: "",
    comissionPercentage: "",
    mmcProfitPercentage: "",
    supplierProfitPercentage: "",
    resellerProfitPercentage: "",
    subcategory: "",
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
    setSubcategoryData(null);
    setShowView(false);
  };

  const handleClearAll = () => {
    if (!subCategoryData) {
      setSubCategoryDetails({
        category: {},
        comissionType: "Fixed Commission",
        subcategoryImg: null,
        set: {},
        subcategory: "",
      });
    } else {
      setSubCategoryDetails((pre) => ({ ...pre, subcategory: "" }));
    }
    setFormData([
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
  };

  const validate = () => {
    const tempErr = {
      category: "",
      set: "",
      commissionType: "",
      maxPriceRange: "",
      comissionPercentage: "",
      mmcProfitPercentage: "",
      supplierProfitPercentage: "",
      resellerProfitPercentage: "",
      subcategory: "",
    };
    let flag = false;
    if (!subCategoryDetails.category?.id) {
      tempErr.category = validateMessage.field_required;
      flag = true;
    }
    if (!subCategoryDetails.category?.id) {
      tempErr.category = validateMessage.field_required;
      flag = true;
    }
    if (subCategoryDetails.subcategory === "") {
      tempErr.subcategory = validateMessage.field_required;
      flag = true;
    }

    if (!subCategoryDetails.set?.id) {
      tempErr.set = validateMessage.field_required;
      flag = true;
    }

    if (!subCategoryDetails.subcategoryImg) {
      toastify("Please Upload Sub-Category Image", "error");
      flag = true;
    }
    if (addPriceRange) {
      const tempData = JSON.parse(JSON.stringify(formData[activeStep]));
      if (activeStep !== 2) {
        if (tempData.maxPriceRange === "") {
          tempErr.maxPriceRange = validateMessage.field_required;
          flag = true;
        } else if (
          parseInt(tempData.maxPriceRange, 10) <=
          parseInt(tempData.minPriceRange, 10)
        ) {
          tempErr.maxPriceRange =
            "Max. Price Range should be greater than Min. Price Range";
          flag = true;
        }
      }
      if (tempData.comissionPercentage === "") {
        tempErr.comissionPercentage = validateMessage.field_required;
        flag = true;
      } else if (parseInt(tempData.comissionPercentage, 10) > 100) {
        tempErr.comissionPercentage =
          "Commission Percentage shoul not exced 100%";
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
    setErrobj(tempErr);
    return flag;
  };

  const uploadImage = async () => {
    const file = new FormData();
    file.append("media", subCategoryImg);
    const { data, err } = await uploadSubCategoryImage(file);
    return { data, err };
  };

  const handleSubmit = async () => {
    if (!validate()) {
      if (!subCategoryData) {
        const imgUrl = await uploadImage();
        if (imgUrl.err) {
          toastify(imgUrl.err?.response?.data?.message, "error");
          return;
        }
        const payload = {
          subCategoryName: subCategoryDetails.subcategory,
          setId: subCategoryDetails.set.id,
          mediaUrl: imgUrl.data,
          priceRangeList: formData.map((item, ind) => {
            return {
              priceStart: parseInt(item.minPriceRange, 10),
              priceEnd: ind === 2 ? null : parseInt(item.maxPriceRange, 10),
              priceRangeType: ind === 0 ? "MIN" : ind === 1 ? "EQUAL" : "MAX",
              adminProfitPercentage: null,
              resellerProfitPercentage: null,
              commissionPercentage: parseInt(item.comissionPercentage, 10),
            };
          }),
        };
        const { data, message, err } = await createSubCategory(payload);
        if (data) {
          getTableData(0);
          toastify(message, "success");
          setOpenCreateNewSubCategories(false);
        } else if (err) {
          toastify(err?.response?.data?.message, "error");
        }
      } else {
        const payload = {
          subCategoryId: subCategoryData.subCategoryId,
          subCategoryName: subCategoryDetails.subcategory,
          priceRangeList: subCategoryData.priceRangeEditable
            ? []
            : formData.map((item, ind) => {
                return {
                  priceStart: parseInt(item.minPriceRange, 10),
                  priceEnd: ind === 2 ? null : parseInt(item.maxPriceRange, 10),
                  priceRangeType:
                    ind === 0 ? "MIN" : ind === 1 ? "EQUAL" : "MAX",
                  adminProfitPercentage: null,
                  resellerProfitPercentage: null,
                  commissionPercentage: parseInt(item.comissionPercentage, 10),
                };
              }),
        };
        const { data, message, err } = await updateSubCategory(payload);
        if (data) {
          getTableData(0);
          toastify(message, "success");
          setSubcategoryData(null);
          setOpenCreateNewSubCategories(false);
        } else if (err) {
          toastify(err?.response?.data?.message, "error");
        }
      }
    }
  };

  const handleNextClick = () => {
    if (validate()) return;
    if (activeStep < 2) {
      const temp = [...formData];
      temp[activeStep + 1].minPriceRange =
        parseInt(temp[activeStep].maxPriceRange, 10) + 1;
      setFormData(temp);
      setActiveStep(activeStep + 1);
    }
  };

  const getCategoriesList = async () => {
    const { data } = await getCategoryList();
    if (data) {
      setCategoryList(
        data.map((item) => ({
          label: item.mainCategoryName,
          id: item.mainCategoryId,
        }))
      );
    } else {
      setCategoryList([]);
    }
  };

  const getSetList = async () => {
    const { data } = await getSetsList(subCategoryDetails.category?.id);
    if (data) {
      setSetsList(
        data.map((item) => ({
          label: item.setName,
          id: item.categorySetId,
        }))
      );
    } else {
      setSetsList([]);
    }
  };

  const checkCategoryPriceRangeList = async () => {
    const { data } = await getPriceRangeList(subCategoryDetails.category?.id);
    if (data) {
      setAddPriceRange(data.priceRangeList === null);
    } else {
      setAddPriceRange(false);
    }
  };

  useEffect(() => {
    if (subCategoryDetails.category?.id) {
      getSetList();
      checkCategoryPriceRangeList();
    }
  }, [subCategoryDetails.category]);

  useEffect(() => {
    getCategoriesList();
  }, []);

  const setDefaultValues = async () => {
    setSubCategoryDetails({
      category: {
        label: subCategoryData.mainCategoryDetails.mainCategoryName,
        id: subCategoryData.mainCategoryDetails.mainCategoryId,
      },
      comissionType: subCategoryData.mainCategoryDetails.commissionType,
      subcategoryImg: subCategoryData.mediaUrl,
      set: {
        label: subCategoryData.setDetails.setName,
        id: subCategoryData.setId,
      },
      subcategory: subCategoryData.subCategoryName,
    });
    if (!subCategoryData.priceRangeEditable) {
      setFormData(
        subCategoryData.priceRangeList.map((item) => ({
          minPriceRange: item.priceStart,
          maxPriceRange: item.priceEnd,
          comissionPercentage: item.commissionPercentage,
          mmcProfitPercentage: "",
          supplierProfitPercentage: "",
          resellerProfitPercentage: "",
        }))
      );
    }
    await getCategoriesList();
  };

  useEffect(() => {
    if (subCategoryData) {
      setDefaultValues();
    }
  }, [subCategoryData]);

  return (
    <Box>
      <ModalComponent
        open
        ModalTitle={
          showView
            ? "View Modal"
            : subCategoryData
            ? "Edit Sub-Category"
            : "Create Sub-Category"
        }
        titleClassName="fw-bold fs-16 color-orange"
        footerClassName="d-flex justify-content-start flex-row-reverse border-top mt-3"
        ClearBtnText="Reset"
        saveBtnText={
          addPriceRange ? (activeStep === 2 ? "Submit" : "Next") : "Submit"
        }
        saveBtnClassName="ms-1"
        ModalWidth={650}
        minHeightClassName="overflow-auto pb-2"
        onCloseIconClick={() => {
          handleCloseIconClick();
        }}
        showFooter={!showView}
        onSaveBtnClick={
          addPriceRange
            ? activeStep === 2
              ? handleSubmit
              : handleNextClick
            : handleSubmit
        }
        onClearBtnClick={() => {
          handleClearAll();
        }}
      >
        {!showView && (
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
        )}
        <div className="w-100 p-2">
          <Grid container columnSpacing={2} rowSpacing={2} className="mt-2">
            <Grid item xs={6}>
              <SimpleDropdownComponent
                list={categoryList}
                inputlabelshrink
                size="small"
                label="Category"
                onDropdownSelect={(val) => {
                  setSubCategoryDetails({
                    ...subCategoryDetails,
                    category: val,
                    set: {},
                  });
                  setFormData([
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
                }}
                value={subCategoryDetails.category}
                error={errorObj.category !== ""}
                helperText={errorObj.category}
                disabled={!showView && subCategoryData}
                readOnly={showView}
              />
            </Grid>
            <Grid item xs={6}>
              <SimpleDropdownComponent
                list={setsList}
                inputlabelshrink
                size="small"
                label="Set"
                onDropdownSelect={(val) => {
                  handleDropdownChange(val ?? {}, "set");
                }}
                value={subCategoryDetails.set}
                error={errorObj.set !== ""}
                helperText={errorObj.set}
                disabled={!showView && subCategoryData}
                readOnly={showView}
              />
            </Grid>
            <Grid item xs={12}>
              <InputBox
                name="subcategory"
                value={subCategoryDetails.subcategory}
                error={errorObj.subcategory !== ""}
                helperText={errorObj.subcategory}
                inputlabelshrink
                label="Subcategory"
                onInputChange={onInputChange}
                readOnly={showView}
              />
            </Grid>
            <Grid item md={6} container>
              <Grid item xs={12}>
                <InputBox
                  inputlabelshrink
                  size="small"
                  label="Comission Type"
                  value={subCategoryDetails.comissionType}
                  error={errorObj.commissionType !== ""}
                  helperText={errorObj.comissionType}
                  readOnly
                  disabled={!showView && subCategoryData}
                />
              </Grid>
            </Grid>
            <Grid item md={6}>
              <Box className="d-flex justify-content-center">
                <ImageCard
                  showClose={
                    subCategoryData === null
                      ? subCategoryDetails.subcategoryImg
                      : false
                  }
                  handleCloseClick={() => {
                    setSubCategoryImg(null);
                    setSubCategoryDetails((prev) => {
                      return {
                        ...prev,
                        subcategoryImg: null,
                      };
                    });
                  }}
                  handleImageUpload={async (e) => {
                    if (e.target.files.length) {
                      if (e.target.files[0].size <= 1000000) {
                        const file = await getBase64(e.target.files[0]);
                        setSubCategoryImg(e.target.files[0]);
                        setSubCategoryDetails((prev) => {
                          return {
                            ...prev,
                            subcategoryImg: file,
                          };
                        });
                      } else {
                        toastify("Image size should be less than 1MB", "error");
                      }
                    }
                  }}
                  imgSrc={subCategoryDetails.subcategoryImg || ""}
                />
              </Box>
            </Grid>

            {addPriceRange && (
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
                          "& .MuiStepLabel-iconContainer": {
                            cursor: showView ? "pointer" : "default",
                          },
                        }}
                        key={label}
                        onClick={() => {
                          if (index < activeStep || showView) {
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
                      {activeStep !== 2 && (
                        <Grid item md={selectedTab === "SUPPLIER" ? 4 : 6}>
                          <InputBox
                            inputlabelshrink
                            name="maxPriceRange"
                            label="Max. Price Range"
                            value={formData[activeStep].maxPriceRange}
                            onInputChange={handlFormDataChange}
                            error={errorObj.maxPriceRange !== ""}
                            helperText={errorObj.maxPriceRange}
                            readOnly={showView}
                          />
                        </Grid>
                      )}
                      <Grid item md={4}>
                        <InputBox
                          inputlabelshrink
                          name="comissionPercentage"
                          label="Comission Percentage"
                          value={formData[activeStep].comissionPercentage}
                          onInputChange={handlFormDataChange}
                          error={errorObj.comissionPercentage !== ""}
                          helperText={errorObj.comissionPercentage}
                          readOnly={showView}
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
