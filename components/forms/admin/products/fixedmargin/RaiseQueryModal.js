import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import validateMessage from "constants/validateMessages";
import ModalComponent from "@/atoms/ModalComponent";
import InputBox from "@/atoms/InputBoxComponent";

let errObj = {
  textInput: false,
};

const RaiseQueryModal = ({
  openRaiseQueryModal = false,
  setOpenRaiseQueryModal = () => {},
}) => {
  const [textInput, setTextInput] = useState("");
  const [keyCode, setKeyCode] = useState(null);
  const [error, setError] = useState(errObj);
  useEffect(() => {
    if (textInput.length > 200 && keyCode !== 8) {
      const theText = textInput.slice(0, 200);
      setTextInput(theText);
    }
  }, [textInput]);

  const handleError = () => {
    errObj = {
      textInput: false,
    };
    if (textInput === "") {
      errObj.textInput = true;
    }
    return errObj;
  };

  const handleSubmit = () => {
    const theError = handleError();
    setError(theError);
  };

  return (
    <>
      <ModalComponent
        open={openRaiseQueryModal}
        onCloseIconClick={() => {
          setOpenRaiseQueryModal(false);
        }}
        footerClassName="d-flex justify-content-start flex-row-reverse border-top"
        saveBtnText="Submit"
        ClearBtnText="Cancel"
        saveBtnClassName="ms-2"
        ModalTitle="Raise Query"
        titleClassName="fw-bold fs-14 color-orange"
        onClearBtnClick={() => {
          setOpenRaiseQueryModal(false);
        }}
        onSaveBtnClick={() => {
          handleSubmit();
        }}
      >
        <Box className="my-5 w-75 m-auto">
          <InputBox
            value={textInput}
            placeholder="Type Your Query"
            variant="standard"
            onInputChange={(e) => {
              if (textInput.length <= 199) setTextInput(e.target.value);
            }}
            onKeyDown={(e) => {
              setKeyCode(e.keyCode);
              if (textInput.length === 200 && e.keyCode === 8) {
                const theText = textInput.slice(0, textInput.length - 1);
                setTextInput(theText);
              }
            }}
            error={error.textInput}
            helperText={error.textInput ? validateMessage.field_required : ""}
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
