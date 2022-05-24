const { Box } = require("@mui/material");
const ButtonTabsList = ({
  className = "w-100",
  activeTab = 0,
  tabsList = [],
  getActiveTab = () => {},
}) => {
  return (
    <Box className={`${className}`}>
      {tabsList.map((item, index) => {
        return (
          <Box
            key={index}
            className={`cursor-pointer text-center py-1 rounded my-1 fs-14 ${
              activeTab === index ? "bg-orange color-white" : "bg-light-gray"
            }`}
            onClick={() => {
              getActiveTab(index);
            }}
          >
            {item.title}
          </Box>
        );
      })}
    </Box>
  );
};
export default ButtonTabsList;
