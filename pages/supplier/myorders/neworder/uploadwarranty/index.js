import { Paper } from "@mui/material";
import CustomIcon from "services/iconUtils";
import TableComponent from "@/atoms/TableComponent";

const columns = [
  {
    id: "col1", //  id value in column should be presented in row as key
    label: "Purchase Id",
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "Order ID",
    label: "Order Id",
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col3",
    label: "Order Date",
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col4",
    label: "Mode Of Order",
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col5",
    label: "Weight",
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col6",
    label: "Quantity",
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col7",
    label: "Status",
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col8",
    label: "Action",
    align: "center",
    data_align: "center",
    data_classname: "",
  },
];
const rows = [
  {
    id: "1",
    col1: "Quiz",
    col2: "Fixed",
    col3: "Shirts",
    col4: "Formal",
    col5: "12/12/2020",
    col6: "12/02/2021",
    col7: "08/12/2020",
    col8: (
      <div className="d-flex justify-content-center">
        <CustomIcon type="upload" className="h-3" />
        <CustomIcon type="view" className="h-3 mx-1" />
      </div>
    ),
  },
  {
    id: "1",
    col1: "Quiz",
    col2: "Fixed",
    col3: "Shirts",
    col4: "Formal",
    col5: "12/12/2020",
    col6: "12/02/2021",
    col7: "08/12/2020",
    col8: (
      <div className="d-flex justify-content-center">
        <CustomIcon type="upload" className="h-3" />
        <CustomIcon type="view" className="h-3 mx-1" />
      </div>
    ),
  },
];

const UploadWarranty = () => {
  return (
    <Paper className="mxh-80vh mnh-80vh overflow-auto hide-scrollbar py-2">
      <TableComponent
        tableRows={[...rows]}
        columns={[...columns]}
        table_heading="Upload Warranty Details"
        showSearchbar={false}
        showCheckbox={false}
      />
    </Paper>
  );
};
export default UploadWarranty;
