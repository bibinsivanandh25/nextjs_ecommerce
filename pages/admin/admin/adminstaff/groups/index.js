/* eslint-disable no-use-before-define */
import { Box, Paper, Typography } from "@mui/material";
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

  const gettableData = async () => {
    const { data, err } = await getAdminGroups();
    if (data) {
      const temp = data.map((item) => {
        return {
          col1: item.groupName,
          col2: item.createdBy,
          col3: item.createdDate,
          col4: item.lastModifiedDate,
          col5: item.disabled ? "DISABLED" : "ACTIVE",
          col6: (
            <Box className="d-flex align-items-center justify-content-around">
              <Box className="d-flex flex-column align-items-center">
                <Box className="ms-4">
                  <SwitchComponent
                    label=""
                    defaultChecked={item.disabled}
                    ontoggle={() => {
                      disableUsers(item.adminGroupId, !item.disabled);
                    }}
                  />
                </Box>
                <Typography className="h-5">Disable</Typography>
              </Box>
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
      setRows(temp);
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
            customButtonLabel="Create Group"
            table_heading="Groups"
            showSearchFilter={false}
            onCustomButtonClick={() => {
              setModalData((pre) => ({ ...pre, type: "add" }));
              setShowAdminCapabilities(true);
            }}
            showSearchbar={false}
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
