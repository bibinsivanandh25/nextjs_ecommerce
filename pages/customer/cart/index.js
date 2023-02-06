/* eslint-disable no-shadow */
/* eslint-disable no-plusplus */
/* eslint-disable react/no-array-index-key */
import { Box, Divider, Grid, Paper, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import PlusMinusButtonComponent from "@/atoms/PlusMinusButtonComponent";
import ButtonComponent from "@/atoms/ButtonComponent";
import ChooseAddress from "@/forms/customer/address/ChooseAddress";
import {
  getCartProducts,
  // removeProductFromCart,
  updateCartQuantity,
} from "services/customer/cart";
import { useDispatch, useSelector } from "react-redux";
import toastify from "services/utils/toastUtils";
import DeliveryOptionsModal from "@/forms/customer/Home/buynowmodal";
import CustomIcon from "services/iconUtils";
import {
  changePrimaryAddress,
  getAllCustomerAddress,
} from "services/customer/Home/address";
import CheckBoxComponent from "@/atoms/CheckboxComponent";
import { storeUserInfo } from "features/customerSlice";
import ModalComponent from "@/atoms/ModalComponent";
import { useMutation, useQuery, useQueryClient } from "react-query";
import serviceUtil from "services/utils";

const Cart = () => {
  const [products, setProducts] = useState();
  const [showChooseAddress, setShowChooseAddress] = useState(false);
  const [showDeliveryOptionModal, setShowDeliveryOptionModal] = useState(false);
  const [productDetails, setProductDetails] = useState({});
  const [openRemoveConfirm, setopenRemoveConfirm] = useState({
    open: false,
    id: "",
  });
  const dispatch = useDispatch();
  const [priceDetails, setPriceDetails] = useState({
    deliveryCharge: 0,
    noOfItems: 0,
    returnCharges: 0,
    totalPayable: 0,
    totalPrice: 0,
    totalSaving: 0,
  });
  const { profileId, userId } = useSelector((state) => state?.customer);
  const customer = useSelector((state) => state?.customer);
  const [masterAddress, setMasterAddress] = useState([]);

  const getproducts = async () => {
    const { data } = await getCartProducts(profileId);
    if (data) return data;
    return [];
  };
  const { data, refetch } = useQuery(["CART"], () => getproducts());

  useEffect(() => {
    if (data) {
      const result = [];
      setPriceDetails({
        deliveryCharge: data?.priceDetails?.deliveryCharges,
        noOfItems: data.priceDetails?.noOfProductInCart,
        returnCharges: data.priceDetails?.returnCharges,
        totalPayable: data.priceDetails?.totalPayable,
        totalPrice: data.priceDetails?.totalPrice,
        totalSaving: data.priceDetails?.totalSaving,
      });
      data?.userCartProductPojos?.forEach((ele) => {
        result.push({
          id: ele.productId,
          businessName: ele.businessName,
          image: ele.variationMedia,
          title: ele.productTitle,
          mrp: ele.mrp,
          salePrice: ele.salePrice,
          cartQty: ele.cartQty,
          stockQty: ele.stockQty,
          deliveryCharge: ele.deliveryCharge,
          orderType: ele.orderType,
          returnType: ele.returnType,
          returnCharge: ele.returnCharge,
          deliveryIn: ele.deliveryIn,
          fastDelivery: ele.fastestDelivery,
          standardDelivery: ele.delivery,
          fastReturn: ele.fastestReturn,
          standardReturn: ele.return,
        });
      });
      setProducts([...result]);
    } else {
      setProducts([]);
    }
  }, [data]);

  const mainRef = useRef(null);
  useEffect(() => {
    if (mainRef && mainRef.current) {
      mainRef.current.scrollIntoView(0, 0);
    }
  }, []);

  const getOrderType = (type) => {
    if (type === "NOFREEDELIVERYANDRETURN") {
      return "No Free Delivery and Return";
    }
    if (type === "FREEDELIVERYANDRETURN") {
      return "Free Delivery and Return";
    }
    if (type === "STOREOWNERDELIVERY") {
      return "Delivery By Store Owner";
    }
    if (type === "HANDPICK") {
      return "Hand Pick";
    }
    return type;
  };

  const updateCartCount = async (productId, cartQuantity) => {
    const payload = {
      profileId,
      productId,
      cartQuantity: cartQuantity === "SUB" ? "SUBTRACTION" : cartQuantity,
    };
    const { data, err } = await updateCartQuantity(payload);
    if (data) {
      refetch();
    }
    if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };
  const queryClient = useQueryClient();
  const removeProductMutation = useMutation(
    (id) => {
      return serviceUtil.deleteById(
        `products/product/cart?productVariationId=${id}&profileId=${profileId}`
      );
    },
    {
      onSuccess: ({ data }) => {
        toastify(data?.message, "success");
        refetch();
        queryClient.invalidateQueries(["CARTCOUNT"]);
        queryClient.refetchQueries("CARTCOUNT", { force: true });
      },
    }
  );

  const removeProduct = async (id) => {
    removeProductMutation.mutate(id);
    // const { data, err } = await removeProductFromCart(id, profileId);
    // if (data) {
    //   toastify(data?.message, "success");
    //   refetch();
    // }
    // if (err) {
    //   toastify(err?.response?.data?.message, "error");
    // }
  };

  const getAllData = async (id) => {
    if (id) {
      const { data } = await getAllCustomerAddress(id);
      if (data?.length) {
        const temp = [];
        data.forEach((item) => {
          if (item.primary) {
            temp.unshift(item);
            // console.log(item);
            // dispatch(
            //   storeUserInfo({
            //     ...customer,
            //     addressDetails: { ...data.data },
            //   })
            // );
          } else {
            temp.push(item);
          }
        });
        // console.log(temp, "temp");
        setMasterAddress(temp);
      } else {
        setMasterAddress([]);
      }
    }
  };
  useEffect(() => {
    getAllData(userId);
  }, [userId]);

  const getCartList = () => {
    return products?.map((ele, ind) => {
      return (
        <Box className="mx-2 py-1 ">
          <Grid container key={ind + 1}>
            <Grid item sm={1.5} className="">
              <Image
                src={ele?.image}
                height={85}
                width="100%"
                layout="intrinsic"
              />
              <Box className="mt-2">
                <PlusMinusButtonComponent
                  className="fs-5"
                  countClassName="px-3"
                  value={ele?.cartQty}
                  maxValue={ele?.stockQty}
                  getCount={(type) => {
                    updateCartCount(ele?.id, type);
                  }}
                />
              </Box>
            </Grid>
            <Grid item sm={6.5}>
              <Typography className="color-orange h-5 fw-bold">
                Business Name: {ele?.businessName}
              </Typography>
              <Typography className="h-5  my-2">{ele?.title}</Typography>
              <Typography component="span" className="fw-bold me-2">
                ₹{ele?.salePrice}
              </Typography>
              <Typography
                component="span"
                className="h-5 text-decoration-line-through"
              >
                ₹ {ele?.mrp}
              </Typography>
              <div className="mt-3">
                <Typography
                  component="span"
                  className="h-5 fw-bold mx-2 cursor-pointer"
                  onClick={() => {
                    // removeProduct(ele.id);
                    setopenRemoveConfirm({
                      ...openRemoveConfirm,
                      open: true,
                      id: ele.id,
                    });
                  }}
                >
                  Remove
                </Typography>
                <Typography
                  component="span"
                  className="fw-bold h-5 cursor-pointer"
                  onClick={() => {
                    setShowDeliveryOptionModal(true);
                    setProductDetails({
                      productId: ele.id,
                      deliveryOption: ele.orderType,
                      deliveryOrReturnOptions: {
                        fastDelivery: ele.fastDelivery,
                        standardDelivery: ele.standardDelivery,
                        fastReturn: ele.fastReturn,
                        standardReturn: ele.standardReturn,
                      },
                    });
                  }}
                >
                  Edit
                </Typography>
              </div>
            </Grid>
            <Grid item container sm={3.5} className="ps-3 h-5">
              <Grid item sm={12} display="flex" justifyContent="end">
                <Typography className="h-5 text-end mb-1 fw-bold">
                  Delivery in {ele?.deliveryIn}
                </Typography>
              </Grid>
              <Grid item sm={4} className="h-5">
                <Typography className="h-5">Order Type</Typography>
              </Grid>
              <Grid item sm={1} display="flex" justifyContent="center">
                :
              </Grid>
              <Grid item sm={7}>
                {getOrderType(ele?.orderType)}
              </Grid>
              <Grid item sm={4}>
                <Typography className="h-5 ">Delivery Charge</Typography>
              </Grid>
              <Grid item sm={1} display="flex" justifyContent="center">
                :
              </Grid>
              <Grid item sm={7}>
                <span className={ele?.deliveryCharge ? "" : "text-success"}>
                  {ele.deliveryCharge || "FREE"}
                </span>
              </Grid>
              <Grid item sm={4}>
                Return Charge
              </Grid>
              <Grid item sm={1} display="flex" justifyContent="center">
                :
              </Grid>
              <Grid item sm={7}>
                <span
                  className={
                    ele?.returnCharge ? "fst-normal" : "text-success fst-normal"
                  }
                >
                  {ele?.returnCharge || "FREE"}
                </span>
              </Grid>
            </Grid>
          </Grid>
          <Divider variant="middle" light className="my-2" />
        </Box>
      );
    });
  };

  const getFinalPrice = () => {
    let salePrice = 0;
    let deliveryPrice = 0;
    let totalPrice = 0;
    let returnCharges = 0;
    products?.map((ele) => {
      salePrice += parseInt(ele.salePrice, 10) * parseInt(ele.cartQty, 10);
      deliveryPrice += parseInt(ele.deliveryCharge, 10);
      returnCharges += parseInt(ele.returnCharge, 10);
      return null;
    });
    totalPrice = deliveryPrice + salePrice + returnCharges;
    return { salePrice, deliveryPrice, totalPrice, returnCharges };
  };

  // const getSkeletonLoader = () => {
  //   const temp = [];
  //   for (let i = 0; i <= 10; i++) {
  //     temp.push(
  //       <Grid item container className="mx-2 py-1 mb-3 ">
  //         <Grid container item key={i} spacing={0}>
  //           <Grid item sm={2} className="">
  //             <Skeleton variant="rectangular" height={125} width={125} />
  //             <Box className="mt-2">
  //               <Skeleton width="50%" />
  //             </Box>
  //           </Grid>
  //           <Grid item sm={9}>
  //             <Skeleton width="100%" />
  //             <Skeleton width="90%" />
  //             <Skeleton width="100%" />
  //             <Skeleton width="90%" />
  //             <Skeleton width="100%" />
  //           </Grid>
  //         </Grid>
  //       </Grid>
  //     );
  //   }
  //   return temp;
  // };

  const handleAddressSelect = async (item) => {
    if (item) {
      const { data, err } = await changePrimaryAddress(userId, item.addressId);
      if (data) {
        dispatch(
          storeUserInfo({
            ...customer,
            addressDetails: { ...data.data },
          })
        );

        toastify(data?.message, "success");
        getAllData(customer.userId);
      }
      if (err) {
        toastify(err?.response?.data?.message, "error");
      }
    }
  };

  return (
    <>
      {products?.length ? (
        <Grid container ref={mainRef}>
          <Grid item sm={9}>
            <Paper className="w-100">
              <Box className="theme_bg_color_1 d-flex justify-content-between align-items-center p-2 w-100">
                <Typography className="theme_color fs-16 fw-bold">
                  My Cart
                </Typography>
                {/* <ButtonComponent
              muiProps="p-0"
              label="Choose Address"
              onBtnClick={() => setShowChooseAddress(true)}
            /> */}
                <div className="mx-2 ">
                  <Typography className="fs-12 color-black fw-bold cursor-pointer">
                    {customer.addressDetails?.name}
                  </Typography>
                  <Typography className="fs-12 color-black fw-bold cursor-pointer">
                    {customer.addressDetails?.cityDistrictTown},
                    {customer.addressDetails?.pinCode}
                  </Typography>
                </div>
              </Box>

              {products?.length ? (
                <Box className="mnh-79vh mxh-79vh overflow-auto hide-scrollbar">
                  {getCartList()}
                </Box>
              ) : (
                // <Grid container>{getSkeletonLoader()}</Grid>
                <></>
              )}

              {openRemoveConfirm.open ? (
                <ModalComponent
                  open={openRemoveConfirm.open}
                  ModalTitle=""
                  ModalWidth={300}
                  saveBtnText="Remove"
                  ClearBtnText="Cancel"
                  showCloseIcon
                  onClearBtnClick={() => {
                    setopenRemoveConfirm({
                      ...openRemoveConfirm,
                      open: false,
                      id: "",
                    });
                  }}
                  onCloseIconClick={() => {
                    setopenRemoveConfirm({
                      ...openRemoveConfirm,
                      open: false,
                      id: "",
                    });
                  }}
                  onSaveBtnClick={() => {
                    removeProduct(openRemoveConfirm.id);
                    setopenRemoveConfirm({
                      ...openRemoveConfirm,
                      open: false,
                      id: "",
                    });
                  }}
                >
                  <Grid className="">
                    <Typography className="fs-16 fw-600 ">
                      Remove Item
                    </Typography>
                    <Typography className="fs-14 fw-400 py-2">
                      Are you sure you want to remove item ?
                    </Typography>
                  </Grid>
                </ModalComponent>
              ) : (
                <></>
              )}
            </Paper>
          </Grid>
          {products?.length ? (
            <Grid item sm={3} className="">
              <Paper className="mb-3 ms-2 p-2">
                <Typography className="fs-16 fw-500 d-flex justify-content-between  border-bottom-1">
                  Choose Address
                  <CustomIcon
                    type="more"
                    size={20}
                    title="More Options"
                    onIconClick={() => setShowChooseAddress(true)}
                  />
                </Typography>
                <Box className="mxh-300 overflow-auto hide-scrollbar">
                  {masterAddress.length &&
                    masterAddress.map((item, index) => (
                      <Box
                        key={index}
                        className={`rounded my-3 mnh-150 p-2 border ${
                          item.primary
                            ? "theme_bg_color_1 theme_border_color "
                            : ""
                        }`}
                      >
                        <Box className="d-flex justify-content-between">
                          <CheckBoxComponent
                            label={item.name}
                            isChecked={item.primary}
                            showIcon
                            checkBoxClick={() => {
                              handleAddressSelect(item);
                            }}
                            iconType="circled"
                          />
                        </Box>
                        <Box className="d-flex justify-content-between">
                          <Box>
                            <Typography className="ps-3 fs-14 pe-2 text-align-justify">
                              {" "}
                              {`${item?.address}, ${item?.location}, ${
                                item?.landmark ? `${item?.landmark},` : ""
                              }  ${item?.cityDistrictTown}, ${item?.state}, ${
                                item?.pinCode
                              }.`}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    ))}
                </Box>
              </Paper>
              <Paper className="ms-2 p-2">
                <Typography className="text-secondary h-5 fw-bold">
                  Price Details
                </Typography>
                <Divider />
                <Box className="d-flex justify-content-between align-items-center">
                  <Typography className="h-5 fw-bold my-2">
                    Price ({priceDetails.noOfItems} items)
                  </Typography>
                  <Typography className="h-5 fw-bold">
                    {getFinalPrice().salePrice}
                  </Typography>
                </Box>
                <Box className="d-flex justify-content-between align-items-center">
                  <Typography className="h-5 fw-bold my-2">
                    Delivery Charges
                  </Typography>
                  <Typography
                    className={`${
                      priceDetails.deliveryCharge === 0 ? "text-success" : ""
                    } h-5`}
                  >
                    {priceDetails.deliveryCharge || "FREE"}
                  </Typography>
                </Box>
                <Box className="d-flex justify-content-between align-items-center">
                  <Typography className="h-5 fw-bold my-2">
                    Return Charges
                  </Typography>
                  <Typography
                    className={`${
                      priceDetails.returnCharges === 0 ? "text-success" : ""
                    } h-5`}
                  >
                    {priceDetails.returnCharges || "FREE"}
                  </Typography>
                </Box>
                <Divider />
                <Box className="d-flex justify-content-between align-items-center my-2">
                  <Typography className="h-5 fw-bold">Total Payable</Typography>
                  <Typography className="h-5 fw-bold">
                    {priceDetails.totalPayable}
                  </Typography>
                </Box>
                <Divider />
                <Typography className="text-success text-center h-5 my-2">
                  Your Total Savings on this Order is {priceDetails.totalSaving}
                </Typography>
              </Paper>
              <Box className="mt-3 w-100 ps-2">
                <ButtonComponent label="Place Order" muiProps="w-100" />
              </Box>
              <ChooseAddress
                showModal={showChooseAddress}
                setShowModal={setShowChooseAddress}
              />
            </Grid>
          ) : (
            <></>
            // <Grid item sm={3} spacing={2} className="">
            //   <Paper className="ms-2 p-2">
            //     <Typography className="text-secondary h-5 fw-bold">
            //       Price Details
            //     </Typography>
            //     <Divider />
            //     <Box className="px-2">
            //       <Skeleton width="100%" />
            //       <Skeleton width="80%" className="my-2" />
            //       <Skeleton width="100%" />
            //       <Skeleton width="80%" className=" my-2 " />
            //       <Skeleton width="100%" className=" my-2 " />
            //     </Box>
            //   </Paper>
            // </Grid>
          )}
          {showDeliveryOptionModal ? (
            <DeliveryOptionsModal
              modalOpen={showDeliveryOptionModal}
              setModalOpen={setShowDeliveryOptionModal}
              productId={productDetails?.productId}
              getProducts={getproducts}
              modalType="EDIT"
              choosedDeliveryandReturnCharges={productDetails}
            />
          ) : null}
        </Grid>
      ) : (
        <Grid className="">
          <Typography className=" theme_bg_color_1 theme_color fs-16 fw-bold p-2 w-100">
            My Cart
          </Typography>
          <Grid className="d-flex justify-content-center">
            <Image
              src="https://dev-mrmrscart-assets.s3.ap-south-1.amazonaws.com/asset/Your%20cart%20is%20empty%201.png"
              alt="no product"
              // layout="fill"
              height={400}
              width={800}
              // style={{
              //   height: "100vh",
              //   width: "80vw",
              // }}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
};
export default Cart;
