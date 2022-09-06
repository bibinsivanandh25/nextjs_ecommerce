import { Box, Grid, Paper, Typography } from "@mui/material";
import TableComponent from "components/atoms/TableComponent";
import { format } from "date-fns";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import CustomIcon from "services/iconUtils";
import { getTableData } from "services/supplier/MrMrsCartProducts";

const MrMrsCartProducts = () => {
  const [tableRows, setTableRows] = useState([]);
  const [pageNumber, setpageNumber] = useState(0);
  const columns = [
    {
      label: "Image",
      id: "col1",
      isFilter: false,
    },
    {
      label: "Product Type",
      id: "col2",
    },
    {
      label: "Product ID",
      id: "col3",
    },
    {
      label: "Name",
      isFilter: false,
      id: "col4",
    },
    {
      label: "SKU",
      id: "col5",
    },
    {
      label: "Size",
      id: "col6",
      isFilter: false,
    },
    {
      label: "Listing Price",
      isFilter: false,
      id: "col7",
    },
    {
      label: "MRP Price",
      id: "col8",
      isFilter: false,
    },
    {
      label: "Stock",
      isFilter: false,
      id: "col9",
    },
    {
      label: "Status",
      id: "col10",
      isFilter: false,
    },
    {
      label: "Update & Date",
      id: "col11",
      isFilter: false,
    },
    {
      label: "Action",
      id: "col12",
      isFilter: false,
    },
  ];
  const filterList = [
    { label: "All", id: "0", value: "ALL" },
    { label: "Name", id: "0", value: "PRODUCT_TITLE" },
    { label: "SKU", id: "0", value: "SKU" },
    { label: "MRP", id: "0", value: "MRP" },
    { label: "Listing Price", id: "0", value: "LISTING_PRICE" },
  ];

  const mapRowsToTable = (data) => {
    const result = [];
    data.forEach((row) => {
      row.productVariations.forEach((ele) => {
        result.push({
          col1: ele?.variationMedia.length ? (
            <div>
              <Image src={ele.variationMedia[0]} width={40} height={40} />
            </div>
          ) : null,
          col2: row.productType.split("_").join(" "),
          col3: ele.productVariationId,
          col4: ele.productTitle,
          col5: ele.skuId,
          col6: "",
          col7: ele.salePrice,
          col8: ele.mrp,
          col9: ele.stockStatus,
          col10: ele.status,
          col11: format(new Date(ele.lastUpdatedAt), "dd-MM-yyyy HH:mm"),
          col12: (
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <CustomIcon type="view" title="View" />
              </Grid>
              <Grid item xs={4}>
                <CustomIcon type="filecopy" title="Copy" />
              </Grid>
            </Grid>
          ),
        });
      });
    });
    return result;
  };

  const getData = async (
    filterStatus = "ALL",
    keyword = "",
    pageIndex = pageNumber
  ) => {
    const { data, err } = await getTableData(filterStatus, keyword, pageIndex);
    if (!err && data) {
      if (pageIndex === 0) {
        setTableRows(mapRowsToTable(data.data));
        setpageNumber((pre) => pre + 1);
      } else {
        setpageNumber((pre) => pre + 1);
        setTableRows((pre) => [...pre, ...mapRowsToTable(data.data)]);
      }
    }
  };
  useEffect(() => {
    if (columns.length) getData();
    return () => {
      setTableRows([]);
    };
  }, []);

  return (
    <Paper
      sx={{ height: "100%" }}
      className="mnh-80vh overflow-auto hide-scrollbar mxh-80"
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        borderBottom="1px solid lightgray"
        py={2}
        px={4}
        fontSize={16}
      >
        MrMrsCart Product List
      </Typography>
      <Box p={2}>
        <Paper sx={{ px: 0, py: 2 }}>
          <TableComponent
            columns={columns}
            tableRows={tableRows}
            table_heading={`Total Products ${tableRows.length}`}
            showCheckbox={false}
            filterList={filterList}
            handlePageEnd={(
              searchText = "",
              filterText = "ALL",
              page = pageNumber
            ) => {
              getData(filterText.toUpperCase(), searchText, page);
            }}
            handleRowsPerPageChange={() => {
              setpageNumber(0);
            }}
          />
        </Paper>
      </Box>
    </Paper>
  );
};

export default MrMrsCartProducts;
