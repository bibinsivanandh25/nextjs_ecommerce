import ButtonComponent from "components/atoms/ButtonComponent";
import ProgressBar from "components/atoms/ProgressBar";
import TableComponent from "components/atoms/TableComponent";
import Image from "next/image";
import SimpleDropdownComponent from "components/atoms/SimpleDropdownComponent";
import toastify from "services/utils/toastUtils";
import { useState } from "react";
import { Box, Button, Paper } from "@mui/material";
import AcceptandConfirmAddress from "components/forms/supplier/myorder/acceptandconfirmaddress";
import CustomIcon from "services/iconUtils";
import { useRouter } from "next/router";

import OrderConfirmModal from "@/forms/supplier/myorder/orderconfirmodal";
import ModalComponent from "@/atoms/ModalComponent";
import InputBox from "@/atoms/InputBoxComponent";
// import logo from "../../../../../public/assets/logo.jpeg";

const AcceptandConfirmOrder = () => {
  const [dropDownValue, setDropDownValue] = useState();
  const [showConfirmAdress, setshowConfirmAdress] = useState(false);
  const [enableConfirmOrders, setEnableConfirmOrders] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showSupplierShipmentModal, setShowSupplierShipmentModal] =
    useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [categoryType, setCategoryType] = useState(null);
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
      label: "Size",
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
  const rows = [
    {
      id: "1",
      col1: <Image src="" height={50} width={50} alt="" />,
      col2: "#23234342",
      col3: "#23234342",
      col4: "SL1234",
      col5: "Last Mile(AC/FD)",
      col6: "UK34",
      col7: "28 May 2020",
      col8: "28 May 2020",
      col9: "5009990",
      col10: (
        <div className="d-flex justify-content-between align-items-center">
          <CustomIcon
            type="edit"
            title="edit"
            onIconClick={() => setShowEditModal(true)}
          />
          <ButtonComponent muiProps="h-6" variant="outlined" label="Cancel" />
          <CustomIcon type="remove" title="Detail" />
        </div>
      ),
      categoryType: "cloth",
    },
    {
      id: "2",
      col1: <Image src="" height={50} width={50} alt="" />,
      col2: "#23234342",
      col3: "#23234342",
      col4: "SL1234",
      col5: "Supplier Shipment",
      col6: "UK34",
      col7: "28 May 2020",
      col8: "--",
      col9: "--",
      col10: (
        <div className="d-flex justify-content-between align-items-center">
          <CustomIcon
            type="edit"
            title="edit"
            onIconClick={() => setShowEditModal(true)}
          />
          <ButtonComponent muiProps="h-6" variant="outlined" label="Cancel" />
          <CustomIcon type="remove" title="Detail" />
        </div>
      ),
      categoryType: "Accesories",
    },
    {
      id: "3",
      col1: <Image src="" height={50} width={50} alt="" />,
      col2: "#23234342",
      col3: "#23234342",
      col4: "SL1234",
      col5: "Delivery by store Owner",
      col6: "UK34",
      col7: "28 May 2020",
      col8: "--",
      col9: "--",
      col10: (
        <div className="d-flex justify-content-between align-items-center">
          <CustomIcon
            type="edit"
            title="edit"
            onIconClick={() => {
              setCategoryType("mobile");
              setShowEditModal(true);
            }}
          />
          <ButtonComponent muiProps="h-6" variant="outlined" label="Cancel" />
          <CustomIcon type="remove" title="Detail" />
        </div>
      ),
      categoryType: "Mobile",
    },
    {
      id: "4",
      col1: <Image src="" height={50} width={50} alt="" />,
      col2: "#23234342",
      col3: "#23234342",
      col4: "SL1234",
      col5: "Hand picked",
      col6: "UK34",
      col7: "28 May 2020",
      col8: "--",
      col9: "--",
      col10: (
        <div className="d-flex justify-content-between align-items-center">
          <CustomIcon
            type="edit"
            title="edit"
            onIconClick={() => setShowEditModal(true)}
          />
          <ButtonComponent muiProps="h-6" variant="outlined" label="Cancel" />
          <CustomIcon type="remove" title="Detail" />
        </div>
      ),
      categoryType: "Mobile",
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

  const getModeOfOrder = (item = []) => {
    const modeOfOrders = [];
    item.forEach((id) => {
      rows.forEach((ele) => {
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

  return (
    <Paper
      sx={{ p: 2 }}
      className="position-relative mnh-80vh mxh-80vh overflow-auto hide-scrollbar"
    >
      <ProgressBar showHeader steps={progressBarSteps} />
      {!showConfirmAdress ? (
        <div>
          <div className="d-flex justify-content-end">
            <div className="w-25">
              <SimpleDropdownComponent
                size="small"
                list={[
                  { label: "Zero Commission", id: 1, value: "Zero Commission" },
                  {
                    label: "Fixed Commission",
                    id: 2,
                    value: "Fixed Commission",
                  },
                ]}
                onDropdownSelect={(val) => {
                  setDropDownValue(val);
                }}
                value={dropDownValue}
                label="commission"
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
                if (selectedCategory === "Last Mile(AC/FD)") {
                  setshowConfirmAdress(true);
                }
                if (selectedCategory === "Supplier Shipment") {
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
            {/* <ButtonComponent
              label="Confirm Orders"
              muiProps="me-2"
              disabled={!enableConfirmOrders}
              // variant={enableConfirmOrders ? "contained" : "outlined"}
              bgColor={enableConfirmOrders ? "bg-orange" : "bg-secondary"}
              textColor="text-white"
              onBtnClick={() => {
                setshowConfirmAdress(!showConfirmAdress);
                setOpenModal(!openModal);
              }}
            /> */}
          </div>

          <Paper
            className="py-3 mt-3 mnh-40vh  overflow-auto hide-scrollbar"
            sx={{
              maxHeight: "50vh !important",
            }}
          >
            <TableComponent
              table_heading="34 New Orders"
              columns={columns}
              tableRows={rows}
              OnSelectionChange={(item) => {
                getModeOfOrder(item);
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
        onSaveBtnClick={() => setShowEditModal(false)}
        onClearBtnClick={() => setShowEditModal(false)}
        footerClassName="justify-content-end"
      >
        <Box className="my-3">
          <InputBox
            placeholder={
              categoryType === "mobile"
                ? "Enter IMEI Number"
                : "Enter Serial Number"
            }
          />
        </Box>
      </ModalComponent>
    </Paper>
  );
};
export default AcceptandConfirmOrder;
