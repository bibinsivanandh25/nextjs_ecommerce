import ButtonComponent from "components/atoms/ButtonComponent";
import ProgressBar from "components/atoms/ProgressBar";
import TableComponent from "components/atoms/TableComponent";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import logo from "../../../../../public/assets/logo.jpeg";
import Image from "next/image";
import SimpleDropdownComponent from "components/atoms/SimpleDropdownComponent";
import { useState } from "react";
import { Grid, Paper } from "@mui/material";
import OrderConfirmModal from "components/forms/supplier/myorder/orderconfirmodal";
import AcceptandConfirmAddress from "components/forms/supplier/myorder/acceptandconfirmaddress";
import { useRouter } from "next/router";
const AcceptandConfirmOrder = () => {
  const [dropDownValue, setDropDownValue] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [showConfirmAdress, setshowConfirmAdress] = useState(false);

  const router = useRouter();
  console.log(router.query);
  const columns = [
    {
      id: "col1", //id value in column should be presented in row as key
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
    {
      id: "col10",
      label: "Action",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
  ];
  let rows = [
    {
      id: "1",
      col1: <Image src={logo} height={50} width={50} />,
      col2: "#23234342",
      col3: "#23234342",
      col4: "SL1234",
      col5: "UK34",
      col6: "600gms",
      col7: "28 May 2020",
      col8: "28 May 2020",
      col9: "500",
      col10: (
        <div className="d-flex justify-content-between align-items-center">
          <ButtonComponent variant="oulined" label="cancel" />
          <RemoveRedEyeIcon />
        </div>
      ),
    },
    {
      id: "1",
      col1: <Image src={logo} height={50} width={50} />,
      col2: "#23234342",
      col3: "#23234342",
      col4: "SL1234",
      col5: "UK34",
      col6: "600gms",
      col7: "28 May 2020",
      col8: "28 May 2020",
      col9: "500",
      col10: (
        <div className="d-flex justify-content-between align-items-center">
          <ButtonComponent variant="oulined" label="cancel" />
          <RemoveRedEyeIcon />
        </div>
      ),
    },
  ];

  return (
    <Paper sx={{ p: 2 }}>
      <ProgressBar
        steps={[
          "Accept & confirm Adress",
          "Generate Invoice & Manifest ",
          "Upload Maifest",
        ]}
        showHeader
      />
      {!showConfirmAdress ? (
        <div>
          <div className="d-flex justify-content-end">
            <div className="w-25">
              <SimpleDropdownComponent
                size={"small"}
                list={[
                  { label: "Zero Commission", id: 1, value: "Zero Commission" },
                  { label: "Full Commission", id: 2, value: "Full Commission" },
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
            <ButtonComponent
              label="Confirm Orders"
              muiProps="me-2"
              onBtnClick={() => {
                setshowConfirmAdress(!showConfirmAdress);
                setOpenModal(!openModal);
              }}
            />
          </div>

          <Paper className="py-3">
            <TableComponent
              table_heading="34 Orders"
              columns={columns}
              tableRows={rows}
            />
          </Paper>
        </div>
      ) : (
        <AcceptandConfirmAddress />
      )}
      {/* <OrderConfirmModal openModal={openModal} setOpenModal={setOpenModal} /> */}
    </Paper>
  );
};
export default AcceptandConfirmOrder;
