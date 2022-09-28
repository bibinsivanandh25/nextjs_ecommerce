/* eslint-disable no-use-before-define */
import CustomIcon from "services/iconUtils";
import { Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  deleteInvoiceTradeMark,
  getProductandInventoryData,
} from "services/supplier/invoiceandtrademark";
import toastify from "services/utils/toastUtils";
import TableComponent from "@/atoms/TableComponent";
import UploadDocumentModal from "@/forms/supplier/products/InvoiceAndTradeMarks";
import ViewDocument from "@/forms/supplier/products/InvoiceAndTradeMarks/ViewDocument";

const columns = [
  {
    id: "col1", //  id value in column should be presented in row as key
    label: "Sl.No",
    minWidth: 60,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col2",
    label: "Document Name",
    minWidth: 200,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col3",
    label: "Description",
    minWidth: 200,
    align: "center",
    data_align: "center",
    data_classname: "",
    // data_style: { paddingLeft: "7%" },
  },
  {
    id: "col4",
    label: "Uploaded Date & Time",
    minWidth: 200,
    align: "center",
    data_align: "center",
    data_classname: "",
    // data_style: { paddingLeft: "7%" },
  },
  {
    id: "col5",
    label: "File Type",
    minWidth: 200,
    align: "center",
    data_align: "center",
    data_classname: "",
    // data_style: { paddingLeft: "7%" },
  },
  {
    id: "col6",
    label: "Actions",
    minWidth: 200,
    align: "center",
    data_align: "center",
    data_classname: "",
    // data_style: { paddingLeft: "7%" },
  },
];
const InvoiceAndTradeMarks = () => {
  const user = useSelector((state) => state.user);
  const [pageNumber, setpageNumber] = useState(0);
  const [modalTitle, setModalTitle] = useState("add");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showViewModal, setshowViewModal] = useState(false);
  const [rows, setRows] = useState([]);
  const [defaultFormData, setDefaultFormData] = useState({
    filetype: null,
    filename: "",
    description: "",
    trademarkInvoiceId: "",
  });
  const [document, setDocument] = useState([]);
  const [viewModalData, setViewModalData] = useState({});
  const handleDeleteClick = async (item) => {
    if (item) {
      const { data, err } = await deleteInvoiceTradeMark(
        item.trademarkInvoiceId
      );
      if (data) {
        getAllTableData();
      }
      if (err) {
        toastify(err.response.data.message, "error");
      }
    }
  };
  const handleEditClick = (item) => {
    if (item) {
      setModalTitle("edit");
      setDefaultFormData({
        filetype: { value: item.documentType, label: item.documentType },
        filename: item.documentName,
        description: item.description,
        trademarkInvoiceId: item.trademarkInvoiceId,
      });
      setDocument(item.documentUrl);
      setShowUploadModal(true);
    }
  };
  const getAllTableRows = (data) => {
    const temp = [];
    if (data) {
      data.forEach((item, index) => {
        temp.push({
          id: index,
          col1: index + 1,
          col2: item.documentName,
          col3: (
            <Typography className="h-5 text-break mxh-50 overflow-y-scroll overflow-text">
              {item.description}
            </Typography>
          ),
          col4: item.lastModifiedAt
            ? new Date(item.lastModifiedAt).toLocaleString()
            : "--",
          col5: item.documentType,
          col6: (
            <div className="d-flex justify-content-center align-items-center">
              <CustomIcon
                className="fs-5"
                type="view"
                title="View"
                onIconClick={() => {
                  setViewModalData(item);
                  setshowViewModal(true);
                }}
              />
              &nbsp; &nbsp;
              <CustomIcon
                type="delete"
                className="fs-5"
                title="Delete"
                onIconClick={() => {
                  handleDeleteClick(item);
                }}
              />
              &nbsp; &nbsp;
              <CustomIcon
                title="Edit"
                type="edit"
                onIconClick={() => {
                  handleEditClick(item);
                }}
                className="fs-5"
              />
            </div>
          ),
        });
      });
    }
    return temp;
  };
  const getAllTableData = async (
    searchText = "",
    filterText = "",
    page = 0
  ) => {
    const { data, err } = await getProductandInventoryData(
      user.supplierId,
      searchText,
      page,
      filterText
    );
    if (data?.length) {
      if (page == 0) {
        setRows(getAllTableRows(data));
        setpageNumber((pre) => pre + 1);
      } else {
        setpageNumber((pre) => pre + 1);
        setRows((pre) => [...pre, ...getAllTableRows(data)]);
      }
    }
    if (err) {
      setRows([]);
      toastify(err.response.data.message, "error");
    }
  };
  useEffect(() => {
    getAllTableData("", "", 0);
  }, []);
  return (
    <Paper className="mxh-80vh mnh-80vh overflow-auto hide-scrollbar pt-1">
      <TableComponent
        tableRows={rows}
        columns={[...columns]}
        showCustomButton
        showSearchFilter={false}
        customButtonLabel="Upload Document"
        onCustomButtonClick={() => {
          setShowUploadModal(true);
          setModalTitle("add");
        }}
        handlePageEnd={(
          searchText = "",
          filterText = "ALL",
          page = pageNumber
        ) => {
          getAllTableData(searchText, filterText, page);
        }}
        handleRowsPerPageChange={() => {
          setpageNumber(0);
        }}
      />
      <UploadDocumentModal
        showModal={showUploadModal}
        setShowModal={setShowUploadModal}
        setDefaultFormData={setDefaultFormData}
        defaultFormData={defaultFormData}
        setDocument={setDocument}
        documents={document}
        getAllTableData={getAllTableData}
        setModalTitle={setModalTitle}
        modalTitle={modalTitle}
      />
      <ViewDocument
        showModal={showViewModal}
        setShowModal={setshowViewModal}
        setViewModalData={setViewModalData}
        viewModalData={viewModalData}
      />
    </Paper>
  );
};
export default InvoiceAndTradeMarks;
