const admincapabilities = [
  {
    capabilityName: "Dashboard",
    isEnable: false,
  },
  {
    capabilityName: "Products",
    isEnable: false,
    childCapabilityNameList: [
      {
        capabilityName: "Dashboard",
        isEnable: false,
      },
      {
        capabilityName: "Fixed Commission",
        isEnable: false,
      },
      {
        capabilityName: "Zero Commission",
        isEnable: false,
      },
      {
        capabilityName: "Products Categories",
        isEnable: false,
        childCapabilityNameList: [
          {
            capabilityName: "Categories",
            isEnable: false,
          },
          {
            capabilityName: "Sets",
            isEnable: false,
          },
          {
            capabilityName: "Sub-Categories",
            isEnable: false,
          },
          {
            capabilityName: "Variations",
            isEnable: false,
          },
          {
            capabilityName: "Variation Approval",
            isEnable: false,
          },
        ],
      },
    ],
  },
  {
    capabilityName: "Orders",
    isEnable: false,
    childCapabilityNameList: [
      {
        capabilityName: "Dashboard",
        isEnable: false,
      },
      {
        capabilityName: "Fixed Commission Products",
        isEnable: false,
      },
      {
        capabilityName: "Zero Commission Products",
        isEnable: false,
      },
      {
        capabilityName: "Orders Summary",
        isEnable: false,
      },
    ],
  },
  {
    capabilityName: "Delivery Management",
    isEnable: false,
    childCapabilityNameList: [
      {
        capabilityName: "Dashboard",
        isEnable: false,
      },
      {
        capabilityName: "Delivery Status",
        isEnable: false,
      },
      {
        capabilityName: "Servicable Pin Codes",
        isEnable: false,
      },
      {
        capabilityName: "Delivery Charge",
        isEnable: false,
      },
      {
        capabilityName: "Delivery Partner",
        isEnable: false,
      },
    ],
  },
  {
    capabilityName: "Customers",
    isEnable: false,
    childCapabilityNameList: [
      {
        capabilityName: "Dashboard",
        isEnable: false,
      },
      {
        capabilityName: "Active Customer",
        isEnable: false,
      },
      {
        capabilityName: "Disabled Customer",
        isEnable: false,
      },
      {
        capabilityName: "Customer Q&A",
        isEnable: false,
      },
    ],
  },
  {
    capabilityName: "Reseller",
    isEnable: false,
    childCapabilityNameList: [
      {
        capabilityName: "Dashboard",
        isEnable: false,
      },
      {
        capabilityName: "Active",
        isEnable: false,
      },
      {
        capabilityName: "Draft & Queries",
        isEnable: false,
      },
      {
        capabilityName: "Deactivated",
        isEnable: false,
      },
    ],
  },
  {
    capabilityName: "Supplier",
    isEnable: false,
    childCapabilityNameList: [
      {
        capabilityName: "Dashboard",
        isEnable: false,
      },
      {
        capabilityName: "Supplier Approval",
        isEnable: false,
      },
      {
        capabilityName: "Active",
        isEnable: false,
      },
      {
        capabilityName: "Rejected",
        isEnable: false,
      },
      {
        capabilityName: "Updated",
        isEnable: false,
      },
      {
        capabilityName: "Disabled",
        isEnable: false,
      },
      {
        capabilityName: "Queries",
        isEnable: false,
      },
    ],
  },
  {
    capabilityName: "Admin",
    isEnable: false,
    childCapabilityNameList: [
      {
        capabilityName: "Admin Configuration",
        isEnable: false,
        childCapabilityNameList: [
          {
            capabilityName: "Supplier Store Settings",
            isEnable: false,
          },
          {
            capabilityName: "Transactional, E-mail, SMS & Push Notification",
            isEnable: false,
          },
          {
            capabilityName: "Registration Configuration",
            isEnable: false,
          },
          {
            capabilityName: "Notifications Suggestions",
            isEnable: false,
          },
          {
            capabilityName: "Banners",
            isEnable: false,
          },
          {
            capabilityName: "Flags",
            isEnable: false,
          },
          {
            capabilityName: "Tags",
            isEnable: false,
          },
        ],
      },
      {
        capabilityName: "Admin Staff",
        isEnable: false,
        childCapabilityNameList: [
          {
            capabilityName: "Manager",
            isEnable: false,
          },
          {
            capabilityName: "User",
            isEnable: false,
          },
          {
            capabilityName: "Groups",
            isEnable: false,
          },
        ],
      },
    ],
  },
  {
    capabilityName: "Admin Store",
    isEnable: false,
    childCapabilityNameList: [
      {
        capabilityName: "No Commission Store",
        isEnable: false,
      },
      {
        capabilityName: "Commissioned Store",
        isEnable: false,
      },
    ],
  },
  {
    capabilityName: "Marketing Tools",
    isEnable: false,
    childCapabilityNameList: [
      {
        capabilityName: "Set Tool Pricing",
        isEnable: false,
      },
      {
        capabilityName: "Subscriptions",
        isEnable: false,
        childCapabilityNameList: [
          {
            capabilityName: "Discount Subscriptions",
            isEnable: false,
          },
          {
            capabilityName: "Todays Deal Subscriptions",
            isEnable: false,
          },
          {
            capabilityName: "Spin Wheel Subscriptions",
            isEnable: false,
          },
          {
            capabilityName: "Scratch Card Subscriptions",
            isEnable: false,
          },
          {
            capabilityName: "Quiz Subscriptions",
            isEnable: false,
          },
          {
            capabilityName: "Price Targeted Subscriptions",
            isEnable: false,
          },
          {
            capabilityName: "Notifications",
            isEnable: false,
          },
          {
            capabilityName: "Flags",
            isEnable: false,
          },
        ],
      },
      {
        capabilityName: "Approvals",
        isEnable: false,
        childCapabilityNameList: [
          {
            capabilityName: "Discount",
            isEnable: false,
          },
          {
            capabilityName: "Todays Deal",
            isEnable: false,
          },
          {
            capabilityName: "Spin Wheel",
            isEnable: false,
          },
          {
            capabilityName: "Scratch Card",
            isEnable: false,
          },
          {
            capabilityName: "Quiz",
            isEnable: false,
          },
          {
            capabilityName: "Price Targeted",
            isEnable: false,
          },
        ],
      },
    ],
  },
  {
    capabilityName: "Payments & Subscription",
    isEnable: false,
    childCapabilityNameList: [
      {
        capabilityName: "Dashboard",
        isEnable: false,
      },
      {
        capabilityName: "Order's Payment History",
        isEnable: false,
        childCapabilityNameList: [
          {
            capabilityName: "Supplier",
            isEnable: false,
            childCapabilityNameList: [
              {
                capabilityName: "Supplier Payment",
                isEnable: false,
              },
              {
                capabilityName: "Penalty Charges",
                isEnable: false,
              },
            ],
          },
          {
            capabilityName: "Reseller",
            isEnable: false,
            childCapabilityNameList: [
              {
                capabilityName: "Reseller Payment",
                isEnable: false,
              },
              {
                capabilityName: "Reseller Subscriptions",
                isEnable: false,
              },
            ],
          },
          {
            capabilityName: "Customer",
            isEnable: false,
            childCapabilityNameList: [
              {
                capabilityName: "Customer Payment",
                isEnable: false,
              },
              {
                capabilityName: "Refund History",
                isEnable: false,
              },
            ],
          },
          {
            capabilityName: "Logistics",
            isEnable: false,
          },
          {
            capabilityName: "COD order payments-logistics",
            isEnable: false,
          },
        ],
      },
      {
        capabilityName: "Payments",
        isEnable: false,
        childCapabilityNameList: [
          {
            capabilityName: "Initiate Payment",
            isEnable: false,
          },
          {
            capabilityName: "Multestore Payment History",
            isEnable: false,
            childCapabilityNameList: [
              {
                capabilityName: "Transaction Summary Outward",
                isEnable: false,
              },
              {
                capabilityName: "Transaction Summary Inward",
                isEnable: false,
              },
            ],
          },
          {
            capabilityName: "Marketing Tools Subscriptions(Payment Histroy)",
            isEnable: false,
            childCapabilityNameList: [
              {
                capabilityName: "Tools subscription",
                isEnable: false,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    capabilityName: "Media",
    isEnable: false,
  },
  {
    capabilityName: "Notifications",
    isEnable: false,
  },
  {
    capabilityName: "Articles & Press Release",
    isEnable: false,
    childCapabilityNameList: [
      {
        capabilityName: "Admin Articles",
        isEnable: false,
      },
      {
        capabilityName: "Press Release",
        isEnable: false,
      },
    ],
  },
  {
    capabilityName: "Help & Support",
    isEnable: false,
    childCapabilityNameList: [
      {
        capabilityName: "Dashboard",
        isEnable: false,
      },
      {
        capabilityName: "Supplier Support",
        isEnable: false,
      },
      {
        capabilityName: "Customer Support",
        isEnable: false,
        childCapabilityNameList: [
          {
            capabilityName: "Admin Tickets",
            isEnable: false,
          },
          {
            capabilityName: "Supplier Store Tickets",
            isEnable: false,
          },
        ],
      },
      {
        capabilityName: "Reseller Support",
        isEnable: false,
      },
    ],
  },
  {
    capabilityName: "Reviews",
    isEnable: false,
  },
  {
    capabilityName: "Chats",
    isEnable: false,
  },
  {
    capabilityName: "Log Activity",
    isEnable: false,
  },
];
export default admincapabilities;
