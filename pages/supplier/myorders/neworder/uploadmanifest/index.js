import ProgressBar from "components/atoms/ProgressBar";
import TableComponent from "components/atoms/TableComponent";
import PrintIcon from "@mui/icons-material/Print";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { Paper, Tooltip } from "@mui/material";
import { getAllManifest } from "services/supplier/myorders/newOrders";
import toastify from "services/utils/toastUtils";
import { useSelector } from "react-redux";
import { useState } from "react";

const UploadManifest = () => {
  const { supplierId } = useSelector((state) => state.user);
  const [pageNumber, setpageNumber] = useState(0);
  const columns = [
    {
      id: "col1", //  id value in column should be presented in row as key
      label: "Manifest ID",

      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col2",
      label: "Shipment Provider",

      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col3",
      label: "Manifest Date",

      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col4",
      label: "Number of Orders ",

      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col5",
      label: "Action",

      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
  ];
  const rows = [
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
            <PrintIcon className="mx-4 tableIcons" />
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
            <PrintIcon className="mx-4" />
          </Tooltip>
          <Tooltip title="Detail" placement="top">
            <RemoveRedEyeIcon />
          </Tooltip>
        </div>
      ),
    },
  ];
  const getAllManifestFunction = async (page = pageNumber, key) => {
    const payload = {
      supplierId,
      keyword: key,
      pageNumber: page,
      pageSize: 50,
    };
    const { data, err } = await getAllManifest(payload);
    if (data) {
      console.log(data, "data");
    } else if (err) {
      toastify(err.response.data.message, "error");
    }
  };
  return (
    <Paper
      sx={{ p: 2 }}
      className="mnh-80vh mxh-80vh overflow-auto hide-scrollbar"
    >
      <ProgressBar />
      <Paper className="py-3">
        <TableComponent columns={[...columns]} tableRows={[...rows]} />
      </Paper>
    </Paper>
  );
};
export default UploadManifest;
