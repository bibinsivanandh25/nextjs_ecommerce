import { Box, Grid, Paper, Typography } from "@mui/material";
import { forwardRef, useEffect, useState } from "react";
import styles from "./InvoiceCardComponent.module.css";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import ImageCard from "components/atoms/ImageCard";
import InputBox from "components/atoms/InputBoxComponent";
import {
  allowback_orders,
  back_orders,
  business_processing_days,
  shipping_class,
  stock_status,
} from "../../../newproductforms/constants";
import SimpleDropdownComponent from "components/atoms/SimpleDropdownComponent";
import CheckBoxComponent from "components/atoms/CheckboxComponent";
import DatePickerComponent from "components/atoms/DatePickerComponent";
import ButtonComponent from "components/atoms/ButtonComponent";
import { getBase64 } from "services/utils/functionUtils";
import InputFieldWithChip from "components/atoms/InputWithChip";
import validateMessage from "constants/validateMessages";
import toastify from "services/utils/toastUtils";
import validationRegex from "services/utils/regexUtils";

const GroupVariationForm = forwardRef(
  ({ formData = {}, setShowGroupVariant = () => {} }, ref) => {
    const tempObj = {
      images: [],
      inventory: {
        sku: "",
        stock_status: null,
        allow_backorders: null,
        stock_qty: "",
        back_Orders: "",
        shipping_class: "",
        product_title: "",
        business_processing_days: null,
        seo_title: "",
        meta_description: "",
        meta_keyword: [],
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
      },
      variation: {
        expiryDate: null,
        countryOfOrigin: null,
        others: "",
      },
      manageStock: false,
      expand: true,
    };

    const [variationData, setVariationData] = useState({});
    const [optionsValue, setoptionsValue] = useState({});
    const [emptyObj, setEmptyObj] = useState({});
    const [errorObj, setErrorObj] = useState({});
    useEffect(() => {
      if (formData?.variationImages.length) {
        const temp = {};
        const dropDownVal = {};
        formData?.variationImages.forEach((item, ind) => {
          temp[`variation${ind + 1}`] = {
            ...JSON.parse(JSON.stringify(tempObj)),
          };
          temp[`variation${ind + 1}`].images = Array(5);
          temp[`variation${ind + 1}`].images.fill("");
          temp[`variation${ind + 1}`].images[0] = item;
          Object.entries(formData.attribute).forEach(([key, val]) => {
            temp[`variation${ind + 1}`].variation[key] = null;
            const ddval = val.map((ele) => {
              return {
                id: ele?.id ?? "",
                label: ele.title,
                value: ele.value,
              };
            });
            dropDownVal[key] = [...ddval];
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

    const validate = () => {
      const errObj = JSON.parse(JSON.stringify({ ...emptyObj }));
      let flag = false;
      Object.keys(emptyObj).forEach((item, index) => {
        Object.keys(variationData[item]).forEach((ele, ind) => {
          if (ele !== "images") {
            if (ele === "inventory") {
              const tempInventory = { ...variationData[item].inventory };
              if (tempInventory.stock_status === null) {
                flag = true;
                errObj[item].inventory.stock_status =
                  validateMessage.field_required;
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
                }
                if (tempInventory.allow_backorders === null) {
                  flag = true;
                  errObj[item].inventory.allow_backorders =
                    validateMessage.field_required;
                }
              }
              if (tempInventory.business_processing_days === null) {
                flag = true;
                errObj[item].inventory.business_processing_days =
                  validateMessage.field_required;
              }

              if (tempInventory.seo_title === "") {
                flag = true;
                errObj[item].inventory.seo_title =
                  validateMessage.field_required;
              } else if (tempInventory.seo_title.length > 100) {
                flag = true;
                errObj[item].inventory.seo_title =
                  validateMessage.alpha_numeric_max_100;
              }
              if (tempInventory.meta_description === "") {
                flag = true;
                errObj[item].inventory.meta_description =
                  validateMessage.field_required;
              } else if (tempInventory.meta_description.length > 100) {
                flag = true;
                errObj[item].inventory.meta_description =
                  validateMessage.alpha_numeric_max_100;
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
              }
            } else if (ele === "pricing") {
              const tempPricing = { ...variationData[item].pricing };
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
              }
              if (tempPricing.length === "") {
                flag = true;
                errObj[item].pricing.length = validateMessage.field_required;
              }
              if (tempPricing.width === "") {
                flag = true;
                errObj[item].pricing.width = validateMessage.field_required;
              }
              if (tempPricing.height === "") {
                flag = true;
                errObj[item].pricing.height = validateMessage.field_required;
              }
            } else if (ele === "variation") {
              const tempVariation = { ...variationData[item].variation };
              if (tempVariation.expiryDate === null) {
                flag = true;
                errObj[item].variation.expiryDate =
                  validateMessage.field_required;
              }
              if (tempVariation.countryOfOrigin === null) {
                flag = true;
                errObj[item].variation.countryOfOrigin =
                  validateMessage.field_required;
              }
              if (tempVariation.others === "") {
                flag = true;
                errObj[item].variation.others = validateMessage.field_required;
              } else if (tempVariation.others.length > 255) {
                flag = true;
                errObj[item].variation.others =
                  validateMessage.alpha_numeric_max_255;
              }
              Object.keys(tempVariation).forEach((element) => {
                if (
                  !["expiryDate", "countryOfOrigin", "others"].includes(element)
                ) {
                  if (tempVariation[element] === null) {
                    flag = true;
                    errObj[item].variation[element] =
                      validateMessage.field_required;
                  }
                }
              });
            }
          }
        });
      });
      setErrorObj(errObj);
      return flag;
    };

    const handleSubmit = () => {
      const flag = validate();
      console.log({ variationData });
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
                                label="Stock Status"
                                size="small"
                                fullWidth={false}
                                className="w-70p"
                                value={
                                  variationData[item].inventory.stock_status
                                }
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
                                    label="Allow Backorders ?"
                                    size="small"
                                    fullWidth={false}
                                    value={
                                      variationData[item].inventory
                                        .allow_backorders
                                    }
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
                                <Grid item md={12}>
                                  <InputBox
                                    id="stock_qty"
                                    label="Stock Qty"
                                    onInputChange={(e) => {
                                      handleInputChange(e, item, "inventory");
                                    }}
                                    value={
                                      variationData[item].inventory.stock_qty
                                    }
                                    type="number"
                                    inputlabelshrink
                                    helperText={
                                      errorObj[item]?.inventory.stock_qty
                                    }
                                    error={
                                      errorObj[item]?.inventory.stock_qty &&
                                      errorObj[item]?.inventory.stock_qty !== ""
                                    }
                                  />
                                </Grid>
                                {/* <Grid item md={6}>
                                <SimpleDropdownComponent
                                  inputlabelshrink
                                  list={back_orders}
                                  id="Backorders"
                                  label="Back Orders"
                                  size="small"
                                  fullWidth={false}
                                  value={
                                    variationData[item].inventory.back_Orders
                                  }
                                  onDropdownSelect={(value) => {
                                    handleDropDownChange(
                                      item,
                                      "inventory",
                                      "back_Orders",
                                      value
                                    );
                                  }}
                                />
                              </Grid> */}
                              </>
                            ) : null}
                            <Grid item md={12}>
                              <SimpleDropdownComponent
                                inputlabelshrink
                                list={[...shipping_class]}
                                id="ShippingClass"
                                label="Shipping Class"
                                size="small"
                                fullWidth={false}
                                value={
                                  variationData[item].inventory.shipping_class
                                }
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
                                label="Product Title"
                                onInputChange={(e) => {
                                  handleInputChange(e, item, "inventory");
                                }}
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
                                list={[...business_processing_days]}
                                id="business_processing_days"
                                label="Business Processing Days"
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
                              <InputBox
                                id="seo_title"
                                label="SEO Title"
                                onInputChange={(e) => {
                                  handleInputChange(e, item, "inventory");
                                }}
                                value={variationData[item].inventory.seo_title}
                                inputlabelshrink
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
                                label="Meta Description"
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
                              />
                            </Grid>
                            <Grid item md={12}>
                              <InputFieldWithChip
                                id="meta_keyword"
                                label="Meta Keywords"
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
                            {Object.keys(optionsValue).map((ele) => {
                              return (
                                <Grid item md={12} container>
                                  <Grid
                                    item
                                    md={4}
                                    className="d-flex align-items-center"
                                  >
                                    <Typography className="h-5">
                                      {ele}
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
                                  Expire Date
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
                                  Country of Origin
                                </Typography>
                              </Grid>
                              <Grid item md={8}>
                                <SimpleDropdownComponent
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
                                <Typography className="h-5">Others</Typography>
                              </Grid>
                              <Grid item md={8}>
                                <InputBox
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
                                label="Sale Price"
                                onInputChange={(e) => {
                                  handleInputChange(e, item, "pricing");
                                }}
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
                                label="MRP"
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
                            <Grid item md={6}>
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
                            </Grid>
                            <Grid item md={12}>
                              <InputBox
                                id="product_weight"
                                label="Product Weight(inclusive of package)"
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
                                label="Length(inclusive of package)"
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
                                label="Height(inclusive of package)"
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
                                label="Width(inclusive of package)"
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
            variant={"outlined"}
            size={"small"}
            onBtnClick={() => {}}
            muiProps="me-2"
          />
          <ButtonComponent
            label="Submit"
            size={"small"}
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
