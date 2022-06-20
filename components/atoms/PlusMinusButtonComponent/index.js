import React, { useState } from "react";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import styles from "./PlusMinusButtonComponent.module.css";

const PlusMinusButtonComponent = () => {
  const [count, setCount] = useState(1);
  return (
    <div className={`${styles.divStyle}`}>
      <RemoveCircleOutlineOutlinedIcon
        className="cursor-pointer"
        fontSize="small"
        onClick={() => {
          if (count > 1)
            // eslint-disable-next-line no-shadow
            setCount((count) => {
              // eslint-disable-next-line no-param-reassign
              count -= 1;
              return count;
            });
        }}
      />{" "}
      {count}{" "}
      <AddCircleOutlineOutlinedIcon
        className="cursor-pointer"
        fontSize="small"
        onClick={() => {
          // eslint-disable-next-line no-shadow
          setCount((count) => {
            // eslint-disable-next-line no-param-reassign
            count += 1;
            return count;
          });
        }}
      />
    </div>
  );
};

export default PlusMinusButtonComponent;
