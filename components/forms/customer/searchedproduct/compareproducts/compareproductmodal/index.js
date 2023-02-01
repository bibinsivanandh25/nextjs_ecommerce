/* eslint-disable react/no-danger */
/* eslint-disable no-nested-ternary */
import ModalComponent from "@/atoms/ModalComponent";
import StarRatingComponentReceivingRating from "@/atoms/StarRatingComponentReceiving";
import { Box, CircularProgress, Typography } from "@mui/material";
import Image from "next/image";
import { useMemo, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { AiOutlineMinus } from "react-icons/ai";

const CompareProductDetails = ({
  showModal = false,
  setShowModal = () => {},
  productDetails = [],
}) => {
  // const [productData, setProductData] = useState([]);
  const [tableRows, setTableRows] = useState({});

  useMemo(() => {
    if (productDetails.length) {
      const result = [];
      let rows = {
        Product: ["Product"],
        Price: ["Price"],
        Availability: ["Availabilty"],
        Description: ["Description"],
        "Ratings & Reviews": ["Ratings & Reviews"],
        SKU: ["SKU"],
      };

      const variationDetails = [];
      if (productDetails?.length && productDetails[0].variationDetails) {
        Object.keys(productDetails[0].variationDetails).forEach((key) => {
          rows = {
            ...rows,
            [key]: [key],
          };
          variationDetails.push(key);
        });
      }

      productDetails?.forEach((ele) => {
        const temp = {
          ...ele.productDetails,
          ...(ele.variationDetails || {}),
        };
        result.push(temp);
        rows.Product.push({
          image: ele.productDetails["Product Image"],
          name: ele.productDetails["Product Name"],
        });
        rows.Price.push(ele.productDetails["Sale Price"]);
        rows.Availability.push(ele.productDetails.Availability);
        rows.Description.push(ele.productDetails.Description);
        rows["Ratings & Reviews"].push({
          Ratings: ele.productDetails.Ratings,
          Reviews: ele.productDetails.Reviews,
        });
        rows.SKU.push(ele.productDetails.SkuId);
        variationDetails.forEach((key) => {
          rows[key].push(ele.variationDetails[key]);
        });
      });
      setTableRows(rows);
      // setProductData([...result]);
    }
  }, [productDetails]);

  // const renderHeaders = () => {
  //   const temp = [
  //     "Product",
  //     "Sale Price",
  //     "Availability",
  //     "Description",
  //     "Ratings & Reviews",
  //     "SKU",
  //     ...Object.keys(productDetails[0].variationDetails ?? {})?.map(
  //       (ele) => ele
  //     ),
  //   ];

  //   const getMinHeight = (ele) => {
  //     if (ele == "Product") {
  //       return "160px";
  //     }
  //     // if (ele == "Description") {
  //     //   return "100px";
  //     // }
  //     return null;
  //   };
  //   const getMaxHeight = (ele) => {
  //     if (ele === "Description") {
  //       return "100px";
  //     }
  //     return "";
  //   };

  //   return temp.map((ele) => {
  //     return (
  //       <Typography
  //         lineHeight={3}
  //         className="h-5 fw-bold d-flex "
  //         style={{
  //           minHeight: getMinHeight(ele),
  //           maxHeight: getMaxHeight(ele),
  //           // background: ele === "Sale Price" ? "green" : "",
  //         }}
  //       >
  //         {ele}
  //       </Typography>
  //     );
  //   });
  // };

  // const renderData = () => {
  //   const variationDetails = Object.keys(
  //     productDetails[0]?.variationDetails ?? {}
  //   ).map((ele) => ele);
  //   return productData.map((ele) => {
  //     return (
  //       <Box
  //         className="border-end me-2 px-2"
  //         style={{
  //           minWidth: "270px",
  //           maxWidth: "270px",
  //           overflow: "auto",
  //         }}
  //       >
  //         <Box
  //           className="d-flex flex-column align-items-center"
  //           style={{
  //             minHeight: "160px",
  //           }}
  //         >
  //           <Image src={ele["Product Image"]} height={140} width={140} />

  //           <Typography className="text-truncate h-5 fw-bold mxw-200">
  //             {ele["Product Name"]}
  //           </Typography>
  //         </Box>
  //         <Typography className="h-5 " lineHeight={3}>
  //           {/* ₹ {ele["Sale Price"]} */}
  //           {Number(ele["Sale Price"].replaceAll("₹", "")).toLocaleString(
  //             "en-IN",
  //             {
  //               maximumFractionDigits: 2,
  //               style: "currency",
  //               currency: "INR",
  //             }
  //           )}
  //         </Typography>
  //         <Typography className="h-5  " lineHeight={3}>
  //           {ele.Availability}
  //         </Typography>
  //         <Typography
  //           className="h-5 overflow-auto"
  //           lineHeight={3}
  //           style={{
  //             maxHeight: "100px",
  //             // minHeight: "100px",
  //           }}
  //         >
  //           {ele.Description}
  //           {/* Sit esse dolore laborum duis sunt dolor et aliquip cupidatat magna
  //           cillum. Excepteur ex sit do duis ut elit dolore consectetur veniam
  //           veniam adipisicing incididunt. Exercitation est magna nostrud duis
  //           consequat minim qui sunt do occaecat officia occaecat et.
  //           Exercitation voluptate consectetur anim laborum eu eu. */}
  //         </Typography>
  //         <Box className="d-flex align-items-center">
  //           <StarRatingComponentReceivingRating
  //             rating={ele.Ratings}
  //             className="h-4"
  //           />
  //           <Typography className="h-5" lineHeight={3}>
  //             ( {ele.Reviews} Reviews)
  //           </Typography>
  //         </Box>
  //         <Typography className="h-5 text-truncate" lineHeight={3}>
  //           {ele.SkuId || <AiOutlineMinus className="fst-normal h-4" />}
  //         </Typography>
  //         {variationDetails.map((variations) => {
  //           return (
  //             <Typography className="h-5 text-truncate" lineHeight={3}>
  //               {ele[variations].join(", ")}
  //             </Typography>
  //           );
  //         })}
  //       </Box>
  //     );
  //   });
  // };

  const renderProducts = () => {
    if (tableRows) {
      const headers = Object.keys(tableRows).map((key) => key);
      return headers.map((key) => {
        return (
          <Box className="d-flex">
            {tableRows[key]?.map((ele, ind) => {
              if (key === "Product") {
                return (
                  <Box
                    style={{
                      minWidth: ind === 0 ? "180px" : "250px",
                      maxWidth: ind === 0 ? "180px" : "250px",
                    }}
                    className="me-2 border-end"
                  >
                    {ind === 0 ? (
                      <Typography className="fw-bold h-5 d-flex align-items-center h-100 ">
                        {tableRows[key][0]}
                      </Typography>
                    ) : (
                      <Box className="px-2">
                        <Box className="d-flex justify-content-center">
                          <CloseIcon
                            onClick={() => {
                              const temp = JSON.parse(
                                JSON.stringify(tableRows)
                              );
                              headers.forEach((keys) => {
                                temp[keys].splice(ind, 1);
                                setTableRows(temp);
                              });
                            }}
                            className={ind !== 1 ? "text-muted " : "invisible"}
                          />
                        </Box>
                        <Box className="d-flex justify-content-center">
                          <Image
                            src={ele.image}
                            height={125}
                            width={125}
                            layout="fixed"
                            className=""
                          />
                        </Box>
                        <Typography className="h-5 fw-bold text-center">
                          {ele.name}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                );
              }
              if (key !== "Ratings & Reviews") {
                const getElement = (element, keys) => {
                  if (keys === "Price") {
                    return Number(ele.replaceAll("₹", "")).toLocaleString(
                      "en-IN",
                      {
                        maximumFractionDigits: 2,
                        style: "currency",
                        currency: "INR",
                      }
                    );
                  }
                  if (keys === "Description") {
                    return (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: ele,
                        }}
                      />
                    );
                  }
                  return element;
                };
                return (
                  <Box
                    className="me-2 border-end"
                    style={{
                      minWidth: ind === 0 ? "180px" : "250px",
                      maxWidth: ind === 0 ? "180px" : "250px",
                    }}
                  >
                    <Typography
                      className={`h-5 px-2 my-2 ${ind === 0 ? "fw-bold " : ""}`}
                      lineHeight={1.5}
                    >
                      {Array.isArray(ele) ? (
                        ele.length ? (
                          ele.join(", ")
                        ) : (
                          <AiOutlineMinus />
                        )
                      ) : ind !== 0 ? (
                        getElement(ele, key)
                      ) : (
                        ele
                      )}
                    </Typography>
                  </Box>
                );
              }
              return ind === 0 ? (
                <Typography
                  className="h-5 px-2 me-2 fw-bold border-end"
                  style={{
                    minWidth: "180px",
                    maxWidth: "180px",
                  }}
                  lineHeight={3}
                >
                  {ele}
                </Typography>
              ) : (
                <Box
                  style={{
                    minWidth: "250px",
                    maxWidth: "250px",
                  }}
                  className="d-flex align-items-center px-2 me-2 border-end"
                >
                  <StarRatingComponentReceivingRating
                    className="h-4"
                    rating={ele.Ratings}
                  />
                  <Typography className="h-5">
                    ( {ele.Reviews} Reviews)
                  </Typography>
                </Box>
              );
            })}
          </Box>
        );
      });
    }
    return <CircularProgress />;
  };
  return (
    <ModalComponent
      open={showModal}
      minWidth="65%"
      // maxWidth="80%"
      onCloseIconClick={() => {
        setShowModal(false);
      }}
      ModalWidth="100%"
      showFooter={false}
      showPositionedClose
      ModalTitle=""
      showCloseIcon={false}
      minHeightClassName="mxh-75vh"
      headerBorder="none"
    >
      <Box className="">
        {renderProducts()}

        {/* <Box className="me-1 border-end pe-4 mnh-100" style={{}}>
          {renderHeaders()}
        </Box>
        <Box className="d-flex ">{renderData()}</Box> */}
      </Box>
    </ModalComponent>
  );
};
export default CompareProductDetails;
