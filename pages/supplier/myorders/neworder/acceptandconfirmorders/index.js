import ButtonComponent from "components/atoms/ButtonComponent";
import ProgressBar from "components/atoms/ProgressBar";
import TableComponent from "components/atoms/TableComponent";
import Image from "next/image";
import SimpleDropdownComponent from "components/atoms/SimpleDropdownComponent";
import { useState } from "react";
import { Paper } from "@mui/material";
import AcceptandConfirmAddress from "components/forms/supplier/myorder/acceptandconfirmaddress";
import CustomIcon from "services/iconUtils";
import logo from "../../../../../public/assets/logo.jpeg";

const AcceptandConfirmOrder = () => {
  const [dropDownValue, setDropDownValue] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [showConfirmAdress, setshowConfirmAdress] = useState(false);

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
      label: "Style Code",
      // minWidth: 50,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col5",
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
      id: "col6",
      label: "Order Date",
      // minWidth: 50,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col7",
      label: "Expected Dispatch Date",
      // minWidth: 50,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col8",
      label: "weight (inclusive of package)",
      // minWidth: 50,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col9",
      label: "Action",
      // minWidth: 50,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
  ];
  const rows = [
    {
      id: "1",
      col1: <Image src={logo} height={50} width={50} alt="" />,
      col2: "#23234342",
      col3: "#23234342",
      col4: "SL1234",
      col5: "UK34",
      col6: "28 May 2020",
      col7: "28 May 2020",
      col8: "500",
      col9: (
        <div className="d-flex justify-content-between align-items-center">
          <ButtonComponent muiProps="fs-12" variant="outlined" label="Cancel" />
          <CustomIcon type="remove" title="Detail" />
        </div>
      ),
    },
    {
      id: "2",
      col1: <Image src={logo} height={50} width={50} alt="" />,
      col2: "#23234342",
      col3: "#23234342",
      col4: "SL1234",
      col5: "UK34",
      col6: "28 May 2020",
      col7: "28 May 2020",
      col8: "500",
      col9: (
        <div className="d-flex justify-content-between align-items-center">
          <ButtonComponent muiProps="fs-12" variant="outlined" label="Cancel" />
          <CustomIcon type="remove" title="Detail" />
        </div>
      ),
    },
  ];

  return (
    <Paper
      sx={{ p: 2 }}
      className="position-relative mnh-80vh mxh-80vh overflow-auto hide-scrollbar"
    >
      <ProgressBar showHeader />
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
            <ButtonComponent
              label="Confirm Orders"
              muiProps="me-2"
              onBtnClick={() => {
                setshowConfirmAdress(!showConfirmAdress);
                setOpenModal(!openModal);
              }}
            />
          </div>

          <Paper className="py-3 mt-3">
            <TableComponent
              table_heading="34 New Orders"
              columns={columns}
              tableRows={rows}
            />
          </Paper>
        </div>
      ) : (
        <AcceptandConfirmAddress setshowConfirmAdress={setshowConfirmAdress} />
      )}
      {/* <OrderConfirmModal openModal={openModal} setOpenModal={setOpenModal} /> */}
    </Paper>
  );
};
export default AcceptandConfirmOrder;
