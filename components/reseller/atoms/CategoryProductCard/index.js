import { Box, Paper, Typography } from "@mui/material";
import ButtonComponent from "components/atoms/ButtonComponent";
import Image from "next/image";
import { useState } from "react";
import styles from "./CategoryProductCard.module.css";

const CategoryProductCard = ({ data = [] }) => {
  const [hover, setHover] = useState(false);

  return (
    <Box className="w-100 d-flex flex-column">
      <Paper
        className=""
        elevation={hover ? 6 : 3}
        onMouseEnter={() => {
          setHover(true);
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
        sx={{
          position: "relative",
          width: "100%",
          height: "30vh",
        }}
      >
        <Image
          src="https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/flower.jpg"
          layout="fill"
          width={100}
          height={100}
          alt=""
        />
        <Box
          className={`${
            !hover ? styles.hoverCard_none : styles.hoverCard_block
          }`}
        >
          <Box className="d-flex flex-row-reverse p-2">
            <Box className="d-flex flex-column">
              <Box>
                <Image
                  src="https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/icon/watsapp-icon.png"
                  width={25}
                  height={25}
                  alt=""
                />
              </Box>
              <Box>icon</Box>
              <Box>icon</Box>
            </Box>
          </Box>
        </Box>
      </Paper>
      <Box className="d-flex">
        <Box className="d-flex align-items-center px-2 justify-content-between w-100">
          <Typography className="h-3">{data.title}</Typography>
          <Typography className="fw-600 fs-14 color-dark-green">
            Earn {data.profit_earned}
          </Typography>
        </Box>
      </Box>
      <Box className="d-flex flex-column px-2">
        <Typography className="h-5 flex-wrap">
          {data.shortDescription}
        </Typography>
        <Typography className="fs-14">
          Actual cost: <span className="fw-bold">{data.actualCost}</span>
        </Typography>
        <Typography className="fs-14">
          Free Delivary: <span className="fw-bold">{data.freeDelivary}</span>
        </Typography>
      </Box>
      {data?.no_of_Design > 1 ? (
        <Box className="px-2">
          <ButtonComponent
            label={`${data.no_of_Design} Designs`}
            variant="outlined"
            muiProps="w-100 bg-orange-transparnt"
          />
        </Box>
      ) : null}
    </Box>
  );
};
export default CategoryProductCard;
