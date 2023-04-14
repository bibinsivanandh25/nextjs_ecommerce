import ModalComponent from "@/atoms/ModalComponent";
import ProductDetails from "pages/customer/productdetails";

const AdminProductView = ({ openModal, setOpenModal }) => {
  return (
    <ModalComponent
      open={openModal}
      onCloseIconClick={() => {
        setOpenModal(false);
      }}
      showFooter={false}
      ModalWidth="90%"
      minHeightClassName="mxh-90vh p-2"
      showPositionedClose
      showCloseIcon={false}
      ModalTitle=""
      headerBorder=""
    >
      <ProductDetails isSideBarOpen showActions={false} />
    </ModalComponent>
  );
};

export default AdminProductView;
