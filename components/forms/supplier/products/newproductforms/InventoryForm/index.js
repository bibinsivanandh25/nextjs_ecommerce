import { Grid, Typography } from "@mui/material";
import CheckBoxComponent from "components/atoms/CheckboxComponent";
import InputBox from "components/atoms/InputBoxComponent";
import InputFieldWithChip from "components/atoms/InputWithChip";
import SimpleDropdownComponent from "components/atoms/SimpleDropdownComponent";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import validateMessage from "constants/validateMessages";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import {
  allowback_orders,
  business_processing_days,
  shipping_class,
  stock_status,
} from "../../../../../../constants/constants";

const InventoryForm = forwardRef(({ formData = {} }, ref) => {
  const [manageStock, setManageStock] = useState(false);
  const [inventoryFormData, setInventoryFormData] = useState({
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
  });
  const [errorObj, setErrorObj] = useState({
    sku: "",
    stockqty: "",
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
    modalname: "",
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
      stockqty: "",
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
      modalname: "",
    };
    if (inventoryFormData.stock_status === null) {
      flag = true;
      errObj.stock_status = validateMessage.field_required;
    }
    if (manageStock) {
      if (inventoryFormData.stock_qty === "") {
        flag = true;
        errObj.stock_qty = validateMessage.field_required;
      } else if (parseInt(inventoryFormData.stock_qty, 10) < 1) {
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

    if (!inventoryFormData.seo_title.length) {
      flag = true;
      errObj.seo_title = validateMessage.field_required;
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
    if (inventoryFormData.modalname === "") {
      flag = true;
      errObj.modalname = validateMessage.field_required;
    } else if (inventoryFormData.modalname?.length > 100) {
      flag = true;
      errObj.modalname = validateMessage.alpha_numeric_max_100;
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
      validate,
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
        <Grid item md={12} className="d-flex align-items-center">
          <div className="w-70p">
            <InputBox
              id="stockqty"
              label="Stock Qty"
              onInputChange={handleInputChange}
              value={inventoryFormData.stockqty}
              placeholder="Stock Qty"
              inputlabelshrink
              fullWidth
              // className="w-90p"
              disabled
              helperText={errorObj.stockqty}
              error={errorObj.stockqty && errorObj.stockqty !== ""}
            />
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
              placeholder="Select stock status"
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
            {inventoryFormData.allow_backorders?.value === "allow" ? (
              <Grid item md={12}>
                <InputBox
                  id="back_Orders"
                  label="Back Orders"
                  onInputChange={handleInputChange}
                  value={inventoryFormData.back_Orders}
                  placeholder="Back Orders"
                  inputlabelshrink
                  fullWidth
                  // className="w-90p"
                  // disabled
                  helperText={errorObj.back_Orders}
                  error={errorObj.back_Orders && errorObj.back_Orders !== ""}
                />
              </Grid>
            ) : null}
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
            placeholder="Select shipping class"
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
            placeholder="Enter product title"
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
            placeholder="Select processing days"
          />
        </Grid>
        <Grid item md={12}>
          <InputFieldWithChip
            id="seo_title"
            label="SEO Title"
            value={inventoryFormData.seo_title}
            inputlabelshrink
            handleChange={(_, val) => {
              setInventoryFormData((pre) => ({
                ...pre,
                seo_title: [...val],
              }));
            }}
            helperText={errorObj.seo_title}
            error={errorObj.seo_title && errorObj.seo_title !== ""}
            placeholder="Enter SEO title"
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
            placeholder="Enter meta description"
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
            placeholder="Enter keywords"
          />
        </Grid>
        <Grid item md={12}>
          <InputBox
            id="modalname"
            label="Modal Name"
            onInputChange={handleInputChange}
            value={inventoryFormData.modalname}
            inputlabelshrink
            helperText={errorObj.modalname}
            error={errorObj.modalname && errorObj.modalname !== ""}
            placeholder="Enter Modal Name"
          />
        </Grid>
      </Grid>
    </div>
  );
});
InventoryForm.displayName = "InventoryForm";
export default InventoryForm;
