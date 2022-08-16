import { Box } from "@mui/material";
import React, { useState } from "react";
import validateMessage from "constants/validateMessages";
import ModalComponent from "@/atoms/ModalComponent";
import InputBox from "@/atoms/InputBoxComponent";

let errObj = {
  addANote: false,
};

const AddNoteModal = ({ openAddNoteModal, setOpenAddNoteModal }) => {
  const [addANote, setAddANote] = useState("");
  const [error, setError] = useState(errObj);
  const handleError = () => {
    let theError = false;
    errObj = {
      addANote: false,
    };
    if (addANote === "") {
      errObj.addANote = true;
      theError = true;
    }
    return [theError, errObj];
  };

  const handleSubmit = () => {
    const [theError, errObjReturned] = handleError();
    console.log(theError);
    setError(errObjReturned);
  };
  return (
    <Box>
      <ModalComponent
        open={openAddNoteModal}
        onCloseIconClick={() => {
          setAddANote("");
          setOpenAddNoteModal(false);
        }}
        footerClassName="d-flex justify-content-start flex-row-reverse border-top"
        saveBtnText="Submit"
        ClearBtnText="Cancel"
        saveBtnClassName="ms-2"
        ModalTitle="Create Discount"
        titleClassName="fw-bold fs-14 color-orange"
        onClearBtnClick={() => {
          setAddANote("");
          setOpenAddNoteModal(false);
        }}
        onSaveBtnClick={() => {
          handleSubmit();
        }}
      >
        <Box className="w-75 m-auto">
          <InputBox
            label="Enter"
            value={addANote}
            onInputChange={(e) => {
              setAddANote(e.target.value);
            }}
            className="mt-3 mb-5"
            variant="standard"
            error={error.addANote}
            helperText={error.addANote ? validateMessage.field_required : ""}
          />
        </Box>
      </ModalComponent>
    </Box>
  );
};

export default AddNoteModal;
