import * as React from "react";
import { useRouter } from "next/router";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { MenuItem, MenuList } from "@mui/material";
import Link from "next/link";

const drawerWidth = 240;

const moduleType = "supplier";

const ordersList = {
  title: "My Order",
  logo: "fas fa-shopping-cart",
  path_name: "myorders",
  dropdownlist: [
    {
      title: "New Orders To Process (0)",
      path_name: "neworder",
      subList: [
        {
          subtitle: "Accept & Confirm Address (00)",
          path_name: "acceptandconfirmaddress",
        },
        {
          subtitle: "Generate Invoice & Manifest (00)",
          path_name: "generateinvoiceandmanifest",
        },
        {
          subtitle: "Upload Manifest (00)",
          path_name: "uploadmanifest",
        },
      ],
    },
    {
      title: "Order History (0)",
      path_name: "orderhistory",
      subList: [
        {
          subtitle: "Manifested Orders (00)",
          path_name: "manifestedorders",
        },
        {
          subtitle: "Shipped Orders (00)",
          path_name: "shippedorders",
        },
        {
          subtitle: "Delivered Orders (00)",
          path_name: "deliveredorders",
        },
        {
          subtitle: "Cancelled Orders (00)",
          path_name: "cancelledorders",
        },
        {
          subtitle: "Returned Orders (00)",
          path_name: "returnedorders",
        },
      ],
    },
  ],
};

const productsList = {
  title: "My Product & Inventory",
  logo: "fas fa-cog",
  path_name: "products&inventory",
  dropdownlist: [
    {
      subtitle: "My Products (Update Inventory)",
      path_name: "myproducts",
    },
    {
      subtitle: "Add New Products",
      path_name: "newproducts",
    },
    {
      subtitle: "New Product Upload (Excel)",
      path_name: "newproductupload",
    },
    {
      subtitle: "Add Inventory (Excel)",
      path_name: "addinventory",
    },
    {
      subtitle: "MrMrsCart Product",
      path_name: "mrmrscartproduct",
    },
  ],
};

const reportsList = {
  title: "Report",
  logo: "fas fa-chart-bar",
  path_name: "reports",
  dropdownlist: [
    {
      subtitle: "Payment Reports",
      path_name: "paymentreport",
    },
    {
      subtitle: "Order Report",
      path_name: "orderreport",
    },
    {
      subtitle: "TCS/Sales Report",
      path_name: "salesreport",
    },
  ],
};

const dashboardList = [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: <DashboardOutlinedIcon />,
    selectedIcon: <DashboardIcon style={{ color: "#e56700" }} />,
    navigate: false,
  },
  {
    id: "orders",
    title: "My Orders",
    navigate: false,
  },
  {
    id: "mycollections",
    title: "My Collections",
    navigate: true,
  },
  {
    id: "products&inventory",
    title: "Products & Inventory",
    navigate: false,
  },
  {
    id: "earnings",
    title: "My Earnings",
    navigate: false,
  },
  {
    id: "adminproducts",
    title: "Admin Products",
    navigate: false,
  },
  {
    id: "coupons",
    title: "Coupons",
    navigate: true,
  },
  {
    id: "staff",
    title: "Staff",
    navigate: true,
  },
  {
    id: "delivery",
    title: "Delivery Management",
    navigate: false,
  },
  {
    id: "customerreview",
    title: "Customer Review",
    navigate: true,
  },
  {
    id: "reports",
    title: "Reports",
    navigate: false,
  },
  {
    id: "helpandsupport",
    title: "Help & Support",
    navigate: true,
  },
];

const earningsList = {
  path_name: "earnings",
  dropdownlist: [
    {
      subtitle: "Summary",
      path_name: "summary",
    },
  ],
};

const submenuList = {
  orders: ordersList,
  "products&inventory": productsList,
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
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const [selected, setSelected] = React.useState({ show: false, id: null });
  const [subMenuSelected, setSubMenuSelected] = React.useState("");

  const getSubmenuStyles = (o) => {
    return {
      opacity: open ? 1 : 0,
      color: subMenuSelected === o.subtitle ? "black" : "gray",
      fontSize: 11,
      fontWeight: 600,
      ml: 2,
    };
  };

  const getMenuStyles = (item) => {
    return {
      opacity: open ? 1 : 0,
      color: item?.subList?.length
        ? "#e56700"
        : subMenuSelected === item.subtitle
        ? "black"
        : "gray",
      fontSize: item?.subList?.length ? 14 : 11,
      fontWeight: item?.subList?.length ? 500 : 600,
      ml: !item?.subList?.length && 2,
    };
  };

  return (
    <Box
      sx={{ display: "flex", position: "absolute", top: "58px", width: "100%" }}
    >
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <MenuOpenIcon
            onClick={() => setOpen(!open)}
            className="text-secondary"
          />
        </DrawerHeader>
        <List sx={{ height: "80vh", overflowY: "auto", py: 0 }}>
          {dashboardList.map((text, index) => (
            <React.Fragment key={index}>
              <ListItemButton
                key={text.id}
                sx={{
                  minHeight: 20,
                  justifyContent: open ? "initial" : "center",
                  px: 1.5,
                  py: 0.5,
                }}
                onClick={() => {
                  setSelected({
                    show: text.id === selected.id ? !selected.show : true,
                    id: text.id,
                  });
                  if (text.navigate) {
                    router.push(`/${moduleType}/${text.id}`);
                  }
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {selected.id === text.id ? text.selectedIcon : text.icon}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      variant="text"
                      fontWeight={700}
                      fontSize={14}
                      color={selected.id === text.id && "#e56700"}
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
                open &&
                submenuList[selected.id]?.dropdownlist?.map((item, index) => (
                  <MenuList
                    key={index}
                    sx={{
                      minHeight: 40,
                      px: 2.5,
                    }}
                    onClick={() =>
                      setSelected({ show: selected.show, id: text.id })
                    }
                  >
                    <Link
                      href={`/${moduleType}/${
                        submenuList[selected.id].path_name
                      }/${item.path_name}`}
                      key={item.path_name}
                    >
                      <MenuItem
                        sx={getMenuStyles(item)}
                        key={item.title || item.subtitle}
                        onClick={() => setSubMenuSelected(item.subtitle)}
                      >
                        {item?.subList && item?.subList?.length
                          ? `+ ${item.title}`
                          : item.subtitle}
                      </MenuItem>
                    </Link>
                    {item?.subList?.map((o) => (
                      <Link
                        href={`/${moduleType}/${
                          submenuList[selected.id].path_name
                        }/${item.path_name}/${o.path_name}`}
                        key={o.path_name}
                      >
                        <MenuItem
                          sx={getSubmenuStyles(o)}
                          key={o.subtitle}
                          onClick={() => setSubMenuSelected(o.subtitle)}
                        >
                          {o.subtitle}
                        </MenuItem>
                      </Link>
                    ))}
                  </MenuList>
                ))}
            </React.Fragment>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          px: 2,
          py: 1.5,
          mt: -0.5,
          backgroundColor: "#f7f7f7",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
