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
  {
    value: "pending",
    label: "Pending",
  },
  {
    value: "out-of-stock",
    label: "Out Of Stock",
  },
  {
    value: "blacked",
    label: "Blacklisted",
  },
];

export {
  commisiondata,
  product_type,
  shipping_class,
  back_orders,
  allowback_orders,
  stock_status,
};
