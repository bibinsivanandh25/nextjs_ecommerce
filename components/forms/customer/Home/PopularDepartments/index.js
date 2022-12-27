import { Box, Card, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Image from "next/image";
import CustomIcon from "services/iconUtils";
import DrawerComponent from "@/atoms/DrawerComponent";
import ButtonComponent from "@/atoms/ButtonComponent";
import {
  getFeaturedProducts,
  getMostPopularProducts,
  getNewArrivalProducts,
  getBestSoldProducts,
} from "services/customer/Home";
import { useSelector } from "react-redux";
import SimilarProducts from "../../searchedproduct/SimilarProduct";
import ProductCard from "./ProductCard";
import ViewModalComponent from "../../searchedproduct/ViewModalComponent";

const comparProductData = [
  {
    id: 1,
    imageLink:
      "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
  },
  {
    id: 2,
    imageLink:
      "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/img_snap.PNG",
  },
  {
    id: 3,
    imageLink: "",
  },
  {
    id: 4,
    imageLink: "",
  },
];

const PopularDepartments = ({ setShowCompareProducts = () => {} }) => {
  const [products, setProducts] = useState([]);
  const [showDrawer, setShowDrawer] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [comparDrawer, setComparDrawer] = useState(false);
  const [comparedProduct, setCompredProduct] = useState([]);
  const [popularDepartments, setPopularDepartments] = useState("New Arrivals");
  const [filterType, setFilterType] = useState("WEEK");

  useEffect(() => {
    setCompredProduct(comparProductData);
  }, []);

  const storeDetails = useSelector((state) => state.customer);

  const setAllProducts = (data) => {
    const temp = [];
    data.forEach((ele) => {
      temp.push({
        id: ele.productId,
        title: ele.productTitle,
        price: ele.salePrice,
        salePriceWithLogistics: ele.salePriceWithLogistics,
        image: ele.variationMedia,
        rating: {
          rate: ele.averageRatings,
          count: ele.totalRatings,
        },
      });
    });
    setProducts([...temp]);
  };

  const getProducts = async () => {
    if (popularDepartments === "New Arrivals") {
      const { data } = await getNewArrivalProducts(
        filterType,
        storeDetails?.supplierId
      );
      if (data) {
        setAllProducts(data);
      }
    }
    if (popularDepartments === "Most Popular") {
      const { data } = await getMostPopularProducts(
        filterType,
        storeDetails?.supplierId
      );
      if (data) {
        setAllProducts(data);
      }
    }
    if (popularDepartments === "Best Seller") {
      const { data } = await getBestSoldProducts(
        filterType,
        storeDetails?.supplierId
      );
      if (data) {
        setAllProducts(data);
      }
    }

    if (popularDepartments === "Featured") {
      const { data } = await getFeaturedProducts(
        filterType,
        storeDetails?.supplierId
      );
      if (data) {
        setAllProducts(data);
      }
    }
  };
  useEffect(() => {
    setProducts([]);
    getProducts();
  }, [popularDepartments, filterType]);

  useEffect(() => {
    setFilterType("WEEK");
  }, [popularDepartments]);

  const handleCloseIconClick = (id) => {
    const comparedProductCopy = [...comparedProduct];
    const final = comparedProductCopy.map((item) => {
      if (item.id == id) {
        return { ...item, imageLink: "" };
      }
      return item;
    });
    setCompredProduct(final);
  };

  return (
    <Box>
      <Typography className="fw-bold text-center my-2">
        Popular Departments
      </Typography>
      <Box className="row">
        <Box className="col-3" />
        <Box className="col-5 d-flex justify-content-around  h-5 pb-1">
          <Card
            onClick={() => {
              if (popularDepartments !== "New Arrivals")
                setPopularDepartments("New Arrivals");
            }}
            className={`px-3 py-1 border d-flex align-items-center text-center cursor-pointer ${
              popularDepartments === "New Arrivals"
                ? "border-orange bg-orange-1 fw-bold"
                : ""
            }`}
          >
            New Arrivals
          </Card>
          <Card
            onClick={() => {
              if (popularDepartments !== "Best Seller")
                setPopularDepartments("Best Seller");
            }}
            className={`px-3 py-1 border d-flex align-items-center text-center cursor-pointer ${
              popularDepartments === "Best Seller"
                ? "border-orange bg-orange-1 fw-bold"
                : ""
            }`}
          >
            Best Seller
          </Card>
          <Card
            onClick={() => {
              if (popularDepartments !== "Most Popular")
                setPopularDepartments("Most Popular");
            }}
            className={`px-3 py-1 border d-flex align-items-center text-center cursor-pointer ${
              popularDepartments === "Most Popular"
                ? "border-orange bg-orange-1 fw-bold"
                : ""
            }`}
          >
            Most Popular
          </Card>
          <Card
            onClick={() => {
              if (popularDepartments !== "Featured")
                setPopularDepartments("Featured");
            }}
            className={`px-3 py-1 border d-flex align-items-center text-center cursor-pointer ${
              popularDepartments === "Featured"
                ? "border-orange bg-orange-1 fw-bold"
                : ""
            }`}
          >
            Featured
          </Card>
        </Box>
        <Box className="col-4 d-flex justify-content-end pb-1">
          <Card
            className={`px-3 py-1 d-flex align-items-center text-center h-5 border cursor-pointer  ${
              filterType === "WEEK" ? "border-orange bg-orange-1 fw-bold" : ""
            }`}
            onClick={() => {
              if (filterType !== "WEEK") {
                setFilterType("WEEK");
              }
            }}
          >
            W
          </Card>
          <Card
            className={`px-3 py-1 d-flex align-items-center text-center h-5 border cursor-pointer mx-3 ${
              filterType === "MONTH" ? "border-orange bg-orange-1 fw-bold" : ""
            }`}
            onClick={() => {
              if (filterType !== "MONTH") {
                setFilterType("MONTH");
              }
            }}
          >
            M
          </Card>
        </Box>
      </Box>
      <Box className="d-flex w-100 overflow-auto mt-2 hide-scrollbar">
        {products.map((ele) => {
          return (
            <ProductCard
              key={ele.id}
              item={ele}
              handleIconClick={(icon) => {
                if (icon === "viewCarouselOutlinedIcon") {
                  setShowDrawer(true);
                }
                if (icon === "balanceIcon") {
                  setComparDrawer(true);
                }
                if (icon === "visibilityOutlinedIcon") {
                  setViewModalOpen(true);
                }
              }}
            />
          );
        })}
      </Box>
      <DrawerComponent
        openDrawer={showDrawer}
        width="500px"
        modalTitle="Similar Products"
        onClose={() => setShowDrawer(false)}
      >
        <Grid
          container
          spacing={2}
          className="mx-auto ms-0 mt-2"
          sx={{
            width: `calc(100% - 10px)`,
          }}
        >
          {products.map((item) => (
            <Grid item md={6} sm={6} key={item.id}>
              <SimilarProducts data={item} handleIconClick={() => {}} />
            </Grid>
          ))}
        </Grid>
      </DrawerComponent>
      {viewModalOpen && (
        <ViewModalComponent
          setViewModalOpen={setViewModalOpen}
          viewModalOpen={viewModalOpen}
        />
      )}
      <DrawerComponent
        openDrawer={comparDrawer}
        anchor="bottom"
        width="vp-width"
        headerBorder={false}
        onClose={() => setComparDrawer(false)}
        enter={300}
      >
        <Box
          className="px-4 py-2 d-flex justify-content-between mnh-25p mx-4"
          style={{ height: "150px" }}
        >
          <Box className="align-self-center ">
            <p className="fw-600 fs-18">Compare Products</p>
            <p>( 1 Product )</p>
          </Box>
          {comparedProduct &&
            comparedProduct.map((item) => (
              <Box
                className="d-flex justify-content-center border rounded mnw-150"
                key={item.id}
              >
                {item.imageLink ? (
                  <>
                    <Image
                      src={item?.imageLink}
                      alt=""
                      className="rounded bg-white"
                      style={{ position: "relative" }}
                      width="150%"
                      height="100%"
                    />

                    <CustomIcon
                      type="close"
                      className="position-absolute compareProductTop fs-18"
                      onIconClick={() => handleCloseIconClick(item.id)}
                    />
                  </>
                ) : (
                  <Box className="align-self-center border p-3 rounded-circle cursor-pointer">
                    <CustomIcon type="add" className="" />
                  </Box>
                )}
              </Box>
            ))}
          <Box className="align-self-center">
            <ButtonComponent
              label="Clear All"
              variant="outlined"
              borderColor="border-gray "
              bgColor="bg-white"
              textColor="color-black"
              size="medium"
              muiProps="me-3"
            />
            <ButtonComponent
              label="Start Compare"
              size="medium"
              onBtnClick={() => {
                setShowCompareProducts(true);
                setComparDrawer(false);
              }}
            />
          </Box>
        </Box>
      </DrawerComponent>
    </Box>
  );
};
export default PopularDepartments;
