import { Box, Grid, Paper } from "@mui/material";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import InputBoxComponent from "components/atoms/InputBoxComponent";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import TextAreaComponent from "components/atoms/TextAreaComponent";

const ProductPoliciesForm = forwardRef(({ formData = {} }, ref) => {
  const [productPolicyFormData, setProductPolicyFormData] = useState({
    policyTabLabel: "",
    refundPolicy: "",
    cancellationPolicy: "",
    shippingPolicy: "",
  });

  useEffect(() => {
    setProductPolicyFormData({ ...formData.policy });
  }, [formData]);

  useImperativeHandle(ref, () => {
    return {
      handleSendFormData: () => {
        return ["policy", { ...productPolicyFormData }];
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
          />
          <InfoOutlinedIcon className="ms-1" />
        </div>
      </Grid>
      <Grid item xs={11}>
        <TextAreaComponent
          legend="Shipping Policy"
          onChange={handleChange}
          name="shippingPolicy"
          onBtnClick={() => {}}
          btnLabel="Add Media"
          btnSize="small"
          btnVariant="outlined"
          widthClassName="w-100 mt-0"
          rows={2}
          muiProps="m-0 p-0 fs-10"
          value={productPolicyFormData.shippingPolicy}
        />
      </Grid>
      <Grid item xs={11}>
        <TextAreaComponent
          legend="Refund Policy"
          name="refundPolicy"
          onChange={handleChange}
          onBtnClick={() => {}}
          btnLabel="Add Media"
          btnSize="small"
          btnVariant="outlined"
          widthClassName="w-100 mt-0"
          rows={2}
          value={productPolicyFormData.refundPolicy}
          muiProps="m-0 p-0 fs-10"
        />
      </Grid>
      <Grid item xs={11}>
        <TextAreaComponent
          legend="Cancellation/Return/Exchange Policy"
          onChange={handleChange}
          name="cancellationPolicy"
          onBtnClick={() => {}}
          btnLabel="Add Media"
          btnSize="small"
          btnVariant="outlined"
          widthClassName="w-100 mt-0"
          rows={2}
          value={productPolicyFormData.cancellationPolicy}
          muiProps="m-0 p-0 fs-10"
        />
      </Grid>
    </Grid>
  );
});

ProductPoliciesForm.displayName = "ProductPoliciesForm";

export default ProductPoliciesForm;
