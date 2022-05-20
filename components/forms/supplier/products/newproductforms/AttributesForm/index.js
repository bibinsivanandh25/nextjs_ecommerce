import { Box, Grid, Paper } from "@mui/material";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import CheckBoxComponent from "components/atoms/CheckboxComponent";
import MultiSelectComponent from "components/atoms/MultiSelectComponent";
import ButtonComponent from "components/atoms/ButtonComponent";
import ModalComponent from "components/atoms/ModalComponent";
import InputBoxComponent from "components/atoms/InputBoxComponent";
import InputFieldWithChip from "components/atoms/InputWithChip";
import validateMessage from "constants/validateMessages";
import toastify from "services/utils/toastUtils";

let attributes = [
  {
    attribute: "brand",
    options: ["puma", "adidas"],
    selected: false,
    visibleOnProduct: false,
  },
  {
    attribute: "color",
    options: ["red", "green"],
    selected: false,
    visibleOnProduct: false,
  },
  {
    attribute: "Gender",
    options: ["Male", "Female"],
    selected: false,
    visibleOnProduct: false,
  },
  {
    attribute: "Material",
    options: ["Cotton", "Nylon", "Silk"],
    selected: false,
    visibleOnProduct: false,
  },
  {
    attribute: "Size",
    options: ["xs", "s", "m", "l", "xl", "xxl"],
    selected: false,
    visibleOnProduct: false,
  },
];

const AttributesForm = forwardRef(({}, ref) => {
  const [attributesFormData, setAttributesFormData] = useState({});
  const [Attributes, setAttributes] = useState([...attributes]);
  const [selectedAttribute, setSelectedAttribute] = useState({});
  const [showAddAttributeModal, setShowAttributeModal] = useState(false);
  const [formErrorObj, setFormErrorObj] = useState({});
  const [formValues, setFormValues] = useState({
    attributeName: "",
    values: [],
  });
  const [errorObj, setErrorObj] = useState({
    attributeName: "",
    values: "",
  });
  useImperativeHandle(ref, () => {
    return {
      handleSendFormData: () => {
        return ["attribute", { ...selectedAttribute }];
      },
      validate: validateAttributeForms,
    };
  });

  const getAttributeValues = () => {
    return Attributes.map((ele, index) => {
      let options = [];
      ele.options.forEach((item, ind) => {
        options.push({
          id: ind + 1,
          title: item,
          value: item,
        });
      });

      return (
        <Grid
          container
          item
          md={12}
          key={index}
          className="border my-2 px-2 py-2"
        >
          <Grid item lg={3} sm={12}>
            <CheckBoxComponent
              label={ele.attribute}
              isChecked={ele.selected}
              id={ele.attribute}
              checkBoxClick={(id) => {
                let arr = [...Attributes];
                arr.map((ele, ind) => {
                  if (ele.attribute === id) {
                    ele.selected = !ele.selected;
                  }
                  if (!ele.selected) {
                    setSelectedAttribute((pre) => ({
                      ...pre,
                      [ele.attribute]: [],
                    }));
                  }
                });
                setAttributes([...arr]);
              }}
            />
          </Grid>
          {ele.selected ? (
            <Grid item lg={9} sm={12} container rowGap={1}>
              <Grid item sm={12}>
                <MultiSelectComponent
                  helperText={formErrorObj[ele.attribute]}
                  error={formErrorObj[ele.attribute]?.length}
                  label={ele.attribute}
                  list={[...options]}
                  id={ele.attribute}
                  onSelectionChange={(e, val, id) => {
                    setSelectedAttribute((pre) => ({
                      ...pre,
                      [id]: [...val],
                    }));
                  }}
                  value={selectedAttribute?.[ele.attribute]}
                />
              </Grid>
              <Grid item xs={12} container spacing={2}>
                <Grid item sm={4}>
                  <ButtonComponent
                    muiProps="fs-10 w-100"
                    bgColor="bg-secondary"
                    label="Select All"
                    onBtnClick={() => {
                      setSelectedAttribute((pre) => ({
                        ...pre,
                        [ele.attribute]: options,
                      }));
                    }}
                  />
                </Grid>
                <Grid item sm={4}>
                  <ButtonComponent
                    muiProps="fs-10 w-100"
                    bgColor="bg-secondary"
                    label="Select None"
                    onBtnClick={() => {
                      setSelectedAttribute((prev) => ({
                        ...prev,
                        [ele.attribute]: [],
                      }));
                    }}
                  />
                </Grid>{" "}
                <Grid item sm={4}>
                  <ButtonComponent
                    muiProps="fs-10 w-100"
                    bgColor="bg-secondary"
                    label="Add New"
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} container>
                <CheckBoxComponent
                  id={ele.attribute}
                  label="Visible on the product page"
                  isChecked={ele.visibleOnProduct}
                  checkBoxClick={(id) => {
                    let arr = [...Attributes];
                    arr.map((item) => {
                      if (item.attribute === id) {
                        ele.visibleOnProduct = !ele.visibleOnProduct;
                      }
                    });
                    setAttributes([...arr]);
                  }}
                />
              </Grid>
            </Grid>
          ) : null}
        </Grid>
      );
    });
  };

  const validateAttributeForms = () => {
    let flag = true;
    let errObj = {};
    let temp = [];
    Attributes.forEach((ele) => {
      temp.push(ele.selected);
      if (ele.selected) {
        errObj = {
          ...errObj,
          [ele.attribute]: "",
        };
      }
    });
    if (!temp.some((item) => item)) {
      flag = false;
      toastify("Please select atleast one attribute", "error");
    }

    Object.keys(errObj).forEach((ele) => {
      if (!selectedAttribute[ele] || !selectedAttribute[ele]?.length) {
        errObj[ele] = validateMessage.field_required;
        flag = false;
      }
    });

    setFormErrorObj({ ...errObj });
    return flag;
    // console.log(errObj);
  };

  const validateField = () => {
    const errObj = {
      attributeName: "",
      values: "",
    };
    let flag = false;
    if (formValues.attributeName === "") {
      errObj.attributeName = validateMessage.field_required;
      flag = true;
    } else if (formValues.attributeName.length > 50) {
      errObj.attributeName = validateMessage.alpha_numeric_max_50;
      flag = true;
    }
    formValues.values.forEach((ele) => {
      if (ele.length > 50) {
        errObj.values = validateMessage.alpha_numeric_max_50;
        flag = true;
      }
    });
    if (formValues.values.length === 0) {
      errObj.values = validateMessage.field_required;
      flag = true;
    }
    setErrorObj({ ...errObj });
    return flag;
  };

  return (
    <Grid container className="">
      {getAttributeValues()}
      <Grid item md={12} className="d-flex justify-content-end m-2">
        <ButtonComponent
          label="Add New Attribute"
          variant="outlined"
          size="large"
          muiProps="fs-12"
          onBtnClick={() => setShowAttributeModal(!showAddAttributeModal)}
        />
      </Grid>
      <ModalComponent
        open={showAddAttributeModal}
        ModalTitle="Add new Attribute"
        showClearBtn={false}
        saveBtnText="submit"
        onCloseIconClick={() => {
          setShowAttributeModal(!showAddAttributeModal);
          setErrorObj({
            attributeName: "",
            values: "",
          });
          setFormValues({
            attributeName: "",
            values: "",
          });
        }}
        onSaveBtnClick={() => {
          let error = validateField();
          if (error) {
            setShowAttributeModal(true);
          } else {
            setFormValues({
              attributeName: "",
              values: [],
            });
            setShowAttributeModal(false);
          }
        }}
      >
        <Grid container justifyContent={"center"} rowGap={2} className="my-4">
          <Grid item sm={12} className="mx-5">
            <InputBoxComponent
              label="Name for the new Attribute"
              helperText={errorObj.attributeName}
              error={errorObj.attributeName !== ""}
              value={formValues.attributeName}
              onInputChange={(e) => {
                setFormValues((prev) => ({
                  ...prev,
                  attributeName: e.target.value,
                }));
              }}
            />
          </Grid>
          <Grid item sm={12} className="mx-5">
            <InputFieldWithChip
              label="values"
              helperText={errorObj.values}
              error={errorObj.values.length}
              handleChange={(e, value) => {
                setFormValues((prev) => ({
                  ...prev,
                  values: [...value],
                }));
              }}
            />
          </Grid>
        </Grid>
      </ModalComponent>
    </Grid>
  );
});

AttributesForm.displayName = "AttributesForm";
export default AttributesForm;
