/* eslint-disable no-use-before-define */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import { Box, Paper } from "@mui/material";
import ButtonComponent from "components/atoms/ButtonComponent";
import TableComponent from "components/atoms/TableComponent";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CustomIcon from "services/iconUtils";
import { deleteStaff, getStaff } from "services/supplier/staff";
import toastify from "services/utils/toastUtils";
import StaffForm from "@/forms/supplier/staff";
import ModalComponent from "@/atoms/ModalComponent";

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
    label: "Name",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
    isFilter: true,
  },
  {
    id: "col3", // id value in column should be presented in row as key
    label: "E-mail",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
    isFilter: true,
  },
  {
    id: "col4", // id value in column should be presented in row as key
    label: "Action",
    align: "center",
    data_align: "center",
    data_classname: "",
  },
];

const selectTypeList = [
  {
    label: "ALL",
    value: "ALL",
  },
  {
    label: "Name",
    value: "NAME",
  },
  {
    label: "E-mail",
    value: "EMAILID",
  },
  {
    label: "Mobile Number",
    value: "MOBILE_NUMBER",
  },
];

const Staff = () => {
  const router = useRouter();
  const handleBtnClick = () => {
    router.push("/supplier/staff/addstaff");
  };
  const [rows, setRows] = useState([]);
  const supplierId = useSelector((state) => state.user.supplierId);
  const [viewStaffId, setviewStaffId] = useState(null);
  const [editStaffId, seteditStaffId] = useState(null);
  const [pageNumber, setpageNumber] = useState(0);
  const [searchtext, setsearchtext] = useState("");
  const [filter, setFilter] = useState("ALL");

  const deletestaff = async (staffId) => {
    const { data, err, message } = await deleteStaff(staffId);
    if (data) {
      toastify(message, "success");
      getData(0, searchtext, filter);
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };

  const getData = async (page, searchText, filterText) => {
    const { data } = await getStaff(
      supplierId,
      page,
      searchText,
      filterText.toUpperCase()
    );
    if (data) {
      const temp = [];
      data.forEach((item) => {
        temp.push({
          id: item.staffId,
          col1: item.staffId,
          col2: `${item.firstName} ${item.lastName}`,
          col3: item.emailId,
          col4: (
            <div className="d-flex justify-content-center align-items-center">
              <Box
                onClick={() => {
                  setviewStaffId(item.staffId);
                }}
              >
                <CustomIcon type="view" title="View" className="h-4" />
              </Box>
              <Box
                onClick={() => {
                  deletestaff(item.staffId);
                }}
              >
                <CustomIcon type="delete" title="Delete" className="h-4 mx-2" />
              </Box>
              <Box
                onClick={() => {
                  seteditStaffId(item.staffId);
                }}
              >
                <CustomIcon type="edit" title="Edit" className="h-4" />
              </Box>
            </div>
          ),
        });
      });
      if (page === 0) {
        setRows(temp);
      } else {
        setRows([...rows, ...temp]);
      }
      if (data.length) setpageNumber(page + 1);
    }
  };

  useEffect(() => {
    getData(0, searchtext, filter);
  }, []);

  return (
    <>
      {editStaffId === null ? (
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
                tableRows={rows}
                columns={tableHeaders}
                filterList={[...selectTypeList]}
                handlePageEnd={(searchText, filterText, page = pageNumber) => {
                  setsearchtext(searchText);
                  setFilter(filterText);
                  getData(page, searchText, filterText);
                }}
                handleRowsPerPageChange={() => {
                  setpageNumber(0);
                }}
              />
            </Box>
          </Paper>
        </>
      ) : (
        <StaffForm
          handlebackClick={() => {
            seteditStaffId(null);
          }}
          viewStaffId={editStaffId}
          type="edit"
        />
      )}
      <ModalComponent
        open={viewStaffId !== null}
        ModalWidth="90vw"
        minHeightClassName=" d-flex align-items-center justify-content-center"
        showFooter={false}
        modalClose={() => {
          setviewStaffId(null);
        }}
        onCloseIconClick={() => {
          setviewStaffId(null);
        }}
        ModalTitle="View"
        titleClassName="fs-16 color-orange fw-bold"
      >
        <StaffForm
          type="view"
          viewStaffId={viewStaffId}
          setviewStaffId={setviewStaffId}
        />
      </ModalComponent>
    </>
  );
};

export default Staff;
