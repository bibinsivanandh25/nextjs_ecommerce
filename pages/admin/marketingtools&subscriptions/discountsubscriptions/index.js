import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import CustomIcon from "services/iconUtils";
import MenuOption from "@/atoms/MenuOptions";
import SwitchComponent from "@/atoms/SwitchComponent";
import TableComponent from "@/atoms/TableWithSpan";

const DiscountSubscriptions = () => {
  const column1 = [
    {
      id: "col1", //  id value in column should be presented in row as key
      label: "S.No.",
      minWidth: 150,
      align: "center",
      data_align: "center",
      data_classname: "",
      rowSpan: 2,
      position: "sticky",
    },

    {
      id: "col2",
      label: "Reseller Id/Supplier ID",
      minWidth: 150,
      align: "center",
      data_align: "center",
      data_classname: "",
      rowSpan: 2,
      position: "sticky",
    },
    {
      label: "Subscription Period (Start Date & Time – End Date & Time)",
      align: "center",
      data_align: "center",
      data_classname: "",
      colSpan: 6,
    },
    {
      id: "col9",
      label: "Tool Status (Live or Not)",
      minWidth: 150,
      align: "center",
      data_align: "center",
      data_classname: "",
      rowSpan: 2,
      position: "sticky",
    },
    {
      id: "col10",
      label: "Subscription Amount Paid",
      minWidth: 150,
      align: "center",
      data_align: "center",
      data_classname: "",
      rowSpan: 2,
      position: "sticky",
    },
    {
      id: "col11",
      label: "Comments",
      minWidth: 150,
      align: "center",
      data_align: "center",
      data_classname: "",
      rowSpan: 2,
      position: "sticky",
    },
    {
      id: "col12",
      label: "Action",
      minWidth: 150,
      align: "center",
      data_align: "center",
      data_classname: "",
      rowSpan: 2,
      position: "sticky",
    },
  ];

  const column2 = [
    {
      id: "col3",
      label: "--",
      minWidth: 150,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col4",
      label: "1/12/2021 - 12.25 to 30/12/2021 - 12.25",
      minWidth: 150,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col5",
      label: "--",
      minWidth: 150,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col6",
      label: "--",
      minWidth: 150,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col7",
      label: "--",
      minWidth: 150,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col8",
      label: "--",
      minWidth: 150,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
  ];

  const rows = [
    {
      id: 1,
      col1: "01",
      col2: "#827342",
      col3: "--",
      col4: "1/12/2021 - 12.25 to 30/12/2021 - 12.25",
      col5: "--",
      col6: "--",
      col8: "--",
      col9: "--",
      col10: "Active",
      col11: 25,
      col12: (
        <Box className="d-flex justify-content-evenly align-items-center">
          <CustomIcon
            type="view"
            className="fs-18"
            // onIconClick={() => setShowViewProducts(true)}
          />
          <MenuOption
            getSelectedItem={(ele) => {
              //   console.log("Index", index);
              //   onClickOfMenuItem(ele, index);
            }}
            options={[
              "Notify",
              "Add Note",
              <Box className="d-flex align-items-center">
                <Typography>Disable</Typography>
                <Box className="ms-4">
                  <SwitchComponent label="" />
                </Box>
              </Box>,
            ]}
            IconclassName="fs-18 color-gray"
          />
        </Box>
      ),
    },
  ];

  return (
    <>
      <Box>
        <Paper className="mxh-85vh mnh-85vh p-3 overflow-auto hide-scrollbar">
          <Typography className="fw-bold color-orange">
            Discount Subscriptions
          </Typography>
          <TableComponent
            columns={[...column2]}
            column2={[...column1]}
            tableRows={rows}
            tHeadBgColor="bg-light-gray"
            showPagination={false}
            showSearchFilter={false}
            showSearchbar={false}
            showCheckbox={false}
            onCustomButtonClick={() => {
              // setOpenAddDaysCounterModal(true);
            }}
          />
        </Paper>
      </Box>
    </>
  );
};

export default DiscountSubscriptions;
