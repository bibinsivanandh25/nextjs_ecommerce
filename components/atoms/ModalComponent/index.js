import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import ButtonComponent from "../ButtonComponent";

const ModalComponent = ({
  children,
  titleClassName = "fs-12",
  ModalTitle = "Modal Title",
  ModalWidth = 500,
  showFooter = true,
  showHeader = true,
  minHeightClassName = "",
  minWidth = 300,
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
  footerPadding = "px-4 py-2",
  headerClassName = "",
  clearBtnClassName = "",
  saveBtnClassName = "",
  clearBtnVariant = "outlined",
  saveBtnVariant = "contained",
  showPositionedClose = false,
  iconStyle = {},
  closeIconClasName = "cursor-pointer text-black",
  headerBorder = "1px solid #e6e6e6",
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
    outline: "none",
    minWidth,
  };

  return (
    <div>
      <Modal open={open}>
        <Box sx={style}>
          {showHeader ? (
            <div
              className={`d-flex justify-content-between align-items-center px-4 py-2 position-relative ${headerClassName}`}
              style={{
                borderBottom: headerBorder,
              }}
            >
              <CloseIcon
                className={`${
                  showPositionedClose
                    ? "position-absolute rounded-circle bg-orange border text-white p-1 fs-3 ms-3 border-white cursor-pointer "
                    : "d-none"
                }`}
                style={{ top: "-10px", right: "-10px" }}
                onClick={onCloseIconClick}
              />
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label className={` fw-600 ${titleClassName}`}>
                {ModalTitle}
              </label>
              <div
                className={showCloseIcon ? "" : "d-none"}
                style={{ ...iconStyle }}
              >
                <CloseIcon
                  onClick={onCloseIconClick}
                  className={closeIconClasName}
                />
              </div>
            </div>
          ) : null}
          <div className={`px-4 ${minHeightClassName} overflow-y-scroll`}>
            {children}
          </div>
          {showFooter ? (
            <div className={`${footerPadding} d-flex  ${footerClassName}`}>
              {showSaveBtn ? (
                <ButtonComponent
                  onBtnClick={onSaveBtnClick}
                  label={saveBtnText}
                  muiProps={`me-2 ${saveBtnClassName}`}
                  variant={saveBtnVariant}
                />
              ) : null}
              {showClearBtn ? (
                <ButtonComponent
                  onBtnClick={onClearBtnClick}
                  label={ClearBtnText}
                  variant={clearBtnVariant}
                  muiProps={clearBtnClassName}
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
