import React from "react";
import { Box, Grid, Tooltip, Typography } from "@mui/material";
import Image from "next/image";
import ModalComponent from "@/atoms/ModalComponent";
import ButtonComponent from "@/atoms/ButtonComponent";

const AcceptRejectModal = ({
  rowsDataObjects = [],
  modalId = 0,
  openAcceptRejectModal,
  setOpenAcceptRejectModal = () => {},
}) => {
  const returnImages = () => {
    return rowsDataObjects[modalId]?.col2.imgSrc.map((val) => {
      return (
        <Grid item xs={2} className="ms-2 text-center">
          {" "}
          <Image src={val} width={50} height={50} />{" "}
        </Grid>
      );
    });
  };

  const returnDiscount = (salePrice, mrpPrice) => {
    console.log("Sale Price ", salePrice);
    console.log("Mrp price ", mrpPrice);
    const diff = mrpPrice - salePrice;
    const fraction = diff / mrpPrice;
    return Math.round(fraction * 100);
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
              <span className="fw-bold">{rowsDataObjects[modalId]?.col1}</span>
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
                {rowsDataObjects[modalId]?.col3}
              </span>
            </Typography>
          </Box>
          <Box>
            <Typography className="fs-14 mt-2">
              SKU:{" "}
              <span className="fs-14 fw-bold">
                {rowsDataObjects[modalId]?.col4}
              </span>
            </Typography>
          </Box>
          <Box>
            <Typography className="fs-14 mt-2">
              Category/Subcategory:{" "}
              <span className="fs-14 fw-bold">
                {rowsDataObjects[modalId]?.col5}
              </span>
            </Typography>
          </Box>
          <Box>
            <Typography className="fs-14 mt-2">
              Weight/Volume:{" "}
              <span className="fs-14 fw-bold">
                {rowsDataObjects[modalId]?.col6}
              </span>
            </Typography>
          </Box>
          <Box>
            <Typography className="fs-14 mt-2">
              Total Stock:{" "}
              <span className="fs-14 fw-bold">
                {rowsDataObjects[modalId]?.col7}
              </span>
            </Typography>
          </Box>
          <Box>
            <Typography className="fs-14 mt-2">
              Sale Price/MRP:{" "}
              <span className="fs-14 fw-bold">
                {`${rowsDataObjects[modalId]?.col8.salePrice}/${rowsDataObjects[modalId]?.col8.mrpPrice}`}
              </span>
            </Typography>
          </Box>
          <Box>
            <Typography className="fs-14 mt-2">
              Discounts:{" "}
              <span className="fs-14 fw-bold">
                Supplier-
                {returnDiscount(
                  rowsDataObjects[modalId]?.col8.salePrice,
                  rowsDataObjects[modalId]?.col8.mrpPrice
                )}
                % discount
              </span>
            </Typography>
            <Typography className="fs-14 fw-bold ms-5 ps-4">
              Star Date - End Date
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
          />
          <ButtonComponent muiProps="fs-12 ms-2" label="Approve" />
        </Box>
      </ModalComponent>
    </>
  );
};

export default AcceptRejectModal;
