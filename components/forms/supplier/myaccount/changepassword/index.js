import { Grid } from "@mui/material";
import ButtonComponent from "components/atoms/ButtonComponent";
import InputBox from "components/atoms/InputBoxComponent";
import validationRegex from "services/utils/regexUtils";
import { useState } from "react";
import validateMessage from "constants/validateMessages";

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
      errObj["emailId"] = null;
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

  const handleSubmit = () => {
    const isValid = validateForm();
    if (isValid) {
      console.log(formValues);
    }
  };

  return (
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
        />
      </Grid>
      <Grid xs={12} item>
        <ButtonComponent label="Update Password" onBtnClick={handleSubmit} />
      </Grid>
    </Grid>
  );
};

export default ChangePassword;
