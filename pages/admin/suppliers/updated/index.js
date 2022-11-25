/* eslint-disable no-use-before-define */
import { Box, Paper } from "@mui/material";
import React, { useState, useEffect } from "react";
import DoneIcon from "@mui/icons-material/Done";
import CustomIcon from "services/iconUtils";
import ClearIcon from "@mui/icons-material/Clear";
import TableComponent from "@/atoms/TableComponent";
// import MenuOption from "@/atoms/MenuOptions";
import UpdateViewModal from "@/forms/admin/suppliers/updated/viewmodal";
import UpdateRaiseQuery from "@/forms/admin/suppliers/updated/raisequery";
import { accept, getAll, reject } from "services/admin/supplier/updated";
import toastify from "services/utils/toastUtils";
import { format } from "date-fns";

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
    label: "Email",
    minWidth: 200,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col4",
    label: "Changed Field",
    minWidth: 200,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col8",
    label: "Previous Value",
    minWidth: 200,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col9",
    label: "Changed Value",
    minWidth: 200,
    align: "center",
    data_align: "center",
    data_classname: "",
  },

  {
    id: "col5",
    label: "Created Date & Time",
    minWidth: 200,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col6",
    label: "Updated Date & Time",
    minWidth: 200,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col7",
    label: "Actions",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
    position: "sticky",
  },
];

const Updated = () => {
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [queryModalOpen, setQueryModalOpen] = useState(false);
  const [tableRows, setTableRows] = useState([]);
  const [count, setCount] = useState(0);
  const [details, setDetails] = useState([]);
  // const [payload, setPayload] = useState({
  //   fromDate: null,
  //   toDate: null,
  //   keyword: null,
  //   pageNumber: 0,
  //   pageSize: 50,
  // });

  const acceptChanges = async (id) => {
    const { data, error, message } = await accept(id);
    if (data) {
      if (message) {
        toastify(message, "success");
        getTableRows({
          fromDate: null,
          toDate: null,
          keyword: null,
          pageNumber: 0,
          pageSize: 50,
        });
      }
    } else if (error) {
      if (message) toastify(message, "error");
      else if (error?.response?.data?.message)
        toastify(error?.response?.data?.message, "error");
    }
  };
  const rejectChanges = async (id) => {
    const { data, error, message } = await reject(id);
    if (data) {
      if (message) {
        toastify(message, "success");
        getTableRows({
          fromDate: null,
          toDate: null,
          keyword: null,
          pageNumber: 0,
          pageSize: 50,
        });
      }
    } else if (error) {
      if (message) toastify(message, "error");
      else if (error?.response?.data?.message)
        toastify(error?.response?.data?.message, "error");
    }
  };

  const getTableRows = async (
    payloads = {
      fromDate: null,
      toDate: null,
      keyword: null,
      pageNumber: 0,
      pageSize: 50,
    }
  ) => {
    const { data, err } = await getAll(payloads);
    if (data) {
      setCount(data.totalUpdateCount);
      const tempRows = data.supplierChangesHistoryViewPojos.map(
        (val, index) => {
          return {
            id: val.changeHistoryId,
            col1: index < 9 ? `0${index + 1}` : index + 1,
            col2: `${val.supplierId}`,
            col3: val.emailId,
            col4: val.changedField,
            col5: format(new Date(val.createdDate), "MM-dd-yyyy hh:mm:ss"),
            col6: val.updatedAt
              ? format(new Date(val.updatedAt), "MM-dd-yyyy hh:mm:ss")
              : "--",
            col7: (
              <Box>
                <DoneIcon
                  className="border cursor-pointer rounded bg-green color-white fs-18 me-1"
                  onClick={() => {
                    acceptChanges(val.changeHistoryId);
                  }}
                />
                <ClearIcon
                  onClick={() => {
                    rejectChanges(val.changeHistoryId);
                  }}
                  className="border cursor-pointer rounded bg-red color-white fs-18 me-1"
                />
                <CustomIcon
                  type="view"
                  className="fs-18 me-1"
                  title="View"
                  onIconClick={() => {
                    setViewModalOpen(true);
                    setDetails(val);
                  }}
                />
                {/* <MenuOption
                  options={["Edit", "Raise a query", "Supplier Shopping Page"]}
                  IconclassName="fs-5 cursor-pointer"
                  getSelectedItem={(ele) => {
                    if (ele === "Raise a query") {
                      setQueryModalOpen(true);
                    }
                  }}
                /> */}
              </Box>
            ),
            col8: val.oldValue,
            col9: val.changedValue,
          };
        }
      );
      setTableRows([...tempRows]);
    } else if (err) {
      setTableRows([]);
      setCount(0);
      toastify(err?.response?.data?.message, "error");
    }
  };

  useEffect(() => {
    getTableRows();
  }, []);

  return (
    <Box>
      <Paper
        className="mnh-85vh mxh-85vh overflow-auto hide-scrollbar"
        elevation={3}
      >
        <Box className="mt-2">
          <TableComponent
            showDateFilter
            tHeadBgColor="bg-tableGray"
            table_heading={`Updated (${count})`}
            columns={[...tableColumn]}
            tableRows={[...tableRows]}
            handlePageEnd={(searchText = "", searchFilter, _, dates) => {
              getTableRows({
                fromDate: dates.fromDate || null,
                toDate: dates.toDate || null,
                keyword: searchText === "" ? null : searchText,
                pageNumber: 0,
                pageSize: 50,
              });
            }}
          />
        </Box>
      </Paper>
      {viewModalOpen && (
        <UpdateViewModal
          viewModalOpen={viewModalOpen}
          setViewModalOpen={setViewModalOpen}
          data={details}
        />
      )}
      {queryModalOpen && (
        <UpdateRaiseQuery
          queryModalOpen={queryModalOpen}
          setQueryModalOpen={setQueryModalOpen}
        />
      )}
    </Box>
  );
};

export default Updated;
