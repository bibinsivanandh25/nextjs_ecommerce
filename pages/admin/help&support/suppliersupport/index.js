/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable prettier/prettier */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import { Box, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomIcon from "services/iconUtils";
import TableComponent from "@/atoms/TableComponent";
import MenuOption from "@/atoms/MenuOptions";
import CreateTicket from "@/forms/admin/help&support/supplierSupport/CreateTicket";
import {
  getAllTicketsBasedOnUserType,
  getAllFilterDataByUserType,
  helpandSupportCloseTicket,
  helpandSupportDeleteTicket,
  helpandSupportGetTicketById,
} from "services/admin/help&support";
import { useSelector } from "react-redux";
import HelpandsupportView from "@/forms/admin/help&support/helpandsupportview";
import toastify from "services/utils/toastUtils";

const SupplierSupport = () => {
  const [tableRows, setTableRows] = useState([]);
  const [showCreateTicketComponent, setShowCreateTicketComponent] =
    useState(false);
  const [pageNumber, setpageNumber] = useState(0);
  const [filterData, setFilterData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [showModal, setShowModal] = useState({
    show: false,
    id: null,
    type: "",
  });
  const user = useSelector((state) => state.user);

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
      label: "User To ID / Name",
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
      label: "Last Update Date and Time (Supplier/MrMrsCart)",
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
    const { data } = await getAllFilterDataByUserType("SUPPLIER");
    const result = [];
    if (data) {
      data.forEach((ele) => {
        result.push({
          name: ele.filterName,
          value: ele.filterValue.map((i) => {
            return {
              item: i,
              isSelected: false,
            };
          }),
        });
      });
    }
    setFilterData([...result]);
  };

  useEffect(() => {
    getFilterValue();
  }, []);

  const handleDeleteTicket = async (item) => {
    if (item) {
      const { data, err } = await helpandSupportDeleteTicket(item.ticketId);
      if (data) {
        toastify(data.message, "success");
        setpageNumber(0);
        // eslint-disable-next-line no-use-before-define
        getTabledata(0);
      }
      if (err) {
        toastify(err.response.data.message, "error");
      }
    }
  };

  const handleCloseTicket = async (item) => {
    if (item) {
      const { data, err } = await helpandSupportCloseTicket(item.ticketId);
      if (data) {
        toastify(data.message, "success");
        setpageNumber(0);
        // eslint-disable-next-line no-use-before-define
        getTabledata(0);
      }
      if (err) {
        toastify(err.response.data.message, "error");
      }
    }
  };

  const onClickOfMenuItem = (item, ele) => {
    if (item === "Reply") {
      // eslint-disable-next-line no-use-before-define
      getTicketById(ele.ticketId);
    } else if (item === "Delete") {
      handleDeleteTicket(ele);
    } else {
      handleCloseTicket(ele);
    }
  };

  const getTicketById = async (ticketId) => {
    const { data } = await helpandSupportGetTicketById(ticketId);
    if (data?.data) {
      setSelectedData(data.data);
      setShowModal({
        show: true,
        type: "view",
      });
    }
  };

  const mapRowsToTable = (data) => {
    const result = [];
    if (data) {
      data.forEach((ele, ind) => {
        result.push({
          id: ele.ticketId,
          col1: ind + 1,
          col2: ele.ticketId,
          col3: `${ele.userFromId} / ${ele.userFromName}`,
          col4: `${ele.userToId} / ${ele.userToName}`,
          col5: ele.issueType.replaceAll("_", " "),
          col6: ele.orderId,
          col7: ele.issueSubject,
          col8: "--",
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
                type="view"
                title="View and Reply"
                className="fs-18"
                onIconClick={() => {
                  getTicketById(ele.ticketId);
                }}
              />
              <MenuOption
                getSelectedItem={(item) => {
                  onClickOfMenuItem(item, ele);
                }}
                options={
                  ele.ticketStatus === "CLOSED"
                    ? ["Delete"]
                    : ["Reply", "Delete", "Close"]
                }
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
      userType: "SUPPLIER",
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
        {showCreateTicketComponent ? (
          <CreateTicket
            setShowCreateTicketComponent={setShowCreateTicketComponent}
            getTabledata={getTabledata}
          />
        ) : showModal.show && showModal.type === "view" ? (
          <HelpandsupportView
            selectedData={selectedData}
            setShowModal={setShowModal}
            // selectTab={selectTab}
            user={user}
            // eslint-disable-next-line no-undef
            getTabledata={getTabledata}
          />
        ) : (
          <Paper
            sx={{ height: "85vh" }}
            className="overflow-auto hide-scrollbar"
          >
            <Box className="px-1 pt-2">
              <TableComponent
                columns={tableColumns}
                tHeadBgColor="bg-light-gray"
                headerClassName="color-orange"
                tableRows={tableRows}
                table_heading="Supplier Support"
                showSearchFilter={false}
                showSearchbar={false}
                showFilterList
                showCustomButton
                customButtonLabel="Create Ticket"
                showFilterButton
                filterData={filterData}
                showDateFilterSearch={false}
                onCustomButtonClick={() => {
                  setShowCreateTicketComponent(true);
                }}
                handlePageEnd={(searchText, filterText, page = pageNumber) => {
                  getTabledata(page);
                }}
                getFilteredValues={(val) => getFilteredValues(val)}
              />
            </Box>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

export default SupplierSupport;
