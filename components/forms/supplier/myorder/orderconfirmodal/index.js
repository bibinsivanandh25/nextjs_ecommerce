import SimpleDropdownComponent from "@/atoms/SimpleDropdownComponent";
import { Grid } from "@mui/material";
import InputBox from "components/atoms/InputBoxComponent";
import ModalComponent from "components/atoms/ModalComponent";
import { useRouter } from "next/router";
import { useState } from "react";

const logisticList = [
  { label: "BlueDart", id: "BlueDart" },
  { label: "DTDC", id: "DTDC" },
  { label: "Delhivery", id: "Delhivery" },
  { label: "Ekart", id: "Ekart" },
];
const OrderConfirmModal = ({ openModal = false, setOpenModal = () => {} }) => {
  const [logistic, setlogistic] = useState({
    logisticName: {},
    url: "",
    trackingId: "",
  });
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
            {/* <DropdownComponent label="logistic partner name" size="small" /> */}
            <SimpleDropdownComponent
              // label="logistic partner name"
              value={logistic}
              onDropdownSelect={(val) => {
                setlogistic({ ...logistic, logisticName: val });
              }}
              placeholder="Enter Logistic"
              list={logisticList}
            />
          </Grid>
          <Grid item sm={12} className="mb-2">
            <InputBox
              label="Logistic URL"
              inputlabelshrink
              onInputChange={(e) => {
                setlogistic({ ...logistic, url: e.target.value });
              }}
              value={logistic.url}
            />
          </Grid>
          <Grid item sm={12}>
            <InputBox
              label="Tracking ID"
              inputlabelshrink
              onInputChange={(e) => {
                setlogistic({ ...logistic, trackingId: e.target.value });
              }}
              value={logistic.trackingId}
            />
          </Grid>
        </Grid>
      </ModalComponent>
    </div>
  );
};
export default OrderConfirmModal;
