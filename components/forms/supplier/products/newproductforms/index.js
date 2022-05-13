import { Box, Grid, Paper } from "@mui/material";
import ImageCard from "components/atoms/ImageCard";
import { useEffect, useRef, useState } from "react";
import InventoryForm from "./InventoryForm";
import PricingForm from "./Pricing&Weight";
import LinkedForm from "./LinkedForm";
import ProductPoliciesForm from "./ProductPoliciesForm";
import AttributesForm from "./AttributesForm";
import VariationForm from "./VariationForm";
import SimpleDropdownComponent from "components/atoms/SimpleDropdownComponent";
import ButtonComponent from "components/atoms/ButtonComponent";
import { commisiondata, product_type } from "./constants";
import InputBox from "components/atoms/InputBoxComponent";
import TextAreaComponent from "components/atoms/TextAreaComponent";
import { getBase64 } from "services/utils/functionUtils";

const ProductsLayout = ({
  formData = {},
  setFormData = () => {},
  handleSubmitClick = () => {},
}) => {
  const formsRef = useRef(null);
  const handleNextClick = () => {
    const temp = formsRef.current.handleSendFormData();
    // console.log("temp", temp);
    setFormData((prev) => {
      return { ...prev, [temp[0]]: temp[1] };
    });
    setactiveTab((prev) => prev + 1);
  };
  const [tabsData, setTabsData] = useState([]);
  const [imagedata, setImageData] = useState([]);
  const [tabsList, setTabsList] = useState([...tabsData]);
  const [activeTab, setactiveTab] = useState(0);
  const [commisionData, setCommisionData] = useState([...commisiondata]);
  const [mainFormData, setMainFormData] = useState({
    commision_mode: "",
    product_type: "",
    brand: "",
    short_description: {
      media: [],
      text: "",
    },
    long_description: {
      media: [],
      text: "",
    },
    sub_category_id: "",
    tags: "",
    limit_per_order: "",
  });

  useEffect(() => {
    setMainFormData({ ...formData.mainForm });
  }, []);

  const handleInputChange = (e) => {
    setMainFormData((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };
  const handleDropdownChange = (value, key) => {
    setMainFormData((prev) => {
      return { ...prev, [key]: value };
    });
  };

  useEffect(() => {
    setTabsData([
      {
        title: "Inventory",
        component: (
          <InventoryForm
            formData={formData}
            setFormData={setFormData}
            ref={formsRef}
          />
        ),
      },
      {
        title: "Pricing & Weight",
        component: (
          <PricingForm
            formData={formData}
            ref={formsRef}
            setFormData={setFormData}
          />
        ),
      },
      {
        title: "Linked",
        component: (
          <LinkedForm
            formData={formData}
            ref={formsRef}
            setFormData={setFormData}
          />
        ),
      },
      {
        title: "Product Policies",
        component: (
          <ProductPoliciesForm
            formData={formData}
            ref={formsRef}
            setFormData={setFormData}
          />
        ),
      },

      {
        title: "Attributes",
        component: (
          <AttributesForm
            formData={formData}
            ref={formsRef}
            setFormData={setFormData}
          />
        ),
      },
      {
        title: "Variation",
        component: (
          <VariationForm
            formData={formData}
            ref={formsRef}
            setFormData={setFormData}
          />
        ),
      },
    ]);
  }, [formData]);

  useEffect(() => {
    setTabsList([...tabsData]);
  }, [tabsData]);

  return (
    <Box className="d-flex flex-grow-1 flex-row mt-2">
      <Box className="border-end p-2 py-2  fit-content pb-0 overflow-y-scroll mxh-75vh">
        {imagedata.length > 0
          ? imagedata.map((item, index) => (
              <ImageCard
                key={index}
                imgSrc={item}
                handleCloseClick={() => {
                  setImageData((prev) => {
                    const temp = [...prev];
                    temp.splice(index);
                    return [...temp];
                  });
                }}
              />
            ))
          : null}
        {imagedata.length < 5 ? (
          <ImageCard
            showClose={false}
            handleImageUpload={async (e) => {
              if (e.target.files.length) {
                const file = await getBase64(e.target.files[0]);
                setImageData((prev) => {
                  return [...prev, file];
                });
              }
            }}
          />
        ) : null}
      </Box>
      <Box className="border-end p-2 w-30p mxh-75vh overflow-y-scroll hide-scrollbar">
        <div className="px-2">
          <Grid container spacing={2}>
            <Grid item md={12}>
              <SimpleDropdownComponent
                list={commisionData}
                id="commisionmode"
                label="Commision Mode"
                size="small"
                value={mainFormData.commision_mode}
                onDropdownSelect={(value) => {
                  handleDropdownChange(value, "commision_mode");
                }}
                inputlabelshrink
              />
            </Grid>
            {/* <Grid item md={12}>
              <SimpleDropdownComponent
                list={product_type}
                id="producttype"
                label="Product Type"
                size="small"
                value={mainFormData.product_type}
                onDropdownSelect={(value) => {
                  handleDropdownChange(value, "product_type");
                }}
                inputlabelshrink
              />
            </Grid> */}
            <Grid item md={12}>
              <InputBox
                id="brand"
                label="Brand"
                onInputChange={handleInputChange}
                value={mainFormData.brand}
                placeholder="Any brand"
                inputlabelshrink
              />
            </Grid>
            <Grid item md={12}>
              <TextAreaComponent
                legend="Short Description"
                onChange={(e) => {
                  setMainFormData((prev) => {
                    return {
                      ...prev,
                      short_description: {
                        ...prev.short_description.media,
                        text: e.target.value,
                      },
                    };
                  });
                }}
                onBtnClick={() => {}}
                btnLabel="Add Media"
                btnSize="small"
                btnVariant="outlined"
                widthClassName="w-100 mt-0"
                rows={2}
                muiProps="m-0 p-0 fs-10"
              />
            </Grid>
            <Grid item md={12}>
              <TextAreaComponent
                legend="Long Description"
                onChange={(e) => {
                  setMainFormData((prev) => {
                    return {
                      ...prev,
                      long_description: {
                        ...prev.long_description.media,
                        text: e.target.value,
                      },
                    };
                  });
                }}
                onBtnClick={() => {}}
                btnLabel="Add Media"
                btnSize="small"
                btnVariant="outlined"
                widthClassName="w-100 mt-0"
                rows={3}
                muiProps="m-0 p-0 fs-10"
              />
            </Grid>
            <Grid item md={12}>
              <SimpleDropdownComponent
                list={product_type}
                id="category"
                label="Select Category"
                size="small"
                inputlabelshrink
              />
            </Grid>
            <Grid item md={12}>
              <InputBox
                id="tags"
                label="Tags"
                onInputChange={handleInputChange}
                value={mainFormData.tags}
                inputlabelshrink
              />
            </Grid>
            <Grid item md={12}>
              <div className="d-flex justify-content-end">
                <ButtonComponent
                  label="Create tag"
                  variant={"outlined"}
                  size={"small"}
                  onBtnClick={() => {}}
                  muiProps="m-0 p-0 fs-10"
                />
              </div>
            </Grid>
            <Grid item md={12}>
              <InputBox
                id="limit_per_order"
                label="Limits Per Order"
                onInputChange={handleInputChange}
                value={mainFormData.limit_per_order}
                inputlabelshrink
                type="number"
              />
            </Grid>
          </Grid>
        </div>
      </Box>
      <Box className=" d-flex flex-column w-60p">
        <Box className="d-flex w-100 mb-2">
          <Box className="w-200px p-2">
            <Grid container className="">
              {tabsList.map((item, index) => {
                return (
                  <Grid
                    item
                    key={index}
                    md={12}
                    className={`cursor-pointer text-center py-1 rounded my-1 fs-14 ${
                      activeTab === index
                        ? "bg-orange color-white"
                        : "bg-light-gray"
                    }`}
                  >
                    {item.title}
                  </Grid>
                );
              })}
            </Grid>
          </Box>
          <Box className="p-3 w-100 mnh-75vh mxh-75vh overflow-y-scroll hide-scrollbar">
            {tabsList.map((item, ind) => {
              return activeTab === ind ? item.component : null;
            })}
          </Box>
        </Box>
        <Box className="d-flex justify-content-end me-3 mb-2">
          <ButtonComponent
            label="Clear"
            variant={"outlined"}
            size={"small"}
            onBtnClick={() => {}}
            muiProps="me-2"
          />
          {activeTab !== 0 ? (
            <ButtonComponent
              label="Previous"
              variant={"outlined"}
              size={"small"}
              onBtnClick={() => {
                setactiveTab((prev) => prev - 1);
              }}
              muiProps="me-2"
            />
          ) : null}
          <ButtonComponent
            label={activeTab === 5 ? "Submit" : "Next"}
            size={"small"}
            onBtnClick={
              activeTab === 5
                ? () => {
                    const temp = formsRef?.current?.handleSendFormData();
                    setFormData((prev) => {
                      const data = { ...prev, [temp[0]]: temp[1] };
                      handleSubmitClick(data);
                      return;
                    });
                  }
                : handleNextClick
            }
          />
        </Box>
      </Box>
    </Box>
  );
};
export default ProductsLayout;
