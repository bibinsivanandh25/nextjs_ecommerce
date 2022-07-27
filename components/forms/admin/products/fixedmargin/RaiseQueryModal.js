import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import ModalComponent from "@/atoms/ModalComponent";
import InputBox from "@/atoms/InputBoxComponent";

const RaiseQueryModal = ({
  openRaiseQueryModal = false,
  setOpenRaiseQueryModal = () => {},
}) => {
  const [textInput, setTextInput] = useState("");
  const [keyCode, setKeyCode] = useState(null);
  useEffect(() => {
    if (textInput.length > 200 && keyCode !== 8) {
      const theText = textInput.slice(0, 200);
      setTextInput(theText);
    }
  }, [textInput]);
  return (
    <>
      <ModalComponent
        open={openRaiseQueryModal}
        onCloseIconClick={() => {
          setOpenRaiseQueryModal(false);
        }}
      >
        <Box className="my-3 w-75 m-auto">
          <InputBox
            value={textInput}
            placeholder="Type Your Query"
            variant="standard"
            onInputChange={(e) => {
              if (textInput.length < 200) setTextInput(e.target.value);
            }}
            onKeyDown={(e) => {
              setKeyCode(e.keyCode);
              if (textInput.length >= 200 && e.keyCode === 8) {
                const theText = textInput.slice(0, textInput.length - 1);
                setTextInput(theText);
              }
            }}
          />
          <Typography className="fs-12 text-end">
            {textInput.length}/200
          </Typography>
        </Box>
      </ModalComponent>
    </>
  );
};

export default RaiseQueryModal;
