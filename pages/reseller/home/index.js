import { Box, Grid, Paper, Typography } from "@mui/material";
import axios from "axios";
import CarouselComponent from "components/atoms/Carousel";
import InputBox from "components/atoms/InputBoxComponent";
import SimpleDropdownComponent from "components/atoms/SimpleDropdownComponent";
import { useEffect, useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Image from "next/image";
import ImageCard from "components/atoms/ImageCard";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import ButtonComponent from "components/atoms/ButtonComponent";
import HomeComponent from "components/forms/reseller/home";

let categories = [
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
  const [dropDownValue, setDropDownValue] = useState([]);
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((data) => {
        setProducts([...data.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <CarouselComponent />
      <Box className="mt-2 d-flex justify-content-end align-items-center">
        <Box className="w-25 ">
          <SimpleDropdownComponent
            value={dropDownValue}
            size="small"
            list={[
              {
                label: "Fixed Commission",
                value: "Fixed Commission",
              },
              {
                label: "Zero Commission",
                value: "Zero Commission",
              },
            ]}
            onDropdownSelect={(value) => {
              setDropDownValue(value);
            }}
          />
        </Box>
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
      <HomeComponent categories={[...categories]} products={[...products]} />
    </div>
  );
};
export default Home;
