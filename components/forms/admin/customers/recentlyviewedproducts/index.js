import TableComponent from "@/atoms/TableComponent";
import { Box } from "@mui/material";
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
    label: "Product ID",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col3",
    label: "Product Title",
    align: "center",
    minWidth: 50,
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col4",
    label: "Product Link",
    align: "center",
    minWidth: 50,
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col5",
    label: "Vendor ID/ business name",
    align: "center",
    minWidth: 50,
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col6",
    label: "Sale Price",
    align: "center",
    minWidth: 50,
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col7",
    label: "MRP",
    align: "center",
    minWidth: 50,
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col8",
    label: "Categories/ Sub categories",
    align: "center",
    minWidth: 50,
    data_align: "center",
    data_classname: "",
  },
];

const Recentlyviewedproducts = ({ selectedData = {} }) => {
  const [masterData, setMasterData] = useState([]);
  const mapStateToRow = (data) => {
    const temp = [];
    data.forEach((item, index) => {
      temp.push({
        col1: index + 1,
        col2: item.productVariationId,
        col3: item.productTitle,
        col4: "--",
        col5: `${item.supplierId} / ${item.storeName}`,
        col6: item.salePrice,
        col7: item.mrp,
        col8: `${item.category} / ${item.subCategory}`,
      });
    });
    return temp;
  };
  const getAllAddressData = async () => {
    const { data, err } = await viewModalApi(
      selectedData.customerId,
      "RECENTLY_VIEWED_PRODUCTS"
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

export default Recentlyviewedproducts;
