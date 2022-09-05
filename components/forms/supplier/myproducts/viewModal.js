import { useEffect, useState } from "react";
import { Modal, Box } from "@mui/material";
import ProductDetails from "pages/customer/productdetails";

const ViewModal = ({ details = {}, modalClose = () => {} }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (Object.keys(details).length) setShow(true);
  }, [details]);
  console.log(details);
  return (
    // <ModalComponent
    //   open={show}
    //   modalClose={() => {
    //     setShow(false);
    //   }}
    //   showFooter={false}
    //   showHeader={false}
    //   minHeightClassName="p-0"
    // >
    // </ModalComponent>
    <Modal
      open={show}
      onClose={() => {
        modalClose();
        setShow(false);
      }}
      className="d-flex justify-content-center flex-column"
    >
      <Box className="bg-white p-2 m-3 rounded">
        <div className="border border-2 h-90vh mxh-90vh overflow-y-scroll hide-scrollbar rounded">
          <ProductDetails productId={details.productVariationId} />
        </div>
      </Box>
    </Modal>
  );
};

export default ViewModal;
