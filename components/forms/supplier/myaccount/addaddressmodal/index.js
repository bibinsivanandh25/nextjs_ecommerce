/* eslint-disable no-param-reassign */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-prototype-builtins */
import { Grid } from "@mui/material";
import InputBox from "components/atoms/InputBoxComponent";
import ModalComponent from "components/atoms/ModalComponent";
import SimpleDropdownComponent from "components/atoms/SimpleDropdownComponent";
import validateMessage from "constants/validateMessages";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSupplierDetailsBySupplierId } from "services/supplier/myaccount/myprofile";
import {
  addNewAddress,
  updateAddress,
  validPincode,
} from "services/supplier/myaccount/pickupaddress";
import validationRegex from "services/utils/regexUtils";
import { storeUserInfo } from "features/userSlice";
import toastify from "services/utils/toastUtils";
import { useRouter } from "next/router";
// import { City, State } from "country-state-city";
import { getCity, getCountry, getState } from "services/supplier/Registration";

const AddAddressModal = (props) => {
  const {
    setShowAddAddressModal = () => {},
    values = {},
    setSelectId = () => {},
    type = "",
    showAddressModal = false,
    getAllAddress = () => {},
    supplierId = "",
    showCloseIcon = true,
    disableCancel = false,
    routeToLogin = false,
  } = props;
  const [allCountry, setallCountry] = useState([]);
  const [allState, setallState] = useState([]);
  const [allCity, setallCity] = useState([]);
  // const cities = City.getCitiesOfCountry("IN");

  // const citiesList = cities
  //   .map((ele) => ({
  //     label: ele.name,
  //     value: ele.name,
  //     id: ele.name,
  //   }))
  //   .slice(0, 50);
  // const states = State.getStatesOfCountry("IN");
  // const statesList = states.map((ele) => ({
  //   label: ele.name,
  //   value: ele.name,
  //   id: ele.name,
  // }));

  const [formValues, setFormValues] = useState({
    name: "",
    mobileNumber: "",
    pinCode: "",
    location: "",
    address: "",
    cityDistrictTown: "",
    state: "",
    country: "India",
    landmark: "",
    latitudeValue: "",
    longitudeValue: "",
    alternativeMobileNumber: "",
  });
  const [error, setError] = useState({});
  const dispatch = useDispatch();

  const [inputFields, setInputFields] = useState([
    {
      label: "Name",
      id: "name",
      value: null,
      required: true,
      validation: /^.{1,50}$/,
      errorMessage: validateMessage.alphabets_50,
    },
    {
      label: "Mobile Number",
      id: "mobileNumber",
      value: null,
      required: true,
      // validation: /^(\+\d{1,3})?(\d{3}-){2}\d{4}(\/\d{3,4})?$/,
      errorMessage: validateMessage.mobile,
      validation: validationRegex.mobile,
    },
    {
      label: "Pin Code",
      id: "pinCode",
      value: null,
      required: true,
      validation: /^([a-zA-Z0-9_-]){6}$/,
      errorMessage: "Invalid Pincode",
    },
    {
      label: "Location",
      id: "location",
      value: null,
      required: true,
      validation: /^.{1,255}$/,
      errorMessage: validateMessage.alpha_numeric_max_255,
    },
    {
      label: "Address",
      id: "address",
      size: 12,
      value: null,
      required: true,
      validation: /^.{1,255}$/,
      errorMessage: validateMessage.alpha_numeric_max_255,
    },
    {
      label: "Country",
      type: "dropdown",
      id: "country",
      value: "India",
      required: true,
      validation: /^.{1,50}$/,
      options: [...allCountry],
      errorMessage: validateMessage.alpha_numeric_max_50,
    },

    {
      label: "State",
      type: "dropdown",
      id: "state",
      options: [...allState],
      value: null,
      required: true,
      validation: /^.{1,50}$/,
    },
    {
      label: "City / District / Town",
      type: "dropdown",
      id: "cityDistrictTown",
      value: null,
      required: true,
      validation: /^.{1,50}$/,
      options: [...allCity],
      errorMessage: validateMessage.alpha_numeric_max_50,
    },
    {
      label: "Landmark (Optional)",
      id: "landmark",
      value: null,
      validation: /^.{1,65}$/,
      errorMessage: validateMessage.alpha_numeric_max_65,
    },
    {
      label: "Alternate Number (Optional)",
      id: "alternativeMobileNumber",
      value: null,
      errorMessage: validateMessage.mobile,
      validation: validationRegex.mobile,
    },
    {
      label: "Latitude Value (Optional)",
      id: "latitudeValue",
      value: null,
      validation: /^.{1,100}$/,
      errorMessage: validateMessage.alpha_numeric_max_100,
    },
    {
      label: "Longitude Value (Optional)",
      id: "longitudeValue",
      value: null,
      validation: /^.{1,100}$/,
      errorMessage: validateMessage.alpha_numeric_max_100,
    },
  ]);
  useEffect(() => {
    if (type === "edit") {
      setFormValues(values);
    }
  }, [values, type]);

  const route = useRouter();

  const getAllCountryFunction = async () => {
    const { data, err } = await getCountry();
    if (data) {
      const temp = [];
      data.data.forEach((val) => {
        temp.push({ value: val.name, label: val.name, id: val.name });
      });
      // setInputFields({ ...inputFields });

      const tempInput = [...inputFields];
      tempInput.forEach((val) => {
        if (val.id == "country") {
          val.options = temp;
        }
      });

      setInputFields(tempInput);
      setallCountry(temp);
    } else if (err) {
      toastify(err.message, "error");
    }
  };
  const getAllStateFunction = async () => {
    const { data, err } = await getState(formValues.country);
    if (data) {
      const temp = [];
      data.data.forEach((val) => {
        temp.push({ value: val.name, label: val.name, id: val.name });
      });
      const tempInput = [...inputFields];
      tempInput.forEach((val) => {
        if (val.id == "state") {
          val.options = temp;
        }
      });

      setInputFields(tempInput);
      setallState(temp);
    } else if (err) {
      toastify(err.message, "error");
    }
  };
  const getAllCityFunction = async () => {
    const { data, err } = await getCity(formValues.country, formValues.state);
    if (data) {
      const temp = [];
      data.data.forEach((val) => {
        temp.push({ value: val.name, label: val.name, id: val.name });
      });
      const tempInput = [...inputFields];
      tempInput.forEach((val) => {
        if (val.id == "cityDistrictTown") {
          val.options = temp;
        }
      });

      setInputFields(tempInput);
      setallCity(temp);
    } else if (err) {
      toastify(err.message, "error");
    }
  };
  useEffect(() => {
    if (formValues?.country?.length) {
      getAllStateFunction();
    }
  }, [formValues?.country]);
  useEffect(() => {
    if (formValues?.country?.length && formValues?.state?.length) {
      getAllCityFunction();
    }
  }, [formValues?.country, formValues?.state]);
  useEffect(() => {
    getAllCountryFunction();
  }, []);
  // const validPincodeFunction = async () => {
  //   const payload = [{ Input_Pincode: formValues.pinCode }];
  //   const { status, error } = await validPincode(payload);
  //   if (status) {
  //     console.log(data.data[0].status, "status");
  //     status.data.forEach((val) => {
  //       setpincodeResponse(val.status);
  //     });
  //   } else if (err) {
  //     toastify(err.message, "error");
  //   }
  // };
  const validateForm = () => {
    const errObj = { ...error };
    inputFields.forEach((el) => {
      if (el.hasOwnProperty("required") && !el.value) {
        errObj[el.id] = validateMessage.field_required;
      } else if (
        el.hasOwnProperty("validation") &&
        el.value &&
        !el.validation.test(el.value)
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
  const user = useSelector((state) => state.user.supplierId);
  const getUpdateUserDetails = async () => {
    const { data } = await getSupplierDetailsBySupplierId(user);
    if (data) {
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
  const handleSave = async () => {
    const isValid = validateForm();
    if (isValid) {
      const temp1 = [];
      const payload1 = [{ Input_Pincode: formValues.pinCode }];
      // eslint-disable-next-line no-shadow
      const { status, error } = await validPincode(payload1);
      if (status) {
        status.data.forEach((val) => {
          temp1.push(val.status);
        });
      } else if (error) {
        toastify(error.message, "error");
      }
      if (temp1.includes("valid")) {
        if (type === "add") {
          const temp = JSON.parse(JSON.stringify(formValues));
          delete temp.addressId;
          const payload = {
            ...temp,
            supplierId: user.length ? user : supplierId,
          };
          const { data, err } = await addNewAddress(payload, supplierId);
          if (data) {
            toastify(data.message, "success");
            getAllAddress();
            getUpdateUserDetails();
            setShowAddAddressModal(false);
            if (routeToLogin) {
              route.push("/auth/login");
            }
          }
          if (err) {
            toastify(err?.response?.data?.message);
          }
        } else if (type === "edit") {
          const payload = {
            ...formValues,
            supplierId: user.length ? user : supplierId,
          };
          const { data, err } = await updateAddress(payload);
          if (data) {
            getAllAddress();
            toastify(data.message, "success");
            setShowAddAddressModal(false);
          }
          if (err) {
            toastify(err?.response?.data?.message);
          }
        }
      }
    }
  };

  useEffect(() => {
    const dropdownCopy = [...inputFields];
    Object.entries(formValues).forEach(([key, value]) => {
      const existingVal = inputFields.find((i) => i.id === key);
      const index = inputFields.findIndex((i) => i.id === key);
      dropdownCopy[index] = {
        ...existingVal,
        value,
      };
    });
    setInputFields(dropdownCopy);
  }, [formValues]);

  const handleInputChange = (val, ele) => {
    const getData = () => {
      if (ele.type === "dropdown") {
        return val ? val.id : null;
      }
      return val;
    };
    if (ele.id == "country") {
      setFormValues({ ...formValues, cityDistrictTown: "", state: "" });
      const tempInput2 = [...inputFields];
      tempInput2.forEach((con) => {
        if (con.id == "state") {
          con.value = null;
        }
      });
      setInputFields(tempInput2);
    }

    setFormValues((prev) => {
      return {
        ...prev,
        [ele.id]: getData(),
      };
    });
  };

  return (
    <ModalComponent
      open={showAddressModal}
      ModalTitle={
        type === "add" ? "Add New Pickup Address" : "Edit Pickup Address"
      }
      showFooter
      onCloseIconClick={() => {
        if (type === "edit") {
          setSelectId({});
        } else {
          setShowAddAddressModal(false);
        }
      }}
      onClearBtnClick={() => {
        if (type === "edit") {
          setSelectId({});
        } else {
          setShowAddAddressModal(false);
        }
      }}
      onSaveBtnClick={handleSave}
      minHeightClassName="mxh-500"
      ModalWidth="60%"
      footerClassName="justify-content-start flex-row-reverse  border-top mx-3"
      footerPadding="p-3"
      ClearBtnText="Cancel"
      showCloseIcon={showCloseIcon}
      clearBtnClassName={disableCancel ? "d-none" : "me-2"}
    >
      <Grid container my={2} spacing={2}>
        {inputFields?.map((field) => (
          <Grid item lg={field?.size || 6} md={12} xs={12} key={field.id}>
            {field.type === "dropdown" ? (
              <SimpleDropdownComponent
                id={field.id}
                size="small"
                list={field.options}
                label={field.label}
                value={field.options.find(
                  (op) => op.id?.toLowerCase() === field.value?.toLowerCase()
                )}
                onDropdownSelect={(val) => handleInputChange(val, field)}
                helperText={error[field.id]}
              />
            ) : (
              <InputBox
                value={field.value || ""}
                label={field.label}
                className="w-100"
                size="small"
                id={field.id}
                name={field.id}
                onInputChange={(e) => handleInputChange(e.target.value, field)}
                error={Boolean(error[field.id])}
                helperText={error[field.id]}
              />
            )}
          </Grid>
        ))}
      </Grid>
    </ModalComponent>
  );
};

export default AddAddressModal;
