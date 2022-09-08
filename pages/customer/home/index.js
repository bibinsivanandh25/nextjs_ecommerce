import { Box, Grid, Paper, Typography } from "@mui/material";
// import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useEffect, useState } from "react";
import { FaTicketAlt } from "react-icons/fa";

import {
  getBannersBySupplierId,
  getMainCategories,
  getTopProducts,
} from "services/customer/Home";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import HotDealsOfTheDay from "@/forms/customer/Home/HotDealsOfTheDay";
import CarousalComponent from "@/atoms/Carousel";
import TopTrending from "@/forms/customer/Home/TopTrending";
import TopCategories from "@/forms/customer/Home/TopCategories";
import PopularDepartments from "@/forms/customer/Home/PopularDepartments";
import ComapareProducts from "@/forms/customer/searchedproduct/compareproducts";
import FlashDeals from "@/forms/customer/Home/FlashDeals";
import RecentlyViewed from "@/forms/customer/Home/RecentlyViewed";
import HomeComponent from "@/forms/customer/homecomponent";
import Articles from "./Articles";
// import CategoryScrollComponent from "@/atoms/CategoryScrollComponent";
// import InputBox from "@/atoms/InputBoxComponent";
// import ProductDetailsCard from "components/reseller/atoms/productdetailscard";

const articleData = [
  {
    content:
      "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
    image: "",
  },
  {
    content:
      "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
    image: "",
  },
  {
    content:
      "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
    image: "",
  },
  {
    content:
      "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
    image: "",
  },
  {
    content:
      "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
    image: "",
  },
  {
    content:
      "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
    image: "",
  },
  {
    content:
      "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
    image: "",
  },
  {
    content:
      "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
    image: "",
  },
];

const Home = () => {
  const [showCompareProducts, setShowCompareProducts] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [bannerImages, setBannerImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const route = useRouter();
  const storeDetails = useSelector((state) => ({
    supplierId: state.customer.supplierId,
    storeCode: state.customer.storeCode,
  }));

  useEffect(() => {
    if (storeDetails.storeCode === "" || storeDetails.supplierId === "") {
      route.push("/auth/customer");
    }
  }, [storeDetails]);

  const getCategories = async () => {
    const { data, err } = await getMainCategories();
    if (data) {
      const results = [];
      data.forEach((ele) => {
        results.push({
          id: ele.mainCategoryId,
          name: ele.mainCategoryName,
          image: ele.categoryImageUrl,
        });
        setCategories([...results]);
      });
    } else if (err) {
      console.log(err);
    }
  };

  const getBanners = async () => {
    const { data, err } = await getBannersBySupplierId(storeDetails.supplierId);
    if (data) {
      const temp = [];
      data?.forEach((ele) => {
        temp.push({
          src: ele.bannerImageUrlForWeb,
          navigateUrl: ele.navigationUrl,
        });
      });
      setBannerImages([...temp]);
    }
    if (err) {
      console.log(err);
    }
  };

  const getProducts = async () => {
    const { data, err } = await getTopProducts(storeDetails.supplierId);
    if (data) {
      const result = [];
      data.forEach((variations) => {
        variations.productVariations.forEach((product) => {
          result.push({
            image: product.variationMedia[0],
            title: product.productTitle,
            price: product.salePrice,
            rating: 4,
            ratingCount: 89,
            id: product.productVariationId,
          });
        });
      });
      setProducts([...result]);
    }
    if (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getCategories();
    getBanners();
    getProducts();
  }, []);

  return (
    <>
      {isLoggedIn ? (
        <div className="px-3">
          {!showCompareProducts ? (
            <Box>
              <CarousalComponent />
              <Paper className="d-flex p-1 mt-2 justify-content-between">
                <Box className="border-end border-2 d-flex justify-content-between p-3 align-items-center">
                  <FaTicketAlt className="h-1 mx-2 color-orange" />
                  <Typography className="fw-bold h-5">
                    Coupons Applicable Products
                  </Typography>
                </Box>
                <Box className="border-end border-2 d-flex justify-content-between p-3  align-items-center">
                  <FaTicketAlt className="h-1 mx-2 color-orange" />
                  <Typography className="fw-bold h-5">
                    Free Shipping & Returns
                  </Typography>
                </Box>
                <Box className="border-end border-2 d-flex justify-content-between p-3  align-items-center">
                  <FaTicketAlt className="h-1 mx-2 color-orange" />
                  <Box>
                    <Typography className="fw-bold h-5">
                      Secure Payment
                    </Typography>
                    <span className="h-5">COD Available</span>
                  </Box>
                </Box>
                <Box className="border-end border-2 d-flex justify-content-between p-3  align-items-center">
                  <FaTicketAlt className="h-1 mx-2 color-orange" />
                  <Box>
                    {" "}
                    <Typography className="fw-bold h-5">
                      Money Back Gaurantee
                    </Typography>
                    <span className="h-5">Any bank within 7 working days</span>
                  </Box>
                </Box>
                <Box className="d-flex justify-content-between p-3  align-items-center">
                  <FaTicketAlt className="h-1 color-orange mx-2" />
                  <Box>
                    <Typography className="fw-bold h-5">
                      Help & Support
                    </Typography>
                    <span className="h-5">Available</span>
                  </Box>
                </Box>
              </Paper>
              <Grid container>
                <Grid item sm={8} className="py-3 pe-1">
                  <Paper>
                    <HotDealsOfTheDay />
                  </Paper>
                </Grid>
                <Grid item sm={4} className="py-3 ps-1">
                  <TopTrending />
                </Grid>
              </Grid>
              <Box className="p-2">
                <TopCategories />
              </Box>
              <Box>
                <PopularDepartments
                  setShowCompareProducts={setShowCompareProducts}
                />
              </Box>
              <Box className="my-2">
                <FlashDeals />
              </Box>
              <Box className="my-2">
                <RecentlyViewed
                  setShowCompareProducts={setShowCompareProducts}
                />
              </Box>
              <Box className="my-3 d-flex justify-content-center">
                <Typography className="h-4 fw-bold mx-auto">
                  Articles
                </Typography>
              </Box>
              <Articles articleData={articleData} />
            </Box>
          ) : (
            <ComapareProducts
              handleBackclick={() => setShowCompareProducts(false)}
            />
          )}
        </div>
      ) : (
        <>
          {bannerImages.length > 0 ? (
            <CarousalComponent
              list={[...bannerImages]}
              interval={2000}
              autoPlay
              stopOnHover={false}
            />
          ) : null}
          <Box className="py-2">
            <HomeComponent
              onCategoryClick={(ele) => {
                console.log(ele, "AS");
              }}
              categories={[...categories]}
              products={[...products]}
              productTitle="Top Products"
              showMarginButton={false}
              getProductDetails={(data) => {
                if (data) {
                  route.push({
                    pathname: `/customer/productdetails`,
                    query: {
                      id: data.id,
                    },
                  });
                }
              }}
            />
          </Box>
        </>
      )}
    </>
  );
};
export default Home;
