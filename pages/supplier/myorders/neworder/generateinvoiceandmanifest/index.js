/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Grid, Paper } from "@mui/material";
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
import { getAllnewOrders } from "services/supplier/myorders/newOrders";
import ProgressBar from "../../../../../components/atoms/ProgressBar";

import styles from "./GenerateInvoiceandmanifest.module.css";

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
    label: "Last Mile AC",
    id: "LAST_MILE_AC",
    value: "LAST_MILE_AC",
  },
  {
    label: "Last Mile FDR",
    id: "LAST_MILE_FDR",
    value: "LAST_MILE_FDR",
  },
  {
    label: "Supplier Shipment",
    id: "SUPPLIER_SHIPMENT",
    value: "SUPPLIER_SHIPMENT",
  },
];
const Generateinvoiceandmanifest = () => {
  const { supplierId } = useSelector((state) => state.user);
  const [showInvoices, setShowInvoices] = useState(false);
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
      id: "col1", //  id value in column should be presented in row as key
      label: "Image",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col2",
      label: "Purchase ID",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col3",
      label: "Order ID",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col4",
      label: "Style Code",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col5",
      label: "Size",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col6",
      label: "Weight",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col7",
      label: "Order Date",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col8",
      label: "Expected Dispatch Date",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col9",
      label: "Add weight in grams including packaging",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
  ];

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

        categoryType: "Mobile",
      });
    });
    return temp;
  };
  const getAllConfirmedOrder = async (page = pageNumber, mode, keyword) => {
    const payload = {
      supplierId,
      status: "CONFIRMED",
      category: null,
      keyword: keyword || null,
      modeOfOrder: mode || null,
      pageNumber: page,
      pageSize: 10,
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
    getAllConfirmedOrder();
  }, []);
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
  const downloadManifestFunction = async () => {
    // const { data, err } = await getQrPdf();
    try {
      fetch(
        `${process.env.DOMAIN}notification/download-manifest?orderId=${orderId[0]}`
      )
        .then(async (resp) => {
          const blob = await resp.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.style.display = "none";
          a.href = url;
          // the filename you want
          a.download = `Manifest-Report-${format(
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
          <Grid container className="" spacing={1}>
            <Grid
              item
              lg={5}
              className="d-flex flex-column justify-content-end"
            >
              <p
                className={`${styles.Previousinvoicelink} fs-14 cursor-pointer`}
                onClick={() => {
                  setShowInvoices(true);
                }}
              >
                Show Previous Invoice
              </p>
            </Grid>
            <Grid
              item
              lg={7}
              className="d-flex align-items-center justify-content-end"
            >
              <p className="fs-12 fw-bold">Shipping Partner :&nbsp;</p>
              <div className="w-25">
                <SimpleDropdownComponent label="All" size="small" />
              </div>

              <ButtonComponent
                label="Download Invoice"
                size="large"
                muiProps="fs-11 mx-3"
                // onBtnClick={() => {
                //   route.push("/supplier/myorders/neworder/uploadmanifest");
                // }}
                disabled={orderId.length !== 1}
                onBtnClick={() => {}}
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
                  downloadManifestFunction();
                }}
              />
            </Grid>
          </Grid>
          {/* <Paper className="mt-2 py-3">
            <TableComponent
              tableRows={[...rows]}
              table_heading="5 Orders Confirmed"
              columns={[...columns]}
            />
          </Paper> */}
          .
          <Paper
            className="py-3 mt-3 mnh-40vh  overflow-auto hide-scrollbar"
            sx={{
              maxHeight: "50vh !important",
            }}
          >
            <TableComponent
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
          </Paper>
        </>
      ) : (
        <ShowPreviousInvoices setShowInvoices={setShowInvoices} />
      )}
    </Paper>
  );
};
export default Generateinvoiceandmanifest;
