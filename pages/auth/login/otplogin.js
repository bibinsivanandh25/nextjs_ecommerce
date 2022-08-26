/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import axios from "axios";
import ButtonComponent from "components/atoms/ButtonComponent";
import InputBox from "components/atoms/InputBoxComponent";
import OtpForm from "components/forms/auth/OtpForm";
import AuthLayout from "components/organism/Layout/AuthLayout";
import validateMessage from "constants/validateMessages";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import validationRegex from "services/utils/regexUtils";
import atob from "atob";
import toastify from "services/utils/toastUtils";
import { useRouter } from "next/router";
import serviceUtil from "services/utils";
// import styles from "./Login.module.css";

const OtpLogIn = () => {
  const [otp, setotp] = useState("xxxx");
  const [user, setUser] = useState("");
  const [submited, setSubmitted] = useState(false);
  // const router = useRouter();
  const [error, setError] = useState();

  useEffect(() => {
    return () => {
      setotp("xxxx");
    };
  }, []);

  const route = useRouter();

  const handleSubmit = async () => {
    const formdata = new FormData();
    formdata.append("userName", user);
    formdata.append("userType", "SUPPLIER");
    formdata.append("otp", otp);
    const data = await serviceUtil
      .post(`users/registration/verify-login-otp`, formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .catch((err) => {
        toastify(err?.response?.data?.message, "error");
      });
    if (data?.data) {
      const { token } = data.data;
      const decoded = JSON.parse(atob(token.split(".")[1].toString()));
      const userData = decoded.sub.split(",");
      const res = await signIn("credentials", {
        id: userData[0],
        email: userData[1],
        role: decoded.roles[0],
        token,
        callbackUrl: `/supplier/dashboard`,
        redirect: false,
      });
      if (res?.error) {
        toastify("Invalid credentials", "error");
        return null;
      }
      route.push(`/supplier/dashboard`);
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
      const formdata = new FormData();
      formdata.append("userName", user);
      formdata.append("userType", "SUPPLIER");
      await serviceUtil
        .post(`users/registration/forgot-password/send-otp`, formdata, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((data) => {
          if (data) {
            setSubmitted(true);
          }
        })
        .catch((err) => {
          toastify(err.response.data.message, "error");
        });
    }
  };

  return (
    <AuthLayout title={submited ? "Enter OTP" : "Login through OTP"}>
      <div className="d-flex flex-column justify-content-center">
        <div style={{ width: "400px" }}>
          {submited ? (
            <>
              <OtpForm otp={otp} setotp={setotp} />
              <div className="w-100 d-flex flex-column align-items-center">
                <ButtonComponent
                  label="Login"
                  onBtnClick={handleSubmit}
                  muiProps="w-30p "
                />
                <span
                  className="color-orange fs-12 mt-2 cursor-pointer"
                  onClick={sendOTPclick}
                >
                  Resend OTP
                </span>
                <span
                  className="color-orange fs-12 mt-2 cursor-pointer"
                  onClick={() => {
                    setSubmitted(false);
                    setotp("xxxx");
                  }}
                >
                  Wrong Number
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
