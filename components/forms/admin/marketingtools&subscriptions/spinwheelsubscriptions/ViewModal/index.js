/* eslint-disable react/no-danger */
/* eslint-disable no-use-before-define */
import { Box, Typography } from "@mui/material";
import ModalComponent from "@/atoms/ModalComponent";
import TableComponent from "@/atoms/TableWithSpan";
import CustomIcon from "services/iconUtils";
import {
  acceptRejectSingleToolSubscription,
  viewAllSubsOfSingleUser,
} from "services/admin/marketingtools/subscriptions";
import toastify from "services/utils/toastUtils";
import React, { useState, useEffect } from "react";

const ViewModal = ({
  openViewModal,
  setOpenViewModal,
  purchaseIde,
  subscriptionStatus,
  subscriptionPeriod,
  userType,
  userId,
}) => {
  const [rows, setRows] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const handleCloseIconClick = () => {
    setRows([]);
    setOpenViewModal(false);
  };

  const column1 = [
    {
      id: "col1", //  id value in column should be presented in row as key
      label: "S.No.",
      align: "center",
      data_align: "center",
      data_classname: "",
      rowSpan: 2,
    },

    {
      id: "col2",
      label: "Discount Title",
      align: "center",
      data_align: "center",
      data_classname: "",
      rowSpan: 2,
    },
    {
      id: "col3",
      label: "Description",
      align: "center",
      data_align: "center",
      data_classname: "",
      rowSpan: 2,
    },
    {
      label: "Campaign Period Start & End date with Time",
      align: "center",
      data_align: "center",
      data_classname: "",
      colSpan: 2,
    },
    {
      id: "col6",
      label: "Tools Created Date & Time",
      minWidth: 150,
      align: "center",
      data_align: "center",
      data_classname: "",
      rowSpan: 2,
    },
    {
      id: "col7",
      label: "Customer Type",
      minWidth: 150,
      align: "center",
      data_align: "center",
      data_classname: "",
      rowSpan: 2,
    },
    {
      id: "col8",
      label: "Tool Status",
      minWidth: 150,
      align: "center",
      data_align: "center",
      data_classname: "",
      rowSpan: 2,
    },
    {
      id: "col9",
      label: "Action",
      minWidth: 150,
      align: "center",
      data_align: "center",
      data_classname: "",
      rowSpan: 2,
    },
  ];

  const column2 = [
    {
      id: "col4",
      label: "Start Date",
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col5",
      label: "End Date",
      align: "center",
      data_align: "center",
      data_classname: "",
    },
  ];

  const handleAcceptReject = async (status, tool, typeId) => {
    const { data, error, message } = await acceptRejectSingleToolSubscription(
      status,
      tool,
      typeId
    );

    if (error) {
      if (message) toastify(message, "error");
      if (error?.response?.data?.message)
        toastify(error?.response?.data?.message, "error");
    } else if (data) {
      toastify(message, "success");
      await getSubscriptionsRows(purchaseIde, 0);
    }
  };

  const returnRowsOfSingleSubs = (data) => {
    const mappedArray = data.map((val, index) => {
      return {
        id: val.marketingToolId,
        col1: index >= 9 ? index + 1 : `0${index + 1}`,
        col2: val.campaignTitle,
        col3: (
          <div
            className="ms-4"
            dangerouslySetInnerHTML={{
              __html: val.description,
            }}
          />
        ),
        col4: (
          <Box className="d-flex justify-content-around">
            <Typography className="h-5">{val.startDateTime}</Typography>
          </Box>
        ),
        col5: (
          <Box className="d-flex justify-content-around">
            <Typography className="h-5">{val.endDateTime}</Typography>
          </Box>
        ),
        col6: val.createdDate,
        col7: val.customerType,
        col8: val.toolStatus,
        col9: (
          <Box className="d-flex justify-content-center align-items-center">
            <CustomIcon
              type="close"
              onIconClick={() => {
                handleAcceptReject(
                  "REJECTED",
                  val.marketingToolId,
                  val.userTypeId
                );
              }}
            />
            <CustomIcon
              type="doneIcon"
              onIconClick={() => {
                handleAcceptReject(
                  "APPROVED",
                  val.marketingToolId,
                  val.userTypeId
                );
              }}
            />
          </Box>
        ),
      };
    });

    return mappedArray;
  };

  async function getSubscriptionsRows(purchaseId, page) {
    const { data, error } = await viewAllSubsOfSingleUser(purchaseId, page);
    if (error?.response?.data?.message) {
      toastify(error?.response?.data?.message, "error");
      if (page === 0) {
        setRows([]);
      }
    } else if (data) {
      if (page === 0) {
        setPageNumber(1);
        setRows(returnRowsOfSingleSubs(data));
      } else {
        setPageNumber((pre) => pre + 1);
        setRows((pre) => [...pre, ...returnRowsOfSingleSubs(data)]);
      }
      setOpenViewModal(true);
    }
  }

  useEffect(() => {
    getSubscriptionsRows(purchaseIde, 0);
  }, []);

  return (
    <Box>
      <ModalComponent
        open={openViewModal}
        ModalTitle={
          <>
            <Box>
              <Typography>
                {userType === "SUPPLIER" ? "Supplier" : "Reseller"} Subscription
                Details
              </Typography>
            </Box>
            <Box>
              <Typography className="fs-12 color-black">
                {userType === "SUPPLIER" ? "Supplier ID" : "Reseller Id"} : #
                {userId}
              </Typography>
            </Box>
          </>
        }
        titleClassName="fw-bold fs-14 color-orange"
        showFooter={false}
        ModalWidth={800}
        onCloseIconClick={() => {
          handleCloseIconClick();
        }}
      >
        <Box className="d-flex justify-content-between">
          <Typography className="fw-bold h-5">
            Subscription status:{subscriptionStatus}
          </Typography>
          <Typography className="fw-bold h-5">
            Subscription period {subscriptionPeriod}
          </Typography>
        </Box>
        <Box>
          {rows.length ? (
            <TableComponent
              columns={[...column2]}
              column2={[...column1]}
              tableRows={[...rows]}
              tHeadBgColor="bg-light-gray"
              showSearchFilter={false}
              showSearchbar={false}
              showCheckbox={false}
              handlePageEnd={(page = pageNumber) => {
                getSubscriptionsRows(purchaseIde, page);
              }}
              handleRowsPerPageChange={() => {
                setPageNumber(0);
              }}
              stickyHeader
            />
          ) : (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              className="mnh-300"
            >
              <Typography className="fw-bold h-4">No Data Available</Typography>
            </Box>
          )}
        </Box>
      </ModalComponent>
    </Box>
  );
};

export default ViewModal;
