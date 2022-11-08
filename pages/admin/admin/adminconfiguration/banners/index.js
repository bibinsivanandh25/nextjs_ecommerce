/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
import { Box, Paper, Typography } from "@mui/material";
import Image from "next/image";
import MenuOption from "@/atoms/MenuOptions";
import SwitchComponent from "@/atoms/SwitchComponent";
import TableComponent from "@/atoms/TableComponent";
import { useState, useEffect } from "react";
import {
  adminBannerDisable,
  adminDeleteBanner,
  getAdminBanners,
} from "services/admin/banners";
import { useSelector } from "react-redux";
import CreateBanner from "@/forms/admin/banners/createbanners";
import toastify from "services/utils/toastUtils";
import { format } from "date-fns";
import ViewBannerModal from "@/forms/admin/banners/viewbanners";

const columns = [
  {
    id: "col1",
    align: "center",
    label: "Banner Image",
    data_align: "center",
  },
  {
    id: "col2",
    align: "center",
    label: "Customer or Reseller panel",
    data_align: "center",
  },
  {
    id: "col3",
    align: "center",
    label: "Display Page",
    data_align: "center",
  },
  {
    id: "col4",
    align: "center",
    label: "Navigation page URL",
    data_align: "center",
  },
  {
    id: "col5",
    align: "center",
    label: "Button",
    data_align: "center",
  },
  {
    id: "col6",
    align: "center",
    label: "Created By",
    data_align: "center",
  },
  {
    id: "col7",
    align: "center",
    label: "Created Date & Time",
    data_align: "center",
  },
  {
    id: "col8",
    align: "center",
    label: "Start Date & Time",
    data_align: "center",
  },
  {
    id: "col9",
    align: "center",
    label: "End Date & Time",
    data_align: "center",
  },
  {
    id: "col10",
    align: "center",
    label: "Status",
    data_align: "center",
  },
  {
    id: "col11",
    align: "center",
    label: "Action",
    data_align: "center",
  },
];
const Banners = () => {
  const user = useSelector((state) => state.user);
  const [rows, setRows] = useState([]);
  const [formData, setFormData] = useState({
    bannerId: "",
    url: "",
    displayPage: null,
    buttonlable: null,
    startdate: "",
    enddate: "",
    starttime: "",
    endtime: "",
    mobileimage: "",
    webimage: "",
    panelname: null,
  });
  const [showCreateBanner, setShowCreateBanner] = useState(false);
  const [saveBtnName, setSaveBtnName] = useState("save");
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewData, setViewData] = useState([]);
  const [pageNumber, setpageNumber] = useState(0);
  const [tableDate, setTableDate] = useState({ fromDate: "", toDate: "" });
  const getAllBanners = async (fromdate = "", endDate = "", page) => {
    const payload = {
      createdById: user.userId,
      fromDate: fromdate,
      toDate: endDate,
      pageNumber: page,
      pageSize: 50,
    };
    const { data, err } = await getAdminBanners(payload);
    if (data?.length) {
      if (page == 0) {
        setRows(getTableRows(data, fromdate, endDate));
        setpageNumber(1);
      } else {
        setpageNumber((pre) => pre + 1);
        setRows((pre) => [...pre, ...getTableRows(data, fromdate, endDate)]);
      }
    } else if (page === 0 && fromdate && endDate) {
      setRows([]);
    } else {
      setpageNumber((pre) => pre);
    }
    if (err) {
      setRows([]);
    }
  };
  const handleEditClick = (selectedData) => {
    if (selectedData) {
      const startDate = new Date(selectedData.startDateTime);
      const endDate = new Date(selectedData.endDateTime);
      const startHr = new Date(selectedData.startDateTime).getHours();
      const startMin = new Date(selectedData.startDateTime).getMinutes();
      const endHr = new Date(selectedData.endDateTime).getHours();
      const endMin = new Date(selectedData.endDateTime).getMinutes();
      setFormData({
        bannerId: selectedData.bannerId,
        url: selectedData.navigationUrl,
        displayPage: {
          id: selectedData.displayPage,
          label: selectedData.displayPage,
        },
        buttonlable: {
          id: selectedData.buttonName,
          label: selectedData.buttonName,
        },
        startdate: format(startDate, "yyyy-MM-dd"),
        enddate: format(endDate, "yyyy-MM-dd"),
        starttime: `${startHr <= 9 ? `0${startHr}` : `${startHr}`}:${
          startMin <= 9 ? `0${startMin}` : `${startMin}`
        }`,
        endtime: `${endHr <= 9 ? `0${endHr}` : `${endHr}`}:${
          endMin <= 9 ? `0${endMin}` : `${endMin}`
        }`,
        mobileimage: selectedData.bannerImageUrlForMobile,
        webimage: selectedData.bannerImageUrlForWeb,
        panelname: {
          id: selectedData.panelName,
          label: selectedData.panelName,
        },
      });
      setSaveBtnName("edit");
      setShowCreateBanner(true);
    }
  };
  useEffect(() => {
    getAllBanners("", "", 0);
  }, []);
  const getTableRows = (data, fromdate, endDate) => {
    const result = [];
    if (data) {
      data.forEach((item, index) => {
        result.push({
          id: index + 1,
          col1: item.bannerImageUrlForWeb ? (
            <Image
              src={item.bannerImageUrlForWeb}
              height={50}
              width={50}
              alt="Image"
            />
          ) : null,
          col2: item.panelName,
          col3: item.displayPage,
          // col4: item.navigationUrl,
          col4: item.navigationUrl ? (
            <a href={item.navigationUrl} target="_blank" rel="noreferrer">
              {item.navigationUrl}
            </a>
          ) : (
            "--------"
          ),
          col5: item.buttonName,
          col6: item.createdBy,
          col7: new Date(item.createdDate).toLocaleString(),
          col8: new Date(item.startDateTime).toLocaleString(),
          col9: new Date(item.endDateTime).toLocaleString(),
          col10: item.status,
          col11: (
            <Box className="d-flex align-items-center justify-content-around">
              <Box className="d-flex flex-column align-items-center">
                <Box className="ms-4">
                  <SwitchComponent
                    defaultChecked={!item.disable}
                    label=""
                    ontoggle={(val) => {
                      handleSwitchClick(val, item, fromdate, endDate);
                    }}
                  />
                </Box>
              </Box>
              <MenuOption
                getSelectedItem={(ele) => {
                  switch (ele) {
                    case "Delete":
                      handleDeleteClick(item, fromdate, endDate);
                      break;
                    case "Edit":
                      handleEditClick(item);
                      break;
                    case "View":
                      handleViewClick(item);
                      break;
                    default:
                      break;
                  }
                }}
                options={["View", "Edit", "Delete"]}
                IconclassName="color-gray"
              />
            </Box>
          ),
        });
      });
    }
    return result;
  };
  const handleSwitchClick = async (value, item, fromdate, endDate) => {
    const { data, err } = await adminBannerDisable(item.bannerId, !value);
    if (data) {
      toastify(data.message, "success");
      getAllBanners(fromdate, endDate, 0);
    }
    if (err) {
      toastify(err.response.data.message, "error");
    }
  };
  const handleViewClick = (item) => {
    if (item) {
      setViewData(item);
      setViewModalOpen(true);
    }
  };
  const handleDeleteClick = async (selectdata, fromdate, endDate) => {
    if (selectdata) {
      const { data, err } = await adminDeleteBanner(selectdata.bannerId);
      if (data?.data) {
        toastify(data.message, "success");
        setpageNumber(0);
        getAllBanners(fromdate, endDate, 0);
      } else if (err) {
        toastify(err.response.data.message, "error");
      }
    }
  };

  return (
    <Paper className="p-3 mnh-85vh mxh-85vh overflow-auto hide-scrollbar">
      <TableComponent
        columns={columns}
        tHeadBgColor="bg-light-gray"
        tableRows={rows}
        table_heading="Banners"
        showDateFilter
        showDateFilterBtn
        dateFilterBtnName="Create Banners"
        showSearchbar={false}
        showDateFilterSearch={false}
        dateFilterBtnClick={() => {
          setShowCreateBanner(true);
          setSaveBtnName("save");
        }}
        handlePageEnd={(
          searchText = "",
          filterText = "ALL",
          page = pageNumber,
          filteredDates
        ) => {
          getAllBanners(
            filteredDates?.fromDate ? filteredDates?.fromDate : "",
            filteredDates?.toDate ? filteredDates?.toDate : "",
            page
          );
          setTableDate({
            fromDate: filteredDates?.fromDate ? filteredDates?.fromDate : "",
            toDate: filteredDates?.toDate ? filteredDates?.toDate : "",
          });
        }}
        handleRowsPerPageChange={() => {
          setpageNumber(0);
        }}
        showCheckbox={false}
      />
      <CreateBanner
        showModal={showCreateBanner}
        setShowModal={setShowCreateBanner}
        setFormData={setFormData}
        formData={formData}
        saveBtnName={saveBtnName}
        getAllTableData={getAllBanners}
        userInfo={user}
        setpageNumber={setpageNumber}
        tableDate={tableDate}
      />
      {viewModalOpen && (
        <ViewBannerModal
          viewModalOpen={viewModalOpen}
          setViewModalOpen={setViewModalOpen}
          viewData={viewData}
        />
      )}
    </Paper>
  );
};

export default Banners;
