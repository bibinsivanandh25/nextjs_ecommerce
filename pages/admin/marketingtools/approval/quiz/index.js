/* eslint-disable react/no-danger */
/* eslint-disable no-unused-vars */
import MenuOption from "@/atoms/MenuOptions";
import TableComponent from "@/atoms/TableComponent";
import { Box, Paper, Typography } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import CustomIcon from "services/iconUtils";
import ClearIcon from "@mui/icons-material/Clear";
import { useEffect, useState } from "react";
import EditQuizModal from "@/forms/admin/marketingtools&subscriptions/approval/quiz/editquizmodal";
import {
  approveRejectMarketingToolCampaign,
  getMarketingToolsBasedonMarketinType,
} from "services/admin/marketingtools/approvals";
import toastify from "services/utils/toastUtils";

const tableColumn = [
  {
    id: "col1",
    label: "SI NO.",
    minWidth: 50,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col2",
    label: "Reseller ID/ Shop Name",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col3",
    label: "Quiz Title",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col4",
    label: "Description",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  // {
  //   id: "col5",
  //   label: "Quiz Question",
  //   minWidth: 150,
  //   align: "center",
  //   data_align: "center",
  //   data_classname: "",
  // },
  // {
  //   id: "col5",
  //   label: "Options",
  //   minWidth: 100,
  //   align: "center",
  //   data_align: "center",
  //   data_classname: "",
  // },
  {
    id: "col5",
    label: "Start Date & Time",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col6",
    label: "End Date & Time",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col7",
    label: "Actions",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
];
const Quiz = () => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [views, setViews] = useState("");
  const [tableRows, setTableRows] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [marketingToolId, setMarketingToolId] = useState("");

  const acceptRejectTool = async (status, toolId, userId) => {
    const formdata = new FormData();
    formdata.append("status", status);
    formdata.append("marketingToolId", toolId);
    formdata.append("userId", userId);
    const { data, err } = await approveRejectMarketingToolCampaign(formdata);
    if (data) {
      toastify(data?.message, "success");
    }
    if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };
  const mapTableRows = (data) => {
    const result = [];
    data.forEach((item, ind) => {
      result.push({
        id: item.marketingToolId,
        col1: ind + 1,
        col2: (
          <Typography className="h-5 color-light-blue cursor-pointer text-decoration-underline">
            {item.userTypeId}
          </Typography>
        ),
        col3: item.campaignTitle,
        col4: (
          <div
            dangerouslySetInnerHTML={{
              __html: item.description,
            }}
          />
        ),
        // col5: item.marketingToolQuestionAnswerList.map((val) => val.question),
        col5: item.startDateTime,
        col6: item.endDateTime,
        col7: (
          <Box className="d-flex justify-content-center">
            <DoneIcon
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
            />
            <CustomIcon
              type="view"
              className="fs-18 mx-2"
              onIconClick={() => {
                setOpenEditModal(true);
                setViews("view");
                setMarketingToolId(item.marketingToolId);
              }}
            />
            {/* <MenuOption
              options={["Edit", "Delete"]}
              IconclassName="fs-5 cursor-pointer"
              getSelectedItem={(ele) => {
                if (ele === "Edit") {
                  setOpenEditModal(true);
                  setViews("Edit");
                }
              }}
            /> */}
          </Box>
        ),
      });
    });

    return result;
  };

  const getTableData = async (
    page = pageNumber,
    dateFilter = {
      fromDate: "",
      toDate: "",
    }
  ) => {
    const payload = {
      dateFrom: dateFilter.fromDate,
      dateTo: dateFilter.toDate,
      status: "PENDING",
      marketingToolType: "QUIZ",
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
          showDateFilterSearch={false}
          showSearchFilter={false}
          showSearchbar={false}
          tableRows={[...tableRows]}
          tHeadBgColor="bg-tableGray"
          table_heading="Quiz"
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

      {openEditModal ? (
        <EditQuizModal
          modalOpen={openEditModal}
          modalClose={setOpenEditModal}
          title={views === "Edit" ? "Edit Quiz" : "View"}
          editorPlaceHolder="Description for the Scratch Card Products..."
          marketingToolId={marketingToolId}
          views={views}
        />
      ) : null}
    </Paper>
  );
};

export default Quiz;
