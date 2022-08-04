import { Paper } from "@mui/material";
import TableComponent from "@/atoms/TableComponent";

const columns = [
  {
    id: "col1", //  id value in column should be presented in row as key
    label: "Subscription Title",
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col2",
    label: "Amount",
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col3",
    label: "Date & Time",
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col4",
    label: "Subscription Period",
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col5",
    label: "Status",
    align: "center",
    data_align: "center",
    data_classname: "",
  },
];
const rows = [
  {
    id: "1",
    col1: "title",
    col2: "10000",
    col3: "12/12/2020",
    col4: "08/12/2020",
    col5: "Active",
  },
  {
    id: "2",
    col1: "title",
    col2: "10000",
    col3: "12/12/2020",
    col4: "08/12/2020",
    col5: "Active",
  },
];

const SubscriptionHistory = () => {
  return (
    <Paper className="mxh-80vh mnh-80vh overflow-auto hide-scrollbar p-2">
      <TableComponent
        tableRows={[...rows]}
        columns={[...columns]}
        table_heading="Subscription History"
        showDateFilter
      />
    </Paper>
  );
};
export default SubscriptionHistory;
