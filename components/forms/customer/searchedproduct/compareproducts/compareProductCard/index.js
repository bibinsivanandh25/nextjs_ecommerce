import { Box, Paper, Tooltip, Typography } from "@mui/material";
import Image from "next/image";
import StarRatingComponentReceivingRating from "@/atoms/StarRatingComponentReceiving";
import CheckBoxComponent from "@/atoms/CheckboxComponent";
import { useEffect, useState } from "react";

const CompareProductCard = ({
  item,
  height = 150,
  width = 150,
  handleCardClick = () => {},
  removeProductFromList = () => {},
}) => {
  const [productData, setProductData] = useState({});

  useEffect(() => {
    const temp = JSON.parse(JSON.stringify(item));
    if (!temp.isSelected) temp.isSelected = false;
    else temp.isSelected = true;
    setProductData(temp);
  }, [item]);
  return (
    <Box maxWidth={165} className="position-relative">
      <Paper
        className="mx-2 position-relative rounded"
        style={{
          minHeight: 150,
          minWidth: 150,
          overflow: "hidden",
        }}
      >
        <Image
          src={productData.image}
          height={height}
          width={width}
          layout="responsive"
        />
      </Paper>
      <Tooltip title={productData.title}>
        <div className="d-flex align-items-center mx-3">
          <CheckBoxComponent
            isChecked={productData?.isSelected}
            checkBoxClick={() => {
              const temp = JSON.parse(JSON.stringify(productData));
              temp.isSelected = !temp.isSelected;
              if (temp.isSelected) {
                handleCardClick(productData);
              } else {
                removeProductFromList(temp.id);
              }
              setProductData({ ...temp });
            }}
          />
          <Typography className="h-5 fw-bold text-center text-truncate my-1 px-2">
            {productData.title}
          </Typography>
        </div>
      </Tooltip>
      <Box className="d-flex justify-content-center align-items-center mb-1">
        <StarRatingComponentReceivingRating
          rating={productData?.rating?.rate}
          className="h-4"
        />
        <Typography className="h-6">
          {productData?.rating?.count} ratings
        </Typography>
      </Box>
      <Box className="">
        <Box className="">
          <Typography className="fw-bold h-5 text-center">
            Rs. {productData.price}
          </Typography>
          <Typography className="fw-bold h-6 text-center">
            (Actual Product Cost)
          </Typography>
        </Box>
        <Box className={!productData.salePriceWithLogistics ? "d-none" : ""}>
          <Typography className="fw-bold h-5 text-center">
            Rs. {productData.salePriceWithLogistics}
          </Typography>
          <Typography className="fw-bold h-6 text-center">
            (with free delivery & Return)
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
export default CompareProductCard;
