import { Box, Grid } from "@mui/material";
import ButtonComponent from "components/atoms/ButtonComponent";
import InputBox from "components/atoms/InputBoxComponent";
import validationRegex from "services/utils/regexUtils";
import { useState } from "react";
import validateMessage from "constants/validateMessages";
import { changeSupplierPassword } from "services/supplier/myaccount/changepassword";
import toastify from "services/utils/toastUtils";
import { useSelector } from "react-redux";

const ChangePassword = ({ usertype = "SUPPLIER" }) => {
  const [error, setError] = useState({});
  const user = useSelector((state) => state.user);
  const [formValues, setFormValues] = useState({ emailId: user.emailId });
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
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
    if (formValues.newPassword !== formValues.reEnterPassword) {
      errObj.reEnterPassword = validateMessage.samePassword;
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

  const handleSubmit = async () => {
    const isValid = validateForm();
    if (isValid) {
      const payload = {
        ...formValues,
        userType: usertype,
      };
      const { data, err } = await changeSupplierPassword(payload);
      if (data) {
        setFormValues({
          emailId: user.emailId,
          oldPassword: "",
          newPassword: "",
          reEnterPassword: "",
        });
        toastify(data.message, "success");
      } else if (err) {
        toastify(err.response.data.message, "error");
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
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <InputBox
            value={formValues.oldPassword}
            type={showPassword.oldPassword ? "text" : "password"}
            iconName={showPassword.oldPassword ? "visible" : "visibleOff"}
            onIconClick={() => {
              setShowPassword((pre) => ({
                ...pre,
                oldPassword: !showPassword.oldPassword,
              }));
            }}
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
            inputlabelshrink
            showAutoFill="new-password"
          />
        </Grid>
        <Grid item xs={12}>
          <InputBox
            value={formValues.newPassword}
            type={showPassword.newPassword ? "text" : "password"}
            iconName={showPassword.newPassword ? "visible" : "visibleOff"}
            onIconClick={() => {
              setShowPassword((pre) => ({
                ...pre,
                newPassword: !showPassword.newPassword,
              }));
            }}
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
            inputlabelshrink
          />
        </Grid>
        <Grid item xs={12}>
          <InputBox
            value={formValues.reEnterPassword}
            type={showPassword.confirmPassword ? "text" : "password"}
            iconName={showPassword.confirmPassword ? "visible" : "visibleOff"}
            onIconClick={() => {
              setShowPassword((pre) => ({
                ...pre,
                confirmPassword: !showPassword.confirmPassword,
              }));
            }}
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
