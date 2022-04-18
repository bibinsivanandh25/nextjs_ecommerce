import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import ButtonComponent from "../ButtonComponent";

const ModalComponent = ({
  children,
  ModalTitle = "Modal Title",
  ModalWidth = 500,
  showFooter = true,
  showHeader = true,
  minHeightClassName = "mnh-200",
  showClearBtn = true,
  showSaveBtn = true,
  saveBtnText = "Save",
  ClearBtnText = "Clear",
  onSaveBtnClick = () => {},
  onClearBtnClick = () => {},
  showCloseIcon = true,
  onCloseIconClick = () => {},
  open = false,
  footerClassName = "align-center",
  headerClassName = "",
}) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: ModalWidth,
    bgcolor: "background.paper",
    border: "0px solid white",
    boxShadow: 24,
    borderRadius: "10px",
  };

  return (
    <div>
      <Modal open={open}>
        <Box sx={style}>
          {showHeader ? (
            <div
              className={`d-flex justify-content-between px-4 py-2 ${headerClassName}`}
              style={{
                borderBottom: "1px solid #707070",
              }}
            >
              <label className="  fw-600 ">{ModalTitle}</label>
              <div className={showCloseIcon ? "" : "d-none"}>
                <CloseIcon onClick={onCloseIconClick} />
              </div>
            </div>
          ) : null}
          <div className={`px-4 ${minHeightClassName} overflow-y-scroll`}>
            {children}
          </div>
          {showFooter ? (
            <div
              className={`px-4 py-2 d-flex justify-content-end ${footerClassName}`}
              style={{
                borderTop: "1px solid #707070",
              }}
            >
              {showSaveBtn ? (
                <ButtonComponent
                  onBtnClick={onSaveBtnClick}
                  label={saveBtnText}
                  muiProps="me-2"
                />
              ) : null}
              {showClearBtn ? (
                <ButtonComponent
                  onBtnClick={onClearBtnClick}
                  label={ClearBtnText}
                  variant="outlined"
                />
              ) : null}
            </div>
          ) : null}
        </Box>
      </Modal>
    </div>
  );
};
export default ModalComponent;
