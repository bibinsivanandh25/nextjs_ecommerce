import ButtonComponent from "components/atoms/ButtonComponent";
import InputBox from "components/atoms/InputBoxComponent";
import OtpForm from "components/forms/auth/OtpForm";
import AuthLayout from "components/organism/Layout/AuthLayout";
import validateMessage from "constants/validateMessages";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import validationRegex from "services/utils/regexUtils";
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
  const handleSubmit = () => {
    router.push("/auth/supplier/newpassword");
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

  const sendOTPclick = () => {
    if (!validateForm()) setSubmitted(true);
  };

  return (
    <AuthLayout title={submited ? "OTP Verification" : "Forgot Password"}>
      <div className="d-flex flex-column justify-content-center mt-5">
        <div style={{ width: "400px" }}>
          {submited ? (
            <>
              <OtpForm otp={otp} setotp={setotp} />
              <div className="w-100 d-flex flex-column align-items-center">
                <ButtonComponent
                  label="Submit"
                  onBtnClick={handleSubmit}
                  muiProps="w-30p "
                />
                <span className="color-orange fs-12 mt-2 cursor-pointer">
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
