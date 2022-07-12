import { Box, Grid, Tooltip, Typography } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";

const categories = [
  {
    id: 1,
    categorrName: "Apparel & Clothing",
    sets: [
      {
        _id: 1,
        setName: "Common Clothing",
        setImage:
          "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
        setSubcategories: [
          "Bodysuit",
          "Baby Apparel Gift Set",
          "Clothing Set",
          "Capris",
          "Camisoles",
          "Coats",
          "Clothing Fabric",
          "Corset",
          "Dungarees",
          "Harem Pants",
          "Jeans",
          "Jumpsuit",
        ],
      },
      {
        _id: 2,
        setName: "Common Clothing",
        setImage:
          "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
        setSubcategories: [
          "Bodysuit",
          "Baby Apparel Gift Set",
          "Clothing Set",
          "Capris",
          "Camisoles",
          "Coats",
          "Clothing Fabric",
          "Corset",
          "Dungarees",
          "Harem Pants",
          "Jeans",
          "Jumpsuit",
        ],
      },
      {
        _id: 3,
        setName: "Common Clothing",
        setImage:
          "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
        setSubcategories: [
          "Bodysuit",
          "Baby Apparel Gift Set",
          "Clothing Set",
          "Capris",
          "Camisoles",
          "Coats",
          "Clothing Fabric Clothing Fabric Clothing Fabric Clothing Fabric",
          "Corset",
          "Dungarees",
          "Harem Pants",
          "Jeans",
          "Jumpsuit",
        ],
      },
    ],
  },
  {
    id: 2,
    categorrName: "Apparel & Clothing",
    sets: [
      {
        _id: 1,
        setName: "Common Clothing",
        setImage:
          "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
        setSubcategories: [
          "Bodysuit",
          "Baby Apparel Gift Set",
          "Clothing Set",
          "Capris",
          "Camisoles",
          "Coats",
          "Clothing Fabric",
          "Corset",
          "Dungarees",
          "Harem Pants",
          "Jeans",
          "Jumpsuit",
        ],
      },
      {
        _id: 1,
        setName: "Common Clothing",
        setImage:
          "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
        setSubcategories: [
          "Bodysuit",
          "Baby Apparel Gift Set",
          "Clothing Set",
          "Capris",
          "Camisoles",
          "Coats",
          "Clothing Fabric",
          "Corset",
          "Dungarees",
          "Harem Pants",
          "Jeans",
          "Jumpsuit",
        ],
      },
      {
        _id: 1,
        setName: "Common Clothing",
        setImage:
          "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
        setSubcategories: [
          "Bodysuit",
          "Baby Apparel Gift Set",
          "Clothing Set",
          "Capris",
          "Camisoles",
          "Coats",
          "Clothing Fabric",
          "Corset",
          "Dungarees",
          "Harem Pants",
          "Jeans",
          "Jumpsuit",
        ],
      },
      {
        _id: 1,
        setName: "Common Clothing",
        setImage:
          "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
        setSubcategories: [
          "Bodysuit",
          "Baby Apparel Gift Set",
          "Clothing Set",
          "Capris",
          "Camisoles",
          "Coats",
          "Clothing Fabric",
          "Corset",
          "Dungarees",
          "Harem Pants",
          "Jeans",
          "Jumpsuit",
        ],
      },
      {
        _id: 1,
        setName: "Common Clothing",
        setImage:
          "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
        setSubcategories: [
          "Bodysuit",
          "Baby Apparel Gift Set",
          "Clothing Set",
          "Capris",
          "Camisoles",
          "Coats",
          "Clothing Fabric",
          "Corset",
          "Dungarees",
          "Harem Pants",
          "Jeans",
          "Jumpsuit",
        ],
      },
    ],
  },
  {
    id: 3,
    categorrName: "Apparel & Clothing",
    sets: [
      {
        _id: 1,
        setName: "Common Clothing",
        setImage:
          "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
        setSubcategories: [
          "Bodysuit",
          "Baby Apparel Gift Set",
          "Clothing Set",
          "Capris",
          "Camisoles",
          "Coats",
          "Clothing Fabric",
          "Jumpsuit",
        ],
      },
    ],
  },
  {
    id: 4,
    categorrName: "Apparel & Clothing",
    sets: [
      {
        _id: 1,
        setName: "Common Clothing",
        setImage:
          "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
        setSubcategories: [
          "Bodysuit",
          "Baby Apparel Gift Set",
          "Clothing Set",
          "Capris",
          "Camisoles",
          "Coats",
          "Clothing Fabric",
          "Corset",
          "Dungarees",
          "Harem Pants",
          "Jeans",
        ],
      },
    ],
  },
];

const returnAllCategories = () => {
  return (
    <>
      {categories.map((val) => {
        return (
          <Box className="mt-3 border-orange border-bottom pb-4">
            <Typography className="color-orange fw-bold">
              {val.categorrName}
            </Typography>
            <Grid container spacing={1}>
              {val.sets.map((valTwo) => {
                return (
                  <Grid item xs={4} className="mt-2">
                    <Grid container columnSpacing={1}>
                      <Grid item xs={4}>
                        <Image src={valTwo.setImage} height="150" width="150" />
                      </Grid>
                      <Grid item xs={8}>
                        <Typography className="fs-14 fw-bold">
                          {valTwo.setName}
                        </Typography>
                        <Grid container className="pt-1" spacing={1}>
                          {valTwo.setSubcategories.map((valThree) => {
                            const [hover, setHover] = useState(false);
                            return (
                              <Grid item xs={4}>
                                {valThree.length <= 16 ? (
                                  <Typography
                                    onMouseOver={() => {
                                      setHover(true);
                                    }}
                                    onMouseOut={() => {
                                      setHover(false);
                                    }}
                                    className={`fs-12 text-truncate cursor-pointer ${
                                      hover ? "text-decoration-underline" : ""
                                    }
                                      `}
                                  >
                                    {valThree}
                                  </Typography>
                                ) : (
                                  <Tooltip title={valThree} placement="top">
                                    <Typography
                                      onMouseOver={() => {
                                        setHover(true);
                                      }}
                                      onMouseOut={() => {
                                        setHover(false);
                                      }}
                                      className={`fs-12 text-truncate cursor-pointer ${
                                        hover ? "text-decoration-underline" : ""
                                      }
                                      `}
                                    >
                                      {valThree}
                                    </Typography>
                                  </Tooltip>
                                )}
                              </Grid>
                            );
                          })}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        );
      })}
    </>
  );
};

const SeeALLCategories = () => {
  return <Box>{returnAllCategories()}</Box>;
};

export default SeeALLCategories;
