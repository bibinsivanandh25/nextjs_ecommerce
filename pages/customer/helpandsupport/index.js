import { Badge, Button, Grid, Paper, Typography } from "@mui/material";
import TableComponent from "components/atoms/TableComponent";
import React, { useEffect, useState } from "react";
import CustomIcon from "services/iconUtils";
import HelpandsupportCreate from "@/forms/customer/helpandsupport/CreateTicket";
import HelpandsupportView from "@/forms/customer/helpandsupport/helpandsupportview";
import ModalComponent from "@/atoms/ModalComponent";

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

  const mapRowsToTable = (data) => {
    const result = [];
    data.forEach((row, index) => {
      result.push({
        id: index + 1,
        col1: row.date,
        col2: row.ticketId,
        col3: row.subject,
        col4: <div className={getClassnames(row.status)}>{row.status}</div>,
        col5: (
          <Grid className="d-flex justify-content-center">
            <Grid>
              <CustomIcon
                type="view"
                title="View"
                className="me-2"
                onIconClick={() => {
                  setShowModal({
                    show: true,
                    type: "view",
                  });
                  setSelectedData(row);
                }}
              />
            </Grid>
            <Grid classNamw="mx-2">
              <Badge
                variant="dot"
                sx={{
                  "& .MuiBadge-badge": {
                    color: "red",
                    backgroundColor: "red",
                  },
                }}
              >
                <CustomIcon
                  type="notification"
                  onIconClick={() => {
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
            <Grid>
              <Typography
                className="h-5 color-orange ms-2"
                onClick={() => {
                  setShowModal({
                    show: true,
                    id: row.ticketId,
                    type: "reply",
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

  useEffect(() => {
    const rows = [
      {
        date: "24 jun 2020",
        ticketId: "#23324234",
        subject: "lorem ipsum...",
        status: "open",
        col5: (
          <div className="d-flex justify-content-center align-items-center">
            <CustomIcon type="view" />
            <CustomIcon type="notification" className="mx-2" />
            <Typography className="h-5 color-orange">Reply</Typography>
          </div>
        ),
      },
      {
        date: "24 jun 2020",
        ticketId: "#23324234",
        subject: "lorem ipsum...",
        status: "pending",
        col5: (
          <div className="d-flex justify-content-center align-items-center">
            <CustomIcon type="view" />
            <CustomIcon type="notification" className="mx-2" />
            <Typography className="h-5 color-orange">Reply</Typography>
          </div>
        ),
      },
    ];
    setTableData(rows);
  }, []);

  useEffect(() => {
    setTableRows(mapRowsToTable(tableData));
  }, [tableData]);

  return (
    <>
      {/* eslint-disable-next-line no-nested-ternary */}
      {showCreateComponent ? (
        <HelpandsupportCreate setShowCreateComponent={setShowCreateComponent} />
      ) : showModal.show && showModal.type === "reply" ? (
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
                  tableRows={tableRows}
                  showCheckbox={false}
                  showSearchFilter={false}
                />
              </Paper>
            </Grid>

            <ModalComponent
              open={showModal.show && showModal.type === "view"}
              ModalTitle="Admin Reply"
              showFooter={false}
              onCloseIconClick={() => setShowModal({ show: false, id: null })}
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
          </Grid>
        </Paper>
      )}
    </>
  );
};

export default HelpAndSupport;
