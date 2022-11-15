import { Box, Grid, Tooltip, Typography } from "@mui/material";
import { acceptOrRejectProduct } from "services/admin/products/fixedMargin";
import toastify from "services/utils/toastUtils";
import Image from "next/image";
import ModalComponent from "@/atoms/ModalComponent";
import ButtonComponent from "@/atoms/ButtonComponent";
import { useState } from "react";
import ReasonToReject from "./ReasonToReject";

const AcceptRejectModal = ({
  sethelpSupportModal = () => {},
  getCount = () => {},
  rowsDataObjects = [],
  openAcceptRejectModal,
  setOpenAcceptRejectModal = () => {},
  getTableData = () => {},
  setOpenMergeToModal = () => {},
}) => {
  const [rejectReason, setRejectReason] = useState("");
  const [showReasonModal, setShowReasonModal] = useState(false);
  const returnImages = () => {
    return rowsDataObjects.variationMedia?.map((val) => {
      return (
        <Grid item xs={2} className="ms-2 text-center">
          <Image src={val} width={50} height={50} />{" "}
        </Grid>
      );
    });
  };

  const approveOrRejectProduct = async (status) => {
    const payload = {
      productVariationId: rowsDataObjects.productVariationId,
      status,
      rejectedReason: status === "APPROVED" ? null : rejectReason,
    };
    const { data, err, message } = await acceptOrRejectProduct(payload);

    if (data) {
      setOpenAcceptRejectModal(false);
      toastify(message, "success");
      getTableData(0);
      getCount();
    }
    if (err) {
      toastify(err.response.data.message, "error");
    }
  };
  return (
    <>
      <ModalComponent
        open={openAcceptRejectModal}
        ModalTitle="View Product"
        titleClassName="fw-bold fs-14 color-orange"
        ClearBtnText="Reject"
        saveBtnText="Approve"
        saveBtnClassName="ms-1"
        onCloseIconClick={() => {
          setOpenAcceptRejectModal(false);
        }}
        showFooter={false}
        ModalWidth={550}
      >
        <Box className="ms-5">
          <Box>
            <Typography className="fs-14">
              Vendor ID/ Name:{" "}
              <span className="fw-bold">
                {rowsDataObjects.supplierId} / {rowsDataObjects.supplierName}
              </span>
            </Typography>
          </Box>
          <Box className="d-flex mt-2">
            <Typography className="fs-14">Images:</Typography>
            <Grid className="mxh-150 overflow-auto" container>
              {returnImages()}
            </Grid>
          </Box>
          <Box>
            <Typography className="fs-14 mt-2">
              Product Title:{" "}
              <span className="fs-14 fw-bold">
                {rowsDataObjects.productTitle}
              </span>
            </Typography>
          </Box>
          <Box>
            <Typography className="fs-14 mt-2">
              SKU:{" "}
              <span className="fs-14 fw-bold">{rowsDataObjects.skuId}</span>
            </Typography>
          </Box>
          <Box>
            <Typography className="fs-14 mt-2">
              Category/Subcategory:{" "}
              <span className="fs-14 fw-bold">
                {rowsDataObjects.categoryName} /{" "}
                {rowsDataObjects.subCategoryName}
              </span>
            </Typography>
          </Box>
          <Box>
            <Typography className="fs-14 mt-2">
              Weight/Volume:{" "}
              <span className="fs-14 fw-bold">
                {rowsDataObjects.weightInclusivePackage} /{" "}
                {rowsDataObjects.volume}
              </span>
            </Typography>
          </Box>
          <Box>
            <Typography className="fs-14 mt-2">
              Total Stock:{" "}
              <span className="fs-14 fw-bold">{rowsDataObjects.stockQty}</span>
            </Typography>
          </Box>
          <Box>
            <Typography className="fs-14 mt-2">
              Sale Price/MRP:{" "}
              <span className="fs-14 fw-bold">
                {`${rowsDataObjects.salePrice}/${rowsDataObjects.mrp}`}
              </span>
            </Typography>
          </Box>
        </Box>
        <Box className="mt-3 ps-3 border-top py-2">
          <ButtonComponent
            muiProps="fs-12 color-gray"
            variant="text"
            label="flag"
          />
          <Tooltip title="Merge to">
            <ButtonComponent
              muiProps="fs-12 color-gray"
              variant="text"
              label="Merge to"
              onBtnClick={() => {
                setOpenAcceptRejectModal(false);
                setOpenMergeToModal(true);
              }}
            />
          </Tooltip>
          <ButtonComponent
            muiProps="fs-12 color-gray"
            variant="text"
            label="Raise Query"
            onBtnClick={() => {
              setOpenAcceptRejectModal(false);
              sethelpSupportModal({
                show: true,
                type: "ACTIVE_PRODUCT",
                to: {
                  id: rowsDataObjects.supplierId,
                  label: rowsDataObjects.supplierName,
                  value: rowsDataObjects.supplierId,
                },
                productVariationId: rowsDataObjects?.productVariationId,
              });
            }}
          />
          <ButtonComponent
            muiProps="fs-12 color-gray"
            variant="text"
            label="Cancel"
          />
          <ButtonComponent
            muiProps="fs-12 mx-3"
            borderColor="border-danger"
            textColor="text-danger"
            variant="outlined"
            label="Reject"
            onBtnClick={() => {
              setShowReasonModal(true);
              // approveOrRejectProduct("REJECTED");
              // getTableData(0);
              // getCount();
            }}
          />
          <ButtonComponent
            muiProps="fs-12 ms-2"
            label="Approve"
            onBtnClick={() => {
              approveOrRejectProduct("APPROVED");
            }}
          />
        </Box>
        {showReasonModal ? (
          <ReasonToReject
            showModal={showReasonModal}
            setShowModal={setShowReasonModal}
            rejectReason={rejectReason}
            setRejectReason={setRejectReason}
            onSaveClick={approveOrRejectProduct}
          />
        ) : null}
      </ModalComponent>
    </>
  );
};

export default AcceptRejectModal;
