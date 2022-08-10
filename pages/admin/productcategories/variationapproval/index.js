import CustomIcon from "services/iconUtils";
import { Box, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import MenuOption from "@/atoms/MenuOptions";
import TableComponent from "@/atoms/TableComponent";

const VariationApproval = () => {
  const [tableRows, setTableRows] = useState([]);
  const tableColumns = [
    {
      id: "col1",
      align: "center",
      label: "S.No.",
      data_align: "center",
    },
    {
      id: "col2",
      align: "center",
      label: "Parent Category",
      data_align: "center",
    },
    {
      id: "col3",
      align: "center",
      label: "Sets",
      data_align: "center",
    },
    {
      id: "col4",
      align: "center",
      label: "Sub-Category",
      data_align: "center",
    },
    {
      id: "col5",
      align: "center",
      label: "Supplier ID",
      data_align: "center",
    },
    {
      id: "col6",
      align: "center",
      label: "Variations",
      data_align: "center",
    },
    {
      id: "col7",
      align: "center",
      label: "Craeted Date & Time",
      data_align: "center",
    },
    {
      id: "col8",
      align: "center",
      label: "Actions",
      data_align: "center",
    },
  ];

  const rowsDataObjectsForVariationApproval = [
    {
      id: 1,
      col1: "1",
      col2: "Body Wash and Scrub",
      col3: "--",
      col4: "--",
      col5: "--",
      col6: "2",
      col7: "21/06/2021-10.52",
      col8: "Actions",
    },
  ];

  const options = ["Notify"];

  const onClickOfMenuItem = () => {};

  const getTableRowsData = () => {
    const anArray = [];
    rowsDataObjectsForVariationApproval.forEach((val, index) => {
      anArray.push({
        id: index + 1,
        col1: val.col1,
        col2: val.col2,
        col3: val.col3,
        col4: val.col4,
        col5: val.col5,
        col6: val.col6,
        col7: val.col7,
        col8: (
          <Box className="d-flex justify-content-evenly align-items-center">
            <CustomIcon
              className="bg-success color-white rounded fs-20"
              type="doneIcon"
            />
            <CustomIcon
              className="bg-danger color-white rounded fs-20"
              type="close"
            />
            <CustomIcon className="fs-20" type="view" />
            <MenuOption
              getSelectedItem={(ele) => {
                onClickOfMenuItem(ele, index);
              }}
              options={options}
              IconclassName="fs-18 color-gray"
            />
          </Box>
        ),
      });
    });

    setTableRows(anArray);
  };

  useEffect(() => {
    getTableRowsData();
  }, []);

  return (
    <Box>
      <Box>
        <Box className="px-1 pt-2">
          <Paper className="overflow-auto hide-scrollbar pt-3 mnh-85vh mxh-85vh">
            <TableComponent
              table_heading="Variation Approval"
              columns={tableColumns}
              tHeadBgColor="bg-light-gray"
              showPagination={false}
              tableRows={tableRows}
              showSearchbar={false}
              showDateFilterBtn
              showDateFilter
              dateFilterBtnName="Create Sub-categories"
              dateFilterBtnClick={() => {
                // setOpenCreateNewSubCategories(true);
              }}
            />
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default VariationApproval;
