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
  getFlagById,
  getFlags,
} from "services/admin/admin/adminconfiguration/flags";
import toastify from "services/utils/toastUtils";
import ModalComponent from "@/atoms/ModalComponent";
import CreateFlagModal from "./CreateFlagModal";

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
  const [opendisableModal, setopendisableModal] = useState(false);
  const [flagId, setflagId] = useState("");
  const [openVIew, setopenVIew] = useState(false);
  const [flagData, setflagData] = useState({});
  const [oldPayload, setOldPayload] = useState({
    userType: "ADMIN",
    fromDate: "",
    toDate: "",
  });
  const [modalDetails, setmodalDetails] = useState({ type: "", id: null });
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
                  defaultChecked={!item.disabled}
                  ontoggle={() => {
                    updateFlagStatus(item.flagId, !item.disabled);
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

  const updateFlagStatus = async (id, flag) => {
    setflagId({ id, flag });
    const action = true;
    const { data, message, err } = await changeStatus(id, flag, action);
    if (data) {
      toastify(message, "success");
      getTableData();
    } else if (err) {
      if (err) {
        setopendisableModal(true);
        setdeleteMessage(err?.response?.data?.message);
      }
      toastify(err?.response?.data?.message, "error");
    }
  };

  const removeFlag = async (payload) => {
    setflagId(payload);
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
  const getFlagByID = async (id) => {
    const { data, err } = await getFlagById(id);
    if (data) {
      setflagData(data);
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };
  const onClickOfMenuItem = (ele, id) => {
    if (ele === "Delete") {
      const payload = { id, bool: true };
      removeFlag(payload);
    } else if (ele === "Edit") {
      setmodalDetails({ type: "edit", id });
      setOpenCreateFlagModal(true);
    } else if (ele === "View") {
      getFlagByID(id);
      setopenVIew(true);
    }
  };
  const supplierDelete = () => {
    const payload = {
      id: flagId.id,
      bool: false,
    };
    const { data, message, err } = removeFlag(payload);
    if (data) {
      toastify(message, "success");
      getTableData();
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };
  const supplierDisable = async () => {
    const action = false;
    const { id, flag } = flagId;
    const { data, message, err } = await changeStatus(id, flag, action);
    if (data) {
      toastify(message, "success");
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };
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
      {opendisableModal && (
        <ModalComponent
          ModalWidth={500}
          open={opendisableModal}
          titleClassName="fw-bold fs-14 color-orange"
          ModalTitle="Disable Product"
          saveBtnText="Yes"
          ClearBtnText="Cancel"
          onCloseIconClick={() => {
            setopendisableModal(false);
            setflagId("");
          }}
          onClearBtnClick={() => {
            setopendisableModal(false);
            setflagId("");
          }}
          onSaveBtnClick={() => {
            supplierDisable();
            setopendisableModal(false);
            setflagId("");
          }}
        >
          <Grid>
            <Typography>{deleteMessage}</Typography>
          </Grid>
        </ModalComponent>
      )}
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
            setflagId("");
          }}
          onClearBtnClick={() => {
            setopenDeleteModal(false);
            setflagId("");
          }}
          onSaveBtnClick={() => {
            supplierDelete();
            setflagId("");
          }}
        >
          <Grid>
            <Typography>{deleteMessage}</Typography>
          </Grid>
        </ModalComponent>
      )}
      {openVIew && (
        <ModalComponent
          open={openVIew}
          ModalTitle="Flag Details"
          onCloseIconClick={() => {
            setopenVIew(false);
          }}
          showClearBtn={false}
          showSaveBtn={false}
          titleClassName="fw-bold fs-14 color-orange "
          footerClassName="justify-content-end"
          ClearBtnText="Close"
        >
          <Box>
            <Grid item md={6} xs={12}>
              <Grid container py={1}>
                <Grid item xs={12} sm={6} md={6} lg={4}>
                  <Typography className="fw-600 fs-14">Flag Title:</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={8}>
                  <Typography className="fs-14 fw-500">
                    {flagData.flagTitle}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container py={1}>
                <Grid item xs={12} sm={6} md={6} lg={4}>
                  <Typography className="fw-600 fs-14">Flag Id:</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={8}>
                  <Typography className="fs-14 fw-500">
                    {flagData.flagId}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container py={1}>
                <Grid item xs={12} sm={6} md={6} lg={4}>
                  <Typography className="fw-600 fs-14">Created By:</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={8}>
                  <Typography className="fs-14 fw-500">
                    {flagData.createdBy}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container py={1}>
                <Grid item xs={12} sm={6} md={6} lg={4}>
                  <Typography className="fw-600 fs-14">Created At:</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={8}>
                  <Typography className="fs-14 fw-500">
                    {flagData.createdAt}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container py={1}>
                <Grid item xs={12} sm={6} md={6} lg={4}>
                  <Typography className="fw-600 fs-14">
                    Last Updated By:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={8}>
                  <Typography className="fs-14 fw-500">
                    {flagData.lastModifiedBy}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container py={1}>
                <Grid item xs={12} sm={6} md={6} lg={4}>
                  <Typography className="fw-600 fs-14">
                    Last Updated At:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={8}>
                  <Typography className="fs-14 fw-500">
                    {flagData.lastUpdatedAt}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container py={1}>
                <Grid item xs={12} sm={6} md={6} lg={4}>
                  <Typography className="fw-600 fs-14">
                    Flag Started From:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={8}>
                  <Typography className="fs-14 fw-500">
                    {flagData.startDateTime}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container py={1}>
                <Grid item xs={12} sm={6} md={6} lg={4}>
                  <Typography className="fw-600 fs-14">
                    Flag Expired By:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={8}>
                  <Typography className="fs-14 fw-500">
                    {flagData.endDateTime}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container py={1}>
                <Grid item xs={12} sm={6} md={6} lg={4}>
                  <Typography className="fw-600 fs-14">Flag Status:</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={8}>
                  <Typography className="fs-14 fw-500">
                    {flagData.flagStatus}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container py={1}>
                <Grid item xs={12} sm={6} md={6} lg={4}>
                  <Typography className="fw-600 fs-14">
                    Flag visibility Place:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={8}>
                  <Typography className="fs-14 fw-500">
                    {flagData?.visibilityPlace?.map((ele, index) => {
                      return (
                        <span key={ele}>
                          {(index ? ",  " : "") + ele.split("_").join(" ")}
                        </span>
                      );
                    })}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Typography className="fw-600 fs-14">Flag Image:</Typography>
                <Grid style={{ maxHeight: "20vh", overflowY: "scroll" }}>
                  {flagData?.flagImageUrl?.map((item) => {
                    return (
                      <Image
                        src={item?.toString()}
                        height={100}
                        width={300}
                        alt="flag"
                        layout="intrinsic"
                        className="d-flex justify-content-center align-items-center"
                      />
                    );
                  })}
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </ModalComponent>
      )}
    </>
  );
};

export default AdminFlags;
