import InputBox from "components/atoms/InputBoxComponent";
import ModalComponent from "components/atoms/ModalComponent";
import validateMessage from "constants/validateMessages";
import Image from "next/image";
import BankLogo from "public/assets/images/banklogo.png";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  AddBankDetails,
  EditBankDetails,
} from "services/customer/accountdetails/bankdetails";
import toastify from "services/utils/toastUtils";

const AddBankDetailsModal = ({
  BankDetails,
  isEdit = false,
  showModal = false,
  setShowModal = () => {},
  setBankDetails = () => {},
  getAllBankData = () => {},
}) => {
  const [errorObj, setErrorObj] = useState({});

  const { userId } = useSelector((state) => state.customer);

  const validateFields = () => {
    let flag = false;
    const errObj = {
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
      BankDetails["Account Number"]?.toString().length < 9 ||
      BankDetails["Account Number"]?.toString().length > 18
    ) {
      errObj.accountNumber = "Invalid Account.No";
      flag = true;
    }
    if (!errObj.accountNumber.length) {
      if (
        BankDetails["Account Number"]?.toString() !==
        BankDetails.ReBankAcc?.toString()
      ) {
        errObj.reenterAccountNumber = "Account No. is not matching";
        flag = true;
      }
    }
    if (!BankDetails.ReBankAcc?.length) {
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

  const addBank = async () => {
    const payload = {
      bankName: BankDetails["Bank Name"],
      accountNumber: BankDetails["Account Number"],
      accountHolderName: BankDetails["Account Holder Name"],
      ifscCode: BankDetails["IFSC code"],
      customerId: userId,
    };
    const { data } = await AddBankDetails(payload);
    if (data) {
      setShowModal(false);
      getAllBankData();
    }
  };

  const editBank = async () => {
    const payload = {
      bankId: BankDetails.id,
      bankName: BankDetails["Bank Name"],
      accountNumber: BankDetails["Account Number"],
      accountHolderName: BankDetails["Account Holder Name"],
      ifscCode: BankDetails["IFSC code"],
      customerId: userId,
    };
    // console.log(BankDetails);
    const { data, err } = await EditBankDetails(payload);
    if (data) {
      toastify(data?.message, "success");
      setShowModal(false);
      getAllBankData();
    }
    if (err) {
      toastify(err?.response?.data?.message, "success");
    }
  };

  return (
    <ModalComponent
      ModalTitle={isEdit ? "Edit Bank Details" : "Add Bank Details"}
      showClearBtn={false}
      open={showModal}
      onCloseIconClick={() => {
        setShowModal(false);
        setBankDetails([]);
        setErrorObj({});
      }}
      onSaveBtnClick={() => {
        const error = validateFields();
        if (!error) {
          if (!isEdit) {
            addBank();
          } else {
            editBank();
          }
        } else {
          setShowModal(true);
        }
      }}
    >
      <div className="d-flex flex-column justify-content-center align-items-center">
        <Image src={BankLogo} height={75} width={75} />
        <div className="fw-bold">Bank Details</div>
        <div className="my-2 w-100">
          <InputBox
            fullWidth
            required
            inputlabelshrink
            placeholder="Bank Name"
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
        <div className="my-2 w-100 ">
          <InputBox
            fullWidth
            required
            inputlabelshrink
            placeholder="Account Holder Name"
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
        <div className="my-2 w-100 ">
          <InputBox
            fullWidth
            required
            inputlabelshrink
            placeholder="Bank Account Number"
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
        <div className="my-2 w-100 ">
          <InputBox
            fullWidth
            inputlabelshrink
            placeholder="Re-Enter Bank Account Number"
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
            value={BankDetails?.ReBankAcc ? BankDetails?.ReBankAcc : ""}
          />
        </div>
        <div className="my-2 w-100 ">
          <InputBox
            fullWidth
            inputlabelshrink
            placeholder="IFSC code"
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
export default AddBankDetailsModal;
