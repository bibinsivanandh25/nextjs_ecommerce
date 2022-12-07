import ButtonComponent from "@/atoms/ButtonComponent";
import ModalComponent from "@/atoms/ModalComponent";
import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { acceptOrRejectProduct } from "services/admin/products/fixedMargin";
import toastify from "services/utils/toastUtils";
import ReasonToReject from "../../ProductsToApprove/AcceptRejectmodal/ReasonToReject";

const ViewUpdatedProducts = ({
  showModal = false,
  setShowModal = () => {},
  productDetails = {},
  sethelpSupportModal = () => {},
  getCount = () => {},
  getTableData = () => {},
}) => {
  const [rejectReason, setRejectReason] = useState("");
  const [showReasonModal, setShowReasonModal] = useState(false);

  const approveOrRejectProduct = async (status) => {
    const payload = {
      productVariationId: productDetails.productVariationId,
      status,
      rejectedReason: status === "APPROVED" ? null : rejectReason,
    };
    const { data, err, message } = await acceptOrRejectProduct(payload);

    if (data) {
      setShowModal(false);
      toastify(message, "success");
      getTableData(0);
      getCount();
    }
    if (err) {
      toastify(err.response.data.message, "error");
    }
  };
  return (
    <ModalComponent
      open={showModal}
      onCloseIconClick={() => {
        setShowModal(false);
      }}
      ModalTitle="View Product"
      footerClassName="d-none"
      ModalWidth={600}
    >
      <Grid
        container
        rowSpacing={2}
        columnSpacing={1}
        display="flex"
        alignItems="center"
        className=" py-3"
      >
        <Grid item sm={4}>
          Vendor ID
        </Grid>
        <Grid item sm={1} display="flex" justifyContent="center">
          :
        </Grid>
        <Grid item sm={7}>
          {productDetails?.supplierId}
        </Grid>
        <Grid item sm={4}>
          Business Name
        </Grid>
        <Grid item sm={1} display="flex" justifyContent="center">
          :
        </Grid>
        <Grid item sm={7}>
          {productDetails?.businessName}
        </Grid>
        <Grid item sm={4}>
          Images
        </Grid>
        <Grid item sm={1} display="flex" justifyContent="center">
          :
        </Grid>
        <Grid item sm={7}>
          {productDetails?.variationMedia?.map((ele) => {
            return <Image src={ele} height={50} width={50} />;
          })}
        </Grid>
        <Grid item sm={4}>
          Category / Sub Category
        </Grid>
        <Grid item sm={1} display="flex" justifyContent="center">
          :
        </Grid>
        <Grid item sm={7}>
          {productDetails?.categoryName} / {productDetails?.subCategoryName}
        </Grid>
        <Grid item sm={4}>
          Changes
        </Grid>
        <Grid item sm={1} display="flex" justifyContent="center">
          :
        </Grid>
        <Grid item sm={7} className="mxh-130 overflow-auto ">
          {productDetails?.changes?.map((ele, ind) => {
            return (
              <Typography className="h-5">{`${ind + 1}. ${ele}`}</Typography>
            );
          })}
        </Grid>
        <Grid item sm={4}>
          Updated Date & Time
        </Grid>
        <Grid item sm={1} display="flex" justifyContent="center">
          :
        </Grid>
        <Grid item sm={7}>
          {productDetails?.lastUpdatedAt}
        </Grid>
      </Grid>
      <Box className="mt-3 ps-3 border-top py-2 d-flex justify-content-end">
        <ButtonComponent
          muiProps="fs-12 color-gray"
          variant="text"
          label="Raise Query"
          onBtnClick={() => {
            setShowModal(false);
            sethelpSupportModal({
              show: true,
              type: "ACTIVE_PRODUCT",
              to: {
                id: productDetails?.supplierId,
                label: productDetails?.businessName,
                value: productDetails?.supplierId,
              },
              productVariationId: productDetails?.productVariationId,
            });
          }}
        />
        <ButtonComponent
          muiProps="fs-12 color-gray"
          variant="text"
          label="Cancel"
          onBtnClick={() => {
            setShowModal(false);
          }}
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
        {showReasonModal ? (
          <ReasonToReject
            showModal={showReasonModal}
            setShowModal={setShowReasonModal}
            rejectReason={rejectReason}
            setRejectReason={setRejectReason}
            onSaveClick={approveOrRejectProduct}
          />
        ) : null}
      </Box>
    </ModalComponent>
  );
};
export default ViewUpdatedProducts;
