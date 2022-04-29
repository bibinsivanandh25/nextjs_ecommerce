import ProgressBar from "components/atoms/ProgressBar";
import TableComponent from "components/atoms/TableComponent";
import PrintIcon from "@mui/icons-material/Print";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { Paper, Tooltip } from "@mui/material";

const UploadManifest = () => {
  const columns = [
    {
      id: "col1", //id value in column should be presented in row as key
      label: "<Manifest ID>",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col2",
      label: "Shipment Provider",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col3",
      label: "Manifest Date",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col4",
      label: "Number of Orders ",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col5",
      label: "Action",
      minWidth: 100,
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
      col2: "ECOM",
      col3: "28 may 2021",
      col4: "1",
      col5: (
        <div className="d-flex justify-content-center align-items-center ">
          <Tooltip title="Upload" placement="top">
            <FileUploadIcon />
          </Tooltip>
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
      col2: "Ecom",
      col3: "29 Apr 2021",
      col4: "2",
      col5: (
        <div className="d-flex justify-content-center align-items-center">
          <Tooltip title="Upload" placement="top">
            <FileUploadIcon />
          </Tooltip>
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
    <Paper sx={{ p: 2, height: "100%" }}>
      <ProgressBar
        steps={[
          "Accept & confirm Adress",
          "Generate Invoice & Manifest ",
          "Upload Maifest",
        ]}
      />
      <Paper className="py-3">
        <TableComponent columns={[...columns]} tableRows={[...rows]} />
      </Paper>
    </Paper>
  );
};
export default UploadManifest;
