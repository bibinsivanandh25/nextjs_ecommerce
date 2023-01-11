/* eslint-disable no-param-reassign */
import CarousalComponent from "@/atoms/Carousel";
import { Box } from "@mui/material";
import { forwardRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getScratchCardMarketingTool } from "services/customer/couponapplicableproducts";
import toastify from "services/utils/toastUtils";

const ScratchCard = forwardRef(
  ({ purchaseId, searchText = "" }, ref = null) => {
    const [bannerImages, setbannerImages] = useState([]);
    const [productdetails, setProductDetails] = useState([]);
    const { profileId } = useSelector((state) => state.customer);

    // useEffect(() => {
    //   // if (ref?.current) ref.current = { ...ref.current, getProducts };
    //   ref.current = getProducts;
    // }, [ref]);

    const getScratchCard = async () => {
      const { data, err } = await getScratchCardMarketingTool(purchaseId);
      if (data) {
        console.log(data);
      } else if (err) {
        console.log(err);
        toastify(err?.response?.data?.messsage, "error");
      }
    };

    useEffect(() => {
      if (purchaseId) getScratchCard();
    }, [purchaseId]);

    return (
      <>
        <Box
          className="rounded shadow overflow-hidden"
          style={{
            maxHeight: "30vh",
            minHeight: "30vh",
            overflow: "hidden",
          }}
        >
          {Boolean(bannerImages.length) && (
            <CarousalComponent
              list={[...bannerImages]}
              autoPlay
              stopOnHover={false}
              carouselImageMaxHeight="30vh"
              carouselImageMinHeight="30vh"
            />
          )}
        </Box>
        <Box className="mnh-79vh oveflow-auto hide-scrollbar">
          renderProducts
        </Box>
      </>
    );
  }
);

export default ScratchCard;
