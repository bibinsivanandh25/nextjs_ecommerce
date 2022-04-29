import { Grid } from "@mui/material";
import ButtonComponent from "components/atoms/ButtonComponent";
import InputBox from "components/atoms/InputBoxComponent";
import { useState } from "react";

const ChangePassword = () => {
  const [formValues, setFormValues] = useState({});

  return (
    <Grid container spacing={4} item xs={4} ml={30} mt={3}>
      <Grid item xs={12}>
        <InputBox
          value={formValues.emailid}
          label="E-mail ID"
          className="w-100"
          size="small"
          onInputChange={(e) => {
            setFormValues((prev) => ({
              ...prev,
              emailid: e.target.value,
            }));
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <InputBox
          value={formValues.oldPassword}
          label="Old Password"
          className="w-100"
          size="small"
          onInputChange={(e) => {
            setFormValues((prev) => ({
              ...prev,
              oldPassword: e.target.value,
            }));
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <InputBox
          value={formValues.newPassword}
          label="New Password"
          className="w-100"
          size="small"
          onInputChange={(e) => {
            setFormValues((prev) => ({
              ...prev,
              newPassword: e.target.value,
            }));
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <InputBox
          value={formValues.reenterPassword}
          label="Re-enter New Password"
          className="w-100"
          size="small"
          onInputChange={(e) => {
            setFormValues((prev) => ({
              ...prev,
              reenterPassword: e.target.value,
            }));
          }}
        />
      </Grid>
      <Grid xs={12} item>
        <ButtonComponent
          label="Update Password"
          onBtnClick={() => console.log("Update Password")}
        />
      </Grid>
    </Grid>
  );
};

export default ChangePassword;
