import { Badge, Box, Paper, Rating } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import CustomIcon from "services/iconUtils";

const iconListData = [
  {
    iconName: "viewCarouselOutlinedIcon",
    title: "View",
  },
  {
    iconName: "favoriteBorderIcon",
    title: "Favorite",
  },
  {
    iconName: "localMallIcon",
    title: "Favorite",
  },
  {
    iconName: "visibilityOutlinedIcon",
    title: "Search",
  },
  {
    iconName: "balanceIcon",
    title: "Search",
  },
];
function SimilarProducts({ data = {}, handleIconClick = () => {} }) {
  const [hover, setHover] = useState(false);
  const [iconcolor, setIconColor] = useState({});
  const mouseEnter = (name) => {
    setIconColor((prev) => ({ ...prev, [name]: true }));
  };
  const mouseLeave = (name) => {
    setIconColor((prev) => ({ ...prev, [name]: false }));
  };
  return (
    <Box className="w-100 d-flex flex-column bg-white p-1 rounded">
      <Paper
        elevation={hover ? 6 : 3}
        sx={{
          position: "relative",
          width: "90%",
          height: "170px",
          marginLeft: "0.65rem",
        }}
        onMouseEnter={() => {
          setHover(true);
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
      >
        <Image
          src="https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png"
          layout="fill"
          width={100}
          height={100}
          alt=""
          className="rounded bg-white"
        />
        {data.flag && (
          <Badge
            style={{ borderTopLeftRadius: "4px" }}
            className="bg-orange fs-12 align-top text-white px-2"
          >
            Best Seller
          </Badge>
        )}

        <Box
          className={hover ? "d-block" : "d-none"}
          style={{ position: "absolute", top: 10, right: 0 }}
        >
          <Box className="d-flex flex-row-reverse p-2">
            <Box className="d-flex flex-column">
              {iconListData.map((item, index) => (
                <Box
                  sx={{
                    zIndex: "100",
                    padding: "1px",
                    width: "25px",
                    height: "25px",
                  }}
                  className={`rounded-circle mb-1 d-flex justify-content-center align-items-center ${
                    iconcolor[item.iconName] ? "bg-orange" : "bg-white"
                  }`}
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                >
                  <CustomIcon
                    type={item.iconName}
                    className="fs-18"
                    onIconClick={() => {
                      handleIconClick(item.iconName);
                    }}
                    showColorOnHover={false}
                    onMouseEnter={() => mouseEnter(item.iconName)}
                    onMouseLeave={() => mouseLeave(item.iconName)}
                    color={
                      iconcolor[item.iconName] ? "text-white" : "text-secondary"
                    }
                  />
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Paper>
      <Box className="my-1 align-self-center mt-2">
        <p className="fs-16 fw-600">{data.title}</p>
      </Box>
      <Box className="d-flex justify-content-center">
        <Rating name="half-rating" value={4} readOnly />
        <span className="fs-12 mt-1"> 192 Rating</span>
      </Box>
      <Box className="align-self-center">
        <span className="fw-600 fs-14">RS. 897.00</span>
      </Box>
    </Box>
  );
}

export default SimilarProducts;
