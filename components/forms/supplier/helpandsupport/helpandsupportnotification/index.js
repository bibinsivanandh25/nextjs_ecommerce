/* eslint-disable react/no-danger */
import { Grid } from "@mui/material";
import ModalComponent from "components/atoms/ModalComponent";

const HelpAndSupportNotification = ({
  show = false,
  setShowModal = () => {},
  selectedData = {},
}) => {
  const getParagraph = (param1, param2) => {
    return (
      <Grid container my={1}>
        <Grid item xs={2}>
          {param1}
        </Grid>
        <Grid item xs={1}>
          :
        </Grid>
        <Grid item xs={9}>
          {param2}
        </Grid>
      </Grid>
    );
  };
  const showFileNames = (value) => {
    const data = [];
    value?.forEach((item) => {
      if (typeof item.mediaUrl == "string") {
        const x = item.mediaUrl.split("-");
        data.push({ url: item.mediaUrl, filename: x[x.length - 1] });
      }
    });
    return data;
  };

  return (
    <ModalComponent
      open={show}
      ModalTitle="Admin Reply"
      showFooter={false}
      onCloseIconClick={() => setShowModal({ show: false, id: null })}
      minHeightClassName="mnh-300 mxh-300"
      ModalWidth={800}
      titleClassName="fw-bold color-orange"
    >
      <Grid container my={2}>
        <Grid xs={12} item className="fs-15 fw-500">
          {getParagraph(
            "Date & Time",
            new Date(selectedData.createdDate).toLocaleString()
          )}
          {getParagraph("Ticket ID", selectedData.ticketId)}
          {getParagraph("Subject", selectedData.issueSubject)}
          <Grid container my={1}>
            <Grid item xs={2}>
              Reply from Admin
            </Grid>
            <Grid item xs={1}>
              :
            </Grid>
            <Grid item xs={9}>
              {selectedData?.helpSupportMessages?.length ? (
                <div
                  className="text-break"
                  dangerouslySetInnerHTML={{
                    __html:
                      selectedData?.helpSupportMessages[
                        selectedData?.helpSupportMessages?.length - 1
                      ].message,
                  }}
                />
              ) : null}
            </Grid>
          </Grid>

          <Grid container my={1}>
            <Grid item xs={2}>
              Attached File
            </Grid>
            <Grid item xs={1}>
              :
            </Grid>
            <Grid item xs={9}>
              {showFileNames(
                selectedData.helpSupportMessages[
                  selectedData?.helpSupportMessages?.length - 1
                ].helpSupportMessageMedias
              ).map((item) => (
                <a
                  href={item.url}
                  download
                  target="_blank"
                  rel="noreferrer"
                  className="text-break d-block fit-content"
                >
                  {item.filename}
                </a>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ModalComponent>
  );
};

export default HelpAndSupportNotification;
