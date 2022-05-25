import { Delete } from "@mui/icons-material";
import Edit from "@mui/icons-material/Edit";
import { useState } from "react";

const { Box } = require("@mui/material");
const ButtonTabsList = ({
  className = "w-100",
  activeTab = 0,
  tabsList = [],
  getActiveTab = () => {},
  showEditDelete = false,
}) => {
  const [showEditDeleteIcon, setShowEditDeleteIcon] = useState(false);
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
              setShowEditDeleteIcon(true);
              getActiveTab(index);
            }}
          >
            <div
              className={
                showEditDelete && showEditDeleteIcon
                  ? "d-flex justify-content-between"
                  : ""
              }
            >
              <div className={"d-flex justify-content-center  w-100"}>
                {item.title}
              </div>
              {activeTab === index ? (
                <div className={`position-absolute end-0 top-2`}>
                  <Edit className="fs-14" />
                  <Delete className="fs-14" />
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