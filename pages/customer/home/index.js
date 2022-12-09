/* eslint-disable no-nested-ternary */
import { Box, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import {
  getArticles,
  getBannersBySupplierId,
  getMainCategories,
  getTopProducts,
} from "services/customer/Home";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import CarousalComponent from "@/atoms/Carousel";
import TopTrending from "@/forms/customer/Home/TopTrending";
import TopCategories from "@/forms/customer/Home/TopCategories";
import PopularDepartments from "@/forms/customer/Home/PopularDepartments";
import ComapareProducts from "@/forms/customer/searchedproduct/compareproducts";
import FlashDeals from "@/forms/customer/Home/FlashDeals";
import RecentlyViewed from "@/forms/customer/Home/RecentlyViewed";
import { useSession } from "next-auth/react";
import { getStoreByStoreCode } from "services/customer/ShopNow";
import { format } from "date-fns";
import Image from "next/image";
import { customerHome } from "public/assets";
import AboutUs from "@/forms/customer/Home/AboutUs";
import Articles from "./Articles";
// import CategoryScrollComponent from "@/atoms/CategoryScrollComponent";
// import InputBox from "@/atoms/InputBoxComponent";
// import ProductDetailsCard from "components/reseller/atoms/productdetailscard";

const Home = () => {
  const [showCompareProducts, setShowCompareProducts] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [bannerImages, setBannerImages] = useState([]);
  // const [categories, setCategories] = useSta te([]);
  const [storeInformation, setStoreInformation] = useState([]);
  const [articleData, setArticleData] = useState([]);

  // const [products, setProducts] = useState([]);

  const route = useRouter();

  const storeDetails = useSelector((state) => state.customer);

  const userInfo = useSession();
  useEffect(() => {
    if (
      userInfo.status === "authenticated" &&
      userInfo?.data?.user?.role === "CUSTOMER"
    ) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [userInfo]);

  const getStoreData = async () => {
    const { data } = await getStoreByStoreCode(storeDetails.storeCode);
    if (data) {
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];

      setStoreInformation({
        storeCode: data.storeCode,
        holidays: days.filter((day) => {
          return !data.shopOpeningDays?.includes(day);
        }),
        shopTimings: data.shopTimings
          ? `${format(
              new Date(
                `Tue Aug 03 2021 ${data?.shopTimings?.split("-")[0]?.trim()}:00`
              ),
              "hh:mm a"
            )} to ${format(
              new Date(
                `Tue Aug 03 2021 ${data?.shopTimings?.split("-")[1]?.trim()}:00`
              ),
              "hh:mm a"
            )}`
          : null,
        shoplogo: data?.shopDescriptionImageUrl,
        shopDescriptionImageUrl: data?.shopDescriptionImageUrl,
        shopDescription: data?.shopDescription,
        maxOrderProcessingTime: data?.maxOrderProcessingTime,
        gstIn: data?.gstIn,
      });
    }
  };

  useEffect(() => {
    if (storeDetails.storeCode === "" || storeDetails.supplierId === "") {
      route.push("/auth/customer");
    }
    getStoreData();
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
        // setCategories([...results]);
      });
    } else if (err) {
      // console.log(err);
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
      setBannerImages([]);
      // console.log(err);
    }
  };

  const getProducts = async () => {
    const { data, err } = await getTopProducts(storeDetails.supplierId);
    if (data) {
      const result = [];
      data.forEach((variations) => {
        variations.productVariations.forEach((product) => {
          result.push({
            image: product.variationMedia ? product.variationMedia[0] : "",
            title: product.productTitle,
            price: product.salePrice,
            rating: 4,
            ratingCount: 89,
            id: product.productVariationId,
          });
        });
      });
      // setProducts([...result]);
    }
    if (err) {
      // console.log(err);
    }
  };

  const getArticlesData = async () => {
    const { data } = await getArticles();
    if (data) {
      setArticleData(() => {
        return data.map((ele) => ({
          image: ele.articlesMedia[0]?.mediaUrl,
          content: ele.longDescription,
          id: ele.articleId,
        }));
      });
    }
  };
  useEffect(() => {
    getCategories();
    getProducts();
    getArticlesData();
  }, []);
  useEffect(() => {
    getBanners();
  }, [storeDetails?.storeCode]);

  return (
    <>
      {/* {isLoggedIn ? ( */}
      <div className="px-3">
        {!showCompareProducts ? (
          <Box>
            <CarousalComponent
              list={[...bannerImages]}
              interval={2000}
              autoPlay
              stopOnHover={false}
            />
            <Paper className="p-1 mt-2">
              <Grid container columnSpacing={1}>
                <Grid
                  item
                  md={2.6}
                  sm={3}
                  className="border-end border-2 d-flex justify-content-between p-3 align-items-center"
                >
                  <Image src={customerHome.coupon} height={40} width={60} />
                  <Typography className="fw-bold h-5">
                    Coupons Applicable Products
                  </Typography>
                </Grid>
                <Grid
                  item
                  md={3.1}
                  sm={3}
                  className="border-end border-2 d-flex justify-content-between p-3  align-items-center"
                >
                  <Image src={customerHome.shop} height={50} width={50} />
                  <div>
                    <Typography className="fw-bold h-5 d-flex align-items-center">
                      <div className="d-flex">
                        <Typography className="fw-bold h-5 d-flex">
                          Holiday :&nbsp;
                          {storeInformation?.holidays?.map((ele, ind) => {
                            return storeInformation?.holidays?.length === 1
                              ? ele.substr(0, 3)
                              : ind === storeInformation?.holidays.length - 1
                              ? `${ele.substr(0, 3)}. `
                              : `${ele.substr(0, 3)}, `;
                          })}
                        </Typography>
                      </div>
                    </Typography>

                    <Typography className="h-5">
                      Shop Timings : {storeInformation?.shopTimings}
                    </Typography>
                  </div>
                </Grid>
                <Grid
                  item
                  md={2}
                  sm={3}
                  className="border-end border-2 d-flex justify-content-between p-3  align-items-center"
                >
                  <Image src={customerHome.file} height={50} width={50} />
                  <Box>
                    <Typography className="fw-bold h-5">GSTIN No.</Typography>
                    <span className="h-5">{storeInformation?.gstIn}</span>
                  </Box>
                </Grid>
                <Grid
                  item
                  md={2.5}
                  sm={3}
                  className="border-end border-2 d-flex justify-content-between p-3  align-items-center"
                >
                  <Image src={customerHome.tax} height={50} width={50} />
                  <Box>
                    {" "}
                    <Typography className="fw-bold h-5">
                      Business Processing Time
                    </Typography>
                    <span className="h-5">
                      {storeInformation?.maxOrderProcessingTime}
                    </span>
                  </Box>
                </Grid>
                <Grid
                  item
                  md={1.8}
                  sm={3}
                  className="d-flex justify-content-between p-3  align-items-center"
                >
                  <Image src={customerHome.help} height={50} width={55} />

                  <Box>
                    <Typography className="fw-bold h-5">
                      Help & Support
                    </Typography>
                    <span className="h-5">Available</span>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
            <Grid container className="">
              <Grid item sm={8} className="py-3 pe-1 h-100">
                {/* <HotDealsOfTheDay /> */}
                <AboutUs
                  description={storeInformation?.shopDescription}
                  imageUrl={storeInformation?.shopDescriptionImageUrl}
                />
              </Grid>
              <Grid item sm={4} className="py-3 ps-1 h-100">
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
            <Box className={isLoggedIn ? "" : "d-none"}>
              <RecentlyViewed setShowCompareProducts={setShowCompareProducts} />
            </Box>
            <Box className={articleData?.length ? "" : "d-none"}>
              <Articles articleData={articleData} />
            </Box>
          </Box>
        ) : (
          <ComapareProducts
            handleBackclick={() => setShowCompareProducts(false)}
          />
        )}
      </div>
      {/* ) : (
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
              onCategoryClick={() => {
                // console.log(ele, "AS");
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
      )} */}
    </>
  );
};
export default Home;
