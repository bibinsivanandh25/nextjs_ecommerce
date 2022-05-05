// import {
//   FormControl,
//   InputLabel,
//   MenuItem,
//   NativeSelect,
//   Select,
// } from "@mui/material";
// import React from "react";
// import { useState } from "react";

// const SelectComponent = (props) => {
//   const {
//     value = null,
//     label = "",
//     // onSelectionChange = () => {},
//     id = "demo-simple-select",
//     size = "medium",
//     list = [],
//     variant = "standard",
//     // disableUnderline = false,
//   } = props;
//   const [age, setAge] = useState();
//   function onSelectionChange(e) {
//     setAge(e.target.value);
//   }
//   return (
//     <FormControl fullWidth>
//       <InputLabel id={`${id}-label`} shrink>
//         "age"
//       </InputLabel>
//       <NativeSelect
//         defaultValue={2021}
//         labelId="demo-simple-select-label"
//         id={id}
//         value={age}
//         label="label"
//         onChange={onSelectionChange}
//         size={size}
//         // renderValue={value !== "" ? undefined : () => "placeholder text"}
//         variant={variant}
//         disableUnderline
//       >
//         {list.map((item) => (
//           <MenuItem value={item.id} name={item.label} key={item.id}>
//             {item.label}
//           </MenuItem>
//         ))}
//       </NativeSelect>
//     </FormControl>
//   );
// };

// export default SelectComponent;
import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";

export default function SelectComponent({
  label = "",
  onSelectionChange = () => {},
  id = "demo-simple-select",
  size = "medium",
  list = [],
  variant = "standard",
  disableUnderline = false,
  defaultValue = "",
}) {
  return (
    // <Box sx={{ minWidth: 120 }}>
    <FormControl>
      <InputLabel variant="standard" htmlFor="uncontrolled-native">
        {label}
      </InputLabel>
      <NativeSelect
        labelId="demo-select-small"
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
