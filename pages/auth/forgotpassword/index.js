/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import ButtonComponent from "components/atoms/ButtonComponent";
import InputBox from "components/atoms/InputBoxComponent";
import OtpForm from "components/forms/auth/OtpForm";
import AuthLayout from "components/organism/Layout/AuthLayout";
import validateMessage from "constants/validateMessages";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getOtp, verifyOtp } from "services";
import validationRegex from "services/utils/regexUtils";
import toastify from "services/utils/toastUtils";
// import styles from "./Login.module.css";

const OtpLogIn = () => {
  const [otp, setotp] = useState("xxxx");
  const [user, setUser] = useState("");
  const [submited, setSubmitted] = useState(false);
  const [error, setError] = useState();
  const router = useRouter();
  useEffect(() => {
    return () => {
      setotp("xxxx");
    };
  }, []);
  const handleSubmit = async () => {
    const formData = {
      userName: user,
      otp,
    };
    if (!otp.includes("x")) {
      const { data, errRes } = await verifyOtp(formData);
      if (data) {
        router.push({
          pathname:
            // eslint-disable-next-line no-nested-ternary
            router.query.role === "SUPPLIER"
              ? "/auth/supplier/newpassword"
              : router.query.role === "CUSTOMER"
              ? "/auth/customer/newpassword"
              : "/auth/admin/newpassword",
          query: { user: btoa(`,${user}`) },
        });
      } else if (errRes) {
        toastify(errRes?.message, "error");
      }
    } else {
      toastify("Please Enter OTP", "error");
    }
  };

  const validateForm = () => {
    let errObj = error;
    const validate = (errMsg, valid1, valid2) => {
      if (!user) {
        errObj = validateMessage.field_required;
      } else if (!valid1.test(user) && !valid2.test(user)) {
        errObj = errMsg;
      } else {
        errObj = null;
      }
    };
    validate(
      validateMessage.userId,
      validationRegex.mobile,
      validationRegex.email
    );

    setError(errObj);
    return Boolean(errObj);
  };
  const sendOTPclick = async () => {
    if (!validateForm()) {
      const formData = new FormData();
      formData.append("userName", user);
      formData.append("userType", router.query.role);
      const { data, errRes } = await getOtp(formData);
      if (data) {
        setSubmitted(true);
        toastify(data.message, "success");
      } else if (errRes) {
        toastify(errRes?.message, "error");
      }
    }
  };

  return (
    <AuthLayout title={submited ? "OTP Verification" : "Forgot Password"}>
      <div className="d-flex flex-column justify-content-center mt-5">
        <div style={{ width: "400px" }}>
          {submited ? (
            <>
              <OtpForm otp={otp} setotp={setotp} handleEnter={handleSubmit} />
              <div className="w-100 d-flex flex-column align-items-center">
                <ButtonComponent
                  label="Submit"
                  onBtnClick={handleSubmit}
                  muiProps="w-30p "
                />
                <span
                  className="color-orange fs-12 mt-2 cursor-pointer"
                  onClick={sendOTPclick}
                >
                  Resend OTP
                </span>
              </div>
            </>
          ) : (
            <>
              <InputBox
                placeholder="Enter your E-mail ID / Mobile Number"
                value={user}
                label="E-mail ID / Mobile Number"
                className="w-100 my-2"
                size="small"
                onInputChange={(e) => {
                  setUser(e.target.value);
                }}
                inputlabelshrink
                error={Boolean(error)}
                helperText={error}
              />

              <div className="w-100 d-flex justify-content-center">
                <ButtonComponent
                  label="Get OTP"
                  onBtnClick={sendOTPclick}
                  muiProps="w-30p "
                />
              </div>
            </>
          )}
        </div>
      </div>
    </AuthLayout>
  );
};
export default OtpLogIn;
