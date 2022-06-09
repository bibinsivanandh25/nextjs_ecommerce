/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import { Button, Grid, Paper, Typography } from "@mui/material";
import Bargraph from "components/atoms/Bar/Bargraph";
import { LineChart } from "components/atoms/Linechart/Linechart";
import SelectComponent from "components/atoms/SelectComponent";
import TableComponent from "components/atoms/TableComponent";
import { useState } from "react";

const ResellerDashboardLayout = ({
  barGraphLabels = [],
  barGraphData = [],
  detailSelectList = [],
  Detailcolumns = [],
  Detailrows = [],
  cardDetails = [],
  barGraphBackgroundColor = "",
  barGraphHoverBackgroundColor = "",
  customerGraphData = [],
}) => {
  const [tableRows, setTableRows] = useState([...Detailrows]);
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

  const monthsList = months.map((val, ind) => ({
    id: ind,
    label: val,
    value: ind,
  }));

  const getCount = () => {
    const res = customerGraphData.reduce((a, b) => (a += b));
    return res;
  };

  const getCardDetails = () => {
    return cardDetails.map((ele, ind) => {
      return (
        <>
          <Grid className="" item xs={ind === 2 || ind === 1 ? 3 : 2} key={ind}>
            <Paper
              className="px-3 py-2"
              sx={{
                backgroundColor: ele.background,
                color: "white",
              }}
            >
              <Typography className="fs-12" align="center">
                {ele.label}
              </Typography>
              <Typography className="fs-2" align="center">
                {ele.value}
              </Typography>
            </Paper>
          </Grid>
        </>
      );
    });
  };
  return (
    <Grid>
      <Grid container spacing={3}>
        {getCardDetails()}
      </Grid>
      <Grid container spacing={3} className="mt-2">
        <Grid item xs={6}>
          <Paper className="">
            <p className="fs-12 fw-bold px-4 pt-2">Month Wise Sales</p>
            <Bargraph
              data={barGraphData}
              labels={barGraphLabels}
              backgroundColor={barGraphBackgroundColor}
              hoverBackgroundColor={barGraphHoverBackgroundColor}
            />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className="h-100">
            <p className="fs-12 fw-bold px-4 pt-2 ">
              Referrals Created Month Wise
            </p>
            <Grid className="mt-5 w-100">
              <LineChart
                data={barGraphData}
                labels={barGraphLabels}
                showYAxis={false}
                lineColor="#1F78B4"
              />
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={3} className="mt-2">
        <Grid item xs={5}>
          <Paper sx={{ p: 2 }}>
            <Grid className="d-flex align-items-center">
              <Grid className="fs-12 fw-bold px-2 mt-3">Top 10 Referres</Grid>
              <Grid className="ms-auto">
                <SelectComponent disableUnderline list={monthsList} />
                <SelectComponent disableUnderline list={detailSelectList} />
              </Grid>
            </Grid>
            <TableComponent
              showSearchFilter={false}
              showSearchbar={false}
              columns={[...Detailcolumns]}
              tableRows={[...tableRows]}
              showCheckbox={false}
              showPagination={false}
            />
            <div className="mt-3 d-flex justify-content-center">
              <Button
                variant="undefined"
                size="small"
                sx={{ textTransform: "none" }}
                className="color-orange"
              >
                Show More
              </Button>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={7}>
          <Paper sx={{ py: 1, px: 4 }}>
            <Bargraph
              data={customerGraphData}
              labels={barGraphLabels}
              backgroundColor="#425568"
              hoverBackgroundColor={barGraphHoverBackgroundColor}
              barDirection="y"
              height="300px"
              showXAxis={false}
              showGridY={false}
              showDiffColors
              colorOfMax="#EB7C30"
            />
            <Typography align="center" py={2} fontWeight="bold">
              Total Customers: {getCount()}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default ResellerDashboardLayout;
