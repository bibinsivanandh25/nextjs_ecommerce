import React, { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import validateMessage from "constants/validateMessages";
import ModalComponent from "@/atoms/ModalComponent";
import InputBox from "@/atoms/InputBoxComponent";
import SimpleDropdownComponent from "@/atoms/SimpleDropdownComponent";
import RadiobuttonComponent from "@/atoms/RadiobuttonComponent";

const options = [
  {
    id: "karnataka",
    label: "Karnataka",
  },
  { id: "delhi", label: "Delhi" },
];
const errorObj = {
  name: false,
  mobilenumber: false,
  pincode: false,
  location: false,
  address: false,
  city: false,
  state: false,
};
const NewAddress = ({
  newAddressModal,
  setNewAddressModal,
  setDefaultFormData,
  defaultFormData,
}) => {
  const [error, setError] = useState(errorObj);
  const handleInputChange = (e, value) => {
    if (value === "state") {
      setDefaultFormData((prev) => {
        return {
          ...prev,
          [value]: e,
        };
      });
    } else if (value == "addresstype") {
      setDefaultFormData((prev) => {
        return {
          ...prev,
          [value]: e,
        };
      });
    } else {
      setDefaultFormData((prev) => {
        return {
          ...prev,
          [value]: e.target.value,
        };
      });
    }
  };

  const handleClearAll = () => {
    setDefaultFormData({
      name: "",
      mobilenumber: "",
      pincode: "",
      location: "",
      address: "",
      city: "",
      state: {},
      landmark: "",
      alternatenumber: "",
      latitudvalue: "",
      longitudevalue: "",
      addresstype: "",
    });
    setError({
      name: false,
      mobilenumber: false,
      pincode: false,
      location: false,
      address: false,
      city: false,
      state: false,
    });
  };
  const handleError = () => {
    const errorobj = {
      name: false,
      mobilenumber: false,
      pincode: false,
      location: false,
      address: false,
      city: false,
      state: false,
    };
    const { name, mobilenumber, pincode, location, address, city, state } =
      defaultFormData;
    if (name == "") {
      errorobj.name = true;
    }
    if (mobilenumber == "") {
      errorobj.mobilenumber = true;
    }
    if (pincode == "") {
      errorobj.pincode = true;
    }
    if (location == "") {
      errorobj.location = true;
    }
    if (address == "") {
      errorobj.address = true;
    }
    if (city == "") {
      errorobj.city = true;
    }
    if (Object.keys(state).length === 0) {
      errorobj.state = true;
    }
    // Object.entries(errorobj).forEach(([key, value]) => {
    //   Object.entries(defaultFormData).map(([keys, values]) => {
    //     if (key === keys) {
    //       if (values === "") {
    //         errorobj[values] = false;
    //       }
    //     }
    //   });
    // });
    return errorobj;
  };
  const handleSaveClick = () => {
    const errorData = handleError();
    // console.log(errorData);
    setError(errorData);
  };
  return (
    <div>
      <ModalComponent
        open={newAddressModal}
        onCloseIconClick={() => {
          handleClearAll();
          setNewAddressModal(false);
        }}
        minHeightClassName="mnh-400"
        ModalWidth={800}
        ModalTitle="Add New Address"
        titleClassName="fs-18 fw-600"
        footerClassName="d-flex justify-content-end border-top mt-2 border-dark-gray mb-1"
        onClearBtnClick={() => {
          handleClearAll();
        }}
        onSaveBtnClick={() => {
          handleSaveClick();
        }}
      >
        <Box>
          <Grid container my={2} spacing={2}>
            <Grid item lg={6} md={6} xs={6}>
              <InputBox
                size="small"
                label="Name"
                value={defaultFormData?.name}
                onInputChange={(e) => {
                  handleInputChange(e, "name");
                }}
                error={error.name}
                helperText={error.name ? validateMessage.field_required : ""}
              />
            </Grid>
            <Grid item lg={6} md={6} xs={6}>
              <InputBox
                size="small"
                label="Mobile Number"
                value={defaultFormData?.mobilenumber}
                onInputChange={(e) => {
                  handleInputChange(e, "mobilenumber");
                }}
                error={error.mobilenumber}
                helperText={
                  error.mobilenumber ? validateMessage.field_required : ""
                }
              />
            </Grid>{" "}
            <Grid item lg={6} md={6} xs={6}>
              <InputBox
                size="small"
                label="Pincode"
                value={defaultFormData?.pincode}
                onInputChange={(e) => {
                  handleInputChange(e, "pincode");
                }}
                error={error.pincode}
                helperText={error.pincode ? validateMessage.field_required : ""}
              />
            </Grid>{" "}
            <Grid item lg={6} md={6} xs={6}>
              <InputBox
                size="small"
                label="Location"
                value={defaultFormData?.location}
                onInputChange={(e) => {
                  handleInputChange(e, "location");
                }}
                error={error.location}
                helperText={
                  error.location ? validateMessage.field_required : ""
                }
              />
            </Grid>
            <Grid item lg={12} md={12} xs={12}>
              <InputBox
                size="large"
                label="Address"
                value={defaultFormData?.address}
                onInputChange={(e) => {
                  handleInputChange(e, "address");
                }}
                className="w-100"
                error={error.address}
                helperText={error.address ? validateMessage.field_required : ""}
              />
            </Grid>
            <Grid item lg={6} md={6} xs={6}>
              <InputBox
                size="small"
                label="City / District / Town"
                value={defaultFormData?.city}
                onInputChange={(e) => {
                  handleInputChange(e, "city");
                }}
                error={error.city}
                helperText={error.city ? validateMessage.field_required : ""}
              />
            </Grid>
            <Grid item lg={6} md={6} xs={6}>
              <SimpleDropdownComponent
                size="small"
                list={options}
                label="State"
                value={defaultFormData?.state}
                onDropdownSelect={(val) => {
                  handleInputChange(val, "state");
                }}
                helperText={error.state ? validateMessage.field_required : ""}
              />
            </Grid>
            <Grid item lg={6} md={6} xs={6}>
              <InputBox
                size="small"
                label="Land mark (Optional)"
                value={defaultFormData?.landmark}
                onInputChange={(e) => {
                  handleInputChange(e, "landmark");
                }}
              />
            </Grid>
            <Grid item lg={6} md={6} xs={6}>
              <InputBox
                size="small"
                label="Alternate No. (Optional)"
                value={defaultFormData?.alternatenumber}
                onInputChange={(e) => {
                  handleInputChange(e, "alternatenumber");
                }}
              />
            </Grid>
            <Grid item lg={6} md={6} xs={6}>
              <InputBox
                size="small"
                label="Latitude Value (Optional)"
                value={defaultFormData?.latitudvalue}
                onInputChange={(e) => {
                  handleInputChange(e, "latitudvalue");
                }}
              />
            </Grid>
            <Grid item lg={6} md={6} xs={6}>
              <InputBox
                size="small"
                label="Longitude Value (Optional)"
                value={defaultFormData?.longitudevalue}
                onInputChange={(e) => {
                  handleInputChange(e, "longitudevalue");
                }}
              />
            </Grid>
          </Grid>
          <Grid className="mt-2 ms-4">
            <Typography className="fs-16 fw-600">Address Type</Typography>
            <RadiobuttonComponent
              size="small"
              label="Home"
              isChecked={defaultFormData?.addresstype === "home"}
              onRadioChange={() => {
                handleInputChange("home", "addresstype");
              }}
            />
            <RadiobuttonComponent
              size="small"
              label="Office"
              className="ms-4"
              isChecked={defaultFormData?.addresstype === "office"}
              onRadioChange={() => {
                handleInputChange("office", "addresstype");
              }}
            />
          </Grid>
        </Box>
      </ModalComponent>
    </div>
  );
};

export default NewAddress;
