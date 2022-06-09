const validationRegex = {
  mobile: /^([+]d{2})?\d{10}$/,
  email: /^[a-z0-9]+@[a-z]+.[a-z]{2,3}$/,
  password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
  upperCase: /^.*[A-Z].*$/,
  lowerCase: /^.*[a-z].*$/,
  specialChar: /\@|\$|\#/,
  decimal_2digit: /^(\d+\.?(\d{1,2}))$/,
  name: /^[A-Za-z]+$/,
  integers: /^(\d+)$/,
};

export default validationRegex;
