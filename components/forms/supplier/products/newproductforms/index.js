import { Box, Grid, Paper } from "@mui/material";
import ImageCard from "components/atoms/ImageCard";
import { useState } from "react";

const tabsData = [
  {
    title: "Inventory",
    component: null,
    active: true,
  },
  {
    title: "Pricing & Weight",
    component: null,
    active: false,
  },
  {
    title: "Linked",
    component: null,
    active: false,
  },
  {
    title: "Product Policies",
    component: null,
    active: false,
  },
  {
    title: "Grouped products",
    component: null,
    active: false,
  },
  {
    title: "Variation",
    component: null,
    active: false,
  },
  {
    title: "Attributes",
    component: null,
    active: false,
  },
];

const ProductsLayout = ({}) => {
  const [imagedata, setImageData] = useState([]);
  const [tabsList, setTabsList] = useState([...tabsData]);
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
  return (
    <Box className="d-flex flex-grow-1 flex-row">
      <Box className="border-end p-3 overflow-y-scroll mxh-80vh">
        {imagedata.length > 0
          ? imagedata.map((item, index) => (
              <ImageCard
                imgSrc={item}
                handleCloseClick={() => {
                  setImageData((prev) => {
                    const temp = [...prev];
                    temp.splice(index);
                    return [...temp];
                  });
                }}
              />
            ))
          : null}
        {imagedata.length < 5 ? (
          <ImageCard
            showClose={false}
            handleImageUpload={async (e) => {
              if (e.target.files.length) {
                const file = await getBase64(e.target.files[0]);
                setImageData((prev) => {
                  return [...prev, file];
                });
              }
            }}
          />
        ) : null}
      </Box>
      <Box className="border-end p-3 w-30p">main form</Box>
      <Box className="border-end d-flex  flex-grow-1">
        <Box className="w-30p p-2">
          <Grid container className="">
            {tabsList.map((item, index) => {
              return (
                <Grid
                  item
                  md={12}
                  className={`cursor-pointer text-center py-1 rounded my-1 fs-14 ${
                    item.active ? "bg-orange color-white" : "bg-light-gray"
                  }`}
                  onClick={() => {
                    console.log("asdfasdasd");
                    const temp = [...tabsList];
                    temp.forEach((ele) => {
                      ele.active = false;
                    });
                    temp[index].active = true;
                    setTabsList([...temp]);
                  }}
                >
                  {item.title}
                </Grid>
              );
            })}
          </Grid>
        </Box>
        <Box className="d-flex  flex-grow-1 ">
          {tabsList.filter((item) => (item.active ? item.component : null))}
        </Box>
      </Box>
    </Box>
  );
};
export default ProductsLayout;
