import { Badge, Button, Grid, Paper, Typography } from "@mui/material";
import TableComponent from "components/atoms/TableComponent";
import React, { useEffect, useState } from "react";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import VisibilityIcon from "@mui/icons-material/Visibility";
import HelpandsupportCreate from "components/forms/supplier/helpandsupport/helpandsupportcreate";
import HelpAndSupportNotification from "components/forms/supplier/helpandsupport/helpandsupportnotification";
import HelpandsupportView from "components/forms/supplier/helpandsupport/helpandsupportview";
import { red } from "@mui/material/colors";

const HelpAndSupport = () => {
  const [tableRows, setTableRows] = useState([]);
  const [showCreateComponent, setShowCreateComponent] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [showModal, setShowModal] = useState({
    show: false,
    id: null,
  });
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
      label: "Order ID",
      id: "col4",
    },
    {
      label: "Subject",
      id: "col5",
    },
    {
      label: "Attachments",
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
        col1: index + 1,
        col2: row.ticketId,
        col3: row.issueType,
        col4: row.orderId,
        col5: row.subject,
        col6: row.attachments,
        col7: row.createdDateAndTime,
        col8: row.lastUpdateDateAndTime,
        col9: <div className={getClassnames(row.status)}>{row.status}</div>,
        col10: (
          <Grid container>
            <Grid item xs={6} sx={{ px: 0, mx: 0 }}>
              <VisibilityIcon
                className="text-secondary cursor-pointer"
                onClick={() => {
                  setShowModal({
                    show: true,
                    id: row.ticketId,
                    type: "view",
                  });
                  setSelectedData(row);
                }}
              />
            </Grid>
            <Grid item xs={6}>
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
                      id: row.ticketId,
                      type: "notification",
                    });
                    setSelectedData(row);
                  }}
                />
              </Badge>
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
        ticketId: "#123458",
        issueType: "123456",
        lastUpdateDateAndTime: "12-01-2022, 04:45 AM",
        orderId: "123456",
        subject: "Request for refund",
        createdDateAndTime: "23-01-2022, 11:20 PM",
        attachments: "4",
        status: "Pending",
        chooseActionValue: null,
        total: 2,
        orderQuantity: 1,
      },
      {
        ticketId: "#123456",
        issueType: "123456",
        lastUpdateDateAndTime: "12-01-2022, 07:09 AM",
        orderId: "123456",
        subject: "Low quality",
        createdDateAndTime: "23-01-2022, 12:23 AM",
        attachments: "4",
        status: "Open",
        chooseActionValue: null,
        total: 3,
        orderQuantity: 1,
      },
      {
        ticketId: "#123459",
        issueType: "123423",
        lastUpdateDateAndTime: "12-01-2023, 08:43 PM",
        orderId: "123456",
        subject: "Not satisfied",
        createdDateAndTime: "23-01-2022, 05:40 PM",
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
        <HelpandsupportView selectedData={selectedData} />
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
                  showCheckbox={false}
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
