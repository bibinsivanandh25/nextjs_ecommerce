/* eslint-disable no-use-before-define */
/* eslint-disable react/no-danger */
import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomIcon from "services/iconUtils";
import ModalComponent from "@/atoms/ModalComponent";
import TableComponent from "@/atoms/TableWithSpan";
import {
  deleteDisCountSubscription,
  discountApproved,
  getViewDiscountData,
} from "services/admin/discountsubscription";
import toastify from "services/utils/toastUtils";

const column1 = [
  {
    id: "col1", //  id value in column should be presented in row as key
    label: "S.No.",
    minWidth: 50,
    align: "center",
    data_align: "center",
    data_classname: "",
    rowSpan: 2,
  },

  {
    id: "col2",
    label: "Notification Title",
    align: "center",
    data_align: "center",
    data_classname: "",
    rowSpan: 2,
    minWidth: 150,
  },
  {
    id: "col3",
    label: "Description",
    align: "center",
    data_align: "center",
    data_classname: "",
    rowSpan: 2,
    minWidth: 150,
  },
  {
    label: "Campaign Period Start & End date with Time",
    align: "center",
    data_align: "center",
    data_classname: "",
    colSpan: 2,
    minWidth: 350,
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

const ViewModal = ({
  openViewModal,
  setOpenViewModal = () => {},
  viewData = {},
  user = {},
}) => {
  const [rows, setRows] = useState([]);
  const [viewPageNumber, setViewPageNumber] = useState(0);
  const handleCloseIconClick = () => {
    setOpenViewModal(false);
  };
  const handleAcceptClick = async (value, id) => {
    const { data, err } = await discountApproved(value, id, user?.userId);
    if (data) {
      getTableData(viewPageNumber);
      toastify(data.message, "success");
    }
    if (err) {
      toastify(err.response?.data?.message, "error");
    }
  };
  const handleDeleteClick = async (id) => {
    const { data, err } = await deleteDisCountSubscription(id);
    if (data) {
      getTableData(viewPageNumber);
      toastify(data.message, "success");
    }
    if (err) {
      toastify(err.response?.data?.message, "error");
    }
  };
  const getTableRows = (data) => {
    const result = [];
    if (data) {
      data.forEach((item, index) => {
        result.push({
          id: index + 1,
          col1: index + 1,
          col2: item.campaignTitle,
          col3: (
            <div
              className="ms-4"
              dangerouslySetInnerHTML={{
                __html: item.description,
              }}
            />
          ),
          col4: (
            <Box className="d-flex justify-content-around">
              <Typography className="h-5">{item.startDateTime}</Typography>
              <CustomIcon type="edit" className="ms-2 fs-16" />
            </Box>
          ),
          col5: (
            <Box className="d-flex justify-content-around">
              <Typography className="h-5">{item.endDateTime}</Typography>
              <CustomIcon type="edit" className="ms-2 fs-16" />
            </Box>
          ),
          col6: item.createdDate,
          col7: item.customerType,
          col8: item.toolStatus,
          col9: (
            <Box className="d-flex align-items-center justify-content-center">
              <CustomIcon type="edit" className="fs-18 mx-2" />
              <CustomIcon
                type="close"
                className="fs-18"
                onIconClick={() => {
                  handleAcceptClick("REJECTED", item.marketingToolId);
                }}
              />
              <CustomIcon
                type="doneIcon"
                className="fs-18 mx-2"
                onIconClick={() => {
                  handleAcceptClick("APPROVED", item.marketingToolId);
                }}
              />
              <CustomIcon
                type="delete"
                className="fs-18"
                onIconClick={() => {
                  handleDeleteClick(item.marketingToolId);
                }}
              />
            </Box>
          ),
        });
      });
    }
    return result;
  };
  const getTableData = async (page) => {
    const { data, err } = await getViewDiscountData(viewData.purchaseId, page);
    if (data?.data?.length) {
      toastify(data?.message, "success");
      if (page == 0) {
        setRows(getTableRows(data.data));
        setViewPageNumber((pre) => pre + 1);
      } else {
        setViewPageNumber((pre) => pre + 1);
        setRows((pre) => [...pre, ...getTableRows(data.data)]);
      }
    } else {
      toastify(data?.message, "success");
    }
    if (err) {
      toastify(err?.response?.data?.message, "error");
      setRows([]);
    }
  };
  useEffect(() => {
    getTableData(0);
  }, [viewData]);
  return (
    <Box>
      <ModalComponent
        open={openViewModal}
        ModalTitle={`Reseller ID/Supplier ID : ${viewData.purchasedById}`}
        titleClassName="fw-bold fs-14 color-orange"
        showFooter={false}
        ModalWidth={1000}
        onCloseIconClick={() => {
          handleCloseIconClick();
        }}
      >
        <Box display="flex" justifyContent="space-between">
          <Typography className="fw-bold h-5">
            Subscription status:{viewData.toolStatus}
          </Typography>
          <Typography className="fw-bold h-5">
            Subscription period - {viewData.activatedAt} to{" "}
            {viewData.expirationDate}
          </Typography>
        </Box>
        <TableComponent
          columns={[...column2]}
          column2={[...column1]}
          tableRows={rows}
          tHeadBgColor="bg-light-gray"
          showSearchFilter={false}
          showSearchbar={false}
          showCheckbox={false}
          handlePageEnd={(page = viewPageNumber) => {
            getTableData(page);
          }}
          handleRowsPerPageChange={() => {
            setViewPageNumber(0);
          }}
          stickyHeader
        />
      </ModalComponent>
    </Box>
  );
};

export default ViewModal;
