import { Box, Paper, Typography } from "@mui/material";
import TableComponent from "components/atoms/TableComponent";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import ModalComponent from "components/atoms/ModalComponent";
import InputBox from "components/atoms/InputBoxComponent";
import { Star } from "@mui/icons-material";
import validateMessage from "constants/validateMessages";
import toastify from "services/utils/toastUtils";
import {
  getAllCustomerReview,
  reviewReply,
} from "services/supplier/customerreview";
import { useSelector } from "react-redux";
import ButtonComponent from "@/atoms/ButtonComponent";

const CustomerReview = () => {
  const user = useSelector((state) => state.user);
  const [tableRows, setTableRows] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [replyData, setReplyData] = useState({ value: "", id: null });
  const [error, setError] = useState(null);
  const [showReplyModal, setShowReplyModal] = useState({
    show: false,
    id: null,
  });
  const [selectedData, setSelectedData] = useState({});
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
    data.forEach((row, index) => {
      result.push({
        col1: (
          <div>
            {row.profileImageUrl ? (
              <Image src={row.profileImageUrl} height={50} width={50} alt="" />
            ) : null}
          </div>
        ),
        col2: row.skuId,
        col3: row.customerName,
        col4: row.emailId,
        col5: row.mobileNumber,
        col6: (
          <span>
            {row.sellerRatings}
            <Star sx={{ color: "gold", zoom: 0.6 }} />
          </span>
        ),
        col7: (
          <div className="mxh-50 overflow-y-scroll overflow-text">
            {row.customerReview}
          </div>
        ),
        col8: (
          <div className="mxh-50 overflow-y-scroll overflow-text ps-2">
            {row.sellerResponse ? row.sellerResponse : "--"}
          </div>
        ),
        col9: (
          <ButtonComponent
            label="Reply"
            variant="outlined"
            size="small"
            sx={{ fontSize: 8 }}
            className="bg-orange"
            onBtnClick={() => {
              setSelectedData(row);
              setShowReplyModal({
                show: true,
                id: index,
              });
            }}
          />
        ),
      });
    });
    return result;
  };
  const getAllTableData = async () => {
    const { data, err } = await getAllCustomerReview(user.supplierId);
    if (data) {
      setTableData(data);
    } else if (err) {
      setTableData([]);
      toastify(err.response.data.message, "error");
    }
  };
  useEffect(() => {
    getAllTableData();
  }, []);

  useEffect(() => {
    setTableRows(mapRowsToTable(tableData));
  }, [tableData]);

  const handleSubmit = async () => {
    let errMsg = "";
    if (replyData.value.length == 0) {
      errMsg = validateMessage.field_required;
    } else if (replyData.value.length > 255) {
      errMsg = validateMessage.alpha_numeric_max_255;
    }
    setError(errMsg);
    if (errMsg == "") {
      const payload = {
        sellerReviewId: selectedData.sellerReviewsId,
        sellerResponse: replyData.value,
      };
      const { data, err } = await reviewReply(payload);
      if (data) {
        getAllTableData();
        setShowReplyModal({ show: false, id: null });
        setReplyData({ value: "", id: null });
      } else if (err) {
        toastify(err.response.data.message, "error");
      }
    }
  };

  const handleClose = () => {
    setShowReplyModal({ show: false, id: null });
    setReplyData({ value: "", id: null });
    setError(null);
  };

  return (
    <Paper className="mnh-80vh mxh-80vh overflow-auto hide-scrollbar">
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
