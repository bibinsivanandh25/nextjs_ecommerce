/* eslint-disable no-param-reassign */
/* eslint-disable react/no-unescaped-entities */
import { Box, Grid, Paper, Typography } from "@mui/material";
import CardComponent from "@/atoms/CardComponent";
import { useEffect, useState } from "react";
import {
  getDashBoardData,
  getTicketCountsByIssueType,
} from "services/admin/help&support/dashboard";

const Dashboard = () => {
  const [cardsData, setCardsData] = useState([]);
  const [userType, setUserType] = useState("CUSTOMER");
  const [ticketCounts, setTicketCounts] = useState([]);

  const getBoxColors = (type) => {
    if (type === "CUSTOMER") {
      return "#1492E6";
    }
    if (type === "RESELLER") {
      return "#FFA800";
    }
    if (type === "SUPPLIER") {
      return "#FF00A2";
    }
    return null;
  };

  const getCardData = async () => {
    const { data } = await getDashBoardData();
    if (data) {
      const result = [];
      data.forEach((item) => {
        result.push({
          cardHeading: item.userType,
          boxColor: getBoxColors(item.userType),
          totalActiveTickets: item.activeTicketCount,
          pendingTickets: item.pendingTicketCount,
          resolvedTickets: item.closedTicketCount,
          selected: item.userType === "CUSTOMER",
        });
      });
      setCardsData([...result]);
    }
  };

  const getTicketCounts = async () => {
    const { data } = await getTicketCountsByIssueType(userType);
    if (data) {
      setTicketCounts([...data]);
    }
  };

  useEffect(() => {
    getTicketCounts();
  }, [userType]);
  useEffect(() => {
    getCardData();
  }, []);

  const getActiveTickets = () => {
    return cardsData.map((ele) => {
      if (
        ele.cardHeading.toLocaleLowerCase() === userType.toLocaleLowerCase()
      ) {
        return (
          <Paper className="p-4  mt-4">
            <Typography className="fw-bold color-orange mb-3">
              Total Active Tickets (
              {`${ele.cardHeading[0]}${ele.cardHeading
                .slice(1)
                .toLocaleLowerCase()}`}
              )
            </Typography>
            <Box className="d-flex justify-content-between px-5">
              <Box>
                <Typography className="h-5 color-gray fw-bold">
                  Total Active Tickets
                </Typography>
                <Typography className="h-3 fw-bold">
                  {ele.totalActiveTickets}
                </Typography>
              </Box>
              <Box>
                <Typography className="h-5 color-gray fw-bold">
                  Total Tickets Closed
                </Typography>
                <Typography className="h-3 fw-bold">
                  {ele.resolvedTickets}
                </Typography>
              </Box>
              <Box>
                <Typography className="h-5 color-gray fw-bold">
                  Total Tickets UnResolved
                </Typography>
                <Typography className="h-3 fw-bold">
                  {ele.pendingTickets}
                </Typography>
              </Box>
            </Box>
          </Paper>
        );
      }
      return null;
    });
  };

  const renderIssueCountCards = () => {
    let temp = JSON.parse(JSON.stringify(ticketCounts));
    temp = temp.filter(
      (ele) => ele.ticketStatus === "PENDING" || ele.ticketStatus === "CLOSED"
    );
    return temp.map((ele) => {
      return (
        <Paper className="p-4  mt-4">
          <Typography className="fw-bold color-orange mb-3">
            {`${ele.userType[0]}${ele.userType.slice(1).toLocaleLowerCase()} `}
            Tickets (
            {`${ele.ticketStatus[0]}${ele.ticketStatus
              .slice(1)
              .toLocaleLowerCase()}`}
            )
          </Typography>

          <Grid
            container
            sx={{ borderBottom: "2px dashed lightgray" }}
            className="d-flex ps-5 justify-content-between pb-3 mb-3"
          >
            <Grid item xs={3}>
              <Typography className="h-5 color-gray fw-bold">
                Order related issue
              </Typography>
              <Typography className="h-3 fw-bold">
                {ele.orderRelatedIssueCount}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography className="h-5 color-gray fw-bold">
                Payment & Transaction related issue
              </Typography>
              <Typography className="h-3 fw-bold">
                {ele.paymentTransactionRelatedIssue}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography className="h-5 color-gray fw-bold">
                Return & Refund
              </Typography>
              <Typography className="h-3 fw-bold">
                {ele.returnAndRefundCount}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography className="h-5 color-gray fw-bold">
                Logistics related issue
              </Typography>
              <Typography className="h-3 fw-bold">
                {ele.logisticRelatedIssueCount}
              </Typography>
            </Grid>
          </Grid>
          <Grid container className="d-flex ps-5 justify-content-around pb-3">
            <Grid item xs={3}>
              <Typography className="h-5 color-gray fw-bold">
                Cancellation & Refund
              </Typography>
              <Typography className="h-3 fw-bold">
                {ele.cancellationAndRefundCount}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography className="h-5 color-gray fw-bold">
                Profile Related issue
              </Typography>
              <Typography className="h-3 fw-bold">
                {ele.profileRelatedIssueCount}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography className="h-5 color-gray fw-bold">
                Payment Settlement issue
              </Typography>
              <Typography className="h-3 fw-bold">
                {ele.paymentSettlementIssueCount}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography className="h-5 color-gray fw-bold">Others</Typography>
              <Typography className="h-3 fw-bold">{ele.othersCount}</Typography>
            </Grid>
          </Grid>
        </Paper>
      );
    });
  };

  const returnCards = () => {
    return cardsData.map((val, ind) => {
      return (
        <Grid item xs={3.5} key={val.boxColor}>
          <CardComponent
            className="p-2"
            boxColor={val.boxColor}
            onCardClick={() => {
              setUserType(val.cardHeading);
              setCardsData((pre) => {
                const temp = [...pre];
                temp.forEach((ele, i) => {
                  if (i === ind) {
                    ele.selected = true;
                  } else {
                    ele.selected = false;
                  }
                });
                return temp;
              });
            }}
            isSelected={val.selected}
          >
            <Typography
              sx={{ color: val.boxColor }}
              className="h-4 cursor-pointer"
            >
              {`${val.cardHeading[0]}${val.cardHeading
                .slice(1)
                .toLocaleLowerCase()}`}
            </Typography>
            <Grid container>
              <Grid item xs={8} justifyContent="start" display="flex">
                <Typography className="h-5 fw-bold cursor-pointer ">
                  Total Active Tickets
                </Typography>
              </Grid>
              <Grid item xs={1} justifyContent="center" display="flex">
                <Typography className="h-5 fw-bold cursor-pointer ">
                  -
                </Typography>
              </Grid>
              <Grid item xs={3} justifyContent="end" display="flex">
                <Typography className="h-5 fw-bold cursor-pointer ">
                  {val.totalActiveTickets}{" "}
                </Typography>
              </Grid>
              <Grid item xs={8} justifyContent="start" display="flex">
                <Typography className="h-5 fw-bold cursor-pointer">
                  Pending{" "}
                  {`${val.cardHeading[0]}${val.cardHeading
                    .slice(1)
                    .toLocaleLowerCase()}`}{" "}
                  Tickets
                </Typography>
              </Grid>
              <Grid item xs={1} justifyContent="center" display="flex">
                <Typography className="h-5 fw-bold cursor-pointer ">
                  -
                </Typography>
              </Grid>
              <Grid item xs={3} justifyContent="end" display="flex">
                <Typography className="h-5 fw-bold cursor-pointer ">
                  {val.pendingTickets}
                </Typography>
              </Grid>
              <Grid item xs={8} justifyContent="start" display="flex">
                <Typography className="h-5 fw-bold fw-bold cursor-pointer ">
                  Resolved{" "}
                  {`${val.cardHeading[0]}${val.cardHeading
                    .slice(1)
                    .toLocaleLowerCase()}`}{" "}
                  Tickets
                </Typography>
              </Grid>
              <Grid item xs={1} justifyContent="center" display="flex">
                <Typography className="h-5 cursor-pointer fw-bold ">
                  -
                </Typography>
              </Grid>
              <Grid item xs={3} justifyContent="end" display="flex">
                <Typography className="h-5 fw-bold fw-bold cursor-pointer ">
                  {val.resolvedTickets}
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
          <Grid container columnSpacing={6}>
            {returnCards()}
          </Grid>
        </Box>
        {/* First container */}
        {getActiveTickets()}

        {/* Second Container */}
        {renderIssueCountCards()}
      </Paper>
    </Box>
  );
};

export default Dashboard;
