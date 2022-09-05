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
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { makeStyles } from "@mui/styles";
import { BsFillPinAngleFill } from "react-icons/bs";
import CheckBoxComponent from "../CheckboxComponent";
import SimpleDropdownComponent from "../SimpleDropdownComponent";
import InputBox from "../InputBoxComponent";
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
});

const EnhancedTableHead = (props) => {
  const classes = useStyles();
  const {
    onSelectAllClick,
    numSelected,
    rowCount,
    showCheckbox,
    columns,
    setColumns,
    showCellBorders,
    tHeadBgColor,
    draggableHeader,
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
  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("text/plain", id);
  };

  const handleDrop = (e, dropIndex) => {
    if (e.target.id === e.dataTransfer.getData("text/plain")) return false;
    const tempCol = JSON.parse(JSON.stringify(columns));
    let dragStartIndex = null;
    const pinnedColumnsList = {};
    const dropedObj = tempCol.filter((item, index) => {
      if (item.pinned) {
        pinnedColumnsList[`${index}`] = { ...item };
      }
      if (item.id === e.dataTransfer.getData("text/plain")) {
        dragStartIndex = index;
        return { ...item };
      }
    })[0];
    tempCol.splice(dragStartIndex, 1);
    tempCol.splice(dropIndex, 0, { ...dropedObj });
    const temp = tempCol.filter((ele) => {
      if (!ele.pinned) return { ...ele };
    });
    Object.entries(pinnedColumnsList).forEach((item) => {
      temp.splice(item[0], 0, { ...item[1] });
    });
    setColumns(JSON.parse(JSON.stringify(temp)));
  };

  return (
    <TableHead className={`${showCellBorders && "border-top"} ${tHeadBgColor}`}>
      <TableRow>
        {showCheckbox && (
          <TableCell
            padding="checkbox"
            className={`${
              stickyCheckBox ? classes.stickyCol : ""
            } ${tHeadBgColor}`}
            sx={{ left: 0 }}
          >
            <CheckBoxComponent
              checkBoxClick={onSelectAllClick}
              isindeterminate={numSelected > 0 && numSelected < rowCount}
              isChecked={rowCount > 0 && numSelected === rowCount}
              label=""
            />
          </TableCell>
        )}
        {columns.map((column, index) => {
          minWidthCount += column.minWidth;
          return (
            <TableCell
              key={column.id}
              id={column.id}
              align={column.align}
              style={{
                minWidth: column.minWidth,
                maxWidth: column.maxWidth,
                cursor:
                  (column.position && column.position === "sticky") ||
                  column.pinned
                    ? "move"
                    : "default",
              }}
              draggable={
                draggableHeader &&
                !column.pinned &&
                column.showPin &&
                !(column.position && column.position === "sticky")
              }
              onDragStart={(e) => handleDragStart(e, column.id)}
              onDrop={(e) => {
                if (
                  !(column.position && column.position === "sticky") &&
                  !column.pinned
                )
                  handleDrop(e, index);
              }}
              onDragOver={(e) => {
                e.preventDefault();
              }}
              onDragEnter={(e) => {
                e.preventDefault();
              }}
              onMouseEnter={() => {
                setColumns((prev) => {
                  return [
                    ...prev.map((ele, ind) => {
                      if (ind === index) {
                        return {
                          ...ele,
                          showPin: true,
                        };
                      }
                      return { ...ele };
                    }),
                  ];
                });
              }}
              onMouseLeave={() => {
                setColumns((prev) => {
                  return [
                    ...prev.map((ele, ind) => {
                      if (ind === index) {
                        return {
                          ...ele,
                          showPin: false,
                        };
                      }
                      return { ...ele };
                    }),
                  ];
                });
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
            >
              {column.label}
              {!(column.position && column.position === "sticky") &&
                (column.showPin || column.pinned) && (
                  <BsFillPinAngleFill
                    color={column.pinned ? "#e56700" : "#000000"}
                    className="ms-2 cursor-pointer"
                    onClick={() => {
                      setColumns((prev) => {
                        return [
                          ...prev.map((ele, ind) => {
                            if (ind === index) {
                              return {
                                ...ele,
                                pinned: !ele.pinned,
                              };
                            }
                            return { ...ele };
                          }),
                        ];
                      });
                    }}
                  />
                )}
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
  setColumns = () => {},
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
  // showCustomDropdownWithSearch = false,
  // searchBarSizeMd = 7,
  tableMaxHeight = 450,
  // showCustomSearchButton = false,
  // customSearchButtonLabel = "",
  // onCustomSearchButtonClick = () => {},
  disableCustomButton = false,
  showCellBorders = true,
  tHeadBgColor = "bg-light-gray",
  showDateFilter = false,
  dateFilterColName = [],
  customDropDownPlaceholder = "",
  searchBarPlaceHolderText = "Search",
  paginationType = "default",
  draggableHeader = false,
  stickyCheckBox = false,
  showDateFilterBtn = false,
  showDateFilterSearch = true,
  dateFilterBtnName = "Add",
  dateFilterBtnClick = () => {},
  stickyHeader = true,
  // eslint-disable-next-line no-unused-vars
  dateFilterBtnIcon = "",
  handlePageEnd = () => {},
  filterList = [],
  handleRowsPerPageChange = () => {},
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState([]);
  const [rows, setRows] = useState([]);
  const [searchText, setsearchText] = useState("");
  const [searchFilterList, setSearchFilterList] = useState([]);
  const [searchFilter, setSearchFilter] = useState({
    label: "All",
    id: "0",
    value: "All",
  });
  const [dateValue, setDateValue] = useState({ from: "", to: "" });

  useEffect(() => {
    if (filterList.length) setSearchFilterList(filterList);
  }, [filterList]);

  useEffect(() => {
    if (draggableHeader) {
      const tempCol = columns.map((item) => {
        return {
          ...item,
          showPin: false,
          pinned: false,
        };
      });
      setColumns([...tempCol]);
    }
  }, [draggableHeader]);

  useEffect(() => {
    if (tableRows.length) setRows(tableRows);
  }, [tableRows]);

  const handleChangePage = (event, newPage) => {
    const numberOfPage = Math.ceil(tableRows.length / rowsPerPage);
    if (newPage === numberOfPage - 1) {
      handlePageEnd(searchText, searchFilter?.value);
    }
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    handleRowsPerPageChange(searchText, searchFilter?.value, 0);
    handlePageEnd(searchText, searchFilter?.value, 0);
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
      <Grid container alignItems="center">
        <Grid item container md={1} justifyContent="start">
          {table_heading && (
            <Grid item md={12}>
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
          container
          justifyContent="end"
          alignItems="center"
          item
          md={11}
          spacing={2}
        >
          <Grid
            item
            md={10}
            container
            display="flex"
            alignItems="center"
            justifyContent={showDateFilterSearch ? "end" : "center"}
          >
            <Grid
              item
              md={3.1}
              className="d-flex align-items-center justify-content-end"
            >
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
            </Grid>
            <Grid
              item
              md={2.9}
              className="d-flex align-items-center justify-content-end"
            >
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
            </Grid>
            {showDateFilterSearch ? (
              <Grid
                item
                // xl={5}
                md={4}
                container
                alignItems="center"
                spacing={1}
                justifyContent="space-around"
              >
                <Grid item sm={10}>
                  <InputBox
                    value={searchText}
                    label="Search"
                    className="w-100"
                    fullWidth
                    size="small"
                    onInputChange={(e) => {
                      setsearchText(e.target.value);
                    }}
                  />
                </Grid>
                <Grid item sm={2}>
                  <div
                    style={{ width: "35px", height: "38px" }}
                    className="bg-orange d-flex justify-content-center align-items-center rounded ms-2"
                    onClick={() => {
                      handlePageEnd(searchText, searchFilter?.value);
                    }}
                  >
                    <SearchOutlinedIcon style={{ color: "white" }} />
                  </div>
                </Grid>
              </Grid>
            ) : null}
          </Grid>
          {showDateFilterBtn && (
            <Grid item sm={2} justifyContent="center" display="flex">
              <ButtonComponent
                variant="contained"
                label={dateFilterBtnName}
                muiProps="fs-12 ms-1 p-2"
                onBtnClick={() => {
                  dateFilterBtnClick();
                }}
                showIcon={dateFilterBtnIcon !== ""}
                iconName={dateFilterBtnIcon}
                iconColorClass="color-white"
              />
            </Grid>
          )}
        </Grid>
      </Grid>
    );
  };

  const getNormalFilter = () => {
    return (
      <Grid container spacing={3}>
        <Grid item md={4} justifyContent="start">
          {table_heading && (
            <Typography
              sx={{ flex: "1 1 100%", py: { sm: 1 } }}
              id="tableTitle"
              component="div"
              className="fw-bold"
            >
              {table_heading}
            </Typography>
          )}
        </Grid>
        <Grid
          item
          sm={8}
          container
          spacing={2}
          justifyContent="end"
          display="flex"
          alignItems="center"
          alignSelf="end"
        >
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
          {showSearchFilter && (
            <Grid item md={4} justifyContent="end">
              <SimpleDropdownComponent
                list={[...searchFilterList]}
                size="small"
                // label="Search Filter"
                value={searchFilter}
                onDropdownSelect={(value) => {
                  // setSearchFilter(value);
                  setSearchFilter(
                    value === null
                      ? { label: "ALL", id: 0, value: "ALL" }
                      : { ...value }
                  );
                }}
                placeholder={customDropDownPlaceholder}
              />
            </Grid>
          )}
          {showSearchbar && (
            <Grid item md={5} justifyContent="end" container>
              <Grid
                item
                sm={12}
                container
                // spacing={1}
                display="flex"
                justifyContent="end"
                alignItems="center"
              >
                <Grid
                  item
                  md={10}
                  display="flex"
                  justifyContent="end"
                  className="w-100 "
                >
                  <InputBox
                    value={searchText}
                    label={searchBarPlaceHolderText}
                    className="w-100"
                    fullWidth
                    size="small"
                    onInputChange={(e) => {
                      setsearchText(e.target.value);
                    }}
                    showAutoCompleteOff={false}
                  />
                </Grid>
                <Grid item xs={2} display="flex" justifyContent="end">
                  <div
                    style={{ width: "40px", height: "38px" }}
                    className="bg-orange d-flex justify-content-center align-items-center rounded cursor-pointer rounded"
                    onClick={() => {
                      // if (searchText !== "") {
                      setPage(0);
                      handlePageEnd(searchText, searchFilter?.value, 0);
                      // }
                    }}
                  >
                    <SearchOutlinedIcon style={{ color: "white" }} />
                  </div>
                </Grid>
              </Grid>
            </Grid>
          )}
          {showCustomButton && (
            <Grid
              item
              container
              md={3}
              // spacing={2}
              justifyContent="end"
              alignItems="center"
            >
              <Grid item sm={12} display="flex" justifyContent="start">
                <div>
                  <ButtonComponent
                    // variant="contained"
                    // size="small"
                    // className="bg-orange"
                    // sx={{ textTransform: "none" }}
                    // fullWidth
                    muiProps="p-2 color-white"
                    disabled={disableCustomButton}
                    bgColor={disableCustomButton ? "bg-gray" : "bg-orange"}
                    onBtnClick={onCustomButtonClick}
                    label={customButtonLabel}
                  />
                </div>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    );
  };

  const classes = useStyles();
  const getStickyClass = (position, index) => {
    if (!position || position === "") return "";
    if (position === "sticky" && index !== columns.length - 1)
      return classes.stickyrow;
    if (position === "sticky" && index === columns.length - 1)
      return classes.lastrow;
  };
  // return <div>table component</div>;
  return (
    <div>
      <Grid
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        }}
      >
        {showDateFilter ? getDateFilter() : getNormalFilter()}

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
                          sx={{ left: 0 }}
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

                      {columns.map((column, index) => {
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
                                index !== columns.length - 1
                                  ? `${minWidthCount - column.minWidth}px`
                                  : "",
                              right:
                                column.position === "sticky" &&
                                index === columns.length - 1
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
                rowsPerPageOptions={[5, 10, 20]}
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
