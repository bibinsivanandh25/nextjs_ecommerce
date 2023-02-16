import DatePickerComponent from "@/atoms/DatePickerComponent";
import ModalComponent from "@/atoms/ModalComponent";
import { Box, Grid } from "@mui/material";

import { format, parse } from "date-fns";
import React from "react";

function DateFilterModal({
  openDateModal,
  dateModal,
  setdateModal = () => {},
  setdurationDrowdown = () => {},
  setopenDateModal = () => {},
  setorderFilter = () => {},
  setformDate = () => {},
}) {
  return (
    <Box>
      {openDateModal && (
        <ModalComponent
          open={openDateModal}
          ModalTitle="Select Duration"
          onCloseIconClick={() => {
            setdurationDrowdown({
              id: 1,
              label: "Last 30 days",
              value: "MONTH",
            });
            setopenDateModal(false);
            setorderFilter({
              status: {
                label: "Pending",
                id: 1,
                value: "PENDING",
              },
              keyword: "",
            });
          }}
          onSaveBtnClick={() => {
            setformDate({ ...dateModal });
            setopenDateModal(false);
          }}
          onClearBtnClick={() => {
            setdateModal({
              startDate: "",
              endDate: "",
            });
          }}
        >
          <Grid container spacing={2} className="my-2">
            <Grid item xs={6}>
              <DatePickerComponent
                size="small"
                label="Start Date"
                inputlabelshrink
                value={
                  dateModal.startDate
                    ? parse(
                        dateModal.startDate,
                        "MM-dd-yyyy HH:mm:ss",
                        new Date()
                      )
                    : null
                }
                onDateChange={(date) => {
                  setdateModal((pre) => ({
                    ...pre,
                    startDate: format(date, "MM-dd-yyyy HH:mm:ss"),
                  }));
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <DatePickerComponent
                value={
                  dateModal.endDate
                    ? parse(
                        dateModal.endDate,
                        "MM-dd-yyyy HH:mm:ss",
                        new Date()
                      )
                    : null
                }
                onDateChange={(date) => {
                  setdateModal((pre) => ({
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
      )}
    </Box>
  );
}

export default DateFilterModal;
