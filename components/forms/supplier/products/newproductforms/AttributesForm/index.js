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

const AttributesForm = forwardRef(
  ({ formData = {}, setFormData = () => {} }, ref) => {
    // const [attributesFormData, setAttributesFormData] = useState({});
    const [Attributes, setAttributes] = useState([]);
    const [selectedAttribute, setSelectedAttribute] = useState({});
    const [showAddAttributeModal, setShowAttributeModal] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [formErrorObj, setFormErrorObj] = useState({});
    const [attributeList, setAttributeList] = useState([]);
    const [formValues, setFormValues] = useState({
      attributeName: "",
      values: [],
    });
    const [errorObj, setErrorObj] = useState({
      attributeName: "",
      values: "",
    });
    const user = useUserInfo();
    const validateAttributeForms = () => {
      let flag = true;
      let errObj = {};
      const temp = [];
      attributeList.forEach((ele) => {
        temp.push(ele.selected);
        if (ele.selected) {
          errObj = {
            ...errObj,
            [ele.id]: "",
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
    };

    const getAttributesList = async (subCatId, pre) => {
      const { data } = await getAttributes(subCatId);
      if (pre?.attribute && Object.keys(pre?.attribute).length) {
        setSelectedAttribute(JSON.parse(JSON.stringify(pre.attribute)));
      }
      const temp = [
        ...data.othersVariationList.map((item) => {
          return {
            id: item.otherVariationId,
            attribute: item.variationName,
            selected: Object.keys(pre?.attribute).length
              ? pre?.attribute[`${item.otherVariationId}`].length
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
              ? pre?.attribute[`${item.standardVariationId}`].length
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
      setFormData((pre) => {
        tempForm = JSON.parse(JSON.stringify(pre));
        if (
          tempForm?.mainFormData?.subCategoryValue &&
          Object.keys(tempForm.mainFormData.subCategoryValue).length
        ) {
          getAttributesList(tempForm.mainFormData.subCategoryValue.id, pre);
        }
        return pre;
      });
    }, [formData]);
    useImperativeHandle(ref, () => {
      return {
        handleSendFormData: () => {
          return ["attribute", { ...selectedAttribute }];
        },
        validate: validateAttributeForms,
        clearPage: () => {
          setSelectedAttribute({});
          setModalType(null);
          setFormErrorObj({});
          setFormValues({});
          setErrorObj({
            attributeName: "",
            values: "",
          });
          const temp = attributeList.map((item) => {
            return { ...item, selected: false };
          });
          setAttributeList(temp);
        },
      };
    });
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
                checkBoxClick={(id) => {
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
                    placeholder={`Select ${ele.attribute}`}
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
                <Grid item xs={12} container>
                  <CheckBoxComponent
                    id={ele.attribute}
                    label="Visible on the product page"
                    isChecked={ele.visibleOnProduct}
                    checkBoxClick={(id) => {
                      const arr = [...Attributes];
                      arr.forEach((item) => {
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
        setFormData((pre) => {
          payload = {
            mainCategoryId: pre.mainFormData.category.id,
            setId: pre.mainFormData.setsValue.id,
            subCategoryId: pre.mainFormData.subCategoryValue.id,
            supplierId: user.id,
            variationId: modalType ? modalType.id : null,
            variationName: modalType
              ? modalType.attribute
              : formValues.attributeName,
            optionName: formValues.values,
          };
          return pre;
        });
        const { data, err } = await createAttributes(payload);
        if (data) {
          toastify(data.message, "success");
          setFormValues({
            attributeName: "",
            values: [],
          });
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
            setShowAttributeModal(!showAddAttributeModal);
            setErrorObj({
              attributeName: "",
              values: "",
            });
            setFormValues({
              attributeName: "",
              values: "",
            });
            setModalType(null);
          }}
          onSaveBtnClick={handleModalSubmit}
        >
          <Grid container justifyContent="center" rowGap={2} className="my-4">
            <Grid item sm={12} className="mx-5">
              <InputBoxComponent
                label="Name for the new Attribute"
                helperText={errorObj.attributeName}
                error={errorObj.attributeName !== ""}
                value={
                  modalType ? modalType.attribute : formValues.attributeName
                }
                onInputChange={(e) => {
                  setFormValues((prev) => ({
                    ...prev,
                    attributeName: e.target.value,
                  }));
                }}
                disabled={modalType}
                inputlabelshrink
                placeholder="Enter The New Attribute"
              />
            </Grid>
            <Grid item sm={12} className="mx-5">
              <InputFieldWithChip
                id="options"
                label="Values"
                value={formValues.values}
                inputlabelshrink
                handleChange={(_, val) => {
                  setFormValues((pre) => ({
                    ...pre,
                    values: [...val],
                  }));
                }}
                helperText={errorObj.values}
                error={errorObj.values.length}
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
