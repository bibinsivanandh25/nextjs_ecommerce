import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import validateMessage from "constants/validateMessages";
import ModalComponent from "@/atoms/ModalComponent";
import RadiobuttonComponent from "@/atoms/RadiobuttonComponent";
import InputBox from "@/atoms/InputBoxComponent";

let errObj = {
  typeInput: false,
};

const VisibilityRangeModal = ({
  openVisibilityRangeModal = false,
  setOpenVisibilityRangeModal = () => {},
}) => {
  const [productDiliverable, setProductDiliverable] = useState(true);
  const [productNotDiliverable, setProductNotDiliverable] = useState(false);
  const [typeInput, setTypeInput] = useState("");
  const [error, setError] = useState(errObj);

  const changeStateOfRadioButtons = (deliverable) => {
    if (deliverable) {
      errObj.typeInput = false;
      setError(errObj);
      setTypeInput("");
      setProductDiliverable(true);
      setProductNotDiliverable(false);
    } else {
      setProductDiliverable(false);
      setProductNotDiliverable(true);
    }
  };

  const handleError = () => {
    errObj = {
      typeInput: false,
    };
    if (typeInput === "") {
      errObj.typeInput = true;
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
        open={openVisibilityRangeModal}
        onCloseIconClick={() => {
          setOpenVisibilityRangeModal(false);
        }}
        footerClassName="d-flex justify-content-start flex-row-reverse border-top"
        saveBtnText="Submit"
        ClearBtnText="Cancel"
        ModalTitle="Visibility Range"
        titleClassName="fw-bold fs-14 color-orange"
        saveBtnClassName="ms-2"
        ModalWidth={650}
        onClearBtnClick={() => {
          setOpenVisibilityRangeModal(false);
        }}
        onSaveBtnClick={() => {
          handleSubmit();
        }}
      >
        <Box className="d-flex  flex-wrap  mt-2 pb-5 mb-3">
          <Box
            onClick={() => {
              changeStateOfRadioButtons(true);
            }}
            className="d-flex w-50 flex-shrink-0 justify-content-center align-items-center"
          >
            <RadiobuttonComponent isChecked={productDiliverable} />
            <Typography className="fs-14 cursor-pointer">
              Product deliverable throughout India
            </Typography>
          </Box>
          <Box
            onClick={() => {
              changeStateOfRadioButtons(false);
            }}
            className="d-flex w-50 flex-shrink-0 justify-content-center align-items-center"
          >
            <RadiobuttonComponent isChecked={productNotDiliverable} />
            <Typography className="fs-14 cursor-pointer">
              Product not deliverable throughout India
            </Typography>
          </Box>
          {productNotDiliverable && (
            <Box className="w-75 ms-4 mt-3">
              <InputBox
                placeholder="Enter delivery range in km"
                variant="standard"
                className="w-100"
                onInputChange={(e) => {
                  setTypeInput(e.target.value);
                }}
                value={typeInput}
                error={error.typeInput}
                helperText={
                  error.typeInput ? validateMessage.field_required : ""
                }
              />
              <Typography className="fst-italic fs-14 mt-1">
                Delivery range will be considered from supplier location.
              </Typography>
            </Box>
          )}
        </Box>
      </ModalComponent>
    </>
  );
};

export default VisibilityRangeModal;
