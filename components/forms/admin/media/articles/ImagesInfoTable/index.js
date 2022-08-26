import { Box, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import CustomIcon from "services/iconUtils";
import TableComponent from "@/atoms/TableComponent";

const ImagesInfoTable = ({
  rowsDataObjectsForImageInfo,
  // setDataObjectsForImageInfo,
  setShowImageInfoTable,
}) => {
  const [tableRows, setTableRows] = useState([]);

  const tableColumns = [
    {
      id: "col1",
      align: "center",
      label: "Images",
      data_align: "center",
    },
    { id: "col2", align: "center", label: "Format", data_align: "center" },
    {
      id: "col3",
      align: "center",
      label: "Logo Name",
      data_align: "center",
    },
    { id: "col4", align: "center", label: "Size", data_align: "center" },
    {
      id: "col5",
      align: "center",
      label: "Pixel Ratio",
      data_align: "center",
    },
    {
      id: "col6",
      align: "center",
      label: "Image Link Url",
      data_align: "center",
    },
    {
      id: "col7",
      align: "center",
      label: "Last Upcdated Date & Time",
      data_align: "center",
    },
    {
      id: "col8",
      align: "center",
      label: "Action",
      data_align: "center",
    },
  ];

  const theTaleRowsData = () => {
    const anArray = [];
    rowsDataObjectsForImageInfo.forEach((val, index) => {
      anArray.push({
        id: index + 1,
        col1: (
          <Box className="d-flex align-items-end justify-content-center">
            <Box
              onClick={() => {
                // setImages([...val.col2.imgSrc]);
                // setImageIndexForImageModal(0);
                // setModalId(index);
                // setOpenImagesArrayModal(true);
              }}
              className="h-30 border d-flex justify-content-center"
            >
              <Image
                src={val.col1.imgSrc[0]}
                width="50"
                height="50"
                className="cursor-pointer"
              />
            </Box>
            <Typography className="fs-10">/{val.col1.imgCount}</Typography>
          </Box>
        ),
        col2: val.col2,
        col3: val.col3,
        col4: val.col4,
        col5: val.col5,
        col6: <Typography className="text-primary">{val.col6}</Typography>,
        col7: val.col7,
        col8: (
          <Box className="d-flex align-items-center justify-content-center">
            <Tooltip title="Delete" placement="top">
              <Box>
                <CustomIcon type="delete" />
              </Box>
            </Tooltip>
            <Tooltip title="Add Note" placement="top">
              <Box>
                <CustomIcon type="addNote" />
              </Box>
            </Tooltip>
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
    <Box>
      <Typography
        onClick={() => {
          setShowImageInfoTable(false);
        }}
        className="color-orange fs-14 cursor-pointer ps-3"
      >
        {"<"}
        Back
      </Typography>
      <Box>
        <TableComponent
          columns={tableColumns}
          tHeadBgColor="bg-light-gray"
          // showPagination={false}
          tableRows={tableRows}
          showSearchbar={false}
          // showSearchbar={false}
          // showDateFilterBtn
          // showDateFilter
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
  );
};

export default ImagesInfoTable;
