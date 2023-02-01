import ModalComponent from "@/atoms/ModalComponent";
import StarRatingComponentReceivingRating from "@/atoms/StarRatingComponentReceiving";
import { Box, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { Image } from "react-bootstrap";
import { AiOutlineMinus } from "react-icons/ai";

const CompareProductDetails = ({
  showModal = false,
  setShowModal = () => {},
  productDetails = [],
}) => {
  const [productData, setProductData] = useState([]);
  useMemo(() => {
    if (productDetails.length) {
      const result = [];
      const rows = [];
      productDetails?.forEach((ele) => {
        const temp = { ...ele.productDetails, ...(ele.variationDetails || {}) };

        console.log(temp);
        result.push(temp);
        rows.push({});
      });
      setProductData([...result]);
    }
  }, [productDetails]);

  const renderHeaders = () => {
    const temp = [
      "Product",
      "Sale Price",
      "Availability",
      "Description",
      "Ratings & Reviews",
      "SKU",
      ...Object.keys(productDetails[0].variationDetails ?? {})?.map(
        (ele) => ele
      ),
    ];

    const getMinHeight = (ele) => {
      if (ele == "Product") {
        return "160px";
      }
      // if (ele == "Description") {
      //   return "100px";
      // }
      return null;
    };
    const getMaxHeight = (ele) => {
      if (ele === "Description") {
        return "100px";
      }
      return "";
    };

    return temp.map((ele) => {
      return (
        <Typography
          lineHeight={3}
          className="h-5 fw-bold d-flex "
          style={{
            minHeight: getMinHeight(ele),
            maxHeight: getMaxHeight(ele),
            // background: ele === "Sale Price" ? "green" : "",
          }}
        >
          {ele}
        </Typography>
      );
    });
  };

  const renderData = () => {
    const variationDetails = Object.keys(
      productDetails[0]?.variationDetails ?? {}
    ).map((ele) => ele);
    return productData.map((ele) => {
      return (
        <Box
          className="border-end me-2 px-2"
          style={{
            minWidth: "270px",
            maxWidth: "270px",
            overflow: "auto",
          }}
        >
          <Box
            className="d-flex flex-column align-items-center"
            style={{
              minHeight: "160px",
            }}
          >
            <Image src={ele["Product Image"]} height={140} width={140} />

            <Typography className="text-truncate h-5 fw-bold mxw-200">
              {ele["Product Name"]}
            </Typography>
          </Box>
          <Typography className="h-5 " lineHeight={3}>
            {/* ₹ {ele["Sale Price"]} */}
            {Number(ele["Sale Price"].replaceAll("₹", "")).toLocaleString(
              "en-IN",
              {
                maximumFractionDigits: 2,
                style: "currency",
                currency: "INR",
              }
            )}
          </Typography>
          <Typography className="h-5  " lineHeight={3}>
            {ele.Availability}
          </Typography>
          <Typography
            className="h-5 overflow-auto"
            lineHeight={3}
            style={{
              maxHeight: "100px",
              // minHeight: "100px",
            }}
          >
            {ele.Description}
            {/* Sit esse dolore laborum duis sunt dolor et aliquip cupidatat magna
            cillum. Excepteur ex sit do duis ut elit dolore consectetur veniam
            veniam adipisicing incididunt. Exercitation est magna nostrud duis
            consequat minim qui sunt do occaecat officia occaecat et.
            Exercitation voluptate consectetur anim laborum eu eu. */}
          </Typography>
          <Box className="d-flex align-items-center">
            <StarRatingComponentReceivingRating
              rating={ele.Ratings}
              className="h-4"
            />
            <Typography className="h-5" lineHeight={3}>
              ( {ele.Reviews} Reviews)
            </Typography>
          </Box>
          <Typography className="h-5 text-truncate" lineHeight={3}>
            {ele.SkuId || <AiOutlineMinus className="fst-normal h-4" />}
          </Typography>
          {variationDetails.map((variations) => {
            return (
              <Typography className="h-5 text-truncate" lineHeight={3}>
                {ele[variations].join(", ")}
              </Typography>
            );
          })}
        </Box>
      );
    });
  };
  return (
    <ModalComponent
      minWidth="80%"
      open={showModal}
      onCloseIconClick={() => {
        setShowModal(false);
      }}
      showFooter={false}
      showPositionedClose
      ModalTitle=""
      showCloseIcon={false}
      minHeightClassName="mxh-80vh "
      headerBorder="none"
    >
      <Box className="d-flex">
        <Box className="me-1 border-end pe-4 mnh-100" style={{}}>
          {renderHeaders()}
        </Box>
        <Box className="d-flex ">{renderData()}</Box>
      </Box>
    </ModalComponent>
  );
};
export default CompareProductDetails;
