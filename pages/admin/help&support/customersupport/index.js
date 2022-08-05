import { Box, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomIcon from "services/iconUtils";
import TableComponent from "@/atoms/TableComponent";
import MenuOption from "@/atoms/MenuOptions";
import CreateTicket from "@/forms/admin/help&support/CreateTicket";

const CustomerSupport = () => {
  const [tableRows, setTableRows] = useState([]);
  const [showCreateTicketComponent, setShowCreateTicketComponent] =
    useState(false);

  const options = ["Reply", "Delete", "Close"];

  const tableColumns = [
    {
      id: "col1",
      align: "center",
      label: "S.No.",
      data_align: "center",
    },
    {
      id: "col2",
      align: "center",
      label: "Ticket ID",
      data_align: "center",
    },
    {
      id: "col3",
      align: "center",
      label: "Customer ID",
      data_align: "center",
    },
    {
      id: "col4",
      align: "center",
      label: "Issue Type",
      data_align: "center",
    },
    {
      id: "col5",
      align: "center",
      label: "Order ID",
      data_align: "center",
    },
    {
      id: "col6",
      align: "center",
      label: "Subject",
      data_align: "center",
    },
    {
      id: "col7",
      align: "center",
      label: "Comments",
      data_align: "center",
    },
    {
      id: "col8",
      align: "center",
      label: "Attachments",
      data_align: "center",
    },
    {
      id: "col9",
      align: "center",
      label: "Created Date And Time",
      data_align: "center",
    },
    {
      id: "col10",
      align: "center",
      label: "Last Update Date and Time (Customers/MrMrsCart)",
      data_align: "center",
    },
    {
      id: "col11",
      align: "center",
      label: "Status",
      data_align: "center",
    },
    {
      id: "col12",
      align: "center",
      label: "Action",
      data_align: "center",
    },
  ];

  const onClickOfMenuItem = () => {};

  const rowsDataObjectsForCustomers = [
    {
      id: 1,
      col1: "01",
      col2: "#938453 -Old",
      col3: "----------",
      col4: "----------",
      col5: "----------",
      col6: "----------",
      col7: "----------",
      col8: "----------",
      col9: "----------",
      col10: "----------",
      col11: "Opened",
      col12: "Action",
    },
  ];

  const theTaleRowsData = () => {
    const anArray = [];
    rowsDataObjectsForCustomers.forEach((val, index) => {
      anArray.push({
        id: index + 1,
        col1: val.col1,
        col2: val.col2,
        col3: val.col3,
        col4: val.col4,
        col5: val.col5,
        col6: val.col6,
        col7: val.col7,
        col8: val.col8,
        col9: val.col9,
        col10: val.col10,
        col11: val.col11,
        col12: (
          <Box className="d-flex justify-content-evenly align-items-center">
            <CustomIcon
              type="view"
              className="fs-18"
              //   onIconClick={() => setShowViewProducts(true)}
            />
            <MenuOption
              getSelectedItem={(ele) => {
                onClickOfMenuItem(ele, index);
              }}
              options={options}
              IconclassName="fs-18 color-gray"
            />
          </Box>
        ),
      });
    });
    setTableRows(anArray);
  };

  useEffect(() => {
    theTaleRowsData();
  }, []);

  return (
    <Box>
      <Box>
        {!showCreateTicketComponent ? (
          <Paper
            sx={{ height: "78vh" }}
            className="overflow-auto hide-scrollbar"
          >
            <Box className="px-1 pt-2">
              <TableComponent
                columns={tableColumns}
                tHeadBgColor="bg-light-gray"
                showPagination={false}
                tableRows={tableRows}
                table_heading="Customer Support"
                // showSearchbar={false}
                showDateFilterBtn
                showDateFilter
                dateFilterBtnName="Create Ticket"
                dateFilterBtnClick={() => {
                  setShowCreateTicketComponent(true);
                }}
              />
            </Box>
          </Paper>
        ) : (
          <CreateTicket
            setShowCreateTicketComponent={setShowCreateTicketComponent}
          />
        )}
      </Box>
    </Box>
  );
};

export default CustomerSupport;
