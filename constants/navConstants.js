const supplierMenu = [
  {
    title: "Dashboard",
    logo: "fas fa-shopping-cart",
    path_name: "dashboard",
    navigate: true,
    child: [],
  },
  {
    title: "My Order",
    logo: "fas fa-shopping-cart",
    path_name: "myorders",
    navigate: false,
    child: [
      {
        title: "New Orders To Process (0)",
        logo: null,
        navigate: false,
        path_name: "neworder",
        child: [
          {
            title: "Accept & Confirm Address (00)",
            navigate: true,
            logo: null,
            path_name: "acceptandconfirmaddress",
          },
          {
            title: "Generate Invoice & Manifest (00)",
            logo: null,
            navigate: true,
            path_name: "generateinvoiceandmanifest",
          },
          {
            title: "Upload Manifest (00)",
            logo: null,
            navigate: true,
            path_name: "uploadmanifest",
          },
        ],
      },
      {
        title: "Order History (0)",
        logo: null,
        navigate: false,
        path_name: "orderhistory",
        child: [
          {
            title: "Manifested Orders (00)",
            navigate: true,
            logo: null,
            path_name: "manifestedorders",
          },
          {
            title: "Shipped Orders (00)",
            navigate: true,
            logo: null,
            path_name: "shippedorders",
          },
          {
            title: "Delivered Orders (00)",
            navigate: true,
            logo: null,
            path_name: "deliveredorders",
          },
          {
            title: "Cancelled Orders (00)",
            navigate: true,
            logo: null,
            path_name: "cancelledorders",
          },
          {
            title: "Returned Orders (00)",
            navigate: true,
            logo: null,
            path_name: "returnedorders",
          },
        ],
      },
    ],
  },
  {
    title: "My Collections",
    logo: "fas fa-shopping-cart",
    path_name: "mycollections",
    navigate: true,
  },

  {
    title: "Products & Inventory",
    logo: "fas fa-shopping-cart",
    path_name: "products&inventory",
    navigate: false,
    child: [
      {
        title: "My Products (Update Inventory)",
        path_name: "myproducts",
        navigate: true,
      },
      {
        title: "Add New Products",
        path_name: "addnewproduct",
        navigate: true,
      },
      {
        title: "Add New Collections",
        path_name: "addnewcollection",
        navigate: true,
      },
      {
        title: "Add grouped products",
        path_name: "addgroupproducts",
        navigate: true,
      },
      {
        title: "New Product Upload (Excel)",
        path_name: "newproductupload",
        navigate: true,
      },
      {
        title: "Add Inventory (Excel)",
        path_name: "addinventory",
        navigate: true,
      },
      {
        title: "MrMrsCart Product",
        path_name: "mrmrscartproduct",
        navigate: true,
      },
    ],
  },
  {
    title: "My Earnings",
    logo: "fas fa-shopping-cart",
    path_name: "earnings",
    navigate: false,
    child: [{ title: "Summary", path_name: "summary", navigate: true }],
  },
  {
    title: "Coupons",
    logo: "fas fa-shopping-cart",
    path_name: "coupons",
    navigate: true,
    child: [
      {
        title: "Add New Coupons",
        path_name: "addnewcoupons",
        navigate: true,
        showOption: false,
      },
    ],
  },
  {
    title: "Staff",
    logo: "fas fa-shopping-cart",
    path_name: "staff",
    navigate: true,
    child: [],
  },
  {
    title: "Customer Review",
    logo: "fas fa-shopping-cart",
    path_name: "customerreview",
    navigate: true,
    child: [],
  },
  {
    title: "Report",
    logo: "fas fa-shopping-cart",
    path_name: "reports",
    navigate: false,
    child: [
      {
        title: "Payment Reports",
        path_name: "paymentreport",
        navigate: true,
      },
      {
        title: "Order Report",
        path_name: "orderreport",
        navigate: true,
      },
      {
        title: "TCS/Sales Report",
        path_name: "salesreport",
        navigate: true,
      },
    ],
  },
  {
    title: "Help & support",
    logo: "fas fa-shopping-cart",
    path_name: "helpandsupport",
    navigate: true,
    child: [],
  },
  {
    title: "News & Notifications",
    logo: "fas fa-shopping-cart",
    path_name: "newsandnotifications",
    navigate: true,
    child: [],
  },
];

const resellerMenu = [
  {
    title: "Dashboard",
    logo: "fas fa-shopping-cart",
    path_name: "dashboard",
    navigate: true,
  },
  {
    title: "Home",
    logo: "fas fa-shopping-cart",
    path_name: "home",
    navigate: true,
  },
  {
    title: "New Products",
    logo: "fas fa-shopping-cart",
    path_name: "newproducts",
    navigate: true,
  },
  {
    title: "Category",
    logo: "fas fa-shopping-cart",
    path_name: "category",
    navigate: true,
  },
  {
    title: "My Shared Category",
    logo: "fas fa-shopping-cart",
    path_name: "mysharedcategory",
    navigate: true,
  },
  {
    title: "My Shop",
    logo: "fas fa-shopping-cart",
    path_name: "myshop",
    navigate: true,
  },
  {
    title: "My Earnings",
    logo: "fas fa-shopping-cart",
    path_name: "myearnings",
    navigate: true,
  },
  {
    title: "Wishlist",
    logo: "fas fa-shopping-cart",
    path_name: "wishlist",
    navigate: true,
  },
  {
    title: "Customers",
    logo: "fas fa-shopping-cart",
    path_name: "Customers",
    navigate: true,
  },
  {
    title: "Articles",
    logo: "fas fa-shopping-cart",
    path_name: "articles",
    navigate: true,
  },
  {
    title: "News & Notifications",
    logo: "fas fa-shopping-cart",
    path_name: "/newsandnotifications",
    navigate: false,
    child: [
      {
        title: "News",
        logo: "",
        navigate: true,
        path_name: "news",
      },
      {
        title: "Notifications",
        logo: "",
        navigate: true,
        path_name: "notifications",
      },
    ],
  },
  {
    title: "Referred Reseller",
    logo: "fas fa-shopping-cart",
    path_name: "referredreseller",
    navigate: true,
  },
  {
    title: "Marketing Tools",
    logo: "fas fa-shopping-cart",
    path_name: "marketingtools",
    navigate: false,
    child: [
      {
        title: "Create discount coupons",
        logo: "",
        navigate: true,
        path_name: "creatediscountcoupons",
      },
      {
        title: "Create Today's Deal",
        logo: "",
        navigate: true,
        path_name: "createtodaysdeals",
      },
      {
        title: "Create Lucky Draw",
        logo: "",
        navigate: true,
        path_name: "createluckydraw",
      },
      {
        title: "Unlock Tools",
        logo: "",
        navigate: false,
        path_name: "unlocktools",
        child: [
          {
            title: "Single",
            logo: "",
            navigate: true,
            path_name: "single",
          },
          {
            title: "Combo",
            logo: "",
            navigate: true,
            path_name: "combo",
          },
        ],
      },
      {
        title: "Share Product by price",
        logo: "",
        navigate: true,
        path_name: "shareproductbyprice",
      },
    ],
  },
  {
    title: "Challenges",
    logo: "fas fa-shopping-cart",
    path_name: "challenges",
    navigate: true,
  },
  {
    title: "Rate MrMrsCart",
    logo: "fas fa-shopping-cart",
    path_name: "ratemrmrscart",
    navigate: true,
  },
  {
    title: "Help & Support",
    logo: "fas fa-shopping-cart",
    path_name: "helpandsupport",
    navigate: true,
  },
  {
    title: "Customer Q & A",
    logo: "fas fa-shopping-cart",
    path_name: "customerq&a",
    navigate: true,
  },
  {
    title: "Help Center",
    logo: "fas fa-shopping-cart",
    path_name: "helpcenter",
    navigate: true,
  },
];

export { supplierMenu, resellerMenu };
