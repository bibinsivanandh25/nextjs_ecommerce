/* eslint-disable no-shadow */
import React, { useState } from "react";

const ImageZoom = ({
  height,
  width,
  src,
  magnifierHeight = 120,
  magnifieWidth = 120,
  largeImageHeight = 500,
  largeImageWidth = 600,
}) => {
  const [[x, y], setXY] = useState([0, 0]);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const [showMagnifier, setShowMagnifier] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          position: "relative",
          height,
          width,
          border: "1px solid gray",
        }}
      >
        <img
          src={src}
          style={{
            height,
            width: "100%",
            padding: "5px",
            objectFit: "cover",
            cursor: "crosshair",
          }}
          onMouseEnter={() => {
            const fx = largeImageWidth / magnifieWidth;
            const fy = largeImageHeight / magnifierHeight;
            setSize([fx, fy]);
            setShowMagnifier(true);
          }}
          onMouseMove={(e) => {
            // update cursor position
            const elem = e.currentTarget;
            const { top, left, width, height } = elem.getBoundingClientRect();
            // calculate cursor position on the image
            let X = e.clientX - left - magnifieWidth / 2;
            let Y = e.clientY - top - magnifierHeight / 2;
            const minx = 0;
            const miny = 0;
            const maxx = width - magnifieWidth;
            const maxy = height - magnifierHeight;
            if (X <= minx) {
              X = minx;
            } else if (X >= maxx) {
              X = maxx;
            }
            if (Y <= miny) {
              Y = miny;
            } else if (Y >= maxy) {
              Y = maxy;
            }
            setXY([X, Y]);
          }}
          onMouseLeave={() => {
            // close magnifier
            setShowMagnifier(false);
          }}
          alt="img"
        />

        <div
          id="lens"
          style={{
            display: showMagnifier ? "" : "none",
            position: "absolute",
            // prevent magnifier blocks the mousemove event of img
            pointerEvents: "none",
            // set size of magnifier
            height: `${magnifierHeight}px`,
            width: `${magnifieWidth}px`,
            // move element center to cursor pos
            top: `${y}px`,
            left: `${x}px`,
            opacity: "0.5", // reduce opacity so you can verify position
            border: "1px solid gray",
            backgroundColor: "white",
            objectFit: "cover",
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          border: "1px solid gray",
          height: largeImageHeight,
          width: largeImageWidth,
          display: showMagnifier ? "" : "none",
          backgroundImage: `url('${src}')`,
          backgroundRepeat: "no-repeat",
          //   calculate zoomed image size
          backgroundSize: `${width * imgWidth}px ${height * imgHeight}px`,
          // //   calculate position of zoomed image.
          backgroundPosition: `${-x * imgWidth}px ${-y * imgHeight}px`,
          top: 0,
          left: width + 15,
          overflow: "auto",
          zIndex: 1000,
          backgroundColor: "#fff",
        }}
      />
    </div>
  );
};

export default ImageZoom;
