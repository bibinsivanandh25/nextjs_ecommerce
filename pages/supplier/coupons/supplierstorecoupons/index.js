/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Grid, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Share } from "@mui/icons-material";
import Image from "next/image";
import toastify from "services/utils/toastUtils";
import { useUserInfo } from "services/hooks";
import CouponLogo from "public/assets/images/Coupon.png";
import {
  getAllStoreCouponsWithFilter,
  publishCoupons,
} from "services/supplier/coupons/supplierstorecoupons";
import ButtonComponent from "@/atoms/ButtonComponent";
import TableComponent from "@/atoms/TableComponent";
import ModalComponent from "@/atoms/ModalComponent";
import SupplierAddCoupons from "@/forms/supplier/coupons/supplieraddcoupons";

const SupplierStoreCoupons = () => {
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
  const [openAddModal, setOpenAddModal] = useState(false);
  const [pageNumber, setpageNumber] = useState(0);
  const [storeCouponId, setStoreCouponId] = useState();
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
      label: "Amount in %",
      id: "col3",
      align: "center",
      data_align: "center",
    },
    {
      label: "Coupon Usage Limit",
      id: "col4",
      align: "center",
      data_align: "center",
    },
    {
      label: "Minimum Purchase Amount",
      id: "col5",
      align: "center",
      data_align: "center",
    },
    {
      label: "Maximum Discount Amount",
      id: "col6",
      align: "center",
      data_align: "center",
    },
    {
      label: "Expire Date",
      id: "col7",
      align: "center",
      data_align: "center",
    },
    {
      label: "Status",
      id: "col8",
      align: "center",
      data_align: "center",
    },
    {
      label: "Action",
      id: "col9",
      align: "center",
      data_align: "center",
    },
  ];

  const getClassnames = (status) => {
    if (status?.toLowerCase() === "published") {
      return "text-success";
    }
    if (status?.toLowerCase().includes("expired")) {
      return "text-danger";
    }
    if (status?.toLowerCase().includes("draft")) {
      return "text-primary";
    }
    return "";
  };
  const mapRowsToTable = (data) => {
    const result = [];
    data.forEach((row) => {
      result.push({
        col1: row.storeCouponCode,
        col2: row.discountType,
        col3: `${row.couponAmount}%`,
        col4: row.couponUsageLimit,
        col5: row.minimumOrderValue,
        col6: row.maximumDiscountValue,
        col7: row.expirationDate,
        col8: (
          <div
            className={`${getClassnames(row.couponStatus)} ${
              row.couponStatus?.toLowerCase().includes("draft") &&
              "cursor-pointer"
            }`}
            onClick={() => {
              if (row.couponStatus?.toLowerCase().includes("draft")) {
                setStoreCouponId(row.storeCouponId);
                setShowPublishModal(true);
              }
            }}
          >
            {row.couponStatus ? row.couponStatus : "DRAFT"}
          </div>
        ),
        col9: (
          <Share
            sx={{
              bgcolor: "#e56700",
              color: "#fff",
              borderRadius: "5px",
              fontSize: "20px",
              padding: "2px",
              cursor: "pointer",
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
    const { data, err } = await getAllStoreCouponsWithFilter(
      pageNumber,
      50,
      id,
      search,
      filter
    );
    if (data.length) {
      setTableRows(mapRowsToTable(data));
    } else {
      setTableRows([]);
    }
    if (err) {
      toastify(err.response.data.message);
    }
  };
  useEffect(() => {
    getTabledata();
  }, []);

  const handlePublish = async () => {
    const { data, err } = await publishCoupons(storeCouponId);
    if (data) {
      toastify(data.message, "success");
      setShowPublishModal(false);
      getTabledata();
    } else if (err) {
      toastify(err.response.data.message, "err");
    }
  };

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
              Supplier Store Coupons
            </Grid>
            <Grid item sx={{ p: 2 }}>
              <ButtonComponent
                variant="contained"
                className="bg-orange"
                size="small"
                label=" Add New Coupon"
                onBtnClick={() => {
                  setOpenAddModal(true);
                }}
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
        </Grid>
      ) : (
        <SupplierAddCoupons
          setOpenAddModal={setOpenAddModal}
          getTabledata={getTabledata}
        />
      )}
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
    </Paper>
  );
};

export default SupplierStoreCoupons;
