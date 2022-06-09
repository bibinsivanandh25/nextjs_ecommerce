import { Box, Button, Paper, Typography } from "@mui/material";
import TableComponent from "components/atoms/TableComponent";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "public/assets/logo.jpeg";
import ModalComponent from "components/atoms/ModalComponent";
import InputBox from "components/atoms/InputBoxComponent";
import { maxLengthValidator } from "services/validationUtils";
import { Star } from "@mui/icons-material";

const CustomerReview = () => {
  const [tableRows, setTableRows] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [replyData, setReplyData] = useState({ value: "", id: null });
  const [error, setError] = useState(null);
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
      data_classname: "mxw-200",
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
            <Image src={logo} height={50} width={50} alt="" />
            <Typography fontSize={10} pl={1}>
              {row.productId}
            </Typography>
          </div>
        ),
        col2: row.skuid,
        col3: row.name,
        col4: row.email,
        col5: row.mobileno,
        col6: (
          <span>
            {row.ratings}
            <Star sx={{ color: "gold", zoom: 0.6 }} />
          </span>
        ),
        col7: (
          <div className="mxh-50 overflow-y-scroll overflow-text">
            {row.questions}
          </div>
        ),
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
        email: "tom@gmail.com",
        name: "Tom",
        mobileno: "9988293842",
        ratings: "4.5",
        questions:
          "lorem It is a long established fact that a reader will be distracted by the ",
        supplierreply: "PRODUCT LIVE",
      },
      {
        productId: "#123456",
        skuid: "123456",
        email: "jerry@gmail.com",
        name: "Jerry",
        mobileno: "9988293840",
        ratings: "5",
        questions:
          "lorem It is a long established fact that a reader will be distracted by the ",
        supplierreply:
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
      },
      {
        productId: "#123459",
        skuid: "123423",
        email: "jessy@gmail.com",
        name: "Jessy",
        mobileno: "9988293849",
        ratings: "3",
        questions:
          "lorem It is a long established fact that a reader will be distracted by the ",
        supplierreply:
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
      },
    ];
    setTableData(rows);
  }, []);

  useEffect(() => {
    setTableRows(mapRowsToTable(tableData));
  }, [tableData]);

  const handleSubmit = () => {
    const errMsg = maxLengthValidator(replyData.value, 255);
    setError(errMsg);
    if (!errMsg) {
      setShowReplyModal({ show: false, id: null });
      console.log(replyData);
      setReplyData({ value: "", id: null });
    }
  };

  const handleClose = () => {
    setShowReplyModal({ show: false, id: null });
    setReplyData({ value: "", id: null });
    setError(null);
  };

  return (
    <Paper sx={{ height: "100%" }}>
      <Typography
        variant="h6"
        fontWeight="bold"
        borderBottom="1px solid lightgray"
        py={2}
        px={4}
        fontSize={16}
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
          onCloseIconClick={handleClose}
          onSaveBtnClick={handleClose}
          onClearBtnClick={handleSubmit}
          open={showReplyModal.show}
          ModalWidth={500}
          footerClassName="align-center m-3"
          ClearBtnText="Submit"
          saveBtnText="Cancel"
          clearBtnClassName="mnw-150"
          saveBtnClassName="mnw-150"
          clearBtnVariant="contained"
          saveBtnVariant="outlined"
        >
          <Box mx={2} mt={2}>
            <InputBox
              label="Reply"
              isMultiline
              inputlabelshrink
              onInputChange={(e) =>
                setReplyData({ value: e.target.value, id: showReplyModal.id })
              }
              value={replyData?.value}
              error={Boolean(error)}
              helperText={error}
            />
          </Box>
        </ModalComponent>
      )}
    </Paper>
  );
};

export default CustomerReview;
