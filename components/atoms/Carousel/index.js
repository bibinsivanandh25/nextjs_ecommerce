import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { assetsJson } from "public/assets";
const items = [
  {
    src: "https://cdn.pixabay.com/photo/2017/11/29/13/28/a-discount-2986181_960_720.jpg",
    altText: "Slide 1",
    // caption: "Slide 1",
  },
  {
    src: "https://cdn.pixabay.com/photo/2019/10/25/11/07/halloween-4576779_960_720.png",
    // altText: "Slide 2",
    // caption: "Slide 2",
  },
  {
    src: "https://cdn.pixabay.com/photo/2018/12/09/11/24/sale-3864704_960_720.jpg",
    // altText: "Slide 3",
    // caption: "Slide 3",
  },
];

function CarousalComponent({
  onChange = () => {},
  onClickItem = () => {},
  autoPlay = true,
  interval = 2000,
}) {
  return (
    <Carousel
      showArrows={false}
      onChange={onChange}
      onClickItem={onClickItem}
      autoPlay={autoPlay}
      dynamicHeight={true}
      infiniteLoop={true}
      interval={interval}
      showThumbs={false}
      showStatus={false}
    >
      {items.map((value) => {
        return (
          <div>
            <img src={value.src} alt="" style={{ maxHeight: "50vh" }} />
          </div>
        );
      })}
    </Carousel>
  );
}

export default CarousalComponent;
