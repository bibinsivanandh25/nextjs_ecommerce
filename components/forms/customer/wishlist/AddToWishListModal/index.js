import ButtonComponent from "@/atoms/ButtonComponent";
import ButtonTabsList from "@/atoms/ButtonTabsList";
import InputBox from "@/atoms/InputBoxComponent";
import ModalComponent from "@/atoms/ModalComponent";
import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  addNewWishList,
  addProductToWishList,
  deleteWishListName,
  getAllWishListsByProfileId,
  updateWishListName,
} from "services/customer/wishlist";
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

  const addproducttolist = async () => {
    const payload = {
      profileId,
      wishlistId: selectedList?.id,
      productVariationId: productId,
    };
    const { data, err } = await addProductToWishList(payload);
    if (data) {
      toastify(data?.message, "success");
      setShowModal(false);
      getProducts();
    }
    if (err) {
      toastify(err?.response?.data?.message, "error");
      setShowModal(false);
    }
  };

  return (
    <ModalComponent
      open={showModal}
      onCloseIconClick={() => {
        setShowModal(false);
      }}
      showClearBtn={false}
      saveBtnText="Add"
      ModalWidth="25%"
      ModalTitle="Choose WishList"
      footerClassName="justify-content-end"
      saveBtnClassName="fs-10"
      onSaveBtnClick={addproducttolist}
    >
      <Grid container justifyContent="center" my={2}>
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
              deleteList(item?.id);
            }}
          />
        </Grid>
        <Grid item sm={7} className="w-75 ">
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
        </Grid>
      </Grid>
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
    </ModalComponent>
  );
};
export default AddToWishListModal;
