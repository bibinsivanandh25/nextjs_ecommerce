/* eslint-disable no-nested-ternary */
import { Box, Paper, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomIcon from "services/iconUtils";
import TableComponent from "@/atoms/TableComponent";
import MenuOption from "@/atoms/MenuOptions";
import SwitchComponent from "@/atoms/SwitchComponent";
import ViewModal from "@/forms/admin/suppliers/active/viewmodal";
import { getCategoryFilterData } from "services/admin/supplier/supplierapproval";
import toastify from "services/utils/toastUtils";
import { getActiveSuppliers } from "services/admin/supplier/active";
import QueryModal from "@/forms/admin/suppliers/active/querymodal";

const tableColumn = [
  {
    id: "col1",
    label: "SI NO.",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
    position: "sticky",
  },
  {
    id: "col2",
    label: "Supplier id with Business Name",
    minWidth: 200,
    align: "center",
    data_align: "center",
    data_classname: "",
    position: "sticky",
  },
  {
    id: "col3",
    label: "Location",
    minWidth: 200,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col4",
    label: "GSTIN Number",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col5",
    label: "Categories/Sub-categories",
    minWidth: 200,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col6",
    label: "Total Catelogs",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col7",
    label: "Catelogs Size / 50MB",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col8",
    label: "Total Orders",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col9",
    label: "Total Earnings",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col10",
    label: "Amount to be paid",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col11",
    label: "Created Date & Time",
    minWidth: 200,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col12",
    label: "Charges Collected / Pending days",
    minWidth: 200,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col13",
    label: "Actions",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
    position: "sticky",
  },
];
const Active = () => {
  const [viewModalOpen, setViewModaOpen] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [selectedFilterData, setSelectedFilterData] = useState([]);
  const [masterData, setMasterData] = useState("");
  const [tableRows, setTableRows] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [filterValues, setFilterValues] = useState({
    searchvalue: "",
    date: {},
  });
  const [selectedData, setSelectedData] = useState({});
  const [showQueryModal, setShowQueryModal] = useState(false);

  useEffect(() => {
    const selected = [];
    filterData[0]?.value?.forEach((item) => {
      if (item.isSelected) {
        selected.push(item.id);
      }
    });
    // getAllTableData(0, selected);
  }, [selectedFilterData]);
  const copyText = () => {
    const copyTexts = document.getElementById("gstinnumber").innerHTML;
    navigator.clipboard.writeText(copyTexts);
  };

  const getCategoryFilter = async () => {
    const { data, err } = await getCategoryFilterData();
    if (data?.data) {
      const temp = [{ name: "Category", value: [] }];
      data.data.forEach((item) => {
        temp[0].value.push({
          item: item.name,
          id: item.id,
          isSelected: false,
        });
      });
      setFilterData(temp);
    }
    if (err) {
      setFilterData([]);
      toastify(err?.response?.data?.message, "error");
    }
  };
  useEffect(() => {
    getCategoryFilter();
  }, []);

  const handleActionClick = (ele, item) => {
    if (ele == "Rasie a query") {
      setSelectedData(item);
      setShowQueryModal(true);
    }
  };
  const getTableRows = (data) => {
    const rowDatas = [];
    data?.forEach((item, index) => {
      rowDatas.push({
        id: index + 1,
        col1: index + 1,
        col2: (
          <Typography className="h-5 color-light-blue cursor-pointer text-decoration-underline">
            {item.businessName}
          </Typography>
        ),
        col3: item.city,
        col4: (
          <Box className="d-flex justify-content-around ">
            <span className="h-5" id="gstinnumber">
              {item.gstin}
            </span>
            <Tooltip title="copy">
              <CustomIcon
                type="filecopy"
                size="small"
                className="fs-18"
                onIconClick={() => {
                  copyText();
                }}
              />
            </Tooltip>
          </Box>
        ),
        col5: (
          <div className="d-flex justify-content-center">
            <Tooltip
              title={item.mainCategories.map((e) => (
                <Typography className="h-5">{e}</Typography>
              ))}
              placement="top"
            >
              <Typography
                className="text-truncate h-5"
                style={{
                  maxWidth: "100px",
                }}
              >
                {item.mainCategories}
              </Typography>
            </Tooltip>
          </div>
        ),
        col6: item.totalCatalogs ? item.totalCatalogs : "--",
        col7: item.catalogSize ? item.catalogSize : "--",
        col8: item.totalOrders ? item.totalOrders : "--",
        col9: item.totalEarnings ? item.totalEarnings : "--",
        col10: item.amoutnToBePaid ? item.amoutnToBePaid : "--",
        col11: item.registeredAt ? item.registeredAt : "--",
        col12: item.changesCollected ? item.changesCollected : "--",
        col13: (
          <Box>
            <CustomIcon
              type="view"
              className="fs-18 me-2"
              onIconClick={() => {
                setSelectedData(item);
                setViewModaOpen(true);
              }}
            />
            <MenuOption
              options={[
                <>
                  Enable{" "}
                  <Box className="ms-4">
                    <SwitchComponent label="" />
                  </Box>
                </>,
                "Notify",
                "Rasie a query",
                "Supplier Home Page",
                "Marketing Tools Sub",
              ]}
              IconclassName="fs-5 cursor-pointer"
              getSelectedItem={(ele) => {
                handleActionClick(ele, item);
              }}
            />
          </Box>
        ),
      });
    });
    return rowDatas;
  };
  const getAllTableData = async (page, selected, searchtext, date) => {
    const payload = {
      category: selected || [],
      fromDate: date?.fromDate && date?.toDate ? date?.fromDate : null,
      toDate: date?.fromDate && date?.toDate ? date?.toDate : null,
      keyword: searchtext || null,
      pageNumber: page,
      pageSize: 50,
    };
    const { data, err } = await getActiveSuppliers(payload);
    setMasterData(data?.data?.totalcount);
    if (data?.data?.activeSupplierWrappers.length) {
      if (page == 0) {
        setTableRows(getTableRows(data.data.activeSupplierWrappers));
        setPageNumber(1);
      } else {
        setPageNumber((prev) => prev + 1);
        setTableRows((pre) => [
          ...pre,
          ...getTableRows(data?.data?.activeSupplierWrappers),
        ]);
      }
    } else if (data?.data?.length === 0 && page == 0) {
      setTableRows([]);
    }
    if (err) {
      setTableRows([]);
      toastify(err?.response?.data?.message, "error");
    }
  };
  useEffect(() => {
    const selected = [];
    filterData[0]?.value?.forEach((item) => {
      if (item.isSelected) {
        selected.push(item.id);
      }
    });
    setPageNumber(0);
    getAllTableData(0, selected, filterValues.searchvalue, filterValues.date);
  }, [selectedFilterData]);
  return (
    <Paper
      className="mnh-85vh mxh-85vh overflow-auto hide-scrollbar"
      elevation={3}
    >
      {viewModalOpen ? (
        <ViewModal
          viewModalOpen={viewModalOpen}
          setViewModaOpen={setViewModaOpen}
          selectedData={selectedData}
        />
      ) : showQueryModal ? (
        <QueryModal
          showQueryModal={showQueryModal}
          setShowQueryModal={setShowQueryModal}
          selectedData={selectedData}
        />
      ) : (
        <Box className="mt-2">
          <TableComponent
            showDateFilter
            showDateFilterSearch
            showFilterButton
            showFromToDateFilter
            tableRows={[...tableRows]}
            table_heading={`Active Suppliers (${masterData || 0})`}
            stickyHeader={false}
            showSearchFilter={false}
            columns={[...tableColumn]}
            showCheckbox={false}
            allowOutSideClickClose
            filterData={filterData}
            getFilteredValues={(value) => {
              setFilterData(value);
              setSelectedFilterData(value);
            }}
            handlePageEnd={(searchtext, filter, page = pageNumber, date) => {
              const selected = [];
              filterData[0]?.value?.forEach((item) => {
                if (item.isSelected) {
                  selected.push(item.id);
                }
              });
              setFilterValues((prev) => ({
                ...prev,
                searchvalue: searchtext,
                date,
              }));
              getAllTableData(page, selected, searchtext, date);
            }}
          />
        </Box>
      )}
    </Paper>
  );
};

export default Active;
