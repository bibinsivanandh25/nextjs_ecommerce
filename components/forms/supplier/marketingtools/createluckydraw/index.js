/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-nested-ternary */
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Box, Grid, Typography } from "@mui/material";
import ButtonComponent from "components/atoms/ButtonComponent";
import RadiobuttonComponent from "components/atoms/RadiobuttonComponent";
import { useRouter } from "next/router";
import SimpleDropdownComponent from "components/atoms/SimpleDropdownComponent";
import InputBox from "components/atoms/InputBoxComponent";
import TextEditor from "components/atoms/TextEditor";
import { useState, useRef, useEffect } from "react";
import { format } from "date-fns";
import validateMessage from "constants/validateMessages";
import toastify from "services/utils/toastUtils";
import validationRegex from "services/utils/regexUtils";
import {
  saveScratchCard,
  getAllMainCategories,
} from "services/supplier/marketingtools/luckydraw/scratchcard";
import { useSelector } from "react-redux";
import { getSet, getSubCategory } from "services/supplier/AddProducts";
import { getCurrentData } from "services/supplier";
import ScratchCardForm from "./createScratchCard";
import SpinWheelForm from "./createSpinWheel";
import ProductModal from "./ProductModal";
import CreateQuiz from "./createquiz";

const GenericForm = ({
  setShowGenericForm = () => {},
  pageName = "",
  getTableRows = () => {},
}) => {
  const route = useRouter();
  let currentDate = new Date();
  const tempFormData = {
    start_date: format(new Date(), "yyyy-MM-dd"),
    end_date: format(new Date(), "yyyy-MM-dd"),
    quiz_users: [],
    commision_type: null,
    category: null,
    sets: null,
    subCategory: null,
    products: [],
    highest_discount: "",
    limit_per_coupon: "",
    limit_per_customer: "",
    split_type: "",
    split_data: {},
    description: "",
    campign_name: "",
    questions: [],
  };
  const [errorObj, setErrorObj] = useState({});
  const [showSets, setShowSets] = useState(true);
  const [showSubCategory, setShowSubcategory] = useState(true);
  const [formData, setFormData] = useState({
    ...JSON.parse(JSON.stringify(tempFormData)),
  });
  const [showProducts, setShowProducts] = useState(false);
  const formRef = useRef(null);
  const [categoryList, setCategotyList] = useState([]);
  const [subCategoryList, setSubCategotyList] = useState([]);
  const [setsList, setSetsList] = useState([]);
  const { supplierId } = useSelector((state) => state.user);
  const [numberOfQuestions, setNumberOfQuestions] = useState(3);

  const getCategoryList = async () => {
    const { data } = await getAllMainCategories(supplierId);
    if (data) {
      const finaData = [];
      data.forEach((item) => {
        finaData.push({
          id: item.mainCategoryId,
          value: item.mainCategoryName,
          label: item.mainCategoryName,
          commission_mode: item.commissionType,
        });
      });
      setCategotyList(finaData);
    }
  };

  const getSetsList = async () => {
    const { data } = await getSet(formData.category.id);
    if (data) {
      const finaData = [];
      data.data.forEach((item) => {
        finaData.push({
          id: item.categorySetId,
          value: item.setName,
          label: item.setName,
        });
      });
      setSetsList(finaData);
    }
  };

  const getSubCategoryList = async () => {
    const { data } = await getSubCategory(formData.sets.id);
    if (data) {
      const finaData = [];
      data.data.forEach((item) => {
        finaData.push({
          id: item.subCategoryId,
          value: item.subCategoryName,
          label: item.subCategoryName,
        });
      });
      setSubCategotyList(finaData);
    }
  };
  const currentDateget = async () => {
    const { data } = await getCurrentData();
    if (data) {
      currentDate = new Date(data);
    }
  };

  useEffect(() => {
    getCategoryList();
    currentDateget();
  }, []);

  useEffect(() => {
    if (formData.sets?.id) {
      getSubCategoryList();
    }
  }, [formData.sets]);
  useEffect(() => {
    if (formData.category?.id) {
      getSetsList();
    }
  }, [formData.category]);

  const handleDropDownChange = (val, id) => {
    setFormData((pre) => ({
      ...pre,
      [id]: { ...val },
    }));
  };

  const getSplitAmount = () => {
    const temp = [];
    Object.keys(formData.split_data).forEach((item) => {
      temp.push({
        splitAmount: parseFloat(formData.split_data[item]),
        issuedToId: null,
        expired: null,
        issued: null,
      });
    });
    return temp;
  };

  const generateInputField = () => {
    if (formData.split_type === "equal_split") return [];
    const temp = [];
    const maxLength = Math.max(
      formData.limit_per_coupon,
      formData.limit_per_customer
    );
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < maxLength; i++) {
      temp.push(
        <InputBox
          id={`${i + 1}split`}
          placeholder={`Enter prize amount ${i + 1}`}
          value={formData.split_data[`${i + 1}split`]}
          onInputChange={(e) => {
            setFormData((pre) => {
              return {
                ...pre,
                split_data: {
                  ...pre.split_data,
                  [`${i + 1}split`]: e.target.value,
                },
              };
            });
          }}
          type="number"
          label=""
          size="small"
          className="mb-3"
          textInputProps={{
            style: { padding: 5 },
          }}
        />
      );
    }
    return [...temp];
  };

  const validate = () => {
    const errObj = {};
    let flag = false;
    if (new Date(formData.start_date) < currentDate) {
      flag = true;
      toastify("Start date should be a future date", "warning");
    } else if (new Date(formData.start_date) > new Date(formData.end_date)) {
      flag = true;
      toastify("Start date should be less than end date", "warning");
    }

    if (!formData.quiz_users.length) {
      flag = true;
      errObj.quiz_users = "Please selecte atleast one users";
    }

    if (formData.category === null) {
      flag = true;
      errObj.category = validateMessage.field_required;
    }
    if (formData.sets === null) {
      flag = true;
      errObj.sets = validateMessage.field_required;
    }
    if (formData.subCategory === null) {
      flag = true;
      errObj.subCategory = validateMessage.field_required;
    }
    if (formData.highest_discount === "") {
      flag = true;
      errObj.highest_discount = validateMessage.field_required;
    } else if (
      !validationRegex.decimal_2digit.test(
        parseFloat(formData.highest_discount)
      )
    ) {
      flag = true;
      errObj.highest_discount = validateMessage.decimal_2digits;
    }
    if (!formData.products.length) {
      flag = true;
      toastify("Please select the products for discount", "warning");
    }
    if (formData.limit_per_coupon === "") {
      flag = true;
      errObj.limit_per_coupon = validateMessage.field_required;
    } else if (!validationRegex.integers.test(formData.limit_per_coupon)) {
      flag = true;
      errObj.limit_per_coupon = "Only integers are allowed";
    }
    if (formData.limit_per_customer === "") {
      flag = true;
      errObj.limit_per_customer = validateMessage.field_required;
    } else if (!validationRegex.integers.test(formData.limit_per_customer)) {
      flag = true;
      errObj.limit_per_customer = "Only integers are allowed";
    }
    if (pageName !== "spinwheel" && formData.split_type === "") {
      flag = true;
      errObj.split_type = validateMessage.field_required;
    }
    if (pageName !== "spinwheel" && formData.split_type === "random_split") {
      const maxLength = Math.max(
        formData.limit_per_coupon,
        formData.limit_per_customer
      );
      if (Object.keys(formData.split_data).length !== maxLength) {
        flag = true;
        toastify("Enter Split Amount", "warning");
      } else {
        let localFlag = false;
        Object.keys(formData.split_data).forEach((item) => {
          if (formData.split_data[item] === "") {
            localFlag = true;
          }
        });
        if (localFlag) {
          flag = true;
          toastify("Enter Split Amount", "warning");
        }
      }
    }
    if (formData.description === "") {
      flag = true;
      errObj.description = validateMessage.field_required;
    } else if (formData.description.length > 255) {
      flag = true;
      errObj.description = validateMessage.alpha_numeric_max_255;
    }
    if (formData.campign_name === "") {
      flag = true;
      errObj.campign_name = validateMessage.field_required;
    } else if (formData.campign_name.length > 20) {
      flag = true;
      errObj.campign_name = validateMessage.alpha_numeric_20;
    }

    setErrorObj({ ...errObj });
    return flag;
  };

  const getAnswersList = () => {
    const temp = [];
    const data = formRef.current.handleSendFormData()[1];
    data.forEach((item) => {
      const questionOptions = [];
      let answer = "";
      Object.keys(item.options).forEach((ele) => {
        questionOptions.push(item.options[ele].option);
        if (item.options[ele].correct) {
          answer = item.options[ele].option;
        }
      });
      temp.push({
        question: item.question,
        questionOptions,
        answer,
      });
    });
    return temp;
  };

  const handleSubmit = async () => {
    const theme = formRef.current
      ? formRef.current.handleSendFormData()[1]
      : {};
    const flag = pageName === "createquiz" ? formRef.current.validate() : false;
    if (!validate() && !flag) {
      const marketingToolProductList = [];
      formData.products.forEach((item) => {
        marketingToolProductList.push({
          masterProductId: item.masterProductId,
          variationId: item.productVariationId,
        });
      });
      const payload = {
        toolType:
          pageName === "spinwheel"
            ? "SPIN_WHEEL"
            : pageName === "scratchcard"
            ? "SCRATCH_CARD"
            : "QUIZ",
        startDateTime: format(
          new Date(formData.start_date),
          "MM-dd-yyyy HH:mm:ss"
        ),
        endDateTime: format(new Date(formData.end_date), "MM-dd-yyyy HH:mm:ss"),
        description: formData.description,
        campaignTitle: formData.campign_name,
        totalDiscountValue: parseFloat(formData.highest_discount),
        splitType: formData.split_type === "equal_split" ? "EQUAL" : "RANDOM",
        couponUsageLimit: parseInt(formData.limit_per_coupon, 10),
        customerUsageLimit: parseInt(formData.limit_per_customer, 10),
        marginType: formData.category.commission_mode,
        mainCategoryId: formData.category.id,
        subCategoryId: formData.subCategory.id,
        productCatalogueUrl: null,
        customerType: formData.quiz_users[0],
        userType: "SUPPLIER",
        userTypeId: supplierId,
        marketingToolThemeId: pageName === "createquiz" ? null : theme,
        marketingToolProductList,
        splitDiscountDetailList:
          pageName === "spinwheel"
            ? []
            : formData.split_type === "equal_split"
            ? []
            : getSplitAmount(),
        marketingToolQuestionAnswerList:
          pageName === "createquiz" ? getAnswersList() : [],
      };
      const getPageName = () => {
        if (pageName == "createquiz") {
          return "QUIZ";
        }
        if (pageName == "spinwheel") {
          return "SPIN_WHEEL";
        }
        if (pageName == "scratchcard") {
          return "SCRATCH_CARD";
        }
        return null;
      };
      const { data, message, err } = await saveScratchCard(payload);
      if (data) {
        toastify(message, "success");
        setShowGenericForm(false);
        getTableRows(getPageName(), 0);
      } else if (err) {
        toastify(err?.response?.data?.message, "error");
      }
    }
  };

  return (
    <Box className="w-100">
      <Box className="color-orange d-flex align-items-center h-4  ">
        <Box
          onClick={() => {
            setShowGenericForm(false);
          }}
        >
          <ArrowBackIosIcon className="fs-16 cursor-pointer" />
          <span className="cursor-pointer"> Back</span>
        </Box>
      </Box>
      <Box className="d-flex mt-2">
        <Box className="d-flex flex-column flex-grow-1">
          <Box className="d-flex mb-3 ms-3">
            <div className="d-flex align-items-center h-5">
              Start Date:
              <input
                type="date"
                value={format(new Date(formData.start_date), "yyyy-MM-dd")}
                style={{
                  border: "none",
                  outline: "none",
                  display: "flex",
                  flexDirection: "row-reverse",
                }}
                onChange={(e) => {
                  setFormData((pre) => ({
                    ...pre,
                    start_date: new Date(e.target.value),
                  }));
                }}
              />
            </div>
            <div className="d-flex align-items-center h-5">
              End Date:
              <input
                type="date"
                value={format(new Date(formData.end_date), "yyyy-MM-dd")}
                style={{
                  border: "none",
                  outline: "none",
                  display: "flex",
                  flexDirection: "row-reverse",
                }}
                onChange={(e) => {
                  setFormData((pre) => ({
                    ...pre,
                    end_date: new Date(e.target.value),
                  }));
                }}
              />
            </div>
          </Box>
          <Box className=" mb-3 ms-3">
            {`Whom you want to create the ${
              pageName === "createquiz"
                ? "Quiz"
                : pageName === "spinwheel"
                ? "Spin Wheel"
                : "Scratch Card"
            }`}
            <Box className="d-flex mt-1 ms-3">
              <RadiobuttonComponent
                label="New Customer"
                onRadioChange={() => {
                  setFormData((pre) => {
                    return {
                      ...pre,
                      quiz_users: ["NEW_CUSTOMER"],
                    };
                  });
                }}
                isChecked={formData.quiz_users[0] === "NEW_CUSTOMER"}
                size="small"
              />
              <RadiobuttonComponent
                label="Existing Customer"
                onRadioChange={() => {
                  setFormData((pre) => {
                    return {
                      ...pre,
                      quiz_users: ["EXISTING_CUSTOMER"],
                    };
                  });
                }}
                isChecked={formData.quiz_users[0] === "EXISTING_CUSTOMER"}
                size="small"
              />
            </Box>
            {errorObj?.quiz_users && (
              <Typography className="h-5 color-error">
                {errorObj.quiz_users}
              </Typography>
            )}
          </Box>
        </Box>
        <Box className="">
          <ButtonComponent
            label="View Discount Product"
            onBtnClick={() => {
              route.push("/supplier/marketingtools/creatediscountcoupons");
            }}
            variant="outlined"
          />
          <Typography className="h-5 text-primary text-center cursor-pointer px-0 mt-1">
            Guidelines to create
          </Typography>
        </Box>
      </Box>
      <Box className="d-flex flex-column mx-3">
        <Typography className="h-4 mb-3">
          {`How do you want to ${
            pageName === "createquiz"
              ? "Quiz"
              : pageName === "spinwheel"
              ? "Spin Wheel"
              : "Scratch Card"
          } amount ?`}
        </Typography>
        <Box className="d-flex w-100">
          <Grid container spacing={2}>
            <Grid item md={4} lg={3}>
              <SimpleDropdownComponent
                list={categoryList}
                id="category"
                label="Category"
                size="small"
                value={formData.category}
                onDropdownSelect={(val) => {
                  if (val === null) {
                    setSetsList([]);
                    setSubCategotyList([]);
                  }
                  setFormData((pre) => ({
                    ...pre,
                    category: { ...val },
                    subCategory: null,
                    sets: null,
                  }));
                  setShowSubcategory(false);
                  setShowSets(false);
                  setTimeout(() => {
                    setShowSubcategory(true);
                    setShowSets(true);
                  }, 5);
                }}
                inputlabelshrink
                error={errorObj.category || false}
                helperText={errorObj?.category}
              />
            </Grid>
            <Grid item md={4} lg={3}>
              {showSets && (
                <SimpleDropdownComponent
                  list={setsList}
                  id="sets"
                  label="Sets"
                  size="small"
                  value={formData.sets}
                  onDropdownSelect={(val) => {
                    handleDropDownChange(val, "sets");
                    setShowSubcategory(false);
                    if (val === null) {
                      setSubCategotyList([]);
                    }
                    setTimeout(() => {
                      setShowSubcategory(true);
                    }, 5);
                  }}
                  inputlabelshrink
                  error={errorObj.sets || false}
                  helperText={errorObj?.sets}
                />
              )}
            </Grid>
            <Grid item md={4} lg={3}>
              {showSubCategory && (
                <SimpleDropdownComponent
                  list={subCategoryList}
                  id="subCategory"
                  label="Sub Category"
                  size="small"
                  value={formData.subCategory}
                  onDropdownSelect={(val) => {
                    handleDropDownChange(val, "subCategory");
                  }}
                  inputlabelshrink
                  error={errorObj.subCategory || false}
                  helperText={errorObj?.subCategory}
                />
              )}
            </Grid>
            <Grid item md={4} lg={3}>
              <InputBox
                id="commision_type"
                label="Commision Mode"
                size="small"
                value={formData.category?.commission_mode ?? ""}
                disabled
                error={errorObj.commision_type || false}
                helperText={errorObj?.commision_type}
              />
            </Grid>

            <Grid item md={6}>
              <InputBox
                id="highest_discount"
                placeholder="Enter highest discount value"
                onInputChange={(e) => {
                  setFormData((pre) => ({
                    ...pre,
                    highest_discount: e.target.value,
                  }));
                }}
                label=""
                size="small"
                value={formData.highest_discount}
                error={errorObj.highest_discount || false}
                helperText={errorObj?.highest_discount}
              />
            </Grid>
            <Grid item md={3} className="w-100 d-flex align-items-center">
              <ButtonComponent
                label="Choose Product"
                onBtnClick={() => {
                  setShowProducts(true);
                }}
              />
            </Grid>
          </Grid>
        </Box>
        <Box className="d-flex w-100 mt-3">
          <Grid container spacing={2}>
            <Grid item md={3}>
              <InputBox
                id="limit_per_coupon"
                placeholder="Enter the usage limit/coupon"
                onInputChange={(e) => {
                  setFormData((pre) => ({
                    ...pre,
                    limit_per_coupon: e.target.value,
                  }));
                }}
                value={formData.limit_per_coupon}
                label=""
                size="small"
                type="number"
                error={errorObj.limit_per_coupon || false}
                helperText={errorObj?.limit_per_coupon || "eg.: 1"}
              />
            </Grid>
            <Grid item md={3}>
              <InputBox
                id="limit_per_customer"
                placeholder="Enter the usage limit/customer"
                onInputChange={(e) => {
                  setFormData((pre) => ({
                    ...pre,
                    limit_per_customer: e.target.value,
                  }));
                }}
                value={formData.limit_per_customer}
                label=""
                size="small"
                type="number"
                error={errorObj.limit_per_customer || false}
                helperText={errorObj?.limit_per_customer || "eg.:1"}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box className="d-flex w-100 mt-3">
        <Box className=" mb-3 ms-3">
          How do you want to split the discount
          <Box className="d-flex mt-1 ms-3">
            <RadiobuttonComponent
              label="Random Split"
              isChecked={formData.split_type === "random_split"}
              onRadioChange={() => {
                setFormData((pre) => ({
                  ...pre,
                  split_type: "random_split",
                }));
              }}
              size="small"
            />
            <RadiobuttonComponent
              label="Equal Split"
              isChecked={formData.split_type === "equal_split"}
              onRadioChange={() => {
                setFormData((pre) => ({
                  ...pre,
                  split_type: "equal_split",
                }));
              }}
              size="small"
            />
          </Box>
          {errorObj?.split_type && (
            <Typography className="h-5 color-error">
              {errorObj.split_type}
            </Typography>
          )}
        </Box>
        {pageName !== "spinwheel" ? (
          <Box className="ms-4 d-flex flex-column mxh-200 overflow-y-scroll mb-3 p-1">
            {generateInputField()}
          </Box>
        ) : null}
      </Box>
      <Box className="w-100 mx-3">
        <TextEditor
          getContent={(text) => {
            setFormData((pre) => ({
              ...pre,
              description: text,
            }));
          }}
        />
        {errorObj?.description && (
          <Typography className="h-5 color-error">
            {errorObj.description}
          </Typography>
        )}
      </Box>
      <Box className="w-100 d-flex mx-3 mt-4">
        <Grid container>
          <Grid item md={4} lg={3} className="d-flex align-items-center">
            <InputBox
              label=""
              placeholder="Enter campaign name"
              onInputChange={(e) => {
                setFormData((pre) => ({
                  ...pre,
                  campign_name: e.target.value,
                }));
              }}
              value={formData.campign_name}
              error={errorObj.campign_name || false}
              helperText={errorObj?.campign_name}
            />

            {/* {!createQuestions && pageName === "createquiz" ? (
              <div
                onClick={() => {
                  setCreateQuestions(true);
                }}
                className="ms-2 cursor-pointer rounded-circle bg-black  height-fit-content"
              >
                <AddIcon className="color-white" />
              </div>
            ) : null} */}
          </Grid>
          {pageName === "createquiz" ? (
            <Grid item md={12} className="mt-2">
              <Box>
                <RadiobuttonComponent
                  label="3 Questions"
                  isChecked={numberOfQuestions === 3}
                  onRadioChange={() => {
                    setNumberOfQuestions(3);
                  }}
                  size="small"
                />
                <RadiobuttonComponent
                  label="5 Questions"
                  isChecked={numberOfQuestions === 5}
                  onRadioChange={() => {
                    setNumberOfQuestions(5);
                  }}
                  size="small"
                />
              </Box>
            </Grid>
          ) : null}
        </Grid>
      </Box>
      {pageName === "createquiz" ? (
        <CreateQuiz ref={formRef} numberOfQuestions={numberOfQuestions} />
      ) : null}
      {pageName === "scratchcard" ? (
        <ScratchCardForm ref={formRef} />
      ) : pageName === "spinwheel" ? (
        <SpinWheelForm
          ref={formRef}
          formData={formData}
          generateInputField={generateInputField}
        />
      ) : null}
      <Box className="w-100 d-flex justify-content-end mt-3">
        <ButtonComponent label="Create" onBtnClick={handleSubmit} />
      </Box>

      {showProducts && (
        <ProductModal
          open={showProducts}
          onCloseClick={() => {
            setShowProducts(false);
          }}
          submitBtnClick={(product) => {
            setFormData((pre) => ({
              ...pre,
              products: [...product],
            }));
            setShowProducts(false);
          }}
          subCategoryId={formData.subCategory?.id ?? null}
          selected={formData.products}
        />
      )}
    </Box>
  );
};
export default GenericForm;
