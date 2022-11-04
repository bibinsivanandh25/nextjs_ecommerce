/* eslint-disable no-unused-vars */
import TableComponent from "@/atoms/TableComponent";
import ViewModal from "@/forms/admin/admin/adminconfiguration/supplierstoresettings/ViewModal";
import { Box, Paper, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { getAllSupplierStoreSettings } from "services/admin/admin/adminconfiguration/supplierstoresetting";
import CustomIcon from "services/iconUtils";
import toastify from "services/utils/toastUtils";

const SupplierStoreSettings = () => {
  const [openViewModal, setOpenViewModal] = useState(false);
  const [tableRows, setTableRows] = useState([]);
  const [page, setPage] = useState(0);
  const [edit, setEdit] = useState("");
  const [configurationId, setConfigurationId] = useState(null);
  const [configurationSettingObject, setConfigurationSettingObject] = useState({
    configurationName: "",
    configurationLabel: "",
  });
  const columns = [
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
      label: "Updated date & time",
      data_align: "center",
    },
    {
      id: "col5",
      align: "center",
      label: "Action",
      data_align: "center",
    },
  ];

  //   const rows = [
  //     {
  //       id: "1",
  //       col1: "01",
  //       col2: "FREE ORDERS COUNT",
  //       col3: 50,
  //       col4: "--",
  //       col5: <CustomIcon type="edit" />,
  //     },
  //   ];

  const handleEdit = (configName, configValue, configId) => {
    setEdit("Edit");
    setConfigurationId(configId);
    setConfigurationSettingObject({
      configurationName: configName,
      configurationLabel: configValue,
    });
    setOpenViewModal(true);
  };

  const fillTableRows = (data) => {
    const tempRows = data?.map((val, index) => {
      return {
        id: val.adminConfigurationId,
        col1: index < 9 ? `0${index + 1}` : index + 1,
        col2: (
          <Typography className="text-uppercase h-5">
            {val.adminConfigurationName}
          </Typography>
        ),
        col3: val.adminConfigurationValue,
        col4: val.createdDate ? val.createdDate : "--",
        col5: (
          <CustomIcon
            type="edit"
            onIconClick={() => {
              handleEdit(
                val.adminConfigurationName,
                val.adminConfigurationValue,
                val.adminConfigurationId
              );
            }}
          />
        ),
      };
    });
    return tempRows;
  };

  const getTableData = async (pageNumber) => {
    const { data, error, message } = await getAllSupplierStoreSettings(
      pageNumber
    );
    const rowData = fillTableRows(data);
    if (data?.length) {
      if (pageNumber === 0) {
        setPage(1);
        setTableRows([...rowData]);
      } else {
        setPage((pre) => pre + 1);
        setTableRows((pre) => [...pre, ...rowData]);
      }
    } else if (error?.response?.data?.message) {
      toastify(error?.response?.data?.message, "error");
    }
  };

  useEffect(() => {
    getTableData(0);
  }, []);

  return (
    <>
      <Box>
        <Paper className="overflow-auto hide-scrollbar pt-2 mnh-80vh mxh-80vh">
          <TableComponent
            columns={columns}
            table_heading="Admin Configuration"
            headerClassName="color-orange"
            tHeadBgColor="bg-light-gray"
            showPagination
            tableRows={tableRows}
            showCustomButton
            customButtonLabel="Create"
            showSearchbar={false}
            showSearchFilter={false}
            onCustomButtonClick={() => {
              setEdit("");
              setConfigurationId(null);
              setConfigurationSettingObject({
                configurationName: "",
                configurationLabel: "",
              });
              setOpenViewModal(true);
            }}
            handlePageEnd={(
              _searchText = "",
              _searchFilter = "",
              pageNo = page
            ) => {
              getTableData(pageNo);
            }}
          />
        </Paper>
      </Box>

      {openViewModal && (
        <ViewModal
          openViewModal={openViewModal}
          setOpenViewModal={setOpenViewModal}
          getTableData={getTableData}
          configurationSettingObject={configurationSettingObject}
          edit={edit}
          configurationId={configurationId}
        />
      )}
    </>
  );
};

export default SupplierStoreSettings;
