import ModalComponent from "@/atoms/ModalComponent";
import { Box, Grid, Typography } from "@mui/material";
import React from "react";

const AddressModal = ({
  setShowAddressModal = () => {},
  showAddressModal,
  addressData = [],
}) => {
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
      ModalWidth={addressData.length > 1 ? 1000 : 500}
    >
      <Box className=" mxh-500 overflow-y-scroll hide-scrollbar mb-2">
        <Typography className="color-orange">Address</Typography>
        <Grid container spacing={2}>
          {addressData?.map((item) => {
            return (
              <Grid item sm={addressData.length > 1 ? 4 : 12}>
                <Box
                  sx={{
                    py: 1.5,
                    px: 3,
                    border: "1px solid #707070",
                  }}
                  className="bg-white rounded h-100 "
                >
                  <Typography className="color-orange h-5">
                    {item.name}
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
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </ModalComponent>
  );
};

export default AddressModal;
