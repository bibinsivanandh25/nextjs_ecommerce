/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
import { FormHelperText, Grid, Tooltip, Typography } from "@mui/material";
import ButtonComponent from "components/atoms/ButtonComponent";
import CheckBoxComponent from "components/atoms/CheckboxComponent";
import ImageCard from "components/atoms/ImageCard";
import InputBox from "components/atoms/InputBoxComponent";
import TextEditor from "components/atoms/TextEditor";
import ListGroupComponent from "components/molecule/ListGroupComponent";
import validateMessage from "constants/validateMessages";
import { format } from "date-fns";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import {
  getAllMainCategories,
  getProductsBySubCategoryId,
  getSetbyCategories,
  getSubCategorybySets,
} from "services/supplier/marketingtools";
import { createDiscountCoupons } from "services/supplier/marketingtools/creatediscountcoupons";
import toastify from "services/utils/toastUtils";

const CreateDiscount = ({
  setShowCreateDiscount = () => {},
  btnText = "",
  inputLabel = "Enter Discount %",
  showBackBtn = true,
  // showTypography = true,
  showDateAndTime = true,
  // onCreateBtnClick = () => {},
  user = {},
  // onCustomBtnClick = () => {},
  getTableRows = () => {},
  setpageNumber = () => {},
}) => {
  const [showListGroup, setShowListGroup] = useState(false);
  const [error, setError] = useState({});
  const [formValues, setFormValues] = useState({ content: "" });
  const [categoriesList, setCategoriesList] = useState({
    category: [],
    set: [],
    subCategory: [],
  });

  const [categories, setCategories] = useState([]);
  const [sets, setSets] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [defaultDate, setDefaultDate] = useState({
    startdate: "",
    enddate: "",
    starttime: "",
    endtime: "",
  });
  const [selectedCategorys, setSelectedCategory] = useState({
    mainCategoryId: "",
    subCategoryId: "",
  });

  const [productError, setProductError] = useState(false);
  const [Products, setProducts] = useState([]);

  const supplierId = useSelector((state) => state.user.supplierId);

  const getCategories = async () => {
    const { data } = await getAllMainCategories(supplierId);
    if (data) {
      const finalData = [];
      data.forEach((item) => {
        finalData.push({
          id: item.mainCategoryId,
          label: item.mainCategoryName,
          isSelected: false,
          marginType: item.commissionType,
        });
      });
      setCategories(finalData);
    }
  };
  const getSets = async (val) => {
    const { data } = await getSetbyCategories(val?.id);
    if (data) {
      const finalData = [];
      data.forEach((item) => {
        finalData.push({
          id: item.categorySetId,
          label: item.setName,
          isSelected: false,
        });
      });
      setSets([...finalData]);
    }
  };

  const getSubCategories = async (val) => {
    const { data, err } = await getSubCategorybySets(val?.id);
    if (data) {
      const finalData = [];
      data.forEach((item) => {
        finalData.push({
          id: item.subCategoryId,
          label: item.subCategoryName,
          isSelected: false,
        });
      });
      setSubCategories([...finalData]);
    }
    if (err) {
      setSubCategories([]);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const getProducts = async (value) => {
    const { data, err } = await getProductsBySubCategoryId(supplierId, value);
    if (data) {
      const result = [];
      data.forEach((product) => {
        result.push({
          masterProductId: product.masterProductId,
          id: product.productVariationId,
          title: product.productTitle,
          image: product.imageUrl,
          discount: null,
          isSelected: false,
        });
      });
      setProducts([...result]);
    } else {
      setProducts([]);
    }
    if (err) {
      toastify(err?.response?.data?.message, "error");
      setProducts([]);
    }
  };
  useEffect(() => {
    if (categoriesList.subCategory.length) {
      getProducts(selectedCategorys.subCategoryId);
    } else {
      setProducts([]);
    }
  }, [categoriesList]);
  const renderProducts = () => {
    return Products.map((ele, ind) => {
      return (
        <Grid item key={ind} lg={1.2} md={2} sm={3}>
          <ImageCard imgSrc={ele.image} showClose={false} />
          <Tooltip title={ele.title}>
            <Typography className="text-truncate">{ele.title}</Typography>
          </Tooltip>
          <Typography className="text-center color-dark-green h-5 fw-bold">
            {ele.discount}
          </Typography>
          <div className="ms-2">
            <CheckBoxComponent
              isChecked={ele.isSelected}
              id={ele.id}
              checkBoxClick={(id) => {
                const arr = [...Products];
                arr.forEach((item) => {
                  if (item.id == id) {
                    // eslint-disable-next-line no-param-reassign
                    item.isSelected = !item.isSelected;
                  }
                });
                setProducts([...arr]);
              }}
            />
          </div>
        </Grid>
      );
    });
  };
  const getSelectedCategoriesLabels = () => {
    // return `${`${categoriesList.category[0]?.label}   >` ?? ""}
    //   ${`${categoriesList.set[0]?.label}   >` ?? ""}
    //   ${`${categoriesList.subCategory[0]?.label}` ?? ""}`;
    return `${
      categoriesList.category[0]?.label
        ? `${categoriesList.category[0]?.label}  >`
        : ""
    }${
      categoriesList.set[0]?.label ? `${categoriesList.set[0]?.label}  >` : ""
    }${
      categoriesList.subCategory[0]?.label
        ? `${categoriesList.subCategory[0]?.label}  `
        : ""
    }`;
  };
  const addDateTime = (date, time) => {
    const finalStartTime = time.split(":");
    const fromData = new Date(date).setHours(finalStartTime[0]);
    const FromDate = new Date(fromData).setMinutes(finalStartTime[1]);
    return new Date(FromDate);
  };
  const validateForm = () => {
    const errObj = { ...error };
    const validateFields = (id, errField, regex, errMsg) => {
      if (!formValues[id]) {
        errObj[errField || id] = validateMessage.field_required;
      } else if (regex && !regex.test(formValues[id])) {
        errObj[id] = errMsg;
      } else {
        errObj[errField || id] = null;
      }
    };
    validateFields("marginType");
    // validateFields("inputValue");
    validateFields(
      "campaignTitle",
      null,
      /^.{1,25}$/,
      validateMessage.alpha_numeric_25
    );
    if (formValues.inputValue == "" || formValues.inputValue == undefined) {
      errObj.inputValue = validateMessage.field_required;
    } else if (
      !(parseInt(formValues.inputValue, 10) <= 45) ||
      !(parseInt(formValues.inputValue, 10) >= 5)
    ) {
      errObj.inputValue = "Discount Range Should be 5% to 45%.";
    } else {
      errObj.inputValue = null;
    }
    if (!categoriesList.category.length) {
      errObj.categories = validateMessage.field_required;
    } else if (!categoriesList.set.length) {
      errObj.categories = "Set selection is required";
    } else if (!categoriesList.subCategory.length) {
      errObj.categories = "Sub Category selection is required";
    } else {
      errObj.categories = null;
    }

    if (formValues?.content.replace(/<[^>]*>/g, "").length === 0) {
      errObj.content = validateMessage.field_required;
    } else if (formValues.content.replace(/<[^>]*>/g, "").length > 1000) {
      errObj.content = validateMessage.alpha_numeric_max_1000;
    } else {
      errObj.content = null;
    }
    if (showDateAndTime) {
      if (defaultDate.startdate == "") {
        errObj.startdate = validateMessage.field_required;
      } else {
        errObj.startdate = null;
      }
      if (defaultDate.enddate == "") {
        errObj.enddate = validateMessage.field_required;
      } else {
        errObj.enddate = null;
      }
      if (defaultDate.starttime == "") {
        errObj.starttime = validateMessage.field_required;
      } else {
        errObj.starttime = null;
      }
      if (defaultDate.endtime == "") {
        errObj.endtime = validateMessage.field_required;
      } else {
        errObj.endtime = null;
      }

      const startdate = addDateTime(
        defaultDate.startdate,
        defaultDate.starttime
      );
      const enddate = addDateTime(defaultDate.enddate, defaultDate.endtime);
      if (startdate && enddate) {
        if (Date.parse(enddate) < Date.parse(startdate)) {
          errObj.dateError = "Start Date should be Lessthan End Date";
        } else {
          errObj.dateError = null;
        }
      }
    }
    setError(errObj);
    let valid = true;
    Object.values(errObj).forEach((i) => {
      if (i) {
        valid = false;
      }
    });
    return valid;
  };
  const handleCreateBtnClick = async () => {
    const flag = Products.some((val) => val.isSelected);
    setProductError(!flag);
    if (validateForm() && flag) {
      const temp = [];
      Products.forEach((item) => {
        if (item.isSelected == true) {
          temp.push({
            masterProductId: item.masterProductId,
            variationId: item.id,
          });
        }
      });
      const startdate = addDateTime(
        defaultDate.startdate,
        defaultDate.starttime
      );
      const enddate = addDateTime(defaultDate.enddate, defaultDate.endtime);
      // onCreateBtnClick();
      const payload = {
        toolType:
          btnText == "View Discount Product"
            ? "DISCOUNT_COUPON"
            : btnText == "View Today's Deal"
            ? "TODAYS_DEAL"
            : "PRICE_TARGETED",
        startDateTime: showDateAndTime
          ? format(startdate, "MM-dd-yyyy hh:mm:ss")
          : null,
        endDateTime: showDateAndTime
          ? format(enddate, "MM-dd-yyyy hh:mm:ss")
          : null,
        description: formValues.content,
        campaignTitle: formValues.campaignTitle,
        totalDiscountValue: parseInt(formValues.inputValue, 10),
        splitType: "NA",
        couponUsageLimit: 0,
        customerUsageLimit: 0,
        marginType: formValues.marginType,
        mainCategoryId: selectedCategorys.mainCategoryId,
        subCategoryId: selectedCategorys.subCategoryId,
        productCatalogueUrl: "",
        customerType: "EXISTING_CUSTOMER",
        userType: "SUPPLIER",
        userTypeId: user.supplierId,
        marketingToolThemeId: 0,
        marketingToolProductList: temp,
      };
      const { data, err } = await createDiscountCoupons(payload);
      if (data) {
        setpageNumber(0);
        getTableRows(0);
        setShowCreateDiscount(false);
      }
      if (err) {
        toastify(err.response.data.message, "error");
      }
    } else if (Products.length == 0) {
      toastify("Products are Required", "error");
    }
  };
  useEffect(() => {
    if (defaultDate.startdate && defaultDate.starttime) {
      if (btnText == "View Today's Deal") {
        const endDate = new Date(
          new Date(defaultDate.startdate).setDate(
            new Date(defaultDate.startdate).getDate() + 1
          )
        );
        setDefaultDate((pre) => ({
          ...pre,
          enddate: format(endDate, "yyyy-MM-dd"),
          endtime: defaultDate.starttime,
        }));
      }
    }
  }, [defaultDate.startdate, defaultDate.starttime]);
  const ref = useRef(null);
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setShowListGroup(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);
  return (
    <div>
      <div
        className={
          btnText.toLowerCase() == "view Today's Deal".toLowerCase()
            ? "h-5 text-primary text-end text-decoration-underline me-3 "
            : "d-none"
        }
      >
        <span className="cursor-pointer me-5"> Guidelines to Create</span>
      </div>
      {showBackBtn && (
        <span
          className="h-5 color-orange cursor-pointer"
          onClick={() => {
            setShowCreateDiscount(false);
          }}
        >
          {"< "}Back
        </span>
      )}
      <Grid container spacing={1} className="mt-1">
        <Grid item sm={5} className="d-flex position-relative" container>
          <InputBox
            iconName={!showListGroup ? "arrowDown" : "arrowUp"}
            onIconClick={() => {
              setShowListGroup(!showListGroup);
            }}
            error={Boolean(error.categories)}
            helperText={error.categories}
            showAutoCompleteOff="off"
            value={getSelectedCategoriesLabels()}
            placeholder="Select Category"
            inputRef={ref}
          />
          {showListGroup ? (
            <div ref={ref}>
              <Grid
                item
                container
                sm={12}
                className="position-absolute"
                sx={{
                  width: "98.5%",
                  top: 48,
                  left: 10,
                  zIndex: 1000,
                }}
              >
                <>
                  <Grid item sm={4}>
                    <ListGroupComponent
                      size="small"
                      showAddIcon={false}
                      showEditIcon={false}
                      showTitle
                      title="Category"
                      data={categories}
                      onSelectionChange={(val) => {
                        if (val?.length) {
                          setSubCategories([]);
                          setSelectedCategory((pre) => ({
                            ...pre,
                            mainCategoryId: val[0]?.id,
                            subCategoryId: "",
                          }));
                          setFormValues((prev) => {
                            return {
                              ...prev,
                              marginType: val[0]?.marginType,
                            };
                          });
                          setCategoriesList((prev) => {
                            return {
                              ...prev,
                              category: val,
                              subCategory: [],
                              set: [],
                            };
                          });
                          getSets(val[0]);
                        } else {
                          setCategoriesList((prev) => {
                            return {
                              ...prev,
                              category: [],
                              subCategory: [],
                              set: [],
                            };
                          });
                          setProducts([]);
                          setSets([]);
                          setSubCategories([]);
                        }
                      }}
                    />
                  </Grid>
                  <Grid item sm={4}>
                    <ListGroupComponent
                      size="small"
                      showAddIcon={false}
                      showEditIcon={false}
                      showTitle
                      title="Set"
                      data={[...sets]}
                      onSelectionChange={(val) => {
                        if (val?.length) {
                          getSubCategories(val[0]);
                        } else {
                          setSubCategories([]);
                          setProducts([]);
                        }
                        setCategoriesList((prev) => {
                          return {
                            ...prev,
                            set: val,
                            subCategory: [],
                          };
                        });
                      }}
                    />
                  </Grid>
                  <Grid item sm={4}>
                    <ListGroupComponent
                      size="small"
                      showAddIcon={false}
                      showEditIcon={false}
                      showTitle
                      title="Sub Category"
                      data={[...subCategories]}
                      onSelectionChange={(val) => {
                        setSelectedCategory((pre) => ({
                          ...pre,
                          subCategoryId: val[0]?.id,
                        }));
                        // getProducts(val[0]);
                        setCategoriesList((prev) => {
                          return {
                            ...prev,
                            subCategory: val,
                          };
                        });
                      }}
                    />
                  </Grid>
                </>
              </Grid>
            </div>
          ) : null}
        </Grid>
        <Grid item sm={2}>
          <InputBox
            size="small"
            label="Margin type"
            value={formValues.marginType}
            disabled
            error={Boolean(error.marginType)}
            helperText={error.marginType}
          />
        </Grid>
        <Grid item sm={2}>
          <InputBox
            size="small"
            placeholder={inputLabel}
            value={formValues.inputValue}
            onInputChange={(e) =>
              setFormValues((prev) => {
                return {
                  ...prev,
                  inputValue: e.target.value,
                };
              })
            }
            type="number"
            error={Boolean(error.inputValue)}
            helperText={error.inputValue}
          />
        </Grid>
        <Grid item sm={3} className="d-flex align-items-between ">
          <div>
            <ButtonComponent
              muiProps=" fs-12 px-4 py-2"
              label="Create"
              size="medium"
              onBtnClick={handleCreateBtnClick}
            />
          </div>
          <div>
            <ButtonComponent
              muiProps="py-2 fs-12 mx-2"
              size="medium"
              label={btnText}
              variant="outlined"
              onBtnClick={() => {
                setShowCreateDiscount(false);
              }}
            />
          </div>
        </Grid>
      </Grid>
      {/* {showTypography && (
        <Typography className="text-danger h-5 fw-bold my-2">
          Discount starts from 5% to 30%
        </Typography>
      )} */}
      {showDateAndTime && (
        <>
          <div className="d-flex w-75 justify-content-between mt-2">
            <div>
              <div className="d-flex align-items-center h-5">
                Start Date:
                <input
                  type="date"
                  value={defaultDate.startdate}
                  style={{
                    border: "none",
                    outline: "none",
                    display: "flex",
                    flexDirection: "row-reverse",
                  }}
                  onChange={(e) => {
                    setDefaultDate((pre) => ({
                      ...pre,
                      startdate: e.target.value,
                    }));
                  }}
                />
              </div>
              {error.startdate !== "" ? (
                <FormHelperText error>{error.startdate}</FormHelperText>
              ) : null}
            </div>
            <div>
              <div className="d-flex align-items-center h-5">
                End Date:
                <input
                  type="date"
                  value={defaultDate.enddate}
                  style={{
                    border: "none",
                    outline: "none",
                    display: "flex",
                    flexDirection: "row-reverse",
                  }}
                  disabled={btnText === "View Today's Deal"}
                  onChange={(e) => {
                    setDefaultDate((pre) => ({
                      ...pre,
                      enddate: e.target.value,
                    }));
                  }}
                />
              </div>
              {error.enddate !== null ? (
                <FormHelperText error>{error.enddate}</FormHelperText>
              ) : null}
            </div>
            <div>
              <div className="d-flex align-items-center h-5">
                Start time:
                <input
                  type="time"
                  value={defaultDate.starttime}
                  style={{
                    border: "none",
                    outline: "none",
                    display: "flex",
                    flexDirection: "row-reverse",
                  }}
                  onChange={(e) => {
                    setDefaultDate((pre) => ({
                      ...pre,
                      starttime: e.target.value,
                    }));
                  }}
                />
              </div>
              {error.starttime !== null ? (
                <FormHelperText error>{error.starttime}</FormHelperText>
              ) : null}
            </div>
            <div>
              <div className="d-flex align-items-center h-5">
                End time:
                <input
                  type="time"
                  value={defaultDate.endtime}
                  style={{
                    border: "none",
                    outline: "none",
                    display: "flex",
                    flexDirection: "row-reverse",
                  }}
                  onChange={(e) => {
                    setDefaultDate((pre) => ({
                      ...pre,
                      endtime: e.target.value,
                    }));
                  }}
                  disabled={btnText === "View Today's Deal"}
                />
              </div>
              {error.endtime !== null ? (
                <FormHelperText error>{error.endtime}</FormHelperText>
              ) : null}
            </div>
          </div>
          {error.dateError !== null ? (
            <FormHelperText error>{error.dateError}</FormHelperText>
          ) : null}
        </>
      )}
      <div className="w-25 my-3">
        <InputBox
          placeholder="Enter the campaign title"
          value={formValues.campaignTitle}
          onInputChange={(e) =>
            setFormValues((prev) => {
              return {
                ...prev,
                campaignTitle: e.target.value,
              };
            })
          }
          error={Boolean(error.campaignTitle)}
          helperText={error.campaignTitle}
        />
      </div>
      <div className="mt-2">
        <TextEditor
          placeholder="Description for the Discount Products..."
          getContent={(text) => {
            setFormValues((prev) => ({
              ...prev,
              content: text,
            }));
          }}
        />
        {error.content && (
          <p className="error" id="textbox-helper-text">
            {error.content}
          </p>
        )}
      </div>
      <Grid container>{renderProducts()}</Grid>
      {Products.length && productError ? (
        <FormHelperText error>This field is required</FormHelperText>
      ) : (
        ""
      )}
    </div>
  );
};
export default CreateDiscount;
