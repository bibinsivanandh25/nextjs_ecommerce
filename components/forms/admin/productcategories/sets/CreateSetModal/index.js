/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-shadow */
import React, { useEffect, useState } from "react";
import { Box, FormHelperText, Grid } from "@mui/material";
import validateMessage from "constants/validateMessages";
import InputBox from "@/atoms/InputBoxComponent";
import ModalComponent from "@/atoms/ModalComponent";
import SimpleDropdownComponent from "@/atoms/SimpleDropdownComponent";
import ImageCard from "@/atoms/ImageCard";
import { getBase64 } from "services/utils/functionUtils";
import {
  editSet,
  getAllCategorys,
  getSetDataById,
  saveSet,
  uploadSetMedia,
} from "services/admin/products/productCategories/sets";
import toastify from "services/utils/toastUtils";

const err = {
  category: "",
  set: "",
  setImage: "",
};

const CreateSetModal = ({
  openCreateSetModal,
  setOpenCreateSetModal,
  getAllSet = () => {},
  selectedData = {},
  type = "",
}) => {
  const [setDetails, setSetDetails] = useState({
    category: {},
    set: "",
    setImage: "",
    imageFile: "",
    editsetid: "",
  });
  const [error, setError] = useState(err);
  const [categoryList, setCategoryList] = useState([]);
  const handleCloseIconClick = () => {
    setSetDetails({
      category: {},
      set: "",
      setImage: "",
      imageFile: "",
    });
    setError({
      category: "",
      set: "",
      setImage: "",
    });
    setOpenCreateSetModal(false);
  };

  const handleError = () => {
    const errObj = {
      category: "",
      set: "",
      setImage: "",
    };
    const { category, set, setImage } = setDetails;
    if (category === null || Object?.values(category)?.length === 0) {
      errObj.category = validateMessage.field_required;
    }
    if (set === "") {
      errObj.set = validateMessage.field_required;
    }
    if (setImage == "") {
      errObj.setImage = validateMessage.field_required;
    }
    setError(errObj);
    const flag = Object.values(errObj).every((x) => x == "");
    return flag;
  };
  const convertFileToUrl = async (file) => {
    const formdata = new FormData();
    formdata.append("media", file);
    formdata.set("data", {});
    const { data, err } = await uploadSetMedia(formdata);
    if (data) {
      return data.data;
    }
    if (err) {
      return null;
    }
    return null;
  };
  const handleSaveBtnClick = async () => {
    const result = handleError();
    if (result) {
      let payload;
      if (type == "add") {
        const imgurl = await convertFileToUrl(setDetails.imageFile);
        payload = {
          setName: setDetails.set,
          mainCategoryId: setDetails.category.id,
          categorySetImageUrl: imgurl,
        };
      } else if (type == "edit") {
        const imgurl =
          setDetails.imageFile !== ""
            ? await convertFileToUrl(setDetails.imageFile)
            : setDetails.setImage;
        payload = {
          categorySetId: setDetails.editsetid,
          setName: setDetails.set,
          categorySetImageUrl: imgurl,
        };
      }
      const { data, err } =
        type == "add" ? await saveSet(payload) : await editSet(payload);
      if (data) {
        toastify(data?.message, "success");
        handleClearAll();
        setOpenCreateSetModal(false);
        getAllSet(0, null);
      } else if (err) {
        toastify(err?.response?.data?.message, "error");
      }
    }
  };
  const handleClearAll = () => {
    setSetDetails({
      category: {},
      set: "",
      setImage: "",
      imageFile: "",
    });
    setError({
      category: "",
      set: "",
      setImage: "",
    });
  };

  const getCategory = async () => {
    const { data, err } = await getAllCategorys();
    if (data) {
      const temp = [];
      data.data.forEach((val) => {
        temp.push({
          label: val.name,
          id: val.id,
        });
      });
      setCategoryList(temp);
    }
    if (err) {
      setCategoryList([]);
    }
  };
  useEffect(() => {
    getCategory();
  }, []);
  const getEditData = async () => {
    const { data } = await getSetDataById(selectedData.categorySetId);
    if (data?.data) {
      setSetDetails({
        category: "",
        set: data.data.setName,
        setImage: data.data.categorySetImageUrl,
        imageFile: "",
        editsetid: data.data.categorySetId,
      });
    }
  };
  useEffect(() => {
    if (type === "edit") {
      getEditData();
    }
  }, [selectedData]);
  return (
    <Box>
      <ModalComponent
        open={openCreateSetModal}
        ModalTitle="Create Set"
        titleClassName="fw-bold fs-14 color-orange"
        footerClassName="d-flex justify-content-start flex-row-reverse border-top mt-3"
        ClearBtnText="Reset"
        saveBtnClassName="ms-1"
        ModalWidth={600}
        minHeightClassName="overflow-auto"
        onCloseIconClick={() => {
          handleCloseIconClick();
        }}
        onSaveBtnClick={() => {
          handleSaveBtnClick();
        }}
        onClearBtnClick={() => {
          handleClearAll();
        }}
      >
        <Grid container>
          <Grid item sm={8}>
            <Box>
              <SimpleDropdownComponent
                disabled={type == "edit"}
                list={categoryList}
                label="Category"
                inputlabelshrink
                size="small"
                onDropdownSelect={(value) => {
                  setSetDetails({ ...setDetails, category: value });
                }}
                value={setDetails?.category}
                className="mt-3"
                helperText={error.category ? error.category : ""}
              />
            </Box>
            <Box>
              <InputBox
                label="Set"
                className="mt-3"
                value={setDetails.set}
                inputlabelshrink
                onInputChange={(e) => {
                  setSetDetails({ ...setDetails, set: e.target.value });
                }}
                error={error.set}
                helperText={error.set ? error.set : ""}
              />
            </Box>
          </Grid>
          <Grid item sm={4}>
            <Box display="flex" justifyContent="center">
              <ImageCard
                handleCloseClick={() =>
                  setSetDetails({ ...setDetails, setImage: "" })
                }
                showClose={!!setDetails?.setImage?.length}
                imgSrc={setDetails?.setImage}
                handleImageUpload={async (e) => {
                  const file = await getBase64(e.target.files[0]);
                  setSetDetails({
                    ...setDetails,
                    setImage: file,
                    imageFile: e.target.files[0],
                  });
                }}
              />
            </Box>
            <FormHelperText
              error={error.setImage}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              {error.setImage}
            </FormHelperText>
          </Grid>
        </Grid>
      </ModalComponent>
    </Box>
  );
};

export default CreateSetModal;
