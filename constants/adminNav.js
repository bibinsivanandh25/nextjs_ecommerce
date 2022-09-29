const adminNav = [
  {
    title: "Dashboard",
    logo: "",
    pathName: "dashboard",
    navigate: true,
    disabled: false,
    child: [],
  },
  {
    title: "Products",
    logo: "",
    pathName: "products",
    navigate: false,
    disabled: false,
    child: [
      {
        title: "Dashboard",
        logo: null,
        navigate: true,
        disabled: false,
        pathName: "dashboard",
        child: [],
      },
      {
        title: "Fixed Commission",
        logo: null,
        navigate: true,
        disabled: false,
        pathName: "",
        child: [],
      },
      {
        title: "Zero Commission",
        logo: null,
        navigate: true,
        disabled: false,
        pathName: "zerocommission",
        child: [],
      },
      {
        title: "Products Categories",
        logo: null,
        navigate: false,
        disabled: false,
        pathName: "productcategories",
        child: [
          {
            title: "Categories",
            logo: null,
            navigate: true,
            disabled: false,
            pathName: "categories",
            child: [],
          },
          {
            title: "Sets",
            logo: null,
            navigate: true,
            disabled: false,
            pathName: "sets",
            child: [],
          },
          {
            title: "Sub-Categories",
            logo: null,
            navigate: true,
            disabled: false,
            pathName: "subcategories",
            child: [],
          },
          {
            title: "Variations",
            logo: null,
            navigate: true,
            disabled: false,
            pathName: "variation",
            child: [],
          },
          {
            title: "Variation Approval",
            logo: null,
            navigate: true,
            disabled: false,
            pathName: "variationapproval",
            child: [],
          },
        ],
      },
    ],
  },
  {
    title: "Orders",
    logo: "",
    pathName: "orders",
    navigate: false,
    disabled: false,
    child: [
      {
        title: "Dashboard",
        logo: "",
        pathName: "dashboard",
        navigate: true,
        disabled: false,
        child: [],
      },
      {
        title: "Fixed Commission Products",
        logo: "",
        pathName: "fixedcommissionproducts",
        navigate: true,
        disabled: false,
        child: [],
      },
      {
        title: "Zero Commission Products",
        logo: "",
        pathName: "zerocommissionproducts",
        navigate: true,
        disabled: false,
        child: [],
      },
      {
        title: "Orders Summary",
        logo: "",
        pathName: "ordersummary",
        navigate: true,
        disabled: false,
        child: [],
      },
    ],
  },
  {
    title: "Delivery Management",
    logo: "",
    pathName: "deliverymanagement",
    navigate: false,
    disabled: false,
    child: [
      {
        title: "Dashboard",
        logo: "",
        pathName: "dashboard",
        navigate: true,
        disabled: false,
        child: [],
      },
      {
        title: "Delivery Status",
        logo: "",
        pathName: "deliverystatus",
        navigate: true,
        disabled: false,
        child: [],
      },
      {
        title: "Servicable Pin Codes",
        logo: "",
        pathName: "serviceablepincode",
        navigate: true,
        disabled: false,
        child: [],
      },
      {
        title: "Delivery charge",
        logo: "",
        pathName: "deliverycharge",
        navigate: true,
        disabled: false,
        child: [],
      },
      {
        title: "Delivery Partner",
        logo: "",
        pathName: "deliverypartners",
        navigate: true,
        disabled: false,
        child: [],
      },
    ],
  },
  {
    title: "Customers",
    logo: "",
    pathName: "customers",
    navigate: false,
    disabled: false,
    child: [
      {
        title: "Dashboard",
        logo: "",
        pathName: "dashboard",
        navigate: true,
        disabled: false,
        child: [],
      },
      {
        title: "Active Customer",
        logo: "",
        pathName: "activecustomer",
        navigate: true,
        disabled: false,
        child: [],
      },
      {
        title: "Disabled Customer",
        logo: "",
        pathName: "disabledcustomer",
        navigate: true,
        disabled: false,
        child: [],
      },
      {
        title: "Customer Q&A",
        logo: "",
        pathName: "customerqanda",
        navigate: true,
        disabled: false,
        child: [],
      },
    ],
  },
  {
    title: "Reseller",
    logo: "",
    pathName: "resellers",
    navigate: false,
    disabled: false,
    child: [
      {
        title: "Dashboard",
        logo: "",
        pathName: "dashboard",
        navigate: true,
        disabled: false,
        child: [],
      },
      {
        title: "Active",
        logo: "",
        pathName: "active",
        navigate: true,
        disabled: false,
        child: [],
      },
      {
        title: "Draft & Queries",
        logo: "",
        pathName: "draftsandqueries",
        navigate: true,
        disabled: false,
        child: [],
      },
      {
        title: "Deactivated",
        logo: "",
        pathName: "deactivated",
        navigate: true,
        disabled: false,
        child: [],
      },
    ],
  },
  {
    title: "Supplier",
    logo: "",
    pathName: "suppliers",
    navigate: false,
    disabled: false,
    child: [
      {
        title: "Dashboard",
        logo: "",
        pathName: "supplierdashboard",
        navigate: true,
        disabled: false,
        child: [],
      },
      {
        title: "Supplier Approval",
        logo: "",
        pathName: "supplierapproval",
        navigate: true,
        disabled: false,
        child: [],
      },
      {
        title: "Active",
        logo: "",
        pathName: "active",
        navigate: true,
        disabled: false,
        child: [],
      },
      {
        title: "Rejected",
        logo: "",
        pathName: "dashboard",
        navigate: true,
        disabled: false,
        child: [],
      },
      {
        title: "Updated",
        logo: "",
        pathName: "updated",
        navigate: true,
        disabled: false,
        child: [],
      },
      {
        title: "Disabled",
        logo: "",
        pathName: "disabled",
        navigate: true,
        disabled: false,
        child: [],
      },
      {
        title: "Queries",
        logo: "",
        pathName: "queries",
        navigate: true,
        disabled: false,
        child: [],
      },
    ],
  },
  {
    title: "Admin",
    logo: "",
    pathName: "admin",
    navigate: false,
    disabled: false,
    child: [
      {
        title: "Admin Configuration",
        logo: "",
        pathName: "adminconfiguration",
        navigate: false,
        disabled: false,
        child: [
          {
            title: "Supplier Store Settings",
            logo: "",
            pathName: "supplierstoresettings",
            navigate: true,
            disabled: false,
            child: [],
          },
          {
            title: "Transactional, E-mail, SMS & Push Notification",
            logo: "",
            pathName: "notification",
            navigate: true,
            disabled: false,
            child: [],
          },
          {
            title: "Notifications Suggestions",
            logo: "",
            pathName: "notificationsuggestions",
            navigate: true,
            disabled: false,
            child: [],
          },
          {
            title: "Banners",
            logo: "",
            pathName: "banners",
            navigate: true,
            disabled: false,
            child: [],
          },
          {
            title: "Flags",
            logo: "",
            pathName: "flags",
            navigate: true,
            disabled: false,
            child: [],
          },
          {
            title: "Tags",
            logo: "",
            pathName: "tags",
            navigate: true,
            disabled: false,
            child: [],
          },
        ],
      },
      {
        title: "Admin Staff",
        logo: "",
        pathName: "adminstaff",
        navigate: false,
        disabled: false,
        child: [
          {
            title: "Manager",
            logo: "",
            pathName: "adminmanager",
            navigate: true,
            disabled: false,
            child: [],
          },
          {
            title: "User",
            logo: "",
            pathName: "users",
            navigate: true,
            disabled: false,
            child: [],
          },
          {
            title: "Groups",
            logo: "",
            pathName: "groups",
            navigate: true,
            disabled: false,
            child: [],
          },
        ],
      },
    ],
  },
  {
    title: "Admin Store",
    logo: "",
    pathName: "adminstore",
    navigate: false,
    disabled: false,
    child: [
      {
        title: "No Commission Store",
        logo: "",
        pathName: "nocommissionstore",
        navigate: true,
        disabled: false,
        child: [],
      },
      {
        title: "Commissioned Store",
        logo: "",
        pathName: "commissionstore",
        navigate: true,
        disabled: false,
        child: [],
      },
    ],
  },
  {
    title: "Marketing Tools",
    logo: "",
    pathName: "marketingtools",
    navigate: false,
    disabled: false,
    child: [
      {
        title: "Set Tool Pricing ",
        logo: "",
        pathName: "settoolspricing",
        navigate: true,
        disabled: false,
        child: [],
      },
      {
        title: "Subscriptions",
        logo: "",
        pathName: "subscriptions",
        navigate: false,
        disabled: false,
        child: [
          {
            title: "Discount Subscriptions",
            logo: "",
            pathName: "discountsubscriptions",
            navigate: true,
            disabled: false,
            child: [],
          },
          {
            title: "Todays Deal Subscriptions",
            logo: "",
            pathName: "todaysdealsubscriptions",
            navigate: true,
            disabled: false,
            child: [],
          },
          {
            title: "Spin Wheel Subscriptions",
            logo: "",
            pathName: "spinwheelsubscriptions",
            navigate: true,
            disabled: false,
            child: [],
          },
          {
            title: "Scratch Card Subscriptions",
            logo: "",
            pathName: "scratchcardsubscriptions",
            navigate: true,
            disabled: false,
            child: [],
          },
          {
            title: "Quiz Subscriptions",
            logo: "",
            pathName: "quizsubscriptions",
            navigate: true,
            disabled: false,
            child: [],
          },
          {
            title: "Price Targeted Subscriptions",
            logo: "",
            pathName: "pricetargetedsubscriptions",
            navigate: true,
            disabled: false,
            child: [],
          },
          {
            title: "Notifications",
            logo: "",
            pathName: "notification",
            navigate: true,
            disabled: false,
            child: [],
          },
          {
            title: "Flags",
            logo: "",
            pathName: "flags",
            navigate: false,
            disabled: false,
            child: [],
          },
        ],
      },
      {
        title: "Approval",
        logo: "",
        pathName: "",
        navigate: false,
        disabled: false,
        child: [
          {
            title: "Discount",
            logo: "",
            pathName: "discount",
            navigate: true,
            disabled: false,
            child: [],
          },
          {
            title: "Todays Deal",
            logo: "",
            pathName: "todaysdeal",
            navigate: true,
            disabled: false,
            child: [],
          },
          {
            title: "Spin Wheel",
            logo: "",
            pathName: "spinwheel",
            navigate: true,
            disabled: false,
            child: [],
          },
          {
            title: "Scratch Card",
            logo: "",
            pathName: "scratchcard",
            navigate: true,
            disabled: false,
            child: [],
          },
          {
            title: "Quiz",
            logo: "",
            pathName: "quiz",
            navigate: true,
            disabled: false,
            child: [],
          },
          {
            title: "Price Targeted",
            logo: "",
            pathName: "pricetargeted",
            navigate: true,
            disabled: false,
            child: [],
          },
        ],
      },
    ],
  },
  {
    title: "Payments & Subscription",
    logo: "",
    pathName: "payment&subscriptions",
    navigate: false,
    disabled: false,
    child: [
      {
        title: "Dashboard",
        logo: "",
        pathName: "dashboard",
        navigate: true,
        disabled: false,
        child: [],
      },
      {
        title: "Orders Payment History",
        logo: "",
        pathName: "orderspaymenthistory",
        navigate: false,
        disabled: false,
        child: [
          {
            title: "Supplier",
            logo: "",
            pathName: "supplier",
            navigate: false,
            disabled: false,
            child: [
              {
                title: "Supplier Payment",
                logo: "",
                pathName: "paymenthistory",
                navigate: true,
                disabled: false,
                child: [],
              },
              {
                title: "Penalty Charges",
                logo: "",
                pathName: "penaltycharges",
                navigate: true,
                disabled: false,
                child: [],
              },
            ],
          },
          {
            title: "Customer",
            logo: "",
            pathName: "customer",
            navigate: false,
            disabled: false,
            child: [
              {
                title: "Refund History",
                logo: "",
                pathName: "refundhistory",
                navigate: true,
                disabled: false,
                child: [],
              },
              {
                title: "Customer Payment",
                logo: "",
                pathName: "paymenthistory",
                navigate: true,
                disabled: false,
                child: [],
              },
            ],
          },
          {
            title: "Reseller",
            logo: "",
            pathName: "reseller",
            navigate: false,
            disabled: false,
            child: [
              {
                title: "Reseller Payment",
                logo: "",
                pathName: "paymenthistory",
                navigate: true,
                disabled: false,
                child: [],
              },
              {
                title: "Reseller Subscriptions",
                logo: "",
                pathName: "subscriptions",
                navigate: true,
                disabled: false,
                child: [],
              },
            ],
          },
          {
            title: "Logistics",
            logo: "",
            pathName: "logistics",
            navigate: true,
            disabled: false,
            child: [],
          },
          {
            title: "COD order payments-logistics",
            logo: "",
            pathName: "codorderpaymentslogistics",
            navigate: true,
            disabled: false,
            child: [],
          },
        ],
      },
      {
        title: "Payments",
        logo: "",
        pathName: "payments",
        navigate: false,
        disabled: false,
        child: [
          {
            title: "Initiate Payment",
            logo: "",
            pathName: "initiatepayment",
            navigate: true,
            disabled: false,
            child: [],
          },
          {
            title: "Multestore Payment History",
            logo: "",
            pathName: "multestorepaymenthistory",
            navigate: false,
            disabled: false,
            child: [
              {
                title: "Transaction Summary Outward",
                logo: "",
                pathName: "transactionssummaryinward",
                navigate: true,
                disabled: false,
                child: [],
              },
              {
                title: "Transaction Summary Inward",
                logo: "",
                pathName: "transactionssummaryinward",
                navigate: true,
                disabled: false,
                child: [],
              },
            ],
          },
          {
            title: "Marketing Tools Subscriptions",
            logo: "",
            pathName: "marketingtoolsubscription",
            navigate: false,
            disabled: false,
            child: [
              {
                title: "Tools subscription",
                logo: "",
                pathName: "totalsubscriptions",
                navigate: true,
                disabled: false,
                child: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Media",
    logo: "",
    pathName: "media",
    navigate: true,
    disabled: false,
    child: [],
  },
  {
    title: "Notifications",
    logo: "",
    pathName: "notifications",
    navigate: true,
    disabled: false,
    child: [],
  },
  {
    title: "Articles & Press Release",
    logo: "",
    pathName: "articles&pressrelease",
    navigate: false,
    disabled: false,
    child: [
      {
        title: "Admin Articles",
        logo: "",
        pathName: "adminarticles",
        navigate: true,
        disabled: false,
        child: [],
      },
      {
        title: "Press Release",
        logo: "",
        pathName: "pressrelease",
        navigate: true,
        disabled: false,
        child: [],
      },
    ],
  },
  {
    title: "Help & Support",
    logo: "",
    pathName: "help&support",
    navigate: false,
    disabled: false,
    child: [
      {
        title: "Dashboard",
        logo: "",
        pathName: "dashboard",
        navigate: true,
        disabled: false,
        child: [],
      },
      {
        title: "Supplier Support ",
        logo: "",
        pathName: "suppliersupport",
        navigate: true,
        disabled: false,
        child: [],
      },
      {
        title: "Customer Support",
        logo: "",
        pathName: "customersupport",
        navigate: false,
        disabled: false,
        child: [
          {
            title: "Admin Tickets",
            logo: "",
            pathName: "adminticket",
            navigate: true,
            disabled: false,
            child: [],
          },
          {
            title: "Supplier Store Tickets",
            logo: "",
            pathName: "supplierstoreticket",
            navigate: true,
            disabled: false,
            child: [],
          },
        ],
      },
      {
        title: "Reseller Support",
        logo: "",
        pathName: "resellersupport",
        navigate: true,
        disabled: false,
        child: [],
      },
    ],
  },
  {
    title: "Reviews",
    logo: "",
    pathName: "reviews",
    navigate: true,
    disabled: false,
    child: [],
  },
  {
    title: "Chats",
    logo: "",
    pathName: "chats",
    navigate: true,
    disabled: false,
    child: [],
  },
  {
    title: "Log Activity",
    logo: "",
    pathName: "logactivity",
    navigate: true,
    disabled: false,
    child: [],
  },
];

export default adminNav;
