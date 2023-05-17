// import React from "react";
// import { Box, Grid, Paper, Typography } from "@mui/material";
// import Bargraph from "@/atoms/Bar/Bargraph";
// import { LineChart } from "@/atoms/Linechart/Linechart";
// import SelectComponent from "@/atoms/SelectComponent";

// const cardDatas = [
//   {
//     id: 1,
//     title: "Total Orders",
//     count: "15,33,567",
//     color: "#e87f28",
//   },
//   {
//     id: 2,
//     title: "Total Sales Value",
//     count: "12,03,968",
//     color: "#6e86c5",
//   },
//   {
//     id: 1,
//     title: "Total Customers",
//     count: "33,567",
//     color: "#dbdb12",
//   },
//   {
//     id: 1,
//     title: "Free Orders Earned Through Referrals",
//     count: "15,007",
//     color: "#76c44e",
//   },
//   {
//     id: 1,
//     title: "Total Referrals",
//     count: "1,067",
//     color: "#12dbae",
//   },
// ];

// const barGraphLabels = [
//   "Jan",
//   "Feb",
//   "Mar",
//   "Apr",
//   "May",
//   "Jun",
//   "Jul",
//   "Aug",
//   "Sep",
//   "Oct",
//   "Nov",
//   "Dec",
// ];
// const barGraphData = [
//   1000, 3000, 5000, 4000, 2000, 7000, 3000, 5000, 900, 1000, 200, 9000,
// ];
// const customerGraphData = [5, 10, 15, 20, 25, 30, 35, 10, 20, 10, 30, 20];
// const revenueSelectList = [
//   {
//     id: 1,
//     value: 2021,
//     label: 2021,
//   },
//   {
//     id: 2,
//     value: 2022,
//     label: 2022,
//   },
//   {
//     id: 3,
//     value: 2023,
//     label: 2023,
//   },
// ];

// const RevenueSales = () => {
//   return (
//     <Paper className="w-100 mnh-85vh mxh-85vh overflow-auto hide-scrollbar p-2">
//       <Grid container className="" gap={0.5}>
//         {cardDatas.map((item, index) => (
//           <Grid
//             item
//             md={index % 2 == 0 ? 2 : 2.9}
//             sm={6}
//             xs={12}
//             sx={{
//               boxShadow: "0px 0px 4px #0000003D",
//               border: "3px solid #FFFFFF",
//               borderRadius: "8px",
//               opacity: "0.9",
//             }}
//           >
//             <Box
//               sx={{ backgroundColor: `${item.color}` }}
//               className="py-3 rounded h-100"
//             >
//               <Typography className=" ps-2 text-break text-white h-5">
//                 {item.title}
//               </Typography>
//               <Typography className=" ps-2 text-break text-white h-3">
//                 {item.count}
//               </Typography>
//             </Box>
//           </Grid>
//         ))}
//       </Grid>
//       <Grid container spacing={2} mt={1} className="h-100">
//         <Grid item md={6} sm={12}>
//           <Paper elevation={3} className="h-100">
//             <Typography className="ps-3 py-2 h-5 fw-bold">
//               Month Wise Sales
//             </Typography>
//             <Bargraph
//               data={barGraphData}
//               labels={barGraphLabels}
//               backgroundColor="#1f78b4"
//               hoverBackgroundColor="#ea7d30"
//             />
//           </Paper>
//         </Grid>
//         <Grid item md={6} sm={12}>
//           <Paper elevation={3} className="h-100">
//             <Typography className="ps-3 py-2 h-5 fw-bold">
//               Referral Created Month Wise
//             </Typography>
//             <LineChart
//               data={barGraphData}
//               labels={barGraphLabels}
//               showYAxis={false}
//               lineColor="#1F78B4"
//               height="250px"
//             />
//           </Paper>
//         </Grid>
//         <Grid item xs={12}>
//           <Paper elevation={3} className="p-2">
//             <Grid container>
//               <Grid item sm={9.5} />
//               <Grid item sm={2} className="mb-2">
//                 <SelectComponent disableUnderline list={revenueSelectList} />
//               </Grid>
//             </Grid>
//             <Grid item xs={7}>
//               <Bargraph
//                 data={customerGraphData}
//                 labels={barGraphLabels}
//                 backgroundColor="#425568"
//                 hoverBackgroundColor="#ea7d30"
//                 barDirection="y"
//                 height="300px"
//                 showXAxis={false}
//                 showGridY={false}
//                 showDiffColors
//                 colorOfMax="#EB7C30"
//               />
//               <Typography className="text-center h-5 fw-bold">
//                 Total Customers : 123
//               </Typography>
//             </Grid>
//           </Paper>
//         </Grid>
//       </Grid>
//     </Paper>
//   );
// };

// export default RevenueSales;

import {
  Paper,
  Box,
  Typography,
  TableCell,
  TableRow,
  TableHead,
  Table,
  TableContainer,
  TableBody,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getPenaltyData,
  getPerformanceData,
} from "services/supplier/appnotification";

const CustomTableComponent = ({ columns = [], rows = [] }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow className="border-bottom border-dashed">
            {columns.map((item) => (
              <TableCell
                key={item.id}
                align={item.align}
                style={{ top: 57, minWidth: item.minWidth }}
                className="fw-600 p-2 border-0"
                sx={{ fontSize: 13 }}
              >
                {item.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row) => (
            <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
              {columns.map((column) => {
                const value = row[column.id];
                return (
                  <TableCell
                    key={column.id}
                    align={column.data_align}
                    className={`${column.data_classname} p-2`}
                    style={column.data_style ?? {}}
                    sx={{ fontSize: 12 }}
                  >
                    {column.format && typeof value === "number"
                      ? column.format(value)
                      : value}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const RevenueSales = () => {
  const supplierId = useSelector((state) => state.user?.supplierId);
  const [penaltyData, setPenaltyData] = useState([]);
  const [performanceData, setPerformaceData] = useState([]);

  useEffect(() => {
    const getPenalty = async () => {
      const { data } = await getPenaltyData(supplierId);
      if (data) {
        setPenaltyData([
          {
            id: "1",
            col1: data.penaltyReason?.length ? data.penaltyReason : "--",
            col2: data.noOfProducts,
            col3: `₹${data.penaltyCharges}`,
            col4: data.lastUpdatedAt,
            // col5: <CustomIcon type="view" />,
          },
        ]);
      }
    };
    const getPerformance = async () => {
      const { data } = await getPerformanceData(supplierId);
      if (data) {
        setPerformaceData([
          {
            id: "1",
            col1: "Average Pick Up Turn Around Time(TAT)",
            col2: `${data.averagePickUpTurnAroundLast15Days} days`,
            col3: `${data.averagePickUpTurnAroundTillDate} days`,
            col4: `${data.averagePickUpTurnAroundExpectedMetrics} days`,
            // col5: <CustomIcon type="view" />,
          },

          {
            id: "2",
            col1: "Orders Cancelled",
            col2: `Cancelled ${data.ordersCancelledLast15Days} (${data.ordersCancelledLast15DaysPercentage}%)`,
            col3: `Order Received : ${data.orderRecieved}, Cancelled : ${data.ordersCancelledTillDate} (${data.ordersCancelledTillDatePercentage}%) Orders Received :
               ${data.orderRecievedPercentage}%`,
            col4: "",
            // col5: <CustomIcon type="view" />,
          },
          {
            id: "3",
            col1: "Orders Returned",
            col2: `Returned ${data.ordersReturnedLast15Days} (${data.ordersReturnedLast15DaysPercentage}%)`,
            col3: `Order Received : ${data.orderRecieved}, Returned : ${data.ordersReturnedTillDate} (${data.ordersReturnedTillDatePercentage}%) Orders Received :
                ${data.orderRecievedPercentage}%`,
            col4: "",
            // col5: <CustomIcon type="view" />,
          },
        ]);
      }
    };
    if (supplierId) {
      getPenalty();
      getPerformance();
    }
  }, [supplierId]);

  // useEffect(() => {
  //   serviceUtil
  //     .get("/home")
  //     .then((data) => {})
  //     .catch((err) => {
  //       // console.log(err);
  //     });
  // }, []);
  const performanceColumns = [
    {
      id: "col1",
      label: "",
      minWidth: 170,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col2",
      label: "Last 15 Days",
      minWidth: 170,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col3",
      label: "Till Date",
      minWidth: 170,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col4",
      label: "Expected Metrics",
      minWidth: 170,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    // {
    //   id: "col5",
    //   label: "View",
    //   minWidth: 170,
    //   align: "center",
    //   data_align: "center",
    //   data_classname: "",
    // },
  ];
  // rows: [
  //   {
  //     id: "1",
  //     col1: "Average Pick Up Turn Around Time(TAT)",
  //     col2: "10 days",
  //     col3: "12 days",
  //     col4: "2 days",
  //     col5: <CustomIcon type="view" />,
  //   },

  //   {
  //     id: "2",
  //     col1: "Orders Cancelled",
  //     col2: "Cancelled 0 (0.0%)",
  //     col3: `Order Received : 20, Cancelled : 9 (0.8 %) Orders Received :
  //       4,454 5%`,
  //     col4: "",
  //     col5: <CustomIcon type="view" />,
  //   },
  //   {
  //     id: "3",
  //     col1: "Orders Returned",
  //     col2: "Cancelled 0 (0.0%)",
  //     col3: `Order Received : 20, Cancelled : 9 (0.8 %) Orders Received :
  //       4,454 5%`,
  //     col4: "",
  //     col5: <CustomIcon type="view" />,
  //   },
  // ],

  const penaltiesColumns = [
    {
      id: "col1",
      label: "",
      minWidth: 170,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col2",
      label: "No. of products",
      minWidth: 170,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col3",
      label: "Penalty",
      minWidth: 170,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col4",
      label: "Last Update",
      minWidth: 170,
      align: "center",
      data_align: "center",
      data_classname: "",
    },

    // {
    //   id: "col5",
    //   label: "View",
    //   minWidth: 170,
    //   align: "center",
    //   data_align: "center",
    //   data_classname: "",
    // },
  ];
  //   ]{
  //     columns:,
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

  return (
    <Paper
      elevation={3}
      className="w-100 mnh-80vh mxh-80vh p-3 overflow-y-scroll hide-scrollbar"
    >
      <Box className="border-bottom border border-1 border-secondary rounded mb-3">
        <Box className="p-2 border-bottom border-secondary">
          <Typography className="h-4 fw-600 color-orange">
            Performance
          </Typography>
        </Box>
        <Box className="p-2">
          <CustomTableComponent
            columns={performanceColumns}
            rows={performanceData}
          />
        </Box>
      </Box>
      <Box className="border-bottom border border-1 border-secondary rounded mb-3">
        <Box className="p-2 border-bottom border-secondary">
          <Typography className="h-4 fw-600 color-orange">Penalties</Typography>
        </Box>
        <Box className="p-2">
          <CustomTableComponent columns={penaltiesColumns} rows={penaltyData} />
        </Box>
      </Box>
      <Box className="border-bottom border border-1 border-secondary rounded ">
        <Box className="p-2 border-bottom border-secondary">
          <Typography className="h-4 fw-600 color-orange">
            Notice Board
          </Typography>
        </Box>
        <Box className="p-2">
          <Typography>notice board</Typography>
        </Box>
      </Box>
    </Paper>
  );
};
export default RevenueSales;
