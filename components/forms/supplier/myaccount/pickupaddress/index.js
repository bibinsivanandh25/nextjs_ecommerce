import { Box, Grid } from "@mui/material";
import CheckBoxComponent from "components/atoms/CheckboxComponent";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddAddressModal from "components/forms/supplier/myaccount/addaddressmodal";

const PickUpAddress = () => {
  const [addressList, setAddressList] = useState([
    { id: 1, name: "Perry", address: "#109, 3rd Cross, 4th Main, Tokyo" },
    { id: 2, name: "Angela", address: "#987, 1st Cross, 1st Main, Argentina" },
  ]);
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  return (
    <>
      <Grid container item xs={12} sx={{ py: 1 }} spacing={3}>
        <Grid xs={6} item>
          <Box
            sx={{ py: 1.5, px: 3, border: "1px solid lightgray" }}
            className="fs-12 bg-white rounded color-orange cursor-pointer"
            onClick={() => setShowAddAddressModal(true)}
          >
            + Add new Address{" "}
          </Box>
        </Grid>
        <Grid xs={6} />
        {addressList.map((add, index) => (
          <Grid xs={6} item onClick={() => setSelectedAddress(add.id)}>
            <Grid
              container
              sx={{
                py: 1.5,
                px: 3,
                border: "1px solid lightgray",
                backgroundColor:
                  add.id === selectedAddress && "#F5E4D7 !important",
              }}
              className="fs-16 bg-white rounded mnh-150 mxh-150 cursor-pointer"
            >
              <Grid item xs={11}>
                <Grid item xs={12}>
                  <CheckBoxComponent
                    label={`Address ${index + 1}`}
                    isChecked={add.id === selectedAddress}
                    showIcon
                    iconType="circled"
                  />
                </Grid>
                <Grid item xs={12} className="fs-14 fw-bold my-1 mx-4">
                  {add.name}
                </Grid>
                <Grid item xs={12} className="fs-12 mx-4">
                  {add.address}
                </Grid>
              </Grid>
              <Grid
                item
                xs={1}
                flexDirection="column"
                container
                alignItems="center"
              >
                <DeleteIcon sx={{ mb: 2 }} />
                <EditIcon />
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
      {showAddAddressModal && (
        <AddAddressModal setShowAddAddressModal={setShowAddAddressModal} />
      )}
    </>
  );
};

export default PickUpAddress;
