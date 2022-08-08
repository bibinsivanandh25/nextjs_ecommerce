import CustomIcon from "services/iconUtils";
import React, { useEffect, useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import MenuOption from "@/atoms/MenuOptions";
import SwitchComponent from "@/atoms/SwitchComponent";
import TableComponent from "@/atoms/TableComponent";
import CreateCategories from "@/forms/admin/productcategories/categories/CreateCategories";

const Categories = () => {
  const [tableRows, setTableRows] = useState([]);
  const [showCreateCategories, setShowCreateCategories] = useState(false);

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
      label: "Price Range",
      data_align: "center",
    },
    {
      id: "col4",
      align: "center",
      label: "Comission Type",
      data_align: "center",
    },
    {
      id: "col5",
      align: "center",
      label: "Comission Percentage",
      data_align: "center",
    },
    {
      id: "col6",
      align: "center",
      label: "MrMrsCart Profit %",
      data_align: "center",
    },
    {
      id: "col7",
      align: "center",
      label: "Reseller Profit %",
      data_align: "center",
    },
    {
      id: "col8",
      align: "center",
      label: "Careted Date & Time",
      data_align: "center",
    },
    {
      id: "col9",
      align: "center",
      label: "Actions",
      data_align: "center",
    },
  ];

  const options = [
    "Edit",
    <Box className="d-flex align-items-center">
      <Typography>Enable</Typography>
      <Box className="ms-3">
        <SwitchComponent label="" />
      </Box>
    </Box>,
  ];

  const onClickOfMenuItem = () => {};

  const rowsDataObjectsForApproval = [
    {
      id: 1,
      col1: "01",
      col2: "Beauty Product",
      col3: "--",
      col4: "--",
      col5: "--",
      col6: "--",
      col7: "--",
      col8: "21/06/2021-10.52",
      col9: "--",
    },
  ];

  const getTableRowsData = () => {
    const anArray = [];
    rowsDataObjectsForApproval.forEach((val, index) => {
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
        col9: (
          <Box className="d-flex justify-content-end align-items-center">
            <CustomIcon type="view" />
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
    <>
      <Box>
        <Box className="px-1 pt-2">
          {!showCreateCategories ? (
            <Paper className="overflow-auto hide-scrollbar pt-3 mnh-85vh mxh-85vh">
              <TableComponent
                table_heading="Categories"
                columns={tableColumns}
                tHeadBgColor="bg-light-gray"
                showPagination={false}
                tableRows={tableRows}
                showSearchbar={false}
                showDateFilterBtn
                showDateFilter
                dateFilterBtnName="Create Categories"
                dateFilterBtnClick={() => {
                  setShowCreateCategories(true);
                }}
              />
            </Paper>
          ) : (
            <CreateCategories
              setShowCreateCategories={setShowCreateCategories}
            />
          )}
        </Box>
      </Box>
    </>
  );
};

export default Categories;
