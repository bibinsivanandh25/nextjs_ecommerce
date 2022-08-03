import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Grid } from "@mui/material";
import validateMessage from "constants/validateMessages";
import CheckBoxComponent from "@/atoms/CheckboxComponent";
import InputBox from "@/atoms/InputBoxComponent";

const PricingForMrMRsCartForm = forwardRef(({ formData = {} }, ref) => {
  const [mrMrsCartFormData, setMrMrsCartFormData] = useState({
    sellwithus: false,
    free_delivery: "",
    paid_delivery: "",
    return: false,
    cashondelivery: false,
  });
  const [errorObj, setErrorObj] = useState({
    free_delivery: "",
    paid_delivery: "",
  });
  const validateForm = () => {
    let flag = false;
    const errObj = {
      free_delivery: "",
      paid_delivery: "",
    };
    if (mrMrsCartFormData.free_delivery == "") {
      flag = true;
      errObj.free_delivery = validateMessage.field_required;
    }
    if (mrMrsCartFormData.paid_delivery == "") {
      flag = true;
      errObj.paid_delivery = validateMessage.field_required;
    }
    setErrorObj(errObj);
    return !flag;
  };
  useImperativeHandle(ref, () => {
    return {
      handleSendFormData: () => {
        return ["mrMrsCartFormData", { ...mrMrsCartFormData }];
      },
      validate: () => {
        // write validation logic here
        // return true if validation is success else false
        return validateForm();
      },
    };
  });
  useEffect(() => {
    setMrMrsCartFormData({ ...formData.mrMrsCartFormData });
  }, [formData]);
  const handleInputChange = (e) => {
    setMrMrsCartFormData((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };
  return (
    <Grid container spacing={2}>
      <Grid item md={12}>
        <CheckBoxComponent
          label="Do You Want To Sell With Us"
          isChecked={mrMrsCartFormData.sellwithus}
          checkBoxClick={() => {
            setMrMrsCartFormData((prev) => ({
              ...prev,
              sellwithus: !mrMrsCartFormData.sellwithus,
            }));
          }}
          showIcon
          varient="filled"
        />
      </Grid>
      <Grid item md={12}>
        <InputBox
          id="free_delivery"
          label="Sale Price With Free Delivery Returns"
          onInputChange={handleInputChange}
          value={mrMrsCartFormData.free_delivery}
          inputlabelshrink
          type="number"
          helperText={errorObj.free_delivery}
          error={errorObj.free_delivery !== ""}
        />
      </Grid>
      <Grid item md={12}>
        <InputBox
          id="paid_delivery"
          label="Sale Price With Out Free Delivery Returns"
          onInputChange={handleInputChange}
          value={mrMrsCartFormData.paid_delivery}
          inputlabelshrink
          type="number"
          helperText={errorObj.paid_delivery}
          error={errorObj.paid_delivery !== ""}
        />
      </Grid>
      <Grid item md={6}>
        <CheckBoxComponent
          label="Return Order Accepted"
          isChecked={mrMrsCartFormData.return}
          checkBoxClick={() => {
            setMrMrsCartFormData((prev) => ({
              ...prev,
              return: !mrMrsCartFormData.return,
            }));
          }}
          showIcon
          varient="filled"
        />
      </Grid>
      <Grid item md={6}>
        <CheckBoxComponent
          label="Cash on Delivery Available"
          isChecked={mrMrsCartFormData.cashondelivery}
          checkBoxClick={() => {
            setMrMrsCartFormData((prev) => ({
              ...prev,
              cashondelivery: !mrMrsCartFormData.cashondelivery,
            }));
          }}
          showIcon
          varient="filled"
        />
      </Grid>
    </Grid>
  );
});
PricingForMrMRsCartForm.displayName = "PricingForMrMRsCartForm";
export default PricingForMrMRsCartForm;
