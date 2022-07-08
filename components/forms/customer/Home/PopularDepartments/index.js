import { Box, Card, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import CustomIcon from "services/iconUtils";
import SimilarProducts from "../../searchedproduct/SimilarProduct";
import DrawerComponent from "@/atoms/DrawerComponent";
import ProductCard from "./ProductCard";
import ButtonComponent from "@/atoms/ButtonComponent";
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

  useEffect(() => {
    setCompredProduct(comparProductData);
  }, []);
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
    <Box>
      <Typography className="fw-bold text-center my-2">
        Popular Departments
      </Typography>
      <Box className="row">
        <Box className="col-3" />
        <Box className="col-5 d-flex justify-content-around">
          <Card className="px-3 py-1 border border-orange bg-light-pink">
            New Arrivals
          </Card>
          <Card className="px-3 py-1 border ">Best Seller</Card>
          <Card className="px-3 py-1 border">Most Popular</Card>
          <Card className="px-3 py-1 border">Featured</Card>
        </Box>
        <Box className="col-4 d-flex justify-content-end">
          <Card className="px-3 py-1 bg-light-pink border border-orange">
            D
          </Card>
          <Card className="px-3 py-1 border mx-3">M</Card>
          <Card className="px-3 py-1 border">W</Card>
        </Box>
      </Box>
      <Box className="d-flex w-100 overflow-auto mt-2 hide-scrollbar">
        {/* {getProducts()} */}
        {products.map((ele) => {
          return (
            <ProductCard
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
              <Box className="d-flex justify-content-center border rounded mnw-150">
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
