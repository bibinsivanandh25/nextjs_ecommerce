import { Grid, Paper, Typography } from "@mui/material";
import CheckBoxComponent from "components/atoms/CheckboxComponent";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddAddressModal from "components/forms/supplier/myaccount/addaddressmodal";
import {
  changePrimaryAddress,
  deleteAddress,
  getAllAddressofSupplier,
} from "services/supplier/myaccount/pickupaddress";
import { useSelector } from "react-redux";

const PickUpAddress = () => {
  const [addressList, setAddressList] = useState([]);
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const [selectId, setSelectId] = useState({ type: null, id: null });
  const [selectedAddress, setSelectedAddress] = useState(null);

  const user = useSelector((state) => state.user?.supplierId);

  const getAllAddress = async () => {
    const { data } = await getAllAddressofSupplier(user);
    if (data) {
      const result = JSON.parse(JSON.stringify(data));
      const temp = result.filter((ele) => !ele.primary);
      temp.unshift(data.find((ele) => ele.primary));
      setAddressList([...temp]);
      temp.forEach((item) => {
        if (item.primary) {
          setSelectedAddress(item.addressId);
        }
      });
    }
  };

  const setPrimaryAddress = async (id) => {
    await changePrimaryAddress(user, id);
  };

  const deletedSelectedAddress = async (id) => {
    const { data } = await deleteAddress(user, id);
    if (data) {
      getAllAddress();
    }
  };

  useEffect(() => {
    getAllAddress();
  }, []);

  return (
    <div className="mnh-70vh overflow-auto hide-scrollbar bg-white p-2 rounded">
      <Grid container item xs={12} sx={{ p: 3 }} spacing={3}>
        <Grid xs={6} item>
          <Paper
            sx={{ py: 1.5, px: 3, border: "1px solid lightgray" }}
            className="fs-12 bg-white rounded color-orange cursor-pointer"
            onClick={() => {
              setSelectId({ type: "add", id: selectedAddress });
              setShowAddAddressModal(true);
            }}
          >
            + Add new Address{" "}
          </Paper>
        </Grid>
        <Grid xs={6} item />
        {addressList.map((add) => (
          <Grid xs={6} item key={add.addressId}>
            <Grid
              container
              sx={{
                py: 1.5,
                px: 3,
                border: "1px solid lightgray",
                backgroundColor:
                  add.addressId === selectedAddress && "#F5E4D7 !important",
              }}
              className="fs-16 bg-white rounded h-100"
            >
              <Grid item xs={11}>
                <Grid item xs={12} className="cursor-pointer d-inline">
                  <CheckBoxComponent
                    label={add.name}
                    isChecked={add.addressId === selectedAddress}
                    showIcon
                    checkBoxClick={() => {
                      setPrimaryAddress(add.addressId);
                      setSelectedAddress(add.addressId);
                    }}
                    iconType="circled"
                  />
                </Grid>
                <Grid item xs={12} className="fs-14 fw-bold my-1 mx-4">
                  <Typography>
                    {" "}
                    {`${add.address}, ${add.location}, ${add.landmark}, ${add.cityDistrictTown}, ${add.state}, ${add.pinCode}`}
                  </Typography>
                </Grid>
                <Grid item xs={12} className="fs-12 mx-4">
                  <Typography> {add.mobileNumber}</Typography>
                </Grid>
              </Grid>
              <Grid
                item
                xs={1}
                flexDirection="column"
                container
                alignItems="center"
              >
                <DeleteIcon
                  className="cursor-pointer"
                  sx={{ mb: 2 }}
                  onClick={() => {
                    deletedSelectedAddress(add.addressId);
                    setSelectId({ type: "delete", id: add.addressId });
                  }}
                />
                <EditIcon
                  className="cursor-pointer"
                  onClick={() => {
                    setShowAddAddressModal(true);
                    setSelectId({ type: "edit", id: add.addressId });
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
      {showAddAddressModal && (
        <AddAddressModal
          showAddressModal={showAddAddressModal}
          setShowAddAddressModal={setShowAddAddressModal}
          values={addressList.find((i) => i.addressId === selectId.id)}
          type={selectId.type}
          setSelectId={setSelectId}
          getAllAddress={getAllAddress}
        />
      )}
    </div>
  );
};

export default PickUpAddress;
