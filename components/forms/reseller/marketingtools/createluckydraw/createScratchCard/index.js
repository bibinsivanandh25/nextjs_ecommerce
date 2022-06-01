import {
  forwardRef,
  useRef,
  useState,
  Paper,
  useImperativeHandle,
} from "react";
import { Box, Typography } from "@mui/material";
import ButtonComponent from "components/atoms/ButtonComponent";
import InputBox from "components/atoms/InputBoxComponent";
import { assetsJson } from "public/assets";
import ScratchCardComponent from "components/forms/reseller/marketingtools/createluckydraw/createScratchCard/ScratchCard";

const ScratchCardForm = forwardRef(({}, ref) => {
  useImperativeHandle(ref, () => {
    return {
      handleSendFormData: () => {
        return ["scratchcard"];
      },
    };
  });

  return (
    // <Box className="w-100 d-flex  mx-3 mt-3">
    //   <Box className="">
    //     <Typography className="h-5 mb-2">Store Name: abc</Typography>
    //     <Typography className="h-5 mb-2">Store Code: #123</Typography>
    //     <Box className="d-flex  align-items-center mb-2">
    //       <Box className="me-2">
    //         <InputBox
    //           label=""
    //           placeholder="Enter mobile number"
    //           value={""}
    //           onInputChange={(e) => {}}
    //           textInputProps={{
    //             style: { padding: 5 },
    //           }}
    //         />
    //       </Box>
    //       <ButtonComponent
    //         label="Click to Spin"
    //         onBtnClick={() => {}}
    //         variant="outlined"
    //         size="medium"
    //         muiProps=" fs-12"
    //       />
    //     </Box>
    //   </Box>
    // </Box>
    <Box elevation={4} className="" sx={{ zIndex: 1000 }}>
      <ScratchCardComponent>hajksbdjkn</ScratchCardComponent>
    </Box>
  );
});

export default ScratchCardForm;
