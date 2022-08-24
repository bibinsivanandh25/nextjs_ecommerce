import NavTabComponent from "components/molecule/NavTabComponent";
import { useState } from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import Bargraph from "@/atoms/Bar/Bargraph";
import { PieChart } from "@/atoms/PieChart";
import TableComponent from "@/atoms/TableComponent";

const DashBoard = () => {
  const categoryColumns = [
    {
      id: "col1", //  id value in column should be presented in row as key
      label: "Sl. No",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col2",
      label: "Category",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col3",
      label: "Return Amount Value",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
  ];
  const categoryRows = [
    {
      id: "1",
      col1: "1",
      col2: "Leather Jacket",
      col3: "12,400",
    },
    {
      id: "2",
      col1: "2",
      col2: "Leather Jacket",
      col3: "12,400",
    },
    {
      id: "3",
      col1: "3",
      col2: "Leather Jacket",
      col3: "12,400",
    },
    {
      id: "4",
      col1: "4",
      col2: "Leather Jacket",
      col3: "12,400",
    },
    {
      id: "5",
      col1: "5",
      col2: "Leather Jacket",
      col3: "12,400",
    },
    {
      id: "6",
      col1: "6",
      col2: "Leather Jacket",
      col3: "12,400",
    },
    {
      id: "7",
      col1: "7",
      col2: "Leather Jacket",
      col3: "12,400",
    },
    {
      id: "8",
      col1: "8",
      col2: "Leather Jacket",
      col3: "12,400",
    },
    {
      id: "9",
      col1: "9",
      col2: "Leather Jacket",
      col3: "12,400",
    },
    {
      id: "10",
      col1: "10",
      col2: "Leather Jacket",
      col3: "12,400",
    },
  ];
  const supplierColumns = [
    {
      id: "col1", //  id value in column should be presented in row as key
      label: "Sl. No",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col2",
      label: "Category",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col3",
      label: "Return Amount Value",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col4",
      label: "Return Amount Value",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
  ];
  const supplierRows = [
    {
      id: "1",
      col1: "1",
      col2: "Leather Jacket",
      col3: "supplier Name",
      col4: "12,400",
    },
    {
      id: "2",
      col1: "2",
      col2: "Leather Jacket",
      col3: "supplier Name",
      col4: "12,400",
    },
    {
      id: "3",
      col1: "3",
      col2: "Leather Jacket",
      col3: "supplier Name",
      col4: "12,400",
    },
    {
      id: "4",
      col1: "4",
      col2: "Leather Jacket",
      col3: "supplier Name",
      col4: "12,400",
    },
    {
      id: "5",
      col1: "5",
      col2: "Leather Jacket",
      col3: "supplier Name",
      col4: "12,400",
    },
    {
      id: "6",
      col1: "6",
      col2: "Leather Jacket",
      col3: "supplier Name",
      col4: "12,400",
    },
    {
      id: "7",
      col1: "7",
      col2: "Leather Jacket",
      col3: "supplier Name",
      col4: "12,400",
    },
    {
      id: "8",
      col1: "8",
      col2: "Leather Jacket",
      col3: "supplier Name",
      col4: "12,400",
    },
    {
      id: "9",
      col1: "9",
      col2: "Leather Jacket",
      col3: "supplier Name",
      col4: "12,400",
    },
    {
      id: "10",
      col1: "10",
      col2: "Leather Jacket",
      col3: "supplier Name",
      col4: "12,400",
    },
  ];
  const CustomerColumns = [
    {
      id: "col1", //  id value in column should be presented in row as key
      label: "Sl. No",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col2",
      label: "Customer Name",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col3",
      label: "Reseller Name",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col4",
      label: "Return Amount Value",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
  ];
  const CustomerRows = [
    {
      id: "1",
      col1: "1",
      col2: "Customer Name",
      col3: "Reseller Name",
      col4: "12,400",
    },
    {
      id: "2",
      col1: "2",
      col2: "Customer Name",
      col3: "Reseller Name",
      col4: "12,400",
    },
    {
      id: "3",
      col1: "3",
      col2: "Customer Name",
      col3: "Reseller Name",
      col4: "12,400",
    },
    {
      id: "4",
      col1: "4",
      col2: "Customer Name",
      col3: "Reseller Name",
      col4: "12,400",
    },
    {
      id: "5",
      col1: "5",
      col2: "Customer Name",
      col3: "Reseller Name",
      col4: "12,400",
    },
    {
      id: "6",
      col1: "6",
      col2: "Customer Name",
      col3: "Reseller Name",
      col4: "12,400",
    },
    {
      id: "7",
      col1: "7",
      col2: "Customer Name",
      col3: "Reseller Name",
      col4: "12,400",
    },
    {
      id: "8",
      col1: "8",
      col2: "Customer Name",
      col3: "Reseller Name",
      col4: "12,400",
    },
    {
      id: "9",
      col1: "9",
      col2: "Customer Name",
      col3: "Reseller Name",
      col4: "12,400",
    },
    {
      id: "10",
      col1: "10",
      col2: "Customer Name",
      col3: "Reseller Name",
      col4: "12,400",
    },
  ];
  const ResellerColumns = [
    {
      id: "col1", //  id value in column should be presented in row as key
      label: "Sl. No",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col2",
      label: "Reseller",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col3",
      label: "Return Amount Value",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
  ];
  const ResellerRows = [
    {
      id: "1",
      col1: "1",
      col2: "Reseller Name",
      col3: "12,400",
    },
    {
      id: "2",
      col1: "2",
      col2: "Reseller Name",
      col3: "12,400",
    },
    {
      id: "3",
      col1: "3",
      col2: "Reseller Name",
      col3: "12,400",
    },
    {
      id: "4",
      col1: "4",
      col2: "Reseller Name",
      col3: "12,400",
    },
    {
      id: "5",
      col1: "5",
      col2: "Reseller Name",
      col3: "12,400",
    },
    {
      id: "6",
      col1: "6",
      col2: "Reseller Name",
      col3: "12,400",
    },
    {
      id: "7",
      col1: "7",
      col2: "Reseller Name",
      col3: "12,400",
    },
    {
      id: "8",
      col1: "8",
      col2: "Reseller Name",
      col3: "12,400",
    },
    {
      id: "9",
      col1: "9",
      col2: "Reseller Name",
      col3: "12,400",
    },
    {
      id: "10",
      col1: "10",
      col2: "Reseller Name",
      col3: "12,400",
    },
  ];
  const productInfo = [
    {
      title: "Fixed Margin Products",
      value: {
        TotalOrders: 254,
        ActualCost: 8544,
        FreedeliveryandReturn: 5555,
      },
    },
    {
      title: "Zero commission products",
      value: {
        TotalOrders: 254,
        ActualCost: 8544,
        FreedeliveryandReturn: 5555,
      },
    },
    {
      title: "Returned Orders",
      value: {
        TotalOrders: 254,
        ActualCost: 8544,
        FreedeliveryandReturn: 5555,
      },
    },
  ];
  // eslint-disable-next-line no-unused-vars
  const [navData, setNavData] = useState([
    { id: 1, title: "Today" },
    { id: 2, title: "Yesterday" },
    { id: 3, title: "Last 7 days" },
    { id: 4, title: "Last month" },
    { id: 5, title: "Last year" },
  ]);

  const getProductsInfo = () => {
    return productInfo.map((ele, ind) => {
      return (
        <div className={`px-3 ${ind % 2 === 0 ? "bg-light-gray" : ""}`}>
          <div className="mx-3 border-bottom border-dashed">
            <Typography className="h-4 color-orange fw-bold py-2">
              {ele.title}
            </Typography>
            <div className="d-flex justify-content-between">
              <div>
                <Typography className="text-secondary h-5">
                  Total Orders
                </Typography>
                <Typography className="fw-bold h-3 pb-1">
                  {ele.value.TotalOrders}
                </Typography>
              </div>
              <div>
                <Typography className="text-secondary h-5">
                  Actual Cost
                </Typography>
                <Typography className="fw-bold h-3 pb-1">
                  ₹ {ele.value.ActualCost}
                </Typography>
              </div>
              <div>
                <Typography className="text-secondary h-5">
                  Free Delivery & Return
                </Typography>
                <Typography className="fw-bold h-3 pb-1">
                  ₹ {ele.value.FreedeliveryandReturn}
                </Typography>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <Box className="">
      <Box className="my-2 p-1">
        <NavTabComponent
          listData={navData}
          getFromDate={(val) => console.log(val)}
        />
      </Box>
      <Grid container className="px-3" spacing={2}>
        <Grid item md={6} sm={12} className="">
          <Paper className="py-4 mnh-300">
            <Typography className="fw-bold ms-2">Total Orders : 690</Typography>
            <div className="">
              <PieChart
                data={[
                  {
                    label: "On Hold",
                    value: 200,
                    bgColor: "#5500d4",
                  },
                  {
                    label: "Payment Completed",
                    value: 249,
                    bgColor: "#00d455",
                  },
                  {
                    label: "Accepted",
                    value: 20,
                    bgColor: "#ffd42a",
                  },
                  {
                    label: "Delivered",
                    value: 200,
                    bgColor: "#0066ff",
                  },
                  {
                    label: "Return Requests",
                    value: 29,
                    bgColor: "#ff5599",
                  },
                ]}
              />
            </div>
          </Paper>
        </Grid>
        <Grid item md={6} sm={12}>
          <Paper className="mnh-300">{getProductsInfo()}</Paper>
        </Grid>
      </Grid>
      <Grid container className="px-3 my-2" spacing={2}>
        <Grid item md={6} sm={12}>
          <Paper>
            <div className="d-flex justify-content-between align-items-center bg-light-grey p-2">
              <Typography className="h-5 fw-bold">Total Orders: 690</Typography>
              <div className="h-5">
                <span className="color-blue">categories </span>
                <span>|</span>
                <span> subcategories</span>
              </div>
            </div>
            <div className="w-90p">
              <Bargraph
                barDirection="y"
                labels={[
                  "cloths",
                  "Gadgets",
                  " Accessories",
                  "Apparels",
                  "kitchen ware",
                  "stationary",
                  "laptops",
                ]}
                backgroundColor="#444b66"
                hoverBackgroundColor="#e56700"
                data={[20, 30, 40, 50, 60, 35, 60]}
                showGridY={false}
                showXaxisTicks={false}
              />
            </div>
          </Paper>
        </Grid>
        <Grid item md={6} sm={12}>
          <Paper>
            <div className="d-flex justify-content-between align-items-center bg-light-grey p-2">
              <Typography className="h-5 fw-bold">
                Returnable Products: 690
              </Typography>
              <div className="h-5">
                <span className="color-blue">categories </span>
                <span>|</span>
                <span> subcategories</span>
              </div>
            </div>
            <div className="w-90p">
              <Bargraph
                backgroundColor="#444b66"
                hoverBackgroundColor="#e56700"
                barDirection="y"
                labels={[
                  "cloths",
                  "Gadgets",
                  " Accessories",
                  "Apparels",
                  "kitchen ware",
                  "stationary",
                  "laptops",
                ]}
                data={[20, 30, 40, 50, 60, 35, 60]}
                showGridY={false}
                showXaxisTicks={false}
              />
            </div>
          </Paper>
        </Grid>
      </Grid>
      <Grid container className="px-3 my-2" spacing={2}>
        <Grid item md={6} sm={12}>
          <Paper>
            <div className="d-flex justify-content-between align-items-center bg-light-grey p-2">
              <Typography className="h-5 fw-bold">
                Total Order Returned: 690
              </Typography>
              <div className="h-5">
                <span className="color-blue">categories </span>
                <span>|</span>
                <span> subcategories</span>
              </div>
            </div>
            <div className="w-90p">
              <Bargraph
                barDirection="y"
                labels={[
                  "cloths",
                  "Gadgets",
                  " Accessories",
                  "Apparels",
                  "kitchen ware",
                  "stationary",
                  "laptops",
                ]}
                backgroundColor="#444b66"
                hoverBackgroundColor="#e56700"
                data={[20, 30, 40, 50, 60, 35, 60]}
                showGridY={false}
                showXaxisTicks={false}
              />
            </div>
          </Paper>
        </Grid>
        <Grid item md={6} sm={12}>
          <Paper>
            <div className=" bg-light-grey p-2">
              <Typography className="h-5 fw-bold">Total Orders: 690</Typography>
            </div>
            <div className="w-90p">
              <Bargraph
                backgroundColor="#444b66"
                hoverBackgroundColor="#e56700"
                barDirection="y"
                labels={[
                  "cloths",
                  "Gadgets",
                  " Accessories",
                  "Apparels",
                  "kitchen ware",
                  "stationary",
                  "laptops",
                ]}
                data={[20, 30, 40, 50, 60, 35, 60]}
                showGridY={false}
                showXaxisTicks={false}
              />
            </div>
          </Paper>
        </Grid>
      </Grid>
      <Grid container className="px-3 my-2" spacing={2}>
        <Grid item sm={12} md={6}>
          <Paper className="mnh-300">
            <Typography className="fw-bold h-5 pt-2 px-2">
              Categories with more Returns happening - Top 10
            </Typography>
            <TableComponent
              paginationType="admin"
              tableRows={[...categoryRows]}
              columns={[...categoryColumns]}
              showSearchbar={false}
              // showPagination={false}
              showCheckbox={false}
            />
          </Paper>
        </Grid>
        <Grid item sm={12} md={6}>
          <Paper className="mnh-300">
            <Typography className="fw-bold h-5 pt-2 px-2">
              Supplier Causing More Returns of Products - Top 10
            </Typography>
            <TableComponent
              paginationType="admin"
              tableRows={[...supplierRows]}
              columns={[...supplierColumns]}
              showSearchbar={false}
              // showPagination={false}
              showCheckbox={false}
            />
          </Paper>
        </Grid>
      </Grid>
      <Grid container className="px-3 my-2" spacing={2}>
        <Grid item sm={12} md={6}>
          <Paper className="mnh-300">
            <Typography className="fw-bold h-5 pt-2 px-2">
              Customer who produce more products return - Top 10
            </Typography>
            <TableComponent
              paginationType="admin"
              tableRows={[...CustomerRows]}
              columns={[...CustomerColumns]}
              showSearchbar={false}
              showPagination={false}
              showCheckbox={false}
            />
          </Paper>
        </Grid>
        <Grid item sm={12} md={6}>
          <Paper className="mnh-300">
            <Typography className="fw-bold h-5 pt-2 px-2">
              Reseller who produce more products return - Top 10
            </Typography>
            <TableComponent
              paginationType="admin"
              tableRows={[...ResellerRows]}
              columns={[...ResellerColumns]}
              showSearchbar={false}
              // showPagination={false}
              showCheckbox={false}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
export default DashBoard;
