import ModalComponent from "@/atoms/ModalComponent";
import { Box, Typography } from "@mui/material";
import React from "react";

const PolicyModal = ({
  showPolicyModal,
  setShowPolicyModal = () => {},
  policyData = [],
}) => {
  console.log(policyData[0], "policyData");
  return (
    <ModalComponent
      open={showPolicyModal}
      onCloseIconClick={() => setShowPolicyModal(false)}
      showPositionedClose
      headerClassName=""
      ModalTitle=""
      showCloseIcon={false}
      headerBorder=""
      showFooter={false}
    >
      <Box className=" mxh-500 overflow-y-scroll hide-scrollbar">
        <Typography className="color-orange">Product policy</Typography>
      </Box>
    </ModalComponent>
  );
};

export default PolicyModal;
