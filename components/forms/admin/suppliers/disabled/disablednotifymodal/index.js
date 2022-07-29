import { Box } from "@mui/material";
import React from "react";
import ModalComponent from "@/atoms/ModalComponent";
import TextEditor from "@/atoms/TextEditor";

const DisableNotifyModal = ({
  setNotifyModalOpen = () => {},
  notifyModalOpen,
}) => {
  return (
    <Box>
      <ModalComponent
        open={notifyModalOpen}
        onCloseIconClick={() => {
          setNotifyModalOpen(false);
        }}
        ModalTitle="Notify"
        titleClassName="fs-16 color-orange"
        ModalWidth={700}
        footerClassName="justify-content-end"
        saveBtnText="Submit"
        ClearBtnText="Close"
        onClearBtnClick={() => {
          setNotifyModalOpen(false);
        }}
      >
        <Box className="p-3">
          <TextEditor />
        </Box>
      </ModalComponent>
    </Box>
  );
};

export default DisableNotifyModal;
