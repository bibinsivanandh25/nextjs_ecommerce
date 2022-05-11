import { Box, Grid, Paper, Typography } from "@mui/material";
import CheckBoxComponent from "components/atoms/CheckboxComponent";
import InputBox from "components/atoms/InputBoxComponent";
import SimpleDropdownComponent from "components/atoms/SimpleDropdownComponent";
import { useState } from "react";

const InventoryForm = () => {
  const [manageStock, setManageStock] = useState(false);
  return (
    <div className="w-100">
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
            <Typography className="fw-600 me-3">Manage Stocks?</Typography>
            <CheckBoxComponent
              label=""
              isChecked={manageStock}
              checkBoxClick={() => {
                setManageStock(!manageStock);
              }}
              size="small"
            />
          </div>
        </Grid>
        <Grid item md={12}>
          <SimpleDropdownComponent
            inputlabelshrink
            list={[]}
            id="stockstatus"
            label="Stock Status"
            size="small"
            fullWidth={false}
            className="w-70p"
          />
        </Grid>
        {manageStock ? (
          <>
            <Grid item md={12}>
              <SimpleDropdownComponent
                inputlabelshrink
                list={[]}
                id="Allow Backorders ?"
                label="Allow Backorders ?"
                size="small"
                fullWidth={false}
              />
            </Grid>
            <Grid item md={6}>
              <InputBox
                id="Stock Qty"
                label="Stock Qty"
                onInputChange={() => {}}
                value={""}
                inputlabelshrink
              />
            </Grid>
            <Grid item md={6}>
              <SimpleDropdownComponent
                inputlabelshrink
                list={[]}
                id="Allow Backorders ?"
                label="Allow Backorders ?"
                size="small"
                fullWidth={false}
              />
            </Grid>
          </>
        ) : null}
        <Grid item md={12}>
          <SimpleDropdownComponent
            inputlabelshrink
            list={[]}
            id="ShippingClass"
            label="Shipping Class"
            size="small"
            fullWidth={false}
          />
        </Grid>
        <Grid item md={12}>
          <InputBox
            id="Product Title"
            label="Product Title"
            onInputChange={() => {}}
            value={""}
            inputlabelshrink
          />
        </Grid>
        <Grid item md={12}>
          <InputBox
            id="Business Processing Days"
            label="Business Processing Days"
            onInputChange={() => {}}
            value={""}
            inputlabelshrink
          />
        </Grid>
        <Grid item md={12}>
          <InputBox
            id="SEO Title"
            label="SEO Title"
            onInputChange={() => {}}
            value={""}
            inputlabelshrink
          />
        </Grid>
        <Grid item md={12}>
          <InputBox
            id="Meta Description"
            label="Meta Description"
            onInputChange={() => {}}
            value={""}
            inputlabelshrink
          />
        </Grid>
        <Grid item md={12}>
          <InputBox
            id="Meta Keywords"
            label="Meta Keywords"
            onInputChange={() => {}}
            value={""}
            inputlabelshrink
          />
        </Grid>
      </Grid>
    </div>
  );
};
export default InventoryForm;
