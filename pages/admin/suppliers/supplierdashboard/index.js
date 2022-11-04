import { Box, Grid, Paper, Typography } from "@mui/material";
import NavTabComponent from "components/molecule/NavTabComponent";
import React, { useEffect, useState } from "react";
import CardComponent from "@/atoms/CardComponent";
import { LineChart } from "@/atoms/Linechart/Linechart";
import { PieChart } from "@/atoms/PieChart";
import SelectComponent from "@/atoms/SelectComponent";
import TableComponent from "@/atoms/TableComponent";

const navTabData = [
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
const cardData = [
  {
    id: 1,
    title: "Total Gross Sale",
    rate: "₹ 1,12,345",
    color: "#ffa800",
  },
  {
    id: 2,
    title: "Payment Pending",
    rate: "₹ 12,345",
    color: "#007fff",
  },
  {
    id: 3,
    title: "Total Payment settled",
    rate: "₹ 12,3405",
    color: "#ff00a2",
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
const subCardData = [
  {
    id: 1,
    title: "Total Supplier Penalized",
    subTitle: "Paid and Active",
    count: "25",
  },
  {
    id: 2,
    title: "Total Supplier Penalized",
    subTitle: "Paid and Inactive",
    count: "25",
  },
  {
    id: 1,
    title: "Total Supplier Penalized",
    subTitle: "Not Paid and Active",
    count: "25",
  },
  {
    id: 1,
    title: "Total Supplier Penalized",
    subTitle: "Not Paid and Inactive",
    count: "25",
  },
];
const pieChartDatas = [
  {
    type: "Day",
    data: [
      {
        label: "Old Suppliers",
        value: 254,
        bgColor: "#087ffa",
      },
      {
        label: "New Suppliers",
        value: 20,
        bgColor: "#044486",
      },
    ],
  },
  {
    type: "Week",
    data: [
      {
        label: "Old Suppliers",
        value: 20,
        bgColor: "#087ffa",
      },
      {
        label: "New Suppliers",
        value: 254,
        bgColor: "#044486",
      },
    ],
  },
];
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
const highProductReturnColumn = [
  {
    id: "col1",
    label: "SI NO.",
    minWidth: 10,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col2",
    label: "Supplier name",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col3",
    label: "Return Amount value",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
];
const highProductReturnRow = [
  {
    id: "col1",
    col1: 1,
    col2: "balu",
    col3: 20000,
  },
  {
    id: "col1",
    col1: 2,
    col2: "Rohan",
    col3: 20000,
  },
  {
    id: "col1",
    col1: 3,
    col2: "Rakesh",
    col3: 2000,
  },
  {
    id: "col1",
    col1: 4,
    col2: "suhil",
    col3: 20000,
  },
  {
    id: "col1",
    col1: 5,
    col2: "balu",
    col3: 20000,
  },
  {
    id: "col1",
    col1: 6,
    col2: "rakesh",
    col3: 20000,
  },
  {
    id: "col1",
    col1: 7,
    col2: "Rakesh",
    col3: 2000,
  },
  {
    id: "col1",
    col1: 8,
    col2: "suhil",
    col3: 20000,
  },
  {
    id: "col1",
    col1: 9,
    col2: "balu",
    col3: 20000,
  },
  {
    id: "col1",
    col1: 10,
    col2: "rakesh",
    col3: 20000,
  },
];
const registeredColumn = [
  {
    id: "col1",
    label: "SI NO.",
    minWidth: 10,
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
    label: "Supplier",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col4",
    label: "Count with %",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
];
const registeredRow = [
  {
    id: "col1",
    col1: 1,
    col2: "balu",
    col3: 20000,
    col4: "--",
  },
  {
    id: "col1",
    col1: 2,
    col2: "Rohan",
    col3: 20000,
    col4: "--",
  },
  {
    id: "col1",
    col1: 3,
    col2: "Rakesh",
    col3: 2000,
    col4: "--",
  },
  {
    id: "col1",
    col1: 4,
    col2: "suhil",
    col3: 20000,
    col4: "--",
  },
  {
    id: "col1",
    col1: 5,
    col2: "balu",
    col3: 20000,
    col4: "--",
  },
  {
    id: "col1",
    col1: 6,
    col2: "rakesh",
    col3: 20000,
    col4: "--",
  },
  {
    id: "col1",
    col1: 7,
    col2: "Rakesh",
    col3: 2000,
    col4: "--",
  },
  {
    id: "col1",
    col1: 8,
    col2: "suhil",
    col3: 20000,
    col4: "--",
  },
  {
    id: "col1",
    col1: 9,
    col2: "balu",
    col3: 20000,
    col4: "--",
  },
  {
    id: "col1",
    col1: 10,
    col2: "rakesh",
    col3: 20000,
    col4: "--",
  },
];
const topTensuppliersaleColumn = [
  {
    id: "col1",
    label: "SI NO.",
    minWidth: 10,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col2",
    label: "Supplier",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col3",
    label: "Sales value",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
];
const topTensuppliersaleRow = [
  {
    id: "col1",
    col1: 1,
    col2: "balu",
    col3: 20000,
  },
  {
    id: "col1",
    col1: 2,
    col2: "Rohan",
    col3: 20000,
  },
  {
    id: "col1",
    col1: 3,
    col2: "Rakesh",
    col3: 2000,
  },
  {
    id: "col1",
    col1: 4,
    col2: "suhil",
    col3: 20000,
  },
  {
    id: "col1",
    col1: 5,
    col2: "balu",
    col3: 20000,
  },
  {
    id: "col1",
    col1: 6,
    col2: "rakesh",
    col3: 20000,
  },
  {
    id: "col1",
    col1: 7,
    col2: "Rakesh",
    col3: 2000,
  },
  {
    id: "col1",
    col1: 8,
    col2: "suhil",
    col3: 20000,
  },
  {
    id: "col1",
    col1: 9,
    col2: "balu",
    col3: 20000,
  },
  {
    id: "col1",
    col1: 10,
    col2: "rakesh",
    col3: 20000,
  },
];
const categoriesColumn = [
  {
    id: "col1",
    label: "SI NO.",
    minWidth: 10,
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
    label: "Supplier",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col4",
    label: "Sales value",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
];
const categoriesRow = [
  {
    id: "col1",
    col1: "1",
    col2: "Shirt",
    col3: "Balu",
    col4: "1000",
  },
  {
    id: "col1",
    col1: "2",
    col2: "Shirt",
    col3: "Balu",
    col4: "1000",
  },
  {
    id: "col1",
    col1: "3",
    col2: "Shirt",
    col3: "Balu",
    col4: "1000",
  },
  {
    id: "col1",
    col1: "4",
    col2: "Shirt",
    col3: "Balu",
    col4: "1000",
  },
  {
    id: "col1",
    col1: "5",
    col2: "Shirt",
    col3: "Balu",
    col4: "1000",
  },
  {
    id: "col1",
    col1: "6",
    col2: "Shirt",
    col3: "Balu",
    col4: "1000",
  },
  {
    id: "col1",
    col1: "7",
    col2: "Shirt",
    col3: "Balu",
    col4: "1000",
  },
  {
    id: "col1",
    col1: "8",
    col2: "Shirt",
    col3: "Balu",
    col4: "1000",
  },
  {
    id: "col1",
    col1: "9",
    col2: "Shirt",
    col3: "Balu",
    col4: "1000",
  },
  {
    id: "col1",
    col1: "10",
    col2: "Shirt",
    col3: "Balu",
    col4: "1000",
  },
];
const getSubCard = () => (
  <Grid container xs={12} className="" spacing={2}>
    {subCardData.map((item) => (
      <Grid key={item.id} item lg={3} md={4} sm={6} className="">
        <Paper elevation={3}>
          <Typography className="ps-2 pt-2 h-4 fw-600">{item.title}</Typography>
          <Grid container className="p-3">
            <Grid sm={8} className="d-flex justify-content-end me-3">
              <Typography className="d-flex align-items-center fs-16 fw-bold">
                {item.subTitle}
              </Typography>
            </Grid>
            <Grid sm={3} display="flex" justifyContent="center">
              <Typography className="h-2 border rounded p-2">
                {item.count}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    ))}
  </Grid>
);
const SupplierDashboard = () => {
  const [pieChartData, setPieChartData] = useState([]);
  const [selectPieChart, setSelectPieChart] = useState("Day");
  useEffect(() => {
    pieChartDatas.forEach((item) => {
      if (item.type === "Day") {
        setPieChartData(item.data);
      }
    });
  }, []);
  const monthsList = months.map((val, ind) => ({
    id: ind,
    label: val,
    value: ind,
  }));
  const handleChangePieChart = (val) => {
    setSelectPieChart(val);
    pieChartDatas.forEach((item) => {
      if (item.type === val) {
        setPieChartData(item.data);
      }
    });
  };
  return (
    <Box className="mb-3 ps-1">
      <Box className="p-2 w-100 shadow-sm">
        <NavTabComponent listData={navTabData} />
      </Box>
      <Box>
        <Grid container spacing={1} className="mt-2 d-flex">
          {cardData.map((item) => (
            <Grid item lg={2} md={3} sm={6} xs={6} className="cursor-pointer">
              <CardComponent className="" boxColor={item.color}>
                <Typography className="h-6 pt-1 fw-500 color-gray ps-1">
                  {item.title}
                </Typography>
                <Typography className="fw-600 h-2 py-2 d-flex justify-content-center">
                  {item.rate}
                </Typography>
              </CardComponent>
            </Grid>
          ))}
        </Grid>
        <Box>
          <Grid className="mt-2">
            <Paper className="p-2" elevation={3}>
              <Typography className="h-5 fw-bold ps-2">
                Customers Growth
              </Typography>
              <Box>
                <LineChart
                  showYAxis={false}
                  labels={LineChartLable}
                  data={lineChartData}
                  lineColor="#007fff"
                  height="250px"
                />
              </Box>
            </Paper>
          </Grid>
        </Box>
      </Box>
      <Box className="mt-2 mb-2">{getSubCard()}</Box>
      <Grid container xs={12} spacing={2}>
        <Grid item lg={6} md={6} sm={12}>
          <Paper elevation={3} className="p-2 h-100">
            <Box className="d-flex justify-content-between">
              <Box>
                <Typography className="h-4 fw-600">
                  Total Supplier Count : 275
                </Typography>
              </Box>
              <Box className="d-flex">
                <Typography
                  className={`h-5 d-center me-2 cursor-pointer ${
                    selectPieChart === "Day" && `color-light-blue`
                  }`}
                  onClick={() => {
                    handleChangePieChart("Day");
                  }}
                >
                  Day
                </Typography>
                <Typography className="d-center">|</Typography>
                <Typography
                  className={`h-5 d-center mx-2 cursor-pointer ${
                    selectPieChart === "Week" && `color-light-blue`
                  }`}
                  onClick={() => {
                    handleChangePieChart("Week");
                  }}
                >
                  Week
                </Typography>
                <SelectComponent
                  className="border ps-2 rounded me-2"
                  list={monthsList}
                />
                <SelectComponent
                  className="border ps-2 rounded"
                  list={monthsList}
                />
              </Box>
            </Box>
            <Box className="my-4">
              <PieChart data={pieChartData} minHeight="mnh-250" />
            </Box>
          </Paper>
        </Grid>
        <Grid item lg={6} md={6} sm={12}>
          <Paper elevation={2} className="p-1 h-100">
            <Grid container className="d-flex justify-content-between px-2">
              <Grid item xs={7} className="fs-16 fw-bold px-2 mt-3">
                Supplier with high product return
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
              </Grid>
            </Grid>
            <TableComponent
              showSearchbar={false}
              showCheckbox={false}
              columns={[...highProductReturnColumn]}
              tableRows={[...highProductReturnRow]}
              paginationType="admin"
            />
          </Paper>
        </Grid>
      </Grid>
      <Grid container xs={12} spacing={2} className="mt-1">
        <Grid item md={6} sm={12}>
          <Paper elevation={3} className="p-2">
            <Grid container xs={12}>
              <Grid item sm={6}>
                <Typography className="fs-16 fw-bold px-2">
                  Supplier registered
                </Typography>
              </Grid>
              <Grid item sm={6} display="flex" justifyContent="end">
                <Typography className="border py-1 px-2 me-2 rounded">
                  D
                </Typography>
                <Typography className="border py-1 px-2 me-2 rounded">
                  W
                </Typography>
                <SelectComponent
                  list={monthsList}
                  className="border rounded ps-2"
                />
                <SelectComponent
                  list={monthsList}
                  className="border rounded ms-2 ps-2"
                />
              </Grid>
            </Grid>
            <Grid
              container
              xs={12}
              display="flex"
              justifyContent="end"
              className="mt-1"
            >
              <SelectComponent
                list={monthsList}
                className="border rounded ps-2"
              />
              <SelectComponent
                list={monthsList}
                className="border rounded ms-2 ps-2"
              />
            </Grid>
            <Box>
              <TableComponent
                showSearchbar={false}
                showCheckbox={false}
                paginationType="admin"
                columns={[...registeredColumn]}
                tableRows={[...registeredRow]}
              />
            </Box>
          </Paper>
        </Grid>
        <Grid item md={6} sm={12}>
          <Paper elevation={3} className="p-2 h-100">
            <Grid container xs={12}>
              <Grid item sm={6}>
                <Typography className="fs-16 fw-bold px-2">
                  Top 10 Supplier Sales
                </Typography>
              </Grid>
              <Grid item sm={6} display="flex" justifyContent="end">
                <Typography className="border py-1 px-2 me-2 rounded">
                  D
                </Typography>
                <Typography className="border py-1 px-2 me-2 rounded">
                  W
                </Typography>
                <SelectComponent
                  list={monthsList}
                  className="border rounded ps-2"
                />
                <SelectComponent
                  list={monthsList}
                  className="border rounded ms-2 ps-2"
                />
              </Grid>
            </Grid>
            <Box>
              <TableComponent
                showSearchbar={false}
                showCheckbox={false}
                paginationType="admin"
                columns={[...topTensuppliersaleColumn]}
                tableRows={[...topTensuppliersaleRow]}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Grid container xs={12} spacing={2} className="mt-1">
        <Grid item md={6} sm={12}>
          <Paper elevation={3} className="p-2 h-100">
            <Grid container xs={12}>
              <Grid item sm={6}>
                <Typography className="fs-16 fw-bold px-2">
                  Top 10 Supplier under Categories
                </Typography>
              </Grid>
              <Grid item sm={6} display="flex" justifyContent="end">
                <SelectComponent
                  list={monthsList}
                  className="border rounded ms-2 ps-2"
                />
              </Grid>
            </Grid>
            <Box>
              <TableComponent
                showSearchbar={false}
                showCheckbox={false}
                paginationType="admin"
                columns={[...categoriesColumn]}
                tableRows={[...categoriesRow]}
              />
            </Box>
          </Paper>
        </Grid>
        <Grid item md={6} sm={12}>
          <Paper elevation={3} className="p-2">
            <Grid container xs={12}>
              <Grid item sm={8}>
                <Typography className="fs-16 fw-bold px-2">
                  Top 10 Supplier under sub-categories
                </Typography>
              </Grid>
              <Grid item sm={4} display="flex" justifyContent="end">
                <SelectComponent
                  list={monthsList}
                  className="border rounded ms-2 ps-2"
                />
              </Grid>
            </Grid>
            <Box>
              <TableComponent
                showSearchbar={false}
                showCheckbox={false}
                paginationType="admin"
                columns={[...categoriesColumn]}
                tableRows={[...categoriesRow]}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SupplierDashboard;
