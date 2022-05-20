import ButtonComponent from "components/atoms/ButtonComponent";
import validateMessage from "constants/validateMessages";
import InputBox from "components/atoms/InputBoxComponent";
import validationRegex from "services/utils/regexUtils";
import { useState } from "react";

const NewPasswordForm = ({
  formValues = {},
  handleSubmit = () => {},
  setFormValues = () => {},
}) => {
  const [error, setError] = useState({});

  const validateForm = () => {
    const errObj = { ...error };
    const validate = (id, errMsg, valid1, valid2) => {
      if (!formValues[id]) {
        errObj[id] = validateMessage.field_required;
      } else if (
        (valid1 &&
          valid2 &&
          !valid1.test(formValues[id]) &&
          !valid2.test(formValues[id])) ||
        !valid1.test(formValues[id])
      ) {
        errObj[id] = errMsg;
      } else {
        errObj[id] = null;
      }
    };
    validate(
      "userId",
      validateMessage.userId,
      validationRegex.mobile,
      validationRegex.email
    );
    validate("password", validateMessage.password, validationRegex.password);
    validate("rePassword", validateMessage.password, validationRegex.password);

    setError({ ...errObj });
    let valid = true;
    Object.values(errObj).forEach((i) => {
      if (i) {
        valid = false;
      }
    });
    return valid;
  };
  const handleSubmitBtnClick = () => {
    if (validateForm()) handleSubmit();
  };

  return (
    <div className="d-flex flex-column justify-content-center">
      <div style={{ width: "400px" }}>
        <InputBox
          placeholder="Enter your E-Mail Id / Mobile No."
          value={formValues.userId}
          label="E-Mail Id / Mobile No."
          className="w-100 my-2"
          size="small"
          onInputChange={(e) => {
            setFormValues((prev) => ({
              ...prev,
              userId: e.target.value,
            }));
          }}
          error={Boolean(error["userId"])}
          helperText={error["userId"]}
          inputlabelshrink
        />
      </div>

      <InputBox
        placeholder="Enter New Password"
        value={formValues.password}
        label="Enter New Password"
        className="w-100 my-2"
        size="small"
        onInputChange={(e) => {
          setFormValues((prev) => ({
            ...prev,
            password: e.target.value,
          }));
        }}
        error={Boolean(error["password"])}
        helperText={<div className="mxw-200">{error["password"]}</div>}
        inputlabelshrink
      />

      <InputBox
        placeholder="Re-enter New Password"
        value={formValues.rePassword}
        label="Re-enter New Password"
        className="w-100 my-2"
        size="small"
        onInputChange={(e) => {
          setFormValues((prev) => ({
            ...prev,
            rePassword: e.target.value,
          }));
        }}
        error={Boolean(error["rePassword"])}
        helperText={error["rePassword"]}
        inputlabelshrink
      />
      <ButtonComponent
        label="Submit"
        onBtnClick={handleSubmitBtnClick}
        muiProps={"w-30p mx-auto"}
      />
    </div>
  );
};

export default NewPasswordForm;
