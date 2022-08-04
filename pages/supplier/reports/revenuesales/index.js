import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import Bargraph from "@/atoms/Bar/Bargraph";
import { LineChart } from "@/atoms/Linechart/Linechart";
import SimpleDropdownComponent from "@/atoms/SimpleDropdownComponent";

const cardDatas = [
  {
    id: 1,
    title: "Total Sales",
    count: "15,33,567",
    color: "#e87f28",
  },
  {
    id: 2,
    title: "Total Earnings Through Sales",
    count: "12,03,968",
    color: "#6e86c5",
  },
  {
    id: 1,
    title: "Total Customers",
    count: "33,567",
    color: "#dbdb12",
  },
  {
    id: 1,
    title: "Order Earned Through Referal",
    count: "15,007",
    color: "#76c44e",
  },
  {
    id: 1,
    title: "Total Referral",
    count: "1,067",
    color: "#12dbae",
  },
];

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
const barGraphData = [
  1000, 3000, 5000, 4000, 2000, 7000, 3000, 5000, 900, 1000, 200, 9000,
];
const customerGraphData = [5, 10, 15, 20, 25, 30, 35, 10, 20, 10, 30];

const RevenueSales = () => {
  return (
    <Paper className="w-100 mnh-80vh mxh-80vh overflow-auto hide-scrollbar p-2">
      <Grid container className="h-100" spacing={2}>
        {cardDatas.map((item, index) => (
          <Grid item md={index % 2 == 0 ? 2 : 3} sm={6} xs={12} className="">
            <Box
              sx={{ backgroundColor: `${item.color}` }}
              className="py-3 rounded"
            >
              <Typography className="text-center text-white h-5">
                {item.title}
              </Typography>
              <Typography className="text-center text-white h-3">
                {item.count}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={2} mt={1} className="h-100">
        <Grid item md={6} sm={12}>
          <Paper elevation={3} className="h-100">
            <Typography className="ps-3 py-2 h-5 fw-bold">
              Month Wise Sales
            </Typography>
            <Bargraph
              data={barGraphData}
              labels={barGraphLabels}
              backgroundColor="#1f78b4"
              hoverBackgroundColor="#ea7d30"
            />
          </Paper>
        </Grid>
        <Grid item md={6} sm={12}>
          <Paper elevation={3} className="h-100">
            <Typography className="ps-3 py-2 h-5 fw-bold">
              Referral Created Month Wise
            </Typography>
            <LineChart
              data={barGraphData}
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
              <Grid item sm={9.5} />
              <Grid item sm={2} className="mb-2">
                <SimpleDropdownComponent size="small" />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Bargraph
                data={customerGraphData}
                labels={barGraphLabels}
                backgroundColor="#425568"
                hoverBackgroundColor="#ea7d30"
                barDirection="y"
                height="300px"
                showXAxis={false}
                showGridY={false}
                showDiffColors
                colorOfMax="#EB7C30"
              />
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default RevenueSales;
