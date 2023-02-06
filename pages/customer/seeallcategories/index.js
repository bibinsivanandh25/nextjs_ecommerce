import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getAllCategory } from "services/customer/seeAll";

const SeeALLCategories = () => {
  const [categoryData, setCaregoryData] = useState([]);
  const { supplierId } = useSelector((state) => state.customer);
  const getCategory = async () => {
    const { data } = await getAllCategory(supplierId);
    if (data) {
      setCaregoryData(data);
    }
  };
  useEffect(() => {
    getCategory();
  }, []);
  const [hover, setHover] = useState(null);
  const [seeMorehover, setseeMoreHover] = useState(null);
  const [expandObj, setExpandObj] = useState(null);
  const router = useRouter();

  const viewSingleCategory = () => {
    return (
      <Box
        className="mt-3 border-orange border-bottom pb-4"
        key={expandObj.mainCategoryId}
      >
        <Typography className="color-orange fw-bold">
          {expandObj.mainCategoryName}
        </Typography>
        <Grid container spacing={1}>
          {expandObj.categorySetList.map((valTwo) => {
            return (
              <Grid item md={12} className="mt-2" key={valTwo.setId}>
                <Grid container columnSpacing={1}>
                  <Grid item md={2}>
                    <Image src={valTwo.setImageUrl} height={150} width={150} />
                  </Grid>
                  <Grid item md={10}>
                    <Typography className="fs-14 fw-bold">
                      {valTwo.setName}
                    </Typography>

                    <div
                      style={{
                        maxHeight: "40vh",
                        flexWrap: "wrap",
                        maxWidth: "100%",
                        overflowX: "auto",
                      }}
                      className="d-flex flex-column"
                    >
                      {valTwo.subCategoryLists.map((valThree) => {
                        return (
                          <div
                            className="d-inline cursor-pointer"
                            style={{ width: "150px" }}
                          >
                            <Typography
                              onMouseOver={() => {
                                setHover(valThree.subCategoryId);
                              }}
                              onMouseOut={() => {
                                setHover(null);
                              }}
                              className={`h-5 text-truncate cursor-pointer ${
                                hover === valThree.subCategoryId
                                  ? "text-decoration-underline"
                                  : ""
                              }
                                      `}
                              onClick={() => {
                                router.push({
                                  pathname: "productvariation",
                                  query: {
                                    subCategoryId: valThree.subCategoryId,
                                  },
                                });
                              }}
                            >
                              {valThree.subCategoryName}
                            </Typography>
                          </div>
                        );
                      })}

                      <div className="d-inline">
                        <Typography
                          onMouseOver={() => {
                            setseeMoreHover(valTwo.setId);
                          }}
                          onMouseOut={() => {
                            setseeMoreHover(null);
                          }}
                          className={`h-5 text-center  text-truncate color-orange cursor-pointer ${
                            seeMorehover === valTwo.setId
                              ? "text-decoration-underline"
                              : ""
                          }
                                      `}
                          onClick={() => {
                            setExpandObj(null);
                          }}
                        >
                          See Less
                        </Typography>
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    );
  };

  const returnAllCategories = () => {
    return (
      <>
        {categoryData.map((val) => {
          return (
            <Box
              className="mt-3 border-orange border-bottom pb-4"
              key={val.mainCategoryId}
            >
              <Typography className="color-orange fw-bold">
                {val.mainCategoryName}
              </Typography>
              <Grid container spacing={1}>
                {val.categorySetList.map((valTwo) => {
                  return (
                    <Grid
                      item
                      md={4}
                      lg={4}
                      xl={3}
                      className="mt-2"
                      key={valTwo.setId}
                    >
                      <Grid container columnSpacing={1}>
                        <Grid item md={4} xl={3}>
                          <Image
                            src={valTwo.setImageUrl}
                            height={500}
                            width={500}
                          />
                        </Grid>
                        <Grid item md={8} xl={9}>
                          <Typography className="fs-14 fw-bold">
                            {valTwo.setName}
                          </Typography>

                          <div
                            style={{
                              height: "100px",
                              flexWrap: "wrap",
                            }}
                            className="d-flex flex-column"
                          >
                            {valTwo.subCategoryLists.map((valThree, ind) => {
                              if (ind > 14) return null;
                              return (
                                <div className="d-inline cursor-pointer">
                                  <Typography
                                    onMouseOver={() => {
                                      setHover(valThree.subCategoryId);
                                    }}
                                    onMouseOut={() => {
                                      setHover(null);
                                    }}
                                    className={`h-5 text-truncate cursor-pointer ${
                                      hover === valThree.subCategoryId
                                        ? "text-decoration-underline"
                                        : ""
                                    }
                                      `}
                                    onClick={() => {
                                      router.push({
                                        pathname: "productvariation",
                                        query: {
                                          subCategoryId: valThree.subCategoryId,
                                        },
                                      });
                                    }}
                                  >
                                    {valThree.subCategoryName}
                                  </Typography>
                                </div>
                              );
                            })}
                          </div>
                          {valTwo.subCategoryLists.length > 14 && (
                            <div className="d-inline">
                              <Typography
                                onMouseOver={() => {
                                  setseeMoreHover(valTwo.setId);
                                }}
                                onMouseOut={() => {
                                  setseeMoreHover(null);
                                }}
                                sx={{
                                  textAlign: "end",
                                }}
                                className={`h-5 px-4 text-truncate color-orange cursor-pointer ${
                                  seeMorehover === valTwo.setId
                                    ? "text-decoration-underline"
                                    : ""
                                }
                                      `}
                                onClick={() => {
                                  const temp = { ...val };
                                  temp.categorySetList = [{ ...valTwo }];
                                  setExpandObj({ ...temp });
                                }}
                              >
                                See More
                              </Typography>
                            </div>
                          )}
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

  return (
    <Box>
      {expandObj === null ? returnAllCategories() : viewSingleCategory()}
    </Box>
  );
};

export default SeeALLCategories;
