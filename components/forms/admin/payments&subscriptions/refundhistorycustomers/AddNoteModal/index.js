/* eslint-disable jsx-a11y/label-has-associated-control */
import { Box, Typography } from "@mui/material";
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
  const [aDocument, setADocument] = useState(null);
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
    const [errObjReturned] = handleError();
    // console.log(theError);
    setError(errObjReturned);
  };

  const onClose = () => {
    errObj = {
      addANote: false,
    };
    setADocument(null);
    setAddANote("");
    setError(errObj);
    setOpenAddNoteModal(false);
  };

  const onInputFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setADocument(event.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <Box>
      <ModalComponent
        open={openAddNoteModal}
        onCloseIconClick={() => {
          onClose();
        }}
        footerClassName="d-flex justify-content-start flex-row-reverse border-top"
        saveBtnText="Submit"
        ClearBtnText="Cancel"
        saveBtnClassName="ms-2"
        ModalTitle="Add a Note"
        titleClassName="fw-bold fs-14 color-orange"
        onClearBtnClick={() => {
          onClose();
        }}
        onSaveBtnClick={() => {
          handleSubmit();
        }}
      >
        <Box className="w-75 m-auto">
          <InputBox
            label="Enter The Percentage For Discount"
            value={addANote}
            onInputChange={(e) => {
              setAddANote(e.target.value);
            }}
            className="mt-3 mb-2"
            variant="standard"
            error={error.addANote}
            helperText={error.addANote ? validateMessage.field_required : ""}
          />
        </Box>
        <label htmlFor="add_document" className="d-block">
          {aDocument === null ? (
            <Box
              height={150}
              className="bg-light-orange1 rounded border border-orange w-75 m-auto mb-3 d-flex justify-content-center align-items-center"
            >
              <Typography className="color-orange">+Add Document</Typography>
              <input
                type="file"
                id="add_document"
                className="d-none"
                onChange={onInputFileChange}
              />
            </Box>
          ) : (
            <Box
              height={150}
              className="rounded border bg-light-orange1 border-orange w-75 m-auto mb-3 d-flex justify-content-center align-items-center"
            >
              <Typography className="h-5 fw-bold w-50 m-auto text-truncate color-black">
                {aDocument}
              </Typography>
              <input
                type="file"
                id="add_document"
                className="d-none"
                onChange={onInputFileChange}
              />
            </Box>
          )}
        </label>
      </ModalComponent>
    </Box>
  );
};

export default AddNoteModal;
