import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import ButtonTabsList from "components/atoms/ButtonTabsList";
import CategoryScrollComponent from "components/atoms/CategoryScrollComponent";
import ImageCard from "components/atoms/ImageCard";
import SearchComponent from "components/atoms/SearchComponent";
import Image from "next/image";
import { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CategoryProductCard from "components/reseller/atoms/CategoryProductCard";

const CategoryItems = [
  {
    name: "sarees",
    image:
      "https://image.shutterstock.com/image-photo/closeup-young-mans-body-empty-600w-490041943.jpg",
  },
  {
    name: "Kurtas",
    image:
      "https://image.shutterstock.com/image-photo/closeup-young-mans-body-empty-600w-490041943.jpg",
  },
  {
    name: "Makeups",
    image:
      "https://image.shutterstock.com/image-photo/closeup-young-mans-body-empty-600w-490041943.jpg",
  },
  {
    name: "sarees",
    image:
      "https://image.shutterstock.com/image-photo/closeup-young-mans-body-empty-600w-490041943.jpg",
  },
  {
    name: "Kurtas",
    image:
      "https://image.shutterstock.com/image-photo/closeup-young-mans-body-empty-600w-490041943.jpg",
  },
  {
    name: "Makeups",
    image:
      "https://image.shutterstock.com/image-photo/closeup-young-mans-body-empty-600w-490041943.jpg",
  },
  {
    name: "sarees",
    image:
      "https://image.shutterstock.com/image-photo/closeup-young-mans-body-empty-600w-490041943.jpg",
  },
  {
    name: "Kurtas",
    image:
      "https://image.shutterstock.com/image-photo/closeup-young-mans-body-empty-600w-490041943.jpg",
  },
  {
    name: "Makeups",
    image:
      "https://image.shutterstock.com/image-photo/closeup-young-mans-body-empty-600w-490041943.jpg",
  },
  {
    name: "sarees",
    image:
      "https://image.shutterstock.com/image-photo/closeup-young-mans-body-empty-600w-490041943.jpg",
  },
  {
    name: "Kurtas",
    image:
      "https://image.shutterstock.com/image-photo/closeup-young-mans-body-empty-600w-490041943.jpg",
  },
  {
    name: "Makeups",
    image:
      "https://image.shutterstock.com/image-photo/closeup-young-mans-body-empty-600w-490041943.jpg",
  },
  {
    name: "sarees",
    image:
      "https://image.shutterstock.com/image-photo/closeup-young-mans-body-empty-600w-490041943.jpg",
  },
  {
    name: "Kurtas",
    image:
      "https://image.shutterstock.com/image-photo/closeup-young-mans-body-empty-600w-490041943.jpg",
  },
  {
    name: "Makeups",
    image:
      "https://image.shutterstock.com/image-photo/closeup-young-mans-body-empty-600w-490041943.jpg",
  },
  {
    name: "sarees",
    image:
      "https://image.shutterstock.com/image-photo/closeup-young-mans-body-empty-600w-490041943.jpg",
  },
  {
    name: "Kurtas",
    image:
      "https://image.shutterstock.com/image-photo/closeup-young-mans-body-empty-600w-490041943.jpg",
  },
  {
    name: "Makeups",
    image:
      "https://image.shutterstock.com/image-photo/closeup-young-mans-body-empty-600w-490041943.jpg",
  },
  {
    name: "sarees",
    image:
      "https://image.shutterstock.com/image-photo/closeup-young-mans-body-empty-600w-490041943.jpg",
  },
  {
    name: "Kurtas",
    image:
      "https://image.shutterstock.com/image-photo/closeup-young-mans-body-empty-600w-490041943.jpg",
  },
  {
    name: "Makeups",
    image:
      "https://image.shutterstock.com/image-photo/closeup-young-mans-body-empty-600w-490041943.jpg",
  },
];
const subCategoryItems = [
  {
    id: 1,
    label: "Daily wears",
    image:
      "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/flower.jpg",
  },

  {
    id: 103,
    label: "Handloom",
    image: "",
  },
  {
    id: 102,
    label: "Hand bags",
    image: "",
  },
  {
    id: 101,
    label: "Daily wears",
    image: "",
  },
  {
    id: 100,
    label: "Daily wears",
    image: "",
  },
  {
    id: 19,
    label: "Daily wears",
    image: "",
  },
  {
    id: 18,
    label: "Daily wears",
    image: "",
  },
  {
    id: 17,
    label: "Daily wears",
    image: "",
  },
  {
    id: 16,
    label: "Daily wears",
    image: "",
  },
  {
    id: 15,
    label: "Daily wears",
    image: "",
  },
  {
    id: 14,
    label: "Daily wears",
    image: "",
  },
  {
    id: 13,
    label: "Daily wears",
    image: "",
  },
  {
    id: 12,
    label: "Daily wears",
    image: "",
  },
  {
    id: 11,
    label: "Daily wears",
    image: "",
  },
  {
    id: 10,
    label: "Daily wears",
    image: "",
  },
];

const productList = [
  {
    title: "hat",
    shortDescription: "abcdefghij abcdefghij abcdefghij abcdefghij",
    actualCost: "300",
    freeDelivary: "300",
    profit_earned: "25",
  },
  {
    title: "hat",
    shortDescription: "abcdefghij abcdefghij abcdefghij abcdefghij",
    actualCost: "300",
    freeDelivary: "300",
    profit_earned: "25",
  },
  {
    title: "hat",
    shortDescription: "abcdefghij abcdefghij abcdefghij abcdefghij",
    actualCost: "300",
    freeDelivary: "300",
    profit_earned: "25",
  },
  {
    title: "hat",
    shortDescription: "abcdefghij abcdefghij abcdefghij abcdefghij",
    actualCost: "300",
    freeDelivary: "300",
    profit_earned: "25",
  },
  {
    title: "hat",
    shortDescription: "abcdefghij abcdefghij abcdefghij abcdefghij",
    actualCost: "300",
    freeDelivary: "300",
    profit_earned: "25",
  },
  {
    title: "hat",
    shortDescription: "abcdefghij abcdefghij abcdefghij abcdefghij",
    actualCost: "300",
    freeDelivary: "300",
    profit_earned: "25",
  },
];

const Category = ({}) => {
  const [tabsList, setTabsList] = useState([
    { title: "women" },
    { title: "Men" },
    { title: "Home & Livings" },
  ]);
  const [activeTabs, setActiveTabs] = useState({ title: "Men", id: 1 });
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [searchText, setSearchText] = useState("");

  return (
    <Paper className="w-100 d-flex flex-column h-100 hide-scrollbar p-3 pb-0">
      {!selectedCategory.length ? (
        <>
          <Box className="d-flex justify-content-between align-items-center mb-2">
            <Typography className="h-4 fw-bold">Top Categories</Typography>
            <Box className="d-flex">
              <SearchComponent
                handleBtnSearch={(val) => {
                  console.log(val);
                }}
              />
            </Box>
          </Box>
          <Box className="w-100">
            <Box className="d-flex mxw-85vw overflow-x-scroll hide-scrollbar mx-auto">
              <CategoryScrollComponent categories={CategoryItems} />
            </Box>
          </Box>
          <Box className="w-100 d-flex mt-3">
            <Box className="d-flex mnw-150 mxw-200 w-20p">
              <ButtonTabsList
                tabsList={tabsList}
                getActiveTab={(val) => {
                  setActiveTabs({ ...tabsList[val], id: val });
                }}
                activeTab={activeTabs.id}
              />
            </Box>
            <Box className="d-flex mxh-50vh overflow-y-scroll hide-scrollbar">
              <Grid container className="w-100 p-3" spacing={2}>
                {subCategoryItems.map((ele) => {
                  return (
                    <Grid
                      item
                      md={4}
                      lg={2}
                      key={ele.id}
                      className="p-2 d-flex flex-column align-items-center"
                      onClick={() => {
                        setSelectedCategory([{ ...ele }]);
                      }}
                    >
                      <Card elevation={2} className="w-100 h-100">
                        <CardActionArea>
                          <Image
                            src={
                              "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/flower.jpg"
                            }
                          />
                        </CardActionArea>
                      </Card>
                      <Typography className={`h-4 cursor-pointer`}>
                        {ele.label}
                      </Typography>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          </Box>
        </>
      ) : (
        <Box className="d-flex flex-column w-100 pb-2">
          <Box className="mb-3">
            <Typography className="h-5 color-orange cursor-pointer d-flex align-items-center">
              <ArrowBackIosIcon className="fs-16" />
              Back
            </Typography>
          </Box>
          <Box>
            <Typography className="h-4 fw-600">
              {selectedCategory[0].label}
            </Typography>
          </Box>
          <Box className="d-flex justify-content-md-end">
            <SearchComponent
              placeholder="Search"
              showSearchBtn={() => {}}
              onSearchTextChange={(text) => {
                setSearchText(text);
              }}
            />
          </Box>
          <Box className="d-flex w-100 mxh-80vh overflow-y-scroll hide-scrollbar">
            <Grid
              container
              spacing={2}
              className=" mt-2 mx-auto ms-0"
              sx={{
                width: `calc(100% - 10px)`,
              }}
            >
              {productList.map((item, index) => {
                return (
                  <Grid item md={4} lg={3} xl={2} sm={6} key={index}>
                    <CategoryProductCard data={item} />
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Box>
      )}
    </Paper>
  );
};
export default Category;
