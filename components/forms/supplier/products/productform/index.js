/* eslint-disable no-prototype-builtins */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-nested-ternary */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable default-case */
/* eslint-disable no-shadow */
/* eslint-disable no-new */
/* eslint-disable no-undef */
/* eslint-disable consistent-return */
/* eslint-disable react/no-array-index-key */
import { Box, Grid, Typography } from "@mui/material";
import ImageCard from "components/atoms/ImageCard";
import { useEffect, useMemo, useState } from "react";
import SimpleDropdownComponent from "components/atoms/SimpleDropdownComponent";
import ButtonComponent from "components/atoms/ButtonComponent";
import InputBox from "components/atoms/InputBoxComponent";
// import TextAreaComponent from "components/atoms/TextAreaComponent";
import FileUploadModal from "components/atoms/FileUpload";
import { useRouter } from "next/router";
import EditIcon from "@mui/icons-material/Edit";
import { getBase64 } from "services/utils/functionUtils";
import serviceUtil from "services/utils";
import { useUserInfo } from "services/hooks";
import {
  getSet,
  getSubCategory,
  saveDuplicateProduct,
  saveMediaFile,
  saveProduct,
  updateProduct,
  updateProductByAdmin,
} from "services/supplier/AddProducts";
import validateMessage from "constants/validateMessages";
import toastify from "services/utils/toastUtils";
import { clearProduct } from "features/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import ImageGuidelines from "components/molecule/ImageGuidelines";
import ModalComponent from "@/atoms/ModalComponent";
import CheckBoxComponent from "@/atoms/CheckboxComponent";
import RadiobuttonComponent from "@/atoms/RadiobuttonComponent";
import MultiSelectComponent from "@/atoms/MultiSelectComponent";
import TextEditor from "@/atoms/TextEditor";
import { GrClose } from "react-icons/gr";
import GroupVariationForm from "../newCollections/VariationForm/groupvariations";
import { validateMainForm, validateProductImg } from "./validation";
import Discount from "./Discount";
import OrderSummary from "./OrderSummary";
import MergedProducts from "./MergedProducts";
import Logs from "./Logs";

const ProductsLayout = ({
  zonepagetabs = [], // Zone Charges page
  formData = {},
  setFormData = () => {},
  setShowGroupVariant = () => {},
  closeModal = () => {},
  tabsList = [],
  formsRef = null,
  showGroupVariant = false,
  schema = {},
  type = "simple",
}) => {
  const router = useRouter();
  const userInfo = useUserInfo();
  const { editProduct, viewFlag, adminView, list, showExtraTabs } = useSelector(
    (state) => state.product
  );
  const acceptedTypes = ["png", "jpg"];
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
  const dispatch = useDispatch();
  const [showOthersField, setshowOthersField] = useState(false);
  const variationData = useSelector((state) => state.product.variationData);
  const { productDetails, duplicateFlag } = useSelector(
    (state) => state.product
  );
  const [showGuidelines, setShowGuidlines] = useState(false);
  const { masterProductId } = useSelector(
    (state) => state.product.productDetails
  );
  const [longDescModal, setLongDescModal] = useState(false);
  const [shortDescModal, setShortDescModal] = useState(false);
  const [adminViewList, setadminViewList] = useState([
    {
      title: "Discount",
      component: <Discount />,
    },
    { title: "Order Summary", component: <OrderSummary /> },
    { title: "Merged Products", component: <MergedProducts /> },
    { title: "Logs", component: <Logs /> },
  ]);
  useEffect(() => {
    if (productDetails?.variationData)
      setadminViewList([
        {
          title: "Discount",
          component: (
            <Discount
              productVariationId={
                productDetails.variationData.productVariationId
              }
              supplierId={productDetails.supplierId}
            />
          ),
        },
        { title: "Order Summary", component: <OrderSummary /> },
        { title: "Merged Products", component: <MergedProducts /> },
        { title: "Logs", component: <Logs /> },
      ]);
  }, [productDetails]);
  useEffect(() => {
    if (formData?.mainForm?.category?.value === "electronics") {
      setTabsLists([...tabsList, ...zonepagetabs]);
    } else {
      setTabsLists([...tabsList]);
    }
    setSetsData([]);
    setSubCategoryData([]);
  }, [formData?.mainForm?.category]);

  useEffect(() => {
    if (variationData && Object.keys(variationData).length) {
      setshowOthersField(true);
    }
  }, [variationData]);

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
    if (editProduct || duplicateFlag) getB2BTradmarkValues("TRADEMARK_LETTER");
  }, [editProduct, duplicateFlag]);

  useEffect(() => {
    getTags();
    getSelectCategoryData();
    getB2BTradmarkValues("B2B_INVOICE");
  }, []);
  useMemo(() => {
    if (formData?.mainForm?.category?.value) {
      getSets();
    }
  }, [formData?.mainForm?.category]);

  useMemo(() => {
    if (formData?.mainForm?.setsValue?.value) {
      getSubCategoryList();
    }
  }, [formData?.mainForm?.setsValue]);

  const handleNextClick = () => {
    if (viewFlag) {
      setactiveTab((prev) => prev + 1);
      return;
    }
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
    let tempArr = [];
    formData.productImage.forEach((item) => {
      if (!item.includes("https://")) {
        tempArr.push(item);
      }
    });
    if (tempArr.length) {
      promiseAll.push(saveimg("productImage", tempArr));
    }
    if (formData.mainForm.short_description?.media?.length) {
      tempArr = [];
      formData.mainForm.short_description.media.forEach((item) => {
        if (!item.includes("https://")) {
          tempArr.push(item);
        }
      });
      if (tempArr.length)
        promiseAll.push(saveimg("short_description", tempArr));
    }
    if (formData.mainForm.long_description?.media?.length) {
      tempArr = [];
      formData.mainForm.long_description.media.forEach((item) => {
        if (!item.includes("https://")) {
          tempArr.push(item);
        }
      });
      if (tempArr.length) promiseAll.push(saveimg("long_description", tempArr));
    }
    if (formData.policy.cancellationPolicy?.media?.binaryStr?.length) {
      tempArr = [];
      formData.policy.cancellationPolicy.media.binaryStr.forEach((item) => {
        if (!item.includes("https://")) {
          tempArr.push(item);
        }
      });
      if (tempArr.length)
        promiseAll.push(saveimg("cancellationPolicy", tempArr));
    }
    if (formData.policy.refundPolicy?.media?.binaryStr?.length) {
      tempArr = [];
      formData.policy.refundPolicy.media.binaryStr.forEach((item) => {
        if (!item.includes("https://")) {
          tempArr.push(item);
        }
      });
      if (tempArr.length) promiseAll.push(saveimg("refundPolicy", tempArr));
    }
    if (formData.policy.shippingPolicy?.media?.binaryStr?.length) {
      tempArr = [];
      formData.policy.shippingPolicy.media.binaryStr.forEach((item) => {
        if (!item.includes("https://")) {
          tempArr.push(item);
        }
      });
      if (tempArr.length) promiseAll.push(saveimg("shippingPolicy", tempArr));
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
        if (!temp.includes(item) && formData.attribute.hasOwnProperty(item)) {
          variationProperty.push({
            variationId: item,
            optionId: formData.variation[item],
            variationType: formData.attribute[item][0]?.variationType,
          });
        }
      });
      return variationProperty;
    };
    const otherInformation = {};
    formData.variation.others.forEach((item) => {
      otherInformation[item.label] = item.value;
    });
    const payload = {
      brand: formData.mainForm.brand,
      longDescription: formData.mainForm.long_description.text,
      longDescriptionFileUrls: imgdata.long_description
        ? formData?.mainForm?.long_description?.media?.length
          ? [
              ...imgdata.long_description,
              ...formData?.mainForm?.long_description?.media?.filter((item) => {
                if (item.includes("https://")) {
                  return item;
                }
              }),
            ]
          : [...imgdata.long_description]
        : formData?.mainForm?.long_description?.media?.filter((item) => {
            if (item.includes("https://")) {
              return item;
            }
          }) ?? [],
      shortDescription: formData.mainForm.short_description.text,
      shortDescriptionFileUrls: imgdata.short_description
        ? formData.mainForm.short_description.media.length
          ? [
              ...imgdata.short_description,
              ...formData.mainForm.short_description.media.filter((item) => {
                if (item.includes("https://")) {
                  return item;
                }
              }),
            ]
          : [...imgdata.short_description]
        : formData?.mainForm?.short_description?.media?.filter((item) => {
            if (item.includes("https://")) {
              return item;
            }
          }) ?? [],
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
      btobInvoiceList: formData.mainForm.selectb2binvoice.length
        ? formData.mainForm.selectb2binvoice.map((item) => {
            return item.id;
          })
        : [],
      genericProduct: formData.mainForm.genericradio,

      linkedProducts: {
        upSells: formData.linked.upSells.map((item) => item.id),
        crossSells: formData.linked.crossSells.map((item) => item.id),
      },

      productPolicies: {
        policyTabLabel: formData.policy.policyTabLabel,
        shippingPolicy: formData.policy.shippingPolicy.text,
        shippingPolicyMediaUrls: imgdata?.shippingPolicy
          ? formData.policy.shippingPolicy.media.binaryStr.length
            ? [
                ...imgdata?.shippingPolicy,
                ...formData.policy.shippingPolicy.media.binaryStr.filter(
                  (item) => {
                    if (item.includes("https://")) {
                      return item;
                    }
                  }
                ),
              ]
            : [...imgdata?.shippingPolicy]
          : formData?.policy?.shippingPolicy?.media?.binaryStr?.filter(
              (item) => {
                if (item.includes("https://")) {
                  return item;
                }
              }
            ) ?? [],
        refundPolicy: formData.policy.refundPolicy.text,
        refundPolicyMediaUrls: imgdata?.refundPolicy
          ? formData.policy.refundPolicy.media.binaryStr.length
            ? [
                ...imgdata?.refundPolicy,
                ...formData.policy.refundPolicy.media.binaryStr.filter(
                  (item) => {
                    if (item.includes("https://")) {
                      return item;
                    }
                  }
                ),
              ]
            : [...imgdata?.refundPolicy]
          : formData?.policy?.refundPolicy?.media?.binaryStr?.filter((item) => {
              if (item.includes("https://")) {
                return item;
              }
            }) ?? [],
        cancellationPolicy: formData.policy.cancellationPolicy.text,
        cancellationPolicyMediaUrls: imgdata?.cancellationPolicy
          ? formData.policy.cancellationPolicy.media.binaryStr.length
            ? [
                ...imgdata?.cancellationPolicy,
                ...formData.policy.cancellationPolicy.media.binaryStr.filter(
                  (item) => {
                    if (item.includes("https://")) {
                      return item;
                    }
                  }
                ),
              ]
            : [...imgdata?.cancellationPolicy]
          : formData?.policy?.cancellationPolicy?.media?.binaryStr?.filter(
              (item) => {
                if (item.includes("https://")) {
                  return item;
                }
              }
            ) ?? [],
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
          storeFDR: formData.pricing.freeDeliveryCheckbox,
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
          modelName: formData.inventory.modalname,
          sellWithMrMrsCart: formData.mrMrsCartFormData.sellwithus,
          mrmrscartSalePriceWithFDR: formData.mrMrsCartFormData.free_delivery,
          mrmrscartSalePriceWithOutFDR:
            formData.mrMrsCartFormData.paid_delivery,
          mrmrscartRtoAccepted: formData.mrMrsCartFormData.return,
          mrmrscartRtoDays:
            formData.mrMrsCartFormData.returnorder.value ?? null,
          mrmrscartCodAvailable: formData.mrMrsCartFormData.cashondelivery,
          stockStatus: formData.inventory.stock_status.label,
          allowBackOrders: formData.inventory?.allow_backorders?.label ?? "",
          backOrders: parseInt(formData.inventory.back_Orders, 10) || 0,
          variationMedia: imgdata?.productImage
            ? formData.productImage.length
              ? [
                  ...imgdata?.productImage,
                  ...formData.productImage.filter((item) => {
                    if (item.includes("https://")) {
                      return item;
                    }
                  }),
                ]
              : [...imgdata?.productImage]
            : formData?.productImage?.filter((item) => {
                if (item.includes("https://")) {
                  return item;
                }
              }) ?? [],
          variationProperty: getvariationProperty(),
        },
      ],

      otherInformation:
        Object.keys(otherInformation)[0] === "" ? {} : otherInformation,
      zoneChargeInfo: {},
      countryOfOrigin: formData.variation.countryOfOrigin,
      expiryDate: formData.variation.expiryDate
        ? format(new Date(formData.variation.expiryDate), "MM-dd-yyyy HH:mm:ss")
        : null,
      productType: editProduct ? productDetails.productType : "SIMPLE_PRODUCT",
      supplierId:
        userInfo.role === "SUPPLIER" || userInfo.role === "STAFF"
          ? userInfo.id
          : productDetails.supplierId,
    };
    if (duplicateFlag) {
      const { data, err } = await saveDuplicateProduct(
        payload,
        productDetails.supplierId,
        productDetails.variationData.productVariationId
      );
      if (err) {
        toastify(err.response.data.message, "error");
      } else if (data) {
        toastify(data.message, "success");
        dispatch(clearProduct());
        router.replace({
          pathname: "/supplier/products&inventory/myproducts",
          query: {
            active: "2",
          },
        });
      }
    } else if (editProduct) {
      payload.masterProductId = masterProductId;
      payload.countryOfOrigin = formData.variation.countryOfOrigin.value ?? "";

      payload.productVariations[0].masterProductId =
        productDetails.variationData.masterProductId;
      payload.productVariations[0].skuId = productDetails.variationData.skuId;
      payload.productVariations[0].productCode =
        productDetails.variationData.productCode;
      payload.productVariations[0].mergeProductId =
        productDetails.variationData.mergeProductId;
      payload.productVariations[0].flagId = productDetails.variationData.flagId;
      payload.productStatus = productDetails.productStatus;
      payload.productVariations[0].status = productDetails.variationData.status;
      payload.productVariations[0].flagged =
        productDetails.variationData.flagged;

      payload.productVariations[0].productVariationId =
        productDetails.variationData.productVariationId;
      if (userInfo === "ADMIN") {
        const { data, err } = await updateProductByAdmin(payload);
        if (err) {
          toastify(err.response.data.message, "error");
        } else if (data) {
          toastify(data.message, "success");
          dispatch(clearProduct());
          closeModal();
        }
      } else {
        const { data, err } = await updateProduct(payload);
        if (err) {
          toastify(err.response.data.message, "error");
        } else if (data) {
          toastify(data.message, "success");
          dispatch(clearProduct());
          // router.pathname.includes("admin")
          router.replace({
            pathname: "/supplier/products&inventory/myproducts",
            query: {
              active: "2",
            },
          });
        }
      }
    } else {
      const { data, err } = await saveProduct(payload);
      if (err) {
        toastify(err.response.data.message, "error");
      } else if (data) {
        toastify(data.message, "success");
        dispatch(clearProduct());
        router.replace({
          pathname: "/supplier/products&inventory/myproducts",
          query: {
            active: "2",
          },
        });
      }
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

  const handleVariationSubmit = async () => {
    const savevariationimg = (type, imgList) => {
      return saveMediaFile(userInfo.id, imgList).then((res) => {
        if (!res.error) {
          return { [`${type}`]: res.data };
        }
        return null;
      });
    };

    const uploadImages = async () => {
      const promiseAll = [];
      if (formData.mainForm.short_description?.media?.length) {
        promiseAll.push(
          savevariationimg(
            "short_description",
            formData.mainForm.short_description.media
          )
        );
      }
      if (formData.mainForm.long_description?.media?.length) {
        promiseAll.push(
          savevariationimg(
            "long_description",
            formData.mainForm.long_description.media
          )
        );
      }
      if (formData.policy.cancellationPolicy?.media?.binaryStr?.length) {
        promiseAll.push(
          savevariationimg(
            "cancellationPolicy",
            formData.policy.cancellationPolicy.media.binaryStr
          )
        );
      }
      if (formData.policy.refundPolicy?.media?.binaryStr?.length) {
        promiseAll.push(
          savevariationimg(
            "refundPolicy",
            formData.policy.refundPolicy.media.binaryStr
          )
        );
      }
      if (formData.policy.shippingPolicy?.media?.binaryStr?.length) {
        promiseAll.push(
          savevariationimg(
            "shippingPolicy",
            formData.policy.shippingPolicy.media.binaryStr
          )
        );
      }
      const prodImages = {};
      Object.keys(variationData).forEach((item) => {
        prodImages[item] = [];
        variationData[item].images.forEach((ele) => {
          if (ele) {
            prodImages[item].push(ele);
          }
        });
      });
      Object.keys(prodImages).forEach((item) => {
        promiseAll.push(savevariationimg(item, prodImages[item]));
      });
      const imgdata = await Promise.all(promiseAll);
      const imgData = {};
      imgdata.forEach((ele) => {
        imgData[`${Object.keys(ele)[0]}`] = ele[`${Object.keys(ele)[0]}`];
      });
      return imgData;
    };
    const { errObj, flag } = validateMainForm(formData.mainForm);
    const other = formsRef.current.validate();
    const otherObj = {};
    other?.otherInfo.forEach((ele) => {
      otherObj[`${ele.label}`] = "";
      otherObj[`${ele.label}`] = ele.value;
    });
    const otherFlag = other.flag;
    const createvariationPayload = async (imgdata) => {
      const { mainFormData, attribute, policy, linked } = JSON.parse(
        JSON.stringify(formData)
      );
      const getvariationProperty = (ele) => {
        const temp = ["countryOfOrigin", "others", "expiryDate"];
        const variationProperty = [];
        Object.keys(variationData[ele].variation).forEach((item) => {
          if (!temp.includes(item)) {
            variationProperty.push({
              variationId: item,
              optionId: variationData[ele].variation[item].id,
              variationType: formData.attribute[item][0]?.variationType,
            });
          }
        });
        return variationProperty;
      };
      const getVariationsPayload = () => {
        const temp = [];
        Object.keys(variationData).forEach((ele) => {
          const { inventory, mmcartPricing, pricing } = JSON.parse(
            JSON.stringify(variationData[ele])
          );
          temp.push({
            productTitle: inventory.product_title,
            shippingClass: inventory.shipping_class.value,
            businessProcessingDays: inventory.business_processing_days.value,
            seoTitle: inventory.seo_title,
            metaDescription: inventory.meta_description,
            metaKeywords: inventory.meta_keyword.join(),
            storeFDR: pricing.fd_rot,
            salePriceWithLogistics: parseInt(pricing.sale_price_logistics, 10),
            rtoAccepted: pricing.return_order_accepted,
            rtoDays: pricing?.returnorder?.value ?? null,
            codAvailable: pricing.cash_on_delivary,
            deliveryCharge: pricing.delivery_charge,
            packageLength: parseFloat(pricing.length),
            packageWidth: parseFloat(pricing.width),
            packageHeight: parseFloat(pricing.height),
            weightInclusivePackage: parseFloat(pricing.product_weight),
            salePrice: parseInt(pricing.sale_price, 10),
            mrp: parseInt(pricing.mrp, 10),
            stockQty: parseInt(inventory.stock_qty, 10),
            modelName: inventory.modalname,
            sellWithMrMrsCart: mmcartPricing.sellwithus,
            mrmrscartSalePriceWithFDR: mmcartPricing.free_delivery,
            mrmrscartSalePriceWithOutFDR: mmcartPricing.paid_delivery,
            mrmrscartRtoAccepted: mmcartPricing.rto,
            mrmrscartRtoDays: mmcartPricing.returnorder.id,
            mrmrscartCodAvailable: mmcartPricing.cod,
            stockStatus: inventory.stock_status.label,
            allowBackOrders: inventory?.allow_backorders?.label ?? "",
            backOrders: parseInt(inventory.back_Orders, 10) || 0,
            variationMedia: imgdata[ele],
            variationProperty: getvariationProperty(ele),
          });
        });
        return temp;
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
        btobInvoiceList: formData.mainForm.selectb2binvoice.length
          ? formData.mainForm.selectb2binvoice.map((item) => {
              return item.id;
            })
          : [],
        genericProduct: formData.mainForm.genericradio,

        linkedProducts: {
          upSells: [formData.linked.upSells.value],
          crossSells: [formData.linked.crossSells.value],
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

        productVariations: getVariationsPayload(),

        otherInformation: { ...otherObj },
        expiryDate: other.expireDate
          ? format(other.expireDate, "MM-dd-yyyy HH:mm:ss")
          : null,
        countryOfOrigin: other.country.id,
        zoneChargeInfo: {},
        productType: "VARIABLE_PRODUCT",
        supplierId: userInfo.id,
      };
      const { data, err } = await saveProduct(payload);
      if (err) {
        toastify(err.response.data.message, "error");
      } else if (data) {
        dispatch(clearProduct());
        router.replace({
          pathname: "/supplier/products&inventory/myproducts",
          query: {
            active: "2",
          },
        });
        toastify(data.message, "success");
      }
    };

    if (flag || validateProductImg(formData.productImage) || otherFlag) {
      setErrObj(errObj);
    } else {
      setErrObj({});
      createvariationPayload(await uploadImages());
    }
  };

  return (
    <>
      {!showGroupVariant ? (
        <Box className="d-flex flex-grow-1 flex-row">
          {type === "simple" && (
            <Box className="border-end p-2 py-2 fit-content pb-0 overflow-y-scroll mxh-75vh">
              <Box
                className="color-blue fs-12 cursor-pointer"
                onClick={() => {
                  setShowGuidlines(true);
                }}
              >
                Image Guidelines
              </Box>
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
                      showClose={!viewFlag}
                    />
                  ))
                : null}
              {formData.productImage.length < 5 ? (
                <ImageCard
                  showClose={false}
                  handleImageUpload={async (e) => {
                    if (e.target.files.length) {
                      if (
                        e.target?.files.length &&
                        acceptedTypes.includes(
                          e.target.files[0].type.split("/")[1]
                        )
                      ) {
                        const file = await getBase64(e.target.files[0]);
                        setFormData((prev) => {
                          return {
                            ...prev,
                            productImage: [...prev.productImage, file],
                          };
                        });
                      } else {
                        toastify("Image type should be in png or jpg", "error");
                      }
                    }
                  }}
                  className="mx-3"
                  imgSrc=""
                />
              ) : null}
            </Box>
          )}
          <Box className="border-end p-2 w-30p mxh-75vh overflow-y-scroll py-3">
            <div className="px-2">
              <Grid container spacing={2}>
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
                    disabled={editProduct || viewFlag}
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
                    disabled={editProduct || viewFlag}
                  />
                </Grid>
                <Grid item md={12}>
                  <div className="w-100 d-flex justify-content-between">
                    <Typography>Short Description*</Typography>
                    <ButtonComponent
                      size="small"
                      label="Add Description"
                      onBtnClick={() => {
                        setShortDescModal(true);
                      }}
                      variant="outlined"
                    />

                    {shortDescModal && (
                      <div
                        className=""
                        style={{
                          position: "fixed",
                          top: 0,
                          left: 0,
                          height: "100vh",
                          width: "100vw",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          background: "rgba(0,0,0,0.3)",
                          zIndex: "1100",
                        }}
                      >
                        <div className="w-50vw h-50vh bg-light rounded ps-4">
                          <div className="d-flex flex-row-reverse">
                            <GrClose
                              className="me-2 mt-2"
                              onClick={() => {
                                setShortDescModal(false);
                              }}
                            />
                          </div>
                          <div className="">
                            <TextEditor
                              EditorHeight="200"
                              content={
                                formData?.mainForm?.short_description?.text
                              }
                              placeholder=""
                              getContent={(e) => {
                                setFormData((prev) => {
                                  return {
                                    ...prev,
                                    mainForm: {
                                      ...prev.mainForm,
                                      short_description: {
                                        ...prev.mainForm.short_description
                                          .media,
                                        text: e,
                                      },
                                    },
                                  };
                                });
                              }}
                            />
                          </div>
                          <div className="d-flex flex-row-reverse mt-2 me-4">
                            <ButtonComponent
                              label="Add Media"
                              onBtnClick={() => {
                                setShowFileUploadModal("short_description");
                              }}
                              variant="outlined"
                              size="small"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  {errorObj?.short_description?.text && (
                    <Typography className="color-red fs-12">
                      {errorObj?.short_description?.text}
                    </Typography>
                  )}
                </Grid>
                <Grid item md={12}>
                  <div className="w-100 d-flex justify-content-between">
                    <Typography>Long Description*</Typography>
                    <ButtonComponent
                      label="Add Description"
                      onBtnClick={() => {
                        setLongDescModal(true);
                      }}
                      size="small"
                      variant="outlined"
                    />
                    {longDescModal && (
                      <div
                        className=""
                        style={{
                          position: "fixed",
                          top: 0,
                          left: 0,
                          height: "100vh",
                          width: "100vw",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          background: "rgba(0,0,0,0.3)",
                          zIndex: "1100",
                        }}
                      >
                        <div className="w-50vw h-50vh bg-light rounded ps-4">
                          <div className="d-flex flex-row-reverse">
                            <GrClose
                              className="me-2 mt-2"
                              onClick={() => {
                                setLongDescModal(false);
                              }}
                            />
                          </div>
                          <div className="">
                            <TextEditor
                              EditorHeight="200"
                              content={
                                formData?.mainForm?.long_description?.text
                              }
                              placeholder=""
                              getContent={(e) => {
                                setFormData((prev) => {
                                  return {
                                    ...prev,
                                    mainForm: {
                                      ...prev.mainForm,
                                      long_description: {
                                        ...prev.mainForm.long_description.media,
                                        text: e,
                                      },
                                    },
                                  };
                                });
                              }}
                            />
                          </div>
                          <div className="d-flex flex-row-reverse mt-2 me-4">
                            <ButtonComponent
                              label="Add Media"
                              onBtnClick={() => {
                                setShowFileUploadModal("long_description");
                              }}
                              variant="outlined"
                              size="small"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
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
                    disabled={viewFlag}
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
                    disabled={editProduct}
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
                      if (editProduct) return;
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
                    disabled={editProduct || viewFlag}
                  />
                  <RadiobuttonComponent
                    size="small"
                    label="Generic"
                    isChecked={formData?.mainForm?.genericradio}
                    onRadioChange={() => {
                      if (editProduct) return;
                      setFormData((prev) => ({
                        ...prev,
                        mainForm: {
                          ...prev.mainForm,
                          brandradio: false,
                          tradeMarkCheck: false,
                          genericradio: true,
                          b2bdocument: {},
                        },
                      }));
                    }}
                    disabled={editProduct || viewFlag}
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
                    isDisabled={
                      formData?.mainForm?.genericradio ||
                      editProduct ||
                      viewFlag
                    }
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
                      disabled={editProduct || viewFlag}
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
                  {adminView && showExtraTabs
                    ? [...tabsLists, ...adminViewList].map((item, index) => {
                        return (
                          <Grid
                            item
                            key={index}
                            md={12}
                            className={`text-center py-1 rounded my-1 fs-14 ${
                              activeTab === index
                                ? "bg-orange color-white"
                                : "bg-light-gray"
                            }`}
                          >
                            {item.title}
                          </Grid>
                        );
                      })
                    : tabsLists.map((item, index) => {
                        return (
                          <Grid
                            item
                            key={index}
                            md={12}
                            className={`text-center py-1 rounded my-1 fs-14 ${
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
                {adminView && showExtraTabs
                  ? [...tabsLists, ...adminViewList].map((item, ind) => {
                      return activeTab === ind ? item.component : null;
                    })
                  : tabsLists.map((item, ind) => {
                      return activeTab === ind ? item.component : null;
                    })}
              </Box>
            </Box>
            <Box className="d-flex justify-content-end me-3 mb-1">
              {adminView &&
                list.map((item) => {
                  return (
                    <ButtonComponent
                      label={item.label}
                      size="small"
                      variant="text"
                      muiProps="text-secondary bnt-hover-class mx-2"
                      onBtnClick={item.callBack}
                    />
                  );
                })}
              {!viewFlag && (
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
              )}
              {!viewFlag && (
                <ButtonComponent
                  label="Clear All"
                  variant="outlined"
                  size="small"
                  onBtnClick={() => {
                    formsRef.current.clearPage();
                    setFormData(schema);
                    setErrObj({});
                    setactiveTab(0);
                    dispatch(clearProduct());
                  }}
                  muiProps="me-2"
                />
              )}
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
              {(!adminView
                ? activeTab !== tabsList.length - 1
                : showExtraTabs
                ? activeTab < 11
                : activeTab < tabsList.length - 1) && (
                <ButtonComponent
                  label="Next"
                  size="small"
                  onBtnClick={handleNextClick}
                />
              )}
              {!viewFlag &&
                (type === "simple" || showOthersField) &&
                activeTab === tabsList.length - 1 && (
                  <ButtonComponent
                    label="Submit"
                    size="small"
                    onBtnClick={
                      type === "simple" ? handleSubmit : handleVariationSubmit
                    }
                  />
                )}
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
          setShowGroupVariant={setShowGroupVariant}
          handleSubmit={() => {
            setShowGroupVariant(false);
          }}
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
          setTagInputValue("");
        }}
        onClearBtnClick={() => {
          setTagInputValue("");
          setcreateTagModal(false);
          setTagInputError("");
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
          showSaveBtn={!editProduct}
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
                  disabled={editProduct}
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
                  disabled={editProduct}
                />
              </Grid>
            </Grid>
          </Box>
        </ModalComponent>
      )}
      <ModalComponent
        open={showGuidelines}
        ModalTitle="Image Guidelines"
        titleClassName="color-orange fs-14"
        clearBtnClassName="px-4"
        ClearBtnText="Cancel"
        onCloseIconClick={() => {
          setShowGuidlines(false);
        }}
        ModalWidth="75%"
        showFooter={false}
      >
        <ImageGuidelines />
      </ModalComponent>
    </>
  );
};
export default ProductsLayout;
