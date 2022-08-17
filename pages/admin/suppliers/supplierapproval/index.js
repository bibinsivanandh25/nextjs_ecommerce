/* eslint-disable no-use-before-define */
import { Box, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
import CustomIcon from "services/iconUtils";
import ClearIcon from "@mui/icons-material/Clear";
import toastify from "services/utils/toastUtils";
import axios from "axios";
import TableComponent from "@/atoms/TableComponent";
import ButtonComponent from "@/atoms/ButtonComponent";
import ModalComponent from "@/atoms/ModalComponent";
import NotificationModal from "@/forms/admin/suppliers/supplierapprovalmodals/notify";
import InputBox from "@/atoms/InputBoxComponent";

const tableColumn = [
  {
    id: "col1",
    label: "Sl NO.",
    minWidth: 30,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col2",
    label: "Business Name",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col3",
    label: "Email / Mobile",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col4",
    label: "GSTIN Number",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col5",
    label: "Categories",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col6",
    label: "Stock Count ",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col7",
    label: "Website link",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col8",
    label: "Other Marketplace",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col9",
    label: "Action",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
];

const SupplierApproval = () => {
  const [masterData, setMasterData] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewModalData, setViewModalData] = useState([]);
  const [notifyModalOpen, setNotifyModalOpen] = useState(false);
  const [openInviteModal, setOpenInviteModal] = useState(false);
  const [modalUserData, setModalUserData] = useState("");
  const copyText = () => {
    const copyTexts = document.getElementById("gstinnumber").innerHTML;
    navigator.clipboard.writeText(copyTexts);
    // toastify(`Copied GSTIN Number ${copyTexts}`, "success");
  };
  const handleViewClick = (item) => {
    setViewModalData(item);
    setViewModalOpen(true);
  };
  const handleAcceptClick = async (id, value) => {
    const payload = {
      supplierId: id,
      status: value,
    };
    await axios
      .put(
        "http://10.10.31.116:8500/api/v1/users/admin/supplier-approval",
        payload,
        { headers: { userId: "ADM01234" } }
      )
      .then((res) => {
        setViewModalOpen(false);
        toastify(`${res?.data?.message}`, "success");
        getAllTableData();
      })
      .catch((err) => {
        toastify(`${err?.response?.data?.message}`, "error");
      });
  };
  const getTableRows = (data) => {
    const rowDatas = [];
    data?.forEach((item, index) => {
      rowDatas.push({
        id: "col1",
        col1: index + 1,
        col2: item.businessName,
        col3: item.emailId ? item.emailId : item.mobileNumber,
        col4: (
          <Box className="d-flex justify-content-around ">
            <span className="h-5" id="gstinnumber">
              {item.gstin}
            </span>
            <CustomIcon
              type="filecopy"
              size="small"
              className="fs-18"
              onIconClick={() => {
                copyText();
              }}
            />
          </Box>
        ),
        col5: item.mainCategories.join(", "),
        col6: item.avgStockCount,
        col7: item.websiteLink,
        col8: item.websiteName,
        col9: (
          <Box>
            <DoneIcon
              className="border rounded bg-green color-white fs-18 me-1 cursor-pointer"
              onClick={() => {
                handleAcceptClick(item.supplierId, "APPROVED");
              }}
            />
            <ClearIcon
              className="border rounded bg-red color-white fs-18 me-1 cursor-pointer"
              onClick={() => {
                handleAcceptClick(item.supplierId, "REJECTED");
              }}
            />
            <CustomIcon
              type="view"
              className="fs-18 me-1 cursor-pointer"
              title="View"
              onIconClick={() => {
                handleViewClick(item);
              }}
            />
            <CustomIcon
              type="notificationsIcon"
              className="fs-18 cursor-pointer"
              onIconClick={() => {
                setNotifyModalOpen(true);
              }}
            />
          </Box>
        ),
      });
    });
    setTableRows(rowDatas);
  };
  const getAllTableData = async () => {
    await axios
      .get(
        `http://10.10.31.116:8500/api/v1/users/admin/supplier/supplier-status/0/5?status=INITIATED`
      )
      .then((res) => {
        setMasterData(res.data.data);
        getTableRows(res.data.data.supplierRegistrations);
      })
      .catch((err) => {
        toastify(err?.response?.data?.message, "error");
        setTableRows([]);
      });
  };

  useEffect(() => {
    getAllTableData();
  }, []);
  const handleInviteSupplierClick = () => {};
  return (
    <Paper
      className="pt-2 mnh-85vh mxh-85vh overflow-auto hide-scrollbar"
      elevation={3}
    >
      <Box className="d-flex justify-content-between px-3">
        <Typography>Supplier approval ({masterData.count})</Typography>
        <ButtonComponent
          label="Invite supplier"
          onBtnClick={() => {
            setOpenInviteModal(true);
          }}
        />
      </Box>
      <TableComponent
        showSearchFilter={false}
        showSearchbar={false}
        stickyHeader={false}
        columns={[...tableColumn]}
        tableRows={[...tableRows]}
        showCheckbox={false}
      />
      {viewModalOpen && (
        <ModalComponent
          open={viewModalOpen}
          onCloseIconClick={() => {
            setViewModalOpen(false);
          }}
          ModalTitle="View Supplier approval"
          titleClassName="h-5 color-orange"
          showFooter={false}
        >
          <Box className="mt-2">
            <Box className="border-bottom">
              <Grid container className="py-2" xs={12} alignItems="center">
                <Grid item sm={5} display="flex" justifyContent="end">
                  <Typography className="h-5">Business Name</Typography>
                </Grid>
                <Grid>&nbsp;:&nbsp;</Grid>
                <Grid item sm={6} display="flex" justifyContent="start">
                  <Typography className="fw-bold h-5">
                    {viewModalData.businessName}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container className="py-2" xs={12} alignItems="center">
                <Grid item sm={5} display="flex" justifyContent="end">
                  <Typography className="h-5">Email ID</Typography>
                </Grid>
                <Grid>&nbsp;:&nbsp;</Grid>
                <Grid item sm={6} display="flex" justifyContent="start">
                  <Typography className="fw-bold h-5">
                    {viewModalData.emailId}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container className="py-2" xs={12} alignItems="center">
                <Grid item sm={5} display="flex" justifyContent="end">
                  <Typography className="h-5">Mobile no</Typography>
                </Grid>
                <Grid>&nbsp;:&nbsp;</Grid>
                <Grid item sm={6} display="flex" justifyContent="start">
                  <Typography className="fw-bold h-5">
                    {viewModalData.mobileNumber}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container className="py-2" xs={12} alignItems="center">
                <Grid item sm={5} display="flex" justifyContent="end">
                  <Typography className="h-5">GSTIN No</Typography>
                </Grid>
                <Grid>&nbsp;:&nbsp;</Grid>
                <Grid item sm={6} display="flex" justifyContent="start">
                  <Typography className="fw-bold h-5">
                    {viewModalData.gstin}
                  </Typography>
                </Grid>
              </Grid>{" "}
              <Grid container className="py-2" xs={12} alignItems="center">
                <Grid item sm={5} display="flex" justifyContent="end">
                  <Typography className="h-5">Categories</Typography>
                </Grid>
                <Grid>&nbsp;:&nbsp;</Grid>
                <Grid item sm={6} display="flex" justifyContent="start">
                  <Typography className="fw-bold h-5">
                    {viewModalData.mainCategories.join(", ")}
                  </Typography>
                </Grid>
              </Grid>{" "}
              <Grid container className="py-2" xs={12} alignItems="center">
                <Grid item sm={5} display="flex" justifyContent="end">
                  <Typography className="h-5">Stock Count</Typography>
                </Grid>
                <Grid>&nbsp;:&nbsp;</Grid>
                <Grid item sm={6} display="flex" justifyContent="start">
                  <Typography className="fw-bold h-5">
                    {viewModalData.avgStockCount}
                  </Typography>
                </Grid>
              </Grid>{" "}
              <Grid container className="py-2" xs={12} alignItems="center">
                <Grid item sm={5} display="flex" justifyContent="end">
                  <Typography className="h-5">Website link</Typography>
                </Grid>
                <Grid>&nbsp;:&nbsp;</Grid>
                <Grid item sm={6} display="flex" justifyContent="start">
                  <Typography className="fw-bold h-5">
                    {viewModalData.websiteLink}
                  </Typography>
                </Grid>
              </Grid>{" "}
              <Grid container className="py-2" xs={12} alignItems="center">
                <Grid item sm={5} display="flex" justifyContent="end">
                  <Typography className="h-5">Website Name</Typography>
                </Grid>
                <Grid>&nbsp;:&nbsp;</Grid>
                <Grid item sm={6} display="flex" justifyContent="start">
                  <Typography className="fw-bold h-5">
                    {viewModalData.websiteName}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Box className="d-flex justify-content-end my-2">
              <ButtonComponent
                variant="contained"
                bgColor="bg-dark-red"
                label="Reject"
                muiProps="me-2 px-3"
                onBtnClick={() => {
                  handleAcceptClick(viewModalData.supplierId, "REJECTED");
                }}
              />
              <ButtonComponent
                variant="contained"
                bgColor="bg-green"
                label="Accept"
                muiProps="px-3"
                onBtnClick={() => {
                  handleAcceptClick(viewModalData.supplierId, "APPROVED");
                }}
              />
            </Box>
          </Box>
        </ModalComponent>
      )}
      {notifyModalOpen && (
        <NotificationModal
          notifyModalOpen={notifyModalOpen}
          setNotifyModalOpen={setNotifyModalOpen}
        />
      )}
      {openInviteModal && (
        <ModalComponent
          open={openInviteModal}
          onCloseIconClick={() => {
            setModalUserData("");
            setOpenInviteModal(false);
          }}
          ModalTitle="Invite Supplier"
          ClearBtnText="Close"
          saveBtnText="Submit"
          onSaveBtnClick={() => {
            handleInviteSupplierClick();
          }}
        >
          <Box className="p-3">
            <InputBox
              value={modalUserData}
              placeholder="Enter Mail Id / Phone Number"
              inputlabelshrink
              variant="standard"
              onInputChange={(e) => {
                setModalUserData(e.target.value);
              }}
            />
          </Box>
        </ModalComponent>
      )}
    </Paper>
  );
};

export default SupplierApproval;
