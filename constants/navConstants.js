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
            title: "Accept & Confirm Orders (00)",
            navigate: true,
            logo: null,
            path_name: "acceptandconfirmorders",
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
          {
            title: "Upload Warranty Details",
            logo: null,
            navigate: true,
            path_name: "uploadwarranty",
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
      {
        title: "Invoice & Trademarks",
        path_name: "invoiceandtrademarks",
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
    navigate: false,
    child: [
      {
        title: "MrMrs Cart Coupons",
        path_name: "mrmrscartcoupons",
        navigate: true,
        showOption: false,
      },
      {
        title: "Supplier Store Coupons",
        path_name: "supplierstorecoupons",
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
    title: "Help & Support",
    logo: "fas fa-shopping-cart",
    path_name: "helpandsupport",
    navigate: true,
    child: [],
  },
  {
    title: "Banners",
    logo: "fas fa-shopping-cart",
    path_name: "banners",
    navigate: true,
    child: [],
  },
  {
    title: "Marketing Tools",
    logo: "fas fa-shopping-cart",
    path_name: "marketingtools",
    navigate: false,
    child: [
      {
        title: "Create Discount Coupons",
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
        navigate: false,
        path_name: "createluckydraw",
        child: [
          {
            title: "Create Quiz",
            logo: "",
            navigate: true,
            path_name: "createquiz",
          },
          {
            title: "Spin Wheel",
            logo: "",
            navigate: true,
            path_name: "spinwheel",
          },
          {
            title: "Scratch Card",
            logo: "",
            navigate: true,
            path_name: "scratchcard",
          },
        ],
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
        title: "Share Product By Price",
        logo: "",
        navigate: true,
        path_name: "shareproductbyprice",
      },
      {
        title: "Notifications",
        logo: "",
        navigate: true,
        path_name: "notification",
      },
      {
        title: "Flags",
        logo: "",
        navigate: true,
        path_name: "flags",
      },
      {
        title: "Subscription History",
        logo: "",
        navigate: true,
        path_name: "subscriptionhistory",
      },
    ],
  },
  {
    title: "News & Notifications",
    logo: "fas fa-shopping-cart",
    path_name: "newsandnotifications",
    navigate: true,
    child: [],
  },
  {
    title: "Customer Q&A",
    logo: "fas fa-shopping-cart",
    path_name: "customerq&a",
    navigate: true,
    child: [],
  },
  {
    title: "Invite User",
    logo: "fas fa-shopping-cart",
    path_name: "inviteuser",
    navigate: true,
    child: [],
  },
  {
    title: "My Shared Products",
    logo: "fas fa-shopping-cart",
    path_name: "mysharedproduct",
    navigate: true,
    child: [],
  },
  {
    title: "Referred Supplier",
    logo: "fas fa-shopping-cart",
    path_name: "referredsupplier",
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
    title: "My Shared Product",
    logo: "fas fa-shopping-cart",
    path_name: "mysharedproduct",
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
    navigate: false,
    child: [{ title: "Summary", path_name: "summary", navigate: true }],
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
    path_name: "customers",
    navigate: true,
  },
  // {
  //   title: "Articles",
  //   logo: "fas fa-shopping-cart",
  //   path_name: "articles",
  //   navigate: true,
  // },
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
        title: "Push Notifications",
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
        title: "Create Discount Coupons",
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
        navigate: false,
        path_name: "createluckydraw",
        child: [
          {
            title: "Create Quiz",
            logo: "",
            navigate: true,
            path_name: "createquiz",
          },
          {
            title: "Spin Wheel",
            logo: "",
            navigate: true,
            path_name: "spinwheel",
          },
          {
            title: "Scratch Card",
            logo: "",
            navigate: true,
            path_name: "scratchcard",
          },
        ],
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
        title: "Share Product By Price",
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

const customerMenu = [
  {
    title: "Home",
    logo: "fas fa-shopping-cart",
    path_name: "Home",
  },
  // {
  //   title: "Apparel & Clothing",
  //   logo: "fas fa-shopping-cart",
  //   path_name: "ApparelandClothing",
  // },
  // {
  //   title: "Sarees & Dress Materials",
  //   logo: "fas fa-shopping-cart",
  //   path_name: "SareesandDressMaterials",
  // },
  // {
  //   title: "Fashion Jewellery",
  //   logo: "fas fa-shopping-cart",
  //   path_name: "FashionJewellery",
  // },
  // {
  //   title: "Footwear",
  //   logo: "fas fa-shopping-cart",
  //   path_name: "Footwear",
  // },
  // {
  //   title: "Linen",
  //   logo: "fas fa-shopping-cart",
  //   path_name: "Linen",
  // },
  // {
  //   title: "Baby & Kids Essentials",
  //   logo: "fas fa-shopping-cart",
  //   path_name: "BabyandKidsEssentials",
  // },
  // {
  //   title: "Beauty Products",
  //   logo: "fas fa-shopping-cart",
  //   path_name: "BeautyProducts",
  // },
  // {
  //   title: "Personal care Appliances",
  //   logo: "fas fa-shopping-cart",
  //   path_name: "PersonalcareAppliances",
  // },
];

const adminMenu = [
  {
    title: "Dashboard",
    logo: "fas fa-shopping-cart",
    path_name: "dashboard",
    navigate: true,
  },
  {
    title: "Products",
    logo: "fas fa-shopping-cart",
    path_name: "dashboard",
    navigate: false,
    child: [
      {
        title: "Customer Q & A",
        logo: "",
        path_name: "customerqanda",
        navigate: true,
      },
      {
        title: "Dashboard",
        logo: "",
        path_name: "dashboard",
        navigate: true,
      },
      {
        title: "Fixed Margin",
        logo: "",
        path_name: "fixedmargin",
        navigate: true,
      },
      {
        title: "Zero Comission",
        logo: "",
        path_name: "zerocommission",
        navigate: true,
      },
    ],
  },
  {
    title: "Orders",
    logo: "fas fa-shopping-cart",
    path_name: "orders",
    navigate: false,
    child: [
      {
        title: "Dashboard",
        logo: "",
        path_name: "dashboard",
        navigate: true,
      },
      {
        title: "Order Summary",
        logo: "",
        path_name: "ordersummary",
        navigate: true,
      },
      {
        title: "Fixed Comission Products",
        logo: "",
        path_name: "fixedcommissionproducts",
        navigate: true,
      },
      {
        title: "Zero Comission Products",
        logo: "",
        path_name: "zerocommissionproducts",
        navigate: true,
      },
    ],
  },
  {
    title: "Delivery Management",
    logo: "fas fa-shopping-cart",
    path_name: "deliverymanagement",
    navigate: false,
    child: [
      {
        title: "Dashboard",
        logo: "",
        path_name: "dashboard",
        navigate: true,
      },
      {
        title: "Delivery Status",
        logo: "",
        path_name: "deliverystatus",
        navigate: true,
      },
      {
        title: "Serviceable Pincodes",
        logo: "",
        path_name: "serviceablepincode",
        navigate: true,
      },
      {
        title: "Delivery Charge",
        logo: "",
        path_name: "deliverycharge",
        navigate: true,
      },
      {
        title: "Delivery Partner",
        logo: "",
        path_name: "deliverypartners",
        navigate: true,
      },
    ],
  },
  {
    title: "Suppliers",
    logo: "fas fa-shopping-cart",
    path_name: "suppliers",
    navigate: false,
    child: [
      {
        title: "Dashboard",
        logo: "",
        path_name: "dashboard",
        navigate: true,
      },
      {
        title: "Supplier Approval",
        logo: "",
        path_name: "supplierapproval",
        navigate: true,
      },
      {
        title: "Active",
        logo: "",
        path_name: "active",
        navigate: true,
      },
      {
        title: "Rejected",
        logo: "",
        path_name: "rejected",
        navigate: true,
      },
      {
        title: "Updated",
        logo: "",
        path_name: "updated",
        navigate: true,
      },
      {
        title: "Disabled",
        logo: "",
        path_name: "disabled",
        navigate: true,
      },
      {
        title: "Queries",
        logo: "",
        path_name: "queries",
        navigate: true,
      },
    ],
  },
  {
    title: "Resellers",
    logo: "fas fa-shopping-cart",
    path_name: "resellers",
    navigate: false,
    child: [
      {
        title: "Dashboard",
        logo: "",
        path_name: "dashboard",
        navigate: true,
      },
      {
        title: "Active",
        logo: "",
        path_name: "active",
        navigate: true,
      },
      {
        title: "Draft & Queries",
        logo: "",
        path_name: "draftsandqueries",
        navigate: true,
      },
      {
        title: "Deactivated",
        logo: "",
        path_name: "deactivated",
        navigate: true,
      },
    ],
  },
  {
    title: "Customers",
    logo: "fas fa-shopping-cart",
    path_name: "customers",
    navigate: false,
    child: [
      {
        title: "Dashboard",
        logo: "",
        path_name: "dashboard",
        navigate: true,
      },
      {
        title: "Active Customer",
        logo: "",
        path_name: "activecustomer",
        navigate: true,
      },
      {
        title: "Disabled Customer",
        logo: "",
        path_name: "disabledcustomer",
        navigate: true,
      },
    ],
  },
  {
    title: "Payments & Subscriptions",
    logo: "fas fa-shopping-cart",
    path_name: "payment&subscriptions",
    navigate: false,
    child: [{}],
  },
];

export { supplierMenu, resellerMenu, customerMenu };
