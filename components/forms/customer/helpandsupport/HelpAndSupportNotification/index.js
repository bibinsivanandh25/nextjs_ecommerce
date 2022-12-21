/* eslint-disable no-nested-ternary */
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
        <Grid item xs={4}>
          {param1}
        </Grid>
        <Grid item xs={1}>
          :
        </Grid>
        <Grid item xs={7}>
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
      ModalTitle="Message Reply"
      showFooter={false}
      onCloseIconClick={() => setShowModal({ show: false, id: null })}
      ModalWidth={500}
      titleClassName="fw-bold color-orange"
    >
      <Grid container spacing={3}>
        <Grid xs={12} item className="fs-15 fw-500">
          {getParagraph(
            "Date & Time",
            new Date(selectedData.createdDate).toLocaleString()
          )}
          {getParagraph("Ticket ID", selectedData.ticketId)}
          {getParagraph("Subject", selectedData.issueSubject)}
          <Grid container my={1}>
            <Grid item xs={4}>
              Reply from {selectedData.userToType}
            </Grid>
            <Grid item xs={1}>
              :
            </Grid>
            {selectedData.helpSupportMessages[
              selectedData.helpSupportMessages.length - 1
            ].messageFromType === "SUPPLIER" ? (
              <Grid item xs={7}>
                <div
                  className="text-break"
                  dangerouslySetInnerHTML={{
                    __html:
                      selectedData.helpSupportMessages[
                        selectedData.helpSupportMessages.length - 1
                      ].message,
                  }}
                />
              </Grid>
            ) : selectedData.helpSupportMessages[
                selectedData.helpSupportMessages.length - 1
              ].messageFromType === "ADMIN" ? (
              <>
                <Grid item xs={7}>
                  <div
                    className="text-break"
                    dangerouslySetInnerHTML={{
                      __html:
                        selectedData.helpSupportMessages[
                          selectedData.helpSupportMessages.length - 1
                        ].message,
                    }}
                  />
                </Grid>
              </>
            ) : (
              <Grid>___</Grid>
            )}
          </Grid>
          {selectedData.helpSupportMessages[
            selectedData.helpSupportMessages.length - 1
          ].messageFromType === "SUPPLIER" &&
          selectedData.helpSupportMessages[
            selectedData.helpSupportMessages.length - 1
          ].helpSupportMessageMedias.length ? (
            <Grid container my={1}>
              <Grid item xs={4}>
                Attached File
              </Grid>
              <Grid item xs={1}>
                :
              </Grid>
              <Grid item xs={7}>
                {showFileNames(
                  selectedData.helpSupportMessages[
                    selectedData.helpSupportMessages.length - 1
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
          ) : selectedData.helpSupportMessages[
              selectedData.helpSupportMessages.length - 1
            ].messageFromType === "ADMIN" &&
            selectedData.helpSupportMessages[
              selectedData.helpSupportMessages.length - 1
            ].helpSupportMessageMedias.length ? (
            <Grid container my={1}>
              <Grid item xs={4}>
                Attached File
              </Grid>
              <Grid item xs={1}>
                :
              </Grid>
              <Grid item xs={7}>
                {showFileNames(
                  selectedData.helpSupportMessages[
                    selectedData.helpSupportMessages.length - 1
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
          ) : (
            ""
          )}
        </Grid>
      </Grid>
    </ModalComponent>
  );
};

export default HelpAndSupportNotification;
