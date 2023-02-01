/* eslint-disable react/no-array-index-key */
import { Delete, Edit } from "@mui/icons-material";
import { Box, Tooltip } from "@mui/material";

const ButtonTabsList = ({
  className = "w-100",
  activeTab = 0,
  tabsList = [],
  getActiveTab = () => {},
  showEditDelete = false,
  onEditClick = () => {},
  onDeleteClick = () => {},
  deleteBtnName = "",
  editBtnName = "",
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
              getActiveTab(index, item);
            }}
          >
            <div className="d-flex justify-content-between cursor-pointer">
              <div className="d-flex justify-content-center cursor-pointer w-100">
                {item.title}
              </div>
              {showEditDelete && activeTab === index ? (
                <div className="position-absolute end-0 top-2">
                  <Tooltip title={editBtnName}>
                    <Edit
                      className="fs-14 cursor-pointer"
                      onClick={() => onEditClick(item)}
                    />
                  </Tooltip>
                  <Tooltip title={deleteBtnName}>
                    <Delete
                      className="fs-14 cursor-pointer"
                      onClick={() => onDeleteClick(item)}
                    />
                  </Tooltip>
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
