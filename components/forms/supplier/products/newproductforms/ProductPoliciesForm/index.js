/* eslint-disable no-nested-ternary */
import { Grid, Typography } from "@mui/material";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import InputBoxComponent from "components/atoms/InputBoxComponent";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import TextAreaComponent from "components/atoms/TextAreaComponent";
import validateMessage from "constants/validateMessages";
import FileUploadModal from "components/atoms/FileUpload";
import CheckBoxComponent from "@/atoms/CheckboxComponent";
import SimpleDropdownComponent from "@/atoms/SimpleDropdownComponent";

const warrantyData = [
  {
    label: "3 Months",
    value: "3 Months",
  },
  {
    label: "6 Months",
    value: "6 Months",
  },
  {
    label: "9 Months",
    value: "9 Months",
  },
  {
    label: "12 Months",
    value: "12 Months",
  },
];
const ProductPoliciesForm = forwardRef(
  ({ formData = {}, setFormData = () => {} }, ref) => {
    const [productPolicyFormData, setProductPolicyFormData] = useState({
      policyTabLabel: "",
      refundPolicy: { media: {}, text: "" },
      cancellationPolicy: { media: {}, text: "" },
      shippingPolicy: { media: {}, text: "" },
      warranty: false,
      warrantyperiod: {},
    });
    const [error, setError] = useState({});
    const [showFileUploadModal, setShowFileUploadModal] = useState("");
    const [canclemedia, setcancleMedia] = useState({});
    const [returnablemedia, setreturnableMedia] = useState({});
    const [shippingmedia, setshippingMedia] = useState({});

    useEffect(() => {
      setFormData((pre) => {
        setProductPolicyFormData({ ...JSON.parse(JSON.stringify(pre.policy)) });
        return pre;
      });
    }, [formData]);
    const validateForm = () => {
      const errObj = { ...error };

      const validateFields = (id, validation, errorMessage) => {
        if (!productPolicyFormData[id]) {
          errObj[id] = validateMessage.field_required;
        } else if (validation && !validation.test(productPolicyFormData[id])) {
          errObj[id] = errorMessage;
        } else {
          errObj[id] = null;
        }
      };
      validateFields(
        "policyTabLabel",
        /^.{1,100}$/,
        validateMessage.alpha_numeric_max_100
      );

      if (!productPolicyFormData.shippingPolicy.text) {
        errObj.shippingPolicy = validateMessage.field_required;
      } else if (
        !/^.{1,255}$/.test(productPolicyFormData.shippingPolicy.text)
      ) {
        errObj.shippingPolicy = validateMessage.alpha_numeric_max_255;
      } else {
        errObj.shippingPolicy = null;
      }

      if (!productPolicyFormData.cancellationPolicy.text) {
        errObj.cancellationPolicy = validateMessage.field_required;
      } else if (
        !/^.{1,255}$/.test(productPolicyFormData.cancellationPolicy.text)
      ) {
        errObj.cancellationPolicy = validateMessage.alpha_numeric_max_255;
      } else {
        errObj.cancellationPolicy = null;
      }

      if (!productPolicyFormData.refundPolicy.text) {
        errObj.refundPolicy = validateMessage.field_required;
      } else if (!/^.{1,255}$/.test(productPolicyFormData.refundPolicy.text)) {
        errObj.refundPolicy = validateMessage.alpha_numeric_max_255;
      } else {
        errObj.refundPolicy = null;
      }
      setError({ ...errObj });
      let valid = true;
      Object.values(errObj).forEach((i) => {
        if (i) {
          valid = false;
        }
      });
      return valid;
    };

    useImperativeHandle(ref, () => {
      return {
        handleSendFormData: () => {
          return [
            "policy",
            {
              ...productPolicyFormData,
              canclemedia,
              returnablemedia,
              shippingmedia,
            },
          ];
        },
        validate: () => {
          // write validation logic here
          // return true if validation is success else false
          return validateForm();
        },
        clearPage: () => {
          setProductPolicyFormData({
            policyTabLabel: "",
            refundPolicy: { media: {}, text: "" },
            cancellationPolicy: { media: {}, text: "" },
            shippingPolicy: { media: {}, text: "" },
            warranty: false,
            warrantyperiod: {},
          });
          setError({});
          setreturnableMedia({});
          setshippingMedia({});
          setcancleMedia({});
        },
      };
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setProductPolicyFormData((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    };

    return (
      <Grid container spacing={3} className="w-100">
        <Grid item xs={10}>
          <div className="d-flex align-items-center h-100">
            <InputBoxComponent
              placeholder="Shipping/Cancellation/Refund Policy"
              inputlabelshrink
              name="policyTabLabel"
              onInputChange={handleChange}
              label="Policy Tab Label"
              value={productPolicyFormData.policyTabLabel}
              error={Boolean(error.policyTabLabel)}
              helperText={error.policyTabLabel}
              required
            />
            <InfoOutlinedIcon className="ms-1" />
          </div>
        </Grid>
        <Grid item xs={11}>
          <TextAreaComponent
            required
            legend="Shipping Policy"
            placeholder="Enter Shipping Policy"
            onChange={(e) => {
              const { value } = e.target;
              const temp = JSON.parse(JSON.stringify(productPolicyFormData));
              temp.shippingPolicy.text = value;
              setProductPolicyFormData(temp);
            }}
            name="shippingPolicy"
            onBtnClick={() => {
              setShowFileUploadModal("shippingPolicy");
            }}
            btnLabel="Add Media"
            btnSize="small"
            btnVariant="outlined"
            widthClassName="w-100 mt-0"
            rows={2}
            muiProps="m-0 p-0 fs-10"
            value={productPolicyFormData.shippingPolicy.text}
            error={Boolean(error.shippingPolicy)}
            helperText={error.shippingPolicy}
          />
        </Grid>
        <Grid item xs={11}>
          <TextAreaComponent
            required
            legend="Refund Policy"
            placeholder="Enter Refund Policy"
            name="refundPolicy"
            onChange={(e) => {
              const { value } = e.target;
              const temp = JSON.parse(JSON.stringify(productPolicyFormData));
              temp.refundPolicy.text = value;
              setProductPolicyFormData(temp);
            }}
            onBtnClick={() => {
              setShowFileUploadModal("refundPolicy");
            }}
            btnLabel="Add Media"
            btnSize="small"
            btnVariant="outlined"
            widthClassName="w-100 mt-0"
            rows={2}
            value={productPolicyFormData.refundPolicy.text}
            muiProps="m-0 p-0 fs-10"
            error={Boolean(error.refundPolicy)}
            helperText={error.refundPolicy}
          />
        </Grid>
        <Grid item xs={11}>
          <TextAreaComponent
            required
            legend="Cancellation/Return/Exchange Policy"
            placeholder="Enter Cancellation/Return/Exchange Policy"
            onChange={(e) => {
              const { value } = e.target;
              const temp = JSON.parse(JSON.stringify(productPolicyFormData));
              temp.cancellationPolicy.text = value;
              setProductPolicyFormData(temp);
            }}
            name="cancellationPolicy"
            onBtnClick={() => {
              setShowFileUploadModal("cancellationPolicy");
            }}
            btnLabel="Add Media"
            btnSize="small"
            btnVariant="outlined"
            widthClassName="w-100 mt-0"
            rows={2}
            value={productPolicyFormData.cancellationPolicy.text}
            muiProps="m-0 p-0 fs-10"
            error={Boolean(error.cancellationPolicy)}
            helperText={error.cancellationPolicy}
          />
          <Grid item md={6} display="flex" alignItems="center">
            <CheckBoxComponent
              label=""
              isChecked={productPolicyFormData.warranty}
              checkBoxClick={() => {
                setProductPolicyFormData((prev) => {
                  return {
                    ...prev,
                    warranty: !productPolicyFormData.warranty,
                  };
                });
              }}
              showIcon
              varient="filled"
            />
            <Typography
              component="span"
              className="h-5"
              sx={{ marginLeft: "-20px" }}
            >
              Warranty Available
            </Typography>
          </Grid>
          {productPolicyFormData.warranty && (
            <Grid item md={12} className="mt-2">
              <SimpleDropdownComponent
                required
                list={warrantyData}
                label="Warranty Period"
                placeholder="Warranty Period"
                size="small"
                onDropdownSelect={(value) => {
                  setProductPolicyFormData((prev) => ({
                    ...prev,
                    warrantyperiod: value,
                  }));
                }}
                inputlabelshrink
                value={productPolicyFormData.warrantyperiod}
              />
            </Grid>
          )}
        </Grid>
        {showFileUploadModal != "" ? (
          <FileUploadModal
            showModal={showFileUploadModal !== ""}
            setShowModal={setShowFileUploadModal}
            getUploadedFiles={(val) => {
              setProductPolicyFormData((pre) => {
                const temp = JSON.parse(JSON.stringify(pre));
                temp[`${showFileUploadModal}`].media = JSON.parse(
                  JSON.stringify(val)
                );
                return temp;
              });
              if (showFileUploadModal === "refundPolicy") {
                setreturnableMedia(val);
              } else if (showFileUploadModal === "shippingPolicy") {
                setshippingMedia(val);
              } else {
                setcancleMedia(val);
              }
            }}
            type="multipart"
            value={
              showFileUploadModal === "refundPolicy"
                ? returnablemedia
                : showFileUploadModal === "shippingPolicy"
                ? shippingmedia
                : canclemedia
            }
          />
        ) : null}
      </Grid>
    );
  }
);

ProductPoliciesForm.displayName = "ProductPoliciesForm";

export default ProductPoliciesForm;
