/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import { Box, Grid, Paper, Typography } from "@mui/material";
import NavTabComponent from "components/molecule/NavTabComponent";
import { useEffect, useState } from "react";
import CardComponent from "@/atoms/CardComponent";
import Bargraph from "@/atoms/Bar/Bargraph";
import TableComponent from "@/atoms/TableComponent";
import SelectComponent from "@/atoms/SelectComponent";
import DropdownComponent from "@/atoms/DropdownComponent";
import SimpleDropdownComponent from "@/atoms/SimpleDropdownComponent";
import DatePickerComponent from "@/atoms/DatePickerComponent";
import { PieChart } from "@/atoms/PieChart";

const detailSelectList = [
  {
    id: 1,
    value: 2021,
    label: 2021,
  },
  {
    id: 2,
    value: 2022,
    label: 2022,
  },
  {
    id: 3,
    value: 2023,
    label: 2023,
  },
];

const salesColumn = [
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
    label: "Vender",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col3",
    label: "Category",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col4",
    label: "Sales Value",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
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
const barGraphData = [
  10000, 2000, 4000, 15000, 22000, 5000, 5000, 7000, 4000, 6000, 30000, 12000,
];
const barGraphLabels = [
  "01 am",
  "02 am",
  "04 am",
  "05 am",
  "08 am",
  "11 am",
  "02 pm",
  "04 pm",
  "07 pm",
  "08 pm",
  "10 pm",
  "12 pm",
];
const salesRows = [
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
const DashBoard = () => {
  const [navData, setNavData] = useState([
    { id: 1, title: "Today" },
    { id: 2, title: "Yesterday" },
    { id: 3, title: "Last 7 days" },
    { id: 4, title: "Last month" },
    { id: 5, title: "Last year" },
  ]);
  const [cardData, setCardData] = useState([
    {
      id: 1,
      title: "Total Gross Sale's Amount",
      rate: "₹ 1,12,345",
      color: "#ffa800",
    },
    {
      id: 2,
      title: "MrMrsCart Commision in",
      rate: "₹ 1345",
      color: "#007fff",
    },
    {
      id: 3,
      title: "Net profit after GST to MrMrsCart",
      rate: "₹ 12,345",
      color: "#ff00a2",
    },
    {
      id: 4,
      title: "Total products active",
      rate: "345",
      color: "#00c033",
    },
    {
      id: 5,
      title: "Total Orders",
      rate: "₹ 1,12,345",
      color: "#ff4500",
    },
  ]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [subCardData, setSubCardData] = useState([
    {
      id: 1,
      title: "Top 10 Sales",
      color: "#ff4500",
    },
    {
      id: 2,
      title: "Customer base",
      color: "#00c033",
    },
    {
      id: 3,
      title: "Top 10 Category",
      color: "#ff00a2",
    },
    {
      id: 4,
      title: "Refunds settled",
      color: "#007fff",
    },
    {
      id: 5,
      title: "Top Returend Products",
      color: "#ffa800",
    },
    {
      id: 6,
      title: "Top Reseller",
      color: "#f23400",
    },
  ]);
  const [PaymentDatas, setPaymentDatas] = useState([
    {
      id: 1,
      title: "Customers",
      amount: "08,98,765",
    },
    {
      id: 2,
      title: "Resellers",
      amount: "10,98,765",
    },
    {
      id: 3,
      title: "Suppliers",
      amount: "18,985",
    },
  ]);
  const [trafficData, setTrafficDatas] = useState([
    {
      id: 1,
      title: "Desktop",
      amount: "765",
    },
    {
      id: 2,
      title: "Mobile",
      amount: "165",
    },
    {
      id: 3,
      title: "Tab",
      amount: "15",
    },
  ]);
  const [pieChartData, setPieChartData] = useState([
    {
      type: "supplier",
      data: [
        {
          label: "Total count",
          value: 243,
          bgColor: "#e56700",
        },
        {
          label: "New count",
          value: 23,
          bgColor: "#cf2a1e",
        },
        {
          label: "Old count",
          value: 150,
          bgColor: "#efa263",
        },
      ],
    },
    {
      type: "reseller",
      data: [
        {
          label: "Total count",
          value: 243,
          bgColor: "#cf2a1e",
        },
        {
          label: "New count",
          value: 23,
          bgColor: "#e56700",
        },
        {
          label: "Old count",
          value: 150,
          bgColor: "#efa263",
        },
      ],
    },
    {
      type: "customer",
      data: [
        {
          label: "Total count",
          value: 243,
          bgColor: "#efa263",
        },
        {
          label: "New count",
          value: 23,
          bgColor: "#cf2a1e",
        },
        {
          label: "Old count",
          value: 150,
          bgColor: "#e56700",
        },
      ],
    },
  ]);
  const [pieChartSelect, setPiechartSelect] = useState("supplier");
  const [supplierSubTittle, setSupplierSubTittle] = useState("day");
  const [selectedPieChart, setSelectedPieChart] = useState({});
  useEffect(() => {
    pieChartData.map((item) => {
      if (item.type === "supplier") {
        setSelectedPieChart(item);
      }
    });
  }, []);
  const handlePieChartClick = (values) => {
    setPiechartSelect(values);
    pieChartData.map((item) => {
      if (item.type === values) {
        setSelectedPieChart(item);
      }
    });
  };
  return (
    <Box className="">
      <Box
        className="p-2 w-100 shadow-sm"
        // className="shadow p-2 w-100 position-fixed bg-white"
        // sx={{ top: 80, zIndex: "10" }}
        // sx={{
        //   boxShadow:
        //     "rgba(17, 17, 26, 0.05) 0px 4px 2px, rgba(17, 17, 26, 0.05) 0px 8px 50px",
        // }}
      >
        <NavTabComponent
          listData={navData}
          fromDate={fromDate}
          toDate={toDate}
          setFromDate={setFromDate}
          setToDate={setToDate}
        />
      </Box>
      <Box className="">
        <Grid
          container
          spacing={1}
          className="mt-3 d-flex justify-content-evenly"
        >
          {cardData.map((item) => (
            <Grid
              item
              lg={2.4}
              md={3}
              sm={6}
              xs={6}
              className=" cursor-pointer"
            >
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
        <Box className="border-dashed">
          <Paper elevation={3} className="p-2 my-2">
            <Bargraph
              showGridY={false}
              data={barGraphData}
              labels={barGraphLabels}
              backgroundColor="#1f78b4"
              hoverBackgroundColor="#1f78b4"
              borderRadius={{ topRight: 10, topLeft: 10 }}
            />
          </Paper>
        </Box>
        <Box className="mt-2">
          <Grid container spacing={2} className="d-flex justify-content-center">
            {subCardData.map((items) => (
              <Grid item xs={6} sm={6} md={3} lg={2}>
                <CardComponent boxColor={items.color} bottomShadow="2px">
                  <Typography className="h-5 fw-bold py-2 ps-1 d-flex justify-content-center">
                    {items.title}
                  </Typography>
                </CardComponent>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Grid container item xs={12} className="mt-2" spacing={2}>
          <Grid item xs={6}>
            <Paper elevation={3} className="p-2">
              <Grid container className="d-flex justify-content-between">
                <Grid item xs={6} className="fs-16 fw-bold px-2 mt-3">
                  Top 10 Sales by Vender
                </Grid>
                <Grid item xs={6} className="d-flex mt-2">
                  <SimpleDropdownComponent
                    size="small"
                    list={detailSelectList}
                    placeholder="Completed day"
                  />
                  <SimpleDropdownComponent
                    size="small"
                    list={detailSelectList}
                    placeholder="Current Date"
                  />
                </Grid>
              </Grid>
              <TableComponent
                showSearchbar={false}
                showCheckbox={false}
                columns={[...salesColumn]}
                tableRows={[...salesRows]}
              />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper elevation={3} className="p-2">
              <Grid container className="d-flex justify-content-between">
                <Grid item xs={6} className="fs-16 fw-bold px-2 mt-3">
                  Top 10 Sales by Vender
                </Grid>
                <Grid item xs={6} className="d-flex mt-2">
                  <SimpleDropdownComponent
                    size="small"
                    list={detailSelectList}
                    placeholder="Completed day"
                  />
                  <SimpleDropdownComponent
                    size="small"
                    list={detailSelectList}
                    placeholder="Current Date"
                  />
                </Grid>
              </Grid>
              <TableComponent
                showSearchbar={false}
                showCheckbox={false}
                columns={[...resellerColumn]}
                tableRows={[...resellerRows]}
              />
            </Paper>
          </Grid>
        </Grid>
        <Grid container item xs={12} className="mt-2" spacing={2}>
          <Grid item xs={6} className="mb-2">
            <Paper elevation={3} className="p-2">
              <Box className="d-flex justify-content-between">
                <Typography className="fw-600">Counts</Typography>
                <Box className="d-flex">
                  <Typography
                    className={`border-end pe-2 h-5 cursor-pointer ${
                      pieChartSelect === "supplier" && `color-light-blue`
                    }`}
                    onClick={() => {
                      handlePieChartClick("supplier");
                    }}
                  >
                    Supplier
                  </Typography>
                  <Typography
                    className={`ms-2 border-end pe-2 h-5 cursor-pointer ${
                      pieChartSelect === "reseller" && `color-light-blue`
                    }`}
                    onClick={() => {
                      handlePieChartClick("reseller");
                    }}
                  >
                    Reseller
                  </Typography>
                  <Typography
                    className={`ms-2 h-5 cursor-pointer ${
                      pieChartSelect === "customer" && `color-light-blue`
                    }`}
                    onClick={() => {
                      handlePieChartClick("customer");
                    }}
                  >
                    Customer
                  </Typography>
                </Box>
              </Box>
              <Box className="mnh-20px">
                {pieChartSelect === "supplier" && (
                  <Box className="d-flex justify-content-end mt-1">
                    <Typography
                      className={`border-end pe-2 h-5 cursor-pointer ${
                        supplierSubTittle === "day" && `color-light-blue`
                      }`}
                      onClick={() => {
                        setSupplierSubTittle("day");
                      }}
                    >
                      Day
                    </Typography>
                    <Typography
                      className={`ms-2 border-end pe-2 h-5 cursor-pointer ${
                        supplierSubTittle === "week" && `color-light-blue`
                      }`}
                      onClick={() => {
                        setSupplierSubTittle("week");
                      }}
                    >
                      Week
                    </Typography>
                    <Typography
                      className={`ms-2 border-end pe-2 h-5 cursor-pointer ${
                        supplierSubTittle === "month" && `color-light-blue`
                      }`}
                      onClick={() => {
                        setSupplierSubTittle("month");
                      }}
                    >
                      Month
                    </Typography>
                    <Typography
                      className={`ms-2 h-5 cursor-pointer ${
                        supplierSubTittle === "year" && `color-light-blue`
                      }`}
                      onClick={() => {
                        setSupplierSubTittle("year");
                      }}
                    >
                      Year
                    </Typography>
                  </Box>
                )}
              </Box>
              <Box className="mnh-250">
                <PieChart
                  data={selectedPieChart?.data}
                  labels={selectedPieChart?.labels}
                  backgroundColor={selectedPieChart?.backgroundColor}
                  borderColor={selectedPieChart?.borderColor}
                  minHeight="mnh-250"
                />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className="px-3 py-2">
              <Typography className="fs-16 fw-600">Pending Payment</Typography>
              {PaymentDatas.map((value, index) => (
                <Box
                  className={`py-3 ${
                    PaymentDatas?.length - 1 > index && `border-dashed`
                  }`}
                  key={value.id}
                >
                  <Typography className="fs-12 color-gray">
                    {value.title}
                  </Typography>
                  <Typography className="fs-26 fw-600">
                    ₹ {value.amount}
                  </Typography>
                </Box>
              ))}
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className="px-3 py-2">
              <Typography className="fs-16 fw-600">Traffic Source</Typography>
              {trafficData.map((value, index) => (
                <Box
                  className={`py-3 ${
                    PaymentDatas?.length - 1 > index && `border-dashed`
                  }`}
                  key={value.id}
                >
                  <Typography className="fs-12 color-gray">
                    {value.title}
                  </Typography>
                  <Typography className="fs-26 fw-600">
                    {value.amount}
                  </Typography>
                </Box>
              ))}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
export default DashBoard;
