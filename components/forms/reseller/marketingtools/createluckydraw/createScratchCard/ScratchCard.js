import React from "react";
import ScratchCard from "react-scratchcard-v2";

const ScratchCardComponent = ({ children }) => {
  const settings = {
    width: 320,
    height: 240,
    image:
      "data:image/jpeg;base64,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",
    finishPercent: 70,
    onComplete: () => {},
  };
  return <ScratchCard {...settings}>{children}</ScratchCard>;
};
export default ScratchCardComponent;
