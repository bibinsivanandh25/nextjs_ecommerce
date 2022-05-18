const validationRegex = {
  mobile: /^([+]d{2})?\d{10}$/,
  email: /^[a-z0-9]+@[a-z]+.[a-z]{2,3}$/,
  upperCase: /^.*[A-Z].*$/,
  lowerCase: /^.*[a-z].*$/,
  specialChar: /\@|\$|\#/,
};

export default validationRegex;
