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

  useEffect(() => {
    setFormValues(values);
  }, [values]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
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
      minHeightClassName="mxh-500"
      ModalWidth={800}
      footerClassName="align-right border-top me-3"
      footerPadding="p-3"
      ClearBtnText="Cancel"
    >
      <Grid container my={2} spacing={2}>
        <Grid item xs={6}>
          {console.log(formValues.name)}
          <InputBox
            value={formValues.name}
            label="Name"
            className="w-100"
            size="small"
            name="name"
            id="name"
            onInputChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <InputBox
            value={formValues.mobileNumber}
            label="Mobile Number"
            className="w-100"
            size="small"
            id="mobileNumber"
            name="mobileNumber"
            onInputChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <InputBox
            value={formValues.pincode}
            label="Pin Code"
            className="w-100"
            size="small"
            id="pincode"
            name="pincode"
            onInputChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <InputBox
            value={formValues.location}
            label="Location"
            className="w-100"
            size="small"
            id="location"
            name="location"
            onInputChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <InputBox
            value={formValues.address}
            label="Address"
            className="w-100"
            size="small"
            id="address"
            name="address"
            isMultiline
            onInputChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <InputBox
            value={formValues.city}
            label="City / District / Town"
            className="w-100"
            size="small"
            id="city"
            name="city"
            onInputChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <SimpleDropdownComponent
            list={[]}
            label="State"
            size="small"
            id="state"
            name="state"
          />
        </Grid>
        <Grid item xs={6}>
          <InputBox
            value={formValues.landmark}
            label="Landmark (Optional)"
            className="w-100"
            size="small"
            id="landmark"
            name="landmark"
            onInputChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <InputBox
            value={formValues.alternateNumber}
            label="Alternate Number (Optional)"
            className="w-100"
            size="small"
            id="alternateNumber"
            name="alternateNumber"
            onInputChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <InputBox
            value={formValues.latitude}
            label="Latitude Value (Optional)"
            className="w-100"
            size="small"
            id="latitude"
            name="latitude"
            onInputChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <InputBox
            value={formValues.longitude}
            label="Longitude Value (Optional)"
            className="w-100"
            size="small"
            id="longitude"
            name="longitude"
            onInputChange={handleInputChange}
          />
        </Grid>
      </Grid>
    </ModalComponent>
  );
};

export default AddAddressModal;
