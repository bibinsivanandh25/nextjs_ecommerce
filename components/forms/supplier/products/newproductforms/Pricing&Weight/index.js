import { Grid, Paper, Typography } from "@mui/material";
import CheckBoxComponent from "components/atoms/CheckboxComponent";
import InputBox from "components/atoms/InputBoxComponent";
import InvoiceCardComponent from "components/atoms/InvoiceCardComponent";
import validateMessage from "constants/validateMessages";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import validationRegex from "services/utils/regexUtils";

const PricingForm = forwardRef(({ formData = {} }, ref) => {
  const [pricingFormData, setPricingFormData] = useState({
    sale_price: "",
    mrp: "",
    return_order_accepted: false,
    cash_on_accepted: false,
    product_weight: "",
    length: "",
    width: "",
    height: "",
    delivery_charge: "",
  });
  const [errorObj, setErrorObj] = useState({
    sale_price: "",
    mrp: "",
    return_order_accepted: false,
    cash_on_accepted: false,
    product_weight: "",
    length: "",
    width: "",
    height: "",
    delivery_charge: "",
  });

  const validate = () => {
    let flag = false;
    const errObj = {
      sale_price: "",
      mrp: "",
      return_order_accepted: false,
      cash_on_delivary: false,
      product_weight: "",
      length: "",
      width: "",
      height: "",
      delivery_charge: "",
    };
    if (pricingFormData.sale_price === "") {
      flag = true;
      errObj.sale_price = validateMessage.field_required;
    } else if (
      !validationRegex.decimal_2digit.test(
        parseFloat(pricingFormData.sale_price)
      )
    ) {
      flag = true;
      errObj.sale_price = validateMessage.decimal_2digits;
    }
    if (pricingFormData.mrp === "") {
      flag = true;
      errObj.mrp = validateMessage.field_required;
    } else if (
      !validationRegex.decimal_2digit.test(parseFloat(pricingFormData.mrp))
    ) {
      flag = true;
      errObj.mrp = validateMessage.decimal_2digits;
    }
    if (pricingFormData.product_weight === "") {
      flag = true;
      errObj.product_weight = validateMessage.field_required;
    } else if (
      parseInt(pricingFormData.product_weight, 10) > 100000 ||
      parseInt(pricingFormData.product_weight, 10) < 100
    ) {
      flag = true;
      errObj.product_weight = "weight should be between 100 to 100000 grams";
    }
    if (pricingFormData.length === "") {
      flag = true;
      errObj.length = validateMessage.field_required;
    }
    if (pricingFormData.width === "") {
      flag = true;
      errObj.width = validateMessage.field_required;
    }
    if (pricingFormData.height === "") {
      flag = true;
      errObj.height = validateMessage.field_required;
    }
    setErrorObj(errObj);
    return !flag;
  };

  useImperativeHandle(ref, () => {
    return {
      handleSendFormData: () => {
        return ["pricing", { ...pricingFormData }];
      },
      validate,
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
            type="number"
            helperText={errorObj.sale_price}
            error={errorObj.sale_price !== ""}
            placeholder="eg.: 100"
          />
        </Grid>
        <Grid item md={6}>
          <InputBox
            id="mrp"
            label="MRP"
            onInputChange={handleInputChange}
            value={pricingFormData.mrp}
            inputlabelshrink
            type="number"
            helperText={errorObj.mrp}
            error={errorObj.mrp !== ""}
            placeholder="eg.: 100"
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
            <Typography className="fs-12 mt-1">Cash on Delivary</Typography>
          </div>
        </Grid>
        <Grid item md={6}>
          <InputBox
            id="delivery_charge"
            label="Delivery Charge"
            onInputChange={handleInputChange}
            value={pricingFormData.delivery_charge}
            inputlabelshrink
            type="number"
            helperText={errorObj.delivery_charge}
            error={errorObj.delivery_charge !== ""}
            placeholder="eg.:100"
          />
        </Grid>
        <Grid item md={12}>
          <InputBox
            id="product_weight"
            label="Product Weight(inclusive of package)"
            onInputChange={handleInputChange}
            value={pricingFormData.product_weight}
            inputlabelshrink
            type="number"
            helperText={errorObj.product_weight}
            error={errorObj.product_weight !== ""}
            placeholder="eg.:200"
          />
        </Grid>
        <Grid item md={12}>
          <InputBox
            id="length"
            label="Length(inclusive of package)"
            onInputChange={handleInputChange}
            value={pricingFormData.length}
            inputlabelshrink
            type="number"
            helperText={errorObj.length}
            error={errorObj.length !== ""}
            placeholder="eg.: 200"
          />
        </Grid>
        <Grid item md={12}>
          <InputBox
            id="height"
            label="Height(inclusive of package)"
            onInputChange={handleInputChange}
            value={pricingFormData.height}
            inputlabelshrink
            type="number"
            helperText={errorObj.height}
            error={errorObj.height !== ""}
            placeholder="eg.: 200"
          />
        </Grid>
        <Grid item md={12}>
          <InputBox
            id="width"
            label="Width(inclusive of package)"
            onInputChange={handleInputChange}
            value={pricingFormData.width}
            inputlabelshrink
            type="number"
            helperText={errorObj.width}
            error={errorObj.width !== ""}
            placeholder="eg.: 200"
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
