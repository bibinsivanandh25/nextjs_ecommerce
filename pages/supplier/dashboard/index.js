/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */

import React, { useEffect, useState } from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import {
  getAllDashboardData,
  getCustomerChartData,
  getMonthWiseSale,
  getReferralChartData,
} from "services/supplier/dashboard";
import Bargraph from "@/atoms/Bar/Bargraph";
import { LineChart } from "@/atoms/Linechart/Linechart";
import SelectComponent from "@/atoms/SelectComponent";
import { getListYear } from "services/utils/yearlistUtils";

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

const cardDatas = [
  {
    id: 1,
    label: "totalOrders",
    title: "Total Orders",
    count: 0,
    color: "#e87f28",
  },
  {
    id: 2,
    label: "totalSalesValue",
    title: "Total Sales Value",
    count: 0,
    color: "#6e86c5",
  },
  {
    id: 3,
    label: "totalCustomers",
    title: "Total Customers",
    count: 0,
    color: "#dbdb12",
  },
  {
    id: 4,
    label: "totalFreeOrders",
    title: "Free Orders Earned Through Referrals",
    count: 0,
    color: "#76c44e",
  },
  {
    id: 5,
    label: "totalReferrals",
    title: "Total Referrals",
    count: 0,
    color: "#12dbae",
  },
];
const Dashboard = () => {
  const user = useSelector((state) => state.user);
  const [masterCardData, setMasterCardData] = useState([]);
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
      setMasterCardData(cardDatas);
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
    }
  };
  const handleMonthWiseSale = async () => {
    const { data, err } = await getMonthWiseSale(
      user.supplierId,
      currentYear.value
    );
    if (data) {
      setMonthWiseSaleData(data);
    }
    if (err) {
      setMonthWiseSaleData([]);
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
    getMasterCardData();
  }, [user]);
  return (
    <div>
      <Paper className="w-100 mnh-85vh mxh-85vh overflow-auto hide-scrollbar p-2">
        <Grid container className="" gap={0.5}>
          {masterCardData
            ? masterCardData?.map((item, index) => (
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
              ))
            : null}
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
                    list={getListYear()}
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
                data={monthWiseSaleData}
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
                    list={getListYear()}
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
                    list={getListYear()}
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
    </div>
  );
};

export default Dashboard;
