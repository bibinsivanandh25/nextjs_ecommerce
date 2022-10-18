import InputBox from "@/atoms/InputBoxComponent";
import ModalComponent from "@/atoms/ModalComponent";
import validateMessage from "constants/validateMessages";
import React, { useState } from "react";

let errObj = {
  configurationName: "",
  configurationLabel: "",
};

const ViewModal = ({ openViewModal, setOpenViewModal }) => {
  const [configurationName, setConfigurationName] = useState("");
  const [configurationLabel, setConfigurationLabel] = useState("");
  const [err, setErr] = useState({
    configurationName: "",
    configurationLabel: "",
  });

  const handleCloseIconClick = () => {
    errObj = {
      configurationName: "",
      configurationLabel: "",
    };
    setConfigurationName("");
    setConfigurationLabel("");
    setErr(errObj);
    setOpenViewModal(false);
  };

  const handleError = () => {
    let anError = false;
    errObj = {
      configurationName: "",
      configurationLabel: "",
    };
    if (configurationName === "") {
      errObj.configurationName = validateMessage.field_required;
      anError = true;
    }
    if (configurationLabel === "") {
      errObj.configurationLabel = validateMessage.field_required;
      anError = true;
    }
    setErr(errObj);
    return anError;
  };

  const handleSubmit = () => {
    const anError = handleError();
    if (!anError) {
      console.log("Successful");
    }
  };

  return (
    <>
      <ModalComponent
        open={openViewModal}
        ModalTitle="Edit Product"
        titleClassName="fw-bold fs-14 color-orange"
        footerClassName="d-flex justify-content-start flex-row-reverse border-top mt-3"
        ClearBtnText="Cancel"
        saveBtnText="Submit"
        saveBtnClassName="ms-1"
        // ModalWidth={650}
        // minHeightClassName="mnh-70vh mxh-70vh overflow-auto"
        onCloseIconClick={() => {
          handleCloseIconClick();
        }}
        onSaveBtnClick={() => {
          handleSubmit();
        }}
        onClearBtnClick={() => {
          handleCloseIconClick();
        }}
      >
        <InputBox
          inputlabelshrink
          label="Configuration Name"
          className="mt-4"
          value={configurationName}
          onInputChange={(e) => {
            setConfigurationName(e.target.value);
          }}
          error={err.configurationName}
          helperText={err.configurationName}
        />
        <InputBox
          inputlabelshrink
          label="Configuration Label"
          className="mt-4"
          value={configurationLabel}
          onInputChange={(e) => {
            setConfigurationLabel(e.target.value);
          }}
          error={err.configurationLabel}
          helperText={err.configurationLabel}
        />
      </ModalComponent>{" "}
    </>
  );
};

export default ViewModal;
