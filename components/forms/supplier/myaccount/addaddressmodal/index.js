import { Grid } from "@mui/material";
import InputBox from "components/atoms/InputBoxComponent";
import ModalComponent from "components/atoms/ModalComponent";
import SimpleDropdownComponent from "components/atoms/SimpleDropdownComponent";
import { useEffect, useState } from "react";

const AddAddressModal = (props) => {
  const {
    setShowAddAddressModal = () => {},
    values = {},
    setSelectId = () => {},
    type = "",
  } = props;
  const [formValues, setFormValues] = useState({});
  const [error, setError] = useState({});

  const [inputFields, setInputFields] = useState([
    {
      label: "Name",
      id: "name",
      value: null,
      required: true,
    },
    {
      label: "Mobile Number",
      id: "mobileNumber",
      value: null,
    },
    {
      label: "Pin Code",
      id: "pincode",
      value: null,
    },
    {
      label: "Location",
      id: "location",
      value: null,
    },
    {
      label: "Address",
      id: "address",
      size: 12,
      value: null,
    },
    {
      label: "City / District / Town",
      id: "city",
      value: null,
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
    },
    {
      label: "Landmark (Optional)",
      id: "landmark",
      value: null,
    },
    {
      label: "Alternate Number (Optional)",
      id: "alternateNumber",
      value: null,
    },
    {
      label: "Latitude Value (Optional)",
      id: "latitude",
      value: null,
    },
    {
      label: "Longitude Value (Optional)",
      id: "longitude",
      value: null,
    },
  ]);

  useEffect(() => {
    if (type === "edit") {
      setFormValues(values);
    }
  }, [values, type]);

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormValues((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  const validateForm = () => {
    const errObj = { ...error };

    const validatePassword = (field) => {
      if (!formValues[field]) {
        errObj[field] = validateMessage.field_required;
      } else if (!validationRegex.password.test(formValues[field])) {
        errObj[field] = validateMessage.password;
      } else {
        errObj[field] = null;
      }
    };
    setError({ ...errObj });
    let valid = true;
    Object.values(errObj).forEach((i) => {
      if (i) {
        valid = false;
      }
    });
    return valid;
  };

  const handleSave = () => {
    const isValid = validateForm();
    if (isValid) {
      console.log(formValues);
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
      } else {
        return val;
      }
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
      open
      ModalTitle="Add New Pickup Address"
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
      ModalWidth={"60%"}
      footerClassName="align-right border-top me-3"
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
                value={field.options.find((op) => op.id === field.value)}
                onDropdownSelect={(val) => handleInputChange(val, field)}
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
              />
            )}
          </Grid>
        ))}
      </Grid>
    </ModalComponent>
  );
};

export default AddAddressModal;
