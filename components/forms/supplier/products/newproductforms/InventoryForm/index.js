import { Box, Grid, Paper, Typography } from "@mui/material";
import CheckBoxComponent from "components/atoms/CheckboxComponent";
import InputBox from "components/atoms/InputBoxComponent";
import SimpleDropdownComponent from "components/atoms/SimpleDropdownComponent";
import { forwardRef, useImperativeHandle, useState } from "react";
import {
  allowback_orders,
  back_orders,
  shipping_class,
  stock_status,
} from "../constants";

const InventoryForm = forwardRef(
  ({ formData = {}, setFormData = () => {} }, ref) => {
    const [manageStock, setManageStock] = useState(false);
    const [inventoryFormData, setInventoryFormData] = useState({
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
    useImperativeHandle(ref, () => {
      return {
        handleSendFormData: () => {
          return ["inventory", { ...inventoryFormData }];
        },
      };
    });
    return (
      <div className="w-100">
        <Grid container className="w-100" spacing={2}>
          <Grid item md={12}>
            <InputBox
              id="sku"
              label="SKU"
              onInputChange={handleInputChange}
              value={inventoryFormData.sku}
              placeholder="SKU"
              inputlabelshrink
              fullWidth={false}
              className="w-70p"
            />
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
          <Grid item md={12}>
            <SimpleDropdownComponent
              inputlabelshrink
              list={stock_status}
              id="stockstatus"
              label="Stock Status"
              size="small"
              fullWidth={false}
              className="w-70p"
              value={inventoryFormData.stock_status}
              onDropdownSelect={(value) => {
                handleDropdownChange(value, "stock_status");
              }}
            />
          </Grid>
          {manageStock ? (
            <>
              <Grid item md={12}>
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
                />
              </Grid>
              <Grid item md={6}>
                <InputBox
                  id="stock_qty"
                  label="Stock Qty"
                  onInputChange={handleInputChange}
                  value={inventoryFormData.stock_qty}
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
                  value={inventoryFormData.back_Orders}
                  onDropdownSelect={(value) => {
                    handleDropdownChange(value, "back_Orders");
                  }}
                />
              </Grid>
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
            />
          </Grid>
          <Grid item md={12}>
            <InputBox
              id="product_title"
              label="Product Title"
              onInputChange={handleInputChange}
              value={inventoryFormData.product_title}
              inputlabelshrink
            />
          </Grid>
          <Grid item md={12}>
            <InputBox
              id="business_processing_days"
              label="Business Processing Days"
              onInputChange={handleInputChange}
              value={inventoryFormData.business_processing_days}
              inputlabelshrink
            />
          </Grid>
          <Grid item md={12}>
            <InputBox
              id="seo_title"
              label="SEO Title"
              onInputChange={handleInputChange}
              value={inventoryFormData.seo_title}
              inputlabelshrink
            />
          </Grid>
          <Grid item md={12}>
            <InputBox
              id="meta_description"
              label="Meta Description"
              onInputChange={handleInputChange}
              value={inventoryFormData.meta_description}
              inputlabelshrink
            />
          </Grid>
          <Grid item md={12}>
            <InputBox
              id="meta_keyword"
              label="Meta Keywords"
              onInputChange={handleInputChange}
              value={inventoryFormData.meta_keyword}
              inputlabelshrink
            />
          </Grid>
        </Grid>
      </div>
    );
  }
);

InventoryForm.displayName = "InventoryForm";
export default InventoryForm;
