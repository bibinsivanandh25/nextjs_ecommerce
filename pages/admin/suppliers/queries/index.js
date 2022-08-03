import { Box, Paper } from "@mui/material";
import React, { useState } from "react";
import CustomIcon from "services/iconUtils";
import TableComponent from "@/atoms/TableComponent";
import MenuOption from "@/atoms/MenuOptions";
import ReplyQueries from "@/forms/admin/suppliers/queries/replyqueries";
import RaiseQuery from "@/forms/admin/suppliers/queries/raisequery";
import ViewModalQueries from "@/forms/admin/suppliers/queries/viewquerymodal";

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
    label: "Supplier ID",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col3",
    label: "Status",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col4",
    label: "Queries",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col5",
    label: "Answers",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col6",
    label: "Created Date & Time",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col7",
    label: "Updated Date & Time",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col8",
    label: "Actions",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
];

const Queries = () => {
  const [queryModalOpen, setQueryModalOpen] = useState(false);
  const [replyModalOpen, setReplyModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  const rows = [
    {
      id: "col1",
      col1: 1,
      col2: "VRL Transport",
      col3: "Action",
      col4: "There some product",
      col5: "--",
      col6: "--",
      col7: "--",
      col8: (
        <Box>
          <CustomIcon
            type="view"
            className="fs-18 me-1"
            title="View"
            onIconClick={() => {
              setViewModalOpen(true);
            }}
          />
          <MenuOption
            options={[
              "Edit",
              "Raise a query",
              "Reply",
              "Delete",
              "Supplier Shopping Page",
            ]}
            IconclassName="fs-5 cursor-pointer"
            getSelectedItem={(ele) => {
              if (ele === "Raise a query") setQueryModalOpen(true);
              if (ele === "Reply") setReplyModalOpen(true);
            }}
          />
        </Box>
      ),
    },
  ];
  return (
    <Box>
      <Paper
        className="mnh-85vh mxh-85vh overflow-auto hide-scrollbar"
        elevation={3}
      >
        {!viewModalOpen ? (
          <Box className="mt-2">
            <TableComponent
              showDateFilter
              tHeadBgColor="bg-tableGray"
              table_heading="Queries"
              columns={[...tableColumn]}
              tableRows={[...rows]}
            />
          </Box>
        ) : (
          <ViewModalQueries setViewModalOpen={setViewModalOpen} />
        )}
      </Paper>
      {queryModalOpen && (
        <RaiseQuery
          queryModalOpen={queryModalOpen}
          setQueryModalOpen={setQueryModalOpen}
        />
      )}
      {replyModalOpen && (
        <ReplyQueries
          replyModalOpen={replyModalOpen}
          setReplyModalOpen={setReplyModalOpen}
        />
      )}
    </Box>
  );
};

export default Queries;
