import { forwardRef, useState, useImperativeHandle, useRef } from "react";
import { Box, Typography } from "@mui/material";
// import WheelComponent from "react-wheel-of-prizes";
import InputBox from "components/atoms/InputBoxComponent";
import ButtonComponent from "components/atoms/ButtonComponent";
import WheelSpin from "./WheelSpin";

const SpinWheel = forwardRef(
  ({ formData = {}, generateInputField = () => {} }, ref) => {
    const segments = [
      "better luck next time",
      "won 70",
      "won uber pass",
      "better luck next time",
      "won a voucher",
      "won 10",
      "better luck next time",
    ];
    const [mobile, setMobile] = useState("");
    const [winSegment, setWinSegment] = useState(
      Math.round(Math.random() * segments.length)
    );
    const spinWheelRef = useRef(null);
    useImperativeHandle(ref, () => {
      return {
        handleSendFormData: () => {
          return ["spinWheel"];
        },
      };
    });

    const segColors = [
      "#EE4040",
      "#F0CF50",
      "#815CD1",
      "#3DA5E0",
      "#34A24F",
      "#F9AA1F",
      "#EC3F3F",
      "#FF9000",
      "#F0CF50",
      "#815CD1",
      "#3DA5E0",
      "#34A24F",
      "#F9AA1F",
      "#EC3F3F",
      "#FF9000",
    ];
    const onFinished = (winner) => {
      console.log(winner);
    };

    return (
      <Box className="w-100 d-flex  mx-3 mt-3">
        {(formData?.limit_per_coupon !== "" ||
          formData?.limit_per_customer !== "") && (
          <Box className="d-flex flex-column">
            <Typography className="h-4 mb-2">
              How do you want to split spin wheel amount?
            </Typography>
            {generateInputField()}
          </Box>
        )}
        <Box className="mx-auto">
          <Typography className="h-5 mb-2">Store Name: abc</Typography>
          <Typography className="h-5 mb-2">Store Code: #123</Typography>
          <Box className="d-flex  align-items-center mb-2">
            <Box className="me-2">
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
            <ButtonComponent
              label="Click to Spin"
              onBtnClick={() => {
                if (spinWheelRef.current) {
                  setWinSegment(
                    Math.floor(Math.random() * segments.length - 1)
                  );
                  spinWheelRef.current.callSpin();
                }
              }}
              variant="outlined"
              size="medium"
              muiProps=" fs-12"
            />
          </Box>
          <Box>
            <WheelSpin
              ref={spinWheelRef}
              segments={segments}
              segColors={segColors}
              winningSegment={segments[winSegment]}
              onFinished={(winner) => onFinished(winner)}
              primaryColor="black"
              contrastColor="white"
              buttonText="Spin"
              isOnlyOnce={false}
              size={290}
              upDuration={100}
              downDuration={1000}
            />
          </Box>
        </Box>
      </Box>
    );
  }
);
SpinWheel.displayName = "SpinWheel";
export default SpinWheel;
