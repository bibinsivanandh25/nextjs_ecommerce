import TableComponent from "@/atoms/TableComponent";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { viewModalApi } from "services/admin/customers";
import toastify from "services/utils/toastUtils";

const tableColumns = [
  {
    id: "col1",
    label: "Sl NO.",
    minWidth: 50,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col2",
    label: "Supplier ID",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col3",
    label: "order ID",
    align: "center",
    minWidth: 50,
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col4",
    label: "Product link",
    align: "center",
    minWidth: 50,
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col5",
    label: "order Status",
    align: "center",
    minWidth: 50,
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col6",
    label: "order type",
    align: "center",
    minWidth: 50,
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col7",
    label: "Product ID",
    align: "center",
    minWidth: 50,
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col8",
    label: "Price",
    align: "center",
    minWidth: 50,
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col9",
    label: "order date & time",
    align: "center",
    minWidth: 50,
    data_align: "center",
    data_classname: "",
  },
];

const OrderHistory = ({ selectedData = {} }) => {
  const [masterData, setMasterData] = useState([]);
  const mapStateToRow = (data) => {
    const temp = [];
    data.forEach((item, index) => {
      temp.push({
        col1: index + 1,
        col2: item.supplierId,
        col3: item.orderId,
        col4: item.productLink,
        col5: (
          <Typography className="text-capitalize h-5">
            {item.orderStatus.toLowerCase()}
          </Typography>
        ),
        col6: (
          <Typography className="text-capitalize h-5">
            {item.orderType.toLowerCase()}
          </Typography>
        ),
        col7: item?.productVariationId,
        col8: item.price,
        col9: new Date(item.orderedAt).toLocaleString(),
      });
    });
    return temp;
  };
  const getAllAddressData = async () => {
    const { data, err } = await viewModalApi(
      selectedData.customerId,
      "ORDER_HISTORY"
    );
    if (data) {
      setMasterData(mapStateToRow(data));
    }
    if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };
  useEffect(() => {
    if (selectedData.customerId !== "") {
      getAllAddressData();
    }
  }, [selectedData]);
  return (
    <Box>
      {masterData.length ? (
        <Box>
          <TableComponent
            tableRows={[...masterData]}
            columns={[...tableColumns]}
            showSearchFilter={false}
            showSearchbar={false}
          />
        </Box>
      ) : null}
    </Box>
  );
};

export default OrderHistory;
