/* eslint-disable react/no-array-index-key */
import { Box } from "@mui/material";
import CustomIcon from "services/iconUtils";

const ButtonTabsList = ({
  className = "w-100",
  activeTab = 0,
  tabsList = [],
  getActiveTab = () => {},
  showEditDelete = false,
}) => {
  return (
    <Box className={`${className}`}>
      {tabsList.map((item, index) => {
        return (
          <Box
            key={index}
            className={`cursor-pointer text-center py-1 rounded my-1 fs-14 position-relative ${
              activeTab === index ? "bg-orange color-white" : "bg-light-gray"
            }`}
            onClick={() => {
              getActiveTab(index);
            }}
          >
            <div className="d-flex justify-content-between">
              <div className="d-flex justify-content-center  w-100">
                {item.title}
              </div>
              {showEditDelete && activeTab === index ? (
                <div className="position-absolute end-0 top-2">
                  <CustomIcon type="edit" className="fs-14" />
                  <CustomIcon type="delete" className="fs-14" />
                </div>
              ) : null}
            </div>
          </Box>
        );
      })}
    </Box>
  );
};
export default ButtonTabsList;
