/* eslint-disable no-use-before-define */

import TableComponent from "@/atoms/TableComponent";
import { Box, Paper, Typography } from "@mui/material";
import CustomIcon from "services/iconUtils";
import { useState, useEffect } from "react";
import ViewMarketingtools from "@/forms/admin/marketingtools&subscriptions/approval/viewmarketingtools";
import { getMarketingToolsBasedonMarketinType } from "services/admin/marketingtools/approvals";

const tableColumn = [
  {
    id: "col1",
    label: "Sl NO.",
    minWidth: 50,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col2",
    label: "Supplier ID/ Reseller ID",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col4",
    label: "Title",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col5",
    label: "Description",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col6",
    label: "Customer Type",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col7",
    label: "Start Date & Time",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col8",
    label: "End Date & Time",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col9",
    label: "Created Date & Time",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col10",
    label: "Actions",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
];
const ApprovedTools = () => {
  const [viewModalOpen, setViewModalopen] = useState(false);
  const [tableRows, setTableRows] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [marketingToolId, setMarketingToolId] = useState("");

  const mapTableRows = (data) => {
    const result = [];
    data.forEach((item, ind) => {
      result.push({
        col1: ind + 1,
        col2: (
          <Typography className="h-5 color-light-blue cursor-pointer text-decoration-underline">
            {item.userTypeId}
          </Typography>
        ),
        col4: item.campaignTitle,
        col5: (
          <div
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: item.description,
            }}
          />
        ),
        col6: item.customerType.replaceAll("_", " "),
        col7: item.startDateTime,
        col8: item.endDateTime,
        col9: item.createdDate,
        col10: (
          <Box className="d-flex justify-content-center align-items-center">
            {/* <DoneIcon
              className="border rounded bg-green color-white fs-18 me-1 cursor-pointer"
              onClick={() => {
                acceptRejectTool(
                  "APPROVED",
                  item.marketingToolId,
                  item.userTypeId
                );
              }}
            />
            <ClearIcon
              className="border rounded bg-red color-white fs-18 me-1 cursor-pointer mx-2"
              onClick={() => {
                acceptRejectTool(
                  "REJECTED",
                  item.marketingToolId,
                  item.userTypeId
                );
              }}
            /> */}
            <CustomIcon
              type="view"
              className="fs-18 mx-2"
              onIconClick={() => {
                setViewModalopen(true);
                setMarketingToolId(item.marketingToolId);
              }}
            />
          </Box>
        ),
      });
    });

    return result;
  };
  const getTableData = async (
    page = pageNumber ?? 0,
    dateFilter = {
      fromDate: "",
      toDate: "",
    }
  ) => {
    const payload = {
      dateFrom: dateFilter.fromDate,
      dateTo: dateFilter.toDate,
      status: "APPROVED",
      marketingToolType: "DISCOUNT_COUPON",
    };
    const { data } = await getMarketingToolsBasedonMarketinType(page, payload);
    if (data) {
      if (page === 0) {
        setTableRows(mapTableRows(data));
      } else {
        setPageNumber(pageNumber + 1);
        setTableRows([...tableRows, ...mapTableRows(data)]);
      }
    }
  };
  useEffect(() => {
    getTableData(0);
  }, []);

  return (
    <Paper
      className="mnh-85vh mxh-85vh overflow-auto hide-scrollbar"
      elevation={3}
    >
      <Box className="mt-2">
        <TableComponent
          columns={[...tableColumn]}
          showDateFilter
          showSearchFilter={false}
          showDateFilterSearch={false}
          showSearchbar={false}
          tableRows={[...tableRows]}
          tHeadBgColor="bg-tableGray"
          table_heading="Discount Coupons"
          showCheckbox={false}
          handlePageEnd={(
            searchText,
            searchFilter,
            page = pageNumber,
            dateFilter
          ) => {
            getTableData(page, dateFilter);
          }}
        />
      </Box>
      {viewModalOpen ? (
        <ViewMarketingtools
          modalOpen={viewModalOpen}
          modalClose={setViewModalopen}
          title="View Discounts"
          marketingToolId={marketingToolId}
          marketingToolType="DISCOUNT_COUPON"
          status="APPROVED"
        />
      ) : null}
    </Paper>
  );
};

export default ApprovedTools;
