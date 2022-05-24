import { Grid, Typography } from "@mui/material";
import styles from "./AuthLayout.module.css";

const AuthLayout = ({ children, title = "" }) => {
  return (
    <div
      className={`d-flex justify-content-center align-items-center ${styles.container}`}
    >
      <Grid container spacing={2} className="">
        <Grid item sm={12} className="mt-2">
          <div
            className={`${styles.imgContainer} mx-2 d-flex justify-content-center align-items-center`}
          >
            <Typography variant="h3" className="color-orange">
              {title}
            </Typography>
          </div>
        </Grid>
        <Grid item sm={12} className="d-flex justify-content-center ">
          <div>{children}</div>
        </Grid>
      </Grid>
    </div>
  );
};
export default AuthLayout;
