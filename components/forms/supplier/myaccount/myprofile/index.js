import { Avatar, Badge, Grid } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import validationRegex from "services/utils/regexUtils";
import SimpleDropdownComponent from "components/atoms/SimpleDropdownComponent";
import CustomIcon from "services/iconUtils";
import validateMessage from "constants/validateMessages";
import {
  getMainCategories,
  getSupplierDetailsBySupplierId,
  updateSupplierProfile,
} from "services/supplier/myprofile";
import { getBase64 } from "services/utils/functionUtils";
import { useUserInfo } from "services/hooks";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useSelector } from "react-redux";
import InputBox from "@/atoms/InputBoxComponent";
import ButtonComponent from "@/atoms/ButtonComponent";
import MultiSelectComponent from "@/atoms/MultiSelectComponent";

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
    site: "",
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

  const user = useSelector((state) => {
    return state.user;
  });

  const profilePicRef = useRef(null);

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

  const handleUpdateProfile = async () => {
    const flag = validateForm();
    if (!flag) {
      const payload = {
        supplierId: user.supplierId,
        businessName: formValues.businessName,
        emailId: formValues.mail,
        mobileNumber: formValues.mobile,
        gstin: formValues.gstin,
        avgStockCount: "",
        mainCategories: mainCategories.map((ele) => ele.value),
        websiteName: "",
        profileImageUrl: formValues.profileImage,
        websiteLink: "",
        city: formValues.city,
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        supplierReferralCode: formValues.supplierReferralCode,
        wished: true,
      };
      const { data, err } = await updateSupplierProfile(payload);
      if (data) {
        console.log(data);
      } else if (err) {
        console.log(err.response);
      }
    }
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
        mainCat: [],
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
    }
  };

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

  return (
    <div className="mnh-70vh mxh-80vh overflow-auto hide-scrollbar bg-white rounded px-4">
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
              let binary;
              if (e.target.files[0]) {
                binary = await getBase64(e.target.files[0]);
              }
              setProfileImage(binary);
            }}
          />
        </div>
        <div className="mx-3 d-flex flex-column">
          <div>
            {" "}
            <span className="fs-20 fw-bold">{formValues.businessName}</span>
            <CustomIcon
              type={!showUpdate ? "edit" : "close"}
              title={!showUpdate ? "Edit" : "Close"}
              className="fs-5"
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
          {/* <Grid item md={6} sm={12}>
            <InputBox
              disabled
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
              disabled
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
          </Grid> */}
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
      {/* ) : null} */}
    </div>
  );
};

export default MyProfile;
