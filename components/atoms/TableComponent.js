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
import { Button, Grid, IconButton } from "@mui/material";
import SimpleDropdownComponent from "./SimpleDropdownComponent";
import InputBox from "./InputBoxComponent";
import ButtonComponent from "./ButtonComponent";
import SearchIcon from "@mui/icons-material/Search";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const EnhancedTableHead = (props) => {
  const { onSelectAllClick, numSelected, rowCount, showCheckbox, columns } =
    props;

  return (
    <TableHead className="border-top">
      <TableRow>
        {showCheckbox && (
          <TableCell padding="checkbox">
            <CheckBoxComponent
              checkBoxClick={onSelectAllClick}
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
              className="fw-600 p-2"
              sx={{ fontSize: 13 }}
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
  showSearchbar = true,
  OnSelectionChange = () => {},
  showCustomButton = false,
  showCustomDropdown = false,
  customButtonLabel = "",
  customDropdownLabel = "",
  customDropdownList = [],
  customDropdownValue = {},
  onCustomButtonClick = () => {},
  onCustomDropdownChange = () => {},
  showSearchFilter = true,
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState([]);
  const [rows, setRows] = useState([]);
  const [searchText, setsearchText] = useState("");
  const [searchFilterList, setSearchFilterList] = useState([
    { label: "All", id: "0", value: "All" },
  ]);
  const [searchFilter, setSearchFilter] = useState({
    label: "All",
    id: "0",
    value: "All",
  });

  useEffect(() => {
    setRows(tableRows);
  }, [tableRows]);

  useEffect(() => {
    if (searchText === "") setRows(tableRows);
  }, [searchText]);

  useEffect(() => {
    const temp = columns.map((item, index) => {
      return { label: item.label, id: item.id, value: item.label };
    });
    setSearchFilterList(() => {
      return [{ label: "All", id: "0", value: "All" }, ...temp];
    });
  }, [columns]);

  const requestSearch = (searchval) => {
    let filteredData =
      searchFilter.label === "All" || searchFilter.label === ""
        ? rows.filter((value) => {
            debugger;
            let flag = false;
            let dataarray = Object.values(value);
            dataarray.splice(0, 1);
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
          })
        : rows.filter((value) => {
            debugger;
            if (
              typeof value[`${searchFilter.id}`] === "string" &&
              value[`${searchFilter.id}`]
                .toLowerCase()
                .indexOf(searchval.toLowerCase()) > -1
            )
              return true;
            else return false;
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
      OnSelectionChange(newSelecteds);
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
    OnSelectionChange(newSelected);
    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleSearch = () => {
    if (searchText !== "") requestSearch(searchText);
  };

  return (
    <div>
      <Grid
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        }}
      >
        <Grid container spacing={2}>
          <Grid
            item
            sm={showCustomDropdown || showCustomButton ? 9 : 6}
            md={showCustomDropdown || showCustomButton ? 8 : 5}
            xs={6}
          >
            <Typography
              sx={{ flex: "1 1 100%", py: { sm: 1 } }}
              // variant="h6"
              id="tableTitle"
              component="div"
              className="fw-bold"
            >
              {table_heading}
            </Typography>
          </Grid>
          {showSearchbar && (
            <Grid item sm={6} md={7} xs={6} container spacing={2}>
              <Grid item md={3}>
                {showSearchFilter && (
                  <SimpleDropdownComponent
                    list={[...searchFilterList]}
                    size={"small"}
                    label="Search Filter"
                    value={searchFilter}
                    onDropdownSelect={(value) => {
                      setSearchFilter(
                        value === null
                          ? { label: "All", id: 0, value: "All" }
                          : { ...value }
                      );
                    }}
                  />
                )}
              </Grid>
              <Grid item md={7}>
                <InputBox
                  value={searchText}
                  label="Search"
                  className="w-100"
                  size="small"
                  onInputChange={(e) => {
                    setsearchText(e.target.value);
                  }}
                />
              </Grid>
              <Grid item md={2}>
                <div
                  style={{ width: "35px", height: "38px" }}
                  className="bg-orange d-flex justify-content-center align-items-center rounded"
                  onClick={handleSearch}
                >
                  <SearchOutlinedIcon style={{ color: "white" }} />
                </div>
              </Grid>
            </Grid>
          )}
          {(showCustomDropdown || showCustomButton) && (
            <Grid
              item
              sm={3}
              md={4}
              container
              spacing={2}
              xs={6}
              justifyContent="right"
            >
              {showCustomDropdown && (
                <Grid item sm={6} md={6} container my={1}>
                  <SimpleDropdownComponent
                    list={customDropdownList}
                    size="small"
                    label={customDropdownLabel}
                    value={customDropdownValue}
                    onDropdownSelect={(value) => {
                      onCustomDropdownChange(value);
                    }}
                  />
                </Grid>
              )}
              {showCustomButton && (
                <Grid item sm={6} md={6} container my={1}>
                  <Button
                    variant="contained"
                    size="small"
                    className="bg-orange"
                    sx={{ textTransform: "none" }}
                    fullWidth
                    onClick={onCustomButtonClick}
                  >
                    {customButtonLabel}
                  </Button>
                </Grid>
              )}
            </Grid>
          )}
        </Grid>
        <TableContainer sx={{ maxHeight: 440, mt: 2 }}>
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
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      {showCheckbox && (
                        <TableCell padding="checkbox">
                          <CheckBoxComponent
                            isChecked={isItemSelected}
                            label=""
                            checkBoxClick={(event) =>
                              handleClick(event, row.id)
                            }
                          />
                        </TableCell>
                      )}

                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            key={column.id}
                            align={column.data_align}
                            className={`${column.data_classname} p-2`}
                            style={column.data_style && column.data_style}
                            sx={{ fontSize: 12 }}
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
          <Grid>
            <TablePagination
              className="justify-content-start d-flex"
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Grid>
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
