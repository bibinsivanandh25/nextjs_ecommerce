import ModalComponent from "@/atoms/ModalComponent";
import { Grid, Paper, Typography } from "@mui/material";
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

const ManifestedOrders = () => {
  const [tableData, setTableData] = useState([]);
  const [eachOrderData, seteachOrderData] = useState({});
  const [openView, setopenView] = useState(false);
  const [modeOfOrderValue, setmodeOfOrderValue] = useState({});
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
      label: "Ordered Product Amount",
      id: "col9",
    },
    {
      label: "AWB Number",
      id: "col10",
    },
    {
      label: "Action",
      id: "col11",
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
          `${format(new Date(row?.manifestDate), "MM-dd-yyyy")} 00:00:00` ||
          "__",
        col7: row?.orderQuantity || "__",
        col8: row?.status || "__",
        col9: row?.orderedProductAmount || "__",
        col10: row?.awbNo || "__",
        col11: (
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
  const handleexcelDownload = () => {
    const data = tableData;
    const copyRowData = [];
    data.forEach((item, index) => {
      const tempObj = {};
      tempObj["Index"] = index + 1;
      tempObj["Purchase Id"] = item.col1;
      tempObj["Order Id"] = item.col2;
      tempObj["Order Date"] = item.col3;
      tempObj["Mode Of Order"] = item.col4;
      tempObj["weight Inclusive Package"] = item.col5;
      tempObj["Manifest Date"] = item.col6;
      tempObj["Qty"] = item.col7;
      tempObj["Status"] = item.col8;
      tempObj["ordered Product Amount"] = item.col9;
      tempObj["AWB Number"] = item.col10;

      copyRowData.push(tempObj);
    });
    exceldownload(copyRowData, "Manifested order details");
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
  const getDeleveredOrderData = async (page = pageNumberState) => {
    // const payload = {
    //   supplierId: user,
    //   status: "MANIFESTED",
    //   pageNumber: page,
    // };
    const payload = {
      supplierId: user,
      orderStatus: "MANIFESTED",
      modeOfOrder: null,
      pageNo: page || 0,
      pageSize: 50,
      shipmentType: modeOfOrderValue?.id || null,
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
      className="mnh-80vh overflow-auto hide-scrollbar mxh-80"
    >
      <Paper sx={{ px: 0, py: 2 }}>
        <TableComponent
          showCustomDropdown
          onCustomDropdownChange={(val) => {
            setmodeOfOrderValue(val);
            // console.log(val, "value");
          }}
          customDropdownValue={modeOfOrderValue}
          customDropdownList={[
            { id: "All", label: "All" },
            { id: "India Post", label: "India Post" },
            { id: "Delhivery", label: "Delhivery" },
          ]}
          // customDropdownValue
          customDropdownLabel="Mode Of Order"
          table_heading={`Manifested Orders (${tableData.length || 0})`}
          columns={columns}
          tableRows={tableData}
          showSearchbar={false}
          showCheckbox={false}
          showCustomButton
          showSearchFilter={false}
          handlePageEnd={() => {
            getDeleveredOrderData();
          }}
          // showCustomDropdown={false}
          customButtonLabel="Download All Orders"
          onCustomButtonClick={() => {
            handleexcelDownload();
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
              eachOrderData?.deliveredDate?.replace("T", " ")
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

export default ManifestedOrders;
