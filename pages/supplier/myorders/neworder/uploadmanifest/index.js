/* eslint-disable no-unused-vars */
import ProgressBar from "components/atoms/ProgressBar";
import TableComponent from "components/atoms/TableComponent";
import PrintIcon from "@mui/icons-material/Print";

import { Grid, Paper, Tooltip, Typography } from "@mui/material";
import {
  getAllManifest,
  getMediaUrl,
  uploadMenifestData,
  viewManifest,
} from "services/supplier/myorders/newOrders";
import toastify from "services/utils/toastUtils";
import { useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import CustomIcon from "services/iconUtils";
import ModalComponent from "@/atoms/ModalComponent";
import ButtonComponent from "@/atoms/ButtonComponent";

import InputBox from "@/atoms/InputBoxComponent";

const UploadManifest = () => {
  const { supplierId } = useSelector((state) => state.user);
  const [pageNumber, setpageNumber] = useState(0);

  const [idState, setidState] = useState({
    orderId: "",
    orderedProductId: "",
    productVariationId: "",
  });
  const [getAllData, setgetAllData] = useState([]);
  const [uploadedDocument, setUploadedDocument] = useState({
    documentName: null,
    awb: null,
    document: null,
  });
  const taxRef = useRef(null);
  const [showUploadModal, setshowUploadModal] = useState(false);
  const columns = [
    {
      id: "col1", //  id value in column should be presented in row as key
      label: "Order Id",

      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col2", //  id value in column should be presented in row as key
      label: "Manifest ID",

      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col3",
      label: "AWB Number",

      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col4",
      label: "Manifest Date",

      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },

    {
      id: "col5",
      label: "Number of Products ",

      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col6",
      label: "Shipment Provider",

      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col7",
      label: "Ordered Product Status",

      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col8",
      label: "Action",

      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
  ];
  const viewManifestFunction = async (id) => {
    const { data, err } = await viewManifest(id);
    if (data) {
      const temp = data.data.manifestFielUrl;
      window.open(temp, "_blank").focus();
    } else if (err) {
      toastify(err.response.data.message, "error");
    }
  };
  const uploadFunction = async () => {
    const formdata = new FormData();
    formdata.append("medias", uploadedDocument.document);

    const { data, err } = await getMediaUrl(
      supplierId,
      idState.orderId,
      formdata
    );
    if (data) {
      const payload = {
        orderId: idState.orderId,
        orderedProductId: idState.orderedProductId,
        manifestFileUrl: data.data[0],
        productVariationId: idState.productVariationId,
      };
      const { uploadData, error } = await uploadMenifestData(payload);
      if (uploadData) {
        // console.log(uploadData, "upload");
      } else if (error) {
        toastify(error.response.data.message, "error");
      }
    } else if (err) {
      toastify(err.response.data.message, "error");
    }
  };
  const dataMaptoTable = (data) => {
    const temp = [];
    data.forEach((val, idx) => {
      temp.push({
        id: idx,
        col1: val.orderId,
        col2: val.manifestId,
        col3: val.awbNo,
        col4: val.manifestDate,
        col5: val.noOfProducts,
        col6: val.shipmentProvider,

        col7: val.orderedProductStatus,
        col8: (
          <Grid className="d-flex justify-content-around align-items-center ">
            {/* <Tooltip title="Upload" placement="top">
              <FileUploadIcon /> 
            </Tooltip> */}

            <CustomIcon
              // type="upload"
              type={val.uploaded ? "download" : "upload"}
              onIconClick={() => {
                if (val.uploaded) {
                  // downloadUploadedManifest(val.manifestFileUrl, val.orderId);
                  // const url = val.manifestFileUrl;
                  // const a = document.createElement("a");
                  // a.style.display = "none";
                  // a.href = url;
                  // // the filename you want
                  // a.download = `Manifest-Report-${format(
                  //   new Date(),
                  //   "MM-dd-yyyy HH-mm-ss"
                  // )}.pdf`;
                  // document.body.appendChild(a);
                  // a.click();
                  // console.log(url, "urlurl");
                  // window.URL.revokeObjectURL(url);

                  const element = document.createElement("a");
                  const file = val.manifestFileUrl;
                  element.href = file;
                  element.target = "_blank";
                  element.download = "Manifest";
                  element.click();

                  toastify("your file has downloaded!", "success");
                } else {
                  setshowUploadModal(true);

                  setidState({
                    orderId: val.orderId,
                    orderedProductId: val.orderedProductId,
                    productVariationId: val.productVariationId,
                  });
                  setUploadedDocument({
                    ...uploadedDocument,
                    awb: val.awbNo,
                  });
                }
              }}
            />

            {val.manifestFileUrl.length ? (
              <CustomIcon
                title="Detail"
                type="view"
                onIconClick={() => {
                  viewManifestFunction(val.manifestId);
                }}
              />
            ) : (
              <></>
            )}
          </Grid>
        ),
      });
    });
    return temp;
  };
  const getAllManifestFunction = async (page = pageNumber, key) => {
    const payload = {
      supplierId,
      keyword: key,
      pageNumber: page,
      pageSize: 50,
    };
    const { data, err } = await getAllManifest(payload);
    if (data) {
      if (page == 0) {
        setgetAllData(dataMaptoTable(data));
        setpageNumber((pre) => pre + 1);
      } else {
        setgetAllData((pre) => [...pre, ...dataMaptoTable(data)]);
      }
    } else if (err) {
      toastify(err.response.data.message, "error");
    }
  };
  useEffect(() => {
    getAllManifestFunction();
  }, []);
  return (
    <Paper
      sx={{ p: 2 }}
      className="mnh-80vh mxh-80vh overflow-auto hide-scrollbar"
    >
      <ProgressBar />
      <Paper className="py-3">
        <TableComponent
          showSearchFilter={false}
          columns={[...columns]}
          tableRows={[...getAllData]}
          handlePageEnd={(searchText = "", filterText = "", page) => {
            getAllManifestFunction(page, searchText);
            // getAllData(searchText, filterText, page);
          }}
        />
      </Paper>
      {showUploadModal && (
        <ModalComponent
          open={showUploadModal}
          onCloseIconClick={() => {
            setshowUploadModal(false);
            setUploadedDocument({ documentName: null, awbNo: null });
          }}
          onSaveBtnClick={() => {
            uploadFunction();
          }}
          footerClassName="justify-content-end"
          ClearBtnText="Cancel"
          ModalTitle="Upload"
          onClearBtnClick={() => {
            setshowUploadModal(false);
            setUploadedDocument({ documentName: null, awbNo: null });
          }}
        >
          <Grid container alignSelf="center" className="my-2">
            <Grid
              item
              sm={12}
              alignItems="center"
              className="border d-flex justify-content-between py-2 px-1"
            >
              <Typography>
                {uploadedDocument?.documentName?.length > 0
                  ? uploadedDocument?.documentName
                  : "Document Name"}
              </Typography>
              {/* <Typography>{uploadedDocument.taxInvoice}</Typography> */}
              <ButtonComponent
                onBtnClick={() => {
                  taxRef.current.click();
                }}
                label="Upload Document"
              />
            </Grid>
          </Grid>
          <input
            type="file"
            hidden
            ref={taxRef}
            onChange={(e) => {
              setUploadedDocument((pre) => ({
                ...pre,
                documentName: e.target.files[0].name,
                document: e.target.files[0],
              }));
            }}
          />
          <InputBox
            disabled
            label="Enter AWB No."
            onInputChange={(e) => {
              setUploadedDocument({
                ...uploadedDocument,
                awbNo: e.target.value,
              });
            }}
            value={uploadedDocument.awb}
          />
        </ModalComponent>
      )}
    </Paper>
  );
};
export default UploadManifest;
