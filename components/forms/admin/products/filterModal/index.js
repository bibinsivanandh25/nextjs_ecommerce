/* eslint-disable no-nested-ternary */
import CheckBoxComponent from "@/atoms/CheckboxComponent";
import ModalComponent from "@/atoms/ModalComponent";
import {
  Box,
  CircularProgress,
  Grid,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import {
  getBrands,
  getMainCategories,
  getProductTitles,
  getSubCategories,
} from "services/admin/products";

const FilterModal = ({
  showModal = false,
  setShowModal = () => {},
  getFilteredValues = () => {},
  status = "",
}) => {
  const [categories, setCategories] = useState(null);
  const [subcategories, setSubcategories] = useState(null);
  const [products, setproducts] = useState(null);
  const [brands, SetBrands] = useState(null);
  const [categoryIds, setCategoryIds] = useState([]);
  const [subCategoryIds, setSubCategoryIds] = useState([]);
  const [brandNames, setBrandNames] = useState([]);
  const [productVariationIds, setproductVariationIds] = useState([]);

  const mainCategories = () => {
    return getMainCategories("ZERO_COMMISSION").then((res) => {
      return { categories: res?.data };
    });
  };
  const subCategories = (ids) => {
    return getSubCategories("ZERO_COMMISSION", ids ?? categoryIds).then(
      (res) => {
        return { subCategories: res?.data };
      }
    );
  };
  const productTitles = (categoryId, subCategoryId, brandsName) => {
    const payload = {
      categoryIds: categoryId ?? [...categoryIds] ?? [],
      subCategoryIds: subCategoryId ?? [...subCategoryIds] ?? [],
      commissionType: "ZERO_COMMISSION",
      status,
      brandNames: brandsName ?? [...brandNames] ?? [],
    };
    return getProductTitles(payload).then((res) => {
      return {
        Products: res?.data,
      };
    });
  };
  const Brands = (catIds, subcatIds) => {
    const payload = {
      categoryIds: catIds ?? [...categoryIds],
      subCategoryIds: subcatIds ?? [...subCategoryIds],
      commissionType: "ZERO_COMMISSION",
      status: "APPROVED",
    };
    return getBrands(payload).then((res) => {
      return {
        brands: res?.data,
      };
    });
  };

  const getAllInitialFilters = () => {
    const promiseArr = [
      mainCategories(),
      subCategories(),
      productTitles(),
      Brands(),
    ];
    Promise.all(promiseArr).then((data) => {
      if (data) {
        setCategories(
          data[0]?.categories?.map((ele) => {
            return {
              ...ele,
              isSelected: false,
            };
          })
        );
        setSubcategories(
          data[1]?.subCategories?.map((ele) => {
            return {
              ...ele,
              isSelected: false,
            };
          })
        );
        setproducts(
          data[2]?.Products?.map((ele) => {
            return {
              ...ele,
              isSelected: false,
            };
          })
        );
        SetBrands(
          data[3]?.brands?.map((ele) => {
            return {
              ...ele,
              isSelected: false,
            };
          })
        );
      }
    });
  };

  useEffect(() => {
    getAllInitialFilters();
  }, []);
  const renderCategoriesList = () => {
    return categories?.map((ele, index) => {
      return (
        <div className="d-flex align-items-center px-2">
          <CheckBoxComponent
            id={ele.id}
            isChecked={ele.isSelected}
            checkBoxClick={() => {
              setSubcategories(null);
              SetBrands(null);
              setproducts(null);
              setSubCategoryIds([]);
              setBrandNames([]);
              setproductVariationIds([]);
              const tempIDs = [];
              const temp = JSON.parse(JSON.stringify(categories));
              temp[index].isSelected = !temp[index].isSelected;
              temp.forEach((item) => {
                if (item.isSelected) {
                  tempIDs.push(item.id);
                }
              });
              setCategories([...temp]);
              setCategoryIds([...tempIDs]);
              const promiseArr = [
                subCategories(tempIDs),
                productTitles(tempIDs),
                Brands(tempIDs),
              ];
              Promise.all(promiseArr).then((data) => {
                if (data) {
                  setSubcategories(
                    data[0]?.subCategories?.map((i) => {
                      return {
                        ...i,
                        isSelected: false,
                      };
                    })
                  );
                  setproducts(
                    data[1]?.Products?.map((i) => {
                      return {
                        ...i,
                        isSelected: false,
                      };
                    })
                  );
                  SetBrands(
                    data[2]?.brands?.map((i) => {
                      return {
                        ...i,
                        isSelected: false,
                      };
                    })
                  );
                }
              });
            }}
          />
          <Tooltip title={ele.name} placement="top">
            <Typography className="h-5 text-truncate">{ele?.name}</Typography>
          </Tooltip>
        </div>
      );
    });
  };
  const renderSubCategoriesList = () => {
    return subcategories?.map((ele, index) => {
      return (
        <div className="d-flex align-items-center px-2">
          <CheckBoxComponent
            isChecked={ele.isSelected}
            id={ele.id}
            checkBoxClick={() => {
              setBrandNames([]);
              setproductVariationIds([]);
              SetBrands(null);
              setproducts(null);
              const tempIDs = [];
              const temp = JSON.parse(JSON.stringify(subcategories));
              temp[index].isSelected = !temp[index].isSelected;
              setSubcategories([...temp]);
              temp.forEach((item) => {
                if (item.isSelected) {
                  tempIDs.push(item.id);
                }
              });
              setSubCategoryIds([...tempIDs]);
              const promiseArr = [
                productTitles(undefined, tempIDs),
                Brands(undefined, tempIDs),
              ];
              Promise.all(promiseArr).then((data) => {
                if (data) {
                  setproducts(
                    data[0]?.Products?.map((i) => {
                      return {
                        ...i,
                        isSelected: false,
                      };
                    })
                  );
                  SetBrands(
                    data[1]?.brands?.map((i) => {
                      return {
                        ...i,
                        isSelected: false,
                      };
                    })
                  );
                }
              });
            }}
          />
          <Tooltip title={ele.name} placement="top">
            <Typography className="h-5 text-truncate">{ele?.name}</Typography>
          </Tooltip>
        </div>
      );
    });
  };
  const renderBrandsList = () => {
    return brands?.map((ele, ind) => {
      return (
        <div className="d-flex align-items-center px-2">
          <CheckBoxComponent
            isChecked={ele.isSelected}
            id={ele.id}
            checkBoxClick={() => {
              setproductVariationIds([]);
              setproducts(null);
              const temp = JSON.parse(JSON.stringify(brands));
              temp[ind].isSelected = !temp[ind].isSelected;
              const brand = [];
              temp.forEach((item) => {
                if (item.isSelected) {
                  brand.push(item.name);
                }
              });
              SetBrands([...temp]);
              setBrandNames([...brand]);
              productTitles(undefined, undefined, brand).then((data) => {
                if (data) {
                  setproducts(
                    data?.Products?.map((i) => {
                      return {
                        ...i,
                        isSelected: false,
                      };
                    })
                  );
                }
              });
            }}
          />
          <Tooltip title={ele.name} placement="top">
            <Typography className="h-5 text-truncate">{ele?.name}</Typography>
          </Tooltip>
        </div>
      );
    });
  };
  const renderProductsList = () => {
    return products?.map((ele, index) => {
      return (
        <div className="d-flex align-items-center px-2">
          <CheckBoxComponent
            isChecked={ele.isSelected}
            id={ele.id}
            checkBoxClick={() => {
              const tempIDs = [];
              const temp = JSON.parse(JSON.stringify(products));
              temp[index].isSelected = !temp[index].isSelected;
              temp.forEach((item) => {
                if (item.isSelected) {
                  tempIDs.push(item.id);
                }
              });
              setproductVariationIds([...tempIDs]);
              setproducts([...temp]);
            }}
          />
          <Tooltip title={ele.name} placement="top">
            <Typography className="h-5 text-truncate">{ele?.name}</Typography>
          </Tooltip>
        </div>
      );
    });
  };

  return (
    <ModalComponent
      ModalTitle=""
      showHeader={false}
      titleClassName="color-orange"
      open={showModal}
      saveBtnText="Apply"
      ClearBtnText="Cancel"
      ModalWidth="85%"
      footerClassName="d-flex justify-content-start flex-row-reverse"
      clearBtnClassName="mx-3"
      onSaveBtnClick={() => {
        setShowModal(false);
        getFilteredValues(
          categoryIds,
          subCategoryIds,
          brandNames,
          productVariationIds
        );
      }}
      onClearBtnClick={() => {
        setShowModal(false);
      }}
    >
      <Grid container spacing={3} className="my-1">
        <Grid item sm={2} md={3}>
          <Paper className="h-100">
            <Typography className="bg-light-gray fw-bold h-5 ps-2 py-1">
              Categories
            </Typography>
            <div
              style={{
                maxHeight: "55vh",
                minHeight: "350px",
              }}
              className="overflow-auto"
            >
              {categories !== null ? (
                categories?.length ? (
                  renderCategoriesList()
                ) : (
                  <Box
                    sx={{ minHeight: "350px" }}
                    className="d-flex justify-content-center align-items-center"
                  >
                    <Typography className="h-5 fw-bold">
                      No Data Available
                    </Typography>
                  </Box>
                )
              ) : (
                <Box
                  sx={{ minHeight: "350px" }}
                  className="d-flex justify-content-center align-items-center"
                >
                  <CircularProgress className="color-orange" />
                </Box>
              )}
            </div>
          </Paper>
        </Grid>
        <Grid item sm={2} md={3}>
          <Paper className="h-100">
            <Typography className="bg-light-gray fw-bold h-5 ps-2 py-1">
              Sub Categories
            </Typography>
            <div
              style={{
                maxHeight: "55vh",
                minHeight: "350px",
              }}
              className="overflow-auto "
            >
              {subcategories !== null ? (
                subcategories?.length ? (
                  renderSubCategoriesList()
                ) : (
                  <Box
                    sx={{ minHeight: "350px" }}
                    className="d-flex justify-content-center align-items-center"
                  >
                    <Typography className="h-5 fw-bold">
                      No Data Available
                    </Typography>
                  </Box>
                )
              ) : (
                <Box
                  sx={{ minHeight: "350px" }}
                  className="d-flex justify-content-center align-items-center"
                >
                  <CircularProgress className="color-orange" />
                </Box>
              )}
            </div>
          </Paper>
        </Grid>
        <Grid item sm={2} md={3}>
          <Paper className="h-100">
            <Typography className="bg-light-gray fw-bold h-5 ps-2 py-1">
              Brands
            </Typography>
            <div
              style={{
                maxHeight: "55vh",
                minHeight: "350px",
              }}
              className="overflow-auto "
            >
              {brands !== null ? (
                brands?.length ? (
                  renderBrandsList()
                ) : (
                  <Box
                    sx={{ minHeight: "350px" }}
                    className="d-flex justify-content-center align-items-center"
                  >
                    <Typography className="h-5 fw-bold">
                      No Data Available
                    </Typography>
                  </Box>
                )
              ) : (
                <Box
                  sx={{ minHeight: "350px" }}
                  className="d-flex justify-content-center align-items-center"
                >
                  <CircularProgress className="color-orange" />
                </Box>
              )}
            </div>
          </Paper>
        </Grid>
        <Grid item sm={2} md={3}>
          <Paper className="h-100">
            <Typography className="bg-light-gray fw-bold h-5 ps-2 py-1">
              Products
            </Typography>
            <div
              style={{
                maxHeight: "55vh",
                minHeight: "350px",
              }}
              className="overflow-auto "
            >
              {products !== null ? (
                products?.length ? (
                  renderProductsList()
                ) : (
                  <Box
                    sx={{ minHeight: "350px" }}
                    className="d-flex justify-content-center align-items-center"
                  >
                    <Typography className="h-5 fw-bold">
                      No Data Available
                    </Typography>
                  </Box>
                )
              ) : (
                <Box
                  sx={{ minHeight: "350px" }}
                  className="d-flex justify-content-center align-items-center"
                >
                  <CircularProgress className="color-orange" />
                </Box>
              )}
            </div>
          </Paper>
        </Grid>
      </Grid>
    </ModalComponent>
  );
};
export default FilterModal;
