import ReportLayout from "components/forms/supplier/report";

const SalesReport = () => {
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
            id: "col1", //id value in column should be presented in row as key
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
            id: "1",
            col1: "2 Feb 2022",
            col2: 22222,
          },
        ]}
        summaryColumns={[]}
        summaryRows={[]}
        cardDetails={[
          {
            label: "Net Revenue",
            value: "54,233.00",
            background: "#19b79c",
          },
          {
            label: "No. of Customer",
            value: "233",
            background: "#198674",
          },
          {
            label: "Revenue Today",
            value: " 2000",
            background: "#f58634",
          },
          {
            label: "Orders Placed Today",
            value: "120",
            background: "#ffcc29",
          },
        ]}
      />
    </div>
  );
};
export default SalesReport;
