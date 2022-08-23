import { Box, Paper } from "@mui/material";
import ButtonComponent from "components/atoms/ButtonComponent";
import TableComponent from "components/atoms/TableComponent";
import { useRouter } from "next/router";
import CustomIcon from "services/iconUtils";

const tableHeaders = [
  {
    id: "col1", // id value in column should be presented in row as key
    label: "Staff ID",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col2", // id value in column should be presented in row as key
    label: "Tab Access",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col3", // id value in column should be presented in row as key
    label: "Name",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
    isFilter: true,
  },
  {
    id: "col4", // id value in column should be presented in row as key
    label: "E-mail",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
    isFilter: true,
  },
  {
    id: "col5", // id value in column should be presented in row as key
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
          <CustomIcon type="view" title="View" />
        </div>
        <div>
          <CustomIcon type="delete" title="Delete" />
        </div>
        <div>
          <CustomIcon type="edit" title="Edit" />
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
          <CustomIcon type="view" title="View" />
        </div>
        <div>
          <CustomIcon type="delete" title="Delete" />
        </div>
        <div>
          <CustomIcon type="edit" title="Edit" />
        </div>
      </div>
    ),
  },
];

const Staff = () => {
  const router = useRouter();
  const handleBtnClick = () => {
    router.push("/supplier/staff/addstaff");
  };
  return (
    <>
      <Paper className="mnh-80vh overflow-auto hide-scrollbar mxh-80vh">
        <div className="border-bottom">
          <Box className=" d-flex justify-content-between align-items-center border-bottom-0 p-2 ">
            <Box className="fs-16 fw-700 ps-4">Manage Staff</Box>
            <Box>
              <ButtonComponent
                label="Add New Staffs"
                onBtnClick={handleBtnClick}
              />
            </Box>
          </Box>
        </div>
        <Box className="mt-4">
          <TableComponent
            tableRows={tempRows}
            columns={tableHeaders}
            table_heading={`${tempRows.length} Staffs`}
          />
        </Box>
      </Paper>
    </>
  );
};

export default Staff;
