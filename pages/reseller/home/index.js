import { Box, Paper } from "@mui/material";
import CarouselComponent from "components/atoms/Carousel";
import InputBox from "components/atoms/InputBoxComponent";
import SimpleDropdownComponent from "components/atoms/SimpleDropdownComponent";
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

const Home = () => {
  const [products, setProducts] = useState([]);
  const [dropDownValue, setDropDownValue] = useState([]);

  const getproducts = async () => {
    await serviceUtil
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
    <Paper className="p-2">
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
        <HomeComponent
          categories={[...categories]}
          products={[...products]}
          productTitle="Top Products"
        />
      </div>
    </Paper>
  );
};
export default Home;
