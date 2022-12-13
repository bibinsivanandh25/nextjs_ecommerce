import { Box, Paper, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import Image from "next/image";
import CustomIcon from "services/iconUtils";
import StarRatingComponentReceivingRating from "@/atoms/StarRatingComponentReceiving";
import Link from "next/link";

const ProductCard = ({
  item,
  handleIconClick = () => {},
  height = 150,
  width = 150,
}) => {
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
  const [hover, setHover] = useState(false);
  const [iconcolor, setIconColor] = useState({});
  const mouseEnter = (name) => {
    setIconColor((prev) => ({ ...prev, [name]: true }));
  };
  const mouseLeave = (name) => {
    setIconColor((prev) => ({ ...prev, [name]: false }));
  };
  return (
    <Link
      href={{
        pathname: "/customer/productdetails",
        query: { id: item?.id },
      }}
      as="/customer/productdetails"
      passHref
    >
      <Box
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        maxWidth={165}
        className="position-relative"
      >
        <Paper
          elevation={hover ? 6 : 3}
          className="mx-2 position-relative"
          style={{
            minHeight: 150,
            minWidth: 150,
          }}
        >
          <Image
            src={item.image}
            height={height}
            width={width}
            layout="responsive"
          />
        </Paper>
        <Tooltip title={item.title}>
          <Typography className="h-5 fw-bold text-center text-truncate my-1 px-2">
            {item.title}
          </Typography>
        </Tooltip>
        <Box className="d-flex justify-content-center align-items-center mb-1">
          <StarRatingComponentReceivingRating
            rating={item.rating.rate}
            className="h-4"
          />
          <Typography className="h-6">{item.rating.count} ratings</Typography>
        </Box>
        <Box className="">
          <Box className="">
            <Typography className="fw-bold h-5 text-center">
              Rs. {item.price}
            </Typography>
            <Typography className="fw-bold h-6 text-center">
              (Actual Product Cost)
            </Typography>
          </Box>
          <Box className={!item.salePriceWithLogistics ? "d-none" : ""}>
            <Typography className="fw-bold h-5 text-center">
              Rs. {item.salePriceWithLogistics}
            </Typography>
            <Typography className="fw-bold h-6 text-center">
              (with free delivery & Return)
            </Typography>
          </Box>
        </Box>
        <Box
          className={
            hover ? "d-flex flex-row-reverse p-2 position-absolute" : "d-none"
          }
          sx={{ right: 5, top: 0 }}
        >
          <Box className="d-flex flex-column">
            {iconListData.map((ele, index) => (
              <Box
                sx={{
                  zIndex: "100",
                  padding: "1px",
                  width: "25px",
                  height: "25px",
                }}
                className={`rounded-circle mb-1 d-flex justify-content-center align-items-center ${
                  iconcolor[ele.iconName] ? "bg-orange" : "bg-white"
                }`}
                // eslint-disable-next-line react/no-array-index-key
                key={index}
              >
                <CustomIcon
                  type={ele.iconName}
                  className="h-5"
                  onIconClick={() => {
                    handleIconClick(ele.iconName);
                  }}
                  showColorOnHover={false}
                  onMouseEnter={() => mouseEnter(ele.iconName)}
                  onMouseLeave={() => mouseLeave(ele.iconName)}
                  color={
                    iconcolor[ele.iconName] ? "text-white" : "text-secondary"
                  }
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Link>
  );
};
export default ProductCard;
