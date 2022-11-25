/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
import { Grid } from "@mui/material";
import DatePickerComponent from "@/atoms/DatePickerComponent";
import ModalComponent from "@/atoms/ModalComponent";
import InputBox from "@/atoms/InputBoxComponent";
import SimpleDropdownComponent from "@/atoms/SimpleDropdownComponent";
import React, { useEffect, useState } from "react";
import { addProductFlag, getFlags } from "services/supplier/myProducts";
import toastify from "services/utils/toastUtils";
import Image from "next/image";
import CheckBoxComponent from "@/atoms/CheckboxComponent";
import { useSelector } from "react-redux";
import { format, parse } from "date-fns";

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
  const { storeCode } = useSelector((state) => state.user);
  const handleClearBtnClick = () => {
    setOpenModal(false);
  };

  // const validate = ()=>{
  //   if(formData.flagTitle === )
  // }

  const handleSubmit = async () => {
    const { data, err } = await addProductFlag({
      ...formData,
      flagId: formData.flagTitle.value,
      flagTitle: formData.flagTitle.label,
      imageUrl: flagUrlList.filter((item) => item.checked)[0].url,
    });
    if (data) {
      toastify(data.message, "success");
      getMycollectionData(0);
      setOpenModal(false);
      setflagUrlList([]);
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
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
          purchaseId: item.purchaseId,
          imageUrl: item.imageUrl,
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
            value={formData.flagTitle}
            list={flagsList}
            onDropdownSelect={(val) => {
              handleChanges(JSON.parse(JSON.stringify(val)), "flagTitle");
              const temp = val?.imageUrl?.map((item) => {
                return {
                  checked: false,
                  url: item,
                  label: <Image src={item} width={400} height={50} />,
                };
              });
              setflagUrlList(temp);
            }}
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
