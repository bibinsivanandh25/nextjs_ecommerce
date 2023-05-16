/* eslint-disable prefer-destructuring */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-nested-ternary */
/* eslint-disable consistent-return */
import { Grid, Typography } from "@mui/material";
import { useRef, useState } from "react";
import ButtonComponent from "@/atoms/ButtonComponent";
import ModalComponent from "@/atoms/ModalComponent";
import CloseIcon from "@mui/icons-material/Close";
import toastify from "services/utils/toastUtils";
import {
  savewarrantyDetails,
  uploadMedia,
} from "services/supplier/orders/uploadwarranty";
import { useSelector } from "react-redux";

const UploadWarrantyModal = ({
  warrentyDetails = false,
  setShowModal = () => {},
}) => {
  const taxRef = useRef(null);
  const WarrantyRef = useRef(null);
  const paySlipRef = useRef(null);
  const { supplierId } = useSelector((state) => state.user);

  // eslint-disable-next-line no-unused-vars
  const [uploadedDocument, setUploadedDocument] = useState({
    taxInvoice: null,
    warrantyCard: null,
    payslip: null,
  });

  const saveimg = (documentType, img) => {
    const formData = new FormData();
    formData.append("medias", img);

    return uploadMedia(
      supplierId,
      warrentyDetails.orderId,
      warrentyDetails.productVariationId,
      documentType,
      formData
    ).then((res) => {
      if (!res.error) {
        return { [`${documentType}`]: res.data };
      }
    });
  };

  const handleSubmit = async () => {
    if (!Object.values(uploadedDocument).every((item) => item === null)) {
      const promiseAll = [];
      Object.keys(uploadedDocument).forEach((item) => {
        if (uploadedDocument[item]) {
          promiseAll.push(
            saveimg(
              item === "taxInvoice"
                ? "TAX_INVOICE"
                : item === "warrantyCard"
                ? "WARRANTY_CARD"
                : "PAYSLIP",
              uploadedDocument[item]
            )
          );
        }
      });
      const res = await Promise.all(promiseAll);
      if (res.length) {
        const payload = {
          orderId: warrentyDetails.orderId,
          productVariationId: warrentyDetails.productVariationId,
          isTaxInvoiceAvailable: false,
          taxInvoiceFileUrl: "",
          isWarrantyAvailable: false,
          warrantyCardFileUrl: "",
          isPayslipAvailable: false,
          payslipFileUrl: "",
        };
        res.forEach((item) => {
          if (item.hasOwnProperty("TAX_INVOICE")) {
            payload.isTaxInvoiceAvailable = true;
            payload.taxInvoiceFileUrl = item.TAX_INVOICE[0];
          } else if (item.hasOwnProperty("WARRANTY_CARD")) {
            payload.isWarrantyAvailable = true;
            payload.warrantyCardFileUrl = item.WARRANTY_CARD[0];
          } else if (item.hasOwnProperty("PAYSLIP")) {
            payload.isPayslipAvailable = true;
            payload.payslipFileUrl = item.PAYSLIP[0];
          }
        });
        const { data, err } = await savewarrantyDetails(payload);
        if (data) {
          toastify(data.message, "success");
          setShowModal(null);
        } else if (err) {
          toastify(err?.response?.data?.message, "error");
        }
      } else {
        toastify("Something went wrong. Try again.", "error");
      }
    } else {
      toastify("Please upload a file", "error");
    }
  };

  return (
    <ModalComponent
      open={warrentyDetails}
      onCloseIconClick={() => setShowModal(null)}
      ModalWidth={650}
      footerClassName="justify-content-end"
      ClearBtnText="Cancel"
      ModalTitle="Upload"
      onSaveBtnClick={handleSubmit}
    >
      <Grid container alignSelf="center" className="my-2">
        {warrentyDetails?.taxInvoiceAvailable && (
          <Grid
            item
            sm={12}
            alignItems="center"
            className="border d-flex justify-content-between py-2 px-1"
          >
            <Typography>Tax Invoice</Typography>
            {uploadedDocument.taxInvoice ? (
              <Typography className="color-light-blue">
                {uploadedDocument.taxInvoice.name}
                <CloseIcon
                  className="fs-16 ms-3"
                  onClick={() => {
                    setUploadedDocument((pre) => ({
                      ...pre,
                      taxInvoice: null,
                    }));
                  }}
                />
              </Typography>
            ) : (
              <ButtonComponent
                onBtnClick={() => {
                  taxRef.current.click();
                }}
                label="Upload Document"
              />
            )}
          </Grid>
        )}
        {warrentyDetails?.warrantyAvailable && (
          <Grid
            item
            sm={12}
            alignItems="center"
            className="border d-flex justify-content-between py-2 px-1 my-2"
          >
            <Typography>Upload Warranty</Typography>
            {uploadedDocument.warrantyCard ? (
              <Typography className="color-light-blue">
                {uploadedDocument.warrantyCard.name}
                <CloseIcon
                  className="fs-16 ms-3"
                  onClick={() => {
                    setUploadedDocument((pre) => ({
                      ...pre,
                      warrantyCard: null,
                    }));
                  }}
                />
              </Typography>
            ) : (
              <ButtonComponent
                onBtnClick={() => {
                  WarrantyRef.current.click();
                }}
                label="Upload Document"
              />
            )}
          </Grid>
        )}
        {warrentyDetails?.payslipAvailable && (
          <Grid
            item
            sm={12}
            alignItems="center"
            className="border d-flex justify-content-between py-2 px-1"
          >
            <Typography>Payslip</Typography>
            {uploadedDocument.payslip ? (
              <Typography className="color-light-blue">
                {uploadedDocument.payslip.name}
                <CloseIcon
                  className="fs-16 ms-3"
                  onClick={() => {
                    setUploadedDocument((pre) => ({
                      ...pre,
                      payslip: null,
                    }));
                  }}
                />
              </Typography>
            ) : (
              <ButtonComponent
                onBtnClick={() => {
                  paySlipRef.current.click();
                }}
                label="Upload Document"
              />
            )}
          </Grid>
        )}
      </Grid>
      <input
        type="file"
        hidden
        ref={taxRef}
        onChange={(e) => {
          setUploadedDocument((pre) => ({
            ...pre,
            taxInvoice: e.target.files[0],
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
            warrantyCard: e.target.files[0],
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
            payslip: e.target.files[0],
          }));
        }}
      />
    </ModalComponent>
  );
};
export default UploadWarrantyModal;
