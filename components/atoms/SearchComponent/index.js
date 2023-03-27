import { useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Box } from "@mui/material";
import InputBox from "../InputBoxComponent";

const SearchComponent = ({
  placeholder = "",
  fullWidth = false,
  inputClassName = "",
  showSearchBtn = true,
  className = "",
  onSearchTextChange = () => {}, // works only when showSearchBtn is false
  handleBtnSearch = () => {}, // works only when showSearchBtn is true
  onchangeVal = () => {},
  searchButtonClassname = "",
}) => {
  const [searchText, setSearchText] = useState("");
  return (
    <Box className={`d-flex align-items-center ${className}`}>
      <InputBox
        size="small"
        placeholder={placeholder}
        fullWidth={fullWidth}
        className={inputClassName}
        value={searchText}
        onInputChange={(e) => {
          setSearchText(e.target.value);
          // eslint-disable-next-line no-unused-expressions
          !showSearchBtn && onSearchTextChange(e.target.value);
          onchangeVal(e.target.value); // only for orderscreen
        }}
        onKeyDown={(e) => {
          if (!showSearchBtn && e.key === "Enter") {
            handleBtnSearch(searchText);
          }
        }}
      />
      {showSearchBtn ? (
        <Box
          className="bg-orange d-flex justify-content-center align-items-center rounded cursor-pointer rounded ms-2"
          onClick={() => {
            handleBtnSearch(searchText);
          }}
        >
          <SearchOutlinedIcon
            className={`text-white p-1 fs-1 ${searchButtonClassname}`}
          />
        </Box>
      ) : null}
    </Box>
  );
};
export default SearchComponent;
