import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import CustomIcon from "services/iconUtils";
import { getBase64 } from "services/utils/functionUtils";
import { QrCode2 } from "@mui/icons-material";
import InputBox from "@/atoms/InputBoxComponent";
import ImageCard from "@/atoms/ImageCard";
import SimpleDropdownComponent from "@/atoms/SimpleDropdownComponent";
import TextEditor from "@/atoms/TextEditor";
import ButtonComponent from "@/atoms/ButtonComponent";

const themeColor = [
  "#e01313",
  "#16a887",
  "#e56700",
  "#f1b07b",
  "#a316a8",
  "#d6c20f",
];
const StoreSettings = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [logoUrl, setLogoUrl] = useState("");

  return (
    <Paper className="mnh-70vh mxh-70vh overflow-auto hide-scrollbar">
      <Box>
        <Typography className="h-4 color-orange fw-bold ps-4 pt-3">
          Store Settings
        </Typography>
      </Box>
      <Box>
        <Grid container spacing={2}>
          <Grid item sm={4} md={2} className="d-center">
            <Box>
              <Box>
                <Typography className="h-5 color-gray">
                  Supplier Logo<span className="h-4 color-red">*</span>
                </Typography>
                {/* <Box
                  className="d-center p-5 bg-light-gray rounded"
                  sx={{ border: "1px dashed gray" }}
                >
                  <AddCircle />
                </Box> */}
                <ImageCard
                  className=""
                  height={100}
                  width={100}
                  handleCloseClick={() => setLogoUrl("")}
                  showClose={!!logoUrl.length}
                  imgSrc={logoUrl}
                  handleImageUpload={async (e) => {
                    const file = await getBase64(e.target.files[0]);
                    setLogoUrl(file);
                  }}
                />
              </Box>
              <Box>
                <Typography className="h-5 color-gray">Add Image</Typography>
                {/* <Box
                  className="d-center p-5 bg-light-gray rounded"
                  sx={{ border: "1px dashed gray" }}
                >
                  <AddCircle />
                </Box> */}
                <ImageCard
                  height={100}
                  width={100}
                  handleCloseClick={() => setImageUrl("")}
                  showClose={!!imageUrl.length}
                  imgSrc={imageUrl}
                  handleImageUpload={async (e) => {
                    const file = await getBase64(e.target.files[0]);
                    setImageUrl(file);
                  }}
                />
              </Box>
              <Box>
                <Box className="my-2">
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      backgroundColor: "#e56700",
                      fontSize: "0.7rem !important",
                      paddingX: "1.40rem !important",
                      "&:hover": {
                        backgroundColor: "#e56700",
                      },
                    }}
                    className="h-5"
                  >
                    View Shop
                  </Button>
                </Box>
                <Box>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      backgroundColor: "#e56700",
                      fontSize: "0.7rem !important",
                      "&:hover": {
                        backgroundColor: "#e56700",
                      },
                    }}
                    className="h-5"
                  >
                    Invite Supplier
                  </Button>
                  <Typography className="h-6 color-gary">
                    Invite and earn 50 more Orders
                  </Typography>
                </Box>
                <Box>
                  <Box className="d-center w-75">
                    <CustomIcon
                      type="filecopy"
                      size="small"
                      className="fs-26"
                      onIconClick={() => {
                        //   copyText();
                      }}
                    />
                  </Box>
                  <Typography className="h-6 d-center w-75 fw-bold text-center text-break">
                    Copy Store code and Name
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item sm={8} className="ps-2 mt-2">
            <Grid container spacing={2} className="mb-3">
              <Grid item xs={6}>
                <InputBox label="Store Name" inputlabelshrink />
              </Grid>
              <Grid item xs={6}>
                <InputBox label="Store Code" inputlabelshrink />
              </Grid>
            </Grid>
            <Grid container spacing={2} className="mb-3">
              <Grid item xs={6}>
                <InputBox
                  label="Minimum Order Amount For The Free Delivery"
                  inputlabelshrink
                />
              </Grid>
              <Grid item xs={6}>
                <SimpleDropdownComponent
                  size="small"
                  label="Max Time To Process Order"
                  inputlabelshrink
                  className=""
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} className="mb-3">
              <Grid item xs={6}>
                <SimpleDropdownComponent
                  size="small"
                  label="Max Order delivery Range"
                  inputlabelshrink
                  className=""
                />
              </Grid>
              <Grid item xs={6}>
                <InputBox label="E-Mail ID" inputlabelshrink />
              </Grid>
            </Grid>
            <Grid container spacing={2} className="mb-3">
              <Grid item xs={6}>
                <SimpleDropdownComponent
                  size="small"
                  label="Shop Open Days"
                  inputlabelshrink
                />
              </Grid>
              <Grid item xs={6}>
                <div
                  className="input-border"
                  style={{
                    position: "relative",
                    borderRadius: "5px",
                    outline: "none",
                    width: "100%",
                    padding: 5,
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      top: -11,
                      left: 10,
                      backgroundColor: "#fff",
                      color: "rgba(0, 0, 0, 0.6)",
                      fontSize: "11px",
                      cursor: "pointer",
                    }}
                    className="px-1"
                  >
                    Shop Timings
                  </span>
                  <input
                    type="time"
                    style={{
                      width: "100%",
                      height: "100%",
                      outline: "none",
                      border: "none",
                    }}
                  />
                </div>
              </Grid>
            </Grid>
            <Grid container className="mb-3">
              <Grid item sm={12} className="w-100">
                <TextEditor className="w-100" />
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={6} md={2}>
            <Box>
              <Typography className="h-5 fw-bold mb-1">Choose Theme</Typography>
            </Box>
            <Grid container spacing={2} className="">
              {themeColor.map((item) => (
                <Grid item sm={5}>
                  <div
                    style={{
                      backgroundColor: `${item}`,
                      height: "3rem",
                      width: "3rem",
                    }}
                    className="rounded"
                  />
                </Grid>
              ))}
            </Grid>
            <Box>
              <Box className="bg-orange rounded d-center my-2 w-75">
                <QrCode2 className="h-1 me-2 ps-1" />
                <Typography className="h-5">Download QR Code</Typography>
              </Box>
              <Typography className="h-6">
                Download & take printout of QR Code of your store. Stick in your
                shop. Ask your customer to download MrMrsCart app and scan the
                QR code using the scanner to add this store as their favorite
                store list and start receving orders
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item sm={12} display="flex" justifyContent="end">
            <ButtonComponent
              label="Cancel"
              variant="outlined"
              muiProps="me-3 w-10p"
            />
            <ButtonComponent label="Submit" muiProps="me-2 w-10p" />
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default StoreSettings;
