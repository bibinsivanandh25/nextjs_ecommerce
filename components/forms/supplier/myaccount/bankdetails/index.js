/* eslint-disable no-param-reassign */
/* eslint-disable react/no-array-index-key */
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Grid } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RadiobuttonComponent from "../../../../atoms/RadiobuttonComponent";
import AddBankDetails from "./addbankdetails";

const BankDetails = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedBankDetails, setSelectedBankDetails] = useState([]);
  const [pickupDetails, setpickupDetails] = useState([
    {
      "Bank Name": "ICICI Bank",
      "Account Holder Name": "Madhusudhan Agrahar1",
      "Account Number": 1234567890,
      "IFSC code": "ICIC0000001",
      isChecked: false,
    },
    {
      "Bank Name": "ICICI Bank",
      "Account Holder Name": "Madhusudhan Agrahar2",
      "Account Number": 1234567890,
      "IFSC code": "ICIC0000001",
      isChecked: false,
    },
    {
      "Bank Name": "ICICI Bank",
      "Account Holder Name": "Madhusudhan Agrahar3",
      "Account Number": 1234567890,
      "IFSC code": "ICIC0000001",
      isChecked: false,
    },
    {
      "Bank Name": "ICICI Bank",
      "Account Holder Name": "Madhusudhan Agrahar4",
      "Account Number": 1234567890,
      "IFSC code": "ICIC0000001",
      isChecked: false,
    },
  ]);
  const getBankDetails = (details) => {
    return Object.entries(details).map(([key, value]) => {
      return (
        <div key={value}>
          <div className={`${key === "isChecked" ? "d-none" : ""} fs-12 my-2`}>
            {key} : {value}
          </div>
        </div>
      );
    });
  };
  const getPickUpAdress = () => {
    return pickupDetails.map((ele, index) => {
      return (
        <Grid
          item
          xs={5}
          container
          className="border border-1 mx-4 my-3 rounded mnh-130"
          key={index}
        >
          <Grid container>
            <Grid item xs={1} className="d-flex align-items-center mx-2 ">
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
              {getBankDetails(ele)}
            </Grid>
            <Grid
              item
              xs={1}
              className="d-flex flex-column align-items-center justify-content-center"
            >
              <Grid className="my-2">
                <EditIcon
                  onClick={() => {
                    // handleEditClick(index);
                    setSelectedBankDetails(pickupDetails[index]);
                    // console.log(pickupDetails[index]);
                    setShowModal(true);
                  }}
                />
              </Grid>
              <DeleteIcon
                onClick={() => {
                  console.log(pickupDetails[index]);
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      );
    });
  };
  return (
    // <Paper className="h-95p overflow-auto">
    <div className="mnh-70vh mxh-70vh overflow-auto hide-scrollbar bg-white rounded">
      <Grid className="p-4 fw-bold color-orange">Choose Bank</Grid>
      <Grid container>
        {getPickUpAdress()}
        <Grid
          item
          xs={5}
          className="d-flex align-items-center justify-content-center w-100 cursor-pointer border border-1 mx-4 my-3 rounded mnh-130"
          onClick={() => setShowModal(true)}
        >
          <AddCircleIcon className="text-secondary fs-1" />
        </Grid>
        <Grid item xs={2} />
      </Grid>
      <AddBankDetails
        BankDetails={selectedBankDetails}
        showModal={showModal}
        setShowModal={setShowModal}
        setBankDetails={setSelectedBankDetails}
      />
    </div>
    // </Paper>
  );
};

export default BankDetails;
