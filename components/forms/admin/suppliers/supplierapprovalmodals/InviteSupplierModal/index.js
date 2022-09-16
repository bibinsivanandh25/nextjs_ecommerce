import { Box } from "@mui/material";
import React, { useState } from "react";
import validateMessage from "constants/validateMessages";
import ModalComponent from "@/atoms/ModalComponent";
import InputBox from "@/atoms/InputBoxComponent";

let errObj = {
  inviteSupplierText: false,
};

const InviteSupplierModal = ({
  openInviteSupplierModal,
  setOpenInviteSupplierModal,
}) => {
  const [inviteSupplierText, setInviteSupplierText] = useState("");
  const [error, setError] = useState(errObj);
  const handleError = () => {
    let theError = false;
    errObj = {
      inviteSupplierText: false,
    };
    if (inviteSupplierText === "") {
      errObj.inviteSupplierText = true;
      theError = true;
    }
    return [theError, errObj];
  };

  const handleSubmit = () => {
    const [errObjReturned] = handleError();
    // console.log(theError);
    setError(errObjReturned);
  };
  return (
    <Box>
      <ModalComponent
        open={openInviteSupplierModal}
        onCloseIconClick={() => {
          errObj = {
            inviteSupplierText: false,
          };
          setError(errObj);
          setInviteSupplierText("");
          setOpenInviteSupplierModal(false);
        }}
        footerClassName="d-flex justify-content-start flex-row-reverse border-top"
        saveBtnText="Submit"
        ClearBtnText="Cancel"
        saveBtnClassName="ms-2"
        ModalTitle="Invite Supplier"
        titleClassName="fw-bold fs-14 color-orange"
        onClearBtnClick={() => {
          errObj = {
            inviteSupplierText: false,
          };
          setError(errObj);
          setInviteSupplierText("");
          setOpenInviteSupplierModal(false);
        }}
        onSaveBtnClick={() => {
          handleSubmit();
        }}
      >
        <Box className="w-75 m-auto">
          <InputBox
            label="Enter Mail ID/ Ph. Number"
            value={inviteSupplierText}
            onInputChange={(e) => {
              setInviteSupplierText(e.target.value);
            }}
            className="mt-3 mb-5"
            variant="standard"
            error={error.inviteSupplierText}
            helperText={
              error.inviteSupplierText ? validateMessage.field_required : ""
            }
          />
        </Box>
      </ModalComponent>
    </Box>
  );
};

export default InviteSupplierModal;
