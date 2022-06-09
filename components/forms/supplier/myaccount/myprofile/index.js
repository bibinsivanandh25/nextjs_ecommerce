import { Grid } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import validationRegex from "services/utils/regexUtils";
import SimpleDropdownComponent from "components/atoms/SimpleDropdownComponent";
import CustomIcon from "services/iconUtils";
import validateMessage from "constants/validateMessages";
import avatar from "../../../../../public/assets/images/man.png";
import InputBox from "@/atoms/InputBoxComponent";
import ButtonComponent from "@/atoms/ButtonComponent";

const formObj = {
  businessName: "",
  mail: "",
  mobile: "",
  city: null,
  mainCat: null,
  gstin: "",
  stockCount: "",
  site: "",
  siteLink: "",
  firstName: "",
  lastName: "",
};

const MyProfile = () => {
  const [formValues, setFormValues] = useState({
    businessName: "",
    mail: "",
    mobile: "",
    city: null,
    mainCat: null,
    gstin: "",
    stockCount: "",
    site: "",
    siteLink: "",
    firstName: "",
    lastName: "",
  });
  const [errorObj, setErrorObj] = useState({ ...formObj });
  const [showUpdate, setShowUpdate] = useState(false);

  const validateForm = () => {
    let flag = false;
    const errObj = { ...formObj };
    if (formValues.firstName === "") {
      errObj.firstName = validateMessage.field_required;
      flag = true;
    } else if (formValues.firstName.length > 50) {
      flag = true;
      errObj.firstName = validateMessage.alpha_numeric_max_50;
    }
    if (formValues.lastName === "") {
      flag = true;
      errObj.lastName = validateMessage.field_required;
    } else if (formValues.lastName.length > 50) {
      flag = true;
      errObj.lastName = validateMessage.alpha_numeric_max_50;
    }
    if (formValues.businessName === "") {
      flag = true;
      errObj.businessName = validateMessage.field_required;
    } else if (formValues.businessName.length > 60) {
      flag = true;
      errObj.businessName = validateMessage.alpha_numeric_max_60;
    }
    if (formValues.mail === "") {
      flag = true;
      errObj.mail = validateMessage.field_required;
    } else if (!validationRegex.email.test(formValues.mail)) {
      flag = true;
      errObj.mail = validateMessage.email;
    }
    if (formValues.mobile === "") {
      flag = true;
      errObj.mobile = validateMessage.field_required;
    } else if (!validationRegex.mobile.test(formValues.mobile)) {
      flag = true;
      errObj.mobile = validateMessage.mobile;
    }
    if (formValues.gstin === "") {
      flag = true;
      errObj.gstin = validateMessage.field_required;
    } else if (formValues.gstin.length !== 15) {
      flag = true;
      errObj.gstin = "Gstin number should be of length 15";
    }

    if (formValues.city === null) {
      flag = true;
      errObj.city = validateMessage.field_required;
    }
    if (formValues.mainCat === null) {
      flag = true;
      errObj.mainCat = validateMessage.field_required;
    }
    setErrorObj({ ...errObj });
    if (!flag) {
      setShowUpdate(false);
    }
    return flag;
  };
  return (
    <div>
      <div className="mt-4 d-flex align-items-center">
        <div>
          <Image src={avatar} height={100} to width={100} />
        </div>
        <div className="mx-3 d-flex flex-column">
          <div>
            {" "}
            <span className="fs-20 fw-bold">Business Name </span>
            {!showUpdate ? (
              <CustomIcon
                type="edit"
                title="Edit"
                className="fs-5"
                onIconClick={() => setShowUpdate(true)}
              />
            ) : null}
          </div>
          <span>user@gmail.com</span>
        </div>
      </div>
      {showUpdate ? (
        <div className="my-2">
          <p className="fw-bold pb-3">Update your profile</p>
          <Grid container spacing={2}>
            <Grid item md={6} sm={12}>
              <InputBox
                placeholder="Enter First Name"
                value={formValues.firstName}
                label="First Name"
                className="w-100"
                size="small"
                onInputChange={(e) => {
                  setFormValues((prev) => ({
                    ...prev,
                    firstName: e.target.value,
                  }));
                }}
                inputlabelshrink
                helperText={errorObj.firstName}
                error={errorObj.firstName !== ""}
              />
            </Grid>
            <Grid item md={6} sm={12}>
              <InputBox
                placeholder="Enter Last Name"
                value={formValues.lastName}
                label="Last Name"
                className="w-100"
                size="small"
                onInputChange={(e) => {
                  setFormValues((prev) => ({
                    ...prev,
                    lastName: e.target.value,
                  }));
                }}
                inputlabelshrink
                helperText={errorObj.lastName}
                error={errorObj.lastName !== ""}
              />
            </Grid>
            <Grid item md={6} sm={12}>
              <InputBox
                placeholder="Enter your Business Name"
                value={formValues.businessName}
                label="Business Name"
                className="w-100"
                size="small"
                onInputChange={(e) => {
                  setFormValues((prev) => ({
                    ...prev,
                    businessName: e.target.value,
                  }));
                }}
                inputlabelshrink
                helperText={errorObj.businessName}
                error={errorObj.businessName !== ""}
              />
            </Grid>
            <Grid item md={6} sm={12}>
              <InputBox
                placeholder="Enter your E-mail ID"
                value={formValues.mail}
                label="E-mail ID"
                className="w-100"
                size="small"
                onInputChange={(e) => {
                  setFormValues((prev) => ({
                    ...prev,
                    mail: e.target.value,
                  }));
                }}
                inputlabelshrink
                helperText={errorObj.mail}
                error={errorObj.mail !== ""}
              />
            </Grid>
            <Grid item md={6} sm={12}>
              <InputBox
                placeholder="Enter your Mobile Number"
                value={formValues.mobile}
                label="Mobile Number"
                className="w-100"
                size="small"
                onInputChange={(e) => {
                  setFormValues((prev) => ({
                    ...prev,
                    mobile: e.target.value,
                  }));
                }}
                inputlabelshrink
                helperText={errorObj.mobile}
                error={errorObj.mobile !== ""}
              />
            </Grid>
            <Grid item md={6} sm={12}>
              <SimpleDropdownComponent
                list={[
                  { label: "Bangalore", value: "Bangalore", id: 1 },
                  { label: "Mysore", value: "Mysore", id: 3 },
                ]}
                label="Choose City"
                onDropdownSelect={(value) => {
                  setFormValues((prev) => ({
                    ...prev,
                    city: value,
                  }));
                }}
                value={formValues.city}
                size="small"
                helperText={errorObj.city}
              />
            </Grid>
            <Grid item md={6} sm={12}>
              {/* <InputBox
          placeholder="Choose your Main Category"
          value={formValues.mainCat}
          label="Select Main Category"
          className="w-100"
          size="small"
          onInputChange={(e) => {
            setFormValues((prev) => ({
              ...prev,
              mainCat: e.target.value,
            }));
          }}
        /> */}
              <SimpleDropdownComponent
                list={[
                  { label: "Women", value: "women", id: 1 },
                  { label: "Watch", value: "watch", id: 3 },
                ]}
                label="Select Main Category"
                onDropdownSelect={(value) => {
                  setFormValues((prev) => ({
                    ...prev,
                    mainCat: value,
                  }));
                }}
                value={formValues.mainCat}
                size="small"
                helperText={errorObj.mainCat}
              />
            </Grid>
            <Grid item md={6} sm={12}>
              <InputBox
                placeholder="Enter your GSTIN"
                value={formValues.gstin}
                label="GSTIN"
                className="w-100"
                size="small"
                onInputChange={(e) => {
                  setFormValues((prev) => ({
                    ...prev,
                    gstin: e.target.value,
                  }));
                }}
                inputlabelshrink
                helperText={errorObj.gstin}
                error={errorObj.gstin !== ""}
              />
            </Grid>
          </Grid>
          <Grid className="mt-2">
            <ButtonComponent
              label="Update profile"
              onBtnClick={() => {
                validateForm();
              }}
            />
          </Grid>
        </div>
      ) : null}
    </div>
  );
};

export default MyProfile;
