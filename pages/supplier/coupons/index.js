import { Button, Grid, Paper } from "@mui/material";
import TableComponent from "components/atoms/TableComponent";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ModalComponent from "components/atoms/ModalComponent";
import CouponLogo from "public/assets/images/Coupon.png";
import Image from "next/image";

const Coupons = () => {
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
  const router = useRouter();
  const [tableRows, setTableRows] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [dropdownFilter, setDropdownFilter] = useState({});
  const columns = [
    {
      label: "Coupon Code",
      id: "col1",
    },
    {
      label: "Discount Type",
      id: "col2",
    },
    {
      label: "Amount in %",
      id: "col3",
    },
    {
      label: "Usage Limit",
      id: "col4",
    },
    {
      label: "Expire Date",
      id: "col5",
    },
    {
      label: "Status",
      id: "col6",
    },
  ];

  const getClassnames = (status) => {
    if (status?.toLowerCase() === "published") {
      return "text-success";
    } else if (status.toLowerCase().includes("expire")) {
      return "text-danger";
    } else if (status.toLowerCase().includes("not")) {
      return "text-primary";
    }
    return "";
  };

  const filterByType = React.useCallback(() => {
    if (dropdownFilter && dropdownFilter.id) {
      switch (dropdownFilter?.id) {
        case "Fixed Product Discount":
          setTableRows(
            tableRows?.filter((row) => row["col2"] === "Fixed Product Discount")
          );
          break;
        case "Scratch Card":
          setTableRows(
            tableRows?.filter((row) => row["col2"] === "Scratch Card")
          );
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

  const mapRowsToTable = (data) => {
    const result = [];
    data.forEach((row) => {
      result.push({
        col1: row.couponcode,
        col2: row.discounttype,
        col3: row.amount + "%",
        col4: row.usagelimit || "-",
        col5: row.expiredate,
        col6: (
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
      });
    });
    return result;
  };

  useEffect(() => {
    const rows = [
      {
        couponcode: "#123458",
        discounttype: "Scratch Card",
        expiredate: "12-01-2022, 04:45 AM",
        amount: "4",
        status: "Expired",
        usagelimit: null,
      },
      {
        couponcode: "#123456",
        discounttype: "Scratch Card",
        expiredate: "12-01-2022, 07:09 AM",
        amount: "4",
        status: "Published",
        usagelimit: null,
      },
      {
        couponcode: "#123459",
        discounttype: "Fixed Product Discount",
        expiredate: "12-01-2023, 08:43 PM",
        amount: "1",
        status: "Not Published",
        usagelimit: null,
      },
    ];
    setTableData(rows);
  }, []);

  useEffect(() => {
    setTableRows(mapRowsToTable(tableData));
  }, [tableData]);

  return (
    <Paper>
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
            <Button
              variant="contained"
              className="bg-orange"
              size="small"
              onClick={() => router.push("/supplier/coupons/addnewcoupons")}
            >
              Add New Coupon
            </Button>
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
      </Grid>
    </Paper>
  );
};

export default Coupons;
