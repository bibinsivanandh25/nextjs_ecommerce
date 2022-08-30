/* eslint-disable prefer-destructuring */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-shadow */
/* eslint-disable radix */
/* eslint-disable no-unused-vars */
import { Grid, Paper, Typography, Box } from "@mui/material";
import { forwardRef, useEffect, useState } from "react";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import ImageCard from "components/atoms/ImageCard";
import InputBox from "components/atoms/InputBoxComponent";
import SimpleDropdownComponent from "components/atoms/SimpleDropdownComponent";
import CheckBoxComponent from "components/atoms/CheckboxComponent";
import DatePickerComponent from "components/atoms/DatePickerComponent";
import ButtonComponent from "components/atoms/ButtonComponent";
import { getBase64 } from "services/utils/functionUtils";
import InputFieldWithChip from "components/atoms/InputWithChip";
import validateMessage from "constants/validateMessages";
import toastify from "services/utils/toastUtils";
import validationRegex from "services/utils/regexUtils";
import { saveProduct, saveMediaFile } from "services/supplier/AddProducts";
import { useUserInfo } from "services/hooks";
import { useRouter } from "next/router";
import { getCurrentData } from "services/supplier";
import {
  allowback_orders,
  business_processing_days,
  shipping_class,
  stock_status,
} from "../../../../../../../constants/constants";
import styles from "./InvoiceCardComponent.module.css";

const returnOrderData = [
  {
    id: 1,
    value: 7,
    label: "7 Days",
  },
  {
    id: 1,
    value: 14,
    label: "14 Days",
  },
  {
    id: 1,
    value: 21,
    label: "21 Days",
  },
  {
    id: 1,
    value: 28,
    label: "28 Days",
  },
];

const GroupVariationForm = forwardRef(
  (
    {
      formData = {},
      setShowGroupVariant = () => {},
      long_descriptionImg = [],
      short_descriptionImg = [],
      imagedata = [],
    },
    ref
  ) => {
    console.log({ formData });
    const tempObj = {
      images: [],
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
        meta_keyword: "",
        modalname: "",
      },
      pricing: {
        sale_price: "",
        mrp: "",
        return_order_accepted: false,
        cash_on_delivary: false,
        product_weight: "",
        length: "",
        width: "",
        height: "",
        delivery_charge: "",
        returnorder: {},
        fd_rot: false,
        sale_price_logistics: "",
      },
      variation: {
        expiryDate: null,
        countryOfOrigin: null,
        others: "",
      },
      manageStock: false,
      expand: true,
      mmcartPricing: {
        sellwithus: false,
        free_delivery: "",
        paid_delivery: "",
        rto: false,
        cod: false,
        returnorder: {},
      },
    };

    const [variationData, setVariationData] = useState({});
    const [optionsValue, setoptionsValue] = useState({});
    const [emptyObj, setEmptyObj] = useState({});
    const [errorObj, setErrorObj] = useState({});
    const userInfo = useUserInfo();
    const router = useRouter();

    useEffect(() => {
      if (formData?.productImage.length) {
        const temp = {};
        const dropDownVal = {};
        const tempImg = {};
        formData?.productImage.forEach((item, ind) => {
          temp[`variation${ind + 1}`] = {
            ...JSON.parse(JSON.stringify(tempObj)),
          };
          temp[`variation${ind + 1}`].images = Array(5);
          temp[`variation${ind + 1}`].images.fill("");
          temp[`variation${ind + 1}`].images[0] = item;
          Object.entries(formData.attribute).forEach(([key, val]) => {
            if (val.length) {
              temp[`variation${ind + 1}`].variation[key] = null;
              const ddval = val.map((ele) => {
                return {
                  id: ele?.id ?? "",
                  label: ele.title,
                  value: ele.id,
                  variationName: ele.variationName,
                  variationId: ele.variationId,
                  variationType: ele.variationType,
                };
              });
              dropDownVal[key] = [...ddval];
            }
          });
        });
        setEmptyObj({ ...JSON.parse(JSON.stringify({ ...temp })) });
        setVariationData({ ...temp });
        setoptionsValue({ ...dropDownVal });
      }
    }, [formData]);
    const handleInputChange = (e, item, key) => {
      const temp = JSON.parse(JSON.stringify({ ...variationData }));
      temp[item][key][e.target.id] = e.target.value;
      setVariationData(temp);
    };

    const handleDropDownChange = (item, key, name, val) => {
      const temp = JSON.parse(JSON.stringify({ ...variationData }));
      temp[item][key][name] = val;
      setVariationData(temp);
    };

    let currentData = new Date();

    const getDate = async () => {
      const { data, err } = await getCurrentData();
      if (data) {
        currentData = new Date(data);
      }
    };
    useEffect(() => {
      getDate();
    }, []);

    const validate = () => {
      const errObj = JSON.parse(JSON.stringify({ ...emptyObj }));
      let flag = false;
      Object.keys(errObj).forEach((item, index) => {
        delete errObj[item].expand;
        delete errObj[item].images;
        delete errObj[item].manageStock;
        Object.keys(errObj[item]).forEach((ele) => {
          Object.keys(errObj[item][ele]).forEach((el) => {
            errObj[item][ele][el] = "";
          });
        });
      });
      Object.keys(emptyObj).forEach((item, index) => {
        Object.keys(variationData[item]).forEach((ele, ind) => {
          if (ele !== "images") {
            if (ele === "inventory") {
              const tempInventory = JSON.parse(
                JSON.stringify(variationData[item].inventory)
              );
              if (!Object.keys(tempInventory.stock_status).length) {
                flag = true;
                errObj[item].inventory.stock_status =
                  validateMessage.field_required;
              } else {
                errObj[item].inventory.stock_status = "";
              }
              if (variationData[item].manageStock) {
                if (tempInventory.stock_qty === "") {
                  flag = true;
                  errObj[item].inventory.stock_qty =
                    validateMessage.field_required;
                } else if (parseInt(tempInventory.stock_qty) < 1) {
                  flag = true;
                  errObj[item].inventory.stock_qty =
                    "Stock Qty must be greater then or equal to 1";
                } else {
                  errObj[item].inventory.stock_qty = "";
                }
                if (!Object.keys(tempInventory.allow_backorders).length) {
                  flag = true;
                  errObj[item].inventory.allow_backorders =
                    validateMessage.field_required;
                } else {
                  errObj[item].inventory.allow_backorders = "";
                }
              }
              if (!Object.keys(tempInventory.business_processing_days).length) {
                flag = true;
                errObj[item].inventory.business_processing_days =
                  validateMessage.field_required;
              } else {
                errObj[item].inventory.business_processing_days = "";
              }

              if (tempInventory.modalname === "") {
                flag = true;
                errObj[item].modalname = validateMessage.field_required;
              } else if (tempInventory.modalname?.length > 100) {
                flag = true;
                errObj[item].modalname = validateMessage.alpha_numeric_max_100;
              } else {
                errObj[item].inventory.modalname = "";
              }

              if (tempInventory.seo_title === "") {
                flag = true;
                errObj[item].inventory.seo_title =
                  validateMessage.field_required;
              } else if (tempInventory.seo_title.length > 100) {
                flag = true;
                errObj[item].inventory.seo_title =
                  validateMessage.alpha_numeric_max_100;
              } else {
                errObj[item].inventory.seo_title = "";
              }
              if (tempInventory.meta_description === "") {
                flag = true;
                errObj[item].inventory.meta_description =
                  validateMessage.field_required;
              } else if (tempInventory.meta_description.length > 100) {
                flag = true;
                errObj[item].inventory.meta_description =
                  validateMessage.alpha_numeric_max_100;
              } else {
                errObj[item].inventory.meta_description = "";
              }
              if (!tempInventory.meta_keyword.length) {
                flag = true;
                errObj[item].inventory.meta_keyword =
                  validateMessage.field_required;
              } else
                tempInventory.meta_keyword.forEach((ele) => {
                  if (ele.length > 15) {
                    flag = true;
                    errObj[item].inventory.meta_keyword =
                      validateMessage.field_required;
                  } else {
                    errObj[item].inventory.meta_keyword = "";
                  }
                });
              if (tempInventory.product_title === "") {
                flag = true;
                errObj[item].inventory.product_title =
                  validateMessage.field_required;
              } else if (tempInventory.product_title.length > 100) {
                flag = true;
                errObj[item].inventory.product_title =
                  validateMessage.alpha_numeric_max_100;
              } else {
                errObj[item].inventory.product_title = "";
              }
            } else if (ele === "pricing") {
              const tempPricing = JSON.parse(
                JSON.stringify(variationData[item].pricing)
              );
              if (tempPricing.sale_price === "") {
                flag = true;
                errObj[item].pricing.sale_price =
                  validateMessage.field_required;
              } else if (
                !validationRegex.decimal_2digit.test(
                  parseFloat(tempPricing.sale_price)
                )
              ) {
                flag = true;
                errObj[item].pricing.sale_price =
                  validateMessage.decimal_2digits;
              } else {
                errObj[item].pricing.sale_price = "";
              }
              if (
                tempPricing.fd_rot &&
                tempPricing.sale_price_logistics === ""
              ) {
                flag = true;
                errObj[item].pricing.sale_price_logistics =
                  validateMessage.field_required;
              } else {
                errObj[item].pricing.sale_price_logistics = "";
              }
              if (tempPricing.mrp === "") {
                flag = true;
                errObj[item].pricing.mrp = validateMessage.field_required;
              } else if (
                !validationRegex.decimal_2digit.test(
                  parseFloat(tempPricing.mrp)
                )
              ) {
                flag = true;
                errObj[item].pricing.mrp = validateMessage.decimal_2digits;
              } else {
                errObj[item].pricing.mrp = "";
              }
              if (tempPricing.product_weight === "") {
                flag = true;
                errObj[item].pricing.product_weight =
                  validateMessage.field_required;
              } else if (
                parseInt(tempPricing.product_weight) > 100000 ||
                parseInt(tempPricing.product_weight) < 100
              ) {
                flag = true;
                errObj[item].pricing.product_weight =
                  "weight should be between 100 to 100000 grams";
              } else {
                errObj[item].pricing.sale_price = "";
              }
              if (tempPricing.length === "") {
                flag = true;
                errObj[item].pricing.length = validateMessage.field_required;
              } else {
                errObj[item].pricing.length = "";
              }
              if (tempPricing.width === "") {
                flag = true;
                errObj[item].pricing.width = validateMessage.field_required;
              } else {
                errObj[item].pricing.width = "";
              }
              if (tempPricing.height === "") {
                flag = true;
                errObj[item].pricing.height = validateMessage.field_required;
              } else {
                errObj[item].pricing.height = "";
              }
            } else if (ele === "variation") {
              const tempVariation = JSON.parse(
                JSON.stringify(variationData[item].variation)
              );
              if (
                tempVariation.expiryDate !== null &&
                tempVariation.expiryDate < currentData
              ) {
                flag = true;
                errObj[item].variation.expiryDate = "Past date is not allowed";
              } else {
                errObj[item].variation.expiryDate = "";
              }
              if (tempVariation.countryOfOrigin === null) {
                flag = true;
                errObj[item].variation.countryOfOrigin =
                  validateMessage.field_required;
              } else {
                errObj[item].variation.countryOfOrigin = "";
              }
              if (tempVariation.others === "") {
                flag = true;
                errObj[item].variation.others = validateMessage.field_required;
              } else if (tempVariation.others.length > 255) {
                flag = true;
                errObj[item].variation.others =
                  validateMessage.alpha_numeric_max_255;
              } else {
                errObj[item].variation.others = "";
              }
              Object.keys(tempVariation).forEach((element) => {
                if (
                  !["expiryDate", "countryOfOrigin", "others"].includes(element)
                ) {
                  if (tempVariation[element] === null) {
                    flag = true;
                    errObj[item].variation[element] =
                      validateMessage.field_required;
                  } else {
                    errObj[item].variation[element] = "";
                  }
                }
              });
            } else if (ele === "mmcartPricing") {
              const mrMrsCartFormData = JSON.parse(
                JSON.stringify(variationData[item].mmcartPricing)
              );
              if (mrMrsCartFormData.sellwithus) {
                if (mrMrsCartFormData.free_delivery == "") {
                  flag = true;
                  errObj[item].mmcartPricing.free_delivery =
                    validateMessage.field_required;
                }
                if (mrMrsCartFormData.paid_delivery == "") {
                  flag = true;
                  errObj[item].mmcartPricing.paid_delivery =
                    validateMessage.field_required;
                }
              }
              if (mrMrsCartFormData.rot) {
                if (!Object.keys(mrMrsCartFormData.returnorder).length) {
                  flag = true;
                  errObj[item].mmcartPricing.returnorder =
                    validateMessage.field_required;
                }
              }
            }
          }
        });
      });
      setErrorObj(errObj);
      return flag;
    };

    const createPayload = async (imgdata) => {
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
            isStoreFDR: pricing.fd_rot,
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
            stockQty: parseInt(inventory.stockqty, 10),
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

        productVariations: getVariationsPayload(),

        otherInformationObject: {},
        zoneChargeInfo: {},
        productType: "VARIABLE_PRODUCT",
        supplierId: userInfo.id,
      };
      const { data, err } = await saveProduct(payload);
      if (err) {
        toastify(err.response.data.message, "error");
      } else if (data) {
        toastify(data.message, "success");
        router.replace("/supplier/mycollections");
      }
    };

    const saveimg = (type, imgList) => {
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
          saveimg(
            "short_description",
            formData.mainForm.short_description.media
          )
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
        promiseAll.push(saveimg(item, prodImages[item]));
      });
      console.log({ promiseAll });
      const imgdata = await Promise.all(promiseAll);
      const imgData = {};
      imgdata.forEach((ele) => {
        imgData[`${Object.keys(ele)[0]}`] = ele[`${Object.keys(ele)[0]}`];
      });
      return imgData;
    };

    const handleSubmit = async () => {
      const flag = validate();
      if (!flag) {
        console.log({ variationData });
        createPayload(await uploadImages());
      }
    };

    return (
      <div className="d-flex flex-column w-100">
        <div className="p-3  d-flex flex-column flex-grow-1">
          <div
            className="h-5 color-orange cursor-pointer"
            onClick={() => {
              setShowGroupVariant(false);
            }}
          >
            {"<"}Back
          </div>
          {/* hide-scrollbar h-92 */}
          <div
            style={{ maxWidth: "87vw" }}
            className={` d-flex flex-grow-1 mb-1 py-1 pb-2 hide-scrollbar overflow-x-scroll`}
          >
            {Object.keys(variationData).map((item, index) => {
              return (
                <div
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  style={{
                    height: variationData[item].expand ? "100%" : "fit-content",
                  }}
                >
                  <Paper
                    className={` mx-2 px-2 mt-1 overflow-y-scroll hide-scrollbar ${
                      variationData[item].expand ? "" : styles.papershrink
                    }`}
                    sx={{ minWidth: "400px", maxWidth: "500px" }}
                    elevation={3}
                  >
                    <div className={` pb-3 `}>
                      <div
                        className={`w-100 d-flex justify-content-between align-items-center p-2 px-3                      
                    ${
                      variationData[item].expand
                        ? styles.invoiceContainer
                        : "border-none"
                    }`}
                      >
                        <Typography className="fs-16 fw-600">{item}</Typography>
                        {variationData[item].expand ? (
                          <KeyboardArrowUpRoundedIcon
                            onClick={() => {
                              setVariationData((pre) => {
                                const temp = JSON.parse(JSON.stringify(pre));
                                temp[item].expand = false;
                                return temp;
                              });
                            }}
                            className="cursor-pointer"
                          />
                        ) : (
                          <KeyboardArrowDownRoundedIcon
                            onClick={() => {
                              setVariationData((pre) => {
                                const temp = JSON.parse(JSON.stringify(pre));
                                temp[item].expand = true;
                                return temp;
                              });
                            }}
                            className="cursor-pointer"
                          />
                        )}
                      </div>
                      <div
                        className={`w-100 ${
                          variationData[item].expand
                            ? styles.expand
                            : styles.shrink
                        }`}
                      >
                        <div
                          className={` d-flex p-2 overflow-auto hide-scrollbar`}
                        >
                          <ImageCard
                            imgSrc={variationData[item].images[0]}
                            showClose={false}
                          />
                          <div className="d-flex mt-2 ms-2 flex-column w-100">
                            <Typography className="h-5 fw-bold">
                              Add more images of the product
                            </Typography>
                            <div className="d-flex w-100">
                              {variationData[item].images.map((ele, ind) => {
                                return ind > 0 ? (
                                  <div className="m-2">
                                    <ImageCard
                                      imgSrc={ele ?? ""}
                                      showClose={false}
                                      height="65"
                                      width="65"
                                      handleImageUpload={async (e) => {
                                        if (e.target.files.length) {
                                          if (
                                            e.target.files[0].size <= 1000000
                                          ) {
                                            const temp = await getBase64(
                                              e.target.files[0]
                                            );
                                            setVariationData((pre) => {
                                              const copy = JSON.parse(
                                                JSON.stringify({ ...pre })
                                              );
                                              copy[item].images[
                                                copy[item].images.indexOf("")
                                              ] = temp;

                                              return copy;
                                            });
                                          } else {
                                            toastify(
                                              "Image size should be less than 1MB",
                                              "error"
                                            );
                                          }
                                        }
                                      }}
                                    />
                                  </div>
                                ) : null;
                              })}
                            </div>
                          </div>
                        </div>
                        <div className="w-100 mt-3">
                          <Grid container className="w-100" spacing={2}>
                            <Grid item md={12}>
                              <InputBox
                                id="sku"
                                label="SKU"
                                onInputChange={(e) => {
                                  handleInputChange(e, item, "inventory");
                                }}
                                value={variationData[item].inventory.sku}
                                placeholder="SKU"
                                inputlabelshrink
                                fullWidth={false}
                                className="w-70p"
                                disabled
                                helperText={errorObj[item]?.inventory.sku}
                                error={
                                  errorObj[item]?.inventory.sku &&
                                  errorObj[item]?.inventory.sku !== ""
                                }
                              />
                            </Grid>
                            <Grid item md={12}>
                              <InputBox
                                id="stock_qty"
                                label="Stock Qty*"
                                placeholder="Enter Stock Qty"
                                onInputChange={(e) => {
                                  handleInputChange(e, item, "inventory");
                                }}
                                value={variationData[item].inventory.stock_qty}
                                type="number"
                                inputlabelshrink
                                helperText={errorObj[item]?.inventory.stock_qty}
                                error={
                                  errorObj[item]?.inventory.stock_qty &&
                                  errorObj[item]?.inventory.stock_qty !== ""
                                }
                                className="w-70p"
                              />
                            </Grid>
                            <Grid item md={12} className="pt-4">
                              <div className="d-flex align-items-center">
                                <Typography className="h-4 fw-600 me-3">
                                  Manage Stocks?
                                </Typography>
                                <CheckBoxComponent
                                  label=""
                                  isChecked={variationData[item].manageStock}
                                  checkBoxClick={(_, val) => {
                                    setVariationData((pre) => {
                                      const temp = JSON.parse(
                                        JSON.stringify(pre)
                                      );
                                      temp[item].manageStock = val;
                                      return temp;
                                    });
                                  }}
                                  size="small"
                                  showIcon
                                  varient="filled"
                                />
                              </div>
                            </Grid>
                            <Grid item md={12}>
                              <SimpleDropdownComponent
                                inputlabelshrink
                                list={stock_status}
                                id="stockstatus"
                                label="Stock Status*"
                                size="small"
                                fullWidth={false}
                                className="w-70p"
                                value={
                                  variationData[item].inventory.stock_status
                                }
                                placeholder="Select Stock Status"
                                onDropdownSelect={(value) => {
                                  handleDropDownChange(
                                    item,
                                    "inventory",
                                    "stock_status",
                                    value
                                  );
                                }}
                                helperText={
                                  errorObj[item]?.inventory.stock_status
                                }
                                error={
                                  errorObj[item]?.inventory.stock_status &&
                                  errorObj[item]?.inventory.stock_status !==
                                    null
                                }
                              />
                            </Grid>
                            {variationData[item].manageStock ? (
                              <>
                                <Grid item md={12}>
                                  <SimpleDropdownComponent
                                    inputlabelshrink
                                    list={allowback_orders}
                                    id="Allow Backorders ?"
                                    label="Allow Backorders ?*"
                                    size="small"
                                    fullWidth={false}
                                    value={
                                      variationData[item].inventory
                                        .allow_backorders
                                    }
                                    placeholder="All Backorders"
                                    onDropdownSelect={(value) => {
                                      handleDropDownChange(
                                        item,
                                        "inventory",
                                        "allow_backorders",
                                        value
                                      );
                                    }}
                                    helperText={
                                      errorObj[item]?.inventory.allow_backorders
                                    }
                                    error={
                                      errorObj[item]?.inventory
                                        .allow_backorders &&
                                      errorObj[item]?.inventory
                                        .allow_backorders !== null
                                    }
                                  />
                                </Grid>
                                {variationData[item].inventory?.allow_backorders
                                  ?.value === "allow" ? (
                                  <Grid item md={12}>
                                    <InputBox
                                      id="back_Orders"
                                      label="Back Orders*"
                                      size="small"
                                      placeholder="Enter Back Orders Quantities"
                                      value={
                                        variationData[item].inventory
                                          .back_Orders
                                      }
                                      onInputChange={(e) => {
                                        handleInputChange(e, item, "inventory");
                                      }}
                                      type="number"
                                    />
                                  </Grid>
                                ) : null}
                              </>
                            ) : null}
                            <Grid item md={12}>
                              <SimpleDropdownComponent
                                inputlabelshrink
                                list={[...shipping_class]}
                                id="ShippingClass"
                                label="Shipping Class*"
                                size="small"
                                fullWidth={false}
                                value={
                                  variationData[item].inventory.shipping_class
                                }
                                placeholder="Select Shipping Class"
                                onDropdownSelect={(value) => {
                                  handleDropDownChange(
                                    item,
                                    "inventory",
                                    "shipping_class",
                                    value
                                  );
                                }}
                                helperText={
                                  errorObj[item]?.inventory.shipping_class
                                }
                                error={
                                  errorObj[item]?.inventory.shipping_class &&
                                  errorObj[item]?.inventory.shipping_class !==
                                    null
                                }
                              />
                            </Grid>
                            <Grid item md={12}>
                              <InputBox
                                id="product_title"
                                label="Product Title*"
                                onInputChange={(e) => {
                                  handleInputChange(e, item, "inventory");
                                }}
                                placeholder="Enter Product Title"
                                value={
                                  variationData[item].inventory.product_title
                                }
                                inputlabelshrink
                                helperText={
                                  errorObj[item]?.inventory.product_title
                                }
                                error={
                                  errorObj[item]?.inventory.product_title &&
                                  errorObj[item]?.inventory.product_title !== ""
                                }
                              />
                            </Grid>
                            <Grid item md={12}>
                              <SimpleDropdownComponent
                                inputlabelshrink
                                placeholder="Select Business Processing Days"
                                list={[...business_processing_days]}
                                id="business_processing_days"
                                label="Business Processing Days*"
                                size="small"
                                fullWidth={false}
                                value={
                                  variationData[item].inventory
                                    .business_processing_days
                                }
                                onDropdownSelect={(value) => {
                                  handleDropDownChange(
                                    item,
                                    "inventory",
                                    "business_processing_days",
                                    value
                                  );
                                }}
                                helperText={
                                  errorObj[item]?.inventory
                                    .business_processing_days
                                }
                                error={
                                  errorObj[item]?.inventory
                                    .business_processing_days &&
                                  errorObj[item]?.inventory
                                    .business_processing_days !== null
                                }
                              />
                            </Grid>
                            <Grid item md={12}>
                              <InputFieldWithChip
                                id="seo_title"
                                label="SEO Title*"
                                placeholder="Enter SEO Title"
                                value={variationData[item].inventory.seo_title}
                                inputlabelshrink
                                handleChange={(_, val) => {
                                  const temp = JSON.parse(
                                    JSON.stringify({ ...variationData })
                                  );
                                  temp[item].inventory.seo_title = val;
                                  setVariationData(temp);
                                }}
                                helperText={errorObj[item]?.inventory.seo_title}
                                error={
                                  errorObj[item]?.inventory.seo_title &&
                                  errorObj[item]?.inventory.seo_title !== ""
                                }
                              />
                            </Grid>
                            <Grid item md={12}>
                              <InputBox
                                id="meta_description"
                                label="Meta Description*"
                                onInputChange={(e) => {
                                  handleInputChange(e, item, "inventory");
                                }}
                                value={
                                  variationData[item].inventory.meta_description
                                }
                                inputlabelshrink
                                helperText={
                                  errorObj[item]?.inventory.meta_description
                                }
                                error={
                                  errorObj[item]?.inventory.meta_description &&
                                  errorObj[item]?.inventory.meta_description !==
                                    ""
                                }
                                placeholder="Enter Meta Description"
                              />
                            </Grid>
                            <Grid item md={12}>
                              <InputFieldWithChip
                                id="meta_keyword"
                                label="Meta Keywords*"
                                onInputChange={(e) => {}}
                                handleChange={(_, val) => {
                                  setVariationData((pre) => {
                                    const temp = JSON.parse(
                                      JSON.stringify(pre)
                                    );
                                    temp[item].inventory.meta_keyword = [
                                      ...val,
                                    ];
                                    return temp;
                                  });
                                }}
                                placeholder="Enter Meta Keywords"
                                value={
                                  variationData[item].inventory.meta_keyword
                                }
                                inputlabelshrink
                                helperText={
                                  errorObj[item]?.inventory.meta_keyword
                                }
                                error={
                                  errorObj[item]?.inventory.meta_keyword &&
                                  errorObj[item]?.inventory.meta_keyword !== ""
                                }
                              />
                            </Grid>
                          </Grid>
                        </div>
                        <div className="w-100 mt-3 pb-3">
                          <Grid container className="w-100" spacing={2}>
                            {Object.keys(optionsValue).map((ele, index) => {
                              return (
                                // eslint-disable-next-line react/no-array-index-key
                                <Grid item md={12} container key={index}>
                                  <Grid
                                    item
                                    md={4}
                                    className="d-flex align-items-center"
                                  >
                                    <Typography className="h-5">
                                      {optionsValue[ele][0].variationName}
                                    </Typography>
                                  </Grid>
                                  <Grid item md={8}>
                                    <SimpleDropdownComponent
                                      inputlabelshrink
                                      id={ele}
                                      list={[...optionsValue[ele]]}
                                      label=""
                                      size="small"
                                      fullWidth={false}
                                      value={
                                        variationData[item].variation?.[ele]
                                      }
                                      placeholder={`Select ${optionsValue[ele][0].variationName}`}
                                      onDropdownSelect={(value) => {
                                        handleDropDownChange(
                                          item,
                                          "variation",
                                          ele,
                                          value
                                        );
                                      }}
                                      helperText={
                                        errorObj[item]?.variation?.[ele]
                                      }
                                      error={
                                        errorObj[item]?.variation?.[ele] &&
                                        errorObj[item]?.variation?.[ele] !==
                                          null
                                      }
                                    />

                                    {variationData[item].variation?.[ele] !==
                                      null && (
                                      <Typography
                                        className="h-6 mt-1 cursor-pointer color-blue"
                                        onClick={() => {
                                          if (
                                            variationData[item].variation?.[ele]
                                          ) {
                                            const temp = JSON.parse(
                                              JSON.stringify(variationData)
                                            );
                                            Object.keys(temp).forEach(
                                              (element) => {
                                                temp[element].variation[ele] = {
                                                  ...variationData[item]
                                                    .variation?.[ele],
                                                };
                                              }
                                            );
                                            setVariationData(temp);
                                          }
                                        }}
                                      >
                                        Copy to all products
                                      </Typography>
                                    )}
                                  </Grid>
                                </Grid>
                              );
                            })}
                            {/* <Grid item md={12} container>
                          <Grid
                            item
                            md={4}
                            className="d-flex align-items-center"
                          >
                            <Typography className="h-5">Style Code</Typography>
                          </Grid>
                          <Grid item md={8}>
                            <SimpleDropdownComponent
                              inputlabelshrink
                              list={[]}
                              id={item}
                              label=""
                              size="small"
                              value={variationData[item]}
                              onDropdownSelect={(value) => {
                              handleDropDownChange(item,"attribute",ele,value)
                              }}
                            />
                          </Grid>
                        </Grid> */}
                            <Grid item md={12} container>
                              <Grid
                                item
                                md={4}
                                className="d-flex align-items-center"
                              >
                                <Typography className="h-5">
                                  Expire Date*
                                </Typography>
                              </Grid>
                              <Grid item md={8}>
                                <DatePickerComponent
                                  label=""
                                  size="small"
                                  value={
                                    variationData[item].variation.expiryDate
                                  }
                                  onDateChange={(val) => {
                                    setVariationData((pre) => {
                                      const temp = JSON.parse(
                                        JSON.stringify(pre)
                                      );
                                      temp[item].variation.expiryDate = val;
                                      return temp;
                                    });
                                  }}
                                />
                              </Grid>
                            </Grid>
                            <Grid item md={12} container>
                              <Grid
                                item
                                md={4}
                                className="d-flex align-items-center"
                              >
                                <Typography className="h-5">
                                  Country of Origin*
                                </Typography>
                              </Grid>
                              <Grid item md={8}>
                                <SimpleDropdownComponent
                                  placeholder="Select Country of Origin"
                                  inputlabelshrink
                                  list={[
                                    { id: 1, label: "India", value: "India" },
                                  ]}
                                  id={item}
                                  label=""
                                  size="small"
                                  value={
                                    variationData[item].variation
                                      .countryOfOrigin
                                  }
                                  onDropdownSelect={(value) => {
                                    handleDropDownChange(
                                      item,
                                      "variation",
                                      "countryOfOrigin",
                                      value
                                    );
                                  }}
                                  helperText={
                                    errorObj[item]?.variation.countryOfOrigin
                                  }
                                  error={
                                    errorObj[item]?.variation.countryOfOrigin &&
                                    errorObj[item]?.variation
                                      .countryOfOrigin !== null
                                  }
                                />
                              </Grid>
                            </Grid>
                            <Grid item md={12} container>
                              <Grid
                                item
                                md={4}
                                className="d-flex align-items-center"
                              >
                                <Typography className="h-5">Others*</Typography>
                              </Grid>
                              <Grid item md={8}>
                                <InputBox
                                  placeholder="Enter Other Info"
                                  id="others"
                                  label=""
                                  onInputChange={(e) => {
                                    handleInputChange(e, item, "variation");
                                  }}
                                  value={variationData[item].variation.others}
                                  inputlabelshrink
                                  isMultiline
                                  helperText={errorObj[item]?.variation.others}
                                  error={
                                    errorObj[item]?.variation.others &&
                                    errorObj[item]?.variation.others !== ""
                                  }
                                />
                              </Grid>
                            </Grid>
                            <Grid item md={6}>
                              <InputBox
                                id="sale_price"
                                label="Sale Price*"
                                onInputChange={(e) => {
                                  handleInputChange(e, item, "pricing");
                                }}
                                placeholder="Enter Sale Price"
                                value={variationData[item].pricing.sale_price}
                                inputlabelshrink
                                type="number"
                                helperText={errorObj[item]?.pricing.sale_price}
                                error={
                                  errorObj[item]?.pricing.sale_price &&
                                  errorObj[item]?.pricing.sale_price !== ""
                                }
                              />
                            </Grid>
                            <Grid item md={6}>
                              <InputBox
                                id="mrp"
                                label="MRP*"
                                placeholder="Enter MRP"
                                onInputChange={(e) => {
                                  handleInputChange(e, item, "pricing");
                                }}
                                value={variationData[item].pricing.mrp}
                                inputlabelshrink
                                helperText={errorObj[item]?.pricing.mrp}
                                error={
                                  errorObj[item]?.pricing.mrp &&
                                  errorObj[item]?.pricing.mrp !== ""
                                }
                              />
                            </Grid>
                            <Grid item md={12}>
                              <Box className=" d-flex align-items-center mb-2">
                                <CheckBoxComponent
                                  label=""
                                  size="small"
                                  showIcon
                                  varient="filled"
                                  isChecked={variationData[item].pricing.fd_rot}
                                  checkBoxClick={(_, val) => {
                                    setVariationData((pre) => {
                                      const temp = JSON.parse(
                                        JSON.stringify(pre)
                                      );
                                      temp[item].pricing.fd_rot = val;
                                      return temp;
                                    });
                                  }}
                                />
                                <Typography className="h-5">
                                  Provide Free Delivery & Return To Your
                                  Customer
                                </Typography>
                              </Box>
                              <InputBox
                                id="sale_price_logistics"
                                label="Sale Price With Logistics*"
                                placeholder="Enter Sale Price With Logistics"
                                onInputChange={(e) => {
                                  handleInputChange(e, item, "pricing");
                                }}
                                inputlabelshrink
                                helperText={
                                  errorObj[item]?.pricing.sale_price_logistics
                                }
                                value={
                                  variationData[item].pricing
                                    .sale_price_logistics
                                }
                                type="number"
                                error={
                                  errorObj[item]?.pricing
                                    .sale_price_logistics &&
                                  errorObj[item]?.pricing
                                    .sale_price_logistics !== null
                                }
                                disabled={!variationData[item].pricing.fd_rot}
                              />
                            </Grid>

                            <Grid item md={6}>
                              <div className="d-flex align-items-center justify-content-center">
                                <CheckBoxComponent
                                  label=""
                                  isChecked={
                                    variationData[item].pricing
                                      .return_order_accepted
                                  }
                                  checkBoxClick={(_, val) => {
                                    setVariationData((pre) => {
                                      const temp = JSON.parse(
                                        JSON.stringify(pre)
                                      );
                                      temp[item].pricing.return_order_accepted =
                                        val;
                                      return temp;
                                    });
                                  }}
                                  size="small"
                                  showIcon
                                  varient="filled"
                                />
                                <Typography className="fs-12 mt-1">
                                  Return Order Accepted
                                </Typography>
                              </div>
                            </Grid>

                            <Grid item md={6}>
                              <div className="d-flex align-items-center justify-content-center">
                                <CheckBoxComponent
                                  label=""
                                  isChecked={
                                    variationData[item].pricing.cash_on_delivary
                                  }
                                  checkBoxClick={(_, val) => {
                                    setVariationData((pre) => {
                                      const temp = JSON.parse(
                                        JSON.stringify(pre)
                                      );
                                      temp[item].pricing.cash_on_delivary = val;
                                      return temp;
                                    });
                                  }}
                                  size="small"
                                  showIcon
                                  varient="filled"
                                />
                                <Typography className="fs-12 mt-1">
                                  Cash on Delivary
                                </Typography>
                              </div>
                            </Grid>
                            {/* <Grid item md={6}>
                              <InputBox
                                id="delivery_charge"
                                label="Delivery Charge"
                                onInputChange={(e) => {
                                  handleInputChange(e, item, "pricing");
                                }}
                                value={
                                  variationData[item].pricing.delivery_charge
                                }
                                inputlabelshrink
                                type="number"
                                disabled
                                helperText={
                                  errorObj[item]?.pricing.delivery_charge
                                }
                                error={
                                  errorObj[item]?.pricing.delivery_charge &&
                                  errorObj[item]?.pricing.delivery_charge !== ""
                                }
                              />
                            </Grid> */}
                            {variationData[item].pricing
                              .return_order_accepted && (
                              <Grid item xs={12}>
                                <SimpleDropdownComponent
                                  list={returnOrderData}
                                  id="returnorder"
                                  label="Return Period*"
                                  size="small"
                                  value={
                                    variationData[item].pricing.returnorder
                                  }
                                  placeholder="Select Return Period"
                                  onDropdownSelect={(value) => {
                                    handleDropDownChange(
                                      item,
                                      "pricing",
                                      "returnorder",
                                      value
                                    );
                                  }}
                                  inputlabelshrink
                                />
                              </Grid>
                            )}
                            <Grid item md={12}>
                              <Typography className="h-4 color-orange fw-bold">
                                Pricing For MrMrsCart
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              md={12}
                              display="flex"
                              alignItems="center"
                            >
                              <CheckBoxComponent
                                label=""
                                isChecked={
                                  variationData[item].mmcartPricing.sellwithus
                                }
                                checkBoxClick={(_, val) => {
                                  setVariationData((pre) => {
                                    const temp = JSON.parse(
                                      JSON.stringify(pre)
                                    );
                                    temp[item].mmcartPricing.sellwithus = val;
                                    return temp;
                                  });
                                }}
                                showIcon
                                varient="filled"
                              />
                              <Typography component="span" className="h-5">
                                Do You Want To Sell With Us
                              </Typography>
                            </Grid>
                            <Grid item md={12}>
                              <InputBox
                                id="free_delivery"
                                label="Sale Price With Free Delivery Returns*"
                                inputlabelshrink
                                type="number"
                                value={
                                  variationData[item].mmcartPricing
                                    .free_delivery
                                }
                                placeholder="Enter Sale Price With Free Delivery Returns"
                                onInputChange={(e) => {
                                  handleInputChange(e, item, "mmcartPricing");
                                }}
                                disabled={
                                  !variationData[item].mmcartPricing.sellwithus
                                }
                                helperText={
                                  errorObj[item]?.mmcartPricing.free_delivery
                                }
                                error={
                                  errorObj[item]?.mmcartPricing.free_delivery &&
                                  errorObj[item]?.mmcartPricing
                                    .free_delivery !== ""
                                }
                              />
                            </Grid>
                            <Grid item md={12}>
                              <InputBox
                                id="paid_delivery"
                                placeholder="Enter Sale Price With Out Free Delivery Returns"
                                label="Sale Price With Out Free Delivery Returns*"
                                inputlabelshrink
                                type="number"
                                value={
                                  variationData[item].mmcartPricing
                                    .paid_delivery
                                }
                                onInputChange={(e) => {
                                  handleInputChange(e, item, "mmcartPricing");
                                }}
                                disabled={
                                  !variationData[item].mmcartPricing.sellwithus
                                }
                                helperText={
                                  errorObj[item]?.mmcartPricing.paid_delivery
                                }
                                error={
                                  errorObj[item]?.mmcartPricing.paid_delivery &&
                                  errorObj[item]?.mmcartPricing
                                    .paid_delivery !== ""
                                }
                              />
                            </Grid>
                            <Grid
                              item
                              md={6}
                              display="flex"
                              alignItems="center"
                            >
                              <CheckBoxComponent
                                label=""
                                isChecked={
                                  variationData[item].mmcartPricing.rto
                                }
                                checkBoxClick={(_, val) => {
                                  setVariationData((pre) => {
                                    const temp = JSON.parse(
                                      JSON.stringify(pre)
                                    );
                                    temp[item].mmcartPricing.rto = val;
                                    return temp;
                                  });
                                }}
                                showIcon
                                varient="filled"
                              />
                              <Typography component="span" className="h-5">
                                Return Order Accepted
                              </Typography>
                            </Grid>

                            <Grid
                              item
                              md={6}
                              display="flex"
                              alignItems="center"
                            >
                              <CheckBoxComponent
                                label=""
                                isChecked={
                                  variationData[item].mmcartPricing.cod
                                }
                                checkBoxClick={(_, val) => {
                                  setVariationData((pre) => {
                                    const temp = JSON.parse(
                                      JSON.stringify(pre)
                                    );
                                    temp[item].mmcartPricing.cod = val;
                                    return temp;
                                  });
                                }}
                                showIcon
                                varient="filled"
                              />
                              <Typography component="span" className="h-5">
                                Cash on Delivery Available
                              </Typography>
                            </Grid>
                            {variationData[item].mmcartPricing.rto && (
                              <Grid item xs={12}>
                                <SimpleDropdownComponent
                                  list={returnOrderData}
                                  id="returnorder"
                                  label="Return Period*"
                                  size="small"
                                  value={
                                    variationData[item].mmcartPricing
                                      .returnorder
                                  }
                                  onDropdownSelect={(value) => {
                                    handleDropDownChange(
                                      item,
                                      "mmcartPricing",
                                      "returnorder",
                                      value
                                    );
                                  }}
                                  inputlabelshrink
                                  placeholder="Return Period"
                                  helperText={
                                    errorObj[item]?.mmcartPricing.returnorder
                                  }
                                  error={
                                    errorObj[item]?.mmcartPricing.returnorder &&
                                    errorObj[item]?.mmcartPricing
                                      .returnorder !== ""
                                  }
                                />
                              </Grid>
                            )}
                            <Grid item md={12}>
                              <InputBox
                                id="product_weight"
                                label="Product Weight(inclusive of package)*"
                                onInputChange={(e) => {
                                  handleInputChange(e, item, "pricing");
                                }}
                                value={
                                  variationData[item].pricing.product_weight
                                }
                                inputlabelshrink
                                type="number"
                                placeholder="Weight in grams"
                                helperText={
                                  errorObj[item]?.pricing.product_weight
                                }
                                error={
                                  errorObj[item]?.pricing.product_weight &&
                                  errorObj[item]?.pricing.product_weight !== ""
                                }
                              />
                            </Grid>
                            <Grid item md={12}>
                              <InputBox
                                id="length"
                                label="Length(inclusive of package)*"
                                onInputChange={(e) => {
                                  handleInputChange(e, item, "pricing");
                                }}
                                value={variationData[item].pricing.length}
                                inputlabelshrink
                                type="number"
                                placeholder="Length in cms"
                                helperText={errorObj[item]?.pricing.length}
                                error={
                                  errorObj[item]?.pricing.length &&
                                  errorObj[item]?.pricing.length !== ""
                                }
                              />
                            </Grid>
                            <Grid item md={12}>
                              <InputBox
                                id="height"
                                label="Height(inclusive of package)*"
                                onInputChange={(e) => {
                                  handleInputChange(e, item, "pricing");
                                }}
                                value={variationData[item].pricing.height}
                                inputlabelshrink
                                type="number"
                                placeholder="Height in cms"
                                helperText={errorObj[item]?.pricing.height}
                                error={
                                  errorObj[item]?.pricing.height &&
                                  errorObj[item]?.pricing.height !== ""
                                }
                              />
                            </Grid>
                            <Grid item md={12}>
                              <InputBox
                                id="width"
                                label="Width(inclusive of package)*"
                                onInputChange={(e) => {
                                  handleInputChange(e, item, "pricing");
                                }}
                                value={variationData[item].pricing.width}
                                inputlabelshrink
                                type="number"
                                placeholder="Width in cms"
                                helperText={errorObj[item]?.pricing.width}
                                error={
                                  errorObj[item]?.pricing.width &&
                                  errorObj[item]?.pricing.width !== ""
                                }
                              />
                            </Grid>
                            <Grid item md={12}>
                              <InputBox
                                id="modalname"
                                label="Modal Name*"
                                onInputChange={(e) =>
                                  handleInputChange(e, item, "inventory")
                                }
                                value={variationData[item].inventory.modalname}
                                inputlabelshrink
                                helperText={errorObj.modalname}
                                error={
                                  errorObj[item]?.inventory.modalname &&
                                  errorObj[item]?.inventory.modalname !== ""
                                }
                                placeholder="Enter Modal Name"
                              />
                            </Grid>
                          </Grid>
                        </div>
                      </div>
                    </div>
                  </Paper>
                </div>
              );
            })}
          </div>
        </div>
        <div className="d-flex justify-content-end mb-3 me-3">
          <ButtonComponent
            label="Cancle"
            variant="outlined"
            size="small"
            onBtnClick={() => {}}
            muiProps="me-2"
          />
          <ButtonComponent
            label="Submit"
            size="small"
            onBtnClick={handleSubmit}
            muiProps="me-2"
          />
        </div>
      </div>
    );
  }
);
GroupVariationForm.displayName = "GroupVariationForm";
export default GroupVariationForm;
