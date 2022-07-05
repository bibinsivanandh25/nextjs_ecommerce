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

const CancelOrReturnModal = ({
  showModal = false,
  setShowModal = () => {},
  products = [],
  setShowReturnOrder = () => {},
  setReturnProducts = () => {},
}) => {
  const [selectedProduct, setSelectedProduct] = useState([]);

  useEffect(() => {
    const temp = [...products];
    temp.forEach((ele) => {
      ele.isSelected = true;
    });
    setSelectedProduct([...temp]);
  }, [products]);
  const getProducts = () => {
    return selectedProduct.map((ele) => {
      return (
        <Box className="mb-3 px-5">
          <Box className="d-flex justify-content-between">
            <Box className="d-flex">
              <CheckBoxComponent
                size="medium"
                isChecked={ele.isSelected}
                id={ele.id}
                checkedcolor="#1492e6"
                checkBoxClick={(id) => {
                  const temp = [...selectedProduct];
                  temp.forEach((item) => {
                    if (item.id == id) {
                      ele.isSelected = !ele.isSelected;
                    }
                  });
                  console.log(temp);
                  setSelectedProduct([...temp]);
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
                    Return shipment charges :
                  </Typography>
                  <Typography component="span" className="text-success h-5">
                    Free
                  </Typography>
                </Typography>
              </Typography>
            </Box>
            <Box>
              <Image src={ele.image} height={75} width={100} />
            </Box>
          </Box>
          <Box className="d-flex justify-content-between align-items-center">
            <Typography className="fw-bold h-5">
              Reason for Returning :{" "}
            </Typography>
            <Box className="w-70p">
              <SimpleDropdownComponent size="small" />
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
  return (
    <ModalComponent
      open={showModal}
      footerClassName="d-flex justify-content-end "
      ModalWidth={700}
      ModalTitle=""
      onCloseIconClick={() => setShowModal(false)}
      clearBtnVariant="contained"
      saveBtnVariant="outlined"
      ClearBtnText="Continue"
      saveBtnText="Cancel"
      onClearBtnClick={() => {
        setShowReturnOrder(true);
        getSelectedItems();
      }}
    >
      <Typography className="fw-bold text-center my-2">
        Are you sure want to Return these products?
      </Typography>
      <Box className="mxh-400 overflow-auto ">{getProducts()}</Box>
    </ModalComponent>
  );
};
export default CancelOrReturnModal;
