import { Box, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomIcon from "services/iconUtils";
import TableComponent from "@/atoms/TableComponent";
import AddNoteModal from "@/forms/admin/payments&subscriptions/paymenthistorycustomers/AddNoteModal";
import ButtonComponent from "@/atoms/ButtonComponent";

const CodOrderPaymentLogistics = () => {
  const [tableRows, setTableRows] = useState([]);
  const [openAddNoteModal, setOpenAddNoteModal] = useState(false);
  const tableColums = [
    {
      id: "col1",
      align: "center",
      label: "01",
      data_align: "center",
      position: "sticky",
      minWidth: 130,
      data_classname: "",
    },
    {
      id: "col2",
      align: "center",
      label: "Payment ID",
      data_align: "center",
      position: "sticky",
      minWidth: 130,
      data_classname: "",
    },
    {
      id: "col3",
      align: "center",
      label: "Logistic Partner",
      data_align: "center",
      minWidth: 130,
      data_classname: "",
    },
    {
      id: "col4",
      align: "center",
      label: "Tracking ID",
      data_align: "center",
      minWidth: 130,
      data_classname: "",
    },
    {
      id: "col5",
      align: "center",
      label: "Order ID",
      data_align: "center",
      minWidth: 130,
      data_classname: "",
    },
    {
      id: "col6",
      align: "center",
      label: "Cross Sales Amount",
      data_align: "center",
      minWidth: 130,
      data_classname: "",
    },
    {
      id: "col7",
      align: "center",
      label: "Weight/Volume During Pickup",
      data_align: "center",
      minWidth: 130,
      data_classname: "",
    },
    {
      id: "col8",
      align: "center",
      label: "Shipment Charges Deducted",
      data_align: "center",
      minWidth: 130,
      data_classname: "",
    },
    {
      id: "col9",
      align: "center",
      label: "Payable amount",
      data_align: "center",
      minWidth: 130,
      data_classname: "",
    },
    {
      id: "col10",
      align: "center",
      label: "Payment Status",
      data_align: "center",
      minWidth: 130,
      data_classname: "",
    },
    {
      id: "col11",
      align: "center",
      label: "Payment Date & Time",
      data_align: "center",
      minWidth: 130,
      data_classname: "",
    },
    {
      id: "col12",
      align: "center",
      label: "Comments",
      data_align: "center",
      minWidth: 130,
      position: "sticky",
      data_classname: "",
    },
  ];

  const rowsForTable = [
    {
      id: 1,
      col1: 1,
      col2: "#762383",
      col3: "India Post",
      col4: "#83745343",
      col5: "#9283042",
      col6: "2599",
      col7: "1.2kg/2.8kg",
      col8: "233+50",
      col9: 2316,
      col10: "Payment Received",
      col11: "11/12/2021-11.22",
      col12: "Some Comments",
    },
  ];

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
        col5: (
          <Typography className="color-blue h-5 text-decoration-underline cursor-pointer">
            {val.col5}
          </Typography>
        ),
        col6: val.col6,
        col7: val.col7,
        col8: val.col8,
        col9: val.col9,
        col10: val.col10,
        col11: val.col11,
        col12: (
          <Box className="d-flex align-items-center">
            <Typography className="h-5 text-truncate">{val.col12}</Typography>
            <CustomIcon
              className="h-4 ms-2"
              type="edit"
              showColorOnHover={false}
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
          <Box className="d-flex justify-content-between mb-4 align-items-center">
            <Typography className="color-orange fw-bold">
              COD Order Received / Pending Payments (Logistics)
            </Typography>
            <Box className="d-flex">
              <ButtonComponent
                showIcon
                iconOrintation="end"
                iconName="arrowDropIcon"
                label="Upload"
                bgColor="bg-light-gray color-black me-2"
                iconColorClass="color-gray"
              />
              <ButtonComponent
                showIcon
                iconOrintation="end"
                iconName="arrowDropIcon"
                label="Download"
                iconColorClass="color-white"
              />
            </Box>
          </Box>
          <TableComponent
            columns={[...tableColums]}
            tableRows={tableRows}
            tHeadBgColor="bg-light-gray"
            showPagination={false}
            showSearchFilter={false}
            showSearchbar={false}
            showCheckbox={false}
            showDateFilter
            // stickyHeader
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

export default CodOrderPaymentLogistics;
