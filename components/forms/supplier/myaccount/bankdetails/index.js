/* eslint-disable no-param-reassign */
/* eslint-disable react/no-array-index-key */
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  deleteBankDetails,
  getAllBankDetails,
  setPrimaryBank,
} from "services/supplier/myaccount/bankdetails";
import toastify from "services/utils/toastUtils";
import RadiobuttonComponent from "../../../../atoms/RadiobuttonComponent";
import AddBankDetailsModal from "./addbankdetails";

const BankDetails = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedBankDetails, setSelectedBankDetails] = useState([]);
  const [bankDetails, setbankDetails] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const user = useSelector((state) => state.user?.supplierId);

  const getAllBankData = async () => {
    const { data } = await getAllBankDetails(user);
    const result = [];
    if (data) {
      const temp = JSON.parse(JSON.stringify(data)).filter(
        (ele) => !ele.primary
      );
      temp.unshift(data.find((ele) => ele.primary));
      temp.forEach((item) => {
        result.push({
          "Bank Name": item.bankName,
          "Account Holder Name": item.accountHolderName,
          "Account Number": item.accountNumber,
          "IFSC code": item.ifscCode,
          isChecked: item.primary,
          id: item.bankId,
        });
      });
    }
    setbankDetails([...result]);
  };

  useEffect(() => {
    getAllBankData();
  }, []);

  const getBankDetails = (details) => {
    return Object.entries(details).map(([key, value]) => {
      return (
        <div key={value}>
          <div className={`${key === "isChecked" ? "d-none" : ""} fs-12 my-2`}>
            {key != "id" ? `${key} : ${value}` : null}
          </div>
        </div>
      );
    });
  };

  const deleteBankData = async (id) => {
    const { data } = await deleteBankDetails(user, id);
    if (data) {
      getAllBankData();
    }
  };
  const updatePrimaryAccount = async (e, id) => {
    const { data, err } = await setPrimaryBank(user, id);
    if (data) {
      setbankDetails((prev) => {
        const temp = prev.map((item) => {
          item.isChecked = false;
          return item;
        });
        temp[`${e.target.id}`].isChecked = !temp[`${e.target.id}`].isChecked;
        return [...temp];
      });
      toastify(data, "success");
    } else {
      toastify(err?.response?.data?.message, "error");
    }
  };
  const renderBankDetails = () => {
    return bankDetails.map((ele, index) => {
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
                  updatePrimaryAccount(e, bankDetails[index].id);
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
                  className="cursor-pointer"
                  onClick={() => {
                    setSelectedBankDetails(bankDetails[index]);
                    setIsEdit(true);
                    setShowModal(true);
                  }}
                />
              </Grid>
              <DeleteIcon
                className="cursor-pointer"
                onClick={() => {
                  deleteBankData(bankDetails[index].id);
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
        {renderBankDetails()}
        <Grid
          item
          xs={5}
          className="d-flex align-items-center justify-content-center w-100 cursor-pointer border border-1 mx-4 my-3 rounded mnh-130"
          onClick={() => {
            setIsEdit(false);
            setShowModal(true);
          }}
        >
          <AddCircleIcon className="text-secondary fs-1" />
        </Grid>
        <Grid item xs={2} />
      </Grid>
      <AddBankDetailsModal
        BankDetails={selectedBankDetails}
        showModal={showModal}
        setShowModal={setShowModal}
        setBankDetails={setSelectedBankDetails}
        isEdit={isEdit}
        getAllBankData={getAllBankData}
      />
    </div>
    // </Paper>
  );
};

export default BankDetails;
