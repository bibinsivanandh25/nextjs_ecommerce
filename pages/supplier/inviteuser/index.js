import { Box, Grid, Paper } from "@mui/material";
import { useState } from "react";
import TableComponent from "@/atoms/TableComponent";
import ModalComponent from "@/atoms/ModalComponent";
import InputBox from "@/atoms/InputBoxComponent";
import TextArea from "@/atoms/SimpleTextArea";
import ButtonComponent from "@/atoms/ButtonComponent";

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
    <Paper className="mxh-80vh mnh-80vh hide-scrollbar-overflow-auto">
      <div className="border-bottom">
        <Box className=" d-flex justify-content-between align-items-center border-bottom-0 p-2 ">
          <Box className="fs-16 fw-700 ps-4">Invite User</Box>
          <Box>
            <ButtonComponent
              label="Invite User"
              onBtnClick={() => setShowInviteUser(true)}
            />
          </Box>
        </Box>
      </div>
      <Paper className="mt-5 mx-3" elevation={3}>
        <TableComponent tableRows={[...rows]} columns={[...columns]} />
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
