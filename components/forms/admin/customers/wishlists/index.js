import TableComponent from "@/atoms/TableComponent";
import { Box } from "@mui/material";
import Image from "next/image";
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
    label: "Product link",
    align: "center",
    minWidth: 50,
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col4",
    label: "Product Image",
    align: "center",
    minWidth: 50,
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col5",
    label: "Product Title",
    align: "center",
    minWidth: 50,
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col6",
    label: "Price",
    align: "center",
    minWidth: 50,
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col7",
    label: "Supplier ID",
    align: "center",
    minWidth: 50,
    data_align: "center",
    data_classname: "",
  },
];

const Wishlists = ({ selectedData = {} }) => {
  const [masterData, setMasterData] = useState([]);
  const mapStateToRow = (data) => {
    const temp = [];
    data.forEach((item, index) => {
      temp.push({
        col1: index + 1,
        col2: item.productVariationId,
        col3: item.productLink,
        col4: (
          <Image
            src={item.productImage}
            height={50}
            width={50}
            alt="No Image"
          />
        ),
        col5: item.productTitle,
        col6: item.price,
        col7: item.supplierId,
      });
    });
    return temp;
  };
  const getAllAddressData = async () => {
    const { data, err } = await viewModalApi(
      selectedData.customerId,
      "WISHLISTS"
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

export default Wishlists;
