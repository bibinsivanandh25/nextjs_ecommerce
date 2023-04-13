import { Box, Grid, Paper, Typography } from "@mui/material";
import NavTabComponent from "components/molecule/NavTabComponent";
import React, { useEffect, useState } from "react";
import { LineChart } from "@/atoms/Linechart/Linechart";
import TableComponent from "@/atoms/TableComponent";
import { getAdminCustomerDashboardData } from "services/admin/customers";
import toastify from "services/utils/toastUtils";
import { format } from "date-fns";

const navbartabs = [
  {
    id: 1,
    title: "Week",
  },
  {
    id: 2,
    title: "Month",
  },
  {
    id: 3,
    title: "Year",
  },
];

const resellerColumn = [
  {
    id: "col1",
    label: "SI NO.",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col2",
    label: "Customer Name",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col3",
    label: "Return Value",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
];

const CustomerDashBoard = () => {
  const [masterData, setMasterData] = useState({});
  const [selectedFilter, setSelectedFilter] = useState({
    filterType: "WEEK",
    fromDate: "",
    toDate: "",
  });
  const [LineChartLable, setLineChartLable] = useState([]);
  const [lineChartData, setLineChartData] = useState([]);
  const [row, setRow] = useState([]);
  const getAllDashboardData = async (filter, fromdate, todate) => {
    const payload = {
      filterType: filter,
      fromDate: fromdate,
      toDate: todate,
    };
    const { data, err } = await getAdminCustomerDashboardData(payload);
    if (data) {
      setMasterData(data);
      const temp = [];
      data.customerWithHighReturns.forEach((item, index) => {
        temp.push({
          col1: index + 1,
          col2: item.customerName,
          col3: item.returnAmount,
        });
      });
      setRow([...temp]);
      if (filter !== "MONTH") {
        const temp1 = [];
        const temp2 = [];
        Object.entries(data.customersGrowth).forEach((item) => {
          temp1.push(item[0]);
          temp2.push(item[1]);
        });
        setLineChartLable(temp1);
        setLineChartData(temp2);
      } else {
        // const sortable = Object.entries(data.customersGrowth)
        //   .sort((a, b) => {
        //     const x = a[0].split(" ")[1];
        //     const y = b[0].split(" ")[1];
        //     return Number(x) - Number(y);
        //   })
        //   .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
        const sortable = Object.fromEntries(
          Object.entries(data.customersGrowth).sort(
            (a, b) => Number(a[0].split(" ")[1]) - Number(b[0].split(" ")[1])
          )
        );
        const temp1 = [];
        const temp2 = [];
        Object.entries(sortable).forEach((item) => {
          temp1.push(item[0]);
          temp2.push(item[1]);
        });
        setLineChartLable(temp1);
        setLineChartData(temp2);
      }
    }
    if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };
  useEffect(() => {
    getAllDashboardData(
      selectedFilter.filterType,
      selectedFilter.fromDate,
      selectedFilter.toDate
    );
  }, [selectedFilter]);
  return (
    <Paper className="mxh-85vh mnh-85vh overflow-auto hide-scrollbar p-2">
      <Box className="w-100 py-2 ps-5 bg-white shadow-sm">
        <NavTabComponent
          listData={navbartabs}
          onTabCilck={(val) => {
            setSelectedFilter((pre) => ({
              ...pre,
              filterType: val?.toUpperCase(),
            }));
          }}
          getFromDate={(val) => {
            setSelectedFilter((pre) => ({
              ...pre,
              fromDate: val ? format(new Date(val), "MM-dd-yyyy hh:mm:ss") : "",
            }));
          }}
          getToDate={(val) => {
            setSelectedFilter((pre) => ({
              ...pre,
              toDate: val ? format(new Date(val), "MM-dd-yyyy hh:mm:ss") : "",
            }));
          }}
        />
      </Box>
      <Grid container spacing={2} className="mt-2">
        <Grid item lg={10} md={10} sm={12}>
          <Paper className="p-2" elevation={2}>
            <Typography className="h-5 fw-bold ps-2">
              Customers Growth
            </Typography>
            <Box>
              <LineChart
                showYAxis={false}
                labels={LineChartLable}
                data={lineChartData}
                lineColor="#007fff"
                label="Customer Count"
              />
            </Box>
          </Paper>
        </Grid>
        <Grid item md={2} lg={2} sm={6}>
          <Paper elevation={2}>
            <Typography className="d-flex justify-content-center pt-2">
              Total Customers
            </Typography>
            <Typography className="color-orange h-1 d-flex justify-content-center py-1">
              {masterData?.totalCustomers}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={2} className="p-1">
            <Grid container className="d-flex justify-content-between px-2">
              <Grid item xs={12} className="fs-16 fw-bold px-2 mt-3">
                Top 10 Customer with High Return Orders
              </Grid>
            </Grid>
            <TableComponent
              showSearchFilter={false}
              showSearchbar={false}
              showCheckbox={false}
              columns={[...resellerColumn]}
              tableRows={[...row]}
              paginationType="admin"
              showPagination={false}
            />
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CustomerDashBoard;
