import {
  Paper,
  Box,
  Typography,
  TableCell,
  TableRow,
  TableHead,
  Table,
  TableContainer,
  TableBody,
} from "@mui/material";
import React from "react";
import CustomIcon from "services/iconUtils";

const CustomTableComponent = ({ columns = [], rows = [] }) => {
  // console.log(jwt_decode())
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow className="border-bottom border-dashed">
            {columns.map((item) => (
              <TableCell
                key={item.id}
                align={item.align}
                style={{ top: 57, minWidth: item.minWidth }}
                className="fw-600 p-2 border-0"
                sx={{ fontSize: 13 }}
              >
                {item.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
              {columns.map((column) => {
                const value = row[column.id];
                return (
                  <TableCell
                    key={column.id}
                    align={column.data_align}
                    className={`${column.data_classname} p-2`}
                    style={column.data_style ?? {}}
                    sx={{ fontSize: 12 }}
                  >
                    {column.format && typeof value === "number"
                      ? column.format(value)
                      : value}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const Dashboard = () => {
  // useEffect(() => {
  //   serviceUtil
  //     .get("/home")
  //     .then((data) => {})
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);
  const performance = {
    columns: [
      {
        id: "col1",
        label: "",
        minWidth: 170,
        align: "center",
        data_align: "center",
        data_classname: "",
      },
      {
        id: "col2",
        label: "Last 15 Days",
        minWidth: 170,
        align: "center",
        data_align: "center",
        data_classname: "",
      },
      {
        id: "col3",
        label: "Till Date",
        minWidth: 170,
        align: "center",
        data_align: "center",
        data_classname: "",
      },
      {
        id: "col4",
        label: "Expected Metrics",
        minWidth: 170,
        align: "center",
        data_align: "center",
        data_classname: "",
      },
      {
        id: "col5",
        label: "View",
        minWidth: 170,
        align: "center",
        data_align: "center",
        data_classname: "",
      },
    ],
    rows: [
      {
        id: "1",
        col1: "Average Pick Up Turn Around Time(TAT)",
        col2: "10 days",
        col3: "12 days",
        col4: "2 days",
        col5: <CustomIcon type="view" />,
      },

      {
        id: "2",
        col1: "Orders Cancelled",
        col2: "Cancelled 0 (0.0%)",
        col3: `Order Received : 20, Cancelled : 9 (0.8 %) Orders Received :
        4,454 5%`,
        col4: "",
        col5: <CustomIcon type="view" />,
      },
      {
        id: "3",
        col1: "Orders Returned",
        col2: "Cancelled 0 (0.0%)",
        col3: `Order Received : 20, Cancelled : 9 (0.8 %) Orders Received :
        4,454 5%`,
        col4: "",
        col5: <CustomIcon type="view" />,
      },
    ],
  };
  const penalties = {
    columns: [
      {
        id: "col1",
        label: "",
        minWidth: 170,
        align: "center",
        data_align: "center",
        data_classname: "",
      },
      {
        id: "col2",
        label: "No. of products",
        minWidth: 170,
        align: "center",
        data_align: "center",
        data_classname: "",
      },
      {
        id: "col3",
        label: "Penalty",
        minWidth: 170,
        align: "center",
        data_align: "center",
        data_classname: "",
      },
      {
        id: "col4",
        label: "Last Update",
        minWidth: 170,
        align: "center",
        data_align: "center",
        data_classname: "",
      },

      {
        id: "col5",
        label: "View",
        minWidth: 170,
        align: "center",
        data_align: "center",
        data_classname: "",
      },
    ],
    rows: [
      {
        id: "1",
        col1: "Wrong product returned",
        col2: "07",
        col3: "500 Rs.",
        col4: "24-05-2022 12:12",
        col5: <CustomIcon type="view" />,
      },
    ],
  };
  return (
    <Paper elevation={3} className="w-100 mnh-80vh mxh-80vh p-3">
      <Box className="border-bottom border border-1 border-secondary rounded mb-3">
        <Box className="p-2 border-bottom border-secondary">
          <Typography className="h-4 fw-600 color-orange">
            Performance
          </Typography>
        </Box>
        <Box className="p-2">
          <CustomTableComponent
            columns={performance.columns}
            rows={performance.rows}
          />
        </Box>
      </Box>
      <Box className="border-bottom border border-1 border-secondary rounded mb-3">
        <Box className="p-2 border-bottom border-secondary">
          <Typography className="h-4 fw-600 color-orange">Penalties</Typography>
        </Box>
        <Box className="p-2">
          <CustomTableComponent
            columns={penalties.columns}
            rows={penalties.rows}
          />
        </Box>
      </Box>
      <Box className="border-bottom border border-1 border-secondary rounded ">
        <Box className="p-2 border-bottom border-secondary">
          <Typography className="h-4 fw-600 color-orange">
            Notice Board
          </Typography>
        </Box>
        <Box className="p-2">
          <Typography>notice board</Typography>
        </Box>
      </Box>
    </Paper>
  );
};
export default Dashboard;
