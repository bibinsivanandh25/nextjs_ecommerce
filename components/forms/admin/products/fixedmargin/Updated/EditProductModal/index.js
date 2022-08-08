import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import CustomIcon from "services/iconUtils";
import ButtonComponent from "@/atoms/ButtonComponent";
import ModalComponent from "@/atoms/ModalComponent";

const EditProductModal = ({
  openEditModalForUpdated,
  setOpenEditModalForUpdated,
  rowsDataObjectsForUpdated,
  modalId,
}) => {
  const returnImages = () => {
    return rowsDataObjectsForUpdated[modalId]?.col2.imgSrc.map((val) => {
      return (
        <Grid item xs={2} className="ms-2 text-center">
          {" "}
          <Image src={val} width={50} height={50} />{" "}
        </Grid>
      );
    });
  };

  return (
    <>
      <ModalComponent
        open={openEditModalForUpdated}
        ModalTitle="View Product"
        titleClassName="fw-bold fs-14 color-orange"
        ClearBtnText="Reject"
        saveBtnText="Approve"
        saveBtnClassName="ms-1"
        onCloseIconClick={() => {
          setOpenEditModalForUpdated(false);
        }}
        showFooter={false}
        ModalWidth={550}
      >
        <Box className="ms-5">
          <Box className="d-flex justify-content-between mt-3">
            <Typography className="fs-14">
              Product Id:{" "}
              <span className="fw-bold">
                {rowsDataObjectsForUpdated[modalId]?.col1}
              </span>
            </Typography>
            <CustomIcon type="edit" />
          </Box>
          <Box className="d-flex mt-3">
            <Typography className="fs-14">Images:</Typography>
            <Grid className="mxh-150 overflow-auto" container>
              {returnImages()}
            </Grid>
          </Box>
          <Box>
            <Typography className="fs-14 mt-3">
              Vendor Id/Business Name:{" "}
              <span className="fs-14 fw-bold">
                {rowsDataObjectsForUpdated[modalId]?.col3}
              </span>
            </Typography>
          </Box>
          <Box>
            <Typography className="fs-14 mt-3">
              Category Subcategory:{" "}
              <span className="fs-14 fw-bold">
                {rowsDataObjectsForUpdated[modalId]?.col4}
              </span>
            </Typography>
          </Box>
          <Box>
            <Typography className="fs-14 mt-3">
              Change:{" "}
              <span className="fs-14 fw-bold">
                {rowsDataObjectsForUpdated[modalId]?.col5}
              </span>
            </Typography>
          </Box>
          <Box>
            <Typography className="fs-14 mt-3">
              Updated date & time:{" "}
              <span className="fs-14 fw-bold">
                {rowsDataObjectsForUpdated[modalId]?.col6}
              </span>
            </Typography>
          </Box>
        </Box>
        <Box className="mt-3 d-flex justify-content-end ps-3 border-top py-2">
          <ButtonComponent
            muiProps="fs-12 color-gray"
            variant="text"
            label="Raise Query"
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

export default EditProductModal;
