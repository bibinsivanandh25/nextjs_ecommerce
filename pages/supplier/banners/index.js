import { Paper } from "@mui/material";
import { useState } from "react";
import CustomIcon from "services/iconUtils";
import TableComponent from "@/atoms/TableComponent";
import CreateBanner from "@/forms/supplier/banners/CreateBanners";

const Banners = () => {
  const [showCreateBanner, setShowCreateBanner] = useState(false);
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
  const rows = [
    {
      id: "1",
      col1: "01",
      col2: "577245",
      col3: "---",
      col4: "---",
      col5: "--",
      col6: "--",
      col7: "--",
      col8: "--",
      col9: "--",
      col10: "--",
      col11: (
        <div className="d-flex justify-content-center align-items-center">
          <CustomIcon
            className="fs-5"
            type="view"
            title="View"
            onIconClick={() => {
              //   setshowViewModal(true);
            }}
          />
          <CustomIcon
            title="Edit"
            type="edit"
            onIconClick={() => {
              //   setShowUploadModal(true);
            }}
            className="fs-5 mx-2"
          />
          <CustomIcon type="delete" className=" fs-5" title="Delete" />
        </div>
      ),
    },
    {
      id: "2",
      col1: "01",
      col2: "577245",
      col3: "---",
      col4: "---",
      col5: "--",
      col6: "--",
      col7: "--",
      col8: "--",
      col9: "--",
      col10: "--",
      col11: (
        <div className="d-flex justify-content-center align-items-center">
          <CustomIcon
            className="fs-5"
            type="view"
            title="View"
            onIconClick={() => {
              //   setshowViewModal(true);
            }}
          />
          <CustomIcon
            title="Edit"
            type="edit"
            onIconClick={() => {
              //   setShowUploadModal(true);
            }}
            className="fs-5 mx-2"
          />
          <CustomIcon type="delete" className=" fs-5" title="Delete" />
        </div>
      ),
    },
  ];

  return (
    <Paper className="mxh-80vh mnh-80vh overflow-auto hide-scrollbar py-2">
      <TableComponent
        tableRows={[...rows]}
        columns={[...columns]}
        showDateFilter
        showDateFilterBtn
        dateFilterBtnName="Create Banners"
        table_heading="Banners"
        dateFilterBtnClick={() => {
          setShowCreateBanner(true);
        }}
      />
      <CreateBanner
        showModal={showCreateBanner}
        setShowModal={setShowCreateBanner}
      />
    </Paper>
  );
};
export default Banners;
