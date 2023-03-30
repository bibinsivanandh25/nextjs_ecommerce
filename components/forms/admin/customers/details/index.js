import { Avatar, Box, Divider, Grid, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { viewModalApi } from "services/admin/customers";
import toastify from "services/utils/toastUtils";

const Details = ({ selectedData = {} }) => {
  const [masterData, setMasterData] = useState({});
  const getAllData = async () => {
    const { data, err } = await viewModalApi(
      selectedData.customerId,
      "DETAILS"
    );
    if (data) {
      setMasterData(data);
    }
    if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };
  useEffect(() => {
    if (selectedData.customerId !== "") {
      getAllData();
    }
  }, [selectedData]);
  return Object.values(masterData).length ? (
    <Box>
      <Grid container justifyContent="space-around" my={2}>
        <Grid item sm={5} display="flex" alignItems="center">
          <Avatar
            alt="Remy Sharp"
            src={masterData?.mainAccountImageUrl}
            sx={{ width: 156, height: 156, border: "1px solid gray" }}
          />
          <Box className="ms-2">
            <Typography className=" fw-bold">
              {masterData?.customerName}
            </Typography>
            <Typography className=" fw-500">{masterData?.emailId}</Typography>
          </Box>
        </Grid>
        <Grid item sm={5} alignSelf="center">
          <Grid container className="py-2" xs={12}>
            <Grid item sm={5} display="flex" justifyContent="end">
              <Typography className="fw-bold">DOB </Typography>
            </Grid>
            <Grid>&nbsp;:&nbsp;</Grid>
            <Grid item sm={6} display="flex" justifyContent="start">
              <Typography className="text-break">{masterData.dob}</Typography>
            </Grid>
          </Grid>
          <Grid container className="py-2" xs={12}>
            <Grid item sm={5} display="flex" justifyContent="end">
              <Typography className="fw-bold">Mobile Number </Typography>
            </Grid>
            <Grid>&nbsp;:&nbsp;</Grid>
            <Grid item sm={6} display="flex" justifyContent="start">
              <Typography className="text-break">
                {masterData.mobileNumber}
              </Typography>
            </Grid>
          </Grid>
          <Grid container className="py-2" xs={12}>
            <Grid item sm={5} display="flex" justifyContent="end">
              <Typography className="fw-bold">Last login </Typography>
            </Grid>
            <Grid>&nbsp;:&nbsp;</Grid>
            <Grid item sm={6} display="flex" justifyContent="start">
              <Typography className="text-break">
                {masterData.recentLoginDate}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Divider color="gray" />
      <Box>
        <Typography className="fw-600">Bank Details</Typography>
      </Box>
      <Grid container columnGap={2} rowGap={2} mb={2}>
        {masterData?.bankDetails?.map((item) => (
          <Grid item sm={3.8} className="border rounded p-2 border-secondary">
            <Typography className="fw-bold">{item.bankName}</Typography>
            <Typography className="h-5 fw-500">
              Account Holder Name : {item.accountHolderName}
            </Typography>
            <Typography className="h-5 fw-500">
              Account Number : {item.accountNumber}
            </Typography>
            <Typography className="h-5 fw-500">
              IFSC code : {item.ifscCode}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  ) : null;
};

export default Details;
