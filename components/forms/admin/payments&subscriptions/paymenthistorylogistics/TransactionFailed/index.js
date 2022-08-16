import { Box, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomIcon from "services/iconUtils";
import TableComponent from "@/atoms/TableComponent";
import MenuOption from "@/atoms/MenuOptions";
import AddNoteModal from "./AddNoteModal";

const TransactionFailed = ({ setShowTransactionFailed }) => {
  const [tableRows, setTableRows] = useState([]);
  const [openAddNoteModal, setOpenAddNoteModal] = useState(false);
  const tableColums = [
    {
      id: "col1",
      align: "center",
      label: "S.No.",
      data_align: "center",
    },
    {
      id: "col2",
      align: "center",
      label: "Date",
      data_align: "center",
    },
    {
      id: "col3",
      align: "center",
      label: "Order Id",
      data_align: "center",
    },
    {
      id: "col4",
      align: "center",
      label: "Weight/Volume",
      data_align: "center",
    },
    {
      id: "col5",
      align: "center",
      label: "Delivery Type",
      data_align: "center",
    },
    {
      id: "col6",
      align: "center",
      label: "Delivery Mode",
      data_align: "center",
    },
    {
      id: "col7",
      align: "center",
      label: "Delivery Charge",
      data_align: "center",
    },
    {
      id: "col8",
      align: "center",
      label: "Losgistic Partner",
      data_align: "center",
    },
    {
      id: "col9",
      align: "center",
      label: "Payment ID",
      data_align: "center",
    },
    {
      id: "col10",
      align: "center",
      label: "Transaction Status",
      data_align: "center",
    },
    {
      id: "col11",
      align: "center",
      label: "Reason",
      data_align: "center",
    },
    {
      id: "col12",
      align: "center",
      label: "Actions",
      data_align: "center",
    },
  ];

  const rowsForTable = [
    {
      id: 1,
      col1: 1,
      col2: "15/10/2021",
      col3: "#7346583",
      col4: "Zero Commission",
      col5: 450,
      col6: "#7346583",
      col7: "450",
      col8: 122,
      col9: "Successful",
      col10: "Invalid Banking details",
      col11: "Action",
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
        col2: val.col2,
        col3: val.col3,
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
          <Typography
            className="h-5 mb-3 cursor-pointer"
            onClick={() => {
              setShowTransactionFailed(false);
            }}
          >
            {"<"}Back
          </Typography>
          <Paper className="mt-1">
            <TableComponent
              table_heading="Bounce Back - 5"
              columns={tableColums}
              tableRows={tableRows}
              tHeadBgColor="bg-light-gray"
              showPagination={false}
              showSearchFilter={false}
              showSearchbar={false}
              showCheckbox={false}
              showDateFilter
            />
          </Paper>
        </Paper>
      </Box>
      <AddNoteModal
        openAddNoteModal={openAddNoteModal}
        setOpenAddNoteModal={setOpenAddNoteModal}
      />
    </>
  );
};

export default TransactionFailed;
