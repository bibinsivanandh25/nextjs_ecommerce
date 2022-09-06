import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import validateMessage from "constants/validateMessages";
import ModalComponent from "@/atoms/ModalComponent";

let errObj = {
  reply: false,
};

const ReplyModal = ({ openReplyModal, setOpenReplyModal }) => {
  const [reply, setReply] = useState("");
  const [error, setError] = useState(errObj);
  const handleCloseIconClick = () => {
    setReply("");
    setError({
      reply: false,
    });
    setOpenReplyModal(false);
  };

  const handleError = () => {
    errObj = {
      reply: false,
    };
    if (reply === "") {
      errObj.reply = true;
    }
    return errObj;
  };

  const handleSaveBtnClick = () => {
    const theError = handleError();
    setError(theError);
  };

  return (
    <Box>
      <ModalComponent
        open={openReplyModal}
        ModalTitle="Capture Questions Asked By Customer Here"
        titleClassName="fw-bold fs-14 color-orange"
        footerClassName="d-flex justify-content-start flex-row-reverse border-top mt-3"
        ClearBtnText="Cancel"
        saveBtnText="Submit"
        saveBtnClassName="ms-1"
        ModalWidth={650}
        minHeightClassName="overflow-auto"
        onCloseIconClick={() => {
          handleCloseIconClick();
        }}
        onSaveBtnClick={() => {
          handleSaveBtnClick();
        }}
        onClearBtnClick={() => {
          handleCloseIconClick();
        }}
      >
        <Box className="mt-4 mb-3">
          <textarea
            value={reply}
            placeholder="Reply Here"
            rows={4}
            className="w-100 px-2 rounded textArea"
            onChange={(e) => {
              setReply(e.target.value);
            }}
          />
          <Typography className="h-5">
            {error.reply ? (
              <span className="text-danger">
                {validateMessage.field_required}
              </span>
            ) : (
              ""
            )}
          </Typography>
        </Box>
      </ModalComponent>
    </Box>
  );
};

export default ReplyModal;
