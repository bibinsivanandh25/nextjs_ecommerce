/* eslint-disable jsx-a11y/label-has-associated-control */
import { Box } from "@mui/material";
import React, { useState } from "react";
import validateMessage from "constants/validateMessages";
import ModalComponent from "@/atoms/ModalComponent";
import DatePickerComponent from "@/atoms/DatePickerComponent";

let errObj = {
  date: false,
};

const EditModal = ({ openEditModal, setOpenEditModal }) => {
  const [date, setDate] = useState("");
  const [error, setError] = useState(errObj);
  // const [aDocument, setADocument] = useState(null);

  const handleError = () => {
    errObj = {
      date: false,
    };
    if (date === "") {
      errObj.date = true;
    }
    return errObj;
  };

  const handleSubmit = () => {
    const theError = handleError();
    // console.log(theError);
    setError(theError);
  };

  const onClose = () => {
    errObj = {
      date: false,
    };
    setDate("");
    setError(errObj);
    setOpenEditModal(false);
  };

  return (
    <Box>
      <ModalComponent
        open={openEditModal}
        onCloseIconClick={() => {
          onClose();
        }}
        footerClassName="d-flex justify-content-start flex-row-reverse border-top"
        saveBtnText="Update"
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
          <DatePickerComponent
            value={date}
            onDateChange={(value) => {
              setDate(value);
            }}
            size="small"
            className="my-5"
            error={error.date}
            helperText={error.date ? validateMessage.field_required : ""}
          />
        </Box>
      </ModalComponent>
    </Box>
  );
};

export default EditModal;
