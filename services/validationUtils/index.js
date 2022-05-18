import validateMessage from "constants/validateMessages";

const requiredStringValidator = (value) => {
  if (typeof value === "string" && value === "")
    return validateMessage.required;
  return;
};

const requiredValidator = (value) => {
  if (!value) return validateMessage.required;
  return;
};

const maxLengthValidator = (value, length) => {
  if (value && value.length > length) {
    if (length === 255) {
      return validateMessage.alpha_numeric_max_255;
    } else if (length === 50) {
      return validateMessage.alpha_numeric_max_50;
    } else if (length === 60) {
      return validateMessage.alpha_numeric_max_60;
    } else if (length === 15) {
      return validateMessage.alpha_numeric_15;
    }
    return `${validateMessage.maxLength} ${length}`;
  } else if (!value) {
    return validateMessage.required;
  }
  return;
};

export { requiredStringValidator, requiredValidator, maxLengthValidator };
