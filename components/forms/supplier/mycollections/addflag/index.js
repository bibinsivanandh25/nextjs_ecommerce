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
  const [flagsList, setFlagsList] = useState([]);
  const [flagUrlList, setflagUrlList] = useState([]);
  const { storeCode } = useSelector((state) => state.user);
  const [flagTitle, setFlagTitle] = useState({});
  const [flagFormData, setFlagFormData] = useState(flagSchema);
  const [disableFlagField, setdisableFlagField] = useState(false);

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
      setFlagTitle(JSON.parse(JSON.stringify(val)));

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
        const variationList = [...data.data.variationList];
        masterProduct.productVariations.forEach((item) => {
          variationList.push(item.productVariationId);
        });
        setFlagFormData((pre) => ({
          ...pre,
          flagId: val.value,
          flagTitle: val.label,
          imageUrl: data.data.imageUrl,
          imageId: data.data.imageId,
          supplierId: masterProduct.supplierId,
          supplierStoreId: storeCode,
          purchaseId: val.purchaseId,
          variationList,
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
        const variationList = [];
        masterProduct.productVariations.forEach((item) => {
          variationList.push(item.productVariationId);
        });
        setflagUrlList(temp);
        setdisableFlagField(false);
        setFlagFormData((pre) => ({
          ...pre,
          flagId: val.value,
          flagTitle: val.label,
          imageUrl: "",
          imageId: "",
          visibilityPlace: "",
          supplierId: masterProduct.supplierId,
          supplierStoreId: storeCode,
          purchaseId: val.purchaseId,
          variationList,
          startDate: null,
          endDate: null,
          discount: "",
        }));
      }
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };

  const flagSubmit = async () => {
    if (!flagUrlList.filter((item) => item.checked).length) {
      toastify("please select the flag", "error");
      return;
    }
    const { data, err } = await addProductFlag({
      ...flagFormData,
      imageUrl: flagUrlList.filter((item) => item.checked)[0].url.imageUrl,
      visibilityPlace: flagUrlList.filter((item) => item.checked)[0].url
        .visibilityPlace,
      imageId: flagUrlList.filter((item) => item.checked)[0].url.flagImageId,
      // FlagListData.flagImagePojos.map((val)=>{})
    });
    if (data) {
      toastify(data.message, "success");
      setOpenModal(false);
      setFlagFormData({ ...flagSchema });
      setdisableFlagField(false);
      setflagUrlList([]);
      setFlagTitle([]);
      getMycollectionData(0);
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };

  return (
    <ModalComponent
      onCloseIconClick={() => {
        setOpenModal(false);
        setFlagFormData({ ...flagSchema });
        setflagUrlList([]);
        setFlagTitle([]);
      }}
      open={openModal}
      ModalTitle="Add Flag"
      ModalWidth={600}
      footerClassName="justify-content-end border-top"
      titleClassName="h-4"
      ClearBtnText="Cancel"
      onClearBtnClick={() => {
        setOpenModal(false);

        setFlagFormData({ ...flagSchema });
        setflagUrlList([]);
        setFlagTitle([]);
      }}
      onSaveBtnClick={flagSubmit}
    >
      <Grid container spacing={2} className="my-2">
        <Grid item xs={12}>
          <SimpleDropdownComponent
            size="small"
            placeholder="Flag Title"
            list={flagsList}
            value={flagTitle}
            onDropdownSelect={(val) => {
              getFlagDetails(val);
            }}
          />
        </Grid>

        {flagTitle?.label === "Deal Of The Day" && (
          <Grid item sm={6}>
            <InputBox
              size="small"
              value={flagFormData.discount}
              placeholder="Enter discount in %"
              onInputChange={(e) => {
                setFlagFormData((pre) => ({
                  ...pre,
                  discount: e.target.value,
                }));
              }}
              type="number"
              disabled={disableFlagField}
            />
          </Grid>
        )}

        <Grid item sm={6}>
          <DatePickerComponent
            size="small"
            label="Start Date"
            inputlabelshrink
            value={
              flagFormData.startDate
                ? parse(
                    flagFormData.startDate,
                    "MM-dd-yyyy HH:mm:ss",
                    new Date()
                  )
                : null
            }
            onDateChange={(date) => {
              setFlagFormData((pre) => ({
                ...pre,
                startDate: format(date, "MM-dd-yyyy HH:mm:ss"),
              }));
            }}
            disabled={disableFlagField}
          />
        </Grid>
        <Grid item sm={6}>
          <DatePickerComponent
            size="small"
            label="End Date"
            inputlabelshrink
            value={
              flagFormData.endDate
                ? parse(flagFormData.endDate, "MM-dd-yyyy HH:mm:ss", new Date())
                : null
            }
            onDateChange={(date) => {
              setFlagFormData((pre) => ({
                ...pre,
                endDate: format(date, "MM-dd-yyyy HH:mm:ss"),
              }));
            }}
            disabled={disableFlagField}
          />
        </Grid>
        <Grid item sm={12} container>
          {flagUrlList?.map((item, ind) => {
            return (
              <Grid item md={6}>
                <div className="d-flex" style={{ paddingLeft: "10px" }}>
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
                  <span className="fs-12 color-orange d-flex align-self-center p-3">
                    {item.url.visibilityPlace.replace("_", " ")}
                  </span>
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
