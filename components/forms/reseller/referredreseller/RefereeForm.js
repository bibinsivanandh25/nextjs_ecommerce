import {
  Box,
  Card,
  CardContent,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { useEffect, useState } from "react";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { assetsJson } from "public/assets";

const RefereeForm = ({
  selectedReseller = {},
  setSelectedReseller = () => {},
}) => {
  const [date, setDate] = useState(null);
  useEffect(() => {
    if (!Object.keys(selectedReseller).length) {
      setDate(null);
    }
  }, [selectedReseller]);
  return (
    <Box className="w-100">
      <Box className="d-flex border-bottom border-bottom-dark justify-content-between p-3 pb-1 align-items-center">
        <Typography className="h-4 fw-bold">Reseller Name</Typography>
        <Box onClick={() => setSelectedReseller({})}>
          <Typography className="h-4 d-flex align-items-center cursor-pointer">
            <ArrowBackIosIcon className="fs-16" />
            Back
          </Typography>
        </Box>
      </Box>
      <Box className="p-3 mt-3">
        <Box className="d-flex flex-column ms-3">
          <Box className="d-flex">
            <Image
              src={assetsJson.person}
              width={100}
              height={100}
              alt="alt"
              className="rounded-circle shadow-sm border"
            />
            <Box className="d-flex flex-column ms-3">
              <Typography className="h-4 fw-bold">Store Name</Typography>
              <Typography className="h-5">Store code</Typography>
              <Typography className="h-5">Address</Typography>
            </Box>
          </Box>
          <Box className="ms-2 mt-3">
            <Typography className="h-4">
              Name of Referee:{" "}
              <Typography className="h-4" component="span">
                Abc
              </Typography>
            </Typography>
            <Typography className="h-4">
              E-mail ID:{" "}
              <Typography className="h-4" component="span">
                Abc
              </Typography>
            </Typography>
            <Typography className="h-4">
              Phone No.:{" "}
              <Typography className="h-4" component="span">
                Abc
              </Typography>
            </Typography>
          </Box>
        </Box>
        <Card variant="outlined" className="mt-3">
          <CardContent>
            <Typography className="h-4 fw-bold">Sales History</Typography>
            <Box className="mt-2">
              <Typography className="fw-bold h-5 ">
                Last Month (April) Earnings :{" "}
                <Typography component="span" className="color-dark-green mx-2">
                  123
                </Typography>{" "}
              </Typography>
              <Typography className="fw-bold h-5 my-1 ">
                Total Earnings Current Year :{" "}
                <Typography component="span" className="color-dark-green mx-2">
                  123
                </Typography>{" "}
              </Typography>
              <Typography className="fw-bold h-5 ">
                Target to achive by EOY :{" "}
                <Typography component="span" className="text-danger mx-2">
                  123
                </Typography>{" "}
              </Typography>
              <Box className="d-flex flex-column w-50 ">
                <Box className="d-flex justify-content-between align-items-center">
                  <Typography className="h-5 fw-bold">
                    Year wise sales
                  </Typography>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      views={["year"]}
                      label=""
                      minDate={new Date("2012-03-01")}
                      maxDate={new Date("2023-06-01")}
                      value={date}
                      onChange={(e) => {
                        setDate(e);
                      }}
                      className="m-0"
                      renderInput={(params) => (
                        <TextField
                          size="small"
                          {...params}
                          helperText={null}
                          className="p-0"
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Box>
                {date !== null ? (
                  <Paper className="w-100 mt-3 p-3 py-4">
                    <Typography className="fs-16 fw-bold">
                      Commission Earned in {new Date(date).getFullYear() ?? ""}:{" "}
                      <Typography
                        className="fs-16 color-dark-green"
                        component="span"
                      >
                        1234 Rs
                      </Typography>
                    </Typography>
                  </Paper>
                ) : (
                  ""
                )}
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
export default RefereeForm;
