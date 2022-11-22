/* eslint-disable no-shadow */
import React, { useState } from "react";
import { Box, FormHelperText, Grid } from "@mui/material";
import validateMessage from "constants/validateMessages";
import InputBox from "@/atoms/InputBoxComponent";
import ModalComponent from "@/atoms/ModalComponent";
import SimpleDropdownComponent from "@/atoms/SimpleDropdownComponent";
import ImageCard from "@/atoms/ImageCard";
import { getBase64 } from "services/utils/functionUtils";

const err = {
  category: "",
  set: "",
  setImage: "",
};

const CreateSetModal = ({
  openCreateSetModal,
  setOpenCreateSetModal,
  //   rowId,
  //   rowsDataObjectsForSets,
  setDetails,
  setSetDetails,
}) => {
  const [error, setError] = useState(err);

  const handleCloseIconClick = () => {
    setSetDetails({
      category: {},
      set: "",
      setImage: "",
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
  const handleSaveBtnClick = () => {
    const result = handleError();
    console.log(result);
  };

  const handleClearAll = () => {
    setSetDetails({
      category: {},
      set: "",
      setImage: "",
    });
    setError({
      category: "",
      set: "",
      setImage: "",
    });
  };

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
        <Grid container spacing={2}>
          <Grid item sm={8}>
            <Box>
              <SimpleDropdownComponent
                list={[{ label: "Category One" }, { label: "Category Two" }]}
                label="Category"
                inputlabelshrink
                size="small"
                onDropdownSelect={(value) => {
                  // console.log(setDetails);
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
                  setSetDetails({ ...setDetails, setImage: file });
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
