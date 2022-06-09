import styled from "@emotion/styled";
import { Description } from "@mui/icons-material";
import { TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { height, width } from "@mui/system";
import ButtonComponent from "../ButtonComponent";
import styles from "./textAreaComponent.module.css";
const TextAreaComponent = ({
  legend = "description",
  onChange = () => {},
  onBtnClick = () => {},
  btnLabel = "",
  btnSize = "",
  btnVariant = "",
  widthClassName = "w-50",
  rows = 3,
  muiProps = "",
  name = "",
  value = "",
  error = false,
  helperText = null,
  placeholder = "",
}) => {
  return (
    <div className={`${widthClassName}`}>
      <div
        className={`d-flex flex-row-reverse py-2 px-1 rounded-top ${
          styles.fieldset
        } ${error && "error-border"}`}
      >
        <label className={`${styles.legend} fs-14 ${error && "error-text"}`}>
          {legend}
        </label>
        <ButtonComponent
          label={btnLabel}
          variant={btnVariant}
          size={btnSize}
          onBtnClick={onBtnClick}
          muiProps={muiProps}
        />
      </div>
      <textarea
        rows={rows}
        className={`${styles.textarea} ${error && "error-border"}`}
        onChange={onChange}
        name={name}
        value={value}
        placeholder={placeholder}
      />
      {error && (
        <p className="error" id="textbox-helper-text">
          {helperText}
        </p>
      )}
    </div>
  );
};
export default TextAreaComponent;
