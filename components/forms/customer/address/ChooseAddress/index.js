/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ModalComponent from "@/atoms/ModalComponent";
import CheckBoxComponent from "@/atoms/CheckboxComponent";
import NewAddress from "@/forms/customer/address/AddNewAddress";
import { useDispatch, useSelector } from "react-redux";
import {
  changePrimaryAddress,
  deleteCustomerAddress,
  getAllCustomerAddress,
} from "services/customer/Home/address";
import toastify from "services/utils/toastUtils";
import { storeUserInfo } from "features/customerSlice";
import { getCustomerById } from "services/customer/auth";

const ChooseAddress = ({ showModal = false, setShowModal = () => {} }) => {
  const customer = useSelector((state) => state.customer);
  const [newAddressModal, setNewAddressModal] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [defaultFormData, setDefaultFormData] = useState({
    id: "",
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
  const [masterAddress, setMasterAddress] = useState([]);
  const dispatch = useDispatch();

  const getAllData = async (id) => {
    if (id) {
      const { data } = await getAllCustomerAddress(id);
      if (data?.length) {
        const temp = [];
        data.forEach((item) => {
          if (item.primary) {
            temp.unshift(item);
            // console.log(item);
            // dispatch(
            //   storeUserInfo({
            //     ...customer,
            //     addressDetails: { ...data.data },
            //   })
            // );
          } else {
            temp.push(item);
          }
        });
        // console.log(temp, "temp");
        setMasterAddress(temp);
      } else {
        setMasterAddress([]);
      }
    }
  };
  useEffect(() => {
    getAllData(customer.userId);
  }, [customer]);
  const handleEditClick = (item) => {
    if (item) {
      setModalType("edit");
      setDefaultFormData({
        id: item.addressId,
        name: item.name,
        mobilenumber: item.mobileNumber,
        pincode: item.pinCode,
        location: item.location,
        address: item.address,
        city: {
          label: item.cityDistrictTown,
          value: item.cityDistrictTown,
          id: item.cityDistrictTown,
        },
        state: { id: item.state, label: item.state },
        landmark: item.landmark,
        alternatenumber: item.alternativeMobileNumber,
        latitudvalue: item.latitudeValue,
        longitudevalue: item.longitudeValue,
        addresstype: item?.addressType,
      });
      setNewAddressModal(true);
    }
  };
  const handleAddressSelect = async (item) => {
    if (item) {
      const { data, err } = await changePrimaryAddress(
        customer.userId,
        item.addressId
      );
      if (data) {
        dispatch(
          storeUserInfo({
            ...customer,
            addressDetails: { ...data.data },
          })
        );

        toastify(data?.message, "success");
        getAllData(customer.userId);
      }
      if (err) {
        toastify(err?.response?.data?.message, "error");
      }
    }
  };
  const handleDeleteClick = async (item) => {
    const { data, err } = await deleteCustomerAddress(
      customer.userId,
      item.addressId
    );
    if (data) {
      toastify(data?.message, "success");
      const customerData = await getCustomerById(customer.userId);
      if (customerData.data) {
        dispatch(
          storeUserInfo({
            ...customer,
            addressDetails: customerData.data.addressDetails,
          })
        );
      }
      getAllData(customer.userId);
    }
    if (err) {
      toastify(err?.response?.data?.message, "error");
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
        minHeightClassName={masterAddress.length > 2 ? "mnh-400" : ""}
      >
        <Box className="mxh-400">
          <Box className="mxh-350 overflow-auto hide-scrollbar">
            {masterAddress.length > 0 &&
              masterAddress.map((item, index) => (
                <Box
                  key={index}
                  className="rounded mt-3 mnh-150 p-2"
                  style={{
                    border: item.primary
                      ? "1px solid #E56700"
                      : "1px solid gray",
                    backgroundColor: item.primary ? "#E5670021" : "#E9E9E921",
                  }}
                >
                  <Box className="d-flex justify-content-between">
                    <CheckBoxComponent
                      label={item.name}
                      isChecked={item.primary}
                      showIcon
                      checkBoxClick={() => {
                        handleAddressSelect(item);
                      }}
                      iconType="circled"
                    />
                    <Box>
                      {item.primary ? (
                        <></>
                      ) : (
                        <DeleteIcon
                          className="cursor-pointer"
                          onClick={() => {
                            handleDeleteClick(item);
                          }}
                        />
                      )}
                    </Box>
                  </Box>
                  <Box className="d-flex justify-content-between">
                    <Box>
                      <Typography className="ps-3 fs-14">
                        {" "}
                        {`${item?.address}, ${item?.location}, ${
                          item?.landmark ? `${item?.landmark},` : ""
                        }  ${item?.cityDistrictTown}, ${item?.state}, ${
                          item?.pinCode
                        }.`}
                      </Typography>
                    </Box>
                    <Box>
                      <EditIcon
                        className="cursor-pointer"
                        onClick={() => {
                          handleEditClick(item);
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
              ))}
          </Box>
          <Box className="d-flex justify-content-center mt-3">
            <Typography
              className="theme_color fs-16 cursor-pointer"
              onClick={() => {
                setModalType("add");
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
          getAllData={getAllData}
          customer={customer}
          modalType={modalType}
        />
      )}
    </div>
  );
};

export default ChooseAddress;
