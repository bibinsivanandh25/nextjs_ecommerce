import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import { MenuItem, MenuList } from "@mui/material";

const drawerWidth = 240;

const ordersList = {
  title: "My Order",
  logo: "fas fa-shopping-cart",
  dropdownlist: [
    {
      title: "New Orders To Process (0)",
      subList: [
        {
          subtitle: "Accept & Confirm Address (00)",
          path_name: "acceptAndConfirmAddress",
        },
        {
          subtitle: "Generate Invoice & Manifest (00)",
          path_name: "ordersData",
        },
        {
          subtitle: "Upload Manifest (00)",
          path_name: "manifestUpload",
        },
      ],
    },
    {
      title: "Orders History (0)",
      subList: [
        {
          subtitle: "Manifested Orders (00)",
          path_name: "manifestedOrders",
        },
        {
          subtitle: "Shipped Orders (00)",
          path_name: "shippedOrders",
        },
        {
          subtitle: "Delivered Orders (00)",
          path_name: "deliveredOrder",
        },
        {
          subtitle: "Cancelled Orders (00)",
          path_name: "cancelledOrder",
        },
        {
          subtitle: "Returned Orders (00)",
          path_name: "returnedOrders",
        },
      ],
    },
  ],
};

const productsList = {
  title: "My Product & Inventory",
  logo: "fas fa-cog",
  dropdownlist: [
    {
      subtitle: "My Products (Update Inventory)",
      path_name: "MyProduct",
    },
    {
      subtitle: "Add New Products",
      path_name: "newproducts",
    },
    {
      subtitle: "Excel Upload (New Products Upload)",
      path_name: "excel_upload",
    },
    {
      subtitle: "Add Inventory (Excel)",
      path_name: "add_Inventory",
    },
    {
      subtitle: "MrMrsCart Product",
      path_name: "MrMrsCartProduct",
    },
  ],
  path_name: "newproducts",
};

const reportsList = {
  title: "Report",
  logo: "fas fa-chart-bar",
  dropdownlist: [
    {
      subtitle: "Payment Reports",
      path_name: "payment-report",
    },
    {
      subtitle: "Order Report",
      path_name: "order-report",
    },
    {
      subtitle: "Order Tax Invoice Report",
      path_name: "order-tex-invoice-report",
    },
    {
      subtitle: "Credit Notes",
      path_name: "credit-notes",
    },
    {
      subtitle: "Commission Invoices",
      path_name: "commission-invoices",
    },
    {
      subtitle: "TCS/Sales Report",
      path_name: "sales-report",
    },
  ],
  path_name: "neworders",
};

const dashboardList = [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: <DashboardOutlinedIcon />,
  },
  {
    id: "orders",
    title: "My Orders",
  },
  {
    id: "collections",
    title: "My Collections",
  },
  {
    id: "products",
    title: "Products & Inventory",
  },
  {
    id: "earnings",
    title: "My Earnings",
  },
  {
    id: "adminproducts",
    title: "Admin Products",
  },
  {
    id: "coupns",
    title: "Coupons",
  },
  {
    id: "staff",
    title: "Staff",
  },
  {
    id: "delivery",
    title: "Delivery Management",
  },
  {
    id: "review",
    title: "Customer Review",
  },
  {
    id: "reports",
    title: "Reports",
  },
  {
    id: "help",
    title: "Help & Support",
  },
];

const earningsList = {
  dropdownlist: [
    {
      subtitle: "Summary",
      path_name: "summary",
    },
    {
      subtitle: "Withdraw Request",
      path_name: "withdraw",
    },
  ],
};

const submenuList = {
  orders: ordersList,
  products: productsList,
  reports: reportsList,
  earnings: earningsList,
};

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  padding: theme.spacing(0, 1),
  marginLeft: 5,
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function SupplierSidebar({ children }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState({ show: false, id: null });
  const [subMenuSelected, setSubMenuSelected] = React.useState("");

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={() => setOpen(!open)}
        edge="start"
        sx={
          {
            //   marginRight: 5,
          }
        }
      >
        <MenuIcon />
      </IconButton>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <MenuOpenIcon onClick={() => setOpen(!open)} color="inherit" />
        </DrawerHeader>
        <Divider />
        <List>
          {dashboardList.map((text) => (
            <>
              <ListItemButton
                key={text.id}
                sx={{
                  minHeight: 40,
                  justifyContent: open ? "initial" : "center",
                  px: 1.5,
                }}
                onClick={() =>
                  setSelected({ show: !selected.show, id: text.id })
                }
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {text.icon}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      variant="text"
                      fontWeight={700}
                      fontSize={14}
                      color={selected.id === text.id && "orange"}
                    >
                      {text.title}
                    </Typography>
                  }
                  disableTypography
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
              {selected.show &&
                selected.id === text.id &&
                submenuList[selected.id]?.dropdownlist?.map((item) => (
                  <MenuList
                    key={item.title || item.subtitle}
                    sx={{
                      minHeight: 40,
                      px: 2.5,
                      display: "block",
                    }}
                    onClick={() =>
                      setSelected({ show: selected.show, id: text.id })
                    }
                  >
                    <MenuItem
                      sx={{
                        opacity: open ? 1 : 0,
                        color: item?.subList?.length ? "orange" : "gray",
                        fontSize: item?.subList?.length ? 14 : 11,
                        fontWeight: item?.subList?.length ? 500 : 600,
                        ml: !item?.subList?.length && 2,
                      }}
                      key={item.title || item.subtitle}
                    >
                      {item?.subList && item?.subList?.length
                        ? `+ ${item.title}`
                        : item.subtitle}
                    </MenuItem>
                    {item?.subList?.map((o) => (
                      <MenuItem
                        sx={{
                          opacity: open ? 1 : 0,
                          color:
                            subMenuSelected === o.subtitle ? "black" : "gray",
                          fontSize: 11,
                          fontWeight: 600,
                          ml: 2,
                        }}
                        key={o.subtitle}
                        onClick={() => setSubMenuSelected(o.subtitle)}
                      >
                        {o.subtitle}
                      </MenuItem>
                    ))}
                  </MenuList>
                ))}
            </>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
}
