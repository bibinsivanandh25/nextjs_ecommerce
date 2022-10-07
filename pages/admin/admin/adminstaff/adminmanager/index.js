/* eslint-disable no-use-before-define */
import { Box, Paper, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import TableComponent from "@/atoms/TableComponent";
import SwitchComponent from "@/atoms/SwitchComponent";
import MenuOption from "@/atoms/MenuOptions";
import AdminCapabilities from "@/forms/admin/adminmanager/admincapabilities";

import {
  deleteAdminManager,
  disableAdmin,
  getAdminManagerById,
  getAdminUsers,
} from "services/admin/admin";
import toastify from "services/utils/toastUtils";

const AdminManger = () => {
  const [showAdminCapabilities, setShowAdminCapabilities] = useState(false);
  const [tableRows, setTableRows] = useState([]);
  const columns = [
    {
      id: "col1",
      align: "center",
      label: "Admin ID",
      data_align: "center",
    },
    {
      id: "col2",
      align: "center",
      label: "First Name",
      data_align: "center",
    },
    {
      id: "col3",
      align: "center",
      label: "Designation",
      data_align: "center",
    },
    {
      id: "col4",
      align: "center",
      label: "Email",
      data_align: "center",
    },
    {
      id: "col5",
      align: "center",
      label: "Mobile",
      data_align: "center",
    },
    {
      id: "col7",
      align: "center",
      label: "Created By",
      data_align: "center",
    },
    {
      id: "col8",
      align: "center",
      label: "Created Date & Time",
      data_align: "center",
    },
    {
      id: "col9",
      align: "center",
      label: "Status",
      data_align: "center",
    },
    {
      id: "col10",
      align: "Action",
      label: "Sale Price/MRP",
      data_align: "center",
    },
  ];
  const [modalData, setModalData] = useState({ type: "", data: null });

  const getUserById = async (type, id) => {
    const { data, err } = await getAdminManagerById(id);
    if (data) {
      setModalData({ type, data });
      setShowAdminCapabilities(true);
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };

  const onClickOfMenuItem = (type, id) => {
    if (["View", "Edit"].includes(type)) {
      getUserById(type, id);
    } else if (type === "Delete") {
      deleteUser(id);
    }
  };

  const deleteUser = async (userId) => {
    const { data, message, err } = await deleteAdminManager(userId);
    if (data) {
      toastify(message, "success");
      await getUsers();
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };

  const disableUsers = async (userId, status) => {
    const { data, message, err } = await disableAdmin(status, userId);
    if (data) {
      toastify(message, "success");
      await getUsers();
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };

  const mapData = (data) => {
    return data.map((item) => {
      return {
        id: 1,
        col1: item.adminRegistrationId,
        col2: item.firstName,
        col3: item.designation.replace("_", " "),
        col4: item.emailId,
        col5: item.mobileNumber,
        col7: item.createdBy,
        col8: item.createdDate,
        col9: item.status,
        col10: (
          <Box className="d-flex align-items-center justify-content-around">
            <Box className="d-flex flex-column align-items-center">
              <Box className="ms-4">
                <SwitchComponent
                  label=""
                  defaultChecked={item.status === "APPROVED"}
                  ontoggle={() => {
                    disableUsers(
                      item.adminRegistrationId,
                      item.status === "APPROVED" ? "DISABLED" : "APPROVED"
                    );
                  }}
                />
              </Box>
              <Typography className="h-5">Disable</Typography>
            </Box>
            <MenuOption
              getSelectedItem={(ele) => {
                onClickOfMenuItem(ele, item.adminRegistrationId);
              }}
              options={["View", "Edit", "Delete"]}
              IconclassName="color-gray"
            />
          </Box>
        ),
      };
    });
  };

  const getUsers = async (
    page = 0,
    payload = {
      status: [],
      createdBy: [],
      keyword: null,
    }
  ) => {
    const { data, err } = await getAdminUsers(page, payload, "ADMIN_MANAGER");
    if (data) {
      setTableRows(mapData(data));
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Box>
      {!showAdminCapabilities ? (
        <Paper className="p-3 mnh-85vh mxh-85vh overflow-auto hide-scrollbar">
          <TableComponent
            columns={columns}
            tHeadBgColor="bg-light-gray"
            tableRows={tableRows}
            showCustomButton
            customButtonLabel="Create Admin"
            table_heading="Admin Manger"
            showSearchFilter={false}
            onCustomButtonClick={() => {
              setShowAdminCapabilities(true);
            }}
            showCheckbox={false}
          />
        </Paper>
      ) : (
        <AdminCapabilities
          setShowAdminCapabilities={setShowAdminCapabilities}
          adminType="ADMIN_MANAGER"
          type={modalData.type === "" ? "add" : modalData.type}
          adminData={modalData.data}
          setModalData={setModalData}
        />
      )}
    </Box>
  );
};

export default AdminManger;
