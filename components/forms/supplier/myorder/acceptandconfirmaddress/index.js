/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-param-reassign */
/* eslint-disable react/no-array-index-key */
import { useState } from "react";
import { Grid, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/router";
import CustomIcon from "services/iconUtils";
import RadiobuttonComponent from "../../../../atoms/RadiobuttonComponent";
import ButtonComponent from "../../../../atoms/ButtonComponent";
import AddAddressModal from "../../myaccount/addaddressmodal";

const AcceptandConfirmAdress = ({ setshowConfirmAdress = () => {} }) => {
  // const [radioChecked, setRadioChecked] = useState(false);

  const [showAddAddress, setShowAddAddress] = useState(false);
  const [pickupDetails, setpickupDetails] = useState([
    {
      name: "Madhusudhan Agrahr",
      address:
        "Evoma Businness center , KR PURAM , old madras road , Bangalore Karnataka- 000001",
      isChecked: false,
    },
    {
      name: "Madhusudhan Agrahar",
      address:
        "Evoma Businness center , KR PURAM , old madras road , Bangalore Karnataka- 000002",
      isChecked: false,
    },
    {
      name: "Madhusudhan Agrahar",
      address:
        "Evoma Businness center , KR PURAM , old madras road , Bangalore Karnataka- 000003",
      isChecked: false,
    },
    {
      name: "Madhusudhan Agrahar",
      address:
        "Evoma Businness center , KR PURAM , old madras road , Bangalore Karnataka- 000004",
      isChecked: false,
    },
    {
      name: "Madhusudhan Agrahar",
      address:
        "Evoma Businness center , KR PURAM , old madras road , Bangalore Karnataka- 000005",
      isChecked: false,
    },
    {
      name: "Madhusudhan Agrahar",
      address:
        "Evoma Businness center , KR PURAM , old madras road , Bangalore Karnataka- 000006",
      isChecked: false,
    },
  ]);
  const route = useRouter();
  const handleEditClick = (ind) => {
    console.log(pickupDetails[ind].name);
  };
  const handleDeleteClick = (ind) => {
    console.log(pickupDetails[ind].address);
  };
  const getPickUpAdress = () => {
    return pickupDetails.map((ele, index) => {
      return (
        <Grid
          item
          xs={5}
          container
          className="border border-1 mx-4 my-3 rounded"
          key={index}
        >
          <Grid item xs={1} className="d-flex align-items-center mx-2">
            <RadiobuttonComponent
              id={index}
              isChecked={ele.isChecked}
              onRadioChange={(e) => {
                setpickupDetails((prev) => {
                  const temp = prev.map((item) => {
                    item.isChecked = false;
                    return item;
                  });
                  temp[`${e.target.id}`].isChecked =
                    !temp[`${e.target.id}`].isChecked;
                  return [...temp];
                });
              }}
            />
          </Grid>
          <Grid item xs={9} className="my-2 ">
            <p className="font-weight-bold">{ele.name}</p>
            <p>{ele.address}</p>
          </Grid>
          <Grid
            item
            xs={1}
            className="d-flex flex-column justify-content-between my-2 ms-auto"
          >
            <CustomIcon
              type="edit"
              title="edit"
              onIconClick={() => {
                handleEditClick(index);
              }}
            />
            <CustomIcon
              type="delete"
              title="delete"
              onIconClick={() => {
                handleDeleteClick(index);
              }}
            />
          </Grid>
        </Grid>
      );
    });
  };
  return (
    <div>
      <p
        className="color-orange cursor-pointer position-absolute top-0"
        onClick={() => {
          setshowConfirmAdress(false);
        }}
      >
        {"< "}
        Back
      </p>
      <div className="d-flex justify-content-between align-items-center">
        <p className="fw-600">Select Pickup Address (5 orders Selected)</p>
        <ButtonComponent
          label="Ship with MrMrs Cart"
          onBtnClick={() =>
            route.push("/supplier/myorders/neworder/generateinvoiceandmanifest")
          }
        />
      </div>
      <Paper
        elevation={3}
        className="px-3 mt-2 mnh-40vh hide-scrollbar overflow-auto"
        sx={{
          maxHeight: "53vh",
        }}
      >
        <div className="d-flex justify-content-between py-3">
          <p className="fw-bold">Pickup Details</p>
          <div
            className="d-flex align-items-center mx-2 cursor-pointer"
            onClick={() => {
              setShowAddAddress(true);
            }}
          >
            <div className="bg-orange rounded-circle mx-2">
              <AddIcon className="text-white " />
            </div>
            Add New Address
          </div>
        </div>
        <Grid container spacing={1} justifyContent="center">
          {getPickUpAdress()}
          <Grid item xs={2} />
        </Grid>
      </Paper>
      {showAddAddress ? (
        <AddAddressModal setShowAddAddressModal={setShowAddAddress} />
      ) : null}
    </div>
  );
};
export default AcceptandConfirmAdress;
