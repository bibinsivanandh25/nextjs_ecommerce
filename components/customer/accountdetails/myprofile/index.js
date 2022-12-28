import { Avatar, Badge, Box, Grid } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useRef, useEffect, useState } from "react";
import CustomIcon from "services/iconUtils";
import InputBox from "@/atoms/InputBoxComponent";
import RadiobuttonComponent from "@/atoms/RadiobuttonComponent";
import ButtonComponent from "@/atoms/ButtonComponent";
import { useSelector } from "react-redux";
import { getCustomerProfile } from "services/customer/accountdetails/myprofile";
import toastify from "services/utils/toastUtils";
import DatePickerComponent from "@/atoms/DatePickerComponent";
import validateMessage from "constants/validateMessages";

const MyProfile = () => {
  const profilePicRef = useRef(null);
  const [customerDetails, setcustomerDetails] = useState({
    customerName: "",
    emailId: "",
    mobileNumber: "",
    dob: null,
    gender: "",
    profileImage: "",
  });
  const [ErrorObj, setErrorObj] = useState({
    customerName: "",
    emailId: "",
    mobileNumber: "",
    dob: null,
    gender: "",
    profileImage: "",
  });
  const [disableEdit, setdisableEdit] = useState(false);
  const { userId } = useSelector((state) => state?.customer);
  const validateFields = () => {
    let flag = false;
    const errObj = {
      customerName: "",
      emailId: "",
      mobileNumber: "",
      dob: null,
      gender: "",
      profileImage: "",
    };
    if (customerDetails.customerName === "") {
      errObj.customerName = validateMessage.field_required;
      flag = true;
    }
    if (customerDetails.emailId === "") {
      errObj.emailId = validateMessage.field_required;
      flag = true;
    }
    if (customerDetails.mobileNumber === "") {
      errObj.mobileNumber = validateMessage.field_required;
      flag = true;
    }
    if (customerDetails.dob === null) {
      errObj.dob = validateMessage.field_required;
      flag = true;
    }
    setErrorObj({ ...errObj });

    return flag;
  };
  const getUserDetails = async () => {
    const { data, err } = await getCustomerProfile(userId);
    if (data) {
      setcustomerDetails({
        customerName: data.customerName,
        emailId: data.emailId,
        mobileNumber: data.mobileNumber,
        dob: data.dob,
        gender: data.gender,
        profileImage: data.profileImage,
      });
    } else if (err) {
      toastify(err, "error");
    }
  };
  useEffect(() => {
    getUserDetails();
  }, []);
  const updateProfile = () => {
    if (!validateFields()) {
      // console.log("Successfully validate");
    }
  };
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
              src={customerDetails.profileImage}
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
            <span className="fs-20 fw-bold">
              {customerDetails?.customerName}
            </span>
            {!disableEdit ? (
              <CustomIcon
                type="edit"
                title="Edit"
                className="fs-18 mx-2"
                onIconClick={() => {
                  setdisableEdit(true);
                }}
              />
            ) : (
              <CustomIcon
                type="close"
                title="close"
                className="fs-18 mx-2"
                onIconClick={() => {
                  setdisableEdit(false);
                }}
              />
            )}
          </div>
          <span>{customerDetails?.emailId}</span>
        </div>
      </div>
      <Box marginTop={2}>
        <p className="fw-bold pb-3">Update your profile</p>
        <Grid container rowSpacing={3}>
          <Grid item xs={6}>
            <Grid item xs={10}>
              <InputBox
                label="Name"
                inputlabelshrink
                value={customerDetails?.customerName}
                disabled={!disableEdit}
                onInputChange={(e) => {
                  setcustomerDetails((pre) => ({
                    ...pre,
                    customerName: e.target.value,
                  }));
                }}
                error={ErrorObj.customerName}
                helperText={ErrorObj.customerName}
              />
            </Grid>
          </Grid>
          <Grid item xs={5}>
            <InputBox
              label="Email ID"
              inputlabelshrink
              value={customerDetails?.emailId}
              disabled={!disableEdit}
              onInputChange={(e) => {
                setcustomerDetails((pre) => ({
                  ...pre,
                  emailId: e.target.value,
                }));
              }}
              error={ErrorObj.emailId}
              helperText={ErrorObj.emailId}
            />
          </Grid>
          <Grid item xs={6}>
            <Grid container>
              <Grid item xs={10}>
                <InputBox
                  label="Mobile Number"
                  inputlabelshrink
                  value={customerDetails?.mobileNumber}
                  disabled={!disableEdit}
                  onInputChange={(e) => {
                    setcustomerDetails((pre) => ({
                      ...pre,
                      mobileNumber: e.target.value,
                    }));
                  }}
                  error={ErrorObj.mobileNumber}
                  helperText={ErrorObj.mobileNumber}
                />
              </Grid>
              <Grid item xs={2} display="flex" alignItems="center">
                <CustomIcon type="edit" title="Edit" className="ms-2 fs-18" />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={5}>
            <DatePickerComponent
              label="Date of Birth"
              size="small"
              value={customerDetails.dob}
              onDateChange={(value) => {
                setcustomerDetails((pre) => ({
                  ...pre,
                  dob: value,
                }));
              }}
              disableFuture
              inputlabelshrink
              disabled={!disableEdit}
              helperText={ErrorObj.dob}
              error={ErrorObj.dob}
            />
          </Grid>
        </Grid>
        <Box className="my-2">
          <RadiobuttonComponent
            label="Male"
            value={customerDetails.gender}
            isChecked={customerDetails.gender === "Male"}
            disabled={!disableEdit}
            onRadioChange={() => {
              setcustomerDetails({
                ...customerDetails,
                gender: "Male",
              });
            }}
          />
          <RadiobuttonComponent
            label="Female"
            isChecked={customerDetails.gender === "Female"}
            disabled={!disableEdit}
            onRadioChange={() => {
              setcustomerDetails({
                ...customerDetails,
                gender: "Female",
              });
            }}
          />
          <RadiobuttonComponent
            label="Others"
            isChecked={customerDetails.gender === "Others"}
            disabled={!disableEdit}
            onRadioChange={() => {
              setcustomerDetails({
                ...customerDetails,
                gender: "Others",
              });
            }}
          />
        </Box>
        {disableEdit ? (
          <ButtonComponent label="Update Profile" onBtnClick={updateProfile} />
        ) : (
          <></>
        )}
      </Box>
    </div>
  );
};

export default MyProfile;
