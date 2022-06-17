import {
  Box,
  Card,
  CardActionArea,
  Grid,
  Paper,
  Slider,
  Typography,
} from "@mui/material";
import { assetsJson } from "public/assets";
import Image from "next/image";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ButtonComponent from "components/atoms/ButtonComponent";
import EditIcon from "@mui/icons-material/Edit";
import { useRef, useState } from "react";
import { getBase64 } from "services/utils/functionUtils";
import ModalComponent from "components/atoms/ModalComponent";
import InputBox from "components/atoms/InputBoxComponent";
import styled from "@emotion/styled";
import validateMessage from "constants/validateMessages";

const MyShop = () => {
  const [showTheme, setShowTheme] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectTheme, setSelectTheme] = useState(1);
  const [formData, setFormData] = useState({
    shop_name: "",
    margin: "",
  });
  const [errorObj, setErrorObj] = useState({
    shop_name: "",
    margin: "",
  });
  const [imageData, setImageData] = useState("");
  const inputRef = useRef(null);

  const CustomSlider = styled(Slider)({
    color: "#e46c0b",
    // height: 8,
    // "& .MuiSlider-track": {
    //   border: "none",
    // },
    "& .MuiSlider-thumb": {
      height: 12,
      width: 12,
      backgroundColor: "#fff",
      border: "2px solid currentColor",
      "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
        boxShadow: "inherit",
      },
      "&:before": {
        display: "none",
      },
    },
    "& .MuiSlider-valueLabel": {
      fontSize: 12,
      padding: 0,
      width: 32,
      height: 17,
      color: "#e46c0b", // borderRadius: "50% 50% 50% 0",
      backgroundColor: "#fff",
      transformOrigin: "bottom left",
    },
  });

  const validate = () => {
    const errObj = {
      shop_name: "",
      margin: "",
    };
    let flag = false;
    if (formData.shop_name === "") {
      errObj.shop_name = validateMessage.field_required;
      flag = true;
    } else if (formData.shop_name.length > 35) {
      errObj.shop_name = validateMessage.field_required;
      flag = true;
    }
    setErrorObj({ ...errObj });
    return flag;
  };

  const handleSubmit = () => {
    if (!validate()) {
      setShowEditModal(false);
      setErrorObj({ shop_name: "", margin: "" });
    }
  };

  return (
    <>
      <Card variant="outlined">
        <Box className="m-3 d-flex justify-content-between">
          <Box className="d-flex">
            <Paper
              elevation={3}
              className="mxh-200 mnw-150 rounded bg-info position-relative"
              sx={{ width: "10vw", height: "20vh" }}
            >
              <Image
                src={imageData !== "" ? imageData : assetsJson.person}
                layout="responsive"
                width={100}
                height={100}
              />
              <input
                type="file"
                className="d-none"
                ref={inputRef}
                onChange={async (e) => {
                  setImageData(await getBase64(e.target.files[0]));
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  right: "0px",
                  transform: "translate(40%,-40%)",
                  borderRadius: "50%",
                }}
                className="bg-gray"
              >
                <CameraAltIcon
                  className="m-1 cursor-pointer"
                  onClick={() => {
                    inputRef.current.click();
                  }}
                />
              </Box>
            </Paper>
            <Box className="d-flex flex-column justify-content-between ms-3">
              <Box>
                <Typography className="h-3">Shop Name</Typography>
                <Typography className="h-4">Shop Code: #12345</Typography>
              </Box>
              <ButtonComponent label="View Shop" />
            </Box>
          </Box>
          <Box className="d-flex flex-column justify-content-between">
            <Box className="d-flex me-3">
              <Box className="me-4">
                <ButtonComponent
                  label="Choose Theme"
                  variant="outlined"
                  onBtnClick={() => {
                    setShowTheme(!showTheme);
                  }}
                />
              </Box>
              <EditIcon
                className="ms-4 cursor-pointer"
                onClick={() => {
                  setShowEditModal(true);
                }}
              />
            </Box>
            <Box className="d-flex justify-content-end me-4">
              <ButtonComponent
                label="More"
                variant="outlined"
                iconName="share"
                showIcon
                iconOrintation="start"
                muiProps="border-gray color-black"
                iconColorClass="color-dark-blue"
              />
            </Box>
          </Box>
        </Box>
      </Card>
      {showTheme ? (
        <Card variant="outlined" className="mt-3  w-100 p-3">
          <Grid container className="w-100" spacing={2}>
            <Grid item sm={12} md={4} lg={3}>
              <Card
                onClick={() => {
                  setSelectTheme(1);
                }}
                sx={{ border: selectTheme === 1 ? "3px solid #e56700" : "" }}
                variant="outline"
                className="w-100 h-300px bg-info"
              >
                <CardActionArea className="w-100 h-100" />
              </Card>
            </Grid>
            <Grid item sm={12} md={4} lg={3}>
              <Card
                onClick={() => {
                  setSelectTheme(2);
                }}
                sx={{ border: selectTheme === 2 ? "3px solid #e56700" : "" }}
                variant="outline"
                className="w-100 h-300px bg-info"
              >
                <CardActionArea className="w-100 h-100" />
              </Card>
            </Grid>
            <Grid item sm={12} md={4} lg={3}>
              <Card
                onClick={() => {
                  setSelectTheme(3);
                }}
                sx={{ border: selectTheme === 3 ? "3px solid #e56700" : "" }}
                variant="outline"
                className="w-100 h-300px bg-info"
              >
                <CardActionArea className="w-100 h-100" />
              </Card>
            </Grid>
            <Grid item sm={12} md={4} lg={3}>
              <Card
                onClick={() => {
                  setSelectTheme(4);
                }}
                sx={{ border: selectTheme === 4 ? "3px solid #e56700" : "" }}
                variant="outline"
                className="w-100 h-300px bg-info"
              >
                <CardActionArea className="w-100 h-100" />
              </Card>
            </Grid>
          </Grid>
        </Card>
      ) : null}
      {showEditModal ? (
        <ModalComponent
          open
          ModalTitle="Edit Shop"
          minHeightClassName=""
          ClearBtnText="Cancel"
          onSaveBtnClick={handleSubmit}
          footerClassName="border-top d-flex flex-row-reverse"
          saveBtnClassName="ms-2"
          footerPadding="p-3"
          onClearBtnClick={() => {
            setFormData({ shop_name: "", margin: "" });
            setShowEditModal(false);
            setErrorObj({ shop_name: "", margin: "" });
          }}
          onCloseIconClick={() => {
            setFormData({ shop_name: "", margin: "" });
            setShowEditModal(false);
            setErrorObj({ shop_name: "", margin: "" });
          }}
        >
          <Box className="w-100 h-100 d-flex flex-column p-4">
            <InputBox
              label="Shop Name"
              onInputChange={(e) => {
                setFormData((pre) => {
                  return {
                    ...pre,
                    shop_name: e.target.value,
                  };
                });
              }}
              value={formData.shop_name}
              fullWidth={false}
              className="w-75 "
              inputlabelshrink
              error={errorObj.shop_name !== ""}
              helperText={errorObj.shop_name}
            />
            <Box className="mt-3">
              <Typography className="fs-14 fw-bold mb-3">
                Set Global Margin
              </Typography>
              <CustomSlider
                size="small"
                value={formData.margin}
                aria-label="Small"
                valueLabelDisplay="on"
                onChange={(e) => {
                  setFormData((pre) => {
                    return {
                      ...pre,
                      margin: e.target.value,
                    };
                  });
                }}
                valueLabelFormat={`${formData.margin}%`}
              />
            </Box>
          </Box>
        </ModalComponent>
      ) : null}
    </>
  );
};
export default MyShop;
