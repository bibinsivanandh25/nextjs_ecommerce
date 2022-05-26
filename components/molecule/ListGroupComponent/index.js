import { Typography } from "@mui/material";
import Image from "next/image";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import RadiobuttonComponent from "components/atoms/RadiobuttonComponent";
import CheckBoxComponent from "components/atoms/CheckboxComponent";

const ListGroupComponent = ({
  data = [],
  showTitle = true,
  title = "Title",
  titleClassName = "",
  showAddIcon = true,
  showEditIcon = true,
  labelClassName = "m-2",
  showRadioBtn = false,
  showCheckBox = false,
  id = "",
  onSelectionChange = () => {},
  addBtnClick = () => {},
  editBtnClick = () => {},
}) => {
  const [list, setList] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    setList([...data]);
  }, [data]);

  const handleItemClick = (index, val) => {
    const temp = [...list];
    if (showCheckBox) {
      temp[index].isSelected = val;
    } else {
      temp.forEach((item) => {
        item.isSelected = false;
      });
      temp[index].isSelected = val;
    }
    setList([...temp]);
  };

  useEffect(() => {
    if (list.length) {
      setSelectedItems(() => {
        const temp = list.filter((item) => {
          return item.isSelected;
        });
        return temp;
      });
    }
  }, [list]);
  useEffect(() => {
    onSelectionChange([...selectedItems]);
  }, [selectedItems]);

  return (
    <div className="w-100 border border-bottom-0">
      {showTitle ? (
        <div className="w-100 bg-gray-1 d-flex justify-content-between p-2 align-items-center">
          <Typography className={`${titleClassName}`}>{title}</Typography>
          <div>
            {showAddIcon ? (
              <AddIcon className="color-orange" onClick={addBtnClick} />
            ) : null}
            {showEditIcon ? (
              <EditIcon className="fs-20 ms-1" onClick={editBtnClick} />
            ) : null}
          </div>
        </div>
      ) : null}
      <div className="mxh-200 overflow-y-scroll hide-scrollbar">
        {list.map((item, index) => (
          <div
            className="border-bottom d-flex "
            onClick={() => {
              handleItemClick(index, !item.isSelected);
            }}
            key={index}
          >
            {showRadioBtn ? (
              <RadiobuttonComponent
                id={id}
                isChecked={item.isSelected}
                muiProps={{ size: "small", className: "p-0 ps-3" }}
                disabled={item?.isdisabled}
              />
            ) : null}
            {showCheckBox ? (
              <CheckBoxComponent
                isChecked={item.isSelected}
                disabled={item?.isdisabled}
                className="pe-0 ps-3"
              />
            ) : null}
            <Typography
              className={`${labelClassName} ${
                !showRadioBtn && !showCheckBox && item.isSelected
                  ? "color-orange fw-bold"
                  : ""
              }`}
            >
              {item.label}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ListGroupComponent;

// const data = [
//   {
//     label: "abc",
//     id: "20",
//     isSelected: true,
//   },
//   {
//     label: "efg",
//     id: "20",
//     isSelected: true,
//   },
// ];
