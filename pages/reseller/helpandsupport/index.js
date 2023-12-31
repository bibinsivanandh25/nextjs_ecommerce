/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable no-nested-ternary */
import { Badge, Grid, Paper } from "@mui/material";
import TableComponent from "components/atoms/TableComponent";
import React, { useEffect, useState } from "react";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import HelpandsupportCreate from "components/forms/reseller/helpandsupport/helpandsupportcreate";
import HelpAndSupportNotification from "components/forms/reseller/helpandsupport/helpandsupportnotification";
import HelpandsupportView from "components/forms/reseller/helpandsupport/helpandsupportview";
// import CustomIcon from "services/iconUtils";
import CustomIcon from "services/iconUtils";
import ButtonComponent from "@/atoms/ButtonComponent";

const HelpAndSupport = () => {
  const [tableRows, setTableRows] = useState([]);
  const [showCreateComponent, setShowCreateComponent] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
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
    }
    if (status.toLowerCase().includes("close")) {
      return "text-danger";
    }
    if (status.toLowerCase().includes("pending")) {
      return "text-warning";
    }
    return "";
  };

  const mapRowsToTable = (data) => {
    const result = [];
    data.forEach((row, ind) => {
      result.push({
        id: ind + 1,
        col1: row.dateAndTime,
        col2: <div className="w-200px">{row.ticketId}</div>,
        col3: <div className="w-200px">{row.subject}</div>,
        col4: <div className={getClassnames(row.status)}>{row.status}</div>,
        col5: (
          <Grid container sx={{ maxWidth: 100 }}>
            <Grid item xs={4} sx={{ px: 0, mx: 0 }}>
              <CustomIcon
                type="view"
                title="View"
                className="text-secondary cursor-pointer"
                onIconClick={() => {
                  setShowModal({
                    show: true,
                    id: row.ticketId,
                    type: "view",
                  });
                  setSelectedData(row);
                }}
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
                      id: row.ticketId,
                      type: "notification",
                    });
                    setSelectedData(row);
                  }}
                />
              </Badge>
            </Grid>
            <Grid item xs={4}>
              <ButtonComponent
                size="small"
                muiProps="fs-12"
                variant="outlined"
                onBtnClick={() => {
                  setShowModal({
                    show: true,
                    id: row.ticketId,
                    type: "reply",
                  });
                  setSelectedData(row);
                }}
                label="Reply"
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
        id: 1,
        ticketId: "#123458",
        issueType: "123456",
        dateAndTime: "12-01-2022, 04:45 AM",
        orderid: "123456",
        subject: "Request for refund",
        createdDateAndTime: "23-01-2022, 11:20 PM",
        attachments: "4",
        status: "Pending",
        chooseActionValue: null,
        total: 2,
        orderQuantity: 1,
      },
      {
        id: 2,
        ticketId: "#123456",
        issueType: "123456",
        dateAndTime: "12-01-2022, 07:09 AM",
        orderid: "123456",
        subject: "Low quality",
        createdDateAndTime: "23-01-2022, 12:23 AM",
        attachments: "4",
        status: "Open",
        chooseActionValue: null,
        total: 3,
        orderQuantity: 1,
      },
      {
        id: 3,
        ticketId: "#123459",
        issueType: "123423",
        dateAndTime: "12-01-2023, 08:43 PM",
        orderid: "123456",
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
        <Paper className="p-2 mxh-80vh mnh-80vh">
          <HelpandsupportCreate
            setShowCreateComponent={setShowCreateComponent}
          />
        </Paper>
      ) : showModal.show &&
        (showModal.type === "view" || showModal.type === "reply") ? (
        <HelpandsupportView selectedData={selectedData} />
      ) : (
        <Paper className="overflow-auto hide-scrollbar mxh-80vh mnh-80vh">
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
                <ButtonComponent
                  variant="contained"
                  size="small"
                  onBtnClick={() => setShowCreateComponent(true)}
                  label="Create Tickets"
                />
              </Grid>
            </Grid>
            <Grid item xs={12} sx={{ my: 5, px: 2 }}>
              <Paper className="py-2">
                <TableComponent
                  table_heading="43 Reviews"
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
