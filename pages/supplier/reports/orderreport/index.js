/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
import ReportLayout from "components/forms/supplier/report";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  getOrderChartData,
  getOrderReportCardData,
  getSummaryTableData,
} from "services/supplier/reports/orderreport";
import { getListYear } from "services/utils/yearlistUtils";

const cardDetails = [
  {
    title: "totalOrders",
    label: "Total Orders",
    value: 0,
    background: "#e98129",
  },
  {
    title: "ordersCompleted",
    label: "Orders Completed",
    value: 0,
    background: "#76c44e",
  },
  {
    title: "ordersCancelled",
    label: "Orders Cancelled",
    value: 0,
    background: "#f13e22",
  },
  {
    title: "ordersPending",
    label: "Orders Pending",
    value: 0,
    background: "#83b2f1",
  },
];
const OrderReport = () => {
  const user = useSelector((state) => state.user);
  const [cardData, setCardData] = useState([]);
  // Bar chart
  const [monthBarChart, setMonthBarChart] = useState([]);
  const [currentYear, setCurrentYear] = useState({
    value: new Date().getFullYear().toString(),
    label: new Date().getFullYear().toString(),
  });
  // Doughnut chart
  const [monthDoughnutChart, setMonthDoughnutChart] = useState([]);
  const [doughnutCurrentYear, setDoughnutCurrentYear] = useState({
    value: new Date().getFullYear().toString(),
    label: new Date().getFullYear().toString(),
  });
  // first table
  const [monthTable, setMonthTable] = useState([]);
  const [monthCurrentYear, setMonthCurrentYear] = useState({
    value: new Date().getFullYear().toString(),
    label: new Date().getFullYear().toString(),
  });
  const [summaryTableData, setSummaryTableData] = useState([]);
  const [summaryYear, setSummaryYear] = useState({
    value: new Date().getFullYear().toString(),
    label: new Date().getFullYear().toString(),
  });
  const [summaryStatus, setSummaryStatus] = useState({
    value: "COMPLETED",
    label: "COMPLETED",
  });
  const getCardData = async () => {
    const { data } = await getOrderReportCardData(user.supplierId);
    if (data) {
      cardDetails.forEach((item) => {
        Object.entries(data).forEach((val) => {
          if (item.title === val[0]) {
            item.value = val[1];
          }
        });
      });
      setCardData(cardDetails);
    } else {
      setCardData(cardDetails);
    }
  };
  // Bar Chart
  const getChartData = async (year) => {
    const { data } = await getOrderChartData(user.supplierId, year);
    if (data) {
      setMonthBarChart(data);
    } else {
      setMonthBarChart([]);
    }
  };
  useEffect(() => {
    getChartData(currentYear.value);
  }, [currentYear.value]);
  // doughnutchart
  const getDoughnutChartData = async (year) => {
    const { data } = await getOrderChartData(user.supplierId, year);
    if (data) {
      setMonthDoughnutChart(data);
    } else {
      setMonthDoughnutChart([]);
    }
  };
  useEffect(() => {
    getDoughnutChartData(doughnutCurrentYear.value);
  }, [doughnutCurrentYear.value]);
  // first Table
  const getMonthTableData = async (year) => {
    const { data } = await getOrderChartData(user.supplierId, year);
    if (data) {
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const temp = [];
      monthNames.forEach((item, index) => {
        data.forEach((value, ind) => {
          if (index === ind) {
            temp.push({
              id: index + 1,
              col1: item,
              col2: value,
            });
          }
        });
      });
      setMonthTable(temp);
    } else {
      setMonthTable([]);
    }
  };
  const getTableRows = (data) => {
    const result = [];
    if (data) {
      data.forEach((item) => {
        result.push({
          id: item.orderId,
          col1: item.orderId,
          col2: item.productName,
          col3: item.customerName,
          col4: item.orderDate,
          col5: item.orderAmount,
          col6: item.orderStatus,
        });
      });
    }
    return result;
  };
  const getSummaryTable = async (year, page, status) => {
    const { data } = await getSummaryTableData(
      user.supplierId,
      year,
      page,
      status.toUpperCase()
    );
    if (data) {
      setSummaryTableData(getTableRows(data));
    }
  };
  useEffect(() => {
    getSummaryTable(summaryYear.value, 0, summaryStatus.value);
  }, [summaryYear.value, summaryStatus.value]);
  useEffect(() => {
    getMonthTableData(monthCurrentYear.value);
  }, [monthCurrentYear.value]);
  useEffect(() => {
    getCardData();
  }, []);
  return (
    <>
      <ReportLayout
        barChartDataSet="Orders"
        barGraphLabels={[
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
        ]}
        barGraphData={monthBarChart}
        doughnutLabels={[
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
        ]}
        doughnutData={monthDoughnutChart}
        detailSelectList={getListYear()}
        detailMenuList={["Sort By Sale Count", "Sort By Date", "Download"]}
        handleMonthTableYear={(e) => {
          setMonthCurrentYear({
            value: e.target.value,
            label: e.target.value,
          });
        }}
        monthCurrentYear={monthCurrentYear}
        currentYear={currentYear}
        handleMonthOrderYear={(e) => {
          setCurrentYear({
            value: e.target.value,
            label: e.target.value,
          });
        }}
        doughnutCurrentYear={doughnutCurrentYear}
        handleMonthDoghnutOrderYear={(e) => {
          setDoughnutCurrentYear({
            value: e.target.value,
            label: e.target.value,
          });
        }}
        summaryMenuList={["Sort By Price", "Sort By Date", "Download"]}
        summaryStatusList={[
          {
            value: "completed",
            label: "completed",
          },
          {
            value: "pending",
            label: "pending",
          },
          {
            value: "refunded",
            label: "refunded",
          },
          {
            value: "cancelled",
            label: "cancelled",
          },
        ]}
        Detailcolumns={[
          {
            id: "col1", //  id value in column should be presented in row as key
            label: "Date",
            minWidth: 100,
            align: "center",
            data_align: "center",
            data_classname: "",
          },
          {
            id: "col2",
            label: "No. of Sales",
            minWidth: 100,
            align: "center",
            data_align: "center",
            data_classname: "",
          },
        ]}
        Detailrows={[...monthTable]}
        summaryYear={summaryYear}
        handleSummaryYear={(e) => {
          setSummaryYear({
            value: e.target.value,
            label: e.target.value,
          });
        }}
        summaryStatus={summaryStatus}
        handleSummaryStatus={(e) => {
          setSummaryStatus({
            value: e.target.value,
            label: e.target.value,
          });
        }}
        summaryColumns={[
          {
            id: "col1",
            label: "Payment ID",
            minWidth: 100,
            align: "center",
            data_align: "center",
            data_classname: "",
          },
          {
            id: "col1",
            label: "Product",
            minWidth: 100,
            align: "center",
            data_align: "center",
            data_classname: "",
          },
          {
            id: "col3",
            label: "Customer",
            minWidth: 100,
            align: "center",
            data_align: "center",
            data_classname: "",
          },
          {
            id: "col4",
            label: "Date",
            minWidth: 100,
            align: "center",
            data_align: "center",
            data_classname: "",
          },
          {
            id: "col5",
            label: "Amount",
            minWidth: 100,
            align: "center",
            data_align: "center",
            data_classname: "",
          },
          {
            id: "col6",
            label: "Status",
            minWidth: 100,
            align: "center",
            data_align: "center",
            data_classname: "",
          },
        ]}
        summaryRows={[...summaryTableData]}
        cardDetails={[...cardData]}
        barGraphHoverBackgroundColor="#4f98b5"
        barGraphBackgroundColor="#1f78b4"
        cardLabel="Month Wise Orders"
        tableLabel1="Month Wise Order Details"
        tableLabel2="Order Summary"
      />
    </>
  );
};
export default OrderReport;
