/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
import { Grid } from "@mui/material";
import DatePickerComponent from "@/atoms/DatePickerComponent";
import ModalComponent from "@/atoms/ModalComponent";
import InputBox from "@/atoms/InputBoxComponent";
import SimpleDropdownComponent from "@/atoms/SimpleDropdownComponent";
import React, { useEffect, useState } from "react";
import {
  addProductFlag,
  getFlagById,
  getFlags,
} from "services/supplier/myProducts";
import toastify from "services/utils/toastUtils";
import Image from "next/image";
import CheckBoxComponent from "@/atoms/CheckboxComponent";
import { useSelector } from "react-redux";
import { format, parse } from "date-fns";
import validateMessage from "constants/validateMessages";

const flagSchema = {
  flagTitle: "",
  imageUrl: "",
  startDate: "",
  endDate: "",
  variationList: [],
  discount: null,
  supplierStoreId: "",
  flagId: "",
  supplierId: "",
  userType: "SUPPLIER",
  purchaseId: null,
};

const AddFlag = ({
  openModal,
  setOpenModal = () => {},
  getMycollectionData = () => {},
  masterProduct = {},
}) => {
  const [formData, setFormData] = useState({
    ...flagSchema,
  });
  const [flagsList, setFlagsList] = useState([]);
  const [flagUrlList, setflagUrlList] = useState([]);
  const { storeCode, supplierId } = useSelector((state) => state.user);
  const [disableFlagField, setdisableFlagField] = useState(false);
  const [flagTitle, setflagTitle] = useState({});
  const [errObj, setErrObj] = useState({
    flagTitle: "",
    discount: "",
    startDate: "",
    endDate: "",
  });
  const handleClearBtnClick = () => {
    setOpenModal(false);
  };

  const validate = () => {
    let flag = false;
    const err = {
      flagTitle: "",
      discount: "",
      startDate: "",
      endDate: "",
    };

    if (!Object.keys(flagTitle).length) {
      flag = true;
      err.flagTitle = validateMessage.field_required;
    }
    if (flagTitle.label === "Deal Of The Day" && formData.discount === "") {
      flag = true;
      err.discount = validateMessage.field_required;
    }
    if (formData.startDate === "") {
      flag = true;
      err.startDate = validateMessage.field_required;
    }
    if (formData.endDate === "") {
      flag = true;
      err.endDate = validateMessage.field_required;
    }

    if (
      formData.startDate !== "" &&
      formData.endDate !== "" &&
      formData.startDate > formData.endDate
    ) {
      err.endDate = "End date should be more than start date";
    }

    if (
      flagUrlList.length &&
      !flagUrlList.filter((item) => item.checked).length
    ) {
      toastify("Please select the flag", "warning");
      flag = true;
    }
    return { err, flag };
  };

  const handleSubmit = async () => {
    const { err, flag } = validate();
    setErrObj(err);
    if (!flag) {
      const { data, err } = await addProductFlag({
        ...formData,
        flagId: flagTitle.value,
        flagTitle: flagTitle.label,
        imageUrl: flagUrlList.filter((item) => item.checked)[0].url.imageUrl,
      });
      if (data) {
        toastify(data.message, "success");
        getMycollectionData(0);
        setOpenModal(false);
        setflagUrlList([]);
      } else if (err) {
        toastify(err?.response?.data?.message, "error");
      }
    }
  };

  const handleChanges = (val, name) => {
    if (name === "flagTitle") {
      setFormData((pre) => ({
        ...pre,
        [name]: val,
        purchaseId: val.purchaseId,
        discount: null,
      }));
      return;
    }
    setFormData((pre) => ({
      ...pre,
      [name]: val,
    }));
  };

  const getflagList = async () => {
    const { data, err } = await getFlags(masterProduct.supplierId);
    if (data) {
      setFlagsList(
        data.map((item) => ({
          value: item.id,
          label: item.name,
          purchaseId: item?.purchaseId,
          flagImagePojos: item.flagImagePojos.map((imgData) => {
            return {
              visibilityPlace: imgData.visibilityPlace,
              flagImageId: imgData.flagImageId,
              imageUrl: imgData.flagImageUrl,
            };
          }),
        }))
      );
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };

  useEffect(() => {
    getflagList();
  }, []);

  useEffect(() => {
    if (masterProduct?.productVariations) {
      const variationId = masterProduct?.productVariations.map((item) => {
        return item.productVariationId;
      });
      setFormData((pre) => ({
        ...pre,
        variationList: variationId,
        supplierId: masterProduct.supplierId,
        supplierStoreId: storeCode,
      }));
    }
  }, [masterProduct]);

  const getFlagDetails = async (val) => {
    if (!val) {
      return;
    }
    const { data, err } = await getFlagById(
      val.value,
      val.purchaseId,
      storeCode
    );
    if (data) {
      if (data?.data) {
        const temp = val?.flagImagePojos?.map((item) => {
          return {
            checked: data?.data?.imageId == item?.flagImageId,
            url: item,
            label: <Image src={item?.imageUrl} width={400} height={50} />,
          };
        });
        setflagUrlList(temp);
        setdisableFlagField(true);
        setFormData((pre) => ({
          ...pre,
          flagId: val.value,
          flagTitle: val.label,
          imageUrl: data.data.imageUrl,
          imageId: data.data.imageId,
          supplierId,
          supplierStoreId: storeCode,
          purchaseId: val.purchaseId,
          variationList: [...data.data.variationList, pre.variationList],
          startDate: data.data.startDate,
          endDate: data.data.endDate,
          discount: data.data.discount,
          visibilityPlace: data.data.visibilityPlace,
        }));
      } else {
        const temp = val?.flagImagePojos?.map((item) => {
          return {
            checked: false,
            url: item,
            label: <Image src={item?.imageUrl} width={400} height={50} />,
          };
        });
        setflagUrlList(temp);
        setdisableFlagField(false);
        setFormData((pre) => ({
          ...pre,
          flagId: val.value,
          flagTitle: val.label,
          imageUrl: "",
          imageId: "",
          visibilityPlace: "",
          supplierId,
          supplierStoreId: storeCode,
          purchaseId: val.purchaseId,
          startDate: null,
          endDate: null,
          discount: "",
        }));
      }
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };

  return (
    <ModalComponent
      onCloseIconClick={() => {
        handleClearBtnClick();
      }}
      open={openModal}
      ModalTitle="Add Flag"
      ModalWidth={600}
      footerClassName="justify-content-end border-top"
      titleClassName="h-4"
      ClearBtnText="Cancel"
      onClearBtnClick={handleClearBtnClick}
      onSaveBtnClick={handleSubmit}
    >
      <Grid container spacing={2} className="my-2">
        <Grid item xs={12}>
          <SimpleDropdownComponent
            size="small"
            placeholder="Flag Title"
            value={flagTitle}
            list={flagsList}
            onDropdownSelect={(val) => {
              setflagTitle(val);
              getFlagDetails(val);
            }}
            helperText={errObj.flagTitle}
            error={errObj.flagTitle !== ""}
          />
        </Grid>

        {formData.flagTitle.label === "Deal Of The Day" && (
          <Grid item sm={6}>
            <InputBox
              size="small"
              placeholder="Enter discount %"
              type="number"
              onInputChange={(e) => {
                handleChanges(e.target.value, "discount");
              }}
              value={formData.discount}
              disabled={disableFlagField}
              helperText={errObj.discount}
              error={errObj.discount !== ""}
            />
          </Grid>
        )}
        <Grid item sm={6}>
          <DatePickerComponent
            size="small"
            label="Start Date"
            inputlabelshrink
            onDateChange={(value) => {
              handleChanges(format(value, "MM-dd-yyyy HH:mm:ss"), "startDate");
            }}
            value={
              formData.startDate
                ? parse(formData.startDate, "MM-dd-yyyy HH:mm:ss", new Date())
                : null
            }
            disabled={disableFlagField}
            helperText={errObj.startDate}
            error={errObj.startDate !== ""}
          />
        </Grid>
        <Grid item sm={6}>
          <DatePickerComponent
            onDateChange={(value) => {
              handleChanges(format(value, "MM-dd-yyyy HH:mm:ss"), "endDate");
            }}
            size="small"
            label="End Date"
            value={
              formData.endDate
                ? parse(formData.endDate, "MM-dd-yyyy HH:mm:ss", new Date())
                : null
            }
            inputlabelshrink
            disabled={disableFlagField}
            helperText={errObj.endDate}
            error={errObj.endDate !== ""}
          />
        </Grid>
        <Grid item sm={12} container>
          {flagUrlList.map((item, ind) => {
            return (
              <Grid item md={6}>
                <div className="d-flex">
                  <CheckBoxComponent
                    isChecked={item.checked}
                    checkBoxClick={() => {
                      if (disableFlagField) return;
                      const temp = [...flagUrlList];
                      temp.forEach((ele, index) => {
                        if (index === ind) {
                          ele.checked = true;
                        } else {
                          ele.checked = false;
                        }
                      });
                      setflagUrlList(temp);
                    }}
                  />
                  {item.label}
                </div>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </ModalComponent>
  );
};

export default AddFlag;
