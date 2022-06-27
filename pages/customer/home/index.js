import { Box, Typography } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import axios from "axios";
import { useEffect, useState } from "react";
import ProductDetailsCard from "components/reseller/atoms/productdetailscard";
import CategoryScrollComponent from "@/atoms/CategoryScrollComponent";
import InputBox from "@/atoms/InputBoxComponent";
import CarousalComponent from "@/atoms/Carousel";

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

const Home = () => {
  const [products, setProducts] = useState([]);

  const getproducts = async () => {
    await axios
      .get("https://fakestoreapi.com/products")
      .then((data) => {
        setProducts([...data.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getproducts();
  }, []);
  return (
    <div className="w-100">
      <CarousalComponent />
      <Box className="mt-2 d-flex justify-content-end align-items-center">
        <Box className="d-flex m-3 align-items-center">
          <InputBox size="small" />
          <Box
            className="bg-orange d-flex justify-content-center align-items-center rounded cursor-pointer rounded ms-2"
            // onClick={handleSearch}
          >
            <SearchOutlinedIcon className="text-white p-1 fs-1" />
          </Box>
        </Box>
      </Box>
      <Box className="d-flex justify-content-between mx-1 align-items-center">
        <Typography className="fw-bold">Top categories</Typography>
        <Typography className="fs-14 color-orange">See all</Typography>
      </Box>
      <Box className=" w-100 overflow-x-scroll">
        <CategoryScrollComponent categories={[...categories]} />
      </Box>
      <Box className="mt-5">
        <Typography className="fw-bold">Top Products</Typography>
        <ProductDetailsCard
          products={[...products]}
          getSelectedItem={(item) => {
            console.log(item);
          }}
          showMarginButton={false}
          get
        />
      </Box>
    </div>
  );
};
export default Home;
