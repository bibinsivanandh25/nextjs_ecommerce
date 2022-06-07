import { Box, Grid, Paper, Typography } from "@mui/material";
import CheckBoxComponent from "components/atoms/CheckboxComponent";
import InputBox from "components/atoms/InputBoxComponent";
import InputFieldWithChip from "components/atoms/InputWithChip";
import SimpleDropdownComponent from "components/atoms/SimpleDropdownComponent";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import validateMessage from "constants/validateMessages";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import {
  allowback_orders,
  back_orders,
  business_processing_days,
  shipping_class,
  stock_status,
} from "../../../../../../constants/constants";

const InventoryForm = forwardRef(({ formData = {} }, ref) => {
  const [manageStock, setManageStock] = useState(false);
  const [inventoryFormData, setInventoryFormData] = useState({
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
  });
  const [errorObj, setErrorObj] = useState({
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
  });
  const handleInputChange = (e) => {
    setInventoryFormData((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };
  const handleDropdownChange = (value, key) => {
    setInventoryFormData((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const validate = () => {
    let flag = false;
    const errObj = {
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
    };
    if (inventoryFormData.stock_status === null) {
      flag = true;
      errObj.stock_status = validateMessage.field_required;
    }
    if (manageStock) {
      if (inventoryFormData.stock_qty === "") {
        flag = true;
        errObj.stock_qty = validateMessage.field_required;
      } else if (parseInt(inventoryFormData.stock_qty) < 1) {
        flag = true;
        errObj.stock_qty = "Stock Qty must be greater then or equal to 1";
      }
      if (inventoryFormData.allow_backorders === null) {
        flag = true;
        errObj.allow_backorders = validateMessage.field_required;
      }
    }
    if (inventoryFormData.business_processing_days === null) {
      flag = true;
      errObj.business_processing_days = validateMessage.field_required;
    }

    if (inventoryFormData.seo_title === "") {
      flag = true;
      errObj.seo_title = validateMessage.field_required;
    } else if (inventoryFormData.seo_title.length > 100) {
      flag = true;
      errObj.seo_title = validateMessage.alpha_numeric_max_100;
    }
    if (inventoryFormData.meta_description === "") {
      flag = true;
      errObj.meta_description = validateMessage.field_required;
    } else if (inventoryFormData.meta_description.length > 100) {
      flag = true;
      errObj.meta_description = validateMessage.alpha_numeric_max_100;
    }

    if (!inventoryFormData.meta_keyword.length) {
      flag = true;
      errObj.meta_keyword = validateMessage.field_required;
    } else
      inventoryFormData.meta_keyword.forEach((ele) => {
        if (ele.length > 15) {
          flag = true;
          errObj.meta_keyword = validateMessage.field_required;
        }
      });
    if (inventoryFormData.product_title === "") {
      flag = true;
      errObj.product_title = validateMessage.field_required;
    } else if (inventoryFormData.product_title.length > 100) {
      flag = true;
      errObj.product_title = validateMessage.alpha_numeric_max_100;
    }
    setErrorObj(errObj);
    return !flag;
  };

  useEffect(() => {
    setInventoryFormData({ ...formData.inventory });
  }, [formData]);

  useImperativeHandle(ref, () => {
    return {
      handleSendFormData: () => {
        return ["inventory", { ...inventoryFormData }];
      },
      validate: validate,
    };
  });
  return (
    <div className="w-100">
      <Grid container className="w-100" spacing={2}>
        <Grid item md={12} className="d-flex align-items-center">
          <div className="w-70p">
            <InputBox
              id="sku"
              label="SKU"
              onInputChange={handleInputChange}
              value={inventoryFormData.sku}
              placeholder="SKU"
              inputlabelshrink
              fullWidth
              // className="w-90p"
              disabled
              helperText={errorObj.sku}
              error={errorObj.sku && errorObj.sku !== ""}
            />
          </div>
          <div className="mx-2">
            <InfoOutlinedIcon />
          </div>
        </Grid>
        <Grid item md={12} className="pt-4">
          <div className="d-flex align-items-center">
            <Typography className="fw-600 me-3">Manage Stocks?</Typography>
            <CheckBoxComponent
              label=""
              isChecked={manageStock}
              checkBoxClick={() => {
                setManageStock(!manageStock);
              }}
              size="small"
              showIcon
              varient="filled"
            />
          </div>
        </Grid>
        <Grid item md={12} className="d-flex align-items-center">
          <div className="w-70p">
            <SimpleDropdownComponent
              inputlabelshrink
              list={stock_status}
              id="stockstatus"
              label="Stock Status"
              size="small"
              // fullWidth={false}
              // className="w-70p"
              value={inventoryFormData.stock_status}
              onDropdownSelect={(value) => {
                handleDropdownChange(value, "stock_status");
              }}
              helperText={errorObj.stock_status}
              error={errorObj.stock_status !== ""}
            />
          </div>
          <div className="mx-2">
            <InfoOutlinedIcon />
          </div>
        </Grid>
        {manageStock ? (
          <>
            <Grid item md={12} className="d-flex align-items-center">
              <div className="w-70p">
                <SimpleDropdownComponent
                  inputlabelshrink
                  list={allowback_orders}
                  id="Allow Backorders ?"
                  label="Allow Backorders ?"
                  size="small"
                  fullWidth={false}
                  value={inventoryFormData.allow_backorders}
                  onDropdownSelect={(value) => {
                    handleDropdownChange(value, "allow_backorders");
                  }}
                  helperText={errorObj.allow_backorders}
                  error={errorObj.allow_backorders !== ""}
                />
              </div>
              <div className="mx-2">
                <InfoOutlinedIcon />
              </div>
            </Grid>
            <Grid item md={12}>
              <InputBox
                id="stock_qty"
                label="Stock Qty"
                onInputChange={handleInputChange}
                value={inventoryFormData.stock_qty}
                inputlabelshrink
                type="number"
                helperText={errorObj.stock_qty}
                error={errorObj.stock_qty && errorObj.stock_qty !== ""}
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
                  value={inventoryFormData.back_Orders}
                  onDropdownSelect={(value) => {
                    handleDropdownChange(value, "back_Orders");
                  }}
                />
              </Grid> */}
          </>
        ) : null}
        <Grid item md={12}>
          <SimpleDropdownComponent
            inputlabelshrink
            list={shipping_class}
            id="ShippingClass"
            label="Shipping Class"
            size="small"
            fullWidth={false}
            value={inventoryFormData.shipping_class}
            onDropdownSelect={(value) => {
              handleDropdownChange(value, "shipping_class");
            }}
            helperText={errorObj.shipping_class}
            error={errorObj.shipping_class !== ""}
          />
        </Grid>
        <Grid item md={12}>
          <InputBox
            id="product_title"
            label="Product Title"
            onInputChange={handleInputChange}
            value={inventoryFormData.product_title}
            inputlabelshrink
            helperText={errorObj.product_title}
            error={errorObj.product_title !== ""}
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
            value={inventoryFormData.business_processing_days}
            onDropdownSelect={(value) => {
              setInventoryFormData((pre) => ({
                ...pre,
                business_processing_days: value,
              }));
            }}
            helperText={errorObj.business_processing_days}
            error={
              errorObj.business_processing_days &&
              errorObj.business_processing_days !== null
            }
          />
        </Grid>
        <Grid item md={12}>
          <InputBox
            id="seo_title"
            label="SEO Title"
            onInputChange={handleInputChange}
            value={inventoryFormData.seo_title}
            inputlabelshrink
            helperText={errorObj.seo_title}
            error={errorObj.seo_title && errorObj.seo_title !== ""}
          />
        </Grid>
        <Grid item md={12}>
          <InputBox
            id="meta_description"
            label="Meta Description"
            onInputChange={handleInputChange}
            value={inventoryFormData.meta_description}
            inputlabelshrink
            helperText={errorObj.meta_description}
            error={
              errorObj.meta_description && errorObj.meta_description !== ""
            }
          />
        </Grid>
        <Grid item md={12}>
          <InputFieldWithChip
            id="meta_keyword"
            label="Meta Keywords"
            value={inventoryFormData.meta_keyword}
            inputlabelshrink
            handleChange={(_, val) => {
              setInventoryFormData((pre) => ({
                ...pre,
                meta_keyword: [...val],
              }));
            }}
            helperText={errorObj.meta_keyword}
            error={errorObj.meta_keyword !== ""}
          />
        </Grid>
      </Grid>
    </div>
  );
});
InventoryForm.displayName = "InventoryForm";
export default InventoryForm;
