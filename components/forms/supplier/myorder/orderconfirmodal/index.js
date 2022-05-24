import DropdownComponent from "components/atoms/DropdownComponent";
import InputBox from "components/atoms/InputBoxComponent";
import ModalComponent from "components/atoms/ModalComponent";

const OrderConfirmModal = ({ openModal = false, setOpenModal = () => {} }) => {
  return (
    <div>
      <ModalComponent
        ModalTitle="Please fill below field to proceed further"
        open={openModal}
        showClearBtn={false}
        saveBtnText="submit"
        footerClassName="justify-content-center py-3"
        onCloseIconClick={() => {
          setOpenModal(false);
        }}
      >
        <div className="m-auto mt-3 w-58p px-2">
          <DropdownComponent label="logistic partner name" size="small" />
        </div>
        <div className="d-flex justify-content-center my-3">
          <InputBox label="Logistic URL" inputlabelshrink />
        </div>
        <div className="d-flex justify-content-center">
          <InputBox label="Tracking ID" inputlabelshrink />
        </div>
      </ModalComponent>
    </div>
  );
};
export default OrderConfirmModal;
