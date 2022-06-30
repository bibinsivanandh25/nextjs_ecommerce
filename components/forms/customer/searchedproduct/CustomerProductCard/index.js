/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import { Badge, Box, Paper } from "@mui/material";
// import Image from "next/image";
import React, { useState } from "react";
import CustomIcon from "services/iconUtils";
import CarousalComponent from "@/atoms/Carousel";

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
const images = [
  {
    src: "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
    altText: "Slide 1",
    // caption: "Slide 1",
  },
  {
    src: "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
    // altText: "Slide 2",
    // caption: "Slide 2",
  },
  {
    src: "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
    // altText: "Slide 3",
    // caption: "Slide 3",
  },
];

function CustomerProductgModal({
  data = {},
  handleIconClick = () => {},
  viewType = "",
}) {
  const [hover, setHover] = useState(false);
  const [iconcolor, setIconColor] = useState({});
  const mouseEnter = (name) => {
    setIconColor((prev) => ({ ...prev, [name]: true }));
  };
  const mouseLeave = (name) => {
    setIconColor((prev) => ({ ...prev, [name]: false }));
  };
  return (
    <div
      className={
        viewType === "row"
          ? "w-100 d-flex bg-white p-1 rounded border my-2 "
          : "w-100 d-flex flex-column bg-white p-1 rounded "
      }
    >
      <Paper
        elevation={hover ? 3 : 0}
        sx={{
          width: viewType === "row" ? "20%" : "100%",
          height: viewType === "row" ? "25vh" : "30vh",
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
        onMouseEnter={() => {
          setHover(true);
        }}
        style={{ position: "relative" }}
      >
        {/* {hover ? (
          <>
            <div className="poistion-relative">
              <CarousalComponent
                interval={1500}
                autoPlay={hover}
                stopOnHover={false}
                dynamicHeight={false}
                images={images}
                showIndicators={hover}
                carouselImageHeight={viewType === "Grid" ? "30vh" : "25vh"}
              />
            </div>
            {data.flag && (
              <Badge
                style={{
                  borderTopLeftRadius: "4px",
                  position: "absolute",
                  top: 3,
                }}
                className="bg-orange fs-12 text-white px-2 ms-1"
              >
                Best Seller
              </Badge>
            )}
          </>
        ) : (
          <>
            <Image
              src="https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png"
              layout="fill"
              alt=""
              className={
                hover ? "rounded bg-white " : "rounded bg-white  opacity-75"
              }
            />
            {data.flag && (
              <Badge
                style={{
                  borderTopLeftRadius: "4px",
                  position: "absolute",
                  top: 3,
                }}
                className="bg-orange fs-12 align-top text-white px-2 ms-1"
              >
                Best Seller
              </Badge>
            )}
          </>
        )} */}
        <>
          <div className="poistion-relative">
            <CarousalComponent
              interval={1500}
              autoPlay={hover}
              stopOnHover={false}
              dynamicHeight={false}
              images={images}
              showIndicators={hover}
              carouselImageMaxHeight={viewType === "Grid" ? "30vh" : "0"}
              carouselImageMinHeight={viewType === "Grid" ? "0" : "25vh"}
            />
          </div>
          {data.flag && (
            <Badge
              style={{
                borderTopLeftRadius: "4px",
                position: "absolute",
                top: 3,
              }}
              className="bg-orange fs-12 text-white px-2 ms-1"
            >
              Best Seller
            </Badge>
          )}
        </>
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
      <Box className={viewType === "row" ? "ms-3 h-150 w-100 " : "my-1 h-150 "}>
        <Box
          className={viewType === "row" ? "d-flex justify-content-between" : ""}
        >
          <p className="fs-20 fw-600">{data.title}</p>
          {data.offerFlag && viewType === "row" && (
            <Badge className="text-danger fs-12">
              Offer ends in 09h 42min 2sec
            </Badge>
          )}
        </Box>
        <p
          className="fs-14 text-secondary"
          style={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            wordBreak: "break-all",
            whiteSpace: "nowrap",
          }}
        >
          {data.shortDescription}
        </p>
        {data.offer ? (
          <div className="h-30">
            <div
              style={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                wordBreak: "break-all",
                whiteSpace: "nowrap",
              }}
            >
              <span className="fs-12 text-secondary">Actual Cost :</span>
              <span className="fs-12 fw-500">
                &#8377;{data.actualCost} - &#8377;555 MRP : 2500 (56% Off)
              </span>
            </div>
            <div
              style={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                wordBreak: "break-all",
                whiteSpace: "nowrap",
              }}
            >
              <span className="fs-12 text-secondary">Actual Cost :</span>
              <span className="fs-12 fw-500">
                &#8377;{data.freeDelivary} - &#8377;555 MRP : 2500 (56% Off)
              </span>
            </div>
          </div>
        ) : (
          <p className="h-30 pt-3 fw-600"> &#8377;{data.actualCost}</p>
        )}
        <div
          className={
            viewType === "row" ? "d-flex justify-content-end me-3" : "d-flex"
          }
        >
          <div className="ms-2 me-3">
            <CustomIcon
              title="View Count"
              type="view"
              className="fs-18"
              onIconClick={() => {}}
              showColorOnHover={false}
            />
            <span className="fs-12"> 23445</span>
          </div>
          <div>
            <CustomIcon
              title="Total Order"
              type="airportShuttleOutlinedIcon"
              className="fs-18"
              onIconClick={() => {}}
              showColorOnHover={false}
            />
            <span className="fs-12"> 23445</span>
          </div>
        </div>
        {data.offerFlag && viewType === "Grid" && (
          <Box className="d-flex justify-content-end">
            <p className="text-danger fs-12"> Offer ends in 09h 42min 2sec</p>
          </Box>
        )}
      </Box>
    </div>
  );
}

export default CustomerProductgModal;
