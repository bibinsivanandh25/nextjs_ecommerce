import React, { useState, useEffect } from "react";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { Typography } from "@mui/material";

const PlusMinusButtonComponent = ({
  className = "",
  countClassName = "",
  value = 1,
  getCount = () => {},
  maxValue,
}) => {
  const [count, setCount] = useState(1);

  useEffect(() => {
    setCount(value);
  }, [value]);
  return (
    <div className="d-flex align-items-center">
      <RemoveCircleOutlineOutlinedIcon
        className={`cursor-pointer ${className}`}
        onClick={() => {
          if (count > 1) getCount("SUB", count);
          // eslint-disable-next-line no-shadow
          // setCount((count) => {
          //   // eslint-disable-next-line no-param-reassign
          //   count -= 1;
          //   return count;
          // });
        }}
      />
      <Typography className={`py-0 border mx-1 ${countClassName}`}>
        {count}
      </Typography>
      <AddCircleOutlineOutlinedIcon
        className={`cursor-pointer ${className}`}
        onClick={() => {
          if (count <= maxValue) {
            getCount("ADD", count);
          }
          // eslint-disable-next-line no-shadow
          // setCount((count) => {
          //   // eslint-disable-next-line no-param-reassign
          //   count += 1;
          //   return count;
          // });
        }}
      />
    </div>
  );
};

export default PlusMinusButtonComponent;
