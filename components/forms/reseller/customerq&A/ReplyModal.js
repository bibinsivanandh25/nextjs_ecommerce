import { Typography } from "@mui/material";
import ModalComponent from "components/atoms/ModalComponent";
import validateMessage from "constants/validateMessages";
import { useState } from "react";
import { answerTheQuestions } from "services/supplier/customerq&a";
import toastify from "services/utils/toastUtils";

let errObj = {
  reply: false,
};

const ReplyModal = ({
  showReplyModal = false,
  setShowReplyModal = () => {},
  dataForSendingReply,
  getUnansweredQuestions,
  reply = "",
  setReply = () => {},
  tabType = false,
}) => {
  const [error, setError] = useState(errObj);

  const handleError = () => {
    errObj = {
      reply: false,
    };
    if (reply === "") {
      errObj.reply = true;
    }
    return errObj;
  };

  const handleSubmit = async () => {
    const theError = handleError();
    if (!theError.reply) {
      const payload = {
        userAnswer: reply,
        answerFromType: "SUPPLIER",
        answerFromTypeId: "SP0822000040",
        ...dataForSendingReply,
      };
      const { someError } = await answerTheQuestions(payload);
      if (!someError) {
        if (tabType === "tab1") {
          await getUnansweredQuestions(false);
          toastify("Your answer has been recorded", "success");
        } else {
          await getUnansweredQuestions(true);
          toastify("Your answer has been updated", "success");
        }

        setShowReplyModal(false);
      }
    }
    setError(theError);
  };

  const handleClearBtnClick = () => {
    setShowReplyModal(false);
  };

  return (
    <ModalComponent
      open={showReplyModal}
      ModalWidth={700}
      ModalTitle="Reply Here"
      footerClassName="justify-content-start flex-row-reverse"
      ClearBtnText="Cancel"
      saveBtnClassName="mx-2"
      saveBtnText="Reply"
      onCloseIconClick={() => setShowReplyModal(false)}
      onSaveBtnClick={handleSubmit}
      onClearBtnClick={handleClearBtnClick}
    >
      <div className="pt-4 pb-1">
        <textarea
          placeholder="Reply here"
          className="rounded-3 p-2 h-5"
          rows={4}
          style={{
            resize: "none",
            width: "100%",
            outline: "none",
          }}
          value={reply}
          onChange={(e) => {
            setReply(e.target.value);
          }}
        />
        {error.reply && (
          <Typography className="text-danger h-5">
            {validateMessage.field_required}
          </Typography>
        )}
      </div>
    </ModalComponent>
  );
};
export default ReplyModal;
