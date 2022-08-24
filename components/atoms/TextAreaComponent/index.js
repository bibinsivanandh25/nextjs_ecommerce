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
  required = false,
}) => {
  return (
    <div className={`${widthClassName}`}>
      <div
        className={`d-flex flex-row-reverse p-1 rounded-top ${
          styles.fieldset
        } ${error && "error-border"}`}
      >
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label
          className={`${styles.legend} fs-12 ${error && "error-text"}`}
          style={{
            color: error ? "#dd5e5e" : "#444545",
            fontFamily: "inherit",
          }}
        >
          {legend}{" "}
          {required && (
            <span className="color-red fs-16 fw-bolder">* &nbsp;</span>
          )}
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
        style={{
          padding: "5px 10px",
        }}
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
