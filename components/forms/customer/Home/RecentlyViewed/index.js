import { Box, Grid, Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Image from "next/image";
import CustomIcon from "services/iconUtils";
import DrawerComponent from "@/atoms/DrawerComponent";
import ButtonComponent from "@/atoms/ButtonComponent";
import { getRecentlyViewedProducts } from "services/customer/Home";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import SimilarProducts from "../../searchedproduct/SimilarProduct";
import ViewModalComponent from "../../searchedproduct/ViewModalComponent";
import ProductCard from "../PopularDepartments/ProductCard";

const comparProductData = [
  {
    id: 1,
    imageLink:
      "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
  },
  {
    id: 2,
    imageLink:
      "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/img_snap.PNG",
  },
  {
    id: 3,
    imageLink: "",
  },
  {
    id: 4,
    imageLink: "",
  },
];

const RecentlyViewed = ({ setShowCompareProducts = () => {} }) => {
  const [products, setProducts] = useState([]);
  const [showDrawer, setShowDrawer] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [comparDrawer, setComparDrawer] = useState(false);
  const [comparedProduct, setCompredProduct] = useState([]);

  useEffect(() => {
    setCompredProduct(comparProductData);
  }, []);
  const handleCloseIconClick = (id) => {
    const comparedProductCopy = [...comparedProduct];
    const final = comparedProductCopy.map((item) => {
      if (item.id == id) {
        return { ...item, imageLink: "" };
      }
      return item;
    });
    setCompredProduct(final);
  };
  const userInfo = useSession();
  const storeDetails = useSelector((state) => state?.customer);

  const getRecentViewedProducts = async () => {
    const { data } = await getRecentlyViewedProducts(
      userInfo?.data?.user?.id,
      storeDetails.profileId
    );
    if (data) {
      const temp = [];
      data.forEach((ele) => {
        temp.push({
          id: ele.productId,
          title: ele.productTitle,
          price: ele.salePrice,
          salePriceWithLogistics: ele.salePriceWithLogistics,
          image: ele.variationMedia,
          rating: {
            rate: ele.averageRatings,
            count: ele.totalRatings,
          },
          isWishlisted: ele.wishlisted,
          skuId: ele.skuId,
          wishlistId: ele.wishlistId,
          userCartId: ele.userCartId,
          isCarted: ele.presentInCart,
        });
      });
      setProducts([...temp]);
    }
  };
  useEffect(() => {
    if (userInfo?.data && storeDetails) {
      getRecentViewedProducts();
    }
  }, [userInfo, storeDetails]);

  return (
    <Box className={products?.length ? "" : "d-none"}>
      <Typography className="fw-bold text-center my-2">
        Your Recently Viewed Products
      </Typography>

      <Box className="d-flex w-100 overflow-auto mt-2 hide-scrollbar">
        {products ? (
          products?.map((ele) => {
            return (
              <ProductCard
                item={ele}
                handleIconClick={(icon) => {
                  if (icon === "viewCarouselOutlinedIcon") {
                    setShowDrawer(true);
                  }
                  if (icon === "balanceIcon") {
                    setComparDrawer(true);
                  }
                  if (icon === "visibilityOutlinedIcon") {
                    setViewModalOpen(true);
                  }
                }}
              />
            );
          })
        ) : (
          <Skeleton variant="rectangular" width={150} height={150} />
        )}
      </Box>
      <DrawerComponent
        openDrawer={showDrawer}
        width="500px"
        modalTitle="Similar Products"
        onClose={() => setShowDrawer(false)}
      >
        <Grid
          container
          spacing={2}
          className="mx-auto ms-0 mt-2"
          sx={{
            width: `calc(100% - 10px)`,
          }}
        >
          {products?.map((item) => (
            <Grid item md={6} sm={6} key={item.id}>
              <SimilarProducts data={item} handleIconClick={() => {}} />
            </Grid>
          ))}
        </Grid>
      </DrawerComponent>
      {viewModalOpen && (
        <ViewModalComponent
          setViewModalOpen={setViewModalOpen}
          viewModalOpen={viewModalOpen}
        />
      )}
      <DrawerComponent
        openDrawer={comparDrawer}
        anchor="bottom"
        width="vp-width"
        headerBorder={false}
        onClose={() => setComparDrawer(false)}
        enter={300}
      >
        <Box
          className="px-4 py-2 d-flex justify-content-between mnh-25p mx-4"
          style={{ height: "150px" }}
        >
          <Box className="align-self-center ">
            <p className="fw-600 fs-18">Compare Products</p>
            <p>( 1 Product )</p>
          </Box>
          {comparedProduct &&
            comparedProduct.map((item) => (
              <Box className="d-flex justify-content-center border rounded mnw-150">
                {item.imageLink ? (
                  <>
                    <Image
                      src={item?.imageLink}
                      alt=""
                      className="rounded bg-white"
                      style={{ position: "relative" }}
                      width="150%"
                      height="100%"
                    />

                    <CustomIcon
                      type="close"
                      className="position-absolute compareProductTop fs-18"
                      onIconClick={() => handleCloseIconClick(item.id)}
                    />
                  </>
                ) : (
                  <Box className="align-self-center border p-3 rounded-circle cursor-pointer">
                    <CustomIcon type="add" className="" />
                  </Box>
                )}
              </Box>
            ))}
          <Box className="align-self-center">
            <ButtonComponent
              label="Clear All"
              variant="outlined"
              borderColor="border-gray "
              bgColor="bg-white"
              textColor="color-black"
              size="medium"
              muiProps="me-3"
            />
            <ButtonComponent
              label="Start Compare"
              size="medium"
              onBtnClick={() => {
                setShowCompareProducts(true);
                setComparDrawer(false);
              }}
            />
          </Box>
        </Box>
      </DrawerComponent>
    </Box>
  );
};
export default RecentlyViewed;
