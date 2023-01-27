import ButtonComponent from "@/atoms/ButtonComponent";
import InputBox from "@/atoms/InputBoxComponent";
import ModalComponent from "@/atoms/ModalComponent";
import RadiobuttonComponent from "@/atoms/RadiobuttonComponent";
import { Box, Typography } from "@mui/material";
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
import CustomIcon from "services/iconUtils";
import serviceUtil from "services/utils";
import toastify from "services/utils/toastUtils";

const AddToWishListModal = ({
  getProducts = () => {},
  showModal = false,
  setShowModal = () => {},
  productId = "",
}) => {
  const { userId, profileId } = useSelector((state) => state?.customer);
  const [showAddNewWishList, setShowAddNewWishList] = useState(false);
  const [newWishListName, setNewWishListName] = useState("");
  const [modalType, setModalType] = useState("Add");
  const [error, setError] = useState(false);
  const [hover, setHover] = useState(null);
  const [selected, setSelected] = useState(null);

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
      setSelected(null);
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
        wishlistId: selected?.id,
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
        setSelected(null);
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
      open={showModal}
      modalClose={() => {
        setShowModal(false);
      }}
      showSaveBtn={wishListNames?.length}
      saveBtnText="Add"
      // ModalWidth="25
      showHeader={false}
      onSaveBtnClick={() => {
        if (!selected || !selected.id) {
          toastify("Choose one wish list", "error");
          return;
        }
        addProductToWishlistMutation.mutate();
      }}
      ClearBtnText="Cancel"
      clearBtnClassName="mx-2 mb-2"
      saveBtnClassName="mx-2 mb-2"
      footerClassName="d-flex justify-content-center flex-row-reverse"
    >
      <Box className="w-100 p-3">
        <Typography className="fw-bold fs-16 mb-3">
          Choose a Wish List for the selected product:
        </Typography>
        {wishListNames.length < 5 && (
          <Box className="d-flex justify-content-end mb-3">
            <ButtonComponent
              label="+ Add New Wish List"
              variant="outlined"
              onBtnClick={() => {
                setShowAddNewWishList(true);
                setModalType("Add");
                setNewWishListName("");
              }}
            />
          </Box>
        )}
        {wishListNames.map((item) => (
          <Box
            className="d-flex justify-content-between w-75 m-1"
            onMouseEnter={() => {
              setHover(item.id);
            }}
            onMouseLeave={() => {
              setHover(null);
            }}
            key={item.id}
          >
            <RadiobuttonComponent
              label={item.title}
              isChecked={selected && selected.id === item.id}
              size="small"
              onRadioChange={() => {
                setSelected(item);
              }}
            />
            {item.id === hover && (
              <div>
                <CustomIcon
                  type="edit"
                  className="h-3 mx-1 cursor-pointer"
                  onIconClick={() => {
                    setShowAddNewWishList(true);
                    setModalType("Edit");
                    setNewWishListName(item?.title);
                  }}
                />
                <CustomIcon
                  type="delete"
                  className="h-3 mx-1 cursor-pointer"
                  onIconClick={() => {
                    deleteProductMutation.mutate(item.id);
                  }}
                />
              </div>
            )}
          </Box>
        ))}
      </Box>
      {/* <Grid container justifyContent="center" my={2}>
        <Grid item sm={7} className="w-75 ">
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
        </Grid>
        <Grid item sm={7} className="w-75 ">
          <Box className={wishListNames?.length >= 5 ? "d-none" : "mt-3"}>
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
      </Grid> */}
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
