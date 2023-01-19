import { Box, Divider, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Image from "next/image";
import ModalComponent from "@/atoms/ModalComponent";

const OrderSuccessModal = ({
  showModal = false,
  setShowModal = () => {},
  address = {},
  products = [],
}) => {
  return (
    <ModalComponent
      ModalTitle=""
      open={showModal}
      ModalWidth={700}
      showFooter={false}
      onCloseIconClick={() => {
        setShowModal(false);
      }}
    >
      <Box className="d-flex align-items-center my-2">
        <CheckCircleIcon color="success" />
        <Typography className="fw-bold text-success h-5 mx-2">
          Order Placed Successfully
        </Typography>
      </Box>
      <Typography className="h-5">
        confirmation mail will be sent to your email ID :{" "}
        <span className="fw-bold">Karthik@gmail.com</span>
      </Typography>
      <Typography className="h-5 my-2">
        <span className="fw-bold">Shipping to {address.name} , </span>
        {address.address}
      </Typography>
      <Typography className="h-5">
        <span className="fw-bold">Latitude : </span>
        {address.latitude}
        <span className="mx-2 fw-bold">Langitude :</span> {address.langitude}
      </Typography>
      <Divider variant="middle" />
      <Box className="overflow-y-scroll hide-scrollbar mxh-300 mt-2">
        {products.map((item) => (
          <>
            <Box className="d-flex justify-content-between  p-2">
              <Box>
                <p className="text-success h-5">Wednesday, 24 Nov</p>
                <p className="h-5">Estimated Delivery</p>
              </Box>
              <Box>
                <Image src={item.image} height={100} width={125} />
              </Box>
            </Box>
            <Divider />
          </>
        ))}
      </Box>
      <Box className="d-flex justify-content-around my-3 h-5">
        <p className="text-primary cursor-pointer">
          Review or edit your recent Orders
        </p>
        <p className="theme_color cursor-pointer">Continue Shopping &gt;&gt;</p>
      </Box>
    </ModalComponent>
  );
};
export default OrderSuccessModal;
