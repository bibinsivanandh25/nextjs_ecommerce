import ResellerDashboardLayout from "components/forms/reseller/resellerdashboardlayout";
import ReportLayout from "components/forms/supplier/report";

const ResellerDashboard = () => {
  return (
    <>
      <ResellerDashboardLayout
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
          {
            label: "First dataset",
            data: [33, 53, 85, 41, 44, 65],
            fill: true,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(75,192,192,1)",
          },
          {
            label: "Second dataset",
            data: [33, 25, 35, 51, 54, 76],
            fill: false,
            borderColor: "#742774",
          },
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
            label: "Referee Name",
            minWidth: 100,
            align: "center",
            data_align: "center",
            data_classname: "",
          },
          {
            id: "col2",
            label: "Store Name",
            minWidth: 100,
            align: "center",
            data_align: "center",
            data_classname: "",
          },
          {
            id: "col3",
            label: "Total Earnings",
            minWidth: 100,
            align: "center",
            data_align: "center",
            data_classname: "",
          },
        ]}
        Detailrows={[
          {
            id: "1",
            col1: "Alex",
            col2: "Traders",
            col3: 20,
          },
          {
            id: "2",
            col1: "Alex",
            col2: "Traders",
            col3: 20,
          },
          {
            id: "3",
            col1: "Alex",
            col2: "Traders",
            col3: 20,
          },
        ]}
        customerGraphData={[5, 10, 15, 20, 25, 30, 35, 40, 20, 10, 30]}
        cardDetails={[
          {
            label: "Total Sales",
            value: "5,23,390",
            background: "#e98129",
          },
          {
            label: "Total Earning Through Sales",
            value: "4,23,300",
            background: "#6E86C5",
          },
          {
            label: "Total Referral Commission Earned",
            value: "12,40,200",
            background: "#76C44E",
          },
          {
            label: "Total Customers",
            value: "1000",
            background: "#DBDB12",
          },
          {
            label: "Total Referrals",
            value: "1000",
            background: "#12DBAE",
          },
        ]}
        barGraphHoverBackgroundColor="#4f98b5"
        barGraphBackgroundColor="#1f78b4"
      />
    </>
  );
};
export default ResellerDashboard;
