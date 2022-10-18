import TableComponent from "@/atoms/TableComponent";
import ViewModal from "@/forms/admin/admin/adminconfiguration/supplierstoresettings/ViewModal";
import { Box, Paper } from "@mui/material";
import React, { useState } from "react";
import CustomIcon from "services/iconUtils";

const SupplierStoreSettings = () => {
  const [openViewModal, setOpenViewModal] = useState(false);
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
      label: "Configuration Name",
      data_align: "center",
    },
    {
      id: "col3",
      align: "center",
      label: "Configuration Value",
      data_align: "center",
    },
    {
      id: "col4",
      align: "center",
      label: "Updated date & time",
      data_align: "center",
    },
    {
      id: "col5",
      align: "center",
      label: "Action",
      data_align: "center",
    },
  ];

  const rows = [
    {
      col1: "01",
      col2: "FREE ORDERS COUNT",
      col3: 50,
      col4: "--",
      col5: <CustomIcon type="edit" />,
    },
  ];

  return (
    <>
      <Box>
        <Paper className="overflow-auto hide-scrollbar pt-2 mnh-80vh mxh-80vh">
          <TableComponent
            columns={columns}
            table_heading="Admin Configuration"
            tHeadBgColor="bg-light-gray"
            showPagination
            tableRows={rows}
            showCustomButton
            customButtonLabel="Create"
            showSearchbar={false}
            showSearchFilter={false}
            onCustomButtonClick={() => {
              setOpenViewModal(true);
            }}
          />
        </Paper>
      </Box>
      <ViewModal
        openViewModal={openViewModal}
        setOpenViewModal={setOpenViewModal}
      />
    </>
  );
};

export default SupplierStoreSettings;
