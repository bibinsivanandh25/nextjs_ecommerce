const ChatBubbleSvg = ({
  fill = "#e56700",
  width = 85,
  height = 57,
  className = "",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    className={className}
    height={height}
    viewBox="0 0 68.786 68.787"
  >
    <g
      id="Icon_ionic-md-chatbubbles"
      data-name="Icon ionic-md-chatbubbles"
      transform="translate(-3.375 -3.375)"
    >
      <path
        id="Path_208"
        data-name="Path 208"
        d="M17.4,45.643c-3.34,0-7.408-4.068-7.408-7.408V11.25H8.4a5.046,5.046,0,0,0-5.027,5.027v45.24l9.673-9.59H48.615a5.107,5.107,0,0,0,5.027-5.109V45.643Z"
        transform="translate(0 10.644)"
        fill={fill}
        className={className}
      />
      <path
        id="Path_209"
        data-name="Path 209"
        d="M60.023,3.375H13.857A5.787,5.787,0,0,0,8.086,9.146V46.532a5.8,5.8,0,0,0,5.771,5.787H53.244l12.55,8.764V9.146A5.787,5.787,0,0,0,60.023,3.375Z"
        transform="translate(6.368)"
        fill={fill}
        className={className}
      />
    </g>
  </svg>
);

export default ChatBubbleSvg;
