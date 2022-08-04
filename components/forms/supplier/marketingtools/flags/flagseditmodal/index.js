import { Grid } from "@mui/material";
import ModalComponent from "@/atoms/ModalComponent";
import DatePickerComponent from "@/atoms/DatePickerComponent";

const FlagsEditModal = ({ setEditModalOpen = () => {}, editModalOpen }) => {
  return (
    <ModalComponent
      open={editModalOpen}
      onCloseIconClick={() => {
        setEditModalOpen(false);
      }}
      ModalTitle="Add Flag"
      titleClassName="fw-bold fs-16"
      ModalWidth={700}
      footerClassName="justify-content-end"
      ClearBtnText="Cancel"
      onClearBtnClick={() => {
        setEditModalOpen(false);
      }}
      saveBtnClassName="px-3"
    >
      <Grid container spacing={2} className="my-2">
        <Grid item xs={6}>
          <DatePickerComponent
            size="small"
            label="Start Date"
            inputlabelshrink
          />
        </Grid>
        <Grid item xs={6}>
          <DatePickerComponent size="small" label="End Date" inputlabelshrink />
        </Grid>
      </Grid>
    </ModalComponent>
  );
};

export default FlagsEditModal;
