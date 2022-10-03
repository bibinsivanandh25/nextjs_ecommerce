import { Box, Grid, Paper, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import ShareIcon from "@mui/icons-material/Share";
import Image from "next/image";

import { getReferredSupplier } from "services/supplier/refferedsupplier";
import toastify from "services/utils/toastUtils";
import TableComponent from "@/atoms/TableComponent";

const column = [
  {
    id: "col1",
    label: "Supplier ID",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col2",
    label: "Supplier Image",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col3",
    label: "Supplier Name",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col4",
    label: "Store Name",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col5",
    label: "Free Orders Count",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
];
// const rows = [
//   {
//     id: "1",
//     col1: "12154235",
//     col2: (
//       <Paper elevation={4} sx={{ width: "fit-content" }} className="mx-auto">
//         <Image width={40} height={40} src={assetsJson.person} alt="alt" />
//       </Paper>
//     ),
//     col3: <div className="w-100">Balu</div>,
//     col4: "Sharan Jewelry",
//     col5: "500",
//   },
// ];
const ReferredSupplier = () => {
  const [rows, setRows] = useState([]);
  const [referralCode, setReferralCode] = useState("");

  const getTableRows = async () => {
    const { data } = await getReferredSupplier("SP0822000002");
    const tableRows = [];
    console.log("data ", data);
    if (data) {
      setReferralCode(data.supplierReferralCode);
      data.list.forEach((val) => {
        tableRows.push({
          id: val.supplierId,
          col1: val.supplierId,
          col2: (
            <Paper
              elevation={4}
              sx={{ width: "fit-content" }}
              className="mx-auto p-1"
            >
              <Image
                width={42}
                height={42}
                src={val.profileImageUrl}
                alt="alt"
                className="mt-1"
              />
            </Paper>
          ),
          col3: (
            <div className="w-100">{`${val.firstName} ${val.lastName}`}</div>
          ),
          col4: val.supplierStoreName,
          col5: val.signupFreeOrderCount,
        });
      });
      setRows([...tableRows]);
    }
  };

  useEffect(() => {
    getTableRows();
  }, []);

  return (
    <Paper className="mxh-80vh mnh-80vh overflow-auto hide-scrollbar">
      <Box className="w-100">
        <Box className="d-flex border-bottom border-bottom-dark p-3 pb-1">
          <Typography className="h-3">Referred Supplier</Typography>
        </Box>
        <Box className="d-flex">
          <Box className="d-flex w-100 flex-column p-3">
            <Box className="d-flex justify-content-between">
              <Box className="d-flex">
                <Typography className="h-4 me-3">
                  Share Your Referral Code: You Get Next 50 Order Free Of
                  Commission Once Your Referee Register With Your Referal Code
                </Typography>
                <ShareIcon
                  onClick={() => {
                    navigator.clipboard.writeText(referralCode);
                    toastify("Referral ID Copied To The Clip Board", "success");
                  }}
                  className="cursor-pointer mx-2"
                />
              </Box>
            </Box>
            <Grid className="my-3" container>
              <Grid className="d-flex text-start" item xs={4}>
                <Typography className="h-4 text-start" component="span">
                  Total Commission Earned :{" "}
                </Typography>
                <Typography component="span" className="h-4 color-orange">
                  &nbsp;5,0000 Rs
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography className="h-4 d-flex ms-5" component="div">
                  Total Commission Earned (Month) :{" "}
                  <Typography component="span" className="h-4 color-orange">
                    &nbsp;5,000 Rs
                  </Typography>
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box className="me-5 p-2">
            <Image
              src="https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png"
              layout="fixed"
              width={100}
              height={100}
            />
          </Box>
        </Box>
        <TableComponent
          showCheckbox={false}
          columns={column}
          tableRows={rows}
        />
      </Box>
    </Paper>
  );
};

export default ReferredSupplier;
