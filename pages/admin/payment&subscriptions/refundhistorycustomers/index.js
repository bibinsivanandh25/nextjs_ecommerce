import { Box, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomIcon from "services/iconUtils";
import TableComponent from "@/atoms/TableComponent";
import MenuOption from "@/atoms/MenuOptions";
import AddNoteModal from "@/forms/admin/payments&subscriptions/refundhistorycustomers/AddNoteModal";

const RefundHistoryCustomers = () => {
  const [tableRows, setTableRows] = useState([]);
  const [openAddNoteModal, setOpenAddNoteModal] = useState(false);
  const tableColums = [
    {
      id: "col1",
      align: "center",
      label: "S.No.",
      data_align: "center",
      position: "sticky",
      minWidth: 100,
      data_classname: "",
    },
    {
      id: "col2",
      align: "center",
      label: "Request ID",
      data_align: "center",
      position: "sticky",
      minWidth: 100,
      data_classname: "",
    },
    {
      id: "col3",
      align: "center",
      label: "Customer ID / Reseller ID / Supplier ID Name",
      data_align: "center",
      minWidth: 100,
      data_classname: "",
    },
    {
      id: "col4",
      align: "center",
      label: "Order ID",
      data_align: "center",
      minWidth: 100,
      data_classname: "",
    },
    {
      id: "col5",
      align: "center",
      label: "Deductions",
      data_align: "center",
      minWidth: 100,
      data_classname: "",
    },
    {
      id: "col6",
      align: "center",
      label: "Refund Amount after Deduction",
      data_align: "center",
      minWidth: 100,
      data_classname: "",
    },
    {
      id: "col7",
      align: "center",
      label: "Payment ID",
      data_align: "center",
      minWidth: 100,
      data_classname: "",
    },
    {
      id: "col8",
      align: "center",
      label: "Payment source",
      data_align: "center",
      minWidth: 100,
      data_classname: "",
    },
    {
      id: "col9",
      align: "center",
      label: "Order Type",
      data_align: "center",
      minWidth: 100,
      data_classname: "",
    },
    {
      id: "col10",
      align: "center",
      label: "Order Status",
      data_align: "center",
      minWidth: 100,
      data_classname: "",
    },
    {
      id: "col11",
      align: "center",
      label: "Refund Initiated Date & Time",
      data_align: "center",
      minWidth: 100,
      data_classname: "",
    },
    {
      id: "col12",
      align: "center",
      label: "Payment ID",
      data_align: "center",
      minWidth: 100,
      data_classname: "",
    },
    {
      id: "col13",
      align: "center",
      label: "Transaction Status",
      data_align: "center",
      minWidth: 100,
      data_classname: "",
    },
    {
      id: "col14",
      align: "center",
      label: "Reason",
      data_align: "center",
      minWidth: 100,
      data_classname: "",
    },
    {
      id: "col15",
      align: "center",
      label: "Action",
      data_align: "center",
      minWidth: 100,
      position: "sticky",
      data_classname: "",
    },
  ];

  const rowsForTable = [
    {
      id: 1,
      col1: "01",
      col2: "#762383",
      col3: "#237434 Ram Raj",
      col4: "#83745343",
      col5: "--",
      col6: 500,
      col7: "--",
      col8: "--",
      col9: "Free Delivery & Return(Returnable)",
      col10: "Order Status",
      col11: "Refund Initiated Date & Time",
      col12: "Payment ID",
      col13: "Transaction Status",
      col14: "Reason",
      col15: "Action",
    },
  ];

  const onClickOfMenuItem = (ele) => {
    if (ele === "Add a Note") {
      setOpenAddNoteModal(true);
    }
  };
  const options = ["Refund", "Add a Note", "Notify"];

  const getTableRows = () => {
    const anArray = [];
    rowsForTable.forEach((val, index) => {
      anArray.push({
        id: index + 1,
        col1: val.col1,
        col2: val.col2,
        col3: val.col3,
        col4: (
          <Typography className="color-blue h-5 text-decoration-underline cursor-pointer">
            {val.col4}
          </Typography>
        ),
        col5: val.col5,
        col6: val.col6,
        col7: val.col7,
        col8: val.col8,
        col9: val.col9,
        col10: val.col10,
        col11: val.col11,
        col12: (
          <Typography className="color-blue h-5 text-decoration-underline cursor-pointer">
            {val.col12}
          </Typography>
        ),
        col13: val.col13,
        col14: val.col14,
        col15: (
          <Box className="d-flex justify-content-evenly align-items-center">
            <CustomIcon
              type="view"
              className="h-4"
              //   onIconClick={() => setShowViewProducts(true)}
            />
            <MenuOption
              getSelectedItem={(ele) => {
                console.log("Index", index);
                console.log("ele ", typeof ele);
                onClickOfMenuItem(ele, index);
              }}
              options={options}
              IconclassName="h-4 color-gray"
            />
          </Box>
        ),
      });
    });

    setTableRows(anArray);
  };

  useEffect(() => {
    getTableRows();
  }, []);

  return (
    <>
      <Box>
        <Paper className="mnh-85vh mxh-85vh p-3 overflow-auto hide-scrollbar">
          <TableComponent
            table_heading="Refund History"
            columns={[...tableColums]}
            tableRows={tableRows}
            tHeadBgColor="bg-light-gray"
            showPagination={false}
            showSearchFilter={false}
            showSearchbar={false}
            showCheckbox={false}
            showDateFilter
            stickyHeader
          />
        </Paper>
      </Box>
      <AddNoteModal
        openAddNoteModal={openAddNoteModal}
        setOpenAddNoteModal={setOpenAddNoteModal}
      />
    </>
  );
};

export default RefundHistoryCustomers;
