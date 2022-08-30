/* eslint-disable react/no-array-index-key */
/* eslint-disable no-param-reassign */
import { Grid } from "@mui/material";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import CheckBoxComponent from "components/atoms/CheckboxComponent";
import MultiSelectComponent from "components/atoms/MultiSelectComponent";
import ButtonComponent from "components/atoms/ButtonComponent";
import ModalComponent from "components/atoms/ModalComponent";
import InputBoxComponent from "components/atoms/InputBoxComponent";
import InputFieldWithChip from "components/atoms/InputWithChip";
import validateMessage from "constants/validateMessages";
import toastify from "services/utils/toastUtils";
import { getAttributes, createAttributes } from "services/supplier/AddProducts";
import { useUserInfo } from "services/hooks";
import { validateAttribute } from "../validation";

const AttributesForm = forwardRef(
  ({ formData = {}, setFormData = () => {} }, ref) => {
    const [showAddAttributeModal, setShowAttributeModal] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [attributeList, setAttributeList] = useState([]);
    const [selectedAttribute, setSelectedAttribute] = useState({});
    const [formErrorObj, setFormErrorObj] = useState({});
    const [formValues, setFormValues] = useState({
      attributeName: "",
      values: [],
    });
    const [errorObj, setErrorObj] = useState({
      attributeName: "",
      values: "",
    });
    const user = useUserInfo();

    useEffect(() => {
      if (Object.keys(formData.attribute).length) {
        const temp = {};
        Object.keys(formData.attribute).forEach((item) => {
          temp[item] = [...formData.attribute[item]];
        });
        setSelectedAttribute(JSON.parse(JSON.stringify(temp)));
      }
    }, []);

    const getAttributeValues = () => {
      return attributeList.map((ele, index) => {
        const options = [];
        ele.options.forEach((item) => {
          options.push({
            id: item.id,
            title: item.label,
            value: item.label,
            variationName: item.variationName,
            variationId: item.variationId,
            variationType: ele.variationType,
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
                id={ele.id}
                checkBoxClick={(id, checked) => {
                  if (!checked) {
                    setFormData((pre) => {
                      return {
                        ...pre,
                        attribute: {
                          ...pre.attribute,
                          [id]: [],
                        },
                      };
                    });
                  }
                  const arr = JSON.parse(JSON.stringify(attributeList));
                  arr.forEach((ele1) => {
                    if (ele1.id === id) {
                      ele1.selected = !ele1.selected;
                    }
                    if (!ele1.selected) {
                      setSelectedAttribute((pre) => ({
                        ...pre,
                        [ele1.id]: [],
                      }));
                    }
                  });
                  setAttributeList([...arr]);
                }}
              />
            </Grid>
            {ele.selected ? (
              <Grid item lg={9} sm={12} container rowGap={1}>
                <Grid item sm={12}>
                  <MultiSelectComponent
                    placeholder={`${
                      selectedAttribute?.[ele.id]?.length
                        ? ""
                        : `Select ${ele.attribute}`
                    }`}
                    helperText={formErrorObj[ele.id]}
                    error={formErrorObj[ele.id]?.length}
                    label={ele.attribute}
                    list={[...options]}
                    id={ele.id}
                    onSelectionChange={(e, val, id) => {
                      setSelectedAttribute((pre) => ({
                        ...pre,
                        [id]: [...val],
                      }));
                      setFormData((pre) => {
                        if (!val.length) {
                          const temp = JSON.parse(
                            JSON.stringify(pre.attribute)
                          );
                          delete temp[`${ele.id}`];
                          return {
                            ...pre,
                            attribute: temp,
                          };
                        }
                        return {
                          ...pre,
                          attribute: {
                            ...pre.attribute,
                            [id]: [...val],
                          },
                        };
                      });
                    }}
                    value={selectedAttribute?.[ele.id]}
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
                          [ele.id]: options,
                        }));
                        setFormData((pre) => {
                          return {
                            ...pre,
                            attribute: {
                              ...pre.attribute,
                              [ele.id]: options,
                            },
                          };
                        });
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
                          [ele.id]: [],
                        }));
                        setFormData((pre) => {
                          const temp = JSON.parse(
                            JSON.stringify(pre.attribute)
                          );
                          delete temp[`${ele.id}`];
                          return {
                            ...pre,
                            attribute: temp,
                          };
                        });
                      }}
                    />
                  </Grid>
                  <Grid item sm={4}>
                    <ButtonComponent
                      muiProps="fs-10 w-100"
                      bgColor="bg-secondary"
                      label="Add New"
                      onBtnClick={() => {
                        setShowAttributeModal(true);
                        setModalType({ ...ele });
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            ) : null}
          </Grid>
        );
      });
    };

    useImperativeHandle(ref, () => {
      return {
        handleSendFormData: () => {
          return ["policy", {}];
        },
        validate: () => {
          const { errObj, flag } = validateAttribute(
            selectedAttribute,
            attributeList
          );
          setFormErrorObj(errObj);
          if (Object.keys(errObj).length) {
            const element = document.getElementById(Object.keys(errObj)[0]);
            if (element) {
              element.scrollIntoView();
            }
          }
          return flag;
        },
        clearPage: () => {
          setSelectedAttribute({});
          setModalType(null);
          setFormErrorObj({});
        },
      };
    });

    const getAttributesList = async (subCatId, pre) => {
      const { data } = await getAttributes(subCatId);
      const temp = [
        ...data.othersVariationList.map((item) => {
          return {
            id: item.otherVariationId,
            attribute: item.variationName,
            selected: Object.keys(pre?.attribute).length
              ? pre?.attribute[`${item.otherVariationId}`]?.length
              : false,
            visibleOnProduct: false,
            variationType: "OTHER_VARIATION",
            options: item.optionList.map((ele) => {
              return {
                id: ele.otherVariationOptionId,
                label: ele.optionName,
                variationName: item.variationName,
                variationId: item.otherVariationId,
              };
            }),
          };
        }),
        ...data.standardVariationList.map((item) => {
          return {
            id: item.standardVariationId,
            attribute: item.variationName,
            selected: Object.keys(pre?.attribute).length
              ? pre?.attribute[`${item.standardVariationId}`]?.length
              : false,
            visibleOnProduct: false,
            variationType: "STANDARD_VARIATION",
            options: item.optionList.map((ele) => {
              return {
                id: ele.standardOptionId,
                label: ele.optionName,
                variationName: item.variationName,
                variationId: item.standardVariationId,
              };
            }),
          };
        }),
      ];
      setAttributeList(temp);
    };

    useEffect(() => {
      let tempForm = {};
      tempForm = JSON.parse(JSON.stringify(formData));
      if (
        tempForm?.mainForm?.subCategoryValue &&
        Object.keys(tempForm.mainForm.subCategoryValue).length
      ) {
        getAttributesList(tempForm.mainForm.subCategoryValue.id, formData);
      } else {
        setAttributeList([]);
        setSelectedAttribute({});
      }
    }, [formData?.mainForm?.subCategoryValue]);

    const validateField = () => {
      const errObj = {
        attributeName: "",
        values: "",
      };
      let flag = false;
      if (!modalType && formValues.attributeName === "") {
        errObj.attributeName = validateMessage.field_required;
        flag = true;
      } else if (!modalType && formValues.attributeName.length > 50) {
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

    const handleModalSubmit = async () => {
      const error = validateField();
      if (!error) {
        let payload = {};
        payload = {
          mainCategoryId: formData.mainForm.category.id,
          setId: formData.mainForm.setsValue.id,
          subCategoryId: formData.mainForm.subCategoryValue.id,
          supplierId: user.id,
          variationId: modalType ? modalType.id : null,
          variationName: modalType
            ? modalType.attribute
            : formValues.attributeName,
          optionName: formValues.values,
        };
        const { data, err } = await createAttributes(payload);
        if (data) {
          toastify(data.message, "success");
          setFormValues({
            attributeName: "",
            values: [],
          });
          setErrorObj({
            attributeName: "",
            values: [],
          });
          setModalType(null);
          setShowAttributeModal(false);
        } else if (err) {
          toastify(err.response.data.message, "error");
        }
      }
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
            setShowAttributeModal(false);
            setModalType(null);
            setErrorObj({
              attributeName: "",
              values: "",
            });
            setFormValues({
              attributeName: "",
              values: "",
            });
          }}
          onSaveBtnClick={handleModalSubmit}
        >
          <Grid container justifyContent="center" rowGap={2} className="my-4">
            <Grid item sm={12} className="mx-5">
              <InputBoxComponent
                label="Name for the new Attribute"
                value={
                  modalType ? modalType.attribute : formValues.attributeName
                }
                helperText={errorObj.attributeName}
                error={errorObj.attributeName !== ""}
                onInputChange={(e) => {
                  setFormValues((prev) => ({
                    ...prev,
                    attributeName: e.target.value,
                  }));
                }}
                disabled={modalType}
              />
            </Grid>
            <Grid item sm={12} className="mx-5">
              <InputFieldWithChip
                id="options"
                label="Values"
                value={formValues.values}
                helperText={errorObj.values}
                error={errorObj.values.length}
                inputlabelshrink
                handleChange={(_, val) => {
                  setFormValues((pre) => ({
                    ...pre,
                    values: [...val],
                  }));
                }}
                placeholder="Enter Options"
              />
            </Grid>
          </Grid>
        </ModalComponent>
      </Grid>
    );
  }
);

AttributesForm.displayName = "AttributesForm";
export default AttributesForm;
