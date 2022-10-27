/* eslint-disable no-use-before-define */
import { Box, Paper, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import TableComponent from "@/atoms/TableComponent";
import SwitchComponent from "@/atoms/SwitchComponent";
import MenuOption from "@/atoms/MenuOptions";
import AdminCapabilities from "@/forms/admin/adminmanager/admincapabilities";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

import {
  deleteAdminManager,
  disableAdmin,
  getAdminManagerById,
  getAdminUsers,
} from "services/admin/admin";
import toastify from "services/utils/toastUtils";
import ModalComponent from "@/atoms/ModalComponent";

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
      label: "Last Name",
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
      align: "center",
      label: "Action",
      data_align: "center",
    },
  ];
  const [modalData, setModalData] = useState({ type: "", data: null });
  const [pageNumber, setpageNumber] = useState(0);
  const [showConfirmModal, setshowConfirmModal] = useState({
    message: "",
    adminRegistrationId: "",
    status: "",
    type: "",
  });

  const getUserById = async (type, id) => {
    const { data, err } = await getAdminManagerById(id);
    if (data) {
      setModalData({ type, data });
      setShowAdminCapabilities(true);
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };

  const onClickOfMenuItem = (type, id, grouped) => {
    if (["View", "Edit"].includes(type)) {
      if (type === "Edit" && grouped) {
        setshowConfirmModal({
          message:
            "The User is already present in a group. Would you really like to update the user?",
          adminRegistrationId: id,
          status: "",
          type: "Edit",
        });
      } else {
        getUserById(type, id);
      }
    } else if (type === "Delete") {
      if (grouped) {
        setshowConfirmModal({
          message:
            "The Manager is already present in a group, and will be removed if deleted. Would you really like to delete?",
          adminRegistrationId: id,
          status: "",
          type: "delete",
        });
      } else {
        deleteUser(id);
      }
    }
  };

  const deleteUser = async (userId) => {
    const { data, message, err } = await deleteAdminManager(userId);
    if (data) {
      toastify(message, "success");
      await getUsers(0);
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };

  const disableUsers = async (userId, status) => {
    const { data, message, err } = await disableAdmin(status, userId);
    if (data) {
      toastify(message, "success");
      await getUsers(0);
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
        col3: item.lastName,
        col4: item.emailId,
        col5: item.mobileNumber,
        col7: item.createdBy,
        col8: item.createdDate,
        col9: item.status,
        col10: (
          <Box className="d-flex align-items-center justify-content-center">
            <SwitchComponent
              label=""
              defaultChecked={item.status === "APPROVED"}
              ontoggle={() => {
                if (item.grouped) {
                  setshowConfirmModal({
                    message:
                      "The Manager is already present in a group, and will be removed if disabled. Would you really like to disable?",
                    adminRegistrationId: item.adminRegistrationId,
                    status:
                      item.status === "APPROVED" ? "DISABLED" : "APPROVED",
                    type: "disable",
                  });
                } else {
                  disableUsers(
                    item.adminRegistrationId,
                    item.status === "APPROVED" ? "DISABLED" : "APPROVED"
                  );
                }
              }}
            />
            <MenuOption
              getSelectedItem={(ele) => {
                onClickOfMenuItem(ele, item.adminRegistrationId, item.grouped);
              }}
              options={["View", "Edit", "Delete"]}
              IconclassName="color-gray"
            />
          </Box>
        ),
        grouped: item.grouped,
      };
    });
  };

  const getUsers = async (
    page = pageNumber,
    payload = {
      status: [],
      createdBy: [],
      keyword: "",
    }
  ) => {
    const { data, err } = await getAdminUsers(page, payload, "ADMIN_MANAGER");
    if (data) {
      if (page === 0) {
        setTableRows(mapData(data));
        setpageNumber((pre) => pre + 1);
      } else {
        setTableRows((pre) => {
          return [...pre, ...mapData(data)];
        });
      }
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
            headerClassName="color-orange"
            tHeadBgColor="bg-light-gray"
            tableRows={tableRows}
            showCustomButton
            customButtonLabel="Create Admin"
            table_heading="Admin Manager"
            showSearchFilter={false}
            onCustomButtonClick={() => {
              setShowAdminCapabilities(true);
            }}
            showCheckbox={false}
            handlePageEnd={async (text, _, page = pageNumber) => {
              await getUsers(page, {
                status: [],
                createdBy: [],
                keyword: text,
              });
            }}
            handleRowsPerPageChange={() => {
              setpageNumber(0);
            }}
          />
        </Paper>
      ) : (
        <AdminCapabilities
          setShowAdminCapabilities={setShowAdminCapabilities}
          adminType="ADMIN_MANAGER"
          type={modalData.type === "" ? "add" : modalData.type}
          adminData={modalData.data}
          setModalData={setModalData}
          gettableData={async () => {
            await getUsers(0, {
              status: [],
              createdBy: [],
              keyword: "",
            });
            setpageNumber(0);
          }}
        />
      )}

      <ModalComponent
        open={showConfirmModal.message !== ""}
        saveBtnText="Yes"
        ClearBtnText="No"
        onSaveBtnClick={() => {
          if (showConfirmModal.type === "Edit") {
            getUserById(
              showConfirmModal.type,
              showConfirmModal.adminRegistrationId
            );
          } else if (showConfirmModal.type === "disable") {
            disableUsers(
              showConfirmModal.adminRegistrationId,
              showConfirmModal.status
            );
          } else {
            deleteUser(
              showConfirmModal.adminRegistrationId,
              showConfirmModal.status
            );
          }
          // const api =
          //   showConfirmModal.type === "disable" ? disableUsers : deleteUser;
          // api(showConfirmModal.adminRegistrationId, showConfirmModal.status);
          setshowConfirmModal({
            message: "",
            adminRegistrationId: "",
            status: "",
            type: "",
          });
        }}
        onClearBtnClick={() => {
          setshowConfirmModal({
            message: "",
            adminRegistrationId: "",
            status: "",
            type: "",
          });
        }}
        ModalTitle="Warning"
        titleClassName="color-orange"
      >
        <div className="d-flex flex-column justify-content-center align-items-center">
          <Box>
            <WarningAmberIcon sx={{ fontSize: "5rem", color: "red" }} />
          </Box>
          <Typography className="fs-16">{showConfirmModal.message}</Typography>
        </div>
      </ModalComponent>
    </Box>
  );
};

export default AdminManger;
