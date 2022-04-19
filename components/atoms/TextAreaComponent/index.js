import styled from "@emotion/styled";
import { Description } from "@mui/icons-material";
import { TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { height, width } from "@mui/system";
import ButtonComponent from "../ButtonComponent";
import styles from "./textAreaComponent.module.css";
const TextAreaComponent = ({
    legend ='description',
    onChange=()=>{}

}) => {
  return (
    <div className="w-50 mt-5">
      <div
        className={`d-flex flex-row-reverse py-2 px-1 rounded-top ${styles.fieldset}`}
      >
        <label className={styles.legend}>{legend}</label>
        <ButtonComponent />
      </div>
      <textarea rows={3} className={styles.textarea}
      onChange={onChange}
      />
    </div>
  );
};
export default TextAreaComponent;
