/* eslint-disable no-shadow */
import { Box } from "@mui/material";
import React, { useState } from "react";
import validateMessage from "constants/validateMessages";
import ModalComponent from "@/atoms/ModalComponent";
import InputBox from "@/atoms/InputBoxComponent";
import InputFieldWithChip from "@/atoms/InputWithChip";

const errObj = {
  variationName: "",
  variationAttributes: "",
};

const CreateVariationModal = ({
  openVariationModal,
  setOpenVariationModal = () => {},
  // newVariationData,
  // setNewVariationData,,
  variationList,
  setvariationList = () => {},
}) => {
  const [variationName, setVariationName] = useState("");
  const [inputChips, setInputChips] = useState([]);
  const [error, setError] = useState(errObj);

  const handleCloseIconClick = () => {
    setError({ variationName: false, variationAttributes: false });
    setOpenVariationModal(false);
  };

  const handleClearAll = () => {
    setVariationName("");
    setInputChips([]);
  };

  const handleError = () => {
    const err = {
      variationName: "",
      variationAttributes: "",
    };
    if (variationName.length === 0) {
      err.variationName = validateMessage.field_required;
    }
    if (inputChips.length === 0) {
      err.variationAttributes = validateMessage.field_required;
    }
    const result = Object.values(err).every((x) => x == "");
    setError(err);
    return result;
  };

  const handleSaveBtnClick = () => {
    const result = handleError();
    if (result) {
      const temp = JSON.parse(JSON.stringify(variationList));
      const optionList = [];
      inputChips.forEach((item) => {
        optionList.push({
          id: "",
          label: item,
          isChecked: false,
        });
      });
      temp.push({
        id: "",
        label: variationName,
        selected: false,
        options: optionList,
      });
      setvariationList(temp);
      handleClearAll();
      setOpenVariationModal(false);
    }
  };
  return (
    <Box>
      <ModalComponent
        open={openVariationModal}
        ModalTitle="Create Variation"
        titleClassName="fw-bold fs-14 color-orange"
        footerClassName="d-flex justify-content-start flex-row-reverse border-top mt-3"
        ClearBtnText="Reset"
        saveBtnClassName="ms-1"
        // ModalWidth={650}
        minHeightClassName="overflow-auto"
        onCloseIconClick={() => {
          handleCloseIconClick();
        }}
        onSaveBtnClick={() => {
          handleSaveBtnClick();
        }}
        onClearBtnClick={() => {
          handleClearAll();
        }}
      >
        <InputBox
          value={variationName}
          inputlabelshrink
          label="Variation Name"
          onInputChange={(e) => {
            setVariationName(e.target.value);
          }}
          className="mt-4"
          error={error.variationName}
          helperText={error.variationName ? validateMessage.field_required : ""}
        />
        <InputFieldWithChip
          inputlabelshrink
          label="Attributes"
          className="mt-4 mb-3"
          value={inputChips}
          handleChange={(e, val) => {
            setInputChips([...val]);
          }}
          error={error.variationAttributes}
          helperText={
            error.variationAttributes ? validateMessage.field_required : ""
          }
        />
      </ModalComponent>
    </Box>
  );
};

export default CreateVariationModal;
