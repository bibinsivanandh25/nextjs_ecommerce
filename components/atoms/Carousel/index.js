import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
const items = [
  {
    src: "https://img.freepik.com/free-photo/front-view-cyber-monday-shopping-cart-with-bags-copy-space_23-2148657638.jpg?t=st=1652684330~exp=1652684930~hmac=2120a68ea587be22dc154a616865cfb21e67264ede09272e6eaa6dac18beb505&w=826",
    altText: "Slide 1",
    // caption: "Slide 1",
  },
  {
    src: "https://image.shutterstock.com/image-vector/web-development-coding-cross-platform-600w-1128653108.jpg",
    // altText: "Slide 2",
    // caption: "Slide 2",
  },
  {
    src: "https://image.shutterstock.com/image-vector/creation-responsive-internet-website-multiple-600w-1199480788.jpg",
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
