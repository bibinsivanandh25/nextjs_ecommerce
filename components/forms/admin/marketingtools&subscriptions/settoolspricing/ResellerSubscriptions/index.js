/* eslint-disable no-use-before-define */
import {
  enableDisableMarketingTools,
  getAllIndividualPricingByUserType,
  getSubscrptionType,
} from "services/admin/marketingtools/settoolpricing";
import { Box, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomIcon from "services/iconUtils";
import toastify from "services/utils/toastUtils";
import TableComponent from "@/atoms/TableComponent";
import SwitchComponent from "@/atoms/SwitchComponent";
import AddDaysCounterModal from "./AddDaysCounterModal";
import CreateDiscountModal from "./CreateDiscountModal";

const resellerSubscriptions = () => {
  const [resellerSubscriptionsTableOne, setresellerSubscriptionsTableOne] =
    useState([]);
  const [resellerSubscriptionsTableTwo, setresellerSubscriptionsTableTwo] =
    useState([]);

  const [individualPricingTableRows, setIndividualPricingTableRows] = useState(
    []
  );
  const [toolsCampaignTableRows, setToolsCampaignTableRows] = useState([]);

  const [openAddDaysCounterModal, setOpenAddDaysCounterModal] = useState(false);
  const [openCreateDiscountModal, setOpenCreateDiscountModal] = useState(false);
  const [
    tableColumsForresellerSubscriptionsTableOne,
    settableColumsForresellerSubscriptionsTableOne,
  ] = useState([]);
  const [individualPricingColumns, setIndividualPricingColumns] = useState([]);

  const gettableColumsForresellerSubscriptionsTableOne = async () => {
    const { data } = await getSubscrptionType("RESELLER");
    if (data) {
      const result = [];
      const rows = {};
      const rows2 = {};
      data.forEach((ele, ind) => {
        let count = Object.keys(rows2).length;
        result.push({
          id: `col${ind + 1}`,
          align: "center",
          label: ele.adminMarketingToolName.replaceAll("_", " "),
          data_align: "center",
        });

        rows[`col${ind + 1}`] = (
          <Typography className="h-5 text-decoration-underline cursor-pointer">
            {ele.totalCount}
          </Typography>
        );

        rows2[`col${count + 1}`] = (
          <Typography className="h-5 text-decoration-underline cursor-pointer">
            {ele.activeCount}
          </Typography>
        );
        count += 1;
        rows2[`col${count + 1}`] = (
          <Typography className="h-5 text-decoration-underline cursor-pointer">
            {ele.inActiveCount}
          </Typography>
        );
      });

      const temp = [];
      const temp1 = [];
      temp1.push(rows2);
      temp.push(rows);
      setresellerSubscriptionsTableTwo([...temp1]);
      setresellerSubscriptionsTableOne([...temp]);
      settableColumsForresellerSubscriptionsTableOne([...result]);
    }
  };

  const mapIndivisualPricingColumns = (data) => {
    const result = [
      {
        id: "col1",
        align: "center",
        label: "Tools / Days",
        data_align: "center",
        position: "sticky",
        minWidth: 200,
      },
    ];
    data.forEach((item, ind) => {
      result.push({
        id: `col${ind + 2}`,
        align: "center",
        label: item.toolName.replaceAll("_", " "),
        data_align: "center",
        position: "",
        minWidth: 200,
      });
    });
    result.push({
      id: "col10",
      align: "center",
      label: "Actions",
      data_align: "center",
      // minWidth: 200,
      position: "sticky",
    });
    setIndividualPricingColumns([...result]);
  };

  const enableDisableMarketingTool = async (ids, status) => {
    const payload = {
      toolIdList: ids.filter((ele) => ele),
      disabled: !status,
    };
    console.log(payload);
    const { data, err } = await enableDisableMarketingTools(payload);
    if (data?.message) {
      toastify(data.message, "success");
      getIndividualPricing();
    }
    if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };

  const getIndividualPricing = async () => {
    const { data } = await getAllIndividualPricingByUserType("RESELLER");
    if (data) {
      mapIndivisualPricingColumns(data);
      // days.forEach((val) => {
      //   data.forEach((item, index) => {
      //     item.adminMarketingTools.forEach((value) => {
      //       res.push({
      //         col1: val,
      //       });
      //       if (value.days.toLocaleLowerCase() === val.toLocaleLowerCase()) {
      //         res.push({
      //           [`col${index + 2}`]: (
      //             <Box className="d-flex align-items-center justify-content-evenly">
      //               <Typography className="h-5">{value.price}</Typography>
      //               <CustomIcon type="edit" />
      //               <CustomIcon type="calendar" />
      //               <Box className="ms-2">
      //                 <SwitchComponent label="" />
      //               </Box>
      //             </Box>
      //           ),
      //         });
      //         res.push({
      //           col10: (
      //             <div className="d-flex justify-content-center align-items-center">
      //               <CustomIcon type="view" title="view" className="mx-4" />
      //               <SwitchComponent label="" />
      //             </div>
      //           ),
      //         });
      //       }
      //     });
      //   });
      //   newres.push(Object.assign({}, ...res));
      // });

      const days = [
        "7 days",
        "30 days",
        "90 days",
        "180 days",
        "270 days",
        "360 days",
      ];
      const finalResult = [];
      days.forEach((day, ind) => {
        const result = [];
        data.forEach((ele) => {
          const temp2 = ele.adminMarketingTools.find((item) => {
            return item.days.toLocaleLowerCase() === day.toLocaleLowerCase();
          });
          if (temp2) result.push(temp2);
          else
            result.push({
              price: "--",
            });
        });
        const result2 = {};
        const toolIds = [];
        const status = [];
        result2.col1 = day;
        result.forEach((ele, index) => {
          toolIds.push(ele.adminMarketingToolId);
          if (ele.adminMarketingToolId) status.push(ele.disabled);

          result2[`col${index + 2}`] =
            ele.price !== "--" ? (
              <Box className="d-flex align-items-center justify-content-evenly">
                <Typography className="h-5">{ele.price}</Typography>
                <CustomIcon type="edit" className="h-4" />
                <CustomIcon type="calendar" className="h-4" />
                <Box className="ms-2">
                  <SwitchComponent
                    label=""
                    defaultChecked={ele.disabled}
                    ontoggle={() => {
                      enableDisableMarketingTool(
                        [ele.adminMarketingToolId],
                        ele.disabled
                      );
                    }}
                  />
                </Box>
              </Box>
            ) : (
              ele.price
            );
        });

        result2.col10 = (
          <div className="d-flex justify-content-center align-items-center">
            <CustomIcon type="view" title="view" className="mx-4" />
            <SwitchComponent
              label=""
              defaultChecked={status.every((ele) => ele)}
              ontoggle={() => {
                enableDisableMarketingTool(
                  [...toolIds],
                  status.every((ele) => ele)
                );
              }}
            />
          </div>
        );
        finalResult[ind] = result2;
      });

      setIndividualPricingTableRows(finalResult);
    }
  };
  useEffect(() => {
    gettableColumsForresellerSubscriptionsTableOne();
    getIndividualPricing();
  }, []);

  const tableColumsForresellerSubscriptionsTableTwo = [
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
    {
      id: "col11",
      align: "center",
      label: "Active",
      data_align: "center",
    },
    {
      id: "col12",
      align: "center",
      label: "Inactive",
      data_align: "center",
    },
    {
      id: "col13",
      align: "center",
      label: "Active",
      data_align: "center",
    },
    {
      id: "col14",
      align: "center",
      label: "Inactive",
      data_align: "center",
    },
    {
      id: "col15",
      align: "center",
      label: "Active",
      data_align: "center",
    },
    {
      id: "col16",
      align: "center",
      label: "Inactive",
      data_align: "center",
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

  return (
    <>
      <Box>
        <Paper className="p-2">
          <Typography className="color-orange fw-bold">
            Reseller Subscriptions
          </Typography>
          <TableComponent
            columns={[...tableColumsForresellerSubscriptionsTableOne]}
            tableRows={resellerSubscriptionsTableOne}
            tHeadBgColor="bg-light-gray"
            showPagination={false}
            showSearchFilter={false}
            showSearchbar={false}
            showCheckbox={false}
          />
          <TableComponent
            columns={[...tableColumsForresellerSubscriptionsTableTwo]}
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
            columns={[...individualPricingColumns]}
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
      {openAddDaysCounterModal ? (
        <AddDaysCounterModal
          openAddDaysCounterModal={openAddDaysCounterModal}
          setOpenAddDaysCounterModal={setOpenAddDaysCounterModal}
        />
      ) : null}
      {openCreateDiscountModal ? (
        <CreateDiscountModal
          openCreateDiscountModal={openCreateDiscountModal}
          setOpenCreateDiscountModal={setOpenCreateDiscountModal}
        />
      ) : null}
    </>
  );
};

export default resellerSubscriptions;
