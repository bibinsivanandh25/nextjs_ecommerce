import { Box, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { Edit } from "@mui/icons-material";
import validateMessage from "constants/validateMessages";
import TableComponent from "@/atoms/TableComponent";
import ButtonComponent from "@/atoms/ButtonComponent";
import ModalComponent from "@/atoms/ModalComponent";
import SimpleDropdownComponent from "@/atoms/SimpleDropdownComponent";
import InputBox from "@/atoms/InputBoxComponent";

const TableHeader = [
  {
    id: "col1",
    align: "center",
    label: "S.No.",
    data_align: "center",
  },
  {
    id: "col2",
    align: "center",
    label: "Configuration Name",
    data_align: "center",
  },
  {
    id: "col3",
    align: "center",
    label: "Configuration Value",
    data_align: "center",
  },
  {
    id: "col4",
    align: "center",
    label: "Update Date & Time",
    data_align: "center",
  },
  {
    id: "col5",
    align: "center",
    label: "Action",
    data_align: "center",
  },
];
const tableRows = [
  {
    id: 1,
    col1: 1,
    col2: "Free Order Count",
    col3: "50",
    col4: "27/09/2022",
    col5: <Edit />,
  },
  {
    id: 2,
    col1: 2,
    col2: "Free Order Count",
    col3: "50",
    col4: "27/09/2022",
    col5: <Edit />,
  },
];
function AdminConfiguration() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [defaultFormData, setDefaultFormData] = useState({
    name: {},
    value: "",
  });
  const [errorObj, setErrorObj] = useState({
    name: "",
    value: "",
  });
  const handleSaveBtnClick = () => {
    const errorObjs = {
      name: "",
      value: "",
    };
    let flag = true;
    if (Object.keys(defaultFormData.name).length == 0) {
      flag = false;
      errorObjs.name = validateMessage.field_required;
    }
    if (defaultFormData.value.length == 0) {
      flag = false;
      errorObjs.value = validateMessage.field_required;
    }
    setErrorObj(errorObjs);
    if (flag) {
      setShowCreateModal(false);
    }
  };
  const handleModalCloseClick = () => {
    setShowCreateModal(false);
    setErrorObj({ name: "", value: "" });
    setDefaultFormData({ name: {}, value: "" });
  };
  return (
    <Paper className="mnh-85vh mxh-85vh p-3 overflow-auto hide-scrollbar">
      <Box display="flex" justifyContent="space-between" paddingX={3}>
        <Typography className="h-4 color-orange fw-bold">
          Admin Configuration
        </Typography>
        <ButtonComponent
          label="Create"
          onBtnClick={() => {
            setShowCreateModal(true);
          }}
        />
      </Box>
      <TableComponent
        showSearchFilter={false}
        showSearchbar={false}
        columns={TableHeader}
        tHeadBgColor="bg-light-gray"
        tableRows={tableRows}
      />
      {showCreateModal && (
        <ModalComponent
          open={showCreateModal}
          onCloseIconClick={() => {
            handleModalCloseClick();
          }}
          ModalTitle="Admin Configuration"
          saveBtnText="Submit"
          ClearBtnText="Cancel"
          footerClassName="justify-content-end border-top"
          titleClassName="h-4 fw-bold color-orange"
          onClearBtnClick={() => {
            handleModalCloseClick();
          }}
          onSaveBtnClick={() => {
            handleSaveBtnClick();
          }}
        >
          <Box className="p-2">
            <SimpleDropdownComponent
              value={defaultFormData.name}
              required
              label="Configuration Name"
              inputlabelshrink
              size="small"
              className="my-4"
              onDropdownSelect={(value) => {
                setDefaultFormData((pre) => ({ ...pre, name: value }));
              }}
              error={errorObj.name !== ""}
              helperText={errorObj.name}
            />
            <InputBox
              value={defaultFormData.value}
              required
              label="Configuration Values"
              inputlabelshrink
              size="small"
              className="mb-2"
              onInputChange={(e) => {
                setDefaultFormData((pre) => ({
                  ...pre,
                  value: e.target.value,
                }));
              }}
              error={errorObj.value !== ""}
              helperText={errorObj.value}
            />
          </Box>
        </ModalComponent>
      )}
    </Paper>
  );
}

export default AdminConfiguration;
