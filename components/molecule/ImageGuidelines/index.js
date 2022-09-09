import { Grid, List, ListItem, ListItemIcon, Typography } from "@mui/material";
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

const ImageGuidelines = () => {
  return (
    <Grid container>
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
      <Grid item md={6} container>
        examples
      </Grid>
    </Grid>
  );
};

export default ImageGuidelines;
