import { Grid } from "@mui/material";
import ButtonComponent from "components/atoms/ButtonComponent";
import InputBox from "components/atoms/InputBoxComponent";
import Image from "next/image";
import { useState } from "react";
import avatar from "../../../../../public/assets/images/man.png";
import validateMessage from "constants/validateMessages";
import validationRegex from "services/utils/regexUtils";

const MyProfile = () => {
  const [formDetails, setFormDetails] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    emailId: "",
  });
  const [errorObj, setErrorObj] = useState({});

  const validateFields = () => {
    let flag = false;
    let errObj = {
      firstName: "",
      lastName: "",
      mobileNumber: "",
      emailId: "",
    };

    if (!formDetails.firstName.length) {
      errObj.firstName = validateMessage.field_required;
      flag = true;
    }
    if (formDetails.firstName.length > 50) {
      errObj.firstName = validateMessage.alpha_numeric_max_50;
      flag = true;
    }
    if (!formDetails.lastName.length) {
      errObj.lastName = validateMessage.field_required;
      flag = true;
    }
    if (formDetails.lastName.length > 50) {
      errObj.lastName = validateMessage.alpha_numeric_max_50;
      flag = true;
    }
    if (!validationRegex.mobile.test(formDetails.mobileNumber)) {
      flag = true;
      errObj.mobileNumber = validateMessage.mobile;
    }
    if (!formDetails.mobileNumber.length) {
      errObj.mobileNumber = validateMessage.field_required;
      flag = true;
    }
    if (!validationRegex.email.test(formDetails.emailId)) {
      flag = true;
      errObj.emailId = validateMessage.email;
    }
    if (!formDetails.mobileNumber.length) {
      flag = true;
      errObj.emailId = validateMessage.email;
    }
    setErrorObj({ ...errObj });
    return flag;
  };

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
              <InputBox
                value={formDetails.firstName}
                className="w-100"
                label="First Name"
                helperText={errorObj.firstName}
                error={errorObj.firstName?.length}
                onInputChange={(e) => {
                  setFormDetails((pre) => ({
                    ...pre,
                    firstName: e.target.value,
                  }));
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <InputBox
                value={formDetails.lastName}
                helperText={errorObj.lastName}
                error={errorObj.lastName?.length}
                className="w-100"
                label="Last Name"
                onInputChange={(e) => {
                  setFormDetails((pre) => ({
                    ...pre,
                    lastName: e.target.value,
                  }));
                }}
              />
            </Grid>
          </Grid>
          <Grid container columnSpacing={10} className="my-4">
            <Grid item xs={4}>
              <InputBox
                className="w-100"
                value={formDetails.mobileNumber}
                label="Mobile Number"
                helperText={errorObj.mobileNumber}
                error={errorObj.mobileNumber?.length}
                onInputChange={(e) => {
                  setFormDetails((pre) => ({
                    ...pre,
                    mobileNumber: e.target.value,
                  }));
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <InputBox
                className="w-100"
                value={formDetails.emailId}
                helperText={errorObj.emailId}
                error={errorObj.emailId?.length}
                label="Email ID"
                onInputChange={(e) => {
                  setFormDetails((pre) => ({
                    ...pre,
                    emailId: e.target.value,
                  }));
                }}
              />
            </Grid>
          </Grid>
          <Grid>
            <ButtonComponent
              label="Update profile"
              onBtnClick={validateFields}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default MyProfile;
