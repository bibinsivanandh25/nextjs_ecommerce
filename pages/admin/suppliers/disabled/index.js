import { Box, Paper, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import CustomIcon from "services/iconUtils";
import MenuOption from "@/atoms/MenuOptions";
import TableComponent from "@/atoms/TableComponent";
import DisabledViewModal from "@/forms/admin/suppliers/disabled/disabledviewmodal";
import SwitchComponent from "@/atoms/SwitchComponent";
import DisableNotifyModal from "@/forms/admin/suppliers/disabled/disablednotifymodal";
import DisabledRaiseQuery from "@/forms/admin/suppliers/disabled/disableraisequery";
import DisabledAddNote from "@/forms/admin/suppliers/disabled/disabledaddnote";
import { getDisabledSuppliers } from "services/admin/supplier/disabled";
import toastify from "services/utils/toastUtils";

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
  {
    id: "col4",
    label: "Queries",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col5",
    label: "Answers",
    minWidth: 200,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col6",
    label: "Payment",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col7",
    label: "Payment Date & Time",
    minWidth: 200,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col8",
    label: "Reason",
    minWidth: 200,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col9",
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
  const [queryModalOpen, setQueryModalOpen] = useState(false);
  const [addnoteModalOpen, setAddnoteModalOpen] = useState(false);
  const [tableRows, setTableRows] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [masterData, setMasterData] = useState(0);
  const rows = [
    {
      id: "col1",
      col1: 1,
      col2: "VRL Transport",
      col3: "Active",
      col4: "--",
      col5: "--",
      col6: (
        <>
          <Typography className="h-5 text-decoration-underline color-dark-green">
            - &#8377; 333
          </Typography>
          <Typography className="h-5 text-decoration-underline color-red">
            + &#8377; 133
          </Typography>
        </>
      ),
      col7: "--",
      col8: "--",
      col9: (
        <Box>
          <CustomIcon
            type="view"
            className="fs-18 me-1"
            title="View"
            onIconClick={() => {
              setViewModalOpen(true);
            }}
          />
          <MenuOption
            options={[
              "Notify",
              <>
                Activate{" "}
                <Box className="ms-4">
                  <SwitchComponent label="" />
                </Box>
              </>,
              "Raise a Query",
              "Add a Note",
              "Supplier Shopping Page",
            ]}
            IconclassName="fs-5 cursor-pointer"
            getSelectedItem={(ele) => {
              if (ele === "Notify") setNotifyModalOpen(true);
              if (ele === "Raise a Query") setQueryModalOpen(true);
              if (ele === "Add a Note") setAddnoteModalOpen(true);
            }}
          />
        </Box>
      ),
    },
  ];

  const getTableRows = (data) => {
    const temp = [];
    data?.forEach((item, index) => {
      temp.push({
        id: index + 1,
        col1: index + 1,
        col2: item.businessName,
        col3: item.emailId,
        col4: "--",
        col5: "--",
        col6: (
          <>
            <Typography className="h-5 text-decoration-underline color-dark-green">
              - &#8377; 333
            </Typography>
            <Typography className="h-5 text-decoration-underline color-red">
              + &#8377; 133
            </Typography>
          </>
        ),
        col7: item.paymentDateAndTime ? item.paymentDateAndTime : "--",
        col8: item.disableReason ? item.disableReason : "--",
        col9: (
          <Box>
            <CustomIcon
              type="view"
              className="fs-18 me-1"
              title="View"
              onIconClick={() => {
                setViewModalOpen(true);
              }}
            />
            <MenuOption
              options={[
                "Notify",
                <>
                  Activate{" "}
                  <Box className="ms-4">
                    <SwitchComponent label="" />
                  </Box>
                </>,
                "Raise a Query",
                "Add a Note",
                "Supplier Shopping Page",
              ]}
              IconclassName="fs-5 cursor-pointer"
              getSelectedItem={(ele) => {
                if (ele === "Notify") setNotifyModalOpen(true);
                if (ele === "Raise a Query") setQueryModalOpen(true);
                if (ele === "Add a Note") setAddnoteModalOpen(true);
              }}
            />
          </Box>
        ),
      });
    });
    return temp;
  };
  const getAllTableData = async (page, searchtext, date) => {
    const payload = {
      category: [],
      fromDate: date?.fromDate && date?.toDate ? date?.fromDate : null,
      toDate: date?.fromDate && date?.toDate ? date?.toDate : null,
      keyword: searchtext || null,
      pageNumber: page,
      pageSize: 50,
    };
    const { data, err } = await getDisabledSuppliers(payload);
    if (data?.data) {
      setMasterData(data.data.totalcount);
      if (page == 0 && data?.data?.disableSupplierWrappers) {
        setTableRows(getTableRows(data.data.disableSupplierWrappers));
        setPageNumber(1);
      } else {
        setPageNumber((prev) => prev + 1);
        setTableRows((pre) => [
          ...pre,
          ...getTableRows(data.data.disableSupplierWrappers),
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
    getAllTableData(0, null, null);
  }, []);
  return (
    <Box className="">
      <Paper className="mnh-85vh mxh-85vh overflow-auto hide-scrollbar">
        {!viewModalOpen ? (
          <Box className="mt-2">
            <TableComponent
              showDateFilter
              tHeadBgColor="bg-tableGray"
              stickyCheckBox
              stickyHeader={false}
              table_heading={`Disabled (${masterData || 0})`}
              columns={[...tableColumn]}
              tableRows={[...tableRows]}
              showDateFilterSearch
              showFilterButton
              showFromToDateFilter
              showSearchFilter={false}
              showCheckbox
            />
          </Box>
        ) : (
          <DisabledViewModal
            viewModalOpen={viewModalOpen}
            setViewModalOpen={setViewModalOpen}
          />
        )}
      </Paper>
      {notifyModalOpen && (
        <DisableNotifyModal
          notifyModalOpen={notifyModalOpen}
          setNotifyModalOpen={setNotifyModalOpen}
        />
      )}
      {queryModalOpen && (
        <DisabledRaiseQuery
          queryModalOpen={queryModalOpen}
          setQueryModalOpen={setQueryModalOpen}
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
