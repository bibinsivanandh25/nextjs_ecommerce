import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Grid, Typography } from "@mui/material";
import CheckBoxComponent from "@/atoms/CheckboxComponent";
import InputBox from "@/atoms/InputBoxComponent";
import SimpleDropdownComponent from "@/atoms/SimpleDropdownComponent";
import { validatePricingForMrMRsCartForm } from "../validation";

const returnOrderData = [
  {
    id: 7,
    value: "7 Days",
    label: "7 Days",
  },
  {
    id: 14,
    value: "14 Days",
    label: "14 Days",
  },
  {
    id: 21,
    value: "21 Days",
    label: "21 Days",
  },
  {
    id: 28,
    value: "28 Days",
    label: "28 Days",
  },
];
const PricingForMrMRsCartForm = forwardRef(
  ({ formData = {}, setFormData = () => {} }, ref) => {
    const [errorObj, setErrorObj] = useState({});

    const handleInputChange = (e) => {
      setFormData((pre) => ({
        ...pre,
        mrMrsCartFormData: {
          ...pre.mrMrsCartFormData,
          [e.target.id]: e.target.value.replaceAll("e", "").replaceAll("-", ""),
        },
      }));
    };

    useImperativeHandle(ref, () => {
      return {
        handleSendFormData: () => {
          return ["mrMrsCartFormData", {}];
        },
        validate: () => {
          const { errObj, flag } = validatePricingForMrMRsCartForm(
            formData.mrMrsCartFormData
          );
          setErrorObj(errObj);
          return flag;
        },
        clearPage: () => {
          setErrorObj({});
        },
      };
    });

    return (
      <Grid container spacing={2}>
        <Grid item md={12} display="flex" alignItems="center">
          <CheckBoxComponent
            label=""
            isChecked={formData?.mrMrsCartFormData?.sellwithus}
            checkBoxClick={() => {
              if (formData.mrMrsCartFormData.sellwithus) {
                setErrorObj((pre) => {
                  return {
                    ...pre,
                    paid_delivery: "",
                    free_delivery: "",
                  };
                });
              }
              setFormData((pre) => ({
                ...pre,
                mrMrsCartFormData: {
                  ...pre.mrMrsCartFormData,
                  sellwithus: !pre.mrMrsCartFormData.sellwithus,
                  free_delivery: "",
                  paid_delivery: "",
                },
              }));
            }}
            showIcon
            varient="filled"
          />
          <Typography component="span" className="h-5">
            Do You Want To Sell With Us
          </Typography>
        </Grid>
        <Grid item md={12}>
          <InputBox
            id="free_delivery"
            label="Sale Price With Free Delivery Returns"
            onInputChange={handleInputChange}
            value={formData?.mrMrsCartFormData?.free_delivery}
            inputlabelshrink
            type="number"
            disabled={!formData?.mrMrsCartFormData?.sellwithus}
            helperText={errorObj.free_delivery}
            error={errorObj.free_delivery && errorObj.free_delivery !== ""}
          />
        </Grid>
        <Grid item md={12}>
          <InputBox
            id="paid_delivery"
            label="Sale Price With Out Free Delivery Returns"
            onInputChange={handleInputChange}
            value={formData?.mrMrsCartFormData?.paid_delivery}
            inputlabelshrink
            type="number"
            disabled={!formData?.mrMrsCartFormData?.sellwithus}
            helperText={errorObj.paid_delivery}
            error={errorObj.paid_delivery && errorObj.paid_delivery !== ""}
          />
        </Grid>
        <Grid item md={6} display="flex" alignItems="center">
          <CheckBoxComponent
            label=""
            isChecked={formData?.mrMrsCartFormData?.return}
            checkBoxClick={() => {
              if (formData.mrMrsCartFormData.return) {
                setErrorObj((pre) => {
                  return {
                    ...pre,
                    returnorder: "",
                  };
                });
              }
              setFormData((pre) => ({
                ...pre,
                mrMrsCartFormData: {
                  ...pre.mrMrsCartFormData,
                  return: !pre.mrMrsCartFormData.return,
                  returnorder: {},
                },
              }));
            }}
            showIcon
            varient="filled"
          />
          <Typography component="span" className="h-5">
            Return Order Accepted
          </Typography>
        </Grid>

        <Grid item md={6} display="flex" alignItems="center">
          <CheckBoxComponent
            label=""
            isChecked={formData?.mrMrsCartFormData?.cashondelivery}
            checkBoxClick={() => {
              setFormData((pre) => ({
                ...pre,
                mrMrsCartFormData: {
                  ...pre.mrMrsCartFormData,
                  cashondelivery: !pre.mrMrsCartFormData.cashondelivery,
                },
              }));
            }}
            showIcon
            varient="filled"
          />
          <Typography component="span" className="h-5">
            Cash on Delivery Available
          </Typography>
        </Grid>
        {formData?.mrMrsCartFormData?.return && (
          <Grid item xs={12}>
            <SimpleDropdownComponent
              list={returnOrderData}
              id="returnorder"
              label="Return Period"
              size="small"
              value={formData?.mrMrsCartFormData?.returnorder}
              onDropdownSelect={(value) => {
                setFormData((pre) => {
                  return {
                    ...pre,
                    mrMrsCartFormData: {
                      ...pre.mrMrsCartFormData,
                      returnorder: value,
                    },
                  };
                });
              }}
              inputlabelshrink
              placeholder="Return Period"
              helperText={errorObj.returnorder}
              error={errorObj.returnorder !== ""}
            />
          </Grid>
        )}
      </Grid>
    );
  }
);
PricingForMrMRsCartForm.displayName = "PricingForMrMRsCartForm";
export default PricingForMrMRsCartForm;
