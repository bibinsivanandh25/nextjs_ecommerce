import InputBox from "components/atoms/InputBoxComponent";
import ModalComponent from "components/atoms/ModalComponent";
import Image from "next/image";
import BankLogo from "public/assets/images/banklogo.png";

const AddBankDetails = ({
  BankDetails,
  showModal = false,
  setShowModal = () => {},
  setBankDetails = () => {},
}) => {
  return (
    <ModalComponent
      ModalTitle="Add Bank Details"
      showClearBtn={false}
      open={showModal}
      onCloseIconClick={() => {
        setShowModal(false);
        setBankDetails([]);
      }}
    >
      <div className="d-flex flex-column justify-content-center align-items-center">
        <Image src={BankLogo} height={75} width={75} />
        <div className="fw-bold">Bank Details</div>
        <div className="my-2 ">
          <InputBox
            className="w-100"
            size="small"
            label="Bank Name"
            value={BankDetails["Bank Name"]}
          />
        </div>
        <div className="my-2 ">
          <InputBox
            className="w-100"
            size="small"
            label="Account Holder Name"
            value={BankDetails["Account Holder Name"]}
          />
        </div>
        <div className="my-2 ">
          <InputBox
            className="w-100"
            size="small"
            label="Bank Account Number"
            value={BankDetails["Account Number"]}
          />
        </div>
        <div className="my-2 ">
          <InputBox
            className="w-100"
            size="small"
            label="Re-Enter Bank Account Number"
          />
        </div>
        <div className="my-2 ">
          <InputBox
            className="w-100"
            size="small"
            label="IFSC code"
            value={BankDetails["IFSC code"]}
          />
        </div>
      </div>
    </ModalComponent>
  );
};
export default AddBankDetails;
