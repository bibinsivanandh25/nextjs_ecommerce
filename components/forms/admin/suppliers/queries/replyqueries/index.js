import { Box, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import ModalComponent from "@/atoms/ModalComponent";

const ReplyQueries = ({ setReplyModalOpen, replyModalOpen = () => {} }) => {
  const [inputValue, setInputValue] = useState("");
  return (
    <Box>
      <ModalComponent
        open={replyModalOpen}
        onCloseIconClick={() => {
          setReplyModalOpen(false);
        }}
        ModalTitle="Reply"
        footerClassName="justify-content-end"
        titleClassName="fs-14 color-orange"
        onClearBtnClick={() => {
          setInputValue("");
          setReplyModalOpen(false);
        }}
        ClearBtnText="Cancel"
        saveBtnText="Submit"
      >
        <Box className="p-4">
          <TextField
            value={inputValue}
            id="standard-basic"
            label="Type Your Reason"
            variant="standard"
            fullWidth
            onChange={(e) => {
              const val = e.target.value;
              if (val.length <= 200) setInputValue(e.target.value);
            }}
          />
          <Typography className="text-end h-5 color-gray">
            {inputValue.length}/200
          </Typography>
        </Box>
      </ModalComponent>
    </Box>
  );
};

export default ReplyQueries;
