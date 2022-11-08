/* eslint-disable no-use-before-define */
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import MenuOption from "@/atoms/MenuOptions";
import TableComponent from "@/atoms/TableComponent";
import {
  approveAdminTags,
  deleteAdminTags,
  getAdminTags,
} from "services/admin/tags";
import CreateTags from "@/forms/admin/tags/createtags";
import toastify from "services/utils/toastUtils";
import { useSelector } from "react-redux";
import TagsViewModal from "../viewmodal";

const tableColumn = [
  {
    id: "col1",
    align: "center",
    label: "S.No.",
    minWidth: 50,
    data_align: "center",
  },
  {
    id: "col2",
    align: "center",
    label: "Tag Name",
    minWidth: 150,
    data_align: "center",
  },
  {
    id: "col3",
    align: "center",
    label: "Created By",
    minWidth: 150,
    data_align: "center",
  },
  {
    id: "col4",
    align: "center",
    label: "Updated Date & Time",
    minWidth: 150,
    data_align: "center",
  },
  {
    id: "col5",
    align: "center",
    label: "Status",
    minWidth: 150,
    data_align: "center",
  },
  {
    id: "col6",
    align: "center",
    label: "Action",
    minWidth: 150,
    data_align: "center",
  },
];

const filterList = [
  {
    id: 1,
    label: "ALL",
    value: "All",
  },
  {
    id: 2,
    label: "Active",
    value: "Active",
  },
  {
    id: 3,
    label: "InActive",
    value: "InActive",
  },
  {
    id: 4,
    label: "Pending",
    value: "Pending",
  },
];
const AdminTags = () => {
  const user = useSelector((state) => state.user);
  const [rows, setRows] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [tagName, setTageName] = useState("");
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [pageNumber, setpageNumber] = useState(0);
  const [modalType, setModalType] = useState("add");
  const [viewData, setViewData] = useState({});
  const [selectedTagId, setSelectedTagId] = useState("");

  const getAllTags = async (page) => {
    const { data, err } = await getAdminTags(page);
    if (data?.length) {
      if (page == 0) {
        setRows(getTableData(data));
        setpageNumber(1);
      } else {
        setpageNumber((pre) => pre + 1);
        setRows((pre) => [...pre, ...getTableData(data)]);
      }
    } else {
      setpageNumber((pre) => pre);
    }
    if (err && page == 0) {
      setRows([]);
    }
  };
  useEffect(() => {
    getAllTags(0);
  }, []);
  const getTableData = (data) => {
    const result = [];
    if (data) {
      data.forEach((item, index) => {
        result.push({
          id: index + 1,
          col1: index + 1,
          col2: item.tagName,
          col3: item.createdByType,
          col4: item.lastUpdatedAt,
          col5: item.status,
          col6: (
            <Box>
              <DoneIcon
                className="border rounded bg-green color-white fs-18 me-2 cursor-pointer"
                onClick={() => {
                  handleAcceptRejectClick(item, true);
                }}
              />
              <ClearIcon
                className="border rounded bg-red color-white fs-18 me-1 cursor-pointer"
                onClick={() => {
                  handleAcceptRejectClick(item, false);
                }}
              />
              <MenuOption
                options={["View", "Edit", "Delete"]}
                IconclassName="fs-5 cursor-pointer"
                getSelectedItem={(ele) => {
                  if (ele === "View") {
                    handleViewClick(item);
                  }
                  if (ele == "Delete") {
                    handleDeleteClick(item);
                  }
                  if (ele === "Edit") {
                    setModalType("edit");
                    setSelectedTagId(item.tagId);
                    setTageName(item.tagName);
                    setModalOpen(true);
                  }
                }}
              />
            </Box>
          ),
        });
      });
    }
    return result;
  };
  const handleViewClick = (item) => {
    if (item) {
      setViewData(item);
      setViewModalOpen(true);
    }
  };
  const handleAcceptRejectClick = async (item, type) => {
    if (item) {
      const { data, err } = await approveAdminTags(item.tagId, type);
      if (data) {
        toastify(data.message, "success");
        getAllTags(0);
        setpageNumber(0);
      }
      if (err) {
        toastify(err.response.data.message, "error");
      }
    }
  };
  const handleDeleteClick = async (item) => {
    if (item) {
      const { data, err } = await deleteAdminTags(item.tagId);
      if (data.data) {
        toastify(data.message, "success");
        getAllTags(0);
        setpageNumber(0);
      }
      if (err) {
        toastify(err.response.data.message, "error");
      }
    }
  };
  return (
    <>
      <TableComponent
        columns={[...tableColumn]}
        tHeadBgColor="bg-light-gray"
        tableRows={rows}
        showDateFilterBtn
        dateFilterBtnName="Create"
        dateFilterBtnClick={() => {
          setModalType("add");
          setModalOpen(true);
        }}
        showDateFilter
        showDateFilterDropDown
        filterList={filterList}
        showFilterButton={false}
        handlePageEnd={(searchText, searchFilter, page = pageNumber) => {
          getAllTags(page);
        }}
        handleRowsPerPageChange={() => {
          setpageNumber(0);
        }}
      />
      {modalOpen ? (
        <CreateTags
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          getAllTags={getAllTags}
          tagName={tagName}
          setTageName={setTageName}
          setpageNumber={setpageNumber}
          user={user}
          modalType={modalType}
          selectedTagId={selectedTagId}
        />
      ) : null}
      {viewModalOpen ? (
        <TagsViewModal
          viewModalOpen={viewModalOpen}
          setViewModalOpen={setViewModalOpen}
          viewData={viewData}
        />
      ) : null}
    </>
  );
};

export default AdminTags;
