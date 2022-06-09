/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Box, Paper, Tooltip, Typography } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TableComponent from "components/atoms/TableComponent";
import { assetsJson } from "public/assets";
import Image from "next/image";
import { useState } from "react";
import RefereeForm from "components/forms/reseller/referredreseller/RefereeForm";

const ReferredReseller = () => {
  const [selectedReseller, setSelectedReseller] = useState({});

  const columns = [
    {
      id: "col1",
      label: "Reseller ID",
      minWidth: 170,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col2",
      label: "Reseller Image",
      minWidth: 170,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col3",
      label: "Reseller Name",
      minWidth: 170,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col4",
      label: "Reseller Store Name",
      minWidth: 170,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col5",
      label: "Total Sales",
      minWidth: 170,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col6",
      label: "Total Commission",
      minWidth: 170,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col7",
      label: "Monthly Sales",
      minWidth: 170,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col8",
      label: "Monthly COmmission",
      minWidth: 170,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col9",
      label: "Action",
      minWidth: 170,
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
          className="w-100"
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
      col7: "200(+10.21%)",
      col8: "6000 rs(1.8%)",
      col9: (
        <Tooltip title="Details">
          <VisibilityIcon className="cursor-pointer" onClick={() => {}} />
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
                Share Your Referral code: You earn 5% commission from Refree
                profit on each sale
              </Typography>
              <ShareIcon className="cursor-pointer me-2" />
              <WhatsAppIcon className="cursor-pointer" />
            </Box>
            <Box className="d-flex w-100 justify-content-between mt-3 mb-3">
              <Box>
                <Typography className="h-4" component="div">
                  Total Commission Earned:{" "}
                  <Typography component="span" className="h-4 color-orange">
                    5,0000 Rs
                  </Typography>
                </Typography>
              </Box>
              <Box>
                <Typography className="h-4" component="div">
                  Total Commission Earned(Month):{" "}
                  <Typography component="span" className="h-4 color-orange">
                    5,000 Rs
                  </Typography>
                </Typography>
              </Box>
            </Box>
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
