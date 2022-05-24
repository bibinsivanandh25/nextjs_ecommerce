const product_type = [
  {
    value: "Simple Product",
    label: "Simple Product",
  },
  {
    value: "variable Product",
    label: "Variable Product",
  },
  {
    value: "GroupedProduct",
    label: "Group Product",
  },
];
const commisiondata = [
  {
    value: "Zero commission",
    label: "Zero Commission Mode",
  },
  {
    value: "fixed commission",
    label: "Fixed Commission Mode",
  },
];
const allowback_orders = [
  {
    value: "doNotAllow",
    label: "Do not allow",
  },
  {
    value: "allowButNotifyCustomer",
    label: "Allow,but notify customer",
  },
  {
    value: "allow",
    label: "Allow",
  },
];

const back_orders = [
  {
    value: "doNotAllow",
    label: "Do not allow",
  },
  {
    value: "allowButNotifyCustomer",
    label: "Allow,but notify customer",
  },
];
const shipping_class = [
  {
    value: "shippingClass",
    label: "Choose Shipping Class",
  },
  {
    value: "womenClothing",
    label: "Women Clothing",
  },
];
const stock_status = [
  {
    value: "active",
    label: "Active",
  },
  {
    value: "reject",
    label: "Rejected",
  },
];
const business_processing_days = [
  {
    value: "readyToShipIn",
    label: "Ready to shin in...",
  },
  {
    value: "oneBusinessDay",
    label: "1 business day",
  },
  {
    value: "oneToTwoBusinessDay",
    label: "1-2 business days",
  },
  {
    value: "oneToThreeBusinessDay",
    label: "1-3 business days",
  },
  {
    value: "threeToFiveBusinessDay",
    label: "3-5 business days",
  },
  {
    value: "oneToTwoWeeks",
    label: "1-2 weeks",
  },
];

export {
  commisiondata,
  product_type,
  shipping_class,
  back_orders,
  allowback_orders,
  stock_status,
  business_processing_days,
};
