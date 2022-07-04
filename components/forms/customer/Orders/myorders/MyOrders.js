import {
  Typography,
  Box,
  // Stepper,
  // Step,
  // StepLabel,
  // StepContent,
} from "@mui/material";
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
// import {
//   Timeline,
//   TimelineConnector,
//   TimelineContent,
//   TimelineDot,
//   TimelineItem,
//   TimelineSeparator,
// } from "@mui/lab";

const list = [
  { label: "Last 30 days" },
  { label: "2020" },
  { label: "2019" },
  { label: "2018" },
  { label: "Archive Orders" },
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
        >
          <Box>
            {/* <Stepper orientation="vertical" activeStep={0}>
              <Step sx={{ color: "orange" }}>
                <StepLabel>Hiii</StepLabel>
                <StepContent>sfsdgsgr</StepContent>
                <StepContent sx={{ color: "red" }}>sfsdgsgr</StepContent>
                <StepContent>sfsdgsgr</StepContent>
                <StepContent>sfsdgsgr</StepContent>
                <StepContent>sfsdgsgr</StepContent>
              </Step>
              <Step>
                <StepLabel>Hiii</StepLabel>
                <StepContent>sfsdgsgr</StepContent>
              </Step>
            </Stepper> */}
            {/* <Timeline>
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot sx={{ backgroundColor: "orange" }} />
                  <TimelineConnector sx={{ backgroundColor: "orange" }} />
                </TimelineSeparator>
                <TimelineContent>
                  Eat
                  <Typography>Because you need strength</Typography>
                  <Typography>Because you need strength</Typography>
                  <Typography>Because you need strength</Typography>
                  <Typography>Because you need strength</Typography>
                </TimelineContent>
              </TimelineItem>
            </Timeline> */}
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
