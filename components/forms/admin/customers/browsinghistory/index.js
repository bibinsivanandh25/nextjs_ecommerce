import TableComponent from "@/atoms/TableComponent";
import { Box } from "@mui/material";
import { useState, useEffect } from "react";
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
    label: "Description",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col3",
    label: "Date & Time",
    align: "center",
    minWidth: 50,
    data_align: "center",
    data_classname: "",
  },
];
const BrowsingHistory = ({ selectedData = {} }) => {
  const [masterData, setMasterData] = useState([]);
  const mapStateToRow = (data) => {
    const temp = [];
    data.forEach((item, index) => {
      temp.push({
        col1: index + 1,
        col2: item.keyword,
        col3: item.searchedAt,
      });
    });
    return temp;
  };
  const getAllAddressData = async () => {
    const { data, err } = await viewModalApi(
      selectedData.customerId,
      "BROWSING_HISTORY"
    );
    if (data) {
      setMasterData(mapStateToRow(data));
    }
    if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };
  console.log(masterData, "masterData");
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

export default BrowsingHistory;
