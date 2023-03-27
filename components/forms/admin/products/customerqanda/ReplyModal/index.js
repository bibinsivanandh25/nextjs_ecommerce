import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import validateMessage from "constants/validateMessages";
import ModalComponent from "@/atoms/ModalComponent";
import TextArea from "@/atoms/SimpleTextArea";
import { replyAnswer } from "services/admin/customers";
import toastify from "services/utils/toastUtils";

const ReplyModal = ({
  openReplyModal,
  setOpenReplyModal,
  value = "",
  selectedData,
  getBothCountCall = () => {},
}) => {
  const [reply, setReply] = useState("");
  const [error, setError] = useState("");
  const handleCloseIconClick = () => {
    setReply("");
    setError("");
    setOpenReplyModal(false);
  };
  useEffect(() => {
    setReply(value);
  }, [value]);
  const handleError = () => {
    let flag = true;
    if (reply === "") {
      flag = false;
      setError(validateMessage.field_required);
    } else if (reply.length > 255) {
      flag = false;
      setError(validateMessage.alpha_numeric_max_255);
    } else {
      setError("");
    }
    return flag;
  };

  const handleSaveBtnClick = async () => {
    const result = handleError();
    if (result) {
      const payload = {
        customerQuestionId: selectedData.customerQuestionId,
        answerFromType: "ADMIN",
        answer: reply,
      };

      const { data, err } = await replyAnswer(payload);
      if (data) {
        toastify(data.data, "success");
        getBothCountCall();
        handleCloseIconClick();
      }
      if (err) {
        toastify(err?.response?.data?.message, "error");
      }
    }
  };

  return (
    <Box>
      <ModalComponent
        open={openReplyModal}
        ModalTitle="Reply"
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
        <Box className="my-1">
          <Typography className="h-p89 mb-1">
            Question : {selectedData?.question}
          </Typography>
          <TextArea
            value={reply}
            placeholder="Reply Here"
            rows={3}
            className="w-100 px-2 rounded textArea"
            onInputChange={(e) => {
              setReply(e.target.value);
            }}
            error={error !== ""}
            helperText={error}
          />
        </Box>
      </ModalComponent>
    </Box>
  );
};

export default ReplyModal;
