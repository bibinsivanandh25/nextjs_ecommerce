import { Grid, Typography } from "@mui/material";
import { AiOutlineDownload } from "react-icons/ai";
import ModalComponent from "@/atoms/ModalComponent";

const ViewDocument = ({
  showModal = false,
  setShowModal = () => {},
  viewModalData = {},
}) => {
  const showFileNames = () => {
    const data = [];
    viewModalData?.documentUrl?.forEach((item) => {
      if (typeof item == "string") {
        const x = item.split("-");
        data.push({ url: item, filename: x[x.length - 1] });
      } else {
        data.push({ url: "", filename: item.name });
      }
    });
    return data;
  };
  return (
    <ModalComponent
      open={showModal}
      onCloseIconClick={() => setShowModal(false)}
      ModalTitle="View Document"
      showFooter={false}
      titleClassName="fw-bold color-orange"
    >
      <Grid container spacing={2} paddingBottom={2}>
        <Grid container spacing={1} item sm={12}>
          <Grid item sm={3}>
            <Typography className="text-end h-5">Document Name :</Typography>
          </Grid>
          <Grid item sm={9}>
            <Typography className="fs-14 fw-600">
              {viewModalData.documentName}{" "}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={1} item sm={12}>
          <Grid item sm={3}>
            <Typography className="text-end fs-14 ">Description :</Typography>
          </Grid>
          <Grid item sm={9}>
            <Typography className="fs-14 fw-600">
              {viewModalData?.description}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={1} item sm={12}>
          <Grid item sm={3}>
            <Typography className="text-end fs-14 ">Documents :</Typography>
          </Grid>
          <Grid item sm={9} spacing={1}>
            {showFileNames().map((item) => (
              <Typography
                className="fs-14 fw-600 color-blue"
                key={item.filename}
              >
                {item.filename}
                <a
                  href={item.url}
                  download
                  target="_blank"
                  rel="noreferrer"
                  className="ms-3"
                >
                  <AiOutlineDownload className="cursor-pointer" />
                </a>
              </Typography>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </ModalComponent>
  );
};
export default ViewDocument;
