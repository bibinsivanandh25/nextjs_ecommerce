import { Grid, Tooltip, Typography } from "@mui/material";
import ImageCard from "components/atoms/ImageCard";
import ModalComponent from "components/atoms/ModalComponent";
import { assetsJson } from "public/assets";

const ReplyModal = ({
  showReplyModal = false,
  setShowReplyModal = () => {},
}) => {
  return (
    <ModalComponent
      open={showReplyModal}
      ModalWidth={700}
      ModalTitle={
        <Tooltip
          title="  Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
        consectetur, adipisci velit..."
          placement="top"
        >
          <div className="text-truncate w-50">
            Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
            consectetur, adipisci velit...
          </div>
        </Tooltip>
      }
      footerClassName="justify-content-start  flex-row-reverse"
      ClearBtnText="Cancel"
      saveBtnClassName="mx-2"
      saveBtnText="Reply"
      onCloseIconClick={() => setShowReplyModal(false)}
    >
      <div className="p-3 my-4">
        <textarea
          placeholder="Reply here"
          className="rounded-3 p-2 h-5"
          rows={4}
          style={{
            resize: "none",
            width: "100%",
            outline: "none",
          }}
        ></textarea>
      </div>
    </ModalComponent>
  );
};
export default ReplyModal;
