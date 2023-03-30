/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
import {
  Card,
  Box,
  CardContent,
  Grid,
  Paper,
  Typography,
  Tooltip,
} from "@mui/material";
import ButtonComponent from "components/atoms/ButtonComponent";
import InputBox from "components/atoms/InputBoxComponent";
import MultiSelectComponent from "components/atoms/MultiSelectComponent";
import SimpleDropdownComponent from "components/atoms/SimpleDropdownComponent";
import validateMessage from "constants/validateMessages";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  addGroupedProducts,
  getChildProductList,
  getParentProductList,
} from "services/supplier/addgroupproduct";
import toastify from "services/utils/toastUtils";

const AddGroupProducts = () => {
  const [parentProduct, setParentProduct] = useState([]);
  const [childProduct, setChildProduct] = useState([]);
  const [formData, setFormData] = useState({
    parentproduct: null,
    childproduct: [],
  });
  const [childDetails, setChildDetails] = useState([]);
  const [parentDetails, setParentDetails] = useState({
    title: "",
    description: "",
    imageUrl: "",
  });
  const [price, setPrice] = useState("");
  const [errorObj, setErrorObj] = useState({
    parentproduct: "",
    childproduct: "",
  });

  const handleDropdownChange = (value, key) => {
    setFormData((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const supplierId = useSelector((state) => state.user?.supplierId);

  const getParentProducts = async () => {
    const payload = new FormData();
    payload.append("supplierId", supplierId);
    payload.append("status", "APPROVED");
    const { data } = await getParentProductList(payload);
    if (data) {
      const parentList = [];
      data.forEach((ele) => {
        parentList.push({
          id: ele.subCategoryId,
          label: ele.productTitle,
          value: ele.productTitle,
          imageUrl: ele.imageUrl,
          shortDescription: ele.shortDescription,
          productId: ele.productVariationId,
        });
      });
      setParentProduct(parentList);
    }
  };

  const getChildProducts = async () => {
    const payload = {
      subCategoryId: formData.parentproduct?.id,
      supplierId,
      status: "APPROVED",
    };

    const { data } = await getChildProductList(payload);
    if (data) {
      const result = [];
      data.forEach((ele) => {
        if (ele.productVariationId !== formData.parentproduct.productId)
          result.push({
            id: ele.productVariationId,
            title: ele.productTitle,
            value: ele.productTitle,
            imageUrl: ele.imageUrl,
            salePrice: ele.salePrice,
          });
      });
      setChildProduct([...result]);
    }
  };

  useEffect(() => {
    getParentProducts();
  }, []);

  useEffect(() => {
    if (formData.parentproduct) {
      getChildProducts();
    }
    setParentDetails({
      description: formData.parentproduct?.shortDescription,
      title: formData.parentproduct?.label,
      imageUrl: formData.parentproduct?.imageUrl,
      id: formData.parentproduct?.productId,
    });
    if (childDetails.length) {
      setChildDetails([]);
    }
    setFormData((pre) => ({ ...pre, childproduct: [] }));
  }, [formData.parentproduct]);

  const renderChildDetails = (data) => {
    if (data) {
      const result = [];
      data.forEach((ele) => {
        result.push({
          title: ele.title,
          imageUrl: ele.imageUrl,
          price: ele.salePrice,
          id: ele.id,
        });
      });
      setChildDetails([...result]);
    }
  };

  const validate = () => {
    const errObj = { parentproduct: "", childproduct: "" };
    let flag = false;
    if (
      formData.parentproduct === null ||
      !Object.keys(formData.parentproduct).length
    ) {
      errObj.parentproduct = validateMessage.field_required;
      flag = true;
    }
    if (!formData.childproduct.length) {
      errObj.childproduct = validateMessage.field_required;
      flag = true;
    }
    setErrorObj({ ...errObj });
    return flag;
  };

  const getChilddiscount = () => {
    const temp = JSON.parse(JSON.stringify(childDetails));
    const result = [];
    temp.forEach((ele) => {
      result.push({
        childProductId: ele.id,
        discountPercentage: parseInt(ele.discountPrice, 10) || 0,
      });
    });
    return result;
  };
  const handleSubmit = async () => {
    const flag = validate();
    const payload = {
      groupedProductId: parentDetails.id,
      childProducts: getChilddiscount(),
    };
    const { data, err } = await addGroupedProducts(payload);
    if (data) {
      toastify(data.message, "success");
      setParentDetails({});
      setChildDetails([]);
      setChildProduct([]);
      setFormData({
        parentproduct: [],
        childproduct: [],
      });
    } else if (err) {
      toastify(err.response.data.message, "error");
    }
  };
  return (
    <Paper className="mnh-80vh mxh-80vh overflow-y-scroll p-3 pb-2 d-flex flex-column justify-content-between">
      <Grid container spacing={2}>
        <Grid item sm={3}>
          <div className="mb-2">
            <SimpleDropdownComponent
              list={parentProduct}
              id="parentproduct"
              label="Parent Product"
              size="small"
              value={formData.parentproduct}
              onDropdownSelect={(value) => {
                handleDropdownChange(value, "parentproduct");
              }}
              inputlabelshrink
              helperText={errorObj.parentproduct}
              error={errorObj.parentproduct !== ""}
            />
          </div>
          <div className="mt-3">
            <MultiSelectComponent
              label="Child Products"
              list={childProduct}
              value={formData.childproduct}
              onSelectionChange={(a, val) => {
                if (val.length <= 5) {
                  setFormData((prev) => ({ ...prev, childproduct: [...val] }));
                  renderChildDetails(val);
                } else {
                  toastify(
                    "More than five products cannot be combined.",
                    "error"
                  );
                }
              }}
              helperText={errorObj.childproduct}
              error={errorObj.childproduct !== ""}
            />
          </div>
        </Grid>
        <Grid item sm={9}>
          {parentDetails?.title?.length ? (
            <Card className="w-100 mb-3" variant="outlined">
              <CardContent className="w-100">
                <div className="d-flex flex-column w-100">
                  <Typography className="h-3">Parent product</Typography>
                  <div className="d-flex flex-md-column flex-lg-row">
                    <div className="me-2">
                      {parentDetails?.imageUrl ? (
                        <Image
                          src={parentDetails?.imageUrl}
                          height={150}
                          width={150}
                          layout="intrinsic"
                        />
                      ) : null}
                    </div>
                    <div className="w-100 d-flex flex-column">
                      <Typography variant="h5">
                        {parentDetails.title}
                      </Typography>
                      <div className="w-100 flex-wrap">
                        <Typography
                          className="h-4 word-break mnh-100 mxh-100"
                          component="div"
                        >
                          <div
                            // eslint-disable-next-line react/no-danger
                            dangerouslySetInnerHTML={{
                              __html: parentDetails.description,
                            }}
                          />
                          {/* {parentDetails.description} */}
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : null}
          {childDetails?.length ? (
            <Card className="w-100" variant="outlined">
              <CardContent className="w-100">
                <div className="d-flex flex-column w-100">
                  <Typography className="h-3">Combined Products</Typography>
                  <Box className="d-flex w-100">
                    <Grid container className="w-100" spacing={2}>
                      {childDetails.map((item, index) => (
                        <Grid item md={6} lg={4} key={index}>
                          <Card variant="outlined" key={index}>
                            <Grid container>
                              <CardContent className="w-100 d-flex">
                                <Grid
                                  item
                                  sm={6}
                                  alignItems="center"
                                  display="flex"
                                  justifyContent="center"
                                >
                                  {item.imageUrl ? (
                                    <Image
                                      src={item.imageUrl}
                                      height={125}
                                      width={125}
                                      fill="intrensic"
                                    />
                                  ) : null}
                                </Grid>
                                <Grid item sm={6}>
                                  <Box className="mx-1">
                                    <Tooltip placement="top" title={item.title}>
                                      <Typography
                                        component="div"
                                        className="h-5 fw-bold text-truncate"
                                      >
                                        {item.title}
                                      </Typography>
                                    </Tooltip>
                                    {!item.active ? (
                                      <>
                                        <Typography
                                          component="div"
                                          className="h-3"
                                        >
                                          ₹ {item.price}
                                        </Typography>
                                        <Typography
                                          component="div"
                                          className="fs-12 color-orange cursor-pointer"
                                          onClick={() => {
                                            setChildDetails((pre) => {
                                              const temp = [...pre];
                                              temp.forEach((ele, ind) => {
                                                if (ind === index) {
                                                  ele.active = true;
                                                } else {
                                                  ele.active = false;
                                                }
                                              });
                                              return temp;
                                            });
                                          }}
                                        >
                                          Enter Discount %
                                        </Typography>
                                      </>
                                    ) : (
                                      <>
                                        <InputBox
                                          id={item?.id}
                                          value={item.discountPrice || ""}
                                          label=""
                                          size="small"
                                          onInputChange={(e) => {
                                            setChildDetails((pre) => {
                                              const temp = [...pre];
                                              temp.forEach((element, i) => {
                                                if (i === index) {
                                                  element.discountPrice =
                                                    e.target.value <= 99
                                                      ? e.target.value
                                                      : null;
                                                }
                                              });
                                              return temp;
                                            });
                                          }}
                                          type="number"
                                          inputlabelshrink
                                          variant="standard"
                                        />
                                        <Typography
                                          component="div"
                                          className="fs-12 color-orange mt-1"
                                          onClick={() => {
                                            setChildDetails((prev) => {
                                              const temp = [...prev];
                                              temp.forEach((ele) => {
                                                if (
                                                  ele.active &&
                                                  price !== ""
                                                ) {
                                                  ele.price = price;
                                                  setPrice("");
                                                }
                                                ele.active = false;
                                              });
                                              return temp;
                                            });
                                          }}
                                        >
                                          Save
                                        </Typography>
                                      </>
                                    )}
                                  </Box>
                                </Grid>
                              </CardContent>
                            </Grid>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </div>
              </CardContent>
            </Card>
          ) : null}
        </Grid>
      </Grid>
      <Box className="d-flex justify-content-end mt-2">
        <ButtonComponent
          label="Clear"
          variant="outlined"
          size="small"
          onBtnClick={() => {
            setFormData({
              parentproduct: {},
              childproduct: [],
            });
            setParentDetails({});
            setChildDetails([]);
          }}
          muiProps="me-2"
        />
        <ButtonComponent
          label="Submit"
          size="small"
          onBtnClick={handleSubmit}
        />
      </Box>
    </Paper>
  );
};
export default AddGroupProducts;
