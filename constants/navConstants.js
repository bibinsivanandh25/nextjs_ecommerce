const supplierMenu = [
  {
    title: "Dashboard",
    logo: "https://dev-mrmrscart-assets.s3.ap-south-1.amazonaws.com/asset/005-dashboard.svg",
    path_name: "dashboard",
    navigate: true,
    child: [],
  },
  {
    title: "My Order",
    logo: "https://dev-mrmrscart-assets.s3.ap-south-1.amazonaws.com/asset/001-my-orders.svg",
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
          {
            title: "Returned Confirm (00)",
            navigate: true,
            logo: null,
            path_name: "returnconfirm",
          },
        ],
      },
    ],
  },
  {
    title: "My Collections",
    logo: "https://dev-mrmrscart-assets.s3.ap-south-1.amazonaws.com/asset/002-collection.svg",
    path_name: "mycollections",
    navigate: true,
  },

  {
    title: "Products & Inventory",
    logo: "https://dev-mrmrscart-assets.s3.ap-south-1.amazonaws.com/asset/002-products-and-inventory.svg",
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
    logo: "https://dev-mrmrscart-assets.s3.ap-south-1.amazonaws.com/asset/006-earnings.svg",
    path_name: "earnings",
    navigate: false,
    child: [{ title: "Summary", path_name: "summary", navigate: true }],
  },
  {
    title: "Coupons",
    logo: "https://dev-mrmrscart-assets.s3.ap-south-1.amazonaws.com/asset/003-coupons.svg",
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
    logo: "https://dev-mrmrscart-assets.s3.ap-south-1.amazonaws.com/asset/004-staff.svg",
    path_name: "staff",
    navigate: true,
    child: [],
  },
  {
    title: "Customer Review",
    logo: "https://dev-mrmrscart-assets.s3.ap-south-1.amazonaws.com/asset/005-customer-review.svg",
    path_name: "customerreview",
    navigate: true,
    child: [],
  },
  {
    title: "Report",
    logo: "https://dev-mrmrscart-assets.s3.ap-south-1.amazonaws.com/asset/016-profit-report.svg",
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
      {
        title: "Revenue Sales",
        path_name: "revenuesales",
        navigate: true,
      },
    ],
  },
  {
    title: "Help & Support",
    logo: "https://dev-mrmrscart-assets.s3.ap-south-1.amazonaws.com/asset/008-support-services.svg",
    path_name: "helpandsupport",
    navigate: true,
    child: [],
  },
  {
    title: "Banners",
    logo: "https://dev-mrmrscart-assets.s3.ap-south-1.amazonaws.com/asset/001-banner.svg",
    path_name: "banners",
    navigate: true,
    child: [],
  },
  {
    title: "Marketing Tools",
    logo: "https://dev-mrmrscart-assets.s3.ap-south-1.amazonaws.com/asset/006-marketing-tools.svg",
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
    logo: "https://dev-mrmrscart-assets.s3.ap-south-1.amazonaws.com/asset/007-news-and-notification.svg",
    path_name: "newsandnotifications",
    navigate: true,
    child: [],
  },
  {
    title: "Customer Q&A",
    logo: "https://dev-mrmrscart-assets.s3.ap-south-1.amazonaws.com/asset/013-question-and-answer.svg",
    path_name: "customerq&a",
    navigate: true,
    child: [],
  },
  {
    title: "Invite User",
    logo: "https://dev-mrmrscart-assets.s3.ap-south-1.amazonaws.com/asset/008-invite-user.svg",
    path_name: "inviteuser",
    navigate: true,
    child: [],
    disabled: true,
  },
  {
    title: "My Shared Products",
    logo: "https://dev-mrmrscart-assets.s3.ap-south-1.amazonaws.com/asset/009-my-shared-products.svg",
    path_name: "mysharedproduct",
    navigate: true,
    child: [],
  },
  {
    title: "Referred Supplier",
    logo: "https://dev-mrmrscart-assets.s3.ap-south-1.amazonaws.com/asset/015-refer.svg",
    path_name: "referredsupplier",
    navigate: true,
    child: [],
  },
  {
    title: "Help Center",
    logo: "https://dev-mrmrscart-assets.s3.ap-south-1.amazonaws.com/asset/010-help-center.svg",
    path_name: "helpcenter",
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
    child: [
      {
        title: "Payment's Dashboard",
        logo: "",
        path_name: "paymentsdashboard",
        navigate: true,
      },
      {
        title: "Payment History - Suppliers",
        logo: "",
        path_name: "paymenthistorysuppliers",
        navigate: true,
      },
      {
        title: "Payment History - Resellers",
        logo: "",
        path_name: "paymenthistoryresellers",
        navigate: true,
      },
      {
        title: "Payment History - Logistics",
        logo: "",
        path_name: "paymenthistorylogistics",
        navigate: true,
      },
      {
        title: "Payment History - Customers",
        logo: "",
        path_name: "paymenthistorycustomers",
        navigate: true,
      },
      {
        title: "COD Order Payments - Logistics",
        logo: "",
        path_name: "codorderpaymentslogistics",
        navigate: true,
      },
      {
        title: "Refund History - Customers",
        logo: "",
        path_name: "refundhistorycustomers",
        navigate: true,
      },
      {
        title: "Supplier Penalty Charges",
        logo: "",
        path_name: "supplierpenaltycharges",
        navigate: true,
      },
      {
        title: "Reseller Subscriptions",
        logo: "",
        path_name: "resellersubscriptions",
        navigate: true,
      },
    ],
  },
  {
    title: "Media",
    logo: "fas fa-shopping-cart",
    path_name: "media",
    navigate: true,
  },
  {
    title: "Articles's & Press Release",
    logo: "fas fa-shopping-cart",
    path_name: "media",
    navigate: false,
    child: [
      {
        title: "Admin Articles",
        logo: "",
        path_name: "adminarticles",
        navigate: true,
      },
      {
        title: "Press Release",
        logo: "",
        path_name: "pressrelease",
        navigate: true,
      },
    ],
  },
  {
    title: "Marketing Tools & Subscriptions",
    logo: "fas fa-shopping-cart",
    path_name: "marketingtools&subscriptions",
    navigate: false,
    child: [
      {
        title: "Set Tools Pricing",
        logo: "",
        path_name: "settoolspricing",
        navigate: true,
      },
      {
        title: "Discount Subscriptions",
        logo: "",
        path_name: "discountsubscriptions",
        navigate: true,
      },
      {
        title: "Today's Deal Subscriptions",
        logo: "",
        path_name: "todaysdealsubscriptions",
        navigate: true,
      },
      {
        title: "Spin Wheel Subscriptions",
        logo: "",
        path_name: "spinwheelsubscriptions",
        navigate: true,
      },
      {
        title: "Scratch Card Subscriptions",
        logo: "",
        path_name: "scratchcardsubscriptions",
        navigate: true,
      },
      {
        title: "Quiz Subscriptions",
        logo: "",
        path_name: "quizsubscriptions",
        navigate: true,
      },
      {
        title: "Price Targeted Subscriptions",
        logo: "",
        path_name: "pricetargetedsubscriptions",
        navigate: true,
      },
      {
        title: "Flags",
        logo: "",
        path_name: "flags",
        navigate: true,
      },
      {
        title: "Notification",
        logo: "",
        path_name: "notification",
        navigate: true,
      },
    ],
  },
  {
    title: "Product Categories",
    logo: "fas fa-shopping-cart",
    path_name: "productcategories",
    navigate: false,
    child: [
      {
        title: "Categories",
        logo: "",
        path_name: "categories",
        navigate: true,
      },
      {
        title: "Sets",
        logo: "",
        path_name: "sets",
        navigate: true,
      },
      {
        title: "Sub - Categories",
        logo: "",
        path_name: "subcategories",
        navigate: true,
      },
      {
        title: "Variation",
        logo: "",
        path_name: "variation",
        navigate: true,
      },
      {
        title: "Variation Approval",
        logo: "",
        path_name: "variationapproval",
        navigate: true,
      },
    ],
  },
  {
    title: "Notifications",
    logo: "",
    path_name: "notifications",
    navigate: true,
  },
  {
    title: "Help & Support",
    logo: "",
    path_name: "help&support",
    navigate: false,
    child: [
      {
        title: "Dashboard",
        logo: "",
        path_name: "dashboard",
        navigate: true,
      },
      {
        title: "Customer Support",
        logo: "",
        path_name: "customersupport",
        navigate: true,
      },
      {
        title: "Reseller Support",
        logo: "",
        path_name: "resellersupport",
        navigate: true,
      },
      {
        title: "Supplier Support",
        logo: "",
        path_name: "suppliersupport",
        navigate: true,
      },
      {
        title: "MrMrscart tickets",
        logo: "",
        path_name: "mrmrscarttickets",
        navigate: true,
      },
    ],
  },
  {
    title: "Log Activity",
    logo: "",
    path_name: "logactivity",
    navigate: true,
  },
  {
    title: "Chats",
    logo: "",
    path_name: "chats",
    navigate: true,
  },
  {
    title: "Admin Manger",
    logo: "",
    path_name: "adminmanager",
    navigate: true,
  },
  {
    title: "Users",
    logo: "",
    path_name: "users",
    navigate: true,
  },
  {
    title: "Groups",
    logo: "",
    path_name: "groups",
    navigate: true,
  },
  {
    title: "Flags",
    logo: "",
    path_name: "flags",
    navigate: true,
  },
  {
    title: "Flags",
    logo: "",
    path_name: "flags",
    navigate: true,
  },
  {
    title: "Reviews",
    logo: "",
    path_name: "reviews",
    navigate: true,
  },
  {
    title: "Banners",
    logo: "",
    path_name: "banners",
    navigate: true,
  },
  {
    title: "Order Summary Table",
    logo: "",
    path_name: "ordersummarytable",
    navigate: true,
  },
  {
    title: "Marketing tools - Approval",
    logo: "",
    path_name: "marketingtoolsapproval",
    navigate: true,
  },
  {
    title: "Admin Store",
    logo: "",
    path_name: "adminstore",
    navigate: false,
    child: [
      {
        title: "No Commission Store",
        logo: "",
        path_name: "nocommissionstore",
        navigate: true,
      },
      {
        title: "Commission Store",
        logo: "",
        path_name: "commissionstore",
        navigate: true,
      },
    ],
  },
  {
    title: "Settings",
    logo: "",
    path_name: "settings",
    navigate: false,
    child: [
      {
        title: "Transactional E-mail, SMS & Push notification",
        logo: "",
        path_name: "transactionalemailssms&pushnotification",
        navigate: true,
      },
    ],
  },
  {
    title: "Tags",
    logo: "",
    path_name: "tags",
    navigate: true,
  },
  {
    title: "Admin Capabalities",
    logo: "",
    path_name: "admincapabalities",
    navigate: true,
  },
  {
    title: "Initiate Payment",
    logo: "",
    path_name: "initiatepayment",
    navigate: true,
  },
  {
    title: "Payment History",
    logo: "",
    path_name: "paymenthistory",
    navigate: false,
    child: [
      {
        title: "Transactions Summary Outward",
        logo: "",
        path_name: "transactionssummaryoutward",
        navigate: true,
      },
      {
        title: "Transactions Summary Inward",
        logo: "",
        path_name: "transactionssummaryinward",
        navigate: true,
      },
    ],
  },
  {
    title: "Admin Configuration",
    logo: "",
    path_name: "adminconfiguration",
    navigate: true,
  },
  {
    title: "Notification Suggestion",
    logo: "",
    path_name: "notificationsuggestion",
    navigate: true,
  },
];

export { supplierMenu, resellerMenu, customerMenu, adminMenu };
