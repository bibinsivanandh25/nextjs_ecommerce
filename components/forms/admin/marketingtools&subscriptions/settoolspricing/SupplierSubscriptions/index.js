/* eslint-disable no-use-before-define */
import {
  enableDisableMarketingTools,
  getAllIndividualPricingByUserType,
  getSubscrptionType,
  getToolsCampaignWithFilter,
  updateMarketingToolPrice,
} from "services/admin/marketingtools/settoolpricing";
import { Box, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomIcon from "services/iconUtils";
import TableComponent from "@/atoms/TableComponent";
import toastify from "services/utils/toastUtils";
import SwitchComponent from "@/atoms/SwitchComponent";
import ModalComponent from "@/atoms/ModalComponent";
import CheckBoxComponent from "@/atoms/CheckboxComponent";
import InputBox from "@/atoms/InputBoxComponent";
import AddDaysCounterModal from "./AddDaysCounterModal";
import CreateDiscountModal from "./CreateDiscountModal";
import ViewIndividualPricing from "../ViewIndividualPricing";

const SupplierSubscriptions = () => {
  const [supplierSubscriptionsTableOne, setSupplierSubscriptionsTableOne] =
    useState([]);
  const [supplierSubscriptionsTableTwo, setSupplierSubscriptionsTableTwo] =
    useState([]);
  const [showEditPriceModal, setShowEditPriceModal] = useState(false);

  const [individualPricingTableRows, setIndividualPricingTableRows] = useState(
    []
  );
  const [toolsCampaignTableRows, setToolsCampaignTableRows] = useState([]);
  const [priceDetails, setPriceDetails] = useState({
    price: "",
    id: "",
  });

  const [openAddDaysCounterModal, setOpenAddDaysCounterModal] = useState(false);
  const [openCreateDiscountModal, setOpenCreateDiscountModal] = useState(false);
  const [
    tableColumsForSupplierSubscriptionsTableOne,
    settableColumsForSupplierSubscriptionsTableOne,
  ] = useState([]);
  const [toolIDs, setToolIDs] = useState([]);
  const [showIndividualPricing, setShowIndividualPricing] = useState(false);
  const [individualPricingColumns, setIndividualPricingColumns] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  const tableColumsForSupplierSubscriptionsTableTwo = [
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
      minWidth: 75,
    },
    {
      id: "col2",
      align: "center",
      label: "DISCOUNT COUPON",
      data_align: "center",
      position: "",
      minWidth: 100,
    },
    {
      id: "col3",
      align: "center",
      label: "TODAYS DEAL",
      data_align: "center",
      position: "",
      minWidth: 100,
    },
    {
      id: "col4",
      align: "center",
      label: "SPIN WHEEL",
      data_align: "center",
      position: "",
      minWidth: 100,
    },
    {
      id: "col5",
      align: "center",
      label: "SCRATCH CARD",
      data_align: "center",
      position: "",
      minWidth: 100,
    },
    {
      id: "col6",
      align: "center",
      label: "PRICE TARGETED",
      data_align: "center",
      position: "",
      minWidth: 100,
    },
    {
      id: "col7",
      align: "center",
      label: "NOTIFICATIONS",
      data_align: "center",
      position: "",
      minWidth: 100,
    },
    {
      id: "col8",
      align: "center",
      label: "FLAGS",
      data_align: "center",
      position: "",
      minWidth: 100,
    },
    {
      id: "col9",
      align: "center",
      label: "QUIZ",
      data_align: "center",
      position: "",
      minWidth: 100,
    },
    {
      id: "col10",
      align: "center",
      label: "Price",
      data_align: "center",
      minWidth: 75,
    },
    {
      id: "col11",
      align: "center",
      label: "Title",
      data_align: "center",
      minWidth: 100,
    },
    {
      id: "col12",
      align: "center",
      label: "Campaign Period Start & End Date with Time",
      data_align: "center",
      minWidth: 150,
    },
    {
      id: "col13",
      align: "center",
      label: "Status",
      data_align: "center",
      minWidth: 75,
    },
    {
      id: "col14",
      align: "center",
      label: "Created Date & Time",
      data_align: "center",
      minWidth: 150,
    },
    {
      id: "col15",
      align: "center",
      label: "Actions",
      data_align: "center",
      minWidth: 100,
      position: "sticky",
    },
  ];

  const gettableColumsForSupplierSubscriptionsTableOne = async () => {
    const { data } = await getSubscrptionType("SUPPLIER");
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
      setSupplierSubscriptionsTableTwo([...temp1]);
      setSupplierSubscriptionsTableOne([...temp]);
      settableColumsForSupplierSubscriptionsTableOne([...result]);
    }
  };
  const mapIndivisualPricingRows = (data) => {
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

  const enableDisableMarketingTool = async (ids, status = false) => {
    const payload = {
      toolIdList: [...ids],
      disabled: !status,
    };
    const { data, err } = await enableDisableMarketingTools(payload);
    if (data?.message) {
      toastify(data.message, "success");
      getIndividualPricing();
    }
    if (err) {
      toastify(err?.response?.data?.message, "error");
      getIndividualPricing();
    }
  };

  const getIndividualPricing = async () => {
    const { data } = await getAllIndividualPricingByUserType("SUPPLIER");
    if (data) {
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
            status.push(ele.disabled);
          }
          result2[`col${index + 2}`] =
            ele.price !== "--" ? (
              <Box className="d-flex align-items-center justify-content-evenly">
                <Typography className="h-5">{ele.price}</Typography>
                <CustomIcon
                  type="edit"
                  className="h-4"
                  title="Edit Price"
                  onIconClick={() => {
                    setShowEditPriceModal(true);
                    setPriceDetails({
                      price: ele.price,
                      id: ele.adminMarketingToolId,
                    });
                  }}
                />
                <CustomIcon type="calendar" className="h-4" />
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
              title="view"
              className="mx-4"
              onIconClick={() => {
                setToolIDs(toolIds);
                setShowIndividualPricing(true);
              }}
            />
            <SwitchComponent
              label=""
              defaultChecked={status.every((ele) => !ele)}
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

  const checkToolCampaign = (tool, data) => {
    return data.map((ele) => ele.adminMarketingToolName).includes(tool);
  };
  const mapTableCampaignTableRows = (data) => {
    const result = [];
    data.forEach((ele, ind) => {
      result.push({
        col1: ind + 1,
        col2: (
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
        col3: (
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
        col4: (
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
        col5: (
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
        col6: (
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
        col7: (
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
        col8: (
          <div className="d-flex justify-content-center">
            <CheckBoxComponent
              isChecked={checkToolCampaign("FLAGS", ele.adminMarketingTools)}
              isDisabled
              id="FLAGS"
            />
          </div>
        ),
        col9: (
          <div className="d-flex justify-content-center">
            <CheckBoxComponent
              isChecked={checkToolCampaign("QUIZ", ele.adminMarketingTools)}
              isDisabled
              id="QUIZ"
            />
          </div>
        ),
        col10: ele.price,
        col11: ele.title,
        col12: ele.startDateTime,
        col13: ele.status,
        col14: ele.createdDate,
        col15: (
          <Box className="d-flex align-items-center justify-content-between">
            <CustomIcon className="h-4" type="edit" />
            <CustomIcon type="message" className="ms-1 h-4" />
            <CustomIcon type="calendar" className="ms-1 h-4" />
            <CustomIcon type="notification" className="ms-1 h-4" />
            <Box className="ms-3" sx={{ marginRight: "-10px" }}>
              <SwitchComponent label="" />
            </Box>
            <CustomIcon type="view" className="h-4" />
          </Box>
        ),
      });
    });
    return result;
  };

  const getToolCampaignTableData = async (page, date) => {
    const payload = {
      daysList: [],
      statusList: [],
      storeType: "SUPPLIER",
      fromDate: date?.fromDate ?? "",
      toDate: date?.toDate ?? "",
      pageNumber: page,
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

  useEffect(() => {
    gettableColumsForSupplierSubscriptionsTableOne();
    getIndividualPricing();
    getToolCampaignTableData(0);
  }, []);

  const handleEditPrice = async () => {
    const payload = {
      toolId: priceDetails.id,
      price: Number(priceDetails.price),
    };
    const { data, err } = await updateMarketingToolPrice(payload);
    if (data) {
      getIndividualPricing();
      setShowEditPriceModal(false);
      toastify(data?.message, "success");
    }
    if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };

  return (
    <>
      {!showIndividualPricing ? (
        <div>
          <Box>
            <Paper className="p-2">
              <Typography className="color-orange fw-bold">
                Supplier Subscriptions
              </Typography>
              <TableComponent
                columns={[...tableColumsForSupplierSubscriptionsTableOne]}
                tableRows={supplierSubscriptionsTableOne}
                tHeadBgColor="bg-light-gray"
                showPagination={false}
                showSearchFilter={false}
                showSearchbar={false}
                showCheckbox={false}
              />
              <TableComponent
                columns={[...tableColumsForSupplierSubscriptionsTableTwo]}
                tableRows={supplierSubscriptionsTableTwo}
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
                showSearchFilter={false}
                showSearchbar={false}
                showCheckbox={false}
                showDateFilter
                showDateFilterBtn
                showDateFilterSearch={false}
                dateFilterBtnName="Create Discounts"
                dateFilterBtnClick={() => {
                  setOpenCreateDiscountModal(true);
                }}
                handlePageEnd={(
                  searchText,
                  searchFilter,
                  page = pageNumber,
                  datefilter
                ) => {
                  getToolCampaignTableData(page, datefilter);
                }}
              />
            </Paper>
          </Box>
          {showEditPriceModal ? (
            <ModalComponent
              open={showEditPriceModal}
              onCloseIconClick={() => setShowEditPriceModal(false)}
              ModalTitle="Edit Price"
              footerClassName="d-flex justify-content-end"
              onSaveBtnClick={() => {
                handleEditPrice();
              }}
            >
              <Box className="mx-5 my-3">
                <InputBox
                  placeholder="Edit Price"
                  variant="standard"
                  inputlabelshrink
                  size="small"
                  type="number"
                  value={priceDetails.price}
                  onInputChange={(e) => {
                    setPriceDetails((pre) => ({
                      ...pre,
                      price: e.target.value,
                    }));
                  }}
                />
              </Box>
            </ModalComponent>
          ) : null}
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
        </div>
      ) : (
        <ViewIndividualPricing
          toolIDs={[...toolIDs]}
          setShowIndividualPricing={setShowIndividualPricing}
        />
      )}
    </>
  );
};

export default SupplierSubscriptions;
