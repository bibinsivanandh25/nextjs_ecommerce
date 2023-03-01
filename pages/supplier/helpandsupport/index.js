/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Badge, Button, Grid, Paper } from "@mui/material";
import TableComponent from "components/atoms/TableComponent";
import React, { useEffect, useState } from "react";
import HelpandsupportCreate from "components/forms/supplier/helpandsupport/helpandsupportcreate";
import HelpAndSupportNotification from "components/forms/supplier/helpandsupport/helpandsupportnotification";
import HelpandsupportView from "components/forms/supplier/helpandsupport/helpandsupportview";
import { useSelector } from "react-redux";
import CustomIcon from "services/iconUtils";
import {
  getAllHelpandSupportData,
  viewHelpandSupport,
} from "services/supplier/helpandsupport";
import toastify from "services/utils/toastUtils";
import styles from "./helpandsupport.module.css";

const filterData = [
  { label: "All", id: "0", value: "ALL" },
  { label: "ISSUE TYPE", id: "0", value: "ISSUE_TYPE" },
  { label: "TICKET STATUS", id: "0", value: "TICKET_STATUS" },
  { label: "TICKET ID", id: "0", value: "TICKET_ID" },
];
const HelpAndSupport = () => {
  const user = useSelector((state) => state.user);
  const [selectTab, setSelectTab] = useState("tab1");
  const [tableRows, setTableRows] = useState([]);
  const [customerRows, setCustomerRows] = useState([]);
  const [showCreateComponent, setShowCreateComponent] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [showModal, setShowModal] = useState({
    show: false,
    id: null,
  });
  const [pageNumber, setpageNumber] = useState(0);
  const columns = [
    {
      label: "Serial No.",
      id: "col1",
    },
    {
      label: "Ticket ID",
      id: "col2",
    },
    {
      label: "Issue Type",
      id: "col3",
    },
    {
      label: "Issue to",
      id: "col4",
    },
    {
      label: "Order ID",
      id: "col5",
    },
    {
      label: "Subject",
      id: "col6",
    },

    {
      label: "Created Date & Time",
      id: "col7",
    },
    {
      label: "Last updated Date & Time",
      id: "col8",
    },
    {
      label: "Status",
      id: "col9",
    },
    {
      label: "",
      id: "col10",
      align: "center",
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
        viewedByType: "SUPPLIER",
        viewedById: user.supplierId,
      };
      const { data, err } = await viewHelpandSupport(payload);
      if (data) {
        setShowModal({
          show: true,
          id: value.ticketId,
          type,
        });
        setSelectedData(value);
        getAllData("", null, 0);
      }
      if (err) {
        toastify(err.response.data.message, "error");
      }
    }
  };

  const mapRowsToTable = (data) => {
    const result = [];
    data?.forEach((row, index) => {
      const flag = row.helpSupportMessages?.map((item) => {
        return item.helpSupportMessageViews.some(
          (value) => value.viewedById == user.supplierId
        );
      });
      result.push({
        col1: index + 1,
        col2: row.ticketId,
        col3: row.issueType,
        col4: row.userToType,
        col5: row.orderId,
        col6: row.issueSubject,
        col7: new Date(row.createdDate).toLocaleString(),
        col8: new Date(row.lastModifiedDate).toLocaleString(),
        col9: (
          <div className={getClassnames(row.ticketStatus)}>
            {row.ticketStatus}
          </div>
        ),
        col10: (
          <Grid container>
            <Grid item xs={6} sx={{ px: 0, mx: 0 }}>
              <CustomIcon
                type="view"
                title="View & Reply"
                onIconClick={() => {
                  handleViewClick(row, "view");
                }}
                className="fs-18 me-2 fit-content"
              />
            </Grid>
            <Grid item xs={6}>
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
                  className="fs-18"
                />
              </Badge>
            </Grid>
          </Grid>
        ),
      });
    });
    return result;
  };
  const getAllData = async (searchText = "", filterText = "", page = "") => {
    if (selectTab == "tab1") {
      const payload = {
        userId: user.supplierId,
        userFromType: "SUPPLIER",
        ticketType: selectTab == "tab1" ? "ADMIN" : "CUSTOMER",
        filterType:
          filterText?.toLocaleLowerCase() == "all" ? null : filterText || null,
        keyword: searchText || "",
      };
      const { data, err } = await getAllHelpandSupportData(payload, page);
      if (data?.length) {
        if (page == 0) {
          setTableRows(mapRowsToTable(data));
          setpageNumber((pre) => pre + 1);
        } else {
          setpageNumber((pre) => pre + 1);
          setTableRows((pre) => [...pre, ...mapRowsToTable(data)]);
        }
      }
      if (err) {
        toastify(err?.response?.data?.message, "error");
      }
    }
    if (selectTab == "tab2") {
      const payload = {
        userId: user.supplierId,
        userFromType: "SUPPLIER",
        ticketType: selectTab == "tab1" ? "ADMIN" : "CUSTOMER",
        filterType:
          filterText?.toLocaleLowerCase() == "all" ? null : filterText || null,
        keyword: searchText || "",
      };
      const { data, err } = await getAllHelpandSupportData(payload, page);
      if (data?.length) {
        if (page == 0) {
          setCustomerRows(mapRowsToTable(data));
          setpageNumber((pre) => pre + 1);
        } else {
          setpageNumber((pre) => pre + 1);
          setCustomerRows((pre) => [...pre, ...mapRowsToTable(data)]);
        }
      }
      if (err) {
        toastify(err.response.data.err, "errror");
      }
    }
  };
  useEffect(() => {
    getAllData("", "", 0);
  }, [selectTab]);

  const handletabClick = () => {
    setpageNumber(0);
    setShowCreateComponent(false);
    setShowModal({
      show: false,
      id: null,
    });
  };
  return (
    <>
      <div className="d-flex tabcontainer">
        <div
          className={`px-4 py-1 border fs-14 cursor-pointer ${
            selectTab === "tab1" ? styles.activeTab : styles.inActivetab
          }`}
          onClick={() => {
            setSelectTab("tab1");
            handletabClick();
          }}
        >
          Admin Tickets
        </div>
        <div
          className={`px-4 py-1 border fs-14 cursor-pointer ${
            selectTab === "tab2" ? styles.activeTab : styles.inActivetab
          }`}
          onClick={() => {
            setSelectTab("tab2");
            handletabClick();
          }}
        >
          Customer Tickets
        </div>
      </div>
      {/* eslint-disable-next-line no-nested-ternary */}
      {showCreateComponent ? (
        <HelpandsupportCreate
          setShowCreateComponent={setShowCreateComponent}
          selectTab={selectTab}
          user={user}
          getAllData={getAllData}
        />
      ) : showModal.show && showModal.type === "view" ? (
        <HelpandsupportView
          selectedData={selectedData}
          setShowModal={setShowModal}
          selectTab={selectTab}
          user={user}
          getAllData={getAllData}
        />
      ) : (
        <Paper className="mnh-80vh mxh-80vh overflow-auto hide-scrollbar">
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
                  <span className="fs-16 fw-bold px-3">
                    {selectTab == "tab1"
                      ? `Admin Help & Support`
                      : `Customer Help & Support`}
                  </span>
                  <span className="fs-12 fw-normal text-secondary">
                    (We ensure to solve your issues within 3 working days)
                  </span>
                </p>
              </Grid>
              <Grid item sx={{ p: 2 }}>
                {selectTab == "tab1" && (
                  <Button
                    variant="contained"
                    className="bg-orange text-capitalize"
                    size="small"
                    onClick={() => setShowCreateComponent(true)}
                  >
                    Create Tickets
                  </Button>
                )}
              </Grid>
            </Grid>
            <Grid item xs={12} className="px-2 pb-1 mt-3">
              <Paper className="pt-3">
                <TableComponent
                  filterList={filterData}
                  table_heading=""
                  columns={columns}
                  tableRows={selectTab == "tab1" ? tableRows : customerRows}
                  showCheckbox={false}
                  showSearchFilter
                  handlePageEnd={(
                    searchText = "",
                    filterText = "",
                    page = pageNumber
                  ) => {
                    getAllData(searchText, filterText, page);
                  }}
                  handleRowsPerPageChange={() => {
                    setpageNumber(0);
                  }}
                  tabChange={selectTab}
                />
              </Paper>
            </Grid>
            {showModal.show && showModal.type === "notification" && (
              <HelpAndSupportNotification
                show={showModal.show}
                setShowModal={setShowModal}
                selectTab={selectTab}
                selectedData={selectedData}
              />
            )}
          </Grid>
        </Paper>
      )}
    </>
  );
};

export default HelpAndSupport;
