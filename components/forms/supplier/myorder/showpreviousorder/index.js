import TableComponent from "components/atoms/TableComponent";
import PrintIcon from "@mui/icons-material/Print";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { Paper, Tooltip } from "@mui/material";

const ShowPreviousInvoices = ({ setShowInvoices = () => {} }) => {
  const columns = [
    {
      id: "col1", //  id value in column should be presented in row as key
      label: "Invoice ID",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col2",
      label: "Date and Time",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col3",
      label: "No. of Orders ",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col4",
      label: "Print Invoices",
      minWidth: 50,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
  ];
  let rows = [
    {
      id: "1",
      col1: "#23324234",
      col2: "28 may 2021",
      col3: "1",
      col4: (
        <div className="d-flex justify-content-center align-items-center ">
          <Tooltip title="Print" placement="top">
            <PrintIcon className="mx-2 tableIcons" />
          </Tooltip>
          <Tooltip title="Detail" placement="top">
            <RemoveRedEyeIcon />
          </Tooltip>
        </div>
      ),
    },
    {
      id: "2",
      col1: "#23324234",
      col2: "29 Apr 2021",
      col3: "2",
      col4: (
        <div className="d-flex justify-content-center align-items-center">
          <Tooltip title="Print" placement="top">
            <PrintIcon className="mx-2" />
          </Tooltip>
          <Tooltip title="Detail" placement="top">
            <RemoveRedEyeIcon />
          </Tooltip>
        </div>
      ),
    },
  ];
  return (
    <>
      <div
        className="color-orange d-flex align-items-center mb-3"
        onClick={() => {
          setShowInvoices(false);
        }}
      >
        <KeyboardArrowLeftIcon className="fw-bold fs-26" />
        <label>Back</label>
      </div>
      <Paper className="py-3">
        <TableComponent
          table_heading="Print Previous Invoices"
          tableRows={[...rows]}
          columns={[...columns]}
          showCheckbox={false}
        />
      </Paper>
    </>
  );
};
export default ShowPreviousInvoices;
