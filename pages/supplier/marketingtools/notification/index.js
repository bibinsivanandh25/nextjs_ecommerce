import { Paper } from "@mui/material";
import { useState } from "react";
import CustomIcon from "services/iconUtils";
import TableComponent from "@/atoms/TableComponent";
import MenuOption from "@/atoms/MenuOptions";
import CreateNotification from "@/forms/supplier/marketingtools/Notifications/CreateNotication";

const Notification = () => {
  const [showCreateNotification, setShowCreateNotification] = useState(false);
  const columns = [
    {
      id: "col1", //  id value in column should be presented in row as key
      label: "Sl. No",
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col2",
      label: "Notification Title",
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col3",
      label: "Image",
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col4",
      label: "Subject",
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col5",
      label: "Status",
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col6",
      label: "Whom",
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col7",
      label: "Created Date & Time",
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col8",
      label: "Scheduled Date & Time",
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col9",
      label: "Action",
      align: "center",
      data_align: "center",
      data_classname: "",
    },
  ];
  const rows = [
    {
      id: "1",
      col1: "Quiz",
      col2: "Fixed",
      col3: "Shirts",
      col4: "Formal",
      col5: "12/12/2020",
      col6: "12/02/2021",
      col7: "08/12/2020",
      col8: "Regular",
      col10: "Active",
      col9: (
        <div className="d-flex justify-content-center">
          <CustomIcon type="send" className="h-3 color-orange" />
          <CustomIcon type="view" className="h-3 ms-1" />
          <MenuOption options={["Edit", "Delete", "Resend"]} />
        </div>
      ),
    },
    {
      id: "2",
      col1: "Quiz",
      col2: "Fixed",
      col3: "Shirts",
      col4: "Formal",
      col5: "12/12/2020",
      col6: "12/02/2021",
      col7: "08/12/2020",
      col8: "Regular",
      col9: (
        <div className="d-flex justify-content-center">
          <CustomIcon type="send" className="h-3 color-orange" />
          <CustomIcon type="view" className="h-3 ms-1" />
          <MenuOption options={["Edit", "Delete", "Resend"]} />
        </div>
      ),
    },
  ];
  return (
    <Paper className="mnh-80vh mxh-809vh overflow-auto hide-scrollbar p-3">
      <TableComponent
        showDateFilter
        tableRows={[...rows]}
        columns={[...columns]}
        showDateFilterBtn
        dateFilterBtnName="Create Notification"
        dateFilterBtnClick={() => setShowCreateNotification(true)}
        table_heading="Notification"
      />
      <CreateNotification
        showModal={showCreateNotification}
        setShowModal={setShowCreateNotification}
      />
    </Paper>
  );
};
export default Notification;
