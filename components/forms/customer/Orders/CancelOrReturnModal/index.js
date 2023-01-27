/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Image from "next/image";
import ModalComponent from "@/atoms/ModalComponent";
import CheckBoxComponent from "@/atoms/CheckboxComponent";
import SimpleDropdownComponent from "@/atoms/SimpleDropdownComponent";
import { useSelector } from "react-redux";
import { returnProduct } from "services/customer/orders";
import toastify from "services/utils/toastUtils";
import validateMessage from "constants/validateMessages";
import ReturnOrderModel from "../../returnordermodel/ReturnOrderModel";

const returnList = [
  {
    id: 1,
    label: "Received a broken/damaged item",
    value: "Received a broken/damaged item",
  },
  {
    id: 2,
    label: "The produce reveived is defective",
    value: "The produce reveived is defective",
  },
];
const cancleList = [
  {
    id: 1,
    label: "Price for the product has decreased",
    value: "Price for the product has decreased",
  },
  {
    id: 2,
    label: "I have purchased the product elsewhere",
    value: "I have purchased the product elsewhere",
  },
  {
    id: 3,
    label: "I have changed my mind",
    value: "I have changed my mind",
  },
  {
    id: 4,
    label: "I have to return due to product quality issue",
    value: "I have to return due to product quality issue",
  },
  {
    id: 5,
    label: "I want to change my phone number",
    value: "I want to change my phone number",
  },
  {
    id: 6,
    label: "Expected delevery time is very long",
    value: "Expected delevery time is very long",
  },
  {
    id: 7,
    label: "I want to change address for the order",
    value: "I want to change address for the order",
  },
];
const CancelOrReturnModal = ({
  modalType = "cancel",
  showModal = false,
  setShowModal = () => {},
  setShowReturnOrder = () => {},
  setReturnProducts = () => {},
  selectedProduct,
  setSelectedProduct = () => {},
  selectedOldProduct,
  setgetOrderApiCall = () => {},
  getOrderApiCall,
}) => {
  const user = useSelector((state) => state.user);
  const [showOrderSuccessModal, setShowOrderSuccessModal] = useState(false);
  const [dropDownData, setDropDownData] = useState([]);
  const [CancelSuccessData, setCancelSuccessData] = useState([]);
  useEffect(() => {
    const temp = JSON.parse(JSON.stringify(selectedProduct));
    setDropDownData([...temp]);
  }, [selectedProduct]);
  const handleSelectDropDown = (val, id) => {
    const temp = JSON.parse(JSON.stringify(dropDownData));
    temp.forEach((ele) => {
      if (ele.orderId === id) {
        ele.dropDownValue = val;
      }
    });
    setDropDownData([...temp]);
    setSelectedProduct([...temp]);
  };
  const handleCloseClick = () => {
    setSelectedProduct([...selectedOldProduct]);
    setShowModal(false);
  };

  const getProducts = () => {
    return dropDownData.map((ele) => {
      return (
        <Box className="mb-3 px-5" key={ele.orderId}>
          <Box className="d-flex justify-content-between">
            <Box className="d-flex">
              <CheckBoxComponent
                size="medium"
                isChecked={ele.isSelected}
                id={ele.id}
                checkedcolor="#1492e6"
                checkBoxClick={(id) => {
                  const temp = [...dropDownData];
                  temp.forEach((item) => {
                    if (item.id == id) {
                      ele.isSelected = !ele.isSelected;
                    }
                  });
                  setDropDownData([...temp]);
                }}
              />
              <Typography component="" className="fs-6 fw-bold">
                {ele.title}
                <Typography className="h-5">
                  <Typography component="span" className="h-5">
                    Order Type :{" "}
                  </Typography>
                  <Typography component="span" className="h-5">
                    Free Delivery and Return{" "}
                  </Typography>
                </Typography>
                <Typography>
                  <Typography component="span" className="h-5">
                    {modalType === "return"
                      ? "Return shipment charges : "
                      : "Cancellation Charges :"}
                  </Typography>
                  <Typography component="span" className="text-success h-5">
                    Free
                  </Typography>
                </Typography>
              </Typography>
            </Box>
            <Box>
              <Image src={ele.productImage} height={75} width={100} />
            </Box>
          </Box>
          <Box className="d-flex justify-content-between align-items-center">
            <Typography className="fw-bold h-5">
              Reason for {modalType === "return" ? "Returning" : "Cancelling"} :{" "}
            </Typography>
            <Box className="w-70p">
              {/* <SimpleDropdownComponent size="small" /> */}
              <SimpleDropdownComponent
                list={modalType === "cancel" ? cancleList : returnList}
                size="small"
                label="Select Reason"
                id={ele.orderId}
                inputlabelshrink
                onDropdownSelect={(val) => {
                  handleSelectDropDown(val, ele.orderId);
                }}
                value={ele.dropDownValue}
                helperText={ele.error ? validateMessage.field_required : ""}
              />
            </Box>
          </Box>
        </Box>
      );
    });
  };
  const getSelectedItems = () => {
    const temp = selectedProduct.filter((ele) => ele.isSelected);
    setReturnProducts([...temp]);
  };
  const dropDownValidation = () => {
    const temp = JSON.parse(JSON.stringify(dropDownData));
    temp.forEach((val) => {
      if (val.dropDownValue === null) {
        val.error = true;
      } else {
        val.error = false;
      }
    });
    setDropDownData(temp);
    const result = temp.every((x) => x.error === false);
    return result;
  };

  const cancelProduct = async () => {
    const type = "CANCEL";
    let payload = [];
    dropDownData.forEach((val) => {
      payload = [
        ...payload,
        {
          orderId: val.orderId,
          emailAddress: user.emailId,
          addressId: "",
          reason: val?.dropDownValue?.value,
          productImage: val.productImage,
        },
      ];
    });
    const validate = dropDownValidation();
    if (validate) {
      const { data, errRes } = await returnProduct(payload, type);
      if (data) {
        setCancelSuccessData(data.data);
        toastify(data?.message, "success");
        setShowOrderSuccessModal(true);
      } else if (errRes) {
        toastify(errRes?.response?.data?.message, "error");
      }
    }
  };
  return (
    <ModalComponent
      open={showModal}
      footerClassName="d-flex justify-content-end "
      ModalWidth={700}
      ModalTitle=""
      onCloseIconClick={() => handleCloseClick()}
      onSaveBtnClick={() => {
        handleCloseClick();
      }}
      clearBtnVariant="contained"
      saveBtnVariant="outlined"
      ClearBtnText="Continue"
      saveBtnText="Cancel"
      onClearBtnClick={() => {
        if (modalType === "return")
          // eslint-disable-next-line no-unused-expressions
          dropDownValidation() && setShowReturnOrder(true);
        else cancelProduct();
        getSelectedItems();
      }}
    >
      <Typography className="fw-bold text-center my-2">
        Are you sure want to {modalType === "return" ? "Return" : " Cancel"}
        &nbsp;these products?
      </Typography>
      <Box className="mxh-400 overflow-auto ">{getProducts()}</Box>
      <ReturnOrderModel
        setgetOrderApiCall={setgetOrderApiCall}
        getOrderApiCall={getOrderApiCall}
        setSelectedProduct={setSelectedProduct}
        ShowReturnOrder={showOrderSuccessModal}
        setShowReturnOrder={setShowOrderSuccessModal}
        returnSuccessData={CancelSuccessData}
        setreturnSuccessData={setCancelSuccessData}
        showModal={showOrderSuccessModal}
        setShowModal={setShowModal}
      />
    </ModalComponent>
  );
};
export default CancelOrReturnModal;
