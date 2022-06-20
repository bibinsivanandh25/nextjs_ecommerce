import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";

import CustomIcon from "services/iconUtils";
import MenuWithCheckbox from "@/atoms/MenuWithCheckbox";

const listDatas = [
  {
    title: "category",
    datas: [
      {
        id: 1,
        value: "kurtas",
        isChecked: false,
      },
      {
        id: 2,
        value: "sdfsd",
        isChecked: false,
      },
    ],
  },
  {
    title: "Brand",
    datas: [
      {
        id: 1,
        value: "Puma",
        isChecked: false,
      },
      {
        id: 2,
        value: "adidas",
        isChecked: false,
      },
    ],
  },
];
const searchlListData = [
  {
    title: "category",
    datas: [
      {
        id: 1,
        value: "kurtas",
        isChecked: false,
      },
      {
        id: 2,
        value: "sdfsd",
        isChecked: false,
      },
    ],
  },
  {
    title: "Brand",
    datas: [
      {
        id: 1,
        value: "Puma",
        isChecked: false,
      },
      {
        id: 2,
        value: "adidas",
        isChecked: false,
      },
    ],
  },
];
function SearchedProduct() {
  // checkbox data
  const [checkedValue, setCheckedValue] = useState([]);
  const [searchedCheckValue, setSearchedCheckValue] = useState([]);
  const [viewIconClick, setViewIconClick] = useState(false);
  // const [gridViewIconClick, setGridViewIconClick] = useState(true);

  useEffect(() => {
    setCheckedValue(listDatas);
    setSearchedCheckValue(searchlListData);
  }, []);
  // filter checkbox click
  const handleCheckboxsClick = (id, value, title) => {
    const masterData = [...checkedValue];
    masterData.forEach((val) => {
      if (val.title === title) {
        // eslint-disable-next-line array-callback-return
        val.datas.map((item) => {
          if (item.id == id) {
            // eslint-disable-next-line no-param-reassign
            item.isChecked = !item.isChecked;
          }
        });
      }
    });
    setCheckedValue(masterData);
  };
  const handleSearchFilterClick = (id, value, title) => {
    const masterData = [...searchedCheckValue];
    masterData.forEach((val) => {
      if (val.title === title) {
        // eslint-disable-next-line array-callback-return
        val.datas.map((item) => {
          if (item.id == id) {
            // eslint-disable-next-line no-param-reassign
            item.isChecked = !item.isChecked;
          }
        });
      }
    });
    setSearchedCheckValue(masterData);
  };
  return (
    <Box className="body-bg mnh-100vh">
      <Box className="row">
        <Box className="d-flex justify-content-end mt-1">
          <Box
            className={
              viewIconClick
                ? "border align-self-center bg-dark-gray p-1"
                : "border align-self-center p-1 "
            }
          >
            <CustomIcon
              title="RowView"
              type="tablerows"
              className="fs-26"
              onIconClick={() => {
                setViewIconClick(true);
              }}
              showColorOnHover={false}
              color={viewIconClick ? "color-white" : "color-dark-gray"}
            />
          </Box>
          <Box
            className={
              viewIconClick
                ? "border align-self-center p-1"
                : "border align-self-center bg-dark-gray p-1"
            }
          >
            <CustomIcon
              title="GridView"
              type="gridview"
              className="fs-26"
              onIconClick={() => {
                setViewIconClick(false);
              }}
              showColorOnHover={false}
              color={viewIconClick ? "color-dark-gray" : "color-white"}
            />
          </Box>
          <Box>
            <MenuWithCheckbox
              btnText="Sort by"
              listData={checkedValue}
              handleCheckboxClick={(id, value, title) => {
                handleCheckboxsClick(id, value, title);
              }}
              btnClassName="mx-2"
            />
          </Box>
          <Box>
            <MenuWithCheckbox
              btnText="Filters"
              listData={searchedCheckValue}
              handleCheckboxClick={(id, value, title) => {
                handleSearchFilterClick(id, value, title);
              }}
            />
          </Box>
        </Box>
        <Box className="d-flex justify-content-end mt-3 mb-2">
          <p className="text-danger fs-14"> Offer ends in 09h 42min 2sec</p>
        </Box>
      </Box>
    </Box>
  );
}

export default SearchedProduct;
