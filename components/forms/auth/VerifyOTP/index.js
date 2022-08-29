/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import ButtonComponent from "components/atoms/ButtonComponent";
import OtpForm from "components/forms/auth/OtpForm";
import AuthLayout from "components/organism/Layout/AuthLayout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import serviceUtil from "services/utils";
import toastify from "services/utils/toastUtils";

const VerifyOTP = ({
  payLoad = {},
  setShowVerifyOTP = () => {},
  setShowModal = () => {},
}) => {
  const [otp, setotp] = useState("xxxx");
  const router = useRouter();

  useEffect(() => {
    return () => {
      setotp("xxxx");
    };
  }, []);

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
            toastify(data.data.message, "success");
            await serviceUtil
              .post(`users/supplier/register-supplier`, {
                ...payLoad,
              })
              .then((res) => {
                if (res) {
                  setShowVerifyOTP(false);
                  setShowModal(true);
                }
              })
              .catch((errRes) => {
                toastify(errRes.response.data.message, "error");
                setShowVerifyOTP(false);
              });
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
    </AuthLayout>
  );
};
export default VerifyOTP;
