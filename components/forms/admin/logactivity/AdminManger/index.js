import { Box, Paper } from "@mui/material";
import React from "react";
import CustomIcon from "services/iconUtils";
import TableComponent from "@/atoms/TableComponent";

const AdminManager = () => {
  const columns = [
    {
      id: "col1",
      align: "center",
      label: "S.No.",
      data_align: "center",
    },
    {
      id: "col2",
      align: "center",
      label: "Action Taken By",
      data_align: "center",
    },
    {
      id: "col3",
      align: "center",
      label: "Admin/User ID",
      data_align: "center",
    },
    { id: "col4", align: "center", label: "Where", data_align: "center" },
    {
      id: "col5",
      align: "center",
      label: "Activity",
      data_align: "center",
    },
    {
      id: "col6",
      align: "center",
      label: "Last Updated Date & Time",
      data_align: "center",
    },
    {
      id: "col7",
      align: "center",
      label: "Action",
      data_align: "center",
    },
  ];

  const tableRows = [
    {
      id: 1,
      col1: "01",
      col2: "Admin Manager",
      col3: "-----",
      col4: "Customer – Active Customers",
      col5: "Replied back to the queries",
      col6: "Active",
      col7: (
        <Box>
          <CustomIcon type="view" />
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <Paper
        sx={{ height: "68vh" }}
        className="p-3 overflow-auto hide-scrollbar"
      >
        <TableComponent
          columns={columns}
          tHeadBgColor="bg-light-gray"
          showPagination={false}
          tableRows={tableRows}
          showSearchFilter={false}
          showSearchbar={false}
        />
      </Paper>
    </Box>
  );
};

export default AdminManager;
