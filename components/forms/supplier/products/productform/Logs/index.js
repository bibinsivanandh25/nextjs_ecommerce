/* eslint-disable no-unused-vars */
import { Grid, Paper, Typography } from "@mui/material";
import { useState } from "react";

const Logs = () => {
  const [discountData, setdiscountData] = useState([
    {
      id: "AAAAA0001",
      description: "jbvcvxnxcjkv xcju xcjkv qwoeiqw dqwnmd qwh qwduiomxczaj",
      serialNo: 1,
    },
    {
      id: "AAAAA0001",
      description: "jbvcvxnxcjkv xcju xcjkv qwoeiqw dqwnmd qwh qwduiomxczaj",
      serialNo: 1,
    },
    {
      id: "AAAAA0001",
      description: "jbvcvxnxcjkv xcju xcjkv qwoeiqw dqwnmd qwh qwduiomxczaj",
      serialNo: 1,
    },
    {
      id: "AAAAA0001",
      description: "jbvcvxnxcjkv xcju xcjkv qwoeiqw dqwnmd qwh qwduiomxczaj",
      serialNo: 1,
    },
  ]);
  return (
    <div className="d-flex flex-column">
      <div className="overflow-y-scroll p-2">
        <Grid container spacing={2}>
          {discountData.map((item) => {
            return (
              <Grid item md={12} lg={6} container>
                <Paper className="w-100 p-2" elevation={4}>
                  <Grid container spacing={1}>
                    <Grid item md={4}>
                      Serial No.
                    </Grid>
                    <Grid item md={1}>
                      :
                    </Grid>
                    <Grid item md={6}>
                      {item.serialNo}
                    </Grid>
                    <Grid item md={4}>
                      Supplier/Admin ID
                    </Grid>
                    <Grid item md={1}>
                      :
                    </Grid>
                    <Grid item md={6}>
                      {item.id}
                    </Grid>
                    <Grid item md={4}>
                      Discription
                    </Grid>
                    <Grid item md={1}>
                      :
                    </Grid>
                    <Grid item md={6}>
                      {item.discription}
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </div>
      <Typography className="pe-2 cursor-pointer text-primary text-end">
        View More
      </Typography>
    </div>
  );
};

export default Logs;
