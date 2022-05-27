import { Badge, Button, Grid, Paper, Typography } from "@mui/material";
import TableComponent from "components/atoms/TableComponent";
import { useEffect, useState } from "react";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Image from "next/image";
import SimpleDropdownComponent from "components/atoms/SimpleDropdownComponent";
import ButtonComponent from "components/atoms/ButtonComponent";
import ResellerNotificationModal from "components/forms/reseller/newsandnotifications/notifcationmodal";
import ResellerNotificationView from "components/forms/reseller/newsandnotifications/notificationview";
import ResellerNotificationCreate from "components/forms/reseller/newsandnotifications/notificationcreate";

const ResellerNotifications = () => {
  const [tableRows, setTableRows] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [showModal, setShowModal] = useState({
    show: false,
    id: null,
    info: null,
  });
  const columns = [
    {
      label: "Notification ID",
      id: "col1",
    },
    {
      label: "Profile Photo",
      id: "col2",
    },
    {
      label: "Name",
      id: "col3",
    },
    {
      label: "Subject",
      id: "col4",
    },
    {
      label: "Whom",
      id: "col5",
    },
    {
      label: "Type",
      id: "col6",
    },
    {
      label: "Date & Time",
      id: "col7",
    },
    {
      label: "Actions",
      id: "col8",
    },
  ];

  const mapRowsToTable = (data) => {
    const result = [];
    data.forEach((row) => {
      result.push({
        col1: row.notificationId,
        col2: row.image ? (
          <Image src={row.image} width={50} height={50} alt="" />
        ) : null,
        col3: row.name,
        col4: row.subject,
        col5: row.whom,
        col6: row.type,
        col7: row.dateandtime,
        col8: (
          <Grid container sx={{ maxWidth: 100 }}>
            <Grid item xs={4} sx={{ px: 0, mx: 0 }}>
              <VisibilityIcon
                className="text-secondary cursor-pointer"
                onClick={() =>
                  setShowModal({
                    show: true,
                    id: row.notificationId,
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
                      id: row.notificationId,
                      type: "notification",
                    });
                  }}
                />
              </Badge>
            </Grid>
            <Grid item xs={4}>
              <Button
                size="small"
                className="color-orange fs-12"
                onClick={() => {
                  setShowModal({
                    show: true,
                    id: row.notificationId,
                    type: "reply",
                    info: row,
                  });
                }}
              >
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
        notificationId: "#123458",
        image: null,
        name: "Refund",
        subject: "Request for refund not approved yet",
        whom: "Referee",
        dateandtime: "23-01-2022",
        type: "sent/received",
      },
      {
        notificationId: "#123458",
        image: null,
        name: "Refund",
        subject: "Request for refund not approved yet",
        whom: "Referee",
        dateandtime: "23-01-2022",
        type: "sent/received",
      },
    ];
    setTableData(rows);
  }, []);

  useEffect(() => {
    setTableRows(mapRowsToTable(tableData));
  }, [tableData]);

  return (
    <Paper sx={{ p: 2, height: "100%", minHeight: "80vh" }}>
      {showModal.show && showModal.type === "reply" ? (
        <ResellerNotificationView
          show={showModal.show}
          setShowModal={setShowModal}
          notificationDetails={showModal.info}
        />
      ) : showModal.type === "create" ? (
        <ResellerNotificationCreate />
      ) : (
        <Grid container>
          <Grid
            container
            item
            xs={12}
            justifyContent="space-between"
            className="border-bottom"
          >
            <Grid item sx={{ p: 2 }}>
              <Typography variant="h6" fontWeight="bold" fontSize={16}>
                Notification&apos;s
              </Typography>
            </Grid>
            <Grid
              item
              sx={{ p: 2 }}
              className="d-flex justify-content-end w-75"
            >
              <SimpleDropdownComponent
                label="Filter by type"
                className="w-25 mx-2"
                size="small"
              />
              <ButtonComponent
                label="Create Notification"
                size="small"
                onBtnClick={() => setShowModal({ type: "create" })}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ my: 5, px: 2 }}>
            <Paper sx={{ px: 0, py: 2 }}>
              <TableComponent
                table_heading={`${tableRows.length} Reviews`}
                columns={columns}
                tableRows={tableRows}
                showSearchFilter={false}
                searchBarSizeMd={5}
              />
            </Paper>
          </Grid>
        </Grid>
      )}
      {showModal.show && showModal.type !== "reply" && (
        <ResellerNotificationModal
          show={showModal.show}
          setShowModal={setShowModal}
        />
      )}
    </Paper>
  );
};

export default ResellerNotifications;
