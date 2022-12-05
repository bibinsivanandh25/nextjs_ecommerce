/* eslint-disable no-nested-ternary */
/* eslint-disable no-use-before-define */
import { Box, Paper } from "@mui/material";
import React, { useState, useEffect } from "react";
import CustomIcon from "services/iconUtils";
import TableComponent from "@/atoms/TableComponent";
import MenuOption from "@/atoms/MenuOptions";
import ReplyQueries from "@/forms/admin/suppliers/queries/replyqueries";
import RaiseQuery from "@/forms/admin/suppliers/queries/raisequery";
import ViewModalQueries from "@/forms/admin/suppliers/queries/viewquerymodal";
import {
  CloseQueries,
  deleteQueries,
  getQueriesData,
} from "services/admin/supplier/queries";
import toastify from "services/utils/toastUtils";

const tableColumn = [
  {
    id: "col1",
    label: "SI NO.",
    minWidth: 40,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col2",
    label: "Supplier ID",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col3",
    label: "Status",
    minWidth: 120,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col4",
    label: "IssueType",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col5",
    label: "CreatedBy",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col6",
    label: "Created Date & Time",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col7",
    label: "Updated Date & Time",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col8",
    label: "Actions",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
];
const filterValue = [
  {
    name: "Ticket Status",
    value: [
      { id: 1, item: "Open", value: "OPEN", isSelected: false },
      { id: 2, item: "Closed", value: "CLOSED", isSelected: false },
      { id: 3, item: "Pending", value: "PENDING", isSelected: false },
    ],
  },
];

const Queries = () => {
  const [queryModalOpen, setQueryModalOpen] = useState(false);
  const [replyModalOpen, setReplyModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [viewData, setViewData] = useState({});
  const [filterData, setFilterData] = useState(filterValue);
  const [selectedFilterData, setSelectedFilterData] = useState([]);
  const [filterDate, setFilterDate] = useState({});

  const handleViewClick = (item) => {
    setViewData(item);
    setViewModalOpen(true);
  };
  useEffect(() => {
    const selected = [];
    filterData[0]?.value?.forEach((item) => {
      if (item.isSelected) {
        selected.push(item.value);
      }
    });
    setPageNumber(0);
    getAllQueriesData(0, selected, filterDate);
  }, [selectedFilterData]);
  const getTableRowData = (data) => {
    const temp = [];
    if (data) {
      data.forEach((item, index) => {
        temp.push({
          id: index + 1,
          col1: index + 1,
          col2: item.supplierId,
          col3: item.ticketStatus,
          col4: item.issueType,
          col5: item.createdBy,
          col6: item.createdDate,
          col7: item.lastModifiedDate,
          col8: (
            <Box>
              <CustomIcon
                type="view"
                className="fs-18 me-1"
                title="View & Reply"
                onIconClick={() => {
                  handleViewClick(item);
                }}
              />
              <MenuOption
                options={["Close", "Reply", "Delete"]}
                IconclassName="fs-5 cursor-pointer"
                getSelectedItem={(ele) => {
                  if (ele === "Close") handleCloseQueries(item);
                  if (ele === "Reply") handleViewClick(item);
                  if (ele === "Delete") handleDeleteClick(item);
                }}
              />
            </Box>
          ),
        });
      });
    }
    return temp;
  };
  const handleCloseQueries = async (item) => {
    const { data, err } = await CloseQueries(item.ticketId);
    if (data) {
      getAllQueriesData(0);
      setPageNumber(0);
      toastify(data.message, "success");
    }
    if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };
  const handleDeleteClick = async (item) => {
    const { data, err } = await deleteQueries(item.ticketId);
    if (data) {
      getAllQueriesData(0);
      setPageNumber(0);
      toastify(data.message, "success");
    }
    if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };
  const getAllQueriesData = async (page, filter, date) => {
    const payload = {
      fromDate: date?.fromDate && date?.toDate ? date.fromDate : null,
      toDate: date?.toDate && date?.fromDate ? date.toDate : null,
      ticketStatus: filter || [],
    };
    const { data, err } = await getQueriesData(page, payload);
    if (data?.data?.length) {
      if (page == 0) {
        setPageNumber(1);
        setRows(getTableRowData(data.data));
      } else {
        setRows((pre) => [...pre, ...getTableRowData(data?.data)]);
        setPageNumber((prev) => prev + 1);
      }
    } else if (data?.data?.length === 0 && page == 0) {
      setRows([]);
    }
    if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };
  return (
    <Box>
      <Paper
        className="mnh-85vh mxh-85vh overflow-auto hide-scrollbar"
        elevation={3}
      >
        {!viewModalOpen ? (
          <Box className="mt-2">
            <TableComponent
              showDateFilter
              tHeadBgColor="bg-tableGray"
              table_heading="Queries"
              columns={[...tableColumn]}
              tableRows={[...rows]}
              stickyHeader
              showCheckbox={false}
              showSearchbar={false}
              showDateFilterSearch={false}
              showDateFilterDropDown
              // filterList={filterData}
              handlePageEnd={(searchtext, filter, page = pageNumber, date) => {
                const selected = [];
                filterData[0]?.value?.forEach((item) => {
                  if (item.isSelected) {
                    selected.push(item.value);
                  }
                });
                getAllQueriesData(page, selected, date);
                setFilterDate(date);
              }}
              showFilterButton
              filterData={filterData}
              getFilteredValues={(value) => {
                setFilterData(value);
                setSelectedFilterData(value);
              }}
            />
          </Box>
        ) : (
          <ViewModalQueries
            setShowModal={setViewModalOpen}
            selectedData={viewData}
            getTabledata={getAllQueriesData}
            setPageNumber={setPageNumber}
          />
        )}
      </Paper>
      {queryModalOpen && (
        <RaiseQuery
          queryModalOpen={queryModalOpen}
          setQueryModalOpen={setQueryModalOpen}
        />
      )}
      {replyModalOpen && (
        <ReplyQueries
          replyModalOpen={replyModalOpen}
          setReplyModalOpen={setReplyModalOpen}
        />
      )}
    </Box>
  );
};

export default Queries;
