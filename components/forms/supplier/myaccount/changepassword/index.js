import { Box, Grid } from "@mui/material";
import ButtonComponent from "components/atoms/ButtonComponent";
import InputBox from "components/atoms/InputBoxComponent";
import validationRegex from "services/utils/regexUtils";
import { useState } from "react";
import validateMessage from "constants/validateMessages";
import { changeSupplierPassword } from "services/supplier/myaccount/changepassword";
import toastify from "services/utils/toastUtils";

const ChangePassword = () => {
  const [formValues, setFormValues] = useState({});
  const [error, setError] = useState({});

  const validateForm = () => {
    const errObj = { ...error };

    const validatePassword = (field) => {
      if (!formValues[field]) {
        errObj[field] = validateMessage.field_required;
      } else if (!validationRegex.password.test(formValues[field])) {
        errObj[field] = validateMessage.password;
      } else {
        errObj[field] = null;
      }
    };

    if (!formValues.emailId) {
      errObj.emailId = validateMessage.field_required;
    } else if (!validationRegex.email.test(formValues.emailId)) {
      errObj.emailId = validateMessage.email;
    } else {
      errObj.emailId = null;
    }
    validatePassword("oldPassword");
    validatePassword("newPassword");
    validatePassword("reEnterPassword");
    setError({ ...errObj });
    let valid = true;
    Object.values(errObj).forEach((i) => {
      if (i) {
        valid = false;
      }
    });
    return valid;
  };

  const handleSubmit = async () => {
    const isValid = validateForm();
    if (isValid) {
      const payload = {
        ...formValues,
        userType: "SUPPLIER",
      };
      const { data, err } = await changeSupplierPassword(payload);
      if (data) {
        toastify(data.message);
      } else if (err) {
        toastify(err.response.data.message);
      }
    }
  };

  return (
    <Box className="mnh-70vh mxh-80vh overflow-auto hide-scrollbar bg-white rounded">
      <Grid container spacing={4} item xs={4} ml={30} mt={3}>
        <Grid item xs={12}>
          <InputBox
            value={formValues.emailId}
            label="E-mail ID"
            className="w-100"
            size="small"
            onInputChange={(e) => {
              setFormValues((prev) => ({
                ...prev,
                emailId: e.target.value,
              }));
            }}
            error={Boolean(error?.emailId)}
            helperText={error?.emailId}
            type="email"
            inputlabelshrink
          />
        </Grid>
        <Grid item xs={12}>
          <InputBox
            value={formValues.oldPassword}
            label="Old Password"
            className="w-100"
            size="small"
            onInputChange={(e) => {
              setFormValues((prev) => ({
                ...prev,
                oldPassword: e.target.value,
              }));
            }}
            error={Boolean(error?.oldPassword)}
            helperText={error?.oldPassword}
            type="password"
            inputlabelshrink
          />
        </Grid>
        <Grid item xs={12}>
          <InputBox
            value={formValues.newPassword}
            label="New Password"
            className="w-100"
            size="small"
            onInputChange={(e) => {
              setFormValues((prev) => ({
                ...prev,
                newPassword: e.target.value,
              }));
            }}
            error={Boolean(error?.newPassword)}
            helperText={error?.newPassword}
            type="password"
            inputlabelshrink
          />
        </Grid>
        <Grid item xs={12}>
          <InputBox
            value={formValues.reEnterPassword}
            label="Re-enter New Password"
            className="w-100"
            size="small"
            onInputChange={(e) => {
              setFormValues((prev) => ({
                ...prev,
                reEnterPassword: e.target.value,
              }));
            }}
            error={Boolean(error?.reEnterPassword)}
            helperText={error?.reEnterPassword}
            type="password"
            inputlabelshrink
          />
        </Grid>
        <Grid xs={12} item>
          <ButtonComponent label="Update Password" onBtnClick={handleSubmit} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChangePassword;
