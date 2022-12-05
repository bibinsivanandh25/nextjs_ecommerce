/* eslint-disable no-nested-ternary */
import ModalComponent from "@/atoms/ModalComponent";
import { Grid } from "@mui/material";

const ViewVariationApproval = ({
  showModal = false,
  setShowModal = () => {},
  variationApprovalData = {},
}) => {
  return (
    <ModalComponent
      open={showModal}
      ModalTitle="Variation View"
      titleClassName="color-orange h-5 fw-bold"
      onCloseIconClick={() => setShowModal(false)}
      footerClassName="d-none"
    >
      <Grid container rowSpacing={2} className="fs-6 mb-2">
        <Grid item sm={12} container>
          <Grid item sm={5} className="fw-bold">
            Parent Category
          </Grid>
          <Grid item sm={2}>
            :
          </Grid>
          <Grid item sm={5}>
            {variationApprovalData.mainCategoryName}
          </Grid>
        </Grid>
        <Grid item sm={12} container>
          <Grid item sm={5} className="fw-bold">
            Sets
          </Grid>
          <Grid item sm={2}>
            :
          </Grid>
          <Grid item sm={5}>
            {variationApprovalData.setName}
          </Grid>
        </Grid>
        <Grid item sm={12} container>
          <Grid item sm={5} className="fw-bold">
            Sub Category
          </Grid>
          <Grid item sm={2}>
            :
          </Grid>
          <Grid item sm={5}>
            {variationApprovalData.subCategoryName}
          </Grid>
        </Grid>
        <Grid item sm={12} container>
          <Grid item sm={5} className="fw-bold">
            Supplier Id
          </Grid>
          <Grid item sm={2}>
            :
          </Grid>
          <Grid item sm={5}>
            {variationApprovalData.supplierId}
          </Grid>
        </Grid>
        <Grid item sm={12} container>
          <Grid item sm={5} className="fw-bold">
            Variation Name
          </Grid>
          <Grid item sm={2}>
            :
          </Grid>
          <Grid item sm={5}>
            {variationApprovalData.variationName}
          </Grid>
        </Grid>
        <Grid item sm={12} container>
          <Grid item sm={5} className="fw-bold">
            Options
          </Grid>
          <Grid item sm={2}>
            :
          </Grid>
          <Grid item sm={5}>
            {variationApprovalData?.optionName?.map((ele, ind) => {
              return variationApprovalData?.optionName?.length === 1
                ? ele
                : ind === variationApprovalData.optionName?.length - 1
                ? `${ele}.`
                : `${ele}, `;
            })}
          </Grid>
        </Grid>
        <Grid item sm={12} container>
          <Grid item sm={5} className="fw-bold">
            Created Date and Time
          </Grid>
          <Grid item sm={2}>
            :
          </Grid>
          <Grid item sm={5}>
            {variationApprovalData.createdAt}
          </Grid>
        </Grid>
      </Grid>
    </ModalComponent>
  );
};
export default ViewVariationApproval;
