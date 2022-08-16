/* eslint-disable react/no-array-index-key */
import { Box, Grid, Typography } from "@mui/material";

const Footer = () => {
  const list = [
    {
      title: "Products",
      items: [
        {
          lable: "MPLS",
        },
        {
          lable: "Ethernet",
        },
        {
          lable: "Private Line",
        },
        {
          lable: "MPLS",
        },
        {
          lable: "MPLS",
        },
      ],
    },
    {
      title: "About us",
      items: [
        {
          lable: "MPLS",
        },
        {
          lable: "Ethernet",
        },
        {
          lable: "Private Line",
        },
        {
          lable: "MPLS",
        },
      ],
    },
    {
      title: "Markets We Serve",
      items: [
        {
          lable: "MPLS",
        },
        {
          lable: "Ethernet",
        },
        {
          lable: "Private Line",
        },
        {
          lable: "MPLS",
        },
        {
          lable: "MPLS",
        },
      ],
    },
    {
      title: "Blogs",
      items: [
        {
          lable: "MPLS",
        },
        {
          lable: "Ethernet",
        },
        {
          lable: "Private Line",
        },
      ],
    },
  ];

  return (
    <>
      <Box className="w-100 d-flex p-5 py-4" style={{ background: "#212121" }}>
        <Grid container>
          {list.map((item, index) => (
            <Grid item md={3} lg={2.5} key={index}>
              <Box className="d-flex flex-column" key={index}>
                <Typography className="h-4 color-white mb-3">
                  {item.title}
                </Typography>
                {item.items.map((ele, ind) => (
                  <Typography className="h-5 color-white mb-1" key={ind}>
                    {ele.lable}
                  </Typography>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box style={{ background: "#3E3E3E", width: "100%", height: "5vh" }} />
    </>
  );
};
export default Footer;
