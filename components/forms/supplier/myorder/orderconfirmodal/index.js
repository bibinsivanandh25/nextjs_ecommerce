import { Grid } from "@mui/material";
import DropdownComponent from "components/atoms/DropdownComponent";
import InputBox from "components/atoms/InputBoxComponent";
import ModalComponent from "components/atoms/ModalComponent";
import { useRouter } from "next/router";

const OrderConfirmModal = ({ openModal = false, setOpenModal = () => {} }) => {
  const route = useRouter();
  return (
    <div>
      <ModalComponent
        ModalTitle="Please fill below field to proceed further"
        open={openModal}
        showClearBtn={false}
        saveBtnText="submit"
        footerClassName="justify-content-center py-3"
        onCloseIconClick={() => {
          setOpenModal(false);
        }}
        onSaveBtnClick={() => {
          setOpenModal(false);
          route.push("/supplier/myorders/neworder/generateinvoiceandmanifest");
        }}
      >
        <Grid container spacing={2} justifyContent="center" className="mt-2">
          <Grid item sm={12}>
            <DropdownComponent label="logistic partner name" size="small" />
          </Grid>
          <Grid item sm={12} className="mb-2">
            <InputBox label="Logistic URL" inputlabelshrink />
          </Grid>
          <Grid item sm={12}>
            <InputBox label="Tracking ID" inputlabelshrink />
          </Grid>
        </Grid>
      </ModalComponent>
    </div>
  );
};
export default OrderConfirmModal;
