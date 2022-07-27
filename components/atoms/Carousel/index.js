import { assetsJson } from "public/assets";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const items = [
  {
    src: assetsJson.ecommerceBanner,
    altText: "Slide 1",
    // caption: "Slide 1",
  },
  {
    src: assetsJson.mrmrscartlogo,
    // altText: "Slide 2",
    // caption: "Slide 2",
  },
  {
    src: assetsJson["Printed Dress"],
    // altText: "Slide 3",
    // caption: "Slide 3",
  },
];

function CarousalComponent({
  onChange = () => {},
  onClickItem = () => {},
  autoPlay = true,
  interval = 2000,
  stopOnHover = true,
  dynamicHeight = true,
  images = items,
  carouselImageMaxHeight = "50vh",
  carouselImageMinHeight = "0",
  carouselImageMinWidth = "100%",
  showIndicators = true,
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
      {images &&
        images.map((value) => {
          return (
            <div>
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
        })}
    </Carousel>
  );
}

export default CarousalComponent;
