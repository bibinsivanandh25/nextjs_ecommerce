import ModalComponent from "@/atoms/ModalComponent";
import { Grid, Paper, Typography } from "@mui/material";
import TableComponent from "components/atoms/TableComponent";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CustomIcon from "services/iconUtils";
import {
  getOrderDetailsById,
  getOrderHistory,
} from "services/supplier/myorders/orderhistory";
import toastify from "services/utils/toastUtils";

const dropdownList = [
  {
    label: "All",
    id: "ALL",
  },
  {
    label: "Store Owner Delivery",
    id: "STORE_OWNER_DELIVERY",
  },
  {
    label: "Hand Pick",
    id: "HAND_PICK",
  },
  {
    label: "Last Mile AC",
    id: "LAST_MILE_AC",
  },
  {
    label: "Last Mile FDR",
    id: "LAST_MILE_FDR",
  },
  {
    label: "Supplier Shipment",
    id: "SUPPLIER_SHIPMENT",
  },
];
const CancelledOrders = () => {
  const [tableData, setTableData] = useState([]);
  const [eachOrderData, seteachOrderData] = useState({});
  const [openView, setopenView] = useState(false);
  const user = useSelector((state) => state.user?.supplierId);
  const [modeOfOrderValue, setmodeOfOrderValue] = useState({});
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
      id: "col8",
    },
    {
      label: "Total",
      id: "col9",
    },
    {
      label: "Action",
      id: "col10",
      align: "center",
    },
  ];
  const getOrderDataById = async (id) => {
    const { data, err } = await getOrderDetailsById(id);
    if (data) {
      seteachOrderData(data.data);
      setopenView(true);
    } else if (err) {
      toastify(err.response.data.message, "error");
    }
  };
  const mapRowsToTable = (data) => {
    const result = [];
    data?.forEach((row) => {
      result.push({
        col1: row?.purchaseid || "__",
        col2: row?.orderId || "__",
        col3: row?.orderDate || "__",
        col4: row?.size || "__",
        col5: row?.weightInclusivePackage || "__",
        col6: row?.manifestdate || "__",
        col7: row?.orderQuantity || "__",
        col8: row?.orderStatus || "__",
        col9: row?.orderAmount || "__",
        col10: (
          <Grid container>
            <Grid item xs={6}>
              <CustomIcon type="download" title="Download" />
            </Grid>
            <Grid item xs={6}>
              <CustomIcon
                type="view"
                title="View"
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

  const getCancelOrderData = async (page = pageNumberState) => {
    const payload = {
      supplierId: user,
      orderStatus: "CANCELLED",
      pageNo: page || 0,
      modeOfOrder:
        modeOfOrderValue?.id == "ALL" ? null : modeOfOrderValue?.id || null,
      pageSize: 50,
      shipmentType: null,
    };
    const { data, err } = await getOrderHistory(payload);
    if (data) {
      if (page == 0) {
        setpageNumberState(0);
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
    getCancelOrderData(0);
  }, [modeOfOrderValue]);
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
  // useEffect(() => {
  //   setTableRows(mapRowsToTable(tableData));
  // }, [tableData]);

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
      className="mnh-80vh mxh-80vh overflow-auto hide-scrollbar"
    >
      <Paper sx={{ px: 0, py: 2 }}>
        <TableComponent
          table_heading={`Cancelled Orders (${tableData.length})`}
          columns={columns}
          tableRows={tableData}
          showSearchbar={false}
          showSearchFilter={false}
          showCheckbox={false}
          showCustomDropdown
          customDropdownLabel="Mode Of Order"
          customDropdownList={dropdownList}
          showCustomButton
          customButtonLabel="Download All Orders"
          onCustomButtonClick={() => {
            // console.log("onCustomButtonClick");
          }}
          onCustomDropdownChange={(val) => setmodeOfOrderValue(val)}
          customDropdownValue={modeOfOrderValue}
          handlePageEnd={() => {
            getCancelOrderData();
          }}
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

export default CancelledOrders;
