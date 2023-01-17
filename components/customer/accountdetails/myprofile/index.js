/* eslint-disable consistent-return */
/* eslint-disable no-nested-ternary */
import { Avatar, Badge, Box, Grid } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useRef, useEffect, useState } from "react";
import CustomIcon from "services/iconUtils";
import InputBox from "@/atoms/InputBoxComponent";
import RadiobuttonComponent from "@/atoms/RadiobuttonComponent";
import ButtonComponent from "@/atoms/ButtonComponent";
import { useSelector } from "react-redux";
import {
  getCustomerProfile,
  sendOtpEmailOrPhone,
  updateProfile,
  UpdateProfilePicture,
  varifyPhoneOtp,
} from "services/customer/accountdetails/myprofile";
import toastify from "services/utils/toastUtils";
import DatePickerComponent from "@/atoms/DatePickerComponent";
import validateMessage from "constants/validateMessages";
import { format, parse } from "date-fns";
import { getBase64 } from "services/utils/functionUtils";
import SimpleOtpForm from "@/forms/auth/VerifyOTP/SimpleOtpForm";
import validationRegex from "services/utils/regexUtils";

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

  const [otp, setotp] = useState("xxxx");
  const [emailOtp, setemailOtp] = useState("xxxx");
  const [CustomerStaticDetails, setCustomerStaticDetails] = useState([]);
  const [otpInput, setotpInput] = useState({ phone: "", emailId: "" });
  const [ErrorObj, setErrorObj] = useState({
    customerName: "",
    emailId: "",
    mobileNumber: "",
    dob: null,
    gender: "",
    profileImage: "",
  });
  const [disableEdit, setdisableEdit] = useState({
    phone: false,
    phoneOtp: false,
    validOtp: false,
    emailId: false,
    emailOtp: false,
    emailValidOtp: false,
  });
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
        dob: parse(data.dob, "MM-dd-yyyy", new Date()),
        gender: data.gender,
        profileImage: data.profileImage,
      });
      setCustomerStaticDetails(data);
    } else if (err) {
      toastify(err, "error");
    }
  };
  useEffect(() => {
    getUserDetails();
  }, []);
  const updateProfileFunction = async () => {
    if (!validateFields()) {
      const file = customerDetails.profileImage;
      let imageurl = "";
      if (CustomerStaticDetails.profileImage !== customerDetails.profileImage) {
        const { datas, err } = await UpdateProfilePicture(file, userId);
        if (datas) {
          imageurl = datas.data;
        } else if (err) {
          toastify(err.message, "error");
        }
      }
      const payload = {
        customerId: CustomerStaticDetails.customerId,
        customerName: customerDetails.customerName,
        mobileNumber: customerDetails.mobileNumber,
        emailId: customerDetails.emailId,
        gender: customerDetails.gender,
        profileImageUrl: imageurl || customerDetails.profileImage || "",
        dob: customerDetails?.dob
          ? `${format(customerDetails?.dob, "MM-dd-yyyy")}`
          : customerDetails?.dob,
      };
      const { data, errRes } = await updateProfile(payload);
      if (data) {
        toastify(data, "success");
        getUserDetails();
      } else if (errRes) {
        toastify(errRes, "error");
      }
    }
  };
  const getOtpFunction = async () => {
    if (customerDetails.mobileNumber.length === 10) {
      setErrorObj({ ...ErrorObj, mobileNumber: "" });
      const payload = {
        type: "MobileNumber",
        value: customerDetails.mobileNumber,
      };
      const { data, errRes } = await sendOtpEmailOrPhone(payload);
      if (data) {
        toastify(data, "success");
        setdisableEdit({
          ...disableEdit,
          validOtp: true,
          phoneOtp: false,
        });
      } else if (errRes) {
        toastify(errRes.response.data.message, "error");
      }
    } else {
      setErrorObj({ ...ErrorObj, mobileNumber: validateMessage.mobile });
      return false;
    }
  };

  const varifyMobileOtpFunction = async () => {
    const payload = {
      otp,
      userName: customerDetails.mobileNumber,
    };
    const { data, errRes } = await varifyPhoneOtp(payload);
    if (data) {
      toastify(data, "success");
      setotpInput({ ...otpInput, phone: "" });
      setdisableEdit({
        ...disableEdit,
        phoneOtp: false,
        validOtp: false,
        phone: false,
      });
    } else if (errRes) {
      toastify(errRes, "error");
    }
  };
  useEffect(() => {
    if (!otp.includes("x")) {
      setTimeout(() => {
        varifyMobileOtpFunction();
      }, 2000);
    }
  }, [otp]);
  const sendEmailOtpFunction = async () => {
    if (!customerDetails.emailId) {
      setErrorObj({ ...ErrorObj, emailId: validateMessage.field_required });
      return false;
    }
    if (!validationRegex.email.test(customerDetails.emailId)) {
      setErrorObj({ ...ErrorObj, emailId: validateMessage.email });
      return false;
    }
    const payload = { type: "Email", value: customerDetails.emailId };
    const { data, errRes } = await sendOtpEmailOrPhone(payload);
    if (data) {
      toastify(data, "success");
      setdisableEdit({
        ...disableEdit,
        emailValidOtp: true,
        emailOtp: false,
      });
    } else if (errRes) {
      toastify(errRes.response.data.message, "error");
    }
  };
  const varifyEmailOtp = async () => {
    const payload = {
      otp: emailOtp,
      userName: customerDetails.emailId,
    };
    const { data, errRes } = await varifyPhoneOtp(payload);
    if (data) {
      toastify(data, "success");
      setotpInput({ ...otpInput, emailId: "" });
      setdisableEdit({
        ...disableEdit,
        emailOtp: false,
        emailValidOtp: false,
        emailId: false,
      });
    } else if (errRes) {
      toastify(errRes, "error");
    }
  };
  useEffect(() => {
    if (!emailOtp.includes("x")) {
      setTimeout(() => {
        varifyEmailOtp();
      }, 2000);
    }
  }, [emailOtp]);
  return (
    <div className="mnh-70vh mxh-80vh overflow-auto hide-scrollbar bg-white rounded px-4">
      <div className="mt-4 d-flex align-items-center">
        <div>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <Avatar className="bg-white shadow cursor-pointer">
                <CameraAltIcon
                  className="color-black"
                  onClick={() => {
                    profilePicRef.current.click();
                  }}
                />
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

          <input
            type="file"
            hidden
            ref={profilePicRef}
            onChange={async (e) => {
              if (e.target.files[0]) {
                const file = await getBase64(e.target.files[0]);
                setcustomerDetails({ ...customerDetails, profileImage: file });
              }
            }}
          />
        </div>
        <div className="mx-3 d-flex flex-column">
          <div className="d-flex align-items-center">
            <span className="fs-20 fw-bold">
              {CustomerStaticDetails?.customerName}
            </span>
          </div>
          <span>{CustomerStaticDetails?.emailId}</span>
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
          <Grid item xs={6}>
            <Grid container>
              <Grid item xs={10}>
                <InputBox
                  label="Email ID"
                  inputlabelshrink
                  value={customerDetails?.emailId}
                  disabled={!disableEdit.emailId}
                  onInputChange={(e) => {
                    setcustomerDetails((pre) => ({
                      ...pre,
                      emailId: e.target.value,
                    }));
                    if (CustomerStaticDetails?.emailId !== e.target.value) {
                      setdisableEdit({ ...disableEdit, emailOtp: true });
                    } else {
                      setdisableEdit({ ...disableEdit, emailOtp: false });
                    }
                  }}
                  error={ErrorObj.emailId}
                  helperText={ErrorObj.emailId}
                />
              </Grid>
              <Grid item xs={2} display="flex" alignItems="center">
                {!disableEdit.emailOtp ? (
                  <CustomIcon
                    type="edit"
                    title="Edit"
                    className="ms-2 fs-18"
                    onIconClick={() => {
                      setdisableEdit({ ...disableEdit, emailId: true });
                    }}
                  />
                ) : (
                  <></>
                )}
              </Grid>
              <Grid>
                {disableEdit.emailOtp ? (
                  <ButtonComponent
                    type="send"
                    label="Send OTP"
                    variant="outlined"
                    className="ms-2 fs-18"
                    borderColor="border-white"
                    onBtnClick={() => {
                      sendEmailOtpFunction();
                    }}
                  />
                ) : (
                  <></>
                )}
              </Grid>
              {disableEdit.emailValidOtp && (
                <Grid className="d-flex justify-content-start">
                  <SimpleOtpForm
                    otp={emailOtp}
                    setotp={setemailOtp}
                    handleEnter={varifyEmailOtp}
                  />
                </Grid>
              )}
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <Grid container>
              <Grid item xs={10}>
                <InputBox
                  label="Mobile Number"
                  type="number"
                  inputlabelshrink
                  value={customerDetails?.mobileNumber}
                  disabled={!disableEdit.phone}
                  onInputChange={(e) => {
                    if (e.target.value.length <= 10) {
                      setcustomerDetails((pre) => ({
                        ...pre,
                        mobileNumber: e.target.value,
                      }));
                      setErrorObj({
                        ...ErrorObj,
                        mobileNumber: "",
                      });
                    } else {
                      setcustomerDetails((pre) => ({
                        ...pre,
                        mobileNumber: e.target.value,
                      }));
                      setErrorObj({
                        ...ErrorObj,
                        mobileNumber: validateMessage.mobile,
                      });
                    }
                    if (
                      CustomerStaticDetails?.mobileNumber !== e.target.value
                    ) {
                      setdisableEdit({ ...disableEdit, phoneOtp: true });
                    } else {
                      setdisableEdit({ ...disableEdit, phoneOtp: false });
                    }
                  }}
                  error={ErrorObj.mobileNumber}
                  helperText={ErrorObj.mobileNumber}
                />
              </Grid>
              <Grid item xs={2} display="flex" alignItems="center">
                {!disableEdit.phoneOtp &&
                customerDetails?.mobileNumber?.length === 10 ? (
                  <CustomIcon
                    type="edit"
                    title="Edit"
                    className="ms-2 fs-18"
                    onIconClick={() => {
                      setdisableEdit({ ...disableEdit, phone: true });
                    }}
                  />
                ) : (
                  <></>
                )}
              </Grid>
              <Grid>
                {disableEdit.phoneOtp &&
                customerDetails?.mobileNumber?.length === 10 ? (
                  <ButtonComponent
                    type="send"
                    label="Send OTP"
                    variant="outlined"
                    className="ms-2 fs-18"
                    borderColor="border-white"
                    onBtnClick={() => {
                      getOtpFunction();
                    }}
                  />
                ) : (
                  <></>
                )}
              </Grid>

              {disableEdit.validOtp && (
                <Grid className="d-flex justify-content-start">
                  <SimpleOtpForm
                    otp={otp}
                    setotp={setotp}
                    handleEnter={varifyMobileOtpFunction}
                    OtpInputStyle="shadow-none px-2"
                  />
                </Grid>
              )}
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
            onRadioChange={() => {
              setcustomerDetails({
                ...customerDetails,
                gender: "Others",
              });
            }}
          />
        </Box>

        {!disableEdit.phone && !disableEdit.emailId && (
          <ButtonComponent
            label="Update Profile"
            onBtnClick={() => {
              updateProfileFunction();
            }}
          />
        )}
      </Box>
    </div>
  );
};

export default MyProfile;
