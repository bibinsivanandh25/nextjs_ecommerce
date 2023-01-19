/* eslint-disable no-use-before-define */
import { Badge, Button, Grid, Paper, Typography } from "@mui/material";
import TableComponent from "components/atoms/TableComponent";
import React, { useEffect, useState } from "react";
import CustomIcon from "services/iconUtils";
import HelpandsupportCreate from "@/forms/customer/helpandsupport/CreateTicket";
import HelpandsupportView from "@/forms/customer/helpandsupport/helpandsupportview";
import { getCustomerHelp } from "services/customer/helpAndSupport";
import toastify from "services/utils/toastUtils";
import { viewHelpandSupport } from "services/supplier/helpandsupport";
import { useSelector } from "react-redux";
import HelpAndSupportNotification from "@/forms/customer/helpandsupport/HelpAndSupportNotification";

const HelpAndSupport = () => {
  const user = useSelector((state) => state.customer);
  const [tableRows, setTableRows] = useState([]);
  const [showCreateComponent, setShowCreateComponent] = useState(false);
  const [pageNumber, setpageNumber] = useState(0);
  const [selectedData, setSelectedData] = useState(null);
  const [showModal, setShowModal] = useState({
    show: false,
    id: null,
  });
  const filterData = [
    {
      name: "issue type",
      value: [
        {
          item: "ORDER_RELATED_ISSUE",
          isSelected: false,
          value: "ORDER_RELATED_ISSUE",
        },
        {
          item: "RETURN_AND_REFUND",
          isSelected: false,
          value: "RETURN_AND_REFUND",
        },
        {
          item: "LOGISTICS_RELATED_ISSUE",
          isSelected: false,
          value: "LOGISTICS_RELATED_ISSUE",
        },
        {
          item: "CANCELLATION_AND_REFUND",
          isSelected: false,
          value: "CANCELLATION_AND_REFUND",
        },
        {
          item: "PROFILE_RELATED_ISSUE",
          isSelected: false,
          value: "PROFILE_RELATED_ISSUE",
        },
        {
          item: "PAYMENT_SETTLEMENT_ISSUE",
          isSelected: false,
          value: "PAYMENT_SETTLEMENT_ISSUE",
        },
        {
          item: "OTHERS",
          isSelected: false,
          value: "OTHERS",
        },
      ],
    },
    // { name: "All", value: "ALL" },
    {
      name: "status",
      value: [
        {
          item: "OPEN",
          isSelected: false,
          value: "OPEN",
        },
        {
          item: "PENDING",
          isSelected: false,
          value: "PENDING",
        },
        {
          item: "CLOSED",
          isSelected: false,
          value: "CLOSED",
        },
      ],
    },
    // { name: "TICKET ID", value:tableData.map((val)=>{item:{val.ticketId} })  },
  ];
  const columns = [
    {
      id: "col1", //  id value in column should be presented in row as key
      label: "Date and Time",
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col2",
      label: "Ticket ID",
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col3",
      label: "Subject",
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col4",
      label: "Status",
      minWidth: 50,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col5",
      label: "Action",
      minWidth: 50,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
  ];

  const getClassnames = (status) => {
    if (status?.toLowerCase().includes("open")) {
      return "text-success";
    }
    if (status.toLowerCase().includes("close")) {
      return "text-danger";
    }
    if (status.toLowerCase().includes("pending")) {
      return "text-warning";
    }
    return "";
  };
  const handleViewClick = async (value, type) => {
    if (value) {
      const payload = {
        ticketId: value.ticketId,
        viewedByType: "CUSTOMER",
        viewedById: user.userId,
      };
      const { data, err } = await viewHelpandSupport(payload);
      if (data) {
        setShowModal({
          show: true,
          id: value.ticketId,
          type,
        });
        setSelectedData(value);

        getTabledata(0, null, "");
      }
      if (err) {
        toastify(err.response.data.message, "error");
      }
    }
  };

  const mapRowsToTable = (data) => {
    const result = [];

    data.forEach((row) => {
      const flag = row.helpSupportMessages?.map((item) => {
        return item.helpSupportMessageViews.some(
          (value) => value.viewedById == user.userId
        );
      });
      result.push({
        id: row.ticketId,
        col1: new Date(row.createdDate).toLocaleString(),
        col2: row.ticketId,
        col3: row.issueSubject,
        col4: (
          <div className={getClassnames(row.ticketStatus)}>
            {row.ticketStatus}
          </div>
        ),
        col5: (
          <Grid className="d-flex justify-content-center">
            <Grid>
              <CustomIcon
                type="view"
                title="View & Reply"
                onIconClick={() => {
                  handleViewClick(row, "view");
                }}
                className="fs-18 me-2 fit-content"
              />
            </Grid>
            <Grid classNamw="mx-2">
              <Badge
                variant="dot"
                sx={{
                  "& .MuiBadge-badge": {
                    color: flag.every((val) => val) ? "white" : "red",
                    backgroundColor: flag.every((val) => val) ? "white" : "red",
                  },
                }}
              >
                <CustomIcon
                  type="notification"
                  onIconClick={() => {
                    handleViewClick(row, "notification");
                  }}
                />
              </Badge>
            </Grid>
            <Grid>
              <Typography
                className="h-5 color-orange ms-2"
                onClick={() => {
                  setShowCreateComponent({
                    id: row.ticketId,
                  });
                  setSelectedData(row);
                }}
              >
                Reply
              </Typography>
            </Grid>
          </Grid>
        ),
      });
    });
    return result;
  };

  const getTabledata = async (
    page = pageNumber,
    filters = [],
    keyword = null
  ) => {
    const payload = {
      issueType: [],
      ticketStatus: [],
      keyword,
    };
    filters?.forEach((ele) => {
      Object.entries(ele).forEach(([key, value]) => {
        payload[key] = value;
      });
    });
    const { data, err } = await getCustomerHelp(page, payload);
    if (data) {
      if (page === 0) {
        setTableRows(mapRowsToTable(data));
        setpageNumber((pre) => pre + 1);
      } else {
        setTableRows((pre) => [...pre, ...mapRowsToTable(data)]);
        setpageNumber((pre) => pre + 1);
      }
      // setTableData(data);
    } else {
      toastify(err, "error");
      setTableRows([]);
    }
  };
  useEffect(() => {
    getTabledata(0);
  }, []);
  const getFilteredValues = (val) => {
    if (val.length) {
      const result = [];
      val.forEach((item) => {
        if (item.name === "status") {
          result.push({
            ticketStatus: item?.value
              ?.map((ele) => {
                if (ele.isSelected) return ele.value;
                return null;
              })
              .filter((ele) => !!ele),
          });
        }
        if (item.name === "issue type") {
          result.push({
            issueType: item.value
              .map((ele) => {
                if (ele.isSelected) return ele.value;
                return null;
              })
              .filter((ele) => !!ele),
          });
        }
      });
      getTabledata(0, result);
    }
  };
  return (
    <>
      {/* eslint-disable-next-line no-nested-ternary */}
      {showCreateComponent ? (
        <HelpandsupportCreate
          setShowCreateComponent={setShowCreateComponent}
          getTabledata={getTabledata}
          selectedData={selectedData}
        />
      ) : showModal.show && showModal.type === "view" ? (
        <HelpandsupportView
          selectedData={selectedData}
          setShowView={setShowModal}
        />
      ) : (
        <Paper>
          <Grid container>
            <Grid
              container
              item
              xs={12}
              justifyContent="space-between"
              className="border-bottom"
            >
              <Grid item sx={{ p: 2 }}>
                <p>
                  <span className="fs-16 fw-bold px-3">Help & Support</span>
                  <span className="fs-12 fw-normal text-secondary">
                    (We ensure to solve your issues within 3 working days)
                  </span>
                </p>
              </Grid>
              <Grid item sx={{ p: 2 }}>
                <Button
                  variant="contained"
                  className="bg-orange"
                  size="small"
                  onClick={() => setShowCreateComponent(true)}
                >
                  Create Tickets
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={12} sx={{ my: 5, px: 2 }}>
              <Paper className="pt-3">
                <TableComponent
                  table_heading=""
                  columns={columns}
                  filterData={filterData}
                  tableRows={tableRows}
                  showCheckbox={false}
                  showSearchFilter={false}
                  showFilterButton
                  handlePageEnd={(
                    searchText,
                    searchFilter,
                    page = pageNumber
                  ) => {
                    getTabledata(page, [], searchText);
                  }}
                  handleRowsPerPageChange={() => {
                    setpageNumber(0);
                  }}
                  showFilterList
                  getFilteredValues={(val) => getFilteredValues(val)}
                />
              </Paper>
            </Grid>
          </Grid>
          {showModal.show && showModal.type === "notification" && (
            <HelpAndSupportNotification
              show={showModal.show}
              setShowModal={setShowModal}
              selectedData={selectedData}
            />
          )}
        </Paper>
      )}
    </>
  );
};

export default HelpAndSupport;
