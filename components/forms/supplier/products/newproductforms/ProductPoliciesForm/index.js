import { Grid } from "@mui/material";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import InputBoxComponent from "components/atoms/InputBoxComponent";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import TextAreaComponent from "components/atoms/TextAreaComponent";
import validateMessage from "constants/validateMessages";
import FileUploadModal from "components/atoms/FileUpload";

const ProductPoliciesForm = forwardRef(({ formData = {} }, ref) => {
  const [productPolicyFormData, setProductPolicyFormData] = useState({
    policyTabLabel: "",
    refundPolicy: "",
    cancellationPolicy: "",
    shippingPolicy: "",
  });
  const [error, setError] = useState({});
  const [showFileUploadModal, setShowFileUploadModal] = useState(false);

  useEffect(() => {
    setProductPolicyFormData({ ...formData.policy });
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
    validateFields(
      "shippingPolicy",
      /^.{1,255}$/,
      validateMessage.alpha_numeric_max_255
    );
    validateFields(
      "cancellationPolicy",
      /^.{1,255}$/,
      validateMessage.alpha_numeric_max_255
    );
    validateFields(
      "refundPolicy",
      /^.{1,255}$/,
      validateMessage.alpha_numeric_max_255
    );

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
        return ["policy", { ...productPolicyFormData }];
      },
      validate: () => {
        // write validation logic here
        // return true if validation is success else false
        return validateForm();
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
          />
          <InfoOutlinedIcon className="ms-1" />
        </div>
      </Grid>
      <Grid item xs={11}>
        <TextAreaComponent
          legend="Shipping Policy"
          onChange={handleChange}
          name="shippingPolicy"
          onBtnClick={() => {
            setShowFileUploadModal(true);
          }}
          btnLabel="Add Media"
          btnSize="small"
          btnVariant="outlined"
          widthClassName="w-100 mt-0"
          rows={2}
          muiProps="m-0 p-0 fs-10"
          value={productPolicyFormData.shippingPolicy}
          error={Boolean(error.shippingPolicy)}
          helperText={error.shippingPolicy}
        />
      </Grid>
      <Grid item xs={11}>
        <TextAreaComponent
          legend="Refund Policy"
          name="refundPolicy"
          onChange={handleChange}
          onBtnClick={() => {
            setShowFileUploadModal(true);
          }}
          btnLabel="Add Media"
          btnSize="small"
          btnVariant="outlined"
          widthClassName="w-100 mt-0"
          rows={2}
          value={productPolicyFormData.refundPolicy}
          muiProps="m-0 p-0 fs-10"
          error={Boolean(error.refundPolicy)}
          helperText={error.refundPolicy}
        />
      </Grid>
      <Grid item xs={11}>
        <TextAreaComponent
          legend="Cancellation/Return/Exchange Policy"
          onChange={handleChange}
          name="cancellationPolicy"
          onBtnClick={() => {
            setShowFileUploadModal(true);
          }}
          btnLabel="Add Media"
          btnSize="small"
          btnVariant="outlined"
          widthClassName="w-100 mt-0"
          rows={2}
          value={productPolicyFormData.cancellationPolicy}
          muiProps="m-0 p-0 fs-10"
          error={Boolean(error.cancellationPolicy)}
          helperText={error.cancellationPolicy}
        />
      </Grid>
      {showFileUploadModal ? (
        <FileUploadModal
          showModal={showFileUploadModal}
          setShowModal={setShowFileUploadModal}
        />
      ) : null}
    </Grid>
  );
});

ProductPoliciesForm.displayName = "ProductPoliciesForm";

export default ProductPoliciesForm;
