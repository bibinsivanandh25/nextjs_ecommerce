/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-restricted-syntax */
/* eslint-disable array-callback-return */
/* eslint-disable no-prototype-builtins */
/* eslint-disable consistent-return */
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
// import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
// import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { makeStyles } from "@mui/styles";
import CheckBoxComponent from "../CheckboxComponent";
// import SimpleDropdownComponent from "../SimpleDropdownComponent";
// import InputBox from "../InputBoxComponent";
import styles from "./TableComponent.module.css";
import ButtonComponent from "../ButtonComponent";
import PaginationComponent from "../AdminPagination";

const useStyles = makeStyles({
  stickyCol: {
    position: "sticky",
    zIndex: "1010 !important",
  },
  stickyrow: {
    position: "sticky",
    zIndex: "1000 !important",
  },
  lastCol: {
    position: "sticky",
    zIndex: "1010 !important",
  },
  lastrow: {
    position: "sticky",
    zIndex: "1000 !important",
  },
  borderParent: {
    borderLeft: "1px solid rgba(224, 224, 224, 1)",
    borderTop: "1px solid rgba(224, 224, 224, 1)",
  },
  borderChild: {
    borderLeft: "1px solid rgba(224, 224, 224, 1)",
    borderBottom: "none !important",
  },
});

const EnhancedTableHead = (props) => {
  const classes = useStyles();
  const {
    onSelectAllClick,
    numSelected,
    rowCount,
    showCheckbox,
    columns,
    column2,
    showCellBorders,
    tHeadBgColor,
    stickyCheckBox,
  } = props;
  let minWidthCount = stickyCheckBox ? 47 : 0;
  const getStickyClass = (position, index) => {
    if (!position || position === "") return "";
    if (position === "sticky" && index !== columns.length - 1)
      return classes.stickyCol;
    if (position === "sticky" && index === columns.length - 1)
      return classes.lastCol;
  };

  return (
    <TableHead className={`${showCellBorders && "border-top"} ${tHeadBgColor}`}>
      <TableRow>
        {showCheckbox && (
          <TableCell
            rowSpan={column2[0]?.rowSpan ? column2[0].rowSpan : 1}
            padding="checkbox"
            className={`${
              stickyCheckBox ? classes.stickyCol : ""
            } ${tHeadBgColor}`}
            sx={{
              left: 0,
              borderTop: "1px solid rgba(224, 224, 224, 1)",
              borderBottom: "none",
              pl: 3,
            }}
          >
            <CheckBoxComponent
              checkBoxClick={onSelectAllClick}
              isindeterminate={numSelected > 0 && numSelected < rowCount}
              isChecked={rowCount > 0 && numSelected === rowCount}
              label=""
            />
          </TableCell>
        )}
        {column2.map((ele, index) => {
          minWidthCount += ele.minWidth;
          return (
            <TableCell
              style={{
                minWidth: ele.minWidth,
              }}
              className={`fw-600 p-2 text-center  ${getStickyClass(
                ele.position,
                index
              )} ${tHeadBgColor !== "" ? tHeadBgColor : "bg-white"}`}
              sx={{
                fontSize: 13,
                left:
                  ele.position === "sticky" && index !== column2.length - 1
                    ? `${minWidthCount - ele.minWidth}px`
                    : "",
                right:
                  ele.position === "sticky" && index === column2.length - 1
                    ? 0
                    : "",
                borderBottom: ele.rowSpan ? "none" : "",
              }}
              // className="text-center"
              rowSpan={ele.rowSpan ? ele.rowSpan : 1}
              colSpan={ele.colSpan ? ele.colSpan : 1}
              classes={{ root: classes.borderParent }}
            >
              {ele.label}
            </TableCell>
          );
        })}
      </TableRow>
      <TableRow>
        {columns.map((column, index) => {
          minWidthCount += column.minWidth;
          return (
            <TableCell
              key={column.id}
              id={column.id}
              align={column.align}
              rowSpan={column.rowSpan ? column.rowSpan : 1}
              colSpan={column.colSpan ? column.colSpan : 1}
              style={{
                minWidth: column.minWidth,
              }}
              className={`fw-600 p-2 ${getStickyClass(
                column.position,
                index
              )} ${tHeadBgColor !== "" ? tHeadBgColor : "bg-white"}`}
              sx={{
                fontSize: 13,
                left:
                  column.position === "sticky" && index !== columns.length - 1
                    ? `${minWidthCount - column.minWidth}px`
                    : "",
                right:
                  column.position === "sticky" && index === columns.length - 1
                    ? 0
                    : "",
              }}
              classes={{ root: classes.borderChild }}
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
  column2 = [],
  setColumns = () => {},
  OnSelectionChange = () => {},
  tableMaxHeight = 450,
  showCellBorders = true,
  tHeadBgColor = "",
  showDateFilter = false,
  dateFilterColName = [],
  paginationType = "default",
  draggableHeader = false,
  stickyCheckBox = false,
  stickyHeader = true,
  showButton = false,
  buttonLabel = "button",
  onBtnClick = () => {},
  handlePageEnd = () => {},
  handleRowsPerPageChange = () => {},
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState([]);
  const [rows, setRows] = useState([]);
  const [filteredColumns, setfilteredColumns] = useState([]);
  const [searchText, setsearchText] = useState("");
  // const [searchFilterList, setSearchFilterList] = useState([
  //   { label: "All", id: "0", value: "All" },
  // ]);
  // const [searchFilter, setSearchFilter] = useState({
  //   label: "All",
  //   id: "0",
  //   value: "All",
  // });
  const [dateValue, setDateValue] = useState({ from: "", to: "" });

  useEffect(() => {
    let arr = [...column2, ...columns];
    arr = arr.filter((ele) => {
      return ele.id;
    });
    arr = arr.sort((a, b) => {
      return parseInt(a.id.split("col")[1], 10) >
        parseInt(b.id.split("col")[1], 10)
        ? 1
        : -1;
    });
    // console.log({ arr });
    setfilteredColumns([...arr]);
  }, [column2, columns]);

  useEffect(() => {
    setRows(tableRows);
  }, [tableRows]);

  useEffect(() => {
    if (searchText === "") setRows(tableRows);
  }, [searchText, tableRows]);

  // useEffect(() => {
  //   const temp = columns.filter((item) => {
  //     if (!item.hasOwnProperty("isFilter"))
  //       return { label: item.label, id: item.id, value: item.label };
  //   });
  //   setSearchFilterList(() => {
  //     return [{ label: "All", id: "0", value: "All" }, ...temp];
  //   });
  // }, [columns]);

  // const requestSearch = (searchval) => {
  //   const filteredData =
  //     searchFilter.label === "All" || searchFilter.label === ""
  //       ? rows.filter((value) => {
  //           let flag = false;
  //           const dataarray = Object.values(value);
  //           dataarray.splice(0, 1);
  //           let index;
  //           dataarray.forEach((ele) => {
  //             index =
  //               typeof ele === "string" &&
  //               ele.toLowerCase().indexOf(searchval.toLowerCase()) > -1;
  //             if (index) {
  //               flag = true;
  //             }
  //           });
  //           return flag;
  //         })
  //       : rows.filter((value) => {
  //           if (
  //             typeof value[`${searchFilter.id}`] === "string" &&
  //             value[`${searchFilter.id}`]
  //               .toLowerCase()
  //               .indexOf(searchval.toLowerCase()) > -1
  //           )
  //             return true;
  //           return false;
  //         });

  //   setRows(filteredData);
  // };

  const handleChangePage = (event, newPage) => {
    const numberOfPage = Math.ceil(tableRows.length / rowsPerPage);
    if (newPage === numberOfPage - 1) {
      handlePageEnd(undefined);
    }

    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    handlePageEnd(0);
    setRowsPerPage(+event.target.value);
    setPage(0);
    handleRowsPerPageChange(0);
  };

  const handleSelectAllClick = (event, checked) => {
    if (checked) {
      const newSelecteds = rows.map((n) => n.id);
      OnSelectionChange(newSelecteds);
      setSelected(newSelecteds);
      return;
    }
    OnSelectionChange([]);
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

  // const handleSearch = () => {
  //   if (searchText !== "") requestSearch(searchText);
  // };

  useEffect(() => {
    if (dateValue.from && dateValue.to) {
      const startDate = new Date(dateValue.from);
      const endDate = new Date(dateValue.to);
      const resultProductData = tableRows.filter((a) => {
        for (const i of dateFilterColName) {
          const date = new Date(a[i]);
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
      <Grid container item justifyContent="end" alignItems="center">
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
            // handleSearch();
          }}
        />
      </Grid>
    );
  };

  const classes = useStyles();
  const getStickyClass = (position, index) => {
    if (!position || position === "") return "";
    if (position === "sticky" && index !== filteredColumns.length - 1)
      return classes.stickyrow;
    if (position === "sticky" && index === filteredColumns.length - 1)
      return classes.lastrow;
  };

  return (
    <div>
      <Grid
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        }}
      >
        <Grid className="d-flex justify-content-between align-items-center">
          <Grid className="color-orange">{table_heading}</Grid>
          <Grid container>{showDateFilter ? getDateFilter() : null}</Grid>
          <Grid>
            {showButton ? (
              <ButtonComponent label={buttonLabel} onBtnClick={onBtnClick} />
            ) : (
              ""
            )}
          </Grid>
        </Grid>

        <TableContainer
          sx={{ maxHeight: tableMaxHeight, mt: 3, position: "relative" }}
        >
          <Table
            stickyHeader={stickyHeader}
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
              column2={[...column2]}
              showCellBorders={showCellBorders}
              tHeadBgColor={tHeadBgColor}
              draggableHeader={draggableHeader}
              setColumns={setColumns}
              stickyCheckBox={stickyCheckBox}
              // stickyHeader={stickyHeader}
            />
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  const isItemSelected = isSelected(row.id);
                  let minWidthCount = stickyCheckBox ? 47 : 0;
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
                        <TableCell
                          padding="checkbox"
                          className={`${
                            stickyCheckBox ? classes.stickyrow : ""
                          } bg-white`}
                          sx={{ left: 0, pl: 3 }}
                        >
                          <CheckBoxComponent
                            isChecked={isItemSelected}
                            label=""
                            checkBoxClick={(event) =>
                              handleClick(event, row.id)
                            }
                          />
                        </TableCell>
                      )}

                      {filteredColumns.map((column, index) => {
                        const value = row[column.id];
                        minWidthCount += column.minWidth;
                        return (
                          <TableCell
                            key={column.id}
                            align={column.data_align}
                            className={`${
                              column.data_classname
                            } ${getStickyClass(
                              column.position,
                              index
                            )} bg-white p-2`}
                            style={column.data_style ?? {}}
                            sx={{
                              fontSize: 12,
                              left:
                                column.position === "sticky" &&
                                index !== filteredColumns.length - 1
                                  ? `${minWidthCount - column.minWidth}px`
                                  : "",
                              right:
                                column.position === "sticky" &&
                                index === filteredColumns.length - 1
                                  ? 0
                                  : "",
                            }}
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
        {showPagination &&
          (paginationType === "default" ? (
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
          ) : (
            <PaginationComponent tableCount={rows.length} />
          ))}
      </Grid>
    </div>
  );
}

// Sample prop data
// const columns = [
//   {
//     id: "col1", //  id value in column should be presented in row as key
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
//       <div style={{ background: "red" }} onClick={(e) => // console.log(e)}>
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
