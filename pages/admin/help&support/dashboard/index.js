/* eslint-disable react/no-unescaped-entities */
import { Box, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import CardComponent from "@/atoms/CardComponent";

const Dashboard = () => {
  const cardsData = [
    {
      cardHeading: "Customers",
      boxColor: "#1492E6",
      totalTickets: 215,
      pendingTickets: 1215,
      recievedTickets: 542,
    },
    {
      cardHeading: "Reseller",
      boxColor: "#FFA800",
      totalTickets: 215,
      pendingTickets: 1215,
      recievedTickets: 542,
    },
    {
      cardHeading: "Suppliers",
      boxColor: "#FF00A2",
      totalTickets: 215,
      pendingTickets: 1215,
      recievedTickets: 542,
    },
  ];

  const returnCards = () => {
    return cardsData.map((val) => {
      return (
        <Grid item xs={3} key={val.boxColor}>
          <CardComponent className="p-2" boxColor={val.boxColor}>
            <Typography sx={{ color: val.boxColor }} className="h-5 fw-bold">
              {val.cardHeading}
            </Typography>
            <Grid container>
              <Grid item xs={8}>
                <Typography className="h-5">Total Active Tickets -</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography className="h-5 fw-bold">
                  {val.totalTickets}{" "}
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography className="h-5">
                  Pending Customer Tickets -
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography className="h-5 fw-bold">
                  {val.pendingTickets}
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography className="h-5">
                  Resolved Customer Tickets -
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography className="h-5 fw-bold">
                  {val.recievedTickets}
                </Typography>
              </Grid>
            </Grid>
          </CardComponent>
        </Grid>
      );
    });
  };

  return (
    <Box>
      <Paper className="mxh-85vh mnh-85vh p-3 overflow-auto hide-scrollbar">
        <Box>
          <Grid container columnSpacing={2}>
            {returnCards()}
          </Grid>
        </Box>
        {/* First container */}
        <Paper className="p-4 ms-2 mt-4">
          <Typography className="fw-bold color-orange mb-3">
            Total Active Tickets (Reseller's)
          </Typography>
          <Box className="d-flex justify-content-around">
            <Box>
              <Typography className="h-5 color-gray fw-bold">
                Total Active Tickets
              </Typography>
              <Typography className="h-3 fw-bold">122</Typography>
            </Box>
            <Box>
              <Typography className="h-5 color-gray fw-bold">
                Total Tickets Resolved
              </Typography>
              <Typography className="h-3 fw-bold">482</Typography>
            </Box>
            <Box>
              <Typography className="h-5 color-gray fw-bold">
                Total Tickets Resolved
              </Typography>
              <Typography className="h-3 fw-bold">132</Typography>
            </Box>
          </Box>
        </Paper>
        {/* Second Container */}
        <Paper className="p-4 ms-2 mt-4">
          <Typography className="fw-bold color-orange mb-3">
            Total Active Tickets pending
          </Typography>

          <Grid
            container
            sx={{ borderBottom: "2px dashed lightgray" }}
            className="d-flex ps-5 justify-content-around pb-3 mb-3"
          >
            <Grid item xs={3}>
              <Typography className="h-5 color-gray fw-bold">
                Order related issue
              </Typography>
              <Typography className="h-3 fw-bold">122</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography className="h-5 color-gray fw-bold">
                Payment & Transaction related issue
              </Typography>
              <Typography className="h-3 fw-bold">482</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography className="h-5 color-gray fw-bold">
                Return & Refund
              </Typography>
              <Typography className="h-3 fw-bold">132</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography className="h-5 color-gray fw-bold">
                Losgistics related issue
              </Typography>
              <Typography className="h-3 fw-bold">165</Typography>
            </Grid>
          </Grid>
          <Grid container className="d-flex ps-5 justify-content-around pb-3">
            <Grid item xs={3}>
              <Typography className="h-5 color-gray fw-bold">
                Cancellation & Refund
              </Typography>
              <Typography className="h-3 fw-bold">122</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography className="h-5 color-gray fw-bold">
                Profile Related issue
              </Typography>
              <Typography className="h-3 fw-bold">482</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography className="h-5 color-gray fw-bold">
                Payment Settlement issue
              </Typography>
              <Typography className="h-3 fw-bold">132</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography className="h-5 color-gray fw-bold">Others</Typography>
              <Typography className="h-3 fw-bold">165</Typography>
            </Grid>
          </Grid>
        </Paper>
        {/* Third Container */}
        <Paper className="p-4 ms-2 mt-4">
          <Typography className="fw-bold color-orange mb-3">
            Customer Tickets (Resolved)
          </Typography>

          <Grid
            container
            sx={{ borderBottom: "2px dashed lightgray" }}
            className="d-flex ps-5 justify-content-around pb-3 mb-3"
          >
            <Grid item xs={3}>
              <Typography className="h-5 color-gray fw-bold">
                Order related issue
              </Typography>
              <Typography className="h-3 fw-bold">122</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography className="h-5 color-gray fw-bold">
                Payment & Transaction related issue
              </Typography>
              <Typography className="h-3 fw-bold">482</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography className="h-5 color-gray fw-bold">
                Return & Refund
              </Typography>
              <Typography className="h-3 fw-bold">132</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography className="h-5 color-gray fw-bold">
                Losgistics related issue
              </Typography>
              <Typography className="h-3 fw-bold">165</Typography>
            </Grid>
          </Grid>
          <Grid container className="d-flex ps-5 justify-content-around pb-3">
            <Grid item xs={3}>
              <Typography className="h-5 color-gray fw-bold">
                Cancellation & Refund
              </Typography>
              <Typography className="h-3 fw-bold">122</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography className="h-5 color-gray fw-bold">
                Profile Related issue
              </Typography>
              <Typography className="h-3 fw-bold">482</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography className="h-5 color-gray fw-bold">
                Payment Settlement issue
              </Typography>
              <Typography className="h-3 fw-bold">132</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography className="h-5 color-gray fw-bold">Others</Typography>
              <Typography className="h-3 fw-bold">165</Typography>
            </Grid>
          </Grid>
        </Paper>
      </Paper>
    </Box>
  );
};

export default Dashboard;
