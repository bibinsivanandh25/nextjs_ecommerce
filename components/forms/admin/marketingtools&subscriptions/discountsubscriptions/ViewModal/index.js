import ModalComponent from "@/atoms/ModalComponent";
import { Box } from "@mui/material";
import React from "react";

const DiscountSubscriptions = () => {
  return (
    <Box>
      <ModalComponent
        // open={openAddDaysCounterModal}
        ModalTitle="Reseller ID: #132564987"
        titleClassName="fw-bold fs-14 color-orange"
        showFooter={false}
        ModalWidth={650}
        onCloseIconClick={() => {
          //   handleCloseIconClick();
        }}
      ></ModalComponent>
    </Box>
  );
};

export default DiscountSubscriptions;
