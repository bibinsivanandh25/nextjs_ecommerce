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
  dashboardCount,
  getAllOrderdelivered,
  getForwardOrder,
  getPaidAmount,
  getReturnedOrder,
} from "services/admin/deliverymanagement/dashboard";
import { PieChart } from "@/atoms/PieChart";
import { getListYear } from "services/utils/yearlistUtils";
import toastify from "services/utils/toastUtils";
import NavTabComponent from "components/molecule/NavTabComponent";

const piedata = [
  {
    label: "Payment to be settle / orders",
    value: 5,
    bgColor: "#FFD42A",
    title: "paymentToBeSettleOrOrders",
  },
  {
    label: "Payment settled / orders",
    value: 3,
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

// const DeliveryDetails = [
//   {
//     title: "Total Forward orders paid to logistics",
//     value: 0,
//     backgroundColor: "#f2f7ff",
//     borderColor: "#bdd5fa",
//     color: "#5500d4",
//     key: "totalForwordOrdersPaidToLogistics",
//   },
//   {
//     title: "Total Return orders paid to logistics",
//     value: 0,
//     backgroundColor: "#fffef8",
//     borderColor: "#ffeeab",
//     color: "#ffd42a",
//     key: "totalReturnOrdersPaidToLogistics",
//   },
//   {
//     title: "Total RTO orders paid to logistics",
//     value: 0,
//     backgroundColor: "#f1fff7",
//     borderColor: "#a6ffca",
//     color: "#00c153",
//     key: "totalRTOPaidToLogistics",
//   },
//   {
//     title: "Total Hand Pick orders ",
//     value: 0,
//     backgroundColor: "#fff7ff",
//     borderColor: "#fccbfc",
//     color: "#ff00ff",
//     key: "totalHandPickOrder",
//   },
//   {
//     title: "Delivered by store owner",
//     value: 0,
//     backgroundColor: "#edfeff",
//     borderColor: "#a2f6fb",
//     color: "#009faa",
//     key: "deliveredByStoreOwner",
//   },
// ];
const GetPieChart = ({
  selectedTab = "",
  setSelectedTab = () => {},
  count = 0,
  handleSelectMonth = () => {},
  handleSelectYear = () => {},
  data = [],
  type = "",
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
      <Typography className="fw-bold">
        Total {type} :{count}
      </Typography>
      <Box className="d-flex justify-content-around align-items-center">
        <Typography>
          <span
            className={`${
              selectedTab === "TODAY" ? "color-blue" : ""
            } cursor-pointer h-p89`}
            onClick={() => {
              onTabFilterClick("TODAY");
            }}
          >
            current day
          </span>
          <span> | </span>
          <span
            className={`${
              selectedTab === "YESTERDAY" ? "color-blue" : ""
            } cursor-pointer h-p89`}
            onClick={() => {
              onTabFilterClick("YESTERDAY");
            }}
          >
            Completed day
          </span>
          <span> | </span>
          <span
            className={`${
              selectedTab === "LAST_SEVEN_DAYS" ? "color-blue" : ""
            } cursor-pointer h-p89`}
            onClick={() => {
              onTabFilterClick("LAST_SEVEN_DAYS");
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
  // const [cardData, setCardData] = useState(DeliveryDetails);

  const [cardData, setCardData] = useState([]);
  const [logisticLink, setlogisticLink] = useState(0);

  // piechart 1
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState("TODAY");
  // total order
  const [totalOrderTab, settotalOrderTab] = useState(null);
  const [totalOrderData, settotalOrderData] = useState([]);
  const [totalOrderMonth, setTotalOrderMonth] = useState({});
  const [totlaOrderYear, setTotalOrderYear] = useState({});
  const [totalOrderCount, settotalOrderCount] = useState(0);
  // paid amount
  const [paidAmountTab, setpaidAmountTab] = useState(null);
  const [paidAmountData, setpaidAmountData] = useState([]);
  const [paidAmountMonth, setpaidAmountMonth] = useState({});
  const [paidAmountYear, setpaidAmountYear] = useState({});
  const [paidAmountCount, setpaidAmountCount] = useState(0);
  // forward orders
  const [forwardTab, setforwardTab] = useState(null);
  const [forwardOrderData, setforwardOrderData] = useState([]);
  const [forwardMonth, setforwardMonth] = useState({});
  const [forwardYear, setforwardYear] = useState({});
  const [forwardCount, setforwardCount] = useState(0);
  // returned order
  const [returnTab, setreturnTab] = useState(null);
  const [returnedData, setreturnedData] = useState([]);
  const [returnMonth, setreturnMonth] = useState({});
  const [returnYear, setreturnYear] = useState({});
  const [returncount, setreturncount] = useState(0);

  const getCardData = async () => {
    const { data, err } = await dashboardCount();
    if (data) {
      setlogisticLink(data.data.amountToBeCollectedFromLogisticsPartners);
      const DeliveryDetails = [
        {
          title: "Total Forward orders paid to logistics",
          value: data.data.totalForwordOrdersPaidToLogistics,
          backgroundColor: "#f2f7ff",
          borderColor: "#bdd5fa",
          color: "#5500d4",
          key: "totalForwordOrdersPaidToLogistics",
        },
        {
          title: "Total Return orders paid to logistics",
          value: data.data.totalReturnOrderedProductsPaidToLogistics,
          backgroundColor: "#fffef8",
          borderColor: "#ffeeab",
          color: "#ffd42a",
          key: "totalReturnOrdersPaidToLogistics",
        },
        {
          title: "Total RTO orders paid to logistics",
          value: data.data.totalRTOPaidToLogistics,
          backgroundColor: "#f1fff7",
          borderColor: "#a6ffca",
          color: "#00c153",
          key: "totalRTOPaidToLogistics",
        },
        {
          title: "Total Hand Pick orders ",
          value: data.data.totalHandPickOrders,
          backgroundColor: "#fff7ff",
          borderColor: "#fccbfc",
          color: "#ff00ff",
          key: "totalHandPickOrder",
        },
        {
          title: "Delivered by store owner",
          value: data.data.deliveryByStoreOwner,
          backgroundColor: "#edfeff",
          borderColor: "#a2f6fb",
          color: "#009faa",
          key: "deliveredByStoreOwner",
        },
      ];
      setCardData(DeliveryDetails);
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };
  const navData = [
    { id: 1, value: "TODAY", title: "Today" },
    { id: 2, value: "YESTERDAY", title: "Yesterday" },
    { id: 3, value: "LAST_SEVEN_DAYS", title: "Last 7 Days" },
  ];

  useEffect(() => {
    getCardData();
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
                : `₹ ${ele?.value?.toLocaleString("en-IN")}`}
            </Typography>
          </Paper>
        </Grid>
      );
    });
  };
  const getTotalOrderData = async () => {
    const payload = {
      filterType: totalOrderTab,
      month: totalOrderTab !== null ? null : totalOrderMonth.id,
      year: totalOrderTab !== null ? null : totlaOrderYear.value,
    };

    const { data, err } = await getAllOrderdelivered(payload);
    if (data) {
      const totalOrdertemp = [
        {
          label: "Payment to be settle / orders",
          value: data.paymentToBeSettleOrOrders,
          bgColor: "#FFD42A",
          title: "paymentToBeSettleOrOrders",
        },
        {
          label: "Payment settled / orders",
          value: data.paymentToBeSettledOrOrders,
          bgColor: "#5500D4",
          title: "paymentToBeSettledOrOrders",
        },
      ];
      settotalOrderData(totalOrdertemp);
      settotalOrderCount(data.totalOrder);
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };
  const getPaidOrderData = async () => {
    const payload = {
      filterType: paidAmountTab,
      month: paidAmountTab !== null ? null : paidAmountMonth.id,
      year: paidAmountTab !== null ? null : paidAmountYear.value,
    };
    const { data, err } = await getPaidAmount(payload);
    if (data) {
      setpaidAmountCount(data.data.totalAmountPaid);
      const temppaid = [
        {
          label: "Forward Orders",
          value: data.data.forwordOrders,
          bgColor: "#FFD42A",
          title: "forwordOrders",
        },
        {
          label: "Returned Orders",
          value: data.data.returnOrders,
          bgColor: "#ff5599",
          title: "returnOrders",
        },
        {
          label: "RTO Orders",
          value: data.data.rtoOrders,
          bgColor: "#5500D4",
          title: "rtoOrders",
        },
        {
          label: "Order Lost In Transsit",
          value: data.data.orderLostInTransit,
          bgColor: "#00d455",
          title: "orderLostInTransit",
        },
        {
          label: "Return Ordered Products",
          value: data.data.returnOrderedProducts,
          bgColor: "#009faa",
          title: "returnOrderedProducts",
        },
      ];
      setpaidAmountData(temppaid);
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };
  const getForwardOrderData = async () => {
    const payload = {
      filterType: forwardTab,
      month: forwardTab !== null ? null : forwardMonth.id,
      year: forwardTab !== null ? null : forwardYear.value,
    };
    const { data, err } = await getForwardOrder(payload);
    if (data) {
      setforwardCount(data.data.totalForwardOrders);
      const tempforward = [
        {
          label: "Pending Approval",
          value: data.data.pendingApproval,
          bgColor: "#FFD42A",
          title: "pendingApproval",
        },
        {
          label: "Picked Up",
          value: data.data.pickedUp,
          bgColor: "#ff5599",
          title: "pickedUp",
        },
        {
          label: "In Commute",
          value: data.data.incommute,
          bgColor: "#5500D4",
          title: "incommute",
        },
        {
          label: "Delivered",
          value: data.data.delivered,
          bgColor: "#00d455",
          title: "delivered",
        },
        {
          label: "RTO",
          value: data.data.rto,
          bgColor: "#009faa",
          title: "rto",
        },
      ];
      setforwardOrderData(tempforward);
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };
  const getreturnedOrderData = async () => {
    const payload = {
      filterType: returnTab,
      month: returnTab !== null ? null : returnMonth.id,
      year: returnTab !== null ? null : returnYear.value,
    };
    const { data, err } = await getReturnedOrder(payload);
    if (data) {
      setreturncount(data.data.totalReturnOrders);
      const returnedtemp = [
        {
          label: "Pending Approval",
          value: data.data.pendingApproval,
          bgColor: "#FFD42A",
          title: "pendingApproval",
        },
        {
          label: "Picked Up",
          value: data.data.pickedUp,
          bgColor: "#ff5599",
          title: "pickedUp",
        },
        {
          label: "In Commute",
          value: data.data.incommute,
          bgColor: "#5500D4",
          title: "incommute",
        },
        {
          label: "Delivered",
          value: data.data.delivered,
          bgColor: "#00d455",
          title: "delivered",
        },
        {
          label: "Total Return Ordered Products",
          value: data.data.totalReturnOrderedProducts,
          bgColor: "#009faa",
          title: "totalReturnOrderedProducts",
        },
      ];
      setreturnedData(returnedtemp);
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };
  useEffect(() => {
    if ((totalOrderMonth.value && totlaOrderYear.value) || totalOrderTab) {
      getTotalOrderData();
    }
  }, [totalOrderMonth, totlaOrderYear, totalOrderTab]);
  useEffect(() => {
    if ((paidAmountMonth.value && paidAmountYear.value) || paidAmountTab) {
      getPaidOrderData();
    }
  }, [paidAmountMonth, paidAmountYear, paidAmountTab]);
  useEffect(() => {
    if ((forwardMonth.value && forwardYear.value) || forwardTab) {
      getForwardOrderData();
    }
  }, [forwardMonth, forwardYear, forwardTab]);
  useEffect(() => {
    if ((returnMonth.value && returnYear.value) || returnTab)
      getreturnedOrderData();
  }, [returnMonth, returnYear, returnTab]);
  return (
    <div className="mt-1">
      <Grid container justifyContent="space-between" spacing={1}>
        {getCards()}
      </Grid>

      <Grid container spacing={2} className="mt-2">
        <Grid container spacing={2} item sm={12}>
          <Grid item sm={6}>
            <GetPieChart
              data={totalOrderData}
              selectedTab={totalOrderTab}
              setSelectedTab={settotalOrderTab}
              // count={100}
              handleSelectMonth={(val) => {
                setTotalOrderMonth(val);
                settotalOrderTab(null);
              }}
              handleSelectYear={(val) => {
                setTotalOrderYear(val);
                settotalOrderTab(null);
              }}
              count={totalOrderCount}
              type="Orders"
            />
          </Grid>
          <Grid item sm={6}>
            <GetPieChart
              data={paidAmountData}
              selectedTab={paidAmountTab}
              setSelectedTab={setpaidAmountTab}
              count={paidAmountCount}
              handleSelectMonth={(val) => {
                setpaidAmountMonth(val);
                setpaidAmountTab(null);
              }}
              handleSelectYear={(val) => {
                setpaidAmountYear(val);
                setpaidAmountTab(null);
              }}
              type="Amount Paid"
            />
          </Grid>
          <Grid item sm={6}>
            <GetPieChart
              data={forwardOrderData}
              selectedTab={forwardTab}
              setSelectedTab={setforwardTab}
              count={forwardCount}
              handleSelectMonth={(val) => {
                setforwardMonth(val);
                setforwardTab(null);
              }}
              handleSelectYear={(val) => {
                setforwardYear(val);
                setforwardTab(null);
              }}
              type="Forward Orders"
            />
          </Grid>
          <Grid item sm={6}>
            <GetPieChart
              data={returnedData}
              selectedTab={returnTab}
              setSelectedTab={setreturnTab}
              count={returncount}
              handleSelectMonth={(val) => {
                setreturnMonth(val);
                setreturnTab(null);
              }}
              handleSelectYear={(val) => {
                setreturnYear(val);
                setreturnTab(null);
              }}
              type="Returned Orders"
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
                &#8377; {logisticLink}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
export default DeliveryDashboard;
