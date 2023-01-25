/* eslint-disable no-param-reassign */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/self-closing-comp */
import { Typography, Box, Grid } from "@mui/material";
import MenuOption from "@/atoms/MenuOptions";
import { useState } from "react";
import ButtonComponent from "@/atoms/ButtonComponent";
import CheckBoxComponent from "@/atoms/CheckboxComponent";
import ModalComponent from "@/atoms/ModalComponent";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { productDetails } from "features/customerSlice";
import CancelOrReturnModal from "../CancelOrReturnModal";

const datas = [
  {
    id: 1,
    title: "Ordered",
    date: "Fri 2nd Jul 2021",
    flag: true,
    trackedData: [
      {
        id: 1,
        value: "Your Order has been placed.",
        date: "Fri 2nd Jul 2021-2:19 pm",
        flag: true,
      },
      {
        id: 2,
        value: "Seller has processed your order.",
        date: "Fri 9nd Jul 2021-2:19 pm",
        flag: true,
      },
      {
        id: 3,
        value: "Your item has been picked up by courier partner",
        date: "Mon 15nd Jul 2021-2:19 pm",
        flag: true,
      },
    ],
  },
  {
    id: 2,
    title: "Shipped",
    date: "Tue 12nd Jul 2021",
    flag: true,
    trackedData: [
      {
        id: 1,
        value: "Your item has been shipped",
        date: "Fri 2nd Jul 2021-2:19 pm",
        flag: true,
      },
    ],
  },
  {
    id: 3,
    title: "Delivery",
    date: "Tue 12nd Jul 2021",
    flag: true,
    trackedData: [
      {
        id: 1,
        value: "Your item has been shipped",
        date: "Fri 2nd Jul 2021-2:19 pm",
        flag: false,
      },
      {
        id: 1,
        value: "Your item has been shipped",
        date: "Fri 2nd Jul 2021-2:19 pm",
        flag: false,
      },
    ],
  },
  {
    id: 4,
    flag: false,
    date: "Mon 22nd Jul 2021",
    title: "Out for Delivery",
    trackedData: [
      {
        id: 1,
        value: "Your item is out for delivery",
        flag: false,
      },
    ],
  },
];

const option1 = [
  "Track Package",
  "Leave Seller feedback",
  "Write a Product review",
  "View Order Details",
];
const option2 = ["View Order Details"];
const option3 = [
  "Leave Seller feedback",
  "Write a Product review",
  "View Order Details",
];
const MyOrders = ({
  setshowProdDetails,
  setSellerFeedbackModal,
  setProductFeedbackType,
  setShowReturnOrder = () => {},
  ShowReturnOrder,
  setReturnProducts,
  products,
  setProducts,
  showCheckbox = true,
  showCancelBtn = true,
  showReturnBtn = true,
  showTopBar = true,
  selectedLink,
  selectedProduct,
  setSelectedProduct,
}) => {
  const dispatch = useDispatch();
  const route = useRouter();
  const [showCancelOrReturnModal, setShowCancelOrReturnModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [trackPackage, setTrackPackage] = useState(false);
  const [selectedOldProduct, setSelectedOldProduct] = useState([]);

  const handleCheckboxClick = (value) => {
    const temp = [...products];
    temp.forEach((item) => {
      if (item.orderId === value.orderId) {
        item.isSelected = !item.isSelected;
      }
    });
    setProducts([...temp]);
    const selected = temp.filter((x) => x.isSelected === true);
    setSelectedProduct(selected);
    setSelectedOldProduct(selected);
  };
  const BuyItAgainFunction = (product) => {
    dispatch(
      productDetails({
        productId: product.productId,
        variationDetails: product.variationDetails,
      })
    );
    route.push("/customer/productdetails");
  };
  return (
    <Box>
      {showTopBar && selectedProduct.length ? (
        <Grid container className="px-1">
          <Grid
            item
            xs={11}
            md={11}
            className="px-1 d-flex justify-content-end theme_bg_color_1 p-3"
          >
            {showCancelBtn && (
              <ButtonComponent
                label="Cancel Order"
                variant="outlined"
                onBtnClick={() => {
                  setShowCancelOrReturnModal(true);
                  setModalType("cancel");
                }}
              />
            )}
            {showReturnBtn && (
              <ButtonComponent
                label="Return Orders"
                muiProps="ms-2"
                onBtnClick={() => {
                  setShowCancelOrReturnModal(true);
                  setModalType("return");
                }}
              />
            )}
          </Grid>

          <Grid
            item
            xs={1}
            md={1}
            className=" px-1 theme_bg_color_1 p-3"
          ></Grid>
        </Grid>
      ) : (
        <></>
      )}

      <Grid container className="px-1">
        <Grid
          item
          xs={11}
          md={11}
          className="px-1  p-3 hide-scrollbar"
          sx={{
            maxHeight: "80vh",
            overflow: "scroll",
          }}
        >
          {products.map((product) => {
            return (
              <Box
                className="d-flex justify-content-between px-2 "
                key={product.id}
              >
                {/* <ReusableProduct product={product}> */}
                <Box
                  className={`d-flex align-items-center" "
                    }`}
                >
                  {showCheckbox && (
                    <CheckBoxComponent
                      isChecked={product.isSelected}
                      checkBoxClick={() => {
                        handleCheckboxClick(product);
                      }}
                      className="color-blue"
                    />
                  )}
                  <Box className="w-135px h-135px">
                    <Image
                      className="d-block w-100 h-100 img-fluid rounded-1"
                      width="120"
                      height="120"
                      src={product.productImage}
                      alt="product"
                    />
                  </Box>
                  <Box className="ms-2">
                    <Typography
                      className="theme_color mb-1 fs-14"
                      variantMapping={<p />}
                    >
                      Supplier Name: {product.businessName}
                    </Typography>
                    <Typography
                      className="mb-1 fs-16 fw-bold"
                      variantMapping={<p />}
                    >
                      {product.productTitle}
                    </Typography>

                    <Typography className="mb-1">
                      <small>
                        Return window will close on 20 - Aug - 2021(dummy data)
                      </small>
                    </Typography>
                    <ButtonComponent
                      label="Buy it Again"
                      variant="outlined"
                      muiProps="fw-bold border theme_border_color fs-12 theme_bg_color"
                      borderColor="bg-light-gray"
                      textColor="color-black"
                      onBtnClick={() => {
                        BuyItAgainFunction(product);
                      }}
                    />
                  </Box>
                </Box>
                {/* </ReusableProduct> */}
              </Box>
            );
          })}
        </Grid>

        <Grid item xs={1} md={1} className="  p-3">
          <Grid item xs={4} md={4}>
            {selectedProduct.length === 1 ? (
              <MenuOption
                getSelectedItem={(ele) => {
                  if (ele === "Track Package") {
                    setTrackPackage(true);
                  } else if (ele === "Leave Seller feedback") {
                    setProductFeedbackType("seller");
                    setSellerFeedbackModal(true);
                  } else if (ele === "Write a Product review") {
                    setProductFeedbackType("product");
                    setSellerFeedbackModal(true);
                  } else if (ele === "View Order Details") {
                    setshowProdDetails(true);
                  }

                  // onClickOfMenuItem(ele, item.flagId);
                }}
                options={
                  selectedLink === "notYetShipped"
                    ? [...option2]
                    : selectedLink === "cancelled"
                    ? [...option2]
                    : selectedLink === "return"
                    ? [...option3]
                    : [...option1]
                }
                IconclassName="color-gray"
              />
            ) : (
              <></>
            )}
          </Grid>
        </Grid>
      </Grid>

      {trackPackage && (
        <ModalComponent
          open={trackPackage}
          onCloseIconClick={() => {
            setTrackPackage(false);
          }}
          ModalTitle="Order Details"
          showFooter={false}
          titleClassName="fs-18 fw-600"
          minHeightClassName="mnh-400"
        >
          <Box className="pt-3">
            {datas.map((item, ind) => (
              <Box className="position-relative">
                {item.id !== 1 && (
                  <div
                    className="position-absolute"
                    style={{
                      height: "7px",
                      border: item.flag
                        ? "1px solid #E56700"
                        : "1px solid gray",
                      top: "-1px",
                      left: 7,
                    }}
                  ></div>
                )}
                <div className="d-flex ">
                  <div
                    style={{
                      height: "16px",
                      width: "16px",
                      border: item.flag
                        ? "1px solid #E56700"
                        : "1px solid gray",
                      // borderRadius: "50%",
                      backgroundColor: item.flag ? "#E56700" : "gray",
                    }}
                    className="mt-1"
                  ></div>
                  <div>
                    <span className="ps-4 fw-600">{item.title}</span>
                    <span className="fs-12 color-dark-gray ps-2">
                      {item.date}
                    </span>
                  </div>
                </div>
                {datas.length - 1 > ind && (
                  <div
                    className="position-absolute"
                    style={{
                      height: "7px",
                      border: item.flag
                        ? "1px solid #E56700"
                        : "1px solid gray",
                      top: 18,
                      left: 7,
                    }}
                  ></div>
                )}
                {item.trackedData.map((val) => (
                  <div
                    style={{
                      borderLeft:
                        datas.length - 1 > ind
                          ? val.flag
                            ? "2px solid #E56700"
                            : "2px solid gray"
                          : "",
                      marginLeft: "7px",
                      paddingLeft: "2.1rem",
                    }}
                    className="py-2 "
                  >
                    <p className="text-bold fw-600 fs-14">{val.value}</p>
                    <p className="fs-12 color-dark-gray ">{val.date}</p>
                  </div>
                ))}
              </Box>
            ))}
          </Box>
        </ModalComponent>
      )}

      {showCancelOrReturnModal ? (
        <CancelOrReturnModal
          showModal={showCancelOrReturnModal}
          setShowReturnOrder={setShowReturnOrder}
          ShowReturnOrder={ShowReturnOrder}
          setShowModal={setShowCancelOrReturnModal}
          products={[...products]}
          setProducts={setProducts}
          setReturnProducts={setReturnProducts}
          modalType={modalType}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          selectedOldProduct={selectedOldProduct}
        />
      ) : null}
    </Box>
  );
};

export default MyOrders;
