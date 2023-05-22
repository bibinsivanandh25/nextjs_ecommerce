import { Typography, Box, Menu, MenuItem } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import MenuOption from "@/atoms/MenuOptions";
import TableComponent from "@/atoms/TableComponent";
import ViewProducts from "./ViewProducts";
// import ImagesInfoTable from "./ImagesInfoTable";
// import EditModalForArticles from "./EditModalForArticles";
import RaiseQueryModal from "./RaiseQueryModal";
import { getAllProducts } from "services/admin/media";
import toastify from "services/utils/toastUtils";
import CustomIcon from "services/iconUtils";

const Products = ({}) => {
  const [tableRows, setTableRows] = useState([]);
  //   const [showImageInfoTable, setShowImageInfoTable] = useState(false);
  //   const [openEditModal, setOpenEditModal] = useState(false);
  const [openRaiseQueryModal, setOpenRaiseQueryModal] = useState(false);
  const [showViewProduct, setShowViewProduct] = useState(false);
  const [pageNum, setPageNum] = useState(0);
  const [showMenu, setShowMenu] = useState(null);

  const tableColumns = [
    {
      id: "col1",
      align: "center",
      label: "SL No.",
      data_align: "center",
    },
    { id: "col2", align: "center", label: "Product Id", data_align: "center" },
    {
      id: "col3",
      align: "center",
      label: "Image",
      data_align: "center",
    },
    {
      id: "col4",
      align: "center",
      label: "Supplier ID",
      data_align: "center",
    },
    {
      id: "col5",
      align: "center",
      label: "SEO",
      data_align: "center",
    },
    {
      id: "col6",
      align: "center",
      label: "Subcategory",
      data_align: "center",
    },
    {
      id: "col7",
      align: "center",
      label: "Product Title",
      data_align: "center",
    },
    {
      id: "col8",
      align: "center",
      label: "Image Size",
      data_align: "center",
    },
    {
      id: "col9",
      align: "center",
      label: "Image URL",
      data_align: "center",
    },
    {
      id: "col10",
      align: "center",
      label: "Pixel Ratio",
      data_align: "center",
    },
    {
      id: "col11",
      align: "center",
      label: "Last updated date & time",
      data_align: "center",
    },
    {
      id: "col12",
      align: "center",
      label: "Action",
      data_align: "center",
    },
  ];

  const onClickOfMenuItem = (ele) => {
    if (ele === "Edit") {
      setShowViewProduct(true);
    }

    if (ele === "Raise Query") {
      setOpenRaiseQueryModal(true);
    }
  };

  const options = ["Edit", "Delete", "Raise Query", "Add a Note"];

  const mapData = (data) => {
    return data.map((item, index) => {
      return {
        col1: index + 1,
        col2: item.productVariationId,
        col3: item?.imageUrlList?.length ? (
          <Image src={item.imageUrlList[0]} height={50} width={50} />
        ) : (
          ""
        ),
        col4: item.vendorId,
        col5: item?.seo?.join(", "),
        col6: item.subCategory,
        col7: item.productTitle,
        col8: item.imageSize,
        col9: item.imageUrl,
        col10: item.pixelRatio,
        col11: item.lastUpdatedDate,
        col12: (
          <CustomIcon
            className="fs-6"
            title="More"
            type="more"
            onIconClick={(event) => {
              setShowMenu(event.currentTarget);
            }}
          />
        ),
      };
    });
  };

  const getProducts = async (page = 0, searchText = "") => {
    const { data, err } = await getAllProducts({
      pageNumber: page,
      pageSize: 50,
      keyValue: searchText,
    });
    if (data) {
      if (page === 0) {
        setTableRows(mapData(data));
      } else {
        setTableRows([...tableRows, ...mapData(data)]);
      }
      setPageNum(page + 1);
    } else {
      toastify(err?.response?.data?.message, "error");
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Box>
        <Box className="px-1 pt-2">
          {!showViewProduct ? (
            <>
              <TableComponent
                columns={tableColumns}
                tHeadBgColor="bg-light-gray"
                // showPagination={false}
                tableRows={tableRows}
                showSearchbar={false}
                showDateFilterBtn={false}
                showDateFilter
                handlePageEnd={(searchText, filterText, page = pageNum) => {
                  getProducts(page, searchText);
                }}
                handleRowsPerPageChange={() => {
                  setPageNum(0);
                }}
              />
              <Menu
                id="basic-menu"
                anchorEl={showMenu}
                open={Boolean(showMenu)}
                onClose={() => {
                  setShowMenu(null);
                }}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem
                  onClick={() => {
                    console.log("jfijfiejf");
                  }}
                >
                  <span className="fs-12 ">Edit</span>
                </MenuItem>
                <MenuItem>
                  <span className="fs-12 ">Delete</span>
                </MenuItem>
              </Menu>
            </>
          ) : (
            <ViewProducts setShowViewProduct={setShowViewProduct} />
          )}
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

export default Products;
