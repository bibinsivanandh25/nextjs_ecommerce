import { Box, Button, Paper, Typography } from "@mui/material";
import TableComponent from "components/atoms/TableComponent";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "public/assets/logo.jpeg";
import ModalComponent from "components/atoms/ModalComponent";
import InputBox from "components/atoms/InputBoxComponent";

const CustomerReview = () => {
  const [tableRows, setTableRows] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [showReplyModal, setShowReplyModal] = useState({
    show: false,
    id: null,
  });
  const columns = [
    {
      label: "Image",
      id: "col1",
    },
    {
      label: "SKU ID",
      id: "col2",
    },
    {
      label: "Name",
      id: "col3",
    },
    {
      label: "E - mail",
      id: "col4",
    },
    {
      label: "Mobile No",
      id: "col5",
    },
    {
      label: "Ratings",
      id: "col6",
    },
    {
      label: "Questions",
      id: "col7",
    },
    {
      label: "Supplier Reply",
      id: "col8",
      data_classname: "mxw-200",
    },
    {
      label: "",
      id: "col9",
    },
  ];

  const mapRowsToTable = (data) => {
    const result = [];
    data.forEach((row) => {
      result.push({
        col1: (
          <div>
            <Image src={logo} height={50} width={50} />
            <Typography fontSize={10} pl={1}>
              {row.productId}
            </Typography>
          </div>
        ),
        col2: row.skuid,
        col3: row.name,
        col4: row.email,
        col5: row.mobileno,
        col6: row.ratings,
        col7: row.questions,
        col8: (
          <div className="mxh-50 overflow-y-scroll overflow-text">
            {row.supplierreply}
          </div>
        ),
        col9: (
          <Button
            variant="contained"
            size="small"
            sx={{ fontSize: 8 }}
            className="bg-orange"
            onClick={() => {
              setShowReplyModal({
                show: true,
                id: row.productId,
              });
            }}
          >
            Reply
          </Button>
        ),
      });
    });
    return result;
  };

  useEffect(() => {
    const rows = [
      {
        productId: "#123458",
        skuid: "123456",
        email: "12-01-2022",
        name: "UK24",
        mobileno: "200gm",
        ratings: "23-01-2022",
        questions: "4",
        supplierreply: "PRODUCT LIVE",
      },
      {
        productId: "#123456",
        skuid: "123456",
        email: "12-01-2022",
        name: "UK24",
        mobileno: "200gm",
        ratings: "23-01-2022",
        questions: "4",
        supplierreply:
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
      },
      {
        productId: "#123459",
        skuid: "123423",
        email: "12-01-2023",
        name: "UK22",
        mobileno: "300gm",
        ratings: "23-01-2022",
        questions: "1",
        supplierreply:
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
      },
      {
        productId: "#123458",
        skuid: "123456",
        email: "12-01-2022",
        name: "UK24",
        mobileno: "200gm",
        ratings: "23-01-2022",
        questions: "4",
        supplierreply: "PRODUCT LIVE",
      },
      {
        productId: "#123456",
        skuid: "123456",
        email: "12-01-2022",
        name: "UK24",
        mobileno: "200gm",
        ratings: "23-01-2022",
        questions: "4",
        supplierreply:
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
      },
      {
        productId: "#123459",
        skuid: "123423",
        email: "12-01-2023",
        name: "UK22",
        mobileno: "300gm",
        ratings: "23-01-2022",
        questions: "1",
        supplierreply:
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
      },
      {
        productId: "#123458",
        skuid: "123456",
        email: "12-01-2022",
        name: "UK24",
        mobileno: "200gm",
        ratings: "23-01-2022",
        questions: "4",
        supplierreply: "PRODUCT LIVE",
      },
      {
        productId: "#123456",
        skuid: "123456",
        email: "12-01-2022",
        name: "UK24",
        mobileno: "200gm",
        ratings: "23-01-2022",
        questions: "4",
        supplierreply:
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
      },
      {
        productId: "#123459",
        skuid: "123423",
        email: "12-01-2023",
        name: "UK22",
        mobileno: "300gm",
        ratings: "23-01-2022",
        questions: "1",
        supplierreply:
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
      },
    ];
    setTableData(rows);
  }, []);

  useEffect(() => {
    setTableRows(mapRowsToTable(tableData));
  }, [tableData]);

  return (
    <Paper sx={{ height: "100%" }}>
      <Typography
        variant="h6"
        fontWeight="bold"
        borderBottom="1px solid lightgray"
        py={2}
        px={4}
      >
        Customer Review
      </Typography>
      <Box p={2}>
        <Paper sx={{ px: 0, py: 2 }}>
          <TableComponent
            table_heading={`${tableRows.length} Reviews`}
            columns={columns}
            tableRows={tableRows}
            showCheckbox={false}
            showSearchFilter={false}
            searchBarSizeMd={4}
            tableMaxHeight="none"
          />
        </Paper>
      </Box>
      {showReplyModal.show && (
        <ModalComponent
          ModalTitle="Reply Customer Review"
          onCloseIconClick={() => setShowReplyModal({ show: false, id: null })}
          onClearBtnClick={() => setShowReplyModal({ show: false, id: null })}
        >
          <InputBox label="Reply" />
        </ModalComponent>
      )}
    </Paper>
  );
};

export default CustomerReview;
