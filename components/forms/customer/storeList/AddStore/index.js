/* eslint-disable no-unused-vars */
import InputBox from "@/atoms/InputBoxComponent";
import { Autocomplete, Box, TextField } from "@mui/material";
import { useState } from "react";
import { createFilterOptions } from "@mui/material/Autocomplete";
import ButtonComponent from "@/atoms/ButtonComponent";

const filter = createFilterOptions();
const AddStore = () => {
  const [formData, setFormData] = useState({
    storeCode: "",
    storeListName: null,
  });
  const [options, setOptions] = useState([
    { title: "Amadeus", year: 1984 },
    { title: "To Kill a Mockingbird", year: 1962 },
    { title: "Toy Story 3", year: 2010 },
    { title: "Logan", year: 2017 },
    { title: "Full Metal Jacket", year: 1987 },
    { title: "Dangal", year: 2016 },
    { title: "The Sting", year: 1973 },
    { title: "2001: A Space Odyssey", year: 1968 },
    { title: "Singin' in the Rain", year: 1952 },
  ]);

  const handleSubmit = () => {};

  return (
    <Box className="w-100 p-2 py-4">
      <InputBox
        label="Store Code"
        value={formData.storeCode}
        onInputChange={(e) => {
          setFormData((pre) => ({ ...pre, storeCode: e.target.value }));
        }}
      />
      <Autocomplete
        className="mt-3"
        value={formData.storeListName}
        onChange={(event, newValue) => {
          if (typeof newValue === "string") {
            setFormData((pre) => ({ ...pre, storeListName: newValue }));
          } else if (newValue && newValue.inputValue) {
            setFormData((pre) => ({
              ...pre,
              storeListName: newValue.inputValue,
            }));
          } else {
            setFormData((pre) => ({ ...pre, storeListName: newValue }));
          }
        }}
        filterOptions={(option, params) => {
          const filtered = filter(option, params);

          const { inputValue } = params;
          // Suggest the creation of a new value
          const isExisting = options.some((opt) => inputValue === opt.title);
          if (inputValue !== "" && !isExisting) {
            filtered.push({
              inputValue,
              title: `Add "${inputValue}"`,
            });
          }

          return filtered;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        id="free-solo-with-text-demo"
        options={options}
        getOptionLabel={(option) => {
          if (typeof option === "string") {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.title;
        }}
        renderOption={(props, option) => <li {...props}>{option.title}</li>}
        freeSolo
        fullWidth
        renderInput={(params) => (
          <TextField {...params} fullWidth label="Store List" />
        )}
        size="small"
      />
      <Box className="d-flex justify-content-center w-100 mt-3">
        <ButtonComponent label="submit" onBtnClick={handleSubmit} />
      </Box>
    </Box>
  );
};
export default AddStore;
