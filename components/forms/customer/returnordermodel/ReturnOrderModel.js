import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomIcon from "services/iconUtils";
import Image from "next/image";
import ModalComponent from "@/atoms/ModalComponent";
import { useRouter } from "next/router";

const ReturnOrderModel = ({
  // showReturnOrder,
  setgetOrderApiCall = () => {},
  getOrderApiCall,
  setShowReturnOrder = () => {},
  returnSuccessData,
  setreturnSuccessData,
  allFree,
  showModal = false,
  setShowModal = () => {},
  setSelectedProduct = () => {},
  // selectedProduct,
}) => {
  const [freeReturn, setFreeReturn] = useState(false);

  // const theArray = [
  //   { id: 1, isFree: true },
  //   { id: 2, isFree: false, returnPrice: 123 },
  //   { id: 3, isFree: false, returnPrice: 300 },
  //   { id: 4, isFree: true },
  // ];

  useEffect(() => {
    setFreeReturn(allFree);
  }, [allFree]);
  const route = useRouter();
  const goTOHome = () => {
    setreturnSuccessData([]);
    route.push("/customer/home");
  };
  const goToOrder = () => {
    setreturnSuccessData([]);
    setShowModal(false);
    setShowReturnOrder(false);
    setgetOrderApiCall(!getOrderApiCall);
    setSelectedProduct([]);
    route.push("/customer/orders");
  };
  const closeFunction = () => {
    setShowModal(false);
    setShowReturnOrder(false);
    setgetOrderApiCall(!getOrderApiCall);
    setSelectedProduct([]);
  };
  const returnProducts = () => {
    return (
      <Box
        overflow="scroll"
        className="overflow-auto mxh-200 hide-scrollbar mt-3"
      >
        {returnSuccessData.map((val, inx) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <Box key={inx} className="mt-3 d-flex justify-content-between">
              <Box>
                <Typography className="fs-14">
                  <span className="fw-bold">Estimated Pickup date:</span>
                  {returnSuccessData?.estimatedPickUpDate}
                </Typography>
                <Typography className="fs-14 mt-2">
                  <CustomIcon
                    type="viewInArIcon"
                    className="color-black"
                    showColorOnHover={false}
                  />
                  <span className="ps-2">
                    Keep the package ready for pickup
                    {freeReturn ? null : (
                      <Typography className="fs-14">
                        Return shipment charges:{" "}
                        {val.isFree ? (
                          <span className="color-dark-green">Free</span>
                        ) : (
                          <span className="color-error">
                            Paid Rs {val?.returnPrice} now.
                          </span>
                        )}
                      </Typography>
                    )}
                  </span>
                </Typography>
              </Box>
              <Box>
                <Image
                  className="rounded"
                  src={val?.productImage}
                  height={100}
                  width={100}
                  alt="Image"
                />
              </Box>
            </Box>
          );
        })}
      </Box>
    );
  };

  return (
    <Box>
      <ModalComponent
        ModalWidth={700}
        open={showModal}
        showClearBtn={false}
        showSaveBtn={false}
        showFooter
        ModalTitle=""
        onCloseIconClick={closeFunction}
      >
        <>
          <Box>
            <Box className="d-flex align-items-center mt-3">
              <CustomIcon
                type="doneIcon"
                className="bg-success color-white h-2 rounded-circle"
                showColorOnHover={false}
              />

              <Typography className="fs-14 fw-bold text-success ps-2">
                {freeReturn
                  ? "Return order placed sucessfully"
                  : "Payment is Successful & Return order is placed"}
              </Typography>
            </Box>
            {freeReturn ? null : (
              <Box className="border-bottom pb-2">
                <Typography className="ms-5 fs-14">
                  Your Transaction ID :
                  <span className="fw-bold">
                    {returnSuccessData[0]?.trasanctionId}
                  </span>
                </Typography>
                <Typography className="ms-5 mt-2 fs-14">
                  Payment method :
                  <span className="fw-bold">
                    {" "}
                    {returnSuccessData[0]?.paymentMethod}{" "}
                  </span>
                </Typography>
              </Box>
            )}
          </Box>
          <Typography className="fs-14 mt-3">
            Conformation mail will be sent to your mail ID :
            <span className="fw-bold">{returnSuccessData[0]?.email}</span>
          </Typography>
          <Typography className="fs-14 mt-3">
            <span className="fw-bold">Pickup address: </span>
            <Typography className="h-5">
              {returnSuccessData[0]?.customerAddressResponse?.address}
            </Typography>
            <Typography className="h-5">
              {returnSuccessData[0]?.customerAddressResponse?.cityDistrictTown}
            </Typography>
            <Typography className="h-5">
              {returnSuccessData[0]?.customerAddressResponse?.location}-
              {returnSuccessData[0]?.customerAddressResponse?.pinCode}
            </Typography>
          </Typography>
          <Box className="mt-3 d-flex">
            {returnSuccessData[0]?.customerAddressResponse?.latitudeValue ? (
              <Typography className="fs-14">
                <span className="fw-bold">Latitude:</span>
                {returnSuccessData[0]?.customerAddressResponse?.latitudeValue}
              </Typography>
            ) : (
              <></>
            )}
            {returnSuccessData[0]?.customerAddressResponse?.longitudeValue ? (
              <Typography className="fs-14">
                <span className="fw-bold">Latitude:</span>{" "}
                {returnSuccessData[0]?.customerAddressResponse?.longitudeValue}
              </Typography>
            ) : (
              <></>
            )}
          </Box>
          {returnProducts()}
          <Box className="d-flex border-top w-100 mt-2 justify-content-around">
            <Typography
              className="fs-14 mt-3 color-blue cursor-pointer"
              onClick={goToOrder}
            >
              Review or edit your recent Orders
            </Typography>
            <Typography
              className="fs-14 mt-3 text-decoration-underline theme_color cursor-pointer"
              onClick={goTOHome}
            >
              Continue Shopping {">>"}
            </Typography>
          </Box>
        </>
      </ModalComponent>
    </Box>
  );
};

export default ReturnOrderModel;
