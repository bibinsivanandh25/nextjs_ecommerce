/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import ModalComponent from "components/atoms/ModalComponent";
import ImageCard from "components/atoms/ImageCard";
import { Typography, Box, Grid, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import CheckBoxComponent from "@/atoms/CheckboxComponent";
import { getProducts } from "services/supplier/marketingtools/luckydraw/scratchcard";
import toastify from "services/utils/toastUtils";
import { useSelector } from "react-redux";

const ProductModal = ({
  open = false,
  onCloseClick = () => {},
  submitBtnClick = () => {},
  subCategoryId = null,
  selected = null,
}) => {
  const [productsList, setProductsList] = useState([]);
  const { supplierId } = useSelector((state) => state.user);

  const getProductsList = async () => {
    const { data, err } = await getProducts(supplierId, subCategoryId);
    if (data) {
      const temp = [];
      selected.forEach((item) => {
        temp.push(item.productVariationId);
      });
      setProductsList(
        data.map((item) => ({
          productVariationId: item.productVariationId,
          imageUrl: item.imageUrl,
          masterProductId: item.masterProductId,
          productTitle: item.productTitle,
          checked: temp.includes(item.productVariationId),
        }))
      );
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };

  useEffect(() => {
    if (subCategoryId && Array.isArray(selected)) {
      getProductsList();
    }
  }, [subCategoryId, selected]);

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
        submitBtnClick(
          productsList.filter((item) => {
            if (item.checked) {
              return {
                masterProductId: item.masterProductId,
                productTitle: item.productTitle,
              };
            }
          })
        );
      }}
    >
      <Box className="w-100 d-flex mxh-75vh">
        <Grid container className="d-flex w-100" spacing={2}>
          {/* {displayProducts()} */}
          {productsList.map((item, ind) => (
            <Grid
              item
              md={2}
              className="d-flex flex-column align-items-center"
              key={1}
            >
              <ImageCard imgSrc={item.imageUrl} showClose={false} />
              <Tooltip title={item.productTitle}>
                <Typography className="text-center text-truncate w-100">
                  {item.productTitle}
                </Typography>
              </Tooltip>
              {/* <Typography className="text-center color-dark-green h-5 fw-bold">
                ele.discount
              </Typography> */}
              <div className="ms-2">
                <CheckBoxComponent
                  isChecked={item.checked}
                  checkBoxClick={() => {
                    const temp = [...productsList];
                    temp[ind].checked = !temp[ind].checked;
                    setProductsList(temp);
                  }}
                />
              </div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </ModalComponent>
  );
};
export default ProductModal;
