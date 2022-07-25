import { Box, Grid, Paper, Typography } from "@mui/material";
import NavTabComponent from "components/molecule/NavTabComponent";
import React from "react";
import { LineChart } from "@/atoms/Linechart/Linechart";
import TableComponent from "@/atoms/TableComponent";
// import SimpleDropdownComponent from "@/atoms/SimpleDropdownComponent";
import SelectComponent from "@/atoms/SelectComponent";

const navbartabs = [
  {
    id: 1,
    title: "Week",
  },
  {
    id: 2,
    title: "Month",
  },
  {
    id: 3,
    title: "Year",
  },
];
const LineChartLable = [
  "Monday",
  "Tuseday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const resellerRows = [
  {
    id: "1",
    col1: "1",
    col2: "Traders",
    col3: 20,
    col4: "1000",
  },
  {
    id: "2",
    col1: "2",
    col2: "Traders",
    col3: 20,
    col4: "1000",
  },
  {
    id: "3",
    col1: "3",
    col2: "Traders",
    col3: 20,
    col4: "1000",
  },
];
const resellerColumn = [
  {
    id: "col1",
    label: "SI NO.",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col2",
    label: "Reseller Name",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col3",
    label: "Sales Value",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col4",
    label: "Ordered Via",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
];
const lineChartData = [20000, 3000, 1000, 40000, 10000, 400, 2000];
const months = [
  "Month",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const CustomerDashBoard = () => {
  const monthsList = months.map((val, ind) => ({
    id: ind,
    label: val,
    value: ind,
  }));
  return (
    <Box>
      <Box className="w-100 py-2 ps-5 bg-white shadow-sm">
        <NavTabComponent listData={navbartabs} />
      </Box>
      <Grid container spacing={2} className="mt-2">
        <Grid item lg={10} md={10} sm={12}>
          <Paper className="p-2" elevation={2}>
            <Typography className="h-5 fw-bold ps-2">
              Customers Growth
            </Typography>
            <Box>
              <LineChart
                showYAxis={false}
                labels={LineChartLable}
                data={lineChartData}
                lineColor="#007fff"
              />
            </Box>
          </Paper>
        </Grid>
        <Grid item md={2} lg={2} sm={6}>
          <Paper elevation={2}>
            <Typography className="d-flex justify-content-center pt-2">
              Total Customers
            </Typography>
            <Typography className="color-orange h-1 d-flex justify-content-center py-1">
              10,000
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={2} className="p-1">
            <Grid container className="d-flex justify-content-between px-2">
              <Grid item xs={7} className="fs-16 fw-bold px-2 mt-3">
                Top 10 Customer with high return orders
              </Grid>
              <Grid item xs={5} className="d-flex justify-content-end mt-2">
                <SelectComponent
                  list={monthsList}
                  className="border rounded ps-2"
                />
                <SelectComponent
                  list={monthsList}
                  className="border rounded ms-2 ps-2"
                />
                {/* <SimpleDropdownComponent size="small" className="ms-2" /> */}
              </Grid>
            </Grid>
            <TableComponent
              showSearchbar={false}
              showCheckbox={false}
              columns={[...resellerColumn]}
              tableRows={[...resellerRows]}
              paginationType="admin"
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CustomerDashBoard;
