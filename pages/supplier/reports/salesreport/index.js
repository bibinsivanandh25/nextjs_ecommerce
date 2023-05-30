/* eslint-disable no-param-reassign */
import ReportLayout from "components/forms/supplier/report";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getSalesCardData,
  getSalesBarChartData,
  getSalesPieChartData,
  getSalesMonthWise,
  getSalesMonthWiseSummary,
  getSalesCurrentDayWise,
  getSalesCurrentDayWiseSummary,
} from "services/supplier/reports/salesreport";
import { getListYear } from "services/utils/yearlistUtils";

const cardDetails = [
  {
    title: "netRevenue",
    label: "Net Revenue",
    value: 0,
    background: "#19b79c",
  },
  {
    title: "noOfCustomer",
    label: "No. of Customer",
    value: 0,
    background: "#198674",
  },
  {
    title: "revenueToday",
    label: "Revenue Today",
    value: 0,
    background: "#f58634",
  },
  {
    title: "ordersPlacedToday",
    label: "Orders Placed Today",
    value: 0,
    background: "#ffcc29",
  },
];

const SalesReport = () => {
  const user = useSelector((state) => state.user);
  const [cardData, setCardData] = useState([]);

  // Bar Chart
  const [monthBarChart, setMonthBarChart] = useState([]);
  const [currentYear, setCurrentYear] = useState({
    value: new Date().getFullYear().toString(),
    label: new Date().getFullYear().toString(),
  });

  // Pie Chart
  const [monthPieChart, setMonthPieChart] = useState([]);
  const [pieChartCurrentYear, setPieChartCurrentYear] = useState({
    value: new Date().getFullYear().toString(),
    label: new Date().getFullYear().toString(),
  });

  // table 1
  const [monthTable, setMonthTable] = useState([]);
  const [monthCurrentYear, setMonthCurrentYear] = useState({
    value: new Date().getFullYear().toString(),
    label: new Date().getFullYear().toString(),
  });

  // table 2
  const [pageNumber, setPageNumber] = useState(0);
  const [summaryTableData, setSummaryTableData] = useState([]);
  const [summaryYear, setSummaryYear] = useState({
    value: new Date().getFullYear().toString(),
    label: new Date().getFullYear().toString(),
  });

  const [summaryStatus, setSummaryStatus] = useState({
    value: "COMPLETED",
    label: "COMPLETED",
  });

  // table 3
  const [currentData, setCurrentData] = useState([]);
  const [currentSaleYear, setCurrentSaleYear] = useState({
    value: new Date().getFullYear().toString(),
    label: new Date().getFullYear().toString(),
  });

  // table 4

  const [summaryTableDayData, setSummaryTableDayData] = useState([]);
  const [daySummaryYear, setDaySummaryYear] = useState({
    value: new Date().getFullYear().toString(),
    label: new Date().getFullYear().toString(),
  });

  const getCardData = async () => {
    const { data } = await getSalesCardData(user.supplierId);
    if (data) {
      cardDetails.forEach((item) => {
        Object.entries(data).forEach((val) => {
          const [title, value] = val;
          if (item.title === title) {
            item.value = value;
          }
        });
      });
      setCardData(cardDetails);
    } else {
      setCardData(cardDetails);
    }
  };

  // Bar Chart
  const getBarChartData = async (year) => {
    const { data } = await getSalesBarChartData(year, user.supplierId);
    if (data) {
      setMonthBarChart(data);
    } else {
      setMonthBarChart([]);
    }
  };

  // Pie Chart
  const getPieChartData = async (year) => {
    const { data } = await getSalesPieChartData(year, user.supplierId);
    if (data) {
      setMonthPieChart(data);
    } else {
      setMonthPieChart([]);
    }
  };

  // table 1
  const getMonthWiseSalesTableData = async (year) => {
    const { data } = await getSalesMonthWise(year, user.supplierId);
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

  // table 2

  const getTableRows = (data) => {
    const result = [];
    if (data) {
      data.forEach((item) => {
        result.push({
          id: item.paymentId,
          col1: item.paymentId,
          col2: item.productName,
          col3: item.customerName,
          col4: item.date,
          col5: item.amount,
          col6: item.status,
        });
      });
    }
    return result;
  };

  const getMonthWiseSummaryTable = async (year, page = pageNumber, status) => {
    const payload = {
      year,
      status: status === "pending" ? "INITIATED" : status.toUpperCase(),
      orderedStoreOwnerId: user.supplierId,
      pageNumber: page,
      pageSize: 50,
    };
    const { data } = await getSalesMonthWiseSummary(payload);
    if (data && pageNumber == 0) {
      setSummaryTableData(getTableRows(data));
      setPageNumber(1);
    } else if (data?.length && pageNumber !== 0) {
      setPageNumber((pre) => pre + 1);
      setSummaryTableData((pre) => [...pre, ...getTableRows(data)]);
    }
  };

  // table 3

  const currentDayData = async () => {
    const { data } = await getSalesCurrentDayWise(user.supplierId);
    if (data) {
      const times = [
        "12am - 01am",
        "01am - 02am",
        "02am - 03am",
        "03am - 04am",
        "04am - 05am",
        "05am - 06am",
        "06am - 07am",
        "07am - 08am",
        "08am - 09am",
        "09am - 10am",
        "10am - 11am",
        "11am - 12pm",
        "12pm - 01pm",
        "01pm - 02pm",
        "02pm - 03pm",
        "03pm - 04pm",
        "04pm - 05pm",
        "05pm - 06pm",
        "06pm - 07pm",
        "07pm - 08pm",
        "08pm - 09pm",
        "09pm - 10pm",
        "10pm - 11pm",
        "11pm - 12am",
      ];

      const temp = [];

      times.forEach((item, index) => {
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
      setCurrentData(temp);
    } else {
      setCurrentData([]);
    }
  };

  const getDayTableRows = (data) => {
    const result = [];
    if (data) {
      data.forEach((item) => {
        result.push({
          id: item.paymentId,
          col1: item.paymentId ?? "--",
          col2: item.productName,
          col3: item.customerName,
          col4: item.date,
          col5: item.amount,
          col6: item.status,
        });
      });
    }
    return result;
  };

  const getDayWiseSummaryTable = async () => {
    const payload = {
      orderedStoreOwnerId: user.supplierId,
      pageNumber: 0,
      pageSize: 50,
    };
    const { data, err } = await getSalesCurrentDayWiseSummary(payload);
    if (data) {
      setSummaryTableDayData(getDayTableRows(data));
    } else if (err) {
      setSummaryTableDayData([]);
    }
  };

  useEffect(() => {
    getDayWiseSummaryTable(daySummaryYear.value);
  }, [daySummaryYear.value]);

  useEffect(() => {
    currentDayData(currentSaleYear.value);
  }, [currentSaleYear.value]);

  useEffect(() => {
    if (summaryYear.value && summaryStatus.value) {
      getMonthWiseSummaryTable(summaryYear.value, 0, summaryStatus.value);
    }
  }, [summaryYear.value, summaryStatus.value]);

  useEffect(() => {
    getBarChartData(currentYear.value);
  }, [currentYear.value]);

  useEffect(() => {
    getPieChartData(pieChartCurrentYear.value);
  }, [pieChartCurrentYear.value]);

  useEffect(() => {
    getCardData();
  }, []);

  useEffect(() => {
    getMonthWiseSalesTableData(monthCurrentYear.value);
  }, [monthCurrentYear.value]);

  return (
    <div>
      <ReportLayout
        handleSummaryPageEnd={(searchText, _, page) => {
          getMonthWiseSummaryTable(
            summaryYear.value,
            page,
            summaryStatus.value
          );
        }}
        currentDateDetails
        showCurrentDateTable
        dateTableTitle="Current Day Sales Data"
        dateSummaryTitle="Current Date Sales Summary"
        Datecolumns={[
          {
            id: "col1", // id value in column should be presented in row as key
            label: "Time",
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
        dateRows={[...currentData]}
        dateSelectList={[
          {
            id: 1,
            value: 2021,
            label: 2021,
          },
          {
            id: 2,
            value: 2022,
            label: 2022,
          },
          {
            id: 3,
            value: 2023,
            label: 2023,
          },
        ]}
        handleCurrentDayTableYear={(e) => {
          setCurrentSaleYear({
            value: e.target.value,
            label: e.target.value,
          });
        }}
        dateCurrentYear={currentSaleYear}
        dateMenuList={["Sort By Sale Count", "Sort By Time", "Download"]}
        summarydateSelectList={[
          {
            id: 1,
            value: 2021,
            label: 2021,
          },
          {
            id: 2,
            value: 2022,
            label: 2022,
          },
          {
            id: 3,
            value: 2023,
            label: 2023,
          },
        ]}
        summarydateMenuList={["Sort By Price", "Sort By Date", "Download"]}
        summaryDateColumns={[
          {
            id: "col1",
            label: "Payment ID",
            minWidth: 100,
            align: "center",
            data_align: "center",
            data_classname: "",
          },
          {
            id: "col2",
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
        ]}
        summaryDateRows={[...summaryTableDayData]}
        handleDateSummaryYear={(e) => {
          setDaySummaryYear({
            value: e.target.value,
            label: e.target.value,
          });
        }}
        dateSummaryYear={daySummaryYear}
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
        handleMonthOrderYear={(e) => {
          setCurrentYear({
            value: e.target.value,
            label: e.target.value,
          });
        }}
        currentYear={currentYear}
        barGraphBackgroundColor="#f58634"
        barGraphHoverBackgroundColor="#ffcc29"
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
        doughnutCurrentYear={pieChartCurrentYear}
        doughnutData={monthPieChart}
        handleMonthDoghnutOrderYear={(e) => {
          setPieChartCurrentYear({
            value: e.target.value,
            label: e.target.value,
          });
        }}
        detailSelectList={getListYear()}
        detailMenuList={["Sort By Sale Count", "Sort By Month", "Download"]}
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
        Detailcolumns={[
          {
            id: "col1", // id value in column should be presented in row as key
            label: "Month",
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
        monthCurrentYear={monthCurrentYear}
        handleMonthTableYear={(e) => {
          setMonthCurrentYear({
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
            id: "col2",
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
        handleSummaryStatus={(e) => {
          setSummaryStatus({
            value: e.target.value,
            label: e.target.value,
          });
        }}
        summaryYear={summaryYear}
        handleSummaryYear={(e) => {
          setSummaryYear({
            value: e.target.value,
            label: e.target.value,
          });
        }}
        cardDetails={[...cardData]}
        cardLabel="Month Wise Sales"
        tableLabel1="Month Wise Sales Data"
        tableLabel2="Month Wise Sales Summary"
      />
    </div>
  );
};
export default SalesReport;
