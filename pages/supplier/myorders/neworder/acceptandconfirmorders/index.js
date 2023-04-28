import ButtonComponent from "components/atoms/ButtonComponent";
import ProgressBar from "components/atoms/ProgressBar";
import TableComponent from "components/atoms/TableComponent";
import Image from "next/image";
import SimpleDropdownComponent from "components/atoms/SimpleDropdownComponent";
import toastify from "services/utils/toastUtils";
import { useState, useEffect } from "react";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AcceptandConfirmAddress from "components/forms/supplier/myorder/acceptandconfirmaddress";
import CustomIcon from "services/iconUtils";
import { useRouter } from "next/router";

import OrderConfirmModal from "@/forms/supplier/myorder/orderconfirmodal";
import ModalComponent from "@/atoms/ModalComponent";
// import InputBox from "@/atoms/InputBoxComponent";
import {
  ConfirmOrder,
  cancelOrderFromSupplier,
  getAllnewOrders,
  getSerialNumber,
  updateSerialNumber,
  viewNeworderDetails,
} from "services/supplier/myorders/newOrders";
import { useSelector } from "react-redux";
import InputFieldWithChip from "@/atoms/InputWithChip";
import {
  changePrimaryAddress,
  deleteAddress,
  getAllAddressofSupplier,
} from "services/supplier/myaccount/pickupaddress";
import AddAddressModal from "@/forms/supplier/myaccount/addaddressmodal";
import CheckBoxComponent from "@/atoms/CheckboxComponent";

// import logo from "../../../../../public/assets/logo.jpeg";

const filterData = [
  {
    label: "All",
    id: "all",
    value: null,
  },
  {
    label: "Store Owner Delivery",
    id: "STORE_OWNER_DELIVERY",
    value: "STORE_OWNER_DELIVERY",
  },
  {
    label: "Hand Pick",
    id: "HAND_PICK",
    value: "HAND_PICK",
  },
  {
    label: "Last Mile",
    id: "LAST_MILE",
    value: "LAST_MILE",
  },
  {
    label: "Supplier Shipment",
    id: "SUPPLIER_SHIPMENT",
    value: "SUPPLIER_SHIPMENT",
  },
];
const AcceptandConfirmOrder = () => {
  // const { supplierId } = useSelector((state) => state.user);
  const [newOrderData, setnewOrderData] = useState([]);
  const [newOrderRowData, setnewOrderRowData] = useState([]);

  // console.log(multipleConfirmPayload, "multipleConfirmPayload");
  const [eachOrderData, seteachOrderData] = useState([]);
  const [idState, setidState] = useState({ orderId: "", variationId: "" });
  const [confirmOrderId, setconfirmOrderId] = useState([]);
  const [showView, setshowView] = useState(false);
  const [showAddress, setshowAddress] = useState(false);
  const [dropDownValue, setDropDownValue] = useState({
    mode: {},
    commission: {},
  });
  const [showConfirmAdress, setshowConfirmAdress] = useState(false);
  const [enableConfirmOrders, setEnableConfirmOrders] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showSupplierShipmentModal, setShowSupplierShipmentModal] =
    useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [categoryType, setCategoryType] = useState(null);
  const [formValues, setformValues] = useState({ number: [] });
  const [orderCount, setorderCount] = useState(0);
  const [pageNumber, setpageNumber] = useState(0);
  const [progressBarSteps, setProgressBarSteps] = useState([
    {
      label: "Accept & confirm Orders",
      path: "acceptandconfirmorders",
    },
    {
      label: "Generate Invoice & Manifest ",
      path: "generateinvoiceandmanifest",
    },
    {
      label: "Upload Manifest",
      path: "uploadmanifest",
    },
  ]);
  const [addressList, setAddressList] = useState([]);
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const [selectId, setSelectId] = useState({ type: null, id: null });
  const [selectedAddress, setSelectedAddress] = useState(null);

  const user = useSelector((state) => state.user?.supplierId);
  const route = useRouter();
  const { supplierId } = useSelector((state) => state.user);

  const columns = [
    {
      id: "col1", //  id value in column should be presented in row as key
      label: "Image",
      // minWidth: 50,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col2",
      label: "Purchase ID",
      // minWidth: 50,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col3",
      label: "Order ID",
      // minWidth: 50,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col4",
      label: "SKU ID",
      // minWidth: 50,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col5",
      label: "Mode Of Orders",
      // minWidth: 50,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col6",
      label: "Weight",
      // minWidth: 50,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    // {
    //   id: "col6",
    //   label: "Weight",
    //   // minWidth: 50,
    //   align: "center",
    //   data_align: "center",
    //   data_classname: "",
    //   // data_style: { paddingLeft: "7%" },
    // },
    {
      id: "col7",
      label: "Order Date",
      // minWidth: 50,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col8",
      label: "Expected Dispatch Date",
      // minWidth: 50,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col9",
      label: "weight (inclusive of package)",
      // minWidth: 50,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col10",
      label: "Action",
      minWidth: 120,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
  ];

  // const renderConfirmOrders = () => {
  //   if (selectedCategory === "first") {
  //     return (
  //       <AcceptandConfirmAddress setshowConfirmAdress={setshowConfirmAdress} />
  //     );
  //   }
  //   if (selectedCategory === "second") {
  //     setShowSupplierShipmentModal(true);
  //   }
  //   return null;
  // };
  const getAllAddress = async () => {
    const { data, err } = await getAllAddressofSupplier(user);
    if (data) {
      const result = JSON.parse(JSON.stringify(data));
      const temp = result.filter((ele) => !ele.primary);
      temp.unshift(data.find((ele) => ele.primary));
      setAddressList([...temp]);
      temp.forEach((item) => {
        if (item?.primary) {
          setSelectedAddress(item.addressId);
        }
      });
    }
    if (err) {
      setAddressList([]);
    }
  };

  const setPrimaryAddress = async (id) => {
    await changePrimaryAddress(user, id);
  };

  const deletedSelectedAddress = async (id) => {
    const { data, err } = await deleteAddress(user, id);
    if (data) {
      toastify(data, "success");
      getAllAddress();
    }
    if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };
  const confirmOrderFunction = async () => {
    const payload = {
      pickUpAddressId: selectedAddress,
      ordersPojo: confirmOrderId,
    };

    const { data, err } = await ConfirmOrder(payload);
    if (data) {
      setconfirmOrderId([]);
      setSelectedAddress(null);
      setShowAddAddressModal(false);
      setshowView(false);
      toastify(data.message, "success");
      route.push("/supplier/myorders/neworder/generateinvoiceandmanifest");
    } else if (err) {
      toastify(err.response.data.message, "error");
    }
  };
  useEffect(() => {
    getAllAddress();
  }, []);
  const updateSerialNumberFunction = async (orderId, variationId) => {
    const payload = { orderId, variationId, serialNos: formValues.number };
    const { data, err } = await updateSerialNumber(payload);
    if (data) {
      setShowEditModal(false);
      toastify(data, "success");
      setformValues({ number: [] });
    } else if (err) {
      toastify(err.response.data.message, "error");
    }
  };
  const getSerialNumberFunction = async (orderId, variationId) => {
    const { data, err } = await getSerialNumber(orderId, variationId);
    if (data) {
      const temp = [];
      data.data.forEach((ele) => {
        temp.push(ele.serialNumber);
      });
      setformValues({ ...formValues, number: temp });
    } else if (err) {
      toastify(err.response.data.message, "error");
    }
  };
  const viewNeworderDetailsFunction = async (id) => {
    const { data, err } = await viewNeworderDetails(id);
    if (data) {
      seteachOrderData(data.data);
      setshowView(true);
    } else if (err) {
      toastify(err.response.data.message, "error");
    }
  };
  const dataMaptoTable = (data) => {
    const temp = [];
    data?.forEach((val) => {
      temp.push({
        id: val.orderId,
        col1: <Image src={val.imageUrl} height={50} width={50} alt="" />,
        col2: val.purchaseId,
        col3: val.orderId,
        col4: val.skuId,
        col5: val.modeOfOrder.replace("_", " "),
        col6: val.weight,
        col7: val.orderDate,
        col8: val.expectedDispatchDate.split("T")[0],
        col9: val.weightInclusivePackage,
        col10: (
          <div className="d-flex justify-content-between align-items-center">
            {/* <CustomIcon
              type="edit"
              title="edit"
              onIconClick={() => {
                setidState({
                  orderId: val.orderId,
                  variationId: val.productVariationId,
                });
                setShowEditModal(true);
              }}
            /> */}
            {/* <ButtonComponent
              muiProps="h-6"
              variant="outlined"
              label="Cancel"
              onBtnClick={() => {
                // eslint-disable-next-line no-use-before-define
                cancelOrderFunction(
                  val.orderId,
                  val.productVariationId,
                  val.skuId
                );
              }}
            /> */}
            <CustomIcon
              type="remove"
              title="Detail"
              onIconClick={() => {
                viewNeworderDetailsFunction(val.orderId);
              }}
            />
          </div>
        ),
        categoryType: "Mobile",
      });
    });
    return temp;
  };
  const getAllNewOrdersFunction = async (page = pageNumber, mode, keyword) => {
    const payload = {
      supplierId,
      status: "INITIATED",
      commissionMode: dropDownValue?.commission?.value || null,
      keyword: keyword || null,
      modeOfOrder: dropDownValue?.mode?.value || null,
      pageNumber: page,
      pageSize: 10,
    };
    const { data, err } = await getAllnewOrders(payload);
    if (data) {
      setorderCount(data.data.newOrderCount);
      // setnewOrderData(dataMaptoTable(data?.data?.orderResponse));
      if (page == 0) {
        setnewOrderData(dataMaptoTable(data?.data?.orderResponse));
        setnewOrderRowData(data?.data?.orderResponse);
        setpageNumber((pre) => pre + 1);
      } else {
        setpageNumber((pre) => pre + 1);
        setnewOrderData((pre) => [
          ...pre,
          ...dataMaptoTable(data?.data?.orderResponse),
        ]);
        setnewOrderRowData((pre) => [...pre, ...data?.data?.orderResponse]);
      }
    } else if (err) {
      toastify(err?.response?.data?.err, "error");
    }
  };
  const cancelOrderFunction = async (orderId, productVariationId, skuId) => {
    const payload = { orderId, productVariationId, skuId };
    const { message, err } = await cancelOrderFromSupplier(payload);
    if (message) {
      toastify(message, "success");
      viewNeworderDetailsFunction(orderId);
      getAllNewOrdersFunction(0);
      if (eachOrderData < 1) {
        setshowView(false);
      }
    } else if (err) {
      toastify(err.response.data.message, "error");
    }
  };
  const viewFormat = (key, value) => {
    return (
      <Grid container>
        <Grid md={4} sx={4}>
          <Typography className="fs-14 fw-500">{key}</Typography>
        </Grid>
        <Grid md={8} sx={8}>
          <Typography className="fs-14">{value}</Typography>
        </Grid>
      </Grid>
    );
  };
  useEffect(() => {
    getAllNewOrdersFunction(0);
  }, [dropDownValue]);
  const getModeOfOrder = (item = []) => {
    const modeOfOrders = [];
    item.forEach((id) => {
      newOrderData.forEach((ele) => {
        if (ele.id == id) {
          modeOfOrders.push(ele.col5);
        }
      });
    });
    const result = modeOfOrders.every(
      (category) => category === modeOfOrders[0]
    );
    if (item.length) {
      if (result) {
        setSelectedCategory(modeOfOrders[0]);
        setEnableConfirmOrders(true);
      } else {
        setEnableConfirmOrders(false);
        toastify(
          "Cannot confirm Products of Different Mode Of Orders",
          "error"
        );
      }
    } else {
      setSelectedCategory(null);
      setEnableConfirmOrders(false);
    }
    if (
      modeOfOrders[0] === "Delivery by store Owner" ||
      modeOfOrders[0] === "Hand picked"
    ) {
      setProgressBarSteps([
        {
          label: "Accept & confirm Orders",
          path: "acceptandconfirmorders",
        },
        {
          label: "Generate Invoice & Manifest ",
          path: "generateinvoiceandmanifest",
        },
      ]);
    }
  };
  const getConfirmPayload = (item = []) => {
    const tempConfirm = [];
    if (item?.length) {
      item.forEach((val) => {
        newOrderRowData.forEach((ele) => {
          if (val === ele.orderId) {
            tempConfirm.push({
              orderedProductId: ele.orderedProductId,
              orderId: val,
            });
          }
        });
      });
      setconfirmOrderId(tempConfirm);
    } else {
      setconfirmOrderId([]);
    }
    // item.forEach((id) => {
    //   newOrderRowData.forEach((ele, idx) => {
    //     if (ele.orderId == id) {
    //       console.log("true");
    //       tempConfirm.push({
    //         orderedProductId: ele.orderedProductId,
    //         orderId: id,
    //       });
    //     }
    //     console.log(tempConfirm, "tempConfirm");
    //     setselectedProductId(...tempConfirm);
    //   });
    // });
  };
  return (
    <Paper
      sx={{ p: 2 }}
      className="position-relative mnh-80vh mxh-80vh overflow-auto hide-scrollbar"
    >
      <ProgressBar showHeader steps={progressBarSteps} />
      {!showConfirmAdress ? (
        <div>
          <div className="d-flex justify-content-end">
            <div className="w-25 mx-2">
              <SimpleDropdownComponent
                size="small"
                list={[...filterData]}
                onDropdownSelect={(val) => {
                  setDropDownValue({ ...dropDownValue, mode: val });
                }}
                value={dropDownValue.mode}
                label="Mode Of Order"
              />
            </div>
            <div className="w-25">
              <SimpleDropdownComponent
                size="small"
                list={[
                  { label: "Zero Commission", id: 1, value: "ZERO_COMMISSION" },
                  {
                    label: "Fixed Commission",
                    id: 2,
                    value: "FIXED_COMMISSION",
                  },
                ]}
                onDropdownSelect={(val) => {
                  setDropDownValue({ ...dropDownValue, commission: val });
                }}
                value={dropDownValue.commission}
                label="commission Type"
              />
            </div>
            <ButtonComponent
              label="Download orders"
              variant="outlined"
              muiProps="mx-3"
            />
            <Button
              variant="contained"
              className={`fs-12  ${!enableConfirmOrders ? "" : "bg-orange"}`}
              sx={{ textTransform: "none" }}
              // fullWidth
              onClick={() => {
                if (selectedCategory === "LAST MILE") {
                  setshowAddress(true);
                }
                if (selectedCategory === "SUPPLIER SHIPMENT") {
                  setShowSupplierShipmentModal(true);
                }
                if (
                  selectedCategory === "Delivery by store Owner" ||
                  selectedCategory === "Hand picked"
                ) {
                  route.push({
                    pathname:
                      "/supplier/myorders/neworder/generateinvoiceandmanifest",
                    query: {
                      type: selectedCategory,
                    },
                  });
                }
              }}
              disabled={!enableConfirmOrders}
            >
              Confirm Orders
            </Button>
          </div>

          <Paper
            className="py-3 mt-3 mnh-40vh  overflow-auto hide-scrollbar"
            sx={{
              maxHeight: "50vh !important",
            }}
          >
            <TableComponent
              showSearchFilter={false}
              filterList={filterData}
              table_heading={`${orderCount || 0} New Orders`}
              columns={columns}
              tableRows={newOrderData}
              OnSelectionChange={(item) => {
                getModeOfOrder(item);
                getConfirmPayload(item);
              }}
              enableDropdownOnChangeServiceCall
              handlePageEnd={(searchText = "", filterText = "", page) => {
                getAllNewOrdersFunction(page, filterText, searchText);
                // getAllData(searchText, filterText, page);
              }}
              handleRowsPerPageChange={() => {
                setpageNumber(0);
              }}
              showCheckbox
            />
          </Paper>
        </div>
      ) : (
        <AcceptandConfirmAddress setshowConfirmAdress={setshowConfirmAdress} />
      )}
      {/* <ModalComponent
        open={showSupplierShipmentModal}
        onCloseIconClick={() => setShowSupplierShipmentModal(true)}
        ModalTitle="Please Fill The Below Field To Proceed Further"
      >
        <Grid container justifyContent="center" spacing={2}>
          <Grid item sm={12}>
            <SimpleDropdownComponent
              label="Logistic Partner Name"
              required
              placeholder="eg.Delhivery"
            />
          </Grid>
          <Grid item sm={12}>
            <InputBox label="Logistic URL" />
          </Grid>
          <Grid item sm={12}>
            <InputBox label="Tracking ID" />
          </Grid>
        </Grid>
      </ModalComponent> */}
      <OrderConfirmModal
        openModal={showSupplierShipmentModal}
        // openModal={true}
        setOpenModal={setShowSupplierShipmentModal}
      />
      <ModalComponent
        open={showEditModal}
        onCloseIconClick={() => setShowEditModal(false)}
        ModalTitle={
          categoryType === "mobile"
            ? "Update IMEI Number"
            : "Update Serial Number"
        }
        ClearBtnText="cancel"
        // onSaveBtnClick={() => setShowEditModal(false)}
        onSaveBtnClick={() =>
          updateSerialNumberFunction(idState.orderId, idState.variationId)
        }
        onClearBtnClick={() => setShowEditModal(false)}
        footerClassName="justify-content-end"
      >
        <Box className="my-3">
          {/* <InputBox
            placeholder={
              categoryType === "mobile"
                ? "Enter IMEI Number"
                : "Enter Serial Number"
            }
          /> */}
          <Grid container>
            <Grid md={10} sx={10}>
              <InputFieldWithChip
                id="options"
                // label="Values"
                value={formValues.number}
                // helperText={errorObj.values}
                // error={errorObj.values.length}
                inputlabelshrink
                handleChange={(_, val) => {
                  setformValues((pre) => ({
                    ...pre,
                    number: [...val],
                  }));
                }}
                placeholder="Enter Number"
              />
            </Grid>
            {/* <IconButton aria-label="icon" /> */}
            {/* <Grid md={2} sx={2}>
              <CustomIcon type="add" className="fs-35 mx-2" />
            </Grid> */}
          </Grid>
        </Box>
      </ModalComponent>
      <ModalComponent
        ModalTitle="Order Details"
        showFooter={false}
        minWidth={900}
        open={showView}
        onCloseIconClick={() => {
          setshowView(false);
        }}
      >
        <Grid
          style={{ maxHeight: "80vh", overflowY: "scroll" }}
          className="hide-scrollbar"
        >
          {eachOrderData.map((product) => {
            return (
              <Box
                className="d-flex justify-content-between px-2 m-3"
                key={product.orderId}
              >
                {/* <ReusableProduct product={product}> */}
                <Box
                  className={`d-flex align-items-center" "
                    }`}
                >
                  <Box className="w-150px h-180px">
                    <Image
                      className="d-block w-100 h-100 img-fluid rounded-1"
                      width="180"
                      height="180"
                      src={product.imageUrl}
                      alt="product"
                    />
                  </Box>
                  <Box className="ms-2">
                    <Typography
                      className="mb-1 fs-16 fw-bold"
                      variantMapping={<p />}
                    >
                      {product.productTitle}
                    </Typography>
                    {viewFormat("SKU Id", product.skuId)}
                    {viewFormat("Order Id", product.orderId)}
                    {viewFormat("Purchase Id", product.purchaseId)}
                    {viewFormat(
                      "Product Variation Id",
                      product.productVariationId
                    )}
                    {viewFormat("Order Status", product.orderedProductStatus)}
                    {viewFormat(
                      "Product Price",
                      `₹
                         ${product.orderedProductAmount}`
                    )}
                    {viewFormat("Quantity", product.orderedProductQuantity)}
                    {viewFormat("Weight", product.weight)}
                    {viewFormat("Payment Mode", product.modeOfPayment)}
                    {viewFormat(
                      "Weight Including Package",
                      product.weightInclusivePackage
                    )}
                  </Box>
                </Box>
                {/* </ReusableProduct> */}
                <Grid className="d-flex justify-content-end  align-items-end  ">
                  <Grid className="p-1">
                    <ButtonComponent
                      label="Confirm"
                      onBtnClick={() => {
                        confirmOrderId.push({
                          orderId: product.orderId,
                          orderedProductId: [product.orderedProductId],
                        });
                        setshowAddress(true);
                      }}
                    />
                  </Grid>
                  <Grid className="p-1">
                    <ButtonComponent
                      label="Cancel"
                      onBtnClick={() => {
                        cancelOrderFunction(
                          product.orderId,
                          product.productVariationId,
                          product.skuId
                        );
                      }}
                    />
                  </Grid>
                  <Grid className="p-1">
                    <ButtonComponent
                      label="Edit"
                      onBtnClick={() => {
                        setidState({
                          orderId: product.orderId,
                          variationId: product.productVariationId,
                        });
                        getSerialNumberFunction(
                          product.orderId,
                          product.productVariationId
                        );
                        setShowEditModal(true);
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
            );
          })}
        </Grid>
      </ModalComponent>
      <ModalComponent
        open={showAddress}
        minWidth={900}
        onCloseIconClick={() => {
          setshowAddress(false);
        }}
        onSaveBtnClick={() => {
          confirmOrderFunction();
        }}
        ModalTitle="Choose Address"
        // showFooter={false}
        saveBtnText="Confirm"
        clearBtnClassName="d-none"
      >
        {/* <PickUpAddress /> */}
        <div className="mnh-70vh overflow-auto hide-scrollbar bg-white p-2 rounded">
          <Grid container item xs={12} sx={{ p: 3 }} spacing={3}>
            <Grid xs={6} item>
              <Paper
                sx={{ py: 1.5, px: 3, border: "1px solid lightgray" }}
                className="fs-12 bg-white rounded color-orange cursor-pointer"
                onClick={() => {
                  setSelectId({ type: "add", id: selectedAddress });
                  setShowAddAddressModal(true);
                }}
              >
                + Add new Address
              </Paper>
            </Grid>
            <Grid xs={6} item />
            {addressList.length
              ? addressList.map((add) => (
                  <Grid xs={6} item key={add?.addressId}>
                    <Grid
                      container
                      sx={{
                        py: 1.5,
                        px: 3,
                        border: "1px solid lightgray",
                        backgroundColor:
                          add?.addressId === selectedAddress &&
                          "#F5E4D7 !important",
                      }}
                      className="fs-16 bg-white rounded h-100"
                    >
                      <Grid item xs={11}>
                        <Grid item xs={12} className="cursor-pointer d-inline">
                          <CheckBoxComponent
                            label={add?.name}
                            isChecked={add?.addressId === selectedAddress}
                            showIcon
                            checkBoxClick={() => {
                              setPrimaryAddress(add?.addressId);
                              setSelectedAddress(add?.addressId);
                            }}
                            iconType="circled"
                          />
                        </Grid>
                        <Grid item xs={12} className="fs-14 fw-bold my-1 mx-4">
                          <Typography>
                            {" "}
                            {`${add?.address}, ${add?.location}, ${
                              add?.landmark ? `${add?.landmark},` : ""
                            }  ${add?.cityDistrictTown}, ${add?.state}, ${
                              add?.pinCode
                            }`}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} className="fs-12 mx-4">
                          <Typography> {add?.mobileNumber}</Typography>
                        </Grid>
                      </Grid>
                      <Grid
                        item
                        xs={1}
                        flexDirection="column"
                        container
                        alignItems="center"
                      >
                        <DeleteIcon
                          className="cursor-pointer"
                          sx={{ mb: 2 }}
                          onClick={() => {
                            deletedSelectedAddress(add.addressId);
                            setSelectId({ type: "delete", id: add.addressId });
                          }}
                        />
                        <EditIcon
                          className="cursor-pointer"
                          onClick={() => {
                            setShowAddAddressModal(true);
                            setSelectId({ type: "edit", id: add.addressId });
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                ))
              : null}
          </Grid>
          {showAddAddressModal && (
            <AddAddressModal
              showAddressModal={showAddAddressModal}
              setShowAddAddressModal={setShowAddAddressModal}
              values={addressList.find((i) => i.addressId === selectId.id)}
              type={selectId.type}
              setSelectId={setSelectId}
              getAllAddress={getAllAddress}
            />
          )}
        </div>
      </ModalComponent>
    </Paper>
  );
};
export default AcceptandConfirmOrder;
