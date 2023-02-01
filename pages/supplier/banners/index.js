/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
import { Paper } from "@mui/material";
import { useEffect, useState } from "react";
import Image from "next/image";
import CustomIcon from "services/iconUtils";
import toastify from "services/utils/toastUtils";
import { deleteBanner, getAllData } from "services/supplier/banners";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import TableComponent from "@/atoms/TableComponent";
import CreateBanner from "@/forms/supplier/banners/CreateBanners";
import ViewBannerModal from "@/forms/supplier/banners/viewbannerModal";

const displayName = [
  { id: "Home", label: "Home" },
  { id: "SPIN_WHEEL", label: "Spin Wheel" },
  { id: "TODAYS_DEAL", label: "Todays Deal" },
  { id: "DISCOUNT_COUPON", label: "Discount Coupon" },
  { id: "QUIZ", label: "Quiz" },
  { id: "SCRATCH_CARD", label: "Scratch Card" },
];

const columns = [
  {
    id: "col1", //  id value in column should be presented in row as key
    label: "Sl.No",
    //   minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col2",
    label: "Banner Image",
    //   minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col3",
    label: "Customer Panel",
    //   minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
    // data_style: { paddingLeft: "7%" },
  },
  {
    id: "col4",
    label: "Display Page",
    //   minWidth: 50,
    align: "center",
    data_align: "center",
    data_classname: "",
    // data_style: { paddingLeft: "7%" },
  },
  {
    id: "col5",
    label: "Navigation Page URL",
    //   minWidth: 50,
    align: "center",
    data_align: "center",
    data_classname: "",
    // data_style: { paddingLeft: "7%" },
  },
  {
    id: "col6",
    label: "Button",
    //   minWidth: 50,
    align: "center",
    data_align: "center",
    data_classname: "",
    // data_style: { paddingLeft: "7%" },
  },
  {
    id: "col7",
    label: "Created Date & Time",
    //   minWidth: 50,
    align: "center",
    data_align: "center",
    data_classname: "",
    // data_style: { paddingLeft: "7%" },
  },
  {
    id: "col8",
    label: "Start Date & Time",
    //   minWidth: 50,
    align: "center",
    data_align: "center",
    data_classname: "",
    // data_style: { paddingLeft: "7%" },
  },
  {
    id: "col9",
    label: "End Date & Time",
    //   minWidth: 50,
    align: "center",
    data_align: "center",
    data_classname: "",
    // data_style: { paddingLeft: "7%" },
  },
  {
    id: "col10",
    label: "Status",
    //   minWidth: 50,
    align: "center",
    data_align: "center",
    data_classname: "",
    // data_style: { paddingLeft: "7%" },
  },
  {
    id: "col11",
    label: "Action",
    //   minWidth: 50,
    align: "center",
    data_align: "center",
    data_classname: "",
    // data_style: { paddingLeft: "7%" },
  },
];
const Banners = () => {
  const userInfo = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    bannerId: "",
    url: null,
    displayPage: null,
    buttonlable: null,
    startdate: "",
    enddate: "",
    starttime: "",
    endtime: "",
    mobileimage: "",
    webimage: "",
  });
  const [showCreateBanner, setShowCreateBanner] = useState(false);
  const [tableRows, setTableRows] = useState([]);
  const [saveBtnName, setSaveBtnName] = useState("save");
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewData, setViewData] = useState([]);
  const [pageNumber, setpageNumber] = useState(0);
  const [tableDate, setTableDate] = useState({ fromDate: "", toDate: "" });

  const mapRowsToTable = (data, fromdate, endDate) => {
    const temp = [];
    if (data) {
      data.forEach((item, index) => {
        temp.push({
          id: index + 1,
          col1: index + 1,
          col2: item.bannerImageUrlForWeb ? (
            <Image
              src={item.bannerImageUrlForWeb}
              height={70}
              width={70}
              alt="No Image"
            />
          ) : (
            "--"
          ),
          col3: item.panelName,
          col4: item.displayPage ? item.displayPage : "--",
          col5: item.navigationUrl ? (
            <a href={item.navigationUrl} target="_blank" rel="noreferrer">
              {item.navigationUrl}
            </a>
          ) : (
            "--------"
          ),
          col6: item.buttonName ? item.buttonName : "--",
          col7: item.createdAt
            ? new Date(item.createdAt).toLocaleString()
            : "--",
          col8: item.startDateTime
            ? new Date(item.startDateTime).toLocaleString()
            : "--",
          col9: item.endDateTime
            ? new Date(item.endDateTime).toLocaleString()
            : "--",
          col10: item.status,
          col11: (
            <div className="d-flex justify-content-center align-items-center">
              <CustomIcon
                className="fs-5"
                type="view"
                title="View"
                onIconClick={() => {
                  handleViewClick(item);
                }}
              />
              <CustomIcon
                title="Edit"
                type="edit"
                onIconClick={() => {
                  handleEditClick(item);
                }}
                className="fs-5 mx-2"
              />
              <CustomIcon
                type="delete"
                className=" fs-5"
                title="Delete"
                onIconClick={() => {
                  handleDeleteClick(item, fromdate, endDate);
                }}
              />
            </div>
          ),
        });
      });
    }
    return temp;
  };

  const getAllTableData = async (fromdate = "", endDate = "", page) => {
    const payload = {
      createdById: userInfo.supplierId,
      fromDate: fromdate,
      toDate: endDate,
      pageNumber: page,
      pageSize: 50,
    };
    const { data, err } = await getAllData(payload);
    if (data?.length) {
      if (page == 0) {
        setTableRows(mapRowsToTable(data, fromdate, endDate));
        setpageNumber((pre) => pre + 1);
      } else {
        setpageNumber((pre) => pre + 1);
        setTableRows((pre) => [
          ...pre,
          ...mapRowsToTable(data, fromdate, endDate),
        ]);
      }
    } else if (page === 0 && fromdate && endDate) {
      setTableRows([]);
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
      const { data, err } = await deleteBanner(selectdata.bannerId);
      if (data?.data) {
        toastify(data.message, "success");
        setpageNumber(0);
        getAllTableData(fromdate, endDate, 0);
      } else if (err) {
        toastify(err.response.data.message, "error");
      }
    }
  };
  const getDisplayPage = (val) => {
    const temp = displayName.filter((x) => x.label === val);
    return temp?.length ? temp[0] : { id: val, label: val };
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
        url: {
          id: selectedData.navigationUrl,
          label: selectedData.navigationUrl,
        },
        displayPage: getDisplayPage(selectedData.displayPage),
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
      });
      setSaveBtnName("edit");
      setShowCreateBanner(true);
    }
  };

  useEffect(() => {
    getAllTableData("", "", 0);
  }, []);

  return (
    <Paper className="mxh-82vh mnh-82vh overflow-auto hide-scrollbar pt-1">
      <TableComponent
        showCheckbox={false}
        tableRows={[...tableRows]}
        columns={[...columns]}
        showDateFilter
        showDateFilterBtn
        showDateFilterSearch={false}
        dateFilterBtnName="Create Banners"
        table_heading="Banners"
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
          getAllTableData(
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
      />
      <CreateBanner
        showModal={showCreateBanner}
        setShowModal={setShowCreateBanner}
        setFormData={setFormData}
        formData={formData}
        saveBtnName={saveBtnName}
        getAllTableData={getAllTableData}
        userInfo={userInfo}
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
