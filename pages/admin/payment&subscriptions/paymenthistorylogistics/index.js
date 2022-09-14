import { Box, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomIcon from "services/iconUtils";
import TableComponent from "@/atoms/TableWithSpan";
import MenuOption from "@/atoms/MenuOptions";
import ButtonComponent from "@/atoms/ButtonComponent";
import TransactionFailed from "@/forms/admin/payments&subscriptions/paymenthistorylogistics/TransactionFailed";
import AddNoteModal from "@/forms/admin/payments&subscriptions/paymenthistorylogistics/AddNoteModal";
import ViewModal from "@/forms/admin/payments&subscriptions/paymenthistorylogistics/ViewModal";

const PaymentHistoryLogistics = () => {
  const options = ["Add Note"];
  const [tableRows, setTableRows] = useState([]);
  const [showTransactionFailed, setShowTransactionFailed] = useState(false);
  const [openAddNoteModal, setOpenAddNoteModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);

  const column1 = [
    {
      id: "col1", //  id value in column should be presented in row as key
      label: "S.No.",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      rowSpan: 2,
      position: "sticky",
    },

    {
      id: "col2",
      label: "Payment Date",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      rowSpan: 2,
      position: "sticky",
    },
    {
      id: "col3",
      label: "Total Orders",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      rowSpan: 2,
    },
    {
      id: "col4",
      label: "Total Sales Value",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      rowSpan: 2,
    },
    {
      label: "Postal Department",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      colSpan: 4,
    },
    {
      label: "Delivery",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      colSpan: 4,
    },
    {
      label: "Third Party",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      colSpan: 4,
    },
    {
      id: "col17",
      label: "Transaction Status",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      rowSpan: 2,
    },
    {
      id: "col18",
      label: "Action",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      rowSpan: 2,
      position: "sticky",
    },
  ];

  const column2 = [
    {
      id: "col5",
      label: "F",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col6",
      label: "R",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col7",
      label: "RTO",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col8",
      label: "Issuse/Lost",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col9",
      label: "F",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col10",
      label: "R",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col11",
      label: "RTO",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col12",
      label: "Issuse/Lost",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col3",
      label: "F",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col14",
      label: "R",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col15",
      label: "RTO",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col16",
      label: "Issuse/Lost",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
  ];

  const rowsForTable = [
    {
      id: 1,
      col1: 1,
      col2: "15/10/2021",
      col3: 438,
      col4: 56782,
      col5: 48,
      col6: 44,
      col7: 23,
      col8: 23 / 0,
      col9: 48,
      col10: 44,
      col11: 23,
      col12: 23 / 0,
      col13: 48,
      col14: 44,
      col15: 23,
      col16: 23 / 0,
      col17: { status: "Pending", finished: 5, left: 438 },
      col18: "Action",
    },
  ];

  const onClickOfMenuItem = (ele) => {
    if (ele === "Add Note") {
      setOpenAddNoteModal(true);
    }
  };

  useEffect(() => {
    const result = [];
    rowsForTable.forEach((val, index) => {
      result.push({
        id: index + 1,
        col1: val.col1,
        col2: val.col2,
        col3: (
          <Typography className="color-blue h-5 text-decoration-underline cursor-pointer">
            {val.col3}
          </Typography>
        ),
        col4: val.col4,
        col5: (
          <Typography className="color-blue h-5 text-decoration-underline cursor-pointer">
            {val.col5}
          </Typography>
        ),
        col6: (
          <Typography className="color-blue h-5 text-decoration-underline cursor-pointer">
            {val.col6}
          </Typography>
        ),
        col7: (
          <Typography className="color-blue h-5 text-decoration-underline cursor-pointer">
            {val.col7}
          </Typography>
        ),
        col8: (
          <Typography className="color-blue h-5 text-decoration-underline cursor-pointer">
            {val.col7}
          </Typography>
        ),
        col9: (
          <Typography className="color-blue h-5 text-decoration-underline cursor-pointer">
            {val.col9}
          </Typography>
        ),
        col10: (
          <Typography className="color-blue h-5 text-decoration-underline cursor-pointer">
            {val.col10}
          </Typography>
        ),
        col11: (
          <Typography className="color-blue h-5 text-decoration-underline cursor-pointer">
            {val.col11}
          </Typography>
        ),
        col12: (
          <Typography className="color-blue h-5 text-decoration-underline cursor-pointer">
            {val.col12}
          </Typography>
        ),
        col13: (
          <Typography className="color-blue h-5 text-decoration-underline cursor-pointer">
            {val.col13}
          </Typography>
        ),
        col14: (
          <Typography className="color-blue h-5 text-decoration-underline cursor-pointer">
            {val.col14}
          </Typography>
        ),
        col15: (
          <Typography className="color-blue h-5 text-decoration-underline cursor-pointer">
            {val.col15}
          </Typography>
        ),
        col16: (
          <Typography className="color-blue h-5 text-decoration-underline cursor-pointer">
            {val.col16}
          </Typography>
        ),
        col17: (
          <Box>
            <Typography>{val.col17.status}</Typography>
            <Typography className="color-blue h-5 text-decoration-underline cursor-pointer">
              {val.col17.left}/{val.col17.finished}
            </Typography>
          </Box>
        ),
        col18: (
          <Box className="d-flex justify-content-evenly align-items-center">
            <CustomIcon
              type="view"
              className="h-4"
              onIconClick={() => setOpenViewModal(true)}
            />
            <MenuOption
              getSelectedItem={(ele) => {
                // console.log("Index", index);
                // console.log("ele ", typeof ele);
                onClickOfMenuItem(ele, index);
              }}
              options={options}
              IconclassName="h-4 color-gray"
            />
          </Box>
        ),
      });
    });
    setTableRows([...result]);
  }, []);

  return (
    <>
      <Box>
        {!showTransactionFailed ? (
          <Paper className="mnh-85vh mxh-85vh p-3 overflow-auto hide-scrollbar">
            <Paper className="p-3 w-100 m-auto d-flex justify-content-between align-items-center">
              <Typography className="color-orange fw-bold">
                Transaction Failed - 5
              </Typography>
              <ButtonComponent
                onBtnClick={() => {
                  setShowTransactionFailed(true);
                }}
                label="View"
              />
            </Paper>
            <TableComponent
              showCheckbox={false}
              tHeadBgColor="bg-gray-1"
              tableRows={tableRows}
              columns={[...column2]}
              column2={[...column1]}
              stickyHeader
            />
          </Paper>
        ) : (
          <TransactionFailed
            setShowTransactionFailed={setShowTransactionFailed}
          />
        )}
      </Box>
      <AddNoteModal
        openAddNoteModal={openAddNoteModal}
        setOpenAddNoteModal={setOpenAddNoteModal}
      />
      <ViewModal
        openViewModal={openViewModal}
        setOpenViewModal={setOpenViewModal}
      />
    </>
  );
};

export default PaymentHistoryLogistics;
