import ModalComponent from "@/atoms/ModalComponent";

const filterModal = ({
  showModal = false,
  setShowModal = () => {},
  products = [],
  categories = [],
  subCategories = [],
  Brands = [],
}) => {
  return (
    <ModalComponent
      ModalTitle="filter"
      open={showModal}
      onCloseIconClick={() => {
        setShowModal(false);
      }}
      saveBtnText="Apply"
      ClearBtnText="Clear"
    ></ModalComponent>
  );
};
export default filterModal;
