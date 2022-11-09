import { Box, Paper, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomIcon from "services/iconUtils";
import TableComponent from "@/atoms/TableComponent";
import MenuOption from "@/atoms/MenuOptions";
import SwitchComponent from "@/atoms/SwitchComponent";
import ViewModal from "@/forms/admin/suppliers/active/viewmodal";
import { getCategoryFilterData } from "services/admin/supplier/supplierapproval";
import toastify from "services/utils/toastUtils";

const tableColumn = [
  {
    id: "col1",
    label: "SI NO.",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
    position: "sticky",
  },
  {
    id: "col2",
    label: "Supplier id with Business Name",
    minWidth: 200,
    align: "center",
    data_align: "center",
    data_classname: "",
    position: "sticky",
  },
  {
    id: "col3",
    label: "Location",
    minWidth: 200,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col4",
    label: "GSTIN Number",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col5",
    label: "Categories/Sub-categories",
    minWidth: 200,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col5",
    label: "Total Catelogs",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col6",
    label: "Catelogs Size / 50MB",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col7",
    label: "Total Orders",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col8",
    label: "Total Earnings",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col9",
    label: "Amount to be paid",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col10",
    label: "Created Date & Time",
    minWidth: 200,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col11",
    label: "Charges Collected / Pending days",
    minWidth: 200,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col12",
    label: "Actions",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
    position: "sticky",
  },
];
const Active = () => {
  const [viewModalOpen, setViewModaOpen] = useState(false);
  const [filterData, setFilterData] = useState([]);
  // const [selectedFilterData, setSelectedFilterData] = useState([]);
  const copyText = () => {
    const copyTexts = document.getElementById("gstinnumber").innerHTML;
    navigator.clipboard.writeText(copyTexts);
  };
  const rows = [
    {
      id: "col1",
      col1: "1",
      col2: (
        <Typography className="h-5 color-light-blue cursor-pointer text-decoration-underline">
          VLR Transport
        </Typography>
      ),
      col3: "--",
      col4: (
        <Box className="d-flex justify-content-around ">
          <span className="h-5" id="gstinnumber">
            MRK3556235F3
          </span>
          <Tooltip title="copy">
            <CustomIcon
              type="filecopy"
              size="small"
              className="fs-18"
              onIconClick={() => {
                copyText();
              }}
            />
          </Tooltip>
        </Box>
      ),
      col5: "--",
      col6: "--",
      col7: "--",
      col8: "3436",
      col9: "--",
      col10: "--",
      col11: "--",
      col12: (
        <Box>
          <CustomIcon
            type="view"
            className="fs-18 me-2"
            onIconClick={() => {
              setViewModaOpen(true);
            }}
          />
          <MenuOption
            options={[
              <>
                Enable{" "}
                <Box className="ms-4">
                  <SwitchComponent label="" />
                </Box>
              </>,
              "Notify",
              "Rasie a query",
              "Supplier Home Page",
              "Marketing Tools Sub",
            ]}
            IconclassName="fs-5 cursor-pointer"
            getSelectedItem={() => {}}
          />
        </Box>
      ),
    },
  ];
  const getCategoryFilter = async () => {
    const { data, err } = await getCategoryFilterData();
    if (data?.data) {
      const temp = [{ name: "Category", value: [] }];
      data.data.forEach((item) => {
        temp[0].value.push({
          item: item.name,
          id: item.id,
          isSelected: false,
        });
      });
      setFilterData(temp);
    }
    if (err) {
      setFilterData([]);
      toastify(err?.response?.data?.message, "error");
    }
  };
  useEffect(() => {
    getCategoryFilter();
  }, []);
  return (
    <Paper
      className="mnh-85vh mxh-85vh overflow-auto hide-scrollbar"
      elevation={3}
    >
      {!viewModalOpen ? (
        <Box className="mt-2">
          <TableComponent
            tableRows={[...rows]}
            table_heading="Active Suppliers (58)"
            stickyHeader={false}
            showSearchFilter={false}
            showDateFilter
            showFilterButton
            showDateFilterSearch
            columns={[...tableColumn]}
            showCheckbox={false}
            allowOutSideClickClose
            filterData={filterData}
            getFilteredValues={(value) => {
              setFilterData(value);
              // setSelectedFilterData(value);
            }}
          />
        </Box>
      ) : (
        <ViewModal
          viewModalOpen={viewModalOpen}
          setViewModaOpen={setViewModaOpen}
        />
      )}
    </Paper>
  );
};

export default Active;
