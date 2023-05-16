import { Paper } from "@mui/material";
import CustomIcon from "services/iconUtils";
import { useState, useEffect } from "react";
import TableComponent from "@/atoms/TableComponent";
import UploadWarrantyModal from "@/forms/supplier/myorder/UploadWarranty/UploadModal";
import { getData } from "services/supplier/orders/uploadwarranty";
import { useSelector } from "react-redux";
import toastify from "services/utils/toastUtils";
import ViewWarent from "@/forms/supplier/myorder/UploadWarranty/viewwarranty";

const columns = [
  {
    id: "col1", //  id value in column should be presented in row as key
    label: "Purchase Id",
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col2",
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
const UploadWarranty = () => {
  const [showUploadModal, setShowUploadModal] = useState(null);
  const [showView, setShowView] = useState(null);
  const { supplierId } = useSelector((state) => state.user);
  const [rows, setRows] = useState([]);
  const [pageNum, setPageNum] = useState(0);

  const mapData = (data) => {
    return data.map((item) => {
      return {
        id: item.productVariationId,
        warrantyAvailable: item.warrantyAvailable,
        taxInvoiceAvailable: item.taxInvoiceAvailable,
        payslipAvailable: item.payslipAvailable,
        col1: item.payId,
        col2: item.orderId,
        col3: item.orderDate,
        col4: item.modeOfOrder,
        col5: item.weight,
        col6: item.productQuantity,
        col7: item.status,
        col8: (
          <div className="d-flex justify-content-center">
            <CustomIcon
              type="upload"
              className="h-3"
              onIconClick={() => {
                setShowUploadModal(item);
              }}
            />
            <CustomIcon
              type="view"
              className="h-3 mx-1"
              onIconClick={() => {
                setShowView({
                  orderId: item.orderId,
                  productVariationId: item.productVariationId,
                  viewType: "TAX_INVOICE",
                });
              }}
            />
          </div>
        ),
      };
    });
  };

  const getTableDate = async (page) => {
    const { data, err } = await getData({
      supplierId,
      pageNumber: page,
      pagesize: 20,
    });
    if (data) {
      if (page === 0) {
        setRows(mapData(data));
      } else {
        setRows([...rows, ...mapData(data)]);
      }
      setPageNum(page + 1);
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };

  useEffect(() => {
    getTableDate(0);
  }, []);

  return (
    <Paper className="mxh-80vh mnh-80vh overflow-auto hide-scrollbar py-2">
      <TableComponent
        tableRows={[...rows]}
        columns={[...columns]}
        table_heading="Upload Warranty Details"
        showSearchbar={false}
        showSearchFilter={false}
        showCheckbox={false}
        handlePageEnd={(searchText, filterText, page = pageNum) => {
          getTableDate(page);
        }}
        handleRowsPerPageChange={() => {
          setPageNum(0);
        }}
      />
      {showUploadModal && (
        <UploadWarrantyModal
          warrentyDetails={showUploadModal}
          setShowModal={setShowUploadModal}
        />
      )}
      {showView && <ViewWarent warrantyDetails={showView} />}
    </Paper>
  );
};
export default UploadWarranty;
