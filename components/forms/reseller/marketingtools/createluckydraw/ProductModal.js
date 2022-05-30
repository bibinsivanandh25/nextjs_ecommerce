import ModalComponent from "components/atoms/ModalComponent";
import ImageCard from "components/atoms/ImageCard";
import CheckBoxComponent from "components/atoms/CheckBoxComponent";
import { assetsJson } from "public/assets";
import { Typography, Box, Grid } from "@mui/material";
import { useState } from "react";

const ProductModal = ({
  open = false,
  onCloseClick = () => {},
  submitBtnClick = () => {},
}) => {
  const [productArray, setproductArray] = useState([]);
  const displayProducts = () => {
    const temp = [];
    for (let i = 0; i < 30; i++) {
      temp.push(
        <Grid
          item
          md={2}
          className="d-flex flex-column align-items-center"
          key={1}
        >
          <ImageCard
            imgSrc={assetsJson.saree_reseller_home}
            showClose={false}
          />
          <Typography className="text-center">{"ele.title"}</Typography>
          <Typography className="text-center color-dark-green h-5 fw-bold">
            {"ele.discount"}
          </Typography>
          <div className="ms-2">
            <CheckBoxComponent isChecked={false} checkBoxClick={(id) => {}} />
          </div>
        </Grid>
      );
    }
    return [...temp];
  };
  return (
    <ModalComponent
      open={open}
      showPositionedClose
      showCloseIcon={false}
      showClearBtn={false}
      headerClassName="border-0"
      ModalTitle=""
      ModalWidth={1000}
      saveBtnText="Submit"
      footerClassName=" justify-content-end"
      onCloseIconClick={onCloseClick}
      onSaveBtnClick={() => {
        submitBtnClick(productArray);
      }}
    >
      <Box className="w-100 d-flex mxh-75vh">
        <Grid container className="d-flex w-100">
          {displayProducts()}
        </Grid>
      </Box>
    </ModalComponent>
  );
};
export default ProductModal;
