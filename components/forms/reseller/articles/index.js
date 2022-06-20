import { Grid } from "@mui/material";
import ButtonComponent from "components/atoms/ButtonComponent";
import ImageCard from "components/atoms/ImageCard";
import InputBox from "components/atoms/InputBoxComponent";
import ModalComponent from "components/atoms/ModalComponent";
import SimpleDropdownComponent from "components/atoms/SimpleDropdownComponent";
import TextEditor from "components/atoms/TextEditor";
import { useState } from "react";
import { getBase64 } from "services/utils/functionUtils";

const AddNewArticleModal = ({ showModal = false, setShowModal = () => {} }) => {
  const [showAddExtrernalLinkModal, setShowAddExternalLinkModal] =
    useState(false);
  const [showCreateArticleModal, setShowCreateArticleModal] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [ArticleTitleValue,setArticalTitleValue]=useState('')
  const [categoryValue,setCatergoryValue]=useState([])
  const [externalLinkvalue,setExternalLinkValue]=useState('')
  return (
    <div>
      <ModalComponent
        open={showModal}
        ModalTitle="New Article"
        onCloseIconClick={() => setShowModal(false)}
        showFooter={false}
        headerClassName="color-orange"
        ModalWidth={700}
      
      >
        <div className="d-flex justify-content-center my-5">
          <ButtonComponent
            variant="outlined"
            borderColor="border-secondary"
            textColor="text-secondary"
            muiProps="fs-14 px-4 py-2 me-5"
            label="Add external article Link"
            onBtnClick={() => {
              setShowAddExternalLinkModal(true);
              //   setShowModal(false);
            }}
          />
          <ButtonComponent
            variant="outlined"
            borderColor="border-secondary"
            textColor="text-secondary"
            muiProps="fs-14 px-4 py-2  "
            label="create Articles"
            onBtnClick={() => {
              setShowCreateArticleModal(true);
              //   setShowModal(false);
            }}
          />
        </div>
      </ModalComponent>
      <ModalComponent
        open={showAddExtrernalLinkModal}
        ModalTitle="New Article"
        onCloseIconClick={() => {
          setShowAddExternalLinkModal(false);
          setShowModal(false);
        }}
        headerClassName="color-orange"
        ModalWidth={700}
        footerClassName="justify-content-end border-top"
        saveBtnText="Draft"
        ClearBtnText="Publish"
        clearBtnVariant = "contained"
        saveBtnVariant="outlined"
        clearBtnClassName='px-4'
        saveBtnClassName='px-4'
      >
        <Grid container justifyContent="center" className="my-3">
          <Grid item sm={5}>
            <div className="ms-4">
              <ImageCard
                height={200}
                width={200}
                handleCloseClick={() => setImageUrl("")}
                showClose={!!imageUrl.length}
                imgSrc={imageUrl}
                handleImageUpload={async (e) => {
                  const file = await getBase64(e.target.files[0]);
                  setImageUrl(file);
                }}
              />
            </div>
          </Grid>
          <Grid item sm={6}>
            <div className="mt-2">
              <div>
                <InputBox id="outlined-basic" variant="outlined" value={ArticleTitleValue} size="small" label="Article Title" onInputChange={(e) => setArticalTitleValue(e.target.value)}
                />
              </div>
              <div className="my-3">
                <SimpleDropdownComponent label='category'size="small"  variant="outlined" />
              </div>
              <div>
                <InputBox size="small" label="External Link"  variant="outlined"/>
              </div>
            </div>
          </Grid>
        </Grid>
      </ModalComponent>
      <ModalComponent
        open={showCreateArticleModal}
        ModalTitle="New Article"
        onCloseIconClick={() => {
          setShowCreateArticleModal(false);
          setShowModal(false);
        }}
        showFooter={true}
        headerClassName="color-orange"
        ModalWidth={900}
        footerClassName='justify-content-end border-top'
        saveBtnText='Draft'
        ClearBtnText='Publish'
        clearBtnVariant = "contained"
        saveBtnVariant = "outlined"
        clearBtnClassName='px-4'
        saveBtnClassName='px-4'
      >
        <Grid className="d-flex mt-4 mb-5 ">
          <Grid className="">
            <div>
              <ImageCard
                handleCloseClick={() => setImageUrl("")}
                showClose={!!imageUrl.length}
                imgSrc={imageUrl}
                handleImageUpload={async (e) => {
                  const file = await getBase64(e.target.files[0]);
                  setImageUrl(file);
                }}
              />
            </div>
          </Grid>
          <Grid className="mx-4">
            <div className="mt-2">
              <div>
                <InputBox size="small" label="Article Title *" variant='outlined'
               />
              </div>
              <div className="my-3">
                <SimpleDropdownComponent label="category" size="small"  variant="outlined" />
              </div>
              <div>
                <InputBox size="small" label="Tags"  variant="outlined"/>
              </div>
              <div className="my-3">
                <SimpleDropdownComponent label="Visibility" size="small"  variant="outlined"/>
              </div>
              <div>
                <InputBox size="small" label="External Link"  variant="outlined"/>
              </div>
            </div>
          </Grid>
          <Grid className="w-50">
            <div>
              <TextEditor EditorHeight="75px" />
            </div>
            <div className="mt-2">
              <TextEditor EditorHeight="120px" />
            </div>
          </Grid>
        </Grid>
      </ModalComponent>
    </div>
  );
};
export default AddNewArticleModal;
