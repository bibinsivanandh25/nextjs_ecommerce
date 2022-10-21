/* eslint-disable no-use-before-define */
import { Box, Paper } from "@mui/material";
import React, { useState, useEffect } from "react";
import TableComponent from "@/atoms/TableComponent";
import SwitchComponent from "@/atoms/SwitchComponent";
import MenuOption from "@/atoms/MenuOptions";
import AdminCapabilities from "@/forms/admin/groups/AdminCapabilities";
import {
  deleteAdminGroup,
  disableAdminGroup,
  getAdminGroups,
  getGroupDetails,
} from "services/admin/admin";
import toastify from "services/utils/toastUtils";

const Users = () => {
  const [showAdminCapabilities, setShowAdminCapabilities] = useState(false);
  const [rows, setRows] = useState([]);
  const columns = [
    {
      id: "col1",
      align: "center",
      label: "Group Name",
      data_align: "center",
    },

    {
      id: "col2",
      align: "center",
      label: "Created By",
      data_align: "center",
    },
    {
      id: "col3",
      align: "center",
      label: "Created Date & Time",
      data_align: "center",
    },
    {
      id: "col4",
      align: "center",
      label: "Last Updated Date & Time",
      data_align: "center",
    },
    {
      id: "col5",
      align: "center",
      label: "Status",
      data_align: "center",
    },
    {
      id: "col6",
      align: "center",
      label: "Action",
      data_align: "center",
    },
  ];
  const [modalData, setModalData] = useState({ type: "", data: null });
  const [pageNumber, setpageNumber] = useState(0);

  const getGroupData = async (id, type) => {
    const { data, err } = await getGroupDetails(id);
    if (data) {
      setModalData({
        type,
        data,
      });
      setShowAdminCapabilities(true);
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };
  const deleteGroup = async (id) => {
    const { data, message, err } = await deleteAdminGroup(id);
    if (data || message) {
      toastify(message, "success");
      await gettableData();
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };

  const onClickOfMenuItem = (type, id) => {
    if (["View", "Edit"].includes(type)) {
      getGroupData(id, type);
    } else if (type === "Delete") {
      deleteGroup(id);
    }
  };

  const disableUsers = async (id, status) => {
    const { data, message, err } = await disableAdminGroup(id, status);
    if (data || message) {
      toastify(message, "success");
      await gettableData();
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };

  const mapData = (data) => {
    const temp = data.map((item) => {
      return {
        col1: item.groupName,
        col2: item.createdBy,
        col3: item.createdDate,
        col4: item.lastModifiedDate,
        col5: item.disabled ? "DISABLED" : "ACTIVE",
        col6: (
          <Box className="d-flex align-items-center justify-content-center">
            <SwitchComponent
              label=""
              defaultChecked={!item.disabled}
              ontoggle={() => {
                disableUsers(item.adminGroupId, !item.disabled);
              }}
            />
            <MenuOption
              getSelectedItem={(ele) => {
                onClickOfMenuItem(ele, item.adminGroupId);
              }}
              options={["View", "Edit", "Delete"]}
              IconclassName="color-gray"
            />
          </Box>
        ),
      };
    });
    return temp;
  };

  const gettableData = async (
    page = pageNumber,
    payload = {
      fromDate: null,
      toDate: null,
    }
  ) => {
    const { data, err } = await getAdminGroups(page, 50, payload);
    if (data) {
      if (page === 0) {
        setRows(mapData(data));
        setpageNumber((pre) => pre + 1);
      } else {
        setRows((pre) => {
          return [...pre, ...mapData(data)];
        });
        setpageNumber((pre) => pre + 1);
      }
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };

  useEffect(() => {
    gettableData();
  }, []);

  return (
    <Box>
      {!showAdminCapabilities ? (
        <Paper className="p-3 mnh-85vh mxh-85vh overflow-auto hide-scrollbar">
          <TableComponent
            columns={columns}
            tHeadBgColor="bg-light-gray"
            showCheckbox={false}
            tableRows={rows}
            showCustomButton
            dateFilterBtnName="Create Group"
            table_heading="Groups"
            showSearchFilter={false}
            dateFilterBtnClick={() => {
              setModalData((pre) => ({ ...pre, type: "add" }));
              setShowAdminCapabilities(true);
            }}
            showSearchbar={false}
            showDateFilter
            showDateFilterBtn
            handlePageEnd={async (
              searchText,
              searchFilter,
              page = pageNumber,
              dateObj
            ) => {
              if (dateObj.fromDate === "" || dateObj.toDate === "") {
                await gettableData(0);
                setpageNumber(0);
              } else if (
                new Date(dateObj.fromDate) < new Date(dateObj.toDate)
              ) {
                await gettableData(page, dateObj);
                setpageNumber(0);
              } else {
                toastify("Invalid date", "error");
              }
            }}
            showDateFilterSearch={false}
          />
        </Paper>
      ) : (
        <AdminCapabilities
          setShowAdminCapabilities={setShowAdminCapabilities}
          type={modalData.type}
          groupData={modalData.data}
          gettableData={gettableData}
        />
      )}
    </Box>
  );
};

export default Users;
