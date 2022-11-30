/* eslint-disable no-use-before-define */
import CustomIcon from "services/iconUtils";
import { Box, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import MenuOption from "@/atoms/MenuOptions";
import TableComponent from "@/atoms/TableComponent";
import ViewVariationApproval from "@/forms/admin/productcategories/VariationApproval";
import {
  getAllVariations,
  acceptOrRejectVariation,
} from "services/admin/products/variationapprovals";
import toastify from "services/utils/toastUtils";

const VariationApproval = () => {
  const [tableRows, setTableRows] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [viewModal, setViewModal] = useState({
    show: false,
    data: {},
  });
  const tableColumns = [
    {
      id: "col1",
      align: "center",
      label: "S.No.",
      data_align: "center",
    },
    {
      id: "col2",
      align: "center",
      label: "Variation Name",
      data_align: "center",
    },
    {
      id: "col3",
      align: "center",
      label: "Parent Category",
      data_align: "center",
    },
    {
      id: "col4",
      align: "center",
      label: "Sets",
      data_align: "center",
    },
    {
      id: "col5",
      align: "center",
      label: "Sub-Category",
      data_align: "center",
    },
    {
      id: "col6",
      align: "center",
      label: "Supplier ID",
      data_align: "center",
    },

    {
      id: "col7",
      align: "center",
      label: "Created Date & Time",
      data_align: "center",
    },
    {
      id: "col8",
      align: "center",
      label: "Actions",
      data_align: "center",
    },
  ];

  const options = ["Notify"];

  const onClickOfMenuItem = () => {};

  const aprroveRejectVariation = async (val, approvalStatus) => {
    const {
      variationOptionId,
      mainCategoryId,
      setId,
      subCategoryId,
      supplierId,
      variationId,
      variationName,
      optionName,
      variationType,
    } = val;
    const payload = {
      variationOptionId,
      mainCategoryId,
      setId,
      subCategoryId,
      supplierId,
      variationId,
      variationName,
      optionName,
      variationType,
      approvalStatus,
    };
    const { data, message, err } = await acceptOrRejectVariation(payload);
    if (data) {
      getTableData(0);
      toastify(message, "success");
    }
    if (err) {
      getTableData(0);
      toastify(err?.response?.data?.message, "error");
    }
  };

  const mapTableRows = (data) => {
    const result = [];
    data.forEach((val, index) => {
      result.push({
        col1: index + 1,
        col2: val.variationName,
        col3: val.mainCategoryName ?? "--",
        col4: val.setName ?? "--",
        col5: val.subCategoryName ?? "--",
        col6: val.supplierId ?? "--",
        col7: val.createdAt,
        col8: (
          <Box className="d-flex justify-content-between align-items-center">
            <CustomIcon
              className="bg-success color-white rounded h-4"
              type="doneIcon"
              title="Approve"
              onIconClick={() => {
                aprroveRejectVariation(val, "APPROVED");
              }}
            />
            <CustomIcon
              className="bg-danger color-white rounded h-4"
              type="close"
              title="Reject"
              onIconClick={() => {
                aprroveRejectVariation(val, "REJECTED");
              }}
            />
            <CustomIcon
              className="h-4"
              type="view"
              title="View"
              onIconClick={() => {
                setViewModal({
                  show: true,
                  data: val,
                });
              }}
            />
            <MenuOption
              getSelectedItem={(ele) => {
                onClickOfMenuItem(ele, index);
              }}
              options={options}
              IconclassName="h-4 color-gray"
            />
          </Box>
        ),
      });
    });

    return result;
  };
  const getTableData = async (page = pageNumber, dateObj) => {
    const payload = {
      dateFrom: dateObj?.fromDate ?? null,
      dateTo: dateObj?.toDate ?? null,
    };
    const { data } = await getAllVariations(page, payload);
    if (data) {
      if (page === 0) {
        setTableRows(mapTableRows(data));
        setPageNumber(1);
      } else {
        setPageNumber(pageNumber + 1);
        setTableRows([...tableRows, ...data]);
      }
    }
  };

  useEffect(() => {
    getTableData(0);
  }, []);

  return (
    <Box>
      <Box>
        <Box className="px-1 pt-2">
          <Paper
            sx={{ height: "84vh" }}
            className="overflow-auto hide-scrollbar pt-3"
          >
            <TableComponent
              table_heading="Variation Approval"
              columns={tableColumns}
              tHeadBgColor="bg-light-gray"
              tableRows={tableRows}
              showSearchbar={false}
              showDateFilter
              showDateFilterSearch={false}
              handlePageEnd={(searchText, searchFilter, page, dateFilter) => {
                getTableData(page, dateFilter);
              }}
            />
          </Paper>
        </Box>
      </Box>
      {viewModal.show ? (
        <ViewVariationApproval
          showModal={viewModal.show}
          setShowModal={setViewModal}
          variationApprovalData={viewModal.data}
        />
      ) : null}
    </Box>
  );
};

export default VariationApproval;
