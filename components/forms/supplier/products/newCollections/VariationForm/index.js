import { Box, Typography } from "@mui/material";
import ButtonComponent from "components/atoms/ButtonComponent";
import ImageCard from "components/atoms/ImageCard";
import ModalComponent from "components/atoms/ModalComponent";
import { forwardRef, useState } from "react";
import { getBase64 } from "services/utils/functionUtils";

const VariationForm = forwardRef(
  (
    { setShowGroupVariant = () => {}, setFormData = () => {}, formData = {} },
    ref
  ) => {
    const [showModal, setShowModal] = useState(false);
    const [imagedata, setImageData] = useState([]);
    const [showImageModal, setShowImageModal] = useState(false);

    const handleImageSubmit = () => {
      setFormData((pre) => ({
        ...pre,
        variationImages: [...imagedata],
      }));
      setShowGroupVariant(true);
    };

    return (
      <Box className="mnh-75vh mxh-75vh overflow-y-scroll p-3 pb-2 d-flex flex-column justify-content-between">
        <Box className="d-flex">
          <ButtonComponent
            label="Add Collections"
            onBtnClick={() => {
              setShowModal(true);
            }}
          />
          <ModalComponent
            ModalTitle=""
            showClearBtn={false}
            showSaveBtn={false}
            open={showModal}
            showHeader={true}
            onCloseIconClick={() => {}}
            headerClassName="border-0"
            minHeightClassName="mnh-100 p-4  d-flex justify-content-center"
          >
            <div className="d-flex w-100 align-items-center flex-column">
              <Typography component={"div"} className="h-4">
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
              {imagedata.length < 5 ? (
                <ImageCard
                  className="mx-3"
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
          </ModalComponent>
        </Box>
      </Box>
    );
  }
);

VariationForm.displayName = "VariationForm";
export default VariationForm;
