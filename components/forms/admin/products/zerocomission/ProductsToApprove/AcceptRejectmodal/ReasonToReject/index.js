import InputBox from "@/atoms/InputBoxComponent";
import ModalComponent from "@/atoms/ModalComponent";
import validateMessage from "constants/validateMessages";
import { useState } from "react";

const ReasonToReject = ({
  rejectReason = "",
  setRejectReason = () => {},
  showModal = false,
  setShowModal = () => {},
  onSaveClick = () => {},
}) => {
  const [error, setError] = useState(false);

  return (
    <ModalComponent
      ModalTitle="Reason"
      titleClassName="color-orange"
      ModalWidth="40%"
      open={showModal}
      saveBtnText="Submit"
      onSaveBtnClick={() => {
        if (rejectReason.length) {
          onSaveClick("REJECTED");
          setShowModal(false);
        } else {
          setError(true);
        }
      }}
      ClearBtnText="Clear"
      onClearBtnClick={() => {
        setRejectReason("");
      }}
      onCloseIconClick={() => {
        setShowModal(false);
      }}
      clearBtnClassName="mx-2"
      footerClassName="justify-content-stand flex-row-reverse"
    >
      <div className="my-5 px-2">
        <InputBox
          variant="standard"
          value={rejectReason}
          onInputChange={(e) => setRejectReason(e.target.value)}
          placeholder="Reason for Rejecting"
          error={error}
          helperText={error ? validateMessage.field_required : ""}
        />
      </div>
    </ModalComponent>
  );
};
export default ReasonToReject;
