import ButtonComponent from "@/atoms/ButtonComponent";
import ButtonTabsList from "@/atoms/ButtonTabsList";
import InputBox from "@/atoms/InputBoxComponent";
import ModalComponent from "@/atoms/ModalComponent";
import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import {
  addNewWishList,
  // addProductToWishList,
  // deleteWishListName,
  getAllWishListsByProfileId,
  updateWishListName,
} from "services/customer/wishlist";
import serviceUtil from "services/utils";
import toastify from "services/utils/toastUtils";

const AddToWishListModal = ({
  getProducts = () => {},
  showModal = false,
  setShowModal = () => {},
  productId = "",
  productImage = "",
  productTitle = "",
}) => {
  const { userId, profileId } = useSelector((state) => state?.customer);
  const [showAddNewWishList, setShowAddNewWishList] = useState(false);
  const [newWishListName, setNewWishListName] = useState("");
  const [modalType, setModalType] = useState("Add");
  const [error, setError] = useState(false);

  const [wishListNames, setWishListNames] = useState([]);
  const [selectedList, setSelectedList] = useState({
    id: "",
    index: 0,
  });
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
    if (newWishListName?.length) {
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
        setError(false);
      } else if (err) {
        toastify(err?.response?.data?.message, "error");
        setNewWishListName("");
        getAllWishLists();
        setError(false);
      }
    } else setError(true);
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
      setError(false);
    }
    if (err) {
      toastify(err?.response?.data?.message, "error");
      setError(false);
    }
  };

  // const deleteList = async (id) => {
  //   const { data, err } = await deleteWishListName(profileId, id);
  //   if (data) {
  //     getProducts();
  //     getAllWishLists();
  //     toastify(data?.message, "success");
  //     setSelectedList({
  //       id: "",
  //       index: 0,
  //     });
  //   } else if (err) {
  //     toastify(err?.response?.data?.message, "error");
  //   }
  // };

  const queryClient = useQueryClient();

  const addProductToWishlistMutation = useMutation(
    () => {
      return serviceUtil.post(`/users/customer/wishlist/products`, {
        profileId,
        wishlistId: selectedList?.id,
        productVariationId: productId,
      });
    },
    {
      onSuccess: ({ data }) => {
        toastify(data?.message, "success");
        setShowModal(false);
        getProducts();
        queryClient.invalidateQueries(["POPULARDEPARTMENTS"]);
        queryClient.refetchQueries("POPULARDEPARTMENTS", { force: true });
        queryClient.invalidateQueries(["RECENTLYVIEWED"]);
        queryClient.refetchQueries("RECENTLYVIEWED", { force: true });
      },
    }
  );

  const deleteProductMutation = useMutation(
    (id) => {
      return serviceUtil.deleteById(
        `users/customer/wishlist/${profileId}/${id}`
      );
    },
    {
      onSuccess: ({ data }) => {
        toastify(data?.message, "success");
        queryClient.invalidateQueries(["POPULARDEPARTMENTS"]);
        queryClient.refetchQueries("POPULARDEPARTMENTS", { force: true });
        queryClient.invalidateQueries(["RECENTLYVIEWED"]);
        queryClient.refetchQueries("RECENTLYVIEWED", { force: true });
        queryClient.invalidateQueries(["PRODUCTVARIATIONS"]);
        queryClient.refetchQueries("PRODUCTVARIATIONS", { force: true });
        getAllWishLists();
        setSelectedList({
          id: "",
          index: 0,
        });
      },
      onError: (err) => {
        toastify(err?.response?.data?.message, "error");
      },
    }
  );
  // const addproducttolist = async () => {
  //   const payload = {
  //     profileId,
  //     wishlistId: selectedList?.id,
  //     productVariationId: productId,
  //   };
  //   const { data, err } = await addProductToWishList(payload);
  //   if (data) {
  //     toastify(data?.message, "success");
  //     setShowModal(false);
  //     getProducts();
  //     getProductDetails(productId, variationDetails);
  //   }
  //   if (err) {
  //     toastify(err?.response?.data?.message, "error");
  //     setShowModal(false);
  //   }
  // };

  return (
    <ModalComponent
      titleClassName="fs-16"
      open={showModal}
      onCloseIconClick={() => {
        setShowModal(false);
      }}
      showClearBtn={false}
      showSaveBtn={wishListNames?.length}
      saveBtnText="Add"
      ModalWidth={600}
      ModalTitle="Choose Wishlist"
      footerClassName="justify-content-end"
      saveBtnClassName="fs-10"
      onSaveBtnClick={() => {
        addProductToWishlistMutation.mutate();
      }}
    >
      <Grid container justifyContent="center" my={2}>
        <Grid item md={6} lg={4}>
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
              // deleteList(item?.id);
              deleteProductMutation.mutate(item.id);
            }}
          />
          <Box className={wishListNames?.length >= 5 ? "d-none" : "mt-3 w-100"}>
            <ButtonComponent
              label="Add new wishlist"
              variant="outlined"
              muiProps="fw-bold border border-secondary fs-12 w-100 text-capitalize"
              // borderColor="border-orange"
              textColor="theme_color"
              onBtnClick={() => {
                setShowAddNewWishList(true);
                setModalType("Add");
                setNewWishListName("");
              }}
            />
          </Box>
        </Grid>
        <Grid
          item
          md={6}
          lg={8}
          className="d-flex flex-column align-items-center"
        >
          <Image
            src={productImage}
            height="150"
            width="150"
            style={{
              borderRadius: "10px",
            }}
          />
          <Typography className="text-truncat fw-bold fs-14">
            {productTitle}
          </Typography>
        </Grid>
      </Grid>
      <ModalComponent
        open={showAddNewWishList}
        onCloseIconClick={() => {
          setShowAddNewWishList(false);
          setError(false);
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
            helperText={error ? "This Field is Required" : ""}
            error={error}
          />
        </Box>
      </ModalComponent>
    </ModalComponent>
  );
};
export default AddToWishListModal;
