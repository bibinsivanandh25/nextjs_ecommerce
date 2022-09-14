import { Box, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomIcon from "services/iconUtils";
import ButtonComponent from "@/atoms/ButtonComponent";
import TableComponent from "@/atoms/TableComponent";
import MenuOption from "@/atoms/MenuOptions";
import ViewBounceBack from "@/forms/admin/payments&subscriptions/paymenthistorysuppliers/viewbounceback";

const PaymentHistorySuppliers = () => {
  const [tableRows, setTableRows] = useState([]);
  const [showViewBounceBack, setshowViewBounceBack] = useState(false);
  const tableColums = [
    {
      id: "col1",
      align: "center",
      label: "S.No.",
      data_align: "center",
    },
    {
      id: "col2",
      align: "center",
      label: "Payment Date",
      data_align: "center",
    },
    {
      id: "col3",
      align: "center",
      label: "Total Orders",
      data_align: "center",
    },
    {
      id: "col4",
      align: "center",
      label: "Zero Comission",
      data_align: "center",
    },
    {
      id: "col5",
      align: "center",
      label: "Fixed Comission",
      data_align: "center",
    },
    {
      id: "col6",
      align: "center",
      label: "Total Sales Value",
      data_align: "center",
    },
    {
      id: "col7",
      align: "center",
      label: "Total Supplier",
      data_align: "center",
    },
    {
      id: "col8",
      align: "center",
      label: "Total Payable Amount",
      data_align: "center",
    },
    {
      id: "col9",
      align: "center",
      label: "Status",
      data_align: "center",
    },
    {
      id: "col10",
      align: "center",
      label: "Actions",
      data_align: "center",
    },
  ];

  const rowsForTable = [
    {
      id: 1,
      col1: 1,
      col2: "15/10/2021",
      col3: 438,
      col4: 252,
      col5: 252,
      col6: 5678,
      col7: 252,
      col8: 5678,
      col9: {
        status: "Pending",
        total: 438,
        left: 5,
      },
      col10: "Action",
    },
  ];

  const onClickOfMenuItem = () => {};
  const options = ["Notify", "Add Note"];

  const getTableRows = () => {
    const result = [];
    rowsForTable.forEach((val, index) => {
      result.push({
        id: index + 1,
        col1: val.col1,
        col2: val.col2,
        col3: (
          <Typography className="color-blue h-5 text-decoration-underline cursor-pointer">
            {val.col3}
          </Typography>
        ),
        col4: (
          <Typography className="color-blue h-5 text-decoration-underline cursor-pointer">
            {val.col4}
          </Typography>
        ),
        col5: (
          <Typography className="color-blue h-5 text-decoration-underline cursor-pointer">
            {val.col5}
          </Typography>
        ),
        col6: val.col6,
        col7: (
          <Typography className="color-blue h-5 text-decoration-underline cursor-pointer">
            {val.col7}
          </Typography>
        ),
        col8: val.col8,
        col9: (
          <Box>
            {" "}
            <Typography className="h-5">{val.col9.status}</Typography>
            <Typography className="h-5 color-blue text-decoration-underline cursor-pointer">
              {val.col9.left}/{val.col9.total}
            </Typography>
          </Box>
        ),
        col10: (
          <Box className="d-flex justify-content-evenly align-items-center">
            <CustomIcon
              type="view"
              className="h-4"
              //   onIconClick={() => setShowViewProducts(true)}
            />
            <MenuOption
              getSelectedItem={(ele) => {
                // console.log("Index", index);
                // console.log("ele ", typeof ele);
                onClickOfMenuItem(ele, index);
              }}
              options={options}
              IconclassName="h-4 color-gray"
            />
          </Box>
        ),
      });
    });

    setTableRows(result);
  };

  useEffect(() => {
    getTableRows();
  }, []);

  return (
    <Box>
      {!showViewBounceBack ? (
        <Paper className="mnh-85vh mxh-85vh p-3 overflow-auto hide-scrollbar">
          <Paper>
            <Paper className="p-3 d-flex justify-content-between align-items-center">
              <Typography className="color-orange fw-bold">
                Bounce Back - 5
              </Typography>
              <ButtonComponent
                onBtnClick={() => {
                  setshowViewBounceBack(true);
                }}
                label="View"
              />
            </Paper>
          </Paper>
          <Paper className="mt-5">
            <TableComponent
              table_heading="Payment Settled History - Supplier's"
              columns={tableColums}
              tableRows={tableRows}
              tHeadBgColor="bg-light-gray"
              showPagination={false}
              showSearchFilter={false}
              showSearchbar={false}
              showCheckbox={false}
              showDateFilter
            />
          </Paper>
        </Paper>
      ) : (
        <ViewBounceBack setshowViewBounceBack={setshowViewBounceBack} />
      )}
    </Box>
  );
};

export default PaymentHistorySuppliers;
