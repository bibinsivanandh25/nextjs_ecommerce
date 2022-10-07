import { useState, useRef, useEffect } from "react";
import ButtonComponent from "@/atoms/ButtonComponent";
import CheckBoxComponent from "@/atoms/CheckboxComponent";
import ModalComponent from "@/atoms/ModalComponent";
import RadiobuttonComponent from "@/atoms/RadiobuttonComponent";
import TextEditor from "@/atoms/TextEditor";
import { Box, FormHelperText, Typography } from "@mui/material";
import validateMessage from "constants/validateMessages";

const NotifyModal = ({ open, closeModal = () => {}, selectedData = {} }) => {
  const fileRef = useRef(null);
  const [radioSelect, setRadioSelect] = useState("Only Attachments");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [error, setError] = useState({});
  useEffect(() => {
    setDescription("");
    setFiles([]);
    setError({});
  }, [radioSelect]);
  const validation = () => {
    if (radioSelect === "Text With Attachments") {
      const errorObj = {
        description: "",
        files: "",
      };
      if (description.length === 0) {
        errorObj.description = validateMessage.field_required;
      }
      if (files.length == 0) {
        errorObj.files = validateMessage.field_required;
      }
      setError(errorObj);
      const flag = Object.values(errorObj).some((item) => item !== "");
      return !flag;
    }
    if (radioSelect === "Only Text") {
      const errorObj = {
        description: "",
      };
      if (description.length === 0) {
        errorObj.description = validateMessage.field_required;
      }
      setError(errorObj);
      const flag = errorObj.description === "";
      return !flag;
    }
    if (radioSelect === "Only Attachments") {
      const errorObj = {
        files: "",
      };
      if (files.length == 0) {
        errorObj.files = validateMessage.field_required;
      }
      setError(errorObj);
      const flag = errorObj.files === "";
      return !flag;
    }
    return false;
  };
  const handleSaveClcik = () => {
    console.log(validation(), "validation()");
    // if (validation()) {
    //   closeModal(false);
    // }
  };
  return (
    <ModalComponent
      open={open}
      onCloseIconClick={() => {
        closeModal(false);
      }}
      ModalWidth="800PX"
      footerClassName="justify-content-end"
      saveBtnText="Submit"
      ClearBtnText="Close"
      onSaveBtnClick={() => {
        handleSaveClcik();
      }}
    >
      <Box>
        <Box>
          <Typography className="h-4 fw-bold border-bottom py-2 ps-1">
            Send To: {selectedData?.purchasedById}
          </Typography>
        </Box>
        <Box className="my-1 py-2 border-bottom">
          <Box className="w-100">
            <CheckBoxComponent
              className="ms-2"
              isChecked
              label="Push Notification"
              isDisabled
            />
          </Box>
        </Box>
        <Box className="d-flex justify-content-around">
          <RadiobuttonComponent
            label="Only Attachments"
            id="Only Attachments"
            onRadioChange={() => {
              setRadioSelect("Only Attachments");
            }}
            isChecked={radioSelect === "Only Attachments"}
          />
          <RadiobuttonComponent
            label="Only Text"
            id="Only Text"
            onRadioChange={() => {
              setRadioSelect("Only Text");
            }}
            isChecked={radioSelect === "Only Text"}
          />
          <RadiobuttonComponent
            label="Text With Attachments"
            id="Text With Attachments"
            onRadioChange={() => {
              setRadioSelect("Text With Attachments");
            }}
            isChecked={radioSelect === "Text With Attachments"}
          />
        </Box>
        <Box marginY={2}>
          {radioSelect === "Only Text" ||
          radioSelect === "Text With Attachments" ? (
            <TextEditor
              content={description}
              getContent={(val) => {
                setDescription(val);
              }}
            />
          ) : null}
          {error.description ? (
            <FormHelperText className="ps-3" error={error.description !== ""}>
              {error.description}
            </FormHelperText>
          ) : null}
        </Box>
        {radioSelect === "Only Attachments" ||
        radioSelect === "Text With Attachments" ? (
          <>
            <ButtonComponent
              textColor="color-orange"
              borderColor="border-orange"
              onBtnClick={() => {
                fileRef.current.click();
              }}
              variant="outlined"
              label="Attach File"
              muiProps="ms-3 "
            />

            <input
              type="file"
              ref={fileRef}
              hidden
              onChange={(e) => {
                if (e.target.files?.length) {
                  setFiles([...files, e.target.files[0]]);
                }
              }}
            />
          </>
        ) : null}
        {error.files !== "" ? (
          <FormHelperText className="ps-3" error={error.files !== ""}>
            {error.files}
          </FormHelperText>
        ) : null}
      </Box>
    </ModalComponent>
  );
};

export default NotifyModal;
