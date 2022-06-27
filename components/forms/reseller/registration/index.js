/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-prototype-builtins */
import { Grid } from "@mui/material";
import ButtonComponent from "components/atoms/ButtonComponent";
import InputBox from "components/atoms/InputBoxComponent";
import SimpleDropdownComponent from "components/atoms/SimpleDropdownComponent";
import OtpForm from "components/forms/auth/OtpForm";
import validateMessage from "constants/validateMessages";
import { useState } from "react";
import validationRegex from "services/utils/regexUtils";

const RegistrationForm = ({
  formValues = {},
  handleSubmit = () => {},
  setFormValues = () => {},
  displayType = "referral",
  setDisplayType = () => {},
}) => {
  const [otp, setotp] = useState("xxxx");
  const [error, setError] = useState({});

  const handleSubmitBtnClick = () => {
    if (formValues.referralCode) {
      handleSubmit();
      setError({ referralCode: null });
    } else {
      setError({ referralCode: validateMessage.field_required });
    }
  };

  const inputFields = [
    {
      label: "Full Name",
      placeholder: "Enter your Full Name",
      id: "fullName",
      value: null,
      required: true,
      validation: /^.{1,50}$/,
      errorMessage: validateMessage.alpha_numeric_max_50,
    },
    {
      label: "E - mail ID",
      placeholder: "Enter your E - mail ID",
      id: "emailId",
      value: null,
      required: true,
      validation: /^.{1,50}$/,
      errorMessage: validateMessage.alpha_numeric_max_50,
    },
    {
      label: "Mobile Number",
      id: "mobileNumber",
      placeholder: "Enter your Mobile Number",
      value: null,
      required: true,
      // validation: /^(\+\d{1,3})?(\d{3}-){2}\d{4}(\/\d{3,4})?$/,
      errorMessage: validateMessage.mobile,
      validation: validationRegex.mobile,
    },
    {
      label: "Gender",
      id: "gender",
      placeholder: "Enter your Gender",
      value: null,
      type: "dropdown",
      options: [
        { id: "female", label: "Female" },
        {
          id: "male",
          label: "Male",
        },
      ],
      required: true,
    },
    {
      label: "Language Spoken",
      id: "language",
      placeholder: "Choose Language",
      value: null,
      type: "dropdown",
      options: [
        {
          id: "english",
          label: "English",
        },
        { id: "hindi", label: "Hindi" },
      ],
      required: true,
    },
    {
      label: "Occupation",
      placeholder: "eg: Home maker",
      id: "address",
      value: null,
      required: true,
      validation: /^.{1,255}$/,
      errorMessage: validateMessage.alpha_numeric_max_255,
    },
    {
      label: "Door No.",
      id: "doorNo",
      value: null,
      required: true,
      validation: /^.{1,50}$/,
      errorMessage: validateMessage.alpha_numeric_max_50,
    },
    {
      label: "Area, street, sector, village",
      id: "area",
      value: null,
      required: true,
      validation: /^.{1,65}$/,
      errorMessage: validateMessage.alpha_numeric_max_65,
    },
    {
      label: "City",
      id: "landmark",
      value: null,
      type: "dropdown",
      options: [
        {
          id: "bangalore",
          label: "Bangalore",
        },
        { id: "mysuru", label: "Mysuru" },
      ],
      required: true,
    },
    {
      label: "State",
      id: "state",
      value: null,
      required: true,
      options: [
        {
          id: "karnataka",
          label: "Karnataka",
        },
        { id: "delhi", label: "Delhi" },
      ],
    },
    {
      label: "Pin Code",
      id: "pincode",
      value: null,
      required: true,
      validation: /^([a-zA-Z0-9_-]){1,6}$/,
      errorMessage: validateMessage.alpha_numeric_6,
    },
    {
      label: "My Business Name",
      id: "businessName",
      value: null,
      validation: /^.{1,100}$/,
      required: true,
      errorMessage: validateMessage.alpha_numeric_max_100,
    },
  ];

  const validateForm = () => {
    const errObj = { ...error };
    inputFields.forEach((el) => {
      if (el.hasOwnProperty("required") && !formValues[el.id]) {
        errObj[el.id] = validateMessage.field_required;
      } else if (
        el.hasOwnProperty("validation") &&
        formValues[el.id] &&
        !el.validation.test(formValues[el.id])
      ) {
        errObj[el.id] = el.errorMessage;
      } else {
        errObj[el.id] = null;
      }
    });

    setError({ ...errObj });
    let valid = true;
    Object.values(errObj).forEach((i) => {
      if (i) {
        valid = false;
      }
    });
    return valid;
  };

  const handleInputChange = (val, ele) => {
    const getData = () => {
      if (ele.type === "dropdown") {
        return val ? val.id : null;
      }
      return val;
    };
    setFormValues((prev) => {
      return {
        ...prev,
        [ele.id]: getData(),
      };
    });
  };

  return (
    <div className="w-70p h-100 d-flex justify-content-center">
      {displayType === "referral" && (
        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
          className="mt-5"
        >
          <Grid item xs={12}>
            <p className="color-orange d-flex justify-content-center fw-600 mb-2">
              Already have a referral code? You have more chance to win
              Prize&apos;s & Discounts.
            </p>
          </Grid>
          <Grid item md={6} sm={12}>
            <InputBox
              placeholder="eg: KOPLSD1242D"
              value={formValues.referralCode}
              label="Enter Your Referral Code"
              className="w-100"
              size="small"
              onInputChange={(e) => {
                setFormValues((prev) => ({
                  ...prev,
                  referralCode: e.target.value,
                }));
              }}
              inputlabelshrink
              helperText={error.referralCode}
              error={Boolean(error.referralCode)}
            />
          </Grid>
          <Grid
            item
            md={12}
            justifyContent="center"
            container
            sx={{ ml: 30 }}
            className="fs-14 fw-600"
          >
            Don&apos;t have a referral Code?{" "}
            <p
              className="color-orange ms-2 cursor-pointer"
              onClick={() => setDisplayType("registration")}
              style={{
                textDecoration: "underline",
              }}
            >
              Click here
            </p>
          </Grid>
          <Grid item md={12} container justifyContent="center">
            <ButtonComponent label="Submit" onBtnClick={handleSubmitBtnClick} />
          </Grid>
        </Grid>
      )}
      {displayType === "registration" && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <span
              className="h-5 color-orange cursor-pointer"
              onClick={() => {
                setDisplayType("referral");
              }}
            >
              {"<"}Back
            </span>
          </Grid>
          {inputFields.map((field) => (
            <Grid
              item
              lg={field?.size || 6}
              md={12}
              xs={12}
              key={field.id}
              className="mt-3"
            >
              {field.type === "dropdown" ? (
                <SimpleDropdownComponent
                  id={field.id}
                  size="small"
                  list={field.options}
                  label={field.label}
                  value={field.options.find(
                    (op) => op.id === formValues[field.id]
                  )}
                  onDropdownSelect={(val) => handleInputChange(val, field)}
                  helperText={error[field.id]}
                />
              ) : (
                <InputBox
                  value={formValues[field.id] || ""}
                  label={field.label}
                  className="w-100"
                  size="small"
                  id={field.id}
                  name={field.id}
                  onInputChange={(e) =>
                    handleInputChange(e.target.value, field)
                  }
                  error={Boolean(error[field.id])}
                  helperText={error[field.id]}
                  inputlabelshrink={field.placeholder}
                  placeholder={field.placeholder}
                />
              )}
            </Grid>
          ))}
          <Grid item md={12}>
            <div className="d-flex flex-row-reverse mt-4 mb-2">
              <ButtonComponent
                label="Register"
                onBtnClick={() => {
                  if (validateForm()) handleSubmit();
                }}
              />
            </div>
          </Grid>
        </Grid>
      )}
      {displayType === "otp" && (
        <div className="d-flex flex-column justify-content-center">
          <OtpForm otp={otp} setotp={setotp} />
          <div className="w-100 d-flex flex-column align-items-center">
            <ButtonComponent
              label="Submit"
              onBtnClick={handleSubmit}
              muiProps="w-60p"
            />
            <span className="color-orange fs-12 mt-2 cursor-pointer">
              Resend OTP
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;
