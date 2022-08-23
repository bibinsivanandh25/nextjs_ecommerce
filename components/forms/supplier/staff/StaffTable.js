import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import CustomIcon from "services/iconUtils";
import { getStaff } from "services/supplier/staff";
import { useUserInfo } from "services/hooks";
import TableComponent from "@/atoms/TableComponent";

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

const StaffTable = () => {
  const user = useUserInfo();
  const [tableData, setTableData] = useState([]);
  const mapData = (data) => {
    const temp = data.map((item) => {
      return {
        id: item.staffId,
        col1: item.staffId,
        col2: "Products",
        col3: `${item.firstName} ${item.lastName}`,
        col4: item.emailId,
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
        supplierId: item.supplierId,
      };
    });
    setTableData(temp);
  };
  const getStaffs = async (page, rows, keyword, text) => {
    const { data } = await getStaff(user.id, page, rows, keyword, text);
    if (data) {
      mapData(data);
    }
  };
  useEffect(() => {
    getStaffs(0, 50, "", "NAME");
  }, []);

  return (
    <Box className="mt-4">
      <TableComponent
        tableRows={tableData}
        columns={tableHeaders}
        table_heading={`${tableData.length} Staffs`}
      />
      {tableData.length == 0 ? (
        <div className="d-flex justify-content-center">
          <Typography>No Data Found</Typography>
        </div>
      ) : null}
    </Box>
  );
};

export default StaffTable;
