import { Grid, Paper } from "@mui/material";
import { useState } from "react";
import TableComponent from "@/atoms/TableComponent";
import ModalComponent from "@/atoms/ModalComponent";
import InputBox from "@/atoms/InputBoxComponent";
import TextArea from "@/atoms/SimpleTextArea";

const InviteUser = () => {
  const [showInviteUser, setShowInviteUser] = useState(false);
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
      label: "Name",
      //   minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col3",
      label: "Email",
      //   minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col4",
      label: "Mobile Number",
      //   minWidth: 50,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col5",
      label: "Address",
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
    },
    {
      id: "2",
      col1: "01",
      col2: "577245",
      col3: "---",
      col4: "---",
      col5: "--",
    },
  ];

  return (
    <Paper className="mxh-80vh mnh-80vh hide-scrollbar-overflow-auto p-3">
      <Paper elevation={3} className="p-2">
        <TableComponent
          tableRows={[...rows]}
          columns={[...columns]}
          table_heading="Invite User"
          showCustomSearchButton
          customSearchButtonLabel="Invite User"
          searchBarSizeMd={5}
          onCustomSearchButtonClick={() => setShowInviteUser(true)}
        />
      </Paper>
      <ModalComponent
        ModalTitle="Invite User"
        open={showInviteUser}
        onCloseIconClick={() => setShowInviteUser(false)}
        footerClassName="justify-content-end"
      >
        <Grid container spacing={2} alignSelf="center" className="py-3">
          <Grid item sm={12}>
            <InputBox placeholder="Name" />
          </Grid>
          <Grid item sm={12}>
            <InputBox placeholder="Email" />
          </Grid>{" "}
          <Grid item sm={12}>
            <InputBox placeholder="Mobile" />
          </Grid>
          <Grid item sm={12}>
            <TextArea placeholder="Address" rows={3} />
          </Grid>
        </Grid>
      </ModalComponent>
    </Paper>
  );
};
export default InviteUser;
