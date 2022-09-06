import { Box, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomIcon from "services/iconUtils";
import TableComponent from "@/atoms/TableComponent";
import SwitchComponent from "@/atoms/SwitchComponent";
import CheckBoxComponent from "@/atoms/CheckboxComponent";
import AddDaysCounterModal from "./AddDaysCounterModal";
import CreateDiscountModal from "./CreateDiscountModal";

const ResellerSubscriptions = () => {
  const [resellerSubscriptionsTableOne, setResellerSubscriptionsTableOne] =
    useState([]);
  const [resellerSubscriptionsTableTwo, setResellerSubscriptionsTableTwo] =
    useState([]);

  const [individualPricingTableRows, setIndividualPricingTableRows] = useState(
    []
  );
  const [toolsCampaignTableRows, setToolsCampaignTableRows] = useState([]);

  const [openAddDaysCounterModal, setOpenAddDaysCounterModal] = useState(false);
  const [openCreateDiscountModal, setOpenCreateDiscountModal] = useState(false);

  const tableColumsForResellerSubscriptionsTableOne = [
    {
      id: "col1",
      align: "center",
      label: "Discount Coupon",
      data_align: "center",
    },
    {
      id: "col2",
      align: "center",
      label: "Today's Deal",
      data_align: "center",
    },
    {
      id: "col3",
      align: "center",
      label: "Spin Wheel",
      data_align: "center",
    },
    {
      id: "col4",
      align: "center",
      label: "Scratch Card",
      data_align: "center",
    },
    {
      id: "col5",
      align: "center",
      label: "Quiz",
      data_align: "center",
    },
    {
      id: "col6",
      align: "center",
      label: "Price Targeted",
      data_align: "center",
    },
  ];

  const tableColumsForResellerSubscriptionsTableTwo = [
    {
      id: "col1",
      align: "center",
      label: "Active",
      data_align: "center",
    },
    {
      id: "col2",
      align: "center",
      label: "Inactive",
      data_align: "center",
    },
    {
      id: "col3",
      align: "center",
      label: "Active",
      data_align: "center",
    },
    {
      id: "col4",
      align: "center",
      label: "Inactive",
      data_align: "center",
    },
    {
      id: "col5",
      align: "center",
      label: "Active",
      data_align: "center",
    },
    {
      id: "col6",
      align: "center",
      label: "Inactive",
      data_align: "center",
    },
    {
      id: "col7",
      align: "center",
      label: "Active",
      data_align: "center",
    },
    {
      id: "col8",
      align: "center",
      label: "Inactive",
      data_align: "center",
    },
    {
      id: "col9",
      align: "center",
      label: "Active",
      data_align: "center",
    },
    {
      id: "col10",
      align: "center",
      label: "Inactive",
      data_align: "center",
    },
  ];

  const tableColumsForIndividualPricing = [
    {
      id: "col1",
      align: "center",
      label: "Tools / Days",
      data_align: "center",
      position: "sticky",
      minWidth: 200,
    },
    {
      id: "col2",
      align: "center",
      label: "Discount Coupon",
      data_align: "center",
      minWidth: 200,
    },
    {
      id: "col3",
      align: "center",
      label: "Today's Deal",
      data_align: "center",
      minWidth: 200,
    },
    {
      id: "col4",
      align: "center",
      label: "Spin Wheel",
      data_align: "center",
      minWidth: 200,
    },
    {
      id: "col5",
      align: "center",
      label: "Scratch Card",
      data_align: "center",
      minWidth: 200,
    },
    {
      id: "col6",
      align: "center",
      label: "Lucky Draw",
      data_align: "center",
      minWidth: 200,
    },
    {
      id: "col7",
      align: "center",
      label: "Actions",
      data_align: "center",
      minWidth: 200,
      position: "sticky",
    },
  ];

  const tableColumsForToolsCampaign = [
    {
      id: "col1",
      align: "center",
      label: "S.No.",
      data_align: "center",
      position: "sticky",
      minWidth: 150,
    },
    {
      id: "col2",
      align: "center",
      label: "Tools / Days",
      data_align: "center",
      minWidth: 150,
      position: "sticky",
    },
    {
      id: "col3",
      align: "center",
      label: "Discount Coupon",
      data_align: "center",
      minWidth: 150,
    },
    {
      id: "col4",
      align: "center",
      label: "Today's Deal",
      data_align: "center",
      minWidth: 150,
    },
    {
      id: "col5",
      align: "center",
      label: "Spin Wheel",
      data_align: "center",
      minWidth: 150,
    },
    {
      id: "col6",
      align: "center",
      label: "Scratch Card",
      data_align: "center",
      minWidth: 150,
    },
    {
      id: "col7",
      align: "center",
      label: "Lucky Draw",
      data_align: "center",
      minWidth: 150,
    },
    {
      id: "col8",
      align: "center",
      label: "Price Targeted",
      data_align: "center",
      minWidth: 150,
    },
    {
      id: "col9",
      align: "center",
      label: "Price",
      data_align: "center",
      minWidth: 150,
    },
    {
      id: "col10",
      align: "center",
      label: "Title",
      data_align: "center",
      minWidth: 150,
    },
    {
      id: "col11",
      align: "center",
      label: "Campaign Period Start & End Date with Time",
      data_align: "center",
      minWidth: 150,
    },
    {
      id: "col12",
      align: "center",
      label: "Status",
      data_align: "center",
      minWidth: 150,
    },
    {
      id: "col13",
      align: "center",
      label: "Created Date & Time",
      data_align: "center",
      minWidth: 150,
    },
    {
      id: "col14",
      align: "center",
      label: "Actions",
      data_align: "center",
      minWidth: 200,
      position: "sticky",
    },
  ];

  const rowsForResellerSubscriptionsTableOne = [
    {
      id: 1,
      col1: 467,
      col2: 865,
      col3: 438,
      col4: 252,
      col5: 252,
      col6: 567,
    },
  ];
  const rowsForResellerSubscriptionsTableTwo = [
    {
      id: 1,
      col1: 467,
      col2: 865,
      col3: 438,
      col4: 252,
      col5: 252,
      col6: 567,
      col7: 666,
      col8: 333,
      col9: 444,
      col10: 111,
    },
  ];

  const rowsForIndividualPricing = [
    {
      id: 1,
      col1: "7 day's",
      col2: "10",
      col3: "10",
      col4: "10",
      col5: "10",
      col6: "10",
    },
  ];

  const rowsForToolsCampaign = [
    {
      id: 1,
      col1: "1",
      col2: "7 Day's",
      col3: "Checkbox",
      col4: "Checkbox",
      col5: "Checkbox",
      col6: "Checkbox",
      col7: "Checkbox",
      col8: 5000,
      col9: 20,
      col10: "Diwali offer to boost your sales. Avail the tool in combined",
      col11: "11/12/2022-10.12-15/12/2022-10.12",
      col12: "Yet to Start",
      col13: "10/12/2022-15.30",
      col14: "Actions",
    },
  ];

  const getTableRowsForResellerTableOne = () => {
    const result = [];
    rowsForResellerSubscriptionsTableOne.forEach((val, index) => {
      result.push({
        id: index + 1,
        col1: (
          <Typography className="h-5 text-decoration-underline cursor-pointer">
            {val.col1}
          </Typography>
        ),
        col2: (
          <Typography className="h-5 text-decoration-underline cursor-pointer">
            {val.col2}
          </Typography>
        ),
        col3: (
          <Typography className="h-5 text-decoration-underline cursor-pointer">
            {val.col3}
          </Typography>
        ),
        col4: (
          <Typography className="h-5 text-decoration-underline cursor-pointer">
            {val.col4}
          </Typography>
        ),
        col5: (
          <Typography className="h-5 text-decoration-underline cursor-pointer">
            {val.col5}
          </Typography>
        ),
        col6: (
          <Typography className=" h-5 text-decoration-underline cursor-pointer">
            {val.col6}
          </Typography>
        ),
      });
    });

    setResellerSubscriptionsTableOne(result);
  };

  const getTableRowsForResellerTableTwo = () => {
    const result = [];
    rowsForResellerSubscriptionsTableTwo.forEach((val, index) => {
      result.push({
        id: index + 1,
        col1: (
          <Typography className="h-5 text-decoration-underline cursor-pointer">
            {val.col1}
          </Typography>
        ),
        col2: (
          <Typography className="h-5 text-decoration-underline cursor-pointer">
            {val.col2}
          </Typography>
        ),
        col3: (
          <Typography className="h-5 text-decoration-underline cursor-pointer">
            {val.col3}
          </Typography>
        ),
        col4: (
          <Typography className="h-5 text-decoration-underline cursor-pointer">
            {val.col4}
          </Typography>
        ),
        col5: (
          <Typography className="h-5 text-decoration-underline cursor-pointer">
            {val.col5}
          </Typography>
        ),
        col6: (
          <Typography className=" h-5 text-decoration-underline cursor-pointer">
            {val.col6}
          </Typography>
        ),
        col7: (
          <Typography className=" h-5 text-decoration-underline cursor-pointer">
            {val.col7}
          </Typography>
        ),
        col8: (
          <Typography className=" h-5 text-decoration-underline cursor-pointer">
            {val.col8}
          </Typography>
        ),
        col9: (
          <Typography className=" h-5 text-decoration-underline cursor-pointer">
            {val.col9}
          </Typography>
        ),
        col10: (
          <Typography className=" h-5 text-decoration-underline cursor-pointer">
            {val.col10}
          </Typography>
        ),
      });
    });

    setResellerSubscriptionsTableTwo(result);
  };

  const getTableRowsForIndividualPricing = () => {
    const result = [];
    rowsForIndividualPricing.forEach((val, index) => {
      result.push({
        id: index + 1,
        col1: val.col1,

        col2: (
          <Box className="d-flex align-items-center justify-content-evenly">
            <Typography className="h-5">{val.col2}</Typography>
            <CustomIcon type="edit" />
            <CustomIcon type="calendar" />
            <Box className="ms-2">
              <SwitchComponent label="" />
            </Box>
          </Box>
        ),
        col3: (
          <Box className="d-flex align-items-center justify-content-evenly">
            <Typography className="h-5">{val.col3}</Typography>
            <CustomIcon type="edit" />
            <CustomIcon type="calendar" />
            <Box className="ms-2">
              <SwitchComponent label="" />
            </Box>
          </Box>
        ),
        col4: (
          <Box className="d-flex align-items-center justify-content-evenly">
            <Typography className="h-5">{val.col4}</Typography>
            <CustomIcon type="edit" />
            <CustomIcon type="calendar" />
            <Box className="ms-2">
              <SwitchComponent label="" />
            </Box>
          </Box>
        ),
        col5: (
          <Box className="d-flex align-items-center justify-content-evenly">
            <Typography className="h-5">{val.col5}</Typography>
            <CustomIcon type="edit" />
            <CustomIcon type="calendar" />
            <Box className="ms-2">
              <SwitchComponent label="" />
            </Box>
          </Box>
        ),
        col6: (
          <Box className="d-flex align-items-center justify-content-evenly">
            <Typography className="h-5">{val.col6}</Typography>
            <CustomIcon type="edit" />
            <CustomIcon type="calendar" />
            <Box className="ms-2">
              <SwitchComponent label="" />
            </Box>
          </Box>
        ),
        col7: (
          <Box className="d-flex align-items-center justify-content-center">
            <CustomIcon type="view" className="ms-4" />
            <Box className="ms-4">
              <Box className="ms-2">
                <SwitchComponent label="" />
              </Box>
            </Box>
          </Box>
        ),
      });
    });

    setIndividualPricingTableRows(result);
  };

  const ReturnCheckBox = () => {
    const [checkBoxChecked, setCheckBoxChecked] = useState(false);
    return (
      <CheckBoxComponent
        isChecked={checkBoxChecked}
        checkBoxClick={() => {
          setCheckBoxChecked(!checkBoxChecked);
        }}
      />
    );
  };

  const getTableRowsForToolsCampaign = () => {
    const result = [];
    rowsForToolsCampaign.forEach((val, index) => {
      result.push({
        id: index + 1,
        col1: val.col1,

        col2: val.col2,
        col3: <ReturnCheckBox />,
        col4: <ReturnCheckBox />,
        col5: <ReturnCheckBox />,
        col6: <ReturnCheckBox />,
        col7: <ReturnCheckBox />,
        col8: <Typography className="h-5">{val.col8}/-</Typography>,
        col9: val.col9,
        col10: val.col10,
        col11: val.col11,
        col12: val.col12,
        col13: val.col13,
        col14: (
          <Box className="d-flex align-items-center justify-content-between">
            <CustomIcon type="edit" />
            <CustomIcon type="message" className="ms-1" />
            <CustomIcon type="calendar" className="ms-1" />
            <CustomIcon type="notification" className="ms-1" />
            <Box className="ms-3" sx={{ marginRight: "-10px" }}>
              <SwitchComponent label="" />
            </Box>
            <CustomIcon type="view" />
          </Box>
        ),
      });
    });

    setToolsCampaignTableRows(result);
  };

  useEffect(() => {
    getTableRowsForResellerTableOne();
    getTableRowsForResellerTableTwo();
    getTableRowsForIndividualPricing();
    getTableRowsForToolsCampaign();
  }, []);

  return (
    <>
      <Box>
        <Paper className="p-2">
          <Typography className="color-orange fw-bold">
            Reseller Subscriptions
          </Typography>
          <TableComponent
            columns={[...tableColumsForResellerSubscriptionsTableOne]}
            tableRows={resellerSubscriptionsTableOne}
            tHeadBgColor="bg-light-gray"
            showPagination={false}
            showSearchFilter={false}
            showSearchbar={false}
            showCheckbox={false}
          />
          <TableComponent
            columns={[...tableColumsForResellerSubscriptionsTableTwo]}
            tableRows={resellerSubscriptionsTableTwo}
            tHeadBgColor="bg-light-gray"
            showPagination={false}
            showSearchFilter={false}
            showSearchbar={false}
            showCheckbox={false}
          />
        </Paper>
        <Paper className="p-2 mt-4">
          <Typography className="color-orange fw-bold">
            Individual Pricing
          </Typography>
          <TableComponent
            columns={[...tableColumsForIndividualPricing]}
            tableRows={individualPricingTableRows}
            tHeadBgColor="bg-light-gray"
            showPagination={false}
            showSearchFilter={false}
            showSearchbar={false}
            showCheckbox={false}
            showCustomButton
            customButtonLabel="Add Day's Counter"
            onCustomButtonClick={() => {
              setOpenAddDaysCounterModal(true);
            }}
          />
        </Paper>
        <Paper className="p-2 mt-4">
          <Typography className="color-orange fw-bold">
            Tools Campaign
          </Typography>
          <TableComponent
            columns={[...tableColumsForToolsCampaign]}
            tableRows={toolsCampaignTableRows}
            tHeadBgColor="bg-light-gray"
            showPagination={false}
            showSearchFilter={false}
            showSearchbar={false}
            showCheckbox={false}
            showDateFilter
            showDateFilterBtn
            dateFilterBtnName="Create Discounts"
            dateFilterBtnClick={() => {
              setOpenCreateDiscountModal(true);
            }}
          />
        </Paper>
      </Box>
      <AddDaysCounterModal
        openAddDaysCounterModal={openAddDaysCounterModal}
        setOpenAddDaysCounterModal={setOpenAddDaysCounterModal}
      />
      <CreateDiscountModal
        openCreateDiscountModal={openCreateDiscountModal}
        setOpenCreateDiscountModal={setOpenCreateDiscountModal}
      />
    </>
  );
};

export default ResellerSubscriptions;
