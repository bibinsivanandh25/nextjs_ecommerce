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
import { getBase64 } from "services/utils/functionUtils";
import validateMessage from "constants/validateMessages";
import toastify from "services/utils/toastUtils";
import FileUploadModal from "components/atoms/FileUpload";
import { useUserInfo } from "services/hooks";
import serviceUtil from "services/utils";
import {
  getSet,
  getSubCategory,
  saveMedia,
  saveProduct,
} from "services/supplier/AddProducts";
import { useRouter } from "next/router";
import EditIcon from "@mui/icons-material/Edit";
import MultiSelectComponent from "@/atoms/MultiSelectComponent";
import GroupVariationForm from "../newCollections/VariationForm/groupvariations";
import ModalComponent from "@/atoms/ModalComponent";
import CheckBoxComponent from "@/atoms/CheckboxComponent";
import RadiobuttonComponent from "@/atoms/RadiobuttonComponent";

const ProductsLayout = ({
  zonepagetabs = [], // Zone Charges page
  formData = {},
  setFormData = () => {},
  tabsList = [],
  formsRef = null,
  showGroupVariant = false,
  setShowGroupVariant = () => {},
}) => {
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [tabsLists, setTabsLists] = useState([...tabsList]);
  const [imagedata, setImageData] = useState([]);
  const [activeTab, setactiveTab] = useState(0);
  const [showFileUploadModal, setShowFileUploadModal] = useState("");
  const [mainFormData, setMainFormData] = useState({
    commision_mode: null,
    product_type: "",
    brand: "",
    short_description: {
      media: {},
      text: "",
    },
    long_description: {
      media: {},
      text: "",
    },
    sub_category_id: "",
    tags: [],
    limit_per_order: "",
    selectb2binvoice: [],
    tradeMarkCheck: false,
    category: null,
    brandradio: true,
    genericradio: false,
    b2bdocument: [],
    b2bdocumentfile: [],
    setsValue: null,
    subCategoryValue: null,
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
    category: "",
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
  const [modalErrObj, setModalErrObj] = useState({});
  // const [imgUrls, setImgUrls] = useState({});
  const [short_descriptionImg, setshort_descriptionImg] = useState({});
  const [long_descriptionImg, setlong_descriptionImg] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (mainFormData.category?.value === "electronics") {
      setTabsLists([...tabsList, ...zonepagetabs]);
    } else {
      setTabsLists([...tabsList]);
    }
  }, [mainFormData.category]);
  useEffect(() => {
    setFormData((pre) => {
      return {
        ...pre,
        mainFormData,
        short_descriptionImg,
        long_descriptionImg,
      };
    });
  }, [mainFormData, short_descriptionImg, long_descriptionImg]);

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
        if (type === "B2B_INVOICE") {
          setB2bList(() => {
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
  useEffect(() => {
    getTags();
    getSelectCategoryData();
    getB2BTradmarkValues("B2B_INVOICE");
  }, []);

  const getSets = async () => {
    const { data } = await getSet(mainFormData.category.id);
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
    const { data } = await getSubCategory(mainFormData.setsValue.id);
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
    if (mainFormData.category?.value) {
      getSets();
    }
  }, [mainFormData.category]);

  useEffect(() => {
    if (mainFormData.setsValue?.value) {
      getSubCategoryList();
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

    if (mainFormData.selectb2binvoice === null) {
      errObj.selectb2binvoice = validateMessage.field_required;
      flag = true;
    }
    if (
      mainFormData.category === null ||
      Object.keys(mainFormData.category)?.length === 0
    ) {
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
    } else if (mainFormData.short_description.text.length > 90) {
      errObj.short_description.text = validateMessage.alpha_numeric_max_90;
      flag = true;
    }
    if (mainFormData.long_description.text === "") {
      errObj.long_description.text = validateMessage.field_required;
      flag = true;
    } else if (mainFormData.long_description.text.length > 255) {
      errObj.long_description.text = validateMessage.alpha_numeric_max_255;
      flag = true;
    }
    if (!mainFormData.tags.length) {
      errObj.tags = validateMessage.field_required;
      flag = true;
    }
    if (mainFormData.limit_per_order === "") {
      errObj.limit_per_order = validateMessage.field_required;
      flag = true;
    } else if (parseInt(mainFormData.limit_per_order, 10) < 1) {
      errObj.limit_per_order = "Limit per order should be greater then 0";
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
  };
  const handleCategorySubmitClick = () => {
    const errObj = {
      setsValue: "",
      subCategoryValue: "",
    };
    let flag = false;
    if (!Object.keys(mainFormData.setsValue).length) {
      errObj.setsValue = validateMessage.field_required;
      flag = true;
    }
    if (!Object.keys(mainFormData.subCategoryValue).length) {
      errObj.subCategoryValue = validateMessage.field_required;
      flag = true;
    }
    setModalErrObj(errObj);
    if (!flag) {
      handleCategoryModalClose();
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

  const saveimg = (type, imgList) => {
    return saveMedia(imgList).then((res) => {
      if (!res.error) {
        return { [`${type}`]: res.data };
      }
    });
  };

  const createPayload = async () => {
    const multipart = [...imagedata.map((item) => item.multipart)];
    const imgFormData = new FormData();
    const short_description = new FormData();
    const long_description = new FormData();
    const refundPolicy = new FormData();
    const cancellationPolicy = new FormData();
    const shippingPolicy = new FormData();
    const promiseAll = [];
    imgFormData.set("data", {});
    short_description.set("data", {});
    long_description.set("data", {});
    refundPolicy.set("data", {});
    cancellationPolicy.set("data", {});
    shippingPolicy.set("data", {});
    multipart.forEach((item) => {
      imgFormData.append("medias", item);
    });
    promiseAll.push(saveimg("productImage", imgFormData));
    if (short_descriptionImg?.multiPart?.length) {
      short_descriptionImg.multiPart.forEach((item) => {
        short_description.append("medias", item);
      });
      promiseAll.push(saveimg("short_description", short_description));
    }
    if (long_descriptionImg?.multiPart?.length) {
      long_descriptionImg.multiPart.forEach((item) => {
        long_description.append("medias", item);
      });
      promiseAll.push(saveimg("long_description", long_description));
    }
    if (formData?.policy?.returnablemedia?.multiPart?.length) {
      formData?.policy.returnablemedia.multiPart.forEach((item) => {
        refundPolicy.append("medias", item);
      });
      promiseAll.push(saveimg("refundPolicy", refundPolicy));
    }
    if (formData?.policy?.canclemedia?.multiPart?.length) {
      formData?.policy.canclemedia.multiPart.forEach((item) => {
        cancellationPolicy.append("medias", item);
      });
      promiseAll.push(saveimg("cancellationPolicy", cancellationPolicy));
    }
    if (formData?.policy?.shippingmedia?.multiPart?.length) {
      formData?.policy.shippingmedia.multiPart.forEach((item) => {
        shippingPolicy.append("medias", item);
      });
      promiseAll.push(saveimg("shippingPolicy", shippingPolicy));
    }
    const imgdata = await Promise.all(promiseAll);
    const imgData = {};
    imgdata.forEach((ele) => {
      imgData[`${Object.keys(ele)[0]}`] = ele[`${Object.keys(ele)[0]}`];
    });
    // setImgUrls(imgData);
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
      brand: mainFormData.brand,
      longDescription: mainFormData.long_description.text,
      longDescriptionFileUrls: imgData.long_description,
      shortDescription: mainFormData.short_description.text,
      shortDescriptionFileUrls: imgData.short_description,
      subCategoryId: mainFormData.subCategoryValue.id,
      subCategoryName: mainFormData.subCategoryValue.label,
      commissionMode: mainFormData.commision_mode,
      tags: mainFormData.tags.length
        ? mainFormData.tags.map((item) => {
            return item.id;
          })
        : [],
      limitsPerOrder: parseInt(mainFormData.limit_per_order, 10),
      trademarkLetterIdList: mainFormData.b2bdocument.length
        ? mainFormData.b2bdocument.map((item) => {
            return item.id;
          })
        : [],
      bTobInvoiceIdList: mainFormData.selectb2binvoice.length
        ? mainFormData.selectb2binvoice.map((item) => {
            return item.id;
          })
        : [],
      isGenericProduct: mainFormData.genericradio,

      linkedProducts: {
        upSells: formData.linked.upSells.value,
        crossSells: formData.linked.crossSells.value,
      },

      productPolicies: {
        policyTabLabel: formData.policy.policyTabLabel,
        shippingPolicy: formData.policy.shippingPolicy.text,
        shippingPolicyMediaUrls: imgData?.shippingPolicy ?? [],
        refundPolicy: formData.policy.refundPolicy.text,
        refundPolicyMediaUrls: imgData?.refundPolicy ?? [],
        cancellationPolicy: formData.policy.cancellationPolicy.text,
        cancellationPolicyMediaUrls: imgData?.cancellationPolicy ?? [],
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
          rtoDays: formData.pricing.returnorder?.value,
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
          variationMedia: imgData.productImage,
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

  return (
    <>
      {!showGroupVariant ? (
        <Box className="d-flex flex-grow-1 flex-row">
          {!router.pathname.includes("addnewcollection") && (
            <Box className="border-end p-2 py-2 fit-content pb-0 overflow-y-scroll mxh-75vh">
              {imagedata.length > 0
                ? imagedata.map((item, index) => (
                    <ImageCard
                      key={index}
                      imgSrc={item.binary}
                      handleCloseClick={() => {
                        setImageData((prev) => {
                          const temp = [...prev];
                          temp.splice(index, 1);
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
                          return [
                            ...prev,
                            { binary: file, multipart: e.target.files[0] },
                          ];
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
          )}
          <Box className="border-end p-2 w-30p mxh-75vh overflow-y-scroll">
            <div className="px-2">
              <Grid container spacing={2}>
                <Grid item md={12}>
                  <InputBox
                    required
                    id="brand"
                    label="Brand"
                    onInputChange={(e) => {
                      setMainFormData((prev) => {
                        return {
                          ...prev,
                          [e.target.id]: e.target.value.toUpperCase(),
                        };
                      });
                    }}
                    value={mainFormData.brand}
                    placeholder="Enter Brand"
                    inputlabelshrink
                    error={errorObj.brand !== ""}
                    helperText={errorObj.brand}
                  />
                </Grid>
                <Grid item md={12}>
                  <TextAreaComponent
                    required
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
                      setShowFileUploadModal("short_description");
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
                    required
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
                      setShowFileUploadModal("long_description");
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
                    required
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
                      } else {
                        setMainFormData((prev) => ({
                          ...prev,
                          setsValue: {},
                          subCategoryValue: {},
                        }));
                        setSubCategoryData([]);
                        setSetsData([]);
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
                  {mainFormData?.category &&
                  Object.keys(mainFormData?.category).length ? (
                    <Typography
                      className="h-6 mt-1 cursor-pointer color-blue"
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
                    label="Commision Mode"
                    value={mainFormData.commision_mode}
                    placeholder="Commission Mode"
                    inputlabelshrink
                    disabled
                  />
                </Grid>
                <Grid item md={12}>
                  <MultiSelectComponent
                    list={tagValues}
                    id="tags"
                    label="Tags"
                    required
                    size="small"
                    value={mainFormData.tags}
                    error={errorObj.tags !== ""}
                    helperText={errorObj.tags}
                    placeholder="Select tags"
                    onSelectionChange={(a, val) => {
                      setMainFormData((prev) => ({
                        ...prev,
                        tags: [...val],
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
                    required
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
                  <MultiSelectComponent
                    list={b2bList}
                    id="selectb2binvoice"
                    label="Select B2B Invoice"
                    placeholder="Select B2B Invoice"
                    size="small"
                    value={mainFormData.selectb2binvoice}
                    onSelectionChange={(a, val) => {
                      setMainFormData((prev) => ({
                        ...prev,
                        selectb2binvoice: [...val],
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
                        tradeMarkCheck: false,
                        b2bdocument: [],
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
                        b2bdocument: [],
                      }));
                    }}
                    labelColor="#535353"
                    lableFontSize="h-5"
                    varient="filled"
                    showIcon
                    isDisabled={mainFormData?.genericradio}
                  />
                  <Typography className="h-5" sx={{ marginLeft: "-20px" }}>
                    Does This Product Have Trademark Letter From Original Vendor
                  </Typography>
                </Grid>
                {mainFormData.tradeMarkCheck && (
                  <Grid item md={12}>
                    <MultiSelectComponent
                      label="Choose Documents"
                      placeholder="Choose Documents"
                      list={trademarkList}
                      id="b2bdocument"
                      size="small"
                      value={mainFormData.b2bdocument}
                      onSelectionChange={(a, val) => {
                        setMainFormData((prev) => ({
                          ...prev,
                          b2bdocument: [...val],
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
                        className={`text-center fw-bold py-1 rounded my-1 fs-14 ${
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
                  formsRef.current.clearPage();
                }}
                muiProps="me-2"
              />
              <ButtonComponent
                label="Clear All"
                variant="outlined"
                size="small"
                onBtnClick={() => {
                  formsRef.current.clearPage();
                  setFormData({
                    mainform: {
                      commision_mode: null,
                      product_type: "",
                      brand: "",
                      short_description: {
                        media: {},
                        text: "",
                      },
                      long_description: {
                        media: {},
                        text: "",
                      },
                      sub_category_id: "",
                      tags: [],
                      limit_per_order: "",
                      selectb2binvoice: [],
                      tradeMarkCheck: false,
                      category: null,
                      brandradio: true,
                      genericradio: false,
                      b2bdocument: [],
                      b2bdocumentfile: [],
                      setsValue: null,
                      subCategoryValue: null,
                    },
                    inventory: {
                      sku: "",
                      stockqty: "",
                      stock_status: null,
                      allow_backorders: null,
                      stock_qty: "",
                      back_Orders: "",
                      shipping_class: "",
                      product_title: "",
                      business_processing_days: null,
                      seo_title: [],
                      meta_description: "",
                      meta_keyword: [],
                      modalname: "",
                    },
                    linked: {
                      upSells: {},
                      crossSells: {},
                    },
                    pricing: {
                      sale_price: "",
                      mrp: "",
                      return_order_accepted: false,
                      cash_on_accepted: false,
                      product_weight: "",
                      length: "",
                      width: "",
                      height: "",
                      delivery_charge: "",
                      sale_price_logistics: "",
                      returnorder: {},
                    },
                    policy: {
                      policyTabLabel: "",
                      refundPolicy: { media: {}, text: "" },
                      cancellationPolicy: { media: {}, text: "" },
                      shippingPolicy: { media: {}, text: "" },
                      warranty: false,
                      warrantyperiod: {},
                    },
                    grouped: {},
                    variation: {},
                    attribute: {},
                  });
                  setshort_descriptionImg({});
                  setlong_descriptionImg({});
                  setModalErrObj({});
                  setImageData([]);
                  setactiveTab(0);
                  setMainFormData({
                    commision_mode: null,
                    product_type: "",
                    brand: "",
                    short_description: {
                      media: {},
                      text: "",
                    },
                    long_description: {
                      media: {},
                      text: "",
                    },
                    sub_category_id: "",
                    tags: [],
                    limit_per_order: "",
                    selectb2binvoice: [],
                    tradeMarkCheck: false,
                    category: {},
                    brandradio: true,
                    genericradio: false,
                    b2bdocument: [],
                    b2bdocumentfile: [],
                    setsValue: null,
                    subCategoryValue: null,
                  });
                  setErrorObj({
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
                label={activeTab === tabsList.length - 1 ? "Submit" : "Next"}
                size="small"
                onBtnClick={
                  activeTab === tabsLists.length - 1
                    ? () => {
                        if (imagedata.length) {
                          const temp = formsRef?.current?.handleSendFormData();
                          setFormData((prev) => {
                            const flag = formsRef.current.validate();
                            if (flag) {
                              const data = { ...prev, [temp[0]]: temp[1] };
                              createPayload();
                              return data;
                            }
                          });
                        } else {
                          toastify("Add atleast one product image", "error");
                        }
                      }
                    : handleNextClick
                }
              />
            </Box>
          </Box>
          {showFileUploadModal !== "" ? (
            <FileUploadModal
              showModal={showFileUploadModal !== ""}
              setShowModal={setShowFileUploadModal}
              getUploadedFiles={(val) => {
                setMainFormData((pre) => {
                  const temp = JSON.parse(JSON.stringify(pre));
                  temp[`${showFileUploadModal}`].media = JSON.parse(
                    JSON.stringify(val)
                  );
                  return temp;
                });
                if (showFileUploadModal === "short_description") {
                  setshort_descriptionImg(val);
                } else {
                  setlong_descriptionImg(val);
                }
              }}
              type="multipart"
              value={
                showFileUploadModal === "short_description"
                  ? short_descriptionImg
                  : long_descriptionImg
              }
            />
          ) : null}
        </Box>
      ) : (
        <GroupVariationForm
          formData={formData}
          ref={formsRef}
          setShowGroupVariant={setShowGroupVariant}
          imagedata={imagedata}
          short_descriptionImg={short_descriptionImg}
          long_descriptionImg={long_descriptionImg}
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
            handleCategoryModalClose();
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
                  required
                  inputlabelshrink
                  value={mainFormData.setsValue}
                  onDropdownSelect={(value) => {
                    handleDropdownChange(value, "setsValue");
                    if (!value) {
                      handleDropdownChange({}, "subCategoryValue");
                      setSubCategoryData([]);
                    }
                  }}
                  error={modalErrObj.setsValue !== ""}
                  helperText={modalErrObj.setsValue}
                />
              </Grid>
              <Grid item md={6}>
                <SimpleDropdownComponent
                  list={subCategoryData}
                  size="small"
                  placeholder="Select Sub-Category"
                  label="Select Sub-Category"
                  required
                  inputlabelshrink
                  value={mainFormData.subCategoryValue}
                  onDropdownSelect={(value) => {
                    handleDropdownChange(value, "subCategoryValue");
                  }}
                  error={modalErrObj.subCategoryValue !== ""}
                  helperText={modalErrObj.subCategoryValue}
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
