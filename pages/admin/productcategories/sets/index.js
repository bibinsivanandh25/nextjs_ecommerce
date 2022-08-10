import { Box, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomIcon from "services/iconUtils";
import TableComponent from "@/atoms/TableComponent";
import MenuOption from "@/atoms/MenuOptions";
import SwitchComponent from "@/atoms/SwitchComponent";
import CreateSetModal from "@/forms/admin/productcategories/sets/CreateSetModal";

const Sets = () => {
  const [tableRows, setTableRows] = useState([]);
  const [openCreateSetModal, setOpenCreateSetModal] = useState(false);
  const [rowId, setRowId] = useState(null);
  const [setDetails, setSetDetails] = useState({
    category: {},
    set: "",
  });

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
      label: "Created date & time",
      data_align: "center",
    },
    {
      id: "col5",
      align: "center",
      label: "Actions",
      data_align: "center",
    },
  ];

  const rowsDataObjectsForSets = [
    {
      id: 1,
      col1: "01",
      col2: "--",
      col3: "--",
      col4: "21/06/2021-10.52",
      col5: "Action",
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
      setSetDetails({
        category: { label: rowsDataObjectsForSets[index].col2 },
        set: rowsDataObjectsForSets[index].col3,
      });
      setOpenCreateSetModal(true);
    }
  };

  const getTableRowsData = () => {
    const anArray = [];
    rowsDataObjectsForSets.forEach((val, index) => {
      anArray.push({
        id: index + 1,
        col1: val.col1,
        col2: val.col2,
        col3: val.col3,
        col4: val.col4,
        col5: (
          <Box className="d-flex justify-content-center align-items-center">
            <CustomIcon type="view" className="fs-20" />
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
          <Paper
            sx={{ height: "84vh" }}
            className="overflow-auto hide-scrollbar pt-3"
          >
            <TableComponent
              table_heading="Sets"
              columns={tableColumns}
              tHeadBgColor="bg-light-gray"
              showPagination={false}
              tableRows={tableRows}
              showSearchbar={false}
              showDateFilterBtn
              showDateFilter
              dateFilterBtnName="Create Set"
              dateFilterBtnClick={() => {
                setOpenCreateSetModal(true);
              }}
            />
          </Paper>
        </Box>
      </Box>
      <CreateSetModal
        openCreateSetModal={openCreateSetModal}
        setOpenCreateSetModal={setOpenCreateSetModal}
        rowId={rowId}
        rowsDataObjectsForSets={rowsDataObjectsForSets}
        setDetails={setDetails}
        setSetDetails={setSetDetails}
      />
    </>
  );
};

export default Sets;
