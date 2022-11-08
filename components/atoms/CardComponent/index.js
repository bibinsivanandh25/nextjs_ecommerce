/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Box } from "@mui/material";

const CardComponent = ({
  children,
  boxColor = "#ff00a2",
  bottomShadow = "5px",
  className,
  onCardClick = () => {},
  isSelected = false,
}) => {
  // const [click, setClick] = useState(isSelected);
  return (
    <Box
      style={{
        border: `1px solid ${boxColor}`,
        boxShadow: isSelected ? `${boxColor} 0px ${bottomShadow}` : "",
        borderRadius: "5px",
        transition: "0.3s ease-in-out",
        backgroundColor: "#fcfcfc",
      }}
      onClick={() => {
        // setClick(!click);
        onCardClick();
      }}
      className={`${className} cursor-pointer`}
    >
      {children}
    </Box>
  );
};

export default CardComponent;
