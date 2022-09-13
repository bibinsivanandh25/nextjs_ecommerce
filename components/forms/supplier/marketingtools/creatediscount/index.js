/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
import { Grid, Tooltip, Typography } from "@mui/material";
import ButtonComponent from "components/atoms/ButtonComponent";
import CheckBoxComponent from "components/atoms/CheckboxComponent";
import ImageCard from "components/atoms/ImageCard";
import InputBox from "components/atoms/InputBoxComponent";
import TextEditor from "components/atoms/TextEditor";
import ListGroupComponent from "components/molecule/ListGroupComponent";
import validateMessage from "constants/validateMessages";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  getAllMainCategories,
  getProductsBySubCategoryId,
  getSetbyCategories,
  getSubCategorybySets,
} from "services/supplier/marketingtools";

const CreateDiscount = ({
  setShowCreateDiscount = () => {},
  btnText = "",
  inputLabel = "Enter Discount %",
  showBackBtn = true,
  showTypography = true,
  showDateAndTime = true,
  onCreateBtnClick = () => {},
  onCustomBtnClick = () => {},
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

  const getCategories = async () => {
    const { data } = await getAllMainCategories();
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
    const { data } = await getSubCategorybySets(val?.id);
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
  };

  useEffect(() => {
    getCategories();
  }, []);

  const [Products, setProducts] = useState([]);

  const supplierId = useSelector((state) => state.user.supplierId);

  const getProducts = async (value) => {
    const { data } = await getProductsBySubCategoryId(supplierId, value?.id);
    if (data) {
      const result = [];
      data.forEach((product) => {
        result.push({
          id: product.productVariationId,
          title: product.productTitle,
          image: product.imageUrl,
          discount: null,
          isSelected: false,
        });
      });
      setProducts([...result]);
    }
  };
  const renderProducts = () => {
    return Products.map((ele, ind) => {
      return (
        <Grid item key={ind} lg={1.2} md={2} sm={3}>
          <ImageCard imgSrc={ele.image} showClose={false} />
          <Tooltip title={ele.title}>
            <Typography className="text-center text-truncate">
              {ele.title}
            </Typography>
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
    validateFields("marginType.id", "marginType");
    validateFields("inputValue");
    validateFields(
      "campaignTitle",
      null,
      /^.{1,25}$/,
      validateMessage.alpha_numeric_25
    );

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
    setError(errObj);
    let valid = true;
    Object.values(errObj).forEach((i) => {
      if (i) {
        valid = false;
      }
    });
    return valid;
  };

  const handleCreateBtnClick = () => {
    if (validateForm()) {
      onCreateBtnClick();
    }
  };

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
          />
          {showListGroup ? (
            <Grid
              item
              container
              sm={12}
              className="position-absolute"
              sx={{
                width: "98.5%",
                top: 48,
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
                      setFormValues((prev) => {
                        return {
                          ...prev,
                          marginType: val[0].marginType,
                        };
                      });
                      setCategoriesList((prev) => {
                        return {
                          ...prev,
                          category: val,
                        };
                      });
                      getSets(val[0]);
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
                      if (val) {
                        getSubCategories(val[0]);
                      }
                      setCategoriesList((prev) => {
                        return {
                          ...prev,
                          set: val,
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
                      getProducts(val[0]);
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
              onBtnClick={onCustomBtnClick}
            />
          </div>
        </Grid>
      </Grid>
      {showTypography && (
        <Typography className="text-danger h-5 fw-bold my-2">
          Discount starts from 5% to 30%
        </Typography>
      )}
      {showDateAndTime && (
        <div className="d-flex w-75 justify-content-between mt-2">
          <div className="d-flex align-items-center h-5">
            Start Date:
            <input
              type="date"
              value="2021-12-01"
              style={{
                border: "none",
                outline: "none",
                display: "flex",
                flexDirection: "row-reverse",
              }}
            />
          </div>
          <div className="d-flex align-items-center h-5">
            End Date:
            <input
              type="date"
              value="2021-12-01"
              style={{
                border: "none",
                outline: "none",
                display: "flex",
                flexDirection: "row-reverse",
              }}
            />
          </div>
          <div className="d-flex align-items-center h-5">
            Start time:
            <input
              type="time"
              style={{
                border: "none",
                outline: "none",
                display: "flex",
                flexDirection: "row-reverse",
              }}
            />
          </div>
          <div className="d-flex align-items-center h-5">
            End time:
            <input
              type="time"
              style={{
                border: "none",
                outline: "none",
                display: "flex",
                flexDirection: "row-reverse",
              }}
            />
          </div>
        </div>
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
    </div>
  );
};
export default CreateDiscount;
