import React, { useState } from "react";
import { Box } from "@mui/material";
import CustomIcon from "services/iconUtils";
import TableComponent from "@/atoms/TableComponent";
import ButtonComponent from "@/atoms/ButtonComponent";
import PushNotificationModal from "./PushNotificationModal";

const PushNotification = () => {
  const [openPushNotificationModal, setOpenPushNotificationModal] =
    useState(false);
  const columns = [
    {
      id: "col1",
      align: "center",
      label: "S.No.",
      data_align: "center",
    },
    {
      id: "col2",
      align: "center",
      label: "Transaction Type",
      data_align: "center",
    },
    {
      id: "col3",
      align: "center",
      label: "Message",
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
      label: "Updted By",
      data_align: "center",
    },
    {
      id: "col6",
      align: "center",
      label: "Actions",
      data_align: "center",
    },
  ];

  const rows = [
    {
      id: 1,
      col1: "----",
      col2: "----",
      col3: "----",
      col4: "----",
      col5: "----",
      col6: (
        <Box className="d-flex align-items-center justify-content-center">
          <CustomIcon
            type="edit"
            onIconClick={() => {
              setOpenPushNotificationModal(true);
            }}
          />
          <ButtonComponent
            label="Preview"
            variant="outlined"
            borderColor="border-orange color-orange"
            muiProps="cursor-pointer ms-1"
          />
        </Box>
      ),
    },
  ];

  return (
    <>
      <TableComponent
        columns={columns}
        tHeadBgColor="bg-light-gray"
        showPagination={false}
        tableRows={rows}
        table_heading="No Commission Store"
        showSearchbar={false}
        showSearchFilter={false}
        showCustomButton
        customButtonLabel="Create No Commission Store"
      />
      <PushNotificationModal
        openPushNotificationModal={openPushNotificationModal}
        setOpenPushNotificationModal={setOpenPushNotificationModal}
      />
    </>
  );
};

export default PushNotification;
