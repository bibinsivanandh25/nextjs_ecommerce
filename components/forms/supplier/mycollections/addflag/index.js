/* eslint-disable no-shadow */
import { Grid } from "@mui/material";
import DatePickerComponent from "@/atoms/DatePickerComponent";
import ModalComponent from "@/atoms/ModalComponent";
import InputBox from "@/atoms/InputBoxComponent";
import SimpleDropdownComponent from "@/atoms/SimpleDropdownComponent";
import React, { useEffect, useState } from "react";
import {
  getDataOfSingleFlagSelected,
  postAFlag,
} from "services/supplier/mycollections";
import validateMessage from "constants/validateMessages";
import validationRegex from "services/utils/regexUtils";
import { format } from "date-fns";
import toastify from "services/utils/toastUtils";

let errObj = {
  todaysDeals: false,
  discount: false,
  startDate: false,
  endDate: false,
  discountNotANumber: false,
};

const AddFlag = ({
  openModal,
  setOpenModal = () => {},
  defaultFormData,
  setDefaultFormData = () => {},
  allFlags = [],
  productVariationId,
  getMycollectionData = () => {},
  masterProduct = [],
}) => {
  const [allFlagsLabel, setAllFlagsLabel] = useState([]);
  const [dataForSingleDeal, setDataForSingleDeal] = useState("noData");
  const [error, setError] = useState(errObj);

  useEffect(() => {
    const tempArray = allFlags?.map((val) => {
      return {
        label: val.name,
        id: val.id,
        purchaseId: val.purchaseId,
        imageUrl: val.imageUrl,
      };
    });
    setAllFlagsLabel([...tempArray]);
  }, [allFlags]);

  const getSingleOptionFlag = async (value) => {
    const { data, error } = await getDataOfSingleFlagSelected(
      value.id,
      "SUPS10STRE5DA",
      value.purchaseId
    );

    if (data) {
      setDataForSingleDeal(data);
    }
    if (data === null) {
      setDataForSingleDeal(data);
    }
    if (error) {
      toastify(error, "error");
    }
  };

  const handleError = () => {
    let theError = false;
    errObj = {
      todaysDeals: false,
      discount: false,
      startDate: false,
      endDate: false,
      discountNotANumber: false,
    };
    if (defaultFormData.todaysDeals.label === "") {
      errObj.todaysDeals = true;
      theError = true;
    }
    if (dataForSingleDeal === null) {
      if (defaultFormData.discount === "") {
        errObj.discount = true;
        theError = true;
      }
      if (defaultFormData.startDate === "") {
        errObj.startDate = true;
        theError = true;
      }
      if (defaultFormData.endDate === "") {
        errObj.endDate = true;
        theError = true;
      }

      if (!validationRegex.decimal_2digit.test(defaultFormData.discount)) {
        errObj.discountNotANumber = true;
        theError = true;
      }
    }

    return { errObj, theError };
  };

  const handleClearBtnClick = () => {
    errObj = {
      todaysDeals: false,
      discount: false,
      startDate: false,
      endDate: false,
    };
    setOpenModal(false);
    setDefaultFormData({
      todaysDeals: { label: "" },
      discount: "",
      startDate: "",
      endDate: "",
    });
    setError(errObj);
  };

  const handleSubmit = async () => {
    const { errObj, theError } = handleError();
    setError(errObj);
    if (!theError) {
      let theVariationList = [];

      masterProduct.productVariations.forEach((item) => {
        theVariationList.push(item.productVariationId);
      });
      if (dataForSingleDeal) {
        theVariationList = [
          ...dataForSingleDeal?.variationList,
          ...theVariationList,
        ];
      }
      theVariationList = [...new Set(theVariationList)];
      const payload = {
        flagTitle: defaultFormData.todaysDeals.label,
        imageUrl: defaultFormData.todaysDeals.imageUrl,
        startDate:
          dataForSingleDeal === null
            ? format(defaultFormData.startDate, "MM-dd-yyyy HH:mm:ss")
            : dataForSingleDeal.startDate,
        endDate:
          dataForSingleDeal === null
            ? format(defaultFormData.endDate, "MM-dd-yyyy HH:mm:ss")
            : dataForSingleDeal.endDate,
        variationList: theVariationList,
        discount:
          dataForSingleDeal === null
            ? defaultFormData.discount
            : dataForSingleDeal.discount,
        supplierStoreId: "SUPS10STRE5DA",
        flagId: defaultFormData.todaysDeals.id,
        supplierId: "SP0822000040",
        userType: "SUPPLIER",
        purchaseId: defaultFormData.todaysDeals.purchaseId,
      };

      const { data, error } = await postAFlag(payload);
      if (data) {
        toastify("Flag posted successfully", "success");
        setOpenModal(false);
        getMycollectionData();
        handleClearBtnClick();
      } else if (error) {
        toastify(error, "error");
      }
    }
  };

  const handleHelperTextForDiscount = () => {
    if (error.discount) {
      return validateMessage.field_required;
    }
    if (error.discountNotANumber) {
      return validateMessage.decimal_2digits;
    }
    return "";
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
            placeholder="Todays Deal"
            value={defaultFormData?.todaysDeals}
            list={[...allFlagsLabel]}
            onDropdownSelect={(value) => {
              setDefaultFormData({
                ...defaultFormData,
                todaysDeals: {
                  label: value?.label,
                  id: value.id,
                  imageUrl: value.imageUrl,
                  purchaseId: value.purchaseId,
                },
              });
              getSingleOptionFlag(value);
            }}
            helperText={error.todaysDeals ? validateMessage.field_required : ""}
          />
        </Grid>
        <Grid item xs={6}>
          {/* <InputBox
            size="small"
            placeholder="Sale Price"
            disabled
            value={defaultFormData.saleprice}
            onInputChange={(e) => {
              setDefaultFormData((prev) => ({
                ...prev,
                saleprice: e.target.value,
              }));
            }}
          /> */}
        </Grid>
        <Grid item sm={6}>
          <InputBox
            size="small"
            placeholder="Enter discount %"
            value={
              dataForSingleDeal === null
                ? defaultFormData.discount
                : dataForSingleDeal.discount
            }
            onInputChange={(e) => {
              setDefaultFormData((prev) => ({
                ...prev,
                discount: e.target.value,
              }));
            }}
            type="number"
            disabled={
              !(
                dataForSingleDeal === null &&
                defaultFormData.todaysDeals.label !== ""
              )
            }
            error={error.discount || error.discountNotANumber}
            helperText={handleHelperTextForDiscount()}
          />
        </Grid>
        <Grid item sm={6}>
          <DatePickerComponent
            size="small"
            label="Start Date"
            inputlabelshrink
            value={
              dataForSingleDeal === null
                ? defaultFormData.startDate
                : dataForSingleDeal.startDate
            }
            onDateChange={(value) => {
              setDefaultFormData((prev) => ({
                ...prev,
                startDate: value,
              }));
            }}
            disabled={
              !(
                dataForSingleDeal === null &&
                defaultFormData.todaysDeals.label !== ""
              )
            }
            error={error.startDate}
            helperText={error.startDate ? validateMessage.field_required : ""}
          />
        </Grid>
        <Grid item sm={6}>
          <DatePickerComponent
            size="small"
            label="End Date"
            inputlabelshrink
            value={
              dataForSingleDeal === null
                ? defaultFormData.endDate
                : dataForSingleDeal.endDate
            }
            onDateChange={(value) => {
              setDefaultFormData((prev) => ({
                ...prev,
                endDate: value,
              }));
            }}
            disabled={
              !(
                dataForSingleDeal === null &&
                defaultFormData.todaysDeals.label !== ""
              )
            }
            error={error.endDate}
            helperText={error.endDate ? validateMessage.field_required : ""}
          />
        </Grid>
      </Grid>
    </ModalComponent>
  );
};

export default AddFlag;
