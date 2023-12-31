/* eslint-disable no-nested-ternary */
import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import {
  // getArticles,
  getBannersBySupplierId,
  getTopProducts,
} from "services/customer/Home";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import CarousalComponent from "@/atoms/Carousel";
import TopTrending from "@/forms/customer/Home/TopTrending";
import TopCategories from "@/forms/customer/Home/TopCategories";
import ComapareProducts from "@/forms/customer/searchedproduct/compareproducts";
import FlashDeals from "@/forms/customer/Home/FlashDeals";
import RecentlyViewed from "@/forms/customer/Home/RecentlyViewed";
import { useSession } from "next-auth/react";
import { getStoreByStoreCode } from "services/customer/ShopNow";
import { format } from "date-fns";
// import Image from "next/image";
import { FaInfoCircle } from "react-icons/fa";
// import { customerHome } from "public/assets";
import AboutUs from "@/forms/customer/Home/AboutUs";
import PopularDepartments from "@/forms/customer/Home/PopularDepartments";
import TicketSvg from "public/assets/svg/TicketSvg";
import ScheduleSvg from "public/assets/svg/scheduleSvg";
import TaxSvg from "public/assets/svg/TaxSvg";
import ChatBubbleSvg from "public/assets/svg/chatbubbleSvg";
import ShopSvg from "public/assets/svg/ShopSvg";
// import Articles from "./Articles";

const Home = () => {
  const [showCompareProducts, setShowCompareProducts] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [bannerImages, setBannerImages] = useState([]);
  // const [categories, setCategories] = useSta te([]);
  const [storeInformation, setStoreInformation] = useState([]);
  // const [articleData, setArticleData] = useState([]);
  const [leaveDate, setleaveDate] = useState({ start: null, end: null });
  // const [products, setProducts] = useState([]);

  const route = useRouter();

  const storeDetails = useSelector((state) => state.customer);
  // const AllRedux = useSelector((state) => state);
  // console.log(AllRedux, "supplierDetails");

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
      if (data.leaveStartDate && data.leaveEndDate)
        setleaveDate({
          start: format(new Date(data.leaveStartDate), "dd MMM yyyy"),
          end: format(new Date(data.leaveEndDate), "dd MMM yyyy"),
        });
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
        shopTimings:
          data.storeOpenTimings && data.storeCloseTimings
            ? `${data.storeOpenTimings} to ${data.storeCloseTimings}`
            : "--",
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

  // const getArticlesData = async () => {
  //   const { data } = await getArticles();
  //   if (data) {
  //     setArticleData(() => {
  //       return data.map((ele) => ({
  //         image: ele.articlesMedia[0]?.mediaUrl,
  //         content: ele.longDescription,
  //         id: ele.articleId,
  //       }));
  //     });
  //   }
  // };
  // const getTopTranding = async () => {
  //   // const supplierId = "SP0123000312";
  //   const { data, errRes } = await getTopTrandingProducts(
  //     storeDetails.supplierId
  //   );
  //   // let temp = [];
  //   if (data) {
  //     // temp.push(data.data);
  //     settopTrendingData(data.data);
  //   } else if (errRes) {
  //     // console.log(errRes);
  //   }
  // };
  useEffect(() => {
    getBanners();
    getProducts();
    // getArticlesData();
  }, []);
  useEffect(() => {
    getBanners();
  }, [storeDetails?.storeCode]);

  return (
    <>
      <div className="">
        {!showCompareProducts ? (
          <Box>
            <Box
              className="container-shadow rounded "
              style={{
                overflow: "hidden",
              }}
            >
              <CarousalComponent
                list={[...bannerImages]}
                autoPlay
                stopOnHover={false}
              />
            </Box>
            <Box className="p-1 mt-3 container-shadow rounded">
              <Grid container columnSpacing={1}>
                <Grid
                  item
                  md={2.6}
                  sm={3}
                  className="border-end border-2 cursor-pointer d-flex justify-content-evenly p-3 align-items-center"
                  onClick={() => {
                    route.push("/customer/couponapplicableproducts");
                  }}
                >
                  {/* <Image src={customerHome.coupon} height={40} width={60} /> */}
                  <TicketSvg
                    height={40}
                    width={60}
                    className="theme_svg_fill"
                  />
                  <Typography className="fw-bold h-5 cursor-pointer">
                    Coupons Applicable Products
                  </Typography>
                </Grid>
                <Grid
                  item
                  md={3.1}
                  sm={3}
                  className="border-end border-2 d-flex justify-content-evenly p-3  align-items-center"
                >
                  <ShopSvg height={40} width={60} className="theme_svg_fill" />
                  {/* <Image src={customerHome.shop} height={50} width={50} /> */}
                  <div>
                    <Typography className="fw-bold h-5 d-flex align-items-center">
                      <div className="d-flex">
                        <Typography className="fw-bold h-5 d-flex">
                          Holiday :&nbsp;
                          {storeInformation?.holidays?.map((ele, ind) => {
                            return !storeInformation?.holidays?.length
                              ? "No Holiday's"
                              : storeInformation?.holidays?.length === 1
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
                  className="border-end border-2 d-flex justify-content-evenly p-3  align-items-center"
                >
                  {/* <Image src={customerHome.file} height={50} width={50} /> */}
                  <ScheduleSvg
                    height={50}
                    width={50}
                    className="theme_svg_fill"
                  />
                  <Box>
                    <Typography className="fw-bold h-5">GSTIN No.</Typography>
                    <span className="h-5">{storeInformation?.gstIn}</span>
                  </Box>
                </Grid>
                <Grid
                  item
                  md={2.5}
                  sm={3}
                  className="border-end border-2 d-flex justify-content-evenly p-3 cursor-pointer align-items-center"
                >
                  <TaxSvg height={40} width={60} className="theme_svg_fill" />
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
                  className="d-flex justify-content-evenly p-3 cursor-pointer align-items-center"
                  onClick={() => {
                    route.push("/customer/helpandsupport");
                  }}
                >
                  <ChatBubbleSvg
                    height={40}
                    width={60}
                    className="theme_svg_fill cursor-pointer"
                  />
                  {/* <Image src={customerHome.help} height={50} width={55} /> */}

                  <Box className="cursor-pointer">
                    <Typography className="fw-bold h-5 cursor-pointer">
                      Help & Support
                    </Typography>
                    <span className="h-5 cursor-pointer">Available</span>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            {/* {leaveDate.start && leaveDate.end && (
              <Box className="bg-light-yellow border border-orange rounded mt-3 container-shadow"> */}
            {/* <Typography className="fw-bold bg-light-yellow rounded  py-2 px-1 d-flex align-items-center">
                  <FaInfoCircle className="mx-2 fs-20 color-orange" />
                  Shop will be on leave from {leaveDate.start} to{" "}
                  {leaveDate.end} , Your orders may be processed after{" "}
                  {new Date(leaveDate.end).getDate()}th.
                </Typography> */}

            {leaveDate.start &&
              leaveDate.end &&
              leaveDate.start <= format(new Date(), "dd MMM yyyy") &&
              leaveDate.end >= format(new Date(), "dd MMM yyyy") && (
                <Box className="bg-light-yellow border border-orange rounded mt-3 container-shadow">
                  <Typography className="fw-bold bg-light-yellow rounded  py-2 px-1 d-flex align-items-center">
                    <FaInfoCircle className="mx-2 fs-20 color-orange" />
                    Shop will be on leave from {leaveDate.start} to{" "}
                    {leaveDate.end} , Your orders may be processed after{" "}
                    {new Date(leaveDate.end).getDate()}th.
                  </Typography>
                </Box>
              )}
            {/* </Box>
            )} */}
            <Grid container className="">
              <Grid item sm={8} className="py-3 pe-3 h-100">
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
            <Box className="">
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
            <Box className={isLoggedIn ? "my-2" : "d-none"}>
              <RecentlyViewed setShowCompareProducts={setShowCompareProducts} />
            </Box>
            {/* <Box className={articleData?.length ? "" : "d-none"}>
              <Articles articleData={articleData} />
            </Box> */}
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
