import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";

export default function SelectComponent({
  label = "",
  list = [],
  defaultValue = "",
}) {
  return (
    // <Box sx={{ minWidth: 120 }}>
    <FormControl>
      <NativeSelect
        id="demo-select-small"
        disableUnderline
        defaultValue={defaultValue}
        inputProps={{
          id: "uncontrolled-native",
        }}
      >
        {/* <option value=""></option> */}
        {list.map((item) => (
          <option value={item.id} name={item.label} key={item.id}>
            {item.label}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
    // </Box>
  );
}
