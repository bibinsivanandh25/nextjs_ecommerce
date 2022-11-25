/* eslint-disable no-use-before-define */
/* eslint-disable no-nested-ternary */
import { Box, Paper, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomIcon from "services/iconUtils";
import TableComponent from "@/atoms/TableComponent";
import MenuOption from "@/atoms/MenuOptions";
import SwitchComponent from "@/atoms/SwitchComponent";
import ViewModal from "@/forms/admin/suppliers/active/viewmodal";
import { getCategoryFilterData } from "services/admin/supplier/supplierapproval";
import toastify from "services/utils/toastUtils";
import {
  enableDisableSupplier,
  getActiveSuppliers,
} from "services/admin/supplier/active";
import QueryModal from "@/forms/admin/suppliers/active/querymodal";
import ModalComponent from "@/atoms/ModalComponent";
import TextArea from "@/atoms/SimpleTextArea";
import validateMessage from "constants/validateMessages";
import { format } from "date-fns";

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
    id: "col6",
    label: "Total Catelogs",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col7",
    label: "Catelogs Size / 50MB",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col8",
    label: "Total Orders",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col9",
    label: "Total Earnings",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col10",
    label: "Amount to be paid",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col11",
    label: "Created Date & Time",
    minWidth: 200,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col12",
    label: "Charges Collected / Pending days",
    minWidth: 200,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col13",
    label: "Actions",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
    position: "sticky",
  },
];
const Active = () => {
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [selectedFilterData, setSelectedFilterData] = useState([]);
  const [masterData, setMasterData] = useState("");
  const [tableRows, setTableRows] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [filterValues, setFilterValues] = useState({
    searchvalue: "",
    date: {},
  });
  const [selectedData, setSelectedData] = useState({});
  const [showQueryModal, setShowQueryModal] = useState(false);

  const copyText = () => {
    const copyTexts = document.getElementById("gstinnumber").innerHTML;
    navigator.clipboard.writeText(copyTexts);
  };

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

  const handleActionClick = (ele, item) => {
    if (ele == "Rasie a query") {
      setSelectedData(item);
      setShowQueryModal(true);
    }
  };
  const handleDisableSupplier = (item) => {
    setSelectedData(item);
    setDisableModal(true);
  };
  const getTableRows = (data) => {
    const rowDatas = [];
    data?.forEach((item, index) => {
      rowDatas.push({
        id: index + 1,
        col1: index + 1,
        // col2: (
        //   <Typography className="h-5 color-light-blue cursor-pointer text-decoration-underline">
        //     {item.businessName}
        //   </Typography>
        // ),
        col2: `${item?.supplierId} / ${item.businessName}`,
        col3: item.city,
        col4: (
          <Box className="d-flex justify-content-around ">
            <span className="h-5" id="gstinnumber">
              {item.gstin}
            </span>
            <CustomIcon
              type="filecopy"
              size="small"
              className="fs-18"
              onIconClick={() => {
                copyText();
              }}
              title="Copy"
            />
          </Box>
        ),
        col5: (
          <div className="d-flex justify-content-center">
            <Tooltip
              title={item.mainCategories.map((e) => (
                <Typography className="h-5">{e}</Typography>
              ))}
              placement="top"
            >
              <Typography
                className="text-truncate h-5"
                style={{
                  maxWidth: "100px",
                }}
              >
                {item.mainCategories}
              </Typography>
            </Tooltip>
          </div>
        ),
        col6: item.totalCatalogs ? item.totalCatalogs : "--",
        col7: item.catalogSize ? item.catalogSize : "--",
        col8: item.totalOrders ? item.totalOrders : "--",
        col9: item.totalEarnings ? item.totalEarnings : "--",
        col10: item.amoutnToBePaid ? item.amoutnToBePaid : "--",
        col11: item.registeredAt
          ? format(new Date(item.registeredAt), "MM-dd-yyyy HH:mm:ss")
          : "--",
        col12: item.changesCollected ? item.changesCollected : "--",
        col13: (
          <Box>
            <CustomIcon
              type="view"
              className="fs-18 me-2"
              onIconClick={() => {
                setSelectedData(item);
                setViewModalOpen(true);
              }}
            />
            <MenuOption
              options={[
                <>
                  Disable{" "}
                  <Box className="ms-4">
                    <SwitchComponent
                      label=""
                      defaultChecked
                      ontoggle={() => {
                        handleDisableSupplier(item);
                      }}
                    />
                  </Box>
                </>,
                "Notify",
                "Rasie a query",
                "Supplier Home Page",
                "Marketing Tools Sub",
              ]}
              IconclassName="fs-5 cursor-pointer"
              getSelectedItem={(ele) => {
                handleActionClick(ele, item);
              }}
            />
          </Box>
        ),
      });
    });
    return rowDatas;
  };
  const getAllTableData = async (page, selected, searchtext, date) => {
    const payload = {
      category: selected || [],
      fromDate: date?.fromDate && date?.toDate ? date?.fromDate : null,
      toDate: date?.fromDate && date?.toDate ? date?.toDate : null,
      keyword: searchtext || null,
      pageNumber: page,
      pageSize: 50,
    };
    const { data, err } = await getActiveSuppliers(payload);
    if (data?.data) setMasterData(data?.data?.totalcount);
    if (data?.data?.activeSupplierWrappers?.length) {
      if (page == 0) {
        setTableRows(getTableRows(data.data.activeSupplierWrappers));
        setPageNumber(1);
      } else {
        setPageNumber((prev) => prev + 1);
        setTableRows((pre) => [
          ...pre,
          ...getTableRows(data?.data?.activeSupplierWrappers),
        ]);
      }
    } else if (data?.data?.activeSupplierWrappers?.length === 0 && page == 0) {
      setTableRows([]);
    }
    if (err) {
      setTableRows([]);
      toastify(err?.response?.data?.message, "error");
    }
  };
  useEffect(() => {
    const selected = [];
    filterData[0]?.value?.forEach((item) => {
      if (item.isSelected) {
        selected.push(item.id);
      }
    });
    setPageNumber(0);
    getAllTableData(0, selected, filterValues.searchvalue, filterValues.date);
  }, [selectedFilterData]);

  // disable
  const [disableModal, setDisableModal] = useState(false);
  const [comment, setComment] = useState("");

  const [disableError, setDisableError] = useState({
    text: "",
  });
  const disableValidate = () => {
    const disableErrorObj = {
      text: "",
    };
    let flag = true;
    if (comment == "") {
      disableErrorObj.text = validateMessage.field_required;
      flag = false;
    } else {
      disableErrorObj.text = "";
      flag = true;
    }
    setDisableError(disableErrorObj);
    return flag;
  };
  const handleDisableSaveClick = async () => {
    if (disableValidate()) {
      const payload = {
        supplierId: selectedData.supplierId,
        disable: true,
        reason: comment,
      };
      const { data, err } = await enableDisableSupplier(payload);
      if (data) {
        setComment("");
        setDisableModal(false);
        const selected = [];
        filterData[0]?.value?.forEach((item) => {
          if (item.isSelected) {
            selected.push(item.id);
          }
        });
        getAllTableData(
          0,
          selected,
          filterValues.searchvalue,
          filterValues.date
        );
        toastify(data?.message, "success");
      }
      if (err) {
        toastify(err?.response?.data?.message, "error");
      }
    }
  };
  const handleDisableClose = () => {
    setDisableModal(false);
    setDisableError({ text: "" });
  };
  return (
    <Paper
      className="mnh-85vh mxh-85vh overflow-auto hide-scrollbar"
      elevation={3}
    >
      {viewModalOpen ? (
        <ViewModal
          viewModalOpen={viewModalOpen}
          setViewModalOpen={setViewModalOpen}
          selectedData={selectedData}
          type="APPROVED"
        />
      ) : showQueryModal ? (
        <QueryModal
          showQueryModal={showQueryModal}
          setShowQueryModal={setShowQueryModal}
          selectedData={selectedData}
        />
      ) : (
        <Box className="mt-2">
          <TableComponent
            showDateFilter
            showDateFilterSearch
            showFilterButton
            showFromToDateFilter
            tableRows={[...tableRows]}
            table_heading={`Active Suppliers (${masterData || 0})`}
            stickyHeader={false}
            showSearchFilter={false}
            columns={[...tableColumn]}
            showCheckbox={false}
            allowOutSideClickClose
            filterData={filterData}
            getFilteredValues={(value) => {
              setFilterData(value);
              setSelectedFilterData(value);
            }}
            handlePageEnd={(searchtext, filter, page = pageNumber, date) => {
              const selected = [];
              filterData[0]?.value?.forEach((item) => {
                if (item.isSelected) {
                  selected.push(item.id);
                }
              });
              setFilterValues((prev) => ({
                ...prev,
                searchvalue: searchtext,
                date,
              }));
              getAllTableData(page, selected, searchtext, date);
            }}
          />
        </Box>
      )}
      {disableModal ? (
        <ModalComponent
          open={disableModal}
          onCloseIconClick={() => handleDisableClose()}
          onClearBtnClick={() => handleDisableClose()}
          ModalTitle="Disable"
          titleClassName="fs-16 color-orange"
          onSaveBtnClick={() => handleDisableSaveClick()}
        >
          <Box className="my-2">
            <TextArea
              onInputChange={(e) => {
                setComment(e.target.value);
              }}
              value={comment}
              error={disableError.text !== ""}
              helperText={disableError.text}
            />
          </Box>
        </ModalComponent>
      ) : null}
    </Paper>
  );
};

export default Active;
