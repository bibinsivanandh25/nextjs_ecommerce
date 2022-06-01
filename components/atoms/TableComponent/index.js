import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import CheckBoxComponent from "../CheckboxComponent";
import { Button, Grid, IconButton } from "@mui/material";
import SimpleDropdownComponent from "../SimpleDropdownComponent";
import InputBox from "../InputBoxComponent";
import ButtonComponent from "../ButtonComponent";
import SearchIcon from "@mui/icons-material/Search";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import styles from "./TableComponent.module.css";

const EnhancedTableHead = (props) => {
  const {
    onSelectAllClick,
    numSelected,
    rowCount,
    showCheckbox,
    columns,
    showCellBorders,
    tHeadBgColor,
  } = props;

  return (
    <TableHead className={`${showCellBorders && "border-top"} ${tHeadBgColor}`}>
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
  showCustomDropdownWithSearch = false,
  searchBarSizeMd = 8,
  tableMaxHeight = 440,
  showCustomSearchButton = false,
  customSearchButtonLabel = "",
  onCustomSearchButtonClick = () => {},
  disableCustomSearchButton = false,
  showCellBorders = true,
  tHeadBgColor = "",
  showDateFilter = false,
  dateFilterColName = [],
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
  const [fromDateOpen, setFromDateOpen] = useState(false);
  const [toDateOpen, setToDateOpen] = useState(false);
  const [dateValue, setDateValue] = useState({ from: "", to: "" });

  useEffect(() => {
    setRows(tableRows);
  }, [tableRows]);

  useEffect(() => {
    if (searchText === "") setRows(tableRows);
  }, [searchText, tableRows]);

  useEffect(() => {
    const temp = columns.filter((item) => {
      if (!item.hasOwnProperty("isFilter"))
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

  useEffect(() => {
    if (dateValue.from && dateValue.to) {
      var startDate = new Date(dateValue.from);
      var endDate = new Date(dateValue.to);
      var resultProductData = tableRows.filter(function (a) {
        for (let i of dateFilterColName) {
          var date = new Date(a[i]);
          return date >= startDate && date <= endDate;
        }
      });
      setRows(resultProductData);
    } else {
      setRows(tableRows);
    }
  }, [dateValue, tableRows, dateFilterColName]);

  const getDateFilter = () => {
    return (
      <Grid container justifyContent="end" alignItems="center">
        <span className="fs-12">From date:</span>
        <input
          type="date"
          value={dateValue.from}
          className={styles.dateinput}
          style={{
            border: "none",
            outline: "none",
            display: "flex",
            flexDirection: "row-reverse",
          }}
          onChange={(e) => {
            setDateValue((prev) => ({
              ...prev,
              from: e.target.value,
            }));
          }}
          // max={dateValue.to}
        />
        <span className="fs-12">To date:</span>
        <input
          type="date"
          value={dateValue.to}
          className={styles.dateinput}
          style={{
            border: "none",
            outline: "none",
            display: "flex",
            flexDirection: "row-reverse",
          }}
          onChange={(e) => {
            setDateValue((prev) => ({
              ...prev,
              to: e.target.value,
            }));
          }}
          // min={dateValue.from}
        />
        <input
          type="text"
          placeholder="Search"
          className={`${styles.searchInput} w-300px`}
          value={searchText}
          label="Search"
          size="small"
          onChange={(e) => {
            setsearchText(e.target.value);
            handleSearch();
          }}
        />
      </Grid>
    );
  };

  const getNormalFilter = () => {
    if (showCustomDropdownWithSearch) {
      return (
        <Grid container justifyContent="end" spacing={2}>
          <Grid item sm={6} md={2}>
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
          <Grid item md={3}>
            <InputBox
              value={searchText}
              label="Search"
              // className="w-100"
              size="small"
              onInputChange={(e) => {
                setsearchText(e.target.value);
              }}
            />
          </Grid>
          <Grid item>
            <div
              style={{ width: "35px", height: "38px" }}
              className="bg-orange d-flex justify-content-center align-items-center rounded"
              onClick={handleSearch}
            >
              <SearchOutlinedIcon style={{ color: "white" }} />
            </div>
          </Grid>
        </Grid>
      );
    }

    return (
      <Grid container>
        <Grid
          item
          container
          xs={showCustomSearchButton ? 4 : 6}
          justifyContent="start"
        >
          {table_heading && (
            <Grid item sm={6} md={5} xs={12}>
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
          )}
        </Grid>
        <Grid
          item
          container
          xs={showCustomSearchButton ? 8 : 6}
          justifyContent={"end"}
        >
          {showSearchbar && (
            <Grid
              item
              // sm={6}
              // md={7}
              xs={12}
              container
              spacing={2}
              justifyContent="end"
            >
              <Grid item md={2}>
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
              <Grid item md={searchBarSizeMd}>
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
              <Grid item xs={!showCustomSearchButton && 2}>
                <div
                  style={{ width: "40px", height: "38px" }}
                  className="bg-orange d-flex justify-content-center align-items-center rounded cursor-pointer rounded"
                  onClick={handleSearch}
                >
                  <SearchOutlinedIcon style={{ color: "white" }} />
                </div>
              </Grid>
              {showCustomSearchButton && (
                <Grid item xs={3}>
                  <Button
                    variant="contained"
                    className="bg-orange"
                    sx={{ textTransform: "none" }}
                    fullWidth
                    onClick={onCustomSearchButtonClick}
                    disabled={disableCustomSearchButton}
                  >
                    {customSearchButtonLabel}
                  </Button>
                </Grid>
              )}
            </Grid>
          )}

          {(showCustomDropdown || showCustomButton) && (
            <Grid item container xs={12} spacing={2} justifyContent="right">
              {showCustomDropdown && (
                <Grid item sm={4} container>
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
                <Grid item sm={4} container>
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
      </Grid>
    );
  };

  return (
    <div>
      <Grid
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        }}
      >
        {showDateFilter ? getDateFilter() : getNormalFilter()}

        <TableContainer sx={{ maxHeight: tableMaxHeight, mt: 3 }}>
          <Table
            sx={{
              [`& .${tableCellClasses.root}`]: {
                borderBottom: !showCellBorders && "none",
                borderTop: !showCellBorders && "none",
              },
            }}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={rows.length}
              showCheckbox={showCheckbox}
              columns={columns}
              showCellBorders={showCellBorders}
              tHeadBgColor={tHeadBgColor}
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