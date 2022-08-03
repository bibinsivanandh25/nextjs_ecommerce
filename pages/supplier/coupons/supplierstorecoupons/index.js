/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Grid, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Share } from "@mui/icons-material";
import Image from "next/image";
import CouponLogo from "public/assets/images/Coupon.png";
import ButtonComponent from "@/atoms/ButtonComponent";
import TableComponent from "@/atoms/TableComponent";
import ModalComponent from "@/atoms/ModalComponent";
import SupplierAddCoupons from "@/forms/supplier/coupons/supplieraddcoupons";

const SupplierStoreCoupons = () => {
  const selectTypeList = [
    {
      id: "All",
      label: "All",
    },
    {
      id: "Scratch Card",
      label: "Scratch Card",
    },
    {
      id: "Fixed Product Discount",
      label: "Fixed Product Discount",
    },
  ];
  const [tableRows, setTableRows] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [dropdownFilter, setDropdownFilter] = useState({});
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
      label: "Amount in %",
      id: "col3",
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
  useEffect(() => {
    const rows = [
      {
        couponcode: "#123458",
        discounttype: "Scratch Card",
        expiredate: "12-01-2022, 04:45 AM",
        amount: "4",
        minimumpurchaseamount: "--",
        maxdiscount: "--",
        status: "Expired",
        usagelimit: null,
      },
      {
        couponcode: "#123456",
        discounttype: "Scratch Card",
        expiredate: "12-01-2022, 07:09 AM",
        amount: "4",
        minimumpurchaseamount: "--",
        maxdiscount: "--",
        status: "Published",
        usagelimit: null,
      },
      {
        couponcode: "#123459",
        discounttype: "Fixed Product Discount",
        expiredate: "12-01-2023, 08:43 PM",
        amount: "1",
        minimumpurchaseamount: "--",
        maxdiscount: "--",
        status: "Not Published",
        usagelimit: null,
      },
    ];
    setTableData(rows);
  }, []);
  const getClassnames = (status) => {
    if (status?.toLowerCase() === "published") {
      return "text-success";
    }
    if (status.toLowerCase().includes("expire")) {
      return "text-danger";
    }
    if (status.toLowerCase().includes("not")) {
      return "text-primary";
    }
    return "";
  };
  const mapRowsToTable = (data) => {
    const result = [];
    data.forEach((row) => {
      result.push({
        col1: row.couponcode,
        col2: row.discounttype,
        col3: `${row.amount}%`,
        col4: row.usagelimit || "-",
        col5: row.minimumpurchaseamount,
        col6: row.maxdiscount,
        col7: row.expiredate,
        col8: (
          <div
            className={`${getClassnames(row.status)} ${
              row.status.toLowerCase().includes("not") && "cursor-pointer"
            }`}
            onClick={() => {
              if (row.status.toLowerCase().includes("not")) {
                setShowPublishModal(true);
              }
            }}
          >
            {row.status}
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
  useEffect(() => {
    setTableRows(mapRowsToTable(tableData));
  }, [tableData]);
  const filterByType = React.useCallback(() => {
    if (dropdownFilter && dropdownFilter.id) {
      switch (dropdownFilter?.id) {
        case "Fixed Product Discount":
          setTableRows(
            tableRows?.filter((row) => row.col2 === "Fixed Product Discount")
          );
          break;
        case "Scratch Card":
          setTableRows(tableRows?.filter((row) => row.col2 === "Scratch Card"));
          break;
        default:
          setTableRows(mapRowsToTable(tableData));
      }
    } else {
      setTableRows(mapRowsToTable(tableData));
    }
  }, [dropdownFilter]);

  useEffect(() => {
    filterByType();
  }, [dropdownFilter]);
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
                showSearchFilter={false}
                onCustomDropdownChange={(val) => setDropdownFilter(val)}
                customDropdownValue={dropdownFilter}
                customDropdownLabel="Select Type"
                showSearchbar={false}
                customDropdownList={selectTypeList}
                showCustomDropdownWithSearch
              />
            </Paper>
          </Grid>
        </Grid>
      ) : (
        <SupplierAddCoupons setOpenAddModal={setOpenAddModal} />
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
          onSaveBtnClick={() => setShowPublishModal(false)}
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
