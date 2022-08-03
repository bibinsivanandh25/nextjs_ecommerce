import { Box, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import ModalComponent from "@/atoms/ModalComponent";

const DisabledAddNote = ({
  addnoteModalOpen,
  setAddnoteModalOpen = () => {},
}) => {
  const [inputValue, setInputValue] = useState("");
  return (
    <Box>
      <ModalComponent
        open={addnoteModalOpen}
        onCloseIconClick={() => {
          setAddnoteModalOpen(false);
        }}
        ClearBtnText="Close"
        saveBtnText="Submit"
        onClearBtnClick={() => {
          setAddnoteModalOpen(false);
        }}
        footerClassName="justify-content-end"
        ModalTitle="Add a Note"
        titleClassName="fs-16 color-orange"
      >
        <Box className="px-5 py-4">
          <TextField
            value={inputValue}
            variant="standard"
            placeholder="Add Your Note"
            fullWidth
            onChange={(e) => {
              const count = e.target.value;
              if (count.length <= 200) setInputValue(e.target.value);
            }}
          />
          <Typography className="text-end color-gray h-5">
            {inputValue.length} / 200
          </Typography>
        </Box>
      </ModalComponent>
    </Box>
  );
};

export default DisabledAddNote;
