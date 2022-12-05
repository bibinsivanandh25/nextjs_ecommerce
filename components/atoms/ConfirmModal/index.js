import ModalComponent from "../ModalComponent";

const ConfirmModal = ({ showModal = false, setShowModal = () => {} }) => {
  return (
    <ModalComponent
      open={showModal}
      onCloseIconClick={() => setShowModal(false)}
    >
      confirm Modal
    </ModalComponent>
  );
};
export default ConfirmModal;
