import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  deleteWishListName,
  addNewWishList,
  getAllWishListsByProfileId,
  updateWishListName,
  fetchProductsFromWishListId,
} from "services/customer/wishlist";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { motion } from "framer-motion";
import InputBox from "@/atoms/InputBoxComponent";
import ModalComponent from "@/atoms/ModalComponent";
import toastify from "services/utils/toastUtils";
import validateMessage from "constants/validateMessages";
import Image from "next/image";
import StarRatingComponentReceivingRating from "@/atoms/StarRatingComponentReceiving";
import { format } from "date-fns";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import { useMutation, useQueryClient } from "react-query";
import serviceUtil from "services/utils";
import DeliveryOptionsModal from "@/forms/customer/Home/buynowmodal";

const WishList = () => {
  const { userId, profileId, supplierId } = useSelector(
    (state) => state?.customer
  );
  const [modalType, setModalType] = useState("Add");
  const [showAddNewWishList, setShowAddNewWishList] = useState(false);
  const [newWishListName, setNewWishListName] = useState("");
  const [selectedList, setSelectedList] = useState({
    id: "",
    index: 0,
  });
  const [selectedId, setselectedId] = useState({ id: "", isOpen: false });
  const [wishListNames, setWishListNames] = useState([]);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [productData, setProductData] = useState({
    productId: "",
    skuId: "",
  });
  const [showAddToCardModal, setShowAddToCardModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const getAllWishLists = async () => {
    const { data } = await getAllWishListsByProfileId(userId, profileId);
    if (data) {
      if (data?.length) {
        setSelectedList({
          id: data[0].wishlistId,
          index: 0,
        });
      }
      setWishListNames(
        data?.map((ele, index) => {
          return {
            title: ele.wishlistName,
            id: ele.wishlistId,
            index,
          };
        })
      );
    }
  };
  const getProducts = async (keyword) => {
    const payload = {
      customerId: userId,
      profileId,
      supplierId,
      wishlistId: selectedList.id,
      keyword: keyword ?? "",
    };
    const { data, err } = await fetchProductsFromWishListId(payload);
    if (data) {
      setProducts([...data]);
    } else if (err) {
      setProducts([]);
    }
  };

  useEffect(() => {
    getAllWishLists();
  }, []);
  useEffect(() => {
    if (selectedList?.id?.toString()?.length) {
      getProducts();
    }
  }, [selectedList?.id]);

  const validateListname = () => {
    let temp = null;
    if (!newWishListName?.length) {
      temp = validateMessage.field_required;
      setError(validateMessage.field_required);
    } else if (newWishListName?.length > 20) {
      temp = validateMessage.alpha_numeric_20;
      setError(validateMessage.alpha_numeric_20);
    } else if (newWishListName?.trim().length !== newWishListName?.length) {
      temp = "Enter a valid name";
      setError("Enter a valid name");
    } else {
      setError(false);
    }
    if (temp === null) {
      return false;
    }
    return true;
  };

  const createNewWishList = async () => {
    const valid = validateListname();
    if (!valid) {
      const payload = {
        customerId: userId,
        userProfileId: profileId,
        wishlistName: newWishListName,
      };
      const { data, message, err } = await addNewWishList(payload);
      if (data) {
        toastify(message, "success");
        getAllWishLists();
        setShowAddNewWishList(false);
        setNewWishListName("");
        setError(null);
      } else if (err) {
        toastify(err?.response?.data?.message, "error");
        setNewWishListName("");
        getAllWishLists();
        setError(null);
      }
    }
    // else setError(true);
  };

  const editWishListName = async () => {
    const formData = new FormData();
    formData.append("wishlistName", newWishListName);
    const validname = validateListname();
    if (!validname) {
      setError(null);
      const { message, err } = await updateWishListName(
        profileId,
        editItem?.id,
        formData
      );
      if (message) {
        setShowAddNewWishList(false);
        toastify(message, "success");
        setNewWishListName("");
        getAllWishLists();
        setEditItem(null);
        setModalType("Add");
      }
      if (err) {
        toastify(err?.response?.data?.message, "error");
        setError(null);
      }
    }
  };

  const deleteList = async (id) => {
    const { data, err } = await deleteWishListName(profileId, id);
    if (data) {
      getAllWishLists();
      toastify(data?.message, "success");
      setSelectedList({
        id: "",
        index: 0,
      });
      getProducts();
      setselectedId({ id: "", isOpen: false });
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };
  const queryClient = useQueryClient();

  const removeWishListMutation = useMutation(
    (id) => {
      return serviceUtil.put(
        `/users/customer/wishlist?wishlistId=${selectedList?.id}&variationId=${id}`
      );
    },
    {
      onSuccess: ({ data }) => {
        queryClient.invalidateQueries(["POPULARDEPARTMENTS"]);
        queryClient.refetchQueries("POPULARDEPARTMENTS", { force: true });
        queryClient.invalidateQueries(["RECENTLYVIEWED"]);
        queryClient.refetchQueries("RECENTLYVIEWED", { force: true });
        toastify(data?.message, "success");
        getProducts();
      },
      onError: (err) => {
        toastify(err?.response?.data?.message, "error");
      },
    }
  );

  return (
    <div>
      <div className="d-flex w-100 mb-4">
        {wishListNames.map((item, index) => {
          return (
            <motion.div
              whileHover={{
                scale: 1.04,
                transition: { duration: 0.5 },
              }}
              whileTap={{ scale: 0.95 }}
              style={{ width: " calc(90% / 5)", height: "85px" }}
              onClick={() => {
                setSelectedList({
                  id: item?.id,
                  index,
                });
              }}
            >
              <Paper
                style={{
                  height: "75px",
                  transition: "all 0.2s ease-out",
                  WebkitTransition: "all 0.2s ease-in-out",
                }}
                className={`d-flex  flex-column cursor-pointer justify-content-center align-items-center m-2 ${
                  selectedList.id !== item.id ? "" : "theme_bg_color"
                }`}
              >
                <Typography
                  className={`fs-18 fw-bold text-capitalize ${
                    selectedList.id !== item.id ? "theme_color" : "color-white"
                  }`}
                >
                  {item.title}
                </Typography>
                <div className="d-flex">
                  <Tooltip title="Update Wishlist">
                    <EditIcon
                      className="m-1 shadow cursor-pointer rounded-circle theme_bg_color_1 theme_color"
                      size={30}
                      style={{
                        color: "#fff ",
                        padding: "5px",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        //   handleProfileSwitch(item);
                        setShowAddNewWishList(true);
                        setModalType("Edit");
                        setNewWishListName(item?.title);
                        setEditItem(item);
                      }}
                    />
                  </Tooltip>
                  <Tooltip title="Delete Wishlist">
                    <DeleteIcon
                      className="m-1 shadow cursor-pointer rounded-circle theme_bg_color_1 theme_color"
                      size={30}
                      style={{
                        color: "#fff ",
                        padding: "5px",
                      }}
                      onClick={() => {
                        //   handleProfileSwitch(item);
                        // deleteList(item.id);
                        setselectedId({ id: item.id, isOpen: true });
                      }}
                    />
                  </Tooltip>
                </div>
              </Paper>
            </motion.div>
          );
        })}
        {selectedId.isOpen && (
          <ModalComponent
            ModalWidth={200}
            ModalTitle=""
            open={selectedId.isOpen}
            onClearBtnClick={() => {
              setselectedId({ id: "", isOpen: false });
            }}
            ClearBtnText="Cancel"
            saveBtnText="Confirm"
            onSaveBtnClick={() => {
              deleteList(selectedId.id);
            }}
            showHeader={false}
          >
            <Typography className="fs-14 p-3">
              Please Click On
              <span style={{ fontWeight: "bold" }}> Confirm </span> To Delete
            </Typography>
          </ModalComponent>
        )}
        {wishListNames.length < 5 && (
          <Tooltip title="Add Wish List">
            <motion.div
              whileHover={{
                scale: 1.04,
                transition: { duration: 0.5 },
              }}
              whileTap={{ scale: 0.95 }}
              style={{ width: " calc(90% / 5)", height: "85px" }}
              onClick={() => {
                setShowAddNewWishList(true);
              }}
            >
              <Paper
                style={{ height: "75px" }}
                className="d-flex cursor-pointer justify-content-center align-items-center m-2 "
              >
                <Box className="rounded-circle p-1 bg-gray ">
                  <AddOutlinedIcon className="color-light-gray cursor-pointer" />
                </Box>
              </Paper>
            </motion.div>
          </Tooltip>
        )}
      </div>
      <Paper className="p-3">
        <Typography
          className="h-1 text-capitalize text-center my-4"
          style={{ color: "#525252" }}
        >
          {wishListNames[selectedList?.index]?.title}
        </Typography>

        <div className="d-flex justify-content-center w-100">
          {products.length ? (
            <Table
              sx={{ minWidth: 650, maxWidth: "75%" }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ width: 100 }}>
                    Image
                  </TableCell>
                  <TableCell align="center">Product Details</TableCell>
                  <TableCell align="center">Added Date</TableCell>
                  <TableCell align="center">Sale Price</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Image
                        src={row?.productImageUrl || ""}
                        width={100}
                        height={90}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Typography className="fw-bold h-5">
                        {row.productTitle}
                      </Typography>
                      <StarRatingComponentReceivingRating
                        rating={row.rating ?? 0}
                        className="h-4"
                      />
                      <Typography className="h-5">
                        {row.reviews} Reviews
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      {format(new Date(row.addedAt), "dd MMM yyyy")}
                    </TableCell>
                    <TableCell align="center">Rs. {row.salePrice}</TableCell>
                    <TableCell align="center">{row.stockStatus}</TableCell>
                    <TableCell align="center">
                      <div className="d-flex flex-column align-items-center w-75 justify-content-center ms-3">
                        <motion.div
                          whileHover={{
                            scale: 1.2,
                            transition: { duration: 0.5 },
                          }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Tooltip title="Add to cart">
                            <AddShoppingCartIcon
                              className="m-1 shadow cursor-pointer rounded-circle theme_bg_color"
                              size={30}
                              style={{
                                color: "#fff ",
                                padding: "5px",
                              }}
                              onClick={() => {
                                //   handleProfileSwitch(item);
                                setShowAddToCardModal(true);
                                setProductData({
                                  productId: row.productVariationId,
                                  skuId: row?.skuId,
                                });
                              }}
                            />
                          </Tooltip>
                        </motion.div>
                        <motion.div
                          whileHover={{
                            scale: 1.2,
                            transition: { duration: 0.5 },
                          }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Tooltip title="Remove">
                            <CloseIcon
                              className="m-1 shadow cursor-pointer rounded-circle theme_bg_color"
                              size={30}
                              style={{
                                color: "#fff ",
                                padding: "5px",
                              }}
                              onClick={() => {
                                //   handleProfileSwitch(item);
                                removeWishListMutation.mutate(
                                  row.productVariationId
                                );
                              }}
                            />
                          </Tooltip>
                        </motion.div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Typography className="h-2" style={{ color: "#525252" }}>
              Wishlist is empty
            </Typography>
          )}
        </div>
      </Paper>
      <ModalComponent
        ModalTitle={
          modalType == "Add" ? "Create New Wish List" : "Update Wishlist"
        }
        open={showAddNewWishList}
        onCloseIconClick={() => {
          setShowAddNewWishList(false);
          setError(null);
          setModalType("Add");
          setNewWishListName("");
        }}
        ClearBtnText="Clear"
        saveBtnText={
          modalType === "Add" ? "Create Wishlist" : "Update Wishlist"
        }
        footerClassName="justify-content-start flex-row-reverse"
        clearBtnClassName="me-3"
        onClearBtnClick={() => {
          setNewWishListName("");
        }}
        onSaveBtnClick={() => {
          if (modalType === "Add") {
            createNewWishList();
          }
          if (modalType === "Edit") {
            editWishListName();
          }
        }}
      >
        <Box className="d-flex justify-content-center align-items-center- my-3">
          <InputBox
            inputlabelshrink
            label="WishList Name"
            value={newWishListName}
            onInputChange={(e) => {
              if (newWishListName.length < 20) {
                setNewWishListName(e?.target?.value);
              } else if (
                newWishListName.trim().length !== newWishListName.length
              ) {
                setNewWishListName(e?.target?.value);
              } else {
                setNewWishListName(e?.target?.value);
              }
            }}
            helperText={
              // eslint-disable-next-line no-nested-ternary
              error !== null ? error : ""
            }
            error={error !== null}
          />
        </Box>
      </ModalComponent>
      {showAddToCardModal && (
        <DeliveryOptionsModal
          getProducts={getAllWishLists}
          modalOpen={showAddToCardModal}
          setModalOpen={setShowAddToCardModal}
          productId={productData?.productId}
          skuId={productData?.skuId}
          modalType="ADD"
        />
      )}
    </div>
  );
};

export default WishList;
