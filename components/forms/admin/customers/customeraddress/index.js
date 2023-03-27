import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { viewModalApi } from "services/admin/customers";
import toastify from "services/utils/toastUtils";

const CustomerAddress = ({ selectedData = {} }) => {
  const [masterData, setMasterData] = useState({});
  const getAllAddressData = async () => {
    const { data, err } = await viewModalApi(
      selectedData.customerId,
      "ADDRESS"
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
      getAllAddressData();
    }
  }, [selectedData]);
  return (
    <Grid container spacing={2} my={1}>
      {masterData.length
        ? masterData.map((add) => (
            <Grid xs={6} item key={add?.addressId}>
              <Grid
                container
                sx={{
                  py: 1.5,
                  px: 3,
                  border: "1px solid lightgray",
                }}
                className="fs-16 bg-white rounded h-100"
              >
                <Grid item xs={11}>
                  <Grid item xs={12} className="cursor-pointer d-inline">
                    <Typography>{add?.name},</Typography>
                  </Grid>
                  <Grid item xs={12} className="fs-14 fw-bold">
                    <Typography className="text-align-justify">
                      {" "}
                      {`${add?.address}, ${add?.location}, ${
                        add?.landmark ? `${add?.landmark},` : ""
                      }  ${add?.cityDistrictTown}, ${add?.state}, ${
                        add?.pinCode
                      }`}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} className="fs-12">
                    <Typography> {add?.mobileNumber}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ))
        : null}
    </Grid>
  );
};

export default CustomerAddress;
