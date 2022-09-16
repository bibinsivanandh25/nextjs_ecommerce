const validationRegex = {
  mobile: /^([+]d{2})?\d{10}$/,
  email: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
  password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
  upperCase: /^.*[A-Z].*$/,
  lowerCase: /^.*[a-z].*$/,
  specialChar: /\@|\$|\#/,
  decimal_2digit: /^(\d+\.?(\d{1,2}))$/,
  name: /^[A-Za-z]+$/,
  integers: /^(\d+)$/,
  gstin: /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/,
};

export default validationRegex;
