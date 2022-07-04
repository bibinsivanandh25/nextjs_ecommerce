import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomIcon from "services/iconUtils";
import Image from "next/image";
import ModalComponent from "@/atoms/ModalComponent";

const ReturnOrderModel = ({ allFree }) => {
  const [freeReturn, setFreeReturn] = useState(false);

  const theArray = [
    { isFree: true },
    { isFree: false, returnPrice: 123 },
    { isFree: false, returnPrice: 300 },
    { isFree: true },
  ];

  useEffect(() => {
    setFreeReturn(allFree);
  }, [allFree]);

  const returnProducts = () => {
    return (
      <Box
        overflow="scroll"
        className="overflow-auto mxh-200 hide-scrollbar mt-3"
      >
        {theArray.map((val) => {
          return (
            <Box className="mt-3 d-flex justify-content-between">
              <Box>
                <Typography className="fs-14">
                  <span className="fw-bold">Estimated Pickup date:</span> 24 -
                  Nov - 2021, 9am - 6pm
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
                            Paid Rs {val.returnPrice} now.
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
                  src="https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/ecommerceBanner.jpg"
                  height="100"
                  width="150"
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
        open
        showClearBtn={false}
        showSaveBtn={false}
        showFooter
        ModalTitle=""
      >
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
                <span className="fw-bold"> 123456789 </span>
              </Typography>
              <Typography className="ms-5 mt-2 fs-14">
                Payment method :
                <span className="fw-bold"> Internet banking </span>
              </Typography>
            </Box>
          )}
        </Box>
        <Typography className="fs-14 mt-3">
          Conformation mail will be sent to your mail ID :
          <span className="fw-bold">karthik@gmail.com</span>
        </Typography>
        <Typography className="fs-14 mt-3">
          <span className="fw-bold">Pickup address:</span>Karthikeyan, 32/3,
          Mahalakshmi Nagar, T.Kottampatti, Pollachi, Tamilnadu, 642002
        </Typography>
        <Box className="mt-3 d-flex">
          <Typography className="fs-14">
            <span className="fw-bold">Latitude:</span> 15.033544
          </Typography>
          <Typography className="fs-14 ms-4">
            <span className="fw-bold">Longitude:</span> 75.480423
          </Typography>
        </Box>
        {returnProducts()}
        <Box className="d-flex border-top w-100 mt-2 justify-content-around">
          <Typography className="fs-14 mt-3 color-blue cursor-pointer">
            Review or edit your recent Orders
          </Typography>
          <Typography className="fs-14 mt-3 text-decoration-underline color-orange cursor-pointer">
            Continue Shopping {">>"}
          </Typography>
        </Box>
      </ModalComponent>
    </Box>
  );
};

export default ReturnOrderModel;
