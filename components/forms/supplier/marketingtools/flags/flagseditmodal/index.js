import { Grid } from "@mui/material";
import ModalComponent from "@/atoms/ModalComponent";
import DatePickerComponent from "@/atoms/DatePickerComponent";
import { useEffect, useState } from "react";
import { getFlagById } from "services/supplier/myProducts";
import { useSelector } from "react-redux";
import toastify from "services/utils/toastUtils";
import { format, parse } from "date-fns";
import { updateFlag } from "services/supplier/marketingtools/flags";

const FlagsEditModal = ({
  editModalOpen,
  flagDetails = {},
  closeModal = () => {},
  getRows = () => {},
}) => {
  const { supplierId, storeCode } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    supplierFlagId: "",
    startDate: null,
    endDate: null,
    supplierStoreId: "",
    supplierId,
    userType: "SUPPLIER",
  });
  const getFlag = async () => {
    const { data, err } = await getFlagById(
      flagDetails.flagId,
      flagDetails.purchaseId,
      storeCode
    );
    if (data) {
      setFormData({
        supplierFlagId: data.data.supplierFlagId,
        startDate: data.data.startDate,
        endDate: data.data.endDate,
        supplierStoreId: storeCode,
        supplierId,
        userType: "SUPPLIER",
      });
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };
  useEffect(() => {
    if (Object.keys(flagDetails).length) getFlag();
  }, [flagDetails]);

  const handleSave = async () => {
    const { data, err } = await updateFlag(formData);
    if (data) {
      toastify(data.message, "success");
      closeModal();
      getRows();
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };

  return (
    <ModalComponent
      open={editModalOpen}
      onCloseIconClick={closeModal}
      ModalTitle="Add Flag"
      titleClassName="fw-bold fs-16"
      ModalWidth={700}
      footerClassName="justify-content-end"
      ClearBtnText="Cancel"
      onClearBtnClick={closeModal}
      onSaveBtnClick={handleSave}
      saveBtnClassName="px-3"
    >
      <Grid container spacing={2} className="my-2">
        <Grid item xs={6}>
          <DatePickerComponent
            size="small"
            label="Start Date"
            inputlabelshrink
            value={
              formData.startDate
                ? parse(formData.startDate, "MM-dd-yyyy HH:mm:ss", new Date())
                : null
            }
            onDateChange={(date) => {
              setFormData((pre) => ({
                ...pre,
                startDate: format(date, "MM-dd-yyyy HH:mm:ss"),
              }));
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <DatePickerComponent
            value={
              formData.endDate
                ? parse(formData.endDate, "MM-dd-yyyy HH:mm:ss", new Date())
                : null
            }
            onDateChange={(date) => {
              setFormData((pre) => ({
                ...pre,
                endDate: format(date, "MM-dd-yyyy HH:mm:ss"),
              }));
            }}
            size="small"
            label="End Date"
            inputlabelshrink
          />
        </Grid>
      </Grid>
    </ModalComponent>
  );
};

export default FlagsEditModal;
