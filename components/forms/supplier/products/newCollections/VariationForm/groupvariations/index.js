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
  shipping_class,
  stock_status,
} from "../../../newproductforms/constants";
import SimpleDropdownComponent from "components/atoms/SimpleDropdownComponent";
import CheckBoxComponent from "components/atoms/CheckboxComponent";
import DatePickerComponent from "components/atoms/DatePickerComponent";
import ButtonComponent from "components/atoms/ButtonComponent";
import { getBase64 } from "services/utils/functionUtils";

const GroupVariationForm = forwardRef(
  ({ formData = {}, setShowGroupVariant = () => {} }, ref) => {
    const tempObj = {
      images: [],
      inventory: {
        sku: "",
        stock_status: null,
        allow_backorders: "",
        stock_qty: "",
        back_Orders: "",
        shipping_class: "",
        product_title: "",
        business_processing_days: "",
        seo_title: "",
        meta_description: "",
        meta_keyword: "",
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
      },
      variation: {
        expiryDate: null,
        countryOfOrigin: null,
        others: "",
      },
      attribute: {},
      manageStock: false,
      expand: true,
    };

    const [variationData, setVariationData] = useState({});
    const [optionsValue, setoptionsValue] = useState({});
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

    return (
      <div className="d-flex flex-column w-100">
        <div className="p-3 pb-1">
          <div
            className="h-5 color-orange cursor-pointer"
            onClick={() => {
              setShowGroupVariant(false);
            }}
          >
            {"<"}Back
          </div>
          <div className="  mxw-85vw  d-flex mb-2 py-1 pb-2  hide-scrollbar h-92 overflow-x-scroll">
            {Object.keys(variationData).map((item, index) => {
              return (
                <Paper
                  className={` mx-2 px-2 mt-1 overflow-y-scroll hide-scrollbar ${
                    variationData[item].expand ? "h-100" : "height-fit-content"
                  }`}
                  sx={{ minWidth: "400px", maxWidth: "500px" }}
                  elevation={3}
                >
                  <div className={` pb-3 `}>
                    {/* variationData[item].expand ? styles.expand : styles.shrink */}
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
                              value={variationData[item].inventory.stock_status}
                              onDropdownSelect={(value) => {
                                handleDropDownChange(
                                  item,
                                  "inventory",
                                  "stock_status",
                                  value
                                );
                              }}
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
                                />
                              </Grid>
                              <Grid item md={6}>
                                <InputBox
                                  id="stock_qty"
                                  label="Stock Qty"
                                  onInputChange={(e) => {
                                    handleInputChange(e, item, "inventory");
                                  }}
                                  value={
                                    variationData[item].inventory.stock_qty
                                  }
                                  inputlabelshrink
                                />
                              </Grid>
                              <Grid item md={6}>
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
                              </Grid>
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
                            />
                          </Grid>
                          <Grid item md={12}>
                            <InputBox
                              id="business_processing_days"
                              label="Business Processing Days"
                              onInputChange={(e) => {
                                handleInputChange(e, item, "inventory");
                              }}
                              value={
                                variationData[item].inventory
                                  .business_processing_days
                              }
                              inputlabelshrink
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
                            />
                          </Grid>
                          <Grid item md={12}>
                            <InputBox
                              id="meta_keyword"
                              label="Meta Keywords"
                              onInputChange={(e) => {
                                handleInputChange(e, item, "inventory");
                              }}
                              value={variationData[item].inventory.meta_keyword}
                              inputlabelshrink
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
                                  <Typography className="h-5">{ele}</Typography>
                                </Grid>
                                <Grid item md={8}>
                                  <SimpleDropdownComponent
                                    inputlabelshrink
                                    id={ele}
                                    list={[...optionsValue[ele]]}
                                    label=""
                                    size="small"
                                    fullWidth={false}
                                    value={variationData[item].attribute?.[ele]}
                                    onDropdownSelect={(value) => {
                                      handleDropDownChange(
                                        item,
                                        "attribute",
                                        ele,
                                        value
                                      );
                                    }}
                                  />

                                  <Typography
                                    className="h-6 mt-1 cursor-pointer color-blue"
                                    onClick={() => {
                                      if (
                                        variationData[item].attribute?.[ele]
                                      ) {
                                        const temp = JSON.parse(
                                          JSON.stringify(variationData)
                                        );
                                        Object.keys(temp).forEach((element) => {
                                          temp[element].attribute[ele] = {
                                            ...variationData[item].attribute?.[
                                              ele
                                            ],
                                          };
                                        });
                                        setVariationData(temp);
                                      }
                                    }}
                                  >
                                    Copy to all products
                                  </Typography>
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
                                value={variationData[item].variation.expiryDate}
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
                                  variationData[item].variation.countryOfOrigin
                                }
                                onDropdownSelect={(value) => {
                                  handleDropDownChange(
                                    item,
                                    "variation",
                                    "countryOfOrigin",
                                    value
                                  );
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
                                  variationData[item].pricing.cash_on_accepted
                                }
                                checkBoxClick={(_, val) => {
                                  setVariationData((pre) => {
                                    const temp = JSON.parse(
                                      JSON.stringify(pre)
                                    );
                                    temp[item].pricing.cash_on_accepted = val;
                                    return temp;
                                  });
                                }}
                                size="small"
                                showIcon
                                varient="filled"
                              />
                              <Typography className="fs-12 mt-1">
                                Cash on Accepted
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
                            />
                          </Grid>
                          <Grid item md={12}>
                            <InputBox
                              id="product_weight"
                              label="Product Weight(inclusive of package)"
                              onInputChange={(e) => {
                                handleInputChange(e, item, "pricing");
                              }}
                              value={variationData[item].pricing.product_weight}
                              inputlabelshrink
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
                            />
                          </Grid>
                        </Grid>
                      </div>
                    </div>
                  </div>
                </Paper>
              );
            })}
          </div>
        </div>
        <div className="d-flex justify-content-end">
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
            onBtnClick={() => {
              console.log({ variationData });
            }}
            muiProps="me-2"
          />
        </div>
      </div>
    );
  }
);
GroupVariationForm.displayName = "GroupVariationForm";
export default GroupVariationForm;
