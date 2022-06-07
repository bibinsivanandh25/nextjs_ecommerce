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
    <Box
      className=" p-2 px-4 d-flex  mx-3 mt-3 border rounded bg-red"
      style={{ width: "350px" }}
    >
      <Box className="">
        <Typography className="h-5 mb-2 color-white">
          Store Name: abc
        </Typography>
        <Typography className="h-5 mb-2 color-white">
          Store Code: #123
        </Typography>
        <InputBox
          label=""
          placeholder="Enter mobile number"
          value={mobile}
          onInputChange={(e) => {
            setMobile(e.target.value);
          }}
          textInputProps={{
            style: { padding: 5, color: "#fffff" },
          }}
          fullWidth={false}
          className="w-90p mb-3"
        />

        <ScratchCardComponent>
          <div
            style={{ height: "240px", width: "300px" }}
            className=" shadow-lg bg-white d-flex justify-content-center align-items-center"
          >
            <h3>code: #12345</h3>
          </div>
        </ScratchCardComponent>
        <Typography className="h-6 mt-2 color-white">
          Last date to redeem coupon 20-08-2021
        </Typography>
      </Box>
    </Box>
  );
});

export default ScratchCardForm;
