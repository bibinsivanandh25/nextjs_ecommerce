import { forwardRef, useState, useImperativeHandle, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import InputBox from "components/atoms/InputBoxComponent";
import ScratchCardComponent from "components/forms/supplier/marketingtools/createluckydraw/createScratchCard/ScratchCard";
import { getCategorys } from "services/supplier/marketingtools/luckydraw/scratchcard";
import { useSelector } from "react-redux";

const ScratchCardForm = forwardRef((_props, ref) => {
  useImperativeHandle(ref, () => {
    return {
      handleSendFormData: () => {
        return ["scratchcard"];
      },
    };
  });
  const [mobile, setMobile] = useState("");
  const { storeCode, storeName } = useSelector((state) => state.user);

  return (
    <Box
      className=" p-2 px-4 d-flex  mx-3 mt-3 border rounded bg-red"
      style={{ width: "350px" }}
    >
      <Box className="">
        <Typography className="h-5 mb-2 color-white">
          Store Name: {storeName}
        </Typography>
        <Typography className="h-5 mb-2 color-white">
          Store Code: {storeCode}
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
ScratchCardForm.displayName = "ScratchCardForm";
export default ScratchCardForm;
