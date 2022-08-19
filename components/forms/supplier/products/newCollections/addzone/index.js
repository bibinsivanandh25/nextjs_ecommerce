/* eslint-disable no-unused-vars */
import { Box, Grid, Typography } from "@mui/material";
import { forwardRef, useImperativeHandle, useState } from "react";
import CustomIcon from "services/iconUtils";
import ButtonComponent from "@/atoms/ButtonComponent";
import ModalComponent from "@/atoms/ModalComponent";
import InputBox from "@/atoms/InputBoxComponent";

const ZoneCharges = forwardRef(({ formData = {} }, ref) => {
  const [showZoneModal, setShowZoneModal] = useState(false);
  const [openViewModal, setOPenViewModal] = useState(false);
  const [defaultZoneData, setDefaultZoneData] = useState({
    zoneA: "",
    zoneB: "",
    zoneC: "",
    zoneD: "",
    zoneE: "",
  });
  const [viewModalData, setViewModalData] = useState([]);
  useImperativeHandle(ref, () => {
    return {
      handleSendFormData: () => {
        return ["zonecharge", {}];
      },
      validate: () => {
        // write validation logic here
        // return true if validation is success else false
        return true;
      },
    };
  });
  return (
    <Box>
      <Grid item md={12} className="my-1">
        <ButtonComponent
          label="Zone Charges"
          showIcon
          iconName="add"
          iconColorClass="color-white"
          iconOrintation="end"
          onBtnClick={() => {
            setShowZoneModal(true);
          }}
        />
        <CustomIcon
          type="view"
          className="mx-3"
          onIconClick={() => {
            setOPenViewModal(true);
            setViewModalData([
              {
                id: 1,
                title: "Zone A",
                value: "230",
              },
              {
                id: 1,
                title: "Zone B",
                value: "230",
              },
              {
                id: 1,
                title: "Zone C",
                value: "230",
              },
              {
                id: 1,
                title: "Zone D",
                value: "230",
              },
              {
                id: 1,
                title: "Zone E",
                value: "230",
              },
            ]);
          }}
        />
        <CustomIcon
          type="edit"
          className="me-3"
          onIconClick={() => {
            setShowZoneModal(true);
          }}
        />
        <CustomIcon type="close" />
      </Grid>
      {showZoneModal && (
        <ModalComponent
          open={showZoneModal}
          onCloseIconClick={() => {
            setShowZoneModal(false);
          }}
          saveBtnText="Submit"
          ClearBtnText="Cancel"
          onClearBtnClick={() => {
            setShowZoneModal(false);
          }}
          footerClassName="justify-content-end"
        >
          <Grid container spacing={2} className="mt-2">
            <Grid item xs={12}>
              <InputBox
                id="Zone_A"
                label="Zone A"
                onInputChange={(e) => {
                  setDefaultZoneData((prev) => ({
                    ...prev,
                    zoneA: e.target.value,
                  }));
                }}
                value={defaultZoneData.zoneA}
                inputlabelshrink
                placeholder="Enter Price"
              />
            </Grid>{" "}
            <Grid item xs={12}>
              <InputBox
                id="Zone_B"
                label="Zone B"
                onInputChange={(e) => {
                  setDefaultZoneData((prev) => ({
                    ...prev,
                    zoneB: e.target.value,
                  }));
                }}
                value={defaultZoneData.zoneB}
                inputlabelshrink
                placeholder="Enter Price"
              />
            </Grid>{" "}
            <Grid item xs={12}>
              <InputBox
                id="Zone_c"
                label="Zone C"
                onInputChange={(e) => {
                  setDefaultZoneData((prev) => ({
                    ...prev,
                    zoneC: e.target.value,
                  }));
                }}
                value={defaultZoneData.zoneC}
                inputlabelshrink
                placeholder="Enter Price"
              />
            </Grid>{" "}
            <Grid item xs={12}>
              <InputBox
                id="Zone_D"
                label="Zone D"
                onInputChange={(e) => {
                  setDefaultZoneData((prev) => ({
                    ...prev,
                    zoneD: e.target.value,
                  }));
                }}
                value={defaultZoneData.zoneD}
                inputlabelshrink
                placeholder="Enter Price"
              />
            </Grid>{" "}
            <Grid item xs={12}>
              <InputBox
                id="Zone_E"
                label="Zone E"
                onInputChange={(e) => {
                  setDefaultZoneData((prev) => ({
                    ...prev,
                    zoneE: e.target.value,
                  }));
                }}
                value={defaultZoneData.zoneE}
                inputlabelshrink
                placeholder="Enter Price"
              />
            </Grid>
          </Grid>
        </ModalComponent>
      )}
      {openViewModal && (
        <ModalComponent
          open={openViewModal}
          onCloseIconClick={() => {
            setOPenViewModal(false);
          }}
          showFooter={false}
          ModalTitle="View Zone Charges"
        >
          <Grid container spacing={2} className="mt-1 mb-2">
            {viewModalData.map((item) => (
              <Grid item sm={6} display="flex" alignItems="center">
                <Typography className="h-5 color-gary ">
                  {item.title} :
                </Typography>
                <Typography className="h-4 fw-bold">
                  &nbsp;{item.value}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </ModalComponent>
      )}
    </Box>
  );
});
ZoneCharges.displayName = "ZoneCharges";

export default ZoneCharges;
