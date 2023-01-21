import { Grid, Paper, Typography } from "@mui/material";
import CheckBoxComponent from "components/atoms/CheckboxComponent";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useDispatch, useSelector } from "react-redux";
import toastify from "services/utils/toastUtils";
import {
  changePrimaryAddress,
  deleteCustomerAddress,
  getAllCustomerAddress,
} from "services/customer/Home/address";
import NewAddress from "@/forms/customer/address/AddNewAddress";
import { storeUserInfo } from "features/customerSlice";

const PickUpAddress = ({ pageType = "supplier" }) => {
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
    city: {},
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
          } else {
            temp.push(item);
          }
        });
        setMasterAddress(temp);
      } else {
        setMasterAddress([]);
      }
    }
  };
  useEffect(() => {
    getAllData(customer.userId);
  }, [customer]);

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
      getAllData(customer.userId);
    }
    if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };
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
        city: { id: item.cityDistrictTown, label: item.cityDistrictTown },
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
  return (
    <div className="mnh-70vh overflow-auto hide-scrollbar bg-white p-2 rounded">
      <Grid container item xs={12} sx={{ p: 3 }} spacing={3}>
        <Grid xs={6} item>
          <Paper
            sx={{ py: 1.5, px: 3, border: "1px solid lightgray" }}
            className="fs-14 bg-white rounded theme_color cursor-pointer"
            onClick={() => {
              setModalType("add");
              setNewAddressModal(true);
            }}
          >
            + Add new Address{" "}
          </Paper>
        </Grid>
        <Grid xs={6} item />
        {masterAddress.length
          ? masterAddress.map((add) => (
              <Grid xs={6} item key={add?.addressId}>
                <Grid
                  container
                  sx={{
                    py: 1.5,
                    px: 3,
                    border: "1px solid lightgray",
                    backgroundColor: add?.primary ? "#F5E4D7 !important" : "",
                  }}
                  className="fs-16 bg-white rounded h-100"
                >
                  <Grid item xs={11}>
                    <Grid item xs={12} className="cursor-pointer d-inline">
                      <CheckBoxComponent
                        label={add?.name}
                        isChecked={add?.primary}
                        showIcon
                        checkBoxClick={() => {
                          handleAddressSelect(add);
                        }}
                        iconType="circled"
                      />
                    </Grid>
                    <Grid item xs={12} className="fs-14 fw-bold my-1 mx-4">
                      <Typography>
                        {" "}
                        {`${add?.address}, ${add?.location}, ${
                          add?.landmark ? `${add?.landmark},` : ""
                        }  ${add?.cityDistrictTown}, ${add?.state}, ${
                          add?.pinCode
                        }`}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} className="fs-12 mx-4">
                      <Typography> {add?.mobileNumber}</Typography>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    xs={1}
                    flexDirection="column"
                    container
                    alignItems="center"
                  >
                    {!add.primary ? (
                      <DeleteIcon
                        className="cursor-pointer"
                        sx={{ mb: 2 }}
                        onClick={() => {
                          handleDeleteClick(add);
                        }}
                      />
                    ) : null}
                    <EditIcon
                      className="cursor-pointer"
                      onClick={() => {
                        handleEditClick(add);
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            ))
          : null}
      </Grid>
      {newAddressModal && (
        <NewAddress
          setNewAddressModal={setNewAddressModal}
          newAddressModal={newAddressModal}
          defaultFormData={defaultFormData}
          setDefaultFormData={setDefaultFormData}
          getAllData={getAllData}
          customer={customer}
          modalType={modalType}
          pageType={pageType}
        />
      )}
    </div>
  );
};

export default PickUpAddress;
