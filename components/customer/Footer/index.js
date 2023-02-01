/* eslint-disable react/no-array-index-key */
import { Box, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const Footer = ({ open = false }) => {
  const { supplieremailId, suppliermobileNumber } = useSelector(
    (state) => state.customer
  );
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
        { lable: "Articles", route: "/customer/article" },
        { lable: "Publication" },
        { lable: "News" },
      ],
    },
    {
      title: "About us",
      items: [
        {
          lable: `Email: ${supplieremailId}`,
        },
        {
          lable: `Contact us: ${suppliermobileNumber}`,
        },
      ],
    },
  ];

  const route = useRouter();
  const useStyles = makeStyles({
    underlineClass: {
      "&:hover": {
        textDecoration: "underline",
      },
    },
  });
  const classes = useStyles();

  return (
    <div
      style={{
        position: "relative",
        left: "-40px",
        width: open ? "calc(100vw - 225px)" : "100vw",
        bottom: "10px",
        marginTop: "20px",
        transition: "all 0.2s ease-out",
        WebkitTransition: "all 0.2s ease-out",
      }}
    >
      <Box className="w-100 d-flex p-5 py-4" style={{ background: "#212121" }}>
        <Grid container>
          {list.map((item, index) => (
            <Grid item md={3} lg={2.5} key={index}>
              <Box className="d-flex flex-column" key={index}>
                <Typography className="h-4 color-white mb-3">
                  {item.title}
                </Typography>
                {item.items.map((ele, ind) => (
                  <Typography
                    className={`h-5 color-white mb-1 cursor-pointer d-inline ${classes.underlineClass}`}
                    key={ind}
                    onClick={() => {
                      if (ele?.route) route.push(ele.route);
                    }}
                  >
                    {ele.lable}
                  </Typography>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box
        style={{ background: "#3E3E3E", width: "100%", height: "5vh" }}
        className="d-flex justify-content-center align-items-center"
      >
        <Typography className="text-white fs-12 d-inline">
          © Multestore
        </Typography>
      </Box>
    </div>
  );
};
export default Footer;
