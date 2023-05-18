/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Box, Grid, Paper, Typography } from "@mui/material";
import ButtonComponent from "components/atoms/ButtonComponent";
import SimpleDropdownComponent from "components/atoms/SimpleDropdownComponent";
import TableComponent from "components/atoms/TableComponent";
import Image from "next/image";
import { useEffect, useState } from "react";
import ShowPreviousInvoices from "components/forms/supplier/myorder/showpreviousorder";
import { useRouter } from "next/router";
// import logo from "../../../../../public/assets/logo.jpeg";

import { useSelector } from "react-redux";
import toastify from "services/utils/toastUtils";
import { format } from "date-fns";
import {
  getAllnewOrders,
  getConfirmedProductsByOrderId,
} from "services/supplier/myorders/newOrders";
import CustomIcon from "services/iconUtils";
import ModalComponent from "@/atoms/ModalComponent";
import ProgressBar from "../../../../../components/atoms/ProgressBar";

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
const Generateinvoiceandmanifest = () => {
  const { supplierId } = useSelector((state) => state.user);
  const [confirmedProductDetails, setconfirmedProductDetails] = useState([]);
  const [showView, setshowView] = useState(false);
  const [showInvoices, setShowInvoices] = useState(false);
  const [dropDownValue, setDropDownValue] = useState({
    mode: {},
    commission: {},
  });
  const [newOrderData, setnewOrderData] = useState([]);
  const [orderCount, setorderCount] = useState(0);
  const [pageNumber, setpageNumber] = useState(0);
  const [orderId, setorderId] = useState([]);
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
  const route = useRouter();
  const columns = [
    {
      id: "col1",
      label: "Customer ID",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col2",
      label: "Customer Name",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col3",
      label: "Purchase ID",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col4",
      label: "Order ID",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },

    {
      id: "col5",
      label: "Mode Of Order",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },

    {
      id: "col6",
      label: "Order Date",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col7",
      label: "Expected Dispatch Date",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col8",
      label: "Total Order amount",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col9",
      label: "Action",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
  ];
  const getConfirmedOrderDetails = async (id) => {
    const { data, err } = await getConfirmedProductsByOrderId(id);
    if (data) {
      setconfirmedProductDetails(data);
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
        col1: val.orderedById,
        col2: val.orderedByName,
        col3: val.purchaseId,
        col4: val.orderId,
        col5: val.modeOfOrder.replace("_", " "),
        col6: val.orderDate,
        col7: val.expectedDispatchDate.split("T")[0],
        col8: val.totalOrderAmount,
        col9: (
          <Grid>
            <CustomIcon
              type="view"
              title="view Details"
              className="fs-25 mx-2"
              onIconClick={() => {
                const tempId = [val.orderId];
                getConfirmedOrderDetails(val.orderId);
                // temp.push(val.orderId);
                setorderId(tempId);
              }}
            />
          </Grid>
        ),

        // categoryType: "Mobile",
      });
    });
    return temp;
  };
  const getAllConfirmedOrder = async (page = pageNumber, mode, keyword) => {
    const payload = {
      supplierId,
      status: "CONFIRMED",
      commissionMode: dropDownValue?.commission?.value || null,
      keyword: keyword || null,
      modeOfOrder: dropDownValue?.mode?.value || null,
      pageNumber: page,
      pageSize: 50,
    };
    const { data, err } = await getAllnewOrders(payload);
    if (data) {
      setorderCount(data.data.newOrderCount);
      // setnewOrderData(dataMaptoTable(data?.data?.orderResponse));
      if (page == 0) {
        setnewOrderData(dataMaptoTable(data?.data?.orderResponse));
        setpageNumber((pre) => pre + 1);
      } else {
        setpageNumber((pre) => pre + 1);
        setnewOrderData((pre) => [
          ...pre,
          ...dataMaptoTable(data?.data?.orderResponse),
        ]);
      }
    } else if (err) {
      toastify(err?.response?.data?.err, "error");
    }
  };
  useEffect(() => {
    getAllConfirmedOrder(0);
  }, [dropDownValue.commission, dropDownValue.mode]);
  // const downloadManifestFunction = async () => {
  //   const oid = orderId[0];
  // const { data, err } = await downloadManifest(oid);
  //   if (data) {
  //     setmenifestPdfData(data);
  //     const blob = await data.blob();
  //     const url = window.URL.createObjectURL(blob);
  //     const a = document.createElement("a");
  //     a.style.display = "none";
  //     a.href = url;
  //     // the filename you want
  //     a.download = `
  //       .toString()
  //       .replaceAll(" ", "_")}.pdf`;
  //     document.body.appendChild(a);
  //     a.click();
  //     window.URL.revokeObjectURL(url);
  //     toastify("your file has downloaded!", "success");
  //   } else if (err) {
  //     toastify(err.response.data.message, "error");
  //   }
  // };
  const downloadManifestFunction = async (type) => {
    // const { data, err } = await getQrPdf();
    try {
      fetch(
        `${process.env.DOMAIN}notification/download-${type}?orderId=${orderId[0]}`,
        {
          method: "get",
          headers: new Headers({
            userId: supplierId,
            "Content-Type": "application/octet-stream",
          }),
        }
      )
        .then(async (resp) => {
          const blob = await resp.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.style.display = "none";
          a.href = url;
          // the filename you want
          a.download = `${type}-Report-${format(
            new Date(),
            "MM-dd-yyyy HH-mm-ss"
          )}.pdf`;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          toastify("your file has downloaded!", "success");
        })
        .catch((err) => err);
      // .then((blob) => {
      //   console.log(blob, "bloc");
      //   const url = window.URL.createObjectURL(blob);
      //   const a = document.createElement("a");
      //   a.style.display = "none";
      //   a.href = url;
      //   // the filename you want
      //   a.download = `${formValues.storeName
      //     .toString()
      //     .replaceAll(" ", "_")}.pdf`;
      //   document.body.appendChild(a);
      //   a.click();
      //   window.URL.revokeObjectURL(url);
      //   toastify("your file has downloaded!", "success");
      // })
    } catch (err) {
      toastify(
        "Unable to process your request, please try again later!!",
        "error"
      );
    }
  };
  const viewFormat = (key, value) => {
    return (
      <Grid container>
        <Grid md={7} sx={7}>
          <Typography className="fs-14 fw-500">{key}</Typography>
        </Grid>
        <Grid md={5} sx={5}>
          <Typography className="fs-14">{value}</Typography>
        </Grid>
      </Grid>
    );
  };
  useEffect(() => {
    if (
      route.query.type === "Delivery by store Owner" ||
      route.query.type === "Hand picked"
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
  }, [route.pathname, route.query]);

  return (
    <Paper
      sx={{ p: 2 }}
      className="mnh-80vh mxh-80vh overflow-auto hide-scrollbar"
    >
      {!showInvoices ? (
        <>
          <ProgressBar showHeader steps={[...progressBarSteps]} />

          <div className="d-flex justify-content-around">
            <Grid item lg={5} className="">
              <span
                className="fs-14 cursor-pointer color-orange fw-500"
                onClick={() => {
                  setShowInvoices(true);
                }}
              >
                <u> Show Previous Invoice</u>
              </span>
            </Grid>
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
              label="Download Invoice"
              size="large"
              muiProps="fs-11 mx-3"
              // onBtnClick={() => {
              //   route.push("/supplier/myorders/neworder/uploadmanifest");
              // }}
              disabled={orderId.length !== 1}
              onBtnClick={() => {
                downloadManifestFunction("invoice");
              }}
            />
            <ButtonComponent
              label="Download Manifest"
              size="large"
              muiProps="fs-11"
              disabled={orderId.length !== 1}
              // onBtnClick={() => {
              //   route.push("/supplier/myorders/neworder/uploadmanifest");
              // }}
              onBtnClick={() => {
                downloadManifestFunction("manifest");
              }}
            />
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
              table_heading={`${orderCount} Confirmed Orders`}
              columns={columns}
              tableRows={newOrderData}
              OnSelectionChange={(item) => {
                setorderId(item);
              }}
              enableDropdownOnChangeServiceCall
              handlePageEnd={(searchText = "", filterText = "", page) => {
                getAllConfirmedOrder(page, filterText, searchText);
                // getAllData(searchText, filterText, page);
              }}
              handleRowsPerPageChange={() => {
                setpageNumber(0);
              }}
              showCheckbox
            />
            <ModalComponent
              ModalTitle="Confirmed Order Details"
              titleClassName="color-orange fs-14"
              showFooter={false}
              minWidth={700}
              open={showView}
              onCloseIconClick={() => {
                setshowView(false);
              }}
            >
              <Grid
                style={{ maxHeight: "80vh", overflowY: "scroll" }}
                className="hide-scrollbar"
              >
                {confirmedProductDetails.map((product) => {
                  return (
                    <>
                      <Box
                        className="d-flex justify-content-between px-2 m-3 "
                        key={product.orderId}
                      >
                        {/* <ReusableProduct product={product}> */}
                        <Box className="d-flex justify-content-center align-items-center ">
                          <Box className="w-150px h-180px ">
                            <Image
                              className="d-block w-100 h-100 img-fluid rounded-1"
                              width="180"
                              height="180"
                              src={product.imageUrl}
                              alt="product"
                            />
                          </Box>
                          <Box className="ms-2 ">
                            <Typography
                              className="mb-1 fs-16 fw-bold "
                              // variantMapping={<p />}
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
                            {viewFormat(
                              "Order Status",
                              product.orderedProductStatus
                            )}
                            {viewFormat(
                              "Product Price",
                              `₹
                         ${product.orderedProductAmount}`
                            )}
                            {viewFormat(
                              "Quantity",
                              product.orderedProductQuantity
                            )}
                            {viewFormat("Weight", product.weight)}
                            {viewFormat("Payment Mode", product.modeOfPayment)}
                            {viewFormat(
                              "Weight Including Package",
                              product.weightInclusivePackage
                            )}
                          </Box>
                        </Box>
                        {/* </ReusableProduct> */}
                        {/* <Grid className="d-flex justify-content-end  align-items-end  ">
                          <Grid className="p-1">
                            <ButtonComponent
                              label="Download Invoice"
                              // onBtnClick={() => {

                              //   setshowAddress(true);
                              // }}
                              onBtnClick={() => {}}
                            />
                          </Grid>
                          <Grid className="p-1">
                            <ButtonComponent
                              label="Download Manifest"
                              onBtnClick={() => {}}
                            />
                          </Grid>
                        </Grid> */}
                      </Box>
                      <Grid className="d-flex justify-content-end  align-items-end ">
                        <Grid className="p-1">
                          <ButtonComponent
                            label="Download Invoice"
                            // onBtnClick={() => {

                            //   setshowAddress(true);
                            // }}
                            onBtnClick={() => {
                              downloadManifestFunction("invoice");
                            }}
                          />
                        </Grid>
                        <Grid className="p-1">
                          <ButtonComponent
                            label="Download Manifest"
                            onBtnClick={() => {
                              downloadManifestFunction("manifest");
                            }}
                          />
                        </Grid>
                      </Grid>
                    </>
                  );
                })}
              </Grid>
            </ModalComponent>
          </Paper>
        </>
      ) : (
        <ShowPreviousInvoices
          setShowInvoices={setShowInvoices}
          show={showInvoices}
        />
      )}
    </Paper>
  );
};
export default Generateinvoiceandmanifest;
