/* eslint-disable no-use-before-define */
/* eslint-disable react/no-danger */
import { Box, Grid, Paper, Typography } from "@mui/material";
import CustomIcon from "services/iconUtils";
import TableComponent from "@/atoms/TableComponent";
import MenuOption from "@/atoms/MenuOptions";
import CreateNotification from "@/forms/supplier/marketingtools/Notifications/CreateNotication";
import { useEffect, useState } from "react";
import {
  deleteNotificationById,
  getAllNotificationWithFilters,
  sendScheduledNotification,
} from "services/supplier/notifications";
import { useSelector } from "react-redux";
import Image from "next/image";
import { TbMessageCircleOff } from "react-icons/tb";
import ModalComponent from "@/atoms/ModalComponent";
import ButtonComponent from "@/atoms/ButtonComponent";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import toastify from "services/utils/toastUtils";

const Notification = () => {
  const [showCreateNotification, setShowCreateNotification] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [notificationID, setNotificationID] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  // const [customersList, setCustomersList] = useState([]);
  const [modalType, setModalType] = useState("add");
  const [notificationDetails, setNotificationDetails] = useState({});
  // const [tableDate, setTableDate] = useState({
  //   fromDate: "",
  //   toDate: "",
  // });
  const columns = [
    {
      id: "col1", //  id value in column should be presented in row as key
      label: "Sl. No",
      align: "center",
      data_align: "center",
      data_classname: "center",
    },
    {
      id: "col2",
      label: "Notification Title",
      align: "center",
      data_align: "center",
      data_classname: "center",
    },
    {
      id: "col3",
      label: "Image",
      align: "center",
      data_align: "center",
      data_classname: "center",
    },
    {
      id: "col4",
      label: "Subject",
      align: "center",
      data_align: "center",
      data_classname: "center",
    },
    {
      id: "col5",
      label: "Status",
      align: "center",
      data_align: "center",
      data_classname: "center",
    },
    {
      id: "col6",
      label: "Whom",
      align: "center",
      data_align: "center",
      data_classname: "center",
    },
    {
      id: "col7",
      label: "Created Date & Time",
      align: "center",
      data_align: "center",
      data_classname: "center",
    },
    {
      id: "col8",
      label: "Scheduled Date & Time",
      align: "center",
      data_align: "center",
      data_classname: "center",
    },
    {
      id: "col9",
      label: "Action",
      align: "center",
      data_align: "center",
      data_classname: "center",
    },
  ];
  const [tableRows, setTableRows] = useState([]);
  const [showSendNotificationModal, setShowSendNotificationModal] =
    useState(false);
  const deleteNotification = async (id) => {
    const { data, err } = await deleteNotificationById(id);
    if (data) {
      toastify(data.message, "success");
      getTableData("", 0, {
        fromDate: "",
        toDate: "",
      });
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };
  const mapTableRows = (data) => {
    const result = [];
    data.forEach((ele, ind) => {
      result.push({
        id: ele.marketingToolNotificationId,
        col1: ind + 1,
        col2: ele.notificationTitle,
        col3: ele.attachmentUrl[0] ? (
          <Image src={ele.attachmentUrl[0]} height={50} width={50} />
        ) : (
          "--"
        ),
        col4: ele.notificationMessage ? (
          <p
            className=""
            dangerouslySetInnerHTML={{
              __html: ele.notificationMessage,
            }}
          />
        ) : (
          "--"
        ),
        col5: ele.status,
        col6: ele.type,
        col7: ele.createdDate,
        col8: ele.scheduledDateTime ?? "--",
        col9: (
          <div className="d-flex justify-content-center">
            {/* <CustomIcon
                type="send"
                className={`h-4 ${
                  ele.status === "SCHEDULED" ? "color-orange" : ""
                }`}
                showColorOnHover={false}
              /> */}
            {ele.status === "SCHEDULED" ? (
              <CustomIcon
                type="sendMessage"
                className="h-4 text-secondary"
                title="Send Notification"
                onIconClick={() => {
                  setNotificationID(ele.marketingToolNotificationId);
                  setShowSendNotificationModal(true);
                }}
              />
            ) : (
              <TbMessageCircleOff className="h-4 text-secondary" />
            )}
            <CustomIcon
              type="view"
              className="h-4 ms-1"
              title="View"
              onIconClick={() => {
                setShowViewModal(true);
                setNotificationDetails(ele);
                // setCustomersList(() => {
                //   return ele.customers.map((customer) => customer.name);
                // });
              }}
            />
            <MenuOption
              options={
                ele.status === "SCHEDULED" ? ["Edit", "Delete"] : ["Delete"]
              }
              IconclassName="h-4"
              getSelectedItem={(item) => {
                if (item === "Delete") {
                  deleteNotification(ele.marketingToolNotificationId);
                }
                if (item === "Edit") {
                  setShowCreateNotification(true);
                  setNotificationID(ele.marketingToolNotificationId);
                  setModalType("edit");
                }
              }}
            />
          </div>
        ),
      });
    });
    return result;
  };

  const supplierId = useSelector((state) => state?.user?.supplierId);
  const getTableData = async (searchText, page, date) => {
    const payload = {
      dateFrom: date?.fromDate ?? "",
      dateTo: date?.toDate ?? "",
      keyword: searchText === "" ? null : searchText,
    };
    const { data } = await getAllNotificationWithFilters(
      supplierId,
      page,
      payload
    );
    if (data?.length) {
      if (page == 0) {
        setTableRows(mapTableRows(data, date));
        setPageNumber((pre) => pre + 1);
      } else {
        setPageNumber((pre) => pre + 1);
        setTableRows((pre) => [...pre, ...mapTableRows(data, date)]);
      }
    } else if (page === 0 && ((date.fromDate && date.toDate) || searchText)) {
      setTableRows([]);
    }
    // if (data) {
    //   setTableRows(mapTableRows(data));
    // }
  };

  const handleSendNotication = async () => {
    const { data, err } = await sendScheduledNotification(notificationID);
    if (data) {
      toastify(data.message, "success");
      getTableData("", 0, {
        fromDate: "",
        toDate: "",
      });
    }
    if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };

  useEffect(() => {
    getTableData("", 0, {
      fromDate: "",
      toDate: "",
    });
  }, []);
  const renderNotificationDetails = () => {
    return (
      <Grid container spacing={2} justifyContent="center" display="flex">
        <Grid item sm={2} className="fw-bold">
          Title
        </Grid>
        <Grid item sm={1} className="text-end">
          :
        </Grid>
        <Grid item sm={8}>
          {notificationDetails.notificationTitle}
        </Grid>
        <Grid item sm={2} className="fw-bold">
          Images
        </Grid>
        <Grid item sm={1} className="text-end">
          :
        </Grid>
        <Grid item sm={8}>
          {notificationDetails.attachmentUrl?.map((ele) => {
            return <Image src={ele} height={50} width={50} />;
          })}
        </Grid>
        <Grid item sm={2} className="fw-bold">
          Customers
        </Grid>
        <Grid item sm={1} className="text-end">
          :
        </Grid>
        <Grid item sm={8}>
          {notificationDetails?.customers.map((ele) => {
            return <Typography className="py-1">{ele.name}</Typography>;
          })}
        </Grid>
      </Grid>
    );
  };

  return (
    <Paper className="mnh-80vh mxh-809vh overflow-auto hide-scrollbar p-3">
      <TableComponent
        showDateFilter
        showCheckbox={false}
        tableRows={[...tableRows]}
        columns={[...columns]}
        showDateFilterBtn
        dateFilterBtnName="Create Notification"
        dateFilterBtnClick={() => {
          setShowCreateNotification(true);
          setModalType("add");
        }}
        table_heading="Notification"
        handlePageEnd={(
          searchText,
          searchFilter,
          page = pageNumber,
          filteredDates
        ) => {
          getTableData(searchText, page, filteredDates);
        }}
        // handleGetDate={(fromDate, toDate) => {
        //   if (fromDate && toDate) {
        //     setPageNumber(0);
        //     setTableDate({
        //       fromDate: new Date(fromDate).toISOString().substring(0, 19),
        //       toDate: new Date(toDate).toISOString().substring(0, 19),
        //     });
        //     getTableData(
        //       new Date(fromDate).toISOString().substring(0, 19),
        //       new Date(toDate).toISOString().substring(0, 19),
        //       0
        //     );
        //   } else if (fromDate == "" && toDate == "") {
        //     setTableDate({
        //       fromDate: "",
        //       toDate: "",
        //     });
        //     getTableData("",  0);
        //   }
        // }
      />
      {showCreateNotification ? (
        <CreateNotification
          showModal={showCreateNotification}
          setShowModal={setShowCreateNotification}
          getTableData={getTableData}
          type={modalType}
          notificationID={notificationID}
        />
      ) : null}
      {showSendNotificationModal ? (
        <ModalComponent
          ModalTitle="Warning"
          titleClassName="color-orange"
          onCloseIconClick={() => {
            setShowSendNotificationModal(false);
          }}
          showFooter={false}
          showClearBtn={false}
          showSaveBtn={false}
          open={showSendNotificationModal}
        >
          <Box className="w-100 d-flex  justify-content-center">
            <Box className="w-60p mb-4 d-flex flex-column align-items-center m-3">
              <Box>
                <WarningAmberIcon sx={{ fontSize: "5rem", color: "red" }} />
              </Box>

              <Typography className="h-4 text-center">
                Are you sure want to send the scheduled notification?
              </Typography>
              <ButtonComponent
                label="Proceed"
                onBtnClick={() => {
                  handleSendNotication();
                  setShowSendNotificationModal(false);
                }}
                muiProps="mx-auto mt-3"
              />
            </Box>
          </Box>
        </ModalComponent>
      ) : null}
      {showViewModal ? (
        <ModalComponent
          ModalTitle="View Notication"
          open={showViewModal}
          onCloseIconClick={() => setShowViewModal(false)}
          showFooter={false}
          ModalWidth={800}
        >
          <div className="my-1">{renderNotificationDetails()}</div>
        </ModalComponent>
      ) : null}
    </Paper>
  );
};
export default Notification;
