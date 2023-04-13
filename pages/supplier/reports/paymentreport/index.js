/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
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
  const [pageNumber, setPageNumber] = useState(0);

  // const user = useSelector((state) => state.user);
  const getCardData = async () => {
    const { data, err } = await getPaymentReportCardData();
    const temp = {
      totalPaymentAmount: "9008982",
      noOfPaymentsRecieved: "29000",
      refunded: "930",
      pendingPayments: "690",
    };
    carddata.forEach((item) => {
      Object.entries(temp).forEach((val) => {
        if (item.title === val[0]) {
          item.value = val[1];
        }
      });
    });
    setCardData(carddata);
    if (data) {
      console.log(data);
    }
    if (err) {
      console.log(err, "err");
    }
  };
  const getBarChartData = async (year) => {
    console.log(year, "year");
    const { data, err } = await getMonthWiseBarChart(year);
    const chart = [
      442.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
    ];
    setBarChartData(chart);
    console.log(data, err);
  };
  const getDoughnutChartData = async (year) => {
    const { data, err } = await getMonthWiseChart(year);
    const chart = [
      50.0, 0.0, 20.0, 0.0, 0.0, 20.0, 0.0, 0.0, 0.0, 0.0, 10.0, 0.0,
    ];
    setMonthDoughnutChart(chart);
    console.log(data, err);
  };
  const getMonthWIseTableData = async (year) => {
    const { data } = await getPaymentMonthDetails(year);
    console.log(data, "data");
    const tableData = [0, 12, 34, 1, 4, 5, 13, 43, 55, 10, 11, 12];
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
    tableData.forEach((item, index) => {
      temp.push({
        id: index + 1,
        col1: month[index],
        col2: item,
      });
    });
    setMonthTable(temp);
  };
  const mapStateToProps = (data) => {
    const temp = [];
    data.forEach((item, index) => {
      temp.push({
        id: index + 1,
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
  const getSummaryTable = async (year, page, status) => {
    const payload = {
      year,
      status: status.toUpperCase(),
      filterType: "date",
      pageSize: 10,
      pageCount: page,
    };

    const { data } = await getSummaryData(payload);
    console.log(data, "data");
    const Data = [
      {
        paymentId: "123",
        productName: "Product A",
        customerName: "John Doe",
        date: "29 Mar 2022",
        amount: 100.0,
        status: "paid",
      },
      {
        paymentId: "124",
        productName: "Product D",
        customerName: "Doe",
        date: "12 Mar 2022",
        amount: 400.0,
        status: "paid",
      },
      {
        paymentId: "124",
        productName: "Product D",
        customerName: "Doe",
        date: "12 Mar 2022",
        amount: 400.0,
        status: "paid",
      },
      {
        paymentId: "124",
        productName: "Product D",
        customerName: "Doe",
        date: "12 Mar 2022",
        amount: 400.0,
        status: "paid",
      },
      {
        paymentId: "124",
        productName: "Product D",
        customerName: "Doe",
        date: "12 Mar 2022",
        amount: 400.0,
        status: "paid",
      },
      {
        paymentId: "124",
        productName: "Product D",
        customerName: "Doe",
        date: "12 Mar 2022",
        amount: 400.0,
        status: "paid",
      },
      {
        paymentId: "124",
        productName: "Product D",
        customerName: "Doe",
        date: "12 Mar 2022",
        amount: 400.0,
        status: "paid",
      },
      {
        paymentId: "124",
        productName: "Product D",
        customerName: "Doe",
        date: "12 Mar 2022",
        amount: 400.0,
        status: "paid",
      },
      {
        paymentId: "124",
        productName: "Product D",
        customerName: "Doe",
        date: "12 Mar 2022",
        amount: 400.0,
        status: "paid",
      },
    ];
    if (page === 0) {
      setPageNumber(1);
      setSummaryTableData(mapStateToProps(Data));
    }
    if (page !== 0) {
      setPageNumber((pre) => pre + 1);
      setSummaryTableData((pre) => [...pre, ...mapStateToProps(Data)]);
    }
  };
  useEffect(() => {
    getSummaryTable(summaryYear.value, 0, summaryStatus.value);
  }, [summaryYear.value, summaryStatus.value]);
  useEffect(() => {
    getMonthWIseTableData(monthCurrentYear.value);
  }, [monthCurrentYear.value]);
  useEffect(() => {
    getBarChartData(currentYear.value);
  }, [currentYear.value]);
  useEffect(() => {
    getDoughnutChartData(doughnutCurrentYear.value);
  }, [doughnutCurrentYear.value]);
  useEffect(() => {
    getCardData();
  }, []);
  return (
    <div>
      <ReportLayout
        handleSummaryPageEnd={(_searchText, _filterText, page = pageNumber) => {
          getSummaryTable(summaryYear.value, page, summaryStatus.value);
        }}
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
        detailMenuList={["Sort By Sale Count", "Sort By Date", "Download"]}
        summaryMenuList={["Sort By Price", "Sort By Date", "Download"]}
        summaryStatusList={[
          {
            id: 1,
            value: "completed",
            label: "completed",
          },
          {
            id: 2,
            value: "pending",
            label: "pending",
          },
          {
            id: 3,
            value: "refunded",
            label: "refunded",
          },
          {
            id: 4,
            value: "cancelled",
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
