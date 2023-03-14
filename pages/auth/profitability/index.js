import {
  Grid,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
} from "@mui/material";
import { assetsJson } from "public/assets";
import { useEffect, useState } from "react";
import { getAllCategory } from "services/admin/products/productCategories/assignVariation";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InputBox from "@/atoms/InputBoxComponent";
import CustomIcon from "services/iconUtils";

const Profitability = () => {
  const [category, setCategory] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const getCategory = async () => {
    const { data, err } = await getAllCategory();
    console.log({ data, err });
    if (data) {
      setCategory(
        data.map((item) => {
          return {
            ...item,
            subCategoryList: [
              {
                subCatName: "sub-cat 1",
                desc: "Incididunt tempor irure laboris quis dolorIncididunt tempor irure laboris quis dolor.",
                open: true,
              },
              {
                subCatName: "sub-cat 3",
                desc: "Incididunt tempor irure laboris quis dolor.",
                open: true,
              },
              {
                subCatName: "sub-cat 3",
                desc: "Incididunt tempor irure laboris quis dolor.",
                open: true,
              },
              {
                subCatName: "sub-cat 4",
                desc: "Incididunt tempor irure laboris quis dolor.",
                open: true,
              },
              {
                subCatName: "sub-cat 5",
                desc: "Incididunt tempor irure laboris quis dolor.",
                open: true,
              },
              {
                subCatName: "sub-cat 6",
                desc: "Incididunt tempor irure laboris quis dolor.",
                open: true,
              },
            ],
            open: false,
          };
        })
      );
    }
  };
  useEffect(() => {
    getCategory();
  }, []);

  const handleChange = (categoryInd, subCategoryInd = null) => {
    const copy = JSON.parse(JSON.stringify(category));
    copy[categoryInd].open = !copy[categoryInd].open;
    setCategory(copy);
  };

  return (
    // <div
    //   className="d-flex justify-content-center align-items-center"
    //   style={{
    //     backgroundImage: `url(${assetsJson.login_background})`,
    //     backgroundSize: "cover",
    //     backgroundPosition: "center",
    //     width: "100vw",
    //     height: "100vh",
    //   }}
    // >
    //   <Paper sx={{ width: "90vw", height: "90vh" }}>
    //     <div>Profitability</div>
    //   </Paper>
    // </div>
    <Grid container spacing={2} className="">
      <Grid item sm={12} className="mt-2">
        <div
          className={` mx-2 d-flex flex-column justify-content-center align-items-center`}
          style={{
            borderRadius: "15px",
            backgroundImage: `url(${assetsJson.login_background})`,
            backgroundSize: "cover",
            height: "160px",
          }}
        >
          <div
            style={{
              borderRadius: "15px",
              background: "rgba(0, 0, 0, 0.3)",
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography variant="h3" className="color-orange text-center">
              Know Your Profit
            </Typography>
            <Box className="w-50 mx-auto mt-2">
              <Typography className=" text-center h-5">
                Pariatur dolor Lorem quis enim non in officia eiusmod. Velit
                anim velit ad ex quis cillum velit non culpa duis. Exercitation
                Lorem officia nostrud culpa ea velit consequat consectetur culpa
                deserunt incididunt. Amet ad sunt laborum sit incididunt dolore
                incididunt quis cupidatat sit pariatur aute consequat.
              </Typography>
            </Box>
          </div>
        </div>
      </Grid>
      <Grid item container sm={12} spacing={2}>
        <Grid item md={showForm ? 8 : 12}>
          <div className="mx-2">
            <div className="d-flex mx-2 justify-content-between">
              <Typography className="h-3 mb-4">Referral Fees Table</Typography>
              {!showForm && (
                <Typography
                  onClick={() => {
                    setShowForm(true);
                  }}
                  className="cursor-pointer text-decoration-underline color-light-blue fs-16"
                >
                  Calculate Your Profit Here
                </Typography>
              )}
            </div>
            <div className="w-90p d-flex justify-content-between">
              <Typography className="fs-18 fw-600 ms-2">Category</Typography>
              <Typography className="fs-18 fw-600 ms-2">
                Referral Fee Percentage
              </Typography>
            </div>
            <div
              className="overflow-y-scroll"
              style={{
                maxHeight: "500px",
              }}
            >
              {category.length &&
                category.map((item, index) => {
                  return (
                    <Accordion
                      expanded={item.open}
                      onClick={() => {
                        handleChange(index);
                      }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                      >
                        <Typography sx={{ width: "33%", flexShrink: 0 }}>
                          {item.mainCategoryName}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails className="">
                        {item.subCategoryList.map((ele) => (
                          <div className="border-bottom">
                            <div className="d-flex p-2 justify-content-between w-90p">
                              <Typography
                                sx={{
                                  width: "33%",
                                  flexShrink: 0,
                                  textAlign: "center",
                                }}
                              >
                                {ele.subCatName}
                              </Typography>
                              <Typography
                                sx={{
                                  width: "33%",
                                  flexShrink: 0,
                                  textAlign: "center",
                                }}
                              >
                                {ele.desc}
                              </Typography>
                            </div>
                          </div>
                        ))}
                      </AccordionDetails>
                    </Accordion>
                  );
                })}
            </div>
          </div>
        </Grid>
        {showForm && (
          <Grid item md={4}>
            <Paper className="p-3 mt-5">
              <div className="d-flex py-3 justify-content-between">
                <Typography className="fs-16 mb-2">
                  Calculate Your Profit Here
                </Typography>
                <CustomIcon
                  title="close"
                  type="close"
                  onIconClick={() => {
                    setShowForm(false);
                  }}
                  className="mt-n4"
                />
              </div>

              <Grid spacing={2} container>
                <Grid item md={12}>
                  <InputBox label="Referral Fee" />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default Profitability;
