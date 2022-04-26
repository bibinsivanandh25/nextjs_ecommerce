import validateMessage from "constants/validateMessages";

const requiredValidator = (value) => {
  if (typeof value === "string" && value === "")
    return validateMessage.required;
  return;
};

export { requiredValidator };
