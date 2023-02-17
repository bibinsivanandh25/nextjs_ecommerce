/* eslint-disable no-nested-ternary */
import React, { useState } from "react";
import { Box, FormHelperText, Grid, Typography } from "@mui/material";
import validateMessage from "constants/validateMessages";
import ModalComponent from "@/atoms/ModalComponent";
import InputBox from "@/atoms/InputBoxComponent";
import SimpleDropdownComponent from "@/atoms/SimpleDropdownComponent";
import RadiobuttonComponent from "@/atoms/RadiobuttonComponent";
import {
  editCustomerAddress,
  saveCustomerAddress,
} from "services/customer/Home/address";
import toastify from "services/utils/toastUtils";
import validationRegex from "services/utils/regexUtils";
import { storeUserInfo } from "features/customerSlice";
import { useDispatch } from "react-redux";
import { State, City } from "country-state-city";

const errorObj = {
  name: false,
  mobilenumber: false,
  pincode: false,
  location: false,
  address: false,
  city: false,
  state: false,
  addresstype: false,
  mobileValidate: false,
  pincodeValidate: false,
};

const NewAddress = ({
  newAddressModal,
  setNewAddressModal,
  setDefaultFormData,
  defaultFormData,
  getAllData = () => {},
  customer,
  modalType,
  pageType = "",
}) => {
  const states = State.getStatesOfCountry("IN");
  const statesList = states.map((ele) => ({
    label: ele.name,
    value: ele.name,
    id: ele.name,
  }));
  const cities = City.getCitiesOfCountry("IN");
  const citiesList = cities.map((ele) => ({
    label: ele.name,
    value: ele.name,
    id: ele.name,
  }));
  const [error, setError] = useState(errorObj);
  const dispatch = useDispatch();

  const handleInputChange = (e, value) => {
    if (value === "state" || value === "city") {
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
      id: "",
      name: "",
      mobilenumber: "",
      pincode: "",
      location: "",
      address: "",
      city: {},
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
      addresstype: false,
      mobileValidate: false,
      pincodeValidate: false,
    });
  };
  const handleError = () => {
    const errorobj = {
      name: false,
      mobilenumber: false,
      pincode: false,
      pincodeValidate: false,
      location: false,
      address: false,
      city: false,
      state: false,
      addresstype: false,
      mobileValidate: false,
    };
    const {
      name,
      mobilenumber,
      pincode,
      location,
      address,
      city,
      state,
      addresstype,
    } = defaultFormData;
    if (name == "") {
      errorobj.name = true;
    }
    if (mobilenumber == "") {
      errorobj.mobilenumber = true;
    } else if (!validationRegex.mobile.test(mobilenumber)) {
      errorobj.mobileValidate = true;
    }
    if (pincode == "") {
      errorobj.pincode = true;
    } else if (!validationRegex.pincode.test(pincode)) {
      errorobj.pincodeValidate = true;
    }
    if (location == "") {
      errorobj.location = true;
    }
    if (address == "") {
      errorobj.address = true;
    }
    if (city == null || Object.keys(city)?.length === 0) {
      errorobj.city = true;
    }
    if (state == null || Object.keys(state)?.length === 0) {
      errorobj.state = true;
    }
    if (addresstype == "") {
      errorobj.addresstype = true;
    }
    setError(errorobj);
    const result = Object.values(errorobj).every((x) => x === false);
    return result;
  };
  const handleSaveClick = async () => {
    const result = handleError();
    if (result) {
      const payload = {
        name: defaultFormData.name,
        mobileNumber: defaultFormData.mobilenumber,
        pinCode: defaultFormData.pincode,
        location: defaultFormData.location,
        address: defaultFormData.address,
        cityDistrictTown: defaultFormData.city.label,
        state: defaultFormData.state.label,
        landmark: defaultFormData.landmark,
        latitudeValue: defaultFormData.latitudvalue,
        longitudeValue: defaultFormData.longitudevalue,
        alternativeMobileNumber: defaultFormData.alternatenumber,
        addressType: defaultFormData.addresstype,
      };
      if (modalType === "edit") payload.addressId = defaultFormData.id;
      const { data, err } =
        modalType === "add"
          ? await saveCustomerAddress(customer.userId, payload)
          : await editCustomerAddress(payload);
      if (data) {
        if (modalType !== "add" || (modalType == "add" && data.data.primary)) {
          dispatch(
            storeUserInfo({
              ...customer,
              addressDetails: { ...payload },
            })
          );
        }
        toastify(data.message, "success");
        getAllData(customer.userId);
        handleClearAll();
        setNewAddressModal(false);
      }
      if (err) {
        toastify(err?.response?.data?.message, "error");
      }
    }
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
        ModalTitle={modalType == "add" ? "Add New Address" : "Edit Address"}
        titleClassName="fs-18 fw-600"
        footerClassName="d-flex justify-content-end border-top mt-2 border-dark-gray mb-1"
        onClearBtnClick={() => {
          handleClearAll();
        }}
        onSaveBtnClick={() => {
          handleSaveClick();
        }}
        saveBtnText={modalType == "add" ? "Save" : "Edit"}
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
                error={error.mobilenumber || error.mobileValidate}
                helperText={
                  error.mobilenumber
                    ? validateMessage.field_required
                    : error.mobileValidate
                    ? validateMessage.mobile
                    : ""
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
                error={error.pincode || error.pincodeValidate}
                helperText={
                  error.pincode
                    ? validateMessage.field_required
                    : error.pincodeValidate
                    ? validateMessage.validPincode
                    : ""
                }
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
              <SimpleDropdownComponent
                size="small"
                label="City / District / Town"
                list={[...citiesList]}
                value={defaultFormData?.city}
                onDropdownSelect={(val) => {
                  handleInputChange(val, "city");
                }}
                error={error.city}
                helperText={error.city ? validateMessage.field_required : ""}
              />
            </Grid>
            <Grid item lg={6} md={6} xs={6}>
              <SimpleDropdownComponent
                size="small"
                list={[...statesList]}
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
          {pageType !== "supplier" ? (
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
          ) : null}
          {error.addresstype ? (
            <FormHelperText error={error.addresstype} className="ps-4 h-5">
              {validateMessage.field_required}
            </FormHelperText>
          ) : null}
        </Box>
      </ModalComponent>
    </div>
  );
};

export default NewAddress;
