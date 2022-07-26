import { Typography } from "@mui/material";
import CustomIcon from "services/iconUtils";
import { useState } from "react";
import TableComponent from "@/atoms/TableComponent";
import MenuOption from "@/atoms/MenuOptions";
import SwitchComponent from "@/atoms/SwitchComponent";
import ViewActiveResellers from "@/forms/admin/Resellers/ViewActiveResellers";

const ActiveResellers = () => {
  const [showActiveResellerView, setShowActiveResellerView] = useState(false);
  const columns = [
    {
      id: "col1", //  id value in column should be presented in row as key
      label: "Sl.No",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      position: "sticky",
    },
    {
      id: "col2",
      label: "Reseller ID / Store Code",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      position: "sticky",
    },
    {
      id: "col3",
      label: "Full Name/ Gender",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col4",
      label: "Email ID / Mobile",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col5",
      label: "Active Marketing Tools",
      minWidth: 150,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col6",
      label: "Subscription Period with Date & time / Days Counter",
      minWidth: 150,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col7",
      label: "Total Referrals / customers",
      minWidth: 150,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col8",
      label: "Total Orders",
      minWidth: 150,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col9",
      label: "Commission earned through sales",
      minWidth: 150,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col10",
      label: "Total Amount Paid",
      minWidth: 150,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col11",
      label: "Reseller Profit = Referral Sales Commission + Sales Commission",
      minWidth: 150,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col12",
      label: "Registered Date & Time",
      minWidth: 150,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col13",
      label: "Actions",
      minWidth: 150,
      align: "center",
      data_align: "center",
      data_classname: "",
      position: "sticky",
      // data_style: { paddingLeft: "7%" },
    },
  ];
  const rows = [
    {
      id: "1",
      col1: "1",
      col2: "Active",
      col3: "1",
      col13: (
        <div className="d-flex justify-content-center align-items-center ">
          <CustomIcon
            type="view"
            title="view"
            onIconClick={() => setShowActiveResellerView(true)}
          />
          <MenuOption
            options={[
              "Edit",
              "Delete",
              <>
                <div className="d-flex align-items-center">
                  <Typography>Deactivate</Typography>
                  <div className="ms-3">
                    <SwitchComponent label="" />
                  </div>
                </div>
              </>,
              "Raise Query",
              "Add Note",
              "Reseller Shopping Page",
            ]}
          />
        </div>
      ),
    },
    {
      id: "2",
      col1: "2",
      col2: "InActive",
      col3: "2",
      col13: (
        <div className="d-flex justify-content-center align-items-center ">
          <CustomIcon
            type="view"
            title="view"
            onIconClick={() => setShowActiveResellerView(true)}
          />
          <MenuOption
            options={[
              "Edit",
              "Delete",
              <>
                <div className="d-flex align-items-center">
                  <Typography>Deactivate</Typography>
                  <div className="ms-3">
                    <SwitchComponent label="" />
                  </div>
                </div>
              </>,
              "Raise Query",
              "Add Note",
              "Reseller Shopping Page",
            ]}
          />
        </div>
      ),
    },
  ];
  return (
    <div>
      {!showActiveResellerView ? (
        <TableComponent
          table_heading="Active Resellers"
          showDateFilter
          stickyCheckBox
          stickyHeader
          tableRows={[...rows]}
          columns={[...columns]}
          tHeadBgColor="bg-gray-1"
        />
      ) : (
        <ViewActiveResellers
          setShowActiveResellerView={setShowActiveResellerView}
        />
      )}
    </div>
  );
};
export default ActiveResellers;
