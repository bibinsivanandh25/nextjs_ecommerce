import { Box, Rating, Typography } from "@mui/material";
import { productDetails } from "features/customerSlice";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTopTrandingProducts } from "services/customer/Home";

const TopTrending = () => {
  const dispatch = useDispatch();
  const storeDetails = useSelector((state) => state.customer);
  const [topTrendingData, settopTrendingData] = useState([]);
  const route = useRouter();
  const getTopTranding = async () => {
    // const supplierId = "SP0123000312";
    const { data, errRes } = await getTopTrandingProducts(
      storeDetails.supplierId
    );
    // let temp = [];
    if (data) {
      // temp.push(data.data);
      settopTrendingData(data.data);
    } else if (errRes) {
      // console.log(errRes);
    }
  };
  useEffect(() => {
    getTopTranding();
  }, [storeDetails?.storeCode]);

  const getTrandingProductDetails = (item) => {
    dispatch(
      productDetails({
        productId: item.productVariationId,
        variationDetails: item.variationDetails,
      })
    );
    route.push("/customer/productdetails");
  };

  return (
    <Box className="p-2 container-shadow rounded">
      <Box className="mx-2 py-1 border-bottom">
        <Typography className="fw-600 fs-16">Top Trending</Typography>
      </Box>
      {topTrendingData.length ? (
        <Box className="mxh-400 mnh-400 overflow-y-scroll hide-scrollbar">
          {topTrendingData.map((item) => (
            // eslint-disable-next-line react/no-array-index-key

            <Box
              className="d-flex p-1 cursor-pointer"
              key={item.productVariationId}
              onClick={() => {
                getTrandingProductDetails(item);
              }}
            >
              <Box className="me-1 ">
                <Image
                  src={item.variationMedia}
                  layout="fixed"
                  width={75}
                  height={75}
                  className="border rounded cursor-pointer"
                />
              </Box>
              <Box className="ms-1">
                <Typography className="cursor-pointer">
                  {item.productTitle}
                </Typography>
                <Rating value={item.customerRatings} readOnly />
              </Box>
            </Box>
          ))}
        </Box>
      ) : (
        <div
          className="mxh-400 mnh-400"
          style={{
            height: "30vh",
            width: "30vw",
            position: "relative",
          }}
        >
          <Image
            src="https://dev-mrmrscart-assets.s3.ap-south-1.amazonaws.com/asset/sorry.png"
            height="250px"
            layout="fill"
          />
        </div>
      )}
    </Box>
  );
};
export default TopTrending;
