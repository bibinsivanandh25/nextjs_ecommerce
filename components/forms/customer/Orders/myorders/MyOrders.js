/* eslint-disable no-nested-ternary */
/* eslint-disable react/self-closing-comp */
import { Typography, Box } from "@mui/material";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useEffect, useState } from "react";
import SimpleDropdownComponent from "@/atoms/SimpleDropdownComponent";
import ReusableBar from "../reusableorderscomponents/ReusableBar";
import ReusableProduct from "../reusableorderscomponents/ReusableProduct";
import styles from "./MyOrders.module.css";
import ButtonComponent from "@/atoms/ButtonComponent";
import CheckBoxComponent from "@/atoms/CheckboxComponent";
import CancelOrReturnModal from "../CancelOrReturnModal";
import ModalComponent from "@/atoms/ModalComponent";

const list = [
  { label: "Last 30 days" },
  { label: "2020" },
  { label: "2019" },
  { label: "2018" },
  { label: "Archive Orders" },
];
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
    flag: true,
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
const SingleProductTrackDetails = ({
  setTrackPackage,
  setSellerFeedbackModal,
  setProductFeedbackType,
}) => {
  return (
    <Box>
      <Paper
        className="w-250px text-center p-1 mb-2 fs-14 cursor-pointer"
        elevation={2}
        onClick={() => {
          setTrackPackage(true);
        }}
      >
        Track Package
      </Paper>
      <Paper
        className="w-250px text-center p-1 mb-2 fs-14 cursor-pointer"
        elevation={2}
        onClick={() => {
          setProductFeedbackType("seller");
          setSellerFeedbackModal(true);
        }}
      >
        Leave Seller feedback
      </Paper>
      <Paper
        className="w-250px text-center p-1 mb-2 fs-14 cursor-pointer"
        elevation={2}
        onClick={() => {
          setProductFeedbackType("product");
          setSellerFeedbackModal(true);
        }}
      >
        Write a Product review
      </Paper>
      <Paper className="w-250px text-center p-1 mb-2 fs-14" elevation={2}>
        Save for later
      </Paper>
    </Box>
  );
};

const ProductDetailsPlusTrackDetails = ({
  product,
  setSellerFeedbackModal,
  setProductFeedbackType,
  setSelectedProduct = () => {},
  selectedProduct = [],
}) => {
  const [checked, setChecked] = useState(false);
  const [trackPackage, setTrackPackage] = useState(false);
  return (
    <>
      <Box className="d-flex justify-content-between px-2">
        {/* <SingleProductDetails /> */}
        <ReusableProduct product={product}>
          <CheckBoxComponent
            isChecked={checked}
            checkBoxClick={() => {
              setChecked(!checked);
              console.log(product, "propdutd");
              const temp = [...selectedProduct];
              temp.push(product);
              setSelectedProduct([...temp]);
            }}
            className="color-blue"
          />
          <Typography className="mb-1">
            <small>Return window will close on 20 - Aug - 2021</small>
          </Typography>
          <ButtonComponent
            label="Buy it Again"
            variant="outlined"
            muiProps="fw-bold border border-secondary fs-12 bg-primary"
            borderColor="bg-light-gray"
            textColor="color-black"
          />
        </ReusableProduct>
        <SingleProductTrackDetails
          setTrackPackage={setTrackPackage}
          setSellerFeedbackModal={setSellerFeedbackModal}
          setProductFeedbackType={setProductFeedbackType}
        />
      </Box>
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
                      top: 0,
                      left: 6,
                    }}
                  ></div>
                )}
                <div className="d-flex ">
                  <div
                    style={{
                      height: "15px",
                      width: "15px",
                      border: item.flag
                        ? "1px solid #E56700"
                        : "1px solid gray",
                      borderRadius: "50%",
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
                      height: "6px",
                      border: item.flag
                        ? "1px solid #E56700"
                        : "1px solid gray",
                      top: 19,
                      left: 6,
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
                      marginLeft: "6px",
                      paddingLeft: "2.1rem",
                    }}
                    className="py-2"
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
    </>
  );
};

const MyOrders = ({ setSellerFeedbackModal, setProductFeedbackType }) => {
  const [products, setProducts] = useState([]);
  const [showCancelOrReturnModal, setShowCancelOrReturnModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const getProducts = async () => {
    await axios
      .get("https://fakestoreapi.com/products")
      .then((data) => {
        // console.log(data.data);
        setProducts([...data.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(selectedProduct, "sad");

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <Box>
      <Box className="d-flex align-items-center mb-3">
        <Box className={`${styles.dropDownStyle}`}>
          <SimpleDropdownComponent
            list={list}
            size="small"
            label="Past 3 Months"
            inputlabelshrink
          />
        </Box>
        <Typography className="ms-2 fs-14">
          <span className="fw-bold fs-16">2 Orders</span> placed
        </Typography>
      </Box>
      <ReusableBar>
        <ButtonComponent label="Cancel Order" variant="outlined" />
        <ButtonComponent
          label="Return Orders"
          muiProps="ms-2"
          onBtnClick={() => setShowCancelOrReturnModal(true)}
        />
      </ReusableBar>
      <Box className="ms-3 pb-2">
        <Typography className="fs-16 fw-bold">
          Dilevered 2 - Aug - 2021
        </Typography>
      </Box>
      {products.map((product) => {
        return (
          <Box key={product.id} className="mt-4">
            <ProductDetailsPlusTrackDetails
              product={product}
              setSelectedProduct={setSelectedProduct}
              selectedProduct={selectedProduct}
              setSellerFeedbackModal={setSellerFeedbackModal}
              setProductFeedbackType={setProductFeedbackType}
            />
          </Box>
        );
      })}
      <CancelOrReturnModal
        showModal={showCancelOrReturnModal}
        setShowModal={setShowCancelOrReturnModal}
        products={[...selectedProduct]}
      />
    </Box>
  );
};

export default MyOrders;
