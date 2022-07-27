import ReportLayout from "../../../../components/forms/supplier/report/index";

const PaymentReports = () => {
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
        doughnutData={[10, 30, 50, 40, 60, 70, 30, 80, 90, 10, 20]}
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
        summaryRows={[
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
        cardDetails={[
          {
            label: "Total Payment Amount",
            value: "₹ 54,233.00",
            background: "#59698b",
          },
          {
            label: "No. of Payments Recieved",
            value: "233",
            background: "#4f98b5",
          },
          {
            label: "Refunded",
            value: "₹ 2000.00",
            background: "#d83a56",
          },
          {
            label: "Pending Payments",
            value: "₹ 12,40,000",
            background: "#053742",
          },
        ]}
        cardLabel="Month Wise Payment"
        tableLabel1="Month Wise Payment Details"
        tableLabel2="Payment Summary"
      />
    </div>
  );
};
export default PaymentReports;
