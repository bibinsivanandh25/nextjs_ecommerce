import { Box, Grid, Paper, Typography } from "@mui/material";
// import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useEffect, useState } from "react";
import { FaTicketAlt } from "react-icons/fa";
import { useUserInfo } from "services/hooks";
import axios from "axios";
import HotDealsOfTheDay from "@/forms/customer/Home/HotDealsOfTheDay";
import CarousalComponent from "@/atoms/Carousel";
import TopTrending from "@/forms/customer/Home/TopTrending";
import TopCategories from "@/forms/customer/Home/TopCategories";
import PopularDepartments from "@/forms/customer/Home/PopularDepartments";
import ComapareProducts from "@/forms/customer/searchedproduct/compareproducts";
import FlashDeals from "@/forms/customer/Home/FlashDeals";
import RecentlyViewed from "@/forms/customer/Home/RecentlyViewed";
import HomeComponent from "@/forms/reseller/home";
import Articles from "./Articles";
// import CategoryScrollComponent from "@/atoms/CategoryScrollComponent";
// import InputBox from "@/atoms/InputBoxComponent";
// import ProductDetailsCard from "components/reseller/atoms/productdetailscard";

const categories = [
  {
    name: "Casual Shirt",
    image:
      "https://image.shutterstock.com/image-photo/closeup-young-mans-body-empty-600w-490041943.jpg",
  },
  {
    name: "Casual Shirt",
    image:
      "https://image.shutterstock.com/image-photo/closeup-young-mans-body-empty-600w-490041943.jpg",
  },
  {
    name: "Casual Shirt",
    image:
      "https://image.shutterstock.com/image-photo/closeup-young-mans-body-empty-600w-490041943.jpg",
  },
  {
    name: "Casual Shirt",
    image:
      "https://image.shutterstock.com/image-photo/closeup-young-mans-body-empty-600w-490041943.jpg",
  },
  {
    name: "Casual Shirt",
    image:
      "https://image.shutterstock.com/image-photo/closeup-young-mans-body-empty-600w-490041943.jpg",
  },
  {
    name: "Casual Shirt",
    image:
      "https://image.shutterstock.com/image-photo/closeup-young-mans-body-empty-600w-490041943.jpg",
  },
  {
    name: "Casual Shirt",
    image:
      "https://image.shutterstock.com/image-photo/closeup-young-mans-body-empty-600w-490041943.jpg",
  },
  {
    name: "Casual Shirt",
    image:
      "https://image.shutterstock.com/image-photo/closeup-young-mans-body-empty-600w-490041943.jpg",
  },
  {
    name: "Casual Shirt",
    image:
      "https://image.shutterstock.com/image-photo/closeup-young-mans-body-empty-600w-490041943.jpg",
  },
  {
    name: "Casual Shirt",
    image:
      "https://image.shutterstock.com/image-photo/closeup-young-mans-body-empty-600w-490041943.jpg",
  },
  {
    name: "Casual Shirt",
    image:
      "https://image.shutterstock.com/image-photo/closeup-young-mans-body-empty-600w-490041943.jpg",
  },
  {
    name: "Casual Shirt",
    image:
      "https://image.shutterstock.com/image-photo/closeup-young-mans-body-empty-600w-490041943.jpg",
  },
  {
    name: "Casual Shirt",
    image:
      "https://image.shutterstock.com/image-photo/closeup-young-mans-body-empty-600w-490041943.jpg",
  },
  {
    name: "Casual Shirt",
    image:
      "https://image.shutterstock.com/image-photo/closeup-young-mans-body-empty-600w-490041943.jpg",
  },
  {
    name: "Casual Shirt",
    image:
      "https://image.shutterstock.com/image-photo/closeup-young-mans-body-empty-600w-490041943.jpg",
  },
  {
    name: "Casual Shirt",
    image:
      "https://image.shutterstock.com/image-photo/closeup-young-mans-body-empty-600w-490041943.jpg",
  },
  {
    name: "Casual Shirt",
    image:
      "https://image.shutterstock.com/image-photo/closeup-young-mans-body-empty-600w-490041943.jpg",
  },
  {
    name: "Casual Shirt",
    image:
      "https://image.shutterstock.com/image-photo/closeup-young-mans-body-empty-600w-490041943.jpg",
  },
];
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
  const [products, setProducts] = useState([]);
  const user = useUserInfo();

  const getproducts = async () => {
    await axios
      .get("https://fakestoreapi.com/products")
      .then((data) => {
        setProducts([...data.data]);
      })
      .catch(() => {});
  };

  useEffect(() => {
    if (!user) {
      getproducts();
    }
  }, [user]);
  return (
    <>
      {user ? (
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
          <CarousalComponent />

          <HomeComponent
            categories={[...categories]}
            products={[...products]}
            productTitle="Top Products"
          />
        </>
      )}
    </>
  );
};
export default Home;
