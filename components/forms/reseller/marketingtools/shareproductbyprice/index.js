import { Grid, Typography } from "@mui/material";
import ButtonComponent from "components/atoms/ButtonComponent";
import CheckBoxComponent from "components/atoms/CheckboxComponent";
import ImageCard from "components/atoms/ImageCard";
import InputBox from "components/atoms/InputBoxComponent";
import SimpleDropdownComponent from "components/atoms/SimpleDropdownComponent";
import TextEditor from "components/atoms/TextEditor";
import ListGroupComponent from "components/molecule/ListGroupComponent";
import { assetsJson } from "public/assets";
import { useState } from "react";

const CreatePriceCatalog = ({ setShowCreatePage = () => {}, btnText = "" }) => {
  const [showListGroup, setShowListGroup] = useState(false);
  let ProductsDetails = [
    {
      id: 1,
      title: "Sarree",
      image: assetsJson["Printed Dress"],
      discount: "25% Margin",
      isSelected: false,
    },
    {
      id: 2,
      title: "Sarree",
      image: assetsJson["Printed Dress"],
      discount: "25% Margin",
      isSelected: false,
    },
    {
      id: 3,
      title: "Sarree",
      image: assetsJson["Printed Dress"],
      discount: "25% Margin",
      isSelected: false,
    },
    {
      id: 4,
      title: "Sarree",
      image: assetsJson["Printed Dress"],
      discount: "25% Margin",
      isSelected: false,
    },
    {
      id: 5,
      title: "Sarree",
      image: assetsJson["Printed Dress"],
      discount: "25% Margin",
      isSelected: false,
    },
    {
      id: 6,
      title: "Sarree",
      image: assetsJson["Printed Dress"],
      discount: "25% Margin",
      isSelected: false,
    },
    {
      id: 7,
      title: "Sarree",
      image: assetsJson["Printed Dress"],
      discount: "25% Margin",
      isSelected: false,
    },
    {
      id: 8,
      title: "Sarree",
      image: assetsJson["Printed Dress"],
      discount: "25% Margin",
      isSelected: false,
    },
    {
      id: 9,
      title: "Sarree",
      image: assetsJson["Printed Dress"],
      discount: "25% Margin",
      isSelected: false,
    },
    {
      id: 10,
      title: "Sarree",
      image: assetsJson["Printed Dress"],
      discount: "25% Margin",
      isSelected: false,
    },
  ];
  const [Products, setProducts] = useState([...ProductsDetails]);
  const getProducts = () => {
    return Products.map((ele, ind) => {
      return (
        <div key={ind}>
          <ImageCard imgSrc={ele.image} showClose={false} />
          <Typography className="text-center">{ele.title}</Typography>
          <Typography className="text-center color-dark-green h-5 fw-bold">
            {ele.discount}
          </Typography>
          <div className="ms-2">
            <CheckBoxComponent
              isChecked={ele.isSelected}
              id={ele.id}
              checkBoxClick={(id) => {
                let arr = [...Products];
                arr.forEach((item) => {
                  if (item.id == id) {
                    item.isSelected = !item.isSelected;
                  }
                });
                setProducts([...arr]);
              }}
            />
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      <div
        className={
          btnText.toLowerCase() == "view Today's Deal".toLowerCase()
            ? "h-5 text-primary text-end text-decoration-underline"
            : "d-none"
        }
      >
        Guidelines to Create
      </div>
      <span
        className="h-5 color-orange cursor-pointer"
        onClick={() => {
          setShowCreatePage(false);
        }}
      >
        {"< "}Back
      </span>
      <Grid container spacing={1}>
        <Grid item sm={2}>
          <SimpleDropdownComponent size="small" label="Margin type" />
        </Grid>
        <Grid item sm={5} className="d-flex position-relative" container>
          <InputBox
            iconName={!showListGroup ? "arrowDown" : "arrowUp"}
            onIconClick={() => {
              setShowListGroup(!showListGroup);
            }}
          />
          {showListGroup ? (
            <Grid
              item
              container
              sm={12}
              className="position-absolute "
              sx={{
                // zIndex: 100,
                width: "98.5%",
                top: 48,
              }}
            >
              <Grid item sm={4}>
                <ListGroupComponent
                  size="small"
                  showAddIcon={false}
                  showEditIcon={false}
                  showTitle
                  title="Category"
                />
              </Grid>
              <Grid item sm={4}>
                <ListGroupComponent
                  size="small"
                  showAddIcon={false}
                  showEditIcon={false}
                  showTitle
                  title="Set"
                />
              </Grid>
              <Grid item sm={4}>
                <ListGroupComponent
                  size="small"
                  showAddIcon={false}
                  showEditIcon={false}
                  showTitle
                  title="Sub Category"
                />
              </Grid>
            </Grid>
          ) : null}
        </Grid>
        <Grid item sm={2}>
          <InputBox size="small" placeholder="Enter the Amount" />
        </Grid>
        <Grid item sm={3} className="d-flex align-items-between ">
          <div>
            <ButtonComponent
              muiProps="me-1 fs-12 py-2 "
              label="Create"
              size="small"
            />
          </div>
          <div>
            <ButtonComponent
              muiProps="py-2 fs-12"
              size="small"
              label="View Price Catelog"
              variant="outlined"
            />
          </div>
        </Grid>
      </Grid>
      <div className="w-25 my-3">
        <InputBox placeholder="Enter the campaign title" />
      </div>
      <div className="mt-2">
        <TextEditor />
      </div>
      <div className="d-flex justify-content-between">{getProducts()}</div>
    </div>
  );
};
export default CreatePriceCatalog;
