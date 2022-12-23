/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import ButtonComponent from "components/atoms/ButtonComponent";
import InputBox from "components/atoms/InputBoxComponent";
import OtpForm from "components/forms/auth/OtpForm";
import AuthLayout from "components/organism/Layout/AuthLayout";
import validateMessage from "constants/validateMessages";
import {
  getCsrfToken,
  getProviders,
  getSession,
  signIn,
} from "next-auth/react";
import { useEffect, useState } from "react";
import validationRegex from "services/utils/regexUtils";
import atob from "atob";
import toastify from "services/utils/toastUtils";
import { useRouter } from "next/router";
import serviceUtil from "services/utils";
import { getStoreByStoreCode } from "services/customer/ShopNow";
import { useDispatch } from "react-redux";
import { storeUserInfo } from "features/customerSlice";
import { getCustomerById } from "services/customer/auth";
import { storeUserInfo as userCustomerInfo } from "features/userSlice";

// import { getSupplierDetailsById } from "services/supplier";
// import { storeUserInfo } from "features/userSlice";
// import { store } from "store";

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

  const dispatch = useDispatch();

  const route = useRouter();
  const storedatatoRedux = async (storeCode, customerID, email, details) => {
    const { data, err } = await getStoreByStoreCode(storeCode);
    if (data) {
      const userInfo = {
        userId: customerID,
        supplierId: data?.supplierId,
        supplierStoreLogo: data?.supplierStoreLogo,
        supplierStoreName: data?.supplierStoreName,
        storeCode: data?.supplierStoreCode,
        storeThemes: data?.storeThemes,
        shopDescription: data?.shopDescription,
        shopDescriptionImageUrl: data?.shopDescriptionImageUrl,
        role: "CUSTOMER",
        emailId: email,
        profileImg: details.profileImage,
        gender: details.gender,
        mobileNumber: details.mobileNumber,
        addressDetails: details.addressDetails,
        customerName: details.customerName,
        profileId: details.profileId,
      };
      dispatch(storeUserInfo(userInfo));
      dispatch(
        userCustomerInfo({
          userId: customerID,
          supplierId: data?.supplierId,
          role: "CUSTOMER",
          emailId: email,
        })
      );
    }
    if (err) {
      toastify(err.response?.data?.message, "error");
    }
  };
  const getDetails = async (id) => {
    const { data } = await getCustomerById(id);
    if (data) {
      return data;
    }
    return null;
  };

  const handleSubmit = async () => {
    const formdata = new FormData();
    formdata.append("userName", user);
    formdata.append("userType", "CUSTOMER");
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
        role: "CUSTOMER",
        token,
        callbackUrl: `/customer/home`,
        redirect: false,
      });
      if (res?.error) {
        toastify("Invalid credentials", "error");
        return null;
      }
      const details = await getDetails(userData[0]);
      if (details) {
        route.push(`/customer/home`);
        await storedatatoRedux(
          data?.data?.defaultStoreCode,
          userData[0],
          userData[1],
          details
        );
      }
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
      formdata.append("userType", "CUSTOMER");
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
              <OtpForm otp={otp} setotp={setotp} handleEnter={handleSubmit} />
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
export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });
  if (session) {
    const { role } = session.user;
    if (role === "CUSTOMER") {
      return {
        redirect: { destination: "/customer/home" },
      };
    }
  }

  return {
    props: {
      providers: await getProviders(context),
      csrfToken: (await getCsrfToken(context)) || null,
    },
  };
}
