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
}) => {
  return (
    <div className={`${widthClassName}`}>
      <div
        className={`d-flex flex-row-reverse py-2 px-1 rounded-top ${styles.fieldset}`}
      >
        <label className={`${styles.legend} fs-14`}>{legend}</label>
        <ButtonComponent
          label={btnLabel}
          variant={btnVariant}
          size={btnSize}
          onBtnClick={onBtnClick}
          muiProps={muiProps}
        />
      </div>
      <textarea rows={rows} className={styles.textarea} onChange={onChange} />
    </div>
  );
};
export default TextAreaComponent;
