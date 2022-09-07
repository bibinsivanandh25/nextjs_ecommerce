/* eslint-disable no-prototype-builtins */
import { Grid } from "@mui/material";
import InputBox from "components/atoms/InputBoxComponent";
import ModalComponent from "components/atoms/ModalComponent";
import SimpleDropdownComponent from "components/atoms/SimpleDropdownComponent";
import validateMessage from "constants/validateMessages";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  addNewAddress,
  updateAddress,
} from "services/supplier/myaccount/pickupaddress";
import validationRegex from "services/utils/regexUtils";

const AddAddressModal = (props) => {
  const {
    setShowAddAddressModal = () => {},
    values = {},
    setSelectId = () => {},
    type = "",
    showAddressModal = false,
    getAllAddress = () => {},
  } = props;
  const [formValues, setFormValues] = useState({
    name: "",
    mobileNumber: "",
    pinCode: "",
    location: "",
    address: "",
    cityDistrictTown: "",
    state: "",
    landmark: "",
    latitudeValue: "",
    longitudeValue: "",
    alternativeMobileNumber: "",
  });
  const [error, setError] = useState({});

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
      validation: /^([a-zA-Z0-9_-]){1,6}$/,
      errorMessage: validateMessage.alpha_numeric_6,
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
      label: "City / District / Town",
      id: "cityDistrictTown",
      value: null,
      required: true,
      validation: /^.{1,50}$/,
      errorMessage: validateMessage.alpha_numeric_max_50,
    },
    {
      label: "State",
      type: "dropdown",
      id: "state",
      options: [
        {
          id: "karnataka",
          label: "Karnataka",
        },
        { id: "delhi", label: "Delhi" },
      ],
      value: null,
      required: true,
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
  const handleSave = async () => {
    const isValid = validateForm();
    if (isValid) {
      if (type === "add") {
        const temp = JSON.parse(JSON.stringify(formValues));
        delete temp.addressId;
        const payload = {
          ...temp,
          supplierId: user,
        };
        const { data } = await addNewAddress(payload);
        if (data) {
          getAllAddress();
          setShowAddAddressModal(false);
        }
      } else if (type === "edit") {
        const payload = {
          ...formValues,
          supplierId: user,
        };
        const { data } = await updateAddress(payload);
        if (data) {
          getAllAddress();
          setShowAddAddressModal(false);
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
      footerClassName="justify-content-end  border-top me-3"
      footerPadding="p-3"
      ClearBtnText="Cancel"
    >
      <Grid container my={2} spacing={2}>
        {inputFields.map((field) => (
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
