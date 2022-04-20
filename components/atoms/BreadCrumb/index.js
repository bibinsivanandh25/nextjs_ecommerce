import { Grid } from "@mui/material";
import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import Link from "next/link";
import { useRouter } from "next/router";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const BreadCrumb = () => {
  const paths = [
    {
      title: "Accept & Confirm Address (00)",
      id: "acceptandconfirmaddress",
    },
    {
      title: "Generate Invoice & Manifest (00)",
      id: "ordersdata",
    },
    {
      title: "Upload Manifest (00)",
      id: "manifestupload",
    },
    {
      title: "Manifested Orders (00)",
      id: "manifestedorders",
    },
    {
      title: "Shipped Orders (00)",
      id: "shippedorders",
    },
    {
      title: "Delivered Orders (00)",
      id: "deliveredorders",
    },
    {
      title: "Cancelled Orders (00)",
      id: "cancelledorders",
    },
    {
      title: "Returned Orders (00)",
      id: "returnedorders",
    },
    {
      title: "My Products (Update Inventory)",
      id: "myproduct",
    },
    {
      title: "Add New Products",
      id: "newproducts",
    },
    {
      title: "Excel Upload (New Products Upload)",
      id: "excel_upload",
    },
    {
      title: "Add Inventory (Excel)",
      id: "add_Inventory",
    },
    {
      title: "MrMrsCart Product",
      id: "MrMrsCartProduct",
    },
    {
      title: "Payment Reports",
      id: "payment-report",
    },
    {
      title: "Order Report",
      id: "order-report",
    },
    {
      title: "Order Tax Invoice Report",
      id: "order-tex-invoice-report",
    },
    {
      title: "Credit Notes",
      id: "credit-notes",
    },
    {
      title: "Commission Invoices",
      id: "commission-invoices",
    },
    {
      title: "TCS/Sales Report",
      id: "sales-report",
    },
    {
      id: "dashboard",
      title: "Dashboard",
    },
    {
      id: "myorders",
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
    {
      title: "New Orders To Process (0)",
      id: "neworders",
    },
    {
      title: "Order History (0)",
      id: "orderhistory",
    },
  ];
  const route = useRouter();
  let completePath = "/";
  const path =
    route.pathname.substring(1) === ""
      ? []
      : route.pathname.substring(1).split("/");
  return (
    <Grid container item xs={12}>
      <div className="d-flex align-items-center">
        <Link href={"/"}>
          <HomeIcon className="text-secondary mx-2" />
        </Link>
        {path.map((item, index) => {
          completePath =
            completePath === "/"
              ? `${completePath}${item}`
              : `${completePath}/${item}`;
          return (
            <React.Fragment key={index}>
              <span>
                <ArrowForwardIosIcon className="fs-12 mx-2" />
              </span>
              <Link href={`${completePath}`} className="">
                <span
                  className={`${
                    path.length === index + 1 ? "color-orange" : ""
                  } fs-14 mx-2`}
                >
                  {paths.find((i) => i.id === item)?.title}
                </span>
              </Link>
            </React.Fragment>
          );
        })}
      </div>
    </Grid>
  );
};
export default BreadCrumb;
