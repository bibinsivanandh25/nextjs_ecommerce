import { Box, Grid, Paper, Typography } from "@mui/material";
import CheckBoxComponent from "components/atoms/CheckboxComponent";
import InputBox from "components/atoms/InputBoxComponent";
import InvoiceCardComponent from "components/atoms/InvoiceCardComponent";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

const PricingForm = forwardRef(({ formData = {} }, ref) => {
  const [pricingFormData, setPricingFormData] = useState({
    sale_price: "",
    mrp: "",
    return_order_accepted: false,
    cash_on_accepted: "",
    product_weight: "",
    length: "",
    width: "",
    height: "",
    delivery_charge: "",
  });
  useImperativeHandle(ref, () => {
    return {
      handleSendFormData: () => {
        return ["pricing", { ...pricingFormData }];
      },
      validate: () => {
        //write validation logic here
        //return true if validation is success else false
        return true;
      },
    };
  });

  useEffect(() => {
    setPricingFormData({ ...formData.pricing });
  }, [formData]);

  const handleInputChange = (e) => {
    setPricingFormData((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  return (
    <Paper className="w-100 p-3 ps-4 mxh-75vh overflow-y-scroll">
      <Grid container className="w-100" spacing={2}>
        <Grid item md={6}>
          <InputBox
            id="sale_price"
            label="Sale Price"
            onInputChange={handleInputChange}
            value={pricingFormData.sale_price}
            inputlabelshrink
          />
        </Grid>
        <Grid item md={6}>
          <InputBox
            id="mrp"
            label="MRP"
            onInputChange={handleInputChange}
            value={pricingFormData.mrp}
            inputlabelshrink
          />
        </Grid>
        <Grid item md={6}>
          <div className="d-flex align-items-center justify-content-center">
            <CheckBoxComponent
              label=""
              isChecked={pricingFormData.return_order_accepted}
              checkBoxClick={() => {
                setPricingFormData((prev) => {
                  return {
                    ...prev,
                    return_order_accepted: !prev.return_order_accepted,
                  };
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
              isChecked={pricingFormData.cash_on_accepted}
              checkBoxClick={() => {
                setPricingFormData((prev) => {
                  return {
                    ...prev,
                    cash_on_accepted: !prev.cash_on_accepted,
                  };
                });
              }}
              size="small"
              showIcon
              varient="filled"
            />
            <Typography className="fs-12 mt-1">Cash on Accepted</Typography>
          </div>
        </Grid>
        <Grid item md={6}>
          <InputBox
            id="delivery_charge"
            label="Delivery Charge"
            onInputChange={handleInputChange}
            value={pricingFormData.delivery_charge}
            inputlabelshrink
          />
        </Grid>
        <Grid item md={12}>
          <InputBox
            id="product_weight"
            label="Product Weight(inclusive of package)"
            onInputChange={handleInputChange}
            value={pricingFormData.product_weight}
            inputlabelshrink
          />
        </Grid>
        <Grid item md={12}>
          <InputBox
            id="length"
            label="Length(inclusive of package)"
            onInputChange={handleInputChange}
            value={pricingFormData.length}
            inputlabelshrink
          />
        </Grid>
        <Grid item md={12}>
          <InputBox
            id="height"
            label="Height(inclusive of package)"
            onInputChange={handleInputChange}
            value={pricingFormData.height}
            inputlabelshrink
          />
        </Grid>
        <Grid item md={12}>
          <InputBox
            id="width"
            label="Width(inclusive of package)"
            onInputChange={handleInputChange}
            value={pricingFormData.width}
            inputlabelshrink
          />
        </Grid>
        <Grid item md={12}>
          <InvoiceCardComponent />
        </Grid>
      </Grid>
    </Paper>
  );
});

PricingForm.displayName = "PricingForm";
export default PricingForm;
