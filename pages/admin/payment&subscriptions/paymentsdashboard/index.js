import { Box, Grid, Paper, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CardComponent from "@/atoms/CardComponent";
import TableComponent from "@/atoms/TableComponent";

const PaymentDashboard = () => {
  const [tableRowsForFailedTransactions, setTableRowsForFailedTransactions] =
    useState([]);
  const [tableRowsForLastReleased, setTableRowsForLastReleased] = useState([]);
  const [tableRowsForNextRelease, setTableRowsForNextRelease] = useState([]);
  const [tableRowsForLastPaymentRelease, setTableRowsForLastPaymentRelease] =
    useState([]);
  const [tableRowsForPaymentPending, setTableRowsForPaymentPending] = useState(
    []
  );
  const [
    tableRowsForSupplierChargesPaidColumns,
    setTableRowsForSupplierChargesPaidColumns,
  ] = useState([]);
  const [
    tableRowsForSupplierChargesPendingColumns,
    setTableRowsForSupplierChargesPendingColumns,
  ] = useState([]);
  const [
    tableRowsForCodOrderPaymentsPendingOrder,
    setTableRowsForCodOrderPaymentsPendingOrder,
  ] = useState([]);
  const [
    tableRowsForCodOrderPaymentsSettled,
    setTableRowsForCodOrderPaymentsSettled,
  ] = useState([]);

  const [
    tableRowsForResellerSubscriptions,
    setTableRowsForResellerSubscriptions,
  ] = useState([]);

  //------------------------------------------------------------------
  const cardsData = [
    {
      cardTitle: "Total Sales",
      cardBody: "452",
      boxColor: "#00C033",
    },
    {
      cardTitle: "Total Payment Settled",
      cardBody: "₹ 1,12,544",
      boxColor: "#007FFF",
    },
    {
      cardTitle: "Total Payments to Supplier",
      cardBody: "₹ 12,544",
      boxColor: "#FFA800",
    },
    {
      cardTitle: "Total Payments to Reseller",
      cardBody: "₹ 1,00,544",
      boxColor: "#FF00A2",
    },
    {
      cardTitle: "Total Payment to logistics",
      cardBody: "₹ 1,00,544",
      boxColor: "#FF00A2",
    },
    {
      cardTitle: "Total refund to Customers",
      cardBody: "₹ 12,544",
      boxColor: "#007FFF",
    },
    {
      cardTitle: "Total refund to Customers",
      cardBody: "₹ 1,00,544",
      boxColor: "#FFA800",
    },
    {
      cardTitle: "Total Charges pending to collect from supplier",
      cardBody: "₹ 1,00,5444809",
      boxColor: "#FF00A2",
    },
  ];
  // -----------------------------------------------------------------

  const failedTransactionColumns = [
    {
      id: "col1",
      align: "center",
      label: "Failed Transactions",
      data_align: "center",
    },
    {
      id: "col2",
      align: "center",
      label: "Supplier",
      data_align: "center",
    },
    {
      id: "col3",
      align: "center",
      label: "Resellers",
      data_align: "center",
    },
    {
      id: "col4",
      align: "center",
      label: "Logistics",
      data_align: "center",
    },
    {
      id: "col5",
      align: "center",
      label: "Customer-Refund",
      data_align: "center",
    },
  ];

  const lastReleaseColumns = [
    {
      id: "col1",
      align: "center",
      label: "Order",
      data_align: "center",
    },
    {
      id: "col2",
      align: "center",
      label: "Customer",
      data_align: "center",
    },
    {
      id: "col3",
      align: "center",
      label: "Amount",
      data_align: "center",
    },
  ];

  const nextReleaseColumns = [
    {
      id: "col1",
      align: "center",
      label: "Order",
      data_align: "center",
    },
    {
      id: "col2",
      align: "center",
      label: "Customer",
      data_align: "center",
    },
    {
      id: "col3",
      align: "center",
      label: "Amount",
      data_align: "center",
    },
  ];

  const lastPaymentReleaseColumns = [
    {
      id: "col1",
      align: "center",
      label: "Orders",
      data_align: "center",
    },
    {
      id: "col2",
      align: "center",
      label: "Gross Sales",
      data_align: "center",
    },
    {
      id: "col3",
      align: "center",
      label: "Suppliers",
      data_align: "center",
    },
    {
      id: "col4",
      align: "center",
      label: "Resellers",
      data_align: "center",
    },
    {
      id: "col5",
      align: "center",
      label: "Logistics paid till 30/10/2022",
      data_align: "center",
    },
    {
      id: "col6",
      align: "center",
      label: "Admin Profit",
      data_align: "center",
    },
  ];

  const paymentPendingColumns = [
    {
      id: "col1",
      align: "center",
      label: "Orders",
      data_align: "center",
    },
    {
      id: "col2",
      align: "center",
      label: "Gross Sales",
      data_align: "center",
    },
    {
      id: "col3",
      align: "center",
      label: "Suppliers",
      data_align: "center",
    },
    {
      id: "col4",
      align: "center",
      label: "Resellers",
      data_align: "center",
    },
    {
      id: "col5",
      align: "center",
      label: "Logistics paid till 30/10/2022",
      data_align: "center",
    },
    {
      id: "col6",
      align: "center",
      label: "Admin Profit",
      data_align: "center",
    },
  ];

  const supplierChargesPaidColumns = [
    {
      id: "col1",
      align: "center",
      label: "Orders",
      data_align: "center",
    },
    {
      id: "col2",
      align: "center",
      label: "Supplier",
      data_align: "center",
    },
    {
      id: "col3",
      align: "center",
      label: "Amount Paid",
      data_align: "center",
    },
    {
      id: "col4",
      align: "center",
      label: "Active Suppliers",
      data_align: "center",
    },
    {
      id: "col5",
      align: "center",
      label: "Inactive Suppliers",
      data_align: "center",
    },
  ];

  const supplierChargesPendingColumns = [
    {
      id: "col1",
      align: "center",
      label: "Orders",
      data_align: "center",
    },
    {
      id: "col2",
      align: "center",
      label: "Supplier",
      data_align: "center",
    },
    {
      id: "col3",
      align: "center",
      label: "Amount Paid",
      data_align: "center",
    },
    {
      id: "col4",
      align: "center",
      label: "Active Suppliers",
      data_align: "center",
    },
    {
      id: "col5",
      align: "center",
      label: "Inactive Suppliers",
      data_align: "center",
    },
  ];

  const codOrderPaymentsSettledColumns = [
    {
      id: "col1",
      align: "center",
      label: "Logistics Partner",
      data_align: "center",
    },
    {
      id: "col2",
      align: "center",
      label: "Cod Orders",
      data_align: "center",
    },
    {
      id: "col3",
      align: "center",
      label: "Gross Sales Value (COD)",
      data_align: "center",
    },
    {
      id: "col4",
      align: "center",
      label: "COD deductions",
      data_align: "center",
    },
    {
      id: "col5",
      align: "center",
      label: "Amount received After Deduction",
      data_align: "center",
    },
    {
      id: "col6",
      align: "center",
      label: "Last Payment Received Date",
      data_align: "center",
    },
    {
      id: "col7",
      align: "center",
      label: "Recent Payment Received Date",
      data_align: "center",
    },
  ];

  const codOrderPaymentsPendingOrderColumns = [
    {
      id: "col1",
      align: "center",
      label: "Logistics Partner",
      data_align: "center",
    },
    {
      id: "col2",
      align: "center",
      label: "Cod Orders",
      data_align: "center",
    },
    {
      id: "col3",
      align: "center",
      label: "Gross Sales Value (COD)",
      data_align: "center",
    },
    {
      id: "col4",
      align: "center",
      label: "COD deductions",
      data_align: "center",
    },
    {
      id: "col5",
      align: "center",
      label: "Amount received After Deduction",
      data_align: "center",
    },
    {
      id: "col6",
      align: "center",
      label: "Last Payment Received Date",
      data_align: "center",
    },
    {
      id: "col7",
      align: "center",
      label: "Recent Payment Received Date",
      data_align: "center",
    },
  ];

  const resellerSubscriptionsColumns = [
    {
      id: "col1",
      align: "center",
      label: "Total Resellers Subscribed",
      data_align: "center",
    },
    {
      id: "col2",
      align: "center",
      label: "Old Subscribers",
      data_align: "center",
    },
    {
      id: "col3",
      align: "center",
      label: "New Subscribers (Weekly Counter)",
      data_align: "center",
    },
    {
      id: "col4",
      align: "center",
      label: "Total Subscription Orders",
      data_align: "center",
    },
    {
      id: "col5",
      align: "center",
      label: "Total Sales amount",
      data_align: "center",
    },
  ];
  // ----------------------------------------------------------------

  const rowsForFailedTransactions = [
    {
      id: 1,
      col1: "(Till Date)",
      col2: 32,
      col3: 48,
      col4: 32,
      col5: 12,
    },
  ];

  const rowsForLastRelease = [
    {
      id: 1,
      col1: 35,
      col2: 12,
      col3: 4800,
    },
  ];

  const rowsForNextRelease = [
    {
      id: 1,
      col1: 35,
      col2: 12,
      col3: 4800,
    },
  ];

  const rowsForLastPaymentRelease = [
    {
      id: 1,
      col1: 752,
      col2: 24055,
      col3: "102/8500 Payable Date 10/11/21",
      col4: "58/10500 Payable Date 10/11/21",
      col5: 4500,
      col6: 505,
    },
  ];
  const rowsForPaymentPending = [
    {
      id: 1,
      col1: 752,
      col2: 24055,
      col3: "102/8500 Payable Date 10/11/21",
      col4: "58/10500 Payable Date 10/11/21",
      col5: 4500,
      col6: 505,
    },
  ];

  const rowsForSupplierChargesPaid = [
    {
      id: 1,
      col1: 42,
      col2: 22,
      col3: 1558,
      col4: 15,
      col5: 7,
    },
  ];

  const rowsForSupplierChargesPending = [
    {
      id: 1,
      col1: 42,
      col2: 22,
      col3: 1558,
      col4: 15,
      col5: 7,
    },
  ];

  const rowsForCodOrderPaymentsSettled = [
    {
      id: 1,
      col1: "India Post",
      col2: 43,
      col3: 10433,
      col4: 2537,
      col5: 7896,
      col6: "9/10/2021",
      col7: "24/10/2021",
    },
  ];

  const rowsForCodOrderPaymentsPendingOrder = [
    {
      id: 1,
      col1: "India Post",
      col2: 43,
      col3: 10433,
      col4: 2537,
      col5: 7896,
      col6: "9/10/2021",
      col7: "24/10/2021",
    },
  ];

  const rowsForResellerSubscriptionsColumns = [
    {
      id: 1,
      col1: 683,
      col2: 548,
      col3: 135,
      col4: 10127,
      col5: 23823,
    },
  ];

  //----------------------------------------------------------------

  const getTableRowsForFailedTransactions = () => {
    const anArray = [];
    rowsForFailedTransactions.forEach((val, index) => {
      anArray.push({
        id: index + 1,
        col1: val.col1,
        col2: <Typography className="color-blue h-5">{val.col2}</Typography>,
        col3: <Typography className="color-blue h-5">{val.col3}</Typography>,
        col4: <Typography className="color-blue h-5">{val.col4}</Typography>,
        col5: <Typography className="color-blue h-5">{val.col5}</Typography>,
      });
    });

    setTableRowsForFailedTransactions(anArray);
  };

  const getTableRowsDataForLastRelease = () => {
    const anArray = [];
    rowsForLastRelease.forEach((val, index) => {
      anArray.push({
        id: index + 1,
        col1: <Typography className="color-blue h-5">{val.col1}</Typography>,
        col2: val.col2,
        col3: val.col3,
      });
    });

    setTableRowsForLastReleased(anArray);
  };

  const getTableRowsDataForNextRelease = () => {
    const anArray = [];
    rowsForNextRelease.forEach((val, index) => {
      anArray.push({
        id: index + 1,
        col1: <Typography className="color-blue h-5">{val.col1}</Typography>,
        col2: val.col2,
        col3: val.col3,
      });
    });

    setTableRowsForNextRelease(anArray);
  };

  const getTableRowsForLastPaymentRelease = () => {
    const anArray = [];
    rowsForLastPaymentRelease.forEach((val, index) => {
      anArray.push({
        id: index + 1,
        col1: <Typography className="h-5 text-primary">{val.col1}</Typography>,
        col2: val.col2,
        col3: val.col3,
        col4: val.col4,
        col5: val.col5,
        col6: val.col6,
      });
    });

    setTableRowsForLastPaymentRelease(anArray);
  };

  const getTableRowsForPaymentPending = () => {
    const anArray = [];
    rowsForPaymentPending.forEach((val, index) => {
      anArray.push({
        id: index + 1,
        col1: <Typography className="h-5 text-primary">{val.col1}</Typography>,
        col2: val.col2,
        col3: val.col3,
        col4: val.col4,
        col5: val.col5,
        col6: val.col6,
      });
    });

    setTableRowsForPaymentPending(anArray);
  };

  const getTableRowsForSupplierChargesPaid = () => {
    const anArray = [];
    rowsForSupplierChargesPaid.forEach((val, index) => {
      anArray.push({
        id: index + 1,
        col1: (
          <Typography className="h-5 text-decoration-underline text-primary">
            {val.col1}
          </Typography>
        ),
        col2: val.col2,
        col3: val.col3,
        col4: (
          <Typography className="h-5 text-decoration-underline text-primary">
            {val.col4}
          </Typography>
        ),
        col5: (
          <Typography className="h-5 text-decoration-underline text-primary">
            {val.col5}
          </Typography>
        ),
      });
    });

    setTableRowsForSupplierChargesPaidColumns(anArray);
  };

  const getTableRowsForSupplierChargesPending = () => {
    const anArray = [];
    rowsForSupplierChargesPending.forEach((val, index) => {
      anArray.push({
        id: index + 1,
        col1: (
          <Typography className="h-5 text-decoration-underline text-primary">
            {val.col1}
          </Typography>
        ),
        col2: val.col2,
        col3: val.col3,
        col4: (
          <Typography className="h-5 text-decoration-underline text-primary">
            {val.col4}
          </Typography>
        ),
        col5: (
          <Typography className="h-5 text-decoration-underline text-primary">
            {val.col5}
          </Typography>
        ),
      });
    });

    setTableRowsForSupplierChargesPendingColumns(anArray);
  };

  const getTableRowsForCodOrderPaymentsSettled = () => {
    const anArray = [];
    rowsForCodOrderPaymentsPendingOrder.forEach((val, index) => {
      anArray.push({
        id: index + 1,
        col1: val.col1,
        col2: val.col2,
        col3: val.col3,
        col4: val.col4,
        col5: val.col5,
        col6: val.col6,
        col7: val.col7,
      });
    });

    setTableRowsForCodOrderPaymentsPendingOrder(anArray);
  };

  const getTableRowsForCodOrderPaymentsPendingOrder = () => {
    const anArray = [];
    rowsForCodOrderPaymentsSettled.forEach((val, index) => {
      anArray.push({
        id: index + 1,
        col1: val.col1,
        col2: val.col2,
        col3: val.col3,
        col4: val.col4,
        col5: val.col5,
        col6: val.col6,
        col7: val.col7,
      });
    });

    setTableRowsForCodOrderPaymentsSettled(anArray);
  };

  const getTableRowsForResellerSubscriptions = () => {
    const anArray = [];
    rowsForResellerSubscriptionsColumns.forEach((val, index) => {
      anArray.push({
        id: index + 1,
        col1: (
          <Typography className="color-blue h-5 text-decoration-underline">
            {val.col1}
          </Typography>
        ),
        col2: (
          <Typography className="color-blue h-5 text-decoration-underline">
            {val.col2}
          </Typography>
        ),
        col3: (
          <Typography className="color-blue h-5 text-decoration-underline">
            {val.col3}
          </Typography>
        ),
        col4: (
          <Typography className="color-blue h-5 text-decoration-underline">
            {val.col4}
          </Typography>
        ),
        col5: (
          <Typography className="color-blue h-5 text-decoration-underline">
            {val.col5}
          </Typography>
        ),
      });
    });

    setTableRowsForResellerSubscriptions(anArray);
  };

  useEffect(() => {
    getTableRowsForFailedTransactions();
    getTableRowsDataForLastRelease();
    getTableRowsDataForNextRelease();
    getTableRowsForLastPaymentRelease();
    getTableRowsForPaymentPending();
    getTableRowsForSupplierChargesPaid();
    getTableRowsForSupplierChargesPending();
    getTableRowsForCodOrderPaymentsSettled();
    getTableRowsForCodOrderPaymentsPendingOrder();
    getTableRowsForResellerSubscriptions();
  }, []);

  const returnCards = () => {
    return cardsData.map((val) => {
      return (
        <Grid item xs={2.4}>
          <CardComponent className="p-2" boxColor={val.boxColor}>
            {val.cardTitle.length < 30 ? (
              <Typography className="h-5 color-gray">
                {val.cardTitle}
              </Typography>
            ) : (
              <Tooltip placement="top" title={val.cardTitle}>
                <Typography className="h-5 cursor-pointer color-gray text-truncate">
                  {val.cardTitle}
                </Typography>
              </Tooltip>
            )}
            {val.cardBody.length < 12 ? (
              <Typography className="text-center h-2">
                {val.cardBody}
              </Typography>
            ) : (
              <Tooltip placement="top" title={val.cardBody}>
                <Typography className="text-center cursor-pointer h-2 text-truncate">
                  {val.cardBody}
                </Typography>
              </Tooltip>
            )}
          </CardComponent>
        </Grid>
      );
    });
  };

  return (
    <Box>
      <Paper className="mnh-85vh mxh-85vh p-3 overflow-auto hide-scrollbar">
        <Grid container spacing={2}>
          {returnCards()}
        </Grid>

        <Grid container className="my-5">
          <Grid item xs={6}>
            <Paper className="p-3">
              <Typography className="h-4 fw-bold color-orange">
                Failed Transactions
              </Typography>
              <TableComponent
                columns={failedTransactionColumns}
                tableRows={tableRowsForFailedTransactions}
                tHeadBgColor="bg-light-gray"
                showPagination={false}
                showSearchFilter={false}
                showSearchbar={false}
                showCheckbox={false}
              />
            </Paper>
          </Grid>
        </Grid>

        <Paper className="p-3">
          <Box className="mb-3 d-flex justify-content-between">
            <Typography className="h-4 fw-bold color-orange">
              Customer Refund
            </Typography>
            <Box className="d-flex justify-content-between">
              <Typography className="h-5">
                <span className="color-gray">Payment History : </span>
                <span className="text-decoration-underline cursor-pointer">
                  Supplier
                </span>
                <span className="text-decoration-underline ms-2 cursor-pointer">
                  Resellers
                </span>
              </Typography>
              <Typography className="ms-5 color-gray h-5">
                Click To View{" "}
                <span className="color-blue cursor-pointer text-decoration-underline">
                  Refund History
                </span>{" "}
              </Typography>
            </Box>
          </Box>
          <Grid container spacing={4} className="">
            <Grid item xs={6}>
              <Paper>
                <Typography className="fw-bold ms-3 pt-3 h-5">
                  <span className="fw-light color-gray">Next Release: </span>
                  04/10/2021-Current Day
                </Typography>
                <TableComponent
                  columns={nextReleaseColumns}
                  tableRows={tableRowsForNextRelease}
                  tHeadBgColor="bg-light-gray"
                  showPagination={false}
                  showSearchFilter={false}
                  showSearchbar={false}
                  showCheckbox={false}
                />
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper>
                <Typography className="fw-bold ms-3 pt-3 h-5">
                  <span className="fw-light color-gray">Last Released: </span>
                  04/10/2021-Yesterday
                </Typography>
                <TableComponent
                  columns={lastReleaseColumns}
                  tableRows={tableRowsForLastReleased}
                  tHeadBgColor="bg-light-gray"
                  showPagination={false}
                  showSearchFilter={false}
                  showSearchbar={false}
                  showCheckbox={false}
                />
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper>
                <Typography className="fw-bold ms-3 pt-3 h-5">
                  <span className="fw-light color-gray">
                    Last Payment Released:{" "}
                  </span>
                  04/10/2021-30/10/2021
                </Typography>
                <TableComponent
                  columns={lastPaymentReleaseColumns}
                  tableRows={tableRowsForLastPaymentRelease}
                  tHeadBgColor="bg-light-gray"
                  showPagination={false}
                  showSearchFilter={false}
                  showSearchbar={false}
                  showCheckbox={false}
                />
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper>
                <Typography className="fw-light color-gray ms-3 pt-3 h-5">
                  <span>Payments Pending : Last Payment: 04/10/2021</span>{" "}
                  <span className="ms-2">Next Payment Release:30/10/2021</span>
                </Typography>
                <TableComponent
                  columns={paymentPendingColumns}
                  tableRows={tableRowsForPaymentPending}
                  tHeadBgColor="bg-light-gray"
                  showPagination={false}
                  showSearchFilter={false}
                  showSearchbar={false}
                  showCheckbox={false}
                />
              </Paper>
            </Grid>
          </Grid>
        </Paper>

        <Paper className="p-3 my-4">
          <Box className="mb-3">
            <Typography className="h-4 fw-bold color-orange">
              Supplier Charges Paid
            </Typography>
          </Box>

          <Grid container spacing={4} className="">
            <Grid item xs={6}>
              <Paper>
                <Typography className="fw-bold ms-3 pt-3 h-5">
                  Supplier Charges Paid
                </Typography>
                <TableComponent
                  columns={supplierChargesPaidColumns}
                  tableRows={tableRowsForSupplierChargesPaidColumns}
                  tHeadBgColor="bg-light-gray"
                  showPagination={false}
                  showSearchFilter={false}
                  showSearchbar={false}
                  showCheckbox={false}
                />
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper>
                <Typography className="fw-bold ms-3 pt-3 h-5">
                  Supplier Charges Pending
                </Typography>
                <TableComponent
                  columns={supplierChargesPendingColumns}
                  tableRows={tableRowsForSupplierChargesPendingColumns}
                  tHeadBgColor="bg-light-gray"
                  showPagination={false}
                  showSearchFilter={false}
                  showSearchbar={false}
                  showCheckbox={false}
                />
              </Paper>
            </Grid>
          </Grid>
        </Paper>

        <Paper className="p-3 my-4">
          <Box>
            <Typography className="h-4 fw-bold color-orange">
              Cod Order Payments Setelled
            </Typography>
          </Box>
          <TableComponent
            columns={codOrderPaymentsSettledColumns}
            tableRows={tableRowsForCodOrderPaymentsSettled}
            tHeadBgColor="bg-light-gray"
            showPagination={false}
            showSearchFilter={false}
            showSearchbar={false}
            showCheckbox={false}
          />
        </Paper>

        <Paper className="p-3 my-4">
          <Box>
            <Typography className="h-4 fw-bold color-orange">
              Cod Order Payments Pending
            </Typography>
          </Box>
          <TableComponent
            columns={codOrderPaymentsPendingOrderColumns}
            tableRows={tableRowsForCodOrderPaymentsPendingOrder}
            tHeadBgColor="bg-light-gray"
            // showPagination={false}
            showSearchFilter={false}
            showSearchbar={false}
            showCheckbox={false}
          />
        </Paper>

        <Paper className="p-3 my-4">
          <Box>
            <Typography className="h-4 fw-bold color-orange">
              Reseller Subscriptions
            </Typography>
          </Box>
          <TableComponent
            columns={resellerSubscriptionsColumns}
            tableRows={tableRowsForResellerSubscriptions}
            tHeadBgColor="bg-light-gray"
            // showPagination={false}
            showSearchFilter={false}
            showSearchbar={false}
            showCheckbox={false}
          />
        </Paper>
      </Paper>
    </Box>
  );
};

export default PaymentDashboard;
