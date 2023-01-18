/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import { Box, Paper, Tooltip } from "@mui/material";
// import Image from "next/image";
import React, { useState } from "react";
import CustomIcon from "services/iconUtils";
import makeStyles from "@mui/styles/makeStyles";
import { AirportShuttleOutlined, RemoveRedEye } from "@mui/icons-material";
import CarousalComponent from "@/atoms/Carousel";

const useStyles = makeStyles(() => ({
  arrow: {
    "&:before": {
      border: "1px solid #E6E8ED",
    },
    color: "#fff",
  },
  tooltip: {
    backgroundColor: "#fff",
    border: "1px solid #E6E8ED",
    color: "#4A4A4A",
  },
}));
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

function ProductDetailsCard({
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
  // tooltip css changed
  const classes = useStyles();
  return (
    <div
      className={
        viewType === "row"
          ? "w-100 d-flex bg-white p-1 rounded border my-2 "
          : "w-100 d-flex flex-column bg-white py-1 px-2 rounded  "
      }
    >
      <Paper
        elevation={hover ? 3 : 0}
        sx={{
          width: viewType === "row" ? "20%" : "100%",
          // height: viewType === "row" ? "170px" : "200px",
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
                className="bg-orange h-5 text-white px-2 ms-1"
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
                className="bg-orange h-5 align-top text-white px-2 ms-1"
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
              list={data.images}
              showIndicators={hover}
              carouselImageMaxHeight={viewType === "Grid" ? "250px" : "0"}
              carouselImageMinHeight={viewType === "Grid" ? "250px" : "170px"}
            />
          </div>
          {/* {data.flag && (
            <Badge
              style={{
                borderTopLeftRadius: "4px",
                position: "absolute",
                top: 3,
              }}
              className="bg-orange h-5 text-white px-2 ms-1"
            >
              Best Seller
            </Badge>
          )} */}
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
                    iconcolor[item.iconName] ? "theme_bg_color" : "bg-white"
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
      <Box
        className={viewType === "row" ? "ms-3 h-150 w-100 " : "my-1 h-150 ps-2"}
      >
        <Box
          className={viewType === "row" ? "d-flex justify-content-between" : ""}
        >
          <p className="fs-18 fw-600 text-truncate">{data.title}</p>
          {/* {data.offerFlag && viewType === "row" && (
            <Badge className="text-danger h-5">
              Offer ends in 09h 42min 2sec
            </Badge>
          )} */}
        </Box>
        <p
          className="h-5 text-secondary"
          style={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            wordBreak: "break-all",
            whiteSpace: "nowrap",
          }}
        >
          {data.description}
        </p>
        <div className="h-50">
          <div
            style={{
              textOverflow: "ellipsis",
              overflow: "hidden",
              wordBreak: "break-all",
              whiteSpace: "nowrap",
            }}
          >
            <span
              className={
                viewType === "row"
                  ? "h-5 text-secondary"
                  : "fs-10 text-secondary"
              }
            >
              Actual Cost :
            </span>
            <span className="h-5 fw-bold">{data.actualCost}</span>
            <Tooltip title="MRP" placement="top">
              <span className=" h-5 ms-2 text-decoration-line-through">
                {data?.mrp}
              </span>
            </Tooltip>
            <span className="h-5">({data.actualCostOff} Off)</span>
          </div>
          <div
            style={{
              textOverflow: "ellipsis",
              overflow: "hidden",
              wordBreak: "break-all",
              whiteSpace: "nowrap",
            }}
          >
            <span
              className={
                viewType === "row"
                  ? "h-5 text-secondary"
                  : "fs-10 text-secondary"
              }
            >
              Free Delivery :
            </span>
            <span className="h-5 fw-bold">{data.freeDeliveryCost}</span>
            <Tooltip title="MRP" placement="top">
              <span className=" h-5 ms-2 text-decoration-line-through">
                {data.mrp}
              </span>
            </Tooltip>
            <span className="h-5">({data.freeDeliveryCostOff} Off)</span>
          </div>
        </div>

        <div
          className={
            viewType === "row" ? "d-flex justify-content-end me-3" : "d-flex"
          }
        >
          <Tooltip
            title={<span className="bg-primary">View Count</span>}
            placement="top"
            arrow
            classes={{ arrow: classes.arrow, tooltip: classes.tooltip }}
          >
            <div className="ms-2 me-3">
              <RemoveRedEye className="fs-14 color-gray " />
              <span className="h-5"> {data.viewCount}</span>
            </div>
          </Tooltip>
          <Tooltip
            title="Total Order"
            placement="top"
            arrow
            classes={{ arrow: classes.arrow, tooltip: classes.tooltip }}
          >
            <div>
              <AirportShuttleOutlined className="fs-14 color-gray" />
              <span className="h-5"> {data.orderCount}</span>
            </div>
          </Tooltip>
        </div>
        {data.offerFlag && viewType === "Grid" && (
          <Box className="d-flex justify-content-end">
            <p className="text-danger h-5"> Offer ends in 09h 42min 2sec</p>
          </Box>
        )}
      </Box>
    </div>
  );
}

export default ProductDetailsCard;
