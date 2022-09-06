import React, { useEffect, useState } from "react";
import ModalComponent from "@/atoms/ModalComponent";
import TableComponent from "@/atoms/TableComponent";

const ViewModal = ({ openViewModal, setOpenViewModal }) => {
  const [tableRows, setTableRows] = useState([]);

  const tableColums = [
    {
      id: "col1",
      align: "center",
      label: "S.NO.",
      data_align: "center",
      position: "sticky",
      minWidth: 150,
      data_classname: "",
    },
    {
      id: "col2",
      align: "center",
      label: "Date",
      data_align: "center",
      position: "sticky",
      minWidth: 150,
      data_classname: "",
    },
    {
      id: "col3",
      align: "center",
      label: "Order ID",
      data_align: "center",
      minWidth: 150,
      data_classname: "",
    },
    {
      id: "col4",
      align: "center",
      label: "Weight/Volume",
      data_align: "center",
      minWidth: 150,
      data_classname: "",
    },
    {
      id: "col5",
      align: "center",
      label: "Delivery Type",
      data_align: "center",
      minWidth: 150,
      data_classname: "",
    },
    {
      id: "col6",
      align: "center",
      label: "Delivery Mode",
      data_align: "center",
      minWidth: 150,
      data_classname: "",
    },
    {
      id: "col7",
      align: "center",
      label: "Delivery Charge",
      data_align: "center",
      minWidth: 150,
      data_classname: "",
    },
    {
      id: "col8",
      align: "center",
      label: "Logistic Partner",
      data_align: "center",
      minWidth: 150,
      data_classname: "",
    },
    {
      id: "col9",
      align: "center",
      label: "Transaction Status",
      data_align: "center",
      minWidth: 150,
      data_classname: "",
    },
    {
      id: "col10",
      align: "center",
      label: "Reason",
      data_align: "center",
      minWidth: 150,
      position: "sticky",
      data_classname: "",
    },
  ];

  const rowsForTable = [
    {
      id: 1,
      col1: "--",
      col2: "--",
      col3: "--",
      col4: "--",
      col5: "--",
      col6: "--",
      col7: "--",
      col8: "--",
      col9: "--",
      col10: "--",
    },
  ];

  const getTableRows = () => {
    const result = [];
    rowsForTable.forEach((val, index) => {
      result.push({
        id: index + 1,
        col1: val.col1,
        col2: val.col2,
        col3: val.col3,
        col4: val.col4,
        col5: val.col5,
        col6: val.col6,
        col7: val.col7,
        col8: val.col8,
        col9: val.col9,
        col10: val.col10,
      });
    });

    setTableRows(result);
  };

  useEffect(() => {
    getTableRows();
  });

  return (
    <ModalComponent
      open={openViewModal}
      onCloseIconClick={() => {
        setOpenViewModal(false);
      }}
      showFooter={false}
      ModalTitle="View"
      titleClassName="fw-bold fs-14 color-orange"
      ModalWidth={1000}
      minHeightClassName="mnh-75vh mxh-75vh overflow-auto hide-scrollbar"
    >
      <TableComponent
        columns={[...tableColums]}
        tableRows={tableRows}
        tHeadBgColor="bg-light-gray"
        showPagination={false}
        showSearchFilter={false}
        showSearchbar={false}
        showCheckbox={false}
        stickyHeader
      />
    </ModalComponent>
  );
};

export default ViewModal;
