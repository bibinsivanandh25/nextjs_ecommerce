/* eslint-disable react/no-array-index-key */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-restricted-syntax */
/* eslint-disable array-callback-return */
/* eslint-disable no-prototype-builtins */
/* eslint-disable consistent-return */
import React, { useEffect, useState, useRef } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { Box, CircularProgress, Collapse, Grid, Menu } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { makeStyles } from "@mui/styles";
import { BsFillPinAngleFill } from "react-icons/bs";
import { format } from "date-fns";
import { AiOutlineCalendar } from "react-icons/ai";
import CheckBoxComponent from "../CheckboxComponent";
import SimpleDropdownComponent from "../SimpleDropdownComponent";
import InputBox from "../InputBoxComponent";
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
              className={`fw-600 p-2 fw-500 ${getStickyClass(
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

const FilterMenu = ({
  filterList = [],
  getFilteredValues = () => {},
  setPage = () => {},
  setTableFilterList = () => {},
  getFilteredValuesOnCheckBoxClick = false,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [filterData, setFilterData] = useState([]);
  const open = Boolean(anchorEl);
  useEffect(() => {
    if (filterList.length) {
      const temp = [];
      filterList.forEach((ele) => {
        temp.push({
          ele,
          isExpand: false,
        });
      });
      setFilterData([...filterList]);
    }
  }, [filterList]);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    const temp = JSON.parse(JSON.stringify(filterData));
    temp.forEach((ele) => {
      ele.isSelected = false;
      ele.isExpand = false;
      ele.value.forEach((e) => {
        e.isSelected = false;
      });
      // const some = ele.value.some((item) => item.isSelected);
      // if (some) ele.isExpand = true;
      // else ele.isExpand = false;
    });
    setTableFilterList(temp);
    setAnchorEl(null);
  };

  const renderMenuList = (data) => {
    return data?.map((ele, ind) => {
      return (
        <div
          className="px-2 d-flex justify-content-between mnw-300 mxw-300 overflow-auto hide-scrollbar"
          key={ind}
        >
          <div>
            <CheckBoxComponent
              label={ele.name}
              isChecked={ele.isSelected}
              checkBoxClick={() => {
                const setExpand = (filters) => {
                  if (filters?.value?.filter((e) => e.isSelected).length == 0)
                    return true;
                  if (filters?.value?.every((e) => e.isSelected)) return false;
                  if (filters?.value?.some((e) => e.isSelected)) return true;
                  return !filters.isExpand;
                };
                const temp = JSON.parse(JSON.stringify(data));
                temp[ind].isExpand = setExpand(temp[ind]);
                temp[ind].isSelected = !temp[ind].isSelected;
                temp[ind].value.forEach((item) => {
                  item.isSelected = temp[ind].isSelected;
                });
                setFilterData(temp);
                if (getFilteredValuesOnCheckBoxClick) getFilteredValues(temp);
              }}
            />
            {ele?.value?.length ? (
              <Collapse
                in={ele.isExpand}
                timeout="auto"
                unmountOnExit
                className=""
              >
                {ele.value.map((child, index) => {
                  return (
                    <div className="ms-4 d-flex align-items-center ">
                      <CheckBoxComponent
                        isChecked={child.isSelected}
                        checkBoxClick={() => {
                          const fData = JSON.parse(JSON.stringify(data));
                          const temp = JSON.parse(JSON.stringify(ele.value));
                          temp[index].isSelected = !temp[index].isSelected;
                          fData[ind].value = temp;
                          const every = fData[ind].value.every(
                            (i) => i.isSelected
                          );
                          if (every) {
                            fData[ind].isSelected = true;
                          } else fData[ind].isSelected = false;
                          if (getFilteredValuesOnCheckBoxClick)
                            getFilteredValues(fData);
                          setFilterData(fData);
                        }}
                      />
                      <Typography className="mr-n4 fs-12">
                        {child?.item?.replaceAll("_", " ")}
                      </Typography>
                    </div>
                  );
                })}
              </Collapse>
            ) : null}
          </div>
          {ele?.value?.length ? (
            ele.isExpand ? (
              <ExpandLess
                className="mt-1"
                onClick={() => {
                  const temp = JSON.parse(JSON.stringify(filterData));
                  temp[ind].isExpand = false;
                  setFilterData(temp);
                }}
              />
            ) : (
              <ExpandMore
                className="mt-1"
                onClick={() => {
                  const temp = JSON.parse(JSON.stringify(filterData));
                  temp[ind].isExpand = true;
                  setFilterData(temp);
                }}
              />
            )
          ) : null}
        </div>
      );
    });
  };
  const getFiltersCount = () => {
    let count = 0;
    filterData.forEach((item) => {
      if (item.isSelected) {
        count++;
      } else if (item?.value?.some((ele) => ele.isSelected)) {
        count++;
      }
    });
    return count > 0 ? `(${count})` : "";
  };

  return (
    <Grid container item sm={12}>
      <Grid item sm={12} display="flex" justifyContent="end">
        <ButtonComponent
          label={`Filter ${getFiltersCount()}`}
          showIcon
          iconName="filter"
          iconColorClass="color-orange"
          variant="outlined"
          onBtnClick={handleClick}
        />
      </Grid>

      <Menu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          maxHeight: "80vh",
          overflow: "scroll",
        }}
        className="hide-scrollbar"
      >
        {renderMenuList(filterData)}
        {filterData.length ? (
          <div className="d-flex justify-content-end mx-3">
            <ButtonComponent
              label="Apply"
              muiProps="p-0"
              onBtnClick={() => {
                getFilteredValues(filterData);
                const temp = JSON.parse(JSON.stringify(filterData));
                temp.forEach((ele) => {
                  const some = ele?.value?.some((item) => item.isSelected);
                  if (some) ele.isExpand = true;
                  else ele.isExpand = false;
                });
                setTableFilterList(temp);
                handleClose();
                setPage(0);
              }}
            />
          </div>
        ) : (
          <Box
            sx={{ width: 300, p: 5 }}
            className="d-flex justify-content-center align-items-center"
          >
            <CircularProgress className="color-orange" />
          </Box>
        )}
      </Menu>
    </Grid>
  );
};
export default function TableComponent({
  showPagination = true,
  showCheckbox = false,
  table_heading = "",
  headerClassName = "",
  tableRows = [],
  columns = [],
  setColumns = () => {},
  showSearchbar = true,
  OnSelectionChange = () => {},
  showCustomButton = false,
  showCustomDropdown = false,
  customButtonLabel = "",
  showFilterButton = false,
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
  tabChange = "",
  filterData = [],
  getFilteredValues = () => {},
  getFilteredValuesOnCheckBoxClick = false,
  showDateFilterDropDown = false,
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState([]);
  const [rows, setRows] = useState([]);
  const [searchText, setsearchText] = useState("");
  const [searchFilterList, setSearchFilterList] = useState([]);
  const [filteredDates, setFilteredDates] = useState({
    fromDate: "",
    toDate: "",
  });
  const [tableFilterList, setTableFilterList] = useState([]);
  const [searchFilter, setSearchFilter] = useState({
    label: "All",
    id: "0",
    value: "All",
  });
  const dateFromRef = useRef(null);
  const dateToRef = useRef(null);

  useEffect(() => {
    setPage(0);
  }, [tabChange]);

  useEffect(() => {
    if (!showPagination) setRowsPerPage(20);
  }, []);
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
    if (tableRows.length) {
      setSelected([]);
      setRows(tableRows);
    } else {
      setRows([]);
    }
  }, [tableRows]);

  useEffect(() => {
    if (filterData.length) {
      const result = [];
      filterData.forEach((ele) => {
        result.push({
          ...ele,
          value: ele.value,
          isSelected: ele.isSelected ?? false,
        });
      });
      setTableFilterList([...result]);
    }
  }, [filterData]);
  const handleChangePage = (event, newPage) => {
    const numberOfPage = Math.ceil(tableRows.length / rowsPerPage);
    if (newPage === numberOfPage - 1) {
      handlePageEnd(searchText, searchFilter?.value, undefined, {
        fromDate: filteredDates.fromDate
          ? `${format(new Date(filteredDates.fromDate), "MM-dd-yyyy")} 00:00:00`
          : "",
        toDate: filteredDates.toDate
          ? `${format(new Date(filteredDates.toDate), "MM-dd-yyyy")} 23:59:59`
          : "",
      });
    }
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    handleRowsPerPageChange(searchText, searchFilter?.value, 0, {
      fromDate: filteredDates.fromDate
        ? `${format(new Date(filteredDates.fromDate), "MM-dd-yyyy")} 00:00:00`
        : "",
      toDate: filteredDates.toDate
        ? `${format(new Date(filteredDates.toDate), "MM-dd-yyyy")} 23:59:59`
        : "",
    });
    handlePageEnd(searchText, searchFilter?.value, 0, {
      fromDate: filteredDates.fromDate
        ? `${format(new Date(filteredDates.fromDate), "MM-dd-yyyy")} 00:00:00`
        : "",
      toDate: filteredDates.toDate
        ? `${format(new Date(filteredDates.toDate), "MM-dd-yyyy")} 23:59:59`
        : "",
    });
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

  // const getDates = (date, type) => {
  //   const temp = filteredDates;
  //   setFilteredDates((pre) => ({
  //     ...pre,
  //     [`${type}`]: date,
  //   }));
  //   temp[`${type}`] = date;
  // };

  const getDateFilter = () => {
    return (
      <Grid container alignItems="center">
        <Grid item container md={1.5} justifyContent="start">
          {table_heading && (
            <Grid item md={12}>
              <Typography
                sx={{ flex: "1 1 100%", py: { sm: 1 } }}
                // variant="h6"
                id="tableTitle"
                component="div"
                className={`fw-bold ${headerClassName} color-orange`}
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
          md={10.5}
          spacing={2}
        >
          <Grid
            item
            md={10}
            container
            display="flex"
            alignItems="center"
            justifyContent={showDateFilterSearch ? "center" : "end"}
          >
            {showFilterButton && (
              <Grid item sm={3}>
                <FilterMenu
                  getFilteredValuesOnCheckBoxClick={
                    getFilteredValuesOnCheckBoxClick
                  }
                  filterList={[...tableFilterList]}
                  getFilteredValues={(val) => {
                    setPage(0);
                    getFilteredValues(val, searchText);
                  }}
                  setPage={setPage}
                  setTableFilterList={setTableFilterList}
                />
              </Grid>
            )}
            {!showFilterButton && showDateFilterDropDown && (
              <Grid item md={2} justifyContent="end">
                <SimpleDropdownComponent
                  list={[...searchFilterList]}
                  size="small"
                  // label="Search Filter"
                  value={searchFilter}
                  onDropdownSelect={(value) => {
                    if (value) {
                      handlePageEnd(searchText, value?.value, 0, {
                        fromDate: filteredDates.fromDate
                          ? `${format(
                              new Date(filteredDates.fromDate),
                              "MM-dd-yyyy"
                            )} 00:00:00`
                          : "",
                        toDate: filteredDates.toDate
                          ? `${format(
                              new Date(filteredDates.toDate),
                              "MM-dd-yyyy"
                            )} 23:59:59`
                          : "",
                      });
                      setSearchFilter(value);
                    } else {
                      handlePageEnd(searchText, "", 0, {
                        fromDate: filteredDates.fromDate
                          ? `${format(
                              new Date(filteredDates.fromDate),
                              "MM-dd-yyyy"
                            )} 00:00:00`
                          : "",
                        toDate: filteredDates.toDate
                          ? `${format(
                              new Date(filteredDates.toDate),
                              "MM-dd-yyyy"
                            )} 23:59:59`
                          : "",
                      });
                      setSearchFilter([]);
                    }
                  }}
                  placeholder={customDropDownPlaceholder}
                />
              </Grid>
            )}
            <Grid
              item
              md={3.1}
              className="d-flex align-items-center justify-content-end"
            >
              <span className="fs-12">From date:</span>
              <span className=" bg-orange mx-1 rounded cursor-pointer">
                <AiOutlineCalendar
                  className="m-1 color-white"
                  onClick={() => {
                    dateFromRef.current.showPicker();
                  }}
                />
              </span>

              <span>
                {filteredDates.fromDate !== ""
                  ? format(new Date(filteredDates.fromDate), "MM-dd-yyyy")
                  : "mm-dd-yyyy"}
              </span>
              <input
                ref={dateFromRef}
                type="date"
                value={filteredDates.fromDate}
                className="position-absolute invisible"
                onChange={(e) => {
                  setFilteredDates((pre) => ({
                    ...pre,
                    fromDate: e.target.value,
                  }));
                  if (
                    (filteredDates.toDate &&
                      (e.target.value || filteredDates.fromDate)) ||
                    (filteredDates.toDate === "" &&
                      e.target.value === "" &&
                      filteredDates.fromDate === "")
                  ) {
                    handlePageEnd(searchText, searchFilter?.value, 0, {
                      toDate: filteredDates.toDate
                        ? `${format(
                            new Date(filteredDates.toDate),
                            "MM-dd-yyyy"
                          )} 23:59:59`
                        : "",
                      fromDate: e.target.value
                        ? `${format(
                            new Date(e.target.value),
                            "MM-dd-yyyy"
                          )} 00:00:00`
                        : "",
                    });
                  }
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
              <span className=" bg-orange mx-1 rounded cursor-pointer">
                <AiOutlineCalendar
                  className="m-1 color-white"
                  onClick={() => {
                    dateToRef.current.showPicker();
                  }}
                />
              </span>
              <span>
                {filteredDates.toDate !== ""
                  ? format(new Date(filteredDates.toDate), "MM-dd-yyyy")
                  : "mm-dd-yyyy"}
              </span>
              <input
                ref={dateToRef}
                type="date"
                value={filteredDates.toDate}
                className="position-absolute invisible"
                onChange={(e) => {
                  setFilteredDates((pre) => ({
                    ...pre,
                    toDate: e.target.value,
                  }));
                  if (
                    (filteredDates.fromDate &&
                      (e.target.value || filteredDates.toDate)) ||
                    (filteredDates.fromDate === "" &&
                      e.target.value === "" &&
                      filteredDates.toDate === "")
                  ) {
                    handlePageEnd(searchText, searchFilter?.value, 0, {
                      fromDate: filteredDates.fromDate
                        ? `${format(
                            new Date(filteredDates.fromDate),
                            "MM-dd-yyyy"
                          )} 00:00:00`
                        : "",
                      toDate: e.target.value
                        ? `${format(
                            new Date(e.target.value),
                            "MM-dd-yyyy"
                          )} 23:59:59`
                        : "",
                    });
                  }
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
                    className="bg-orange d-flex justify-content-center align-items-center rounded ms-2 cursor-pointer"
                    onClick={() => {
                      handlePageEnd(searchText, searchFilter?.value, 0, {
                        fromDate: filteredDates.fromDate
                          ? `${format(
                              new Date(filteredDates.fromDate),
                              "MM-dd-yyyy"
                            )} 00:00:00`
                          : "",
                        toDate: filteredDates.toDate
                          ? `${format(
                              new Date(filteredDates.toDate),
                              "MM-dd-yyyy"
                            )} 23:59:59`
                          : "",
                      });
                    }}
                  >
                    <SearchOutlinedIcon style={{ color: "white" }} />
                  </div>
                </Grid>
              </Grid>
            ) : null}
          </Grid>
          {showDateFilterBtn && (
            <Grid item sm={2} justifyContent="end" display="flex">
              <ButtonComponent
                variant="contained"
                label={dateFilterBtnName}
                muiProps="fs-12 ms-1"
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
              className={`fw-bold ${headerClassName}`}
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
          {showFilterButton && (
            <Grid item sm={3}>
              <FilterMenu
                getFilteredValuesOnCheckBoxClick={
                  getFilteredValuesOnCheckBoxClick
                }
                filterList={[...tableFilterList]}
                getFilteredValues={(val) => {
                  getFilteredValues(val, searchText);
                }}
                setPage={setPage}
                setTableFilterList={setTableFilterList}
              />
            </Grid>
          )}
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
                  if (value) {
                    if (!showSearchbar) {
                      handlePageEnd(searchText, value, 0, {
                        fromDate: filteredDates.fromDate
                          ? `${format(
                              new Date(filteredDates.fromDate),
                              "MM-dd-yyyy"
                            )} 00:00:00`
                          : "",
                        toDate: filteredDates.toDate
                          ? `${format(
                              new Date(filteredDates.toDate),
                              "MM-dd-yyyy"
                            )} 23:59:59`
                          : "",
                      });
                    }
                    setSearchFilter(value);
                  } else {
                    setSearchFilter([]);
                  }
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
                      if (e.target.value === "") {
                        handlePageEnd(searchText, searchFilter?.value, 0, {
                          fromDate: filteredDates.fromDate
                            ? `${format(
                                new Date(filteredDates.fromDate),
                                "MM-dd-yyyy"
                              )} 00:00:00`
                            : "",
                          toDate: filteredDates.toDate
                            ? `${format(
                                new Date(filteredDates.toDate),
                                "MM-dd-yyyy"
                              )} 23:59:59`
                            : "",
                        });
                      }
                      setsearchText(e.target.value);
                    }}
                    showAutoCompleteOff={false}
                  />
                </Grid>
                <Grid item xs={2} display="flex" justifyContent="end">
                  <div
                    style={{ width: "40px", height: "38px" }}
                    className={`bg-orange d-flex justify-content-center align-items-center rounded cursor-pointer rounded ${
                      searchText === "" &&
                      searchFilter &&
                      Object.keys(searchFilter)?.length
                        ? "bg-gray"
                        : ""
                    }`}
                    onClick={() => {
                      // if (searchText !== "") {
                      if (
                        searchText !== "" &&
                        Object.keys(searchFilter)?.length
                      ) {
                        setPage(0);
                        handlePageEnd(searchText, searchFilter?.value, 0, {
                          fromDate: filteredDates.fromDate
                            ? `${format(
                                new Date(filteredDates.fromDate),
                                "MM-dd-yyyy"
                              )} 00:00:00`
                            : "",
                          toDate: filteredDates.toDate
                            ? `${format(
                                new Date(filteredDates.toDate),
                                "MM-dd-yyyy"
                              )} 23:59:59`
                            : "",
                        });
                      }
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
              <Grid item sm={12} display="flex" justifyContent="end">
                <div>
                  <ButtonComponent
                    // variant="contained"
                    // size="small"
                    // className="bg-orange"
                    // sx={{ textTransform: "none" }}
                    // fullWidth
                    muiProps=" color-white"
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
