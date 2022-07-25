/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Box } from "@mui/material";
import React, { useState } from "react";

const CardComponent = ({
  children,
  boxColor = "#ff00a2",
  bottomShadow = "5px",
  className,
}) => {
  const [hover, setHover] = useState(false);
  const [click, setClick] = useState(false);
  return (
    <Box
      style={{
        border: `1px solid ${boxColor}`,
        boxShadow: click
          ? `${boxColor} 0px ${bottomShadow}`
          : hover
          ? `${boxColor} 0px ${bottomShadow} , ${boxColor} 0px 5px 10px`
          : "",
        borderRadius: "5px",
        transition: "0.3s ease-in-out",
        backgroundColor: "#fcfcfc",
      }}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        if (!click) {
          setHover(false);
        }
      }}
      onClick={() => {
        setClick(!click);
      }}
      className={className}
    >
      {children}
    </Box>
  );
};

export default CardComponent;
