/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
import {
  enableDisableMarketingTools,
  enableDisableToolCampaign,
  getAllIndividualPricingByUserType,
  getSubscrptionType,
  getToolsCampaignWithFilter,
} from "services/admin/marketingtools/settoolpricing";
import { Box, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomIcon from "services/iconUtils";
import TableComponent from "@/atoms/TableComponent";
import toastify from "services/utils/toastUtils";
import TabsCard from "components/molecule/TabsCard";
import { useRouter } from "next/router";
import SwitchComponent from "@/atoms/SwitchComponent";
import CheckBoxComponent from "@/atoms/CheckboxComponent";
import AddDaysCounterModal from "./AddDaysCounterModal";
import CreateDiscountModal from "./CreateDiscountModal";
import ViewIndividualPricing from "../ViewIndividualPricing";
import CreateNotification from "../CreateNotification";

const SupplierSubscriptions = () => {
  const [subscriptionCount, setSubscriptionCount] = useState([]);
  const [showCreateNotificationModal, setShowCreateNotificationModal] =
    useState(false);

  const [individualPricingTableRows, setIndividualPricingTableRows] = useState(
    []
  );
  const [createDiscountModalType, setCreateDiscountModalType] = useState("Add");
  const [toolsCampaignTableRows, setToolsCampaignTableRows] = useState([]);
  const [editDetials, setEditDetails] = useState({
    days: "",
    tools: "",
  });
  const [toolsCampaignEditData, setToolsCampaignEditData] = useState({});

  const [modalType, setModalType] = useState("Add");
  const [marketingToolCampaignId, setMarketingToolCampaignId] = useState("");
  const [openAddDaysCounterModal, setOpenAddDaysCounterModal] = useState(false);
  const [openCreateDiscountModal, setOpenCreateDiscountModal] = useState(false);
  const [tabList, setTabList] = useState([
    { label: "Active", isSelected: true },
    { label: "Scheduled", isSelected: false },
    { label: "Expired", isSelected: false },
  ]);
  const [toolIDs, setToolIDs] = useState([]);
  const [showViewTableType, setShowViewTableType] = useState("");
  const [individualPricingColumns, setIndividualPricingColumns] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [marketingToolId, setMarketingToolId] = useState("");

  const filterData = [
    { label: "All", value: "All" },
    { label: "7 days", value: "7 days" },
    { label: "30 days", value: "30 days" },
    { label: "90 days", value: "90 days" },
    { label: "180 days", value: "180 days" },
    { label: "270 days", value: "270 days" },
    { label: "360 days", value: "360 days" },
  ];

  const tableColumsForToolsCampaign = [
    {
      id: "col1",
      align: "center",
      label: "S.No.",
      data_align: "center",
      position: "sticky",
      minWidth: 75,
    },
    {
      id: "col2",
      align: "center",
      label: "Tools / Days",
      data_align: "center",
      position: "sticky",
      minWidth: 75,
    },
    {
      id: "col3",
      align: "center",
      label: "DISCOUNT COUPON",
      data_align: "center",
      position: "",
      minWidth: 100,
    },
    {
      id: "col4",
      align: "center",
      label: "TODAYS DEAL",
      data_align: "center",
      position: "",
      minWidth: 100,
    },
    {
      id: "col5",
      align: "center",
      label: "SPIN WHEEL",
      data_align: "center",
      position: "",
      minWidth: 100,
    },
    {
      id: "col6",
      align: "center",
      label: "SCRATCH CARD",
      data_align: "center",
      position: "",
      minWidth: 100,
    },
    {
      id: "col7",
      align: "center",
      label: "PRICE TARGETED",
      data_align: "center",
      position: "",
      minWidth: 100,
    },
    {
      id: "col8",
      align: "center",
      label: "NOTIFICATIONS",
      data_align: "center",
      position: "",
      minWidth: 100,
    },
    {
      id: "col9",
      align: "center",
      label: "FLAGS",
      data_align: "center",
      position: "",
      minWidth: 100,
    },
    {
      id: "col10",
      align: "center",
      label: "QUIZ",
      data_align: "center",
      position: "",
      minWidth: 100,
    },
    {
      id: "col11",
      align: "center",
      label: "Price",
      data_align: "center",
      minWidth: 75,
    },
    {
      id: "col12",
      align: "center",
      label: "Title",
      data_align: "center",
      minWidth: 100,
    },
    {
      id: "col13",
      align: "center",
      label: "Campaign Period Start Date with Time",
      data_align: "center",
      minWidth: 150,
    },
    {
      id: "col14",
      align: "center",
      label: "Campaign Period End Date with Time",
      data_align: "center",
      minWidth: 150,
    },
    // {
    //   id: "col15",
    //   align: "center",
    //   label: "Status",
    //   data_align: "center",
    //   minWidth: 75,
    // },
    {
      id: "col16",
      align: "center",
      label: "Created Date & Time",
      data_align: "center",
      minWidth: 150,
    },
    {
      id: "col17",
      align: "center",
      label: "Actions",
      data_align: "center",
      minWidth: 100,
      position: "sticky",
    },
  ];

  const router = useRouter();

  const getMarketingToolCountForSupplier = async () => {
    const { data } = await getSubscrptionType("SUPPLIER");
    if (data?.length) {
      setSubscriptionCount([...data]);
    }
  };

  useEffect(() => {
    getMarketingToolCountForSupplier();
  }, []);

  const mapIndivisualPricingRows = (data) => {
    if (data?.length) {
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
    }
  };

  const enableDisableMarketingTool = async (ids, status = false) => {
    const payload = {
      toolIdList: [...ids],
      disabled: !status,
    };
    if (ids?.length) {
      const { data, err } = await enableDisableMarketingTools(payload);
      if (data?.message) {
        toastify(data.message, "success");
        getIndividualPricing();
      }
      if (err) {
        toastify(err?.response?.data?.message, "error");
        getIndividualPricing();
      }
    }
  };

  const getIndividualPricing = async () => {
    const { data } = await getAllIndividualPricingByUserType("SUPPLIER");
    if (data?.length) {
      mapIndivisualPricingRows(data);
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
          if (ele) {
            toolIds.push(ele.adminMarketingToolId);
            if (ele.price !== "--") {
              status.push(ele.disabled);
            }
          }
          result2[`col${index + 2}`] =
            ele.price !== "--" ? (
              <Box className="d-flex align-items-center justify-content-evenly">
                <Typography className="h-5">₹{ele.price}</Typography>
                <CustomIcon
                  type="edit"
                  className="h-4"
                  title="Edit"
                  onIconClick={() => {
                    setOpenAddDaysCounterModal(true);
                    setModalType("Edit");
                    setMarketingToolId(ele.adminMarketingToolId);
                    setEditDetails({
                      days: ele.days,
                      tools: ele.adminMarketingToolName,
                      price: ele.price,
                      startDate: ele.startDateTime,
                      endDate: ele.endDateTime,
                    });
                  }}
                />
                <CustomIcon
                  type="calendar"
                  className="h-4"
                  title={
                    <>
                      <Typography className="text-center h-5">
                        {`${ele.startDateTime} to ${ele.endDateTime}`}
                      </Typography>
                      <Typography className="text-center h-5">
                        Status : {ele.status}
                      </Typography>
                    </>
                  }
                />
                <CustomIcon
                  type="notification"
                  className="h-4"
                  onIconClick={() => {
                    setShowCreateNotificationModal(true);
                  }}
                />
                <Box className="ms-2">
                  <SwitchComponent
                    label=""
                    defaultChecked={!ele.disabled}
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
            <CustomIcon
              type="view"
              title="View Change History"
              className="mx-4"
              onIconClick={() => {
                setToolIDs(toolIds.filter((i) => i));
                setShowViewTableType("INDIVIDUAL_PRICING");
              }}
            />
            <SwitchComponent
              label=""
              defaultChecked={status.some((ele) => !ele)}
              ontoggle={() => {
                enableDisableMarketingTool(
                  toolIds.filter((i) => i),
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

  const checkToolCampaign = (tool, data) => {
    return data?.map((ele) => ele?.adminMarketingToolName)?.includes(tool);
  };
  const mapTableCampaignTableRows = (data) => {
    const result = [];
    data.forEach((ele, ind) => {
      result.push({
        col1: ind + 1,
        col2: ele.days,
        col3: (
          <div className="d-flex justify-content-center">
            <CheckBoxComponent
              id="DISCOUNT_COUPON"
              isDisabled
              isChecked={checkToolCampaign(
                "DISCOUNT_COUPON",
                ele.adminMarketingTools
              )}
            />
          </div>
        ),
        col4: (
          <div className="d-flex justify-content-center">
            <CheckBoxComponent
              isDisabled
              id="TODAYS_DEAL"
              isChecked={checkToolCampaign(
                "TODAYS_DEAL",
                ele.adminMarketingTools
              )}
            />
          </div>
        ),
        col5: (
          <div className="d-flex justify-content-center">
            <CheckBoxComponent
              isChecked={checkToolCampaign(
                "SPIN_WHEEL",
                ele.adminMarketingTools
              )}
              isDisabled
              id="SPIN_WHEEL"
            />
          </div>
        ),
        col6: (
          <div className="d-flex justify-content-center">
            <CheckBoxComponent
              isChecked={checkToolCampaign(
                "SCRATCH_CARD",
                ele.adminMarketingTools
              )}
              id="SCRATCH_CARD"
              isDisabled
            />
          </div>
        ),
        col7: (
          <div className="d-flex justify-content-center">
            <CheckBoxComponent
              isChecked={checkToolCampaign(
                "PRICE_TARGETED",
                ele.adminMarketingTools
              )}
              isDisabled
              id="PRICE_TARGETED"
            />
          </div>
        ),
        col8: (
          <div className="d-flex justify-content-center">
            <CheckBoxComponent
              isChecked={checkToolCampaign(
                "NOTIFICATIONS",
                ele.adminMarketingTools
              )}
              isDisabled
              id="NOTIFICATIONS"
            />
          </div>
        ),
        col9: (
          <div className="d-flex justify-content-center">
            <CheckBoxComponent
              isChecked={checkToolCampaign("FLAGS", ele.adminMarketingTools)}
              isDisabled
              id="FLAGS"
            />
          </div>
        ),
        col10: (
          <div className="d-flex justify-content-center">
            <CheckBoxComponent
              isChecked={checkToolCampaign("QUIZ", ele.adminMarketingTools)}
              isDisabled
              id="QUIZ"
            />
          </div>
        ),
        col11: ele.price,
        col12: ele.title,
        col13: ele.startDateTime,
        col14: ele.endDateTime,
        // col15: ele.status,
        col16: ele.createdDate,
        col17: (
          <Box className="d-flex align-items-center justify-content-between">
            <CustomIcon
              className={`h-4 ${getStatus() === "EXPIRED" ? "d-none" : ""}`}
              type="edit"
              title="Edit"
              onIconClick={() => {
                setCreateDiscountModalType("Edit");
                setOpenCreateDiscountModal(true);
                setMarketingToolCampaignId(ele.adminMarketingToolsCampaignId);
                setToolsCampaignEditData({
                  days: ele.days,
                  title: ele.title,
                  startDate: ele.startDateTime,
                  endDate: ele.endDateTime,
                  price: ele.price,
                  id: ele.adminMarketingToolsCampaignId,
                  toolNames: ele.adminMarketingTools.map(
                    (i) => i.adminMarketingToolName
                  ),
                });
              }}
            />
            <CustomIcon
              type="calendar"
              className="ms-1 h-4"
              title={`${ele.startDateTime} to ${ele.endDateTime}`}
            />
            <CustomIcon type="notification" className="ms-1 h-4" />
            <Box className="ms-3" sx={{ marginRight: "-10px" }}>
              <SwitchComponent
                label=""
                defaultChecked={!ele.disabled}
                ontoggle={() => {
                  enabledisablecampaign(
                    ele.adminMarketingToolsCampaignId,
                    !ele.disabled
                  );
                }}
              />
            </Box>
            <CustomIcon
              type="view"
              title="View Change History"
              className="h-4"
              onIconClick={() => {
                setToolIDs([ele.adminMarketingToolsCampaignId]);
                setShowViewTableType("TOOL_CAMPAIGN");
              }}
            />
          </Box>
        ),
      });
    });
    return result;
  };

  const enabledisablecampaign = async (id, status) => {
    const payload = {
      adminToolCampaignId: id,
      status,
    };
    const { data, err } = await enableDisableToolCampaign(payload);
    if (data) {
      toastify(data.message, "success");
      getToolCampaignTableData(0);
    }
    if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };

  const getStatus = () => {
    const temp = JSON.parse(JSON.stringify(tabList));
    let Status = "";
    temp.forEach((ele) => {
      if (ele.isSelected) {
        if (ele.label === "Active") {
          Status = "ACTIVE";
        }
        if (ele.label === "Scheduled") {
          Status = "YET_TO_START";
        }
        if (ele.label === "Expired") {
          Status = "EXPIRED";
        }
      }
    });
    return Status;
  };
  const getToolCampaignTableData = async (page, date, filter) => {
    const getdayFilters = (days) => {
      if (days) {
        if (days === "All") {
          return [];
        }
        return [days];
      }
      return [];
    };
    const payload = {
      daysList: getdayFilters(filter),
      status: getStatus(),
      storeType: "SUPPLIER",
      fromDate: date?.fromDate ?? "",
      toDate: date?.toDate ?? "",
      pageNumber: getStatus() !== "ACTIVE" ? page ?? 0 : 0,
      pageSize: 50,
    };
    const { data, err } = await getToolsCampaignWithFilter(payload);
    if (data) {
      if (page === 0) {
        setToolsCampaignTableRows(mapTableCampaignTableRows(data));
        setPageNumber((pre) => pre + 1);
      } else {
        setToolsCampaignTableRows([
          ...toolsCampaignTableRows,
          ...mapTableCampaignTableRows(data),
        ]);
        setPageNumber((pre) => pre + 1);
      }
    }
    if (err) {
      setToolsCampaignTableRows([]);
    }
  };

  // const filterTableData = (data) => {
  //   const result = {};
  //   data.forEach((ele) => {
  //     result[ele.name] = ele.value
  //       .map((item) => {
  //         if (item.isSelected) {
  //           return item.item;
  //         }
  //         return null;
  //       })
  //       .filter((val) => val);
  //   });
  //   return result;
  //   // getToolCampaignTableData(0, undefined, result);
  // };

  useEffect(() => {
    getIndividualPricing();
  }, []);

  useEffect(() => {
    getToolCampaignTableData(0);
  }, [tabList]);

  const getSubscriptionCount = () => {
    const getRouteName = (tool) => {
      if (tool === "DISCOUNT_COUPON") {
        return "discountsubscriptions";
      }
      if (tool === "FLAGS") {
        return "flags";
      }
      if (tool === "NOTIFICATIONS") return "notification";
      return `${tool?.replace("_", "").toLocaleLowerCase()}subscriptions`;
    };
    return subscriptionCount?.map((ele) => {
      return (
        <div
          className="me-3"
          style={{
            minWidth: "200px",
          }}
        >
          <Paper className="mb-2 pb-2 ms-2" elevation={3}>
            <Typography className="fw-bold h-5 py-1 text-center bg-light-gray">
              {ele.adminMarketingToolName?.replaceAll("_", " ")}
            </Typography>
            <div className="d-flex justify-content-center">
              <Typography
                className="fw-bold h-5 py-1 text-decoration-underline cursor-pointer  "
                onClick={() => {
                  router.push(
                    `/admin/marketingtools/subscriptions/${getRouteName(
                      ele.adminMarketingToolName
                    )}?userType=Supplier`
                  );
                }}
              >
                {ele.totalCount}
              </Typography>
            </div>
            <div className="d-flex justify-content-around">
              <div>
                <Typography className="fw-bold h-5 text-center ">
                  Active
                </Typography>
                <Typography
                  className="fw-bold h-5 text-center text-decoration-underline cursor-pointer"
                  onClick={() => {
                    router.push(
                      `/admin/marketingtools/subscriptions/${getRouteName(
                        ele.adminMarketingToolName
                      )}?userType=Supplier&Status=ACTIVE`
                    );
                  }}
                >
                  {ele.activeCount}
                </Typography>
              </div>
              <div className="mx-4">
                <Typography className="fw-bold h-5 text-center  ">
                  Expired
                </Typography>
                <Typography
                  className="fw-bold h-5 text-center text-decoration-underline cursor-pointer"
                  onClick={() => {
                    router.push(
                      `/admin/marketingtools/subscriptions/${getRouteName(
                        ele.adminMarketingToolName
                      )}?userType=Supplier&Status=EXPIRED`
                    );
                  }}
                >
                  {ele.expiredCount}
                </Typography>
              </div>
              <div>
                <Typography className="fw-bold h-5 text-center ">
                  Pending
                </Typography>
                <Typography
                  className="fw-bold h-5 text-center text-decoration-underline cursor-pointer"
                  onClick={() => {
                    router.push(
                      `/admin/marketingtools/subscriptions/${getRouteName(
                        ele.adminMarketingToolName
                      )}?userType=Supplier&Status=PENDING`
                    );
                  }}
                >
                  {ele.pendingCount}
                </Typography>
              </div>
            </div>
          </Paper>
        </div>
      );
    });
  };

  return (
    <>
      {!showViewTableType?.length ? (
        <div>
          <Box>
            <Paper className="p-2">
              <Typography className="color-orange fw-bold">
                Supplier Subscriptions
              </Typography>
              {subscriptionCount?.length ? (
                <>
                  <div className="d-flex overflow-auto hide-scrollbar my-2 ps-1">
                    {getSubscriptionCount()}
                  </div>
                </>
              ) : (
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  className="h-50"
                >
                  <Typography className="fw-bold h-4">
                    No Data Available
                  </Typography>
                </Box>
              )}
            </Paper>
            <Paper className="p-2 mt-4">
              <Typography className="color-orange fw-bold">
                Individual Pricing
              </Typography>

              <TableComponent
                columns={[...individualPricingColumns]}
                tableRows={[...individualPricingTableRows]}
                tHeadBgColor="bg-light-gray"
                showPagination={false}
                showSearchFilter={false}
                showSearchbar={false}
                showCheckbox={false}
                showCustomButton
                customButtonLabel="Add Day's Counter"
                onCustomButtonClick={() => {
                  setOpenAddDaysCounterModal(true);
                  setModalType("Add");
                }}
              />
              {individualPricingTableRows?.length === 0 && (
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  className="h-50"
                >
                  <Typography className="fw-bold h-4">
                    No Data Available
                  </Typography>
                </Box>
              )}
            </Paper>
            <Paper className="p-2 mt-4">
              <Typography className="color-orange fw-bold">
                Tools Campaign
              </Typography>
              <TabsCard
                tabList={tabList}
                onSelect={(index) => {
                  const temp = JSON.parse(JSON.stringify(tabList));
                  temp.forEach((ele, ind) => {
                    if (ind === index) {
                      ele.isSelected = true;
                    } else {
                      ele.isSelected = false;
                    }
                  });
                  setTabList(temp);
                }}
              >
                <div className="py-2">
                  <TableComponent
                    columns={[...tableColumsForToolsCampaign]}
                    tableRows={toolsCampaignTableRows}
                    tHeadBgColor="bg-light-gray"
                    showSearchFilter={false}
                    showSearchbar={false}
                    showCheckbox={false}
                    showDateFilter
                    showDateFilterBtn
                    tabChange={tabList}
                    filterList={filterData}
                    showDateFilterDropDown={getStatus() !== "ACTIVE"}
                    showPagination={getStatus() !== "ACTIVE"}
                    showDateFilterSearch={false}
                    dateFilterBtnName="Create Discounts"
                    dateFilterBtnClick={() => {
                      setOpenCreateDiscountModal(true);
                      setCreateDiscountModalType("Add");
                    }}
                    handlePageEnd={(
                      searchText,
                      searchFilter,
                      page = pageNumber,
                      datefilter
                    ) => {
                      getToolCampaignTableData(page, datefilter, searchFilter);
                    }}
                  />
                </div>
              </TabsCard>
            </Paper>
          </Box>

          {showCreateNotificationModal ? (
            <CreateNotification
              showNotificationModal={showCreateNotificationModal}
              setShowNotificationModal={setShowCreateNotificationModal}
              type="add"
            />
          ) : null}
          {openAddDaysCounterModal ? (
            <AddDaysCounterModal
              marketingToolId={marketingToolId}
              getIndividualPricing={getIndividualPricing}
              modalType={modalType}
              openAddDaysCounterModal={openAddDaysCounterModal}
              setOpenAddDaysCounterModal={setOpenAddDaysCounterModal}
              selectedValues={editDetials}
            />
          ) : null}
          {openCreateDiscountModal ? (
            <CreateDiscountModal
              status={getStatus()}
              campaignID={marketingToolCampaignId}
              getToolCampaignTableData={getToolCampaignTableData}
              toolsCampaignEditData={toolsCampaignEditData}
              modalType={createDiscountModalType}
              openCreateDiscountModal={openCreateDiscountModal}
              setOpenCreateDiscountModal={setOpenCreateDiscountModal}
            />
          ) : null}
        </div>
      ) : (
        <ViewIndividualPricing
          toolIDs={[...toolIDs]}
          setShowViewTableType={setShowViewTableType}
          showViewTableType={showViewTableType}
        />
      )}
    </>
  );
};

export default SupplierSubscriptions;
