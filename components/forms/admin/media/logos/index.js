import { Typography, Box } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import MenuOption from "@/atoms/MenuOptions";
import TableComponent from "@/atoms/TableComponent";
// import ViewProducts from "./ViewProducts";
// import ImagesInfoTable from "./ImagesInfoTable";
// import EditModalForArticles from "./EditModalForArticles";
import RaiseQueryModal from "./RaiseQueryModal";

const Logos = ({ rowsDataObjectsForLogos }) => {
  const [tableRows, setTableRows] = useState([]);
  //   const [showImageInfoTable, setShowImageInfoTable] = useState(false);
  //   const [openEditModal, setOpenEditModal] = useState(false);
  const [openRaiseQueryModal, setOpenRaiseQueryModal] = useState(false);
  //   const [showViewProduct, setShowViewProduct] = useState(false);

  const tableColumns = [
    {
      id: "col1",
      align: "center",
      label: "SL No.",
      data_align: "center",
    },
    {
      id: "col2",
      align: "center",
      label: "Images",
      data_align: "center",
    },
    {
      id: "col3",
      align: "center",
      label: "Logo Name",
      data_align: "center",
    },
    {
      id: "col4",
      align: "center",
      label: "Vendor ID/ Reseller ID/Admin ID",
      data_align: "center",
    },
    {
      id: "col5",
      align: "center",
      label: "Formate",
      data_align: "center",
    },
    {
      id: "col6",
      align: "center",
      label: "Image Size",
      data_align: "center",
    },
    {
      id: "col7",
      align: "center",
      label: "Pixel ratio",
      data_align: "center",
    },
    {
      id: "col8",
      align: "center",
      label: "Image URL",
      data_align: "center",
    },
    {
      id: "col9",
      align: "center",
      label: "Last updated date & Time",
      data_align: "center",
    },
    {
      id: "col10",
      align: "center",
      label: "Action",
      data_align: "center",
    },
  ];

  const onClickOfMenuItem = (ele) => {
    if (ele === "Raise Query") {
      setOpenRaiseQueryModal(true);
    }
  };

  const options = ["Delete", "Raise Query", "Add a Note"];

  const theTaleRowsData = () => {
    const anArray = [];
    rowsDataObjectsForLogos.forEach((val, index) => {
      anArray.push({
        id: index + 1,
        col1: val.col1,
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
        col8: val.col8,
        col9: val.col9,
        col10: (
          <Box className="d-flex justify-content-evenly align-items-center">
            <MenuOption
              getSelectedItem={(ele) => {
                onClickOfMenuItem(ele, index);
              }}
              options={options}
              IconclassName="fs-18 color-gray"
            />
          </Box>
        ),
      });
    });

    setTableRows(anArray);
  };

  useEffect(() => {
    theTaleRowsData();
  }, []);

  return (
    <>
      <Box>
        <Box className="px-1 pt-2">
          <TableComponent
            columns={tableColumns}
            tHeadBgColor="bg-light-gray"
            // showPagination={false}
            tableRows={tableRows}
            showSearchbar={false}
            showDateFilterBtn
            showDateFilter
            //   dateFilterBtnName="+ New Product"
            //   dateFilterBtnClick={() => {
            //     setProductDetails({
            //       vendorIdOrName: "",
            //       images: "",
            //       productTitle: "",
            //       sku: "",
            //       categorySubcategory: "",
            //       weightOrVolume: "",
            //       totalStock: "",
            //       salePriceAndMrp: "",
            //       discounts: "",
            //     });
            // setImageArray([]);
            // setOpenEditModal(true);
            // setModalId(null);
            //   }}
          />
        </Box>
      </Box>
      {/* <EditModalForArticles
        openEditModal={openEditModal}
        setOpenEditModal={setOpenEditModal}
      /> */}
      <RaiseQueryModal
        openRaiseQueryModal={openRaiseQueryModal}
        setOpenRaiseQueryModal={setOpenRaiseQueryModal}
        modalTitle="Type Your Query"
        placeholder="Reasons for query"
      />
    </>
  );
};

export default Logos;
