/* eslint-disable prefer-destructuring */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import CustomIcon from "services/iconUtils";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import styles from "./fixedmargin.module.css";
import TableComponent from "@/atoms/TableComponent";
import MenuOption from "@/atoms/MenuOptions";
import ModalComponent from "@/atoms/ModalComponent";
import InputBox from "@/atoms/InputBoxComponent";
import ButtonComponent from "@/atoms/ButtonComponent";

const FixedMargin = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [imageArray, setImageArray] = useState([]);
  const [modalId, setModalId] = useState(null);
  const [tableRows, setTableRows] = useState([]);
  const [productDetails, setProductDetails] = useState({
    vendorIdOrName: "",
    images: "",
    productTitle: "",
    sku: "",
    categorySubcategory: "",
    weightOrVolume: "",
    totalStock: "",
    salePriceAndMrp: "",
    discounts: "",
  });

  const titles = [
    "Products to approve (48)",
    "Drafts (23)",
    "Queries (10)",
    "Active (155)",
    "Update(432)",
    "Rejected(58)",
  ];

  const options = [
    "Edit",
    "Delete",
    "Accept/Reject",
    "Raise Query",
    "Draft",
    "Merge to",
    "flags",
  ];

  const tableColumns = [
    {
      id: "col1",
      align: "center",
      label: "VendorID/Name",
      data_align: "center",
    },
    { id: "col2", align: "center", label: "Images", data_align: "center" },
    {
      id: "col3",
      align: "center",
      label: "Product Title",
      data_align: "center",
    },
    { id: "col4", align: "center", label: "SKU", data_align: "center" },
    {
      id: "col5",
      align: "center",
      label: "Category/Subcategory",
      data_align: "center",
    },
    {
      id: "col6",
      align: "center",
      label: "Weight/Volume",
      data_align: "center",
    },
    { id: "col7", align: "center", label: "Total Stock", data_align: "center" },
    {
      id: "col8",
      align: "center",
      label: "Sale Price/MRP",
      data_align: "center",
    },
    { id: "col9", align: "center", label: "Brand", data_align: "center" },
    { id: "col10", align: "center", label: "Action", data_align: "center" },
  ];

  const [rowsDataObjects, setRowDataObjects] = useState([
    {
      id: 1,
      col1: "#345345 SKM Tex",
      col2: {
        imgSrc: [
          "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
        ],
        imgCount: 10,
      },
      col3: "Show 20 words max",
      col4: "--",
      col5: "Gym Eqipment (10%) - Rowing Belt",
      col6: "0.500gms/0.720gms",
      col7: 150,
      col8: { salePrice: 1200, mrpPrice: 1500 },
      col9: "PUMA",
      col10: "nothing",
    },
    {
      id: 2,
      col1: "#345345 SKM hi Tex",
      col2: {
        imgSrc: [
          "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
        ],
        imgCount: 10,
      },
      col3: "Show 20 words max",
      col4: "--",
      col5: "Gym Eqipment (10%) - Rowing Belt",
      col6: "0.500gms/0.720gms",
      col7: 150,
      col8: { salePrice: 100, mrpPrice: 200 },
      col9: "PUMA",
      col10: "nothing",
    },
    {
      id: 3,
      col1: "#345345 SKM hello Tex",
      col2: {
        imgSrc: [
          "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
        ],
        imgCount: 10,
      },
      col3: "Show 20 words max",
      col4: "--",
      col5: "Gym Eqipment (10%) - Rowing Belt",
      col6: "0.500gms/0.720gms",
      col7: 150,
      col8: { salePrice: 1300, mrpPrice: 2000 },
      col9: "PUMA",
      col10: "nothing",
    },
  ]);

  // const editModalInputBoxLabels = [
  //   "Vendor ID/Name",
  //   "Product Title",
  //   "SKU",
  //   "Category/Subcategory",
  //   "Weight/Volume",
  //   "Total Stock",
  //   "Sale Price/MRP",
  //   "Discounts",
  // ];

  const onClickOfMenuItem = (ele, index) => {
    if (ele === "Edit") {
      setProductDetails({
        vendorIdOrName: rowsDataObjects[index].col1,
        images: rowsDataObjects[index].col2.imgSrc,
        productTitle: rowsDataObjects[index].col3,
        sku: rowsDataObjects[index].col4,
        categorySubcategory: rowsDataObjects[index].col5,
        weightOrVolume: rowsDataObjects[index].col6,
        totalStock: rowsDataObjects[index].col7,
        salePriceAndMrp: `${rowsDataObjects[index].col8.salePrice}/${rowsDataObjects[index].col8.mrpPrice} `,
        discounts:
          rowsDataObjects[index].col8.mrpPrice -
          rowsDataObjects[index].col8.salePrice,
      });
      setModalId(index);
      setImageArray(rowsDataObjects[index].col2.imgSrc);
      setOpenEditModal(true);
    }

    if (ele === "Delete") {
      const tempArray = [...rowsDataObjects];
      tempArray.splice(index, 1);
      setRowDataObjects([...tempArray]);
    }
  };

  const theTableRowsData = () => {
    const anArray = [];
    rowsDataObjects.forEach((val, index) => {
      anArray.push({
        id: index + 1,
        col1: (
          <Typography className="fs-12 text-primary">{val.col1}</Typography>
        ),
        col2: (
          <Box className="d-flex align-items-end justify-content-center">
            <Box className="h-30 border d-flex justify-content-center">
              <Image
                src={val.col2.imgSrc[0]}
                width="50"
                height="50"
                className="cursor-pointer"
              />
            </Box>
            <Typography className="fs-10">/{val.col2.imgCount}</Typography>
          </Box>
        ),
        col3: val.col3,
        col4: val.col4,
        col5: val.col5,
        col6: val.col6,
        col7: val.col7,
        col8: (
          <Typography className="fs-12">
            &#8377; {val.col8.salePrice}/ &#8377; {val.col8.mrpPrice}
          </Typography>
        ),
        col9: "PUMA",
        col10: (
          <Box className="d-flex justify-content-evenly align-items-center">
            <CustomIcon type="view" className="fs-18" />
            <MenuOption
              getSelectedItem={(ele) => {
                console.log("Index", index);
                onClickOfMenuItem(ele, index);
              }}
              options={options}
              IconclassName="fs-18 color-gray"
            />
          </Box>
        ),
      });
    });
    setTableRows([...anArray]);
  };

  useEffect(() => {
    theTableRowsData();
  }, []);

  useEffect(() => {
    theTableRowsData();
  }, [rowsDataObjects]);

  const getMrpPrice = () => {
    let mrpPrice = 0;
    if (productDetails.salePriceAndMrp) {
      const tempArray = productDetails.salePriceAndMrp.split("/");
      console.log(tempArray);
      mrpPrice = tempArray[1];
      console.log(mrpPrice);
    }
    return parseInt(mrpPrice, 10);
  };
  const getSalePrice = () => {
    let salePrice = 0;
    if (productDetails.salePriceAndMrp) {
      const tempArray = productDetails.salePriceAndMrp.split("/");
      console.log(tempArray);
      salePrice = tempArray[0];
      console.log(salePrice);
    }
    return parseInt(salePrice, 10);
  };

  const onImgeChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log("The result", e.target.result);
        const theImagesArray = [...imageArray];
        theImagesArray.push(e.target.result);
        setImageArray([...theImagesArray]);
        setProductDetails({ ...productDetails, images: theImagesArray });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const returnTabs = () => {
    return titles.map((val, index) => {
      return (
        <Box
          onClick={() => {
            setActiveTab(index);
          }}
          className={`px-4 py-1 border fs-14 cursor-pointer 
          ${activeTab === index ? styles.activeTab : styles.inActivetab}
          `}
          key={val}
        >
          <Typography className="cursor-pointer fs-14">{val}</Typography>
        </Box>
      );
    });
  };

  // const returnEditModalInputBoxes = () => {
  //   return editModalInputBoxLabels.map((label, index) => {
  //     const [value, setValue] = useState("");
  //     return (
  //       <Grid item xs={6}>
  //         <InputBox
  //           value={value}
  //           label={label}
  //           onInputChange={(e) => {
  //             setValue(e.target.value);
  //           }}
  //           inputlabelshrink
  //         />
  //       </Grid>
  //     );
  //   });
  // };

  return (
    <>
      <Box>
        <Box className="d-flex mt-3">{returnTabs()}</Box>
        <Box className="mt-2">
          <ButtonComponent
            label="+ New Product"
            onBtnClick={() => {
              setProductDetails({
                vendorIdOrName: "",
                images: "",
                productTitle: "",
                sku: "",
                categorySubcategory: "",
                weightOrVolume: "",
                totalStock: "",
                salePriceAndMrp: "",
                discounts: "",
              });
              setImageArray([]);
              setOpenEditModal(true);
            }}
          />
        </Box>
        <Box className="">
          <TableComponent
            columns={tableColumns}
            tHeadBgColor="bg-light-gray"
            showPagination={false}
            tableRows={tableRows}
            showSearchbar={false}
          />
        </Box>
      </Box>
      <ModalComponent
        open={openEditModal}
        ModalTitle="Edit Product"
        titleClassName="fw-bold fs-14 color-orange"
        footerClassName="d-flex justify-content-start flex-row-reverse border-top mt-3"
        ClearBtnText="Reset"
        saveBtnText="Update"
        saveBtnClassName="ms-1"
        ModalWidth={650}
        onCloseIconClick={() => {
          setOpenEditModal(false);
        }}
        minHeightClassName="mxh-500"
        onSaveBtnClick={() => {
          if (modalId === null) {
            const tempObject = {
              id: rowsDataObjects.length,
              col1: productDetails.vendorIdOrName,
              col2: {
                imgSrc: imageArray,
                imgCount: imageArray.length,
              },
              col3: productDetails.productTitle,
              col4: productDetails.sku,
              col5: productDetails.categorySubcategory,
              col6: productDetails.weightOrVolume,
              col7: productDetails.totalStock,
              col8: {
                salePrice: getSalePrice(),
                mrpPrice: getMrpPrice(),
              },
              col9: "PUMA",
              col10: "nothing",
            };

            const tempArray = [...rowsDataObjects];
            tempArray.push(tempObject);
            setRowDataObjects([...tempArray]);
            setOpenEditModal(false);
          } else if (modalId !== null) {
            const tempObject = {
              id: rowsDataObjects.length,
              col1: productDetails.vendorIdOrName,
              col2: {
                imgSrc: imageArray,
                imgCount: imageArray.length,
              },
              col3: productDetails.productTitle,
              col4: productDetails.sku,
              col5: productDetails.categorySubcategory,
              col6: productDetails.weightOrVolume,
              col7: productDetails.totalStock,
              col8: {
                salePrice: getSalePrice(),
                mrpPrice: getMrpPrice(),
              },
              col9: "PUMA",
              col10: "nothing",
            };

            const tempArray = [...rowsDataObjects];
            tempArray.splice(modalId, 1, tempObject);
            setRowDataObjects([...tempArray]);
            setOpenEditModal(false);
          }
        }}
      >
        <Grid container className="my-1" spacing={4}>
          <Grid item xs={6}>
            <InputBox
              value={productDetails.vendorIdOrName}
              label="VendorID/Name"
              inputlabelshrink
              onInputChange={(e) => {
                setProductDetails({
                  ...productDetails,
                  vendorIdOrName: e.target.value,
                });
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <InputBox
              value={productDetails.productTitle}
              label="Product Title"
              inputlabelshrink
              onInputChange={(e) => {
                setProductDetails({
                  ...productDetails,
                  productTitle: e.target.value,
                });
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <InputBox
              value={productDetails.sku}
              label="SKU"
              inputlabelshrink
              onInputChange={(e) => {
                setProductDetails({
                  ...productDetails,
                  sku: e.target.value,
                });
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <InputBox
              value={productDetails.categorySubcategory}
              label="Category/Subcategory"
              inputlabelshrink
              onInputChange={(e) => {
                setProductDetails({
                  ...productDetails,
                  categorySubcategory: e.target.value,
                });
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <InputBox
              value={productDetails.weightOrVolume}
              label="Weight/Volume"
              inputlabelshrink
              onInputChange={(e) => {
                setProductDetails({
                  ...productDetails,
                  weightOrVolume: e.target.value,
                });
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <InputBox
              value={productDetails.totalStock}
              label="Total Stock"
              inputlabelshrink
              onInputChange={(e) => {
                setProductDetails({
                  ...productDetails,
                  totalStock: e.target.value,
                });
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <InputBox
              value={productDetails.salePriceAndMrp}
              label="Sale Price/MRP"
              inputlabelshrink
              onInputChange={(e) => {
                setProductDetails({
                  ...productDetails,
                  salePriceAndMrp: e.target.value,
                });
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <InputBox
              value={productDetails.discounts}
              label="Discounts"
              inputlabelshrink
              onInputChange={(e) => {
                setProductDetails({
                  ...productDetails,
                  discounts: e.target.value,
                });
              }}
            />
          </Grid>
        </Grid>
        <Box>
          <Box className="d-flex align-items-center mt-3">
            <Typography className="fs-14 text-center color-gray w-25">
              Add Images
            </Typography>
            <Grid container>
              {imageArray?.map((val, index) => {
                return (
                  <Grid item xs={3}>
                    <Image src={imageArray[index]} width={100} height={100} />
                  </Grid>
                );
              })}
              <Grid item xs={3}>
                <label htmlFor="image-upload" className="d-block">
                  <Box
                    width={100}
                    height={100}
                    className="rounded d-flex justify-content-center align-items-center border cursor-pointer"
                  >
                    <AddCircleOutlineOutlinedIcon className="color-gray" />

                    <input
                      type="file"
                      id="image-upload"
                      accept="image/png, image/jpeg"
                      className="d-none"
                      onChange={onImgeChange}
                    />
                  </Box>
                </label>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </ModalComponent>
    </>
  );
};

export default FixedMargin;
