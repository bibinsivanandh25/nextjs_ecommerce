/* eslint-disable no-unused-vars */
import { Box, Paper } from "@mui/material";
import TableComponent from "@/atoms/TableComponent";
import { useEffect, useState } from "react";
import Image from "next/image";
import CustomIcon from "services/iconUtils";
import toastify from "services/utils/toastUtils";
import { deleteAnswerData } from "services/admin/customers";
import ViewModal from "../ViewModal";
import ReplyModal from "../ReplyModal";

const columns = [
  {
    id: "col1",
    align: "center",
    label: "SI.No.",
    data_align: "center",
  },
  { id: "col2", align: "center", label: "Customer ID", data_align: "center" },
  {
    id: "col3",
    align: "center",
    label: "Product Image",
    data_align: "center",
  },
  { id: "col4", align: "center", label: "Question", data_align: "center" },
  {
    id: "col5",
    align: "center",
    label: "Reply",
    data_align: "center",
  },
  {
    id: "col6",
    align: "center",
    label: "Replied By",
    data_align: "center",
  },
  { id: "col7", align: "center", label: "Date & Time", data_align: "center" },
  {
    id: "col8",
    align: "center",
    label: "Action",
    data_align: "center",
  },
];
const Answered = ({
  getAnsweredData = () => {},
  masterData,
  pageNumber,
  getBothCountCall = () => {},
}) => {
  const [row, setRow] = useState([]);
  const [selectedData, setSelectedData] = useState({});
  const [showViewModal, setShowViewModal] = useState(false);
  const [replyModal, setReplyModal] = useState(false);
  const handleReplyClick = (item) => {
    setSelectedData(item);
    setReplyModal(true);
  };
  const handleViewIconClick = (item) => {
    setSelectedData(item);
    setShowViewModal(true);
  };
  const handleDeleteClick = async (id) => {
    if (id) {
      const { data, err } = await deleteAnswerData(id);
      if (data) {
        toastify(data.data, "success");
        getBothCountCall();
      }
      if (err) {
        toastify(err?.response?.data?.message, "error");
      }
    }
  };
  const mapRowToState = (data) => {
    const temp = [];
    data.forEach((item, index) => {
      temp.push({
        col1: index + 1,
        col2: item.customerQuestionId,
        col3: <Image src={item.productImages[0]} width={50} height={50} />,
        col4: item.question,
        col5: item.reply,
        col6: item.repliedBy,
        col7: item.dateAndTime,
        col8: (
          <Box>
            <CustomIcon
              type="edit"
              className="fs-18 me-2"
              onIconClick={() => {
                handleReplyClick(item);
              }}
            />
            <CustomIcon
              type="view"
              className="fs-18 me-2"
              onIconClick={() => {
                handleViewIconClick(item);
              }}
            />
            <CustomIcon
              type="delete"
              className="fs-18 me-2"
              onIconClick={() => {
                handleDeleteClick(item.customerQuestionId);
              }}
            />
          </Box>
        ),
      });
    });
    return temp;
  };
  useEffect(() => {
    if (masterData.length) {
      setRow(mapRowToState(masterData));
    }
  }, [masterData]);
  return (
    <Box>
      <Paper sx={{ height: "78vh" }} className="overflow-auto hide-scrollbar">
        <Box className="px-1 pt-2">
          <TableComponent
            columns={columns}
            tHeadBgColor="bg-light-gray"
            tableRows={[...row]}
            // showSearchbar={false}
            showDateFilter
            handlePageEnd={(
              searchText = "",
              filterText = "ALL",
              page = pageNumber,
              filteredDates
            ) => {
              getAnsweredData(
                page,
                searchText,
                filteredDates.fromDate,
                filteredDates.toDate
              );
            }}
          />
        </Box>
      </Paper>
      {showViewModal && (
        <ViewModal
          openViewModal={showViewModal}
          setOpenViewModal={setShowViewModal}
          selectedData={selectedData}
          type="Answered"
        />
      )}
      {replyModal && (
        <ReplyModal
          openReplyModal={replyModal}
          setOpenReplyModal={setReplyModal}
          selectedData={selectedData}
          getBothCountCall={getBothCountCall}
          value={selectedData.reply}
        />
      )}
    </Box>
  );
};

export default Answered;
