/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
import {
  Box,
  Card,
  CardActionArea,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import ButtonTabsList from "components/atoms/ButtonTabsList";
import CategoryScrollComponent from "components/atoms/CategoryScrollComponent";
import SearchComponent from "components/atoms/SearchComponent";
import Image from "next/image";
import { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CategoryProductCard from "components/reseller/atoms/CategoryProductCard";
import { assetsJson } from "public/assets";
import SimpleDropdownComponent from "@/atoms/SimpleDropdownComponent";

const CategoryItems = [
  {
    name: "sarees",
    image: assetsJson.saree_reseller_home,
  },
  {
    name: "Kurtas",
    image: assetsJson.saree_reseller_home,
  },
  {
    name: "Makeups",
    image: assetsJson.saree_reseller_home,
  },
  {
    name: "sarees",
    image: assetsJson.saree_reseller_home,
  },
  {
    name: "Kurtas",
    image: assetsJson.saree_reseller_home,
  },
  {
    name: "Makeups",
    image: assetsJson.saree_reseller_home,
  },
  {
    name: "sarees",
    image: assetsJson.saree_reseller_home,
  },
  {
    name: "Kurtas",
    image: assetsJson.saree_reseller_home,
  },
  {
    name: "Makeups",
    image: assetsJson.saree_reseller_home,
  },
  {
    name: "sarees",
    image: assetsJson.saree_reseller_home,
  },
  {
    name: "Kurtas",
    image: assetsJson.saree_reseller_home,
  },
  {
    name: "Makeups",
    image: assetsJson.saree_reseller_home,
  },
  {
    name: "sarees",
    image: assetsJson.saree_reseller_home,
  },
  {
    name: "Kurtas",
    image: assetsJson.saree_reseller_home,
  },
  {
    name: "Makeups",
    image: assetsJson.saree_reseller_home,
  },
  {
    name: "sarees",
    image: assetsJson.saree_reseller_home,
  },
  {
    name: "Kurtas",
    image: assetsJson.saree_reseller_home,
  },
  {
    name: "Makeups",
    image: assetsJson.saree_reseller_home,
  },
  {
    name: "sarees",
    image: assetsJson.saree_reseller_home,
  },
  {
    name: "Kurtas",
    image: assetsJson.saree_reseller_home,
  },
  {
    name: "Makeups",
    image: assetsJson.saree_reseller_home,
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
const setItems = [
  {
    id: 1,
    label: "Daily wears",
    image:
      "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/MultipleProducts.png",
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
    no_of_Design: 3,
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
    no_of_Design: 7,
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
    no_of_Design: 2,
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
const fliterDropDownValues = [
  {
    label: "Fixed margin",
    value: "Fixed margin",
  },
  {
    label: "Dynamic margin",
    value: "Dynamic margin",
  },
];
const DisplaySet = ({ ele, handleClick }) => {
  return (
    <Grid
      item
      md={4}
      lg={2}
      key={ele.id}
      className="p-2 d-flex flex-column align-items-center"
    >
      <Card
        elevation={2}
        className="w-100 h-100"
        onClick={() => {
          handleClick(ele);
        }}
      >
        <CardActionArea>
          <Image
            src={
              ele.image !== ""
                ? ele.image
                : "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/flower.jpg"
            }
            width={100}
            height={100}
            layout="responsive"
            alt=""
          />
        </CardActionArea>
      </Card>
      <Typography className="h-4 cursor-pointer">{ele.label}</Typography>
    </Grid>
  );
};

const Category = () => {
  const [tabsList, setTabsList] = useState([
    { title: "women" },
    { title: "Men" },
    { title: "Home & Livings" },
  ]);
  const [activeTabs, setActiveTabs] = useState({ title: "Men", id: 1 });
  const [selectedSubCategory, setSelectedSubCategory] = useState([]);
  const [selectedSets, setSelectedSets] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [dropDownValue, setDropDownValue] = useState([]);
  return (
    <Paper className="w-100 d-flex flex-column p-3 pb-0">
      {!selectedSubCategory.length ? (
        <>
          <Box className="d-flex justify-content-between align-items-center mb-2">
            <Typography className="h-4 fw-bold">Top Categories</Typography>
            <Box className="d-flex w-50 d-flex justify-content-end align-items-center">
              <Box className="me-3 w-50">
                <SimpleDropdownComponent
                  size="small"
                  value={dropDownValue}
                  placeholder="Filter by"
                  list={fliterDropDownValues}
                  onDropdownSelect={(value) => {
                    setDropDownValue(value);
                  }}
                />
              </Box>
              <Box className="">
                <SearchComponent
                  placeholder="Search"
                  handleBtnSearch={(val) => {
                    console.log(val);
                  }}
                />
              </Box>
            </Box>
          </Box>
          <Box className="">
            <Box className="w-100 mb-3">
              <Box className="d-flex mxw-85vw overflow-x-scroll hide-scrollbar mx-auto">
                <CategoryScrollComponent categories={CategoryItems} />
              </Box>
            </Box>
            {selectedSets.length ? (
              <Box className="mb-3">
                <Typography
                  className="h-5 color-orange cursor-pointer d-flex align-items-center"
                  onClick={() => {
                    setSelectedSets([]);
                  }}
                >
                  <ArrowBackIosIcon className="fs-16" />
                  Back
                </Typography>
              </Box>
            ) : null}
            <Box className="w-100 d-flex ">
              <Box className="d-flex mnw-150 mxw-200 w-20p">
                <ButtonTabsList
                  tabsList={tabsList}
                  getActiveTab={(val) => {
                    setActiveTabs({ ...tabsList[val], id: val });
                  }}
                  activeTab={activeTabs.id}
                />
              </Box>
              <Box
                sx={{ maxHeight: "45vh" }}
                className="d-flex overflow-y-scroll hide-scrollbar"
              >
                <Grid container className="w-100 p-3" spacing={2}>
                  {!selectedSets.length
                    ? setItems.map((ele, index) => {
                        return (
                          <DisplaySet
                            ele={ele}
                            key={index}
                            handleClick={(val) => {
                              setSelectedSets([{ ...val }]);
                            }}
                          />
                        );
                      })
                    : subCategoryItems.map((ele, index) => {
                        return (
                          <DisplaySet
                            ele={ele}
                            key={index}
                            handleClick={(val) => {
                              setSelectedSubCategory([{ ...val }]);
                            }}
                          />
                        );
                      })}
                </Grid>
              </Box>
            </Box>
          </Box>
        </>
      ) : (
        <Box className="d-flex flex-column w-100 pb-2">
          <Box className="mb-3">
            <Typography
              className="h-5 color-orange cursor-pointer d-flex align-items-center"
              onClick={() => {
                setSelectedSubCategory([]);
              }}
            >
              <ArrowBackIosIcon className="fs-16" />
              Back
            </Typography>
          </Box>
          <Box>
            <Typography className="h-4 fw-600">
              {selectedSubCategory[0].label}
            </Typography>
          </Box>
          <Box className="d-flex justify-content-md-end mb-3">
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
