import ReportLayout from "components/forms/supplier/report";

const SalesReport = () => {
  return (
    <div>
      <ReportLayout
        showCurrentDateTable
        dateTableTitle="Current Day Sales Data"
        dateSummaryTitle="Current Date Sales Summary"
        Datecolumns={[
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
        dateRows={[
          {
            id: "1",
            col1: "1 Jan 2021",
            col2: 33333,
          },
          {
            id: "2",
            col1: "2 Feb 2022",
            col2: 22222,
          },
        ]}
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
        dateMenuList={["Sort By Sale Count", "Sort By Date", "Download"]}
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
        ]}
        summaryDateRows={[
          {
            id: "1",
            col1: "#897656",
            col2: "Green Sport Shoes",
            col3: "Martin Hughes",
            col4: "4 Jul 2020",
            col5: "4,200.00",
          },
          {
            id: "2",
            col1: "#897656",
            col2: "Green Sport Shoes",
            col3: "Martin Hughes",
            col4: "4 Jul 2020",
            col5: "4,200.00",
          },
        ]}
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
        barGraphBackgroundColor="#f58634"
        barGraphHoverBackgroundColor="#ffcc29"
        barGraphData={[
          1000, 3000, 5000, 4000, 6000, 7000, 3000, 8000, 9000, 10000, 200,
        ]}
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
        doughnutData={[
          1000, 3000, 5000, 4000, 6000, 7000, 3000, 8000, 9000, 10000, 200,
        ]}
        detailSelectList={[
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
        detailMenuList={["Sort By Sale Count", "Sort By Date", "Download"]}
        summarySelectList={[
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
        Detailrows={[
          {
            id: "1",
            col1: "1 Jan 2021",
            col2: 33333,
          },
          {
            id: "2",
            col1: "2 Feb 2022",
            col2: 22222,
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
        summaryRows={[
          {
            id: "1",
            col1: "#897656",
            col2: "Green Sport Shoes",
            col3: "Martin Hughes",
            col4: "4 Jul 2020",
            col5: "4,200.00",
            col6: "Completed",
          },
          {
            id: "2",
            col1: "#897656",
            col2: "Green Sport Shoes",
            col3: "Martin Hughes",
            col4: "4 Jul 2020",
            col5: "4,200.00",
            col6: "Completed",
          },
        ]}
        cardDetails={[
          {
            label: "Net Revenue",
            value: " ₹54,233.00",
            background: "#19b79c",
          },
          {
            label: "No. of Customer",
            value: "233",
            background: "#198674",
          },
          {
            label: "Revenue Today",
            value: "₹ 2000",
            background: "#f58634",
          },
          {
            label: "Orders Placed Today",
            value: "120",
            background: "#ffcc29",
          },
        ]}
        cardLabel="Month Wise Sales"
        tableLabel1="Month Wise Sales Data"
        tableLabel2="Month Wise Sales Summary"
      />
    </div>
  );
};
export default SalesReport;
