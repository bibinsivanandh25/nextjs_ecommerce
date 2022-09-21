import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { productImageGuidLines } from "public/assets";
import CustomIcon from "services/iconUtils";

const guidelines = {
  " Image format": [
    "We only accept.JPEG images. Any other format is not accepted.",
    "We accept Images only in RGB color space. We don't accept images in CMYK or any other color space.",
  ],
  "Images below will be rejected": [
    "Graphic/Inverted/ Pixelated image are not accepted.",
    "Images with text/Watermark are not acceptable in primary images.",
    "Blur images and clutter images are not accepted.",
    "Images should not contain price/brand logo for the product.",
    "Product images must not be shrunk, elongated or stretched.",
    "Partial product image is not allowed.",
    "Offensive/Objectionable images/products are not acceptable.",
  ],
};

const restrictedList = [
  {
    label: "Watermark Image",
    img: productImageGuidLines.waterMark,
  },
  {
    label: "Image With Price",
    img: productImageGuidLines.imageWithPrice,
  },
  {
    label: "Inverted Image",
    img: productImageGuidLines.invertedImage,
  },
  {
    label: "Incomplete Image",
    img: productImageGuidLines.incompleteImage,
  },
  {
    label: "Image With Props",
    img: productImageGuidLines.withProps,
  },
  {
    label: "Fake Brands/First Copy",
    img: productImageGuidLines.fakeBrand,
  },
  {
    label: "Pixelated Image",
    img: productImageGuidLines.pixelated,
  },
  {
    label: "Blured Image",
    img: productImageGuidLines.blured,
  },
  {
    label: "Stretched/Shrunk Image",
    img: productImageGuidLines.streched,
  },
  {
    label: "Image with Text",
    img: productImageGuidLines.withText,
  },
];

const ImageGuidelines = () => {
  return (
    <Grid container className="p-1">
      <Grid item md={6} container>
        {Object.keys(guidelines).map((ele) => {
          return (
            <>
              <Grid item md={12}>
                <Typography className="fs-14 fw-bold">{ele}</Typography>
              </Grid>
              <Grid item md={12}>
                <List>
                  {guidelines[ele].map((item) => (
                    <ListItem
                      key={item}
                      disableGutters
                      className="d-flex align-items-start"
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: "auto",
                        }}
                        className="me-2 mt-1"
                      >
                        <CustomIcon type="dot" className="color-orange fs-12" />
                      </ListItemIcon>
                      <Typography className="fs-14">{item}</Typography>
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </>
          );
        })}
      </Grid>
      <Grid item md={6} container spacing={2}>
        <Grid item md={12} className="w-100 d-flex pt-3">
          <Typography className="fs-14 color-red">
            <CustomIcon type="block" className="fs-18 me-2 color-red" />
            Image Types that are Prohibited
          </Typography>
        </Grid>
        {restrictedList.map((item) => (
          <Grid item md={6} xl={3} className="w-100 d-flex">
            <Image
              height={60}
              width={60}
              src={item.img}
              layout="fixed"
              className="shadow rounded"
            />
            <Box className="w-100 ms-2">
              <Typography className="fs-14 fw-600">{item.label}</Typography>
              <Typography className="fs-16">
                <CustomIcon type="block" className="fs-16 me-2 color-red" />
                NOT ALLOWED
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default ImageGuidelines;
