/* eslint-disable no-use-before-define */
import { Paper } from "@mui/material";
import { useEffect, useState } from "react";
import Image from "next/image";
import CustomIcon from "services/iconUtils";
import toastify from "services/utils/toastUtils";
import {
  // dateFilterTableData,
  deleteBanner,
  getAllData,
} from "services/supplier/banners";
import { format } from "date-fns";
import { useUserInfo } from "services/hooks";
import TableComponent from "@/atoms/TableComponent";
import CreateBanner from "@/forms/supplier/banners/CreateBanners";
import ViewBannerModal from "@/forms/supplier/banners/viewbannerModal";

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
  const userInfo = useUserInfo();

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
  });
  const [showCreateBanner, setShowCreateBanner] = useState(false);
  const [tableRows, setTableRows] = useState([]);
  const [saveBtnName, setSaveBtnName] = useState("save");
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewData, setViewData] = useState([]);

  const getAllTableData = async () => {
    const { data, err } = await getAllData(userInfo.id);
    const finalData = [];
    if (data) {
      data.forEach((item, index) => {
        finalData.push({
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
          col5: item.navigationUrl ? item.navigationUrl : "--------",
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
                  handleDeleteClick(item);
                }}
              />
            </div>
          ),
        });
      });
      setTableRows(finalData);
    }
    if (err) {
      console.log(err, "err");
      setTableRows([]);
      toastify(err.response.data.message, "error");
    }
  };
  const handleViewClick = (item) => {
    if (item) {
      setViewData(item);
      setViewModalOpen(true);
    }
  };
  // const getDateFilterTableData = async () => {
  //   const { data, err } = await dateFilterTableData();
  //   const finalData = [];
  //   if (data) {
  //     data.forEach((item, index) => {
  //       finalData.push({
  //         id: index + 1,
  //         col1: index + 1,
  //         col2: item.bannerImageUrlForWeb ? (
  //           <Image
  //             src={item.bannerImageUrlForWeb}
  //             height={100}
  //             width={100}
  //             alt="No Image"
  //           />
  //         ) : (
  //           "--"
  //         ),
  //         col3: item.panelName,
  //         col4: item.displayPage ? item.displayPage : "--",
  //         col5: item.navigationUrl ? item.navigationUrl : "--------",
  //         col6: item.buttonName ? item.buttonName : "--",
  //         col7: item.createdAt
  //           ? new Date(item.createdAt).toLocaleString()
  //           : "--",
  //         col8: item.startDateTime ? item.startDateTime : "--",
  //         col9: item.endDateTime ? item.endDateTime : "--",
  //         col10: item.status,
  //         col11: (
  //           <div className="d-flex justify-content-center align-items-center">
  //             <CustomIcon
  //               className="fs-5"
  //               type="view"
  //               title="View"
  //               onIconClick={() => {
  //                 //   setshowViewModal(true);
  //               }}
  //             />
  //             <CustomIcon
  //               title="Edit"
  //               type="edit"
  //               onIconClick={() => {
  //                 //   setShowUploadModal(true);
  //                 handleEditClick(item);
  //               }}
  //               className="fs-5 mx-2"
  //             />
  //             <CustomIcon
  //               type="delete"
  //               className=" fs-5"
  //               title="Delete"
  //               onIconClick={() => {
  //                 handleDeleteClick(item);
  //               }}
  //             />
  //           </div>
  //         ),
  //       });
  //     });
  //     setTableRows([...finalData]);
  //   } else if (err) {
  //     setTableRows([]);
  //     toastify(err.response.data.message, "error");
  //   }
  // };
  const handleDeleteClick = async (selectdata) => {
    if (selectdata) {
      const { data, err } = await deleteBanner(selectdata.bannerId);
      if (data?.data) {
        console.log(data);
        // getDateFilterTableData();
        toastify(data.message, "success");
        getAllTableData();
      } else if (err) {
        toastify(err.response.data.message, "error");
      }
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
      });
      setSaveBtnName("edit");
      setShowCreateBanner(true);
    }
  };

  useEffect(() => {
    // dateFillter API Call
    // getDateFilterTableData();
    getAllTableData();
  }, []);

  return (
    <Paper className="mxh-80vh mnh-80vh overflow-auto hide-scrollbar py-2">
      <TableComponent
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
      />
      <CreateBanner
        showModal={showCreateBanner}
        setShowModal={setShowCreateBanner}
        setFormData={setFormData}
        formData={formData}
        // getDateFilterTableData={getDateFilterTableData}
        saveBtnName={saveBtnName}
        getAllTableData={getAllTableData}
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
