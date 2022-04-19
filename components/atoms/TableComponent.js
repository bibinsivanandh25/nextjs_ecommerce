import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import CheckBoxComponent from "./CheckboxComponent";
import { Grid } from "@mui/material";

const EnhancedTableHead = (props) => {
  const { onSelectAllClick, numSelected, rowCount, showCheckbox, columns } =
    props;

  return (
    <TableHead className="border-top">
      <TableRow>
        {showCheckbox && (
          <TableCell padding="checkbox">
            <CheckBoxComponent
              onCheckBoxClick={onSelectAllClick}
              isindeterminate={numSelected > 0 && numSelected < rowCount}
              isChecked={rowCount > 0 && numSelected === rowCount}
              label=""
            />
          </TableCell>
        )}
        {columns.map((column, index) => {
          return (
            <TableCell
              key={column.id}
              align={column.align}
              style={{ top: 57, minWidth: column.minWidth }}
              className="fw-600 "
            >
              {column.label}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
};

export default function TableComponent({
  showPagination = true,
  showCheckbox = true,
  table_heading = "",
  tableRows = [],
  columns = [],
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState([]);
  const [rows, setRows] = useState([]);
  const [searchText, setsearchText] = useState("");
  useEffect(() => {
    setRows(tableRows);
    if (searchText) {
      requestSearch(searchText);
    }
  }, [searchText]);

  // useEffect(() => {
  //   setRows(tableRows);
  // }, []);

  const requestSearch = (searchval) => {
    let filteredData = tableRows.filter((value) => {
      let flag = false;
      let dataarray = Object.values(value);
      let index;
      dataarray.forEach((ele) => {
        index =
          typeof ele === "string" &&
          ele.toLowerCase().indexOf(searchval.toLowerCase()) > -1;
        if (index) {
          flag = true;
        }
      });
      return flag;
    });

    setRows(filteredData);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSelectAllClick = (event) => {
    if (event) {
      const newSelecteds = rows.map((n, i) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;
  return (
    <div>
      <Grid
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        }}
      >
        <Typography
          sx={{ flex: "1 1 100%", py: { sm: 1 } }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {table_heading}
        </Typography>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table>
            <EnhancedTableHead
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={rows.length}
              showCheckbox={showCheckbox}
              columns={columns}
            />
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, i) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${i}`;
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      {showCheckbox && (
                        <TableCell padding="checkbox">
                          {/* <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          /> */}
                          <CheckBoxComponent
                            isChecked={isItemSelected}
                            label=""
                          />
                        </TableCell>
                      )}

                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            key={column.id}
                            align={column.data_align}
                            className={column.data_classname}
                            style={column.data_style && column.data_style}
                          >
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        {showPagination && (
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </Grid>
    </div>
  );
}

//Sample prop data
// const columns = [
//   {
//     id: "col1", //id value in column should be presented in row as key
//     label: "Generated for",
//     minWidth: 100,
//     align: "center",
//     data_align: "center",
//     data_classname: "",
//   },
//   {
//     id: "col2",
//     label: "Generated Date & Time",
//     minWidth: 170,
//     align: "center",
//     data_align: "center",
//     data_classname: "",
//   },
//   {
//     id: "col3",
//     label: "Status",
//     minWidth: 170,
//     align: "center",
//     data_align: "center",
//     data_classname: "",
//     // data_style: { paddingLeft: "7%" },
//   },
// ];
// let rows = [
//   {
//     id: "1",
//     col1: "India",
//     col2: "IN",
//     col3: (
//       <div style={{ background: "red" }} onClick={(e) => console.log(e)}>
//         121212
//       </div>
//     ),
//   },
//   {
//     id: "2",
//     col1: "China",
//     col2: "CN",
//     col3: "dkjfvnkjdfv",
//   },
// ];
