/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import {
  Box,
  FormControlLabel,
  FormGroup,
  Paper,
  Stack,
  Switch,
} from "@mui/material";
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import CustomIcon from "services/iconUtils";
import TableComponent from "@/atoms/TableComponent";
import ViewModal from "@/forms/supplier/marketingtools/flags/viewmodal";
import FlagsEditModal from "@/forms/supplier/marketingtools/flags/flagseditmodal";
import { getAllFlags } from "services/supplier/marketingtools/flags";
import { useSelector } from "react-redux";
import toastify from "services/utils/toastUtils";
import { disableProductFlag } from "services/supplier/myProducts";

const tableColumn = [
  {
    label: "Flag Title.",
    id: "col1",
    minWidth: 100,
    align: "center",
    data_align: "center",
  },
  {
    label: "Image",
    id: "col2",
    minWidth: 100,
    align: "center",
    data_align: "center",
  },
  {
    label: "Pixel Ratio",
    id: "col3",
    minWidth: 100,
    align: "center",
    data_align: "center",
  },
  {
    label: "Start Date & Time",
    id: "col4",
    minWidth: 100,
    align: "center",
    data_align: "center",
  },
  {
    label: "End Date & Time",
    id: "col5",
    minWidth: 100,
    align: "center",
    data_align: "center",
  },
  {
    label: "Status",
    id: "col6",
    minWidth: 100,
    align: "center",
    data_align: "center",
  },
  {
    label: "Action",
    id: "col7",
    minWidth: 100,
    align: "center",
    data_align: "center",
  },
];

const AntSwitch = styled(Switch)(() => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#e56700",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    background: "#fff",
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    // backgroundColor:
    boxSizing: "border-box",
    background: "#DCDCDC",
  },
}));

const Flags = () => {
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const { supplierId, storeCode } = useSelector((state) => state.user);
  const [flagDetails, setFlagDetails] = useState(null);
  const [viewDetails, setviewDetails] = useState(null);
  const [pageNumber, setpageNumber] = useState(0);

  const disableFlag = async (flagId, flag) => {
    const { data, err } = await disableProductFlag(flagId, flag);
    if (data) {
      getRows();
      toastify(data?.message, "success");
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };

  const mapToTable = (data) => {
    const temp = [];
    data.forEach((item) => {
      temp.push({
        col1: item.flagTitle,
        col2: item.imageUrl ? (
          <Image src={item.imageUrl} height={50} width={50} />
        ) : null,
        col3: "--",
        col4: item.startDate || "--",
        col5: item.endDate || "--",
        col6: item.status || "--",
        col7: (
          <Box className="d-flex justify-content-center">
            <FormGroup>
              <FormControlLabel
                control={
                  <Stack direction="row" spacing={1} alignItems="center">
                    <AntSwitch
                      disabled={item.supplierFlagId == null}
                      inputProps={{ "aria-label": "ant design" }}
                      checked={
                        item.status === null
                          ? false
                          : item.status !== "INACTIVE"
                      }
                      onChange={() => {
                        disableFlag(
                          item.supplierFlagId,
                          item.status != "INACTIVE"
                        );
                      }}
                      disable={!item.status}
                    />
                  </Stack>
                }
              />
            </FormGroup>
            <CustomIcon type="share" className="fs-18 me-2" />
            {item.purchaseId && (
              <CustomIcon
                type="view"
                className="fs-18 me-2"
                onIconClick={() => {
                  if (item.purchaseId) {
                    handleView(item.products);
                  } else {
                    toastify("Flaged Products not found", "warning");
                  }
                }}
              />
            )}
            {item.purchaseId && item.status === "ACTIVE" && (
              <CustomIcon
                type="edit"
                className="fs-18"
                onIconClick={() => {
                  setFlagDetails({
                    flagId: item.flagId,
                    purchaseId: item.purchaseId,
                  });
                  setEditModalOpen(true);
                }}
              />
            )}
          </Box>
        ),
      });
    });
    setRows(temp);
  };

  const getRows = async (dateObj = {}, searchText) => {
    const { data, err } = await getAllFlags(
      supplierId,
      storeCode,
      pageNumber,
      dateObj?.fromDate,
      dateObj?.toDate,
      searchText
    );
    if (data) {
      mapToTable(data);
    } else {
      toastify(err?.response?.data?.message, "error");
      setRows([]);
    }
  };

  const handleView = (products) => {
    setViewModalOpen(true);
    setviewDetails(products);
  };

  useEffect(() => {
    getRows();
  }, []);

  return (
    <Paper className="mnh-80vh mxh-80vh overflow-auto hide-scrollbar p-3">
      <TableComponent
        table_heading="Flags"
        columns={tableColumn}
        tableRows={rows}
        showDateFilter
        tHeadBgColor="bg-tableGray"
        showCheckbox={false}
        handlePageEnd={(searchText, filterText, _, dateObj) => {
          getRows(dateObj, searchText);
        }}
        handleRowsPerPageChange={() => {
          setpageNumber(0);
        }}
      />
      {viewModalOpen && (
        <ViewModal
          viewModalOpen={viewModalOpen}
          setViewModalOpen={setViewModalOpen}
          viewDetails={viewDetails}
        />
      )}
      {editModalOpen && (
        <FlagsEditModal
          editModalOpen={editModalOpen}
          closeModal={() => {
            setEditModalOpen(false);
            setFlagDetails(null);
          }}
          getRows={getRows}
          flagDetails={flagDetails}
        />
      )}
    </Paper>
  );
};

export default Flags;
