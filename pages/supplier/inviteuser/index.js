import { Box, Grid, Paper } from "@mui/material";
import validateMessage from "constants/validateMessages";
import { useState } from "react";
import validationRegex from "services/utils/regexUtils";
import TableComponent from "@/atoms/TableComponent";
import ModalComponent from "@/atoms/ModalComponent";
import InputBox from "@/atoms/InputBoxComponent";
import ButtonComponent from "@/atoms/ButtonComponent";

const InviteUser = () => {
  const [showInviteUser, setShowInviteUser] = useState(false);
  const [defaultFormData, setDefaultFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
  });
  const [error, setError] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
  });
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
  const validation = () => {
    const errorObj = {
      name: "",
      email: "",
      mobile: "",
      address: "",
    };
    let flag = true;
    const { name, email, mobile, address } = defaultFormData;
    if (name.length === 0) {
      flag = false;
      errorObj.name = validateMessage.field_required;
    } else if (name.length > 100) {
      flag = false;
      errorObj.name = validateMessage.alpha_numeric_max_100;
    }
    if (email.length === 0) {
      flag = false;
      errorObj.email = validateMessage.field_required;
    } else if (!validationRegex.email.test(email)) {
      flag = false;
      errorObj.email = validateMessage.email;
    }
    if (mobile.length === 0) {
      flag = false;
      errorObj.mobile = validateMessage.field_required;
    } else if (!validationRegex.mobile.test(mobile)) {
      flag = false;
      errorObj.mobile = validateMessage.mobile;
    }
    if (address.length === 0) {
      flag = false;
      errorObj.address = validateMessage.field_required;
    } else if (address.length > 255) {
      flag = false;
      errorObj.address = validateMessage.alpha_numeric_max_255;
    }
    setError(errorObj);
    return flag;
  };
  const handleSaveClick = () => {
    if (validation()) {
      setShowInviteUser(false);
      setDefaultFormData({
        name: "",
        email: "",
        mobile: "",
        address: "",
      });
    }
  };
  const handleCloseClick = () => {
    setError({ name: "", email: "", mobile: "", address: "" });
    setDefaultFormData({
      name: "",
      email: "",
      mobile: "",
      address: "",
    });
    setShowInviteUser(false);
  };
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
        onCloseIconClick={() => handleCloseClick()}
        footerClassName="justify-content-end"
        onSaveBtnClick={() => {
          handleSaveClick();
        }}
        onClearBtnClick={() => {
          handleCloseClick();
        }}
        titleClassName="color-orange h-4"
        ClearBtnText="Cancel"
      >
        <Grid container spacing={2} alignSelf="center" className="py-3">
          <Grid item sm={12}>
            <InputBox
              label="Name"
              required
              value={defaultFormData.name}
              onInputChange={(e) => {
                setDefaultFormData((pre) => ({ ...pre, name: e.target.value }));
              }}
              inputlabelshrink
              error={error.name !== ""}
              helperText={error.name}
            />
          </Grid>
          <Grid item sm={12}>
            <InputBox
              label="Email"
              required
              value={defaultFormData.email}
              onInputChange={(e) => {
                setDefaultFormData((pre) => ({
                  ...pre,
                  email: e.target.value,
                }));
              }}
              inputlabelshrink
              error={error.email !== ""}
              helperText={error.email}
            />
          </Grid>{" "}
          <Grid item sm={12}>
            <InputBox
              label="Moblie"
              required
              value={defaultFormData.mobile}
              onInputChange={(e) => {
                setDefaultFormData((pre) => ({
                  ...pre,
                  mobile: e.target.value,
                }));
              }}
              inputlabelshrink
              error={error.mobile !== ""}
              helperText={error.mobile}
            />
          </Grid>
          <Grid item sm={12}>
            <InputBox
              isMultiline
              rows={3}
              label="Address"
              required
              value={defaultFormData.address}
              onInputChange={(e) => {
                setDefaultFormData((pre) => ({
                  ...pre,
                  address: e.target.value,
                }));
              }}
              inputlabelshrink
              error={error.address !== ""}
              helperText={error.address}
            />
          </Grid>
        </Grid>
      </ModalComponent>
    </Paper>
  );
};
export default InviteUser;
