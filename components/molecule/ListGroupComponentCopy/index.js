/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-param-reassign */
import { Grid, Tooltip, Typography } from "@mui/material";
// import Image from "next/image";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import RadiobuttonComponent from "components/atoms/RadiobuttonComponent";
import CheckBoxComponent from "components/atoms/CheckboxComponent";
import CustomIcon from "services/iconUtils";
import SwitchComponent from "@/atoms/SwitchComponent";

const ListGroupComponentCopy = ({
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
  handleDelete = () => {},
  addBtnClick = () => {},
  editBtnClick = () => {},
  handleSwitchToggle = () => {},
  showSwitchComponent = false,
  showDeleteButton = false,
}) => {
  const [list, setList] = useState([]);

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
    onSelectionChange(temp.filter((ele) => ele.isSelected));
  };

  return (
    <div className="w-100 border border-bottom-0">
      {showTitle ? (
        <Grid container className="w-100 bg-gray-1 p-2">
          <Grid item xs={8}>
            <Tooltip title={title}>
              <Typography className={`${titleClassName} text-truncate`}>
                {title}
              </Typography>
            </Tooltip>
          </Grid>
          <Grid item xs={4} display="flex" justifyContent="center">
            {showAddIcon ? (
              <AddIcon
                className="color-orange cursor-pointer"
                onClick={addBtnClick}
              />
            ) : null}
            {showEditIcon ? (
              <EditIcon
                className="fs-20 ms-1 cursor-pointer"
                onClick={editBtnClick}
              />
            ) : null}
          </Grid>
        </Grid>
      ) : null}
      <div className="mxh-200 overflow-y-scroll hide-scrollbar bg-light-grey">
        {list.map((item, index) => (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events
          <div
            className={`${
              showSwitchComponent || showDeleteButton
                ? "justify-content-between"
                : ""
            } border-bottom d-flex`}
            key={index}
          >
            {showRadioBtn ? (
              <RadiobuttonComponent
                id={id}
                isChecked={item.isSelected}
                muiProps={{ size: "small", className: "p-0 ps-3" }}
                disabled={item?.isdisabled}
                onRadioChange={() => {
                  handleItemClick(index, !item.isSelected);
                }}
              />
            ) : null}
            {showCheckBox ? (
              <CheckBoxComponent
                isChecked={item.isSelected}
                disabled={item?.isdisabled}
                className="pe-0 ps-3"
                checkBoxClick={() => {
                  handleItemClick(index, !item.isSelected);
                }}
              />
            ) : null}

            <Grid container>
              <Grid item xs={8}>
                <Tooltip title={item.label}>
                  <Typography
                    onClick={() => {
                      handleItemClick(index, !item.isSelected);
                    }}
                    className={`text-truncate ${labelClassName} ${
                      !showRadioBtn && !showCheckBox && item.isSelected
                        ? "color-orange"
                        : ""
                    }`}
                  >
                    {item.label}
                  </Typography>
                </Tooltip>
              </Grid>
              <Grid
                item
                xs={4}
                className="align-items-center"
                display="flex"
                justifyContent="center"
              >
                {showSwitchComponent ? (
                  <SwitchComponent
                    defaultChecked={item.disable}
                    ontoggle={() => {
                      handleSwitchToggle(item);
                    }}
                    label=""
                  />
                ) : null}
                {showDeleteButton ? (
                  <CustomIcon
                    onIconClick={() => {
                      handleDelete(item);
                    }}
                    type="delete"
                  />
                ) : null}
              </Grid>
            </Grid>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ListGroupComponentCopy;

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
