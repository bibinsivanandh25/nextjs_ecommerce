/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
// import {
//   Paper,
//   Box,
//   Typography,
//   TableCell,
//   TableRow,
//   TableHead,
//   Table,
//   TableContainer,
//   TableBody,
// } from "@mui/material";
// import React from "react";
// import CustomIcon from "services/iconUtils";

// const CustomTableComponent = ({ columns = [], rows = [] }) => {
//   return (
//     <TableContainer>
//       <Table>
//         <TableHead>
//           <TableRow className="border-bottom border-dashed">
//             {columns.map((item) => (
//               <TableCell
//                 key={item.id}
//                 align={item.align}
//                 style={{ top: 57, minWidth: item.minWidth }}
//                 className="fw-600 p-2 border-0"
//                 sx={{ fontSize: 13 }}
//               >
//                 {item.label}
//               </TableCell>
//             ))}
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row) => (
//             <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
//               {columns.map((column) => {
//                 const value = row[column.id];
//                 return (
//                   <TableCell
//                     key={column.id}
//                     align={column.data_align}
//                     className={`${column.data_classname} p-2`}
//                     style={column.data_style ?? {}}
//                     sx={{ fontSize: 12 }}
//                   >
//                     {column.format && typeof value === "number"
//                       ? column.format(value)
//                       : value}
//                   </TableCell>
//                 );
//               })}
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// const Dashboard = () => {
//   // useEffect(() => {
//   //   serviceUtil
//   //     .get("/home")
//   //     .then((data) => {})
//   //     .catch((err) => {
//   //       console.log(err);
//   //     });
//   // }, []);
//   const performance = {
//     columns: [
//       {
//         id: "col1",
//         label: "",
//         minWidth: 170,
//         align: "center",
//         data_align: "center",
//         data_classname: "",
//       },
//       {
//         id: "col2",
//         label: "Last 15 Days",
//         minWidth: 170,
//         align: "center",
//         data_align: "center",
//         data_classname: "",
//       },
//       {
//         id: "col3",
//         label: "Till Date",
//         minWidth: 170,
//         align: "center",
//         data_align: "center",
//         data_classname: "",
//       },
//       {
//         id: "col4",
//         label: "Expected Metrics",
//         minWidth: 170,
//         align: "center",
//         data_align: "center",
//         data_classname: "",
//       },
//       {
//         id: "col5",
//         label: "View",
//         minWidth: 170,
//         align: "center",
//         data_align: "center",
//         data_classname: "",
//       },
//     ],
//     rows: [
//       {
//         id: "1",
//         col1: "Average Pick Up Turn Around Time(TAT)",
//         col2: "10 days",
//         col3: "12 days",
//         col4: "2 days",
//         col5: <CustomIcon type="view" />,
//       },

//       {
//         id: "2",
//         col1: "Orders Cancelled",
//         col2: "Cancelled 0 (0.0%)",
//         col3: `Order Received : 20, Cancelled : 9 (0.8 %) Orders Received :
//         4,454 5%`,
//         col4: "",
//         col5: <CustomIcon type="view" />,
//       },
//       {
//         id: "3",
//         col1: "Orders Returned",
//         col2: "Cancelled 0 (0.0%)",
//         col3: `Order Received : 20, Cancelled : 9 (0.8 %) Orders Received :
//         4,454 5%`,
//         col4: "",
//         col5: <CustomIcon type="view" />,
//       },
//     ],
//   };
//   const penalties = {
//     columns: [
//       {
//         id: "col1",
//         label: "",
//         minWidth: 170,
//         align: "center",
//         data_align: "center",
//         data_classname: "",
//       },
//       {
//         id: "col2",
//         label: "No. of products",
//         minWidth: 170,
//         align: "center",
//         data_align: "center",
//         data_classname: "",
//       },
//       {
//         id: "col3",
//         label: "Penalty",
//         minWidth: 170,
//         align: "center",
//         data_align: "center",
//         data_classname: "",
//       },
//       {
//         id: "col4",
//         label: "Last Update",
//         minWidth: 170,
//         align: "center",
//         data_align: "center",
//         data_classname: "",
//       },

//       {
//         id: "col5",
//         label: "View",
//         minWidth: 170,
//         align: "center",
//         data_align: "center",
//         data_classname: "",
//       },
//     ],
//     rows: [
//       {
//         id: "1",
//         col1: "Wrong product returned",
//         col2: "07",
//         col3: "500 Rs.",
//         col4: "24-05-2022 12:12",
//         col5: <CustomIcon type="view" />,
//       },
//     ],
//   };

//   return (
//     <Paper
//       elevation={3}
//       className="w-100 mnh-80vh mxh-80vh p-3 overflow-y-scroll hide-scrollbar"
//     >
//       <Box className="border-bottom border border-1 border-secondary rounded mb-3">
//         <Box className="p-2 border-bottom border-secondary">
//           <Typography className="h-4 fw-600 color-orange">
//             Performance
//           </Typography>
//         </Box>
//         <Box className="p-2">
//           <CustomTableComponent
//             columns={performance.columns}
//             rows={performance.rows}
//           />
//         </Box>
//       </Box>
//       <Box className="border-bottom border border-1 border-secondary rounded mb-3">
//         <Box className="p-2 border-bottom border-secondary">
//           <Typography className="h-4 fw-600 color-orange">Penalties</Typography>
//         </Box>
//         <Box className="p-2">
//           <CustomTableComponent
//             columns={penalties.columns}
//             rows={penalties.rows}
//           />
//         </Box>
//       </Box>
//       <Box className="border-bottom border border-1 border-secondary rounded ">
//         <Box className="p-2 border-bottom border-secondary">
//           <Typography className="h-4 fw-600 color-orange">
//             Notice Board
//           </Typography>
//         </Box>
//         <Box className="p-2">
//           <Typography>notice board</Typography>
//         </Box>
//       </Box>
//     </Paper>
//   );
// };
// export default Dashboard;

import React, { useEffect, useState } from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import {
  getAllDashboardData,
  getCustomerChartData,
  getReferralChartData,
} from "services/supplier/dashboard";
import toastify from "services/utils/toastUtils";
import Bargraph from "@/atoms/Bar/Bargraph";
import { LineChart } from "@/atoms/Linechart/Linechart";
import SelectComponent from "@/atoms/SelectComponent";
import AddAddressModal from "@/forms/supplier/myaccount/addaddressmodal";

const barGraphLabels = [
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

const revenueSelectList = [
  {
    value: 2021,
    label: 2021,
  },
  {
    value: 2022,
    label: 2022,
  },
  {
    value: 2023,
    label: 2023,
  },
  {
    value: 2024,
    label: 2024,
  },
  {
    value: 2025,
    label: 2025,
  },
  {
    value: 2026,
    label: 2026,
  },
];

const Dashboard = () => {
  const user = useSelector((state) => state.user);
  const [masterCardData, setMasterCardData] = useState([]);
  const [showAddressModal, setShowAddressModal] = useState(false);
  // month wise Sale
  const [currentYear, setCurrentYear] = useState({
    value: new Date().getFullYear().toString(),
    label: new Date().getFullYear().toString(),
  });
  const [monthWiseSaleData, setMonthWiseSaleData] = useState([]);
  // referral chart
  const [referralData, setReferralData] = useState([]);
  const [referralCurrentYear, setReferralCurrentYear] = useState({
    value: new Date().getFullYear().toString(),
    label: new Date().getFullYear().toString(),
  });
  // customer chart
  const [customerChartData, setCustomerChartData] = useState([]);
  const [customerCurrentYear, setCustomerCurrentYear] = useState({
    value: new Date().getFullYear().toString(),
    label: new Date().getFullYear().toString(),
  });

  const getMasterCardData = async () => {
    const { data, err } = await getAllDashboardData(user.supplierId);
    if (data) {
      const cardDatas = [
        {
          id: 1,
          label: "totalOrders",
          title: "Total Orders",
          count: "",
          color: "#e87f28",
        },
        {
          id: 2,
          label: "totalSalesValue",
          title: "Total Sales Value",
          count: "",
          color: "#6e86c5",
        },
        {
          id: 3,
          label: "totalCustomers",
          title: "Total Customers",
          count: "",
          color: "#dbdb12",
        },
        {
          id: 4,
          label: "totalFreeOrders",
          title: "Free Orders Earned Through Referrals",
          count: "",
          color: "#76c44e",
        },
        {
          id: 5,
          label: "totalReferrals",
          title: "Total Referrals",
          count: "",
          color: "#12dbae",
        },
      ];
      Object.entries(data).forEach((item) => {
        cardDatas.forEach((value) => {
          if (value.label === item[0]) {
            value.count = item[1];
          }
        });
      });
      setMasterCardData(cardDatas);
    }
    if (err) {
      setMasterCardData([]);
      toastify(err.response.data.message, "error");
    }
  };

  const handleReferralData = async () => {
    const { data, err } = await getReferralChartData(
      user.supplierId,
      referralCurrentYear.value
    );
    if (data) {
      setReferralData(data);
    }
    if (err) {
      setReferralData([]);
      toastify(err.response.data.message, "error");
    }
  };
  const handleCustomerData = async () => {
    const { data, err } = await getCustomerChartData(
      user.storeCode,
      customerCurrentYear.value
    );
    if (data) {
      setCustomerChartData(data);
    }
    if (err) {
      setCustomerChartData([]);
      toastify(err.response.data.message, "error");
    }
  };
  const handleMonthWiseSale = async () => {
    const { data, err } = await getCustomerChartData(
      user.storeCode,
      currentYear.value
    );
    if (data) {
      setMonthWiseSaleData(data);
    }
    if (err) {
      setMonthWiseSaleData([]);
      toastify(err.response.data.message, "error");
    }
  };

  useEffect(() => {
    handleMonthWiseSale();
  }, [currentYear.value]);

  useEffect(() => {
    handleCustomerData();
  }, [customerCurrentYear.value]);

  useEffect(() => {
    handleReferralData();
  }, [referralCurrentYear.value]);
  useEffect(() => {
    if (user.isAddressSaved === 0) {
      setShowAddressModal(true);
    }
    getMasterCardData();
  }, []);
  console.log(monthWiseSaleData.at, "monthWiseSaleData");
  return (
    <div>
      {showAddressModal ? (
        <AddAddressModal
          showAddressModal={showAddressModal}
          type="add"
          setShowAddAddressModal={setShowAddressModal}
          showCloseIcon={false}
          disableCancel
          supplierId={user.supplierId}
        />
      ) : (
        <Paper className="w-100 mnh-85vh mxh-85vh overflow-auto hide-scrollbar p-2">
          <Grid container className="" gap={0.5}>
            {masterCardData &&
              masterCardData?.map((item, index) => (
                <Grid
                  item
                  lg={index % 2 == 0 ? 2 : 2.9}
                  md={index % 2 == 0 ? 2 : 2.8}
                  sm={5.9}
                  xs={12}
                  sx={{
                    boxShadow: "0px 0px 4px #0000003D",
                    border: "3px solid #FFFFFF",
                    borderRadius: "8px",
                    opacity: "0.9",
                  }}
                >
                  <Box
                    sx={{ backgroundColor: `${item.color}` }}
                    className="py-3 rounded h-100"
                  >
                    <Typography className=" ps-2 text-break text-white h-5">
                      {item.title}
                    </Typography>
                    <Typography className=" ps-2 text-break text-white h-3">
                      {item.count}
                    </Typography>
                  </Box>
                </Grid>
              ))}
          </Grid>
          <Grid container spacing={2} mt={1} className="h-100">
            <Grid item md={6} sm={12}>
              <Paper elevation={3} className="h-100">
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Typography className="ps-3 py-2 h-5 fw-bold">
                      Month Wise Sales
                    </Typography>
                  </Box>
                  <Box>
                    <SelectComponent
                      value={currentYear.value}
                      disableUnderline
                      list={revenueSelectList}
                      onChange={(e) => {
                        setCurrentYear({
                          value: e.target.value,
                          label: e.target.value,
                        });
                      }}
                    />
                  </Box>
                </Box>
                <Bargraph
                  showGridY={false}
                  data={referralData}
                  labels={barGraphLabels}
                  backgroundColor="#1f78b4"
                  hoverBackgroundColor="#ea7d30"
                  height="273px"
                  label="Orders"
                />
              </Paper>
            </Grid>
            <Grid item md={6} sm={12}>
              <Paper elevation={3} className="h-100">
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Typography className="ps-3 py-2 h-5 fw-bold">
                      Referral Created Month Wise
                    </Typography>
                  </Box>
                  <Box>
                    <SelectComponent
                      value={referralCurrentYear.value}
                      disableUnderline
                      list={revenueSelectList}
                      onChange={(e) => {
                        setReferralCurrentYear({
                          value: e.target.value,
                          label: e.target.value,
                        });
                      }}
                    />
                  </Box>
                </Box>
                <LineChart
                  label="Referral Count"
                  data={referralData}
                  labels={barGraphLabels}
                  showYAxis={false}
                  lineColor="#1F78B4"
                  height="250px"
                />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper elevation={3} className="p-2">
                <Grid container>
                  <Grid item sm={10} />
                  <Grid
                    item
                    sm={2}
                    className="mb-2"
                    display="flex"
                    justifyContent="end"
                  >
                    <SelectComponent
                      value={customerCurrentYear.value}
                      disableUnderline
                      list={revenueSelectList}
                      onChange={(e) => {
                        setCustomerCurrentYear({
                          value: e.target.value,
                          label: e.target.value,
                        });
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={9}>
                  {customerChartData && (
                    <Bargraph
                      data={customerChartData}
                      labels={barGraphLabels}
                      backgroundColor="#425568"
                      hoverBackgroundColor="#ea7d30"
                      barDirection="y"
                      height="300px"
                      showXAxis={false}
                      showGridY={false}
                      showDiffColors
                      colorOfMax="#EB7C30"
                      label="Customer Count"
                    />
                  )}
                  <Typography className="text-center h-5 fw-bold">
                    Total Customers :{" "}
                    {customerChartData.reduce((a, b) => a + b, 0)}
                  </Typography>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      )}
    </div>
  );
};

export default Dashboard;
