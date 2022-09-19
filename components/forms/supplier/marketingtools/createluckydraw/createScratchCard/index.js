import { forwardRef, useState, useImperativeHandle, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import InputBox from "components/atoms/InputBoxComponent";
import { useSelector } from "react-redux";
import RadiobuttonComponent from "@/atoms/RadiobuttonComponent";
import Theme1 from "./Theme1";
import Theme2 from "./Theme2";

const ScratchCardForm = forwardRef((_props, ref) => {
  const [themes, setThemes] = useState([
    {
      component: Theme1,
      id: 1,
    },
    {
      component: Theme2,
      id: 2,
    },
  ]);
  const [selectedTheme, setselectedTheme] = useState(1);
  const { storeCode, storeName } = useSelector((state) => state.user);

  useImperativeHandle(ref, () => {
    return {
      handleSendFormData: () => {
        return ["scratchcard", selectedTheme];
      },
    };
  });

  return (
    <Box className="d-flex w-100 ms-3">
      <Box className="d-flex flex-column mt-3">
        {themes.map((item, index) => {
          return (
            <RadiobuttonComponent
              key={index}
              label={`Theme ${index + 1}`}
              onRadioChange={() => {
                setselectedTheme(item.id);
              }}
              isChecked={selectedTheme === item.id}
              size="small"
            />
          );
        })}
      </Box>
      <Box
        className=" p-2 px-4 d-flex  mx-3 mt-3 border rounded  bg-red"
        style={{
          width: "350px",
        }}
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
            textInputProps={{
              style: { padding: 5, color: "#fffff" },
            }}
            fullWidth={false}
            className="w-90p mb-3"
            disabled
          />
          {selectedTheme === 1 ? (
            <Theme1>
              <div
                style={{ height: "240px", width: "300px" }}
                className=" shadow-lg bg-white d-flex justify-content-center align-items-center"
              >
                <h3>code: #12345</h3>
              </div>
            </Theme1>
          ) : (
            <Theme2>
              <div
                style={{ height: "240px", width: "300px" }}
                className=" shadow-lg bg-white d-flex justify-content-center align-items-center"
              >
                <h3>code: #12345</h3>
              </div>
            </Theme2>
          )}

          <Typography className="h-6 mt-2 color-white">
            Last date to redeem coupon 20-08-2021
          </Typography>
        </Box>
      </Box>
    </Box>
  );
});
ScratchCardForm.displayName = "ScratchCardForm";
export default ScratchCardForm;
