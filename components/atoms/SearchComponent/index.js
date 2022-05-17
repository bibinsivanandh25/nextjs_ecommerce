import { Box } from "@mui/material";
import InputBox from "../InputBoxComponent";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useState } from "react";

const SearchComponent = ({
  placeholder = "",
  fullWidth = false,
  inputClassName = "",
  showSearchBtn = true,
  className = "",
  onSearchTextChange = () => {}, // works only when showSearchBtn is false
  handleBtnSearch = () => {}, // works only when showSearchBtn is true
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
          !showSearchBtn ? onSearchTextChange(e.target.value) : null;
        }}
      />
      {showSearchBtn ? (
        <Box
          className="bg-orange d-flex justify-content-center align-items-center rounded cursor-pointer rounded ms-2"
          onClick={() => {
            handleBtnSearch(searchText);
          }}
        >
          <SearchOutlinedIcon className="text-white p-1 fs-1" />
        </Box>
      ) : null}
    </Box>
  );
};
export default SearchComponent;
