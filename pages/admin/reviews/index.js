/* eslint-disable no-use-before-define */
import { Box, Grid, Paper, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import CustomIcon from "services/iconUtils";
import StarRatingComponentReceivingRating from "@/atoms/StarRatingComponentReceiving";
import MenuOption from "@/atoms/MenuOptions";
import TableComponent from "@/atoms/TableComponent";
import {
  approvedReview,
  deleteReview,
  getAllReview,
  getViewData,
} from "services/admin/review";
import toastify from "services/utils/toastUtils";

import ModalComponent from "@/atoms/ModalComponent";
import { format } from "date-fns";
// import {  } from "react";

const columns = [
  {
    id: "col1",
    align: "center",
    label: "Customer/Reseller ID with Name",
    data_align: "center",
  },
  {
    id: "col2",
    align: "center",
    label: "Email",
    data_align: "center",
  },
  {
    id: "col3",
    align: "center",
    label: "Mobile",
    data_align: "center",
  },
  {
    id: "col4",
    align: "center",
    label: "Product Image",
    data_align: "center",
  },
  {
    id: "col5",
    align: "center",
    label: "Product ID",
    data_align: "center",
  },
  {
    id: "col6",
    align: "center",
    label: "Rating",
    data_align: "center",
    minWidth: "140px",
  },
  {
    id: "col7",
    align: "center",
    label: "Comments",
    data_align: "center",
  },
  {
    id: "col8",
    align: "center",
    label: "Supplier ID",
    data_align: "center",
  },
  {
    id: "col9",
    align: "center",
    label: "Review Date & Time",
    data_align: "center",
  },
  {
    id: "col10",
    align: "center",
    label: "Status",
    data_align: "center",
  },
  {
    id: "col11",
    align: "center",
    label: "Action",
    data_align: "center",
  },
];

const Reviews = () => {
  const [filterState, setfilterState] = useState({
    searchKey: "",
    pageSize: 50,
    pageCount: 0,
    fromDate: "",
    toDate: "",
  });
  const [isView, setisView] = useState(false);
  const [reviewData, setreviewData] = useState([]);
  const [viewDetailsState, setviewDetailsState] = useState({});
  const getViewReview = async (id) => {
    const { data, err } = await getViewData(id);
    if (data) {
      setviewDetailsState(data.data);
      setisView(true);
    } else if (err) {
      toastify(err.response.data.message, "error");
    }
  };

  const reviewDataFormat = (key, value, valueClassname) => {
    return (
      <Grid container item md={12} className="">
        <Grid item md={4} xs={4} className="fw-500 fs-14">
          {key}
        </Grid>
        <Grid item md={0.5} xs={0.5}>
          :
        </Grid>
        <Grid item md={7.5} xs={7.5} className={`fs-14 ${valueClassname}`}>
          {value}
        </Grid>
      </Grid>
    );
  };

  useEffect(() => {
    getAllReviewFunction(0);
  }, [filterState.toDate, filterState.searchKey]);
  useEffect(() => {
    getAllReviewFunction();
  }, [filterState.pageCount]);
  const ApprovalFunction = async (isApploved, reviewId) => {
    const { data, err } = await approvedReview(isApploved, reviewId);
    if (data) {
      toastify(data.message, "success");
      getAllReviewFunction();
    } else if (err) {
      toastify(err.response.data.message, "error");
    }
  };
  const deleteReviewFunction = async (reviewId) => {
    const { data, err } = await deleteReview(reviewId);
    if (data) {
      toastify(data.message, "success");
      getAllReviewFunction();
    } else if (err) {
      toastify(err.response.data.message, "error");
    }
  };
  const reviewTableData = (data) => {
    const result = [];
    data.forEach((row, index) => {
      result.push({
        id: index,
        col1: row?.customerId,
        col2: row?.emailId,
        col3: row?.mobileNumber,
        col4: <Image src={row?.productMediaUrl} height={50} width={50} />,
        col5: new Date(row.reviewDateTime).toLocaleString(),
        col6: (
          <StarRatingComponentReceivingRating
            className="h-5"
            rating={row?.customerRatings}
          />
        ),
        col7: row?.writtenReview,
        col8: (
          <>
            <Typography className="fs-12">{row?.supplierId}</Typography>
            <Typography className="fs-12">{row?.bussinessName}</Typography>
          </>
        ),
        col9: `${format(new Date(row?.reviewDateTime), "MM-dd-yyyy")} 00:00:00`,
        col10: row?.status,
        col11: (
          <Box className="d-flex align-items-center justify-content-around">
            <CustomIcon
              onIconClick={() => {
                ApprovalFunction("true", row?.reviewId);
              }}
              type="doneIcon"
              showColorOnHover={false}
              className="p-1 bg-success color-white rounded"
            />
            <CustomIcon
              onIconClick={() => {
                ApprovalFunction("false", row?.reviewId);
              }}
              type="close"
              showColorOnHover={false}
              className="p-1 bg-danger color-white rounded ms-2"
            />
            <MenuOption
              getSelectedItem={(ele) => {
                if (ele == "Delete") {
                  deleteReviewFunction(row?.reviewId);
                } else if (ele == "view") {
                  getViewReview(row?.reviewId);
                }
                // onClickOfMenuItem(ele);
              }}
              options={["view", "Edit", "Delete"]}
              IconclassName="color-gray"
            />
          </Box>
        ),
      });
    });
    return result;
  };
  const getAllReviewFunction = async (payload = filterState) => {
    const { data, err } = await getAllReview(payload);
    if (data) {
      setreviewData(reviewTableData(data.data));
    } else if (err) {
      console.log(err?.response?.data?.message);
      setreviewData({});
    }
  };
  // const rows = [
  //   {
  //     id: 1,
  //     col1: "#C8372493 – Raja Raman",
  //     col2: "Home Page",
  //     col3: "1232131232",
  //     col4: (
  //       <Image
  //         src="https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/ecommerceBanner.jpg"
  //         height={50}
  //         width={50}
  //       />
  //     ),
  //     col5: "---",
  //     col6: <StarRatingComponentReceivingRating className="h-5" rating={3} />,
  //     col7: "Show any text added by customer or reseller",
  //     col8: "#S827342 MS fahion",
  //     col9: "23/06/2022 - 10.54",
  //     col10: "Published",
  //     col11: (
  //       <Box className="d-flex align-items-center justify-content-around">
  //         <CustomIcon
  //           onIconClick={() => {
  //             ApprovalFunction("true", "64087be519e48849706df010");
  //           }}
  //           type="doneIcon"
  //           showColorOnHover={false}
  //           className="p-1 bg-success color-white rounded"
  //         />
  //         <CustomIcon
  //           onIconClick={() => {
  //             ApprovalFunction("false", "64087be519e48849706df010");
  //           }}
  //           type="close"
  //           showColorOnHover={false}
  //           className="p-1 bg-danger color-white rounded ms-2"
  //         />
  //         <MenuOption
  //           getSelectedItem={(ele) => {
  //             if (ele == "Delete") {
  //               deleteReviewFunction("64087be519e48849706df010");
  //             } else if (ele == "view") {
  //               getViewReview("640ae00d3ba17b1dd6f0789d");
  //             }
  //             console.log(ele);
  //             // onClickOfMenuItem(ele);
  //           }}
  //           options={["view", "Edit", "Delete"]}
  //           IconclassName="color-gray"
  //         />
  //       </Box>
  //     ),
  //   },
  // ];

  return (
    <Paper className="p-3 mnh-85vh mxh-85vh overflow-auto hide-scrollbar">
      <TableComponent
        columns={columns}
        tHeadBgColor="bg-light-gray"
        // showPagination={false}
        tableRows={reviewData}
        table_heading="Reviews"
        showDateFilter
        showSearchbar
        handlePageEnd={(searchText, _, page, dates) => {
          setfilterState({
            searchKey: searchText,
            pageCount: page,
            fromDate: dates.fromDate,
            toDate: dates.toDate,
            pageSize: 50,
          });
          getAllReviewFunction({
            searchKey: searchText,
            pageCount: page,
            fromDate: dates.fromDate,
            toDate: dates.toDate,
            pageSize: 50,
          });
        }}
        handleChangePage={() => {
          setfilterState({
            ...filterState,
            pageCount: filterState.pageCount + 1,
          });
        }}
      />
      {isView && (
        <ModalComponent
          ModalTitle="Review Details"
          open={isView}
          onCloseIconClick={() => {
            setisView(false);
          }}
          showFooter={false}
        >
          <Grid className="p-2">
            {reviewDataFormat(
              "Customer Id",
              viewDetailsState.customerOrResellerId
            )}
            {reviewDataFormat("Customer Name", viewDetailsState.reviewerName)}
            {reviewDataFormat(
              "Product Id",
              viewDetailsState.productVariationId
            )}
            {reviewDataFormat(
              "Status",
              viewDetailsState.reviewStatus.toLowerCase(),
              "text-capitalize"
            )}
            {reviewDataFormat("Comments", viewDetailsState.comments)}
            {reviewDataFormat("Supplier Id", viewDetailsState.supplierId)}
            {reviewDataFormat("Business Name", viewDetailsState.bussinessName)}
            {reviewDataFormat(
              "Rating",
              <StarRatingComponentReceivingRating
                className="h-5"
                rating={viewDetailsState.ratings}
                fontSize="medium"
              />
            )}
            {reviewDataFormat(
              "Product Images",
              <Box display="flex">
                {viewDetailsState.productImages.map((img) => {
                  return (
                    <Box style={{ marginRight: 5 }}>
                      <Image height={50} width={50} src={img} />
                    </Box>
                  );
                })}
              </Box>
            )}
          </Grid>
        </ModalComponent>
      )}
    </Paper>
  );
};

export default Reviews;
