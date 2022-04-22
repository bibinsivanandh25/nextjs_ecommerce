import { Grid } from "@mui/material";
import ButtonComponent from "components/atoms/ButtonComponent";
import InputBox from "components/atoms/InputBoxComponent";
import OtpForm from "components/forms/auth/OtpForm";
import AuthLayout from "components/organism/Layout/AuthLayout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// import styles from "./Login.module.css";

const OtpLogIn = () => {
  const [otp, setotp] = useState("xxxx");
  const [user, setUser] = useState("");
  const [submited, setSubmitted] = useState(false);
  const router = useRouter();
  useEffect(() => {
    return () => {
      setotp("xxxx");
    };
  }, []);
  useEffect(() => console.log("otp", otp), [otp]);
  const handleSubmit = () => {
    router.push("/");
  };
  const sendOTPclick = () => {
    setSubmitted(true);
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
                  muiProps={"w-30p "}
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
              />

              <div className="w-100 d-flex justify-content-center">
                <ButtonComponent
                  label="Get OTP"
                  onBtnClick={sendOTPclick}
                  muiProps={"w-30p "}
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
