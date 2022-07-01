/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Box, Grid, Paper, Tooltip, Typography } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TableComponent from "components/atoms/TableComponent";
import { assetsJson } from "public/assets";
import Image from "next/image";
import { useState } from "react";
import RefereeForm from "components/forms/reseller/referredreseller/RefereeForm";
import CustomIcon from "services/iconUtils";

const ReferredReseller = () => {
  const [selectedReseller, setSelectedReseller] = useState({});

  const columns = [
    {
      id: "col1",
      label: "Reseller ID",
      // minWidth: 170,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col2",
      label: "Reseller Image",
      // minWidth: 170,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col3",
      label: "Reseller Name",
      // minWidth: 170,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col4",
      label: "Reseller Store Name",
      // minWidth: 170,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col5",
      label: "Total Sales",
      // minWidth: 170,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col6",
      label: "Total Commission",
      // minWidth: 170,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col7",
      label: "Monthly Sales",
      // minWidth: 170,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col8",
      label: "Monthly Commission",
      // minWidth: 170,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col9",
      label: "Action",
      // minWidth: 170,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
  ];
  const rows = [
    {
      id: "1",
      col1: "1",
      col2: (
        <Paper elevation={4} sx={{ width: "fit-content" }} className="mx-auto">
          <Image width={40} height={40} src={assetsJson.person} alt="alt" />
        </Paper>
      ),
      col3: (
        <div
          className="w-100 cursor-pointer"
          onClick={() => {
            setSelectedReseller({ id: 1, name: "abc" });
          }}
        >
          abc
        </div>
      ),
      col4: "ABCD",
      col5: "500",
      col6: "400 rs",
      col7: <Typography className="text-success">200 (+10.21%)</Typography>,
      col8: <Typography className="text-success">6000 rs (1.8%)</Typography>,
      col9: (
        <Tooltip title="Details">
          <CustomIcon type="view" />
        </Tooltip>
      ),
    },
  ];

  return (
    <Paper className="w-100 mnh-80vh">
      {!Object.keys(selectedReseller).length ? (
        <Box className="w-100">
          <Box className="d-flex border-bottom border-bottom-dark p-3 pb-1">
            <Typography className="h-3">Referred Reseller</Typography>
          </Box>
          <Box className="d-flex w-100 flex-column p-3">
            <Box className="d-flex">
              <Typography className="h-4 me-3">
                Share Your Referral code: You earn 5% commission from Referee
                profit on each sale
              </Typography>
              <ShareIcon className="cursor-pointer mx-2" />
              <WhatsAppIcon className="cursor-pointer ms-1" />
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
            <TableComponent
              columns={[...columns]}
              tableRows={[...rows]}
              showCheckbox={false}
            />
          </Box>
        </Box>
      ) : (
        <RefereeForm
          selectedReseller={selectedReseller}
          setSelectedReseller={setSelectedReseller}
        />
      )}
    </Paper>
  );
};
export default ReferredReseller;
