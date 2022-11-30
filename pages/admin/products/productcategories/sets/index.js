/* eslint-disable no-use-before-define */
import { Box, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomIcon from "services/iconUtils";
import TableComponent from "@/atoms/TableComponent";
import MenuOption from "@/atoms/MenuOptions";
import SwitchComponent from "@/atoms/SwitchComponent";
import CreateSetModal from "@/forms/admin/productcategories/sets/CreateSetModal";
import {
  getAllSetData,
  setEnableDisable,
} from "services/admin/products/productCategories/sets";
import toastify from "services/utils/toastUtils";
import SetFilterModal from "@/forms/admin/productcategories/sets/setfiltermodal";
import SetsViewModal from "@/forms/admin/productcategories/sets/setsviewmodal";

const Sets = () => {
  const [tableRows, setTableRows] = useState([]);
  const [openCreateSetModal, setOpenCreateSetModal] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [type, setType] = useState("add");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [filteredValue, setFilteredValue] = useState({});
  const [filterDate, setFilterDate] = useState({});
  const [viewModalopen, setViewModalOpen] = useState(false);

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

  const onClickOfMenuItem = (ele, value) => {
    if (ele === "Edit") {
      setType("edit");
      setSelectedData(value);
      setOpenCreateSetModal(true);
    }
  };
  const handleSwitchClick = async (value) => {
    const payload = {
      categoryType: "SET",
      categoryId: value.categorySetId,
      status: !value.disabled,
    };
    const { data, err } = await setEnableDisable(payload);
    if (data) {
      toastify(data.message, "success");
      getAllSet(0, null);
    }
    if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };
  const handleViewClcik = (value) => {
    setSelectedData(value);
    setViewModalOpen(true);
  };
  const getTableRowsData = (data) => {
    const temp = [];
    data.forEach((val, index) => {
      temp.push({
        id: index + 1,
        col1: index + 1,
        col2: val.mainCategoryName,
        col3: val.setName,
        col4: val.createdAt,
        col5: (
          <Box className="d-flex justify-content-center align-items-center">
            <CustomIcon
              type="view"
              className="fs-20"
              onIconClick={() => {
                handleViewClcik(val);
              }}
            />
            <MenuOption
              getSelectedItem={(ele) => {
                onClickOfMenuItem(ele, val);
              }}
              options={[
                "Edit",
                <Box className="d-flex align-items-center">
                  <Typography>
                    {val.disabled ? "Disabled" : "Enabled"}
                  </Typography>
                  <Box className="ms-3">
                    <SwitchComponent
                      label=""
                      defaultChecked={!val.disabled}
                      ontoggle={() => {
                        handleSwitchClick(val);
                      }}
                    />
                  </Box>
                </Box>,
              ]}
              IconclassName="fs-18 color-gray"
            />
          </Box>
        ),
      });
    });
    return temp;
  };
  const getAllSet = async (page, date, value) => {
    const payload = {
      commissionType: value?.commissiontype || [],
      mainCategory: value?.categoryid || [],
      categorySet: value?.setid || [],
      fromDate: date?.fromDate && date?.toDate ? date?.fromDate : null,
      toDate: date?.fromDate && date?.toDate ? date?.toDate : null,
    };
    const { data, err } = await getAllSetData(page, payload);
    if (data?.data?.length) {
      if (page == 0) {
        setTableRows(getTableRowsData(data.data));
        setPageNumber(1);
      } else {
        setPageNumber((prev) => prev + 1);
        setTableRows((pre) => [...pre, ...getTableRowsData(data?.data)]);
      }
    } else if (data?.length === 0 && page == 0) {
      setTableRows([]);
    }
    if (err) {
      toastify(err?.response?.data?.message, "error");
      setTableRows([]);
    }
  };
  useEffect(() => {
    getAllSet(0, null);
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
              // showPagination={false}
              tableRows={tableRows}
              showSearchbar={false}
              showDateFilterBtn
              showDateFilter
              dateFilterBtnName="Create Set"
              dateFilterBtnClick={() => {
                setType("add");
                setOpenCreateSetModal(true);
              }}
              showDateFilterSearch={false}
              handlePageEnd={(searchtext, filter, page = pageNumber, date) => {
                setFilterDate(date);
                getAllSet(page, date, filteredValue);
              }}
              showFilterButton
              showFilterList={false}
              onFilterButtonClick={() => {
                setShowFilterModal(true);
              }}
            />
          </Paper>
        </Box>
      </Box>
      {openCreateSetModal && (
        <CreateSetModal
          openCreateSetModal={openCreateSetModal}
          setOpenCreateSetModal={setOpenCreateSetModal}
          rowsDataObjectsForSets={rowsDataObjectsForSets}
          getAllSet={getAllSet}
          selectedData={selectedData}
          type={type}
        />
      )}
      {showFilterModal && (
        <SetFilterModal
          setShowFilterModal={setShowFilterModal}
          showFilterModal={showFilterModal}
          getFilteredValues={(value) => {
            setFilteredValue(value);
            getAllSet(0, filterDate, value);
          }}
          filteredValue={filteredValue}
        />
      )}
      {viewModalopen && (
        <SetsViewModal
          viewModalopen={viewModalopen}
          setViewModalOpen={setViewModalOpen}
          selectedData={selectedData}
        />
      )}
    </>
  );
};

export default Sets;
