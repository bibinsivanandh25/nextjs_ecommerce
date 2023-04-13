import { Box, Paper, Tooltip } from "@mui/material";
// import Image from "next/image";
import React, { useEffect, useState } from "react";
import CustomIcon from "services/iconUtils";
import makeStyles from "@mui/styles/makeStyles";
import { AirportShuttleOutlined, RemoveRedEye } from "@mui/icons-material";
import CarousalComponent from "@/atoms/Carousel";
import toastify from "services/utils/toastUtils";
// import { removeProductFromWishList } from "services/customer/wishlist";
import serviceUtil from "services/utils";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { cartCount, productDetails } from "features/customerSlice";
import { countCart } from "services/admin/storeList";
import DeliveryOptionsModal from "../../Home/buynowmodal";
import AddToWishListModal from "../../wishlist/AddToWishListModal";
import CompareProductDrawer from "../compareproducts/compareProductDrawer";
import SimilarProducts from "../SimilarProduct";
import ViewModalComponent from "../ViewModalComponent";

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
  productDetail = {},
  handleIconClick = () => {},
  viewType = "",
  getProducts = () => {},
}) {
  const [hover, setHover] = useState(false);
  const [iconcolor, setIconColor] = useState({});

  const [isSignedIn, setIsSignedIn] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [showAddToCardModal, setShowAddToCardModal] = useState(false);
  const [showWishListModal, setShowWishListModal] = useState(false);
  const [showCompareDrawer, setShowCompareDrawer] = useState(false);
  const [showSimilarProductsDrawer, setShowSimilarProductsDrawer] =
    useState(false);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const mouseEnter = (name) => {
    setIconColor((prev) => ({ ...prev, [name]: true }));
  };

  const { profileId } = useSelector((state) => state.customer);

  const session = useSession();
  useEffect(() => {
    if (
      session?.status === "authenticated" &&
      session?.data?.user?.role === "CUSTOMER"
    ) {
      setIsSignedIn(true);
    } else {
      setIsSignedIn(false);
    }
  }, [session]);
  const mouseLeave = (name) => {
    if (productDetail?.wishListed && name === "favoriteBorderIcon") {
      setIconColor((prev) => ({ ...prev, favoriteBorderIcon: true }));
    } else if (productDetail?.carted && name === "localMallIcon") {
      setIconColor((prev) => ({ ...prev, localMallIcon: true }));
    } else {
      setIconColor((prev) => ({ ...prev, [name]: false }));
    }
  };

  const removeWishListMutation = useMutation(
    () => {
      return serviceUtil.put(
        `/users/customer/wishlist?wishlistId=${productDetail.wishListId}&variationId=${productDetail.id}`
      );
    },
    {
      onSuccess: ({ data }) => {
        toastify(data?.message, "success");
        getProducts();
        setIconColor((prev) => ({ ...prev, favoriteBorderIcon: false }));
        queryClient.invalidateQueries(["POPULARDEPARTMENTS"]);
        queryClient.refetchQueries("POPULARDEPARTMENTS", { force: true });
        queryClient.invalidateQueries(["RECENTLYVIEWED"]);
        queryClient.refetchQueries("RECENTLYVIEWED", { force: true });
      },
    }
  );
  const removeCartMutation = useMutation(
    () => {
      return serviceUtil.deleteById(
        `products/product/cart?productVariationId=${productDetail.id}&profileId=${profileId}`
      );
    },
    {
      onSuccess: async ({ data }) => {
        toastify(data?.message, "success");
        getProducts();
        const { data: count } = await countCart(profileId);
        if (count) {
          dispatch(cartCount({ cartCount: count }));
        }
        setIconColor((prev) => ({ ...prev, localMallIcon: false }));
        queryClient.invalidateQueries(["POPULARDEPARTMENTS"]);
        queryClient.refetchQueries("POPULARDEPARTMENTS", { force: true });
        queryClient.invalidateQueries(["RECENTLYVIEWED"]);
        queryClient.refetchQueries("RECENTLYVIEWED", { force: true });
      },
    }
  );
  useEffect(() => {
    if (productDetail?.wishListed) {
      setIconColor((prev) => ({ ...prev, favoriteBorderIcon: true }));
    }
    if (productDetail?.carted) {
      setIconColor((prev) => ({ ...prev, localMallIcon: true }));
    }
  }, [productDetail]);

  const handleCardIconClick = async (iconName) => {
    if (iconName === "favoriteBorderIcon") {
      if (!productDetail.wishListed) {
        setShowWishListModal(true);
      } else {
        removeWishListMutation.mutate();
      }
    }
    if (iconName === "localMallIcon") {
      if (!productDetail.carted) {
        setShowAddToCardModal(true);
      } else {
        removeCartMutation.mutate();
      }
    }
    if (iconName === "viewCarouselOutlinedIcon") {
      setShowSimilarProductsDrawer(true);
    }
    if (iconName === "balanceIcon") {
      setShowCompareDrawer(true);
    }
    if (iconName === "visibilityOutlinedIcon") {
      setViewModalOpen(true);
    }
  };
  const route = useRouter();

  // tooltip css changed
  const handleProductClick = () => {
    if (productDetail?.variationDetails) {
      dispatch(
        productDetails({
          productId: productDetail?.id,
          variationDetails: productDetail.variationDetails,
        })
      );
      route.push({
        pathname: "/customer/productdetails",
      });
    }
  };

  const getFlagPosition = (visibilityPlace) => {
    switch (visibilityPlace) {
      case "BOTTOM_RIGHT": {
        return {
          position: "absolute",
          bottom: 0,
          right: 0,
          zIndex: 1,
        };
      }
      case "TOP_RIGHT": {
        return {
          position: "absolute",
          top: 0,
          right: 0,
          zIndex: 1,
        };
      }
      case "BOTTOM_LEFT": {
        return {
          position: "absolute",
          bottom: 0,
          left: 0,
          zIndex: 1,
        };
      }
      default: {
        return {
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1,
        };
      }
    }
  };
  const classes = useStyles();
  return (
    <Paper
      className={
        viewType === "row"
          ? " row w-100 p-1 rounded border my-2 "
          : " d-flex flex-column py-1 px-2 rounded"
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
        className="col-md-4"
      >
        <>
          <div className="position-relative">
            {productDetail.flaged && (
              <img
                src={productDetail.flagImageUrl}
                width={100}
                height={30}
                alt=""
                style={getFlagPosition(productDetail.visibilityPlace)}
              />
            )}
            <CarousalComponent
              interval={1500}
              autoPlay={hover}
              stopOnHover
              dynamicHeight={false}
              list={productDetail.images}
              showIndicators={hover}
              carouselImageMaxHeight={viewType === "Grid" ? "150px" : "0"}
              carouselImageMinHeight={viewType === "Grid" ? "150px" : "170px"}
              onClickItem={handleProductClick}
            />
          </div>
          {/* {productDetail.flag && (
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
          style={{ position: "absolute", top: 0, right: 0 }}
        >
          <Box className="d-flex flex-row-reverse p-2">
            <Box className="d-flex flex-column">
              {isSignedIn &&
                iconListData.map((item, index) => (
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
                        handleCardIconClick(item.iconName);
                      }}
                      showColorOnHover={false}
                      onMouseEnter={() => mouseEnter(item.iconName)}
                      onMouseLeave={() => mouseLeave(item.iconName)}
                      color={
                        iconcolor[item.iconName]
                          ? "text-white"
                          : "text-secondary"
                      }
                    />
                  </Box>
                ))}
            </Box>
          </Box>
        </Box>
      </Paper>
      <Box
        className={
          viewType === "row" ? "ms-3 h-150 w-75 col " : "my-1 h-150 ps-2"
        }
      >
        <Box
          className={viewType === "row" ? "d-flex justify-content-between" : ""}
        >
          <p className="fs-18 fw-600 text-truncate ">{productDetail.title}</p>
          {/* {productDetail.offerFlag && viewType === "row" && (
            <Badge className="text-danger h-5">
              Offer ends in 09h 42min 2sec
            </Badge>
          )} */}
        </Box>
        <p
          className=""
          // style={{
          //   textOverflow: "ellipsis",
          //   overflow: "hidden",
          //   wordBreak: "break-all",
          //   whiteSpace: "nowrap",
          // }}
          dangerouslySetInnerHTML={{
            __html: productDetail.description,
          }}
        />
        {/* // >
        //   {productDetail.description}
        // </p> */}
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
            <span className="h-5 fw-bold">{productDetail.actualCost}</span>
            <Tooltip title="MRP" placement="top">
              <span className=" h-5 ms-2 text-decoration-line-through">
                {productDetail?.mrp}
              </span>
            </Tooltip>
            <span className="h-5">({productDetail.actualCostOff} Off)</span>
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
            <span className="h-5 fw-bold">
              {productDetail.freeDeliveryCost}
            </span>
            <Tooltip title="MRP" placement="top">
              <span className=" h-5 ms-2 text-decoration-line-through">
                {productDetail.mrp}
              </span>
            </Tooltip>
            <span className="h-5">
              ({productDetail.freeDeliveryCostOff} Off)
            </span>
          </div>
        </div>

        <div
          className={
            viewType === "row" ? "d-flex justify-content-end me-3" : "d-flex"
          }
        >
          <Tooltip
            title={<span className="">View Count</span>}
            placement="top"
            arrow
            classes={{ arrow: classes.arrow, tooltip: classes.tooltip }}
          >
            <div className="ms-2 me-3">
              <RemoveRedEye className="fs-18 color-gray " />
              <span className="h-5"> {productDetail.viewCount}</span>
            </div>
          </Tooltip>
          <Tooltip
            title="Total Order"
            placement="top"
            arrow
            classes={{ arrow: classes.arrow, tooltip: classes.tooltip }}
          >
            <div>
              <AirportShuttleOutlined className="fs-18 color-gray" />
              <span className="h-5"> {productDetail.orderCount}</span>
            </div>
          </Tooltip>
        </div>
        {productDetail.offerFlag && viewType === "Grid" && (
          <Box className="d-flex justify-content-end">
            <p className="text-danger h-5"> Offer ends in 09h 42min 2sec</p>
          </Box>
        )}
      </Box>
      {showWishListModal ? (
        <AddToWishListModal
          showModal={showWishListModal}
          setShowModal={setShowWishListModal}
          productId={productDetail?.id}
          getProducts={getProducts}
          productImage={productDetail?.images[0]?.src}
          productTitle={productDetail.title}
        />
      ) : null}
      {showAddToCardModal && (
        <DeliveryOptionsModal
          getProducts={getProducts}
          modalOpen={showAddToCardModal}
          setModalOpen={setShowAddToCardModal}
          productId={productDetail?.id}
          skuId={productDetail?.skuId}
          modalType="ADD"
        />
      )}
      {viewModalOpen && (
        <ViewModalComponent
          setViewModalOpen={setViewModalOpen}
          viewModalOpen={viewModalOpen}
          productId={productDetail?.id}
          getProducts={getProducts}
        />
      )}
      {showSimilarProductsDrawer && (
        <SimilarProducts
          setShowDrawer={setShowSimilarProductsDrawer}
          showDrawer={showSimilarProductsDrawer}
          productId={productDetail?.id}
          subCategoryId={productDetail?.subCategoryId}
        />
      )}
      {showCompareDrawer ? (
        <CompareProductDrawer
          showDrawer={showCompareDrawer}
          setShowDrawer={setShowCompareDrawer}
          imgSrc={productDetail?.images[0]?.src}
          productId={productDetail?.id}
          subCategoryId={productDetail?.subCategoryId}
        />
      ) : null}
    </Paper>
  );
}

export default ProductDetailsCard;
