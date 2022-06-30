import React, { useState } from "react";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { Typography } from "@mui/material";

const PlusMinusButtonComponent = ({ className = "", countClassName = "" }) => {
  const [count, setCount] = useState(1);
  return (
    <div className="d-flex align-items-center">
      <RemoveCircleOutlineOutlinedIcon
        className={`cursor-pointer ${className}`}
        onClick={() => {
          if (count > 1)
            // eslint-disable-next-line no-shadow
            setCount((count) => {
              // eslint-disable-next-line no-param-reassign
              count -= 1;
              return count;
            });
        }}
      />
      <Typography className={`py-0 border mx-1 ${countClassName}`}>
        {count}
      </Typography>
      <AddCircleOutlineOutlinedIcon
        className={`cursor-pointer ${className}`}
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
