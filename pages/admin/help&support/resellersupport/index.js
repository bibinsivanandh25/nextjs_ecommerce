/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import { Box, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomIcon from "services/iconUtils";
import TableComponent from "@/atoms/TableComponent";
import MenuOption from "@/atoms/MenuOptions";
import {
  getAllTicketsBasedOnUserType,
  getAllFilterDataByUserType,
} from "services/admin/help&support";
import CreateTicket from "@/forms/admin/help&support/resellersupport/CreateTicket";

const ResellerSupport = () => {
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
      align: "User To ID / Name",
      label: "Issue Type",
      data_align: "center",
    },
    {
      id: "col5",
      align: "center",
      label: "Issue Type",
      data_align: "center",
    },
    {
      id: "col6",
      align: "center",
      label: "Order ID",
      data_align: "center",
    },
    {
      id: "col7",
      align: "center",
      label: "Subject",
      data_align: "center",
    },
    {
      id: "col8",
      align: "center",
      label: "Comments",
      data_align: "center",
    },
    // {
    //   id: "col9",
    //   align: "center",
    //   label: "Attachments",
    //   data_align: "center",
    // },
    {
      id: "col10",
      align: "center",
      label: "Created Date And Time",
      data_align: "center",
    },
    {
      id: "col11",
      align: "center",
      label: "Last Update Date and Time (Reseller/MrMrsCart)",
      data_align: "center",
    },
    {
      id: "col12",
      align: "center",
      label: "Status",
      data_align: "center",
    },
    {
      id: "col13",
      align: "center",
      label: "Action",
      data_align: "center",
    },
  ];
  const getFilterValue = async () => {
    const { data } = await getAllFilterDataByUserType("RESELLER");
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

  const mapRowsToTable = (data) => {
    const result = [];
    if (data) {
      data.forEach((ele, ind) => {
        result.push({
          id: ele.ticketId,
          col1: ind + 1,
          col2: ele.ticketId,
          col3: `${ele.userFromId} / ${ele.userFromName}`,
          col4: `${ele.userToId} -  ${ele.userToName}`,
          col5: ele.issueType.replaceAll("_", " "),
          col6: ele.orderId,
          col7: ele.issueSubject,
          col8: "--",
          // col9: "--",
          col10: `${ele.createdDate.split("T")[0]} ${
            ele.createdDate.split("T")[1]
          }`,
          col11: `${ele.lastModifiedDate.split("T")[0]} ${
            ele.lastModifiedDate.split("T")[1]
          }`,
          col12: ele.ticketStatus,
          col13: (
            <Box className="d-flex justify-content-evenly align-items-center">
              <CustomIcon
                title="View and Reply"
                type="view"
                className="fs-18"
                //   onIconClick={() => setShowViewProducts(true)}
              />
              <MenuOption
                getSelectedItem={(item) => {
                  onClickOfMenuItem(item);
                }}
                options={options}
                IconclassName="fs-18 color-gray"
              />
            </Box>
          ),
        });
      });
    }
    return result;
  };
  const getTabledata = async (page, filters = []) => {
    const payload = {
      ticketId: [],
      ticketStatus: [],
      issueType: [],
      userType: "RESELLER",
    };
    filters.forEach((ele) => {
      Object.entries(ele).forEach(([key, value]) => {
        payload[key] = value;
      });
    });

    const { data } = await getAllTicketsBasedOnUserType(page, payload);
    if (data) {
      if (page === 0) {
        setTableRows(mapRowsToTable(data));
        setpageNumber((pre) => pre + 1);
      } else {
        setTableRows((pre) => [...pre, ...mapRowsToTable(data)]);
        setpageNumber((pre) => pre + 1);
      }
    } else {
      setTableRows([]);
    }
  };

  useEffect(() => {
    getTabledata(0);
  }, []);
  const getFilteredValues = (val) => {
    if (val.length) {
      const result = [];
      val.forEach((item) => {
        if (item.name === "status") {
          result.push({
            ticketStatus: item.value
              .map((ele) => {
                if (ele.isSelected) return ele.item;
              })
              .filter((ele) => !!ele),
          });
        }
        if (item.name === "issue type") {
          result.push({
            issueType: item.value
              .map((ele) => {
                if (ele.isSelected) return ele.item;
              })
              .filter((ele) => !!ele),
          });
        }
        if (item.name === "ticket id") {
          result.push({
            ticketId: item.value
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
            sx={{ height: "85vh" }}
            className="overflow-auto hide-scrollbar"
          >
            <Box className="px-1 pt-2">
              <TableComponent
                columns={tableColumns}
                tHeadBgColor="bg-light-gray"
                tableRows={tableRows}
                table_heading="Reseller Support"
                showSearchFilter={false}
                showSearchbar={false}
                showCustomButton
                customButtonLabel="Create Ticket"
                showFilterButton
                filterData={filterData}
                showDateFilterSearch={false}
                dateFilterBtnClick={() => {
                  setShowCreateTicketComponent(true);
                }}
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

export default ResellerSupport;
