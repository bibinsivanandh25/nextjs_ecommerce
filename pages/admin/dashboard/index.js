/* eslint-disable no-unused-vars */
import { Box } from "@mui/material";
import NavTabComponent from "components/molecule/NavTabComponent";
import { useState } from "react";

const DashBoard = () => {
  const [navData, setNavData] = useState([
    { id: 1, title: "Today" },
    { id: 2, title: "Yesterday" },
    { id: 3, title: "Last 7 days" },
    { id: 4, title: "Last month" },
    { id: 5, title: "Last year" },
  ]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  return (
    <Box className="vp-height">
      <Box className="row">
        <Box className="col-12">
          <NavTabComponent
            listData={navData}
            fromDate={fromDate}
            toDate={toDate}
            setFromDate={setFromDate}
            setToDate={setToDate}
          />
        </Box>
      </Box>
    </Box>
  );
};
export default DashBoard;
