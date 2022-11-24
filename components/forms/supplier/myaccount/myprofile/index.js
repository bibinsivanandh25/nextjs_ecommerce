import { Avatar, Badge, Grid, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import validationRegex from "services/utils/regexUtils";
import SimpleDropdownComponent from "components/atoms/SimpleDropdownComponent";
import CustomIcon from "services/iconUtils";
import validateMessage from "constants/validateMessages";
import {
  getMainCategories,
  getSupplierDetailsBySupplierId,
  updateSupplierProfile,
  UpdateProfilePicture,
  sendOTP,
} from "services/supplier/myaccount/myprofile";
import { useUserInfo } from "services/hooks";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useDispatch, useSelector } from "react-redux";
import { storeUserInfo } from "features/userSlice";
import toastify from "services/utils/toastUtils";
import { verifyOtp } from "services";
import InputBox from "@/atoms/InputBoxComponent";
import ButtonComponent from "@/atoms/ButtonComponent";
import MultiSelectComponent from "@/atoms/MultiSelectComponent";
import CheckBoxComponent from "@/atoms/CheckboxComponent";
import RadiobuttonComponent from "@/atoms/RadiobuttonComponent";
import OtpForm from "@/forms/auth/OtpForm";
import { City } from "country-state-city";

const formObj = {
  businessName: "",
  mail: "",
  mobile: "",
  city: null,
  mainCat: null,
  gstin: "",
  stockCount: "",
  site: [],
  siteLink: "",
  firstName: "",
  lastName: "",
  approved: false,
};

const MyProfile = () => {
  const [formValues, setFormValues] = useState({
    businessName: "",
    mail: "",
    mobile: "",
    city: null,
    mainCat: [],
    gstin: "",
    stockCount: "",
    site: [],
    siteLink: "",
    firstName: "",
    lastName: "",
    approved: false,
    supplierReferralCode: "",
  });
  const [errorObj, setErrorObj] = useState({ ...formObj });
  const [showUpdate, setShowUpdate] = useState(false);
  const [mainCategories, setMainCategories] = useState([]);
  const [profileImage, setProfileImage] = useState();
  const [selectedMainCategoryIds, setSelectedMainCategoryIds] = useState([]);
  const [supplierMobileNumber, setSupplierMobileNumber] = useState(null);
  const [otp, setotp] = useState("xxxx");
  const [showVerifyOtp, setShowVerifyOtp] = useState(false);
  const dispatch = useDispatch();

  const cities = City.getCitiesOfCountry("IN");

  const citiesList = cities.map((ele) => ({
    label: ele.name,
    value: ele.name,
    id: ele.name,
  }));
  const user = useSelector((state) => {
    return state.user;
  });

  const profilePicRef = useRef(null);
  useEffect(() => {
    return () => {
      setShowVerifyOtp(false);
      setotp("xxxx");
    };
  }, []);

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
    if (!formValues.mainCat.length) {
      flag = true;
      errObj.mainCat = validateMessage.field_required;
    }
    setErrorObj({ ...errObj });
    if (!flag) {
      setShowUpdate(false);
    }
    return flag;
  };

  const { id } = useUserInfo();

  const getSupplierDetails = async () => {
    const { data } = await getSupplierDetailsBySupplierId(id);
    if (data) {
      setFormValues((pre) => ({
        ...pre,
        businessName: data.businessName,
        mail: data.emailId,
        mobile: data.mobileNumber,
        city: {
          id: data.city,
          label: data.city,
          value: data.city,
        },
        gstin: data.gstin,
        stockCount: data.avgStockCount,
        site: data.websiteName,
        siteLink: data.websiteLink,
        firstName: data.firstName,
        lastName: data.lastName,
        approved: data.accountVerified,
        profileImage: data.profileImageUrl,
        supplierReferralCode: data.supplierReferralCode,
      }));
      setSelectedMainCategoryIds(data.mainCategories);
      setProfileImage(data.profileImageUrl);
      setSupplierMobileNumber(data.mobileNumber);
      const supplierDetails = {
        emailId: data.emailId,
        firstName: data.firstName,
        lastName: data.lastName,
        profileImageUrl: data.profileImageUrl,
        supplierId: data.supplierId,
        storeCode: data?.supplierStoreInfo?.supplierStoreCode || "",
        isAddressSaved: data.userAddressDetails.length,
      };
      dispatch(storeUserInfo(supplierDetails));
    }
  };

  const updateProfile = async () => {
    const payload = {
      supplierId: user.supplierId,
      businessName: formValues.businessName,
      emailId: formValues.mail,
      mobileNumber: formValues.mobile,
      gstin: formValues.gstin,
      avgStockCount: formValues.stockCount,
      mainCategories: formValues.mainCat.map((ele) => ele.id),
      websiteName: formValues.site,
      profileImageUrl: profileImage,
      websiteLink: formValues.siteLink,
      city: formValues.city?.value,
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      supplierReferralCode: formValues.supplierReferralCode,
      wished: true,
    };
    const { data, err } = await updateSupplierProfile(payload);
    if (data) {
      toastify(data.message, "success");
      setShowVerifyOtp(false);
      getSupplierDetails();
    } else if (err) {
      // console.log(err.response);
    }
  };

  const handleUpdateProfile = async () => {
    const flag = validateForm();
    if (!flag) {
      if (supplierMobileNumber === formValues.mobile) {
        updateProfile();
      } else {
        const { data, err } = await sendOTP(formValues.mobile);
        if (data) {
          // console.log(data);
          setShowVerifyOtp(true);
        } else if (err) {
          toastify(err.response.data.message);
        }
      }
    }
  };

  const getSupplierMainCategories = () => {
    const result = [];
    selectedMainCategoryIds.forEach((ele) => {
      mainCategories.forEach((item) => {
        if (ele === item.id) {
          result.push(item);
        }
      });
    });
    setFormValues((pre) => ({
      ...pre,
      mainCat: [...result],
    }));
  };

  useEffect(() => {
    getSupplierMainCategories();
  }, [mainCategories, selectedMainCategoryIds]);

  const getMainCategory = async () => {
    const { data } = await getMainCategories();
    if (data) {
      const result = [];
      data.forEach((category) => {
        result.push({
          title: category.mainCategoryName,
          value: category.mainCategoryName,
          id: category.mainCategoryId,
        });
      });
      setMainCategories([...result]);
    }
  };
  useEffect(() => {
    getSupplierDetails();
    getMainCategory();
  }, []);

  const fileUpload = async (e) => {
    if (e.target.files[0]) {
      // binary = await getBase64(e.target.files[0]);
      const formData = new FormData();
      // formData.append("data", {});
      formData.append("profileImage", e.target.files[0]);
      formData.append("supplierId", user.supplierId);

      const { data, err } = await UpdateProfilePicture(formData, {
        headers: { "content-type": "multipart/form-data" },
      });
      if (data) {
        setProfileImage(data?.data);
      } else if (err) {
        // console.log(err?.response?.data?.message);
      }
    }
  };

  return (
    <div className="mnh-70vh mxh-80vh overflow-auto hide-scrollbar bg-white rounded px-4">
      {!showVerifyOtp ? (
        <div>
          {" "}
          <div className="mt-4 d-flex align-items-center">
            <div>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={
                  <Avatar
                    className={`bg-white shadow cursor-pointer ${
                      showUpdate ? "" : "d-none"
                    }`}
                    onClick={() => {
                      profilePicRef.current.click();
                    }}
                  >
                    <CameraAltIcon className="color-black" />
                  </Avatar>
                }
              >
                <Avatar
                  src={profileImage}
                  sx={{
                    height: 100,
                    width: 100,
                  }}
                />
              </Badge>

              <input
                type="file"
                hidden
                ref={profilePicRef}
                onChange={async (e) => {
                  fileUpload(e);

                  let binary;
                  setProfileImage(binary);
                }}
              />
            </div>
            <div className="mx-3 d-flex flex-column">
              <div className="d-flex align-items-center">
                <span className="fs-20 fw-bold">{formValues.businessName}</span>
                <CustomIcon
                  type={!showUpdate ? "edit" : "close"}
                  title={!showUpdate ? "Edit" : "Close"}
                  className="fs-18 mx-2"
                  onIconClick={() => setShowUpdate(!showUpdate)}
                />
              </div>
              <span>{formValues.mail}</span>
            </div>
          </div>
          {/* {showUpdate ? ( */}
          <div className="m-2">
            <p className="fw-bold pb-3">Update your profile</p>
            <Grid container spacing={2}>
              <Grid item md={6} sm={12}>
                <InputBox
                  disabled
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
                  disabled
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
                  disabled={!showUpdate}
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
                  disabled={!showUpdate}
                  list={[...citiesList]}
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
                <MultiSelectComponent
                  disabled={!showUpdate}
                  required
                  list={[...mainCategories]}
                  label="Select Main Category"
                  onSelectionChange={(e, val) => {
                    setFormValues((prev) => ({
                      ...prev,
                      mainCat: [...val],
                    }));
                  }}
                  value={formValues.mainCat}
                  size="small"
                  helperText={errorObj.mainCat}
                  error={errorObj?.mainCat}
                  placeholder="Select Main Category"
                />
              </Grid>
              <Grid item md={6} sm={12}>
                <InputBox
                  disabled={!showUpdate}
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
            <Grid container item md={12} className="my-2">
              <Grid container item md={4} alignItems="center">
                <Grid item md={12} className="fw-700">
                  Average Stock Count :
                </Grid>
                <Grid item md={12}>
                  <RadiobuttonComponent
                    disabled={!showUpdate}
                    label="<50 Units"
                    value="50"
                    onRadioChange={(e) => {
                      setFormValues((prev) => ({
                        ...prev,
                        stockCount: e.target.value,
                      }));
                    }}
                    id="stockCount"
                    isChecked={formValues.stockCount == "50"}
                  />
                </Grid>
                <Grid item md={12}>
                  <RadiobuttonComponent
                    disabled={!showUpdate}
                    label="50-200 Units"
                    value="50-200"
                    onRadioChange={(e) => {
                      setFormValues((prev) => ({
                        ...prev,
                        stockCount: e.target.value,
                      }));
                    }}
                    id="stockCount"
                    isChecked={formValues.stockCount == "50-200"}
                  />
                </Grid>
                <Grid item md={12}>
                  <RadiobuttonComponent
                    disabled={!showUpdate}
                    label=">200 Units"
                    value="200"
                    onRadioChange={(e) => {
                      setFormValues((prev) => ({
                        ...prev,
                        stockCount: e.target.value,
                      }));
                    }}
                    id="stockCount"
                    isChecked={formValues.stockCount == "200"}
                  />
                </Grid>
                {errorObj.stockCount !== "" ? (
                  <Grid item md={12}>
                    <Typography className="color-error h-5">
                      {errorObj.stockCount}
                    </Typography>
                  </Grid>
                ) : null}
              </Grid>
              <Grid container item md={4} alignItems="center">
                <Grid item md={12} className="fw-700">
                  Which website do you sell on?
                </Grid>
                <Grid item md={12}>
                  <CheckBoxComponent
                    isDisabled={!showUpdate}
                    label="Amazon"
                    isChecked={formValues.site.includes("Amazon")}
                    checkBoxClick={() => {
                      setFormValues((prev) => ({
                        ...prev,
                        site: prev.site.includes("Amazon")
                          ? prev.site.filter((item) => item !== "Amazon")
                          : [...prev.site, "Amazon"],
                      }));
                    }}
                    size="medium"
                  />
                </Grid>
                <Grid item md={12}>
                  <CheckBoxComponent
                    isDisabled={!showUpdate}
                    label="Flipkart"
                    isChecked={formValues.site.includes("flipkart")}
                    checkBoxClick={() => {
                      setFormValues((prev) => ({
                        ...prev,
                        site: prev.site.includes("flipkart")
                          ? prev.site.filter((item) => item !== "flipkart")
                          : [...prev.site, "flipkart"],
                      }));
                    }}
                    size="medium"
                  />
                </Grid>
                <Grid item md={12}>
                  <CheckBoxComponent
                    isDisabled={!showUpdate}
                    label="Others"
                    isChecked={formValues?.site?.includes("Others")}
                    checkBoxClick={() => {
                      setFormValues((prev) => ({
                        ...prev,
                        site: prev.site.includes("Others")
                          ? prev.site.filter((item) => item !== "Others")
                          : [...prev.site, "Others"],
                      }));
                    }}
                    size="medium"
                  />
                </Grid>
                {errorObj.site !== "" ? (
                  <Grid item md={12}>
                    <Typography className="color-error h-5">
                      {errorObj.site}
                    </Typography>
                  </Grid>
                ) : null}
              </Grid>
              <Grid container item md={4}>
                <div className="d-flex w-100 h-100 align-items-end">
                  <InputBox
                    disabled={!showUpdate}
                    placeholder="Please provide a link of your website"
                    value={formValues.siteLink}
                    label=""
                    className="w-100"
                    size="small"
                    onInputChange={(e) => {
                      setFormValues((prev) => ({
                        ...prev,
                        siteLink: e.target.value,
                      }));
                    }}
                    variant="standard"
                    // InputProps={{
                    //   style: { fontSize: "14px" },
                    // }}
                    inputlabelshrink
                    helperText={errorObj.siteLink}
                    error={errorObj.siteLink !== ""}
                  />
                </div>
              </Grid>
            </Grid>
            <Grid className="mt-2">
              <ButtonComponent
                disabled={!formValues.approved}
                bgColor={formValues.approved ? "bg-orange" : "bg-gray"}
                label="Update profile"
                onBtnClick={() => {
                  handleUpdateProfile();
                }}
              />
            </Grid>
          </div>
        </div>
      ) : (
        <div className="my-5">
          <OtpForm otp={otp} setotp={setotp} />
          <div className="d-flex justify-content-center">
            <ButtonComponent
              label="Verify OTP"
              onBtnClick={async () => {
                const formData = new FormData();
                formData.append("userName", formValues.mobile);
                formData.append("otp", otp);
                const { data, errRes } = await verifyOtp(formData);
                if (data) {
                  // console.log(data);
                  updateProfile();
                } else if (errRes) {
                  toastify(errRes?.message, "error");
                }
              }}
            />
          </div>
          <div className="d-flex justify-content-center my-2">
            <Typography
              className="cursor-pointer h-5 color-orange fw-bold me-5"
              onClick={() => {
                setShowVerifyOtp(false);
                setShowUpdate(true);
              }}
            >
              Wrong Number?
            </Typography>
            <Typography
              className="cursor-pointer h-5 color-orange fw-bold"
              onClick={() => handleUpdateProfile()}
            >
              Resend OTP
            </Typography>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
