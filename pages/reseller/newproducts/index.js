import { Box } from "@mui/material";
import CarouselComponent from "components/atoms/Carousel";
import InputBox from "components/atoms/InputBoxComponent";
import { useEffect, useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import HomeComponent from "components/forms/reseller/home";
import serviceUtil from "services/utils";

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

const NewProducts = () => {
  const [products, setProducts] = useState([]);

  const getproducts = async () => {
    await serviceUtil
      .get("https://fakestoreapi.com/products")
      .then((data) => {
        setProducts([...data.data]);
      })
      .catch(() => {
        // console.log(err);
      });
  };
  useEffect(() => {
    getproducts();
  }, []);
  return (
    <div className="bg-white p-2 rounded">
      <CarouselComponent />
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
      <HomeComponent
        categories={[...categories]}
        products={[...products]}
        productTitle="Newly Added Products"
        showMarginButton
      />
    </div>
  );
};
export default NewProducts;
