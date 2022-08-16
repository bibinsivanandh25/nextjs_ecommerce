import { Typography } from "@mui/material";
import CustomIcon from "services/iconUtils";
import TableComponent from "@/atoms/TableComponent";
import MenuOption from "@/atoms/MenuOptions";
import SwitchComponent from "@/atoms/SwitchComponent";

const DeactivatedandRejected = () => {
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
      label: "Referral Code / Total Referrals",
      minWidth: 150,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col6",
      label: "Total Commission Earned from Referral sales",
      minWidth: 150,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col7",
      label: "Total customers",
      minWidth: 150,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col8",
      label: "Commission Earned through Sales",
      minWidth: 150,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col9",
      label: "Total Amount Paid",
      minWidth: 150,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col10",
      label: "Reason for Deactivation",
      minWidth: 150,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col11",
      label: "Deactivated Date & Time",
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
          <CustomIcon type="view" title="view" />
          <MenuOption
            options={[
              "Edit",
              <>
                <div className="d-flex align-items-center">
                  <Typography>Activate</Typography>
                  <div className="ms-3">
                    <SwitchComponent label="" />
                  </div>
                </div>
              </>,
              "Remove",
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
          <CustomIcon type="view" title="view" />
          <MenuOption
            options={[
              "Edit",
              <>
                <div className="d-flex align-items-center">
                  <Typography>Activate</Typography>
                  <div className="ms-3">
                    <SwitchComponent label="" />
                  </div>
                </div>
              </>,
              "Remove",
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
      <TableComponent
        table_heading="De-Activated & Rejected"
        showDateFilter
        stickyCheckBox
        stickyHeader
        tableRows={[...rows]}
        columns={[...columns]}
        tHeadBgColor="bg-gray-1"
      />
    </div>
  );
};
export default DeactivatedandRejected;
