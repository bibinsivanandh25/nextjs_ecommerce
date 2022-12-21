/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import ModalComponent from "@/atoms/ModalComponent";
import { Box, Typography } from "@mui/material";
import ButtonComponent from "components/atoms/ButtonComponent";
import OtpForm from "components/forms/auth/OtpForm";
import AuthLayout from "components/organism/Layout/AuthLayout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { registerCustomer } from "services/customer/auth";
import serviceUtil from "services/utils";
import toastify from "services/utils/toastUtils";

const VerifyOTP = ({
  payLoad = {},
  setShowVerifyOTP = () => {},
  setShowModal = () => {},
}) => {
  const [otp, setotp] = useState("xxxx");
  const router = useRouter();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    return () => {
      setotp("xxxx");
    };
  }, []);

  const customerRegistration = async (wished = false) => {
    const { message, registeredUser, err } = await registerCustomer({
      ...payLoad,
      wished,
    });
    if (registeredUser === "NO") {
      toastify(message, "success");
      router.push("/auth/customer/signin");
      setShowVerifyOTP(false);
    }
    if (registeredUser === "YES") {
      setShowConfirmModal(true);
    }
    if (err) {
      toastify(err?.response?.data?.message, "error");
      setShowVerifyOTP(false);
    }
  };
  const handleSubmit = async () => {
    if (otp.includes("x")) {
      toastify("Invalid OTP", "error");
    } else {
      const formData = new FormData();
      formData.append("userName", payLoad.mobileNumber);
      formData.append("otp", otp);
      const config = {
        headers: { "content-type": "multipart/form-data" },
      };
      await serviceUtil
        .post(`users/registration/verify-otp`, formData, config)
        .then(async (data) => {
          if (data) {
            if (router.pathname.split("/")[2].toUpperCase() === "SUPPLIER") {
              await serviceUtil
                .post(`users/supplier/register-supplier`, {
                  ...payLoad,
                })
                .then((res) => {
                  if (res) {
                    // setShowVerifyOTP(false);
                    setShowModal(true);
                  }
                })
                .catch((errRes) => {
                  toastify(errRes.response.data.message, "error");
                  setShowVerifyOTP(false);
                });
            } else if (
              router.pathname.split("/")[2].toUpperCase() === "CUSTOMER"
            ) {
              customerRegistration(false);
            }
          }
          return null;
        })
        .catch((err) => {
          toastify(err.response.data.message, "error");
        });
    }
  };

  const resendOTP = async () => {
    setotp("xxxx");
    await serviceUtil.post(
      `users/registration/send-otp/?mobileNumber=${
        payLoad.mobileNumber
      }&userType=${router.pathname.split("/")[2].toUpperCase()}`
    );
  };

  return (
    <AuthLayout title="Enter OTP">
      <div className="d-flex flex-column justify-content-center">
        <div style={{ width: "400px" }}>
          <OtpForm otp={otp} setotp={setotp} handleEnter={handleSubmit} />
          <div className="w-100 d-flex flex-column align-items-center">
            <ButtonComponent
              label="Verify OTP"
              onBtnClick={handleSubmit}
              muiProps="w-30p "
            />
            <span
              className="color-orange fs-12 mt-2 cursor-pointer"
              onClick={resendOTP}
            >
              Resend OTP
            </span>
          </div>
        </div>
      </div>
      {showConfirmModal ? (
        <ModalComponent
          headerClassName="d-none"
          open={showConfirmModal}
          showCloseIcon={false}
          ModalTitle=""
          footerClassName="d-none"
          ModalWidth="60%"
          minHeightClassName="mnh-200"
        >
          <Box className="mt-5 mb-1">
            <Typography className="text-center mb-5">
              Account Already Exist For Supplier, Do You Wish To Continue?
            </Typography>
            <Box className="d-flex justify-content-center align-items-center">
              <ButtonComponent
                label="No"
                muiProps="me-3"
                variant="outlined"
                onBtnClick={() => {
                  setShowVerifyOTP(false);
                  setShowConfirmModal(false);
                }}
              />
              <ButtonComponent
                label="Yes"
                onBtnClick={() => {
                  customerRegistration(true);
                }}
              />
            </Box>
          </Box>
        </ModalComponent>
      ) : null}
    </AuthLayout>
  );
};
export default VerifyOTP;
