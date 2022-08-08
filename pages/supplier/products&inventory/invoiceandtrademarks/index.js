import CustomIcon from "services/iconUtils";
import { Paper } from "@mui/material";
import { useState } from "react";
import TableComponent from "@/atoms/TableComponent";
import UploadDocumentModal from "@/forms/supplier/products/InvoiceAndTradeMarks";
import ViewDocument from "@/forms/supplier/products/InvoiceAndTradeMarks/ViewDocument";

const InvoiceAndTradeMarks = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showViewModal, setshowViewModal] = useState(false);

  const columns = [
    {
      id: "col1", //  id value in column should be presented in row as key
      label: "Sl.No",
      //   minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col2",
      label: "Document Name",
      //   minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col3",
      label: "Description",
      //   minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col4",
      label: "Uploaded Date & Time",
      //   minWidth: 50,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col5",
      label: "File Type",
      //   minWidth: 50,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col6",
      label: "Actions",
      //   minWidth: 50,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
  ];
  const rows = [
    {
      id: "1",
      col1: "01",
      col2: "577245",
      col3: "---",
      col4: "---",
      col5: "--",
      col6: (
        <div className="d-flex justify-content-center align-items-center">
          <CustomIcon
            className="fs-5"
            type="view"
            title="View"
            onIconClick={() => {
              setshowViewModal(true);
            }}
          />
          <CustomIcon type="delete" className="mx-2 fs-5" title="Delete" />
          <CustomIcon
            title="Edit"
            type="edit"
            onIconClick={() => {
              setShowUploadModal(true);
            }}
            className="fs-5"
          />
        </div>
      ),
    },
    {
      id: "2",
      col1: "02",
      col2: "577245",
      col3: "---",
      col4: "---",
      col5: "--",
      col6: (
        <div className="d-flex justify-content-center align-items-center ">
          <CustomIcon
            className="fs-5"
            type="view"
            title="View"
            onIconClick={() => {
              setshowViewModal(true);
            }}
          />
          <CustomIcon type="delete" className="mx-2 fs-5" title="Delete" />
          <CustomIcon
            className="fs-5"
            type="edit"
            title="Edit"
            onIconClick={() => {
              setShowUploadModal(true);
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <Paper className="mxh-80vh mnh-80vh overflow-auto hide-scrollbar py-2">
      <TableComponent
        tableRows={[...rows]}
        columns={[...columns]}
        showCustomButton
        showSearchFilter={false}
        customButtonLabel="Upload Document"
        onCustomButtonClick={() => {
          setShowUploadModal(true);
        }}
      />
      <UploadDocumentModal
        showModal={showUploadModal}
        setShowModal={setShowUploadModal}
      />
      <ViewDocument showModal={showViewModal} setShowModal={setshowViewModal} />
    </Paper>
  );
};
export default InvoiceAndTradeMarks;
