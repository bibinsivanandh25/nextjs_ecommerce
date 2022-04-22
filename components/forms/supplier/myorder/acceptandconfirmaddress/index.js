import ButtonComponent from "../../../../atoms/ButtonComponent";
import RadiobuttonComponent from "../../../../atoms/RadiobuttonComponent";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Paper from "@mui/material/paper";
import { Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
const AcceptandConfirmAdress = () => {
  const [radioChecked, setRadioChecked] = useState(false);
  const [pickupDetails, setpickupDetails] = useState([
    {
      name: "Madhusudhan Agrahar",
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
          <Grid item xs={9}>
            <p className="font-weight-bold">{ele.name}</p>
            <p>{ele.address}</p>
          </Grid>
          <Grid
            item
            xs={1}
            className="d-flex flex-column justify-content-between my-2"
          >
            <EditIcon
              onClick={() => {
                handleEditClick(index);
              }}
            />
            <DeleteIcon
              onClick={() => {
                handleDeleteClick(index);
              }}
            />
          </Grid>
        </Grid>
      );
    });
  };
  return (
    <>
      <div className="d-flex justify-content-between align-items-center ">
        <p className="fw-600">Select Pickup Address (5 orders Selected)</p>
        <ButtonComponent label="Ship with MrMrs Cart" />
      </div>
      <Paper className="px-3">
        <div className="d-flex justify-content-between py-3">
          <p>Pickup Details</p>
          <div className="d-flex align-items-center mx-2 ">
            <div className="bg-orange rounded-circle mx-2">
              <AddIcon className="text-white " />
            </div>
            Add New Address
          </div>
        </div>
        <Grid container spacing={1}>
          {getPickUpAdress()}
          <Grid item xs={2}></Grid>
        </Grid>
      </Paper>
    </>
  );
};
export default AcceptandConfirmAdress;
