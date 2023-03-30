import { Button, Grid, Paper, Typography } from "@mui/material";
import TableComponent from "components/atoms/TableComponent";
import React, { useEffect, useState } from "react";
import SimpleDropdownComponent from "components/atoms/SimpleDropdownComponent";
import CustomIcon from "services/iconUtils";
import ModalComponent from "@/atoms/ModalComponent";
import {
  getOrderDetailsById,
  getOrderHistory,
} from "services/supplier/myorders/orderhistory";
import toastify from "services/utils/toastUtils";
import { useSelector } from "react-redux";

const ReturnedOrders = () => {
  const [tableData, setTableData] = useState([]);
  const [eachOrderData, seteachOrderData] = useState({});
  const [openView, setopenView] = useState(false);
  const user = useSelector((state) => state.user?.supplierId);
  const [pageNumberState, setpageNumberState] = useState(0);
  const columns = [
    {
      label: "Purchase ID",
      id: "col1",
    },
    {
      label: "Order ID",
      id: "col2",
    },
    {
      label: "Order Date",
      id: "col3",
    },
    {
      label: "Size",
      id: "col4",
    },
    {
      label: "Weight",
      id: "col5",
    },
    {
      label: "Manifest Date",
      id: "col6",
    },
    {
      label: "Qty",
      id: "col7",
    },
    {
      label: "Status",
      // align: "center",
      id: "col8",
    },
    {
      label: "Choose Action",
      id: "col9",
      // align: "center",
      minWidth: 250,
    },
    {
      label: "Action",
      id: "col10",
      // align: "center",
      minWidth: 100,
    },
  ];

  // const [tableRows, setTableRows] = useState([]);
  const [dropdownFilter, setDropdownFilter] = useState({});
  // const [tableData, setTableData] = useState([]);
  const getOrderDataById = async (id) => {
    const { data, err } = await getOrderDetailsById(id);
    if (data) {
      seteachOrderData(data.data);
      setopenView(true);
    } else if (err) {
      toastify(err.response.data.message, "error");
    }
  };
  const chooseActionList = [
    {
      id: "received",
      value: "received",
      label: "Product Received",
    },
    {
      id: "notreceived",
      value: "notreceived",
      label: "Product Not Received",
    },
    {
      id: "receivedwithdamage",
      value: "receivedwithdamage",
      label: "Product Received With Damage",
    },
    {
      id: "lost",
      value: "lost",
      label: "Product Lost In Transit",
    },
  ];

  const handleChooseActionChange = (val, id) => {
    const copy = tableData.map((row) => {
      if (row.purchaseid === id) {
        return {
          ...row,
          chooseActionValue: val,
        };
      }
      return row;
    });
    setTableData(copy);
  };

  const getClassnames = (status) => {
    if (status?.toLowerCase().includes("live")) {
      return "text-success";
    }
    if (status.toLowerCase().includes("fail")) {
      return "text-danger";
    }
    return "";
  };
  const viewFormat = (key, value) => {
    return (
      <Grid md={12} sx={12} container className="py-1">
        <Grid md={3} sx={3}>
          <Typography className="fs-12 fw-500">{key}</Typography>
        </Grid>
        <Grid md={1} sx={1}>
          <Typography className="fs-12">:</Typography>
        </Grid>
        <Grid md={8} sx={8}>
          <Typography className="fs-12">{value}</Typography>
        </Grid>
      </Grid>
    );
  };

  const mapRowsToTable = (data) => {
    const result = [];
    data.forEach((row) => {
      result.push({
        col1: row?.purchaseid || "__",
        col2: row?.orderId || "__",
        col3: row?.orderDate || "__",
        col4: row?.size || "__",
        col5: row?.weightInclusivePackage || "__",
        col6: row?.manifestdate || "__",
        col7: row?.orderQuantity || "__",
        col8: (
          <div className={getClassnames(row.orderStatus)}>
            {row.orderStatus}
          </div>
        ),
        col9: (
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={10}>
              <SimpleDropdownComponent
                label="Choose Action"
                list={chooseActionList}
                size="small"
                // value={row.chooseActionValue}
                value={dropdownFilter}
                id={`${row.purchaseid}chooseAction`}
                onDropdownSelect={(val) =>
                  handleChooseActionChange(val, row.purchaseid)
                }
                fontSize="0.8rem"
              />
            </Grid>
            <Grid item xs={2}>
              <Button
                variant="contained"
                size="small"
                disabled={!row.chooseActionValue}
                sx={{ fontSize: 8 }}
              >
                Send
              </Button>
            </Grid>
          </Grid>
        ),
        col10: (
          <Grid container mx={1} alignItems="center" justifyContent="center">
            <Grid item>
              <CustomIcon title="Download" type="download" />
            </Grid>
            <Grid item>
              <CustomIcon
                title="View"
                type="view"
                onIconClick={() => {
                  getOrderDataById(row.orderId);
                }}
              />
            </Grid>
          </Grid>
        ),
      });
    });
    return result;
  };
  const getDeleveredOrderData = async (page = pageNumberState) => {
    const payload = {
      supplierId: user,
      status: "RETURNED",
      pageNumber: page,
    };
    const { data, err } = await getOrderHistory(payload);
    if (data) {
      if (page == 0) {
        setTableData(mapRowsToTable(data.data));
        setpageNumberState((pre) => pre + 1);
      } else {
        setpageNumberState((pre) => pre + 1);
        setTableData((pre) => [...pre, ...mapRowsToTable(data.data)]);
      }
      if (err) {
        toastify(err.response.data.message, "error");
      }
    }
  };
  useEffect(() => {
    getDeleveredOrderData();
  }, []);
  // useEffect(() => {
  //   setTableRows(mapRowsToTable(tableData));
  // }, [tableData]);

  // useEffect(() => {
  //   const rows = [
  //     {
  //       purchaseid: "#123458",
  //       orderid: "123456",
  //       orderdate: "12-01-2022",
  //       size: "UK24",
  //       weight: "200gm",
  //       manifestdate: "23-01-2022",
  //       qty: "4",
  //       status: "PRODUCT LIVE",
  //       chooseActionValue: null,
  //       orderQuantity: 1,
  //     },
  //     {
  //       purchaseid: "#123456",
  //       orderid: "123456",
  //       orderdate: "12-01-2022",
  //       size: "UK24",
  //       weight: "200gm",
  //       manifestdate: "23-01-2022",
  //       qty: "4",
  //       status: "VALIDATION FAILED",
  //       chooseActionValue: null,
  //       orderQuantity: 1,
  //     },
  //     {
  //       purchaseid: "#123450",
  //       orderid: "123456",
  //       orderdate: "12-01-2022",
  //       size: "UK24",
  //       weight: "200gm",
  //       manifestdate: "23-01-2022",
  //       qty: "4",
  //       status: "PRODUCT LIVE",
  //       chooseActionValue: null,
  //       orderQuantity: 1,
  //     },
  //   ];
  //   setTableData(rows);
  // }, []);

  // const filterByType = React.useCallback(() => {
  //   if (dropdownFilter && dropdownFilter.id) {
  //     switch (dropdownFilter?.id) {
  //       case "single":
  //         setTableRows(
  //           tableRows?.filter((row) => parseInt(row.col7, 10) === 1)
  //         );
  //         break;
  //       case "multiple":
  //         setTableRows(tableRows?.filter((row) => parseInt(row.col7, 10) > 1));
  //         break;
  //       default:
  //         setTableRows(mapRowsToTable(tableData));
  //     }
  //   } else {
  //     setTableRows(mapRowsToTable(tableData));
  //   }
  // }, [dropdownFilter]);

  // useEffect(() => {
  //   filterByType();
  // }, [dropdownFilter]);

  return (
    <Paper
      sx={{ p: 2, height: "100%" }}
      className="mnh-80vh overflow-auto hide-scrollbar mxh-80"
    >
      <Paper sx={{ px: 0, py: 2 }}>
        <TableComponent
          table_heading={`Returned Orders (${tableData.length})`}
          columns={columns}
          tableRows={tableData}
          showSearchbar={false}
          showCheckbox={false}
          showCustomDropdown
          customDropdownLabel="Order Type"
          customDropdownList={[
            { id: "single", label: "Single" },
            { id: "multiple", label: "Multiple" },
          ]}
          showCustomButton
          showSearchFilter={false}
          customButtonLabel="Download All Orders"
          onCustomButtonClick={() => {
            // console.log("onCustomButtonClick");
          }}
          onCustomDropdownChange={(val) => setDropdownFilter(val)}
          customDropdownValue={dropdownFilter}
        />
      </Paper>
      {openView && (
        <ModalComponent
          showFooter={false}
          ModalTitle="View Details"
          open={openView}
          onCloseIconClick={() => {
            setopenView(false);
          }}
        >
          <Grid className="p-2">
            {viewFormat("Order Id", eachOrderData.orderId)}
            {viewFormat(
              "Delivered Date",
              eachOrderData.deliveredDate.replace("T", " ")
            )}
            {viewFormat("Order Status", eachOrderData.orderStatus)}
            {viewFormat("Discount Amount", eachOrderData.discountAmount)}
            {viewFormat("Earning", eachOrderData.earning)}
            {viewFormat(
              "Expected Dispatch",
              eachOrderData.expectedDispatchDate
            )}
            {viewFormat("Margin Amount", eachOrderData.marginAmount)}
            {viewFormat("Mode Of Order", eachOrderData.modeOfOrder)}
            {viewFormat("Quentity", eachOrderData.orderQuantity)}
            {viewFormat("Ordered By", eachOrderData.orderedByType)}
            {viewFormat(
              `${eachOrderData.orderedByType} ID`,
              eachOrderData.orderedById
            )}
            {viewFormat("product Id", eachOrderData.productId)}
            {viewFormat("Product Owner Id", eachOrderData.productOwnerId)}
          </Grid>
        </ModalComponent>
      )}
    </Paper>
  );
};

export default ReturnedOrders;
