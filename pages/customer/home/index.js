import { Box, Grid, Paper, Typography } from "@mui/material";
// import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { FaTicketAlt } from "react-icons/fa";
import HotDealsOfTheDay from "@/forms/customer/HotDealsOfTheDay";
import CarousalComponent from "@/atoms/Carousel";
import TopTrending from "@/forms/customer/TopTrending";
// import CategoryScrollComponent from "@/atoms/CategoryScrollComponent";
// import InputBox from "@/atoms/InputBoxComponent";
// import ProductDetailsCard from "components/reseller/atoms/productdetailscard";

// const categories = [
//   {
//     name: "Casual Shirt",
//     image:
//       "https://image.shutterstock.com/image-photo/closeup-young-mans-body-empty-600w-490041943.jpg",
//   },
//   {
//     name: "Casual Shirt",
//     image:
//       "https://image.shutterstock.com/image-photo/closeup-young-mans-body-empty-600w-490041943.jpg",
//   },
//   {
//     name: "Casual Shirt",
//     image:
//       "https://image.shutterstock.com/image-photo/closeup-young-mans-body-empty-600w-490041943.jpg",
//   },
//   {
//     name: "Casual Shirt",
//     image:
//       "https://image.shutterstock.com/image-photo/closeup-young-mans-body-empty-600w-490041943.jpg",
//   },
//   {
//     name: "Casual Shirt",
//     image:
//       "https://image.shutterstock.com/image-photo/closeup-young-mans-body-empty-600w-490041943.jpg",
//   },
//   {
//     name: "Casual Shirt",
//     image:
//       "https://image.shutterstock.com/image-photo/closeup-young-mans-body-empty-600w-490041943.jpg",
//   },
//   {
//     name: "Casual Shirt",
//     image:
//       "https://image.shutterstock.com/image-photo/closeup-young-mans-body-empty-600w-490041943.jpg",
//   },
//   {
//     name: "Casual Shirt",
//     image:
//       "https://image.shutterstock.com/image-photo/closeup-young-mans-body-empty-600w-490041943.jpg",
//   },
//   {
//     name: "Casual Shirt",
//     image:
//       "https://image.shutterstock.com/image-photo/closeup-young-mans-body-empty-600w-490041943.jpg",
//   },
//   {
//     name: "Casual Shirt",
//     image:
//       "https://image.shutterstock.com/image-photo/closeup-young-mans-body-empty-600w-490041943.jpg",
//   },
//   {
//     name: "Casual Shirt",
//     image:
//       "https://image.shutterstock.com/image-photo/closeup-young-mans-body-empty-600w-490041943.jpg",
//   },
//   {
//     name: "Casual Shirt",
//     image:
//       "https://image.shutterstock.com/image-photo/closeup-young-mans-body-empty-600w-490041943.jpg",
//   },
//   {
//     name: "Casual Shirt",
//     image:
//       "https://image.shutterstock.com/image-photo/closeup-young-mans-body-empty-600w-490041943.jpg",
//   },
//   {
//     name: "Casual Shirt",
//     image:
//       "https://image.shutterstock.com/image-photo/closeup-young-mans-body-empty-600w-490041943.jpg",
//   },
//   {
//     name: "Casual Shirt",
//     image:
//       "https://image.shutterstock.com/image-photo/closeup-young-mans-body-empty-600w-490041943.jpg",
//   },
//   {
//     name: "Casual Shirt",
//     image:
//       "https://image.shutterstock.com/image-photo/closeup-young-mans-body-empty-600w-490041943.jpg",
//   },
//   {
//     name: "Casual Shirt",
//     image:
//       "https://image.shutterstock.com/image-photo/closeup-young-mans-body-empty-600w-490041943.jpg",
//   },
//   {
//     name: "Casual Shirt",
//     image:
//       "https://image.shutterstock.com/image-photo/closeup-young-mans-body-empty-600w-490041943.jpg",
//   },
// ];

const Home = () => {
  return (
    <div className="w-100">
      <CarousalComponent />
      {/* <Box className="mt-2 d-flex justify-content-end align-items-center">
        <Box className="d-flex m-3 align-items-center">
          <InputBox size="small" />
          <Box
            className="bg-orange d-flex justify-content-center align-items-center rounded cursor-pointer rounded ms-2"
            // onClick={handleSearch}
          >
            <SearchOutlinedIcon className="text-white p-1 h-1" />
          </Box>
        </Box>
      </Box>
      <Box className="d-flex justify-content-between mx-1 align-items-center">
        <Typography className="fw-bold h-5">Top categories</Typography>
        <Typography className="h-14 color-orange">See all</Typography>
      </Box>
      <Box className=" w-100 overflow-x-scroll">
        <CategoryScrollComponent categories={[...categories]} />
      </Box>
      <Box className="mt-5">
        <Typography className="fw-bold h-5">Top Products</Typography>
        <ProductDetailsCard
          products={[...products]}
          getSelectedItem={(item) => {
            console.log(item);
          }}
          showMarginButton={false}
          get
        />
      </Box> */}
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
            <Typography className="fw-bold h-5">Secure Payment</Typography>
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
            <Typography className="fw-bold h-5">Help & Support</Typography>
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
    </div>
  );
};
export default Home;
