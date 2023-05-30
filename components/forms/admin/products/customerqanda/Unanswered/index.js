/* eslint-disable no-unused-vars */
import { Box, Paper } from "@mui/material";
import TableComponent from "@/atoms/TableComponent";
import { useEffect, useState } from "react";
import Image from "next/image";
import CustomIcon from "services/iconUtils";
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
  { id: "col5", align: "center", label: "Date & Time", data_align: "center" },
  {
    id: "col6",
    align: "center",
    label: "Action",
    minWidth: 150,
    data_align: "center",
  },
];
const Unanswered = ({
  getUnAnsweredData = () => {},
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
  const mapRowToState = (data) => {
    const temp = [];
    data.forEach((item, index) => {
      temp.push({
        col1: index + 1,
        col2: item.customerQuestionId,
        col3: <Image src={item.productImages[0]} width={50} height={50} />,
        col4: item.question,
        col5: item.dateAndTime,
        col6: (
          <Box>
            <CustomIcon
              type="reply"
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
              onIconClick={() => {}}
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
    <>
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
              getUnAnsweredData(
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
          type="UnAnswered"
        />
      )}
      {replyModal && (
        <ReplyModal
          openReplyModal={replyModal}
          setOpenReplyModal={setReplyModal}
          selectedData={selectedData}
          getBothCountCall={getBothCountCall}
        />
      )}
    </>
  );
};
export default Unanswered;
