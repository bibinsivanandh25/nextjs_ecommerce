/* eslint-disable no-shadow */
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import validateMessage from "constants/validateMessages";
import ModalComponent from "@/atoms/ModalComponent";
import InputBox from "@/atoms/InputBoxComponent";
import InputFieldWithChip from "@/atoms/InputWithChip";

const errObj = {
  variationName: false,
  variationAttributes: false,
};

const CreateVariationModal = ({
  openVariationModal,
  setOpenVariationModal,
  attributesArray,
  variationId,
  variations,
  setVariations,
  variationName = "",
  setVariationName = () => {},
  // newVariationData,
  // setNewVariationData,
}) => {
  const [inputChips, setInputChips] = useState([]);
  const [error, setError] = useState(errObj);

  const handleCloseIconClick = () => {
    if (variationId === null) {
      setVariationName("");
      setInputChips([]);
    }
    setError({ variationName: false, variationAttributes: false });
    setOpenVariationModal(false);
  };

  const handleClearAll = () => {
    setVariationName("");
    setInputChips([]);
  };

  useEffect(() => {
    console.log(attributesArray);
    setInputChips(attributesArray);
  }, [attributesArray]);

  useEffect(() => {
    console.log(attributesArray);
    setInputChips(attributesArray);
  }, []);

  const handleError = () => {
    let returnError = false;
    const errObj = {
      variationName: false,
      variationAttributes: false,
    };
    if (variationName === "") {
      errObj.variationName = true;
      returnError = true;
    }
    if (inputChips.length === 0) {
      errObj.variationAttributes = true;
      returnError = true;
    }
    return [returnError, errObj];
  };

  const handleSaveBtnClick = () => {
    const [returnError, errObj] = handleError();
    setError(errObj);
    if (!returnError) {
      if (variationId === null) {
        console.log(variations);
        const thePreVariations = [...variations];
        const newObj = {
          variationName,
          variationAttributes: inputChips,
        };
        thePreVariations.push(newObj);
        setVariations([...thePreVariations]);
        setOpenVariationModal(false);
      } else {
        console.log("Id ", variationId);
        console.log("Variations with id ", variations);
        const thePreVariations = [...variations];
        const newObj = {
          variationName,
          variationAttributes: inputChips,
        };
        thePreVariations.splice(variationId, 1, newObj);
        console.log("Pre variations ", thePreVariations);
        setVariations([...thePreVariations]);
        setOpenVariationModal(false);
      }
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
            setVariationName(e);
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
