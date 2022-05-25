import { Grid } from "@mui/material";
import ModalComponent from "components/atoms/ModalComponent";

const ResellerNotificationModal = (props) => {
  const { show = false, setShowModal = () => {} } = props;

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

  return (
    <ModalComponent
      open={show}
      ModalTitle="Admin Reply"
      showFooter={false}
      onCloseIconClick={() => setShowModal({ show: false, id: null })}
      minHeightClassName="mnh-300 mxh-300"
      ModalWidth={800}
    >
      <Grid container my={2}>
        <Grid xs={12} item className="fs-15 fw-500">
          {getParagraph("Date & Time", "12-03-2021, 04:23 AM")}
          {getParagraph("Ticket ID", "#12445")}
          {getParagraph("Subject", "Request for refund has not approved yet")}
          {getParagraph("Reply from admin", "12-03-2021, 04:23 AM")}
          {getParagraph("Attached File", "12-03-2021, 04:23 AM")}
        </Grid>
      </Grid>
    </ModalComponent>
  );
};

export default ResellerNotificationModal;
