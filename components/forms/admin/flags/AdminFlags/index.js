/* eslint-disable no-use-before-define */
import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import MenuOption from "@/atoms/MenuOptions";
import SwitchComponent from "@/atoms/SwitchComponent";
import TableComponent from "@/atoms/TableComponent";
import {
  changeStatus,
  deleteflags,
  getFlags,
  editFlag,
} from "services/admin/admin/adminconfiguration/flags";
import toastify from "services/utils/toastUtils";
import CreateFlagModal from "./CreateFlagModal";
import ModalComponent from "@/atoms/ModalComponent";

const AdminFlags = () => {
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
  const [openCreateFlagModal, setOpenCreateFlagModal] = useState(false);
  const [rows, setRows] = useState([]);
  const [openDeleteModal, setopenDeleteModal] = useState(false);
  const [deleteMessage, setdeleteMessage] = useState("");
  const [oldPayload, setOldPayload] = useState({
    userType: "ADMIN",
    fromDate: "",
    toDate: "",
  });
  const [modalDetails, setmodalDetails] = useState({ type: "", id: null });

  const updateFlagStatus = async (id, flag) => {
    const { data, message, err } = await changeStatus(id, flag);
    if (data) {
      toastify(message, "success");
      getTableData();
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };

  const removeFlag = async (payload) => {
    const { data, message, err } = await deleteflags(payload);
    if (data) {
      toastify(message, "success");
      getTableData();
    } else if (err) {
      if (err) {
        setopenDeleteModal(true);
      }
      setdeleteMessage(err?.response?.data?.message);
      toastify(err?.response?.data?.message, "error");
    }
  };

  const onClickOfMenuItem = (ele, id) => {
    if (ele === "Delete") {
      const payload = { id: id, bool: true };
      const { data } = removeFlag(payload);
    } else if (ele === "Edit") {
      setmodalDetails({ type: "edit", id });
      setOpenCreateFlagModal(true);
    }
  };
  const supplierDelete = async (payload = oldPayload) => {
    const { data, err } = await getFlags(payload);
    if (data) {
      const temp = data.map((item) => {
        const deletePayload = { id: item.flagId, bool: false };
        const { data, message } = removeFlag(deletePayload);
        return temp;
      });
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };
  const getTableData = async (payload = oldPayload) => {
    const { data, err } = await getFlags(payload);
    if (data) {
      const temp = data.map((item) => {
        return {
          flagId: item.flagId,
          col1: item.flagTitle,
          col2: (
            <Image src={item.flagImageUrl[0] || ""} height={50} width={50} />
          ),
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

  useEffect(() => {
    getTableData();
  }, []);

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
            setmodalDetails({ type: "create", id: null });
            setOpenCreateFlagModal(true);
          }}
          showCheckbox={false}
          handlePageEnd={(searchText, _, page, dates) => {
            setOldPayload({
              userType: "ADMIN",
              fromDate: dates.fromDate,
              toDate: dates.toDate,
            });
            getTableData({
              userType: "ADMIN",
              fromDate: dates.fromDate,
              toDate: dates.toDate,
            });
          }}
          showDateFilterSearch={false}
        />
      </Box>
      <CreateFlagModal
        open={openCreateFlagModal}
        setOpen={setOpenCreateFlagModal}
        setmodalDetails={setmodalDetails}
        modalDetails={modalDetails}
        getTableData={getTableData}
      />
      {openDeleteModal && (
        <ModalComponent
          ModalWidth={500}
          open={openDeleteModal}
          titleClassName="fw-bold fs-14 color-orange"
          ModalTitle="Delete Product"
          saveBtnText="Yes"
          ClearBtnText="Cancel"
          onCloseIconClick={() => {
            setopenDeleteModal(false);
          }}
          onClearBtnClick={() => {
            setopenDeleteModal(false);
          }}
          onSaveBtnClick={() => {
            supplierDelete();
          }}
        >
          <Grid>
            <Typography>{deleteMessage}</Typography>
          </Grid>
        </ModalComponent>
      )}
    </>
  );
};

export default AdminFlags;
