import { Card, CardContent, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import ButtonComponent from "components/atoms/ButtonComponent";
import InputBox from "components/atoms/InputBoxComponent";
import MultiSelectComponent from "components/atoms/MultiSelectComponent";
import SimpleDropdownComponent from "components/atoms/SimpleDropdownComponent";
import validateMessage from "constants/validateMessages";
import { useState } from "react";

const AddGroupProducts = () => {
  const [parentProduct, setParentProduct] = useState([
    { id: 1, label: "abc", value: "abc" },
    { id: 2, label: "efg", value: "efg" },
    { id: 3, label: "ijk", value: "ijk" },
  ]);
  const [childProduct, setChildProduct] = useState([
    { id: 1, title: "abc", value: "abc" },
    { id: 2, title: "efg", value: "efg" },
    { id: 3, title: "ijk", value: "ijk" },
  ]);
  const [formData, setFormData] = useState({
    partentproduct: null,
    childproduct: [],
  });
  const [childDetails, setChildDetails] = useState([
    { title: "child1", price: "price", active: false },
    { title: "child2", price: "price", active: false },
    { title: "child3", price: "price", active: false },
  ]);
  const [parentDetails, setParentDetails] = useState({
    title: "parent",
    description: "content",
  });
  const [price, setPrice] = useState("");
  const [errorObj, setErrorObj] = useState({
    partentproduct: "",
    childproduct: "",
  });

  const handleDropdownChange = (value, key) => {
    setFormData((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const validate = () => {
    const errObj = { partentproduct: "", childproduct: "" };
    let flag = false;
    if (
      formData.partentproduct === null ||
      !Object.keys(formData.partentproduct).length
    ) {
      errObj.partentproduct = validateMessage.field_required;
      flag = true;
    }
    if (!formData.childproduct.length) {
      errObj.childproduct = validateMessage.field_required;
      flag = true;
    }
    setErrorObj({ ...errObj });
    return flag;
  };

  const handleSubmit = () => {
    const flag = validate();
  };
  return (
    <Paper className="mnh-75vh mxh-75vh overflow-y-scroll p-3 pb-2 d-flex flex-column justify-content-between">
      <Box className="d-flex">
        <Box className="d-flex flex-column w-30p mnw-200px me-3">
          <div className="mb-2">
            <SimpleDropdownComponent
              list={parentProduct}
              id="partentproduct"
              label="Parent Product"
              size="small"
              value={formData.partentproduct}
              onDropdownSelect={(value) => {
                handleDropdownChange(value, "partentproduct");
              }}
              inputlabelshrink
              helperText={errorObj.partentproduct}
              error={errorObj.partentproduct !== ""}
            />
          </div>
          <div className="mt-3">
            <MultiSelectComponent
              label="Child Products"
              list={childProduct}
              value={formData.childproduct}
              onSelectionChange={(a, val) => {
                setFormData((prev) => ({ ...prev, childproduct: [...val] }));
              }}
              helperText={errorObj.childproduct}
              error={errorObj.childproduct !== ""}
            />
          </div>
        </Box>
        <Box className="d-flex flex-column w-100">
          {Object.keys(parentDetails).length ? (
            <Card className="w-100 mb-3" variant="outlined">
              <CardContent className="w-100">
                <div className="d-flex flex-column w-100">
                  <Typography className="h-3">Parent product</Typography>
                  <div className="d-flex flex-md-column flex-lg-row">
                    <div className="w-20p h-10p bg-info me-2">Image</div>
                    <div className="w-100 d-flex flex-column">
                      <Typography className="h-3">
                        {parentDetails.title}
                      </Typography>
                      <div className="w-100 flex-wrap">
                        <Typography
                          className="h-4 word-break mnh-100 mxh-100"
                          component={"div"}
                        >
                          {parentDetails.description}
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : null}
          {childDetails.length ? (
            <Card className="w-100" variant="outlined">
              <CardContent className="w-100">
                <div className="d-flex flex-column w-100">
                  <Typography className="h-3">Combined Products</Typography>
                  <Box className="d-flex w-100">
                    <Grid container className="w-100" spacing={2}>
                      {childDetails.map((item, index) => (
                        <Grid item md={6} lg={4} key={index}>
                          <Card className="" variant="outlined" key={index}>
                            <CardContent className="w-100 d-flex">
                              <Box className="w-40p">Image</Box>
                              <Box className="d-flex flex-column">
                                <Typography component={"div"} className="h-3">
                                  {item.title}
                                </Typography>
                                {!item.active ? (
                                  <>
                                    <Typography
                                      component={"div"}
                                      className="h-2"
                                    >
                                      {item.price}
                                    </Typography>
                                    <Typography
                                      component={"div"}
                                      className="fs-12 color-orange"
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
                                      Change Price
                                    </Typography>
                                  </>
                                ) : (
                                  <>
                                    <InputBox
                                      id={item?.id}
                                      value={price}
                                      label=""
                                      className=""
                                      size="small"
                                      onInputChange={(e) => {
                                        setPrice(e.target.value);
                                      }}
                                      type="number"
                                      inputlabelshrink
                                      variant="standard"
                                    />
                                    <Typography
                                      component={"div"}
                                      className="fs-12 color-orange mt-1"
                                      onClick={() => {
                                        setChildDetails((pre) => {
                                          const temp = [...pre];
                                          temp.forEach((ele) => {
                                            if (ele.active && price !== "") {
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
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </div>
              </CardContent>
            </Card>
          ) : null}
        </Box>
      </Box>
      <Box className="d-flex justify-content-end mt-2">
        <ButtonComponent
          label="Clear"
          variant={"outlined"}
          size={"small"}
          onBtnClick={() => {
            setFormData({
              partentproduct: {},
              childproduct: [],
            });
            setParentDetails({});
            setChildDetails([]);
          }}
          muiProps="me-2"
        />
        <ButtonComponent
          label="Submit"
          size={"small"}
          onBtnClick={handleSubmit}
        />
      </Box>
    </Paper>
  );
};
export default AddGroupProducts;
