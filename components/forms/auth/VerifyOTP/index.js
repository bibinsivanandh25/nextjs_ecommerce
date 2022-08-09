/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import ButtonComponent from "components/atoms/ButtonComponent";
// import InputBox from "components/atoms/InputBoxComponent";
import OtpForm from "components/forms/auth/OtpForm";
import AuthLayout from "components/organism/Layout/AuthLayout";
// import validateMessage from "constants/validateMessages";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import serviceUtil from "services/utils";
// import validationRegex from "services/utils/regexUtils";
import toastify from "services/utils/toastUtils";
// import styles from "./Login.module.css";

const VerifyOTP = ({
  payLoad = {},
  setShowVerifyOTP = () => {},
  setShowModal = () => {},
}) => {
  const [otp, setotp] = useState("xxxx");
  // const [user, setUser] = useState("");
  // const [submited, setSubmitted] = useState(false);
  const router = useRouter();
  // const [error, setError] = useState();

  useEffect(() => {
    return () => {
      setotp("xxxx");
    };
  }, []);

  const handleSubmit = async () => {
    await serviceUtil
      .post(
        `users/registration/verify-otp?userName=${payLoad.mobileNumber}&otp=${otp}`
      )
      .then(async (data) => {
        if (data) {
          toastify(data.data.message, "success");

          await serviceUtil
            .post("users/supplier/register-supplier", {
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
        console.log(err);
      });
  };

  const resendOTP = async () => {
    setotp(null);
    await serviceUtil.post(
      `users/registration/send-otp/?mobileNumber=${
        payLoad.mobileNumber
      }&userType=${router.pathname.split("/")[2].toUpperCase()}`
    );
  };

  // const validateForm = () => {
  //   let errObj = error;
  //   const validate = (errMsg, valid1, valid2) => {
  //     if (!user) {
  //       errObj = validateMessage.field_required;
  //     } else if (!valid1.test(user) && !valid2.test(user)) {
  //       errObj = errMsg;
  //     } else {
  //       errObj = null;
  //     }
  //   };
  //   validate(
  //     validateMessage.userId,
  //     validationRegex.mobile,
  //     validationRegex.email
  //   );

  //   setError(errObj);
  //   return Boolean(errObj);
  // };

  // const sendOTPclick = () => {
  //   // if (!validateForm()) setSubmitted(true);
  // };

  return (
    <AuthLayout title="Enter OTP">
      <div className="d-flex flex-column justify-content-center">
        <div style={{ width: "400px" }}>
          <OtpForm otp={otp} setotp={setotp} />
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
