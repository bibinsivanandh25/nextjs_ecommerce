import { Box, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomIcon from "services/iconUtils";
import TableComponent from "@/atoms/TableComponent";
import MenuOption from "@/atoms/MenuOptions";
import AddNoteModal from "@/forms/admin/payments&subscriptions/refundhistorycustomers/AddNoteModal";
import SwitchComponent from "@/atoms/SwitchComponent";
import ViewTransactionSummaryInward from "@/forms/admin/payments&subscriptions/supplierpenaltycharges/ViewTransactionSummaryInward";

const ResellerSubscriptions = () => {
  const [tableRows, setTableRows] = useState([]);
  const [openAddNoteModal, setOpenAddNoteModal] = useState(false);
  const [
    showViewTransactionSummaryInward,
    setShowViewTransactionSummaryInward,
  ] = useState(false);
  const tableColums = [
    {
      id: "col1",
      align: "center",
      label: "S.No.",
      data_align: "center",
      position: "sticky",
      minWidth: 120,
      data_classname: "",
    },
    {
      id: "col2",
      align: "center",
      label: "Order ID",
      data_align: "center",
      position: "sticky",
      minWidth: 120,
      data_classname: "",
    },
    {
      id: "col3",
      align: "center",
      label: "Supplier ID ",
      data_align: "center",
      minWidth: 120,
      data_classname: "",
    },
    {
      id: "col4",
      align: "center",
      label: "Business Name",
      data_align: "center",
      minWidth: 120,
      data_classname: "",
    },
    {
      id: "col5",
      align: "center",
      label: "Order Type",
      data_align: "center",
      minWidth: 120,
      data_classname: "",
    },
    {
      id: "col6",
      align: "center",
      label: "Charges",
      data_align: "center",
      minWidth: 120,
      data_classname: "",
    },
    {
      id: "col7",
      align: "center",
      label: "Reason",
      data_align: "center",
      minWidth: 120,
      data_classname: "",
    },
    {
      id: "col8",
      align: "center",
      label: "Payment Status",
      data_align: "center",
      minWidth: 120,
      data_classname: "",
    },
    {
      id: "col9",
      align: "center",
      label: "Payment Date & Time",
      data_align: "center",
      minWidth: 120,
      data_classname: "",
    },
    {
      id: "col10",
      align: "center",
      label: "Supplier Status",
      data_align: "center",
      minWidth: 120,
      data_classname: "",
    },
    {
      id: "col11",
      align: "center",
      label: "Action",
      data_align: "center",
      minWidth: 120,
      data_classname: "",
      position: "sticky",
    },
  ];

  const rowsForTable = [
    {
      id: 1,
      col1: "01",
      col2: "#762383",
      col3: "#237434",
      col4: "SKM Associates",
      col5: "Fixed Comission - Free Delivery & Return (Returnable)",
      col6: 320,
      col7: "Order Returned",
      col8: "pending 21/48",
      col9: "11/12/2021-17.21",
      col10: "Active",
      col11: "Actions",
    },
  ];

  const onClickOfMenuItem = (ele) => {
    if (ele === "Add a Note") {
      setOpenAddNoteModal(true);
    }
  };

  const getTableRows = () => {
    const result = [];
    rowsForTable.forEach((val, index) => {
      result.push({
        id: index + 1,
        col1: val.col1,
        col2: (
          <Typography className="color-blue h-5 text-decoration-underline cursor-pointer">
            {val.col2}
          </Typography>
        ),
        col3: (
          <Typography className="color-blue h-5 text-decoration-underline cursor-pointer">
            {val.col3}
          </Typography>
        ),
        col4: val.col4,
        col5: val.col5,
        col6: val.col6,
        col7: val.col7,
        col8: val.col8,
        col9: val.col9,
        col10: val.col10,
        col11: (
          <Box className="d-flex justify-content-evenly align-items-center">
            <CustomIcon
              type="view"
              className="h-4"
              onIconClick={() => setShowViewTransactionSummaryInward(true)}
            />
            <MenuOption
              getSelectedItem={(ele) => {
                console.log("Index", index);
                console.log("ele ", typeof ele);
                onClickOfMenuItem(ele, index);
              }}
              options={[
                "Notify",
                <Box className="d-flex align-items-center">
                  <Typography className="h-4">Enable Supplier</Typography>
                  <Box className="ms-3">
                    <SwitchComponent label="" />
                  </Box>
                </Box>,
              ]}
              IconclassName="h-4 color-gray"
            />
          </Box>
        ),
      });
    });

    setTableRows(result);
  };

  useEffect(() => {
    getTableRows();
  }, []);

  return (
    <>
      <Box>
        {!showViewTransactionSummaryInward ? (
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
        ) : (
          <ViewTransactionSummaryInward
            setShowViewTransactionSummaryInward={
              setShowViewTransactionSummaryInward
            }
          />
        )}
      </Box>
      <AddNoteModal
        openAddNoteModal={openAddNoteModal}
        setOpenAddNoteModal={setOpenAddNoteModal}
      />
    </>
  );
};

export default ResellerSubscriptions;
