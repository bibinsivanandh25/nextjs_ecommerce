import { Button, Grid, Paper, Typography } from "@mui/material";
import TableComponent from "components/atoms/TableComponent";
import React, { useEffect, useState } from "react";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ModalComponent from "components/atoms/ModalComponent";
import HelpandsupportCreate from "components/forms/supplier/helpandsupport/helpandsupportcreate";

const HelpAndSupport = () => {
  const [tableRows, setTableRows] = useState([]);
  const [showCreateComponent, setShowCreateComponent] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [showNotificationModal, setShowNotificationModal] = useState({
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
        col2: row.ticketid,
        col3: row.issuetype,
        col4: row.orderid,
        col5: row.subject,
        col6: row.attachments,
        col7: row.createddateandtime,
        col8: row.lastupdateddateandtime,
        col9: <div className={getClassnames(row.status)}>{row.status}</div>,
        col10: (
          <Grid container>
            <Grid item xs={6} sx={{ px: 0, mx: 0 }}>
              <VisibilityIcon className="text-secondary cursor-pointer" />
            </Grid>
            <Grid item xs={6}>
              <NotificationsNoneIcon
                className="text-secondary cursor-pointer"
                onClick={() => {
                  setShowNotificationModal({ show: true, id: row.ticketid });
                }}
              />
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
        lastupdateddateandtime: "12-01-2022, 04:45 AM",
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
        lastupdateddateandtime: "12-01-2022, 07:09 AM",
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
        lastupdateddateandtime: "12-01-2023, 08:43 PM",
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

  const getParagraph = (param1, param2) => {
    return (
      <Grid container my={1}>
        <Grid item xs={2}>
          {param1}
        </Grid>
        <Grid item xs={1}>
          :
        </Grid>
        <Grid item xs={9}>
          {param2}
        </Grid>
      </Grid>
    );
  };

  return (
    <>
      {showCreateComponent ? (
        <HelpandsupportCreate />
      ) : (
        <Grid container>
          <Grid
            container
            item
            xs={12}
            justifyContent="space-between"
            className="border-bottom"
          >
            <Grid item>
              <p>
                <span className="fs-16 fw-bold px-3">Help & Support</span>
                <span className="fs-12 fw-normal text-secondary">
                  (We ensure to solve your issues within 3 working days)
                </span>
              </p>
            </Grid>
            <Grid>
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
          <Grid item xs={12} sx={{ my: 5 }}>
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
          {showNotificationModal.show && (
            <ModalComponent
              open={showNotificationModal.show}
              ModalTitle="Admin Reply"
              showFooter={false}
              onCloseIconClick={() =>
                setShowNotificationModal({ show: false, id: null })
              }
              minHeightClassName="mnh-300 mxh-300"
              ModalWidth={800}
            >
              <Grid container my={2}>
                <Grid xs={12} item className="fs-15 fw-500">
                  {getParagraph("Date & Time", "12-03-2021, 04:23 AM")}
                  {getParagraph("Ticket ID", "#12445")}
                  {getParagraph(
                    "Subject",
                    "Request for refund has not approved yet"
                  )}
                  {getParagraph("Reply from admin", "12-03-2021, 04:23 AM")}
                  {getParagraph("Attached File", "12-03-2021, 04:23 AM")}
                </Grid>
              </Grid>
            </ModalComponent>
          )}
        </Grid>
      )}
    </>
  );
};

export default HelpAndSupport;
