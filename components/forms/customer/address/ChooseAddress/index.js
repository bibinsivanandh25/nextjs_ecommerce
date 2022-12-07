/* eslint-disable react/no-array-index-key */
import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ModalComponent from "@/atoms/ModalComponent";
import CheckBoxComponent from "@/atoms/CheckboxComponent";
import NewAddress from "@/forms/customer/address/AddNewAddress";

const addressData = [
  {
    id: 1,
    header: "Address1",
    name: "Balu",
    mobileNumber: 987653225,
    pincode: 24353,
    location: "India",
    address:
      "#109, 3rd Cross, 4th Main, Salem#109, 3rd Cross, 4th Main, Salem#109, 3rd Cross, 4th Main, Salem #109, 3rd Cross, 4th Main, Salem",
    city: "salem",
    state: {
      id: "karnataka",
      label: "Karnataka",
    },
    landmark: "",
    addressType: "home",
    alternatenumber: "",
    latitudvalue: "",
    longitudevalue: "",
  },
  {
    id: 2,
    header: "Address2",
    name: "Rakesh",
    mobileNumber: 987653225,
    pincode: 24353,
    location: "India",
    address: "#109, 3rd Cross, 4th Main, Salem",
    city: "salem",
    state: {
      id: "karnataka",
      label: "Karnataka",
    },
    landmark: "",
    addressType: "office",
    alternatenumber: "",
    latitudvalue: "",
    longitudevalue: "",
  },
];
const ChooseAddress = ({ showModal = false, setShowModal = () => {} }) => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [newAddressModal, setNewAddressModal] = useState(false);
  const [defaultFormData, setDefaultFormData] = useState({
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
  const handleEditClick = (id) => {
    const selectedAddressData = addressData.find((item) => item.id === id);
    if (selectedAddressData) {
      setNewAddressModal(true);
      setDefaultFormData({
        name: selectedAddressData.name,
        mobilenumber: selectedAddressData.mobileNumber,
        pincode: selectedAddressData.pincode,
        location: selectedAddressData.location,
        address: selectedAddressData.address,
        city: selectedAddressData.city,
        state: {},
        landmark: selectedAddressData.landmark,
        alternatenumber: selectedAddressData.alternatenumber,
        latitudvalue: selectedAddressData.latitudvalue,
        longitudevalue: selectedAddressData.longitudevalue,
        addresstype: selectedAddressData.addressType,
      });
    }
  };
  return (
    <div>
      <ModalComponent
        open={showModal}
        onCloseIconClick={() => {
          setShowModal(false);
        }}
        ModalTitle="Choose your Location"
        titleClassName="fs-18 fw-600"
        showFooter={false}
        minHeightClassName="mnh-400"
      >
        <Box>
          {addressData.map((item, index) => (
            <Box
              key={index}
              className="rounded mt-3 mnh-150 p-2"
              style={{
                border:
                  item.id === selectedAddress
                    ? "1px solid #E56700"
                    : "1px solid gray",
                backgroundColor:
                  item.id === selectedAddress ? "#E5670021" : "#E9E9E921",
              }}
            >
              <Box className="d-flex justify-content-between">
                <CheckBoxComponent
                  label={`Address ${index + 1}`}
                  isChecked={item.id === selectedAddress}
                  showIcon
                  checkBoxClick={() => setSelectedAddress(item.id)}
                  iconType="circled"
                />
                <Box>
                  <DeleteIcon />
                </Box>
              </Box>
              <Box className="d-flex justify-content-between">
                <Box>
                  <Typography className="ps-3 fs-14">{item.address}</Typography>
                </Box>
                <Box>
                  <EditIcon
                    className="cursor-pointer"
                    onClick={() => {
                      handleEditClick(item.id);
                    }}
                  />
                </Box>
              </Box>
            </Box>
          ))}
          <Box className="d-flex justify-content-center mt-3">
            <Typography
              className="color-orange fs-16 cursor-pointer"
              onClick={() => {
                setNewAddressModal(true);
              }}
            >
              Add new Address / pickup location
            </Typography>
          </Box>
        </Box>
      </ModalComponent>
      {newAddressModal && (
        <NewAddress
          setNewAddressModal={setNewAddressModal}
          newAddressModal={newAddressModal}
          defaultFormData={defaultFormData}
          setDefaultFormData={setDefaultFormData}
        />
      )}
    </div>
  );
};

export default ChooseAddress;
