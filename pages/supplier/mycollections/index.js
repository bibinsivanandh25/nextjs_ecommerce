import { Grid, Paper, Typography } from "@mui/material";
import TableComponent from "components/atoms/TableComponent";
import React, { useEffect, useState } from "react";
import { getCollections } from "services/supplier/mycollections";
import Image from "next/image";
import CustomIcon from "services/iconUtils";
import { useUserInfo } from "services/hooks";
import AddFlag from "@/forms/supplier/mycollections/addflag";
import ShareCollection from "@/forms/supplier/mycollections/sharecollections";

const MyCollections = () => {
  const [tableRows, setTableRows] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [masterProduct, setmasterProduct] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const { id } = useUserInfo();

  const filterList = [
    { label: "All", id: 0, value: "ALL" },
    {
      id: 1,
      label: "Brand",
      value: "BRAND",
    },
    {
      id: 2,
      label: "Category",
      value: "CATEGORY",
    },
  ];

  const mapTableData = (data) => {
    const result = [];
    data.forEach((row) => {
      if (row.productType === "VARIABLE_PRODUCT") {
        result.push({
          col1: row.productVariations[0]?.variationMedia?.length ? (
            <Image
              src={row.productVariations[0]?.variationMedia[0]}
              height={50}
              width={50}
            />
          ) : null,
          col2: row.commissionMode,
          // col3: row.productType,
          col4: row.subCategoryName,
          col5: row.masterProductId,
          col6: row.brand,
          col7: row.createdAt.split("T").join(" "),
          col8: (
            <>
              <CustomIcon
                type="flagIcon"
                className={`me-2 fs-20 ${
                  row.productVariations.every((item) => item.flagged)
                    ? "color-orange"
                    : ""
                }`}
                onIconClick={() => {
                  if (row.productVariations.every((item) => item.flagged))
                    return;
                  setmasterProduct(row);
                  setOpenModal(true);
                }}
              />
              <CustomIcon
                type="share"
                className="fs-20"
                onIconClick={() => {
                  setShowShareModal(true);
                }}
              />
            </>
          ),
        });
      }
    });
    return result;
  };

  const getMycollectionData = async (
    page = pageNumber,
    searchText = null,
    filterText = "ALL"
  ) => {
    const { data } = await getCollections(id, page, searchText, filterText);
    if (data) {
      if (page === 0) {
        setTableRows(mapTableData(data));
        setPageNumber(pageNumber + 1);
      } else {
        setTableRows([...tableRows, ...mapTableData(data)]);
        setPageNumber(pageNumber + 1);
      }
    }
  };
  useEffect(() => {
    getMycollectionData(0);
  }, []);

  const columns = [
    {
      label: "Image",
      id: "col1",
      align: "center",
    },

    {
      align: "center",
      data_align: "center",
      label: "Commission Mode",
      id: "col2",
    },

    // {
    //   align: "center",
    //   data_align: "center",
    //   label: "Product Type",
    //   id: "col3",
    // },

    {
      align: "center",
      data_align: "center",
      label: "Category",
      id: "col4",
    },

    {
      align: "center",
      data_align: "center",
      label: "Product Id",
      id: "col5",
    },

    {
      align: "center",
      data_align: "center",
      label: "Brand",
      id: "col6",
    },

    {
      align: "center",
      data_align: "center",
      label: "Created Date & Time",
      id: "col7",
    },
    {
      align: "center",
      data_align: "center",
      label: "Action",
      id: "col8",
    },
  ];

  return (
    <Paper className="mnh-80vh mxh-80vh overflow-auto hide-scrollbar">
      <Grid container>
        <Grid
          container
          item
          xs={12}
          justifyContent="space-between"
          className="border-bottom"
        >
          <Grid item sx={{ p: 2 }}>
            <Typography variant="h6" fontWeight="bold" fontSize={16}>
              My Collections
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ my: 3, px: 2 }}>
          <Paper className="pt-2">
            <TableComponent
              table_heading=""
              columns={columns}
              tableRows={tableRows}
              showCheckbox={false}
              filterList={filterList}
              handlePageEnd={(searchText, filterValue, page = pageNumber) => {
                getMycollectionData(
                  page,
                  searchText,
                  filterValue.toUpperCase()
                );
              }}
            />
          </Paper>
        </Grid>
      </Grid>
      {openModal && (
        <AddFlag
          openModal={openModal}
          setOpenModal={setOpenModal}
          getMycollectionData={getMycollectionData}
          masterProduct={masterProduct}
        />
      )}
      {showShareModal && (
        <ShareCollection
          showShareModal={showShareModal}
          setShowShareModal={setShowShareModal}
        />
      )}
    </Paper>
  );
};

export default MyCollections;
