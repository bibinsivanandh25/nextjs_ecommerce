/* eslint-disable import/no-cycle */
import CustomDrawer from "@/atoms/CustomDrawer";
import { Grid } from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getSimilarProducts } from "services/customer/similarproducts";
import ProductCard from "../../Home/PopularDepartments/ProductCard";

function SimilarProducts({
  showDrawer = false,
  setShowDrawer = () => {},
  productId = null,
  subCategoryId = null,
}) {
  // eslint-disable-next-line no-unused-vars
  const [pageNumber, setPageNumber] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [productCount, setProductCount] = useState(0);
  const [productDetails, setProductDetails] = useState([]);

  const { supplierId } = useSelector((state) => state?.customer);
  const getProducts = async (page = pageNumber ?? 0) => {
    const payload = {
      productVariationId: productId,
      supplierId,
      subCategoryId,
      pageNumber: page,
      pageSize: 30,
    };
    const { data } = await getSimilarProducts(payload);
    if (data) {
      setProductCount(data.count ?? 0);
      const temp = [];
      data.productDetails.forEach((ele) => {
        temp.push({
          id: ele.productVariationId,
          title: ele.productTitle,
          price: ele.salePrice,
          salePriceWithLogistics: ele.salePriceWithLogistics,
          image: ele.variationMedia,
          rating: {
            rate: ele.averageRatings,
            count: ele.totalRatings,
          },
          skuId: ele.skuId,
          wishlistId: ele.wishlistId,
          userCartId: ele.userCartId,
          isCarted: ele.presentInCart,
          subCategoryId: ele.subcategoryId,
        });
      });
      setProductDetails([...temp]);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const renderProductDetails = () => {
    return productDetails?.map((ele) => {
      return (
        <Grid item sm={6}>
          <ProductCard item={ele} showActionList={false} />
        </Grid>
      );
    });
  };

  return (
    <CustomDrawer
      position="right"
      title="Similar Products"
      open={showDrawer}
      widthClass="mnw-450"
      handleClose={() => {
        setShowDrawer(false);
      }}
    >
      <Grid
        container
        spacing={2}
        className="mx-auto ms-0 mt-2"
        sx={{
          width: `calc(100% - 10px)`,
        }}
      >
        {renderProductDetails()}
      </Grid>
    </CustomDrawer>
  );
}

export default SimilarProducts;
