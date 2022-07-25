import CustomIcon from "services/iconUtils";
import TableComponent from "@/atoms/TableComponent";

const DraftsandQueries = () => {
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
      label: "Reseller Status",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      position: "sticky",
    },
    {
      id: "col3",
      label: "Reseller ID / Store Code",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col4",
      label: "Full Name/ Gender",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col5",
      label: "Email ID / Mobile",
      minWidth: 150,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col6",
      label: "City / State",
      minWidth: 150,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col7",
      label: "Registered Date & Time",
      minWidth: 150,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col8",
      label: "Query",
      minWidth: 150,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col9",
      label: "Reply",
      minWidth: 150,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col10",
      label: "Query raised / reply date & time",
      minWidth: 150,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col11",
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
      col11: (
        <div className="d-flex justify-content-center align-items-center ">
          <CustomIcon type="view" title="view" />
          <CustomIcon type="reply" title="reply" className="mx-2" />
          <CustomIcon type="delete" title="view" />
        </div>
      ),
    },
    {
      id: "2",
      col1: "2",
      col2: "InActive",
      col3: "2",
      col11: (
        <div className="d-flex justify-content-center align-items-center ">
          <CustomIcon type="view" title="view" />
          <CustomIcon type="reply" title="reply" className="mx-2" />
          <CustomIcon type="delete" title="view" />
        </div>
      ),
    },
  ];
  return (
    <div>
      <TableComponent
        table_heading="Updated (4/50)"
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
export default DraftsandQueries;
