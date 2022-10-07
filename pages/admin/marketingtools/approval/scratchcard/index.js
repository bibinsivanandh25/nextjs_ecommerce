import MenuOption from "@/atoms/MenuOptions";
import TableComponent from "@/atoms/TableComponent";
import { Box, Paper } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import CustomIcon from "services/iconUtils";
import ClearIcon from "@mui/icons-material/Clear";
import { useState, useEffect } from "react";
import ViewMarketingtools from "@/forms/admin/marketingtools&subscriptions/approval/viewmarketingtools";
import EditMarketingTools from "@/forms/admin/marketingtools&subscriptions/approval/editmarketingtools";
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
    label: "Reseller ID/ Shop Name",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col3",
    label: "Tool",
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
const ScratchCard = () => {
  const [viewModalOpen, setViewModalopen] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [tableRows, setTableRows] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  const mapTableRows = (data) => {
    const result = [];
    data.forEach((item, ind) => {
      result.push({
        col1: ind + 1,
        col2: item.userTypeId,
        col3: item.toolType.replaceAll("_", " "),
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
            <DoneIcon className="border rounded bg-green color-white fs-18 me-1 cursor-pointer" />
            <ClearIcon className="border rounded bg-red color-white fs-18 me-1 cursor-pointer mx-2" />
            <CustomIcon
              type="view"
              className="fs-18 mx-2"
              onIconClick={() => setViewModalopen(true)}
            />
            <MenuOption
              options={["Edit", "Delete"]}
              IconclassName="fs-5 cursor-pointer"
              getSelectedItem={(ele) => {
                if (ele === "Edit") {
                  setOpenEditModal(true);
                }
              }}
            />
          </Box>
        ),
      });
    });

    return result;
  };
  const getTableData = async (page = pageNumber) => {
    const { data } = await getMarketingToolsBasedonMarketinType(
      page,
      "SCRATCH_CARD"
    );
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
          showDateFilter={false}
          showSearchFilter={false}
          showSearchbar={false}
          tableRows={[...tableRows]}
          tHeadBgColor="bg-tableGray"
          table_heading="Scratch Card"
          showCheckbox={false}
          handlePageEnd={(searchText, searchFilter, page = pageNumber) => {
            getTableData(page);
          }}
        />
      </Box>
      <ViewMarketingtools
        modalOpen={viewModalOpen}
        modalClose={setViewModalopen}
        title="View Scratch Card"
      />
      <EditMarketingTools
        modalOpen={openEditModal}
        modalClose={setOpenEditModal}
        title="Edit Scratch Card"
        editorPlaceHolder="Description for the Discount Products..."
      />
    </Paper>
  );
};

export default ScratchCard;
