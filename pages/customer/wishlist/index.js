/* eslint-disable react/no-array-index-key */
import { Box, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ButtonTabsList from "@/atoms/ButtonTabsList";
import ButtonComponent from "@/atoms/ButtonComponent";
import StarRatingComponentReceivingRating from "@/atoms/StarRatingComponentReceiving";
import InputBox from "@/atoms/InputBoxComponent";
import { useSelector } from "react-redux";
import {
  addNewWishList,
  deleteWishListName,
  fetchProductsFromWishListId,
  getAllWishListsByProfileId,
  removeProductFromWishList,
  updateWishListName,
} from "services/customer/wishlist";
import ModalComponent from "@/atoms/ModalComponent";
import toastify from "services/utils/toastUtils";
import { format } from "date-fns";

const WishList = () => {
  const { userId, profileId, supplierId } = useSelector(
    (state) => state?.customer
  );
  const [showAddNewWishList, setShowAddNewWishList] = useState(false);
  const [newWishListName, setNewWishListName] = useState("");
  const [modalType, setModalType] = useState("Add");
  const [searchText, setSearchText] = useState("");

  const [products, setProducts] = useState([]);
  const [wishListNames, setWishListNames] = useState([]);
  const [selectedList, setSelectedList] = useState({
    id: "",
    index: 0,
  });

  const getProducts = async (keyword) => {
    const payload = {
      customerId: userId,
      profileId,
      supplierId,
      wishlistId: selectedList.id,
      keyword: keyword ?? "",
    };
    const { data } = await fetchProductsFromWishListId(payload);
    if (data) {
      setProducts([...data]);
    }
  };

  useEffect(() => {
    if (selectedList?.id?.toString()?.length) {
      getProducts();
    }
  }, [selectedList?.id]);

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

  useEffect(() => {
    getAllWishLists();
  }, []);

  const createNewWishList = async () => {
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
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
      setNewWishListName("");
      getAllWishLists();
    }
  };

  const editWishListName = async () => {
    const formData = new FormData();
    formData.append("wishlistName", newWishListName);
    const { message, err } = await updateWishListName(
      profileId,
      selectedList?.id,
      formData
    );
    if (message) {
      setShowAddNewWishList(false);
      toastify(message, "success");
      setNewWishListName("");
      getAllWishLists();
    }
    if (err) {
      toastify(err?.response?.data?.message, "error");
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
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };

  const removeProductFromList = async (id) => {
    const { data, err } = await removeProductFromWishList(selectedList?.id, id);
    if (data) {
      toastify(data?.message, "success");
      getProducts();
    }
    if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };

  const getList = () => {
    return products.map((ele) => {
      return (
        <Paper
          className="d-flex justify-content-between ms-3 mb-2 p-2 rounded-1 align-items-center"
          key={ele.productVariationId}
        >
          <Box className="d-flex">
            <Box>
              <Image src={ele.productImageUrl} height={100} width={100} />
            </Box>
            <Box className="ps-2">
              <Typography className="fw-bold h-5">
                {ele.productTitle}
              </Typography>
              <StarRatingComponentReceivingRating
                rating={ele.rating ?? 0}
                className="h-4"
              />
              <Typography className="h-5">{ele.reviews} Reviews</Typography>
            </Box>
          </Box>
          <Box className="">
            <Typography className="mb-1 text-center h-5">
              Item added on {format(new Date(ele.addedAt), "dd MMM yyyy")}
            </Typography>
            <Box className="mb-1">
              <ButtonComponent
                label="Add to cart"
                muiProps="fw-bold fs-10 bg-primary w-100 px-5"
                textColor="color-black"
              />
            </Box>
            <Box className="mb-1">
              <ButtonComponent
                label="Remove from list"
                muiProps="fw-bold fs-10 w-100 text-dark px-5"
                textColor="text-dark"
                bgColor="bg-white"
                onBtnClick={() => {
                  removeProductFromList(ele.productVariationId);
                }}
              />
            </Box>
          </Box>
        </Paper>
      );
    });
  };

  return (
    <Box>
      <Box className="d-flex justify-content-between align-items-center mb-2">
        <Typography variant="h-3" className="fw-bold">
          Your Lists
        </Typography>
        <Box className="d-flex align-items-center w-25">
          <InputBox
            size="small"
            placeholder="Search this list"
            value={searchText}
            onInputChange={(e) => {
              if (e.target.value === "") {
                getProducts();
              }
              setSearchText(e.target.value);
            }}
          />
          <Box
            className="bg-orange d-flex justify-content-center align-items-center rounded cursor-pointer rounded ms-2"
            onClick={() => {
              getProducts(searchText);
            }}
          >
            <SearchOutlinedIcon className="text-white p-1 fs-1" />
          </Box>
        </Box>
      </Box>
      <Box className="d-flex justify-content-between">
        <Paper className="bg-white p-2 rounded-1 w-20p mb-2">
          <ButtonTabsList
            tabsList={[...wishListNames]}
            showEditDelete
            activeTab={selectedList.index}
            getActiveTab={(index, item) => {
              setSelectedList({
                id: item?.id,
                index,
              });
            }}
            onEditClick={(item) => {
              setShowAddNewWishList(true);
              setModalType("Edit");
              setNewWishListName(item?.title);
            }}
            onDeleteClick={(item) => {
              deleteList(item?.id);
            }}
          />
          <Box className={wishListNames?.length >= 5 ? "d-none" : "mt-3"}>
            <ButtonComponent
              label="Add new wishlist"
              variant="outlined"
              muiProps="fw-bold border border-secondary fs-12 w-100 text-capitalize"
              borderColor="border-orange"
              textColor="color-orange"
              onBtnClick={() => {
                setShowAddNewWishList(true);
                setModalType("Add");
                setNewWishListName("");
              }}
            />
          </Box>
        </Paper>
        <Box
          className="w-100 overflow-y-scroll hide-scrollbar"
          sx={{
            maxHeight: "72vh !important",
          }}
        >
          {getList()}
        </Box>
      </Box>
      <ModalComponent
        open={showAddNewWishList}
        onCloseIconClick={() => {
          setShowAddNewWishList(false);
        }}
        ClearBtnText="Clear"
        saveBtnText={
          modalType === "Add" ? "Create WishList" : "Update WishList"
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
              setNewWishListName(e?.target?.value);
            }}
          />
        </Box>
      </ModalComponent>
    </Box>
  );
};

export default WishList;
