import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import validateMessage from "constants/validateMessages";
import ModalComponent from "@/atoms/ModalComponent";
import TextEditor from "@/atoms/TextEditor";

let errObj = {
  body: false,
};

const PushNotificationModal = ({
  openPushNotificationModal,
  setOpenPushNotificationModal,
}) => {
  const [body, setBody] = useState("<p><br></p>");
  const [error, setError] = useState(errObj);
  const handleCloseIconClick = () => {
    errObj = {
      body: false,
    };
    setError(errObj);
    setBody("<p><br></p>");
    setOpenPushNotificationModal(false);
  };

  const handleError = () => {
    errObj = {
      body: false,
    };
    if (body === "<p><br></p>") {
      errObj.body = true;
    }
    return errObj;
  };

  const handleSaveBtnClickOfEditModal = () => {
    setError(handleError());
  };

  return (
    <Box>
      <ModalComponent
        open={openPushNotificationModal}
        ModalTitle="Create Transactional E-mail, SMS & Push notification"
        titleClassName="fw-bold fs-14 color-orange"
        footerClassName="d-flex justify-content-start flex-row-reverse border-top mt-3"
        ClearBtnText="Cancel"
        saveBtnText="Send"
        saveBtnClassName="ms-1"
        ModalWidth={650}
        onCloseIconClick={() => {
          handleCloseIconClick();
        }}
        onSaveBtnClick={() => {
          handleSaveBtnClickOfEditModal();
        }}
        onClearBtnClick={() => {
          handleCloseIconClick();
        }}
      >
        <Box className="my-5">
          <Box className="d-flex justify-content-center mb-1">
            <TextEditor
              getContent={(content) => {
                // console.log(content);
                setBody(content);
              }}
              content={body}
            />
          </Box>
          {error.body && (
            <Typography className="h-5 ms-4 text-danger mb-3">
              {validateMessage.field_required}
            </Typography>
          )}
        </Box>
      </ModalComponent>
    </Box>
  );
};

export default PushNotificationModal;
