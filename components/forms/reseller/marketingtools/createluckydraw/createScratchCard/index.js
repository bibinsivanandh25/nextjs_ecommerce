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
  const [mobile, setMobile] = useState("");

  return (
    <Box className="w-100 d-flex  mx-3 mt-3">
      <Box className="">
        <Typography className="h-5 mb-2">Store Name: abc</Typography>
        <Typography className="h-5 mb-2">Store Code: #123</Typography>
        <InputBox
          label=""
          placeholder="Enter mobile number"
          value={mobile}
          onInputChange={(e) => {
            setMobile(e.target.value);
          }}
          textInputProps={{
            style: { padding: 5 },
          }}
        />
      </Box>
      <Box className="ms-3">
        <ScratchCardComponent>scratch card</ScratchCardComponent>
        <Typography className="h-6 mt-2">
          Last date to redeem coupon 20-08-2021
        </Typography>
      </Box>
    </Box>
  );
});

export default ScratchCardForm;
