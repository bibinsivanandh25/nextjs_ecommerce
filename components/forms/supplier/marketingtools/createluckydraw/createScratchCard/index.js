import { forwardRef, useState, useImperativeHandle, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import InputBox from "components/atoms/InputBoxComponent";
import ScratchCardComponent from "components/forms/supplier/marketingtools/createluckydraw/createScratchCard/ScratchCard";
import { getCategorys } from "services/supplier/marketingtools/luckydraw/scratchcard";
import { useSelector } from "react-redux";
import RadiobuttonComponent from "@/atoms/RadiobuttonComponent";
import { getThemes } from "services/supplier/marketingtools";
import { urltobaseurl } from "services/supplier";

const ScratchCardForm = forwardRef((_props, ref) => {
  useImperativeHandle(ref, () => {
    return {
      handleSendFormData: () => {
        return ["scratchcard", selectedthemes];
      },
    };
  });
  const [mobile, setMobile] = useState("");
  const [themes, setThemes] = useState([]);
  const [selectedthemes, setselectedthemes] = useState(null);
  const { storeCode, storeName } = useSelector((state) => state.user);

  const getAllTheme = async () => {
    const { data, err } = await getThemes();
    if (data) {
      const temp = [];
      data.forEach((item) => {
        if (item.themeType === "SCRATCH_CARD") {
          temp.push({
            imageUrl: item.imageUrl,
            colorCode: item.colorCode,
            themeId: item.themeId,
          });
        }
      });
      setThemes(temp);
      setselectedthemes({ ...temp[0] });
    }
  };
  const getBaseUrl = async () => {
    const { data, err } = await urltobaseurl(
      "https://dev-mrmrscart-assets.s3.ap-south-1.amazonaws.com/supplier/SP0822000040/product/image/09162022152020321"
    );
    if (data) {
      console.log({ data });
    }
  };

  useEffect(() => {
    getAllTheme();
    getBaseUrl();
  }, []);
  return (
    <Box className="d-flex w-100 ms-3">
      <Box className="d-flex flex-column mt-3">
        {themes.map((item, index) => {
          return (
            <RadiobuttonComponent
              key={index}
              label={`Theme ${index + 1}`}
              onRadioChange={() => {
                setselectedthemes(item);
              }}
              isChecked={
                selectedthemes && item.themeId === selectedthemes.themeId
              }
              size="small"
            />
          );
        })}
      </Box>
      <Box
        className=" p-2 px-4 d-flex  mx-3 mt-3 border rounded  bg-red"
        style={{
          width: "350px",
          // background:
          //   selectedthemes && selectedthemes.colorCode[0].toLowerCase(),
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
    </Box>
  );
});
ScratchCardForm.displayName = "ScratchCardForm";
export default ScratchCardForm;
