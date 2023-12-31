/* eslint-disable import/no-cycle */
import { Box, Paper, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Image from "next/image";
import CustomIcon from "services/iconUtils";
import StarRatingComponentReceivingRating from "@/atoms/StarRatingComponentReceiving";
import { useRouter } from "next/router";
import AddToWishListModal from "@/forms/customer/wishlist/AddToWishListModal";
import { useSession } from "next-auth/react";
// import { removeProductFromWishList } from "services/customer/wishlist";
import toastify from "services/utils/toastUtils";
import { cartCount, productDetails } from "features/customerSlice";
import { motion } from "framer-motion";
import SimilarProducts from "@/forms/customer/searchedproduct/SimilarProduct";
import CompareProductDrawer from "@/forms/customer/searchedproduct/compareproducts/compareProductDrawer";
import ViewModalComponent from "@/forms/customer/searchedproduct/ViewModalComponent";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQueryClient } from "react-query";
import serviceUtil from "services/utils";
import { countCart } from "services/admin/storeList";
import DeliveryOptionsModal from "../../buynowmodal";

const ProductCard = ({
  getProducts = () => {},
  item,
  handleIconClick = () => {},
  height = 150,
  width = 150,
  cardPaperClass = "",
  showActionList = true,
}) => {
  const dispatch = useDispatch();

  const iconListData = [
    {
      iconName: "viewCarouselOutlinedIcon",
      title: "View",
      tooltip: "Similar",
    },
    {
      iconName: "favoriteBorderIcon",
      title: "Favorite",
      tooltip: "wishlist",
    },
    {
      iconName: "localMallIcon",
      title: "Favorite",
      tooltip: "cart",
    },
    {
      iconName: "visibilityOutlinedIcon",
      title: "Search",
      tooltip: "View",
    },
    {
      iconName: "balanceIcon",
      title: "Search",
      tooltip: "Compare",
    },
  ];

  const [hover, setHover] = useState(false);
  const [showWishListModal, setShowWishListModal] = useState(false);
  const [showAddToCardModal, setShowAddToCardModal] = useState(false);
  const [iconcolor, setIconColor] = useState({});
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [showCompareDrawer, setShowCompareDrawer] = useState(false);
  const [showSimilarProductsDrawer, setShowSimilarProductsDrawer] =
    useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const mouseEnter = (name) => {
    setIconColor((prev) => ({ ...prev, [name]: true }));
  };
  const route = useRouter();

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
    if (item?.isWishlisted && name === "favoriteBorderIcon") {
      setIconColor((prev) => ({ ...prev, favoriteBorderIcon: true }));
    } else if (item?.isCarted && name === "localMallIcon") {
      setIconColor((prev) => ({ ...prev, localMallIcon: true }));
    } else {
      setIconColor((prev) => ({ ...prev, [name]: false }));
    }
  };

  const removeWishListMutation = useMutation(
    () => {
      return serviceUtil.put(
        `/users/customer/wishlist?wishlistId=${item.wishlistId}&variationId=${item.id}`
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
        `products/product/cart?productVariationId=${item.id}&profileId=${profileId}`
      );
    },
    {
      onSuccess: async ({ data }) => {
        const { data: count } = await countCart(profileId);
        if (count) {
          dispatch(cartCount({ cartCount: count }));
        }
        toastify(data?.message, "success");
        getProducts();
        setIconColor((prev) => ({ ...prev, localMallIcon: false }));
        queryClient.invalidateQueries(["POPULARDEPARTMENTS"]);
        queryClient.refetchQueries("POPULARDEPARTMENTS", { force: true });
        queryClient.invalidateQueries(["RECENTLYVIEWED"]);
        queryClient.refetchQueries("RECENTLYVIEWED", { force: true });
      },
    }
  );
  useEffect(() => {
    if (item?.isWishlisted) {
      setIconColor((prev) => ({ ...prev, favoriteBorderIcon: true }));
    }
    if (item?.isCarted) {
      setIconColor((prev) => ({ ...prev, localMallIcon: true }));
    }
  }, [item]);

  const handleCardIconClick = async (iconName) => {
    if (iconName === "favoriteBorderIcon") {
      if (!item.isWishlisted) {
        setShowWishListModal(true);
      } else {
        removeWishListMutation.mutate();
        // const { data } = await removeProductFromWishList(
        //   item.wishlistId,
        //   item.id
        // );
        // if (data) {
        //   toastify(data?.message, "success");
        //   getProducts();
        //   setIconColor((prev) => ({ ...prev, favoriteBorderIcon: false }));
        // }
      }
    }
    if (iconName === "localMallIcon") {
      if (!item.isCarted) {
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
  const handleProductClick = () => {
    if (item?.variationDetails) {
      dispatch(
        productDetails({
          productId: item?.id,
          variationDetails: item.variationDetails,
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
      // case "TOP_LEFT": {
      //   break;
      // }
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
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.5 },
      }}
    >
      <Box
        onMouseEnter={() => {
          if (isSignedIn && showActionList) setHover(true);
        }}
        onMouseLeave={() => setHover(false)}
        maxWidth={165}
        className="position-relative "
      >
        <Paper
          elevation={hover ? 6 : 3}
          className={`mx-2 position-relative rounded  ${cardPaperClass}`}
          style={{
            minHeight: 150,
            minWidth: 150,
            overflow: "hidden",
          }}
        >
          {item.flaged && (
            <img
              src={item.flagImageUrl}
              width={100}
              height={30}
              alt=""
              style={getFlagPosition(item.visibilityPlace)}
            />
          )}
          <Image
            src={item.image}
            height={height}
            width={width}
            layout="responsive"
            style={{ cursor: "pointer" }}
            onClick={() => {
              handleProductClick();
            }}
          />
        </Paper>
        <Tooltip
          onClick={() => {
            handleProductClick();
          }}
          title={item.title}
        >
          <Typography className="h-5 fw-bold text-center text-truncate my-1 px-2 cursor-pointer">
            {item.title}
          </Typography>
        </Tooltip>
        <Box className="d-flex justify-content-center align-items-center mb-1">
          <StarRatingComponentReceivingRating
            rating={item?.rating?.rate}
            className="h-4"
          />
          <Typography className="h-6">{item?.rating?.count} ratings</Typography>
        </Box>
        <Box className="">
          <Box className="">
            <Typography className="fw-bold h-5 text-center">
              ₹ {item.price}
            </Typography>
            <Typography className="fw-bold h-6 text-center">
              (Actual Product Cost)
            </Typography>
          </Box>
          <Box className={!item.salePriceWithLogistics ? "d-none" : ""}>
            <Typography className="fw-bold h-5 text-center">
              ₹ {item.salePriceWithLogistics}
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
                  iconcolor[ele.iconName] ? "theme_bg_color" : "bg-white"
                }`}
                // eslint-disable-next-line react/no-array-index-key
                key={index}
              >
                <CustomIcon
                  type={ele.iconName}
                  title={ele.tooltip}
                  className="h-5"
                  onIconClick={() => {
                    handleCardIconClick(ele.iconName);
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
        {showWishListModal ? (
          <AddToWishListModal
            showModal={showWishListModal}
            setShowModal={setShowWishListModal}
            productId={item?.id}
            productImage={item?.image}
            getProducts={getProducts}
            productTitle={item.title}
          />
        ) : null}
        {showAddToCardModal && (
          <DeliveryOptionsModal
            getProducts={getProducts}
            modalOpen={showAddToCardModal}
            setModalOpen={setShowAddToCardModal}
            productId={item?.id}
            skuId={item?.skuId}
            modalType="ADD"
          />
        )}
        {showSimilarProductsDrawer && (
          <SimilarProducts
            setShowDrawer={setShowSimilarProductsDrawer}
            showDrawer={showSimilarProductsDrawer}
            productId={item?.id}
            subCategoryId={item?.subCategoryId}
          />
        )}
        {showCompareDrawer ? (
          <CompareProductDrawer
            showDrawer={showCompareDrawer}
            setShowDrawer={setShowCompareDrawer}
            imgSrc={item?.image}
            productId={item?.id}
            subCategoryId={item?.subCategoryId}
          />
        ) : null}
        {viewModalOpen && (
          <ViewModalComponent
            setViewModalOpen={setViewModalOpen}
            viewModalOpen={viewModalOpen}
            productId={item?.id}
            getProducts={getProducts}
            setIconColor={setIconColor}
          />
        )}
      </Box>
    </motion.div>
  );
};
export default ProductCard;
