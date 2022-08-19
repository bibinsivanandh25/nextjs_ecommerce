import { Box, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomIcon from "services/iconUtils";
import TableComponent from "@/atoms/TableComponent";
import SwitchComponent from "@/atoms/SwitchComponent";
import ViewTransactionSummaryInward from "@/forms/admin/payments&subscriptions/totalsubscriptions/ViewTransactionSummaryInward";
import EditModal from "@/forms/admin/payments&subscriptions/totalsubscriptions/EditModal";

const TotalSubscriptions = () => {
  const [tableRows, setTableRows] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);
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
      minWidth: 140,
      data_classname: "",
    },
    {
      id: "col2",
      align: "center",
      label: "Order ID",
      data_align: "center",
      position: "sticky",
      minWidth: 140,
      data_classname: "",
    },
    {
      id: "col3",
      align: "center",
      label: "Supplier ID/Reseller ID",
      data_align: "center",
      minWidth: 140,
      data_classname: "",
    },
    {
      id: "col4",
      align: "center",
      label: "Supplier Name/Reseller Name",
      data_align: "center",
      minWidth: 140,
      data_classname: "",
    },
    {
      id: "col5",
      align: "center",
      label: "Subscribed Tools",
      data_align: "center",
      minWidth: 140,
      data_classname: "",
    },
    {
      id: "col6",
      align: "center",
      label: "Subscriptions Days",
      data_align: "center",
      minWidth: 140,
      data_classname: "",
    },
    {
      id: "col7",
      align: "center",
      label: "Subscription Period Start Date & End Date with Time",
      data_align: "center",
      minWidth: 140,
      data_classname: "",
    },
    {
      id: "col8",
      align: "center",
      label: "Bought In Tool Campaign",
      data_align: "center",
      minWidth: 140,
      data_classname: "",
    },
    {
      id: "col9",
      align: "center",
      label: "Order Created Date & Time",
      data_align: "center",
      minWidth: 140,
      data_classname: "",
    },
    {
      id: "col10",
      align: "center",
      label: "Paid Amount",
      data_align: "center",
      minWidth: 140,
      data_classname: "",
    },
    {
      id: "col11",
      align: "center",
      label: "Status",
      data_align: "center",
      minWidth: 140,
      data_classname: "",
    },
    {
      id: "col12",
      align: "center",
      label: "Action",
      data_align: "center",
      minWidth: 140,
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
      col4: "--",
      col5: "Spin Wheel",
      col6: 7,
      col7: "1/11/2022-10.12-31/11/2022:10.12",
      col8: "No",
      col9: "11/12/2021-17.21",
      col10: "10",
      col11: "Active",
      col12: "Action",
    },
  ];

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
        col3: val.col3,
        col4: val.col4,
        col5: val.col5,
        col6: val.col6,
        col7: val.col7,
        col8: val.col8,
        col9: val.col9,
        col10: (
          <Typography className="color-light-gray h-5 cursor-pointer">
            {val.col10}
          </Typography>
        ),
        col11: val.col11,
        col12: (
          <Box className="d-flex justify-content-evenly align-items-center">
            <CustomIcon
              type="view"
              className="h-4 ms-4"
              onIconClick={() => setShowViewTransactionSummaryInward(true)}
            />
            <CustomIcon type="notification" className="h-4" />
            <CustomIcon
              type="edit"
              className="h-4 me-2"
              onIconClick={() => {
                setOpenEditModal(true);
              }}
            />
            <SwitchComponent label="" />
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
              table_heading="Total Subscriptions History"
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
      <EditModal
        openEditModal={openEditModal}
        setOpenEditModal={setOpenEditModal}
      />
    </>
  );
};

export default TotalSubscriptions;
