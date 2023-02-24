/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Grid, Paper } from "@mui/material";
import TableComponent from "components/atoms/TableComponent";
import React, { useEffect, useState } from "react";
import ModalComponent from "components/atoms/ModalComponent";
import CouponLogo from "public/assets/images/Coupon.png";
import Image from "next/image";
import ButtonComponent from "components/atoms/ButtonComponent";
import { Share } from "@mui/icons-material";
import toastify from "services/utils/toastUtils";
import { useUserInfo } from "services/hooks";
import {
  getAllCouponsWithFilter,
  publishCoupons,
} from "services/supplier/coupons/mrmrsCartcoupons";
import MrMrsAddNewCoupons from "@/forms/supplier/coupons/mrmrsaddnewcoupons";

const Coupons = () => {
  const selectTypeList = [
    {
      id: "ALL",
      label: "ALL",
      value: "ALL",
    },
    {
      id: "discountType",
      label: "Discount Type",
      value: "DISCOUNT_TYPE",
    },
    {
      id: "status",
      label: "Status",
      value: "STATUS",
    },
    {
      id: "couponCode",
      label: "Coupon Code",
      value: "STORE_COUPON_CODE",
    },
  ];
  const [tableRows, setTableRows] = useState([]);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [pageNumber, setpageNumber] = useState(0);
  const [couponCode, setCouponCode] = useState("");

  const [openAddModal, setOpenAddModal] = useState(false);
  const columns = [
    {
      label: "Coupon Code",
      id: "col1",
      align: "center",
      data_align: "center",
    },
    {
      label: "Discount Type",
      id: "col2",
      align: "center",
      data_align: "center",
    },
    {
      label: "Coupon Amount",
      id: "col3",
      align: "center",
      data_align: "center",
    },
    {
      label: "Coupon Percentage",
      id: "couponPercentage",
      align: "center",
      data_align: "center",
    },
    {
      label: "Usage Limit",
      id: "col4",
      align: "center",
      data_align: "center",
    },
    {
      label: "Expire Date",
      id: "col5",
      align: "center",
      data_align: "center",
    },
    {
      label: "Status",
      id: "col6",
      align: "center",
      data_align: "center",
    },
    {
      label: "Action",
      id: "col7",
      align: "center",
      data_align: "center",
    },
  ];

  const getClassnames = (status) => {
    if (status?.toLowerCase() === "published") {
      return "text-success";
    }
    if (status.toLowerCase().includes("expire")) {
      return "text-danger";
    }
    if (status.toLowerCase().includes("draft")) {
      return "text-primary";
    }
    return "";
  };

  const mapRowsToTable = (data) => {
    const result = [];
    data.forEach((row) => {
      result.push({
        couponId: row.couponId,
        col1: row.couponCode,
        col2: row.discountType,
        col3: row.couponAmount ? `₹ ${row.couponAmount}` : "--",
        couponPercentage: row.percentageValue
          ? `${row.percentageValue} %`
          : "--",
        col4: row.usageLimitPerCoupon || "-",
        col5: row.couponExpiryDate,
        col6: (
          <div
            className={`${getClassnames(row.couponStatus)} ${
              row.couponStatus?.toLowerCase()?.includes("draft") &&
              "cursor-pointer"
            }`}
            onClick={() => {
              if (row.couponStatus?.toLowerCase()?.includes("draft")) {
                setCouponCode(row.couponId);
                setShowPublishModal(true);
              }
            }}
          >
            {row.couponStatus}
          </div>
        ),
        col7: (
          <Share
            sx={{
              bgcolor: "#e56700",
              color: "#fff",
              borderRadius: "5px",
              fontSize: "20px",
              padding: "2px",
              cursor: "pointer",
            }}
            onClick={() => {
              navigator.clipboard.writeText(row.couponCode);
              toastify("Coupon Code Copied Successfully!", "success");
            }}
          />
        ),
      });
    });
    return result;
  };
  const { id } = useUserInfo();

  const getTabledata = async (searchText, filterText) => {
    const search = searchText || null;
    const filter =
      filterText === "All" ? filterText.toUpperCase() : filterText || "ALL";
    const { data, err } = await getAllCouponsWithFilter(
      pageNumber,
      50,
      id,
      search,
      filter
    );
    if (data && data.length) {
      setTableRows(mapRowsToTable(data));
    } else {
      setTableRows([]);
    }
    if (err) {
      toastify(err.response.data.message);
    }
  };
  const handlePublish = async () => {
    const { data, err } = await publishCoupons(id, couponCode);
    if (data) {
      toastify(data.message, "success");
      setShowPublishModal(false);
      getTabledata();
    } else if (err) {
      toastify(err.response.data.message, "error");
    }
  };

  useEffect(() => {
    getTabledata();
  }, []);

  // useEffect(() => {
  //   setTableRows(mapRowsToTable(tableData));
  // }, [tableData]);

  return (
    <Paper className="mnh-80vh overflow-auto hide-scrollbar">
      {!openAddModal ? (
        <Grid container>
          <Grid
            container
            item
            xs={12}
            justifyContent="space-between"
            className="border-bottom"
          >
            <Grid item sx={{ p: 2 }} className="fs-16 fw-bold px-3">
              Coupon Listing
            </Grid>
            <Grid item sx={{ p: 2 }}>
              <ButtonComponent
                variant="contained"
                className="bg-orange"
                size="small"
                label=" Add New Coupon"
                onBtnClick={() => setOpenAddModal(true)}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ my: 5, px: 2 }}>
            <Paper>
              <TableComponent
                table_heading=""
                columns={columns}
                tableRows={tableRows}
                showCheckbox={false}
                showSearchFilter
                showCustomDropdown={false}
                showSearchbar
                showCustomDropdownWithSearch={false}
                filterList={[...selectTypeList]}
                handlePageEnd={(searchText, filterText) => {
                  getTabledata(searchText, filterText);
                }}
                handleRowsPerPageChange={() => {
                  setpageNumber(0);
                }}
              />
            </Paper>
          </Grid>
          {showPublishModal && (
            <ModalComponent
              showClearBtn={false}
              open={showPublishModal}
              ModalTitle=""
              saveBtnText="Publish Coupon"
              ModalWidth={600}
              headerClassName="border-0"
              onCloseIconClick={() => setShowPublishModal(false)}
              onSaveBtnClick={() => handlePublish()}
              footerClassName="m-2 align-center"
            >
              <div className="d-flex flex-column justify-content-center align-items-center my-2">
                <Image src={CouponLogo} height={200} width={300} />
              </div>
            </ModalComponent>
          )}
        </Grid>
      ) : (
        <MrMrsAddNewCoupons
          setOpenAddModal={setOpenAddModal}
          getTableData={getTabledata}
        />
      )}
    </Paper>
  );
};

export default Coupons;
