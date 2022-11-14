/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Image from "next/image";
import MenuOption from "@/atoms/MenuOptions";
import SwitchComponent from "@/atoms/SwitchComponent";
import TableComponent from "@/atoms/TableComponent";
import {
  getFlags,
  changeStatus,
  deleteflags,
} from "services/admin/admin/adminconfiguration/flags";
import toastify from "services/utils/toastUtils";
import CreateFlagModal from "./CreateFlagModal";

const SupplierFlags = () => {
  const [openCreateFlagModal, setOpenCreateFlagModal] = useState(false);
  const [rows, setRows] = useState([]);
  const [oldPayload, setOldPayload] = useState({
    userType: "SUPPLIER",
    fromDate: "",
    toDate: "",
  });
  const [editModalDetails, setEditModalDetails] = useState({
    type: "",
    id: null,
  });
  const getTableData = async (payload = oldPayload) => {
    const { data, err } = await getFlags(payload);
    if (data) {
      const temp = data.map((item) => {
        return {
          flagId: item.flagId,
          col1: item.flagTitle,
          col2: <Image src={item.flagImageUrl[0]} height={50} width={50} />,
          col3: "--",
          col4: item.createdAt,
          col5: item.lastUpdatedAt,
          col6: item.flagStatus,
          col7: (
            <Box className="d-flex align-items-center justify-content-center">
              <Box className="d-flex flex-column align-items-center">
                <SwitchComponent
                  label=""
                  defaultChecked={item.enabled}
                  ontoggle={() => {
                    updateFlagStatus(item.flagId, !item.enabled);
                  }}
                />
              </Box>
              <MenuOption
                getSelectedItem={(ele) => {
                  onClickOfMenuItem(ele, item.flagId);
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
  const updateFlagStatus = async (id, flag) => {
    const { data, message, err } = await changeStatus(id, flag);
    if (data) {
      toastify(message, "success");
      getTableData();
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };
  const removeFlag = async (id) => {
    const { data, message, err } = await deleteflags(id);
    if (data) {
      toastify(message, "success");
      getTableData();
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };
  const onClickOfMenuItem = (ele, id) => {
    if (ele === "Delete") {
      removeFlag(id);
    } else if (ele === "Edit") {
      setEditModalDetails({ type: "edit", id });
      setOpenCreateFlagModal(true);
    }
  };

  useEffect(() => {
    getTableData();
  }, []);
  const columns = [
    {
      id: "col1",
      align: "center",
      label: "Flag Title",
      data_align: "center",
    },
    {
      id: "col2",
      align: "center",
      label: "Image",
      data_align: "center",
    },
    {
      id: "col3",
      align: "center",
      label: "Pixel Ratio",
      data_align: "center",
    },
    {
      id: "col4",
      align: "center",
      label: "Created Date & Time",
      data_align: "center",
    },
    {
      id: "col5",
      align: "center",
      label: "Updated Date & Time",
      data_align: "center",
    },
    {
      id: "col6",
      align: "center",
      label: "Status",
      data_align: "center",
    },
    {
      id: "col7",
      align: "center",
      label: "Action",
      data_align: "center",
    },
  ];

  return (
    <>
      <Box className="mt-4">
        <TableComponent
          columns={columns}
          tHeadBgColor="bg-light-gray"
          showPagination={false}
          tableRows={rows}
          customButtonLabel="Create Group"
          table_heading="Flags"
          showDateFilter
          showDateFilterBtn
          dateFilterBtnName="Create Flags"
          dateFilterBtnClick={() => {
            setEditModalDetails({ type: "create", id: null });
            setOpenCreateFlagModal(true);
          }}
          handlePageEnd={(searchText, _, page, dates) => {
            setOldPayload({
              userType: "SUPPLIER",
              fromDate: dates.fromDate,
              toDate: dates.toDate,
            });
            getTableData({
              userType: "SUPPLIER",
              fromDate: dates.fromDate,
              toDate: dates.toDate,
            });
          }}
        />
      </Box>
      {/* <CreateFlagModal
        openCreateFlagModal={openCreateFlagModal}
        setOpenCreateFlagModal={setOpenCreateFlagModal}
      /> */}
      <CreateFlagModal
        openCreateFlagModal={openCreateFlagModal}
        setOpenCreateFlagModal={setOpenCreateFlagModal}
        setmodalDetails={setEditModalDetails}
        modalDetails={editModalDetails}
      />
    </>
  );
};

export default SupplierFlags;
