import { ArrowBack, ArrowBackIos, ArrowLeft } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";
import ButtonComponent from "components/atoms/ButtonComponent";
import CheckBoxComponent from "components/atoms/CheckboxComponent";
import ImageCard from "components/atoms/ImageCard";
import InputBox from "components/atoms/InputBoxComponent";
import SimpleDropdownComponent from "components/atoms/SimpleDropdownComponent";
import TextEditor from "components/atoms/TextEditor";
import { assetsJson } from "public/assets";
import { useState } from "react";

const CreateDiscount = ({ setShowCreateDiscount = () => {} }) => {
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
      <span
        className="h-5 color-orange cursor-pointer"
        onClick={() => {
          setShowCreateDiscount(false);
        }}
      >
        {"< "}Back
      </span>
      <Grid container spacing={1} alignItems="center">
        <Grid item sm={2}>
          <SimpleDropdownComponent size="small" label="Margin type" />
        </Grid>
        <Grid item sm={5}>
          <SimpleDropdownComponent size="small" />
        </Grid>
        <Grid item sm={2}>
          <InputBox size="small" placeholder="Enter Discount %" />
        </Grid>
        <Grid
          item
          sm={3}
          className="d-flex align-items-between align-items-center"
        >
          <div>
            <ButtonComponent
              muiProps="me-1 fs-12 py-2 "
              label="Create"
              size="medium"
            />
          </div>
          <div>
            <ButtonComponent
              muiProps="py-2 fs-12"
              size="medium"
              label="View Discount Product"
              variant="outlined"
            />
          </div>
        </Grid>
      </Grid>
      <Typography className="text-danger h-5 fw-bold my-2">
        Discount starts from 5% to 30%
      </Typography>
      <div className="d-flex w-75 justify-content-between mt-2">
        <div className="d-flex align-items-center h-5">
          start date:
          <input
            type="date"
            value={"2021-12-01"}
            style={{
              border: "none",
              outline: "none",
              display: "flex",
              flexDirection: "row-reverse",
            }}
          />
        </div>
        <div className="d-flex align-items-center h-5">
          End Date:
          <input
            type="date"
            value={"2021-12-01"}
            style={{
              border: "none",
              outline: "none",
              display: "flex",
              flexDirection: "row-reverse",
            }}
          />
        </div>
        <div className="d-flex align-items-center h-5">
          Start time:
          <input
            type="time"
            style={{
              border: "none",
              outline: "none",
              display: "flex",
              flexDirection: "row-reverse",
            }}
          />
        </div>
        <div className="d-flex align-items-center h-5">
          End time:
          <input
            type="time"
            style={{
              border: "none",
              outline: "none",
              display: "flex",
              flexDirection: "row-reverse",
            }}
          />
        </div>
      </div>
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
export default CreateDiscount;
