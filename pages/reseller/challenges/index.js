import { Box, Grid, Paper, Typography } from "@mui/material";
import ButtonComponent from "components/atoms/ButtonComponent";
import { useState } from "react";
import ModalComponent from "@/atoms/ModalComponent";
import RadiobuttonComponent from "@/atoms/RadiobuttonComponent";

const Challenges = () => {
  const [addModalOpen, setAddModalOpen] = useState(false);
  return (
    <Paper sx={{ height: "80vh" }} className="overflow-auto hide-scrollbar">
      <Box>
        <Grid className="d-flex justify-content-between align-items-center py-3 border-bottom ">
          <Typography variant="h-4" className="fw-bold px-4">
            Available Challenges
          </Typography>
          <ButtonComponent
            label="Add New Challenges"
            muiProps="mx-4"
            onBtnClick={() => {
              setAddModalOpen(true);
            }}
          />
        </Grid>
        <Grid container spacing={2} className="px-3  my-2">
          <Grid item sm={4}>
            <Paper className="ps-4 pe-2 pt-4 pb-2">
              <Typography className=" mb-3 color-orange">
                Created By: Jaganath
              </Typography>
              <Typography>
                Sharath - 40000 RS target for April 2022 completing will get a
                gift Voucher worth RS 2000
              </Typography>
              <div className="d-flex justify-content-end mt-3">
                <ButtonComponent label="Notify" muiProps="fs-12" />
              </div>
            </Paper>
          </Grid>
          <Grid item sm={4}>
            <Paper className="ps-4 pe-2 pt-4 pb-2">
              <Typography className=" mb-3 color-orange">
                Created By: Jaganath
              </Typography>
              <Typography>
                Sharath - 40000 RS target for April 2022 completing will get a
                gift Voucher worth RS 2000
              </Typography>
              <div className="d-flex justify-content-end mt-3">
                <ButtonComponent label="Notify" muiProps="fs-12" />
              </div>
            </Paper>
          </Grid>
          <Grid item sm={4}>
            <Paper className="ps-4 pe-2 pt-4 pb-2">
              <Typography className=" mb-3 color-orange">
                Created By: Jaganath
              </Typography>
              <Typography>
                Sharath - 40000 RS target for April 2022 completing will get a
                gift Voucher worth RS 2000
              </Typography>
              <div className="d-flex justify-content-end mt-3">
                <ButtonComponent label="Notify" muiProps="fs-12" />
              </div>
            </Paper>
          </Grid>
          <Grid item sm={4}>
            <Paper className="ps-4 pe-2 pt-4 pb-2">
              <Typography className=" mb-3 color-orange">
                Created By: Jaganath
              </Typography>
              <Typography>
                Sharath - 40000 RS target for April 2022 completing will get a
                gift Voucher worth RS 2000
              </Typography>
              <div className="d-flex justify-content-end mt-3">
                <ButtonComponent label="Notify" muiProps="fs-12" />
              </div>
            </Paper>
          </Grid>
          <Grid item sm={4}>
            <Paper className="ps-4 pe-2 pt-4 pb-2">
              <Typography className=" mb-3 color-orange">
                Created By: Jaganath
              </Typography>
              <Typography>
                Sharath - 40000 RS target for April 2022 completing will get a
                gift Voucher worth RS 2000
              </Typography>
              <div className="d-flex justify-content-end mt-3">
                <ButtonComponent label="Notify" muiProps="fs-12" />
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      {addModalOpen && (
        <ModalComponent
          open={addModalOpen}
          onCloseIconClick={() => {
            setAddModalOpen(false);
          }}
          ModalTitle="Create new Challenge"
          titleClassName="fs-16"
          headerBorder="1px solid #707070"
          showFooter={false}
        >
          <Box>
            <RadiobuttonComponent label="Year" className="fw-600" />
            <RadiobuttonComponent label="Month" className="fw-600" />
            <Box className="my-2">
              <p className="fw-500">
                Complete{" "}
                <input
                  style={{
                    outline: "none",
                    borderRight: "none",
                    borderLeft: "none",
                    borderTop: "none",
                    borderBottom: "1px solid #707070",
                    width: "10rem",
                  }}
                />{" "}
                Sales for May 2022 and Avail MrMrsCart Gift card worth Rs.
                <input
                  style={{
                    outline: "none",
                    borderRight: "none",
                    borderLeft: "none",
                    borderTop: "none",
                    borderBottom: "1px solid #707070",
                    width: "10rem",
                  }}
                />
              </p>
            </Box>
            <Box className="d-flex justify-content-end mt-4 mb-3">
              <ButtonComponent label="Create" muiProps="px-4" />
            </Box>
          </Box>
        </ModalComponent>
      )}
    </Paper>
  );
};
export default Challenges;
