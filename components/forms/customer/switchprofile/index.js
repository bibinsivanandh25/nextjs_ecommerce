import React from "react";
import { Box, Typography } from "@mui/material";
import ModalComponent from "@/atoms/ModalComponent";

const SwitchProfile = ({
  showSwitchProfile = false,
  setShowSwitchProfile = () => {},
}) => {
  return (
    <ModalComponent
      showHeader={false}
      showFooter={false}
      open={showSwitchProfile}
      modalClose={() => {
        setShowSwitchProfile(false);
      }}
    >
      <Box className="pt-3 pb-3">khjbsdc sdcjkdshc dsjkhcb dsckjdsc</Box>
    </ModalComponent>
  );
};

export default SwitchProfile;
