import {
  FormControl,
  Grid,
  MenuItem,
  Pagination,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";

const PaginationComponent = ({ tableCount = 0 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);

  const handleChange = (event) => {
    setRecordsPerPage(event.target.value);
  };
  const handlePageChange = (e, value) => {
    setCurrentPage(value);
  };

  const getRecords = () => {
    return (
      <Typography className="d-flex">
        <Typography className="d-flex align-items-center">
          {currentPage * recordsPerPage - recordsPerPage + 1} -{" "}
        </Typography>
        <Typography>&nbsp;{currentPage * recordsPerPage}</Typography>
      </Typography>
    );
  };

  return (
    <Grid container className="py-2 w-100" alignItems="center">
      <Grid item sm={6}>
        <Stack spacing={2}>
          <Pagination
            count={
              tableCount / recordsPerPage < 1
                ? 1
                : Math.ceil(tableCount / recordsPerPage)
            }
            page={currentPage}
            size="large"
            onChange={handlePageChange}
          />
        </Stack>
      </Grid>
      <Grid item sm={6} container alignItems="center" justifyContent="end">
        <FormControl sx={{ m: 1, minWidth: 60 }}>
          {/* <InputLabel id="demo-simple-select-autowidth-label">Age</InputLabel> */}
          <Select
            // labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={recordsPerPage}
            onChange={handleChange}
            autoWidth
            // label="Age"
            size="small"
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={30}>30</MenuItem>
            <MenuItem value={40}>40</MenuItem>
          </Select>
        </FormControl>
        <Typography className="mx-4 d-flex">
          Results : {getRecords()} &nbsp; of {tableCount}
        </Typography>
      </Grid>
    </Grid>
  );
};
export default PaginationComponent;
