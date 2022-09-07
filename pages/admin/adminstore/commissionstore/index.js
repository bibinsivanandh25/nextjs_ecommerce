import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import TableComponent from "@/atoms/TableWithSpan";
import SwitchComponent from "@/atoms/SwitchComponent";
import MenuOption from "@/atoms/MenuOptions";

const CommissionStore = () => {
  const column1 = [
    {
      id: "col1", //  id value in column should be presented in row as key
      label: "S.No.",
      align: "center",
      data_align: "center",
      data_classname: "",
      rowSpan: 2,
    },

    {
      id: "col2",
      label: "Store Name",
      align: "center",
      data_align: "center",
      data_classname: "",
      rowSpan: 2,
    },
    {
      id: "col3",
      label: "Store Code",
      align: "center",
      data_align: "center",
      data_classname: "",
      rowSpan: 2,
    },
    {
      label: "Earnings",
      align: "center",
      data_align: "center",
      data_classname: "",
      colSpan: 2,
    },
    {
      label: "Marketing Tools",
      align: "center",
      data_align: "center",
      data_classname: "",
      colSpan: 3,
    },
    {
      id: "col9",
      label: "Status",
      minWidth: 150,
      align: "center",
      data_align: "center",
      data_classname: "",
      rowSpan: 2,
    },
    {
      id: "col10",
      label: "Action",
      minWidth: 150,
      align: "center",
      data_align: "center",
      data_classname: "",
      rowSpan: 2,
    },
  ];

  const column2 = [
    {
      id: "col4",
      label: "From Store",
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col5",
      label: "Referral Commission",
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col6",
      label: "Tool",
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col7",
      label: "Start Date",
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col8",
      label: "End Date",
      align: "center",
      data_align: "center",
      data_classname: "",
    },
  ];

  const rows = [
    {
      id: 1,
      col1: 1,
      col2: "Shop Bay",
      col3: "--",
      col4: "--",
      col5: "--",
      col6: "Spin Wheel",
      col7: "10-12-2022 11.45am",
      col8: "10-12-2022 11.45am",
      col9: "Active",
      col10: (
        <Box className="d-flex align-items-center justify-content-around">
          <Box className="d-flex flex-column align-items-center">
            <Box className="ms-4">
              <SwitchComponent label="" />
            </Box>
            <Typography className="h-5">Disable</Typography>
          </Box>
          <MenuOption
            getSelectedItem={(ele) => {
              console.log(ele);
              //   onClickOfMenuItem(ele);
            }}
            options={["view", "Edit"]}
            IconclassName="color-gray"
          />
        </Box>
      ),
    },
  ];

  return (
    <Paper className="p-3 mnh-85vh mxh-85vh overflow-auto hide-scrollbar">
      <TableComponent
        table_heading="Commission Store"
        columns={[...column2]}
        column2={[...column1]}
        tableRows={rows}
        tHeadBgColor="bg-light-gray"
        showPagination={false}
        showSearchFilter={false}
        showSearchbar={false}
        showCheckbox={false}
        showButton
        buttonLabel="Create Commission Store"
        onCustomButtonClick={() => {
          // setOpenAddDaysCounterModal(true);
        }}
      />
    </Paper>
  );
};

export default CommissionStore;
