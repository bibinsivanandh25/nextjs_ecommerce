import { Box, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomIcon from "services/iconUtils";
import TableComponent from "@/atoms/TableComponent";
import MenuOption from "@/atoms/MenuOptions";
import SwitchComponent from "@/atoms/SwitchComponent";
import CreateSubCategoryModal from "@/forms/admin/productcategories/productsubcategories/CreateSubCategoryModal";

const SubCategories = () => {
  const [tableRows, setTableRows] = useState([]);
  const [openCreateNewSubCategories, setOpenCreateNewSubCategories] =
    useState();
  const [formData, setFormData] = useState({
    category: {},
    set: "",
    subCategory: "",
    priceRange: {},
    comissionType: {},
    comissionPercentage: "",
    mmcProfitPercentage: "",
    resellerProfitPercentage: "",
  });
  const [rowId, setRowId] = useState(null);

  const rowsDataObjectsForSubCategories = [
    {
      id: 1,
      col1: "1",
      col2: "Body Wash and Scrub",
      col3: "Beauty Product",
      col4: "--",
      col5: "--",
      col6: "--",
      col7: "--",
      col8: "2",
      col9: "21/6/2021-10.52",
      col10: "Actions",
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

  const onClickOfMenuItem = (ele, index) => {
    if (ele === "Edit") {
      setRowId(index);
      setFormData({
        category: { label: rowsDataObjectsForSubCategories[index].col3 },
        set: "",
        subCategory: rowsDataObjectsForSubCategories[index].col2,
        priceRange: { label: rowsDataObjectsForSubCategories[index].col4 },
        comissionType: { label: rowsDataObjectsForSubCategories[index].col5 },
        comissionPercentage: rowsDataObjectsForSubCategories[index].col6,
        mmcProfitPercentage: rowsDataObjectsForSubCategories[index].col7,
        resellerProfitPercentage: rowsDataObjectsForSubCategories[index].col8,
      });
      setOpenCreateNewSubCategories(true);
    }
  };

  const getTableRowsData = () => {
    const anArray = [];
    rowsDataObjectsForSubCategories.forEach((val, index) => {
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
        col10: (
          <Box className="d-flex justify-content-center align-items-center">
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
      label: "Sub Category",
      data_align: "center",
    },
    {
      id: "col3",
      align: "center",
      label: "Parent Category",
      data_align: "center",
    },
    {
      id: "col4",
      align: "center",
      label: "Price Range",
      data_align: "center",
    },
    {
      id: "col5",
      align: "center",
      label: "Commission type",
      data_align: "center",
    },
    {
      id: "col6",
      align: "center",
      label: "Commission Percentage",
      data_align: "center",
    },
    {
      id: "col7",
      align: "center",
      label: "MrMrs Profit %",
      data_align: "center",
    },
    {
      id: "col8",
      align: "center",
      label: "Reseller Profit %",
      data_align: "center",
    },
    {
      id: "col9",
      align: "center",
      label: "Created Date & Time",
      data_align: "center",
    },
    {
      id: "col10",
      align: "center",
      label: "Actions",
      data_align: "center",
    },
  ];
  return (
    <>
      <Box>
        <Box>
          <Box className="px-1 pt-2">
            <Paper className="overflow-auto hide-scrollbar pt-3 mnh-85vh mxh-85vh">
              <TableComponent
                table_heading="Sets"
                columns={tableColumns}
                tHeadBgColor="bg-light-gray"
                showPagination={false}
                tableRows={tableRows}
                showSearchbar={false}
                showDateFilterBtn
                showDateFilter
                dateFilterBtnName="Create Sub-categories"
                dateFilterBtnClick={() => {
                  setOpenCreateNewSubCategories(true);
                }}
              />
            </Paper>
          </Box>
        </Box>
      </Box>
      <CreateSubCategoryModal
        openCreateNewSubCategories={openCreateNewSubCategories}
        setOpenCreateNewSubCategories={setOpenCreateNewSubCategories}
        formData={formData}
        setFormData={setFormData}
        rowId={rowId}
      />
    </>
  );
};

export default SubCategories;
