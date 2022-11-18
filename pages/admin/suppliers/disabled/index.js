<<<<<<< HEAD
/* eslint-disable no-use-before-define */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-undef */
import { Box, Paper } from "@mui/material";
=======
/* eslint-disable no-unused-vars */
import { Box, Paper, Typography } from "@mui/material";
>>>>>>> 1edd3e9fef639354fe8c7a5ba6e23ea129a70a68
import React, { useState, useEffect } from "react";
import CustomIcon from "services/iconUtils";
import MenuOption from "@/atoms/MenuOptions";
import TableComponent from "@/atoms/TableComponent";
import SwitchComponent from "@/atoms/SwitchComponent";
import DisableNotifyModal from "@/forms/admin/suppliers/disabled/disablednotifymodal";
import DisabledAddNote from "@/forms/admin/suppliers/disabled/disabledaddnote";
import { getDisabledSuppliers } from "services/admin/supplier/disabled";
import toastify from "services/utils/toastUtils";
import { getCategoryFilterData } from "services/admin/supplier/supplierapproval";
import ViewModal from "@/forms/admin/suppliers/active/viewmodal";
import QueryModal from "@/forms/admin/suppliers/active/querymodal";
import { enableDisableSupplier } from "services/admin/supplier/active";

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
    label: "Supplier ID",
    minWidth: 200,
    align: "center",
    data_align: "center",
    data_classname: "",
    position: "sticky",
  },
  {
    id: "col3",
    label: "Email / Mobile",
    minWidth: 200,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  // {
  //   id: "col4",
  //   label: "Queries",
  //   minWidth: 150,
  //   align: "center",
  //   data_align: "center",
  //   data_classname: "",
  // },
  // {
  //   id: "col5",
  //   label: "Answers",
  //   minWidth: 200,
  //   align: "center",
  //   data_align: "center",
  //   data_classname: "",
  // },
  // {
  //   id: "col6",
  //   label: "Payment",
  //   minWidth: 100,
  //   align: "center",
  //   data_align: "center",
  //   data_classname: "",
  // },
  // {
  //   id: "col7",
  //   label: "Payment Date & Time",
  //   minWidth: 200,
  //   align: "center",
  //   data_align: "center",
  //   data_classname: "",
  // },
  {
    id: "col4",
    label: "Reason",
    minWidth: 200,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col5",
    label: "Actions",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
    position: "sticky",
  },
];
const Disabled = () => {
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [notifyModalOpen, setNotifyModalOpen] = useState(false);
  const [addnoteModalOpen, setAddnoteModalOpen] = useState(false);
  const [tableRows, setTableRows] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [masterData, setMasterData] = useState(0);
  const [filterData, setFilterData] = useState([]);
  const [filterValues, setFilterValues] = useState({
    searchvalue: "",
    date: {},
  });
  const [selectedFilterData, setSelectedFilterData] = useState([]);
  const [selectedData, setSelectedData] = useState({});
  const [showQueryModal, setShowQueryModal] = useState(false);
  const handleActionClick = (ele, item) => {
    if (ele == "Raise a Query") {
      setSelectedData(item);
      setShowQueryModal(true);
    }
  };
  const handleEnableClick = async (val) => {
    const payload = {
      supplierId: val.supplierId,
      disable: false,
      reason: null,
    };
    const { data, err } = await enableDisableSupplier(payload);
    if (data) {
      const selected = [];
      filterData[0]?.value?.forEach((item) => {
        if (item.isSelected) {
          selected.push(item.id);
        }
      });
      getAllTableData(0, selected, filterValues.searchvalue, filterValues.date);
      toastify(data?.message, "success");
    }
    if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };
  const getTableRows = (data) => {
    const temp = [];
    data?.forEach((item, index) => {
      temp.push({
        id: index + 1,
        col1: index + 1,
        col2: item.businessName,
        col3: item.emailId,
        // col4: "--",
        // col5: "--",
        // col6: (
        //   <>
        //     <Typography className="h-5 text-decoration-underline color-dark-green">
        //       - &#8377; 333
        //     </Typography>
        //     <Typography className="h-5 text-decoration-underline color-red">
        //       + &#8377; 133
        //     </Typography>
        //   </>
        // ),
        // col7: item.paymentDateAndTime ? item.paymentDateAndTime : "--",
        col4: item.disableReason ? item.disableReason : "--",
        col5: (
          <Box>
            <CustomIcon
              type="view"
              className="fs-18 me-1"
              title="View"
              onIconClick={() => {
                setViewModalOpen(true);
                setSelectedData(item);
              }}
            />
            <MenuOption
              options={[
                <>
                  Enable{" "}
                  <Box className="ms-4">
                    <SwitchComponent
                      label=""
                      defaultChecked={false}
                      ontoggle={() => {
                        handleEnableClick(item);
                      }}
                    />
                  </Box>
                </>,
                "Notify",
                "Raise a Query",
                "Supplier Shopping Page",
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
    return temp;
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
    const { data, err } = await getDisabledSuppliers(payload);
    if (data?.data) setMasterData(data?.data?.totalcount);
    if (data?.data?.disableSupplierWrappers?.length) {
      if (page == 0) {
        setTableRows(getTableRows(data.data.disableSupplierWrappers));
        setPageNumber(1);
      } else {
        setPageNumber((prev) => prev + 1);
        setTableRows((pre) => [
          ...pre,
          ...getTableRows(data.data.disableSupplierWrappers),
        ]);
      }
    } else if (data?.data?.disableSupplierWrappers?.length === 0 && page == 0) {
      setTableRows([]);
    }
    if (err) {
      setTableRows([]);
      toastify(err?.response?.data?.message, "error");
    }
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
    <Box className="">
      <Paper className="mnh-85vh mxh-85vh overflow-auto hide-scrollbar">
        {viewModalOpen ? (
          <ViewModal
            viewModalOpen={viewModalOpen}
            setViewModalOpen={setViewModalOpen}
            selectedData={selectedData}
            type="DISABLED"
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
              tHeadBgColor="bg-tableGray"
              showDateFilter
              showDateFilterSearch
              showFilterButton
              showFromToDateFilter
              tableRows={[...tableRows]}
              table_heading={`Disabled (${masterData || 0})`}
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
      {notifyModalOpen && (
        <DisableNotifyModal
          notifyModalOpen={notifyModalOpen}
          setNotifyModalOpen={setNotifyModalOpen}
        />
      )}
      {addnoteModalOpen && (
        <DisabledAddNote
          addnoteModalOpen={addnoteModalOpen}
          setAddnoteModalOpen={setAddnoteModalOpen}
        />
      )}
    </Box>
  );
};

export default Disabled;
