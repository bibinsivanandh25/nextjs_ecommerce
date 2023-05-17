/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import TableComponent from "components/atoms/TableComponent";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { Paper } from "@mui/material";
import {
  getPreviousInvoice,
  viewPreviousInvoice,
} from "services/supplier/myorders/newOrders";
import toastify from "services/utils/toastUtils";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CustomIcon from "services/iconUtils";

const ShowPreviousInvoices = ({ setShowInvoices = () => {}, show }) => {
  const { supplierId } = useSelector((state) => state.user);
  const [PreviousInvoiceData, setPreviousInvoiceData] = useState([]);
  const [pageNumber, setpageNumber] = useState(0);
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
      label: "No. of Products ",
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
  const viewPreviousInvoiceFunction = async (id) => {
    const { data, err } = await viewPreviousInvoice(id);
    if (data) {
      // console.log(data.data);

      const temp = data.data;
      window.open(temp, "_blank").focus();
    } else if (err) {
      toastify(err.response.data.message, "error");
    }
  };
  const dataTableToMap = (data) => {
    const temp = [];
    data?.forEach((ele, index) => {
      temp.push({
        id: index + 1,
        col1: ele.invoiceId,
        col2: ele.invoiceDate,
        col3: ele.noOfProducts,
        col4: (
          <div className="d-flex justify-content-center align-items-center ">
            {/* <Tooltip title="Detail" placement="top">
              <RemoveRedEyeIcon />
            </Tooltip> */}
            <CustomIcon
              title="Detail"
              type="view"
              onIconClick={() => {
                viewPreviousInvoiceFunction(ele.invoiceId);
              }}
            />
          </div>
        ),
      });
    });
    return temp;
  };
  const getPreviousInvoiceFunction = async (page = pageNumber, key) => {
    const payload = {
      supplierId,
      keyword: key,
      pageNumber: page,
      pageSize: 20,
    };
    const { data, err } = await getPreviousInvoice(payload);
    if (data) {
      if (page == 0) {
        setPreviousInvoiceData([...dataTableToMap(data)]);
        setpageNumber(1);
      }
      if (page !== 0 && data?.data?.length) {
        setpageNumber((pre) => pre + 1);
        setPreviousInvoiceData((pre) => [...pre, ...dataTableToMap(data)]);
      }
    } else if (err) {
      toastify(err.response.data.message, "error");
    }
  };
  useEffect(() => {
    if (show) {
      getPreviousInvoiceFunction();
    }
  }, [show]);
  return (
    <>
      <div
        className="color-orange d-flex align-items-center mb-3"
        onClick={() => {
          setShowInvoices(false);
        }}
      >
        <KeyboardArrowLeftIcon className="fw-bold fs-26" />
        <span>Back</span>
      </div>
      <Paper className="py-3">
        <TableComponent
          showSearchFilter={false}
          table_heading="Print Previous Invoices"
          tableRows={[...PreviousInvoiceData]}
          columns={[...columns]}
          showCheckbox={false}
          handlePageEnd={(keyword, _, page) => {
            getPreviousInvoiceFunction(page, keyword);
            // getAllData(searchText, filterText, page);
          }}
        />
      </Paper>
    </>
  );
};
export default ShowPreviousInvoices;
