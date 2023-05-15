/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
import NavTabComponent from "components/molecule/NavTabComponent";
import { useEffect, useState } from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import Bargraph from "@/atoms/Bar/Bargraph";
import { PieChart } from "@/atoms/PieChart";
import TableComponent from "@/atoms/TableComponent";
import {
  customerTableData,
  getAllTotalOrders,
  returnTableData,
  supplierTableData,
  totalOrderBarChart,
  totalReturnBarChart,
  totalReturnableBarChart,
  totalrefundBarChart,
} from "services/admin/orders/dashboard";
import { format } from "date-fns";

const navData = [
  { id: 1, title: "Today" },
  { id: 2, title: "Yesterday" },
  { id: 3, title: "Last 7 days" },
  { id: 4, title: "Last month" },
  { id: 5, title: "Last year" },
];
const pieChartData = [
  {
    label: "On Hold",
    value: 0,
    bgColor: "#5500d4",
    title: "onHold",
  },
  {
    label: "Payment Completed",
    value: 0,
    title: "paymentCompleted",
    bgColor: "#00d455",
  },
  {
    label: "Accepted",
    value: 0,
    title: "accepted",
    bgColor: "#ffd42a",
  },
  {
    label: "Delivered",
    value: 0,
    title: "delivered",
    bgColor: "#0066ff",
  },
  {
    label: "Return Requests",
    value: 0,
    title: "returnRequest",
    bgColor: "#ff5599",
  },
];
const DashBoard = () => {
  const categoryColumns = [
    {
      id: "col1", //  id value in column should be presented in row as key
      label: "Sl. No",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col2",
      label: "Category",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col3",
      label: "Return Amount Value",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
  ];
  const supplierColumns = [
    {
      id: "col1", //  id value in column should be presented in row as key
      label: "Sl. No",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col2",
      label: "Category",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col3",
      label: "Supplier",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col4",
      label: "Return Amount Value",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
  ];

  const CustomerColumns = [
    {
      id: "col1", //  id value in column should be presented in row as key
      label: "Sl. No",
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
      label: "Return Amount Value",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
  ];

  const productInfo = [
    {
      title: "Fixed Margin Products",
      value: {
        TotalOrders: 254,
        ActualCost: 8544,
        FreedeliveryandReturn: 5555,
      },
    },
    {
      title: "Zero commission products",
      value: {
        TotalOrders: 254,
        ActualCost: 8544,
        FreedeliveryandReturn: 5555,
      },
    },
    {
      title: "Returned Orders",
      value: {
        TotalOrders: 254,
        ActualCost: 8544,
        FreedeliveryandReturn: 5555,
      },
    },
  ];
  const [pieData, setPieData] = useState(pieChartData);
  const [selectedNavData, setSelectedNavData] = useState("Today");
  const [selectedDate, setSelectedDate] = useState({
    fromdate: "",
    todate: "",
  });
  // order Bar
  const [orderBarData, setOrderBarData] = useState({ label: [], data: [] });
  const [barFilter, setBarFilter] = useState("category");

  // Returnable Bar
  const [returnableData, setReturnableData] = useState({ label: [], data: [] });
  const [returnableFilter, setReturnableFilter] = useState("category");
  // return Bar
  const [returnData, setReturnData] = useState({ label: [], data: [] });
  const [returnFilter, setReturnFilter] = useState("category");
  // total Refund Bar
  const [refundData, setRefundData] = useState({ label: [], data: [] });
  // category with more return
  const [categoryReturn, setCategoryReturn] = useState([]);
  // supplier table
  const [supplierRow, setSupplierRow] = useState([]);
  // customer Table
  const [customerRow, setCustomerRow] = useState([]);

  const getTotalOrder = async (day, date) => {
    const payload = {
      startDate: date?.fromdate
        ? format(new Date(date.fromdate), "MM-dd-yyyy hh:mm:ss")
        : "",
      endDate: date?.todate
        ? format(new Date(date.todate), "MM-dd-yyyy hh:mm:ss")
        : "",
      filterType: day,
      categoryFilterType: null,
    };
    const { data, err } = await getAllTotalOrders(payload);
    if (data) {
      const temp = JSON.parse(JSON.stringify(pieChartData));
      temp.forEach((item) => {
        Object.entries(data).forEach((val) => {
          if (item.title === val[0]) {
            item.value = val[1];
          }
        });
      });
      setPieData(temp);
    }
    if (err) {
      setPieData(pieChartData);
    }
  };
  const totalOrderBarData = async (day, date, filter) => {
    const payload = {
      startDate: date?.fromdate
        ? format(new Date(date.fromdate), "MM-dd-yyyy hh:mm:ss")
        : "",
      endDate: date?.todate
        ? format(new Date(date.todate), "MM-dd-yyyy hh:mm:ss")
        : "",
      filterType: day,
      categoryFilterType: filter,
    };
    const { data, err } = await totalOrderBarChart(payload);
    const temp = {
      label: [],
      data: [],
    };
    if (data) {
      Object.entries(data).forEach((val) => {
        temp.label.push(val[0]);
        temp.data.push(val[1]);
      });
      setOrderBarData(temp);
    }
    if (err) {
      setOrderBarData(temp);
    }
  };

  const totalReturnableData = async (day, date, filter) => {
    const payload = {
      startDate: date?.fromdate
        ? format(new Date(date.fromdate), "MM-dd-yyyy hh:mm:ss")
        : "",
      endDate: date?.todate
        ? format(new Date(date.todate), "MM-dd-yyyy hh:mm:ss")
        : "",
      filterType: day,
      categoryFilterType: filter,
    };
    const { data, err } = await totalReturnableBarChart(payload);
    const temp = {
      label: [],
      data: [],
    };
    if (data) {
      Object.entries(data).forEach((val) => {
        temp.label.push(val[0]);
        temp.data.push(val[1]);
      });
      setReturnableData(temp);
    }
    if (err) {
      setReturnableData(temp);
    }
  };

  const totalReturnData = async (day, date, filter) => {
    const payload = {
      startDate: date?.fromdate
        ? format(new Date(date.fromdate), "MM-dd-yyyy hh:mm:ss")
        : "",
      endDate: date?.todate
        ? format(new Date(date.todate), "MM-dd-yyyy hh:mm:ss")
        : "",
      filterType: day,
      categoryFilterType: filter,
    };
    const { data, err } = await totalReturnBarChart(payload);
    const temp = {
      label: [],
      data: [],
    };
    if (data) {
      Object.entries(data).forEach((val) => {
        temp.label.push(val[0]);
        temp.data.push(val[1]);
      });
      setReturnData(temp);
    }
    if (err) {
      setReturnData(temp);
    }
  };
  const totalRefundData = async (day, date, filter) => {
    const payload = {
      startDate: date?.fromdate
        ? format(new Date(date.fromdate), "MM-dd-yyyy hh:mm:ss")
        : "",
      endDate: date?.todate
        ? format(new Date(date.todate), "MM-dd-yyyy hh:mm:ss")
        : "",
      filterType: day,
      categoryFilterType: filter,
    };
    const { data, err } = await totalrefundBarChart(payload);
    const temp = {
      label: [],
      data: [],
    };
    if (data) {
      Object.entries(data).forEach((val) => {
        temp.label.push(val[0]);
        temp.data.push(val[1]);
      });
      setRefundData(temp);
    }
    if (err) {
      setRefundData(temp);
    }
  };
  const getReturnTableData = async (day, date) => {
    const payload = {
      startDate: date?.fromdate
        ? format(new Date(date.fromdate), "MM-dd-yyyy hh:mm:ss")
        : "",
      endDate: date?.todate
        ? format(new Date(date.todate), "MM-dd-yyyy hh:mm:ss")
        : "",
      filterType: day,
      categoryFilterType: null,
    };
    const { data, err } = await returnTableData(payload);
    if (data?.length) {
      const temp = [];
      data.forEach((item, index) => {
        temp.push({
          id: index + 1,
          col1: index + 1,
          col2: item.category,
          col3: item.returnAmountValue,
        });
      });
      setCategoryReturn(temp);
    }
    if (err) {
      setCategoryReturn([]);
    }
  };
  const getSupplierTableData = async (day, date) => {
    const payload = {
      startDate: date?.fromdate
        ? format(new Date(date.fromdate), "MM-dd-yyyy hh:mm:ss")
        : "",
      endDate: date?.todate
        ? format(new Date(date.todate), "MM-dd-yyyy hh:mm:ss")
        : "",
      filterType: day,
      categoryFilterType: null,
    };
    const { data, err } = await supplierTableData(payload);
    if (data?.length) {
      const temp = [];
      data.forEach((item, index) => {
        temp.push({
          id: index + 1,
          col1: index + 1,
          col2: item.category,
          col3: item.storeName,
          col4: item.returnAmountValue,
        });
      });
      setSupplierRow(temp);
    }
    if (err) {
      setSupplierRow([]);
    }
  };
  const getCustomerTableData = async (day, date) => {
    const payload = {
      startDate: date?.fromdate
        ? format(new Date(date.fromdate), "MM-dd-yyyy hh:mm:ss")
        : "",
      endDate: date?.todate
        ? format(new Date(date.todate), "MM-dd-yyyy hh:mm:ss")
        : "",
      filterType: day,
      categoryFilterType: null,
    };
    const { data, err } = await customerTableData(payload);
    if (data?.length) {
      const temp = [];
      data.forEach((item, index) => {
        temp.push({
          id: index + 1,
          col1: index + 1,
          col2: item.customerName,
          col3: item.returnAmountValue,
        });
      });
      setCustomerRow(temp);
    }
    if (err) {
      setCustomerRow([]);
    }
  };
  useEffect(() => {
    if (selectedNavData) {
      getTotalOrder(selectedNavData, selectedDate);
      totalRefundData(selectedNavData, selectedDate);
      getReturnTableData(selectedNavData, selectedDate);
      getSupplierTableData(selectedNavData, selectedDate);
      getCustomerTableData(selectedNavData, selectedDate);
    }
  }, [selectedNavData, selectedDate]);
  // order bar
  useEffect(() => {
    totalOrderBarData(selectedNavData, selectedDate, barFilter);
  }, [selectedNavData, selectedDate, barFilter]);
  // returnable bar
  useEffect(() => {
    totalReturnableData(selectedNavData, selectedDate, returnableFilter);
  }, [selectedNavData, selectedDate, returnableFilter]);
  // return bar
  useEffect(() => {
    totalReturnData(selectedNavData, selectedDate, returnFilter);
  }, [selectedNavData, selectedDate, returnFilter]);

  const getProductsInfo = () => {
    return productInfo.map((ele, ind) => {
      return (
        <div className={`px-3 ${ind % 2 === 0 ? "bg-light-gray" : ""}`}>
          <div className="mx-3 border-bottom border-dashed">
            <Typography className="h-4 color-orange fw-bold py-2">
              {ele.title}
            </Typography>
            <div className="d-flex justify-content-between">
              <div>
                <Typography className="text-secondary h-5">
                  Total Orders
                </Typography>
                <Typography className="fw-bold h-3 pb-1">
                  {ele.value.TotalOrders}
                </Typography>
              </div>
              <div>
                <Typography className="text-secondary h-5">
                  Actual Cost
                </Typography>
                <Typography className="fw-bold h-3 pb-1">
                  ₹ {ele.value.ActualCost}
                </Typography>
              </div>
              <div>
                <Typography className="text-secondary h-5">
                  Free Delivery & Return
                </Typography>
                <Typography className="fw-bold h-3 pb-1">
                  ₹ {ele.value.FreedeliveryandReturn}
                </Typography>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <Paper className="py-2">
      <Box className="my-2 px-3">
        <NavTabComponent
          listData={navData}
          getFromDate={(val) => {
            setSelectedDate((pre) => ({ ...pre, fromdate: val }));
          }}
          getToDate={(val) => {
            setSelectedDate((pre) => ({ ...pre, todate: val }));
          }}
          onTabCilck={(val) => {
            setSelectedNavData(val);
          }}
        />
      </Box>
      <Grid container className="px-3" spacing={2}>
        <Grid item md={6} sm={12} className="">
          <Paper className="py-4 mnh-300">
            <Typography className="fw-bold ms-2">
              Total Orders : {pieData.reduce((sum, val) => sum + val.value, 0)}
            </Typography>
            <div className="">
              <PieChart data={[...pieData]} />
            </div>
          </Paper>
        </Grid>
        <Grid item md={6} sm={12}>
          <Paper className="mnh-300">{getProductsInfo()}</Paper>
        </Grid>
      </Grid>
      <Grid container className="px-3 my-2" spacing={2}>
        <Grid item md={6} sm={12}>
          <Paper>
            <div className="d-flex justify-content-between align-items-center bg-light-grey p-2">
              <Typography className="h-5 fw-bold">
                Total Orders:{" "}
                {orderBarData.data.reduce((sum, val) => sum + val, 0)}
              </Typography>
              <div className="h-5">
                <span
                  className={`${
                    barFilter === "category" ? "color-blue" : ""
                  } cursor-pointer`}
                  onClick={() => {
                    setBarFilter("category");
                  }}
                >
                  categories{" "}
                </span>
                <span>|</span>
                <span
                  className={`${
                    barFilter === "subCategory" ? "color-blue" : ""
                  } cursor-pointer`}
                  onClick={() => {
                    setBarFilter("subCategory");
                  }}
                >
                  {" "}
                  subcategories
                </span>
              </div>
            </div>
            <div className="w-90p">
              <Bargraph
                label="Order Count"
                barDirection="y"
                labels={orderBarData.label}
                backgroundColor="#444b66"
                hoverBackgroundColor="#e56700"
                data={orderBarData.data}
                showGridY={false}
                showXaxisTicks={false}
              />
            </div>
          </Paper>
        </Grid>
        <Grid item md={6} sm={12}>
          <Paper>
            <div className="d-flex justify-content-between align-items-center bg-light-grey p-2">
              <Typography className="h-5 fw-bold">
                Returnable Products:{" "}
                {returnableData.data.reduce((sum, val) => sum + val, 0)}
              </Typography>
              <div className="h-5">
                <span
                  className={`${
                    returnableFilter === "category" ? "color-blue" : ""
                  } cursor-pointer`}
                  onClick={() => {
                    setReturnableFilter("category");
                  }}
                >
                  categories{" "}
                </span>
                <span>|</span>
                <span
                  className={`${
                    returnableFilter === "subCategory" ? "color-blue" : ""
                  } cursor-pointer`}
                  onClick={() => {
                    setReturnableFilter("subCategory");
                  }}
                >
                  {" "}
                  subcategories
                </span>
              </div>
            </div>
            <div className="w-90p">
              <Bargraph
                label="Count"
                backgroundColor="#444b66"
                hoverBackgroundColor="#e56700"
                barDirection="y"
                labels={returnableData.label}
                data={returnableData.data}
                showGridY={false}
                showXaxisTicks={false}
              />
            </div>
          </Paper>
        </Grid>
      </Grid>
      <Grid container className="px-3 my-2" spacing={2}>
        <Grid item md={6} sm={12}>
          <Paper>
            <div className="d-flex justify-content-between align-items-center bg-light-grey p-2">
              <Typography className="h-5 fw-bold">
                Total Order Returned:{" "}
                {returnData.data.reduce((sum, val) => sum + val, 0)}
              </Typography>
              <div className="h-5">
                <span
                  className={`${
                    returnFilter === "category" ? "color-blue" : ""
                  } cursor-pointer`}
                  onClick={() => {
                    setReturnFilter("category");
                  }}
                >
                  categories{" "}
                </span>
                <span>|</span>
                <span
                  className={`${
                    returnFilter === "subCategory" ? "color-blue" : ""
                  } cursor-pointer`}
                  onClick={() => {
                    setReturnFilter("subCategory");
                  }}
                >
                  {" "}
                  subcategories
                </span>
              </div>
            </div>
            <div className="w-90p">
              <Bargraph
                barDirection="y"
                labels={returnData.label}
                backgroundColor="#444b66"
                hoverBackgroundColor="#e56700"
                data={returnData.data}
                showGridY={false}
                showXaxisTicks={false}
              />
            </div>
          </Paper>
        </Grid>
        <Grid item md={6} sm={12}>
          <Paper>
            <div className=" bg-light-grey p-2">
              <Typography className="h-5 fw-bold">
                Refund Amount:{" "}
                {refundData.data.reduce((sum, val) => sum + val, 0)}
              </Typography>
            </div>
            <div className="w-90p">
              <Bargraph
                backgroundColor="#444b66"
                hoverBackgroundColor="#e56700"
                barDirection="y"
                labels={refundData.label}
                data={refundData.data}
                showGridY={false}
                showXaxisTicks={false}
              />
            </div>
          </Paper>
        </Grid>
      </Grid>
      <Grid container className="px-3 my-2" spacing={2}>
        <Grid item sm={12} md={6}>
          <Paper className="mnh-300">
            <Typography className="fw-bold h-5 pt-2 px-2">
              Categories With More Returns Happening - Top 10
            </Typography>
            <TableComponent
              tableRows={[...categoryReturn]}
              columns={[...categoryColumns]}
              showPagination={false}
              showSearchFilter={false}
              showSearchbar={false}
              showCheckbox={false}
              showFilterList={false}
            />
          </Paper>
        </Grid>
        <Grid item sm={12} md={6}>
          <Paper className="mnh-300">
            <Typography className="fw-bold h-5 pt-2 px-2">
              Supplier Causing More Returns of Products - Top 10
            </Typography>
            <TableComponent
              paginationType="admin"
              tableRows={[...supplierRow]}
              columns={[...supplierColumns]}
              showSearchbar={false}
              showCheckbox={false}
              showPagination={false}
              showSearchFilter={false}
            />
          </Paper>
        </Grid>
      </Grid>
      <Grid container className="px-3 my-2" spacing={2}>
        <Grid item sm={12} md={6}>
          <Paper className="mnh-300">
            <Typography className="fw-bold h-5 pt-2 px-2">
              Customer who produce more products return - Top 10
            </Typography>
            <TableComponent
              paginationType="admin"
              tableRows={[...customerRow]}
              columns={[...CustomerColumns]}
              showSearchbar={false}
              showPagination={false}
              showCheckbox={false}
              showSearchFilter={false}
            />
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default DashBoard;
