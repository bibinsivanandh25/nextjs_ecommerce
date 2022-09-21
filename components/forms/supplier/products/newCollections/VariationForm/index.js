/* eslint-disable prefer-const */
/* eslint-disable react/no-array-index-key */
import { Box, Grid, Typography } from "@mui/material";
import ButtonComponent from "components/atoms/ButtonComponent";
import ImageCard from "components/atoms/ImageCard";
import ModalComponent from "components/atoms/ModalComponent";
import { storeproductInfo } from "features/productsSlice";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomIcon from "services/iconUtils";
import { getBase64 } from "services/utils/functionUtils";
import toastify from "services/utils/toastUtils";
import { Country } from "country-state-city";
import { getCurrentData } from "services/supplier";
import ImageGuidelines from "components/molecule/ImageGuidelines";
import InputBox from "@/atoms/InputBoxComponent";
import DatePickerComponent from "@/atoms/DatePickerComponent";
import SimpleDropdownComponent from "@/atoms/SimpleDropdownComponent";
import { validateOtherInfo } from "../../productform/validation";

const VariationForm = forwardRef(
  ({ setShowGroupVariant = () => {}, setFormData = () => {} }, ref) => {
    const [showModal, setShowModal] = useState(false);
    const [imagedata, setImageData] = useState([]);
    const [showImageModal, setShowImageModal] = useState(false);
    const addRef = useRef(null);
    const dispatch = useDispatch();
    const [otherInfo, setOtherInfo] = useState([{ value: "", label: "" }]);
    const [error, setErrorInfo] = useState([]);
    const [expireDate, setexpireDate] = useState(null);
    const [expireDateErr, setexpireDateErr] = useState("");
    const [country, setcountry] = useState({});
    const variationData = useSelector((state) => state.product.variationData);
    const countries = Country.getAllCountries();
    const countryList = countries.map((item) => ({
      label: item.name,
      value: item.name,
      id: item.name,
    }));
    useEffect(() => {
      if (addRef.current) addRef.current.scrollIntoView();
    }, [imagedata]);
    let currentData = new Date();
    const getDate = async () => {
      const { data } = await getCurrentData();
      if (data) {
        currentData = new Date(data);
      }
    };
    useEffect(() => {
      getDate();
    }, []);

    useImperativeHandle(ref, () => {
      return {
        validate: () => {
          let { errObj, flag } = validateOtherInfo(otherInfo);
          if (expireDate && expireDate <= currentData) {
            setexpireDateErr("Please Select Future Date");
            flag = true;
          } else {
            setexpireDateErr("");
          }
          setErrorInfo(errObj);
          return { flag, otherInfo, country, expireDate };
        },
        clearPage: () => {
          setOtherInfo([
            {
              label: "",
              value: "",
            },
          ]);
        },
      };
    });

    const handleImageSubmit = () => {
      if (imagedata.length) {
        setFormData((pre) => {
          dispatch(
            storeproductInfo({
              formData: {
                ...JSON.parse(JSON.stringify(pre)),
                productImage: [...imagedata],
              },
            })
          );
          return {
            ...pre,
            productImage: [...imagedata],
          };
        });

        setShowGroupVariant(true);
      } else {
        toastify("Please upload variation image", "error");
      }
    };
    const addOtherField = () => {
      const temp = JSON.parse(JSON.stringify(otherInfo));
      temp.push({
        label: "",
        value: "",
      });
      setOtherInfo(temp);
    };

    return (
      <Box className=" mxh-75vh overflow-y-scroll p-3 pb-2 d-flex flex-column justify-content-between">
        <Box className="d-flex">
          {variationData && !Object.keys(variationData).length ? (
            <ButtonComponent
              label="Add Collections"
              onBtnClick={() => {
                setShowModal(true);
              }}
            />
          ) : (
            <Grid container spacing={2}>
              <Grid item md={12} className="d-flex justify-content-end">
                <Typography
                  className="h-5 color-orange cursor-pointer"
                  onClick={() => {
                    setShowGroupVariant(true);
                  }}
                >
                  <CustomIcon type="edit" className="fs-14 mx-1 color-orange" />
                  Edit variation
                </Typography>
              </Grid>
              <Grid item md={4} className="d-flex align-items-center">
                <Typography className="h-5">Expire Date</Typography>
              </Grid>
              <Grid item md={8}>
                <DatePickerComponent
                  label=""
                  size="small"
                  value={expireDate}
                  onDateChange={(val) => {
                    setexpireDate(val);
                  }}
                  helperText={expireDateErr}
                  error={!!expireDateErr}
                />
              </Grid>
              <Grid item md={4} className="d-flex align-items-center">
                <Typography className="h-5">Country Of Origin</Typography>
              </Grid>
              <Grid item md={8}>
                <SimpleDropdownComponent
                  id="country"
                  size="small"
                  list={countryList}
                  value={countryList.find((op) => op.id === country.id)}
                  onDropdownSelect={(val) => {
                    setcountry(val);
                  }}
                />
              </Grid>
              <Grid item lg={9} md={9} xs={12}>
                <Typography className="h-5">Other Info* :</Typography>
              </Grid>
              <Grid item md={3} className="d-flex flex-row-reverse">
                <ButtonComponent
                  label="Add"
                  variant="outlined"
                  size="small"
                  onBtnClick={addOtherField}
                  muiProps="m-0 p-0 fs-12"
                  showIcon
                  iconOrintation="end"
                  iconName="add"
                  iconColorClass="fs-16 color-orange"
                />
              </Grid>
              <Grid
                item
                md={12}
                xs={12}
                container
                spacing={1}
                className="mx-2 mt-2"
              >
                {otherInfo?.map((item, index) => (
                  <>
                    <Grid item md={12} lg={4}>
                      <InputBox
                        id={`label${index}`}
                        value={item.label}
                        onInputChange={(e) => {
                          const temp = JSON.parse(JSON.stringify(otherInfo));
                          temp[index].label = e.target.value;
                          setOtherInfo(temp);
                        }}
                        label="Label"
                        helperText={error[index]?.label}
                        error={error[index]?.label}
                      />
                    </Grid>
                    <Grid
                      item
                      md={12}
                      lg={8}
                      className="d-flex align-items-start"
                    >
                      <InputBox
                        id={`value${index}`}
                        value={item.value}
                        onInputChange={(e) => {
                          const temp = JSON.parse(JSON.stringify(otherInfo));
                          temp[index].value = e.target.value;
                          setOtherInfo(temp);
                        }}
                        placeholder="Enter Info"
                        helperText={error[index]?.value}
                        error={error[index]?.value}
                      />
                      {otherInfo.length - 1 ? (
                        <Box
                          className="bg-orange rounded-circle ms-2"
                          onClick={() => {
                            const temp = JSON.parse(JSON.stringify(otherInfo));
                            temp.splice(index, 1);
                            setOtherInfo(temp);
                          }}
                        >
                          <CustomIcon
                            type="removeIcon"
                            size="12"
                            className="color-white"
                          />
                        </Box>
                      ) : null}
                    </Grid>
                  </>
                ))}
              </Grid>
            </Grid>
          )}
          <ModalComponent
            ModalTitle=""
            showClearBtn={false}
            showSaveBtn={false}
            open={showModal}
            showHeader
            onCloseIconClick={() => {}}
            headerClassName="border-0"
            minHeightClassName="mnh-100 p-4  d-flex justify-content-center"
          >
            <div className="d-flex w-100 align-items-center flex-column">
              <Typography component="div" className="h-4">
                Copy same details to all products?
              </Typography>
              <Box className="d-flex mt-3 w-100 justify-content-center">
                <ButtonComponent
                  label="No"
                  onBtnClick={() => {
                    setShowModal(false);
                  }}
                  variant="outlined"
                  muiProps="me-2 px-5"
                  size="medium"
                />
                <ButtonComponent
                  size="medium"
                  label="Yes"
                  onBtnClick={() => {
                    setShowModal(false);
                    setShowImageModal(true);
                  }}
                  muiProps="me-2 px-5"
                />
              </Box>
            </div>
          </ModalComponent>
          <ModalComponent
            ModalTitle="Upload Product Variation Images"
            showClearBtn={false}
            saveBtnText="Submit"
            onSaveBtnClick={handleImageSubmit}
            onCloseIconClick={() => {
              setImageData([]);
              setShowImageModal(false);
            }}
            open={showImageModal}
            minHeightClassName="mnh-100 p-3  d-flex justify-content-center"
            headerClassName="border-0"
            minWidth="75%"
            titleClassName="fs-16 fw-500 color-orange"
          >
            <div className="">
              <Box className="mxw-70vw d-flex overflow-x-scroll justify-content-center align-items-center">
                {imagedata.length > 0
                  ? imagedata.map((item, index) => (
                      <ImageCard
                        className="mx-3"
                        key={index}
                        imgSrc={item}
                        handleCloseClick={() => {
                          setImageData((prev) => {
                            const temp = [...prev];
                            temp.splice(index, 1);
                            return [...temp];
                          });
                        }}
                      />
                    ))
                  : null}
                <div ref={addRef}>
                  <ImageCard
                    className="mx-3"
                    showClose={false}
                    handleImageUpload={async (e) => {
                      if (e.target.files.length) {
                        const file = await getBase64(e.target.files[0]);
                        setImageData((pre) => [...pre, file]);
                      }
                    }}
                  />
                </div>
              </Box>
              <div className="mt-3 ">
                <Typography className="fs-16 fw-500 color-orange">
                  Image Guidelines
                </Typography>
                <div className="mxh-50vh overflow-y-scroll hide-scrollbar">
                  <ImageGuidelines />
                </div>
              </div>
            </div>
          </ModalComponent>
        </Box>
      </Box>
    );
  }
);

VariationForm.displayName = "VariationForm";
export default VariationForm;
