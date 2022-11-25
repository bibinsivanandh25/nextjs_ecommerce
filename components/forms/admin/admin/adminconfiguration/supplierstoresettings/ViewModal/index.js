import InputBox from "@/atoms/InputBoxComponent";
import ModalComponent from "@/atoms/ModalComponent";
import validateMessage from "constants/validateMessages";
import React, { useState, useEffect } from "react";
import {
  addASetting,
  updateASetting,
} from "services/admin/admin/adminconfiguration/supplierstoresetting";
import toastify from "services/utils/toastUtils";

let errObj = {
  configurationName: "",
  configurationLabel: "",
};

const ViewModal = ({
  openViewModal = false,
  setOpenViewModal = () => {},
  getTableData = [],
  edit,
  configurationSettingObject = {
    configurationName: "",
    configurationLabel: "",
  },
  configurationId,
  closeModal = () => {},
}) => {
  const [configurationName, setConfigurationName] = useState("");
  const [configurationLabel, setConfigurationLabel] = useState("");
  const [err, setErr] = useState({
    configurationName: "",
    configurationLabel: "",
  });
  useEffect(() => {
    setConfigurationName(configurationSettingObject.configurationName);
    setConfigurationLabel(configurationSettingObject.configurationLabel);
  }, [configurationSettingObject]);

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

  const addUpdateSetting = async () => {
    if (edit === "create") {
      const payload = {
        adminConfigurationName: configurationName,
        adminConfigurationValue: configurationLabel,
      };
      const { data, error, message } = await addASetting(payload);
      if (data) {
        await getTableData(0);
        toastify(message, "success");
        closeModal();
        setOpenViewModal(false);
      } else if (error) {
        if (message) toastify(message, "error");
        else if (error?.response?.data?.message)
          toastify(error?.response?.data?.message, "error");
      }
    } else if (configurationId) {
      const payload = {
        adminConfigurationId: configurationId,
        adminConfigurationValue: configurationLabel,
      };
      const { data, error, message } = await updateASetting(payload);
      if (data) {
        await getTableData(0);
        toastify(message, "success");
        closeModal();
        setOpenViewModal(false);
      } else if (error) {
        if (message) toastify(message, "error");
        else if (error?.reponse?.data?.message)
          toastify(error?.reponse?.data?.message, "error");
      }
    }
  };

  const handleSubmit = () => {
    const anError = handleError();
    if (!anError) {
      addUpdateSetting();
    }
  };

  return (
    <>
      <ModalComponent
        open={openViewModal}
        ModalTitle={
          edit === "create" ? "Create Configuration" : "Edit Configuration"
        }
        titleClassName="fw-bold fs-14 color-orange"
        footerClassName="d-flex justify-content-start flex-row-reverse border-top mt-3"
        ClearBtnText="Cancel"
        saveBtnText="Submit"
        saveBtnClassName="ms-1"
        // ModalWidth={650}
        // minHeightClassName="mnh-70vh mxh-70vh overflow-auto"
        onCloseIconClick={() => {
          closeModal();
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
          disabled={edit !== "create"}
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
      </ModalComponent>
    </>
  );
};

export default ViewModal;
