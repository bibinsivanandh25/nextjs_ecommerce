import { Grid } from "@mui/material";
import ButtonComponent from "components/atoms/ButtonComponent";
import InputBox from "components/atoms/InputBoxComponent";
import Image from "next/image";
import avatar from "../../../../../public/assets/images/man.png";

const MyProfile = () => {
  return (
    <div>
      <div className="mt-4 d-flex align-items-center">
        <div>
          <Image src={avatar} height={100} to width={100} />
        </div>
        <div className="mx-3 d-flex flex-column">
          <span className="fs-20 fw-bold">Business Name </span>
          <span>user@gmail.com</span>
        </div>
      </div>
      <div className="my-2">
        <p className="fw-bold">Update your profile</p>
        <Grid className="mx-5">
          <Grid container columnSpacing={10}>
            <Grid item xs={4}>
              <InputBox className="w-100" label="First Name" />
            </Grid>
            <Grid item xs={4}>
              <InputBox className="w-100" label="Last Name" />
            </Grid>
          </Grid>
          <Grid container columnSpacing={10} className="my-4">
            <Grid item xs={4}>
              <InputBox className="w-100" label="Mobile Number" />
            </Grid>
            <Grid item xs={4}>
              <InputBox className="w-100" label="Email ID" />
            </Grid>
          </Grid>
          <Grid>
            <ButtonComponent label="Update profile" />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default MyProfile;
