import { Box, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
import validateMessage from "constants/validateMessages";
import ClearIcon from "@mui/icons-material/Clear";
import ButtonComponent from "@/atoms/ButtonComponent";
import MenuOption from "@/atoms/MenuOptions";
import TableComponent from "@/atoms/TableComponent";
import ModalComponent from "@/atoms/ModalComponent";
import InputBox from "@/atoms/InputBoxComponent";

const tableColumn = [
  {
    id: "col1",
    align: "center",
    label: "S.No.",
    minWidth: 50,
    data_align: "center",
  },
  {
    id: "col2",
    align: "center",
    label: "Tag Name",
    minWidth: 150,
    data_align: "center",
  },
  {
    id: "col3",
    align: "center",
    label: "Created By",
    minWidth: 150,
    data_align: "center",
  },
  {
    id: "col4",
    align: "center",
    label: "Updated Date & Time",
    minWidth: 150,
    data_align: "center",
  },
  {
    id: "col5",
    align: "center",
    label: "Status",
    minWidth: 150,
    data_align: "center",
  },
  {
    id: "col6",
    align: "center",
    label: "Action",
    minWidth: 150,
    data_align: "center",
  },
];
const viewTableColumn = [
  {
    id: "col1",
    align: "center",
    label: "S.No.",
    minWidth: 50,
    data_align: "center",
  },
  {
    id: "col2",
    align: "center",
    label: "Product Name",
    minWidth: 150,
    data_align: "center",
  },
  {
    id: "col3",
    align: "center",
    label: "Product ID",
    minWidth: 150,
    data_align: "center",
  },
  {
    id: "col4",
    align: "center",
    label: "Supplier ID",
    minWidth: 150,
    data_align: "center",
  },
  {
    id: "col5",
    align: "center",
    label: "Created By",
    minWidth: 150,
    data_align: "center",
  },
  {
    id: "col6",
    align: "center",
    label: "Last Updated Date & Time",
    minWidth: 150,
    data_align: "center",
  },
];
const viewRows = [
  {
    id: "col1",
    col1: "1",
    col2: "Deal Of The Day",
    col3: "57574SE452DE",
    col4: "SUP19STR2940",
    col5: "Balu",
    col6: "12/09/2022",
  },
];
const Tags = () => {
  const [rows, setRows] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [tagName, setTageName] = useState("");
  const [error, setError] = useState("");
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const getTableData = () => {
    const data = [
      {
        id: "col1",
        col1: "1",
        col2: "Deal Of The Day",
        col3: "Balu",
        col4: "12/04/2022",
        col5: "Active",
        col6: (
          <Box>
            <DoneIcon className="border rounded bg-green color-white fs-18 me-2 cursor-pointer" />
            <ClearIcon className="border rounded bg-red color-white fs-18 me-1 cursor-pointer" />
            <MenuOption
              options={["View", "Edit", "Delete"]}
              IconclassName="fs-5 cursor-pointer"
              getSelectedItem={(ele) => {
                // console.log(ele);
                if (ele === "View") {
                  setViewModalOpen(true);
                }
              }}
            />
          </Box>
        ),
      },
    ];
    setRows(data);
  };
  useEffect(() => {
    getTableData();
  }, []);
  const handleCloseClick = () => {
    setModalOpen(false);
    setError("");
    setTageName("");
  };
  const handleSaveClick = () => {
    let flag = true;
    if (tagName.length === 0) {
      flag = false;
      setError(validateMessage.field_required);
    } else if (tagName.length > 250) {
      flag = false;
      setError("Max 250 alpha numeric characters can be entered");
    }
    if (flag) {
      setModalOpen(false);
      setError("");
      setTageName("");
    }
  };
  return (
    <Paper className="mnh-85vh mxh-85vh p-3 overflow-auto hide-scrollbar">
      <Box display="flex" justifyContent="space-between" paddingX={3}>
        <Typography className="h-4 color-orange fw-bold">Tags</Typography>
        <ButtonComponent
          label="Create Payment"
          onBtnClick={() => {
            setModalOpen(true);
          }}
        />
      </Box>
      <TableComponent
        columns={[...tableColumn]}
        showSearchFilter={false}
        showSearchbar={false}
        tHeadBgColor="bg-light-gray"
        tableRows={[...rows]}
      />
      <ModalComponent
        open={modalOpen}
        onCloseIconClick={() => {
          handleCloseClick();
        }}
        footerClassName="justify-content-end"
        saveBtnText="Submit"
        ClearBtnText="Cancel"
        ModalTitle="Create Tag"
        onSaveBtnClick={() => {
          handleSaveClick();
        }}
        onClearBtnClick={() => {
          handleCloseClick();
        }}
        titleClassName="fw-bold color-orange "
      >
        <Box className="p-3">
          <InputBox
            value={tagName}
            variant="standard"
            size="small"
            label="Tag Name"
            onInputChange={(e) => {
              setTageName(e.target.value);
            }}
            error={error !== ""}
            helperText={error}
          />
        </Box>
      </ModalComponent>
      <ModalComponent
        open={viewModalOpen}
        onCloseIconClick={() => {
          setViewModalOpen(false);
        }}
        ModalWidth={1000}
        showFooter={false}
        ModalTitle="Tags"
        titleClassName="fw-bold color-orange"
      >
        <Box className="px-2 mnh-75vh overflow-auto hide-scrollbar">
          <TableComponent
            columns={[...viewTableColumn]}
            showSearchFilter={false}
            showSearchbar={false}
            tHeadBgColor="bg-light-gray"
            tableRows={[...viewRows]}
            showCheckbox={false}
          />
        </Box>
      </ModalComponent>
    </Paper>
  );
};

export default Tags;
