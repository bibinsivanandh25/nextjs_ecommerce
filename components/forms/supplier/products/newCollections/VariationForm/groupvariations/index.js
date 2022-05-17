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

const GroupVariationForm = forwardRef(
  ({ formData = {}, setShowGroupVariant = () => {} }, ref) => {
    const tempObj = {
      images: [],
      inventory: {
        sku: "",
        stock_status: "",
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
        cash_on_accepted: "",
        product_weight: "",
        length: "",
        width: "",
        height: "",
        delivery_charge: "",
      },
      variation: {
        expiryDate: "",
        countryOfOrigin: "",
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

    return (
      <div className="p-4">
        <div
          className="h-5 color-orange cursor-pointer"
          onClick={() => {
            setShowGroupVariant(false);
          }}
        >
          {"<"}Back
        </div>
        <div className="  mxw-85vw  d-flex mb-2 pb-2 h-100">
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
                      variationData[item].expand ? styles.expand : styles.shrink
                    }`}
                  >
                    <div className={` d-flex p-2 overflow-auto hide-scrollbar`}>
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
                            onInputChange={() => {}}
                            value={""}
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
                                  const temp = JSON.parse(JSON.stringify(pre));
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
                            value={""}
                            onDropdownSelect={(value) => {}}
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
                                value={""}
                                onDropdownSelect={(value) => {}}
                              />
                            </Grid>
                            <Grid item md={6}>
                              <InputBox
                                id="stock_qty"
                                label="Stock Qty"
                                onInputChange={() => {}}
                                value={""}
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
                                value={""}
                                onDropdownSelect={(value) => {}}
                              />
                            </Grid>
                          </>
                        ) : null}
                        <Grid item md={12}>
                          <SimpleDropdownComponent
                            inputlabelshrink
                            list={[shipping_class]}
                            id="ShippingClass"
                            label="Shipping Class"
                            size="small"
                            fullWidth={false}
                            value={""}
                            onDropdownSelect={(value) => {}}
                          />
                        </Grid>
                        <Grid item md={12}>
                          <InputBox
                            id="product_title"
                            label="Product Title"
                            onInputChange={() => {}}
                            value={""}
                            inputlabelshrink
                          />
                        </Grid>
                        <Grid item md={12}>
                          <InputBox
                            id="business_processing_days"
                            label="Business Processing Days"
                            onInputChange={() => {}}
                            value={""}
                            inputlabelshrink
                          />
                        </Grid>
                        <Grid item md={12}>
                          <InputBox
                            id="seo_title"
                            label="SEO Title"
                            onInputChange={() => {}}
                            value={""}
                            inputlabelshrink
                          />
                        </Grid>
                        <Grid item md={12}>
                          <InputBox
                            id="meta_description"
                            label="Meta Description"
                            onInputChange={() => {}}
                            value={""}
                            inputlabelshrink
                          />
                        </Grid>
                        <Grid item md={12}>
                          <InputBox
                            id="meta_keyword"
                            label="Meta Keywords"
                            onInputChange={() => {}}
                            value={""}
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
                                  list={[...optionsValue[ele]]}
                                  id={item}
                                  label=""
                                  size="small"
                                  fullWidth={false}
                                  value={""}
                                  onDropdownSelect={(value) => {}}
                                />
                              </Grid>
                            </Grid>
                          );
                        })}
                        <Grid item md={12} container>
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
                              value={""}
                              onDropdownSelect={(value) => {}}
                            />
                          </Grid>
                        </Grid>
                        <Grid item md={12} container>
                          <Grid
                            item
                            md={4}
                            className="d-flex align-items-center"
                          >
                            <Typography className="h-5">Expire Date</Typography>
                          </Grid>
                          <Grid item md={8}>
                            <DatePickerComponent
                              label=""
                              size="medium"
                              value={null}
                              onDateChange={() => {}}
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
                              list={[]}
                              id={item}
                              label=""
                              size="small"
                              value={""}
                              onDropdownSelect={(value) => {}}
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
                              onInputChange={() => {}}
                              value={""}
                              inputlabelshrink
                              isMultiline
                            />
                          </Grid>
                        </Grid>
                        <Grid item md={6}>
                          <InputBox
                            id="sale_price"
                            label="Sale Price"
                            onInputChange={() => {}}
                            value={""}
                            inputlabelshrink
                          />
                        </Grid>
                        <Grid item md={6}>
                          <InputBox
                            id="mrp"
                            label="MRP"
                            onInputChange={() => {}}
                            value={""}
                            inputlabelshrink
                          />
                        </Grid>
                        <Grid item md={6}>
                          <div className="d-flex align-items-center justify-content-center">
                            <CheckBoxComponent
                              label=""
                              isChecked={false}
                              checkBoxClick={() => {}}
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
                              isChecked={false}
                              checkBoxClick={() => {}}
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
                            onInputChange={() => {}}
                            value={""}
                            inputlabelshrink
                          />
                        </Grid>
                        <Grid item md={12}>
                          <InputBox
                            id="product_weight"
                            label="Product Weight(inclusive of package)"
                            onInputChange={() => {}}
                            value={""}
                            inputlabelshrink
                          />
                        </Grid>
                        <Grid item md={12}>
                          <InputBox
                            id="length"
                            label="Length(inclusive of package)"
                            onInputChange={() => {}}
                            value={""}
                            inputlabelshrink
                          />
                        </Grid>
                        <Grid item md={12}>
                          <InputBox
                            id="height"
                            label="Height(inclusive of package)"
                            onInputChange={() => {}}
                            value={""}
                            inputlabelshrink
                          />
                        </Grid>
                        <Grid item md={12}>
                          <InputBox
                            id="width"
                            label="Width(inclusive of package)"
                            onInputChange={() => {}}
                            value={""}
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
    );
  }
);
GroupVariationForm.displayName = "GroupVariationForm";
export default GroupVariationForm;
