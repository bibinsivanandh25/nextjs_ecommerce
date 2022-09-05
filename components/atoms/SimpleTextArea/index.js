import { FormHelperText } from "@mui/material";
import styles from "./simpleTextArea.module.css";

const TextArea = ({
  placeholder = "Description",
  rows = 4,
  onInputChange = () => {},
  error = false,
  helperText = "",
  value = "",
}) => {
  return (
    <>
      <textarea
        value={value}
        placeholder={placeholder}
        rows={rows}
        className={`w-100 textarea1  px-2 ${
          !error ? styles.border : styles.errorborder
        } `}
        onChange={onInputChange}
      />
      {error && (
        <FormHelperText error={error} className="ps-3">
          {helperText}
        </FormHelperText>
      )}
    </>
  );
};
export default TextArea;
