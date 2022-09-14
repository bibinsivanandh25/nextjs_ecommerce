/* eslint-disable no-shadow */
import React, { useState } from "react";
import { Box } from "@mui/material";
import validateMessage from "constants/validateMessages";
import InputBox from "@/atoms/InputBoxComponent";
import ModalComponent from "@/atoms/ModalComponent";
import SimpleDropdownComponent from "@/atoms/SimpleDropdownComponent";

const errObj = {
  category: false,
  set: false,
};

const CreateSetModal = ({
  openCreateSetModal,
  setOpenCreateSetModal,
  //   rowId,
  //   rowsDataObjectsForSets,
  setDetails,
  setSetDetails,
}) => {
  const [error, setError] = useState(errObj);

  const handleCloseIconClick = () => {
    setSetDetails({
      category: {},
      set: "",
    });
    setError({
      category: false,
      set: false,
    });
    setOpenCreateSetModal(false);
  };

  const handleError = () => {
    let returnError = false;
    const errObj = {
      category: false,
      set: false,
    };
    const { category, set } = setDetails;
    const theCategoryKeys = Object.keys(category);
    if (theCategoryKeys.length === 0) {
      errObj.category = true;
      returnError = true;
    }
    if (set === "") {
      // console.log("Hey");
      errObj.set = true;
      returnError = true;
    }

    return [returnError, errObj];
  };

  const handleSaveBtnClick = () => {
    const [errObj] = handleError();
    setError(errObj);
    // console.log(returnError);
  };

  const handleClearAll = () => {
    setSetDetails({
      category: {},
      set: "",
    });
    setError({
      category: false,
      set: false,
    });
  };

  return (
    <Box>
      <ModalComponent
        open={openCreateSetModal}
        ModalTitle="Create Set"
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
        <SimpleDropdownComponent
          list={[{ label: "Category One" }, { label: "Category Two" }]}
          label="Category"
          inputlabelshrink
          size="small"
          onDropdownSelect={(value) => {
            // console.log(setDetails);
            setSetDetails({ ...setDetails, category: { label: value?.label } });
          }}
          value={setDetails?.category}
          className="mt-3"
          helperText={error.category ? validateMessage.field_required : ""}
        />
        <InputBox
          label="Set"
          className="mt-3"
          value={setDetails.set}
          inputlabelshrink
          onInputChange={(e) => {
            setSetDetails({ ...setDetails, set: e.target.value });
          }}
          error={error.set}
          helperText={error.set ? validateMessage.field_required : ""}
        />
      </ModalComponent>
    </Box>
  );
};

export default CreateSetModal;
