/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Divider, Grid, Paper, Typography } from "@mui/material";
import ModalComponent from "@/atoms/ModalComponent";
import { useEffect, useState, useRef } from "react";
import {
  getProductsToMergeBySearch,
  mergeProducts,
} from "services/admin/products";
import InputBox from "@/atoms/InputBoxComponent";
import CustomIcon from "services/iconUtils";
import ButtonComponent from "@/atoms/ButtonComponent";
import toastify from "services/utils/toastUtils";

const MergeToModal = ({
  openMergeToModal = false,
  setOpenMergeToModal = () => {},
  productId = "",
  viewClick = () => {},
  getTableData = () => {},
  getCount = () => {},
}) => {
  const [searchText, setSearchText] = useState("");
  const [productDetails, setProductDetails] = useState([]);
  const [showMenu, setShowMenu] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState([]);

  const getProductsToMerge = async (selectedProducts) => {
    const formData = new FormData();
    formData.append("searchKey", searchText);
    const { data } = await getProductsToMergeBySearch(formData);
    if (data) {
      let selectedIds = [];
      if (selectedProducts) {
        selectedIds = selectedProducts.map((ele) => ele.productVariationId);
      } else {
        selectedIds = selectedProduct.map((ele) => ele.productVariationId);
      }
      // eslint-disable-next-line consistent-return
      const temp = data.filter((ele) => {
        if (!selectedIds.includes(ele.productVariationId)) {
          return ele;
        }
      });
      setProductDetails([...temp]);
    }
  };

  useEffect(() => {
    getProductsToMerge();
  }, [searchText]);

  const handleMerge = async (id) => {
    const payload = {
      mergeProductId: productId,
      productMergeWithId: id,
    };
    const { data, err } = await mergeProducts(payload);
    if (data) {
      toastify(data?.message, "success");
      getTableData(0);
      getCount();
    }
    if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };

  const ref = useRef();
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setShowMenu(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const getSelectedProducts = () => {
    return selectedProduct?.map((ele) => {
      return (
        <>
          <Grid container item spacing={1}>
            <Grid item sm={9}>
              <Typography className="fw-bold">{ele.productTitle}</Typography>
            </Grid>
            <Grid item sm={3} display="flex" justifyContent="space-between">
              <CustomIcon
                title="view"
                type="view"
                onIconClick={() => {
                  setOpenMergeToModal(false);
                  viewClick(ele.masterProductId, ele.productVariationId);
                }}
              />
              <ButtonComponent
                variant="outlined"
                label="Cancel"
                bgColor="white"
                textColor="text-black"
                onBtnClick={() => {
                  let temp = JSON.parse(JSON.stringify(selectedProduct));
                  temp = temp?.filter((i) => {
                    if (i.productVariationId !== ele.productVariationId) {
                      return i;
                    }
                  });
                  getProductsToMerge(temp);
                  setSelectedProduct([...temp]);
                }}
                borderColor="border-0"
              />
              <ButtonComponent
                variant="outlined"
                label="Merge"
                bgColor="bg-light-gray"
                onBtnClick={() => handleMerge(ele.productVariationId)}
              />
            </Grid>
            <Grid item sm={12}>
              <Divider color="black" />
            </Grid>
          </Grid>
        </>
      );
    });
  };

  const getProductDetails = () => {
    return productDetails?.map((ele) => {
      return (
        <>
          <Typography
            ref={ref}
            className="fw-bold mb-1"
            key={ele.productVariationId}
            onClick={() => {
              const index = productDetails?.findIndex((i) => {
                return i.productVariationId === ele.productVariationId;
              });
              const tempList = JSON.parse(JSON.stringify(productDetails));
              tempList.splice(index, 1);
              setProductDetails([...tempList]);

              setShowMenu(false);
              const temp = JSON.parse(JSON.stringify(selectedProduct));
              temp.push({
                productTitle: ele.productTitle,
                productVariationId: ele.productVariationId,
                masterProductId: ele.masterProductId,
              });
              setSelectedProduct([...temp]);
            }}
          >
            {ele.productTitle}
          </Typography>
        </>
      );
    });
  };

  return (
    <>
      <ModalComponent
        ref={ref}
        open={openMergeToModal}
        showFooter={false}
        onCloseIconClick={() => {
          setOpenMergeToModal(false);
        }}
        ModalTitle="Merge"
        titleClassName="fw-bold fs-14 color-orange"
        minHeightClassName=""
        ModalWidth="60%"
      >
        <div className="mnh-300 mt-2 mb-3  position-relative" ref={ref}>
          <div onClick={() => setShowMenu(true)}>
            <InputBox
              placeholder="Search Products"
              className="my-2 position-relative"
              label="Search Products"
              value={searchText}
              onInputChange={(e) => {
                setSearchText(e.target.value);
              }}
              // onFocus={() => setShowMenu(true)}
              inputRef={ref}
            />
          </div>
          <Paper
            ref={ref}
            elevation={6}
            className={`position-absolute  top-5 w-100 overflow-auto p-2 ${
              !showMenu ? "d-none" : ""
            }`}
            sx={{
              zIndex: 1000,
              maxHeight: "25vh",
              minHeight: "25vh",
            }}
          >
            {getProductDetails()}
          </Paper>

          {selectedProduct?.length ? (
            <Grid
              ref={ref}
              container
              rowSpacing={2}
              className="mxh-60vh overflow-auto hide-scrollbar mt-1 border border-2 rounded px-2 pb-1"
            >
              {getSelectedProducts()}
            </Grid>
          ) : null}
        </div>
      </ModalComponent>
    </>
  );
};

export default MergeToModal;
