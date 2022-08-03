import { Grid, Typography } from "@mui/material";
import { useRef, useState } from "react";
import InputBox from "@/atoms/InputBoxComponent";
import ModalComponent from "@/atoms/ModalComponent";
import SimpleDropdownComponent from "@/atoms/SimpleDropdownComponent";
import TextArea from "@/atoms/SimpleTextArea";
import ButtonComponent from "@/atoms/ButtonComponent";

const UploadDocumentModal = ({ showModal = true, setShowModal = () => {} }) => {
  const fileRef = useRef(null);
  const [fileNames, setFileNames] = useState([]);
  return (
    <ModalComponent
      open={showModal}
      onCloseIconClick={() => setShowModal(false)}
      ModalTitle="Upload Document"
      footerClassName="justify-content-end"
    >
      <Grid container justifyContent="center" className="mt-2">
        <Grid item sm={12}>
          <SimpleDropdownComponent
            fullWidth
            placeholder="File Type"
            size="small"
            list={[
              {
                id: 1,
                title: "B2B Invoice",
                value: "B2B Invoice",
              },
              {
                id: 2,
                title: "Trademark Authentications",
                value: "Trademark Authentications",
              },
              {
                id: 3,
                title: "Letters",
                value: "Letters",
              },
            ]}
          />
        </Grid>
        <Grid item sm={12} className="my-2">
          <InputBox placeholder="File Name" />
        </Grid>
        <Grid item sm={12}>
          <TextArea rows={3} />
        </Grid>
        <Grid item sm={12} display="flex" alignItems="center">
          <input
            hidden
            ref={fileRef}
            type="file"
            onChange={(e) => {
              const temp = [...fileNames];
              temp.push(e.target.files[0].name);
              setFileNames([...temp]);
            }}
          />
          <ButtonComponent
            bgColor="bg-dark-gray1"
            label="Upload Document"
            onBtnClick={() => {
              fileRef.current.click();
            }}
          />
          {fileNames.map((ele) => {
            return (
              <Typography className="color-blue h-5 pe-2" key={ele}>
                {ele}
              </Typography>
            );
          })}
        </Grid>
      </Grid>
    </ModalComponent>
  );
};
export default UploadDocumentModal;
