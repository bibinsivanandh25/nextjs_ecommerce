import { Box, Typography } from "@mui/material";
import ProductDetailsCard from "components/reseller/atoms/productdetailscard";
import CategoryScrollComponent from "components/atoms/CategoryScrollComponent";

const HomeComponent = ({
  showMarginButton = false,
  categories = [],
  products = [],
  productTitle = "",
  onCategoryClick = () => {},
}) => {
  return (
    <div className="w-100">
      <Box className="my-2 w-100 overflow-x-scroll">
        <CategoryScrollComponent
          categories={[...categories]}
          onCategoryClick={(ele) => {
            onCategoryClick(ele);
          }}
        />
      </Box>
      {products.length ? (
        <Box className="my-2">
          <>
            <Typography className="fw-bold">{productTitle}</Typography>
            <ProductDetailsCard
              products={[...products]}
              getSelectedItem={(item) => {
                console.log(item);
              }}
              showMarginButton={showMarginButton}
              showIcon={false}
            />
          </>
        </Box>
      ) : null}
    </div>
  );
};
export default HomeComponent;
