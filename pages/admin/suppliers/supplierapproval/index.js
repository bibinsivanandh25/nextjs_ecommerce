import { Box, Grid, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
import CustomIcon from "services/iconUtils";
import ClearIcon from "@mui/icons-material/Clear";
import TableComponent from "@/atoms/TableComponent";
import ButtonComponent from "@/atoms/ButtonComponent";
import ModalComponent from "@/atoms/ModalComponent";
import NotificationModal from "@/forms/admin/suppliers/supplierapprovalmodals/notify";
import InviteSupplierModal from "@/forms/admin/suppliers/supplierapprovalmodals/InviteSupplierModal";

const tableColumn = [
  {
    id: "col1",
    label: "SI NO.",
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

const viewModalDatas = [
  {
    id: 1,
    title: "Business Name",
    value: "#354543673",
  },
  {
    id: 2,
    title: "Email ID",
    value: "balu123@gmail.com",
  },
  {
    id: 3,
    title: "Mobile no",
    value: "8765433680",
  },
  {
    id: 4,
    title: "GSTIN No",
    value: "--",
  },
  {
    id: 5,
    title: "Categories",
    value: "--",
  },
  {
    id: 6,
    title: "Stock Count",
    value: "--",
  },
  {
    id: 7,
    title: "Website link",
    value: "--",
  },
  {
    id: 8,
    title: "Other market place",
    value: "--  ",
  },
];

const SupplierApproval = () => {
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewModalData, setViewModalData] = useState([]);
  const [notifyModalOpen, setNotifyModalOpen] = useState(false);
  const [openInviteSupplierModal, setOpenInviteSupplierModal] = useState(false);
  const copyText = () => {
    const copyTexts = document.getElementById("gstinnumber").innerHTML;
    navigator.clipboard.writeText(copyTexts);
  };
  const rows = [
    {
      id: "col1",
      col1: "01",
      col2: "VRL Transport",
      col3: "+91 787654544",
      col4: (
        <Box className="d-flex justify-content-around ">
          <span className="h-5" id="gstinnumber">
            MRK3556235F3
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
      col5: "--",
      col6: "--",
      col7: "http://",
      col8: "http://",
      col9: (
        <Box>
          <DoneIcon className="border rounded bg-green color-white fs-18 me-1" />
          <ClearIcon className="border rounded bg-red color-white fs-18 me-1" />
          <CustomIcon
            type="view"
            className="fs-18 me-1"
            title="View"
            onIconClick={() => {
              setViewModalOpen(true);
              setViewModalData(viewModalDatas);
            }}
          />
          <CustomIcon
            type="notificationsIcon"
            className="fs-18"
            onIconClick={() => {
              setNotifyModalOpen(true);
            }}
          />
        </Box>
      ),
    },
  ];

  return (
    <Box className="mt-2">
      <Paper
        sx={{ height: "84vh" }}
        className="p-3 overflow-auto hide-scrollbar"
      >
        <Box className="d-flex justify-content-between px-3">
          <Typography className="color-orange fw-bold">
            Supplier approval (48)
          </Typography>
          <ButtonComponent
            onBtnClick={() => {
              setOpenInviteSupplierModal(true);
            }}
            label="Invite supplier"
          />
        </Box>
        <TableComponent
          // table_heading="Supplier approval (48)"
          showSearchFilter={false}
          showSearchbar={false}
          stickyHeader={false}
          // showCustomButton
          // customButtonLabel="Invite supplier"
          columns={[...tableColumn]}
          tableRows={[...rows]}
        />
      </Paper>
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
              {viewModalData.map((item) => (
                <Grid container key={item.id} className="py-2" xs={12}>
                  <Grid item sm={5} display="flex" justifyContent="end">
                    <Typography className="h-5"> {item.title}</Typography>
                  </Grid>
                  <Grid>&nbsp;:&nbsp;</Grid>
                  <Grid item sm={6} display="flex" justifyContent="start">
                    <Typography className="fw-bold h-5">
                      {item.value}
                    </Typography>
                  </Grid>
                </Grid>
              ))}
            </Box>
            <Box className="d-flex justify-content-end my-2">
              <ButtonComponent
                variant="contained"
                bgColor="bg-dark-red"
                label="Reject"
                muiProps="me-2 px-3"
              />
              <ButtonComponent
                variant="contained"
                bgColor="bg-green"
                label="Accept"
                muiProps="px-3"
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
      <InviteSupplierModal
        setOpenInviteSupplierModal={setOpenInviteSupplierModal}
        openInviteSupplierModal={openInviteSupplierModal}
      />
    </Box>
  );
};

export default SupplierApproval;
