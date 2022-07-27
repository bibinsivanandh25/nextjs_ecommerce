import { Box, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import NavTabComponent from "components/molecule/NavTabComponent";
import { LineChart } from "@/atoms/Linechart/Linechart";
import { Doughnutchart } from "@/atoms/Doughnut/Doughnut";

const activeSupplierdata = {
  supplierId: "--",
  email: "balu12623@gmail.com",
  mobileno: "987654432",
  nextpayment: "200000 /-, 06 Jun 2022",
  registerDate: "--",
  adminapproval: "12",
  firstname: "balu",
  lastName: "Murugesan",
  address: "",
  staffdetails: "",
  polices: "",
  days: "12",
  categories: "--",
  orderhistory: "",
  businessname: "xyz",
  totalOrders: "2142",
  lastpayment: "200000 /-, 06 May 2022",
  penality: "656",
  website: "http://",
  totalgrosssale: "123",
  count: "1234",
  mrmrscommision: "12,65,546",
  paymentHistory: "",
  reactivateDate: "--",
};
const firstNavTab = [
  {
    id: 1,
    title: "Successfull",
  },
  {
    id: 2,
    title: "Un-Successfull",
  },
  {
    id: 3,
    title: "Returned",
  },
];
const secondNavTab = [
  {
    id: 1,
    title: "Total gross sales",
  },
  {
    id: 2,
    title: "Total net profit after deduction",
  },
];
const thirdNavTab = [
  {
    id: 1,
    title: "Total panalties paid",
  },
  {
    id: 2,
    title: "panalties Pending to paid",
  },
];
const lineChartData = [20000, 3000, 1000, 40000, 10000, 400, 2000];
const LineChartLable = [
  "Monday",
  "Tuseday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const doughnutLables = ["Total panalties paid", "panalties Pending to paid"];
const doughnutData = ["234", "356"];

const ViewModal = ({ setViewModaOpen = () => {} }) => {
  return (
    <Box className="p-2">
      <Box onClick={() => setViewModaOpen(false)} className="d-flex ">
        <Typography className="h-5 d-flex align-items-center cursor-pointer me-3">
          <ArrowBackIosIcon className="fs-14" />
          Back
        </Typography>
        <Typography className="h-4 color-orange fw-bold">
          View Active Suppliers
        </Typography>
      </Box>
      <Box className="border-top mt-2 pt-2">
        <Grid container spacing={3}>
          <Grid item lg={3} md={4} sm={12}>
            <Grid container>
              <Grid item xs={6} display="flex" justifyContent="end">
                <Typography className=" text-end h-5">Supplier ID</Typography>
              </Grid>
              <Grid item xs={1} display="flex" justifyContent="center">
                :
              </Grid>
              <Grid item xs={5} display="flex">
                <Typography className="text-break fw-bold h-5">
                  {activeSupplierdata.supplierId}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={3} md={4} sm={12}>
            <Grid container>
              <Grid item xs={6} display="flex" justifyContent="end">
                <Typography className=" text-end h-5">Email</Typography>
              </Grid>
              <Grid item xs={1} display="flex" justifyContent="center">
                :
              </Grid>
              <Grid item xs={5} display="flex">
                <Typography className="text-break fw-bold h-5">
                  {activeSupplierdata.email}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={3} md={4} sm={12}>
            <Grid container>
              <Grid item xs={6} display="flex" justifyContent="end">
                <Typography className=" text-end h-5">Mobile no</Typography>
              </Grid>
              <Grid item xs={1} display="flex" justifyContent="center">
                :
              </Grid>
              <Grid item xs={5} display="flex">
                <Typography className="text-break fw-bold h-5">
                  {activeSupplierdata.mobileno}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={3} md={4} sm={12}>
            <Grid container>
              <Grid item xs={6} display="flex" justifyContent="end">
                <Typography className=" text-end h-5">
                  Next Payment release
                </Typography>
              </Grid>
              <Grid item xs={1} display="flex" justifyContent="center">
                :
              </Grid>
              <Grid item xs={5} display="flex">
                <Typography className="text-break fw-bold h-5">
                  {activeSupplierdata.nextpayment}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={3} md={4} sm={12}>
            <Grid container>
              <Grid item xs={6} display="flex" justifyContent="end">
                <Typography className=" text-end h-5">
                  Supplier Register date & time
                </Typography>
              </Grid>
              <Grid item xs={1} display="flex" justifyContent="center">
                :
              </Grid>
              <Grid item xs={5} display="flex">
                <Typography className="text-break fw-bold h-5">
                  {activeSupplierdata.registerDate}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={3} md={4} sm={12}>
            <Grid container>
              <Grid item xs={6} display="flex" justifyContent="end">
                <Typography className=" text-end h-5">
                  Admin approval date & time
                </Typography>
              </Grid>
              <Grid item xs={1} display="flex" justifyContent="center">
                :
              </Grid>
              <Grid item xs={5} display="flex">
                <Typography className="text-break fw-bold h-5">
                  {activeSupplierdata.adminapproval}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={3} md={4} sm={12}>
            <Grid container>
              <Grid item xs={6} display="flex" justifyContent="end">
                <Typography className=" text-end h-5">
                  Supplier first Name
                </Typography>
              </Grid>
              <Grid item xs={1} display="flex" justifyContent="center">
                :
              </Grid>
              <Grid item xs={5} display="flex">
                <Typography className="text-break fw-bold h-5">
                  {activeSupplierdata.firstname}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={3} md={4} sm={12}>
            <Grid container>
              <Grid item xs={6} display="flex" justifyContent="end">
                <Typography className=" text-end h-5">
                  Supplier last Name
                </Typography>
              </Grid>
              <Grid item xs={1} display="flex" justifyContent="center">
                :
              </Grid>
              <Grid item xs={5} display="flex">
                <Typography className="text-break fw-bold h-5">
                  {activeSupplierdata.lastName}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={3} md={4} sm={12}>
            <Grid container>
              <Grid item xs={6} display="flex" justifyContent="end">
                <Typography className=" text-end h-5">Address</Typography>
              </Grid>
              <Grid item xs={1} display="flex" justifyContent="center">
                :
              </Grid>
              <Grid item xs={5} display="flex">
                <Typography
                  className={`text-break fw-bold h-5 ${
                    activeSupplierdata.address == "" &&
                    `color-light-blue text-decoration-underline cursor-pointer`
                  }`}
                >
                  {activeSupplierdata.address
                    ? activeSupplierdata.address
                    : "Click here"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={3} md={4} sm={12}>
            <Grid container>
              <Grid item xs={6} display="flex" justifyContent="end">
                <Typography className=" text-end h-5">Staff details</Typography>
              </Grid>
              <Grid item xs={1} display="flex" justifyContent="center">
                :
              </Grid>
              <Grid item xs={5} display="flex">
                <Typography
                  className={`text-break fw-bold h-5 ${
                    activeSupplierdata.staffdetails == "" &&
                    `color-light-blue text-decoration-underline cursor-pointer`
                  }`}
                >
                  {activeSupplierdata.staffdetails
                    ? activeSupplierdata.staffdetails
                    : "Click here"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={3} md={4} sm={12}>
            <Grid container>
              <Grid item xs={6} display="flex" justifyContent="end">
                <Typography className=" text-end h-5">
                  Product polices
                </Typography>
              </Grid>
              <Grid item xs={1} display="flex" justifyContent="center">
                :
              </Grid>
              <Grid item xs={5} display="flex">
                <Typography
                  className={`text-break fw-bold h-5 ${
                    activeSupplierdata.polices == "" &&
                    `color-light-blue text-decoration-underline cursor-pointer`
                  }`}
                >
                  {activeSupplierdata.polices
                    ? activeSupplierdata.polices
                    : "Click here"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={3} md={4} sm={12}>
            <Grid container>
              <Grid item xs={6} display="flex" justifyContent="end">
                <Typography className=" text-end h-5">
                  Business Processing days
                </Typography>
              </Grid>
              <Grid item xs={1} display="flex" justifyContent="center">
                :
              </Grid>
              <Grid item xs={5} display="flex">
                <Typography className="text-break fw-bold h-5">
                  {activeSupplierdata.days}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={3} md={4} sm={12}>
            <Grid container>
              <Grid item xs={6} display="flex" justifyContent="end">
                <Typography className=" text-end h-5">Categories</Typography>
              </Grid>
              <Grid item xs={1} display="flex" justifyContent="center">
                :
              </Grid>
              <Grid item xs={5} display="flex">
                <Typography className="text-break fw-bold h-5">
                  {activeSupplierdata.categories}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={3} md={4} sm={12}>
            <Grid container>
              <Grid item xs={6} display="flex" justifyContent="end">
                <Typography className=" text-end h-5">Order History</Typography>
              </Grid>
              <Grid item xs={1} display="flex" justifyContent="center">
                :
              </Grid>
              <Grid item xs={5} display="flex">
                <Typography
                  className={`text-break fw-bold h-5 ${
                    activeSupplierdata.orderhistory == "" &&
                    `color-light-blue text-decoration-underline cursor-pointer`
                  }`}
                >
                  {activeSupplierdata.orderhistory
                    ? activeSupplierdata.orderhistory
                    : "Click here"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={3} md={4} sm={12}>
            <Grid container>
              <Grid item xs={6} display="flex" justifyContent="end">
                <Typography className=" text-end h-5">Business Name</Typography>
              </Grid>
              <Grid item xs={1} display="flex" justifyContent="center">
                :
              </Grid>
              <Grid item xs={5} display="flex">
                <Typography className="text-break fw-bold h-5">
                  {activeSupplierdata.businessname}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={3} md={4} sm={12}>
            <Grid container>
              <Grid item xs={6} display="flex" justifyContent="end">
                <Typography className=" text-end h-5">Total Orders</Typography>
              </Grid>
              <Grid item xs={1} display="flex" justifyContent="center">
                :
              </Grid>
              <Grid item xs={5} display="flex">
                <Typography className="text-break fw-bold h-5 color-light-blue text-decoration-underline cursor-pointer">
                  {activeSupplierdata.totalOrders}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={3} md={4} sm={12}>
            <Grid container>
              <Grid item xs={6} display="flex" justifyContent="end">
                <Typography className=" text-end h-5">
                  Last Payment settled
                </Typography>
              </Grid>
              <Grid item xs={1} display="flex" justifyContent="center">
                :
              </Grid>
              <Grid item xs={5} display="flex">
                <Typography className="text-break fw-bold h-5">
                  {activeSupplierdata.lastpayment}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={3} md={4} sm={12}>
            <Grid container>
              <Grid item xs={6} display="flex" justifyContent="end">
                <Typography className=" text-end h-5">
                  Penality Pending
                </Typography>
              </Grid>
              <Grid item xs={1} display="flex" justifyContent="center">
                :
              </Grid>
              <Grid item xs={5} display="flex">
                <Typography className="text-break fw-bold h-5 color-light-blue text-decoration-underline cursor-pointer">
                  {activeSupplierdata.penality}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={3} md={4} sm={12}>
            <Grid container>
              <Grid item xs={6} display="flex" justifyContent="end">
                <Typography className=" text-end h-5">Website</Typography>
              </Grid>
              <Grid item xs={1} display="flex" justifyContent="center">
                :
              </Grid>
              <Grid item xs={5} display="flex">
                <Typography className="text-break fw-bold h-5 color-light-blue text-decoration-underline cursor-pointer">
                  {activeSupplierdata.website}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={3} md={4} sm={12}>
            <Grid container>
              <Grid item xs={6} display="flex" justifyContent="end">
                <Typography className=" text-end h-5">
                  Total gross sales
                </Typography>
              </Grid>
              <Grid item xs={1} display="flex" justifyContent="center">
                :
              </Grid>
              <Grid item xs={5} display="flex">
                <Typography className="text-break fw-bold h-5 color-light-blue text-decoration-underline cursor-pointer">
                  {activeSupplierdata.totalgrosssale}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={3} md={4} sm={12}>
            <Grid container>
              <Grid item xs={6} display="flex" justifyContent="end">
                <Typography className=" text-end h-5">Product count</Typography>
              </Grid>
              <Grid item xs={1} display="flex" justifyContent="center">
                :
              </Grid>
              <Grid item xs={5} display="flex">
                <Typography className="text-break fw-bold h-5 color-light-blue text-decoration-underline cursor-pointer">
                  {activeSupplierdata.count}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={3} md={4} sm={12}>
            <Grid container>
              <Grid item xs={6} display="flex" justifyContent="end">
                <Typography className=" text-end h-5">
                  mrmrs cart Commission
                </Typography>
              </Grid>
              <Grid item xs={1} display="flex" justifyContent="center">
                :
              </Grid>
              <Grid item xs={5} display="flex">
                <Typography className="text-break fw-bold h-5">
                  {activeSupplierdata.mrmrscommision}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={3} md={4} sm={12}>
            <Grid container>
              <Grid item xs={6} display="flex" justifyContent="end">
                <Typography className=" text-end h-5">
                  Payment history
                </Typography>
              </Grid>
              <Grid item xs={1} display="flex" justifyContent="center">
                :
              </Grid>
              <Grid item xs={5} display="flex">
                <Typography
                  className={`text-break fw-bold h-5 ${
                    activeSupplierdata.paymentHistory == "" &&
                    `color-light-blue text-decoration-underline cursor-pointer`
                  }`}
                >
                  {activeSupplierdata.paymentHistory
                    ? activeSupplierdata.paymentHistory
                    : "Click here"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={3} md={4} sm={12}>
            <Grid container>
              <Grid item xs={6} display="flex" justifyContent="end">
                <Typography className=" text-end h-5">
                  Reactivated date & time
                </Typography>
              </Grid>
              <Grid item xs={1} display="flex" justifyContent="center">
                :
              </Grid>
              <Grid item xs={5} display="flex">
                <Typography className="text-break fw-bold h-5">
                  {activeSupplierdata.reactivateDate}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Box className="mt-4">
        <Box className="px-3">
          <NavTabComponent listData={firstNavTab} />
        </Box>
        <Paper className="mt-3 p-3" elevation={3}>
          <LineChart
            labels={LineChartLable}
            data={lineChartData}
            showYAxis={false}
            lineColor="#007fff"
          />
        </Paper>
      </Box>{" "}
      <Box className="mt-4">
        <Box className="px-3">
          <NavTabComponent listData={secondNavTab} onTabCilck={() => {}} />
        </Box>
        <Paper className="mt-3 p-3" elevation={3}>
          <LineChart
            labels={LineChartLable}
            data={lineChartData}
            showYAxis={false}
            lineColor="#007fff"
          />
        </Paper>
      </Box>
      <Box className="mt-4">
        <Box className="px-3">
          <NavTabComponent listData={thirdNavTab} />
        </Box>
        <Grid container xs={12} className="mt-3">
          <Grid item lg={6} md={6} sm={12}>
            <Paper elevation={3} className="p-3 ">
              <Doughnutchart
                className="mnh-300"
                cutout="110"
                labels={doughnutLables}
                data={doughnutData}
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ViewModal;
