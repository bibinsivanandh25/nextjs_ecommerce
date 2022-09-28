/* eslint-disable no-nested-ternary */
import { Grid, Typography } from "@mui/material";
import { forwardRef, useImperativeHandle, useState } from "react";
import InputBoxComponent from "components/atoms/InputBoxComponent";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import TextAreaComponent from "components/atoms/TextAreaComponent";
import FileUploadModal from "components/atoms/FileUpload";
import { warrantyData } from "constants/constants";
import CheckBoxComponent from "@/atoms/CheckboxComponent";
import SimpleDropdownComponent from "@/atoms/SimpleDropdownComponent";
import { useSelector } from "react-redux";
import { validatePolicy } from "../validation";

const ProductPoliciesForm = forwardRef(
  ({ formData = {}, setFormData = () => {} }, ref) => {
    const [showFileUploadModal, setShowFileUploadModal] = useState("");
    const [error, setError] = useState({});
    const { viewFlag } = useSelector((state) => state.product);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((pre) => ({
        ...pre,
        policy: {
          ...pre.policy,
          [name]: value,
        },
      }));
    };

    useImperativeHandle(ref, () => {
      return {
        validate: () => {
          const { errObj, flag } = validatePolicy(formData.policy);
          if (Object.keys(errObj).length) {
            const element = document.getElementById(Object.keys(errObj)[0]);
            if (element) {
              element.scrollIntoView();
            }
          }
          setError(errObj);
          return flag;
        },
        clearPage: () => {
          setError({});
        },
      };
    });

    return (
      <Grid container spacing={3} className="w-100">
        <Grid item xs={10}>
          <div className="d-flex align-items-center h-100">
            <InputBoxComponent
              placeholder="Shipping/Cancellation/Refund Policy"
              inputlabelshrink
              name="policyTabLabel"
              onInputChange={handleChange}
              label="Policy Tab Label*"
              value={formData?.policy?.policyTabLabel}
              error={Boolean(error.policyTabLabel)}
              helperText={error.policyTabLabel}
              disabled={viewFlag}
            />
            <InfoOutlinedIcon className="ms-1" />
          </div>
        </Grid>
        <Grid item xs={11}>
          <TextAreaComponent
            legend="Shipping Policy*"
            placeholder="Enter Shipping Policy"
            onChange={(e) => {
              setFormData((pre) => ({
                ...pre,
                policy: {
                  ...pre.policy,
                  shippingPolicy: {
                    ...pre.policy.shippingPolicy,
                    text: e.target.value.replace(/\s\s+/g, " "),
                  },
                },
              }));
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
            value={formData?.policy?.shippingPolicy.text}
            error={Boolean(error.shippingPolicy)}
            helperText={error.shippingPolicy}
            disabled={viewFlag}
          />
        </Grid>
        <Grid item xs={11}>
          <TextAreaComponent
            legend="Refund Policy*"
            placeholder="Enter Refund Policy"
            name="refundPolicy"
            onChange={(e) => {
              setFormData((pre) => ({
                ...pre,
                policy: {
                  ...pre.policy,
                  refundPolicy: {
                    ...pre.policy.refundPolicy,
                    text: e.target.value.replace(/\s\s+/g, " "),
                  },
                },
              }));
            }}
            onBtnClick={() => {
              setShowFileUploadModal("refundPolicy");
            }}
            btnLabel="Add Media"
            btnSize="small"
            btnVariant="outlined"
            widthClassName="w-100 mt-0"
            rows={2}
            value={formData?.policy?.refundPolicy.text}
            muiProps="m-0 p-0 fs-10"
            error={Boolean(error.refundPolicy)}
            helperText={error.refundPolicy}
            disabled={viewFlag}
          />
        </Grid>
        <Grid item xs={11}>
          <TextAreaComponent
            legend="Cancellation/Return/Exchange Policy*"
            placeholder="Enter Cancellation/Return/Exchange Policy"
            onChange={(e) => {
              setFormData((pre) => ({
                ...pre,
                policy: {
                  ...pre.policy,
                  cancellationPolicy: {
                    ...pre.policy.cancellationPolicy,
                    text: e.target.value.replace(/\s\s+/g, " "),
                  },
                },
              }));
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
            value={formData?.policy?.cancellationPolicy.text}
            muiProps="m-0 p-0 fs-10"
            error={Boolean(error.cancellationPolicy)}
            helperText={error.cancellationPolicy}
            disabled={viewFlag}
          />
          <Grid item md={6} display="flex" alignItems="center">
            <CheckBoxComponent
              label=""
              isChecked={formData?.policy?.warranty}
              checkBoxClick={() => {
                if (formData.policy.warranty && error?.warrantyperiod !== "") {
                  setError((pre) => ({
                    ...pre,
                    warrantyperiod: "",
                  }));
                }
                setFormData((pre) => ({
                  ...pre,
                  policy: {
                    ...pre.policy,
                    warranty: !pre.policy.warranty,
                    warrantyperiod: pre.policy.warranty
                      ? {}
                      : pre.policywarrantyperiod,
                  },
                }));
              }}
              showIcon
              varient="filled"
              isDisabled={viewFlag}
            />
            <Typography component="span" className="h-5">
              Warranty Available
            </Typography>
          </Grid>
          {formData?.policy?.warranty && (
            <Grid item md={12} className="mt-2">
              <SimpleDropdownComponent
                list={warrantyData}
                label="Warranty Period*"
                placeholder="Warranty Period"
                size="small"
                onDropdownSelect={(value) => {
                  setFormData((pre) => ({
                    ...pre,
                    policy: {
                      ...pre.policy,
                      warrantyperiod: value,
                    },
                  }));
                }}
                inputlabelshrink
                value={formData?.policy?.warrantyperiod}
                error={Boolean(error.warrantyperiod)}
                helperText={error.warrantyperiod ?? ""}
                disabled={viewFlag}
              />
            </Grid>
          )}
        </Grid>
        {showFileUploadModal != "" ? (
          <FileUploadModal
            showModal={showFileUploadModal !== ""}
            setShowModal={setShowFileUploadModal}
            getUploadedFiles={(val) => {
              setFormData((pre) => ({
                ...pre,
                policy: {
                  ...pre.policy,
                  [showFileUploadModal]: {
                    ...pre.policy[`${showFileUploadModal}`],
                    media: val,
                  },
                },
              }));
            }}
            value={
              showFileUploadModal === "refundPolicy"
                ? formData?.policy?.refundPolicy.media
                : showFileUploadModal === "shippingPolicy"
                ? formData?.policy?.shippingPolicy.media
                : formData?.policy?.cancellationPolicy.media
            }
          />
        ) : null}
      </Grid>
    );
  }
);

ProductPoliciesForm.displayName = "ProductPoliciesForm";

export default ProductPoliciesForm;
