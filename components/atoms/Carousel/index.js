import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function CarousalComponent({
  onChange = () => {},
  onClickItem = () => {},
  autoPlay = true,
  interval = 4000,
  stopOnHover = true,
  dynamicHeight = true,
  carouselImageMaxHeight = "55vh",
  carouselImageMinHeight = "55vh",
  carouselImageMinWidth = "100%",
  showIndicators = true,
  list = [],
}) {
  return (
    <Carousel
      showArrows={false}
      onChange={onChange}
      onClickItem={onClickItem}
      autoPlay={autoPlay}
      dynamicHeight={dynamicHeight}
      infiniteLoop
      interval={interval}
      showThumbs={false}
      showStatus={false}
      stopOnHover={stopOnHover}
      showIndicators={showIndicators}
    >
      {list.length > 0
        ? list.map((value) => {
            return (
              <div style={{ cursor: "pointer" }}>
                <img
                  src={value.src}
                  alt=""
                  style={{
                    maxHeight: carouselImageMaxHeight,
                    minHeight: carouselImageMinHeight,
                    minWidth: carouselImageMinWidth,
                  }}
                />
              </div>
            );
          })
        : null}
    </Carousel>
  );
}

export default CarousalComponent;
