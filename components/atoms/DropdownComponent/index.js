import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import  {  useState } from "react";
import Checkbox from "@mui/material/Checkbox";

import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { Box, Chip, Grid } from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const DropdownComponent = (props) => {
  const {
    list = [],
    id = "dropdownid",
    label = "",
    size = "medium",
    fullWidth = true,
    error = false,
    placeholder = "",
    onDropdownSelect = () => {},
    // value = [],
  } = props;

  const [pendingValue, setPendingValue] = useState([]);

  const handleDelete = (deleteId) => {
    const filtered = pendingValue.filter((i) => i.id !== deleteId);
    setPendingValue(filtered);
    onDropdownSelect(filtered);
  };

  return (
    <>
      <Autocomplete
        multiple
        id={id}
        options={list}
        disableCloseOnSelect
        getOptionLabel={(option) => option.label}
        renderOption={(props, option, { selected }) => (
          <Grid {...props} justifyContent="space-between">
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.label}
          </Grid>
        )}
        value={pendingValue}
        onChange={(event, newValue, reason) => {
          if (
            event.type === "keydown" &&
            event.key === "Backspace" &&
            reason === "removeOption"
          ) {
            return;
          }
          setPendingValue(newValue);
          onDropdownSelect(newValue);
        }}
        renderTags={() => null}
        size={size}
        fullWidth={fullWidth}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            error={error}
            helperText={error}
            fullWidth
            InputLabelProps={{ shrink: true }}
            placeholder={placeholder}
          />
        )}
      />
      <Box my={2}>
        {pendingValue.map((item) => (
          <Chip
            label={item.label}
            variant="outlined"
            key={item.label}
            sx={{ m: 0.5 }}
            onDelete={() => handleDelete(item.id)}
          />
        ))}
      </Box>
    </>
  );
};

export default DropdownComponent;
