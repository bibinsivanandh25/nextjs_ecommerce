/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getMonthWiseBarChart,
  getMonthWiseChart,
  getPaymentReportCardData,
  getPaymentMonthDetails,
  getSummaryData,
} from "services/supplier/reports/paymentreport";
import { getListYear } from "services/utils/yearlistUtils";
import ReportLayout from "../../../../components/forms/supplier/report/index";

const carddata = [
  {
    label: "Total Payment Amount",
    value: 0,
    background: "#59698b",
    title: "totalPaymentAmount",
  },
  {
    label: "No. of Payments Recieved",
    value: 0,
    background: "#4f98b5",
    title: "noOfPaymentsRecieved",
  },
  {
    label: "Refunded",
    value: 0,
    background: "#d83a56",
    title: "refunded",
  },
  {
    label: "Pending Payments",
    value: 0,
    background: "#053742",
    title: "pendingPayments",
  },
];
const PaymentReports = () => {
  const [cardData, setCardData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
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
  // Table1
  const [monthTable, setMonthTable] = useState([]);
  const [monthCurrentYear, setMonthCurrentYear] = useState({
    value: new Date().getFullYear().toString(),
    label: new Date().getFullYear().toString(),
  });

  // Table 2
  const [summaryTableData, setSummaryTableData] = useState([]);
  const [summaryYear, setSummaryYear] = useState({
    value: new Date().getFullYear().toString(),
    label: new Date().getFullYear().toString(),
  });
  const [summaryStatus, setSummaryStatus] = useState({
    value: "COMPLETED",
    label: "COMPLETED",
  });

  const user = useSelector((state) => state.user);
  const getCardData = async (id) => {
    const { data, err } = await getPaymentReportCardData(id);
    if (data) {
      carddata.forEach((item) => {
        Object.entries(data).forEach((val) => {
          if (item.title === val[0]) {
            item.value = val[1];
          }
        });
      });
      setCardData(carddata);
    }
    if (err) {
      setCardData([]);
    }
  };
  const getBarChartData = async (id, year) => {
    const { data, err } = await getMonthWiseBarChart(id, year);
    if (data) {
      setBarChartData(data);
    }
    if (err) {
      setBarChartData([]);
    }
  };
  const getDoughnutChartData = async (id, year) => {
    const { data, err } = await getMonthWiseChart(id, year);
    if (data) {
      setMonthDoughnutChart(data);
    }
    if (err) {
      setMonthDoughnutChart([]);
    }
  };
  const getMonthWIseTableData = async (id, year) => {
    const { data } = await getPaymentMonthDetails(id, year);
    const temp = [];
    const month = [
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
    if (data) {
      data.forEach((item, index) => {
        temp.push({
          id: index + 1,
          col1: month[index],
          col2: item,
        });
      });
      setMonthTable(temp);
    }
  };
  const mapStateToProps = (data) => {
    const temp = [];
    data.forEach((item) => {
      temp.push({
        col1: item.paymentId,
        col2: item.productName,
        col3: item.customerName,
        col4: item.date,
        col5: item.amount,
        col6: item.status,
      });
    });
    return temp;
  };
  const getSummaryTable = async (id, year, status) => {
    const payload = {
      year,
      status: status === "pending" ? "INITIATED" : status.toUpperCase(),
      orderedStoreOwnerId: id,
    };

    const { data, err } = await getSummaryData(payload);
    if (data) {
      setSummaryTableData(mapStateToProps(data));
    }
    if (err) {
      setSummaryTableData([]);
    }
  };
  useEffect(() => {
    if (user.supplierId && summaryYear.value && summaryStatus.value) {
      getSummaryTable(user.supplierId, summaryYear.value, summaryStatus.value);
    }
  }, [user, summaryYear.value, summaryStatus.value]);
  useEffect(() => {
    if (user.supplierId && monthCurrentYear.value) {
      getMonthWIseTableData(user.supplierId, monthCurrentYear.value);
    }
  }, [user, monthCurrentYear.value]);
  useEffect(() => {
    if (user.supplierId && currentYear.value) {
      getBarChartData(user.supplierId, currentYear.value);
    }
  }, [user, currentYear.value]);
  useEffect(() => {
    if (user.supplierId && doughnutCurrentYear.value) {
      getDoughnutChartData(user.supplierId, doughnutCurrentYear.value);
    }
  }, [user, doughnutCurrentYear.value]);
  useEffect(() => {
    if (user.supplierId) {
      getCardData(user.supplierId);
    }
  }, [user]);
  return (
    <div>
      <ReportLayout
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
        barGraphBackgroundColor="#58698a"
        barGraphHoverBackgroundColor="#4f98b5"
        barGraphData={barChartData}
        monthCurrentYear={monthCurrentYear}
        currentYear={currentYear}
        handleMonthOrderYear={(e) => {
          setCurrentYear({
            value: e.target.value,
            label: e.target.value,
          });
        }}
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
        doughnutCurrentYear={doughnutCurrentYear}
        handleMonthDoghnutOrderYear={(e) => {
          setDoughnutCurrentYear({
            value: e.target.value,
            label: e.target.value,
          });
        }}
        detailSelectList={getListYear()}
        handleMonthTableYear={(e) => {
          setMonthCurrentYear({
            value: e.target.value,
            label: e.target.value,
          });
        }}
        Detailcolumns={[
          {
            id: "col1", // id value in column should be presented in row as key
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
        detailMenuList={["Sort By Sale Count", "Sort By Month", "Download"]}
        summaryMenuList={["Sort By Price", "Sort By Date", "Download"]}
        summaryStatusList={[
          {
            id: 1,
            value: "COMPLETED",
            label: "completed",
          },
          {
            id: 2,
            value: "INITIATED",
            label: "pending",
          },
          {
            id: 3,
            value: "REFUNDED",
            label: "refunded",
          },
          {
            id: 4,
            value: "CANCELLED",
            label: "cancelled",
          },
        ]}
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
        summaryRows={[...summaryTableData]}
        cardDetails={cardData}
        cardLabel="Month Wise Payment"
        tableLabel1="Month Wise Payment Details"
        tableLabel2="Payment Summary"
      />
    </div>
  );
};
export default PaymentReports;
