import { Avatar, Badge, Box, Grid } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useRef } from "react";
import CustomIcon from "services/iconUtils";
import InputBox from "@/atoms/InputBoxComponent";
import RadiobuttonComponent from "@/atoms/RadiobuttonComponent";
import ButtonComponent from "@/atoms/ButtonComponent";

const MyProfile = () => {
  const profilePicRef = useRef(null);

  return (
    <div className="mnh-70vh mxh-80vh overflow-auto hide-scrollbar bg-white rounded px-4">
      <div className="mt-4 d-flex align-items-center">
        <div>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <Avatar className="bg-white shadow cursor-pointer">
                <CameraAltIcon className="color-black" />
              </Avatar>
            }
          >
            <Avatar
              onClick={() => {
                profilePicRef.current.click();
              }}
              src=""
              sx={{
                height: 100,
                width: 100,
              }}
            />
          </Badge>

          <input type="file" hidden ref={profilePicRef} />
        </div>
        <div className="mx-3 d-flex flex-column">
          <div className="d-flex align-items-center">
            <span className="fs-20 fw-bold">Balu Enterprises pvt ltd</span>
            <CustomIcon type="edit" title="Edit" className="fs-18 mx-2" />
          </div>
          <span>balu.m@testyantra.in</span>
        </div>
      </div>
      <Box marginTop={2}>
        <p className="fw-bold pb-3">Update your profile</p>
        <Grid container rowSpacing={3}>
          <Grid item xs={6}>
            <Grid item xs={10}>
              <InputBox label="First Name" inputlabelshrink />
            </Grid>
          </Grid>
          <Grid item xs={5}>
            <InputBox label="Last Name" inputlabelshrink />
          </Grid>
          <Grid item xs={6}>
            <Grid container>
              <Grid item xs={10}>
                <InputBox label="Mobile Number" inputlabelshrink />
              </Grid>
              <Grid item xs={2} display="flex" alignItems="center">
                <CustomIcon type="edit" title="Edit" className="ms-2 fs-18" />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={5}>
            <InputBox label="Email ID" inputlabelshrink />
          </Grid>
        </Grid>
        <Box className="my-2">
          <RadiobuttonComponent label="Male" isChecked />
          <RadiobuttonComponent label="Female" />
        </Box>
        <ButtonComponent label="Update Profile" />
      </Box>
    </div>
  );
};

export default MyProfile;
