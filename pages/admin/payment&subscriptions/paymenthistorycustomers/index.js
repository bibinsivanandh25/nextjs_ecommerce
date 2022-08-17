import { Box, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomIcon from "services/iconUtils";
import TableComponent from "@/atoms/TableComponent";
import MenuOption from "@/atoms/MenuOptions";
import AddNoteModal from "@/forms/admin/payments&subscriptions/paymenthistorycustomers/AddNoteModal";

const PaymentHistorySuppliers = () => {
  const [tableRows, setTableRows] = useState([]);
  const [openAddNoteModal, setOpenAddNoteModal] = useState(false);
  const tableColums = [
    {
      id: "col1",
      align: "center",
      label: "01",
      data_align: "center",
      position: "sticky",
      minWidth: 150,
      data_classname: "",
    },
    {
      id: "col2",
      align: "center",
      label: "Cusromer ID/Reseller ID with Name",
      data_align: "center",
      position: "sticky",
      minWidth: 150,
      data_classname: "",
    },
    {
      id: "col3",
      align: "center",
      label: "Prepaid Order",
      data_align: "center",
      minWidth: 150,
      data_classname: "",
    },
    {
      id: "col4",
      align: "center",
      label: "COD Order",
      data_align: "center",
      minWidth: 150,
      data_classname: "",
    },
    {
      id: "col5",
      align: "center",
      label: "Total Order",
      data_align: "center",
      minWidth: 150,
      data_classname: "",
    },
    {
      id: "col6",
      align: "center",
      label: "Item Sub Total",
      data_align: "center",
      minWidth: 150,
      data_classname: "",
    },
    {
      id: "col7",
      align: "center",
      label: "Total Discount Applied",
      data_align: "center",
      minWidth: 150,
      data_classname: "",
    },
    {
      id: "col8",
      align: "center",
      label: "Grand Total",
      data_align: "center",
      minWidth: 150,
      data_classname: "",
    },
    {
      id: "col9",
      align: "center",
      label: "Total Shipping Charges",
      data_align: "center",
      minWidth: 150,
      data_classname: "",
    },
    {
      id: "col10",
      align: "center",
      label: "Actions",
      data_align: "center",
      minWidth: 150,
      position: "sticky",
      data_classname: "",
    },
  ];

  const rowsForTable = [
    {
      id: 1,
      col1: 1,
      col2: "#827342 Karan Ram",
      col3: 3,
      col4: 2,
      col5: 2,
      col6: 2500,
      col7: -150,
      col8: 2300,
      col9: 590,
      col10: "Action",
    },
  ];

  const onClickOfMenuItem = (ele) => {
    if (ele === "Add Note") {
      setOpenAddNoteModal(true);
    }
  };
  const options = ["Notify", "Add Note"];

  const getTableRows = () => {
    const anArray = [];
    rowsForTable.forEach((val, index) => {
      anArray.push({
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
        col4: (
          <Typography className="color-blue h-5 text-decoration-underline cursor-pointer">
            {val.col4}
          </Typography>
        ),
        col5: val.col5,
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
        col8: val.col8,
        col9: (
          <Typography className="color-blue h-5 text-decoration-underline cursor-pointer">
            {val.col9}
          </Typography>
        ),
        col10: (
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
            table_heading="Payment History – Customers / Reseller (Prepaid/COD)"
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

export default PaymentHistorySuppliers;
