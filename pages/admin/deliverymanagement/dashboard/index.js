/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
import { Box, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useLayoutEffect, useState } from "react";
import SelectComponent from "@/atoms/SelectComponent";
import Bargraph from "@/atoms/Bar/Bargraph";
import {
  getAllOrderdelivered,
  getAlldeliveryManagementCard,
} from "services/admin/deliverymanagement/dashboard";
import { PieChart } from "@/atoms/PieChart";
import { getListYear } from "services/utils/yearlistUtils";

const piedata = [
  {
    label: "Payment to be settle / orders",
    value: 0,
    bgColor: "#FFD42A",
    title: "paymentToBeSettleOrOrders",
  },
  {
    label: "Payment settled / orders",
    value: 0,
    bgColor: "#5500D4",
    title: "paymentToBeSettledOrOrders",
  },
];
const months = [
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

const DeliveryDetails = [
  {
    title: "Total Forward orders paid to logistics",
    value: 0,
    backgroundColor: "#f2f7ff",
    borderColor: "#bdd5fa",
    color: "#5500d4",
    key: "totalForwordOrdersPaidToLogistics",
  },
  {
    title: "Total Return orders paid to logistics",
    value: 0,
    backgroundColor: "#fffef8",
    borderColor: "#ffeeab",
    color: "#ffd42a",
    key: "totalReturnOrdersPaidToLogistics",
  },
  {
    title: "Total RTO orders paid to logistics",
    value: 0,
    backgroundColor: "#f1fff7",
    borderColor: "#a6ffca",
    color: "#00c153",
    key: "totalRTOPaidToLogistics",
  },
  {
    title: "Total Hand Pick orders ",
    value: 0,
    backgroundColor: "#fff7ff",
    borderColor: "#fccbfc",
    color: "#ff00ff",
    key: "totalHandPickOrder",
  },
  {
    title: "Delivered by store owner",
    value: 0,
    backgroundColor: "#edfeff",
    borderColor: "#a2f6fb",
    color: "#009faa",
    key: "deliveredByStoreOwner",
  },
];
const GetPieChart = ({
  selectedTab = "",
  setSelectedTab = () => {},
  count = "",
  handleSelectMonth = () => {},
  handleSelectYear = () => {},
  data = [],
}) => {
  useLayoutEffect(() => {
    handleSelectYear({
      value: new Date().getFullYear().toString(),
      label: new Date().getFullYear().toString(),
    });
    handleSelectMonth({
      id: new Date().getMonth(),
      value: monthsList[new Date().getMonth()].label,
    });
  }, []);
  const [selectedMonth, setSelectedMonth] = useState({
    id: new Date().getMonth(),
    value: monthsList[new Date().getMonth()].label,
  });
  const [selectedYear, setSelectedYear] = useState({
    value: new Date().getFullYear().toString(),
    label: new Date().getFullYear().toString(),
  });
  const onTabFilterClick = (val) => {
    setSelectedTab(val);
  };
  const handleYearSelection = (e) => {
    setSelectedYear({
      value: e.target.value,
      label: e.target.value,
    });
    handleSelectYear({
      value: e.target.value,
      label: e.target.value,
    });
  };
  const handleMonthSelection = (e) => {
    const ind = monthsList.findIndex((ele) => ele.label === e.target.value);
    setSelectedMonth({
      id: ind,
      value: e.target.value,
    });
    handleSelectMonth({ id: ind, value: e.target.value });
  };
  return (
    <Paper className="p-2 h-100">
      <Typography className="fw-bold">Total Orders : {count}</Typography>
      <Box className="d-flex justify-content-between align-items-center">
        <Typography>
          <span
            className={`${
              selectedTab === "currentDay" ? "color-blue" : ""
            } cursor-pointer h-p89`}
            onClick={() => {
              onTabFilterClick("currentDay");
            }}
          >
            current day
          </span>
          <span> | </span>
          <span
            className={`${
              selectedTab === "completedDay" ? "color-blue" : ""
            } cursor-pointer h-p89`}
            onClick={() => {
              onTabFilterClick("completedDay");
            }}
          >
            Completed day
          </span>
          <span> | </span>
          <span
            className={`${
              selectedTab === "week" ? "color-blue" : ""
            } cursor-pointer h-p89`}
            onClick={() => {
              onTabFilterClick("week");
            }}
          >
            Week
          </span>
        </Typography>
        <SelectComponent
          value={selectedMonth.value}
          list={monthsList}
          className="border rounded-1 px-1"
          onChange={(e) => {
            handleMonthSelection(e);
          }}
        />
        <SelectComponent
          value={selectedYear.value}
          list={getListYear()}
          className="border rounded-1 px-1"
          onChange={(e) => {
            handleYearSelection(e);
          }}
        />
      </Box>
      <Box>
        <PieChart data={data} />
      </Box>
    </Paper>
  );
};
const DeliveryDashboard = () => {
  const [cardData, setCardData] = useState([...DeliveryDetails]);
  const [piechartData, setPieChartData] = useState([...piedata]);
  // piechart 1
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState("currentDay");
  const [totalOrderMonth, setTotalOrderMonth] = useState({});
  const [totlaOrderYear, setTotalOrderYear] = useState({});
  console.log(totalOrderMonth, "totlaOrderMonth");
  console.log(totlaOrderYear, "totlaOrderYear");

  const getAllCardData = async () => {
    const payload = {
      filterType: "type1",
      month: null,
      year: null,
    };
    const { data, err } = await getAlldeliveryManagementCard(payload);
    if (data) {
      setTotalAmount(data.amountToBeCollectedFromLogisticsPartners);
      const temp = JSON.parse(JSON.stringify(DeliveryDetails));
      temp.forEach((item) => {
        Object.entries(data).forEach((val) => {
          if (item.key === val[0]) {
            item.value = val[1];
          }
        });
      });
      setCardData(temp);
    }
    if (err) {
      setTotalAmount(0);
      setCardData(DeliveryDetails);
    }
  };
  useEffect(() => {
    getAllCardData();
  }, []);
  const getCards = () => {
    return cardData.map((ele) => {
      return (
        <Grid item lg={2.4} md={3} sm={4} xs={6}>
          <Paper
            className="px-3 mnh-100 d-flex flex-column justify-content-between"
            sx={{
              background: ele.backgroundColor,
              border: `1px solid ${ele.borderColor}`,
            }}
          >
            <Typography className="text-center h-5 fw-bold">
              {ele.title}
            </Typography>
            <Typography
              className="fw-bold h-1 text-center"
              sx={{
                color: ele.color,
              }}
            >
              {ele.key == "totalHandPickOrder" ||
              ele.key == "deliveredByStoreOwner"
                ? ele.value.toLocaleString("en-IN")
                : `₹ ${ele.value.toLocaleString("en-IN")}`}
            </Typography>
          </Paper>
        </Grid>
      );
    });
  };
  const getTotalOrderData = async (month, year, filter) => {
    const payload = {};
    const { data, err } = await getAllOrderdelivered();
  };
  useEffect(() => {
    if (totalOrderMonth.value && totlaOrderYear.value && selectedFilter) {
      getTotalOrderData();
    }
  }, [totalOrderMonth]);
  return (
    <div className="mt-1">
      <Grid container justifyContent="space-between" spacing={1}>
        {getCards()}
      </Grid>
      <Grid container spacing={2} className="mt-2">
        <Grid container spacing={2} item sm={12}>
          <Grid item sm={6}>
            <GetPieChart
              data={piechartData}
              selectedTab={selectedFilter}
              setSelectedTab={setSelectedFilter}
              count={100}
              handleSelectMonth={(val) => {
                setTotalOrderMonth(val);
              }}
              handleSelectYear={(val) => {
                setTotalOrderYear(val);
              }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} item sm={12}>
          <Grid item sm={12} md={6}>
            <Paper className="p-2">
              <Box className="d-flex justify-content-between align-items-center">
                <Typography>current and completed day</Typography>
                <Typography>
                  <span>current day</span>
                  <span>|</span>
                  <span>week</span>
                </Typography>
                <SelectComponent
                  list={monthsList}
                  className="border rounded-1 px-1"
                />
                <SelectComponent className="border rounded-1 px-1" />
                <SelectComponent className="border rounded-1 px-1" />
              </Box>
              <Bargraph
                data={[100, 120, 130, 100, 130, 120, 150, 160, 179]}
                labels={[
                  "12am",
                  "12am",
                  "12am",
                  "12am",
                  "12am",
                  "12am",
                  "12am",
                ]}
                showGridY={false}
                backgroundColor="#444b66"
                hoverBackgroundColor="#e56700"
              />
            </Paper>
          </Grid>
          <Grid item sm={12} md={6}>
            <Paper className="p-2 bg-light-orange2 h-100 d-flex flex-column justify-content-center border-light-orange">
              <Typography className="text-center fs-3 my-2">
                Amount to be collected
              </Typography>
              <Typography className="text-center fs-3">
                from logistics partners
              </Typography>
              <Typography className="text-center color-orange h-5 fst-italic my-2">
                Lost in transit / Other
              </Typography>
              <Typography className="text-center color-orange fs-1 fw-600">
                &#8377; {totalAmount.toLocaleString("en-IN")}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
export default DeliveryDashboard;
