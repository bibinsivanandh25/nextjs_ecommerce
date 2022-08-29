/* eslint-disable no-unused-vars */
/* eslint-disable default-case */
/* eslint-disable no-shadow */
/* eslint-disable no-new */
/* eslint-disable no-undef */
/* eslint-disable consistent-return */
/* eslint-disable react/no-array-index-key */
import { Box, Grid, Typography } from "@mui/material";
import ImageCard from "components/atoms/ImageCard";
import { useEffect, useState } from "react";
import SimpleDropdownComponent from "components/atoms/SimpleDropdownComponent";
import ButtonComponent from "components/atoms/ButtonComponent";
import InputBox from "components/atoms/InputBoxComponent";
import TextAreaComponent from "components/atoms/TextAreaComponent";
import FileUploadModal from "components/atoms/FileUpload";
import { useRouter } from "next/router";
import EditIcon from "@mui/icons-material/Edit";
import { getBase64 } from "services/utils/functionUtils";
import serviceUtil from "services/utils";
import { useUserInfo } from "services/hooks";
import {
  getSet,
  getSubCategory,
  saveMediaFile,
  saveProduct,
} from "services/supplier/AddProducts";
import validateMessage from "constants/validateMessages";
import toastify from "services/utils/toastUtils";
import GroupVariationForm from "../newCollections/VariationForm/groupvariations";
import ModalComponent from "@/atoms/ModalComponent";
import CheckBoxComponent from "@/atoms/CheckboxComponent";
import RadiobuttonComponent from "@/atoms/RadiobuttonComponent";
import MultiSelectComponent from "@/atoms/MultiSelectComponent";
import { validateMainForm, validateProductImg } from "./validation";

const ProductsLayout = ({
  zonepagetabs = [], // Zone Charges page
  formData = {},
  setFormData = () => {},
  tabsList = [],
  formsRef = null,
  showGroupVariant = false,
  schema = {},
  type = "simple",
}) => {
  const router = useRouter();
  const userInfo = useUserInfo();

  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [tabsLists, setTabsLists] = useState([...tabsList]);
  const [activeTab, setactiveTab] = useState(0);
  const [categoryData, setcategoryData] = useState([]);
  const [tagValues, setTagValues] = useState([]);
  const [tagInputValue, setTagInputValue] = useState([]);
  const [b2bList, setb2bList] = useState([]);
  const [showFileUploadModal, setShowFileUploadModal] = useState("");
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [setsData, setSetsData] = useState([]);
  const [trademarkList, setTradeMarkList] = useState([]);
  const [categoryModalErr, setcategoryModalErr] = useState({
    setsValue: "",
    subCategoryValue: "",
  });
  const [createTagModal, setcreateTagModal] = useState(false);
  const [tagInputError, setTagInputError] = useState("");
  const [errorObj, setErrObj] = useState({});

  useEffect(() => {
    if (formData?.mainForm?.category?.value === "electronics") {
      setTabsLists([...tabsList, ...zonepagetabs]);
    } else {
      setTabsLists([...tabsList]);
    }
  }, [formData?.mainForm?.category]);

  const saveTag = async (payload) => {
    await serviceUtil
      .post("/products/product-tag", payload)
      .then((res) => {
        toastify(res.data.message, "success");
        setTagInputValue("");
        setcreateTagModal(false);
      })
      .catch((err) => {
        toastify(err.response.data.message, "error");
      });
  };

  useEffect(() => {
    setTabsLists(tabsList);
  }, [tabsList]);

  const getTags = () => {
    serviceUtil
      .get("products/product-tag")
      .then((res) => {
        const { data } = res.data;
        const temp = [];
        data.forEach((item) => {
          temp.push({
            id: item.tagId,
            title: item.tagName,
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
        setcategoryData(finaData);
      })
      .catch(() => {});
  };
  const getB2BTradmarkValues = (type) => {
    serviceUtil
      .get(
        `products/supplier/product/trademark-invoice-dropdown?documentType=${type}&supplierId=${userInfo.id}`
      )
      .then((res) => {
        if (type === "B2B_INVOICE") {
          setb2bList(() => {
            return res.data.data.map((item) => {
              return {
                id: item.trademarkInvoiceId,
                value: item.trademarkInvoiceId,
                title: item.documentName,
              };
            });
          });
        } else {
          setTradeMarkList(() => {
            return res.data.data.map((item) => {
              return {
                id: item.trademarkInvoiceId,
                value: item.trademarkInvoiceId,
                title: item.documentName,
              };
            });
          });
        }
      })
      .catch(() => {});
  };

  const getSets = async () => {
    const { data } = await getSet(formData?.mainForm?.category.id);
    if (data) {
      const finaData = [];
      data.data.forEach((item) => {
        finaData.push({
          id: item.categorySetId,
          value: item.setName,
          label: item.setName,
        });
      });
      setSetsData(finaData);
    }
  };
  const getSubCategoryList = async () => {
    const { data } = await getSubCategory(formData?.mainForm?.setsValue.id);
    if (data) {
      const finaData = [];
      data.data.forEach((item) => {
        finaData.push({
          id: item.subCategoryId,
          value: item.subCategoryName,
          label: item.subCategoryName,
        });
      });
      setSubCategoryData(finaData);
    }
  };

  useEffect(() => {
    getTags();
    getSelectCategoryData();
    getB2BTradmarkValues("B2B_INVOICE");
  }, []);

  useEffect(() => {
    if (formData?.mainForm?.category?.value) {
      getSets();
    }
  }, [formData?.mainForm?.category]);

  useEffect(() => {
    if (formData?.mainForm?.setsValue?.value) {
      getSubCategoryList();
    }
  }, [formData?.mainForm?.setsValue]);

  const handleNextClick = () => {
    const { errObj, flag } = validateMainForm(formData.mainForm);
    const productImgFlag =
      type === "simple" ? validateProductImg(formData.productImage) : false;
    const formFlag = formsRef.current.validate();
    if (flag || formFlag || productImgFlag) {
      setErrObj(errObj);
      const element = document.getElementById(Object.keys(errObj)[0]);
      if (element) {
        element.scrollIntoView();
      }
    } else {
      setErrObj({});
      setactiveTab((prev) => prev + 1);
    }
  };

  const handleInputChange = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        mainForm: {
          ...prev.mainForm,
          [e.target.id]: e.target.value,
        },
      };
    });
  };
  const handleDropdownChange = (value, key) => {
    setFormData((prev) => {
      return {
        ...prev,
        mainForm: {
          ...prev.mainForm,
          [key]: value,
        },
      };
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

  const handleCategorySubmitClick = () => {
    const errObj = {
      setsValue: "",
      subCategoryValue: "",
    };
    let flag = false;
    if (!Object.keys(formData?.mainForm?.setsValue).length) {
      errObj.setsValue = validateMessage.field_required;
      flag = true;
    }
    if (!Object.keys(formData?.mainForm?.subCategoryValue).length) {
      errObj.subCategoryValue = validateMessage.field_required;
      flag = true;
    }
    setcategoryModalErr(errObj);
    if (!flag) {
      setShowCategoryModal(false);
    }
  };
  const user = useUserInfo();

  const saveimg = (type, imgList) => {
    return saveMediaFile(user.id, imgList).then((res) => {
      if (!res.error) {
        return { [`${type}`]: res.data };
      }
    });
  };

  const createPayload = async () => {
    const promiseAll = [];
    promiseAll.push(saveimg("productImage", formData.productImage));
    if (formData.mainForm.short_description?.media?.length) {
      promiseAll.push(
        saveimg("short_description", formData.mainForm.short_description.media)
      );
    }
    if (formData.mainForm.long_description?.media?.length) {
      promiseAll.push(
        saveimg("long_description", formData.mainForm.long_description.media)
      );
    }
    if (formData.policy.cancellationPolicy?.media?.binaryStr?.length) {
      promiseAll.push(
        saveimg(
          "cancellationPolicy",
          formData.policy.cancellationPolicy.media.binaryStr
        )
      );
    }
    if (formData.policy.refundPolicy?.media?.binaryStr?.length) {
      promiseAll.push(
        saveimg("refundPolicy", formData.policy.refundPolicy.media.binaryStr)
      );
    }
    if (formData.policy.shippingPolicy?.media?.binaryStr?.length) {
      promiseAll.push(
        saveimg(
          "shippingPolicy",
          formData.policy.shippingPolicy.media.binaryStr
        )
      );
    }
    const temp = await Promise.all(promiseAll);
    const imgdata = {};
    temp.forEach((ele) => {
      imgdata[`${Object.keys(ele)[0]}`] = ele[`${Object.keys(ele)[0]}`];
    });

    const getvariationProperty = () => {
      const temp = ["countryOfOrigin", "others", "expiryDate"];
      const variationProperty = [];
      Object.keys(formData.variation).forEach((item) => {
        if (!temp.includes(item)) {
          variationProperty.push({
            variationId: item,
            optionId: formData.variation[item],
            variationType: formData.attribute[item][0]?.variationType,
          });
        }
      });
      return variationProperty;
    };

    const payload = {
      brand: formData.mainForm.brand,
      longDescription: formData.mainForm.long_description.text,
      longDescriptionFileUrls: imgdata.long_description,
      shortDescription: formData.mainForm.short_description.text,
      shortDescriptionFileUrls: imgdata.short_description,
      subCategoryId: formData.mainForm.subCategoryValue.id,
      subCategoryName: formData.mainForm.subCategoryValue.label,
      commissionMode: formData.mainForm.commision_mode,
      tags: formData.mainForm.tags.length
        ? formData.mainForm.tags.map((item) => {
            return item.id;
          })
        : [],
      limitsPerOrder: parseInt(formData.mainForm.limit_per_order, 10),
      trademarkLetterIdList: formData.mainForm.b2bdocument.length
        ? formData.mainForm.b2bdocument.map((item) => {
            return item.id;
          })
        : [],
      bTobInvoiceIdList: formData.mainForm.selectb2binvoice.length
        ? formData.mainForm.selectb2binvoice.map((item) => {
            return item.id;
          })
        : [],
      isGenericProduct: formData.mainForm.genericradio,

      linkedProducts: {
        upSells: formData.linked.upSells.value,
        crossSells: formData.linked.crossSells.value,
      },

      productPolicies: {
        policyTabLabel: formData.policy.policyTabLabel,
        shippingPolicy: formData.policy.shippingPolicy.text,
        shippingPolicyMediaUrls: imgdata?.shippingPolicy ?? [],
        refundPolicy: formData.policy.refundPolicy.text,
        refundPolicyMediaUrls: imgdata?.refundPolicy ?? [],
        cancellationPolicy: formData.policy.cancellationPolicy.text,
        cancellationPolicyMediaUrls: imgdata?.cancellationPolicy ?? [],
        warrantyAvailable: formData.policy.warranty,
        warrantyPeriod: Object.keys(formData.policy.warrantyperiod).length
          ? parseInt(formData.policy.warrantyperiod.value, 10) * 30
          : null,
      },

      productVariations: [
        {
          productTitle: formData.inventory.product_title,
          shippingClass: formData.inventory.shipping_class.value,
          businessProcessingDays:
            formData.inventory.business_processing_days.value,
          seoTitle: formData.inventory.seo_title,
          metaDescription: formData.inventory.meta_description,
          metaKeywords: formData.inventory.meta_keyword.join(),
          isStoreFDR: formData.pricing.freeDeliveryCheckbox,
          salePriceWithLogistics: parseInt(
            formData.pricing.sale_price_logistics,
            10
          ),
          rtoAccepted: formData.pricing.return_order_accepted,
          rtoDays: formData.pricing.returnorder.value,
          codAvailable: formData.pricing.cash_on_accepted,
          deliveryCharge: formData.pricing.delivery_charge,
          packageLength: parseFloat(formData.pricing.length),
          packageWidth: parseFloat(formData.pricing.width),
          packageHeight: parseFloat(formData.pricing.height),
          weightInclusivePackage: parseFloat(formData.pricing.product_weight),
          salePrice: parseInt(formData.pricing.sale_price, 10),
          mrp: parseInt(formData.pricing.mrp, 10),
          stockQty: parseInt(formData.inventory.stockqty, 10),
          modelName: formData.inventory.modelname,
          sellWithMrMrsCart: formData.mrMrsCartFormData.sellwithus,
          mrmrscartSalePriceWithFDR: formData.mrMrsCartFormData.free_delivery,
          mrmrscartSalePriceWithOutFDR:
            formData.mrMrsCartFormData.paid_delivery,
          mrmrscartRtoAccepted: formData.mrMrsCartFormData.return,
          mrmrscartRtoDays: formData.mrMrsCartFormData.returnorder.id,
          mrmrscartCodAvailable: formData.mrMrsCartFormData.cashondelivery,
          stockStatus: formData.inventory.stock_status.label,
          allowBackOrders: formData.inventory?.allow_backorders?.label ?? "",
          backOrders: parseInt(formData.inventory.back_Orders, 10) || 0,
          variationMedia: imgdata.productImage,
          variationProperty: getvariationProperty(),
        },
      ],

      otherInformation: {},
      zoneChargeInfo: {},
      productType: "SIMPLE_PRODUCT",
      supplierId: userInfo.id,
    };
    const { data, err } = await saveProduct(payload);
    if (err) {
      toastify(err.response.data.message, "error");
    } else if (data) {
      toastify(data.message, "success");
      router.replace("/supplier/products&inventory/myproducts");
    }
  };

  const handleSubmit = () => {
    const { errObj, flag } = validateMainForm(formData.mainForm);
    if (
      flag ||
      validateProductImg(formData.productImage) ||
      formsRef.current.validate()
    ) {
      setErrObj(errObj);
    } else {
      setErrObj({});
      createPayload();
    }
  };

  return (
    <>
      {!showGroupVariant ? (
        <Box className="d-flex flex-grow-1 flex-row">
          {type === "simple" && (
            <Box className="border-end p-2 py-2 fit-content pb-0 overflow-y-scroll mxh-75vh">
              {formData.productImage.length > 0
                ? formData.productImage.map((item, index) => (
                    <ImageCard
                      key={index}
                      imgSrc={item}
                      handleCloseClick={() => {
                        setFormData((prev) => {
                          const temp = JSON.parse(
                            JSON.stringify(prev.productImage)
                          );
                          temp.splice(index, 1);
                          return { ...prev, productImage: temp };
                        });
                      }}
                      className="mx-3"
                    />
                  ))
                : null}
              {formData.productImage.length < 5 ? (
                <ImageCard
                  showClose={false}
                  handleImageUpload={async (e) => {
                    if (e.target.files.length) {
                      if (e.target.files[0].size <= 1000000) {
                        const file = await getBase64(e.target.files[0]);
                        setFormData((prev) => {
                          return {
                            ...prev,
                            productImage: [...prev.productImage, file],
                          };
                        });
                      } else {
                        toastify("Image size should be less than 1MB", "error");
                      }
                    }
                  }}
                  className="mx-3"
                  imgSrc=""
                />
              ) : null}
            </Box>
          )}
          <Box className="border-end p-2 w-30p mxh-75vh overflow-y-scroll">
            <div className="px-2">
              <Grid container spacing={2}>
                <Grid item md={12}>
                  <InputBox
                    id="brand"
                    label="Brand*"
                    onInputChange={(e) => {
                      setFormData((prev) => {
                        return {
                          ...prev,
                          mainForm: {
                            ...prev.mainForm,
                            [e.target.id]: e.target.value.toUpperCase(),
                          },
                        };
                      });
                    }}
                    value={formData?.mainForm?.brand}
                    placeholder="Enter Brand"
                    inputlabelshrink
                    error={errorObj.brand && errorObj.brand !== ""}
                    helperText={errorObj.brand ?? ""}
                  />
                </Grid>
                <Grid item md={12}>
                  <TextAreaComponent
                    legend="Short Description*"
                    placeholder="Enter short description"
                    id="short_description"
                    onChange={(e) => {
                      setFormData((prev) => {
                        return {
                          ...prev,
                          mainForm: {
                            ...prev.mainForm,
                            short_description: {
                              ...prev.mainForm.short_description.media,
                              text: e.target.value,
                            },
                          },
                        };
                      });
                    }}
                    value={formData?.mainForm?.short_description.text}
                    onBtnClick={() => {
                      setShowFileUploadModal("short_description");
                    }}
                    btnLabel="Add Media"
                    btnSize="small"
                    btnVariant="outlined"
                    widthClassName="w-100 mt-0"
                    rows={2}
                    muiProps="m-0 p-0 fs-10"
                    error={
                      errorObj?.short_description?.text &&
                      errorObj?.short_description?.text !== ""
                    }
                    helperText={errorObj?.short_description?.text ?? ""}
                  />
                </Grid>
                <Grid item md={12}>
                  <TextAreaComponent
                    id="long_description"
                    legend="Long Description*"
                    value={formData?.mainForm?.long_description.text}
                    placeholder="Enter long description"
                    onChange={(e) => {
                      setFormData((prev) => {
                        return {
                          ...prev,
                          mainForm: {
                            ...prev.mainForm,
                            long_description: {
                              ...prev.mainForm.long_description.media,
                              text: e.target.value,
                            },
                          },
                        };
                      });
                    }}
                    onBtnClick={() => {
                      setShowFileUploadModal("long_description");
                    }}
                    btnLabel="Add Media"
                    btnSize="small"
                    btnVariant="outlined"
                    widthClassName="w-100 mt-0"
                    rows={3}
                    muiProps="m-0 p-0 fs-10"
                    error={
                      errorObj?.long_description?.text &&
                      errorObj?.long_description?.text !== ""
                    }
                    helperText={errorObj?.long_description?.text}
                  />
                </Grid>
                <Grid item md={12}>
                  <SimpleDropdownComponent
                    list={categoryData}
                    id="category"
                    label="Select Category*"
                    size="small"
                    inputlabelshrink
                    error={errorObj.category && errorObj.category !== ""}
                    helperText={errorObj.category ?? ""}
                    onDropdownSelect={(value) => {
                      if (value) {
                        setShowCategoryModal(true);
                        setFormData((prev) => ({
                          ...prev,
                          mainForm: {
                            ...prev.mainForm,
                            category: value,
                            setsValue: {},
                            subCategoryValue: {},
                            commision_mode: value?.commission_mode
                              ? value.commission_mode
                              : "",
                          },
                        }));
                      } else {
                        setFormData((prev) => ({
                          ...prev,
                          mainForm: {
                            ...prev.mainForm,
                            category: {},
                            setsValue: {},
                            subCategoryValue: {},
                            commision_mode: "",
                          },
                        }));
                        setSubCategoryData([]);
                        setSetsData([]);
                      }
                    }}
                    value={formData?.mainForm?.category}
                    placeholder="Select Category"
                  />
                  {formData?.mainForm?.category &&
                  Object.keys(formData?.mainForm?.category).length ? (
                    <Typography
                      className="h-6 mt-1 cursor-pointer color-blue d-inline"
                      onClick={() => {
                        setShowCategoryModal(true);
                      }}
                    >
                      Edit sub-category <EditIcon className="ms-1 h-5" />
                    </Typography>
                  ) : null}
                </Grid>
                <Grid item md={12}>
                  <InputBox
                    id="commisionmode"
                    label="Commision Mode*"
                    value={formData?.mainForm?.commision_mode}
                    placeholder="Commission Mode"
                    inputlabelshrink
                    disabled
                  />
                </Grid>
                <Grid item md={12}>
                  <MultiSelectComponent
                    list={tagValues}
                    id="tags"
                    label="Tags*"
                    size="small"
                    value={formData?.mainForm?.tags}
                    placeholder="Select tags"
                    error={errorObj.tags && errorObj.tags !== ""}
                    helperText={errorObj.tags ?? ""}
                    onSelectionChange={(e, val) => {
                      setFormData((prev) => ({
                        ...prev,
                        mainForm: {
                          ...prev.mainForm,
                          tags: val,
                        },
                      }));
                    }}
                  />
                </Grid>
                <Grid item md={12}>
                  <div className="d-flex justify-content-end">
                    <ButtonComponent
                      label="Create tag"
                      variant="outlined"
                      size="small"
                      onBtnClick={() => {
                        setcreateTagModal(true);
                      }}
                      muiProps="m-0 p-0 fs-10"
                    />
                  </div>
                </Grid>
                <Grid item md={12}>
                  <InputBox
                    id="limit_per_order"
                    label="Limits Per Order*"
                    onInputChange={handleInputChange}
                    value={formData?.mainForm?.limit_per_order}
                    inputlabelshrink
                    type="number"
                    error={
                      errorObj.limit_per_order &&
                      errorObj.limit_per_order !== ""
                    }
                    helperText={errorObj.limit_per_order ?? ""}
                    placeholder="Enter the order limit(eg.: 1)"
                  />
                </Grid>
                <Grid item md={12}>
                  <MultiSelectComponent
                    list={b2bList}
                    id="selectb2binvoice"
                    label="Select B2B Invoice"
                    placeholder="Select B2B Invoice"
                    size="small"
                    value={formData?.mainForm?.selectb2binvoice}
                    onSelectionChange={(e, val) => {
                      setFormData((prev) => ({
                        ...prev,
                        mainForm: {
                          ...prev.mainForm,
                          selectb2binvoice: val,
                        },
                      }));
                    }}
                  />
                </Grid>
                <Grid item md={12}>
                  <Typography className="h-5 fw-bold">
                    Is It a Brand or Generic Product?
                  </Typography>
                  <RadiobuttonComponent
                    label="Branded"
                    isChecked={formData?.mainForm?.brandradio}
                    onRadioChange={() => {
                      setFormData((prev) => ({
                        ...prev,
                        mainForm: {
                          ...prev.mainForm,
                          brandradio: true,
                          genericradio: false,
                        },
                      }));
                    }}
                    size="small"
                  />
                  <RadiobuttonComponent
                    size="small"
                    label="Generic"
                    isChecked={formData?.mainForm?.genericradio}
                    onRadioChange={() => {
                      setFormData((prev) => ({
                        ...prev,
                        mainForm: {
                          ...prev.mainForm,
                          brandradio: false,
                          genericradio: true,
                        },
                      }));
                    }}
                  />
                </Grid>
                <Grid item md={12} display="flex" alignItems="center">
                  <CheckBoxComponent
                    label=""
                    size="small"
                    isChecked={formData?.mainForm?.tradeMarkCheck}
                    checkBoxClick={() => {
                      if (!formData.mainForm.tradeMarkCheck.tradeMarkCheck) {
                        getB2BTradmarkValues("TRADEMARK_LETTER");
                      }
                      setFormData((prev) => ({
                        ...prev,
                        mainForm: {
                          ...prev.mainForm,
                          tradeMarkCheck: !prev.mainForm.tradeMarkCheck,
                        },
                      }));
                    }}
                    labelColor="#535353"
                    lableFontSize="h-5"
                    varient="filled"
                    showIcon
                    isDisabled={formData?.mainForm?.genericradio}
                  />
                  <Typography className="h-5" sx={{ marginLeft: "-20px" }}>
                    Does This Product Have Trademark Letter From Original Vendor
                  </Typography>
                </Grid>
                {formData?.mainForm?.tradeMarkCheck && (
                  <Grid item md={12}>
                    <MultiSelectComponent
                      label="Choose Documents"
                      placeholder={
                        formData?.mainForm?.b2bdocument.length
                          ? ""
                          : "Choose Documents"
                      }
                      list={trademarkList}
                      id="b2bdocument"
                      size="small"
                      value={formData?.mainForm?.b2bdocument}
                      onSelectionChange={(e, val) => {
                        setFormData((prev) => ({
                          ...prev,
                          mainForm: {
                            ...prev.mainForm,
                            b2bdocument: val,
                          },
                        }));
                      }}
                    />
                    <Typography className="h-6 ms-1 color-blue">
                      Check The Brands That Need Trademarks Auth To Sell Across
                      India <span className="color-red">*</span>
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </div>
          </Box>
          <Box className=" d-flex flex-column flex-grow-1 w-60p">
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
                  const getKey = (ind) => {
                    switch (ind) {
                      case 0:
                        return "inventory";
                      case 1:
                        return "pricing";
                      case 2:
                        return "linked";
                      case 3:
                        return "policy";
                      case 4:
                        return "attribute";
                      case 5:
                        return "variation";
                      case 6:
                        return "mrMrsCartFormData";
                    }
                  };
                  formsRef.current.clearPage();
                  const key = getKey(activeTab);
                  setFormData((pre) => ({
                    ...pre,
                    [key]: schema[key],
                  }));
                }}
                muiProps="me-2"
              />
              <ButtonComponent
                label="Clear All"
                variant="outlined"
                size="small"
                onBtnClick={() => {
                  formsRef.current.clearPage();
                  setFormData(schema);
                  setErrObj({});
                  setactiveTab(0);
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
                label={activeTab === tabsList.length - 1 ? "Submit" : "Next"}
                size="small"
                onBtnClick={
                  activeTab === tabsLists.length - 1
                    ? handleSubmit
                    : handleNextClick
                }
              />
            </Box>
          </Box>
          {showFileUploadModal !== "" ? (
            <FileUploadModal
              maxFileSize={4e6}
              showModal={showFileUploadModal !== ""}
              setShowModal={setShowFileUploadModal}
              getUploadedFiles={(val) => {
                setFormData((pre) => ({
                  ...pre,
                  mainForm: {
                    ...pre.mainForm,
                    [showFileUploadModal]: {
                      ...pre.mainForm[`${showFileUploadModal}`],
                      media: val.binaryStr,
                    },
                  },
                }));
              }}
              value={
                showFileUploadModal === "short_description"
                  ? {
                      binaryStr:
                        formData.mainForm.short_description.media ?? [],
                    }
                  : {
                      binaryStr:
                        formData?.mainForm?.long_description?.media ?? [],
                    }
              }
            />
          ) : null}
        </Box>
      ) : (
        <GroupVariationForm
          formData={formData}
          ref={formsRef}
          // setShowGroupVariant={setShowGroupVariant}
          // imagedata={imagedata}
          // short_descriptionImg={short_descriptionImg}
          // long_descriptionImg={long_descriptionImg}
        />
      )}
      <ModalComponent
        open={createTagModal}
        ModalTitle="Create Tag"
        titleClassName="color-orange fs-14"
        footerPadding="py-3 pe-2"
        footerClassName="d-flex justify-content-start flex-row-reverse border-top mt-3"
        saveBtnClassName="px-4 ms-2"
        clearBtnClassName="px-4"
        saveBtnText="Submit"
        ClearBtnText="Cancel"
        onCloseIconClick={() => {
          setcreateTagModal(false);
          setTagInputError("");
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
            setShowCategoryModal(false);
          }}
          ModalTitle=""
          headerBorder=""
          showPositionedClose
          showCloseIcon={false}
          footerClassName="justify-content-end"
          saveBtnText="Submit"
          ModalWidth={700}
          showClearBtn={false}
          onSaveBtnClick={() => {
            handleCategorySubmitClick();
          }}
        >
          <Box>
            <Box className="d-flex align-items-center">
              <Typography className="h-5">Category Name : &nbsp;</Typography>
              <Typography className="h-5 fw-bold">
                {formData.mainForm.category.value.toUpperCase()}
              </Typography>
            </Box>
            <Grid container spacing={2} className="my-2">
              <Grid item md={6}>
                <SimpleDropdownComponent
                  list={setsData}
                  size="small"
                  placeholder="Select Sets"
                  label="Select Sets*"
                  inputlabelshrink
                  value={formData?.mainForm?.setsValue}
                  onDropdownSelect={(value) => {
                    handleDropdownChange(value, "setsValue");
                    if (!value) {
                      handleDropdownChange({}, "subCategoryValue");
                      setSubCategoryData([]);
                    }
                  }}
                />
              </Grid>
              <Grid item md={6}>
                <SimpleDropdownComponent
                  list={subCategoryData}
                  size="small"
                  placeholder="Select Sub-Category"
                  label="Select Sub-Category*"
                  inputlabelshrink
                  value={formData?.mainForm?.subCategoryValue}
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
