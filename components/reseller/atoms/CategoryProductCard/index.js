import { Box, Card, Paper, Typography } from "@mui/material";
import Image from "next/image";
import productImg from "public/assets/registerConfirmIcon.png";
import { useState } from "react";
import styles from "./CategoryProductCard.module.css";

const CategoryProductCard = ({ data }) => {
  const [hover, setHover] = useState(false);

  return (
    <Box className="w-100 d-flex flex-column">
      <Paper
        className=""
        elevation={hover ? 10 : 3}
        onMouseEnter={() => {
          console.log("over");
          setHover(true);
        }}
        onMouseLeave={() => {
          console.log("leave");
          setHover(false);
        }}
        sx={{
          position: "relative",
          width: "100%",
          height: "30vh",
        }}
      >
        <Image src={productImg} layout="fill" />
        <Box
          className={`${
            !hover ? styles.hoverCard_none : styles.hoverCard_block
          }`}
        >
          <Box className="d-flex flex-row-reverse p-2">
            <Box className="d-flex flex-column">
              <Box>icon</Box>
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
    </Box>
  );
};
export default CategoryProductCard;
