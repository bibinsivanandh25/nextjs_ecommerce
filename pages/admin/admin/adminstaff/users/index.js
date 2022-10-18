/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
import { Box, Paper } from "@mui/material";
import React, { useState, useEffect } from "react";
import TableComponent from "@/atoms/TableComponent";
import SwitchComponent from "@/atoms/SwitchComponent";
import MenuOption from "@/atoms/MenuOptions";
import AdminCapabilities from "@/forms/admin/adminmanager/admincapabilities";
import {
  deleteAdminUser,
  disableAdmin,
  getAdminUser,
  getAdminUsers,
  getFilters,
} from "services/admin/admin";
import toastify from "services/utils/toastUtils";

const Users = () => {
  const [showAdminCapabilities, setShowAdminCapabilities] = useState(false);
  const [tableRows, setTableRows] = useState([]);
  const [modalData, setModalData] = useState({ type: "", data: null });
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
  const [pageNumber, setpageNumber] = useState(0);
  const [filters, setFilters] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    createdBy: [],
    status: [],
  });

  const getUserById = async (type, id) => {
    const { data, err } = await getAdminUser(id);
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
    const { data, message, err } = await deleteAdminUser(userId);
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
                disableUsers(
                  item.adminRegistrationId,
                  item.status === "APPROVED" ? "DISABLED" : "APPROVED"
                );
              }}
            />
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
    page = pageNumber,
    payload = {
      status: selectedFilters.status,
      createdBy: selectedFilters.createdBy,
      keyword: null,
    }
  ) => {
    payload.createdBy = payload.createdBy.map((item) => item.trim());
    const { data, err } = await getAdminUsers(page, payload, "ADMIN_USER");
    if (data) {
      if (page === 0) {
        setTableRows(mapData(data));
        setpageNumber((pre) => pre + 1);
      } else {
        setTableRows((pre) => {
          return [...pre, ...mapData(data)];
        });
        if (data.length) {
          setpageNumber((pre) => pre + 1);
        }
      }
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };

  const getFilterData = async () => {
    const { data } = await getFilters();
    if (data) {
      const temp = [
        {
          name: "Created By",
          value: [],
        },
        {
          name: "Status",
          value: [],
        },
      ];
      data.createdBy.forEach((item) => {
        temp[0].value.push(`${item.id} - ${item.name}`);
      });
      temp[1].value = [...data.status];
      setFilters(temp);
    }
  };

  useEffect(() => {
    getFilterData();
    getUsers();
  }, []);

  return (
    <Box>
      {!showAdminCapabilities ? (
        <Paper className="p-3 mnh-85vh mxh-85vh overflow-auto hide-scrollbar">
          <TableComponent
            columns={columns}
            tHeadBgColor="bg-light-gray"
            headerClassName="color-orange"
            tableRows={tableRows}
            showCustomButton
            customButtonLabel="Create Admin"
            table_heading="Admin User"
            showSearchFilter={false}
            onCustomButtonClick={() => {
              setShowAdminCapabilities(true);
            }}
            showCheckbox={false}
            handlePageEnd={async (text, _, page = pageNumber) => {
              await getUsers(page, {
                status: selectedFilters.status,
                createdBy: selectedFilters.createdBy,
                keyword: text,
              });
            }}
            handleRowsPerPageChange={() => {
              setpageNumber(0);
            }}
            showFilterButton
            filterData={filters}
            getFilteredValues={async (val, text = "") => {
              const temp = {
                createdBy: [],
                status: [],
              };
              val[0].value.forEach((ele) => {
                if (ele.isSelected) {
                  temp.createdBy.push(ele.item.split("-")[0].trim());
                }
              });
              val[1].value.forEach((ele) => {
                if (ele.isSelected) {
                  temp.status.push(ele.item);
                }
              });
              setpageNumber(0);
              setSelectedFilters(temp);
              await getUsers(0, {
                status: temp.status,
                createdBy: temp.createdBy,
                keyword: text,
              });
            }}
          />
        </Paper>
      ) : (
        <AdminCapabilities
          setShowAdminCapabilities={setShowAdminCapabilities}
          adminType="ADMIN_USER"
          type={modalData.type === "" ? "add" : modalData.type}
          adminData={modalData.data}
          setModalData={setModalData}
          gettableData={async () => {
            await getUsers(0, {
              status: selectedFilters.status,
              createdBy: selectedFilters.createdBy,
              keyword: "",
            });
            setpageNumber(0);
          }}
        />
      )}
    </Box>
  );
};

export default Users;
