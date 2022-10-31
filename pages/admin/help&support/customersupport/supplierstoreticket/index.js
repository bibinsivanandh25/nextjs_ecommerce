/* eslint-disable consistent-return */
import { Box, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomIcon from "services/iconUtils";
import TableComponent from "@/atoms/TableComponent";
import MenuOption from "@/atoms/MenuOptions";
import CreateTicket from "@/forms/admin/help&support/customersupport/CreateTicket";
import {
  getAllFilterDataByUserType,
  getAllTicketsBasedOnUserType,
} from "services/admin/help&support";

const CustomerSupport = () => {
  const [tableRows, setTableRows] = useState([]);
  const [showCreateTicketComponent, setShowCreateTicketComponent] =
    useState(false);
  const [pageNumber, setpageNumber] = useState(0);
  const [filterData, setFilterData] = useState([]);

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
      label: "User From ID / Name",
      data_align: "center",
    },
    {
      id: "col4",
      align: "center",
      label: "User To ID",
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

  const getFilterValue = async () => {
    const { data } = await getAllFilterDataByUserType("CUSTOMER");
    const result = [];
    if (data) {
      data.forEach((ele) => {
        result.push({
          name: ele.filterName,
          value: ele.filterValue,
        });
      });
    }
    setFilterData([...result]);
  };

  useEffect(() => {
    getFilterValue();
  }, []);

  const onClickOfMenuItem = () => {};

  const theTaleRowsData = (data) => {
    const anArray = [];
    data.forEach((val, index) => {
      anArray.push({
        id: val.ticketId,
        col1: index + 1,
        col2: val.ticketId,
        col3: `${val.userFromId} / ${val.userFromName}`,
        col4: val.userToId,
        col5: val.issueType.replaceAll("_", " "),
        col6: val.orderId,
        col7: val.issueSubject,
        col8: "--",
        col9: "--",
        col10: `${val.createdDate.split("T")[0]} ${
          val.createdDate.split("T")[1]
        }`,
        col11: `${val.lastModifiedDate.split("T")[0]} ${
          val.lastModifiedDate.split("T")[1]
        }`,
        col12: val.ticketStatus,
        col13: (
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
  const getTabledata = async (page, filters = []) => {
    const payload = {
      ticketId: [],
      ticketStatus: [],
      issueType: [],
      userType: "CUSTOMER_STORE",
    };
    filters.forEach((ele) => {
      Object.entries(ele).forEach(([key, value]) => {
        payload[key] = value;
      });
    });

    const { data } = await getAllTicketsBasedOnUserType(page, payload);
    if (data) {
      if (page === 0) {
        setTableRows(theTaleRowsData(data));
        setpageNumber((pre) => pre + 1);
      } else {
        setTableRows((pre) => [...pre, ...theTaleRowsData(data)]);
        setpageNumber((pre) => pre + 1);
      }
    } else {
      setTableRows([]);
    }
  };

  useEffect(() => {
    getTabledata(0);
  }, []);

  // useEffect(() => {
  //   theTaleRowsData();
  // }, []);

  const getFilteredValues = (val) => {
    if (val.length) {
      const result = [];
      val.forEach((item) => {
        if (item.name === "status") {
          result.push({
            ticketStatus: item.value
              // eslint-disable-next-line array-callback-return
              .map((ele) => {
                if (ele.isSelected) return ele.item;
              })
              .filter((ele) => !!ele),
          });
        }
        if (item.name === "issue type") {
          result.push({
            issueType: item.value
              // eslint-disable-next-line array-callback-return
              .map((ele) => {
                if (ele.isSelected) return ele.item;
              })
              .filter((ele) => !!ele),
          });
        }
        if (item.name === "ticket id") {
          result.push({
            ticketId: item.value
              // eslint-disable-next-line array-callback-return
              .map((ele) => {
                if (ele.isSelected) return ele.item;
              })
              .filter((ele) => !!ele),
          });
        }
      });
      getTabledata(0, result);
    }
  };
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
                // showPagination={false}
                tableRows={tableRows}
                table_heading="Customer Support"
                // showSearchbar={false}
                showDateFilterBtn
                showDateFilter
                dateFilterBtnName="Create Ticket"
                dateFilterBtnClick={() => {
                  setShowCreateTicketComponent(true);
                }}
                filterData={filterData}
                handlePageEnd={(searchText, filterText, page = pageNumber) => {
                  getTabledata(page);
                }}
                getFilteredValues={(val) => getFilteredValues(val)}
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
