import { Box, Grid, Paper } from "@mui/material";
import ImageCard from "components/atoms/ImageCard";
import { useState } from "react";
import InventoryForm from "./InventoryForm";
import PricingForm from "./Pricing&Weight";
import LinkedForm from "./LinkedForm";
import ProductPoliciesForm from "./ProductPoliciesForm";
import GroupedproductsForm from "./GroupedproductsForm";
import AttributesForm from "./AttributesForm";
import VariationForm from "./VariationForm";
import SimpleDropdownComponent from "components/atoms/SimpleDropdownComponent";
import ButtonComponent from "components/atoms/ButtonComponent";
import { commisiondata, product_type } from "./constants";
import InputBox from "components/atoms/InputBoxComponent";
import TextAreaComponent from "components/atoms/TextAreaComponent";

const tabsData = [
  {
    title: "Inventory",
    component: <InventoryForm />,
    active: true,
  },
  {
    title: "Pricing & Weight",
    component: <PricingForm />,
    active: false,
  },
  {
    title: "Linked",
    component: <LinkedForm />,
    active: false,
  },
  {
    title: "Product Policies",
    component: <ProductPoliciesForm />,
    active: false,
  },
  {
    title: "Grouped products",
    component: <GroupedproductsForm />,
    active: false,
  },
  {
    title: "Variation",
    component: <VariationForm />,
    active: false,
  },
  {
    title: "Attributes",
    component: <AttributesForm />,
    active: false,
  },
];

const ProductsLayout = ({}) => {
  const [imagedata, setImageData] = useState([]);
  const [tabsList, setTabsList] = useState([...tabsData]);
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

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <Box className="d-flex flex-grow-1 flex-row mt-2">
      <Box className="border-end p-2 py-2  fit-content pb-0 overflow-y-scroll mxh-75vh">
        {imagedata.length > 0
          ? imagedata.map((item, index) => (
              <ImageCard
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
            <Grid item md={12}>
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
            </Grid>
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
        <Box className="d-flex w-100">
          <Box className="w-200px p-2">
            <Grid container className="">
              {tabsList.map((item, index) => {
                return (
                  <Grid
                    item
                    md={12}
                    className={`cursor-pointer text-center py-1 rounded my-1 fs-14 ${
                      item.active ? "bg-orange color-white" : "bg-light-gray"
                    }`}
                    onClick={() => {
                      const temp = [...tabsList];
                      temp.forEach((ele) => {
                        ele.active = false;
                      });
                      temp[index].active = true;
                      setTabsList([...temp]);
                    }}
                  >
                    {item.title}
                  </Grid>
                );
              })}
            </Grid>
          </Box>
          <Box className="p-3 w-100 mnh-75vh mxh-75vh overflow-y-scroll hide-scrollbar">
            {tabsList.map((item) => {
              return item.active ? item.component : null;
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
          <ButtonComponent
            label={tabsList[tabsList.length - 1].active ? "Submit" : "Next"}
            size={"small"}
            onBtnClick={
              tabsList[tabsList.length - 1].active ? () => {} : () => {}
            }
          />
        </Box>
      </Box>
    </Box>
  );
};
export default ProductsLayout;
