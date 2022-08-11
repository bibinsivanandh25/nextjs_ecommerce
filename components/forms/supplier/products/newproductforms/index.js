/* eslint-disable consistent-return */
/* eslint-disable react/no-array-index-key */
import { Box, Grid, Typography } from "@mui/material";
import ImageCard from "components/atoms/ImageCard";
import { useEffect, useState } from "react";
import SimpleDropdownComponent from "components/atoms/SimpleDropdownComponent";
import ButtonComponent from "components/atoms/ButtonComponent";
import InputBox from "components/atoms/InputBoxComponent";
import TextAreaComponent from "components/atoms/TextAreaComponent";
import { getBase64 } from "services/utils/functionUtils";
import validateMessage from "constants/validateMessages";
import toastify from "services/utils/toastUtils";
import axios from "axios";
import FileUploadModal from "components/atoms/FileUpload";
import { useUserInfo } from "services/hooks";
import serviceUtil from "services/utils";
import GroupVariationForm from "../newCollections/VariationForm/groupvariations";
import {
  commisiondata,
  product_type,
} from "../../../../../constants/constants";
import ModalComponent from "@/atoms/ModalComponent";
import CheckBoxComponent from "@/atoms/CheckboxComponent";
import RadiobuttonComponent from "@/atoms/RadiobuttonComponent";

const ProductsLayout = ({
  zonepagetabs = [], // Zone Charges page
  formData = {},
  setFormData = () => {},
  handleSubmitClick = () => {},
  tabsList = [],
  formsRef = null,
  // type = "",
  showGroupVariant = false,
  setShowGroupVariant = () => {},
}) => {
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [tabsLists, setTabsLists] = useState([...tabsList]);
  const [imagedata, setImageData] = useState([]);
  const [activeTab, setactiveTab] = useState(0);
  const [showFileUploadModal, setShowFileUploadModal] = useState(false);
  const [mainFormData, setMainFormData] = useState({
    commision_mode: null,
    product_type: "",
    brand: "",
    short_description: {
      media: [],
      text: "",
    },
    long_description: {
      media: [],
      text: "",
    },
    sub_category_id: "",
    tags: {},
    limit_per_order: "",
    selectb2binvoice: null,
    tradeMarkCheck: false,
    category: {},
    brandradio: true,
    genericradio: false,
    b2bdocument: {},
    b2bdocumentfile: [],
    setsValue: {},
    subCategoryValue: {},
  });
  const [errorObj, setErrorObj] = useState({
    commision_mode: "",
    product_type: "",
    brand: "",
    short_description: {
      media: [],
      text: "",
    },
    long_description: {
      media: [],
      text: "",
    },
    sub_category_id: "",
    tags: "",
    limit_per_order: "",
    selectb2binvoice: "",
    category: null,
  });
  const [openModal, setOpenModal] = useState(false);
  const [tagInputValue, setTagInputValue] = useState("");
  const [tagInputError, setTagInputError] = useState("");
  const [tagValues, setTagValues] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [setsData, setSetsData] = useState([]);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [b2bList, setB2bList] = useState([]);
  const [trademarkList, setTradeMarkList] = useState([]);
  const userInfo = useUserInfo();

  useEffect(() => {
    if (mainFormData.category?.value === "electronics") {
      setTabsLists([...tabsList, ...zonepagetabs]);
    } else {
      setTabsLists([...tabsList]);
    }
    setFormData((pre) => {
      return { ...pre, mainFormData };
    });
  }, [mainFormData.category]);

  const getTags = () => {
    serviceUtil
      .get("products/product-tag")
      .then((res) => {
        const { data } = res.data;
        const temp = [];
        data.forEach((item) => {
          temp.push({
            id: item.tagId,
            label: item.tagName,
            value: item.tagName,
          });
        });
        setTagValues(temp);
      })
      .catch(() => {});
  };
  // Select Category Api
  const getSelectCategoryData = () => {
    serviceUtil
      .get("products/main-category/drop-down-list")
      .then((res) => {
        const { data } = res.data;
        const finaData = [];
        data.forEach((item) => {
          finaData.push({
            id: item.mainCategoryId,
            value: item.mainCategoryName,
            label: item.mainCategoryName,
            commission_mode: item.commissionType,
          });
        });
        setCategoryData(finaData);
      })
      .catch(() => {});
  };
  const getB2BTradmarkValues = (type) => {
    serviceUtil
      .get(
        `products/supplier/product/trademark-invoice-dropdown?documentType=${type}&supplierId=${userInfo.id}`
      )
      .then((res) => {
        if (type === "B2B_Invoice") {
          setB2bList(() => {
            return res.data.map((item) => {
              return {
                id: item.trademarkInvoiceId,
                value: item.trademarkInvoiceId,
                label: item.documentName,
              };
            });
          });
        } else {
          setTradeMarkList();
        }
      })
      .catch(() => {});
  };
  useEffect(() => {
    getTags();
    getSelectCategoryData();
    getB2BTradmarkValues("B2B_INVOICE");
  }, []);

  useEffect(() => {
    if (mainFormData.category?.value) {
      axios
        .get(
          `http://10.10.31.116:8100/api/v1/products/category-set-enabled/drop-down-list?mainCategoryId=${mainFormData.category.id}`
        )
        .then((res) => {
          const { data } = res.data;
          const finaData = [];
          data.forEach((item) => {
            finaData.push({
              id: item.categorySetId,
              value: item.setName,
              label: item.setName,
            });
          });
          setSetsData(finaData);
        })
        .catch((err) => {
          toastify(err.response.data.message, "error");
        });
    }
  }, [mainFormData.category]);

  useEffect(() => {
    if (mainFormData.setsValue?.value) {
      axios
        .get(
          `http://10.10.31.116:8100/api/v1/products/sub-category/drop-down-list?setId=${mainFormData.setsValue.id}`
        )
        .then((res) => {
          const { data } = res.data;
          const finaData = [];
          data.forEach((item) => {
            finaData.push({
              id: item.subCategoryId,
              value: item.subCategoryName,
              label: item.subCategoryName,
            });
          });
          setSubCategoryData(finaData);
        })
        .catch((err) => {
          setSubCategoryData([]);
          toastify(err.response.data.message, "error");
        });
    }
  }, [mainFormData.setsValue]);

  const validateForm = () => {
    const errObj = {
      commision_mode: "",
      product_type: "",
      brand: "",
      short_description: {
        media: [],
        text: "",
      },
      long_description: {
        media: [],
        text: "",
      },
      sub_category_id: "",
      tags: "",
      limit_per_order: "",
      selectb2binvoice: "",
      category: "",
    };
    let flag = false;
    // if (mainFormData.commision_mode === null) {
    //   errObj.commision_mode = validateMessage.field_required;
    //   flag = true;
    // }
    if (mainFormData.selectb2binvoice === null) {
      errObj.selectb2binvoice = validateMessage.field_required;
      flag = true;
    }
    if (mainFormData.category === null) {
      errObj.category = validateMessage.field_required;
      flag = true;
    }
    if (mainFormData.brand === null || mainFormData.brand === "") {
      errObj.brand = validateMessage.field_required;
      flag = true;
    }
    if (mainFormData.short_description.text === "") {
      errObj.short_description.text = validateMessage.field_required;
      flag = true;
    } else if (mainFormData.short_description.text.length > 255) {
      errObj.short_description.text = validateMessage.alpha_numeric_max_255;
      flag = true;
    }
    if (mainFormData.long_description.text === "") {
      errObj.long_description.text = validateMessage.field_required;
      flag = true;
    } else if (mainFormData.long_description.text.length > 255) {
      errObj.long_description.text = validateMessage.alpha_numeric_max_255;
      flag = true;
    }
    if (mainFormData.tags === "") {
      errObj.tags = validateMessage.field_required;
      flag = true;
    } else if (mainFormData.tags.length > 15) {
      errObj.tags = validateMessage.alpha_numeric_max_255;
      flag = true;
    }
    if (mainFormData.limit_per_order === "") {
      errObj.limit_per_order = validateMessage.field_required;
      flag = true;
    } else if (mainFormData.limit_per_order.length < 1) {
      errObj.limit_per_order = "Limit per order should atleast be 1";
      flag = true;
    }
    setErrorObj({ ...errObj });
    if (!flag) {
      setFormData((pre) => ({
        ...pre,
        mainFormData,
      }));
    }
    return !flag;
  };

  const handleNextClick = () => {
    const flag = formsRef.current.validate();
    if (validateForm() && flag) {
      const temp = formsRef.current.handleSendFormData();
      setFormData((prev) => {
        return {
          ...prev,
          [temp[0]]: temp[1],
        };
      });
      setactiveTab((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (formData?.mainForm && Object.keys(formData.mainForm).length) {
      setMainFormData({ ...formData.mainForm });
    }
  }, [formData]);

  const handleInputChange = (e) => {
    setMainFormData((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };
  const handleDropdownChange = (value, key) => {
    setMainFormData((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const handleCategoryModalClose = () => {
    setShowCategoryModal(false);
    setSetsData([]);
    setSubCategoryData([]);
  };
  const handleCategorySubmitClick = () => {
    const errObj = {
      setsValue: false,
      subCategoryValue: false,
    };
    let flag = false;
    if (mainFormData.setsValue === null) {
      errObj.category = validateMessage.field_required;
      flag = true;
    }
    if (mainFormData.subCategoryValue === null) {
      errObj.subCategoryValue = validateMessage.field_required;
      flag = true;
    }
    if (!flag) {
      setShowCategoryModal(true);
    }
  };

  const saveTag = async (payload) => {
    await serviceUtil
      .post("/products/product-tag", payload)
      .then((res) => {
        toastify(res.data.message, "success");
        setTagInputValue("");
        setOpenModal(false);
      })
      .catch((err) => {
        toastify(err.response.data.message, "error");
      });
  };

  const handleTagSubmit = () => {
    if (tagInputValue === "") {
      setTagInputError(validateMessage.field_required);
    } else if (tagInputValue.length < 3) {
      setTagInputError(validateMessage.alpha_numeric_min_3);
    } else if (tagInputValue.length > 15) {
      setTagInputError(validateMessage.alpha_numeric_15);
    } else if (!/^[a-zA-Z0-9#@$]+$/.test(tagInputValue)) {
      setTagInputError("Only alpha numeric with '#, $, @' are allowed ");
    } else {
      setTagInputError("");
      saveTag({
        tagName: tagInputValue,
        createdBy: userInfo.id,
        createdByType: userInfo.role,
      });
    }
  };
  return (
    <>
      {!showGroupVariant ? (
        <Box className="d-flex flex-grow-1 flex-row mt-2">
          <Box className="border-end p-2 py-2 fit-content pb-0 overflow-y-scroll mxh-75vh">
            {imagedata.length > 0
              ? imagedata.map((item, index) => (
                  <ImageCard
                    key={index}
                    imgSrc={item}
                    handleCloseClick={() => {
                      setImageData((prev) => {
                        const temp = [...prev];
                        temp.splice(index);
                        return [...temp];
                      });
                    }}
                    className="mx-3"
                  />
                ))
              : null}
            {imagedata.length < 5 ? (
              <ImageCard
                showClose={false}
                handleImageUpload={async (e) => {
                  if (e.target.files.length) {
                    if (e.target.files[0].size <= 1000000) {
                      const file = await getBase64(e.target.files[0]);
                      setImageData((prev) => {
                        return [...prev, file];
                      });
                    } else {
                      toastify("Image size should be less than 1MB", "error");
                    }
                  }
                }}
                className="mx-3"
              />
            ) : null}
          </Box>
          <Box className="border-end p-2 w-30p mxh-75vh overflow-y-scroll">
            <div className="px-2">
              <Grid container spacing={2}>
                {/* <Grid item md={12}>
              <SimpleDropdownComponent
                list={product_type}
                id="producttype"
                label="Product Type"
                size="small"
                value={mainFormData.product_type}
                onDropdownSelect={(value) => {
                  handleDropdownChange(value, "product_type");
                }}
                inputlabelshrink
              />
            </Grid> */}
                <Grid item md={12}>
                  <InputBox
                    id="brand"
                    label="Brand"
                    onInputChange={handleInputChange}
                    value={mainFormData.brand}
                    placeholder="Enter Brand"
                    inputlabelshrink
                    error={errorObj.brand !== ""}
                    helperText={errorObj.brand}
                  />
                </Grid>
                <Grid item md={12}>
                  <TextAreaComponent
                    legend="Short Description"
                    placeholder="Enter short description"
                    onChange={(e) => {
                      setMainFormData((prev) => {
                        return {
                          ...prev,
                          short_description: {
                            ...prev.short_description.media,
                            text: e.target.value,
                          },
                        };
                      });
                    }}
                    value={mainFormData.short_description.text}
                    onBtnClick={() => {
                      setShowFileUploadModal(true);
                    }}
                    btnLabel="Add Media"
                    btnSize="small"
                    btnVariant="outlined"
                    widthClassName="w-100 mt-0"
                    rows={2}
                    muiProps="m-0 p-0 fs-10"
                    error={errorObj.short_description.text !== ""}
                    helperText={errorObj.short_description.text}
                  />
                </Grid>
                <Grid item md={12}>
                  <TextAreaComponent
                    legend="Long Description"
                    value={mainFormData.long_description.text}
                    placeholder="Enter long description"
                    onChange={(e) => {
                      setMainFormData((prev) => {
                        return {
                          ...prev,
                          long_description: {
                            ...prev.long_description.media,
                            text: e.target.value,
                          },
                        };
                      });
                    }}
                    onBtnClick={() => {
                      setShowFileUploadModal(true);
                    }}
                    btnLabel="Add Media"
                    btnSize="small"
                    btnVariant="outlined"
                    widthClassName="w-100 mt-0"
                    rows={3}
                    muiProps="m-0 p-0 fs-10"
                    error={errorObj.long_description.text !== ""}
                    helperText={errorObj.long_description.text}
                  />
                </Grid>
                <Grid item md={12}>
                  <SimpleDropdownComponent
                    list={categoryData}
                    id="category"
                    label="Select Category"
                    size="small"
                    inputlabelshrink
                    error={errorObj.category !== ""}
                    helperText={errorObj.category}
                    onDropdownSelect={(value) => {
                      handleDropdownChange(value, "category");
                      if (value) {
                        setShowCategoryModal(true);
                        setMainFormData((prev) => ({
                          ...prev,
                          setsValue: {},
                          subCategoryValue: {},
                        }));
                      }
                      setMainFormData((pre) => {
                        return {
                          ...pre,
                          commision_mode: value?.commission_mode
                            ? value.commission_mode
                            : "",
                        };
                      });
                    }}
                    value={mainFormData.category}
                    placeholder="Select Category"
                  />
                </Grid>
                <Grid item md={12}>
                  <InputBox
                    id="commisionmode"
                    label="Commision Mode"
                    value={mainFormData.commision_mode}
                    placeholder="Commission Mode"
                    inputlabelshrink
                    disabled
                  />
                </Grid>
                <Grid item md={12}>
                  <SimpleDropdownComponent
                    list={tagValues}
                    id="tags"
                    label="Tags"
                    size="small"
                    inputlabelshrink
                    value={mainFormData.tags}
                    error={errorObj.tags !== ""}
                    helperText={errorObj.tags}
                    placeholder="Select tags"
                    onDropdownSelect={(value) => {
                      handleDropdownChange(value, "tags");
                    }}
                    // error={errorObj.commision_mode !== ""}
                    // helperText={errorObj.commision_mode}
                  />
                </Grid>
                <Grid item md={12}>
                  <div className="d-flex justify-content-end">
                    <ButtonComponent
                      label="Create tag"
                      variant="outlined"
                      size="small"
                      onBtnClick={() => {
                        setOpenModal(true);
                      }}
                      muiProps="m-0 p-0 fs-10"
                    />
                  </div>
                </Grid>
                <Grid item md={12}>
                  <InputBox
                    id="limit_per_order"
                    label="Limits Per Order"
                    onInputChange={handleInputChange}
                    value={mainFormData.limit_per_order}
                    inputlabelshrink
                    type="number"
                    error={errorObj.limit_per_order !== ""}
                    helperText={errorObj.limit_per_order}
                    placeholder="Enter the order limit(eg.: 1)"
                  />
                </Grid>
                <Grid item md={12}>
                  <SimpleDropdownComponent
                    list={b2bList}
                    id="selectb2binvoice"
                    label="Select B2B Invoice"
                    size="small"
                    value={mainFormData.selectb2binvoice}
                    onDropdownSelect={(value) => {
                      handleDropdownChange(value, "selectb2binvoice");
                    }}
                    inputlabelshrink
                    error={errorObj.selectb2binvoice !== ""}
                    helperText={errorObj.selectb2binvoice}
                  />
                </Grid>
                <Grid item md={12}>
                  <Typography className="h-5 color-gray">
                    Is It a Brand or Generic Product
                  </Typography>
                  <RadiobuttonComponent
                    label="Branded"
                    isChecked={mainFormData.brandradio}
                    onRadioChange={() => {
                      setMainFormData((prev) => ({
                        ...prev,
                        brandradio: true,
                        genericradio: false,
                      }));
                    }}
                    size="small"
                  />
                  <RadiobuttonComponent
                    size="small"
                    label="Generic"
                    isChecked={mainFormData.genericradio}
                    onRadioChange={() => {
                      setMainFormData((prev) => ({
                        ...prev,
                        brandradio: false,
                        genericradio: true,
                      }));
                      setMainFormData((prev) => ({
                        ...prev,
                        tradeMarkCheck: false,
                      }));
                    }}
                  />
                </Grid>
                <Grid item md={12} display="flex" alignItems="center">
                  <CheckBoxComponent
                    label=""
                    size="small"
                    isChecked={mainFormData.tradeMarkCheck}
                    checkBoxClick={() => {
                      if (!mainFormData.tradeMarkCheck) {
                        getB2BTradmarkValues("TRADEMARK_LETTER");
                      }
                      setMainFormData((prev) => ({
                        ...prev,
                        tradeMarkCheck: !mainFormData.tradeMarkCheck,
                      }));
                    }}
                    labelColor="#535353"
                    lableFontSize="h-5"
                    varient="filled"
                    showIcon
                    isDisabled={mainFormData?.genericradio}
                  />
                  <Typography className="h-5">
                    Does This Product Have Trademark Letter From Original Vendor
                  </Typography>
                </Grid>
                {mainFormData.tradeMarkCheck && (
                  <Grid item md={12}>
                    <SimpleDropdownComponent
                      label="Choose Documents"
                      list={trademarkList}
                      id="b2bdocument"
                      size="small"
                      value={mainFormData.b2bdocument}
                      onDropdownSelect={(value) => {
                        handleDropdownChange(value, "b2bdocument");
                      }}
                      inputlabelshrink
                      placeholder="Eg:B2B"
                    />
                    <Typography className="h-6 color-gray ms-1">
                      Check The Brands That Need Trademarks Auth To Sell Across
                      India <span className="color-red">*</span>
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </div>
          </Box>
          <Box className=" d-flex flex-column w-60p">
            <Box className="d-flex w-100 ">
              <Box className="w-200px p-2">
                <Grid container className="">
                  {tabsLists.map((item, index) => {
                    return (
                      <Grid
                        item
                        key={index}
                        md={12}
                        className={`cursor-pointer text-center py-1 rounded my-1 fs-14 ${
                          activeTab === index
                            ? "bg-orange color-white"
                            : "bg-light-gray"
                        }`}
                      >
                        {item.title}
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
              <Box className="p-3 w-100 mnh-75vh mxh-75vh overflow-y-scroll">
                {tabsLists.map((item, ind) => {
                  return activeTab === ind ? item.component : null;
                })}
              </Box>
            </Box>
            <Box className="d-flex justify-content-end me-3 mb-1">
              <ButtonComponent
                label="Clear"
                variant="outlined"
                size="small"
                onBtnClick={() => {
                  setFormData({
                    mainform: {
                      commision_mode: "",
                      product_type: "",
                      brand: "",
                      short_description: {
                        media: [],
                        text: "",
                      },
                      long_description: {
                        media: [],
                        text: "",
                      },
                      sub_category_id: "",
                      tags: "",
                      limit_per_order: "",
                      selectb2binvoice: "",
                    },
                    inventory: {
                      sku: "",
                      stock_status: {},
                      allow_backorders: {},
                      stock_qty: "",
                      back_Orders: "",
                      shipping_class: "",
                      product_title: "",
                      business_processing_days: {},
                      seo_title: "",
                      meta_description: "",
                      meta_keyword: [],
                    },
                    linked: {
                      upSells: "",
                      crossSells: "",
                    },
                    pricing: {
                      sale_price: "",
                      mrp: "",
                      return_order_accepted: false,
                      cash_on_accepted: "",
                      product_weight: "",
                      length: "",
                      width: "",
                      height: "",
                      delivery_charge: "",
                    },
                    policy: {},
                    grouped: {},
                    variation: {},
                    attribute: {},
                  });
                  setMainFormData({
                    commision_mode: {},
                    product_type: "",
                    brand: "",
                    short_description: {
                      media: [],
                      text: "",
                    },
                    long_description: {
                      media: [],
                      text: "",
                    },
                    sub_category_id: {},
                    tags: {},
                    limit_per_order: "",
                  });
                }}
                muiProps="me-2"
              />
              {activeTab !== 0 ? (
                <ButtonComponent
                  label="Previous"
                  variant="outlined"
                  size="small"
                  onBtnClick={() => {
                    setactiveTab((prev) => prev - 1);
                  }}
                  muiProps="me-2"
                />
              ) : null}
              <ButtonComponent
                label={activeTab === tabsList.length ? "Submit" : "Next"}
                size="small"
                onBtnClick={
                  activeTab === tabsLists.length
                    ? () => {
                        const temp = formsRef?.current?.handleSendFormData();
                        setFormData((prev) => {
                          const flag = formsRef.current.validate();
                          if (flag) {
                            const data = { ...prev, [temp[0]]: temp[1] };
                            handleSubmitClick(data);
                            return data;
                          }
                        });
                      }
                    : handleNextClick
                }
              />
            </Box>
          </Box>
          {showFileUploadModal ? (
            <FileUploadModal
              showModal={showFileUploadModal}
              setShowModal={setShowFileUploadModal}
            />
          ) : null}
        </Box>
      ) : (
        <GroupVariationForm
          formData={formData}
          ref={formsRef}
          setShowGroupVariant={setShowGroupVariant}
        />
      )}
      <ModalComponent
        open={openModal}
        ModalTitle="Create Tag"
        titleClassName="color-orange fs-14"
        footerPadding="py-3 pe-2"
        footerClassName="d-flex justify-content-start flex-row-reverse border-top mt-3"
        saveBtnClassName="px-4 ms-2"
        clearBtnClassName="px-4"
        saveBtnText="Submit"
        ClearBtnText="Cancel"
        onCloseIconClick={() => {
          setOpenModal(false);
        }}
        onClearBtnClick={() => {
          setOpenModal(false);
        }}
        onSaveBtnClick={handleTagSubmit}
      >
        <Box className="mt-4 w-75 mx-auto">
          <InputBox
            variant="standard"
            onInputChange={(e) => {
              setTagInputValue(e.target.value);
            }}
            placeholder="Tag Name"
            value={tagInputValue}
            error={tagInputError !== ""}
            helperText={tagInputError}
          />
        </Box>
      </ModalComponent>
      {showCategoryModal && (
        <ModalComponent
          open={showCategoryModal}
          onCloseIconClick={() => {
            handleCategoryModalClose();
          }}
          ModalTitle=""
          headerBorder=""
          showPositionedClose
          showCloseIcon={false}
          footerClassName="justify-content-end"
          saveBtnText="Submit"
          ClearBtnText="Close"
          ModalWidth={700}
          onClearBtnClick={() => {
            handleCategoryModalClose();
          }}
          onSaveBtnClick={() => {
            handleCategorySubmitClick();
          }}
        >
          <Box>
            <Box className="d-flex align-items-center">
              <Typography className="h-5">Category Name : &nbsp;</Typography>
              <Typography className="h-5 fw-bold">
                {mainFormData.category.value.toUpperCase()}
              </Typography>
            </Box>
            <Grid container spacing={2} className="my-2">
              <Grid item md={6}>
                <SimpleDropdownComponent
                  list={setsData}
                  size="small"
                  placeholder="Select Sets"
                  label="Select Sets"
                  inputlabelshrink
                  value={mainFormData.setsValue}
                  onDropdownSelect={(value) => {
                    handleDropdownChange(value, "setsValue");
                  }}
                />
              </Grid>
              <Grid item md={6}>
                <SimpleDropdownComponent
                  list={subCategoryData}
                  size="small"
                  placeholder="Select Sub-Category"
                  label="Select Sub-Category"
                  inputlabelshrink
                  value={mainFormData.subCategoryValue}
                  onDropdownSelect={(value) => {
                    handleDropdownChange(value, "subCategoryValue");
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </ModalComponent>
      )}
    </>
  );
};
export default ProductsLayout;
