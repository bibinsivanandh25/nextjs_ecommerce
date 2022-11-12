import ModalComponent from "@/atoms/ModalComponent";
import { Box, Typography } from "@mui/material";
import React from "react";

const AddressModal = ({
  setShowAddressModal = () => {},
  showAddressModal,
  addressData = [],
}) => {
  console.log(addressData);
  return (
    <ModalComponent
      open={showAddressModal}
      onCloseIconClick={() => setShowAddressModal(false)}
      showPositionedClose
      headerClassName=""
      ModalTitle=""
      showCloseIcon={false}
      headerBorder=""
      showFooter={false}
    >
      <Box className=" mxh-500 overflow-y-scroll hide-scrollbar">
        <Typography className="color-orange">Address</Typography>
        {addressData?.map((item, index) => {
          return (
            <Box
              sx={{
                py: 1.5,
                px: 3,
                border: "1px solid lightgray",
              }}
              marginY={2}
              className="fs-16 bg-white rounded h-100 "
            >
              <Typography className="color-orange h-4">
                Address {index + 1}
              </Typography>
              <Box className="ms-2">
                <Typography className="text-break h-5">
                  {`${item?.address}, ${item?.location}, ${
                    item?.landmark ? `${item?.landmark},` : ""
                  }  ${item?.cityDistrictTown}, ${item?.state}, ${
                    item?.pinCode
                  }`}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
    </ModalComponent>
  );
};

export default AddressModal;
