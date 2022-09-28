import InputBox from "@/atoms/InputBoxComponent";
import ModalComponent from "@/atoms/ModalComponent";
import { Box } from "@mui/material";
import { useState } from "react";
import validateMessage from "constants/validateMessages";
import { saveAdminTags } from "services/admin/tags";
import toastify from "services/utils/toastUtils";

const CreateTags = ({
  modalOpen,
  setModalOpen = () => {},
  getAllTags = () => {},
  tagName = "",
  setTageName = () => {},
  setpageNumber = () => {},
  user = {},
}) => {
  const [error, setError] = useState("");

  const handleSaveClick = async () => {
    let flag = true;
    if (tagName.length === 0) {
      flag = false;
      setError(validateMessage.field_required);
    } else if (tagName.length > 250) {
      flag = false;
      setError("Max 250 alpha numeric characters can be entered");
    }
    if (flag) {
      const payload = {
        tagName,
        createdBy: user.userId,
        createdByType: "ADMIN",
      };
      const { data, err } = await saveAdminTags(payload);
      if (data.data) {
        toastify(data.message, "success");
        getAllTags(0);
        setpageNumber(0);
        setModalOpen(false);
        setError("");
        setTageName("");
      }
      if (err) {
        toastify(err.response.data.message, "error");
      }
    }
  };
  const handleCloseClick = () => {
    setModalOpen(false);
    setError("");
    setTageName("");
  };
  return (
    <ModalComponent
      open={modalOpen}
      onCloseIconClick={() => {
        handleCloseClick();
      }}
      footerClassName="justify-content-end"
      saveBtnText="Submit"
      ClearBtnText="Cancel"
      ModalTitle="Create Tag"
      onSaveBtnClick={() => {
        handleSaveClick();
      }}
      onClearBtnClick={() => {
        handleCloseClick();
      }}
      titleClassName="fw-bold color-orange "
    >
      <Box className="p-3">
        <InputBox
          value={tagName}
          variant="standard"
          size="small"
          label="Tag Name"
          onInputChange={(e) => {
            setTageName(e.target.value);
          }}
          error={error !== ""}
          helperText={error}
        />
      </Box>
    </ModalComponent>
  );
};

export default CreateTags;
