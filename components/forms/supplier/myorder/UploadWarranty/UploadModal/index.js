import { Grid, Typography } from "@mui/material";
import { useRef, useState } from "react";
import ButtonComponent from "@/atoms/ButtonComponent";
import ModalComponent from "@/atoms/ModalComponent";

const UploadWarrantyModal = ({
  showModal = false,
  setShowModal = () => {},
}) => {
  const taxRef = useRef(null);
  const WarrantyRef = useRef(null);
  const paySlipRef = useRef(null);

  // eslint-disable-next-line no-unused-vars
  const [uploadedDocument, setUploadedDocument] = useState({
    taxInvoice: null,
    warrantyCard: null,
    payslip: null,
  });

  return (
    <ModalComponent
      open={showModal}
      onCloseIconClick={() => setShowModal(false)}
      ModalWidth={650}
      footerClassName="justify-content-end"
      ClearBtnText="Cancel"
      ModalTitle="Upload"
    >
      <Grid container alignSelf="center" className="my-2">
        <Grid
          item
          sm={12}
          alignItems="center"
          className="border d-flex justify-content-between py-2 px-1"
        >
          <Typography>Tax Invoice</Typography>
          {/* <Typography>{uploadedDocument.taxInvoice}</Typography> */}
          <ButtonComponent
            onBtnClick={() => {
              taxRef.current.click();
            }}
            label="Upload Document"
          />
        </Grid>
        <Grid
          item
          sm={12}
          alignItems="center"
          className="border d-flex justify-content-between py-2 px-1 my-2"
        >
          <Typography>Upload Warranty</Typography>
          {/* <Typography>{uploadedDocument.warrantyCard}</Typography> */}
          <ButtonComponent
            onBtnClick={() => {
              WarrantyRef.current.click();
            }}
            label="Upload Document"
          />
        </Grid>
        <Grid
          item
          sm={12}
          alignItems="center"
          className="border d-flex justify-content-between py-2 px-1"
        >
          <Typography>Payslip</Typography>
          {/* <Typography>{uploadedDocument.payslip}</Typography> */}
          <ButtonComponent
            onBtnClick={() => {
              paySlipRef.current.click();
            }}
            label="Upload Document"
          />
        </Grid>
      </Grid>
      <input
        type="file"
        hidden
        ref={taxRef}
        onChange={(e) => {
          setUploadedDocument((pre) => ({
            ...pre,
            taxInvoice: e.target.files[0].name,
          }));
        }}
      />
      <input
        type="file"
        hidden
        ref={WarrantyRef}
        onChange={(e) => {
          setUploadedDocument((pre) => ({
            ...pre,
            warrantyCard: e.target.files[0].name,
          }));
        }}
      />
      <input
        type="file"
        hidden
        ref={paySlipRef}
        onChange={(e) => {
          setUploadedDocument((pre) => ({
            ...pre,
            payslip: e.target.files[0].name,
          }));
        }}
      />
    </ModalComponent>
  );
};
export default UploadWarrantyModal;
