import InputBox from "components/atoms/InputBoxComponent";
import ModalComponent from "components/atoms/ModalComponent";
import validateMessage from "constants/validateMessages";
import Image from "next/image";
import BankLogo from "public/assets/images/banklogo.png";
import { useEffect, useState } from "react";

const AddBankDetails = ({
  BankDetails,
  showModal = false,
  setShowModal = () => {},
  setBankDetails = () => {},
}) => {
  const [errorObj, setErrorObj] = useState({});

  const validateFields = () => {
    let flag = false;
    let errObj = {
      bankName: "",
      accountHolderName: "",
      accountNumber: "",
      reenterAccountNumber: "",
      ifscCode: "",
    };
    if (!BankDetails["Bank Name"]?.length) {
      errObj.bankName = validateMessage.field_required;
      flag = true;
    }
    if (BankDetails["Bank Name"]?.length > 100) {
      errObj.bankName = validateMessage.alpha_numeric_max_100;
      flag = true;
    }
    if (!BankDetails["Account Holder Name"]?.length) {
      errObj.accountHolderName = validateMessage.field_required;
      flag = true;
    }
    if (BankDetails["Account Holder Name"]?.length > 100) {
      errObj.accountHolderName = validateMessage.alpha_numeric_max_100;
      flag = true;
    }
    if (!BankDetails["Account Number"]?.toString().length) {
      errObj.accountNumber = validateMessage.field_required;
      flag = true;
    }
    if (
      BankDetails["Account Number"]?.toString().tolength < 9 ||
      BankDetails["Account Number"]?.toString().length > 18
    ) {
      errObj.accountNumber = "Invalid Account.No";
      flag = true;
    }
    if (!errObj.accountNumber.length) {
      if (
        BankDetails["Account Number"]?.toString() !==
        BankDetails["ReBankAcc"]?.toString()
      ) {
        errObj.reenterAccountNumber = "Account No. is not matching";
        flag = true;
      }
    }
    if (!BankDetails["ReBankAcc"]?.length) {
      flag = true;
      errObj.reenterAccountNumber = validateMessage.field_required;
    }
    if (!/^[A-Z]{4}[0][A-Z0-9]{6}$/.test(BankDetails["IFSC code"])) {
      errObj.ifscCode = "Invalid IFSC code";
      flag = true;
    }
    setErrorObj({ ...errObj });
    return flag;
  };
  return (
    <ModalComponent
      ModalTitle="Add Bank Details"
      showClearBtn={false}
      open={showModal}
      onCloseIconClick={() => {
        setShowModal(false);
        setBankDetails([]);
        setErrorObj({});
      }}
      onSaveBtnClick={() => {
        let error = validateFields();
        if (!error) {
          setShowModal(false);
        } else {
          setShowModal(true);
        }
      }}
    >
      <div className="d-flex flex-column justify-content-center align-items-center">
        <Image src={BankLogo} height={75} width={75} />
        <div className="fw-bold">Bank Details</div>
        <div className="my-2 ">
          <InputBox
            required
            className="w-100"
            helperText={errorObj.bankName}
            error={errorObj.bankName?.length}
            size="small"
            label="Bank Name"
            value={BankDetails["Bank Name"]}
            onInputChange={(e) => {
              setBankDetails((pre) => ({
                ...pre,
                "Bank Name": e.target.value,
              }));
            }}
          />
        </div>
        <div className="my-2 ">
          <InputBox
            required
            helperText={errorObj.accountHolderName}
            error={errorObj.accountHolderName?.length}
            className="w-100"
            size="small"
            label="Account Holder Name"
            value={BankDetails["Account Holder Name"]}
            onInputChange={(e) => {
              setBankDetails((pre) => ({
                ...pre,
                "Account Holder Name": e.target.value,
              }));
            }}
          />
        </div>
        <div className="my-2 ">
          <InputBox
            required
            type="number"
            className="w-100"
            helperText={errorObj.accountNumber}
            error={errorObj.accountNumber?.length}
            size="small"
            label="Bank Account Number"
            value={BankDetails["Account Number"]}
            onInputChange={(e) => {
              setBankDetails((pre) => ({
                ...pre,
                "Account Number": e.target.value,
              }));
            }}
          />
        </div>
        <div className="my-2 ">
          <InputBox
            required
            type="number"
            className="w-100"
            size="small"
            helperText={errorObj.reenterAccountNumber}
            error={errorObj.reenterAccountNumber?.length}
            label="Re-Enter Bank Account Number"
            onInputChange={(e) => {
              setBankDetails((pre) => ({
                ...pre,
                ReBankAcc: e.target.value,
              }));
            }}
            value={
              BankDetails?.ReBankAcc
                ? BankDetails?.ReBankAcc
                : BankDetails["Account Number"]
            }
          />
        </div>
        <div className="my-2 ">
          <InputBox
            required
            className="w-100"
            size="small"
            label="IFSC code"
            helperText={errorObj.ifscCode}
            error={errorObj.ifscCode?.length}
            value={BankDetails["IFSC code"]}
            onInputChange={(e) => {
              setBankDetails((pre) => ({
                ...pre,
                "IFSC code": e.target.value,
              }));
            }}
          />
        </div>
      </div>
    </ModalComponent>
  );
};
export default AddBankDetails;
