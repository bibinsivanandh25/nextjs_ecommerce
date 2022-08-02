import { Grid, Typography } from "@mui/material";
import ImageCard from "@/atoms/ImageCard";
import InputBox from "@/atoms/InputBoxComponent";
import ModalComponent from "@/atoms/ModalComponent";
import SimpleDropdownComponent from "@/atoms/SimpleDropdownComponent";
import styles from "./banner.module.css";

const CreateBanner = ({ showModal = false, setShowModal = () => {} }) => {
  return (
    <ModalComponent
      open={showModal}
      ModalWidth="65%"
      onCloseIconClick={() => {
        setShowModal(false);
      }}
      footerClassName="justify-content-end"
    >
      <Grid container spacing={2} className="my-2">
        <Grid
          item
          sm={5}
          className="d-flex justify-content-evenly"
          alignSelf="center"
        >
          <div>
            <Typography className="h-6 text-center color-secondary">
              Image For Mobile
            </Typography>
            <ImageCard showClose={false} />
          </div>
          <div>
            <Typography className="h-6 text-center color-secondary">
              Image For Web
            </Typography>
            <ImageCard showClose={false} />
          </div>
        </Grid>
        <Grid item sm={7} container spacing={2} alignSelf="center">
          <Grid item sm={12}>
            <InputBox label="Navigation URL" />
          </Grid>
          <Grid item sm={12}>
            <SimpleDropdownComponent size="small" label="Display Page" />
          </Grid>
          <Grid item sm={12}>
            <SimpleDropdownComponent size="small" label="Button Lable" />
          </Grid>
          <Grid container className="mx-3 my-2" alignSelf="center">
            <Grid container item md={6} alignItems="center">
              <Grid item sm={4}>
                <span className="fs-12">From date:</span>
              </Grid>
              <Grid item sm={8}>
                <input
                  type="date"
                  // value={dateValue.from}
                  className={styles.dateinput}
                  style={{
                    border: "none",
                    outline: "none",
                    display: "flex",
                    flexDirection: "row-reverse",
                  }}
                  onChange={() => {
                    //   setDateValue((prev) => ({
                    //     ...prev,
                    //     from: e.target.value,
                    //   }));
                  }}
                  // max={dateValue.to}
                />
              </Grid>
            </Grid>
            <Grid container item md={6}>
              <Grid item sm={4}>
                <span className="fs-12">To date:</span>
              </Grid>
              <Grid item sm={8}>
                <input
                  type="date"
                  // value={dateValue.from}
                  className={styles.dateinput}
                  style={{
                    border: "none",
                    outline: "none",
                    display: "flex",
                    flexDirection: "row-reverse",
                  }}
                  onChange={() => {
                    //   setDateValue((prev) => ({
                    //     ...prev,
                    //     from: e.target.value,
                    //   }));
                  }}
                  // max={dateValue.to}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid container className="mx-3">
            <Grid container item md={6} alignItems="center">
              <Grid item sm={4}>
                <span className="fs-12">Start Time:</span>
              </Grid>
              <Grid item sm={8}>
                <input
                  type="time"
                  // value={dateValue.from}
                  placeholder="hh:mm"
                  className={styles.timepicker}
                  style={{
                    border: "none",
                    outline: "none",
                    display: "flex",
                    flexDirection: "row-reverse",
                  }}
                  onChange={() => {
                    //   setDateValue((prev) => ({
                    //     ...prev,
                    //     from: e.target.value,
                    //   }));
                  }}
                  // max={dateValue.to}
                />
              </Grid>
            </Grid>
            <Grid container item md={6}>
              <Grid item sm={4}>
                <span className="fs-12">End date:</span>
              </Grid>
              <Grid item sm={8}>
                <input
                  type="time"
                  // value={dateValue.from}
                  className={styles.timepicker}
                  style={{
                    border: "none",
                    outline: "none",
                    display: "flex",
                    flexDirection: "row-reverse",
                  }}
                  onChange={() => {
                    //   setDateValue((prev) => ({
                    //     ...prev,
                    //     from: e.target.value,
                    //   }));
                  }}
                  // max={dateValue.to}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ModalComponent>
  );
};
export default CreateBanner;
