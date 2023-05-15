import { Grid, Typography } from "@mui/material";
import ModalComponent from "components/atoms/ModalComponent";
import Image from "next/image";

const ViewModal = ({
  showViewModal = false,
  setShowViewModal = () => {},
  dataForViewModal,
  tabType = "tab1",
  handleOpenReplyModal,
  handleMenuSelecteItemsForAnswers,
}) => {
  console.log(dataForViewModal, "dataForViewModal");
  const handleSaveBtnClick = () => {
    if (tabType === "tab1")
      handleOpenReplyModal(
        dataForViewModal.customerQId,
        dataForViewModal.varId
      );
    else if (tabType === "tab2")
      handleMenuSelecteItemsForAnswers(
        "Edit",
        dataForViewModal.answer,
        dataForViewModal.customerQId,
        dataForViewModal.varId
      );
    setShowViewModal(false);
  };

  return (
    <ModalComponent
      open={showViewModal}
      ModalWidth={700}
      ModalTitle="View"
      headerClassName="color-orange"
      footerClassName="justify-content-start  border-top flex-row-reverse"
      ClearBtnText="Cancel"
      saveBtnClassName="mx-2"
      saveBtnText={tabType === "tab1" ? "Reply" : "Update"}
      onCloseIconClick={() => setShowViewModal(false)}
      onClearBtnClick={() => {
        setShowViewModal(false);
      }}
      onSaveBtnClick={() => {
        handleSaveBtnClick();
      }}
    >
      <Grid className="mb-4">
        <Grid
          className="mt-1"
          container
          spacing={2}
          alignItems="center"
          justifyContent="center"
        >
          <Grid item sm={3} textAlign="end">
            <Typography className="h-5">Customer Name :</Typography>
          </Grid>
          <Grid item sm={7}>
            <Typography className="fw-bold h-5">
              {`${dataForViewModal.customerName} (${dataForViewModal.customerId})`}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          className="my-1"
          container
          spacing={2}
          alignItems="center"
          justifyContent="center"
        >
          <Grid item sm={3} textAlign="end">
            <Typography className="h-5">Product Image :</Typography>
          </Grid>
          <Grid item sm={7} container columnSpacing={2}>
            {dataForViewModal.productImages.map((val) => {
              return (
                <Grid item sm={2}>
                  <Image height={50} width={50} src={val} layout="fixed" />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
        <Grid
          className="my-1"
          container
          spacing={2}
          alignItems="center"
          justifyContent="center"
        >
          <Grid item sm={3} textAlign="end">
            <Typography className="h-5">Question :</Typography>
          </Grid>
          <Grid item sm={7}>
            <Typography className="h-5">{dataForViewModal.question}</Typography>
          </Grid>
        </Grid>
        <Grid
          className="my-1"
          container
          spacing={2}
          alignItems="center"
          justifyContent="center"
        >
          <Grid item sm={3} textAlign="end">
            <Typography className="h-5">Date & Time :</Typography>
          </Grid>
          <Grid item sm={7}>
            <Typography className="h-5">
              {dataForViewModal.dateAndTime}
            </Typography>
          </Grid>
        </Grid>
        {dataForViewModal.answer && (
          <Grid
            className="mt-1"
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item sm={3} textAlign="end">
              <Typography className="h-5">Answer : </Typography>
            </Grid>
            <Grid item sm={7}>
              <Typography className="h-5">{dataForViewModal.answer}</Typography>
            </Grid>
          </Grid>
        )}
      </Grid>
    </ModalComponent>
  );
};
export default ViewModal;
