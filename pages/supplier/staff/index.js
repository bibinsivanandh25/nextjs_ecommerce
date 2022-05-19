import { Box, Grid, MenuList, Paper } from "@mui/material";
import ButtonComponent from "components/atoms/ButtonComponent";
import TableComponent from "components/atoms/TableComponent";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/router";

const tableHeaders = [
  {
    id: "col1", //id value in column should be presented in row as key
    label: "Staff ID",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col2", //id value in column should be presented in row as key
    label: "Tab Access",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col3", //id value in column should be presented in row as key
    label: "Name",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col4", //id value in column should be presented in row as key
    label: "E-mail",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col5", //id value in column should be presented in row as key
    label: "Action",
    align: "center",
    data_align: "center",
    data_classname: "",
  },
];

const tempRows = [
  {
    id: "1",
    col1: "#123",
    col2: "Products",
    col3: "abc",
    col4: "abc@gmail.com",
    col5: (
      <div className="d-flex justify-content-around align-items-center">
        <div>
          <VisibilityIcon />
        </div>
        <div>
          <DeleteIcon />
        </div>
        <div>
          <EditIcon />
        </div>
      </div>
    ),
  },
  {
    id: "2",
    col1: "456",
    col2: "Products",
    col3: "abc",
    col4: "abc@gmail.com",
    col5: (
      <div className="d-flex justify-content-around align-items-center">
        <div>
          <VisibilityIcon />
        </div>
        <div>
          <DeleteIcon />
        </div>
        <div>
          <EditIcon />
        </div>
      </div>
    ),
  },
];

const Staff = () => {
  const router = useRouter();
  const [addStaff, setAddStaff] = useState(false);
  const handleBtnClick = () => {
    // setAddStaff((pre) => !pre);
    router.push("/supplier/staff/addstaff");
  };
  return (
    <>
      <Paper>
        <div className="border-bottom">
          <Box className=" d-flex justify-content-between align-items-center border-bottom-0 p-2 ">
            <Box className="fs-16 fw-700 ps-4">Manage Staff</Box>
            <Box>
              <ButtonComponent
                label="Add new Staffs"
                onBtnClick={handleBtnClick}
              />
            </Box>
          </Box>
        </div>
        <Box className="mt-4">
          <TableComponent tableRows={tempRows} columns={tableHeaders} />
        </Box>
      </Paper>
    </>
  );
};

export default Staff;
