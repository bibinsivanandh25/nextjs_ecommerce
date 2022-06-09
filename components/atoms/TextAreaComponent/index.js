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
}) => {
  return (
    <div className={`${widthClassName}`}>
      <div
        className={`d-flex flex-row-reverse py-2 px-1 rounded-top ${
          styles.fieldset
        } ${error && "error-border"}`}
      >
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
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
