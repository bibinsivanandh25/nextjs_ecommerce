import React from "react";
import { Box, Grid, Tooltip, Typography } from "@mui/material";
import { acceptOrRejectProduct } from "services/admin/products/fixedMargin";
import toastify from "services/utils/toastUtils";
import Image from "next/image";
import ModalComponent from "@/atoms/ModalComponent";
import ButtonComponent from "@/atoms/ButtonComponent";

const AcceptRejectModal = ({
  getCount = () => {},
  rowsDataObjects = [],
  openAcceptRejectModal,
  setOpenAcceptRejectModal = () => {},
  getTableData = () => {},
}) => {
  const returnImages = () => {
    return rowsDataObjects.variationMedia.map((val) => {
      return (
        <Grid item xs={2} className="ms-2 text-center">
          {" "}
          <Image src={val} width={50} height={50} />{" "}
        </Grid>
      );
    });
  };

  const approveOrRejectProduct = async (status) => {
    const payload = {
      productVariationId: rowsDataObjects.productVariationId,
      status,
    };
    const { data, err } = await acceptOrRejectProduct(payload);

    if (data) {
      setOpenAcceptRejectModal(false);
    }
    if (err) {
      toastify(err.response.data.message);
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
          <Tooltip title="Merge to flag">
            <ButtonComponent
              muiProps="fs-12 color-gray"
              variant="text"
              label="Merge to flag"
            />
          </Tooltip>
          <ButtonComponent
            muiProps="fs-12 color-gray"
            variant="text"
            label="Raise Query"
          />
          <ButtonComponent
            muiProps="fs-12 color-gray"
            variant="text"
            label="Cancel"
          />
          <ButtonComponent
            muiProps="fs-12"
            borderColor="border-danger"
            textColor="text-danger"
            variant="outlined"
            label="Reject"
            onBtnClick={() => {
              approveOrRejectProduct("REJECTED");
              getTableData();
              getCount();
            }}
          />
          <ButtonComponent
            muiProps="fs-12 ms-2"
            label="Approve"
            onBtnClick={() => {
              approveOrRejectProduct("APPROVED");
              getTableData();
              getCount();
            }}
          />
        </Box>
      </ModalComponent>
    </>
  );
};

export default AcceptRejectModal;
