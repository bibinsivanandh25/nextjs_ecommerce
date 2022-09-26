const admincapabilities = [
  {
    capabilityName: "Dashboard",
    isEnable: true,
  },
  {
    capabilityName: "Products",
    isEnable: true,
    childCapabilityNameList: [
      {
        capabilityName: "Dashboard",
        isEnable: true,
      },
      {
        capabilityName: "Fixed Commission",
        isEnable: true,
      },
      {
        capabilityName: "Zero Commission",
        isEnable: true,
      },
      {
        capabilityName: "Products Categories",
        isEnable: true,
        childCapabilityNameList: [
          {
            capabilityName: "Categories",
            isEnable: true,
          },
          {
            capabilityName: "Sets",
            isEnable: true,
          },
          {
            capabilityName: "Sub-Categories",
            isEnable: true,
          },
          {
            capabilityName: "Variations",
            isEnable: true,
          },
          {
            capabilityName: "Variation Approval",
            isEnable: true,
          },
        ],
      },
    ],
  },
  {
    capabilityName: "Orders",
    isEnable: true,
    childCapabilityNameList: [
      {
        capabilityName: "Dashboard",
        isEnable: true,
      },
      {
        capabilityName: "Fixed Commission Products",
        isEnable: true,
      },
      {
        capabilityName: "Zero Commission Products",
        isEnable: true,
      },
      {
        capabilityName: "Orders Summary",
        isEnable: true,
      },
    ],
  },
  {
    capabilityName: "Delivery Management",
    isEnable: true,
    childCapabilityNameList: [
      {
        capabilityName: "Dashboard",
        isEnable: true,
      },
      {
        capabilityName: "Delivery Status",
        isEnable: true,
      },
      {
        capabilityName: "Servicable Pin Codes",
        isEnable: true,
      },
      {
        capabilityName: "Delivery Charge",
        isEnable: true,
      },
      {
        capabilityName: "Delivery Partner",
        isEnable: true,
      },
    ],
  },
  {
    capabilityName: "Customers",
    isEnable: true,
    childCapabilityNameList: [
      {
        capabilityName: "Dashboard",
        isEnable: true,
      },
      {
        capabilityName: "Active Customer",
        isEnable: true,
      },
      {
        capabilityName: "Disabled Customer",
        isEnable: true,
      },
      {
        capabilityName: "Customer Q&A",
        isEnable: true,
      },
    ],
  },
  {
    capabilityName: "Reseller",
    isEnable: true,
    childCapabilityNameList: [
      {
        capabilityName: "Dashboard",
        isEnable: true,
      },
      {
        capabilityName: "Active",
        isEnable: true,
      },
      {
        capabilityName: "Draft & Queries",
        isEnable: true,
      },
      {
        capabilityName: "Deactivated",
        isEnable: true,
      },
    ],
  },
  {
    capabilityName: "Supplier",
    isEnable: true,
    childCapabilityNameList: [
      {
        capabilityName: "Dashboard",
        isEnable: true,
      },
      {
        capabilityName: "Supplier Approval",
        isEnable: true,
      },
      {
        capabilityName: "Active",
        isEnable: true,
      },
      {
        capabilityName: "Rejected",
        isEnable: true,
      },
      {
        capabilityName: "Updated",
        isEnable: true,
      },
      {
        capabilityName: "Disabled",
        isEnable: true,
      },
      {
        capabilityName: "Queries",
        isEnable: true,
      },
    ],
  },
  {
    capabilityName: "Admin",
    isEnable: true,
    childCapabilityNameList: [
      {
        capabilityName: "Admin Configuration",
        isEnable: true,
        childCapabilityNameList: [
          {
            capabilityName: "Supplier Store Settings",
            isEnable: true,
          },
          {
            capabilityName: "Transactional, E-mail, SMS & Push Notification",
            isEnable: true,
          },
          {
            capabilityName: "Registration Configuration",
            isEnable: true,
          },
          {
            capabilityName: "Notifications Suggestions",
            isEnable: true,
          },
          {
            capabilityName: "Banners",
            isEnable: true,
          },
          {
            capabilityName: "Flags",
            isEnable: true,
          },
          {
            capabilityName: "Tags",
            isEnable: true,
          },
        ],
      },
      {
        capabilityName: "Admin Staff",
        isEnable: true,
        childCapabilityNameList: [
          {
            capabilityName: "Manager",
            isEnable: true,
          },
          {
            capabilityName: "User",
            isEnable: true,
          },
          {
            capabilityName: "Groups",
            isEnable: true,
          },
        ],
      },
    ],
  },
  {
    capabilityName: "Admin Store",
    isEnable: true,
    childCapabilityNameList: [
      {
        capabilityName: "No Commission Store",
        isEnable: true,
      },
      {
        capabilityName: "Commissioned Store",
        isEnable: true,
      },
    ],
  },
  {
    capabilityName: "Marketing Tools",
    isEnable: true,
    childCapabilityNameList: [
      {
        capabilityName: "Set Tool Pricing",
        isEnable: true,
      },
      {
        capabilityName: "Subscriptions",
        isEnable: true,
        childCapabilityNameList: [
          {
            capabilityName: "Discount Subscriptions",
            isEnable: true,
          },
          {
            capabilityName: "Todays Deal Subscriptions",
            isEnable: true,
          },
          {
            capabilityName: "Spin Wheel Subscriptions",
            isEnable: true,
          },
          {
            capabilityName: "Scratch Card Subscriptions",
            isEnable: true,
          },
          {
            capabilityName: "Quiz Subscriptions",
            isEnable: true,
          },
          {
            capabilityName: "Price Targeted Subscriptions",
            isEnable: true,
          },
          {
            capabilityName: "Notifications",
            isEnable: true,
          },
          {
            capabilityName: "Flags",
            isEnable: true,
          },
        ],
      },
      {
        capabilityName: "Approvals",
        isEnable: true,
        childCapabilityNameList: [
          {
            capabilityName: "Discount",
            isEnable: true,
          },
          {
            capabilityName: "Todays Deal",
            isEnable: true,
          },
          {
            capabilityName: "Spin Wheel",
            isEnable: true,
          },
          {
            capabilityName: "Scratch Card",
            isEnable: true,
          },
          {
            capabilityName: "Quiz",
            isEnable: true,
          },
          {
            capabilityName: "Price Targeted",
            isEnable: true,
          },
        ],
      },
    ],
  },
  {
    capabilityName: "Payments & Subscription",
    isEnable: true,
    childCapabilityNameList: [
      {
        capabilityName: "Dashboard",
        isEnable: true,
      },
      {
        capabilityName: "Order's Payment History",
        isEnable: true,
        childCapabilityNameList: [
          {
            capabilityName: "Supplier",
            isEnable: true,
            childCapabilityNameList: [
              {
                capabilityName: "Supplier Payment",
                isEnable: true,
              },
              {
                capabilityName: "Penalty Charges",
                isEnable: true,
              },
            ],
          },
          {
            capabilityName: "Reseller",
            isEnable: true,
            childCapabilityNameList: [
              {
                capabilityName: "Reseller Payment",
                isEnable: true,
              },
              {
                capabilityName: "Reseller Subscriptions",
                isEnable: true,
              },
            ],
          },
          {
            capabilityName: "Customer",
            isEnable: true,
            childCapabilityNameList: [
              {
                capabilityName: "Customer Payment",
                isEnable: true,
              },
              {
                capabilityName: "Refund History",
                isEnable: true,
              },
            ],
          },
          {
            capabilityName: "Logistics",
            isEnable: true,
          },
          {
            capabilityName: "COD order payments-logistics",
            isEnable: true,
          },
        ],
      },
      {
        capabilityName: "Payments",
        isEnable: true,
        childCapabilityNameList: [
          {
            capabilityName: "Initiate Payment",
            isEnable: true,
          },
          {
            capabilityName: "Multestore Payment History",
            isEnable: true,
            childCapabilityNameList: [
              {
                capabilityName: "Transaction Summary Outward",
                isEnable: true,
              },
              {
                capabilityName: "Transaction Summary Inward",
                isEnable: true,
              },
            ],
          },
          {
            capabilityName: "Marketing Tools Subscriptions(Payment Histroy)",
            isEnable: true,
            childCapabilityNameList: [
              {
                capabilityName: "Tools subscription",
                isEnable: true,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    capabilityName: "Media",
    isEnable: true,
  },
  {
    capabilityName: "Notifications",
    isEnable: true,
  },
  {
    capabilityName: "Articles & Press Release",
    isEnable: true,
    childCapabilityNameList: [
      {
        capabilityName: "Admin Articles",
        isEnable: true,
      },
      {
        capabilityName: "Press Release",
        isEnable: true,
      },
    ],
  },
  {
    capabilityName: "Help & Support",
    isEnable: true,
    childCapabilityNameList: [
      {
        capabilityName: "Dashboard",
        isEnable: true,
      },
      {
        capabilityName: "Supplier Support",
        isEnable: true,
      },
      {
        capabilityName: "Customer Support",
        isEnable: true,
        childCapabilityNameList: [
          {
            capabilityName: "Admin Tickets",
            isEnable: true,
          },
          {
            capabilityName: "Supplier Store Tickets",
            isEnable: true,
          },
        ],
      },
      {
        capabilityName: "Reseller Support",
        isEnable: true,
      },
    ],
  },
  {
    capabilityName: "Reviews",
    isEnable: true,
  },
  {
    capabilityName: "Chats",
    isEnable: true,
  },
  {
    capabilityName: "Log Activity",
    isEnable: true,
  },
];
export default admincapabilities;
