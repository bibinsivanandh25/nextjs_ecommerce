import { Box, Typography } from "@mui/material";
import React from "react";
import CustomIcon from "services/iconUtils";
import ModalComponent from "@/atoms/ModalComponent";
import TableComponent from "@/atoms/TableWithSpan";

const ViewModal = ({ openViewModal, setOpenViewModal }) => {
  const handleCloseIconClick = () => {
    setOpenViewModal(false);
  };

  const column1 = [
    {
      id: "col1", //  id value in column should be presented in row as key
      label: "S.No.",
      align: "center",
      data_align: "center",
      data_classname: "",
      rowSpan: 2,
    },

    {
      id: "col2",
      label: "Discount Title",
      align: "center",
      data_align: "center",
      data_classname: "",
      rowSpan: 2,
    },
    {
      id: "col3",
      label: "Description",
      align: "center",
      data_align: "center",
      data_classname: "",
      rowSpan: 2,
    },
    {
      label: "Campaign Period Start & End date with Time",
      align: "center",
      data_align: "center",
      data_classname: "",
      colSpan: 2,
    },
    {
      id: "col6",
      label: "Tools Created Date & Time",
      minWidth: 150,
      align: "center",
      data_align: "center",
      data_classname: "",
      rowSpan: 2,
    },
    {
      id: "col7",
      label: "Customer Type",
      minWidth: 150,
      align: "center",
      data_align: "center",
      data_classname: "",
      rowSpan: 2,
    },
    {
      id: "col8",
      label: "Tool Status",
      minWidth: 150,
      align: "center",
      data_align: "center",
      data_classname: "",
      rowSpan: 2,
    },
    {
      id: "col9",
      label: "Action",
      minWidth: 150,
      align: "center",
      data_align: "center",
      data_classname: "",
      rowSpan: 2,
    },
  ];

  const column2 = [
    {
      id: "col4",
      label: "Start Date",
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col5",
      label: "End Date",
      align: "center",
      data_align: "center",
      data_classname: "",
    },
  ];

  const rows = [
    {
      id: 1,
      col1: "01",
      col2: "Dipawli Special Discounts",
      col3: "Dipawli Special Discounts",
      col4: (
        <Box className="d-flex justify-content-around">
          <Typography className="h-5">25/01/2022 11.42</Typography>
          <CustomIcon type="edit" className="ms-2" />
        </Box>
      ),
      col5: (
        <Box className="d-flex justify-content-around">
          <Typography className="h-5">25/01/2022 11.42</Typography>
          <CustomIcon type="edit" className="ms-2" />
        </Box>
      ),
      col6: "24/12/2021 -17.58",
      col7: "New",
      col8: "Yet to Start",
      col9: (
        <Box className="d-flex align-items-center">
          <CustomIcon type="edit" />
          <CustomIcon type="close" />
          <CustomIcon type="doneIcon" />
          <CustomIcon type="delete" />
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <ModalComponent
        open={openViewModal}
        ModalTitle="Reseller ID: #132564987"
        titleClassName="fw-bold fs-14 color-orange"
        showFooter={false}
        ModalWidth={800}
        onCloseIconClick={() => {
          handleCloseIconClick();
        }}
      >
        <Box className="d-flex">
          <Typography className="fw-bold">
            Subscription status:Active
          </Typography>
          <Typography className="fw-bold">
            Subscription period (8/30days) - 01/01/2022 : 11.44 to 30/01/2022 :
            11.11
          </Typography>
        </Box>
        <TableComponent
          columns={[...column2]}
          column2={[...column1]}
          tableRows={rows}
          tHeadBgColor="bg-light-gray"
          showPagination={false}
          showSearchFilter={false}
          showSearchbar={false}
          showCheckbox={false}
          onCustomButtonClick={() => {
            // setOpenAddDaysCounterModal(true);
          }}
        />
      </ModalComponent>
    </Box>
  );
};

export default ViewModal;