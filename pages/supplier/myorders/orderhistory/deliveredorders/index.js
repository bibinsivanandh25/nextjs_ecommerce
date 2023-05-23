import ModalComponent from "@/atoms/ModalComponent";
import ViewOrderDetails from "@/forms/supplier/myorder/viewOrderDetails";
import { Grid, Paper } from "@mui/material";
import TableComponent from "components/atoms/TableComponent";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CustomIcon from "services/iconUtils";
import {
  getOrderDetailsById,
  getOrderHistory,
} from "services/supplier/myorders/orderhistory";
import exceldownload from "services/utils/exceldownload";
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
    label: "Last Mile",
    id: "LAST_MILE",
  },

  {
    label: "Supplier Shipment",
    id: "SUPPLIER_SHIPMENT",
  },
];
const DeliveredOrders = () => {
  const [tableData, setTableData] = useState([]);
  const [modeOfOrderValue, setmodeOfOrderValue] = useState({});
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
      label: "Mode Of Order",
      id: "col4",
    },
    {
      label: "Weight Inclusive Package",
      id: "col5",
    },
    {
      label: "Delivered Date",
      id: "col6",
    },
    {
      label: "Qty",
      id: "col7",
    },

    {
      label: "Ordered Product Amount",
      id: "col8",
    },
    {
      label: "AWB Number",
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
        col1: row?.purchaseId || "__",
        col2: row?.orderId || "__",
        col3: row?.orderDate || "__",
        col4: row?.modeOfOrder || "__",
        col5: row?.weightInclusivePackage || "__",
        col6:
          row?.allDate != null
            ? `${format(new Date(row?.allDate), "MM-dd-yyyy")} 00:00:00`
            : null,
        col7: row?.orderQuantity || "__",

        col8: row?.orderedProductAmount || "__",
        col9: row?.awbNo || "__",
        col10: (
          <Grid container>
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
  const handleexcelDownload = () => {
    const data = tableData;
    const copyRowData = [];
    data.forEach((item, index) => {
      const tempObj = {};
      tempObj.Index = index + 1;
      tempObj["Purchase Id"] = item.col1;
      tempObj["Order Id"] = item.col2;
      tempObj["Order Date"] = item.col3;
      tempObj["Mode Of Order"] = item.col4;
      tempObj["weight Inclusive Package"] = item.col5;
      tempObj["Delivered Date"] = item.col6;
      tempObj.Qty = item.col7;
      tempObj["ordered Product Amount"] = item.col8;
      tempObj["AWB Number"] = item.col9;

      copyRowData.push(tempObj);
    });
    exceldownload(copyRowData, "Delivered order details");
  };

  // useEffect(() => {
  //   setTableRows(mapRowsToTable(tableData));
  // }, [tableData]);

  const getDeleveredOrderData = async (page = pageNumberState) => {
    const payload = {
      supplierId: user,
      orderStatus: "DELIVERED",

      modeOfOrder:
        modeOfOrderValue?.id == "ALL" ? null : modeOfOrderValue?.id || null,
      pageNo: page || 0,
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
    getDeleveredOrderData(0);
  }, [modeOfOrderValue]);
  return (
    <Paper
      sx={{ p: 2, height: "100%" }}
      className="mnh-80vh mxh-80vh overflow-auto hide-scrollbar"
    >
      <Paper sx={{ px: 0, py: 2 }}>
        <TableComponent
          table_heading={`Delivered Orders (${tableData.length})`}
          columns={columns}
          tableRows={tableData}
          showCheckbox={false}
          showCustomDropdown
          customDropdownLabel="Mode Of Order"
          customDropdownList={dropdownList}
          showSearchFilter={false}
          showSearchbar={false}
          showCustomButton
          customButtonLabel="Download All Orders"
          onCustomButtonClick={() => {
            handleexcelDownload();
          }}
          onCustomDropdownChange={(val) => setmodeOfOrderValue(val)}
          customDropdownValue={modeOfOrderValue}
          handlePageEnd={() => {
            getDeleveredOrderData();
          }}
        />
      </Paper>
      {openView && (
        <ModalComponent
          showFooter={false}
          ModalTitle="View Details"
          open={openView}
          minWidth={800}
          onCloseIconClick={() => {
            setopenView(false);
          }}
        >
          <ViewOrderDetails eachOrderData={eachOrderData} />
        </ModalComponent>
      )}
    </Paper>
  );
};

export default DeliveredOrders;
