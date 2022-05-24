import { Badge, Button, Grid, Paper, Typography } from "@mui/material";
import TableComponent from "components/atoms/TableComponent";
import React, { useEffect, useState } from "react";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import VisibilityIcon from "@mui/icons-material/Visibility";
import HelpandsupportCreate from "components/forms/supplier/helpandsupport/helpandsupportcreate";
import HelpAndSupportNotification from "components/forms/supplier/helpandsupport/helpandsupportnotification";
import HelpandsupportView from "components/forms/supplier/helpandsupport/helpandsupportview";
import { red } from "@mui/material/colors";
import ButtonComponent from "components/atoms/ButtonComponent";

const HelpAndSupport = () => {
  const [tableRows, setTableRows] = useState([]);
  const [showCreateComponent, setShowCreateComponent] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [showModal, setShowModal] = useState({
    show: false,
    id: null,
  });
  const columns = [
    {
      label: "Date & Time",
      id: "col1",
    },
    {
      label: "Ticket ID",
      id: "col2",
    },
    {
      label: "Subject",
      id: "col3",
    },
    {
      label: "Status",
      id: "col4",
    },
    {
      label: "",
      id: "col5",
      align: "center",
    },
  ];

  const getClassnames = (status) => {
    if (status?.toLowerCase().includes("open")) {
      return "text-success";
    } else if (status.toLowerCase().includes("close")) {
      return "text-danger";
    } else if (status.toLowerCase().includes("pending")) {
      return "text-warning";
    }
    return "";
  };

  const mapRowsToTable = (data) => {
    const result = [];
    data.forEach((row, index) => {
      result.push({
        col1: row.dateandtime,
        col2: <div className="w-200px">{row.ticketid}</div>,
        col3: <div className="w-200px">{row.subject}</div>,
        col4: <div className={getClassnames(row.status)}>{row.status}</div>,
        col5: (
          <Grid container sx={{ maxWidth: 100 }}>
            <Grid item xs={4} sx={{ px: 0, mx: 0 }}>
              <VisibilityIcon
                className="text-secondary cursor-pointer"
                onClick={() =>
                  setShowModal({
                    show: true,
                    id: row.ticketid,
                    type: "view",
                  })
                }
              />
            </Grid>
            <Grid item xs={4}>
              <Badge
                variant="dot"
                sx={{
                  "& .MuiBadge-badge": {
                    color: "red",
                    backgroundColor: "red",
                  },
                }}
              >
                <NotificationsNoneIcon
                  className="text-secondary cursor-pointer"
                  onClick={() => {
                    setShowModal({
                      show: true,
                      id: row.ticketid,
                      type: "notification",
                    });
                  }}
                />
              </Badge>
            </Grid>
            <Grid item xs={4}>
              <Button size="small" className="color-orange fs-12">
                Reply
              </Button>
            </Grid>
          </Grid>
        ),
      });
    });
    return result;
  };

  useEffect(() => {
    const rows = [
      {
        ticketid: "#123458",
        issuetype: "123456",
        dateandtime: "12-01-2022, 04:45 AM",
        orderid: "123456",
        subject: "Request for refund",
        createddateandtime: "23-01-2022, 11:20 PM",
        attachments: "4",
        status: "Pending",
        chooseActionValue: null,
        total: 2,
        orderQuantity: 1,
      },
      {
        ticketid: "#123456",
        issuetype: "123456",
        dateandtime: "12-01-2022, 07:09 AM",
        orderid: "123456",
        subject: "Low quality",
        createddateandtime: "23-01-2022, 12:23 AM",
        attachments: "4",
        status: "Open",
        chooseActionValue: null,
        total: 3,
        orderQuantity: 1,
      },
      {
        ticketid: "#123459",
        issuetype: "123423",
        dateandtime: "12-01-2023, 08:43 PM",
        orderid: "123456",
        subject: "Not satisfied",
        createddateandtime: "23-01-2022, 05:40 PM",
        attachments: "1",
        status: "Closed",
        chooseActionValue: null,
        total: 4,
        orderQuantity: 3,
      },
    ];
    setTableData(rows);
  }, []);

  useEffect(() => {
    setTableRows(mapRowsToTable(tableData));
  }, [tableData]);

  return (
    <>
      {showCreateComponent ? (
        <HelpandsupportCreate />
      ) : showModal.show && showModal.type === "view" ? (
        <HelpandsupportView />
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
              <Paper>
                <TableComponent
                  table_heading=""
                  columns={columns}
                  tableRows={tableRows}
                  showSearchFilter={false}
                />
              </Paper>
            </Grid>
            {showModal.show && showModal.type === "notification" && (
              <HelpAndSupportNotification
                show={showModal.show}
                setShowModal={setShowModal}
              />
            )}
          </Grid>
        </Paper>
      )}
    </>
  );
};

export default HelpAndSupport;
