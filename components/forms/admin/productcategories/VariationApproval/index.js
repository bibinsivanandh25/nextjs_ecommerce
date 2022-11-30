import ModalComponent from "@/atoms/ModalComponent";
import { Grid } from "@mui/material";

const ViewVariationApproval = ({
  showModal = false,
  setShowModal = () => {},
  variationApprovalData = {},
}) => {
  console.log(variationApprovalData);

  return (
    <ModalComponent
      open={showModal}
      onCloseIconClick={() => setShowModal(false)}
      footerClassName="d-none"
    >
      <Grid container spacing={2}>
        <Grid item sm={12} container spacing={2}>
          <Grid item sm={5}>
            Parent Category
          </Grid>
          <Grid item sm={2}>
            :
          </Grid>
          <Grid item sm={5} />
        </Grid>
        <Grid item sm={12} container spacing={2}>
          <Grid item sm={5}>
            Sets
          </Grid>
          <Grid item sm={2}>
            :
          </Grid>
          <Grid item sm={5} />
        </Grid>
        <Grid item sm={12} container spacing={2}>
          <Grid item sm={5}>
            Sub Category
          </Grid>
          <Grid item sm={2}>
            :
          </Grid>
          <Grid item sm={5} />
        </Grid>
        <Grid item sm={12} container spacing={2}>
          <Grid item sm={5}>
            Supplier Id
          </Grid>
          <Grid item sm={2}>
            :
          </Grid>
          <Grid item sm={5} />
        </Grid>
        <Grid item sm={12} container spacing={2}>
          <Grid item sm={5}>
            Variation Name
          </Grid>
          <Grid item sm={2}>
            :
          </Grid>
          <Grid item sm={5} />
        </Grid>
        <Grid item sm={12} container spacing={2}>
          <Grid item sm={5}>
            Options
          </Grid>
          <Grid item sm={2}>
            :
          </Grid>
          <Grid item sm={5} />
        </Grid>
        <Grid item sm={12} container spacing={2}>
          <Grid item sm={5}>
            Created Date and Time
          </Grid>
          <Grid item sm={2}>
            :
          </Grid>
          <Grid item sm={5} />
        </Grid>
      </Grid>
    </ModalComponent>
  );
};
export default ViewVariationApproval;
