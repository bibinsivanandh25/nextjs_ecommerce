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
import InputBox from "@/atoms/InputBoxComponent";
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
    const variationData = useSelector((state) => state.product.variationData);

    useEffect(() => {
      if (addRef.current) addRef.current.scrollIntoView();
    }, [imagedata]);

    useImperativeHandle(ref, () => {
      return {
        handleSendFormData: () => {
          return ["policy", {}];
        },
        validate: () => {
          const { errObj, flag } = validateOtherInfo(otherInfo);
          setErrorInfo(errObj);
          return { flag, otherInfo };
        },
        clearPage: () => {
          setOtherInfo({
            label: "",
            value: "",
          });
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
            <Grid container>
              <Grid item lg={9} md={9} xs={12}>
                Other Info :
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
            ModalTitle=""
            showClearBtn={false}
            saveBtnText="Submit"
            onSaveBtnClick={handleImageSubmit}
            onCloseIconClick={() => {
              setImageData([]);
              setShowImageModal(false);
            }}
            open={showImageModal}
            minHeightClassName="mnh-100 p-4  d-flex justify-content-center"
            headerClassName="border-0"
            minWidth={700}
          >
            <Box className="w-100 d-flex justify-content-center align-items-center">
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
          </ModalComponent>
        </Box>
      </Box>
    );
  }
);

VariationForm.displayName = "VariationForm";
export default VariationForm;
